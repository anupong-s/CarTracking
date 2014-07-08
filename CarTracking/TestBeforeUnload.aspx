<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TestBeforeUnload.aspx.cs"
    Inherits="CarTracking.TestBeforeUnload" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Scripts/jquery-1.10.2.min.js" type="text/javascript"></script>
    <script src="Scripts/check_browser_close.js.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:Button ID="reload" runat="server" Text="Button" />
        <asp:Button ID="btnGetData" runat="server" OnClick="btnGetData_Click" Text="Get Data"
            OnClientClick="showMessage = false;" />
        <asp:Label ID="lblMessage" runat="server"></asp:Label>
    </div>
    </form>
</body>
</html>

