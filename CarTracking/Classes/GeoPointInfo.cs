using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CarTracking.Model;

namespace CarTracking
{
    public class GeoPointInfo
    {
        public int Id { get; set; }
        public string DevSn { get; set; }
        public decimal Lat { get; set; }
        public decimal Lng { get; set; }
        public int Hd { get; set; }
        public string Lp { get; set; }

        public GeoPointInfo()
        {

        }

        public GeoPointInfo(GeoPoint p)
        {
            Id = p.Id;
            DevSn = p.Vehicle.DeviceSn;
            Lat = p.Latitude;
            Lng = p.Logitude;
            Hd = p.Heading;
        }

    }
}