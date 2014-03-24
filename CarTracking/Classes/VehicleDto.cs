using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CarTracking.Model;

namespace CarTracking
{
    [Serializable]
    public class VehicleDto
    {
        public int Id { get; set; }
        public decimal Lat { get; set; }
        public decimal Lng { get; set; }
        public string Lp { get; set; }
        public string DevSn { get; set; }

        public static VehicleDto CreateVehicleDto(Vehicle v)
        {
            return new VehicleDto
            {
                Id = v.Id,
                Lat = v.Latitude,
                Lng = v.Longitude,
                Lp = v.LicensePlate,
                DevSn = v.DeviceSn,
            };
        }
    }
}