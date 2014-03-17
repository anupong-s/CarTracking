<%@ Page Language="C#" AutoEventWireup="true" EnableViewState="true" CodeBehind="Tracking.aspx.cs"
    Inherits="CarTracking.Tracking" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title>Hobbit</title>
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
    <script src="Scripts/select2.js" type="text/javascript"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <style type="text/css">
        html, body, #form1, #map_contain
        {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            font-family: "Helvetica Neue" , Helvetica, Arial, sans-serif;
            font-size: 12px;
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
            left: 230px;
        }
        
        .ui-dialog
        {
            z-index: 1002 !important;
        }
        .ui-dialog .ui-state-error
        {
            padding: .3em;
        }
        #vehicleDetail tr:hover
        {
            background-color: #3fbdd6;
        }
        
        .dialog-index
        {
            z-index: 1001 !important;
        }
    </style>
    <!-- Map Stylesheet -->
    <script type="text/javascript">
        //Object สำหรับเก็บค่า marker และ div สำหรับการลาก marker ออกจาก Map        
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
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <div id="map_contain">
        <div id='shelf'>
            <img id="draggablePin" alt="pin" style="width: 18px; height: 33px; z-index: 10000;"
                title="Drag on map" src='http://www.teawamutu.co.nz/town/2/images/icons/pegman-reset.png' />
        </div>
        <div id="vehicle-contain" style="float: left">
            <select id="e1" runat="server">
            </select>
            <p style="font-size: 14px">
                Vehicle Detail</p>
            <input type="button" id="vehicle-refresh" value="refresh" onclick="calculateDistanceFromPin(smarto.pinId);" />
            <table id="vehicleDetail" class="ui-widget ui-widget-content">
                <thead>
                    <tr class="ui-widget-header">
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
        <div id="dialog-pins" style="z-index: 30000">
            <div id="dvGrid" style="width: 300px; height: 192px; overflow: auto;">
                <asp:UpdatePanel ID="udpGridViewPin" EnableViewState="True" runat="server" UpdateMode="Conditional">
                    <ContentTemplate>
                        <asp:GridView ID="GridViewPin" runat="server" Width="100%" AutoGenerateColumns="False"
                            OnRowCancelingEdit="GridViewPin_RowCancelingEdit" OnRowDeleting="GridViewPin_RowDeleting"
                            OnRowEditing="GridViewPin_RowEditing" OnRowUpdating="GridViewPin_RowUpdating"
                            ShowHeader="False" DataKeyNames="Id">
                            <Columns>
                                <asp:TemplateField>
                                    <EditItemTemplate>
                                        <asp:TextBox ID="txtPinName1" EnableViewState="True" runat="server" ClientIDMode="Static"
                                            Text='<%# Eval("Name") %>'></asp:TextBox>
                                    </EditItemTemplate>
                                    <ItemTemplate>
                                        <asp:Label ID="LblPinName" ClientIDMode="Static" runat="server" Text='<%# Eval("Name") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" />
                            </Columns>
                        </asp:GridView>
                        <asp:Button ID="BtnRefreshGridViewPin" Style="display: none" runat="server" OnClick="BtnRefreshGridViewPin_Click" />
                        <asp:Button ID="BtnClearGridViewPin" Style="display: none" runat="server" OnClick="BtnClearGridViewPin_Click" />
                    </ContentTemplate>
                </asp:UpdatePanel>
            </div>
        </div>
        <div id="dialog-selected-pin" title="" style="z-index: 30000">
        </div>
    </div>
    <asp:HiddenField ID="hdnScrollPos" EnableViewState="True" runat="server" />
    <asp:HiddenField ID="hdnPageIndex" EnableViewState="True" runat="server" />
    <asp:HiddenField ID="hdnPageSize" EnableViewState="True" runat="server" />
    <script type="text/javascript">
        var myIconUrl = '<%= MyIcon %>';
        var pageIndex = 0;
        var pageCount = 0;
        var scrollPos = $("#hdnScrollPos");
        var hdPageIndex = $("#hdnPageIndex");

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

        $("#dialog-pins").dialog({
            autoOpen: false,
            height: 250,
            width: 320,
            modal: true,
            resizable: false,
            draggable: false,
            closeOnEscape: true,
            close: function () { __doPostBack('BtnClearGridViewPin',''); },                        
        }).parent().appendTo($("form:first"));

        var vehicleSelect = $("#e1");
        vehicleSelect.select2({ width: "80%" });
        vehicleSelect.click(function () {
            var data = $("#e1").select2("data");
            delete data.element;
            alert("Selected data is: " + data.text);
        });

        $(document).ready(function () {
            document.oncontextmenu = function () { return false; };

            gDrag.jq = $('#gmarker');
            gDrag.jq.mousedown(function (e) {
                //right click
                $(window).mousemove(function () {
                    smarto.isDragging = true;
                    $(window).unbind("mousemove");
                });

                if (e.button == 2) {
                    $("#dialog-pins").dialog("close");
                    $("#dialog-form").dialog("open");
                    return false;
                }
                return true;
            });

            gDrag.jq.mouseup(function (e) {
                var wasDragging = smarto.isDragging;
                smarto.isDragging = false;
                $(window).unbind("mousemove");
                if (!wasDragging && e.button != 2) {
                    $("#dialog-pins").dialog("open");
                    $(".ui-widget-overlay").removeClass('dialog-index').addClass('dialog-index');
                    pageCount = '<%=PinCount %>';
                    smarto.Pin.refresh();
                }
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

                    pin.addEventListener('click', function () {
                        alert('left click');
                    });

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
                    var value = response.routes[0].legs[0].distance.value;
                    var text = response.routes[0].legs[0].distance.text;
                    smarto.vehicles.addDistance(marker.Id, marker.Lp, value, text);
                    smarto.vehicles.bindVehicleDetail();
                }
            });
        }

        //วาดเส้นบน map
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

        $("#dvGrid").on("scroll", function (e) {
            var $o = $(e.currentTarget);
            if ($o[0].scrollHeight - $o.scrollTop() <= $o.outerHeight()) {
                scrollPos.val($o.scrollTop());
                GetRecords();
            }
        });

        function GetRecords() {
            pageIndex++;
            if (pageIndex == 1 || pageIndex <= pageCount) {

                //Show Loader
                if ($("[id$=gvCustomers] .loader").length == 0) {
                    var row = $("[id$=gvCustomers] tr").eq(0).clone(true);
                    row.addClass("loader");
                    row.children().remove();
                    row.append('<td colspan = "999" style = "background-color:white"><img id="loader" alt="" src="103.gif" /></td>');
                    $("[id$=gvCustomers]").append(row);
                }

                hdPageIndex.val(pageIndex);
                smarto.Pin.refresh();
            }
        }
    </script>
    </form>
</body>
</html>
