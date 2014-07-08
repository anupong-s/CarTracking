using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CarTracking
{
    public partial class TestBeforeUnload : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnGetData_Click(object sender, EventArgs e)
        {
            lblMessage.Text = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
        }
    }
}