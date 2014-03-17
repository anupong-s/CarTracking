<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TestGrid.aspx.cs" Inherits="CarTracking.TestGrid" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Scripts/jquery-1.11.0.min.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <div id="dvGrid" style="width: 500px; height: 108px; overflow: auto;">
        <asp:UpdatePanel runat="server">
            <ContentTemplate>
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
                        <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" />
                    </Columns>
                </asp:GridView>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
    <asp:Button ID="Button1" runat="server" Text="Button" OnClick="Button1_Click" />
    <asp:HiddenField ID="hdnScrollPos" EnableViewState="True" runat="server" />
    <asp:HiddenField ID="hdnPageIndex" EnableViewState="True" runat="server" />
    <asp:HiddenField ID="hdnPageSize" EnableViewState="True" runat="server" />
    </form>
    <script type="text/javascript">
        var pageIndex = 0;
        var pageCount = '<%= PageCount %>';
        var scrollPos = $("#hdnScrollPos");
        var hdPageIndex = $("#hdnPageIndex");

        $(document).ready(function () {
            if (scrollPos.val()) {
                $("#dvGrid").scrollTop(parseInt(scrollPos.val()));
            }

            if (hdPageIndex.val()) {
                pageIndex = hdPageIndex.val();
            }
        });

        $("#dvGrid").on("scroll", function (e) {
            var $o = $(e.currentTarget);
            if ($o[0].scrollHeight - $o.scrollTop() <= $o.outerHeight()) {
                scrollPos.val($o.scrollTop());
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

                hdPageIndex.val(pageIndex);
                __doPostBack('Button1', '');
            }
        }

    </script>
</body>
</html>
