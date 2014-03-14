<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Tracking.aspx.cs" Inherits="CarTracking.Tracking" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <meta charset="utf-8" />
    <title>Hobbit</title>
    <meta name="description" content="" />
    <meta name="HandheldFriendly" content="True" />
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta http-equiv="cleartype" content="on" />
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8;" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css"
        rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="hobbit/css/hobbit.css">
    <script src="hobbit/hobbit-config.js" type="text/javascript"></script>
    <script src="hobbit/hobbit-min.js" type="text/javascript"></script>
    <%--<script src="hobbit/hobbit1.js" type="text/javascript"></script>--%>
    <script src="hobbit/jquery-1.10.2.min.js" type="text/javascript"></script>
    <script src="hobbit/jquery-ui.min.js" type="text/javascript"></script>
    <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
    <script src="hobbit/leaflet-routing-machine.js" type="text/javascript"></script>
    <script src="hobbit/L.Routing.OSRM.js" type="text/javascript"></script>
    <script src="hobbit/L.Routing.Line.js" type="text/javascript"></script>
    <script src="hobbit/L.Routing.Itinerary.js" type="text/javascript"></script>
    <script src="hobbit/L.Routing.Control.js" type="text/javascript"></script>
    <script src="hobbit/SmartoScript.js?v2" type="text/javascript"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <style type="text/css">
        html, body, #form1, #map_contain
        {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
        #map
        {
            width: 80%;
            height: 80%;
            float: left;
        }
        #shelf
        {
            top: 200px;
            left: 10px;
        }
        #draggablePin
        {
            position: absolute;
            top: 100px;
            left: 195px;
        }
        
        body
        {
            font-size: 62.5%;
        }
        .ui-dialog
        {
            z-index: 1000 !important;
        }
        .ui-dialog .ui-state-error
        {
            padding: .3em;
        }
    </style>
    <!-- Map Stylesheet -->
    <script type="text/javascript">
        //Object สำหรับเก็บค่า marker และ div สำหรับการลาก marker ออกจาก Map
        var gDrag = {
            jq: {},
            item: {},
            status: 0,
            y: 0,
            x: 0
        };

        function showPin() {
            $("#draggablePin").show();
        }

        function hidePin() {
            $("#draggablePin").hide();
        }

        function canDropable(id) {
            return (id == 'draggablePin' || id == 'gmarker');
        }       
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="map_contain">
        <div id='shelf'>
            <img id="draggablePin" style="width: 18px; height: 33px; z-index: 10000;" title="Drag on map"
                src='http://www.teawamutu.co.nz/town/2/images/icons/pegman-reset.png' />
        </div>
        <div id="vehicle-contain" style="float: left">
            <h1>
                Vehicle Detail
            </h1>
            <input type="button" id="vehicle-refresh" value="refresh" onclick="calculateDistanceFromPin(smarto.pinId);" />
            <table id="vehicleDetail" class="ui-widget ui-widget-content">
                <thead>
                    <tr class="ui-widget-header ">
                        <th>
                            License Plate
                        </th>
                        <th>
                            Distance (Km)
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div id="map">
        </div>
        <div style="clear: both">
        </div>
        <div style="display: none">
            <input type="button" id="setcenterId" value="Set Center" onclick="OnSetCenter();" />
            <input type="button" id="setMapLayerId" value="Disable street view" onclick="OnDisableControl('streetView');" />
            <input type="button" id="setBaseMapId" value="Disable right click eval" onclick="OnDisableControl('rightclick'); " />
            <input type="button" id="removeMarkerId" value="Remove Markers" onclick="removeMarkers();" />
            <input type="button" id="getLastKnown" value="Get Last Location" onclick="getLocation();" />
        </div>
        <input type="button" id="getVehiclesId" value="Get Vehicles" onclick="getVehicle();" />
        <div id="gmarker" style="width: 15px; height: 15px; z-index: 10000; background-image: url('hobbit/images/ie-spacer.gif');
            background-repeat: round">
        </div>
        <div id="dialog-form" title="Save Your Pin" style="z-index: 30000">
            <fieldset>
                <label for="name">
                    Name
                </label>
                <input type="text" name="name" id="pin-name" class="text ui-widget-content ui-corner-all" />
            </fieldset>
        </div>
    </div>
    <script type="text/javascript">
        var myIconUrl = '<%= MyIcon %>';
        map = H.map("map");

        $("#dialog-form").dialog({
            autoOpen: false,
            height: 120,
            width: 350,
            modal: false,
            resizable: false,
            buttons: {
                "Save": function () {
                    var pinName = $("#pin-name").val();
                    var marker = map._layers[smarto.pinId];
                    var latLng = marker._latlng;

                    $.ajax({
                        type: "POST",
                        url: "Tracking.aspx/SavePin",
                        data: "{ 'pinName': '" + pinName + "','lat': '" + latLng.lat + "','lng': '" + latLng.lng + "'}",
                        contentType: "application/json",
                        success: function () {
                            alert('Successfully');
                            $("#dialog-form").dialog("close");
                        },
                        error: function (xhr) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        }
                    });
                }
            }
        });

        $("#dialog-form").draggable({ disabled: false });

        $(document).ready(function () {
            //map.setCenter([13.756, 100.566]);
            //map.setZoom(20);
            //map.setBasemap(smarto.mapSourceEnum.EcartMaps);

            //fitBound();
            //addCluster();
            //addMarker();
        });

        $(document).ready(function () {
            document.oncontextmenu = function () { return false; };

            gDrag.jq = $('#gmarker');
            gDrag.jq.mousedown(function (e) {
                if (e.button == 2) {
                    $("#dialog-form").dialog("open");
                    return false;
                }
                return true;
            });

            $("#draggablePin").draggable({
                helper: 'clone',
                containment: "#form1",
                stop: function () { }
            });

            $("#map").droppable({
                drop: function (e, ui) {
                    if (!canDropable(ui.draggable.attr("id"))) { return false; }

                    //ลาก pin มาวางแล้วทำการสร้าง marker

                    var leftWidth = $("#vehicle-contain").width();
                    var pinHeight = 25;

                    var point = L.point(e.pageX - leftWidth, e.pageY + pinHeight);
                    var ll = map.containerPointToLatLng(point);
                    var pin = L.marker([ll.lat, ll.lng], { draggable: false });
                    pin.bindPopup('<div><p>Drag to re-Route</p><p>Drag off the map to remove</p><p>Right Click to save Location</p></div>'); //ใส่ html ไว้สำหรับ Popup
                    var obj = pin.addTo(map);
                    smarto.pinId = obj._leaflet_id; //หา marker var marker = map._layers[smarto.pinId];

                    hidePin();

                    pin.addEventListener('mouseout', function () {
                        pin.closePopup();
                        smarto.isOpenPopup = false;
                    });

                    pin.addEventListener('mouseover', function () {
                        if (!gDrag.jq.hasClass('ui-draggable-dragging')) {

                            if (!smarto.isOpenPopup) {
                                smarto.isOpenPopup = true;
                                pin.openPopup();
                            }

                            gDrag.jq.mouseover(function () {
                                if (!smarto.isOpenPopup) {
                                    smarto.isOpenPopup = true;
                                    pin.openPopup();
                                }
                            });

                            gDrag.jq.mouseout(function () {
                                pin.closePopup();
                                smarto.isOpenPopup = false;
                            });

                            gDrag.item = this;
                            gDrag.jq.offset({
                                top: gDrag.y - 10,
                                left: gDrag.x - 10
                            });

                            gDrag.jq.css('cursor', 'move');
                        }
                    });

                    smarto.route.remove(map);
                    calculateDistanceFromPin(smarto.pinId);
                }
            });

            gDrag.jq.draggable({
                start: function (event, ui) {
                    if (gDrag.item._icon == null) { return false; }

                    gDrag.jq.html('<img src="' + gDrag.item._icon.src + '" style="z-index: 20000;" />');
                    removeMarkerById(gDrag.item._leaflet_id);
                },
                stop: function (event, ui) {
                    gDrag.jq.html('');
                }
            });

            $(document).mousemove(function (event) {
                gDrag.x = event.pageX;
                gDrag.y = event.pageY;
            });

            $("#map_contain").droppable({
                accept: "#gmarker",
                activeClass: "drophere",
                hoverClass: "dropaccept",
                drop: function (event, ui, item) {

                    if (smarto.pinId == gDrag.item._leaflet_id) {
                        removeMarkerById(gDrag.item._leaflet_id);
                        map.removeLayer(smarto.circle);
                        smarto.pinId = 0;
                        showPin();
                        clearVehicleDetail();
                    }

                    gDrag.jq.css('cursor', 'default');
                }
            });
        });

        function calculateDistanceFromPin(pinId) {
            if (pinId <= 0) { return; }

            var pin = map._layers[pinId];
            var ll = pin._latlng;

            for (var i = 0; i < smarto.markers.length; i++) {
                var m = smarto.markers[i];
                vehicleDistance(m, [L.latLng(ll.lat, ll.lng), L.latLng(m._latlng.lat, m._latlng.lng)]);
            }
        }

        function addMarker() {
            map.setCenter([13.716466, 100.572879]);

            var myIcon = L.icon({
                iconUrl: myIconUrl
            });

            var d = new L.Marker([13.716466, 100.572879], { draggable: true, icon: myIcon });
            d.bindLabel('name', { noHide: true });
            d.showLabel();
            map.addLayer(d);
        }

        function addCluster() {
            var cluster = new L.MarkerClusterGroup();

            L.marker([13.756, 100.566]).addTo(cluster);
            L.marker([13.795, 100.532]).addTo(cluster);
            L.marker([13.770, 100.563]).addTo(cluster);

            map.addLayer(cluster);
        }

        function fitBound() {

            var markers = new Array();
            markers.push(L.latLng(18.7878861, 98.9930942));
            markers.push(L.latLng(8.0818592, 99.0015174));

            L.marker([18.7878861, 98.9930942]).bindLabel('18.7878861,98.9930942', { noHide: true }).showLabel().addTo(map);
            L.marker([8.0818592, 99.0015174]).bindLabel('8.0818592,99.0015174', { noHide: true }).showLabel().addTo(map);

            var bounds = L.latLngBounds(markers);

            map.fitBounds(bounds);
            var maxZoom = map.getZoom();
            map.setZoom(maxZoom - smarto.fitBoundZoomout);
        }

        function OnSetMapLayer() {
            map.setMapLayer(1, 'road');
        }

        function OnSetBaseMap() {
            map.setBasemap(2);
        }

        function OnDisableControl(controlName) {
            var cmd = 'map.control.' + controlName + '.disable()';
            eval(cmd);
        }

        function removeMarkers() {
            for (var i = (smarto.markers.length - 1); i >= 0; i--) {
                var id = smarto.markers[i];
                var marker = map._layers[id];
                if (marker || "") {
                    map.removeLayer(marker);
                    smarto.markers.splice(i, 1);
                }
            }
        }

        function removeMarkerById(id) {
            var marker = map._layers[id];
            if (marker || "") {
                map.removeLayer(marker);
                for (var i = 0; i <= smarto.markers.length; i++) {
                    var markerId = smarto.markers[i];
                    if (markerId == id) {
                        smarto.markers.splice(i, 1);
                    }
                }
            }
        }

        function OpenPopupOnMap() {
            map.openPopup("<div>test</div>", L.latLng(13.728637, 100.580805));
        }

        function getVehicle() {
            $.ajax({
                type: "POST",
                url: "Tracking.aspx/GetVehicles",
                context: this,
                data: '',
                contentType: "application/json",
                crossDomain: false,
                success: function (a) {

                    removeMarkers();

                    var veh = a.d;
                    var markers = new Array();
                    for (var i = 0; i < veh.length; i++) {
                        var v = veh[i];
                        var marker = L.marker([v.Lat, v.Lng])
                            .bindLabel(v.Lp, { noHide: true })
                            .showLabel();

                        marker.Id = v.Id;
                        marker.Lp = v.Lp;
                        marker.DevSn = v.DevSn;
                        marker.addTo(map);

                        smarto.markers.push(marker);
                        markers.push(L.latLng(v.Lat, v.Lng));
                    }

                    var bounds = L.latLngBounds(markers);
                    map.fitBounds(bounds);
                    var maxZoom = map.getZoom();
                    map.setZoom(maxZoom - smarto.fitBoundZoomout);
                },
                error: function (xhr) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                }
            });
        }

        function clearVehicleDetail() {
            $("#vehicleDetail tbody").empty();
        }

        function vehicleDistance(marker, waypoints) {
            var directionsService = new google.maps.DirectionsService();

            var start = new google.maps.LatLng(waypoints[0].lat, waypoints[0].lng);
            var end = new google.maps.LatLng(waypoints[1].lat, waypoints[1].lng);

            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };

            clearVehicleDetail();
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    var distance = response.routes[0].legs[0].distance.text;

                    $("#vehicleDetail tbody").append("<tr style=\"cursor:pointer\" onclick=\" directionPath('" + marker.Id + "'); \">" +
                                "<td>" + marker.Lp + "</td>" +
                                "<td>" + distance + "</td>" +
                                "</tr>");
                }
            });
        }

        function directionPath(markerId) {
            var marker = getMarkerById(markerId);
            var pin = getMarkerPin();

            var directionsService = new google.maps.DirectionsService();

            var start = new google.maps.LatLng(pin._latlng.lat, pin._latlng.lng);
            var end = new google.maps.LatLng(marker._latlng.lat, marker._latlng.lng);

            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    var paths = response.routes[0].overview_path;
                    smarto.route.addGeometry(paths);
                    smarto.route.addWaypoints(pin._latlng, marker._latlng);
                    smarto.route.routeSelected(map);
                }
            });
        }

        function removeLine() {
            smarto.route.routeRemove(map);

        }

    </script>
    </form>
</body>
</html>
