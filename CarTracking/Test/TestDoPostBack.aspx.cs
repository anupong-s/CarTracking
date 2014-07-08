using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CarTracking.Test
{
    public partial class TestDoPostBack : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {

        }

        protected void txtBox1_TextChanged(object sender, EventArgs e)
        {
            lblMessage.Text = txtBox1.Text;
        }

        protected void btnTest_Click(object sender, EventArgs e)
        {
            var x = 0;
        }
    }
}