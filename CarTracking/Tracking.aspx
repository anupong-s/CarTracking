﻿<%@ Page Language="C#" AutoEventWireup="true" EnableViewState="true" CodeBehind="Tracking.aspx.cs"
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
    <script type="text/javascript">
        //Object สำหรับเก็บค่า marker และ div สำหรับการลาก marker ออกจาก Map        
        function canDropable(id) {
            return (id == 'draggablePin' || id == 'gmarker');
        }       
    </script>
    <style type="text/css">
        .hd-strv-main
        {
            background-color: #e5e3df;
            position: absolute;
            width: 300px;
            height: 300px;
            z-index: 99999;
            bottom: 0;
            left: 0;
        }
        .hd-strv-drag
        {
            top: 0;
            right: 24px;
            width: 20px;
            height: 18px;
            position: absolute;
            z-index: 9999; /*background-color: black;*/
            background-image: url(hobbit/images/btnMove.jpg);
            float: left;
        }
        .hd-strv-drag:hover
        {
            background-image: url(hobbit/images/btnMove_hover.jpg);
        }
        
        .hd-strv-close
        {
            top: 0;
            right: 0;
            width: 20px;
            height: 18px;
            position: absolute;
            z-index: 9999; /*background-color: black;*/
            background-image: url(hobbit/images/btnCloseST.jpg);
            float: left;
        }
        .hd-strv-close:hover
        {
            background-image: url(hobbit/images/btnCloseST_hover.jpg);
        }
        
        .sd-btn-sv
        {
            right: 0;
            bottom: 86px;
            width: 20px;
            height: 40px;
            background-image: url(hobbit/images/btnStreetView.jpg);
        }
        .sd-btn-sv:hover
        {
            background-image: url(hobbit/images/btnStreetView_hover.jpg);
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <div id="map_contain">
        <div id="vehicle-contain" style="float: left; width: 16%;">
            <select id="e1" runat="server">
            </select>
            <div align="right">
                <input id="chkFreeze" type="checkbox" />Freeze map
            </div>
            <div class="vehiclePeriod">
                <asp:RadioButtonList ID="rbPeriods" runat="server">
                    <asp:ListItem Value="1">Current journey</asp:ListItem>
                    <asp:ListItem Value="2">Last journey</asp:ListItem>
                    <asp:ListItem Value="3">Last 12 hours</asp:ListItem>
                    <asp:ListItem Value="4">Last 24 hours</asp:ListItem>
                    <asp:ListItem Value="5">Yesterday</asp:ListItem>
                    <asp:ListItem Value="6">Custom period</asp:ListItem>
                </asp:RadioButtonList>
                <div id="customPeriod" style="display: none;">
                    <asp:Button runat="server" ID="btnExportKML" Text="KML" OnClientClick="return  smarto.vehicles.exportKml();"
                        OnClick="btnExportKML_Click" />
                </div>
            </div>
            <div align="center">
                <img id="draggablePin" alt="pin" style="width: 18px; height: 33px; z-index: 999;"
                    title="Drag on map" src='http://www.teawamutu.co.nz/town/2/images/icons/pegman-reset.png' />
            </div>
            <div id="dvVehicleDetail" style="display: none">
                <div style="height: 30px">
                    <input type="button" id="vehicle-refresh" value="refresh" onclick="smarto.vehicles.calculateDistanceFromPin(smarto.pinId);" />
                </div>
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
        </div>
        <div id="map">
        </div>
        <div style="clear: both">
        </div>
        <%--<div id="gmarker" style="width: 15px; height: 15px; z-index: 10000; background-image: url('hobbit/images/ie-spacer.gif');
            background-repeat: round">
        </div>--%>
        <div id="gmarker" style="width: 25px; height: 41px; z-index: 10000; background-color: red;
            background-repeat: round">
        </div>
    </div>
    <div id="dialog-selected-pin" title="" style="z-index: 30000">
    </div>
    <div id="dialog-form" title="Save Your Pin" style="z-index: 30000">
        <label for="name">
            Name
        </label>
        <asp:TextBox ID="pinName" runat="server" CssClass="text ui-widget-content ui-corner-all"></asp:TextBox>
        <p>
            <asp:RequiredFieldValidator ID="ReqPinName" runat="server" ControlToValidate="pinName"
                Display="Dynamic" ErrorMessage="Missing pin name" ValidationGroup="PinGrp">         
            </asp:RequiredFieldValidator>
        </p>
    </div>
    <div id="dialog-pins" style="z-index: 30000">
        <div id="dvGrid" style="width: 300px; height: 200px; overflow: auto;">
            <asp:UpdatePanel ID="udpGridViewPin" runat="server" UpdateMode="Conditional">
                <ContentTemplate>
                    <asp:GridView ID="GridViewPin" runat="server" Width="100%" AutoGenerateColumns="False"
                        OnRowCancelingEdit="GridViewPin_RowCancelingEdit" OnRowDeleting="GridViewPin_RowDeleting"
                        OnRowEditing="GridViewPin_RowEditing" OnRowUpdating="GridViewPin_RowUpdating"
                        ShowHeader="False" DataKeyNames="Id" OnRowDataBound="GridViewPin_RowDataBound">
                        <Columns>
                            <asp:TemplateField>
                                <EditItemTemplate>
                                    <asp:TextBox ID="txtPinName1" EnableViewState="True" runat="server" ClientIDMode="Static"
                                        Text='<%# Eval("Name") %>'></asp:TextBox>
                                </EditItemTemplate>
                                <ItemTemplate>
                                    <asp:LinkButton ID="LbtnName" runat="server" OnClientClick="alert('x');" Text='<%# Eval("Name") %>'></asp:LinkButton>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" />
                        </Columns>
                    </asp:GridView>
                    <asp:Button ID="BtnRefreshGridViewPin" Style="display: none" runat="server" OnClick="BtnRefreshGridViewPin_Click" />
                    <asp:Button ID="BtnClearGridViewPin" Style="display: none" runat="server" OnClick="BtnClearGridViewPin_Click" />
                </ContentTemplate>
                <Triggers>
                    <asp:AsyncPostBackTrigger ControlID="BtnRefreshGridViewPin" EventName="Click" />
                    <asp:AsyncPostBackTrigger ControlID="BtnClearGridViewPin" EventName="Click" />
                </Triggers>
            </asp:UpdatePanel>
            <div style="height: 20px;">
            </div>
            <asp:HiddenField ID="hdnScrollPos" EnableViewState="True" runat="server" />
            <asp:HiddenField ID="hdnPageIndex" EnableViewState="True" runat="server" />
            <asp:HiddenField ID="hdnPageSize" EnableViewState="True" runat="server" />
        </div>
    </div>
    <script type="text/javascript">
        var myIconUrl = '<%= MyIcon %>';
        var pageIndex = 0;
        var pageCount = 0;
        var scrollPos = $("#hdnScrollPos");
        var hdPageIndex = $("#hdnPageIndex");
        var dialogPin = $("#dialog-pins");
        var dialogSavePin = $("#dialog-form");
        var dvGrid = $("#dvGrid");
        var dvMap = $("#map");
        var draggablePin = $("#draggablePin");
        var btnRefresh = $("#vehicle-refresh");
        var vehicleSelect = $("#e1");
        var dvVehicleDetail = $("#dvVehicleDetail");
        var chkBoxFreeze = $("#chkFreeze");

        gDrag.jq = $('#gmarker');

        map = H.map("map").setBasemap(smarto.mapSourceEnum.EcartMaps).setMaxZoom(20);

        dvMap.addPin = function(lat, lng) {

            smarto.Pin.wasDropPin = true;
            var pin = L.marker([lat, lng], { draggable: false });
            pin.bindPopup('<div><p>Drag to re-Route</p><p>Drag off the map to remove</p><p>Right Click to save Location</p></div>'); //ใส่ html ไว้สำหรับ Popup
            var obj = pin.addTo(map);
            smarto.pinId = obj._leaflet_id; //หา marker var marker = map._layers[smarto.pinId];

            draggablePin.hidePin();

            pin.addEventListener('mouseout', function () {
                pin.closePopup();
                smarto.isOpenPopup = false;
            });

            pin.addEventListener('mouseover', function () {
                    if (!gDrag.jq.hasClass('ui-draggable-dragging')) {

                        gDrag.jq.draggable("enable");

                        if (!smarto.isOpenPopup) {
                            smarto.isOpenPopup = true;
                            pin.openPopup();
                        }

                        gDrag.item = this;
                        gDrag.jq.offset({
                            top: gDrag.y - 10,
                            left: gDrag.x - 10
                        });

                        gDrag.jq.css('cursor', 'pointer');
                    }
                });

            gDrag.jq.mouseover(function() {
                if (!smarto.isOpenPopup) {
                    smarto.isOpenPopup = true;
                    var mypin = map._layers[smarto.pinId];
                    var left = this.offsetLeft;
                    if (mypin != null && left != 0) {
                        mypin.openPopup();
                    }
                }
            });

            gDrag.jq.mouseout(function() {
                pin.closePopup();
                smarto.isOpenPopup = false;
                gDrag.jq.offset({
                    top: $(window).height() - $("#gmarker").height(),
                    left:0
                });
                gDrag.jq.css('cursor', '');
                gDrag.jq.draggable("disable");
            });

            smarto.route.remove(map);
            smarto.vehicles.calculateDistanceFromPin(smarto.pinId);
            smarto.vehicles.showDetail(dvVehicleDetail);
            smarto.vehicles.directionPath(smarto.route.markerId);
        };

        dvMap.droppable({
            drop: function(e, ui) {
                if (!canDropable(ui.draggable.attr("id"))) {
                    return false;
                }

                //ลาก pin มาวางแล้วทำการสร้าง marker
                var leftWidth = $("#vehicle-contain").width();
                var pinHeight = 25;

                var point = L.point(e.pageX - leftWidth, e.pageY + pinHeight);
                var ll = map.containerPointToLatLng(point);

                dvMap.addPin(ll.lat, ll.lng);
            }
        });

        dialogSavePin.dialog({
            autoOpen: false,
            height: 190,
            width: 350,
            modal: false,
            resizable: false,
            close: function() {
                $("#pinName").val('');
            },
            buttons: {
                "Save": function () {

                    if (Page_ClientValidate('PinGrp')) {

                        var pinName = $("#pinName");
                        var marker = map._layers[smarto.pinId];
                        var latLng = marker._latlng;

                        var name = pinName.val();
                        if (name.length < 3 || name.length > 30) {
                            alert('Length of pin name mush be between 3 and 30');
                            return false;
                        }

                        $.ajax({
                            type: "POST",
                            url: "Tracking.aspx/SavePin",
                            data: "{ 'pinName': '" + pinName.val() + "','lat': '" + latLng.lat + "','lng': '" + latLng.lng + "'}",
                            contentType: "application/json",
                            success: function() {
                                alert('Successfully');
                                $("#dialog-form").dialog("close");
                                pinName.val('');
                            },
                            error: function(xhr) {
                                var err = eval("(" + xhr.responseText + ")");
                                alert(err.Message);
                            }
                        });
                    }
                }
            }
        });

        dialogPin.dialog({
            autoOpen: false,
            height: 270,
            width: 320,
            modal: true,
            resizable: false,
            draggable: false,
            closeOnEscape: true,
            close: function() {
                hdPageIndex.val(0);
                scrollPos.val(0);
                pageIndex = 0;
                smarto.Pin.clearPins();
            },                        
        }).parent().appendTo($("form:first"));

        dialogPin.Pin = {            
            closePopup: function() {
                dialogPin.dialog("close");
            },
            addPin: function(lat, lng) {                
                dvMap.addPin(lat, lng);
                
                map.setView(L.latLng(lat, lng));
                
                this.closePopup();
            }
        };

        vehicleSelect.select2({ width: "80%" });    
        
        vehicleSelect.click(function () {
            var data = $(this).select2("data");
            delete data.element;
            if (data.id != "0") {
                btnRefresh.hide();                    
                smarto.vehicles.selectVehicleId(data.id);
            } else {
                smarto.vehicles.selectVehicleId(0);
                btnRefresh.show();                
                $("#dvStreetview").hide();
            }            

            var elementRef = document.getElementById('<%= rbPeriods.ClientID %>');
            var inputElementArray = elementRef.getElementsByTagName('input');

            for (var i = 0; i < inputElementArray.length; i++) {
                var inputElement = inputElementArray[i];

                inputElement.checked = false;
            }
            return false;
        
        });

        $(document).mousemove(function (event) {
            gDrag.x = event.pageX;
            gDrag.y = event.pageY;            
        });

        $(document).ready(function () {
            
            this.oncontextmenu = function() { return false; };            
            map.control.rightclick.disable();
            
            gDrag.jq.mousedown(function (e) {                
                if (e.button == smarto.rightClick) {
                    dialogPin.dialog("close");
                    dialogSavePin.dialog("open");
                    return false;
                }
                return true;
            });

            gDrag.jq.draggable({
                start: function (event, ui) {
                    if (gDrag.item._icon == null || smarto.Pin.wasDropPin) {
                         return false;
                    }
                    
                    gDrag.jq.html('<img src="' + gDrag.item._icon.src + '" />');
                    smarto.vehicles.removeMarkerById(gDrag.item._leaflet_id);
                },
                stop: function (event, ui) {
                    gDrag.jq.html('');
                }
            });

            smarto.vehicles.getVehicle(); //Get vehicle
        });
        
        //PIN
        draggablePin.draggable({
            helper: 'clone',
            containment: "#form1",
            stop: function() {}
        });

        draggablePin.mousedown(function(e) {
            if (e.button == smarto.rightClick) {
                dialogPin.dialog("open");
                dialogSavePin.dialog("close");
                $(".ui-widget-overlay").removeClass('dialog-index').addClass('dialog-index');
                pageCount = '<%=PinCount %>';
                smarto.Pin.getAllPins();
                return false;
            }
        });

        draggablePin.showPin = function() {
            $(this).show();
        };

        draggablePin.hidePin = function() {
            $(this).hide();
        };

        dvGrid.on("scroll", function (e) {
            var $o = $(e.currentTarget);
            if ($o[0].scrollHeight - $o.scrollTop() <= $o.outerHeight()) {                
                scrollPos.val($o.scrollTop());                                
                dvGrid.getRecords();
            }
        });

        dvGrid.getRecords = function() {
            pageIndex++;
            if (pageIndex == 1 || pageIndex <= pageCount) {            
                hdPageIndex.val(pageIndex);
                smarto.Pin.getAllPins();                
            }
        };

        $("#map_contain").droppable({
                accept: "#gmarker",
                activeClass: "drophere",
                hoverClass: "dropaccept",
                drop: function (event, ui, item) {

                    if (smarto.pinId == gDrag.item._leaflet_id) {
                        smarto.vehicles.removeMarkerById(gDrag.item._leaflet_id);
                        smarto.pinId = 0;
                        smarto.vehicles.clearVehicleDetail();
                        smarto.route.remove(map);
                        draggablePin.showPin();
                        smarto.isOpenPopup = false;
                        btnRefresh.show();
                        smarto.vehicles.hideDetail(dvVehicleDetail);
                    }

                    gDrag.jq.css('cursor', 'default');
                }
            });

        chkBoxFreeze.click(function() {
            smarto.vehicles._isFreezeCenter = this.checked;            
        });


        function fullScreen() {

            var winWidth = $(window).width();
            var winHeight = $(window).height();

            var _map = $("#map");
            _map.css("top", "0")
                      .css("left", "0")
                      .css("position", "fixed")
                      .css("z-index", "95959")
                      .width(winWidth).height(winHeight);
        }

        function clearHistory() {
            smarto.vehicles.removeMarkerByType(smarto.markerType.HIS);
            smarto.vehicles.removePolyLines();
        }

    </script>
    </form>
</body>
</html>
