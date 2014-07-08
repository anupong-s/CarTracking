using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CarTracking.Model.Properties;
using Telerik.Web.UI;

namespace CarTracking
{
    public partial class TestImageFromResource : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                var image = Resources.a1;

                var stream = new System.IO.MemoryStream();
                image.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                var imageBytes = stream.ToArray();
                var base64String = Convert.ToBase64String(imageBytes);
                imgTest.ImageUrl = "data:image/png;base64," + base64String;
            }
        }
    }
}