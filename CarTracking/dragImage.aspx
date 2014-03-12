<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="dragImage.aspx.cs" Inherits="CarTracking.dragImage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css"
        rel="stylesheet" type="text/css" />
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
    <script src="hobbit/hobbit-config.js" type="text/javascript"></script>
    <script src="hobbit/hobbit-min.js" type="text/javascript"></script>
    <link rel="stylesheet" href="hobbit/css/hobbit.css">
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <style type="text/css">
        *
        {
            margin: 0px;
            padding: 0px;
        }
        html
        {
            height: 100%;
        }
        body
        {
            height: 100%;
            margin: 0px;
            padding: 0px;
        }
        #map_canvas
        {
            height: 100%;
        }
        #shelf
        {
            top: 50px;
            z-index: 1000000000;
        }
        #draggable
        {
            position: absolute;
            top: 50px;
            z-index: 1000000000;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#draggable").draggable({ helper: 'clone',
                containment: "#map",
                stop: function (e) {
                    var point = L.point(e.pageX, e.pageY);
                    var ll = map.containerPointToLatLng(point);
                    L.marker([ll.lat, ll.lng]).addTo(map);
                }
            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div id='shelf'>
        <img id="draggable" width="18px" title="Drag on map" height="33px" style="z-index: 100000" src='http://www.teawamutu.co.nz/town/2/images/icons/pegman-reset.png' />
    </div>
    <div id="map" style="width: 500px; height: 500px">
    </div>
    </form>
    <script>
        map = H.map("map");
    </script>
</body>
</html>
