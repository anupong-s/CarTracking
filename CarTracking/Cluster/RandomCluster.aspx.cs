using System;
using System.Collections.Generic;
using System.Web.Script.Services;
using System.Web.Services;
using Newtonsoft.Json;

namespace CarTracking.Cluster
{
    public partial class RandomCluster : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetGeopoints(string numberOfRandom)
        {
            var total = Convert.ToInt32(numberOfRandom);

            var rd = new Random();
            var result = new List<GeoPointInfo>();
            
            for (int i = 0; i < total; i++)
            {
                var rInt = rd.Next(7, 19);
                var rDouble = rd.NextDouble();
                var latitude = rInt + Math.Round(rDouble, 6);

                var xInt = rd.Next(98, 104);
                var xDouble = rd.NextDouble();
                var longitude = xInt + Math.Round(xDouble, 6);

                result.Add(new GeoPointInfo
                {
                    Id = i,
                    Lat = (decimal)latitude,
                    Lng = (decimal)longitude
                });
            }

            return JsonConvert.SerializeObject(result);

            //return result.ToArray();
        }

    }
}