using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;

namespace CarTracking
{
    public partial class Tracking : System.Web.UI.Page
    {
        public static string MyIcon { get { return "http://119.46.30.246/ShareImage/PinMap.gif"; } }

        public TrackingPresenter Presenter = new TrackingPresenter();

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static VehicleDto[] GetVehicles()
        {
            var presenter = new TrackingPresenter();
            return presenter.GetLastKnownAllVehicles().ToArray();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static GeoPointInfo GetGeoPointsByDeviceSn(string deviceSn, string id)
        {
            var geoPointId = Convert.ToInt32(id);
            var presenter = new TrackingPresenter();
            var result = presenter.GetGeoPointInfoByDeviceSn(deviceSn, geoPointId);
            return result;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static void SavePin(string pinName, string lat, string lng)
        {
            //save pin
        }

    }
}