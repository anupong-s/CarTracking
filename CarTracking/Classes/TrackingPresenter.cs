using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CarTracking.Model;

namespace CarTracking
{
    public class TrackingPresenter
    {
        public int PinPageIndex { get; set; }
        public int PinPageSize { get; set; }
        public int PinCount { get; set; }

        private int GeopointId { get; set; }

        public TrackingPresenter()
        {
            PinPageIndex = 0;
            PinPageSize = 10;
        }

        public static int PinsCount()
        {
            using (var ctx = new CarTrackingEntities())
            {
                return ctx.Pins.Count();
            }
        }

        public List<VehicleDto> GetVehicles()
        {
            using (var ctx = new CarTrackingEntities())
            {
                var vehicles = ctx.Vehicles.ToList();
                var result = new List<VehicleDto>();

                foreach (var vehicle in vehicles)
                {
                    result.Add(VehicleDto.CreateVehicleDto(vehicle));
                }

                return result;
            }
        }

        public GeoPointInfo[] GetGeoPointInfosByDeviceSn(string deviceSn)
        {
            var result = new List<GeoPointInfo>();
            using (var ctx = new CarTrackingEntities())
            {
                var geoPoints = ctx.GeoPoints
                                   .Where(p => p.Device.DeviceSn == deviceSn)
                                   .AsEnumerable();

                geoPoints.Partition(10).ForEach(s =>
                {
                    var g = s.ToList();
                    foreach (var geoPoint in g)
                    {
                        result.Add(new GeoPointInfo(geoPoint));
                    }
                });
            }

            return result.ToArray();
        }

        public GeoPointInfo GetGeoPointInfoByDeviceSn(string deviceSn, int id)
        {
            using (var ctx = new CarTrackingEntities())
            {
                var geoPoint = ctx.GeoPoints.FirstOrDefault(p =>
                                    p.Device.DeviceSn == deviceSn && p.Id == (id + 1));

                return geoPoint == null ? new GeoPointInfo() : new GeoPointInfo(geoPoint);
            }
        }

        public void SavePin(string pinName, decimal lat, decimal lng)
        {
            using (var ctx = new CarTrackingEntities())
            {
                var hasPinName = ctx.Pins.Any(s => s.PinName == pinName);
                if (hasPinName) { throw new Exception("Pin name is duplicate"); }

                var pin = new Pin
                {
                    PinName = pinName,
                    Latitude = lat,
                    Longitude = lng,
                    CreatedDate = DateTime.Now
                };

                ctx.Pins.AddObject(pin);
                ctx.SaveChanges();
            }
        }

        public List<PinDto> GetPins()
        {
            using (var ctx = new CarTrackingEntities())
            {
                var pageSize = PinPageIndex * PinPageSize;
                var pins = ctx.Pins.OrderByDescending(o => o.CreatedDate)
                              .Skip(0).Take(pageSize).ToList();

                return pins.Select(pin => new PinDto(pin.Id, pin.PinName,
                                    pin.Latitude, pin.Longitude)).ToList();
            }
        }

        public void UpdatePin(int pinId, string pinName)
        {
            using (var ctx = new CarTrackingEntities())
            {
                var pin = ctx.Pins.First(p => p.Id == pinId);
                pin.UpdatePinName(pinName);
                ctx.SaveChanges();
            }
        }

        public void DeletePinById(int pinId)
        {
            using (var ctx = new CarTrackingEntities())
            {
                var pin = ctx.Pins.First(p => p.Id == pinId);
                ctx.DeleteObject(pin);
                ctx.SaveChanges();
            }
        }

        public GeoPointInfo GetLastKnowLocation(int id)
        {
            GeopointId += 1;
            using (var ctx = new CarTrackingEntities())
            {
                var point = ctx.GeoPoints.OrderBy(s => s.Id)
                               .FirstOrDefault(s => s.DeviceId == id && s.Id == GeopointId);

                if (point == null)
                {
                    GeopointId = 1;
                    point = ctx.GeoPoints.OrderBy(s => s.Id)
                               .FirstOrDefault(s => s.DeviceId == id && s.Id == GeopointId);
                }

                return new GeoPointInfo(point);
            }
        }
    }
}