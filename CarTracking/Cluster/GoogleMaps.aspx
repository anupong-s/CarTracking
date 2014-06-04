<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GoogleMaps.aspx.cs" Inherits="CarTracking.Cluster.GoogleMaps" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
    <script src="../Scripts/jquery-1.10.2.min.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../Scripts/markerclusterer.js" type="text/javascript"></script>
    <script src="../Scripts/overlapMarkerSpiderfy.min.js" type="text/javascript"></script>
    <style>
        html, body, #form1
        {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
        #map_canvas
        {
            width: 100%;
            height: 80%;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="map_canvas">
    </div>
    <div style="display: inline-table; width: 120px">
        Current Zoom: <span id="sZoom"></span>
    </div>
    <div style="display: inline-table">
        Disable cluster at zoom:
        <input type="text" id="txtMaxZoom" value="12" style="width: 50px" />
    </div>
    <input type="button" id="btnRefresh" value="Refresh" />
    </form>
</body>
<script type="text/javascript">
    var map;
    var markerCluster;
    var center = new google.maps.LatLng(13.728841, 100.580452);

    function initialize() {
        var mapOptions = {
            zoom: 8,
            center: center
        };
        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

        google.maps.event.addListener(map, 'zoom_changed', function () {
            $("#sZoom").text(map.getZoom());
        });

        var refresh = document.getElementById('btnRefresh');
        google.maps.event.addDomListener(refresh, 'click', getGeopoints);

        getGeopoints();
        $("#sZoom").text(map.getZoom());
    }

    google.maps.event.addDomListener(window, 'load', initialize);

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
        if (markerCluster) {
            markerCluster.clearMarkers();
        }

        var markers = [];
        for (var i = 0; i < d.length; i++) {
            var latLng = new google.maps.LatLng(d[i].Lat, d[i].Lng);
            var marker = new google.maps.Marker({ 'position': latLng, map: map });
            markers.push(marker);
        }

        var mcOptions = { gridSize: 20, maxZoom: $("#txtMaxZoom").val() };
        markerCluster = new MarkerClusterer(map, markers, mcOptions);
        $("#txtMaxZoom").val(markerCluster.getMaxZoom());
    }

</script>
</html>
