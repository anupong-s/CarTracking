var gDrag = {
    jq: {},
    item: {},
    status: 0,
    y: 0,
    x: 0
};

H.Map.include({
    btnStreetViewId: null,
    initButtonStreetview: function () {

        if (this.btnStreetViewId) {
            return false;
        }

        var dv = L.DomUtil.create("div", "sd-btn-sv");
        dv.id = this.btnStreetViewId = "btnstrvw";

        L.DomEvent.on(dv, "click", function () {
            smarto.vehicles.enableStreetview();
            this.createStreetViewDOM();
        }, this);

        var container = map._controlContainer;
        L.DomUtil.addClass(dv, "leaflet-control");
        container.appendChild(dv);
    },
    createStreetViewDOM: function () {

        var dvStrvw = document.getElementById("dvStreetview");
        if (dvStrvw) {
            return false;
        }

        var container = $("#form1");
        var dv = L.DomUtil.create("div", "hd-strv-main");
        dv.id = 'dvStreetview';

        var dvStrvwDrag = L.DomUtil.create("div", "hd-strv-drag");
        var dvStrvwClose = L.DomUtil.create("div", "hd-strv-close");

        dvStrvwClose.onclick = function () {
            smarto.vehicles.disableStreetview();
            $(".hd-strv-main").remove();
        };

        dv.appendChild(dvStrvwDrag);
        dv.appendChild(dvStrvwClose);
        container.append(dv);

        $(".hd-strv-main").draggable({ containment: '#map_contain', handle: '.hd-strv-drag' });
    },
    removeBtnStreetView: function () {

        var btnStreetView = $("#btnstrvw");
        if (btnStreetView != null) {
            $("#btnstrvw").remove();
            this.btnStreetViewId = null;
            smarto.vehicles.stopRealTimeTracking();
            smarto.vehicles.disableStreetview();
        }

        if (smarto.vehicles._enableStreetView) {
            $("#dvStreetview").remove();
        }
    },
    removeStreetViewDOM: function () {
        $(".hd-strv-main").remove();
    }
});

/*
H.Map.addInitHook(function () {    
this.initButtonStreetview();
});
*/

var smarto = {
    fitBoundZoomout: 1,
    markers: new Array(),
    rightClick: 2,
    mapSourceEnum: { EcartMaps: 0, GoogleMaps: 1, YahooMaps: 2 },
    markerType: { LKL: 0, RT: 1, HIS: 2 },
    isOpenPopup: false,
    pinId: 0,
    freezeMap: false, //ยกเลิกการ set center เวลา tracking
    route: {
        markerId: null,
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
        routeSelected: function (map, id) {
            this._map = map;
            this.markerId = id;
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
        reRouteSelected: function (map) {
            if (this.markerId != null) {
                this.routeSelected(map, this.markerId);
            }
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
    },
    Pin: {
        wasDropPin: false,
        getAllPins: function () {
            __doPostBack('BtnRefreshGridViewPin', '');
        },
        clearPins: function () {
            __doPostBack('BtnClearGridViewPin', '');
        }
    },
    vehicles: {
        _vehicleId: 0,
        _markers: new Array(), //ใช้สำหรับ vehicle detail
        _isFreezeCenter: false,
        _cluster: new L.MarkerClusterGroup({
            maxClusterRadius: 60,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: false
        }),
        _latlngs: {
            lastPoint: [],
            currentPoint: []
        },
        _realTimeInterval: null,
        _enableStreetView: false,
        _polyLines: new Array(),
        options: {
            showLable: false,
            cluster: false
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
        createMarker: function (g, options) {
            if (options == null) {
                options = this.options;
            }

            var marker = L.marker([g.Lat, g.Lng]);
            marker.Id = g.Id;
            marker.Lp = g.Lp;
            marker.DevSn = g.DevSn;
            marker.Type = g.Type;

            if (options.showLable) {
                marker.bindLabel(g.Lp, { noHide: true }).showLabel();
            }

            if (options.cluster) {
                marker.addTo(this._cluster);
                map.addLayer(this._cluster);
            } else {
                marker.addTo(map);
            }

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
                var cnt = smarto.markers.length;
                for (var i = 0; i <= cnt; i++) {
                    var markerId = smarto.markers[i];
                    if (markerId == id) {
                        smarto.markers.splice(i, 1);
                    }
                }
            }
        },
        removeMarkerByType: function (t) {

            var clusterLayer = map._layers[this._cluster._leaflet_id];
            if (clusterLayer != null && clusterLayer.getLayers().length > 0) {
                var layers = clusterLayer.getLayers();

                for (var i = layers.length - 1; i >= 0; i--) {
                    var m = layers[i];
                    if (m.Type == this.parent.markerType.RT || m.Type == this.parent.markerType.HIS) {
                        clusterLayer.removeLayer(m);
                        map.removeLayer(m);

                        $.grep(smarto.markers, function (e, indexOfArray) {
                            if (e == null) {
                                return;
                            }

                            if (e._leaflet_id == m._leaflet_id) {
                                smarto.markers.splice(indexOfArray, 1);
                            }
                        });
                    }
                }
            } else {
                // ถ้าไม่ได้ cluster            
                for (var x = smarto.markers.length - 1; x >= 0; x--) {
                    var m = smarto.markers[x];
                    if (m.Type == this.parent.markerType.RT || m.Type == this.parent.markerType.HIS) {
                        smarto.markers.splice(x, 1);
                    }
                }
            }
        },
        removePolyLines: function () {
            var c = this._polyLines.length;
            for (var i = 0; i < c; i++) {
                var id = this._polyLines[i];
                var layer = map._layers[id];
                if (layer != null && layer != 'undefined') {
                    map.removeLayer(layer);
                }

                var clusterLayer = map._layers[this._cluster._leaflet_id];
                layer = this.getMarkerInClusterLayer(id);
                if (layer != null) {
                    clusterLayer.removeLayer(layer);
                    map.removeLayer(layer);
                }
            }

            this._latlngs.lastPoint = [];
            this._latlngs.currentPoint = [];
            this._polyLines = new Array();
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
            var context = this;
            for (var i = 0; i < smarto.markers.length; i++) {
                //setTimeout(function () {
                var m = smarto.markers[i];
                context.vehicleDistance(m, [L.latLng(ll.lat, ll.lng), L.latLng(m._latlng.lat, m._latlng.lng)]);
                //}, 2500);
            }
        },
        //วาดเส้นบนแผนที่
        directionPath: function (markerId) {
            if (markerId == null) { return false; }

            var marker = getMarkerById(markerId);
            var m = map._layers[marker._leaflet_id];
            if (!m || m == "") {
                //กรณีทำเป็น cluster เอาไว้ ต้องไปหาที่ cluster layer group
                m = this.getMarkerInClusterLayer(marker._leaflet_id);
            }

            var pin = getMarkerPin();

            var directionsService = new google.maps.DirectionsService();

            var start = new google.maps.LatLng(pin._latlng.lat, pin._latlng.lng);
            var end = new google.maps.LatLng(m._latlng.lat, m._latlng.lng);

            //fitBounds สำหรับ Pin กับ รถที่เลือกในตาราง
            var markers = [];
            markers.push(L.latLng(pin._latlng.lat, pin._latlng.lng));
            markers.push(L.latLng(m._latlng.lat, m._latlng.lng));

            var bounds = L.latLngBounds(markers);
            map.fitBounds(bounds);
            
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
                    smarto.route.routeSelected(map, markerId);
                    btnRefresh.hide();
                }
            });

            return true;
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

            setTimeout(function () {
                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        var value = response.routes[0].legs[0].distance.value;
                        var text = response.routes[0].legs[0].distance.text;
                        context.addDistance(marker.Id, marker.Lp, value, text);
                        context.bindVehicleDetail();
                    }
                });
            }, 2500);
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
        stopRealTimeTracking: function () {
            clearTimeout(this._realTimeInterval);
        },
        initRealTimeTracking: function () {
            this.customPeriodClose();
            this.removeMarkerByType(smarto.markerType.RT);
            this.removePolyLines();
            this.realTimeTracking();
        },
        realTimeTracking: function () {
            if (this._vehicleId <= 0) {
                this.stopRealTimeTracking();
                alert('Please select vehicle for tracking.');
                return false;
            }

            var _marker = getMarkerById(this._vehicleId);

            $.ajax({
                type: "POST",
                url: "Tracking.aspx/GetLastKnowLocation",
                data: "{ 'deviceSn': '" + _marker.DevSn + "'}",
                context: this,
                crossDomain: false,
                contentType: "application/json",
                success: function (a) {
                    this._realTimeSuccess(a.d);
                },
                error: function (xhr) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                }
            });

            return true;
        },
        _realTimeSuccess: function (d) {
            d.Type = this.parent.markerType.RT;
            var marker = this.createMarker(d);
            if (!map.getBounds().contains(L.latLng(d.Lat, d.Lng))) {
                // marker is within map bounds
                if (!this._isFreezeCenter) {
                    map.setView(L.latLng(d.Lat, d.Lng));
                }
            }

            if (smarto.pinId > 0) {
                this.directionPath(marker.Id);
            }

            this.drawPolyline(d.Lat, d.Lng);
            this._realTimeInterval = setTimeout('smarto.vehicles.realTimeTracking()', 10000);
            this.streetView(d);
        },
        streetView: function (m) {

            map.initButtonStreetview();

            var a = document.getElementById("dvStreetview");
            if (a == null && this._enableStreetView) {
                map.createStreetViewDOM();
            }

            if (this._enableStreetView) {
                var fenway = new google.maps.LatLng(m.Lat, m.Lng);
                var panoramaOptions = {
                    position: fenway,
                    visible: true,
                    pov: {
                        heading: m.Hd,
                        pitch: 0
                    }
                };

                a = document.getElementById("dvStreetview");
                var e = new google.maps.StreetViewPanorama(a, panoramaOptions);
            }
        },
        enableStreetview: function () {
            this._enableStreetView = true;
        },
        disableStreetview: function () {
            this._enableStreetView = false;
        },
        getMarkerInClusterLayer: function (leafletId) {
            var result = null;
            var clusterLayer = map._layers[this._cluster._leaflet_id];
            if (clusterLayer && clusterLayer.getLayers().length > 0) {
                var layers = clusterLayer.getLayers();
                for (var y = 0; y < layers.length; y++) {
                    if (layers[y]._leaflet_id == leafletId) {
                        result = layers[y];
                        break;
                    }
                }
            }
            return result;
        },
        historyTracking: function () {
            this.customPeriodClose();

            if (this.pinId > 0) {
                this.removeMarkerById(pinId);
            }

            map.removeBtnStreetView();
            map.removeStreetViewDOM();
            draggablePin.hidePin();
            dvVehicleDetail.hide();

            if (this._vehicleId <= 0) {
                alert('Please select vehicle for tracking.');
                return false;
            }

            var _marker = getMarkerById(this._vehicleId);

            $.ajax({
                type: "POST",
                url: "Tracking.aspx/GetHistories",
                data: "{ 'deviceSn': '" + _marker.DevSn + "'}",
                context: this,
                crossDomain: false,
                contentType: "application/json",
                success: function (a) {
                    this._historyTrackingSuccess(a.d);
                },
                error: function (xhr) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                }
            });

            return true;
        },
        _historyTrackingSuccess: function (d) {
            this.removeMarkerByType(smarto.markerType.HIS);
            this.removePolyLines();

            for (var i = 0; i < d.length; i++) {
                var p = d[i];
                p.Type = this.parent.markerType.HIS;
                this.createMarker(p, { cluster: true });
                this.drawPolyline(p.Lat, p.Lng);
            }
        },
        drawPolyline: function (lat, lng) {

            var latlngs = new Array();
            var latlng = [lat, lng];
            if (this._latlngs.currentPoint.length <= 0) {
                this._latlngs.currentPoint = latlng;
                //latlngs.push(latlng);
            } else {
                this._latlngs.lastPoint = this._latlngs.currentPoint;
                this._latlngs.currentPoint = latlng;
                latlngs.push(this._latlngs.lastPoint);
                latlngs.push(this._latlngs.currentPoint);
                var polyline = L.polyline(latlngs, { color: '#3ebcd3', opacity: 0.5 }).addTo(map);
                this._polyLines.push(polyline._leaflet_id);
            }
        },
        customPeriod: function () {
            $("#customPeriod").show();
        },
        customPeriodClose: function () {
            $("#customPeriod").hide();
        },
        exportKml: function () {
            if (this._vehicleId <= 0) {
                alert('Please select vehicle befor export to kml file.');
                return false;
            }
            return true;
        }
    },
    init: function () {
        this.vehicles.parent = this;
        delete this.init;
        return this;
    }
}.init();

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

var cluster1 = new L.MarkerClusterGroup({
    maxClusterRadius: 200,
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: false
});

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