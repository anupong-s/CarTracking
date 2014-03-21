using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Lifetime;
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

        public static int PinCount { get { return TrackingPresenter.PinsCount(); } }

        public TrackingPresenter Presenter
        {
            get
            {
                return (TrackingPresenter)Session["TrackingPresenter"];
            }
            set { Session["TrackingPresenter"] = value; }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                InitParameter();
                BindVehicles();
            }
        }

        private void InitParameter()
        {
            Presenter = new TrackingPresenter();
            hdnPageIndex.Value = "0";
            hdnScrollPos.Value = "0";
            hdnPageSize.Value = "0";
        }

        private void BindVehicles()
        {
            var vehicles = Presenter.GetVehicles();
            vehicles.Insert(0, new VehicleDto { Lp = "Select Vehicle" });
            e1.DataSource = vehicles;
            e1.DataTextField = "Lp";
            e1.DataValueField = "Id";
            e1.DataBind();
        }

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
            var presenter = (TrackingPresenter)HttpContext.Current.Session["TrackingPresenter"];
            return presenter.GetLastKnowLocation(deviceSn);
        }

        #endregion

        protected void GridViewPin_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridViewPin.EditIndex = e.NewEditIndex;
            BindGrid();
        }

        protected void GridViewPin_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            var key = GridViewPin.DataKeys[e.RowIndex];
            var id = (int)key.Value;
            Presenter.DeletePinById(id);

            GridViewPin.EditIndex = -1;
            BindGrid();
        }

        protected void GridViewPin_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridViewPin.EditIndex = -1;
            BindGrid();
        }

        protected void GridViewPin_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            var row = GridViewPin.Rows[e.RowIndex];
            var name = row.FindControl("txtPinName1") as TextBox;
            var key = GridViewPin.DataKeys[e.RowIndex];
            var id = (int)key.Value;
            Presenter.UpdatePin(id, name.Text);

            GridViewPin.EditIndex = -1;
            BindGrid();
        }

        protected void BtnRefreshGridViewPin_Click(object sender, EventArgs e)
        {
            Presenter.PinPageIndex = Convert.ToInt32(hdnPageIndex.Value) + 1;
            BindGrid();
        }

        protected void BtnClearGridViewPin_Click(object sender, EventArgs e)
        {
            Presenter.PinPageIndex = 0;
            hdnPageIndex.Value = "0";
            hdnScrollPos.Value = "0";
            hdnPageSize.Value = "0";

            GridViewPin.DataSource = null;
            GridViewPin.DataBind();
            udpGridViewPin.Update();
        }

        private void BindGrid()
        {
            var pin = Presenter.GetPins();
            GridViewPin.DataSource = pin;
            GridViewPin.DataBind();
            udpGridViewPin.Update();
        }

        protected void GridViewPin_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                var pin = (PinDto)e.Row.DataItem;
                var lBtnName = (LinkButton)e.Row.FindControl("LbtnName");
                if (lBtnName != null)
                {
                    lBtnName.OnClientClick = string.Format("dialogPin.Pin.addPin('{0}','{1}');",
                                                pin.Latitude, pin.Longitude);
                }
            }
        }

    }
}