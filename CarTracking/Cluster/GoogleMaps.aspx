<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GoogleMaps.aspx.cs" Inherits="CarTracking.Cluster.GoogleMaps" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&language=th"></script>
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
        <input type="text" id="txtDisableCluster" value="12" style="width: 50px" />
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
    <input type="button" id="btnRefresh" value="Refresh" />
    </form>
</body>
<script type="text/javascript">
    var map;
    var markerCluster;
    var center = new google.maps.LatLng(13.728841, 100.580452);

    function initialize() {
        var mapOptions = {
            zoom: 10,
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

        var maxZoom = getMaxZoom();
        map.setOptions({ maxZoom: maxZoom });

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
        if (markerCluster) {
            markerCluster.clearMarkers();
        }

        var markers = [];
        for (var i = 0; i < d.length; i++) {
            var latLng = new google.maps.LatLng(d[i].Lat, d[i].Lng);
            var marker = new google.maps.Marker({ 'position': latLng, map: map });
            markers.push(marker);
        }

        //var mcOptions = { gridSize: 20, maxZoom: $("#txtMaxZoom").val() };

        var url1 = changeMarker(1);
        var url2 = changeMarker(2);
        var url3 = changeMarker(3);
        var url4 = changeMarker(4);
        var url5 = changeMarker(5);

        mcOptions = { gridSize: 60, maxZoom: $("#txtDisableCluster").val(), styles: [
                {
                    height: 52,
                    url: url1,
                    width: 53,
                    textColor: 'white'
                },
                {
                    height: 59,
                    url: url2,
                    width: 60,
                    textColor: 'white'
                },
                {
                    height: 65,
                    url: url3,
                    width: 66,
                    textColor: 'white'
                },
                {
                    height: 77,
                    url: url4,
                    width: 78,
                    textColor: 'white'
                },
                {
                    height: 89,
                    url: url5,
                    width: 90,
                    textColor: 'white'
                }
            ]
        };

        markerCluster = new MarkerClusterer(map, markers, mcOptions);
        //$("#txtMaxZoom").val(markerCluster.getMaxZoom());
    }

    function changeMarker(input) {
        if (input == 1) {
            if ($('#Radio1').is(':checked')) {
                return 'http://localhost:11630/images/cluster/a1.png';
            } else if ($('#Radio2').is(':checked')) {
                return 'http://localhost:11630/images/cluster/b1.png';
            } else {
                return 'http://localhost:11630/images/cluster/c1.png';
            }
        } else if (input == 2) {
            if ($('#Radio1').is(':checked')) {
                return 'http://localhost:11630/images/cluster/a2.png';
            } else if ($('#Radio2').is(':checked')) {
                return 'http://localhost:11630/images/cluster/b2.png';
            } else {
                return 'http://localhost:11630/images/cluster/c2.png';
            }
        } else if (input == 3) {
            if ($('#Radio1').is(':checked')) {
                return 'http://localhost:11630/images/cluster/a3.png';
            } else if ($('#Radio2').is(':checked')) {
                return 'http://localhost:11630/images/cluster/b3.png';
            } else {
                return 'http://localhost:11630/images/cluster/c3.png';
            }
        } else if (input == 4) {
            if ($('#Radio1').is(':checked')) {
                return 'http://localhost:11630/images/cluster/a4.png';
            } else if ($('#Radio2').is(':checked')) {
                return 'http://localhost:11630/images/cluster/b4.png';
            } else {
                return 'http://localhost:11630/images/cluster/c4.png';
            }
        } else {
            if ($('#Radio1').is(':checked')) {
                return 'http://localhost:11630/images/cluster/a5.png';
            } else if ($('#Radio2').is(':checked')) {
                return 'http://localhost:11630/images/cluster/b5.png';
            } else {
                return 'http://localhost:11630/images/cluster/c5.png';
            }
        }
    }

    function getMaxZoom() {
        return  $("#txtMaxZoom").val();
    }

</script>
</html>
