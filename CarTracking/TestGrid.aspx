<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TestGrid.aspx.cs" Inherits="CarTracking.TestGrid" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Scripts/jquery-1.11.0.min.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dvGrid" style="width: 500px; height: 108px; overflow: auto;">
        <asp:GridView ID="gvCustomers" runat="server" OnRowEditing="GridView1_RowEditing"
            AutoGenerateColumns="False" OnRowDeleting="GridView1_RowDeleting" OnRowUpdating="GridView1_RowUpdating"
            ShowHeader="False" OnRowCancelingEdit="GridView1_RowCancelingEdit">
            <Columns>
                <asp:TemplateField HeaderText="Name">
                    <EditItemTemplate>
                        <asp:TextBox ID="TextBox1" runat="server" Text='<%# Eval("Name") %>'></asp:TextBox>
                    </EditItemTemplate>
                    <ItemTemplate>
                        <asp:Label ID="Label1" ClientIDMode="Static" runat="server" Text='<%# Eval("Name") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField>
                    <ItemTemplate>
                        <asp:LinkButton ID="LinkEdit" runat="server" ClientIDMode="Static" CommandArgument="<%# Container.DataItemIndex %>"
                            Text="<%# Container.DataItemIndex %>" OnClick="LinkEdit_Click" CommandName="Edit"></asp:LinkButton>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:CommandField HeaderText="Action" ShowDeleteButton="True" ShowEditButton="True" />
            </Columns>
        </asp:GridView>
    </div>
    </form>
    <script type="text/javascript">
        var pageIndex = 0;
        var pageCount;

        $("#dvGrid").on("scroll", function (e) {
            var $o = $(e.currentTarget);
            if ($o[0].scrollHeight - $o.scrollTop() <= $o.outerHeight()) {
                GetRecords();
            }
        });

        function GetRecords() {
            pageIndex++;
            if (pageIndex == 1 || pageIndex <= pageCount) {

                //Show Loader
                if ($("[id$=gvCustomers] .loader").length == 0) {
                    var row = $("[id$=gvCustomers] tr").eq(0).clone(true);
                    row.addClass("loader");
                    row.children().remove();
                    row.append('<td colspan = "999" style = "background-color:white"><img id="loader" alt="" src="103.gif" /></td>');
                    $("[id$=gvCustomers]").append(row);
                }
                $.ajax({
                    type: "POST",
                    url: "TestGrid.aspx/GetCustomers",
                    data: '{pageIndex: ' + pageIndex + '}',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    failure: function (response) {
                        alert(response.d);
                    },
                    error: function (response) {
                        alert(response.d);
                    }
                });
            }
        }

        //Function to recieve XML response append rows to GridView
        function OnSuccess(response) {


            //var xmlDoc = $.parseXML(response.d);
            //var xml = $(xmlDoc);
            //pageCount = parseInt(xml.find("PageCount").eq(0).find("PageCount").text());
            //var customers = xml.find("Customers");
            var customers = response.d;

            $("[id$=gvCustomers] .loader").remove();

            for (var i = 0; i < customers.length; i++) {
                var customer = customers[i];
                var row = $("[id$=gvCustomers] tr").eq(0).clone(true);

                $("#Label1", row).html(customer.Name);
                $("#LinkEdit", row).html(customer.Id);

                $("[id$=gvCustomers]").append(row);
            }
            /*
            customers.each(function () {
            var customer = $(this);
            var row = $("[id$=gvCustomers] tr").eq(0).clone(true);
            $(".name", row).html(customer.find("ContactName").text());
            $(".city", row).html(customer.find("City").text());
            $(".postal", row).html(customer.find("PostalCode").text());
            $(".country", row).html(customer.find("Country").text());
            $("[id$=gvCustomers]").append(row);
            });
            */

            //Hide Loader
            $("#loader").hide();
        }
    </script>
</body>
</html>
