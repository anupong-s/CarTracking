var smarto = function () { };
smarto.fitBoundZoomout = 1;
smarto.markers = new Array();
smarto.rightClick = 2;
smarto.mapSourceEnum = {
    EcartMaps: 0,
    GoogleMaps: 1,
    YahooMaps: 2
};

var gDrag = {
    jq: {},
    item: {},
    status: 0,
    y: 0,
    x: 0
};

smarto.isOpenPopup = false;
smarto.pinId = 0;
smarto.freezeMap = false; //ยกเลิกการ set center เวลา tracking
smarto.route = {
    geometry: new Array(),
    waypoints: new Array(),
    addGeometry: function (paths) {
        this.geometry = new Array();

        for (var i = 0; i < paths.length; i++) {
            this.geometry.push([paths[i].k, paths[i].A]);
        }
    },
    addWaypoints: function (start, end) {
        this.waypoints = new Array();
        this.waypoints.push(start);
        this.waypoints.push(end);
    },
    routeSelected: function (map) {
        this._map = map;
        if (this._line) {
            var layers = this._line._layers;
            for (var v = 0; v < layers.length; v++) {
                this._map.removeLayer(layers[v]);
            }
        }

        this._line = new L.Routing.Line(smarto.route);
        this._line.onAdd(map);
        this._line._route.geometry = new Array();
        this.geometry = new Array();
    },
    remove: function (map) {
        this._map = map;
        if (this._line) {
            var layers = this._line._layers;
            for (var v = 0; v < layers.length; v++) {
                this._map.removeLayer(layers[v]);
            }
        }
    }

};
smarto.vehicles = {
    _vehicleId: 0,
    _markers: new Array(), //ใช้สำหรับ vehicle detail
    _isFreezeCenter: false,
    _culster: new L.MarkerClusterGroup(),
    _latlngs: {
        lastPoint: [],
        currentPoint: []
    },
    getVehicle: function () {
        $.ajax({
            type: "POST",
            url: "Tracking.aspx/GetVehicles",
            context: this,
            data: '',
            contentType: "application/json",
            crossDomain: false,
            success: function (a) {

                this.removeMarkers();

                var veh = a.d;
                var markers = new Array();
                for (var i = 0; i < veh.length; i++) {
                    var g = veh[i];
                    this.createMarker(g);
                    markers.push(L.latLng(g.Lat, g.Lng));
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
    },
    createMarker: function (g) {
        var marker = L.marker([g.Lat, g.Lng])
                                .bindLabel(g.Lp, { noHide: true })
                                .showLabel();

        marker.Id = g.Id;
        marker.Lp = g.Lp;
        marker.DevSn = g.DevSn;
        marker.addTo(this._culster);
        map.addLayer(this._culster);

        smarto.markers.push(marker);
        return marker;
    },
    removeMarkers: function () {
        for (var i = (smarto.markers.length - 1); i >= 0; i--) {
            var id = smarto.markers[i];
            var marker = map._layers[id];
            if (marker || "") {
                map.removeLayer(marker);
                smarto.markers.splice(i, 1);
            }
        }
    },
    removeMarkerById: function (id) {
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
    },
    addDistance: function (id, lp, val, text) {
        this._markers.push({ Id: id, Lp: lp, val: val, Text: text });
    },
    bindVehicleDetail: function () {
        if (this._markers.length == smarto.markers.length) {

            this._markers.sort(function (a, b) { return a.val - b.val; });
            for (var v = 0; v < this._markers.length; v++) {

                var m = this._markers[v];
                $("#vehicleDetail tbody").append(
                    "<tr style=\"cursor:pointer\" onclick=\" + smarto.vehicles.directionPath('" + m.Id + "'); \">" +
                    "<td>" + m.Lp + "</td>" +
                    "<td>" + m.Text + "</td>" +
                    "</tr>");

                $('#vehicleDetail tr').click(function () {
                    $('#vehicleDetail tr').removeClass("active");
                    $(this).addClass("active");
                });
            }

            this._markers = new Array();
            smarto.Pin.wasDropPin = false;
        }
    },
    clearVehicleDetail: function () {
        $("#vehicleDetail tbody").empty();
    },
    calculateDistanceFromPin: function (pinId) {
        if (pinId <= 0 || smarto.markers.length <= 0) {
            smarto.Pin.wasDropPin = false;
            return;
        }

        var pin = map._layers[pinId];
        var ll = pin._latlng;

        for (var i = 0; i < smarto.markers.length; i++) {
            var m = smarto.markers[i];
            this.vehicleDistance(m, [L.latLng(ll.lat, ll.lng), L.latLng(m._latlng.lat, m._latlng.lng)]);
        }
    },
    directionPath: function (markerId) {
        //วาดเส้นบน map
        var marker = getMarkerById(markerId);
        var m = map._layers[marker._leaflet_id];
        var pin = getMarkerPin();

        var directionsService = new google.maps.DirectionsService();

        var start = new google.maps.LatLng(pin._latlng.lat, pin._latlng.lng);
        var end = new google.maps.LatLng(m._latlng.lat, m._latlng.lng);

        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };
        /*
        directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
        var paths = response.routes[0].overview_path;
        smarto.route.addGeometry(paths);
        smarto.route.addWaypoints(pin._latlng, marker._latlng);
        smarto.route.routeSelected(map);
        btnRefresh.hide();
        }
        });
        */

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                var routes = new Array();
                var steps = response.routes[0].legs[0].steps;
                for (var i = 0; i < steps.length; i++) {
                    var paths = steps[i].path;
                    for (var j = 0; j < paths.length; j++) {
                        routes.push(paths[j]);
                    }
                }
                smarto.route.addGeometry(routes);

                smarto.route.addWaypoints(pin, m);
                smarto.route.routeSelected(map);
                btnRefresh.hide();
            }
        });

    },
    vehicleDistance: function (marker, waypoints) {
        var directionsService = new google.maps.DirectionsService();

        var start = new google.maps.LatLng(waypoints[0].lat, waypoints[0].lng);
        var end = new google.maps.LatLng(waypoints[1].lat, waypoints[1].lng);

        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };

        this.clearVehicleDetail();
        var context = this;
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                var value = response.routes[0].legs[0].distance.value;
                var text = response.routes[0].legs[0].distance.text;
                context.addDistance(marker.Id, marker.Lp, value, text);
                context.bindVehicleDetail();
            }
        });
    },
    showDetail: function (element) {
        element.show();
    },
    hideDetail: function (element) {
        element.hide();
    },
    selectVehicleId: function (id) {
        this._vehicleId = id;
    },
    realTimeTracking: function () {
        if (this._vehicleId <= 0) {
            alert('Please select vehicle for tracking.');
            return false;
        }

        var _marker = getMarkerById(this._vehicleId);

        $.ajax({
            type: "POST",
            url: "Tracking.aspx/GetLastKnowLocation",
            data: "{ 'deviceSn': '" + _marker.DevSn + "'}",
            context: this,
            contentType: "application/json",
            success: function (a) {
                this._realTimeSuccess(a.d);
            },
            error: function (xhr) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    },
    _realTimeSuccess: function (d) {
        this.createMarker(d);
        if (!map.getBounds().contains(L.latLng(d.Lat, d.Lng))) {
            // marker is within map bounds
            if (!this._isFreezeCenter) {
                map.setView(L.latLng(d.Lat, d.Lng));
            }
        }

        var latlngs = new Array();
        var latlng = [d.Lat, d.Lng];
        if (this._latlngs.currentPoint.length <= 0) {
            this._latlngs.currentPoint = latlng;
            latlngs.push(latlng);
        } else {
            this._latlngs.lastPoint = this._latlngs.currentPoint;
            this._latlngs.currentPoint = latlng;
            latlngs.push(this._latlngs.lastPoint);
            latlngs.push(this._latlngs.currentPoint);
            var polyline = L.polyline(latlngs, { color: 'blue' }).addTo(map);

        }
    }
};
smarto.Pin = {
    wasDropPin: false,
    getAllPins: function () {
        __doPostBack('BtnRefreshGridViewPin', '');
    },
    clearPins: function () {
        __doPostBack('BtnClearGridViewPin', '');
    }
};



/********* test *********/
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

var cluster1 = new L.MarkerClusterGroup();
function addCluster() {

    L.marker([13.756, 100.566]).addTo(cluster1);
    L.marker([13.795, 100.532]).addTo(cluster1);
    L.marker([13.770, 100.563]).addTo(cluster1);

    map.addLayer(cluster1);
}

function addCluster2() {
    L.marker([13.77207, 100.56825]).addTo(cluster1);
    map.addLayer(cluster1);
}

function fitBound() {
    L.marker([13.756, 100.566]).bindLabel('13.756, 100.566', { noHide: true }).showLabel().addTo(map);
    L.marker([13.795, 100.532]).bindLabel('13.795, 100.532', { noHide: true }).showLabel().addTo(map);
    L.marker([13.770, 100.563]).bindLabel('13.770, 100.563', { noHide: true }).showLabel().addTo(map);

    var bounds = L.latLngBounds(L.latLng(13.756, 100.566));
    bounds.extend(L.latLng(13.795, 100.532));
    bounds.extend(L.latLng(13.770, 100.563));

    map.fitBounds(bounds);
    var maxZoom = map.getZoom();
    map.setZoom(maxZoom - smarto.fitBoundZoomout);
}

function fitBound2() {

    var _markers = new Array();
    _markers.push(L.latLng(18.7878861, 98.9930942));
    _markers.push(L.latLng(8.0818592, 99.0015174));

    L.marker([18.7878861, 98.9930942]).bindLabel('18.7878861,98.9930942', { noHide: true }).showLabel().addTo(map);
    L.marker([8.0818592, 99.0015174]).bindLabel('8.0818592,99.0015174', { noHide: true }).showLabel().addTo(map);

    var bounds = L.latLngBounds(_markers);

    map.fitBounds(bounds);
    var maxZoom = map.getZoom();
    map.setZoom(maxZoom - smarto.fitBoundZoomout);
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
            var veh = a.d;
            var _markers = new Array();
            for (var i = 0; i < veh.length; i++) {
                var v = veh[i];
                var marker = L.marker([v.Lat, v.Lng])
                                      .bindLabel(v.Lp, { noHide: true })
                                      .showLabel();

                var obj = marker.addTo(map);
                smarto.markers.push(obj._leaflet_id);

                _markers.push(L.latLng(v.Lat, v.Lng));
            }

            var bounds = L.latLngBounds(_markers);
            map.fitBounds(bounds);
            var maxZoom = map.getZoom();
            map.setZoom(maxZoom - smarto.fitBoundZoomout);
        },
        error: function (msg) {

        }
    });
}

function getMarkerPin() {
    return map._layers[smarto.pinId];
}

function getMarkerById(id) {
    for (var i = 0; i < smarto.markers.length; i++) {
        if (smarto.markers[i].Id == id) {
            return smarto.markers[i];
        }
    }
}