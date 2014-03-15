using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CarTracking.Model;

namespace CarTracking
{
    public class TrackingPresenter
    {
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
    }
}