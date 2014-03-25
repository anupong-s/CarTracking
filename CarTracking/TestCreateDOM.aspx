<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TestCreateDOM.aspx.cs"
    Inherits="CarTracking.TestCreateDOM" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="hobbit/jquery-1.10.2.min.js" type="text/javascript"></script>
    <script src="hobbit/hobbit1.js" type="text/javascript"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <style type="text/css">
        .hd-strv-main
        {
            background-color: red;
            position: absolute;
            width: 300px;
            height: 300px;
            z-index: 99999;
            bottom: 0;
            left: 0;
        }
        .hd-strv-close
        {
            top: 0;
            right: 0;
            width: 30px;
            position: absolute;
            height: 30px;
            z-index: 9999;
            background-color: black;
            float: left;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dvContainer">
    </div>
    </form>
    <script type="text/javascript">
        $(document).ready(function () {
            var container = $("#form1");
            var dv = L.DomUtil.create("div", "hd-strv-main");
            var dvClose = L.DomUtil.create("div", "hd-strv-close");
            dv.appendChild(dvClose);
            container.html(dv);

        });
    </script>
</body>
</html>
