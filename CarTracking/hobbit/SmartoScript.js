﻿var smarto = function () { };
smarto.fitBoundZoomout = 1;
smarto.markers = new Array();
smarto.isOpenPopup = false;
smarto.circle = new L.circle;
smarto.radius = 2000; //unit of meter
smarto.pinId = 0;
smarto.freezeMap = false; //ยกเลิกการ set center เวลา tracking

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