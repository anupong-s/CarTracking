using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CarTracking.Model
{
    public partial class Pin
    {
        public static Pin CreatePin(string name, decimal lat, decimal lng)
        {
            return new Pin
            {
                CreatedDate = DateTime.Now,
                Latitude = lat,
                Longitude = lng,
                PinName = name,
            };

        }

        public void UpdatePinName(string name)
        {
            PinName = name;
        }
    }
}
