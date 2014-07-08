<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TestGeofence.aspx.cs" Inherits="CarTracking.Test.TestGeofence" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta name="description" content="" />
    <meta name="HandheldFriendly" content="True" />
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta http-equiv="cleartype" content="on" />
    <meta http-equiv="X-UA-Compatible" content="IE=9;" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css"
        rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="../hobbit/css/hobbit.css">
    <link href="../Scripts/select2.css" rel="stylesheet" type="text/css" />
    <link href="../hobbit/css/smarto.css" rel="stylesheet" type="text/css" />
    <script src="../hobbit/hobbit-config.js" type="text/javascript"></script>
    <script src="../hobbit/hobbit1.js" type="text/javascript"></script>
    <%--<script src="hobbit/hobbit1.js" type="text/javascript"></script>--%>
    <script src="../hobbit/jquery-1.10.2.min.js" type="text/javascript"></script>
    <script src="../hobbit/jquery-ui.min.js" type="text/javascript"></script>
    <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
    <script src="../hobbit/L.Routing.Line.js" type="text/javascript"></script>
    <script src="../hobbit/SmartoScript.js?v2" type="text/javascript"></script>
    <script src="../Scripts/select2.js" type="text/javascript"></script>
    <script src="../Scripts/Leaflet.draw.js" type="text/javascript"></script>
    <script src="../Scripts/Edit.Poly.js" type="text/javascript"></script>
    <script src="../Scripts/Edit.SimpleShape.js" type="text/javascript"></script>
    <script src="../Scripts/Edit.Circle.js" type="text/javascript"></script>
    <script src="../Scripts/Edit.Rectangle.js" type="text/javascript"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <style type="text/css">
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
    <div id="map">
    </div>
    <div>
        <input type="button" value="Circle" onclick="createCircle();" />
        <input type="button" value="GetRadius" onclick="getRadius();" />
        <input type="button" value="Remove circle" onclick="removeCircle();" />
    </div>
    <div>
        <input type="button" value="Rectangle" onclick="createRectangle();" />
        <input type="button" value="GetRadius" onclick="getLatLng();" />
        <input type="button" value="Remove rectangle" onclick="removeRectangle();" />
        <input type="button" value="Create marker1" onclick="createMarker1();" />
        <input type="button" value="Create marker2" onclick="createMarker2();" />
        <input type="button" value="Create center Rectangle" onclick="createMarker3();" />
        <input type="button" value="Create Rectangle by LatLng" onclick="createRectangleByLatLng();" />
        <input type="button" value="New Point" onclick="newPoint();" />
    </div>
    </form>
</body>
</html>
<script type="text/javascript">
    var circle = null;
    var rectangle = null;

    map = H.map("map")
            .setBasemap(1)
            .setCenter(L.latLng(13.728841, 100.580452));

    function createCircle() {
        debugger
        var option = { color: "FFFF00" };
        circle = L.circle([13.728841, 100.580452], 600, option);

        circle.editing.enable();

        map.addLayer(circle);
    }

    function getRadius() {
        debugger;
        alert(circle.getRadius());
    }

    function removeCircle() {
        if (circle) {
            map.removeLayer(circle);
        }
    }

    function createRectangle() {
        debugger
        var latLng1 = map.getCenter();

        rectangle = L.rectangle([[latLng1.lat, latLng1.lng], [latLng1.lat - 0.01, latLng1.lng - 0.01]]);

        rectangle.editing.enable();

        map.addLayer(rectangle);
    }

    function getLatLng() {
        debugger;

        var bound = rectangle.getBounds();
        var northEast = bound.getNorthEast();
        var southWest = bound.getSouthWest();

    }

    function removeRectangle() {
        if (rectangle) {
            map.removeLayer(rectangle);
        }
    }

    function createMarker1() {
        debugger;
        //North East
        var bound = rectangle.getBounds();
        var northEast = bound.getNorthEast();

        var lat = northEast.lat;
        var lng = northEast.lng;
        var marker = L.marker([lat, lng]);
        map.addLayer(marker);
    }

    function createMarker2() {
        debugger;
        var bound = rectangle.getBounds();
        var southWest = bound.getSouthWest();

        var lat = southWest.lat;
        var lng = southWest.lng;
        var marker = L.marker([lat, lng]);
        map.addLayer(marker);
    }

    function createMarker3() {
        debugger
        var center = rectangle.getBounds().getCenter();

        var marker = L.marker([center.lat, center.lng]);
        map.addLayer(marker);

    }

    function createRectangleByLatLng() {
        debugger
        var northEast = L.latLng(13.732047994663466, 100.579833984375);
        var southWest = L.latLng(13.722047994663466, 100.569833984375);

        rectangle = L.rectangle([northEast, southWest]);

        map.addLayer(rectangle);
    }

    /*Calculate new latitude and longitude*/
    function ComputeLatLng(vLatitude, vLongitude, vAngle, vDistance) {
        var vNewLatLng = [];
        vDistance = vDistance / 6371;
        vAngle = ToRad(vAngle);

        var vLat1 = ToRad(vLatitude);
        var vLng1 = ToRad(vLongitude);

        var vNewLat = Math.asin(Math.sin(vLat1) * Math.cos(vDistance) +
                          Math.cos(vLat1) * Math.sin(vDistance) * Math.cos(vAngle));

        var vNewLng = vLng1 + Math.atan2(Math.sin(vAngle) * Math.sin(vDistance) * Math.cos(vLat1),
                                  Math.cos(vDistance) - Math.sin(vLat1) * Math.sin(vNewLat));

        if (isNaN(vNewLat) || isNaN(vNewLng)) {
            return null;
        }

        vNewLatLng[0] = ToDeg(vNewLat);
        vNewLatLng[1] = ToDeg(vNewLng);

        return vNewLatLng;
    }

    function ToRad(vInput) {
        return vInput * Math.PI / 180;
    }


    function ToDeg(vInput) {
        return vInput * 180 / Math.PI;
    }

    function newPoint() {
        debugger
        var center = circle._latlng;
        var radius = circle.getRadius();

        var newLatlng = ComputeLatLng(center.lat, center.lng, 0, radius/1000);
        var marker1 = L.marker([newLatlng[0], newLatlng[1]]);
        map.addLayer(marker1);

    }
    
</script>
