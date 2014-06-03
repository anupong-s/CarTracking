using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;

namespace CarTracking
{
    public class TrackingBase : Page
    {
        #region Web Method

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static VehicleDto[] GetVehicles()
        {
            var presenter = new TrackingPresenter();
            return presenter.GetVehicles().ToArray();
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
        public static void SavePin(string pinName, decimal lat, decimal lng)
        {
            var presenter = new TrackingPresenter();
            presenter.SavePin(pinName, lat, lng);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static GeoPointInfo GetLastKnowLocation(string deviceSn)
        {
            //สำหรับ realtime แต่จริงๆ แล้วต้อง return เป็น List
            //เพราะตอน request ไปขอ Geopoint บางที device อาจจะส่งมาที่ server แล้วหลายจุด
            var presenter = (TrackingPresenter)HttpContext.Current.Session["TrackingPresenter"];
            return presenter.GetLastKnowLocation(deviceSn);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<GeoPointInfo> GetHistories(string deviceSn)
        {
            var presenter = (TrackingPresenter)HttpContext.Current.Session["TrackingPresenter"];
            return presenter.GetHistoriesTracking(deviceSn).ToList();
        }

        #endregion

    }
}