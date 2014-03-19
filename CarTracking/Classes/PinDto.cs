using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarTracking
{
    public class PinDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }

        public PinDto(int id, string name, decimal lat, decimal lng)
        {
            Id = id;
            Name = name;
            Latitude = lat;
            Longitude = lng;
        }
    }
}