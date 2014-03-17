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

        public PinDto(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}