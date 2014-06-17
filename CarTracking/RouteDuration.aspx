<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RouteDuration.aspx.cs"
    Inherits="CarTracking.RouteDuration" %>

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
    <link rel="stylesheet" href="hobbit/css/hobbit.css">
    <link href="Scripts/select2.css" rel="stylesheet" type="text/css" />
    <link href="hobbit/css/smarto.css" rel="stylesheet" type="text/css" />
    <script src="hobbit/hobbit-config.js" type="text/javascript"></script>
    <script src="hobbit/hobbit-min.js" type="text/javascript"></script>
    <%--<script src="hobbit/hobbit1.js" type="text/javascript"></script>--%>
    <script src="hobbit/jquery-1.10.2.min.js" type="text/javascript"></script>
    <script src="hobbit/jquery-ui.min.js" type="text/javascript"></script>
    <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
    <script src="hobbit/L.Routing.Line.js" type="text/javascript"></script>
    <script src="hobbit/SmartoScript.js?v2" type="text/javascript"></script>
    <script src="Scripts/select2.js" type="text/javascript"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <!-- Map Stylesheet -->
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
    <div id="map">
    </div>
    Start<input type="text" id="txtStart" value="13.646616,100.680341" />
    End<input type="text" id="txtEnd" value="13.913327,100.604065" /><input type="button"
        value="Route" onclick="findRoute();" />
    <input type="text" id="txtDuration" />
    </form>
    <script type="text/javascript">

        map = H.map("map")
            .setBasemap(1)
            .setCenter(L.latLng(13.728841, 100.580452));

        var directionsService = new google.maps.DirectionsService();

        function findRoute() {

            var startPoint = $("#txtStart").val();
            var endPoint = $("#txtEnd").val();

            var from = startPoint.split(",");
            var to = endPoint.split(",");

            var start = new google.maps.LatLng(from[0], from[1]);
            var end = new google.maps.LatLng(to[0], to[1]);

            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING,
                avoidHighways: false,
                avoidTolls: true,
                durationInTraffic: true // ต้องมี Business license
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    var routes = new Array();
                    var steps = response.routes[0].legs[0].steps;

                    $("#txtDuration").val(response.routes[0].legs[0].duration.text);

                    //smarto.route.addGeometry(routes);
                    //smarto.route.addWaypoints(pin, m);
                    //smarto.route.routeSelected(map, markerId);
                    //btnRefresh.hide();
                }
            });
        }

    </script>
</body>
</html>
