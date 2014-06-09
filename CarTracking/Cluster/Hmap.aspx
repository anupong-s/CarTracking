<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Hmap.aspx.cs" Inherits="CarTracking.Cluster.Hmap" %>

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
        .divIconMarker
        {
            display: table;
            text-align: center;
        }
        .divIconMarker span
        {
            display: table-cell;
            vertical-align: middle;
            color: white;
        }
        .newMarker-A1
        {
            background-image: url(../images/cluster/a1.png);
            display: table;
            text-align: center;
            width: 53px;
            height: 52px;
        }
        .newMarker-A2
        {
            background-image: url(../images/cluster/a2.png);
            display: table;
            text-align: center;
            width: 60px;
            height: 59px;
        }
        .newMarker-A3
        {
            background-image: url(../images/cluster/a3.png);
            display: table;
            text-align: center;
            width: 66px;
            height: 65px;
        }
        .newMarker-A4
        {
            background-image: url(../images/cluster/a4.png);
            display: table;
            text-align: center;
            width: 78px;
            height: 77px;
        }
        .newMarker-A5
        {
            background-image: url(../images/cluster/a5.png);
            display: table;
            text-align: center;
            width: 90px;
            height: 89px;
        }
        /*B*/
        .newMarker-B1
        {
            background-image: url(../images/cluster/b1.png);
            display: table;
            text-align: center;
            width: 53px;
            height: 52px;
        }
        .newMarker-B2
        {
            background-image: url(../images/cluster/b2.png);
            display: table;
            text-align: center;
            width: 60px;
            height: 59px;
        }
        .newMarker-B3
        {
            background-image: url(../images/cluster/b3.png);
            display: table;
            text-align: center;
            width: 66px;
            height: 65px;
        }
        .newMarker-B4
        {
            background-image: url(../images/cluster/b4.png);
            display: table;
            text-align: center;
            width: 78px;
            height: 77px;
        }
        .newMarker-B5
        {
            background-image: url(../images/cluster/b5.png);
            display: table;
            text-align: center;
            width: 90px;
            height: 89px;
        }
        /*C*/
        .newMarker-C1
        {
            background-image: url(../images/cluster/c1.png);
            display: table;
            text-align: center;
            width: 53px;
            height: 52px;
        }
        .newMarker-C2
        {
            background-image: url(../images/cluster/c2.png);
            display: table;
            text-align: center;
            width: 60px;
            height: 59px;
        }
        .newMarker-C3
        {
            background-image: url(../images/cluster/c3.png);
            display: table;
            text-align: center;
            width: 66px;
            height: 65px;
        }
        .newMarker-C4
        {
            background-image: url(../images/cluster/c4.png);
            display: table;
            text-align: center;
            width: 78px;
            height: 77px;
        }
        .newMarker-C5
        {
            background-image: url(../images/cluster/c5.png);
            display: table;
            text-align: center;
            width: 90px;
            height: 89px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="map">
    </div>
    <div style="display: inline-table; width: 120px">
        Current Zoom: <span id="sZoom"></span>
    </div>
    <div style="display: inline-table">
        Disable cluster at zoom:
        <input type="text" id="txtDisableCluster" value="14" style="width: 50px" />
    </div>
    <div style="display: inline-table">
        Max zoom:
        <input type="text" id="txtMaxZoom" value="15" style="width: 50px" />
    </div>
    <span>
        <input id="Radio1" type="radio" name="cluster" checked="checked" />A</span>
    <span>
        <input id="Radio2" type="radio" name="cluster" />B</span> <span>
            <input id="Radio3" type="radio" name="cluster" />C</span>
    <input type="button" id="btnRefresh" value="Refresh" onclick="getGeopoints()" />
    </form>
</body>
<script type="text/javascript">
    var eCartMaps = 0;
    var markers = [];

    var clusters;
    var options = { showLable: false, cluster: false };

    map = H.map("map")
        .setBasemap(eCartMaps)
        .setCenter(L.latLng(13.728841, 100.580452));

    $(document).ready(function () {
        getGeopoints();
        $("#sZoom").text(map.getZoom());
    });

    map.on('zoomend', function () { $("#sZoom").text(map.getZoom()); });

    function getGeopoints() {
        var maxZoom = $("#txtMaxZoom").val();
        map.setMaxZoom(parseInt(maxZoom));

        $.ajax({
            type: "POST",
            url: "Hmap.aspx/GetHistories",
            data: "{ 'deviceSn': ''}",
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
        if (clusters) {
            clusters.clearLayers();
        }

        //spiderfyOnMaxZoom: true ->ถ้ามี Point ที่จุดเดียวกันหลายๆอัน เมื่อทำการ Click มันจะแตกจุดออกมาให้เห็น
        //และจะสามารถใช้ feature นี้ได้ก็ตอน zoom จนสุด (Max zoom)
        clusters = new L.MarkerClusterGroup({
            maxClusterRadius: 77,
            disableClusteringAtZoom: $("#txtDisableCluster").val(),
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: false,
            iconCreateFunction: function (cluster) {
                var childCount = cluster.getChildCount();
                var size;

                var c = ' newMarker-';
                var iconSize = new L.Point(40, 40);
                if (childCount < 10) {
                    c += changeMarker(1);
                    iconSize = new L.Point(53, 52);
                    size = 'width:53px; height:52px';
                } else if (childCount < 100) {
                    c += changeMarker(2);
                    iconSize = new L.Point(60, 59);
                    size = 'width:60px; height:59px';
                } else if (childCount < 1000) {
                    c += changeMarker(3);
                    iconSize = new L.Point(66, 65);
                    size = 'width:66px; height:65px';
                } else if (childCount < 10000) {
                    c += changeMarker(4);
                    iconSize = new L.Point(78, 77);
                    size = 'width:78px; height:77px';
                } else {
                    c += changeMarker(5);
                    iconSize = new L.Point(90, 89);
                    size = 'width:90px; height:89px';
                }

                return new L.DivIcon({
                    html: '<div class="divIconMarker" style="margin-top: 1px;margin-left: 1px;' + size + '"><span>' + childCount + '</span></div>',
                    className: 'marker-cluster' + c,
                    iconSize: iconSize
                });
            }
        });

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

    function changeMarker(input) {
        if (input == 1) {
            if ($('#Radio1').is(':checked')) {
                return 'A1';
            }
            else if ($('#Radio2').is(':checked')) {
                return 'B1';
            } else {
                return 'C1';
            }
        } else if (input == 2) {
            if ($('#Radio1').is(':checked')) {
                return 'A2';
            }
            else if ($('#Radio2').is(':checked')) {
                return 'B2';
            } else {
                return 'C2';
            }
        } else if (input == 3) {
            if ($('#Radio1').is(':checked')) {
                return 'A3';
            }
            else if ($('#Radio2').is(':checked')) {
                return 'B3';
            } else {
                return 'C3';
            }
        } else if (input == 4) {
            if ($('#Radio1').is(':checked')) {
                return 'A4';
            }
            else if ($('#Radio2').is(':checked')) {
                return 'B4';
            } else {
                return 'C4';
            }
        } else {
            if ($('#Radio1').is(':checked')) {
                return 'A5';
            }
            else if ($('#Radio2').is(':checked')) {
                return 'B5';
            } else {
                return 'C5';
            }
        }
    }
</script>
</html>
