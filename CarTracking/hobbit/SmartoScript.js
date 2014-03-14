var smarto = function () { };
smarto.fitBoundZoomout = 1;
smarto.markers = new Array();
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
        this.waypoints.push([start.lat, start.lng]);
        this.waypoints.push([end.lat, end.lng]);
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

smarto.mapSourceEnum = {
    EcartMaps: 0,
    GoogleMaps: 1,
    YahooMaps: 2
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

function addCluster() {
    var cluster = new L.MarkerClusterGroup();

    L.marker([13.756, 100.566]).addTo(cluster);
    L.marker([13.795, 100.532]).addTo(cluster);
    L.marker([13.770, 100.563]).addTo(cluster);

    map.addLayer(cluster);
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