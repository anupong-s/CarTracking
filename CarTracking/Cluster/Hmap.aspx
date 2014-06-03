﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Hmap.aspx.cs" Inherits="CarTracking.Cluster.Hmap" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css"
        rel="stylesheet" type="text/css" />
    <link href="~/hobbit/css/hobbit.css" rel="stylesheet" type="text/css" />
    <script src="../hobbit/hobbit-config.js" type="text/javascript"></script>
    <script src="../hobbit/hobbit-min.js" type="text/javascript"></script>
    <script src="../hobbit/jquery-1.10.2.min.js" type="text/javascript"></script>
    <script src="../hobbit/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../hobbit/SmartoScript.js" type="text/javascript"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <style>
        html, body, #form1
        {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
        #map
        {
            width: 100%;
            height: 80%;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <div id="map">
    </div>
    <input type="button" value="Show Data" onclick="getGeopoints();" />
    </form>
</body>
<script type="text/javascript">
    var eCartMaps = 0;
    var markers = new Array();
    var clusters = new L.MarkerClusterGroup({
        maxClusterRadius: 20,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: false
    });
    var options = { showLable: false, cluster: false };

    map = H.map("map").setBasemap(eCartMaps).setMaxZoom(20);

    function getGeopoints() {

        $.ajax({
            type: "POST",
            url: "Hmap.aspx/GetHistories",
            data: "{ 'deviceSn': '2034667'}",
            context: this,
            crossDomain: false,
            contentType: "application/json",
            success: function (a) {                
                OnSuccess(a.d);
            },
            error: function (xhr) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });

    }

    function OnSuccess(d) {
     
        clusters.clearLayers();
        
        for (var i = 0; i < d.length; i++) {
            var g = d[i];
            var marker = L.marker([g.Lat, g.Lng]);
            marker.Id = g.Id;
            marker.Lp = g.Lp;
            marker.DevSn = g.DevSn;
            marker.Type = g.Type;
            clusters.addLayer(marker);
        }

        map.addLayer(clusters);
    }    
</script>
</html>
