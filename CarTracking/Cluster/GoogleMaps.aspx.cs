using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CarTracking.Cluster
{
    public partial class GoogleMaps : TrackingBase
    {
        private TrackingPresenter Presenter
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
                Presenter = new TrackingPresenter();
            }
        }
    }
}