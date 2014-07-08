<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="TestDoPostBack.aspx.cs" Inherits="CarTracking.Test.TestDoPostBack" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <asp:UpdatePanel runat="server" ID="udptext">
        <ContentTemplate>
            <asp:TextBox runat="server" ID="txtBox1" AutoPostBack="True" OnTextChanged="txtBox1_TextChanged"></asp:TextBox>
            <asp:Label runat="server" ID="lblMessage"></asp:Label>
            <asp:Button runat="server" ID="btnTest" Text="Refresh" OnClientClick="postBack(); return false;" />
        </ContentTemplate>
    </asp:UpdatePanel>
    <script type="text/javascript">
        function postBack() {
            debugger;
            var btnName = $get("<%=btnTest.ClientID%>").name;
            __doPostBack(btnName, '');
        }
    </script>
</asp:Content>
