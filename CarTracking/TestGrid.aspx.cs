using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CarTracking
{
    public partial class TestGrid : System.Web.UI.Page
    {
        public static int PageCount { get { return Datas().Count; } }

        public class Customer
        {
            public int Id { get; set; }
            public string Name { get; set; }
        }

        public List<Customer> SessionData
        {
            get
            {
                if (Session["Customer"] == null) { Session["Customer"] = new List<Customer>(); }
                return (List<Customer>)Session["Customer"];
            }
            set
            {
                Session["Customer"] = value;
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                SessionData = Datas();
                BindGrid();
            }
        }

        private static List<Customer> Datas()
        {
            return new List<Customer>
            {
                new Customer {Name = "Watcharin", Id = 0},
                new Customer {Name = "Anupong", Id = 1},
                new Customer {Name = "EFE", Id = 2},
                new Customer {Name = "Sub1", Id = 3},
                new Customer {Name = "EFW", Id = 4},
                new Customer {Name = "Sub1", Id = 5},
                new Customer {Name = "NewRller", Id = 6},
                new Customer {Name = "new", Id = 7},
                new Customer {Name = "David", Id = 8},
                new Customer {Name = "Nathan", Id = 9},
                new Customer {Name = "EF", Id = 10},
                new Customer {Name = "Nicholas", Id = 11},
                new Customer {Name = "Mikkel", Id = 12},
                new Customer {Name = "WEGB", Id = 13},
                new Customer {Name = "CBOROLL", Id = 14},
                new Customer {Name = "asdf", Id = 15},
                new Customer {Name = "asanee", Id = 16},
                new Customer {Name = "Joe", Id = 17},
                new Customer {Name = "Rolls", Id = 18},
                new Customer {Name = "asanx", Id = 19},
                new Customer {Name = "asaneexz", Id = 20},
                new Customer {Name = "asanxz", Id = 21},
                new Customer {Name = "asaneexy", Id = 22},
                new Customer {Name = "asanxy", Id = 23},
                new Customer {Name = "asaneex", Id = 24},
                new Customer {Name = "asanx", Id = 25},
                new Customer {Name = "asaneex", Id = 26},
                new Customer {Name = "asanx", Id = 27},
                new Customer {Name = "asaneex", Id = 28},
                new Customer {Name = "asanx", Id = 29},
                new Customer {Name = "Nantawan", Id = 30},
                new Customer {Name = "Bruno", Id = 31},
                new Customer {Name = "Angelo", Id = 32},
                new Customer {Name = "Tanapol", Id = 33},
                new Customer {Name = "Marcos", Id = 34},
                new Customer {Name = "Nicklas", Id = 35},
                new Customer {Name = "Rob", Id = 36},
                new Customer {Name = "Anton", Id = 37},
                new Customer {Name = "Billy", Id = 38},
                new Customer {Name = "Matthew", Id = 39},
                new Customer {Name = "WEF", Id = 40},
                new Customer {Name = "Lee", Id = 41},
                new Customer {Name = "Craig", Id = 42},
                new Customer {Name = "Titus", Id = 43},
                new Customer {Name = "Anupong", Id = 44},
                new Customer {Name = "Ahmed", Id = 45},
                new Customer {Name = "Gerry1", Id = 46},
                new Customer {Name = "Public", Id = 47},
                new Customer {Name = "asaneex", Id = 48},
                new Customer {Name = "asanx", Id = 49},
                new Customer {Name = "dsf", Id = 50},
                new Customer {Name = "Anu", Id = 51},
                new Customer {Name = "Heidar", Id = 52},
                new Customer {Name = "Attasit1", Id = 53},
                new Customer {Name = "ธีรพงศ์", Id = 54},
                new Customer {Name = "Scott", Id = 55},
                new Customer {Name = "Saido", Id = 56},
                new Customer {Name = "James", Id = 57},
                new Customer {Name = "Gareth", Id = 58},
                new Customer {Name = "David", Id = 59},
                new Customer {Name = "Emily", Id = 60},
                new Customer {Name = "Khandi", Id = 61},
                new Customer {Name = "Jonathan", Id = 62},
                new Customer {Name = "Anna", Id = 63},
                new Customer {Name = "John", Id = 64},
                new Customer {Name = "Jasika", Id = 65},
                new Customer {Name = "Mark", Id = 66},
                new Customer {Name = "Nantawan", Id = 67},
                new Customer {Name = "M", Id = 68},
                new Customer {Name = "Sub1", Id = 69},
                new Customer {Name = "Sub2", Id = 70},
                new Customer {Name = "Michael", Id = 71},
                new Customer {Name = "Chris", Id = 72},
                new Customer {Name = "Joe", Id = 73},
                new Customer {Name = "Jeff", Id = 74},
                new Customer {Name = "Roberto", Id = 75},
                new Customer {Name = "Peter", Id = 76},
                new Customer {Name = "Nina", Id = 77},
                new Customer {Name = "Charlie", Id = 78},
                new Customer {Name = "Dee", Id = 79},
                new Customer {Name = "Noopook", Id = 80},
                new Customer {Name = "Noona", Id = 81},
                new Customer {Name = "KraToi", Id = 82},
                new Customer {Name = "KraTae", Id = 83},
                new Customer {Name = "Pooh", Id = 84},
                new Customer {Name = "Tiger", Id = 85},
                new Customer {Name = "Mile", Id = 86},
                new Customer {Name = "Hunny", Id = 87},
                new Customer {Name = "Pilet", Id = 88},
                new Customer {Name = "Eeyore", Id = 89},
                new Customer {Name = "Dominic", Id = 90},
                new Customer {Name = "Amaury", Id = 91},
                new Customer {Name = "Sara", Id = 92},
                new Customer {Name = "Lincoln", Id = 93},
                new Customer {Name = "Anthony", Id = 94},
                new Customer {Name = "Benjamin", Id = 95},
                new Customer {Name = "Brad", Id = 96},
                new Customer {Name = "Charles", Id = 97},
                new Customer {Name = "Brett", Id = 98},
                new Customer {Name = "DARAWAN", Id = 99},
                new Customer {Name = "DARAWAN", Id = 100},
                new Customer {Name = "SI THU", Id = 101},
                new Customer {Name = "SI THU2", Id = 102},
                new Customer {Name = "SI THU3", Id = 103},
                new Customer {Name = "SI THU4", Id = 104},
                new Customer {Name = "Jone", Id = 105},
                new Customer {Name = "Jone2", Id = 106},
                new Customer {Name = "Jone3TEST", Id = 107},
                new Customer {Name = "XGGH", Id = 108},
            };
        }

        private void BindGrid()
        {
            var pageIndex = 0;
            var pageSize = 10;

            var skip = pageIndex * pageSize;

            gvCustomers.DataSource = SessionData.Skip(skip).Take(pageSize).ToList();
            gvCustomers.DataBind();
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            //gvCustomers.EditIndex = e.NewEditIndex;
            //BindGrid();
        }

        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            var data = SessionData;

            var index = gvCustomers.EditIndex;
            var row = gvCustomers.Rows[index];
            var t1 = row.FindControl("TextBox1") as TextBox;

            data[index].Name = t1.Text;

            gvCustomers.EditIndex = -1;
            BindGrid();
        }

        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {

        }

        protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            gvCustomers.EditIndex = -1;
            BindGrid();
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<Customer> GetCustomers(int pageIndex)
        {
            var datas = (List<Customer>)HttpContext.Current.Session["Customer"];

            return datas.Skip(pageIndex * 10).Take(10).ToList();
        }

        protected void Edit(object sender, CommandEventArgs e)
        {

        }

        protected void LinkEdit_Click(object sender, EventArgs e)
        {
            var handler = (LinkButton)sender;
            gvCustomers.EditIndex = Convert.ToInt32(handler.CommandArgument);
            BindGrid();
        }
    }
}