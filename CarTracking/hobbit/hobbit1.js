(function (a, b, d) {
    var e = a.L,
                c = {
                    version: "0.7.1"
                };
    "object" === typeof module && "object" === typeof module.exports ? module.exports = c : "function" === typeof define && define.amd && define(c);
    c.noConflict = function () {
        a.L = e;
        return this
    };
    a.L = c;
    var g = 0;
    c.Util = {
        extend: function (f) {
            var a = Array.prototype.slice.call(arguments, 1),
                                c, d, b, e;
            d = 0;
            for (b = a.length; d < b; d++)
                for (c in e = a[d] || {}, e) e.hasOwnProperty(c) && (f[c] = e[c]);
            return f
        },
        bind: function (f, a) {
            var c = 2 < arguments.length ? Array.prototype.slice.call(arguments, 2) : null;
            return function () {
                return f.apply(a,
                                        c || arguments)
            }
        },
        stamp: function (f) {
            f._leaflet_id = f._leaflet_id || ++g;
            return f._leaflet_id
        },
        invokeEach: function (f, a, c) {
            var d, b;
            if ("object" === typeof f) {
                b = Array.prototype.slice.call(arguments, 3);
                for (d in f) a.apply(c, [d, f[d]].concat(b));
                return !0
            }
            return !1
        },
        limitExecByInterval: function (f, a, c) {
            var d, b;
            return function G() {
                var e = arguments;
                d ? b = !0 : (d = !0, setTimeout(function () {
                    d = !1;
                    b && (G.apply(c, e), b = !1)
                }, a), f.apply(c, e))
            }
        },
        falseFn: function () {
            return !1
        },
        formatNum: function (f, a) {
            var c = Math.pow(10, a || 5);
            return Math.round(f *
                                c) / c
        },
        trim: function (f) {
            return f.trim ? f.trim() : f.replace(/^\s+|\s+$/g, "")
        },
        splitWords: function (f) {
            return c.Util.trim(f).split(/\s+/)
        },
        setOptions: function (f, a) {
            f.options = c.extend({}, f.options, a);
            return f.options
        },
        getParamString: function (f, a, c) {
            var d = [],
                                b;
            for (b in f) d.push(encodeURIComponent(c ? b.toUpperCase() : b) + "=" + encodeURIComponent(f[b]));
            return (!a || -1 === a.indexOf("?") ? "?" : "&") + d.join("&")
        },
        template: function (f, a) {
            return f.replace(/\{ *([\w_]+) *\}/g, function (f, c) {
                var b = a[c];
                if (b === d) throw Error("No value provided for variable " +
                                        f);
                "function" === typeof b && (b = b(a));
                return b
            })
        },
        isArray: Array.isArray || function (f) {
            return "[object Array]" === Object.prototype.toString.call(f)
        },
        emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    };
    var h = function (f) {
        var c, d, b = ["webkit", "moz", "o", "ms"];
        for (c = 0; c < b.length && !d; c++) d = a[b[c] + f];
        return d
    }, j = function (f) {
        var c = +new Date,
                                d = Math.max(0, 16 - (c - k));
        k = c + d;
        return a.setTimeout(f, d)
    }, k = 0,
                l = a.requestAnimationFrame || h("RequestAnimationFrame") || j,
                m = a.cancelAnimationFrame || h("CancelAnimationFrame") ||
                        h("CancelRequestAnimationFrame") || function (f) {
                            a.clearTimeout(f)
                        };
    c.Util.requestAnimFrame = function (f, d, b, e) {
        f = c.bind(f, d);
        if (b && l === j) f();
        else return l.call(a, f, e)
    };
    c.Util.cancelAnimFrame = function (f) {
        f && m.call(a, f)
    };
    c.extend = c.Util.extend;
    c.bind = c.Util.bind;
    c.stamp = c.Util.stamp;
    c.setOptions = c.Util.setOptions;
    c.Class = function () { };
    c.Class.extend = function (f) {
        var a = function () {
            this.initialize && this.initialize.apply(this, arguments);
            this._initHooks && this.callInitHooks()
        }, d = function () { };
        d.prototype = this.prototype;
        var b = new d;
        b.constructor = a;
        a.prototype = b;
        for (var e in this) this.hasOwnProperty(e) && "prototype" !== e && (a[e] = this[e]);
        f.statics && (c.extend(a, f.statics), delete f.statics);
        f.includes && (c.Util.extend.apply(null, [b].concat(f.includes)), delete f.includes);
        f.options && b.options && (f.options = c.extend({}, b.options, f.options));
        c.extend(b, f);
        b._initHooks = [];
        var g = this;
        a.__super__ = g.prototype;
        b.callInitHooks = function () {
            if (!this._initHooksCalled) {
                g.prototype.callInitHooks && g.prototype.callInitHooks.call(this);
                this._initHooksCalled = !0;
                for (var f = 0, a = b._initHooks.length; f < a; f++) b._initHooks[f].call(this)
            }
        };
        return a
    };
    c.Class.include = function (f) {
        c.extend(this.prototype, f)
    };
    c.Class.mergeOptions = function (f) {
        c.extend(this.prototype.options, f)
    };
    c.Class.addInitHook = function (f) {
        var a = Array.prototype.slice.call(arguments, 1);
        this.prototype._initHooks = this.prototype._initHooks || [];
        this.prototype._initHooks.push("function" === typeof f ? f : function () {
            this[f].apply(this, a)
        })
    };
    c.Mixin = {};
    c.Mixin.Events = {
        addEventListener: function (f, a, d) {
            if (c.Util.invokeEach(f,
                                this.addEventListener, this, a, d)) return this;
            var b = this._leaflet_events = this._leaflet_events || {}, e = d && d !== this && c.stamp(d),
                                g, h, j, k, l;
            f = c.Util.splitWords(f);
            g = 0;
            for (h = f.length; g < h; g++) j = {
                action: a,
                context: d || this
            }, k = f[g], e ? (l = k + "_idx", k = l + "_len", l = b[l] = b[l] || {}, l[e] || (l[e] = [], b[k] = (b[k] || 0) + 1), l[e].push(j)) : (b[k] = b[k] || [], b[k].push(j));
            return this
        },
        hasEventListeners: function (f) {
            var a = this._leaflet_events;
            return !!a && (f in a && 0 < a[f].length || f + "_idx" in a && 0 < a[f + "_idx_len"])
        },
        removeEventListener: function (f,
                        a, d) {
            if (!this._leaflet_events) return this;
            if (!f) return this.clearAllEventListeners();
            if (c.Util.invokeEach(f, this.removeEventListener, this, a, d)) return this;
            var b = this._leaflet_events,
                                e = d && d !== this && c.stamp(d),
                                g, h, j, k, l, m, n;
            f = c.Util.splitWords(f);
            g = 0;
            for (h = f.length; g < h; g++)
                if (j = f[g], k = j + "_idx", l = k + "_len", m = b[k], a) {
                    if (j = e && m ? m[e] : b[j]) {
                        for (k = j.length - 1; 0 <= k; k--)
                            if (j[k].action === a && (!d || j[k].context === d)) n = j.splice(k, 1), n[0].action = c.Util.falseFn;
                        d && (m && 0 === j.length) && (delete m[e], b[l]--)
                    }
                } else delete b[j],
                        delete b[k], delete b[l];
            return this
        },
        clearAllEventListeners: function () {
            delete this._leaflet_events;
            return this
        },
        fireEvent: function (f, a) {
            if (!this.hasEventListeners(f)) return this;
            var d = c.Util.extend({}, a, {
                type: f,
                target: this
            }),
                                b = this._leaflet_events,
                                e, g, h, j;
            if (b[f]) {
                e = b[f].slice();
                g = 0;
                for (h = e.length; g < h; g++) e[g].action.call(e[g].context, d)
            }
            b = b[f + "_idx"];
            for (j in b)
                if (e = b[j].slice()) {
                    g = 0;
                    for (h = e.length; g < h; g++) e[g].action.call(e[g].context, d)
                }
            return this
        },
        addOneTimeEventListener: function (f, a, d) {
            if (c.Util.invokeEach(f,
                                this.addOneTimeEventListener, this, a, d)) return this;
            var b = c.bind(function () {
                this.removeEventListener(f, a, d).removeEventListener(f, b, d)
            }, this);
            return this.addEventListener(f, a, d).addEventListener(f, b, d)
        }
    };
    c.Mixin.Events.on = c.Mixin.Events.addEventListener;
    c.Mixin.Events.off = c.Mixin.Events.removeEventListener;
    c.Mixin.Events.once = c.Mixin.Events.addOneTimeEventListener;
    c.Mixin.Events.fire = c.Mixin.Events.fireEvent;
    var h = navigator.userAgent.toLowerCase(),
                n = b.documentElement,
                p = "ActiveXObject" in a,
                r = -1 !== h.indexOf("webkit"),
                q = -1 !== h.indexOf("phantom"),
                s = -1 !== h.search("android [23]"),
                u = -1 !== h.indexOf("chrome"),
                w = "undefined" !== typeof orientation,
                z = navigator.msPointerEnabled && navigator.msMaxTouchPoints && !a.PointerEvent,
                E = a.PointerEvent && navigator.pointerEnabled && navigator.maxTouchPoints || z,
                F = p && "transition" in n.style,
                A = "WebKitCSSMatrix" in a && "m11" in new a.WebKitCSSMatrix && !s,
                t = "MozPerspective" in n.style,
                n = "OTransition" in n.style,
                x = "devicePixelRatio" in a && 1 < a.devicePixelRatio;
    !x && "matchMedia" in a && (x = (x = a.matchMedia("(min-resolution:144dpi)")) &&
                x.matches);
    var B = !a.L_NO_TOUCH && !q && (E || "ontouchstart" in a || a.DocumentTouch && b instanceof a.DocumentTouch);
    c.Browser = {
        ie: p,
        ielt9: p && !b.addEventListener,
        webkit: r,
        gecko: -1 !== h.indexOf("gecko") && !r && !a.opera && !p,
        android: -1 !== h.indexOf("android"),
        android23: s,
        chrome: u,
        safari: !u && -1 !== h.indexOf("safari"),
        ie3d: F,
        webkit3d: A,
        gecko3d: t,
        opera3d: n,
        any3d: !a.L_DISABLE_3D && (F || A || t || n) && !q,
        mobile: w,
        mobileWebkit: w && r,
        mobileWebkit3d: w && A,
        mobileOpera: w && a.opera,
        touch: !!B,
        msPointer: !!z,
        pointer: !!E,
        retina: !!x
    };
    c.Point =
                function (f, a, c) {
                    this.x = c ? Math.round(f) : f;
                    this.y = c ? Math.round(a) : a
                };
    c.Point.prototype = {
        clone: function () {
            return new c.Point(this.x, this.y)
        },
        add: function (f) {
            return this.clone()._add(c.point(f))
        },
        _add: function (f) {
            this.x += f.x;
            this.y += f.y;
            return this
        },
        subtract: function (f) {
            return this.clone()._subtract(c.point(f))
        },
        _subtract: function (f) {
            this.x -= f.x;
            this.y -= f.y;
            return this
        },
        divideBy: function (f) {
            return this.clone()._divideBy(f)
        },
        _divideBy: function (f) {
            this.x /= f;
            this.y /= f;
            return this
        },
        multiplyBy: function (f) {
            return this.clone()._multiplyBy(f)
        },
        _multiplyBy: function (f) {
            this.x *= f;
            this.y *= f;
            return this
        },
        round: function () {
            return this.clone()._round()
        },
        _round: function () {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            return this
        },
        floor: function () {
            return this.clone()._floor()
        },
        _floor: function () {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            return this
        },
        distanceTo: function (f) {
            f = c.point(f);
            var a = f.x - this.x;
            f = f.y - this.y;
            return Math.sqrt(a * a + f * f)
        },
        equals: function (f) {
            f = c.point(f);
            return f.x === this.x && f.y === this.y
        },
        contains: function (f) {
            f = c.point(f);
            return Math.abs(f.x) <= Math.abs(this.x) && Math.abs(f.y) <= Math.abs(this.y)
        },
        toString: function () {
            return "Point(" + c.Util.formatNum(this.x) + ", " + c.Util.formatNum(this.y) + ")"
        }
    };
    c.point = function (f, a, b) {
        return f instanceof c.Point ? f : c.Util.isArray(f) ? new c.Point(f[0], f[1]) : f === d || null === f ? f : new c.Point(f, a, b)
    };
    c.Bounds = function (f, a) {
        if (f)
            for (var c = a ? [f, a] : f, d = 0, b = c.length; d < b; d++) this.extend(c[d])
    };
    c.Bounds.prototype = {
        extend: function (f) {
            f = c.point(f);
            !this.min && !this.max ? (this.min = f.clone(), this.max = f.clone()) :
                                (this.min.x = Math.min(f.x, this.min.x), this.max.x = Math.max(f.x, this.max.x), this.min.y = Math.min(f.y, this.min.y), this.max.y = Math.max(f.y, this.max.y));
            return this
        },
        getCenter: function (f) {
            return new c.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, f)
        },
        getBottomLeft: function () {
            return new c.Point(this.min.x, this.max.y)
        },
        getTopRight: function () {
            return new c.Point(this.max.x, this.min.y)
        },
        getSize: function () {
            return this.max.subtract(this.min)
        },
        contains: function (f) {
            var a;
            f = "number" === typeof f[0] || f instanceof
                        c.Point ? c.point(f) : c.bounds(f);
            f instanceof c.Bounds ? (a = f.min, f = f.max) : a = f;
            return a.x >= this.min.x && f.x <= this.max.x && a.y >= this.min.y && f.y <= this.max.y
        },
        intersects: function (f) {
            f = c.bounds(f);
            var a = this.min,
                                d = this.max,
                                b = f.min;
            f = f.max;
            var e = f.y >= a.y && b.y <= d.y;
            return f.x >= a.x && b.x <= d.x && e
        },
        isValid: function () {
            return !(!this.min || !this.max)
        }
    };
    c.bounds = function (f, a) {
        return !f || f instanceof c.Bounds ? f : new c.Bounds(f, a)
    };
    c.Transformation = function (f, a, c, d) {
        this._a = f;
        this._b = a;
        this._c = c;
        this._d = d
    };
    c.Transformation.prototype = {
        transform: function (f, a) {
            return this._transform(f.clone(), a)
        },
        _transform: function (f, a) {
            a = a || 1;
            f.x = a * (this._a * f.x + this._b);
            f.y = a * (this._c * f.y + this._d);
            return f
        },
        untransform: function (f, a) {
            a = a || 1;
            return new c.Point((f.x / a - this._b) / this._a, (f.y / a - this._d) / this._c)
        }
    };
    c.DomUtil = {
        get: function (f) {
            return "string" === typeof f ? b.getElementById(f) : f
        },
        getStyle: function (f, a) {
            var c = f.style[a];
            !c && f.currentStyle && (c = f.currentStyle[a]);
            if ((!c || "auto" === c) && b.defaultView) c = (c = b.defaultView.getComputedStyle(f, null)) ?
                                c[a] : null;
            return "auto" === c ? null : c
        },
        getViewportOffset: function (f) {
            var a = 0,
                                d = 0,
                                e = f,
                                g = b.body,
                                h = b.documentElement,
                                j;
            do {
                a += e.offsetTop || 0;
                d += e.offsetLeft || 0;
                a += parseInt(c.DomUtil.getStyle(e, "borderTopWidth"), 10) || 0;
                d += parseInt(c.DomUtil.getStyle(e, "borderLeftWidth"), 10) || 0;
                j = c.DomUtil.getStyle(e, "position");
                if (e.offsetParent === g && "absolute" === j) break;
                if ("fixed" === j) {
                    a += g.scrollTop || h.scrollTop || 0;
                    d += g.scrollLeft || h.scrollLeft || 0;
                    break
                }
                if ("relative" === j && !e.offsetLeft) {
                    j = c.DomUtil.getStyle(e, "width");
                    var k =
                                                c.DomUtil.getStyle(e, "max-width"),
                                                l = e.getBoundingClientRect();
                    if ("none" !== j || "none" !== k) d += l.left + e.clientLeft;
                    a += l.top + (g.scrollTop || h.scrollTop || 0);
                    break
                }
                e = e.offsetParent
            } while (e);
            e = f;
            do {
                if (e === g) break;
                a -= e.scrollTop || 0;
                d -= e.scrollLeft || 0;
                e = e.parentNode
            } while (e);
            return new c.Point(d, a)
        },
        documentIsLtr: function () {
            c.DomUtil._docIsLtrCached || (c.DomUtil._docIsLtrCached = !0, c.DomUtil._docIsLtr = "ltr" === c.DomUtil.getStyle(b.body, "direction"));
            return c.DomUtil._docIsLtr
        },
        create: function (f, a, c) {
            f = b.createElement(f);
            f.className = a;
            c && c.appendChild(f);
            return f
        },
        hasClass: function (f, a) {
            if (f.classList !== d) return f.classList.contains(a);
            var b = c.DomUtil._getClass(f);
            return 0 < b.length && RegExp("(^|\\s)" + a + "(\\s|$)").test(b)
        },
        addClass: function (f, a) {
            if (f.classList !== d)
                for (var b = c.Util.splitWords(a), e = 0, g = b.length; e < g; e++) f.classList.add(b[e]);
            else c.DomUtil.hasClass(f, a) || (b = c.DomUtil._getClass(f), c.DomUtil._setClass(f, (b ? b + " " : "") + a))
        },
        removeClass: function (f, a) {
            f.classList !== d ? f.classList.remove(a) : c.DomUtil._setClass(f,
                                c.Util.trim((" " + c.DomUtil._getClass(f) + " ").replace(" " + a + " ", " ")))
        },
        _setClass: function (f, a) {
            f.className.baseVal === d ? f.className = a : f.className.baseVal = a
        },
        _getClass: function (f) {
            return f.className.baseVal === d ? f.className : f.className.baseVal
        },
        setOpacity: function (f, a) {
            if ("opacity" in f.style) f.style.opacity = a;
            else if ("filter" in f.style) {
                var c = !1;
                try {
                    c = f.filters.item("DXImageTransform.Microsoft.Alpha")
                } catch (d) {
                    if (1 === a) return
                }
                a = Math.round(100 * a);
                c ? (c.Enabled = 100 !== a, c.Opacity = a) : f.style.filter += " progid:DXImageTransform.Microsoft.Alpha(opacity=" +
                                        a + ")"
            }
        },
        testProp: function (f) {
            for (var a = b.documentElement.style, c = 0; c < f.length; c++)
                if (f[c] in a) return f[c];
            return !1
        },
        getTranslateString: function (f) {
            var a = c.Browser.webkit3d;
            return "translate" + (a ? "3d" : "") + "(" + f.x + "px," + f.y + "px" + ((a ? ",0" : "") + ")")
        },
        getScaleString: function (f, a) {
            return c.DomUtil.getTranslateString(a.add(a.multiplyBy(-1 * f))) + (" scale(" + f + ") ")
        },
        setPosition: function (f, a, d) {
            f._leaflet_pos = a;
            !d && c.Browser.any3d ? f.style[c.DomUtil.TRANSFORM] = c.DomUtil.getTranslateString(a) : (f.style.left = a.x + "px",
                                f.style.top = a.y + "px")
        },
        getPosition: function (f) {
            return f._leaflet_pos
        }
    };
    c.DomUtil.TRANSFORM = c.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]);
    c.DomUtil.TRANSITION = c.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
    c.DomUtil.TRANSITION_END = "webkitTransition" === c.DomUtil.TRANSITION || "OTransition" === c.DomUtil.TRANSITION ? c.DomUtil.TRANSITION + "End" : "transitionend";
    if ("onselectstart" in b) c.extend(c.DomUtil, {
        disableTextSelection: function () {
            c.DomEvent.on(a,
                                "selectstart", c.DomEvent.preventDefault)
        },
        enableTextSelection: function () {
            c.DomEvent.off(a, "selectstart", c.DomEvent.preventDefault)
        }
    });
    else {
        var y = c.DomUtil.testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
        c.extend(c.DomUtil, {
            disableTextSelection: function () {
                if (y) {
                    var f = b.documentElement.style;
                    this._userSelect = f[y];
                    f[y] = "none"
                }
            },
            enableTextSelection: function () {
                y && (b.documentElement.style[y] = this._userSelect, delete this._userSelect)
            }
        })
    }
    c.extend(c.DomUtil, {
        disableImageDrag: function () {
            c.DomEvent.on(a,
                                "dragstart", c.DomEvent.preventDefault)
        },
        enableImageDrag: function () {
            c.DomEvent.off(a, "dragstart", c.DomEvent.preventDefault)
        }
    });
    c.LatLng = function (f, a, c) {
        f = parseFloat(f);
        a = parseFloat(a);
        if (isNaN(f) || isNaN(a)) throw Error("Invalid LatLng object: (" + f + ", " + a + ")");
        this.lat = f;
        this.lng = a;
        c !== d && (this.alt = parseFloat(c))
    };
    c.extend(c.LatLng, {
        DEG_TO_RAD: Math.PI / 180,
        RAD_TO_DEG: 180 / Math.PI,
        MAX_MARGIN: 1E-9
    });
    c.LatLng.prototype = {
        equals: function (f) {
            if (!f) return !1;
            f = c.latLng(f);
            return Math.max(Math.abs(this.lat - f.lat),
                                Math.abs(this.lng - f.lng)) <= c.LatLng.MAX_MARGIN
        },
        toString: function (f) {
            return "LatLng(" + c.Util.formatNum(this.lat, f) + ", " + c.Util.formatNum(this.lng, f) + ")"
        },
        distanceTo: function (f) {
            f = c.latLng(f);
            var a = c.LatLng.DEG_TO_RAD,
                                d = (f.lng - this.lng) * a,
                                b = this.lat * a,
                                e = f.lat * a;
            f = Math.sin((f.lat - this.lat) * a / 2);
            d = Math.sin(d / 2);
            b = f * f + d * d * Math.cos(b) * Math.cos(e);
            return 12756274 * Math.atan2(Math.sqrt(b), Math.sqrt(1 - b))
        },
        wrap: function (f, a) {
            var d = this.lng;
            f = f || -180;
            a = a || 180;
            return new c.LatLng(this.lat, (d + a) % (a - f) + (d < f || d ===
                                a ? a : f))
        }
    };
    c.latLng = function (f, a) {
        return f instanceof c.LatLng ? f : c.Util.isArray(f) ? "number" === typeof f[0] || "string" === typeof f[0] ? new c.LatLng(f[0], f[1], f[2]) : null : f === d || null === f ? f : "object" === typeof f && "lat" in f ? new c.LatLng(f.lat, "lng" in f ? f.lng : f.lon) : a === d ? null : new c.LatLng(f, a)
    };
    c.LatLngBounds = function (f, a) {
        if (f)
            for (var c = a ? [f, a] : f, d = 0, b = c.length; d < b; d++) this.extend(c[d])
    };
    c.LatLngBounds.prototype = {
        extend: function (f) {
            if (!f) return this;
            var a = c.latLng(f);
            f = null !== a ? a : c.latLngBounds(f);
            f instanceof
                        c.LatLng ? !this._southWest && !this._northEast ? (this._southWest = new c.LatLng(f.lat, f.lng), this._northEast = new c.LatLng(f.lat, f.lng)) : (this._southWest.lat = Math.min(f.lat, this._southWest.lat), this._southWest.lng = Math.min(f.lng, this._southWest.lng), this._northEast.lat = Math.max(f.lat, this._northEast.lat), this._northEast.lng = Math.max(f.lng, this._northEast.lng)) : f instanceof c.LatLngBounds && (this.extend(f._southWest), this.extend(f._northEast));
            return this
        },
        pad: function (f) {
            var a = this._southWest,
                                d = this._northEast,
                                b = Math.abs(a.lat - d.lat) * f;
            f *= Math.abs(a.lng - d.lng);
            return new c.LatLngBounds(new c.LatLng(a.lat - b, a.lng - f), new c.LatLng(d.lat + b, d.lng + f))
        },
        getCenter: function () {
            return new c.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
        },
        getSouthWest: function () {
            return this._southWest
        },
        getNorthEast: function () {
            return this._northEast
        },
        getNorthWest: function () {
            return new c.LatLng(this.getNorth(), this.getWest())
        },
        getSouthEast: function () {
            return new c.LatLng(this.getSouth(),
                                this.getEast())
        },
        getWest: function () {
            return this._southWest.lng
        },
        getSouth: function () {
            return this._southWest.lat
        },
        getEast: function () {
            return this._northEast.lng
        },
        getNorth: function () {
            return this._northEast.lat
        },
        contains: function (f) {
            f = "number" === typeof f[0] || f instanceof c.LatLng ? c.latLng(f) : c.latLngBounds(f);
            var a = this._southWest,
                                d = this._northEast,
                                b;
            f instanceof c.LatLngBounds ? (b = f.getSouthWest(), f = f.getNorthEast()) : b = f;
            return b.lat >= a.lat && f.lat <= d.lat && b.lng >= a.lng && f.lng <= d.lng
        },
        intersects: function (f) {
            f =
                                c.latLngBounds(f);
            var a = this._southWest,
                                d = this._northEast,
                                b = f.getSouthWest();
            f = f.getNorthEast();
            var e = f.lng >= a.lng && b.lng <= d.lng;
            return f.lat >= a.lat && b.lat <= d.lat && e
        },
        toBBoxString: function () {
            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join()
        },
        equals: function (f) {
            if (!f) return !1;
            f = c.latLngBounds(f);
            return this._southWest.equals(f.getSouthWest()) && this._northEast.equals(f.getNorthEast())
        },
        isValid: function () {
            return !(!this._southWest || !this._northEast)
        }
    };
    c.latLngBounds = function (f,
                a) {
        return !f || f instanceof c.LatLngBounds ? f : new c.LatLngBounds(f, a)
    };
    c.Projection = {};
    c.Projection.SphericalMercator = {
        MAX_LATITUDE: 85.0511287798,
        project: function (f) {
            var a = c.LatLng.DEG_TO_RAD,
                                d = this.MAX_LATITUDE,
                                d = Math.max(Math.min(d, f.lat), -d);
            f = f.lng * a;
            a = Math.log(Math.tan(Math.PI / 4 + d * a / 2));
            return new c.Point(f, a)
        },
        unproject: function (f) {
            var a = c.LatLng.RAD_TO_DEG,
                                d = f.x * a;
            f = (2 * Math.atan(Math.exp(f.y)) - Math.PI / 2) * a;
            return new c.LatLng(f, d)
        }
    };
    c.Projection.LonLat = {
        project: function (f) {
            return new c.Point(f.lng,
                                f.lat)
        },
        unproject: function (f) {
            return new c.LatLng(f.y, f.x)
        }
    };
    c.CRS = {
        latLngToPoint: function (f, a) {
            var c = this.projection.project(f),
                                d = this.scale(a);
            return this.transformation._transform(c, d)
        },
        pointToLatLng: function (f, a) {
            var c = this.scale(a),
                                c = this.transformation.untransform(f, c);
            return this.projection.unproject(c)
        },
        project: function (f) {
            return this.projection.project(f)
        },
        scale: function (f) {
            return 256 * Math.pow(2, f)
        },
        getSize: function (f) {
            f = this.scale(f);
            return c.point(f, f)
        }
    };
    c.CRS.Simple = c.extend({}, c.CRS, {
        projection: c.Projection.LonLat,
        transformation: new c.Transformation(1, 0, -1, 0),
        scale: function (f) {
            return Math.pow(2, f)
        }
    });
    c.CRS.EPSG3857 = c.extend({}, c.CRS, {
        code: "EPSG:3857",
        projection: c.Projection.SphericalMercator,
        transformation: new c.Transformation(0.5 / Math.PI, 0.5, -0.5 / Math.PI, 0.5),
        project: function (f) {
            return this.projection.project(f).multiplyBy(6378137)
        }
    });
    c.CRS.EPSG900913 = c.extend({}, c.CRS.EPSG3857, {
        code: "EPSG:900913"
    });
    c.CRS.EPSG4326 = c.extend({}, c.CRS, {
        code: "EPSG:4326",
        projection: c.Projection.LonLat,
        transformation: new c.Transformation(1 / 360, 0.5, -1 / 360, 0.5)
    });
    c.Map = c.Class.extend({
        includes: c.Mixin.Events,
        options: {
            crs: c.CRS.EPSG3857,
            fadeAnimation: c.DomUtil.TRANSITION && !c.Browser.android23,
            trackResize: !0,
            markerZoomAnimation: c.DomUtil.TRANSITION && c.Browser.any3d
        },
        initialize: function (f, a) {
            a = c.setOptions(this, a);
            this._initContainer(f);
            this._initLayout();
            this._onResize = c.bind(this._onResize, this);
            this._initEvents();
            a.maxBounds && this.setMaxBounds(a.maxBounds);
            a.center && a.zoom !== d && this.setView(c.latLng(a.center),
                                a.zoom, {
                                    reset: !0
                                });
            this._handlers = [];
            this._layers = {};
            this._zoomBoundLayers = {};
            this._tileLayersNum = 0;
            this.callInitHooks();
            this._addLayers(a.layers)
        },
        setView: function (f, a) {
            a = a === d ? this.getZoom() : a;
            this._resetView(c.latLng(f), this._limitZoom(a));
            return this
        },
        setZoom: function (f, a) {
            return !this._loaded ? (this._zoom = this._limitZoom(f), this) : this.setView(this.getCenter(), f, {
                zoom: a
            })
        },
        zoomIn: function (f, a) {
            return this.setZoom(this._zoom + (f || 1), a)
        },
        zoomOut: function (f, a) {
            return this.setZoom(this._zoom - (f || 1),
                                a)
        },
        setZoomAround: function (f, a, d) {
            var b = this.getZoomScale(a),
                                e = this.getSize().divideBy(2);
            f = (f instanceof c.Point ? f : this.latLngToContainerPoint(f)).subtract(e).multiplyBy(1 - 1 / b);
            e = this.containerPointToLatLng(e.add(f));
            return this.setView(e, a, {
                zoom: d
            })
        },
        fitBounds: function (f, a) {
            a = a || {};
            f = f.getBounds ? f.getBounds() : c.latLngBounds(f);
            var d = c.point(a.paddingTopLeft || a.padding || [0, 0]),
                                b = c.point(a.paddingBottomRight || a.padding || [0, 0]),
                                e = this.getBoundsZoom(f, !1, d.add(b)),
                                d = b.subtract(d).divideBy(2),
                                b = this.project(f.getSouthWest(),
                                        e),
                                g = this.project(f.getNorthEast(), e),
                                d = this.unproject(b.add(g).divideBy(2).add(d), e),
                                e = a && a.maxZoom ? Math.min(a.maxZoom, e) : e;
            return this.setView(d, e, a)
        },
        fitWorld: function (f) {
            return this.fitBounds([
                [-90, -180],
                [90, 180]
            ], f)
        },
        panTo: function (f, a) {
            return this.setView(f, this._zoom, {
                pan: a
            })
        },
        panBy: function (f) {
            this.fire("movestart");
            this._rawPanBy(c.point(f));
            this.fire("move");
            return this.fire("moveend")
        },
        setMaxBounds: function (f) {
            f = c.latLngBounds(f);
            this.options.maxBounds = f;
            if (!f) return this.off("moveend",
                                this._panInsideMaxBounds, this);
            this._loaded && this._panInsideMaxBounds();
            return this.on("moveend", this._panInsideMaxBounds, this)
        },
        panInsideBounds: function (f, a) {
            var c = this.getCenter(),
                                d = this._limitCenter(c, this._zoom, f);
            return c.equals(d) ? this : this.panTo(d, a)
        },
        addLayer: function (f) {
            var a = c.stamp(f);
            if (this._layers[a]) return this;
            this._layers[a] = f;
            if (f.options && (!isNaN(f.options.maxZoom) || !isNaN(f.options.minZoom))) this._zoomBoundLayers[a] = f, this._updateZoomLevels();
            this.options.zoomAnimation && (c.TileLayer &&
                                f instanceof c.TileLayer) && (this._tileLayersNum++, this._tileLayersToLoad++, f.on("load", this._onTileLayerLoad, this));
            this._loaded && this._layerAdd(f);
            return this
        },
        removeLayer: function (f) {
            var a = c.stamp(f);
            if (!this._layers[a]) return this;
            if (this._loaded) f.onRemove(this);
            delete this._layers[a];
            this._loaded && this.fire("layerremove", {
                layer: f
            });
            this._zoomBoundLayers[a] && (delete this._zoomBoundLayers[a], this._updateZoomLevels());
            this.options.zoomAnimation && (c.TileLayer && f instanceof c.TileLayer) && (this._tileLayersNum--,
                                this._tileLayersToLoad--, f.off("load", this._onTileLayerLoad, this));
            return this
        },
        hasLayer: function (f) {
            return !f ? !1 : c.stamp(f) in this._layers
        },
        eachLayer: function (f, a) {
            for (var c in this._layers) f.call(a, this._layers[c]);
            return this
        },
        invalidateSize: function (f) {
            if (!this._loaded) return this;
            f = c.extend({
                animate: !1,
                pan: !0
            }, !0 === f ? {
                animate: !0
            } : f);
            var a = this.getSize();
            this._sizeChanged = !0;
            this._initialCenter = null;
            var d = this.getSize(),
                                b = a.divideBy(2).round(),
                                e = d.divideBy(2).round(),
                                b = b.subtract(e);
            if (!b.x && !b.y) return this;
            f.animate && f.pan ? this.panBy(b) : (f.pan && this._rawPanBy(b), this.fire("move"), f.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(c.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend"));
            return this.fire("resize", {
                oldSize: a,
                newSize: d
            })
        },
        addHandler: function (f, a) {
            if (!a) return this;
            var c = this[f] = new a(this);
            this._handlers.push(c);
            this.options[f] && c.enable();
            return this
        },
        remove: function () {
            this._loaded && this.fire("unload");
            this._initEvents("off");
            try {
                delete this._container._leaflet
            } catch (f) {
                this._container._leaflet =
                                        d
            }
            this._clearPanes();
            this._clearControlPos && this._clearControlPos();
            this._clearHandlers();
            return this
        },
        getCenter: function () {
            this._checkIfLoaded();
            return this._initialCenter && !this._moved() ? this._initialCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
        },
        getZoom: function () {
            return this._zoom
        },
        getBounds: function () {
            var f = this.getPixelBounds(),
                                a = this.unproject(f.getBottomLeft()),
                                f = this.unproject(f.getTopRight());
            return new c.LatLngBounds(a, f)
        },
        getMinZoom: function () {
            return this.options.minZoom ===
                                d ? this._layersMinZoom === d ? 0 : this._layersMinZoom : this.options.minZoom
        },
        getMaxZoom: function () {
            return this.options.maxZoom === d ? this._layersMaxZoom === d ? Infinity : this._layersMaxZoom : this.options.maxZoom
        },
        getBoundsZoom: function (f, a, d) {
            f = c.latLngBounds(f);
            var b = this.getMinZoom() - (a ? 1 : 0),
                                e = this.getMaxZoom(),
                                g = this.getSize(),
                                h = f.getNorthWest();
            f = f.getSouthEast();
            var j = !0;
            d = c.point(d || [0, 0]);
            do b++, j = this.project(f, b).subtract(this.project(h, b)).add(d), j = !a ? g.contains(j) : j.x < g.x || j.y < g.y; while (j && b <= e);
            return j &&
                                a ? null : a ? b : b - 1
        },
        getSize: function () {
            if (!this._size || this._sizeChanged) this._size = new c.Point(this._container.clientWidth, this._container.clientHeight), this._sizeChanged = !1;
            return this._size.clone()
        },
        getPixelBounds: function () {
            var f = this._getTopLeftPoint();
            return new c.Bounds(f, f.add(this.getSize()))
        },
        getPixelOrigin: function () {
            this._checkIfLoaded();
            return this._initialTopLeftPoint
        },
        getPanes: function () {
            return this._panes
        },
        getContainer: function () {
            return this._container
        },
        getZoomScale: function (f) {
            var a =
                                this.options.crs;
            return a.scale(f) / a.scale(this._zoom)
        },
        getScaleZoom: function (f) {
            return this._zoom + Math.log(f) / Math.LN2
        },
        project: function (f, a) {
            a = a === d ? this._zoom : a;
            return this.options.crs.latLngToPoint(c.latLng(f), a)
        },
        unproject: function (f, a) {
            a = a === d ? this._zoom : a;
            return this.options.crs.pointToLatLng(c.point(f), a)
        },
        layerPointToLatLng: function (f) {
            f = c.point(f).add(this.getPixelOrigin());
            return this.unproject(f)
        },
        latLngToLayerPoint: function (f) {
            return this.project(c.latLng(f))._round()._subtract(this.getPixelOrigin())
        },
        containerPointToLayerPoint: function (f) {
            return c.point(f).subtract(this._getMapPanePos())
        },
        layerPointToContainerPoint: function (f) {
            return c.point(f).add(this._getMapPanePos())
        },
        containerPointToLatLng: function (f) {
            f = this.containerPointToLayerPoint(c.point(f));
            return this.layerPointToLatLng(f)
        },
        latLngToContainerPoint: function (f) {
            return this.layerPointToContainerPoint(this.latLngToLayerPoint(c.latLng(f)))
        },
        mouseEventToContainerPoint: function (f) {
            return c.DomEvent.getMousePosition(f, this._container)
        },
        mouseEventToLayerPoint: function (f) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(f))
        },
        mouseEventToLatLng: function (f) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(f))
        },
        _initContainer: function (f) {
            if (f = this._container = c.DomUtil.get(f)) {
                if (f._leaflet) throw Error("Map container is already initialized.");
            } else throw Error("Map container not found.");
            f._leaflet = !0
        },
        _initLayout: function () {
            var f = this._container;
            c.DomUtil.addClass(f, "leaflet-container" + (c.Browser.touch ? " leaflet-touch" : "") + (c.Browser.retina ? " leaflet-retina" : "") + (c.Browser.ielt9 ? " leaflet-oldie" : "") + (this.options.fadeAnimation ?
                                " leaflet-fade-anim" : ""));
            var a = c.DomUtil.getStyle(f, "position");
            "absolute" !== a && ("relative" !== a && "fixed" !== a) && (f.style.position = "relative");
            this._initPanes();
            this._initControlPos && this._initControlPos()
        },
        _initPanes: function () {
            var f = this._panes = {};
            this._mapPane = f.mapPane = this._createPane("leaflet-map-pane", this._container);
            this._tilePane = f.tilePane = this._createPane("leaflet-tile-pane", this._mapPane);
            f.objectsPane = this._createPane("leaflet-objects-pane", this._mapPane);
            f.shadowPane = this._createPane("leaflet-shadow-pane");
            f.overlayPane = this._createPane("leaflet-overlay-pane");
            f.markerPane = this._createPane("leaflet-marker-pane");
            f.popupPane = this._createPane("leaflet-popup-pane");
            this.options.markerZoomAnimation || (c.DomUtil.addClass(f.markerPane, " leaflet-zoom-hide"), c.DomUtil.addClass(f.shadowPane, " leaflet-zoom-hide"), c.DomUtil.addClass(f.popupPane, " leaflet-zoom-hide"))
        },
        _createPane: function (f, a) {
            return c.DomUtil.create("div", f, a || this._panes.objectsPane)
        },
        _clearPanes: function () {
            this._container.removeChild(this._mapPane)
        },
        _addLayers: function (f) {
            f = f ? c.Util.isArray(f) ? f : [f] : [];
            for (var a = 0, d = f.length; a < d; a++) this.addLayer(f[a])
        },
        _resetView: function (f, a, d, b) {
            var e = this._zoom !== a;
            b || (this.fire("movestart"), e && this.fire("zoomstart"));
            this._zoom = a;
            this._initialCenter = f;
            this._initialTopLeftPoint = this._getNewTopLeftPoint(f);
            d ? this._initialTopLeftPoint._add(this._getMapPanePos()) : c.DomUtil.setPosition(this._mapPane, new c.Point(0, 0));
            this._tileLayersToLoad = this._tileLayersNum;
            f = !this._loaded;
            this._loaded = !0;
            f && (this.fire("load"),
                                this.eachLayer(this._layerAdd, this));
            this.fire("viewreset", {
                hard: !d
            });
            this.fire("move");
            (e || b) && this.fire("zoomend");
            this.fire("moveend", {
                hard: !d
            })
        },
        _rawPanBy: function (f) {
            c.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(f))
        },
        _getZoomSpan: function () {
            return this.getMaxZoom() - this.getMinZoom()
        },
        _updateZoomLevels: function () {
            var f, a = Infinity,
                                c = -Infinity,
                                b = this._getZoomSpan();
            for (f in this._zoomBoundLayers) {
                var e = this._zoomBoundLayers[f];
                isNaN(e.options.minZoom) || (a = Math.min(a, e.options.minZoom));
                isNaN(e.options.maxZoom) || (c = Math.max(c, e.options.maxZoom))
            }
            f === d ? this._layersMaxZoom = this._layersMinZoom = d : (this._layersMaxZoom = c, this._layersMinZoom = a);
            b !== this._getZoomSpan() && this.fire("zoomlevelschange")
        },
        _panInsideMaxBounds: function () {
            this.panInsideBounds(this.options.maxBounds)
        },
        _checkIfLoaded: function () {
            if (!this._loaded) throw Error("Set map center and zoom first.");
        },
        _initEvents: function (f) {
            if (c.DomEvent) {
                f = f || "on";
                c.DomEvent[f](this._container, "click", this._onMouseClick, this);
                var d = "dblclick mousedown mouseup mouseenter mouseleave mousemove contextmenu".split(" "),
                                        b, e;
                b = 0;
                for (e = d.length; b < e; b++) c.DomEvent[f](this._container, d[b], this._fireMouseEvent, this);
                if (this.options.trackResize) c.DomEvent[f](a, "resize", this._onResize, this)
            }
        },
        _onResize: function () {
            c.Util.cancelAnimFrame(this._resizeRequest);
            this._resizeRequest = c.Util.requestAnimFrame(function () {
                this.invalidateSize({
                    debounceMoveend: !0
                })
            }, this, !1, this._container)
        },
        _onMouseClick: function (f) {
            if (this._loaded && !(!f._simulated && (this.dragging && this.dragging.moved() || this.boxZoom && this.boxZoom.moved()) || c.DomEvent._skipped(f))) this.fire("preclick"),
                        this._fireMouseEvent(f)
        },
        _fireMouseEvent: function (f) {
            if (this._loaded && !c.DomEvent._skipped(f)) {
                var a = f.type,
                                        a = "mouseenter" === a ? "mouseover" : "mouseleave" === a ? "mouseout" : a;
                if (this.hasEventListeners(a)) {
                    "contextmenu" === a && c.DomEvent.preventDefault(f);
                    var d = this.mouseEventToContainerPoint(f),
                                                b = this.containerPointToLayerPoint(d),
                                                e = this.layerPointToLatLng(b);
                    this.fire(a, {
                        latlng: e,
                        layerPoint: b,
                        containerPoint: d,
                        originalEvent: f
                    })
                }
            }
        },
        _onTileLayerLoad: function () {
            this._tileLayersToLoad--;
            this._tileLayersNum && !this._tileLayersToLoad && this.fire("tilelayersload")
        },
        _clearHandlers: function () {
            for (var f = 0, a = this._handlers.length; f < a; f++) this._handlers[f].disable()
        },
        whenReady: function (f, a) {
            if (this._loaded) f.call(a || this, this);
            else this.on("load", f, a);
            return this
        },
        _layerAdd: function (f) {
            f.onAdd(this);
            this.fire("layeradd", {
                layer: f
            })
        },
        _getMapPanePos: function () {
            return c.DomUtil.getPosition(this._mapPane)
        },
        _moved: function () {
            var f = this._getMapPanePos();
            return f && !f.equals([0, 0])
        },
        _getTopLeftPoint: function () {
            return this.getPixelOrigin().subtract(this._getMapPanePos())
        },
        _getNewTopLeftPoint: function (f, a) {
            var c = this.getSize()._divideBy(2);
            return this.project(f, a)._subtract(c)._round()
        },
        _latLngToNewLayerPoint: function (f, a, c) {
            c = this._getNewTopLeftPoint(c, a).add(this._getMapPanePos());
            return this.project(f, a)._subtract(c)
        },
        _getCenterLayerPoint: function () {
            return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
        },
        _getCenterOffset: function (f) {
            return this.latLngToLayerPoint(f).subtract(this._getCenterLayerPoint())
        },
        _limitCenter: function (f, a, d) {
            if (!d) return f;
            f =
                                this.project(f, a);
            var b = this.getSize().divideBy(2),
                                b = new c.Bounds(f.subtract(b), f.add(b));
            d = this._getBoundsOffset(b, d, a);
            return this.unproject(f.add(d), a)
        },
        _limitOffset: function (f, a) {
            if (!a) return f;
            var d = this.getPixelBounds(),
                                d = new c.Bounds(d.min.add(f), d.max.add(f));
            return f.add(this._getBoundsOffset(d, a))
        },
        _getBoundsOffset: function (f, a, d) {
            var b = this.project(a.getNorthWest(), d).subtract(f.min);
            a = this.project(a.getSouthEast(), d).subtract(f.max);
            f = this._rebound(b.x, -a.x);
            b = this._rebound(b.y, -a.y);
            return new c.Point(f, b)
        },
        _rebound: function (f, a) {
            return 0 < f + a ? Math.round(f - a) / 2 : Math.max(0, Math.ceil(f)) - Math.max(0, Math.floor(a))
        },
        _limitZoom: function (f) {
            var a = this.getMinZoom(),
                                c = this.getMaxZoom();
            return Math.max(a, Math.min(c, f))
        }
    });
    c.map = function (f, a) {
        return new c.Map(f, a)
    };
    c.Projection.Mercator = {
        MAX_LATITUDE: 85.0840591556,
        R_MINOR: 6356752.314245179,
        R_MAJOR: 6378137,
        project: function (f) {
            var a = c.LatLng.DEG_TO_RAD,
                                d = this.MAX_LATITUDE,
                                b = Math.max(Math.min(d, f.lat), -d),
                                d = this.R_MAJOR;
            f = f.lng * a * d;
            var a =
                                b * a,
                                b = this.R_MINOR / d,
                                b = Math.sqrt(1 - b * b),
                                e = b * Math.sin(a),
                                e = Math.pow((1 - e) / (1 + e), 0.5 * b),
                                a = Math.tan(0.5 * (0.5 * Math.PI - a)) / e,
                                a = -d * Math.log(a);
            return new c.Point(f, a)
        },
        unproject: function (f) {
            var a = c.LatLng.RAD_TO_DEG,
                                d = this.R_MAJOR,
                                b = f.x * a / d,
                                e = this.R_MINOR / d,
                                e = Math.sqrt(1 - e * e);
            f = Math.exp(-f.y / d);
            for (var d = Math.PI / 2 - 2 * Math.atan(f), g = 15, h = 0.1; 1E-7 < Math.abs(h) && 0 < --g; ) h = e * Math.sin(d), h = Math.PI / 2 - 2 * Math.atan(f * Math.pow((1 - h) / (1 + h), 0.5 * e)) - d, d += h;
            return new c.LatLng(d * a, b)
        }
    };
    c.CRS.EPSG3395 = c.extend({}, c.CRS, {
        code: "EPSG:3395",
        projection: c.Projection.Mercator,
        transformation: function () {
            var f = 0.5 / (Math.PI * c.Projection.Mercator.R_MAJOR);
            return new c.Transformation(f, 0.5, -f, 0.5)
        } ()
    });
    c.TileLayer = c.Class.extend({
        includes: c.Mixin.Events,
        options: {
            minZoom: 0,
            maxZoom: 18,
            tileSize: 256,
            subdomains: "abc",
            errorTileUrl: "",
            attribution: "",
            zoomOffset: 0,
            opacity: 1,
            unloadInvisibleTiles: c.Browser.mobile,
            updateWhenIdle: c.Browser.mobile
        },
        initialize: function (f, a) {
            a = c.setOptions(this, a);
            a.detectRetina && (c.Browser.retina && 0 < a.maxZoom) &&
                                (a.tileSize = Math.floor(a.tileSize / 2), a.zoomOffset++, 0 < a.minZoom && a.minZoom--, this.options.maxZoom--);
            a.bounds && (a.bounds = c.latLngBounds(a.bounds));
            this._url = f;
            var d = this.options.subdomains;
            "string" === typeof d && (this.options.subdomains = d.split(""))
        },
        onAdd: function (f) {
            this._map = f;
            this._animated = f._zoomAnimated;
            this._initContainer();
            f.on({
                viewreset: this._reset,
                moveend: this._update
            }, this);
            if (this._animated) f.on({
                zoomanim: this._animateZoom,
                zoomend: this._endZoomAnim
            }, this);
            this.options.updateWhenIdle ||
                                (this._limitedUpdate = c.Util.limitExecByInterval(this._update, 150, this), f.on("move", this._limitedUpdate, this));
            this._reset();
            this._update()
        },
        addTo: function (f) {
            f.addLayer(this);
            return this
        },
        onRemove: function (f) {
            this._container.parentNode.removeChild(this._container);
            f.off({
                viewreset: this._reset,
                moveend: this._update
            }, this);
            this._animated && f.off({
                zoomanim: this._animateZoom,
                zoomend: this._endZoomAnim
            }, this);
            this.options.updateWhenIdle || f.off("move", this._limitedUpdate, this);
            this._map = this._container = null
        },
        bringToFront: function () {
            var f = this._map._panes.tilePane;
            this._container && (f.appendChild(this._container), this._setAutoZIndex(f, Math.max));
            return this
        },
        bringToBack: function () {
            var f = this._map._panes.tilePane;
            this._container && (f.insertBefore(this._container, f.firstChild), this._setAutoZIndex(f, Math.min));
            return this
        },
        getAttribution: function () {
            return this.options.attribution
        },
        getContainer: function () {
            return this._container
        },
        setOpacity: function (f) {
            this.options.opacity = f;
            this._map && this._updateOpacity();
            return this
        },
        setZIndex: function (f) {
            this.options.zIndex = f;
            this._updateZIndex();
            return this
        },
        setUrl: function (f, a) {
            this._url = f;
            a || this.redraw();
            return this
        },
        redraw: function () {
            this._map && (this._reset({
                hard: !0
            }), this._update());
            return this
        },
        _updateZIndex: function () {
            this._container && this.options.zIndex !== d && (this._container.style.zIndex = this.options.zIndex)
        },
        _setAutoZIndex: function (f, a) {
            var c = f.children,
                                d = -a(Infinity, -Infinity),
                                b, e, g;
            e = 0;
            for (g = c.length; e < g; e++) c[e] !== this._container && (b = parseInt(c[e].style.zIndex,
                                10), isNaN(b) || (d = a(d, b)));
            this.options.zIndex = this._container.style.zIndex = (isFinite(d) ? d : 0) + a(1, -1)
        },
        _updateOpacity: function () {
            var f, a = this._tiles;
            if (c.Browser.ielt9)
                for (f in a) c.DomUtil.setOpacity(a[f], this.options.opacity);
            else c.DomUtil.setOpacity(this._container, this.options.opacity)
        },
        _initContainer: function () {
            var f = this._map._panes.tilePane;
            this._container || (this._container = c.DomUtil.create("div", "leaflet-layer"), this._updateZIndex(), this._animated ? (this._bgBuffer = c.DomUtil.create("div", "leaflet-tile-container",
                                this._container), this._tileContainer = c.DomUtil.create("div", "leaflet-tile-container", this._container)) : this._tileContainer = this._container, f.appendChild(this._container), 1 > this.options.opacity && this._updateOpacity())
        },
        _reset: function (f) {
            for (var a in this._tiles) this.fire("tileunload", {
                tile: this._tiles[a]
            });
            this._tiles = {};
            this._tilesToLoad = 0;
            this.options.reuseTiles && (this._unusedTiles = []);
            this._tileContainer.innerHTML = "";
            this._animated && (f && f.hard) && this._clearBgBuffer();
            this._initContainer()
        },
        _getTileSize: function () {
            var f =
                                this._map,
                                a = f.getZoom() + this.options.zoomOffset,
                                c = this.options.maxNativeZoom,
                                d = this.options.tileSize;
            c && a > c && (d = Math.round(f.getZoomScale(a) / f.getZoomScale(c) * d));
            return d
        },
        _update: function () {
            if (this._map) {
                var f = this._map,
                                        a = f.getPixelBounds(),
                                        f = f.getZoom(),
                                        d = this._getTileSize();
                f > this.options.maxZoom || f < this.options.minZoom || (a = c.bounds(a.min.divideBy(d)._floor(), a.max.divideBy(d)._floor()), this._addTilesFromCenterOut(a), (this.options.unloadInvisibleTiles || this.options.reuseTiles) && this._removeOtherTiles(a))
            }
        },
        _addTilesFromCenterOut: function (f) {
            var a = [],
                                d = f.getCenter(),
                                e, g, h;
            for (e = f.min.y; e <= f.max.y; e++)
                for (g = f.min.x; g <= f.max.x; g++) h = new c.Point(g, e), this._tileShouldBeLoaded(h) && a.push(h);
            f = a.length;
            if (0 !== f) {
                a.sort(function (f, a) {
                    return f.distanceTo(d) - a.distanceTo(d)
                });
                e = b.createDocumentFragment();
                this._tilesToLoad || this.fire("loading");
                this._tilesToLoad += f;
                for (g = 0; g < f; g++) this._addTile(a[g], e);
                this._tileContainer.appendChild(e)
            }
        },
        _tileShouldBeLoaded: function (f) {
            if (f.x + ":" + f.y in this._tiles) return !1;
            var a = this.options;
            if (!a.continuousWorld) {
                var c = this._getWrapTileNum();
                if (a.noWrap && (0 > f.x || f.x >= c.x) || 0 > f.y || f.y >= c.y) return !1
            }
            return a.bounds && (c = a.tileSize, f = f.multiplyBy(c), c = f.add([c, c]), f = this._map.unproject(f), c = this._map.unproject(c), !a.continuousWorld && !a.noWrap && (f = f.wrap(), c = c.wrap()), !a.bounds.intersects([f, c])) ? !1 : !0
        },
        _removeOtherTiles: function (f) {
            var a, c, d;
            for (d in this._tiles) a = d.split(":"), c = parseInt(a[0], 10), a = parseInt(a[1], 10), (c < f.min.x || c > f.max.x || a < f.min.y || a > f.max.y) && this._removeTile(d)
        },
        _removeTile: function (f) {
            var a = this._tiles[f];
            this.fire("tileunload", {
                tile: a,
                url: a.src
            });
            this.options.reuseTiles ? (c.DomUtil.removeClass(a, "leaflet-tile-loaded"), this._unusedTiles.push(a)) : a.parentNode === this._tileContainer && this._tileContainer.removeChild(a);
            c.Browser.android || (a.onload = null, a.src = c.Util.emptyImageUrl);
            delete this._tiles[f]
        },
        _addTile: function (f, a) {
            var d = this._getTilePos(f),
                                b = this._getTile();
            c.DomUtil.setPosition(b, d, c.Browser.chrome);
            this._tiles[f.x + ":" + f.y] = b;
            this._loadTile(b, f);
            b.parentNode !== this._tileContainer && a.appendChild(b)
        },
        _getZoomForUrl: function () {
            var f = this.options,
                                a = this._map.getZoom();
            f.zoomReverse && (a = f.maxZoom - a);
            a += f.zoomOffset;
            return f.maxNativeZoom ? Math.min(a, f.maxNativeZoom) : a
        },
        _getTilePos: function (f) {
            var a = this._map.getPixelOrigin(),
                                c = this._getTileSize();
            return f.multiplyBy(c).subtract(a)
        },
        getTileUrl: function (f) {
            return c.Util.template(this._url, c.extend({
                s: this._getSubdomain(f),
                z: f.z,
                x: f.x,
                y: f.y
            }, this.options))
        },
        _getWrapTileNum: function () {
            return this._map.options.crs.getSize(this._map.getZoom()).divideBy(this._getTileSize())._floor()
        },
        _adjustTilePoint: function (f) {
            var a = this._getWrapTileNum();
            !this.options.continuousWorld && !this.options.noWrap && (f.x = (f.x % a.x + a.x) % a.x);
            this.options.tms && (f.y = a.y - f.y - 1);
            f.z = this._getZoomForUrl()
        },
        _getSubdomain: function (f) {
            f = Math.abs(f.x + f.y) % this.options.subdomains.length;
            return this.options.subdomains[f]
        },
        _getTile: function () {
            if (this.options.reuseTiles && 0 < this._unusedTiles.length) {
                var f = this._unusedTiles.pop();
                this._resetTile(f);
                return f
            }
            return this._createTile()
        },
        _resetTile: function () { },
        _createTile: function () {
            var f =
                                c.DomUtil.create("img", "leaflet-tile");
            f.style.width = f.style.height = this._getTileSize() + "px";
            f.galleryimg = "no";
            f.onselectstart = f.onmousemove = c.Util.falseFn;
            c.Browser.ielt9 && this.options.opacity !== d && c.DomUtil.setOpacity(f, this.options.opacity);
            c.Browser.mobileWebkit3d && (f.style.WebkitBackfaceVisibility = "hidden");
            return f
        },
        _loadTile: function (f, a) {
            f._layer = this;
            f.onload = this._tileOnLoad;
            f.onerror = this._tileOnError;
            this._adjustTilePoint(a);
            f.src = this.getTileUrl(a);
            this.fire("tileloadstart", {
                tile: f,
                url: f.src
            })
        },
        _tileLoaded: function () {
            this._tilesToLoad--;
            this._animated && c.DomUtil.addClass(this._tileContainer, "leaflet-zoom-animated");
            this._tilesToLoad || (this.fire("load"), this._animated && (clearTimeout(this._clearBgBufferTimer), this._clearBgBufferTimer = setTimeout(c.bind(this._clearBgBuffer, this), 500)))
        },
        _tileOnLoad: function () {
            var f = this._layer;
            this.src !== c.Util.emptyImageUrl && (c.DomUtil.addClass(this, "leaflet-tile-loaded"), f.fire("tileload", {
                tile: this,
                url: this.src
            }));
            f._tileLoaded()
        },
        _tileOnError: function () {
            var f =
                                this._layer;
            f.fire("tileerror", {
                tile: this,
                url: this.src
            });
            var a = f.options.errorTileUrl;
            a && (this.src = a);
            f._tileLoaded()
        }
    });
    c.tileLayer = function (f, a) {
        return new c.TileLayer(f, a)
    };
    c.TileLayer.WMS = c.TileLayer.extend({
        defaultWmsParams: {
            service: "WMS",
            request: "GetMap",
            version: "1.1.1",
            layers: "",
            styles: "",
            format: "image/jpeg",
            transparent: !1
        },
        initialize: function (f, a) {
            this._url = f;
            var d = c.extend({}, this.defaultWmsParams),
                                b = a.tileSize || this.options.tileSize;
            d.width = a.detectRetina && c.Browser.retina ? d.height = 2 * b :
                                d.height = b;
            for (var e in a) !this.options.hasOwnProperty(e) && "crs" !== e && (d[e] = a[e]);
            this.wmsParams = d;
            c.setOptions(this, a)
        },
        onAdd: function (f) {
            this._crs = this.options.crs || f.options.crs;
            this._wmsVersion = parseFloat(this.wmsParams.version);
            this.wmsParams[1.3 <= this._wmsVersion ? "crs" : "srs"] = this._crs.code;
            c.TileLayer.prototype.onAdd.call(this, f)
        },
        getTileUrl: function (f) {
            var a = this._map,
                                d = this.options.tileSize,
                                b = f.multiplyBy(d),
                                d = b.add([d, d]),
                                b = this._crs.project(a.unproject(b, f.z)),
                                a = this._crs.project(a.unproject(d,
                                        f.z)),
                                a = 1.3 <= this._wmsVersion && this._crs === c.CRS.EPSG4326 ? [a.y, b.x, b.y, a.x].join() : [b.x, a.y, a.x, b.y].join();
            f = c.Util.template(this._url, {
                s: this._getSubdomain(f)
            });
            return f + c.Util.getParamString(this.wmsParams, f, !1) + "&bbox=" + a
        },
        setParams: function (f, a) {
            c.extend(this.wmsParams, f);
            a || this.redraw();
            return this
        }
    });
    c.tileLayer.wms = function (a, d) {
        return new c.TileLayer.WMS(a, d)
    };
    c.TileLayer.Canvas = c.TileLayer.extend({
        options: {
            async: !1
        },
        initialize: function (a) {
            c.setOptions(this, a)
        },
        redraw: function () {
            this._map &&
                                (this._reset({
                                    hard: !0
                                }), this._update());
            for (var a in this._tiles) this._redrawTile(this._tiles[a]);
            return this
        },
        _redrawTile: function (a) {
            this.drawTile(a, a._tilePoint, this._map._zoom)
        },
        _createTile: function () {
            var a = c.DomUtil.create("canvas", "leaflet-tile");
            a.width = a.height = this.options.tileSize;
            a.onselectstart = a.onmousemove = c.Util.falseFn;
            return a
        },
        _loadTile: function (a, c) {
            a._layer = this;
            a._tilePoint = c;
            this._redrawTile(a);
            this.options.async || this.tileDrawn(a)
        },
        drawTile: function () { },
        tileDrawn: function (a) {
            this._tileOnLoad.call(a)
        }
    });
    c.tileLayer.canvas = function (a) {
        return new c.TileLayer.Canvas(a)
    };
    c.ImageOverlay = c.Class.extend({
        includes: c.Mixin.Events,
        options: {
            opacity: 1
        },
        initialize: function (a, d, b) {
            this._url = a;
            this._bounds = c.latLngBounds(d);
            c.setOptions(this, b)
        },
        onAdd: function (a) {
            this._map = a;
            this._image || this._initImage();
            a._panes.overlayPane.appendChild(this._image);
            a.on("viewreset", this._reset, this);
            if (a.options.zoomAnimation && c.Browser.any3d) a.on("zoomanim", this._animateZoom, this);
            this._reset()
        },
        onRemove: function (a) {
            a.getPanes().overlayPane.removeChild(this._image);
            a.off("viewreset", this._reset, this);
            a.options.zoomAnimation && a.off("zoomanim", this._animateZoom, this)
        },
        addTo: function (a) {
            a.addLayer(this);
            return this
        },
        setOpacity: function (a) {
            this.options.opacity = a;
            this._updateOpacity();
            return this
        },
        bringToFront: function () {
            this._image && this._map._panes.overlayPane.appendChild(this._image);
            return this
        },
        bringToBack: function () {
            var a = this._map._panes.overlayPane;
            this._image && a.insertBefore(this._image, a.firstChild);
            return this
        },
        setUrl: function (a) {
            this._url = a;
            this._image.src =
                                this._url
        },
        getAttribution: function () {
            return this.options.attribution
        },
        _initImage: function () {
            this._image = c.DomUtil.create("img", "leaflet-image-layer");
            this._map.options.zoomAnimation && c.Browser.any3d ? c.DomUtil.addClass(this._image, "leaflet-zoom-animated") : c.DomUtil.addClass(this._image, "leaflet-zoom-hide");
            this._updateOpacity();
            c.extend(this._image, {
                galleryimg: "no",
                onselectstart: c.Util.falseFn,
                onmousemove: c.Util.falseFn,
                onload: c.bind(this._onImageLoad, this),
                src: this._url
            })
        },
        _animateZoom: function (a) {
            var d =
                                this._map,
                                b = this._image,
                                e = d.getZoomScale(a.zoom),
                                g = this._bounds.getNorthWest(),
                                h = this._bounds.getSouthEast(),
                                g = d._latLngToNewLayerPoint(g, a.zoom, a.center);
            a = d._latLngToNewLayerPoint(h, a.zoom, a.center)._subtract(g);
            a = g._add(a._multiplyBy(0.5 * (1 - 1 / e)));
            b.style[c.DomUtil.TRANSFORM] = c.DomUtil.getTranslateString(a) + " scale(" + e + ") "
        },
        _reset: function () {
            var a = this._image,
                                d = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
                                b = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(d);
            c.DomUtil.setPosition(a,
                                d);
            a.style.width = b.x + "px";
            a.style.height = b.y + "px"
        },
        _onImageLoad: function () {
            this.fire("load")
        },
        _updateOpacity: function () {
            c.DomUtil.setOpacity(this._image, this.options.opacity)
        }
    });
    c.imageOverlay = function (a, d, b) {
        return new c.ImageOverlay(a, d, b)
    };
    c.Icon = c.Class.extend({
        options: {
            className: ""
        },
        initialize: function (a) {
            c.setOptions(this, a)
        },
        createIcon: function (a) {
            return this._createIcon("icon", a)
        },
        createShadow: function (a) {
            return this._createIcon("shadow", a)
        },
        _createIcon: function (a, c) {
            var d = this._getIconUrl(a);
            if (!d) {
                if ("icon" === a) throw Error("iconUrl not set in Icon options (see the docs).");
                return null
            }
            d = !c || "IMG" !== c.tagName ? this._createImg(d) : this._createImg(d, c);
            this._setIconStyles(d, a);
            return d
        },
        _setIconStyles: function (a, d) {
            var b = this.options,
                                e = c.point(b[d + "Size"]),
                                g;
            g = "shadow" === d ? c.point(b.shadowAnchor || b.iconAnchor) : c.point(b.iconAnchor);
            !g && e && (g = e.divideBy(2, !0));
            a.className = "leaflet-marker-" + d + " " + b.className;
            g && (a.style.marginLeft = -g.x + "px", a.style.marginTop = -g.y + "px");
            e && (a.style.width = e.x +
                                "px", a.style.height = e.y + "px")
        },
        _createImg: function (a, d) {
            c.Browser.ie6 ? (d = b.createElement("div"), d.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + a + '")') : (d = b.createElement("img"), d.src = a);
            return d
        },
        _getIconUrl: function (a) {
            return c.Browser.retina && this.options[a + "RetinaUrl"] ? this.options[a + "RetinaUrl"] : this.options[a + "Url"]
        }
    });
    c.icon = function (a) {
        return new c.Icon(a)
    };
    c.Icon.Default = c.Icon.extend({
        options: {
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41,
                41
            ]
        },
        _getIconUrl: function (a) {
            var d = a + "Url";
            if (this.options[d]) return this.options[d];
            c.Browser.retina && "icon" === a && (a += "-2x");
            d = c.Icon.Default.imagePath;
            if (!d) throw Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
            return d + "/marker-" + a + ".png"
        }
    });
    h = c.Icon.Default;
    a: 
    {
        p = b.getElementsByTagName("script");
        r = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;
        q = 0;
        for (s = p.length; q < s; q++)
            if (u = p[q].src, w = u.match(r)) {
                p = u.split(r)[0];
                p = (p ? p + "/" : "") + "images";
                break a
            }
        p = void 0
    }
    h.imagePath = p;
    c.Marker =
                c.Class.extend({
                    includes: c.Mixin.Events,
                    options: {
                        icon: new c.Icon.Default,
                        title: "",
                        alt: "",
                        clickable: !0,
                        draggable: !1,
                        keyboard: !0,
                        zIndexOffset: 0,
                        opacity: 1,
                        riseOnHover: !1,
                        riseOffset: 250
                    },
                    initialize: function (a, d) {
                        c.setOptions(this, d);
                        this._latlng = c.latLng(a)
                    },
                    onAdd: function (a) {
                        this._map = a;
                        a.on("viewreset", this.update, this);
                        this._initIcon();
                        this.update();
                        this.fire("add");
                        if (a.options.zoomAnimation && a.options.markerZoomAnimation) a.on("zoomanim", this._animateZoom, this)
                    },
                    addTo: function (a) {
                        a.addLayer(this);
                        return this
                    },
                    onRemove: function (a) {
                        this.dragging && this.dragging.disable();
                        this._removeIcon();
                        this._removeShadow();
                        this.fire("remove");
                        a.off({
                            viewreset: this.update,
                            zoomanim: this._animateZoom
                        }, this);
                        this._map = null
                    },
                    getLatLng: function () {
                        return this._latlng
                    },
                    setLatLng: function (a) {
                        this._latlng = c.latLng(a);
                        this.update();
                        return this.fire("move", {
                            latlng: this._latlng
                        })
                    },
                    setZIndexOffset: function (a) {
                        this.options.zIndexOffset = a;
                        this.update();
                        return this
                    },
                    setIcon: function (a) {
                        this.options.icon = a;
                        this._map && (this._initIcon(),
                                        this.update());
                        this._popup && this.bindPopup(this._popup);
                        return this
                    },
                    update: function () {
                        if (this._icon) {
                            var a = this._map.latLngToLayerPoint(this._latlng).round();
                            this._setPos(a)
                        }
                        return this
                    },
                    _initIcon: function () {
                        var a = this.options,
                                        d = this._map,
                                        b = d.options.zoomAnimation && d.options.markerZoomAnimation ? "leaflet-zoom-animated" : "leaflet-zoom-hide",
                                        e = a.icon.createIcon(this._icon),
                                        d = !1;
                        e !== this._icon && (this._icon && this._removeIcon(), d = !0, a.title && (e.title = a.title), a.alt && (e.alt = a.alt));
                        c.DomUtil.addClass(e,
                                        b);
                        a.keyboard && (e.tabIndex = "0");
                        this._icon = e;
                        this._initInteraction();
                        if (a.riseOnHover) c.DomEvent.on(e, "mouseover", this._bringToFront, this).on(e, "mouseout", this._resetZIndex, this);
                        var e = a.icon.createShadow(this._shadow),
                                        g = !1;
                        e !== this._shadow && (this._removeShadow(), g = !0);
                        e && c.DomUtil.addClass(e, b);
                        this._shadow = e;
                        1 > a.opacity && this._updateOpacity();
                        a = this._map._panes;
                        d && a.markerPane.appendChild(this._icon);
                        e && g && a.shadowPane.appendChild(this._shadow)
                    },
                    _removeIcon: function () {
                        this.options.riseOnHover &&
                                        c.DomEvent.off(this._icon, "mouseover", this._bringToFront).off(this._icon, "mouseout", this._resetZIndex);
                        this._map._panes.markerPane.removeChild(this._icon);
                        this._icon = null
                    },
                    _removeShadow: function () {
                        this._shadow && this._map._panes.shadowPane.removeChild(this._shadow);
                        this._shadow = null
                    },
                    _setPos: function (a) {
                        c.DomUtil.setPosition(this._icon, a);
                        this._shadow && c.DomUtil.setPosition(this._shadow, a);
                        this._zIndex = a.y + this.options.zIndexOffset;
                        this._resetZIndex()
                    },
                    _updateZIndex: function (a) {
                        this._icon.style.zIndex =
                                        this._zIndex + a
                    },
                    _animateZoom: function (a) {
                        a = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center).round();
                        this._setPos(a)
                    },
                    _initInteraction: function () {
                        if (this.options.clickable) {
                            var a = this._icon,
                                                d = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
                            c.DomUtil.addClass(a, "leaflet-clickable");
                            c.DomEvent.on(a, "click", this._onMouseClick, this);
                            c.DomEvent.on(a, "keypress", this._onKeyPress, this);
                            for (var b = 0; b < d.length; b++) c.DomEvent.on(a, d[b], this._fireMouseEvent, this);
                            c.Handler.MarkerDrag &&
                                                (this.dragging = new c.Handler.MarkerDrag(this), this.options.draggable && this.dragging.enable())
                        }
                    },
                    _onMouseClick: function (a) {
                        var d = this.dragging && this.dragging.moved();
                        (this.hasEventListeners(a.type) || d) && c.DomEvent.stopPropagation(a);
                        d || (this.dragging && this.dragging._enabled || !this._map.dragging || !this._map.dragging.moved()) && this.fire(a.type, {
                            originalEvent: a,
                            latlng: this._latlng
                        })
                    },
                    _onKeyPress: function (a) {
                        13 === a.keyCode && this.fire("click", {
                            originalEvent: a,
                            latlng: this._latlng
                        })
                    },
                    _fireMouseEvent: function (a) {
                        this.fire(a.type, {
                            originalEvent: a,
                            latlng: this._latlng
                        });
                        "contextmenu" === a.type && this.hasEventListeners(a.type) && c.DomEvent.preventDefault(a);
                        "mousedown" !== a.type ? c.DomEvent.stopPropagation(a) : c.DomEvent.preventDefault(a)
                    },
                    setOpacity: function (a) {
                        this.options.opacity = a;
                        this._map && this._updateOpacity();
                        return this
                    },
                    _updateOpacity: function () {
                        c.DomUtil.setOpacity(this._icon, this.options.opacity);
                        this._shadow && c.DomUtil.setOpacity(this._shadow, this.options.opacity)
                    },
                    _bringToFront: function () {
                        this._updateZIndex(this.options.riseOffset)
                    },
                    _resetZIndex: function () {
                        this._updateZIndex(0)
                    }
                });
    c.marker = function (a, d) {
        return new c.Marker(a, d)
    };
    c.DivIcon = c.Icon.extend({
        options: {
            iconSize: [12, 12],
            className: "leaflet-div-icon",
            html: !1
        },
        createIcon: function (a) {
            a = a && "DIV" === a.tagName ? a : b.createElement("div");
            var c = this.options;
            a.innerHTML = !1 !== c.html ? c.html : "";
            c.bgPos && (a.style.backgroundPosition = -c.bgPos.x + "px " + -c.bgPos.y + "px");
            this._setIconStyles(a, "icon");
            return a
        },
        createShadow: function () {
            return null
        }
    });
    c.divIcon = function (a) {
        return new c.DivIcon(a)
    };
    c.Map.mergeOptions({
        closePopupOnClick: !1
    });
    c.Popup = c.Class.extend({
        includes: c.Mixin.Events,
        options: {
            minWidth: 50,
            maxWidth: 300,
            autoPan: !0,
            closeButton: !0,
            offset: [0, 7],
            autoPanPadding: [5, 5],
            keepInView: !1,
            className: "",
            zoomAnimation: !0
        },
        initialize: function (a, d) {
            c.setOptions(this, a);
            this._source = d;
            this._animated = c.Browser.any3d && this.options.zoomAnimation;
            this._isOpen = !1
        },
        onAdd: function (a) {
            this._map = a;
            this._container || this._initLayout();
            var d = a.options.fadeAnimation;
            d && c.DomUtil.setOpacity(this._container,
                                0);
            a._panes.popupPane.appendChild(this._container);
            a.on(this._getEvents(), this);
            this.update();
            d && c.DomUtil.setOpacity(this._container, 1);
            this.fire("open");
            a.fire("popupopen", {
                popup: this
            });
            this._source && this._source.fire("popupopen", {
                popup: this
            })
        },
        addTo: function (a) {
            a.addLayer(this);
            return this
        },
        openOn: function (a) {
            a.openPopup(this);
            return this
        },
        onRemove: function (a) {
            a._panes.popupPane.removeChild(this._container);
            c.Util.falseFn(this._container.offsetWidth);
            a.off(this._getEvents(), this);
            a.options.fadeAnimation &&
                                c.DomUtil.setOpacity(this._container, 0);
            this._map = null;
            this.fire("close");
            a.fire("popupclose", {
                popup: this
            });
            this._source && this._source.fire("popupclose", {
                popup: this
            })
        },
        getLatLng: function () {
            return this._latlng
        },
        setLatLng: function (a) {
            this._latlng = c.latLng(a);
            this._map && (this._updatePosition(), this._adjustPan());
            return this
        },
        getContent: function () {
            return this._content
        },
        setContent: function (a) {
            this._content = a;
            this.update();
            return this
        },
        update: function () {
            this._map && (this._container.style.visibility = "hidden",
                                this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
        },
        _getEvents: function () {
            var a = {
                viewreset: this._updatePosition
            };
            this._animated && (a.zoomanim = this._zoomAnimation);
            if ("closeOnClick" in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) a.preclick = this._close;
            this.options.keepInView && (a.moveend = this._adjustPan);
            return a
        },
        _close: function () {
            this._map && this._map.closePopup(this)
        },
        _initLayout: function () {
            var a = this._container =
                                c.DomUtil.create("div", "leaflet-popup " + this.options.className + " leaflet-zoom-" + (this._animated ? "animated" : "hide")),
                                d;
            this.options.closeButton && (d = this._closeButton = c.DomUtil.create("a", "leaflet-popup-close-button", a), d.href = "#close", d.innerHTML = "&#215;", c.DomEvent.disableClickPropagation(d), c.DomEvent.on(d, "click", this._onCloseButtonClick, this));
            d = this._wrapper = c.DomUtil.create("div", "leaflet-popup-content-wrapper", a);
            c.DomEvent.disableClickPropagation(d);
            this._contentNode = c.DomUtil.create("div",
                                "leaflet-popup-content", d);
            c.DomEvent.disableScrollPropagation(this._contentNode);
            c.DomEvent.on(d, "contextmenu", c.DomEvent.stopPropagation);
            this._tipContainer = c.DomUtil.create("div", "leaflet-popup-tip-container", a);
            this._tip = c.DomUtil.create("div", "leaflet-popup-tip", this._tipContainer)
        },
        _updateContent: function () {
            if (this._content) {
                if ("string" === typeof this._content) this._contentNode.innerHTML = this._content;
                else {
                    for (; this._contentNode.hasChildNodes(); ) this._contentNode.removeChild(this._contentNode.firstChild);
                    this._contentNode.appendChild(this._content)
                }
                this.fire("contentupdate")
            }
        },
        _updateLayout: function () {
            var a = this._contentNode,
                                d = a.style;
            d.width = "";
            d.whiteSpace = "nowrap";
            var b = a.offsetWidth,
                                b = Math.min(b, this.options.maxWidth),
                                b = Math.max(b, this.options.minWidth);
            d.width = b + 1 + "px";
            d.whiteSpace = "";
            d.height = "";
            var b = a.offsetHeight,
                                e = this.options.maxHeight;
            e && b > e ? (d.height = e + "px", c.DomUtil.addClass(a, "leaflet-popup-scrolled")) : c.DomUtil.removeClass(a, "leaflet-popup-scrolled");
            this._containerWidth = this._container.offsetWidth
        },
        _updatePosition: function () {
            if (this._map) {
                var a = this._map.latLngToLayerPoint(this._latlng),
                                        d = this._animated,
                                        b = c.point(this.options.offset);
                d && c.DomUtil.setPosition(this._container, a);
                this._containerBottom = -b.y - (d ? 0 : a.y);
                this._containerLeft = -Math.round(this._containerWidth / 2) + b.x + (d ? 0 : a.x);
                this._container.style.bottom = this._containerBottom + "px";
                this._container.style.left = this._containerLeft + "px"
            }
        },
        _zoomAnimation: function (a) {
            a = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center);
            c.DomUtil.setPosition(this._container,
                                a)
        },
        _adjustPan: function () {
            if (this.options.autoPan) {
                var a = this._map,
                                        d = this._container.offsetHeight,
                                        b = this._containerWidth,
                                        e = new c.Point(this._containerLeft, -d - this._containerBottom);
                this._animated && e._add(c.DomUtil.getPosition(this._container));
                var e = a.layerPointToContainerPoint(e),
                                        g = c.point(this.options.autoPanPadding),
                                        h = c.point(this.options.autoPanPaddingTopLeft || g),
                                        g = c.point(this.options.autoPanPaddingBottomRight || g),
                                        j = a.getSize(),
                                        k = 0,
                                        l = 0;
                e.x + b + g.x > j.x && (k = e.x + b - j.x + g.x);
                0 > e.x - k - h.x && (k = e.x - h.x);
                e.y + d + g.y > j.y && (l = e.y + d - j.y + g.y);
                0 > e.y - l - h.y && (l = e.y - h.y);
                (k || l) && a.fire("autopanstart").panBy([k, l])
            }
        },
        _onCloseButtonClick: function (a) {
            this._close();
            c.DomEvent.stop(a)
        }
    });
    c.popup = function (a, d) {
        return new c.Popup(a, d)
    };
    c.Map.include({
        openPopup: function (a, d, b) {
            this.closePopup();
            a instanceof c.Popup || (a = (new c.Popup(b)).setLatLng(d).setContent(a));
            a._isOpen = !0;
            this._popup = a;
            return this.addLayer(a)
        },
        closePopup: function (a) {
            if (!a || a === this._popup) a = this._popup, this._popup = null;
            a && (this.removeLayer(a),
                                a._isOpen = !1);
            return this
        }
    });
    c.Marker.include({
        openPopup: function () {
            this._popup && (this._map && !this._map.hasLayer(this._popup)) && (this._popup.setLatLng(this._latlng), this._map.openPopup(this._popup));
            return this
        },
        closePopup: function () {
            this._popup && this._popup._close();
            return this
        },
        togglePopup: function () {
            this._popup && (this._popup._isOpen ? this.closePopup() : this.openPopup());
            return this
        },
        bindPopup: function (a, d) {
            var b = c.point(this.options.icon.options.popupAnchor || [0, 0]),
                                b = b.add(c.Popup.prototype.options.offset);
            d && d.offset && (b = b.add(d.offset));
            d = c.extend({
                offset: b
            }, d);
            this._popupHandlersAdded || (this.on("click", this.togglePopup, this).on("remove", this.closePopup, this).on("move", this._movePopup, this), this._popupHandlersAdded = !0);
            a instanceof c.Popup ? (c.setOptions(a, d), this._popup = a) : this._popup = (new c.Popup(d, this)).setContent(a);
            return this
        },
        setPopupContent: function (a) {
            this._popup && this._popup.setContent(a);
            return this
        },
        unbindPopup: function () {
            this._popup && (this._popup = null, this.off("click", this.togglePopup,
                                this).off("remove", this.closePopup, this).off("move", this._movePopup, this), this._popupHandlersAdded = !1);
            return this
        },
        getPopup: function () {
            return this._popup
        },
        _movePopup: function (a) {
            this._popup.setLatLng(a.latlng)
        }
    });
    c.LayerGroup = c.Class.extend({
        initialize: function (a) {
            this._layers = {};
            var c, d;
            if (a) {
                c = 0;
                for (d = a.length; c < d; c++) this.addLayer(a[c])
            }
        },
        addLayer: function (a) {
            var c = this.getLayerId(a);
            this._layers[c] = a;
            this._map && this._map.addLayer(a);
            return this
        },
        removeLayer: function (a) {
            a = a in this._layers ? a :
                                this.getLayerId(a);
            this._map && this._layers[a] && this._map.removeLayer(this._layers[a]);
            delete this._layers[a];
            return this
        },
        hasLayer: function (a) {
            return !a ? !1 : a in this._layers || this.getLayerId(a) in this._layers
        },
        clearLayers: function () {
            this.eachLayer(this.removeLayer, this);
            return this
        },
        invoke: function (a) {
            var c = Array.prototype.slice.call(arguments, 1),
                                d, b;
            for (d in this._layers) b = this._layers[d], b[a] && b[a].apply(b, c);
            return this
        },
        onAdd: function (a) {
            this._map = a;
            this.eachLayer(a.addLayer, a)
        },
        onRemove: function (a) {
            this.eachLayer(a.removeLayer,
                                a);
            this._map = null
        },
        addTo: function (a) {
            a.addLayer(this);
            return this
        },
        eachLayer: function (a, c) {
            for (var d in this._layers) a.call(c, this._layers[d]);
            return this
        },
        getLayer: function (a) {
            return this._layers[a]
        },
        getLayers: function () {
            var a = [],
                                c;
            for (c in this._layers) a.push(this._layers[c]);
            return a
        },
        setZIndex: function (a) {
            return this.invoke("setZIndex", a)
        },
        getLayerId: function (a) {
            return c.stamp(a)
        }
    });
    c.layerGroup = function (a) {
        return new c.LayerGroup(a)
    };
    c.FeatureGroup = c.LayerGroup.extend({
        includes: c.Mixin.Events,
        statics: {
            EVENTS: "click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose"
        },
        addLayer: function (a) {
            if (this.hasLayer(a)) return this;
            if ("on" in a) a.on(c.FeatureGroup.EVENTS, this._propagateEvent, this);
            c.LayerGroup.prototype.addLayer.call(this, a);
            this._popupContent && a.bindPopup && a.bindPopup(this._popupContent, this._popupOptions);
            return this.fire("layeradd", {
                layer: a
            })
        },
        removeLayer: function (a) {
            if (!this.hasLayer(a)) return this;
            a in this._layers && (a = this._layers[a]);
            a.off(c.FeatureGroup.EVENTS,
                                this._propagateEvent, this);
            c.LayerGroup.prototype.removeLayer.call(this, a);
            this._popupContent && this.invoke("unbindPopup");
            return this.fire("layerremove", {
                layer: a
            })
        },
        bindPopup: function (a, c) {
            this._popupContent = a;
            this._popupOptions = c;
            return this.invoke("bindPopup", a, c)
        },
        openPopup: function (a) {
            for (var c in this._layers) {
                this._layers[c].openPopup(a);
                break
            }
            return this
        },
        setStyle: function (a) {
            return this.invoke("setStyle", a)
        },
        bringToFront: function () {
            return this.invoke("bringToFront")
        },
        bringToBack: function () {
            return this.invoke("bringToBack")
        },
        getBounds: function () {
            var a = new c.LatLngBounds;
            this.eachLayer(function (d) {
                a.extend(d instanceof c.Marker ? d.getLatLng() : d.getBounds())
            });
            return a
        },
        _propagateEvent: function (a) {
            a = c.extend({
                layer: a.target,
                target: this
            }, a);
            this.fire(a.type, a)
        }
    });
    c.featureGroup = function (a) {
        return new c.FeatureGroup(a)
    };
    c.Path = c.Class.extend({
        includes: [c.Mixin.Events],
        statics: {
            CLIP_PADDING: function () {
                var f = ((c.Browser.mobile ? 1280 : 2E3) / Math.max(a.outerWidth, a.outerHeight) - 1) / 2;
                return Math.max(0, Math.min(0.5, f))
            } ()
        },
        options: {
            stroke: !0,
            color: "#0033ff",
            dashArray: null,
            lineCap: null,
            lineJoin: null,
            weight: 5,
            opacity: 0.5,
            fill: !1,
            fillColor: null,
            fillOpacity: 0.2,
            clickable: !0
        },
        initialize: function (a) {
            c.setOptions(this, a)
        },
        onAdd: function (a) {
            this._map = a;
            this._container || (this._initElements(), this._initEvents());
            this.projectLatlngs();
            this._updatePath();
            this._container && this._map._pathRoot.appendChild(this._container);
            this.fire("add");
            a.on({
                viewreset: this.projectLatlngs,
                moveend: this._updatePath
            }, this)
        },
        addTo: function (a) {
            a.addLayer(this);
            return this
        },
        onRemove: function (a) {
            a._pathRoot.removeChild(this._container);
            this.fire("remove");
            this._map = null;
            c.Browser.vml && (this._fill = this._stroke = this._container = null);
            a.off({
                viewreset: this.projectLatlngs,
                moveend: this._updatePath
            }, this)
        },
        projectLatlngs: function () { },
        setStyle: function (a) {
            c.setOptions(this, a);
            this._container && this._updateStyle();
            return this
        },
        redraw: function () {
            this._map && (this.projectLatlngs(), this._updatePath());
            return this
        }
    });
    c.Map.include({
        _updatePathViewport: function () {
            var a = c.Path.CLIP_PADDING,
                                d = this.getSize(),
                                b = c.DomUtil.getPosition(this._mapPane).multiplyBy(-1)._subtract(d.multiplyBy(a)._round()),
                                a = b.add(d.multiplyBy(1 + 2 * a)._round());
            this._pathViewport = new c.Bounds(b, a)
        }
    });
    c.Path.SVG_NS = "http://www.w3.org/2000/svg";
    c.Browser.svg = !(!b.createElementNS || !b.createElementNS(c.Path.SVG_NS, "svg").createSVGRect);
    c.Path = c.Path.extend({
        statics: {
            SVG: c.Browser.svg
        },
        bringToFront: function () {
            var a = this._map._pathRoot,
                                c = this._container;
            c && a.lastChild !== c && a.appendChild(c);
            return this
        },
        bringToBack: function () {
            var a =
                                this._map._pathRoot,
                                c = this._container,
                                d = a.firstChild;
            c && d !== c && a.insertBefore(c, d);
            return this
        },
        getPathString: function () { },
        _createElement: function (a) {
            return b.createElementNS(c.Path.SVG_NS, a)
        },
        _initElements: function () {
            this._map._initPathRoot();
            this._initPath();
            this._initStyle()
        },
        _initPath: function () {
            this._container = this._createElement("g");
            this._path = this._createElement("path");
            this.options.className && c.DomUtil.addClass(this._path, this.options.className);
            this._container.appendChild(this._path)
        },
        _initStyle: function () {
            this.options.stroke &&
                                (this._path.setAttribute("stroke-linejoin", "round"), this._path.setAttribute("stroke-linecap", "round"));
            this.options.fill && this._path.setAttribute("fill-rule", "evenodd");
            this.options.pointerEvents && this._path.setAttribute("pointer-events", this.options.pointerEvents);
            !this.options.clickable && !this.options.pointerEvents && this._path.setAttribute("pointer-events", "none");
            this._updateStyle()
        },
        _updateStyle: function () {
            this.options.stroke ? (this._path.setAttribute("stroke", this.options.color), this._path.setAttribute("stroke-opacity",
                                this.options.opacity), this._path.setAttribute("stroke-width", this.options.weight), this.options.dashArray ? this._path.setAttribute("stroke-dasharray", this.options.dashArray) : this._path.removeAttribute("stroke-dasharray"), this.options.lineCap && this._path.setAttribute("stroke-linecap", this.options.lineCap), this.options.lineJoin && this._path.setAttribute("stroke-linejoin", this.options.lineJoin)) : this._path.setAttribute("stroke", "none");
            this.options.fill ? (this._path.setAttribute("fill", this.options.fillColor ||
                                this.options.color), this._path.setAttribute("fill-opacity", this.options.fillOpacity)) : this._path.setAttribute("fill", "none")
        },
        _updatePath: function () {
            var a = this.getPathString();
            a || (a = "M0 0");
            this._path.setAttribute("d", a)
        },
        _initEvents: function () {
            if (this.options.clickable) {
                (c.Browser.svg || !c.Browser.vml) && c.DomUtil.addClass(this._path, "leaflet-clickable");
                c.DomEvent.on(this._container, "click", this._onMouseClick, this);
                for (var a = "dblclick mousedown mouseover mouseout mousemove contextmenu".split(" "),
                                                d = 0; d < a.length; d++) c.DomEvent.on(this._container, a[d], this._fireMouseEvent, this)
            }
        },
        _onMouseClick: function (a) {
            (!this._map.dragging || !this._map.dragging.moved()) && this._fireMouseEvent(a)
        },
        _fireMouseEvent: function (a) {
            if (this.hasEventListeners(a.type)) {
                var d = this._map,
                                        b = d.mouseEventToContainerPoint(a),
                                        e = d.containerPointToLayerPoint(b),
                                        d = d.layerPointToLatLng(e);
                this.fire(a.type, {
                    latlng: d,
                    layerPoint: e,
                    containerPoint: b,
                    originalEvent: a
                });
                "contextmenu" === a.type && c.DomEvent.preventDefault(a);
                "mousemove" !==
                                        a.type && c.DomEvent.stopPropagation(a)
            }
        }
    });
    c.Map.include({
        _initPathRoot: function () {
            this._pathRoot || (this._pathRoot = c.Path.prototype._createElement("svg"), this._panes.overlayPane.appendChild(this._pathRoot), this.options.zoomAnimation && c.Browser.any3d ? (c.DomUtil.addClass(this._pathRoot, "leaflet-zoom-animated"), this.on({
                zoomanim: this._animatePathZoom,
                zoomend: this._endPathZoom
            })) : c.DomUtil.addClass(this._pathRoot, "leaflet-zoom-hide"), this.on("moveend", this._updateSvgViewport), this._updateSvgViewport())
        },
        _animatePathZoom: function (a) {
            var d = this.getZoomScale(a.zoom);
            a = this._getCenterOffset(a.center)._multiplyBy(-d)._add(this._pathViewport.min);
            this._pathRoot.style[c.DomUtil.TRANSFORM] = c.DomUtil.getTranslateString(a) + " scale(" + d + ") ";
            this._pathZooming = !0
        },
        _endPathZoom: function () {
            this._pathZooming = !1
        },
        _updateSvgViewport: function () {
            if (!this._pathZooming) {
                this._updatePathViewport();
                var a = this._pathViewport,
                                        d = a.min,
                                        b = a.max,
                                        a = b.x - d.x,
                                        b = b.y - d.y,
                                        e = this._pathRoot,
                                        g = this._panes.overlayPane;
                c.Browser.mobileWebkit &&
                                        g.removeChild(e);
                c.DomUtil.setPosition(e, d);
                e.setAttribute("width", a);
                e.setAttribute("height", b);
                e.setAttribute("viewBox", [d.x, d.y, a, b].join(" "));
                c.Browser.mobileWebkit && g.appendChild(e)
            }
        }
    });
    c.Path.include({
        bindPopup: function (a, d) {
            if (a instanceof c.Popup) this._popup = a;
            else {
                if (!this._popup || d) this._popup = new c.Popup(d, this);
                this._popup.setContent(a)
            }
            this._popupHandlersAdded || (this.on("click", this._openPopup, this).on("remove", this.closePopup, this), this._popupHandlersAdded = !0);
            return this
        },
        unbindPopup: function () {
            this._popup &&
                                (this._popup = null, this.off("click", this._openPopup).off("remove", this.closePopup), this._popupHandlersAdded = !1);
            return this
        },
        openPopup: function (a) {
            this._popup && (a = a || this._latlng || this._latlngs[Math.floor(this._latlngs.length / 2)], this._openPopup({
                latlng: a
            }));
            return this
        },
        closePopup: function () {
            this._popup && this._popup._close();
            return this
        },
        _openPopup: function (a) {
            this._popup.setLatLng(a.latlng);
            this._map.openPopup(this._popup)
        }
    });
    h = c.Browser;
    if (p = !c.Browser.svg) try {
        var v = b.createElement("div");
        v.innerHTML =
                        '<v:shape adj="1"/>';
        var C = v.firstChild;
        C.style.behavior = "url(#default#VML)";
        p = C && "object" === typeof C.adj
    } catch (I) {
        p = !1
    }
    h.vml = p;
    c.Path = c.Browser.svg || !c.Browser.vml ? c.Path : c.Path.extend({
        statics: {
            VML: !0,
            CLIP_PADDING: 0.02
        },
        _createElement: function () {
            try {
                return b.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
                                function (a) {
                                    return b.createElement("<lvml:" + a + ' class="lvml">')
                                }
            } catch (a) {
                return function (a) {
                    return b.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
                }
            }
        } (),
        _initPath: function () {
            var a =
                                this._container = this._createElement("shape");
            c.DomUtil.addClass(a, "leaflet-vml-shape" + (this.options.className ? " " + this.options.className : ""));
            this.options.clickable && c.DomUtil.addClass(a, "leaflet-clickable");
            a.coordsize = "1 1";
            this._path = this._createElement("path");
            a.appendChild(this._path);
            this._map._pathRoot.appendChild(a)
        },
        _initStyle: function () {
            this._updateStyle()
        },
        _updateStyle: function () {
            var a = this._stroke,
                                d = this._fill,
                                b = this.options,
                                e = this._container;
            e.stroked = b.stroke;
            e.filled = b.fill;
            b.stroke ?
                                (a || (a = this._stroke = this._createElement("stroke"), a.endcap = "round", e.appendChild(a)), a.weight = b.weight + "px", a.color = b.color, a.opacity = b.opacity, a.dashStyle = b.dashArray ? c.Util.isArray(b.dashArray) ? b.dashArray.join(" ") : b.dashArray.replace(/( *, *)/g, " ") : "", b.lineCap && (a.endcap = b.lineCap.replace("butt", "flat")), b.lineJoin && (a.joinstyle = b.lineJoin)) : a && (e.removeChild(a), this._stroke = null);
            b.fill ? (d || (d = this._fill = this._createElement("fill"), e.appendChild(d)), d.color = b.fillColor || b.color, d.opacity = b.fillOpacity) :
                                d && (e.removeChild(d), this._fill = null)
        },
        _updatePath: function () {
            var a = this._container.style;
            a.display = "none";
            this._path.v = this.getPathString() + " ";
            a.display = ""
        }
    });
    c.Map.include(c.Browser.svg || !c.Browser.vml ? {} : {
        _initPathRoot: function () {
            if (!this._pathRoot) {
                var a = this._pathRoot = b.createElement("div");
                a.className = "leaflet-vml-container";
                this._panes.overlayPane.appendChild(a);
                this.on("moveend", this._updatePathViewport);
                this._updatePathViewport()
            }
        }
    });
    c.Browser.canvas = !!b.createElement("canvas").getContext;
    c.Path = c.Path.SVG && !a.L_PREFER_CANVAS || !c.Browser.canvas ? c.Path : c.Path.extend({
        statics: {
            CANVAS: !0,
            SVG: !1
        },
        redraw: function () {
            this._map && (this.projectLatlngs(), this._requestUpdate());
            return this
        },
        setStyle: function (a) {
            c.setOptions(this, a);
            this._map && (this._updateStyle(), this._requestUpdate());
            return this
        },
        onRemove: function (a) {
            a.off("viewreset", this.projectLatlngs, this).off("moveend", this._updatePath, this);
            this.options.clickable && (this._map.off("click", this._onClick, this), this._map.off("mousemove", this._onMouseMove,
                                this));
            this._requestUpdate();
            this._map = null
        },
        _requestUpdate: function () {
            this._map && !c.Path._updateRequest && (c.Path._updateRequest = c.Util.requestAnimFrame(this._fireMapMoveEnd, this._map))
        },
        _fireMapMoveEnd: function () {
            c.Path._updateRequest = null;
            this.fire("moveend")
        },
        _initElements: function () {
            this._map._initPathRoot();
            this._ctx = this._map._canvasCtx
        },
        _updateStyle: function () {
            var a = this.options;
            a.stroke && (this._ctx.lineWidth = a.weight, this._ctx.strokeStyle = a.color);
            a.fill && (this._ctx.fillStyle = a.fillColor ||
                                a.color)
        },
        _drawPath: function () {
            var a, d, b, e, g, h;
            this._ctx.beginPath();
            a = 0;
            for (b = this._parts.length; a < b; a++) {
                d = 0;
                for (e = this._parts[a].length; d < e; d++) g = this._parts[a][d], h = (0 === d ? "move" : "line") + "To", this._ctx[h](g.x, g.y);
                this instanceof c.Polygon && this._ctx.closePath()
            }
        },
        _checkIfEmpty: function () {
            return !this._parts.length
        },
        _updatePath: function () {
            if (!this._checkIfEmpty()) {
                var a = this._ctx,
                                        c = this.options;
                this._drawPath();
                a.save();
                this._updateStyle();
                c.fill && (a.globalAlpha = c.fillOpacity, a.fill());
                c.stroke &&
                                        (a.globalAlpha = c.opacity, a.stroke());
                a.restore()
            }
        },
        _initEvents: function () {
            this.options.clickable && (this._map.on("mousemove", this._onMouseMove, this), this._map.on("click", this._onClick, this))
        },
        _onClick: function (a) {
            this._containsPoint(a.layerPoint) && this.fire("click", a)
        },
        _onMouseMove: function (a) {
            this._map && !this._map._animatingZoom && (this._containsPoint(a.layerPoint) ? (this._ctx.canvas.style.cursor = "pointer", this._mouseInside = !0, this.fire("mouseover", a)) : this._mouseInside && (this._ctx.canvas.style.cursor =
                                "", this._mouseInside = !1, this.fire("mouseout", a)))
        }
    });
    c.Map.include(c.Path.SVG && !a.L_PREFER_CANVAS || !c.Browser.canvas ? {} : {
        _initPathRoot: function () {
            var a = this._pathRoot,
                                c;
            a || (a = this._pathRoot = b.createElement("canvas"), a.style.position = "absolute", c = this._canvasCtx = a.getContext("2d"), c.lineCap = "round", c.lineJoin = "round", this._panes.overlayPane.appendChild(a), this.options.zoomAnimation && (this._pathRoot.className = "leaflet-zoom-animated", this.on("zoomanim", this._animatePathZoom), this.on("zoomend", this._endPathZoom)),
                                this.on("moveend", this._updateCanvasViewport), this._updateCanvasViewport())
        },
        _updateCanvasViewport: function () {
            if (!this._pathZooming) {
                this._updatePathViewport();
                var a = this._pathViewport,
                                        d = a.min,
                                        a = a.max.subtract(d),
                                        b = this._pathRoot;
                c.DomUtil.setPosition(b, d);
                b.width = a.x;
                b.height = a.y;
                b.getContext("2d").translate(-d.x, -d.y)
            }
        }
    });
    c.LineUtil = {
        simplify: function (a, c) {
            if (!c || !a.length) return a.slice();
            var d = c * c;
            a = this._reducePoints(a, d);
            return a = this._simplifyDP(a, d)
        },
        pointToSegmentDistance: function (a, c, d) {
            return Math.sqrt(this._sqClosestPointOnSegment(a,
                                c, d, !0))
        },
        closestPointOnSegment: function (a, c, d) {
            return this._sqClosestPointOnSegment(a, c, d)
        },
        _simplifyDP: function (a, c) {
            var b = a.length,
                                e = new (typeof Uint8Array !== d + "" ? Uint8Array : Array)(b);
            e[0] = e[b - 1] = 1;
            this._simplifyDPStep(a, e, c, 0, b - 1);
            var g, h = [];
            for (g = 0; g < b; g++) e[g] && h.push(a[g]);
            return h
        },
        _simplifyDPStep: function (a, c, d, b, e) {
            var g = 0,
                                h, j, k;
            for (j = b + 1; j <= e - 1; j++) k = this._sqClosestPointOnSegment(a[j], a[b], a[e], !0), k > g && (h = j, g = k);
            g > d && (c[h] = 1, this._simplifyDPStep(a, c, d, b, h), this._simplifyDPStep(a, c, d, h,
                                e))
        },
        _reducePoints: function (a, c) {
            for (var d = [a[0]], b = 1, e = 0, g = a.length; b < g; b++) this._sqDist(a[b], a[e]) > c && (d.push(a[b]), e = b);
            e < g - 1 && d.push(a[g - 1]);
            return d
        },
        clipSegment: function (a, c, d, b) {
            b = b ? this._lastCode : this._getBitCode(a, d);
            var e = this._getBitCode(c, d),
                                g, h, j;
            for (this._lastCode = e; ; )
                if (b | e) {
                    if (b & e) return !1;
                    g = b || e;
                    h = this._getEdgeIntersection(a, c, g, d);
                    j = this._getBitCode(h, d);
                    g === b ? (a = h, b = j) : (c = h, e = j)
                } else return [a, c]
            },
            _getEdgeIntersection: function (a, d, b, e) {
                var g = d.x - a.x;
                d = d.y - a.y;
                var h = e.min;
                e = e.max;
                if (b & 8) return new c.Point(a.x + g * (e.y - a.y) / d, e.y);
                if (b & 4) return new c.Point(a.x + g * (h.y - a.y) / d, h.y);
                if (b & 2) return new c.Point(e.x, a.y + d * (e.x - a.x) / g);
                if (b & 1) return new c.Point(h.x, a.y + d * (h.x - a.x) / g)
            },
            _getBitCode: function (a, c) {
                var d = 0;
                a.x < c.min.x ? d |= 1 : a.x > c.max.x && (d |= 2);
                a.y < c.min.y ? d |= 4 : a.y > c.max.y && (d |= 8);
                return d
            },
            _sqDist: function (a, c) {
                var d = c.x - a.x,
                                b = c.y - a.y;
                return d * d + b * b
            },
            _sqClosestPointOnSegment: function (a, d, b, e) {
                var g = d.x;
                d = d.y;
                var h = b.x - g,
                                j = b.y - d,
                                k = h * h + j * j;
                0 < k && (k = ((a.x - g) * h + (a.y - d) * j) / k, 1 < k ?
                                (g = b.x, d = b.y) : 0 < k && (g += h * k, d += j * k));
                h = a.x - g;
                j = a.y - d;
                return e ? h * h + j * j : new c.Point(g, d)
            }
        };
        c.Polyline = c.Path.extend({
            initialize: function (a, d) {
                c.Path.prototype.initialize.call(this, d);
                this._latlngs = this._convertLatLngs(a)
            },
            options: {
                smoothFactor: 1,
                noClip: !1
            },
            projectLatlngs: function () {
                this._originalPoints = [];
                for (var a = 0, c = this._latlngs.length; a < c; a++) this._originalPoints[a] = this._map.latLngToLayerPoint(this._latlngs[a])
            },
            getPathString: function () {
                for (var a = 0, c = this._parts.length, d = ""; a < c; a++) d += this._getPathPartStr(this._parts[a]);
                return d
            },
            getLatLngs: function () {
                return this._latlngs
            },
            setLatLngs: function (a) {
                this._latlngs = this._convertLatLngs(a);
                return this.redraw()
            },
            addLatLng: function (a) {
                this._latlngs.push(c.latLng(a));
                return this.redraw()
            },
            spliceLatLngs: function () {
                var a = [].splice.apply(this._latlngs, arguments);
                this._convertLatLngs(this._latlngs, !0);
                this.redraw();
                return a
            },
            closestLayerPoint: function (a) {
                for (var d = Infinity, b = this._parts, e, g, h = null, j = 0, k = b.length; j < k; j++)
                    for (var l = b[j], m = 1, n = l.length; m < n; m++) {
                        e = l[m - 1];
                        g = l[m];
                        var p =
                                                c.LineUtil._sqClosestPointOnSegment(a, e, g, !0);
                        p < d && (d = p, h = c.LineUtil._sqClosestPointOnSegment(a, e, g))
                    }
                h && (h.distance = Math.sqrt(d));
                return h
            },
            getBounds: function () {
                return new c.LatLngBounds(this.getLatLngs())
            },
            _convertLatLngs: function (a, d) {
                var b, e, g = d ? a : [];
                b = 0;
                for (e = a.length; b < e; b++) {
                    if (c.Util.isArray(a[b]) && "number" !== typeof a[b][0]) return;
                    g[b] = c.latLng(a[b])
                }
                return g
            },
            _initEvents: function () {
                c.Path.prototype._initEvents.call(this)
            },
            _getPathPartStr: function (a) {
                for (var d = c.Path.VML, b = 0, e = a.length, g =
                                        "", h; b < e; b++) h = a[b], d && h._round(), g += (b ? "L" : "M") + h.x + " " + h.y;
                return g
            },
            _clipPoints: function () {
                var a = this._originalPoints,
                                d = a.length,
                                b, e, g;
                if (this.options.noClip) this._parts = [a];
                else {
                    var h = this._parts = [],
                                        j = this._map._pathViewport,
                                        k = c.LineUtil;
                    for (e = b = 0; b < d - 1; b++)
                        if (g = k.clipSegment(a[b], a[b + 1], j, b))
                            if (h[e] = h[e] || [], h[e].push(g[0]), g[1] !== a[b + 1] || b === d - 2) h[e].push(g[1]), e++
                }
            },
            _simplifyPoints: function () {
                for (var a = this._parts, d = c.LineUtil, b = 0, e = a.length; b < e; b++) a[b] = d.simplify(a[b], this.options.smoothFactor)
            },
            _updatePath: function () {
                this._map && (this._clipPoints(), this._simplifyPoints(), c.Path.prototype._updatePath.call(this))
            }
        });
        c.polyline = function (a, d) {
            return new c.Polyline(a, d)
        };
        c.PolyUtil = {};
        c.PolyUtil.clipPolygon = function (a, d) {
            var b, e = [1, 4, 2, 8],
                        g, h, j, k, l, m, n = c.LineUtil;
            g = 0;
            for (l = a.length; g < l; g++) a[g]._code = n._getBitCode(a[g], d);
            for (j = 0; 4 > j; j++) {
                m = e[j];
                b = [];
                g = 0;
                l = a.length;
                for (h = l - 1; g < l; h = g++) k = a[g], h = a[h], k._code & m ? h._code & m || (h = n._getEdgeIntersection(h, k, m, d), h._code = n._getBitCode(h, d), b.push(h)) : (h._code &
                                m && (h = n._getEdgeIntersection(h, k, m, d), h._code = n._getBitCode(h, d), b.push(h)), b.push(k));
                a = b
            }
            return a
        };
        c.Polygon = c.Polyline.extend({
            options: {
                fill: !0
            },
            initialize: function (a, d) {
                c.Polyline.prototype.initialize.call(this, a, d);
                this._initWithHoles(a)
            },
            _initWithHoles: function (a) {
                var d, b;
                if (a && c.Util.isArray(a[0]) && "number" !== typeof a[0][0]) {
                    this._latlngs = this._convertLatLngs(a[0]);
                    this._holes = a.slice(1);
                    a = 0;
                    for (d = this._holes.length; a < d; a++) b = this._holes[a] = this._convertLatLngs(this._holes[a]), b[0].equals(b[b.length -
                                        1]) && b.pop()
                }
                a = this._latlngs;
                2 <= a.length && a[0].equals(a[a.length - 1]) && a.pop()
            },
            projectLatlngs: function () {
                c.Polyline.prototype.projectLatlngs.call(this);
                this._holePoints = [];
                if (this._holes) {
                    var a, d, b, e;
                    a = 0;
                    for (b = this._holes.length; a < b; a++) {
                        this._holePoints[a] = [];
                        d = 0;
                        for (e = this._holes[a].length; d < e; d++) this._holePoints[a][d] = this._map.latLngToLayerPoint(this._holes[a][d])
                    }
                }
            },
            setLatLngs: function (a) {
                return a && c.Util.isArray(a[0]) && "number" !== typeof a[0][0] ? (this._initWithHoles(a), this.redraw()) : c.Polyline.prototype.setLatLngs.call(this,
                                a)
            },
            _clipPoints: function () {
                var a = [];
                this._parts = [this._originalPoints].concat(this._holePoints);
                if (!this.options.noClip) {
                    for (var d = 0, b = this._parts.length; d < b; d++) {
                        var e = c.PolyUtil.clipPolygon(this._parts[d], this._map._pathViewport);
                        e.length && a.push(e)
                    }
                    this._parts = a
                }
            },
            _getPathPartStr: function (a) {
                return c.Polyline.prototype._getPathPartStr.call(this, a) + (c.Browser.svg ? "z" : "x")
            }
        });
        c.polygon = function (a, d) {
            return new c.Polygon(a, d)
        };
        v = function (a) {
            return c.FeatureGroup.extend({
                initialize: function (a, c) {
                    this._layers = {};
                    this._options = c;
                    this.setLatLngs(a)
                },
                setLatLngs: function (c) {
                    var d = 0,
                                        b = c.length;
                    for (this.eachLayer(function (a) {
                        d < b ? a.setLatLngs(c[d++]) : this.removeLayer(a)
                    }, this); d < b; ) this.addLayer(new a(c[d++], this._options));
                    return this
                },
                getLatLngs: function () {
                    var a = [];
                    this.eachLayer(function (c) {
                        a.push(c.getLatLngs())
                    });
                    return a
                }
            })
        };
        c.MultiPolyline = v(c.Polyline);
        c.MultiPolygon = v(c.Polygon);
        c.multiPolyline = function (a, d) {
            return new c.MultiPolyline(a, d)
        };
        c.multiPolygon = function (a, d) {
            return new c.MultiPolygon(a, d)
        };
        c.Rectangle = c.Polygon.extend({
            initialize: function (a, d) {
                c.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(a), d)
            },
            setBounds: function (a) {
                this.setLatLngs(this._boundsToLatLngs(a))
            },
            _boundsToLatLngs: function (a) {
                a = c.latLngBounds(a);
                return [a.getSouthWest(), a.getNorthWest(), a.getNorthEast(), a.getSouthEast()]
            }
        });
        c.rectangle = function (a, d) {
            return new c.Rectangle(a, d)
        };
        c.Circle = c.Path.extend({
            initialize: function (a, d, b) {
                c.Path.prototype.initialize.call(this, b);
                this._latlng = c.latLng(a);
                this._mRadius =
                                d
            },
            options: {
                fill: !0
            },
            setLatLng: function (a) {
                this._latlng = c.latLng(a);
                return this.redraw()
            },
            setRadius: function (a) {
                this._mRadius = a;
                return this.redraw()
            },
            projectLatlngs: function () {
                var a = this._getLngRadius(),
                                c = this._latlng,
                                a = this._map.latLngToLayerPoint([c.lat, c.lng - a]);
                this._point = this._map.latLngToLayerPoint(c);
                this._radius = Math.max(this._point.x - a.x, 1)
            },
            getBounds: function () {
                var a = this._getLngRadius(),
                                d = 360 * (this._mRadius / 40075017),
                                b = this._latlng;
                return new c.LatLngBounds([b.lat - d, b.lng - a], [b.lat + d,
                b.lng + a
            ])
            },
            getLatLng: function () {
                return this._latlng
            },
            getPathString: function () {
                var a = this._point,
                                d = this._radius;
                if (this._checkIfEmpty()) return "";
                if (c.Browser.svg) return "M" + a.x + "," + (a.y - d) + "A" + d + "," + d + ",0,1,1," + (a.x - 0.1) + "," + (a.y - d) + " z";
                a._round();
                d = Math.round(d);
                return "AL " + a.x + "," + a.y + " " + d + "," + d + " 0,23592600"
            },
            getRadius: function () {
                return this._mRadius
            },
            _getLatRadius: function () {
                return 360 * (this._mRadius / 40075017)
            },
            _getLngRadius: function () {
                return this._getLatRadius() / Math.cos(c.LatLng.DEG_TO_RAD *
                                this._latlng.lat)
            },
            _checkIfEmpty: function () {
                if (!this._map) return !1;
                var a = this._map._pathViewport,
                                c = this._radius,
                                d = this._point;
                return d.x - c > a.max.x || d.y - c > a.max.y || d.x + c < a.min.x || d.y + c < a.min.y
            }
        });
        c.circle = function (a, d, b) {
            return new c.Circle(a, d, b)
        };
        c.CircleMarker = c.Circle.extend({
            options: {
                radius: 10,
                weight: 2
            },
            initialize: function (a, d) {
                c.Circle.prototype.initialize.call(this, a, null, d);
                this._radius = this.options.radius
            },
            projectLatlngs: function () {
                this._point = this._map.latLngToLayerPoint(this._latlng)
            },
            _updateStyle: function () {
                c.Circle.prototype._updateStyle.call(this);
                this.setRadius(this.options.radius)
            },
            setLatLng: function (a) {
                c.Circle.prototype.setLatLng.call(this, a);
                this._popup && this._popup._isOpen && this._popup.setLatLng(a);
                return this
            },
            setRadius: function (a) {
                this.options.radius = this._radius = a;
                return this.redraw()
            },
            getRadius: function () {
                return this._radius
            }
        });
        c.circleMarker = function (a, d) {
            return new c.CircleMarker(a, d)
        };
        c.Polyline.include(!c.Path.CANVAS ? {} : {
            _containsPoint: function (a, d) {
                var b, e, g, h, j, k, l = this.options.weight / 2;
                c.Browser.touch && (l += 10);
                b = 0;
                for (h = this._parts.length; b <
                                h; b++) {
                    k = this._parts[b];
                    e = 0;
                    j = k.length;
                    for (g = j - 1; e < j; g = e++)
                        if (d || 0 !== e)
                            if (g = c.LineUtil.pointToSegmentDistance(a, k[g], k[e]), g <= l) return !0
                        }
                        return !1
                    }
                });
                c.Polygon.include(!c.Path.CANVAS ? {} : {
                    _containsPoint: function (a) {
                        var d = !1,
                                b, e, g, h, j, k, l;
                        if (c.Polyline.prototype._containsPoint.call(this, a, !0)) return !0;
                        h = 0;
                        for (k = this._parts.length; h < k; h++) {
                            b = this._parts[h];
                            j = 0;
                            l = b.length;
                            for (g = l - 1; j < l; g = j++) e = b[j], g = b[g], e.y > a.y !== g.y > a.y && a.x < (g.x - e.x) * (a.y - e.y) / (g.y - e.y) + e.x && (d = !d)
                        }
                        return d
                    }
                });
                c.Circle.include(!c.Path.CANVAS ? {} : {
                    _drawPath: function () {
                        var a = this._point;
                        this._ctx.beginPath();
                        this._ctx.arc(a.x, a.y, this._radius, 0, 2 * Math.PI, !1)
                    },
                    _containsPoint: function (a) {
                        var c = this.options.stroke ? this.options.weight / 2 : 0;
                        return a.distanceTo(this._point) <= this._radius + c
                    }
                });
                c.CircleMarker.include(!c.Path.CANVAS ? {} : {
                    _updateStyle: function () {
                        c.Path.prototype._updateStyle.call(this)
                    }
                });
                c.GeoJSON = c.FeatureGroup.extend({
                    initialize: function (a, d) {
                        c.setOptions(this, d);
                        this._layers = {};
                        a && this.addData(a)
                    },
                    addData: function (a) {
                        var d = c.Util.isArray(a) ?
                                a : a.features,
                                b, e;
                        if (d) {
                            a = 0;
                            for (b = d.length; a < b; a++) e = d[a], (e.geometries || e.geometry || e.features || e.coordinates) && this.addData(d[a]);
                            return this
                        }
                        d = this.options;
                        if (!d.filter || d.filter(a)) {
                            b = c.GeoJSON.geometryToLayer(a, d.pointToLayer, d.coordsToLatLng, d);
                            b.feature = c.GeoJSON.asFeature(a);
                            b.defaultOptions = b.options;
                            this.resetStyle(b);
                            if (d.onEachFeature) d.onEachFeature(a, b);
                            return this.addLayer(b)
                        }
                    },
                    resetStyle: function (a) {
                        var d = this.options.style;
                        d && (c.Util.extend(a.options, a.defaultOptions), this._setLayerStyle(a,
                                d))
                    },
                    setStyle: function (a) {
                        this.eachLayer(function (c) {
                            this._setLayerStyle(c, a)
                        }, this)
                    },
                    _setLayerStyle: function (a, c) {
                        "function" === typeof c && (c = c(a.feature));
                        a.setStyle && a.setStyle(c)
                    }
                });
                c.extend(c.GeoJSON, {
                    geometryToLayer: function (a, d, b, e) {
                        var g = "Feature" === a.type ? a.geometry : a,
                                h = g.coordinates,
                                j = [],
                                k, l;
                        b = b || this.coordsToLatLng;
                        switch (g.type) {
                            case "Point":
                                return e = b(h), d ? d(a, e) : new c.Marker(e);
                            case "MultiPoint":
                                k = 0;
                                for (l = h.length; k < l; k++) e = b(h[k]), j.push(d ? d(a, e) : new c.Marker(e));
                                return new c.FeatureGroup(j);
                            case "LineString":
                                return a = this.coordsToLatLngs(h, 0, b), new c.Polyline(a, e);
                            case "Polygon":
                                if (2 === h.length && !h[1].length) throw Error("Invalid GeoJSON object.");
                                a = this.coordsToLatLngs(h, 1, b);
                                return new c.Polygon(a, e);
                            case "MultiLineString":
                                return a = this.coordsToLatLngs(h, 1, b), new c.MultiPolyline(a, e);
                            case "MultiPolygon":
                                return a = this.coordsToLatLngs(h, 2, b), new c.MultiPolygon(a, e);
                            case "GeometryCollection":
                                k = 0;
                                for (l = g.geometries.length; k < l; k++) j.push(this.geometryToLayer({
                                    geometry: g.geometries[k],
                                    type: "Feature",
                                    properties: a.properties
                                }, d, b, e));
                                return new c.FeatureGroup(j);
                            default:
                                throw Error("Invalid GeoJSON object.");
                        }
                    },
                    coordsToLatLng: function (a) {
                        return new c.LatLng(a[1], a[0], a[2])
                    },
                    coordsToLatLngs: function (a, c, d) {
                        var b, e, g, h = [];
                        e = 0;
                        for (g = a.length; e < g; e++) b = c ? this.coordsToLatLngs(a[e], c - 1, d) : (d || this.coordsToLatLng)(a[e]), h.push(b);
                        return h
                    },
                    latLngToCoords: function (a) {
                        var c = [a.lng, a.lat];
                        a.alt !== d && c.push(a.alt);
                        return c
                    },
                    latLngsToCoords: function (a) {
                        for (var d = [], b = 0, e = a.length; b < e; b++) d.push(c.GeoJSON.latLngToCoords(a[b]));
                        return d
                    },
                    getFeature: function (a, d) {
                        return a.feature ? c.extend({}, a.feature, {
                            geometry: d
                        }) : c.GeoJSON.asFeature(d)
                    },
                    asFeature: function (a) {
                        return "Feature" === a.type ? a : {
                            type: "Feature",
                            properties: {},
                            geometry: a
                        }
                    }
                });
                v = {
                    toGeoJSON: function () {
                        return c.GeoJSON.getFeature(this, {
                            type: "Point",
                            coordinates: c.GeoJSON.latLngToCoords(this.getLatLng())
                        })
                    }
                };
                c.Marker.include(v);
                c.Circle.include(v);
                c.CircleMarker.include(v);
                c.Polyline.include({
                    toGeoJSON: function () {
                        return c.GeoJSON.getFeature(this, {
                            type: "LineString",
                            coordinates: c.GeoJSON.latLngsToCoords(this.getLatLngs())
                        })
                    }
                });
                c.Polygon.include({
                    toGeoJSON: function () {
                        var a = [c.GeoJSON.latLngsToCoords(this.getLatLngs())],
                                d, b, e;
                        a[0].push(a[0][0]);
                        if (this._holes) {
                            d = 0;
                            for (b = this._holes.length; d < b; d++) e = c.GeoJSON.latLngsToCoords(this._holes[d]), e.push(e[0]), a.push(e)
                        }
                        return c.GeoJSON.getFeature(this, {
                            type: "Polygon",
                            coordinates: a
                        })
                    }
                });
                var D = function (a) {
                    return function () {
                        var d = [];
                        this.eachLayer(function (a) {
                            d.push(a.toGeoJSON().geometry.coordinates)
                        });
                        return c.GeoJSON.getFeature(this, {
                            type: a,
                            coordinates: d
                        })
                    }
                };
                c.MultiPolyline.include({
                    toGeoJSON: D("MultiLineString")
                });
                c.MultiPolygon.include({
                    toGeoJSON: D("MultiPolygon")
                });
                c.LayerGroup.include({
                    toGeoJSON: function () {
                        var a = this.feature && this.feature.geometry,
                                d = [],
                                b;
                        if (a && "MultiPoint" === a.type) return D("MultiPoint").call(this);
                        var e = a && "GeometryCollection" === a.type;
                        this.eachLayer(function (a) {
                            a.toGeoJSON && (b = a.toGeoJSON(), d.push(e ? b.geometry : c.GeoJSON.asFeature(b)))
                        });
                        return e ? c.GeoJSON.getFeature(this, {
                            geometries: d,
                            type: "GeometryCollection"
                        }) : {
                            type: "FeatureCollection",
                            features: d
                        }
                    }
                });
                c.geoJson = function (a, d) {
                    return new c.GeoJSON(a,
                        d)
                };
                c.DomEvent = {
                    addListener: function (a, d, b, e) {
                        var g = c.stamp(b),
                                h = "_leaflet_" + d + g,
                                j, k;
                        if (a[h]) return this;
                        j = function (d) {
                            return b.call(e || a, d || c.DomEvent._getEvent())
                        };
                        if (c.Browser.pointer && 0 === d.indexOf("touch")) return this.addPointerListener(a, d, j, g);
                        c.Browser.touch && ("dblclick" === d && this.addDoubleTapListener) && this.addDoubleTapListener(a, j, g);
                        "addEventListener" in a ? "mousewheel" === d ? (a.addEventListener("DOMMouseScroll", j, !1), a.addEventListener(d, j, !1)) : "mouseenter" === d || "mouseleave" === d ? (k = j, j = function (d) {
                            if (c.DomEvent._checkMouse(a,
                                        d)) return k(d)
                        }, a.addEventListener("mouseenter" === d ? "mouseover" : "mouseout", j, !1)) : ("click" === d && c.Browser.android && (k = j, j = function (a) {
                            return c.DomEvent._filterClick(a, k)
                        }), a.addEventListener(d, j, !1)) : "attachEvent" in a && a.attachEvent("on" + d, j);
                        a[h] = j;
                        return this
                    },
                    removeListener: function (a, d, b) {
                        b = c.stamp(b);
                        var e = "_leaflet_" + d + b,
                                g = a[e];
                        if (!g) return this;
                        c.Browser.pointer && 0 === d.indexOf("touch") ? this.removePointerListener(a, d, b) : c.Browser.touch && "dblclick" === d && this.removeDoubleTapListener ? this.removeDoubleTapListener(a,
                                b) : "removeEventListener" in a ? "mousewheel" === d ? (a.removeEventListener("DOMMouseScroll", g, !1), a.removeEventListener(d, g, !1)) : "mouseenter" === d || "mouseleave" === d ? a.removeEventListener("mouseenter" === d ? "mouseover" : "mouseout", g, !1) : a.removeEventListener(d, g, !1) : "detachEvent" in a && a.detachEvent("on" + d, g);
                        a[e] = null;
                        return this
                    },
                    stopPropagation: function (a) {
                        a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0;
                        c.DomEvent._skipped(a);
                        return this
                    },
                    disableScrollPropagation: function (a) {
                        var d = c.DomEvent.stopPropagation;
                        return c.DomEvent.on(a, "mousewheel", d).on(a, "MozMousePixelScroll", d)
                    },
                    disableClickPropagation: function (a) {
                        for (var d = c.DomEvent.stopPropagation, b = c.Draggable.START.length - 1; 0 <= b; b--) c.DomEvent.on(a, c.Draggable.START[b], d);
                        return c.DomEvent.on(a, "click", c.DomEvent._fakeStop).on(a, "dblclick", d)
                    },
                    preventDefault: function (a) {
                        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                        return this
                    },
                    stop: function (a) {
                        return c.DomEvent.preventDefault(a).stopPropagation(a)
                    },
                    getMousePosition: function (a, d) {
                        if (!d) return new c.Point(a.clientX,
                                a.clientY);
                        var b = d.getBoundingClientRect();
                        return new c.Point(a.clientX - b.left - d.clientLeft, a.clientY - b.top - d.clientTop)
                    },
                    getWheelDelta: function (a) {
                        var c = 0;
                        a.wheelDelta && (c = a.wheelDelta / 120);
                        a.detail && (c = -a.detail / 3);
                        return c
                    },
                    _skipEvents: {},
                    _fakeStop: function (a) {
                        c.DomEvent._skipEvents[a.type] = !0
                    },
                    _skipped: function (a) {
                        var c = this._skipEvents[a.type];
                        this._skipEvents[a.type] = !1;
                        return c
                    },
                    _checkMouse: function (a, c) {
                        var d = c.relatedTarget;
                        if (!d) return !0;
                        try {
                            for (; d && d !== a; ) d = d.parentNode
                        } catch (b) {
                            return !1
                        }
                        return d !==
                                a
                    },
                    _getEvent: function () {
                        var c = a.event;
                        if (!c)
                            for (var d = arguments.callee.caller; d && !((c = d.arguments[0]) && a.Event === c.constructor); ) d = d.caller;
                        return c
                    },
                    _filterClick: function (a, d) {
                        var b = a.timeStamp || a.originalEvent.timeStamp,
                                e = c.DomEvent._lastClick && b - c.DomEvent._lastClick;
                        if (e && 100 < e && 1E3 > e || a.target._simulatedClick && !a._simulated) c.DomEvent.stop(a);
                        else return c.DomEvent._lastClick = b, d(a)
                    }
                };
                c.DomEvent.on = c.DomEvent.addListener;
                c.DomEvent.off = c.DomEvent.removeListener;
                c.Draggable = c.Class.extend({
                    includes: c.Mixin.Events,
                    statics: {
                        START: c.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"],
                        END: {
                            mousedown: "mouseup",
                            touchstart: "touchend",
                            pointerdown: "touchend",
                            MSPointerDown: "touchend"
                        },
                        MOVE: {
                            mousedown: "mousemove",
                            touchstart: "touchmove",
                            pointerdown: "touchmove",
                            MSPointerDown: "touchmove"
                        }
                    },
                    initialize: function (a, c) {
                        this._element = a;
                        this._dragStartTarget = c || a
                    },
                    enable: function () {
                        if (!this._enabled) {
                            for (var a = c.Draggable.START.length - 1; 0 <= a; a--) c.DomEvent.on(this._dragStartTarget, c.Draggable.START[a], this._onDown, this);
                            this._enabled = !0
                        }
                    },
                    disable: function () {
                        if (this._enabled) {
                            for (var a = c.Draggable.START.length - 1; 0 <= a; a--) c.DomEvent.off(this._dragStartTarget, c.Draggable.START[a], this._onDown, this);
                            this._moved = this._enabled = !1
                        }
                    },
                    _onDown: function (a) {
                        this._moved = !1;
                        if (!(a.shiftKey || 1 !== a.which && 1 !== a.button && !a.touches))
                            if (c.DomEvent.stopPropagation(a), !c.Draggable._disabled && (c.DomUtil.disableImageDrag(), c.DomUtil.disableTextSelection(), !this._moving)) {
                                var d = a.touches ? a.touches[0] : a;
                                this._startPoint = new c.Point(d.clientX, d.clientY);
                                this._startPos = this._newPos = c.DomUtil.getPosition(this._element);
                                c.DomEvent.on(b, c.Draggable.MOVE[a.type], this._onMove, this).on(b, c.Draggable.END[a.type], this._onUp, this)
                            }
                    },
                    _onMove: function (a) {
                        if (a.touches && 1 < a.touches.length) this._moved = !0;
                        else {
                            var d = a.touches && 1 === a.touches.length ? a.touches[0] : a,
                                        d = (new c.Point(d.clientX, d.clientY)).subtract(this._startPoint);
                            if (d.x || d.y) c.DomEvent.preventDefault(a), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = c.DomUtil.getPosition(this._element).subtract(d),
                                        c.DomUtil.addClass(b.body, "leaflet-dragging"), c.DomUtil.addClass(a.target || a.srcElement, "leaflet-drag-target")), this._newPos = this._startPos.add(d), this._moving = !0, c.Util.cancelAnimFrame(this._animRequest), this._animRequest = c.Util.requestAnimFrame(this._updatePosition, this, !0, this._dragStartTarget)
                        }
                    },
                    _updatePosition: function () {
                        this.fire("predrag");
                        c.DomUtil.setPosition(this._element, this._newPos);
                        this.fire("drag")
                    },
                    _onUp: function (a) {
                        c.DomUtil.removeClass(b.body, "leaflet-dragging");
                        c.DomUtil.removeClass(a.target ||
                                a.srcElement, "leaflet-drag-target");
                        for (var d in c.Draggable.MOVE) c.DomEvent.off(b, c.Draggable.MOVE[d], this._onMove).off(b, c.Draggable.END[d], this._onUp);
                        c.DomUtil.enableImageDrag();
                        c.DomUtil.enableTextSelection();
                        this._moved && this._moving && (c.Util.cancelAnimFrame(this._animRequest), this.fire("dragend", {
                            distance: this._newPos.distanceTo(this._startPos)
                        }));
                        this._moving = !1
                    }
                });
                c.Handler = c.Class.extend({
                    initialize: function (a) {
                        this._map = a
                    },
                    enable: function () {
                        this._enabled || (this._enabled = !0, this.addHooks())
                    },
                    disable: function () {
                        this._enabled && (this._enabled = !1, this.removeHooks())
                    },
                    enabled: function () {
                        return !!this._enabled
                    }
                });
                c.Map.mergeOptions({
                    dragging: !0,
                    inertia: !c.Browser.android23,
                    inertiaDeceleration: 3400,
                    inertiaMaxSpeed: Infinity,
                    inertiaThreshold: c.Browser.touch ? 32 : 18,
                    easeLinearity: 0.25,
                    worldCopyJump: !1
                });
                c.Map.Drag = c.Handler.extend({
                    addHooks: function () {
                        if (!this._draggable) {
                            var a = this._map;
                            this._draggable = new c.Draggable(a._mapPane, a._container);
                            this._draggable.on({
                                dragstart: this._onDragStart,
                                drag: this._onDrag,
                                dragend: this._onDragEnd
                            }, this);
                            a.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDrag, this), a.on("viewreset", this._onViewReset, this), a.whenReady(this._onViewReset, this))
                        }
                        this._draggable.enable()
                    },
                    removeHooks: function () {
                        this._draggable.disable()
                    },
                    moved: function () {
                        return this._draggable && this._draggable._moved
                    },
                    _onDragStart: function () {
                        var a = this._map;
                        a._panAnim && a._panAnim.stop();
                        a.fire("movestart").fire("dragstart");
                        a.options.inertia && (this._positions = [], this._times = [])
                    },
                    _onDrag: function () {
                        if (this._map.options.inertia) {
                            var a =
                                        this._lastTime = +new Date,
                                        c = this._lastPos = this._draggable._newPos;
                            this._positions.push(c);
                            this._times.push(a);
                            200 < a - this._times[0] && (this._positions.shift(), this._times.shift())
                        }
                        this._map.fire("move").fire("drag")
                    },
                    _onViewReset: function () {
                        var a = this._map.getSize()._divideBy(2);
                        this._initialWorldOffset = this._map.latLngToLayerPoint([0, 0]).subtract(a).x;
                        this._worldWidth = this._map.project([0, 180]).x
                    },
                    _onPreDrag: function () {
                        var a = this._worldWidth,
                                c = Math.round(a / 2),
                                d = this._initialWorldOffset,
                                b = this._draggable._newPos.x,
                                e = (b - c + d) % a + c - d,
                                a = (b + c + d) % a - c - d,
                                d = Math.abs(e + d) < Math.abs(a + d) ? e : a;
                        this._draggable._newPos.x = d
                    },
                    _onDragEnd: function (a) {
                        var d = this._map,
                                b = d.options,
                                e = +new Date - this._lastTime,
                                g = !b.inertia || e > b.inertiaThreshold || !this._positions[0];
                        d.fire("dragend", a);
                        if (g) d.fire("moveend");
                        else {
                            a = this._lastPos.subtract(this._positions[0]);
                            var h = b.easeLinearity;
                            a = a.multiplyBy(h / ((this._lastTime + e - this._times[0]) / 1E3));
                            g = a.distanceTo([0, 0]);
                            e = Math.min(b.inertiaMaxSpeed, g);
                            a = a.multiplyBy(e / g);
                            var j = e / (b.inertiaDeceleration *
                                        h),
                                        k = a.multiplyBy(-j / 2).round();
                            !k.x || !k.y ? d.fire("moveend") : (k = d._limitOffset(k, d.options.maxBounds), c.Util.requestAnimFrame(function () {
                                d.panBy(k, {
                                    duration: j,
                                    easeLinearity: h,
                                    noMoveStart: !0
                                })
                            }))
                        }
                    }
                });
                c.Map.addInitHook("addHandler", "dragging", c.Map.Drag);
                c.Map.mergeOptions({
                    doubleClickZoom: !0
                });
                c.Map.DoubleClickZoom = c.Handler.extend({
                    addHooks: function () {
                        this._map.on("dblclick", this._onDoubleClick, this)
                    },
                    removeHooks: function () {
                        this._map.off("dblclick", this._onDoubleClick, this)
                    },
                    _onDoubleClick: function (a) {
                        var d =
                                this._map,
                                c = d.getZoom() + (a.originalEvent.shiftKey ? -1 : 1);
                        "center" === d.options.doubleClickZoom ? d.setZoom(c) : d.setZoomAround(a.containerPoint, c)
                    }
                });
                c.Map.addInitHook("addHandler", "doubleClickZoom", c.Map.DoubleClickZoom);
                c.Map.mergeOptions({
                    scrollWheelZoom: !0
                });
                c.Map.ScrollWheelZoom = c.Handler.extend({
                    addHooks: function () {
                        c.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this);
                        c.DomEvent.on(this._map._container, "MozMousePixelScroll", c.DomEvent.preventDefault);
                        this._delta = 0
                    },
                    removeHooks: function () {
                        c.DomEvent.off(this._map._container,
                                "mousewheel", this._onWheelScroll);
                        c.DomEvent.off(this._map._container, "MozMousePixelScroll", c.DomEvent.preventDefault)
                    },
                    _onWheelScroll: function (a) {
                        var d = c.DomEvent.getWheelDelta(a);
                        this._delta += d;
                        this._lastMousePos = this._map.mouseEventToContainerPoint(a);
                        this._startTime || (this._startTime = +new Date);
                        d = Math.max(40 - (+new Date - this._startTime), 0);
                        clearTimeout(this._timer);
                        this._timer = setTimeout(c.bind(this._performZoom, this), d);
                        c.DomEvent.preventDefault(a);
                        c.DomEvent.stopPropagation(a)
                    },
                    _performZoom: function () {
                        var a =
                                this._map,
                                d = this._delta,
                                c = a.getZoom(),
                                d = 0 < d ? Math.ceil(d) : Math.floor(d),
                                d = Math.max(Math.min(d, 4), -4),
                                d = a._limitZoom(c + d) - c;
                        this._delta = 0;
                        this._startTime = null;
                        d && ("center" === a.options.scrollWheelZoom ? a.setZoom(c + d) : a.setZoomAround(this._lastMousePos, c + d))
                    }
                });
                c.Map.addInitHook("addHandler", "scrollWheelZoom", c.Map.ScrollWheelZoom);
                c.extend(c.DomEvent, {
                    _touchstart: c.Browser.msPointer ? "MSPointerDown" : c.Browser.pointer ? "pointerdown" : "touchstart",
                    _touchend: c.Browser.msPointer ? "MSPointerUp" : c.Browser.pointer ?
                        "pointerup" : "touchend",
                    addDoubleTapListener: function (a, d, e) {
                        function g(a) {
                            var d;
                            c.Browser.pointer ? (q.push(a.pointerId), d = q.length) : d = a.touches.length;
                            if (!(1 < d)) {
                                d = Date.now();
                                var b = d - (j || d);
                                m = a.touches ? a.touches[0] : a;
                                k = 0 < b && b <= l;
                                j = d
                            }
                        }

                        function h(a) {
                            if (c.Browser.pointer) {
                                a = q.indexOf(a.pointerId);
                                if (-1 === a) return;
                                q.splice(a, 1)
                            }
                            if (k) {
                                if (c.Browser.pointer) {
                                    a = {};
                                    var b, f;
                                    for (f in m) b = m[f], a[f] = "function" === typeof b ? b.bind(m) : b;
                                    m = a
                                }
                                m.type = "dblclick";
                                d(m);
                                j = null
                            }
                        }
                        var j, k = !1,
                                l = 250,
                                m, n = this._touchstart,
                                p = this._touchend,
                                q = [];
                        a["_leaflet_" + n + e] = g;
                        a["_leaflet_" + p + e] = h;
                        e = c.Browser.pointer ? b.documentElement : a;
                        a.addEventListener(n, g, !1);
                        e.addEventListener(p, h, !1);
                        c.Browser.pointer && e.addEventListener(c.DomEvent.POINTER_CANCEL, h, !1);
                        return this
                    },
                    removeDoubleTapListener: function (a, d) {
                        a.removeEventListener(this._touchstart, a["_leaflet_" + this._touchstart + d], !1);
                        (c.Browser.pointer ? b.documentElement : a).removeEventListener(this._touchend, a["_leaflet_" + this._touchend + d], !1);
                        c.Browser.pointer && b.documentElement.removeEventListener(c.DomEvent.POINTER_CANCEL,
                                a["_leaflet_" + this._touchend + d], !1);
                        return this
                    }
                });
                c.extend(c.DomEvent, {
                    POINTER_DOWN: c.Browser.msPointer ? "MSPointerDown" : "pointerdown",
                    POINTER_MOVE: c.Browser.msPointer ? "MSPointerMove" : "pointermove",
                    POINTER_UP: c.Browser.msPointer ? "MSPointerUp" : "pointerup",
                    POINTER_CANCEL: c.Browser.msPointer ? "MSPointerCancel" : "pointercancel",
                    _pointers: [],
                    _pointerDocumentListener: !1,
                    addPointerListener: function (a, d, c, b) {
                        switch (d) {
                            case "touchstart":
                                return this.addPointerListenerStart(a, d, c, b);
                            case "touchend":
                                return this.addPointerListenerEnd(a,
                                        d, c, b);
                            case "touchmove":
                                return this.addPointerListenerMove(a, d, c, b);
                            default:
                                throw "Unknown touch event type";
                        }
                    },
                    addPointerListenerStart: function (a, d, e, g) {
                        var h = this._pointers;
                        d = function (a) {
                            c.DomEvent.preventDefault(a);
                            for (var d = !1, b = 0; b < h.length; b++)
                                if (h[b].pointerId === a.pointerId) {
                                    d = !0;
                                    break
                                }
                            d || h.push(a);
                            a.touches = h.slice();
                            a.changedTouches = [a];
                            e(a)
                        };
                        a["_leaflet_touchstart" + g] = d;
                        a.addEventListener(this.POINTER_DOWN, d, !1);
                        this._pointerDocumentListener || (a = function (a) {
                            for (var d = 0; d < h.length; d++)
                                if (h[d].pointerId ===
                                                a.pointerId) {
                                    h.splice(d, 1);
                                    break
                                }
                        }, b.documentElement.addEventListener(this.POINTER_UP, a, !1), b.documentElement.addEventListener(this.POINTER_CANCEL, a, !1), this._pointerDocumentListener = !0);
                        return this
                    },
                    addPointerListenerMove: function (a, d, c, b) {
                        function e(a) {
                            if (!((a.pointerType === a.MSPOINTER_TYPE_MOUSE || "mouse" === a.pointerType) && 0 === a.buttons)) {
                                for (var d = 0; d < g.length; d++)
                                    if (g[d].pointerId === a.pointerId) {
                                        g[d] = a;
                                        break
                                    }
                                a.touches = g.slice();
                                a.changedTouches = [a];
                                c(a)
                            }
                        }
                        var g = this._pointers;
                        a["_leaflet_touchmove" +
                                b] = e;
                        a.addEventListener(this.POINTER_MOVE, e, !1);
                        return this
                    },
                    addPointerListenerEnd: function (a, d, c, b) {
                        var e = this._pointers;
                        d = function (a) {
                            for (var d = 0; d < e.length; d++)
                                if (e[d].pointerId === a.pointerId) {
                                    e.splice(d, 1);
                                    break
                                }
                            a.touches = e.slice();
                            a.changedTouches = [a];
                            c(a)
                        };
                        a["_leaflet_touchend" + b] = d;
                        a.addEventListener(this.POINTER_UP, d, !1);
                        a.addEventListener(this.POINTER_CANCEL, d, !1);
                        return this
                    },
                    removePointerListener: function (a, d, c) {
                        c = a["_leaflet_" + d + c];
                        switch (d) {
                            case "touchstart":
                                a.removeEventListener(this.POINTER_DOWN,
                                        c, !1);
                                break;
                            case "touchmove":
                                a.removeEventListener(this.POINTER_MOVE, c, !1);
                                break;
                            case "touchend":
                                a.removeEventListener(this.POINTER_UP, c, !1), a.removeEventListener(this.POINTER_CANCEL, c, !1)
                        }
                        return this
                    }
                });
                c.Map.mergeOptions({
                    touchZoom: c.Browser.touch && !c.Browser.android23,
                    bounceAtZoomLimits: !0
                });
                c.Map.TouchZoom = c.Handler.extend({
                    addHooks: function () {
                        c.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
                    },
                    removeHooks: function () {
                        c.DomEvent.off(this._map._container, "touchstart", this._onTouchStart,
                                this)
                    },
                    _onTouchStart: function (a) {
                        var d = this._map;
                        if (a.touches && !(2 !== a.touches.length || d._animatingZoom || this._zooming)) {
                            var e = d.mouseEventToLayerPoint(a.touches[0]),
                                        g = d.mouseEventToLayerPoint(a.touches[1]),
                                        h = d._getCenterLayerPoint();
                            this._startCenter = e.add(g)._divideBy(2);
                            this._startDist = e.distanceTo(g);
                            this._moved = !1;
                            this._zooming = !0;
                            this._centerOffset = h.subtract(this._startCenter);
                            d._panAnim && d._panAnim.stop();
                            c.DomEvent.on(b, "touchmove", this._onTouchMove, this).on(b, "touchend", this._onTouchEnd,
                                        this);
                            c.DomEvent.preventDefault(a)
                        }
                    },
                    _onTouchMove: function (a) {
                        var d = this._map;
                        if (a.touches && 2 === a.touches.length && this._zooming) {
                            var b = d.mouseEventToLayerPoint(a.touches[0]),
                                        e = d.mouseEventToLayerPoint(a.touches[1]);
                            this._scale = b.distanceTo(e) / this._startDist;
                            this._delta = b._add(e)._divideBy(2)._subtract(this._startCenter);
                            if (1 !== this._scale && (d.options.bounceAtZoomLimits || !(d.getZoom() === d.getMinZoom() && 1 > this._scale || d.getZoom() === d.getMaxZoom() && 1 < this._scale))) this._moved || (c.DomUtil.addClass(d._mapPane,
                                        "leaflet-touching"), d.fire("movestart").fire("zoomstart"), this._moved = !0), c.Util.cancelAnimFrame(this._animRequest), this._animRequest = c.Util.requestAnimFrame(this._updateOnMove, this, !0, this._map._container), c.DomEvent.preventDefault(a)
                        }
                    },
                    _updateOnMove: function () {
                        var a = this._map,
                                d = this._getScaleOrigin(),
                                d = a.layerPointToLatLng(d),
                                c = a.getScaleZoom(this._scale);
                        a._animateZoom(d, c, this._startCenter, this._scale, this._delta)
                    },
                    _onTouchEnd: function () {
                        if (!this._moved || !this._zooming) this._zooming = !1;
                        else {
                            var a =
                                        this._map;
                            this._zooming = !1;
                            c.DomUtil.removeClass(a._mapPane, "leaflet-touching");
                            c.Util.cancelAnimFrame(this._animRequest);
                            c.DomEvent.off(b, "touchmove", this._onTouchMove).off(b, "touchend", this._onTouchEnd);
                            var d = this._getScaleOrigin(),
                                        e = a.layerPointToLatLng(d),
                                        g = a.getZoom(),
                                        h = a.getScaleZoom(this._scale) - g,
                                        h = 0 < h ? Math.ceil(h) : Math.floor(h),
                                        g = a._limitZoom(g + h),
                                        h = a.getZoomScale(g) / this._scale;
                            a._animateZoom(e, g, d, h)
                        }
                    },
                    _getScaleOrigin: function () {
                        var a = this._centerOffset.subtract(this._delta).divideBy(this._scale);
                        return this._startCenter.add(a)
                    }
                });
                c.Map.addInitHook("addHandler", "touchZoom", c.Map.TouchZoom);
                c.Map.mergeOptions({
                    tap: !0,
                    tapTolerance: 15
                });
                c.Map.Tap = c.Handler.extend({
                    addHooks: function () {
                        c.DomEvent.on(this._map._container, "touchstart", this._onDown, this)
                    },
                    removeHooks: function () {
                        c.DomEvent.off(this._map._container, "touchstart", this._onDown, this)
                    },
                    _onDown: function (a) {
                        if (a.touches)
                            if (c.DomEvent.preventDefault(a), this._fireClick = !0, 1 < a.touches.length) this._fireClick = !1, clearTimeout(this._holdTimeout);
                            else {
                                var d = a.touches[0];
                                a = d.target;
                                this._startPos = this._newPos = new c.Point(d.clientX, d.clientY);
                                a.tagName && "a" === a.tagName.toLowerCase() && c.DomUtil.addClass(a, "leaflet-active");
                                this._holdTimeout = setTimeout(c.bind(function () {
                                    this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", d))
                                }, this), 1E3);
                                c.DomEvent.on(b, "touchmove", this._onMove, this).on(b, "touchend", this._onUp, this)
                            }
                    },
                    _onUp: function (a) {
                        clearTimeout(this._holdTimeout);
                        c.DomEvent.off(b, "touchmove", this._onMove,
                                this).off(b, "touchend", this._onUp, this);
                        if (this._fireClick && a && a.changedTouches) {
                            a = a.changedTouches[0];
                            var d = a.target;
                            d && (d.tagName && "a" === d.tagName.toLowerCase()) && c.DomUtil.removeClass(d, "leaflet-active");
                            this._isTapValid() && this._simulateEvent("click", a)
                        }
                    },
                    _isTapValid: function () {
                        return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
                    },
                    _onMove: function (a) {
                        a = a.touches[0];
                        this._newPos = new c.Point(a.clientX, a.clientY)
                    },
                    _simulateEvent: function (d, c) {
                        var e = b.createEvent("MouseEvents");
                        e._simulated = !0;
                        c.target._simulatedClick = !0;
                        e.initMouseEvent(d, !0, !0, a, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null);
                        c.target.dispatchEvent(e)
                    }
                });
                c.Browser.touch && !c.Browser.pointer && c.Map.addInitHook("addHandler", "tap", c.Map.Tap);
                c.Map.mergeOptions({
                    boxZoom: !0
                });
                c.Map.BoxZoom = c.Handler.extend({
                    initialize: function (a) {
                        this._map = a;
                        this._container = a._container;
                        this._pane = a._panes.overlayPane;
                        this._moved = !1
                    },
                    addHooks: function () {
                        c.DomEvent.on(this._container, "mousedown", this._onMouseDown,
                                this)
                    },
                    removeHooks: function () {
                        c.DomEvent.off(this._container, "mousedown", this._onMouseDown);
                        this._moved = !1
                    },
                    moved: function () {
                        return this._moved
                    },
                    _onMouseDown: function (a) {
                        this._moved = !1;
                        if (!a.shiftKey || 1 !== a.which && 1 !== a.button) return !1;
                        c.DomUtil.disableTextSelection();
                        c.DomUtil.disableImageDrag();
                        this._startLayerPoint = this._map.mouseEventToLayerPoint(a);
                        c.DomEvent.on(b, "mousemove", this._onMouseMove, this).on(b, "mouseup", this._onMouseUp, this).on(b, "keydown", this._onKeyDown, this)
                    },
                    _onMouseMove: function (a) {
                        this._moved ||
                                (this._box = c.DomUtil.create("div", "leaflet-zoom-box", this._pane), c.DomUtil.setPosition(this._box, this._startLayerPoint), this._container.style.cursor = "crosshair", this._map.fire("boxzoomstart"));
                        var d = this._startLayerPoint,
                                b = this._box,
                                e = this._map.mouseEventToLayerPoint(a);
                        a = e.subtract(d);
                        d = new c.Point(Math.min(e.x, d.x), Math.min(e.y, d.y));
                        c.DomUtil.setPosition(b, d);
                        this._moved = !0;
                        b.style.width = Math.max(0, Math.abs(a.x) - 4) + "px";
                        b.style.height = Math.max(0, Math.abs(a.y) - 4) + "px"
                    },
                    _finish: function () {
                        this._moved &&
                                (this._pane.removeChild(this._box), this._container.style.cursor = "");
                        c.DomUtil.enableTextSelection();
                        c.DomUtil.enableImageDrag();
                        c.DomEvent.off(b, "mousemove", this._onMouseMove).off(b, "mouseup", this._onMouseUp).off(b, "keydown", this._onKeyDown)
                    },
                    _onMouseUp: function (a) {
                        this._finish();
                        var d = this._map;
                        a = d.mouseEventToLayerPoint(a);
                        this._startLayerPoint.equals(a) || (a = new c.LatLngBounds(d.layerPointToLatLng(this._startLayerPoint), d.layerPointToLatLng(a)), d.fitBounds(a), d.fire("boxzoomend", {
                            boxZoomBounds: a
                        }))
                    },
                    _onKeyDown: function (a) {
                        27 === a.keyCode && this._finish()
                    }
                });
                c.Map.addInitHook("addHandler", "boxZoom", c.Map.BoxZoom);
                c.Map.mergeOptions({
                    keyboard: !0,
                    keyboardPanOffset: 80,
                    keyboardZoomOffset: 1
                });
                c.Map.Keyboard = c.Handler.extend({
                    keyCodes: {
                        left: [37],
                        right: [39],
                        down: [40],
                        up: [38],
                        zoomIn: [187, 107, 61, 171],
                        zoomOut: [189, 109, 173]
                    },
                    initialize: function (a) {
                        this._map = a;
                        this._setPanOffset(a.options.keyboardPanOffset);
                        this._setZoomOffset(a.options.keyboardZoomOffset)
                    },
                    addHooks: function () {
                        var a = this._map._container; -1 ===
                                a.tabIndex && (a.tabIndex = "0");
                        c.DomEvent.on(a, "focus", this._onFocus, this).on(a, "blur", this._onBlur, this).on(a, "mousedown", this._onMouseDown, this);
                        this._map.on("focus", this._addHooks, this).on("blur", this._removeHooks, this)
                    },
                    removeHooks: function () {
                        this._removeHooks();
                        var a = this._map._container;
                        c.DomEvent.off(a, "focus", this._onFocus, this).off(a, "blur", this._onBlur, this).off(a, "mousedown", this._onMouseDown, this);
                        this._map.off("focus", this._addHooks, this).off("blur", this._removeHooks, this)
                    },
                    _onMouseDown: function () {
                        if (!this._focused) {
                            var d =
                                        b.body,
                                        c = b.documentElement,
                                        e = d.scrollTop || c.scrollTop,
                                        d = d.scrollLeft || c.scrollLeft;
                            this._map._container.focus();
                            a.scrollTo(d, e)
                        }
                    },
                    _onFocus: function () {
                        this._focused = !0;
                        this._map.fire("focus")
                    },
                    _onBlur: function () {
                        this._focused = !1;
                        this._map.fire("blur")
                    },
                    _setPanOffset: function (a) {
                        var d = this._panKeys = {}, c = this.keyCodes,
                                b, e;
                        b = 0;
                        for (e = c.left.length; b < e; b++) d[c.left[b]] = [-1 * a, 0];
                        b = 0;
                        for (e = c.right.length; b < e; b++) d[c.right[b]] = [a, 0];
                        b = 0;
                        for (e = c.down.length; b < e; b++) d[c.down[b]] = [0, a];
                        b = 0;
                        for (e = c.up.length; b <
                                e; b++) d[c.up[b]] = [0, -1 * a]
                    },
                    _setZoomOffset: function (a) {
                        var d = this._zoomKeys = {}, c = this.keyCodes,
                                b, e;
                        b = 0;
                        for (e = c.zoomIn.length; b < e; b++) d[c.zoomIn[b]] = a;
                        b = 0;
                        for (e = c.zoomOut.length; b < e; b++) d[c.zoomOut[b]] = -a
                    },
                    _addHooks: function () {
                        c.DomEvent.on(b, "keydown", this._onKeyDown, this)
                    },
                    _removeHooks: function () {
                        c.DomEvent.off(b, "keydown", this._onKeyDown, this)
                    },
                    _onKeyDown: function (a) {
                        var d = a.keyCode,
                                b = this._map;
                        if (d in this._panKeys) {
                            if (b._panAnim && b._panAnim._inProgress) return;
                            b.panBy(this._panKeys[d]);
                            b.options.maxBounds &&
                                        b.panInsideBounds(b.options.maxBounds)
                        } else if (d in this._zoomKeys) b.setZoom(b.getZoom() + this._zoomKeys[d]);
                        else return;
                        c.DomEvent.stop(a)
                    }
                });
                c.Map.addInitHook("addHandler", "keyboard", c.Map.Keyboard);
                c.Handler.MarkerDrag = c.Handler.extend({
                    initialize: function (a) {
                        this._marker = a
                    },
                    addHooks: function () {
                        var a = this._marker._icon;
                        this._draggable || (this._draggable = new c.Draggable(a, a));
                        this._draggable.on("dragstart", this._onDragStart, this).on("drag", this._onDrag, this).on("dragend", this._onDragEnd, this);
                        this._draggable.enable();
                        c.DomUtil.addClass(this._marker._icon, "leaflet-marker-draggable")
                    },
                    removeHooks: function () {
                        this._draggable.off("dragstart", this._onDragStart, this).off("drag", this._onDrag, this).off("dragend", this._onDragEnd, this);
                        this._draggable.disable();
                        c.DomUtil.removeClass(this._marker._icon, "leaflet-marker-draggable")
                    },
                    moved: function () {
                        return this._draggable && this._draggable._moved
                    },
                    _onDragStart: function () {
                        this._marker.closePopup().fire("movestart").fire("dragstart")
                    },
                    _onDrag: function () {
                        var a = this._marker,
                                d = a._shadow,
                                b = c.DomUtil.getPosition(a._icon),
                                e = a._map.layerPointToLatLng(b);
                        d && c.DomUtil.setPosition(d, b);
                        a._latlng = e;
                        a.fire("move", {
                            latlng: e
                        }).fire("drag")
                    },
                    _onDragEnd: function (a) {
                        this._marker.fire("moveend").fire("dragend", a)
                    }
                });
                c.Control = c.Class.extend({
                    options: {
                        position: "topright"
                    },
                    initialize: function (a) {
                        c.setOptions(this, a)
                    },
                    getPosition: function () {
                        return this.options.position
                    },
                    setPosition: function (a) {
                        var d = this._map;
                        d && d.removeControl(this);
                        this.options.position = a;
                        d && d.addControl(this);
                        return this
                    },
                    getContainer: function () {
                        return this._container
                    },
                    addTo: function (a) {
                        this._map = a;
                        var d = this._container = this.onAdd(a);
                        a = a._controlContainer;
                        c.DomUtil.addClass(d, "leaflet-control");
                        a.appendChild(d);
                        return this
                    },
                    removeFrom: function (a) {
                        this.getPosition();
                        a._controlContainer.removeChild(this._container);
                        this._map = null;
                        if (this.onRemove) this.onRemove(a);
                        return this
                    },
                    _refocusOnMap: function () {
                        this._map && this._map.getContainer().focus()
                    }
                });
                c.control = function (a) {
                    return new c.Control(a)
                };
                c.Map.include({
                    addControl: function (a) {
                        a.addTo(this);
                        return this
                    },
                    removeControl: function (a) {
                        a.removeFrom(this);
                        return this
                    },
                    _initControlPos: function () {
                        this._controlContainer = c.DomUtil.create("div", "leaflet-control-container", this._container)
                    },
                    _clearControlPos: function () {
                        this._container.removeChild(this._controlContainer)
                    }
                });
                c.Control.Zoom = c.Control.extend({
                    options: {
                        zoomInText: "+",
                        zoomInTitle: "Zoom in",
                        zoomOutText: "-",
                        zoomOutTitle: "Zoom out"
                    },
                    onAdd: function (a) {
                        var d = c.DomUtil.create("div", "leaflet-control-zoom leaflet-bar");
                        this._map = a;
                        this._zoomInButton = this._createButton(this.options.zoomInText, this.options.zoomInTitle,
                                "leaflet-control-zoom-in", d, this._zoomIn, this);
                        this._zoomOutButton = this._createButton(this.options.zoomOutText, this.options.zoomOutTitle, "leaflet-control-zoom-out", d, this._zoomOut, this);
                        this._updateDisabled();
                        a.on("zoomend zoomlevelschange", this._updateDisabled, this);
                        return d
                    },
                    onRemove: function (a) {
                        a.off("zoomend zoomlevelschange", this._updateDisabled, this)
                    },
                    _zoomIn: function (a) {
                        this._map.zoomIn(a.shiftKey ? 3 : 1)
                    },
                    _zoomOut: function (a) {
                        this._map.zoomOut(a.shiftKey ? 3 : 1)
                    },
                    _createButton: function (a, d, b, e,
                        g, h) {
                        b = c.DomUtil.create("a", b, e);
                        b.innerHTML = a;
                        b.href = "#";
                        b.title = d;
                        a = c.DomEvent.stopPropagation;
                        c.DomEvent.on(b, "click", a).on(b, "mousedown", a).on(b, "dblclick", a).on(b, "click", c.DomEvent.preventDefault).on(b, "click", g, h).on(b, "click", this._refocusOnMap, h);
                        return b
                    },
                    _updateDisabled: function () {
                        var a = this._map;
                        c.DomUtil.removeClass(this._zoomInButton, "leaflet-disabled");
                        c.DomUtil.removeClass(this._zoomOutButton, "leaflet-disabled");
                        a._zoom === a.getMinZoom() && c.DomUtil.addClass(this._zoomOutButton, "leaflet-disabled");
                        a._zoom === a.getMaxZoom() && c.DomUtil.addClass(this._zoomInButton, "leaflet-disabled")
                    }
                });
                c.control.zoom = function (a) {
                    return new c.Control.Zoom(a)
                };
                c.Control.Attribution = c.Control.extend({
                    options: {
                        prefix: ""
                    },
                    initialize: function (a) {
                        c.setOptions(this, a);
                        this._attributions = {}
                    },
                    onAdd: function (a) {
                        this._container = c.DomUtil.create("div", "leaflet-control-attribution");
                        c.DomEvent.disableClickPropagation(this._container);
                        for (var d in a._layers) a._layers[d].getAttribution && this.addAttribution(a._layers[d].getAttribution());
                        a.on("layeradd", this._onLayerAdd, this).on("layerremove", this._onLayerRemove, this);
                        this._update();
                        return this._container
                    },
                    onRemove: function (a) {
                        a.off("layeradd", this._onLayerAdd).off("layerremove", this._onLayerRemove)
                    },
                    setPrefix: function (a) {
                        this.options.prefix = a;
                        this._update();
                        return this
                    },
                    addAttribution: function (a) {
                        if (a) return this._attributions[a] || (this._attributions[a] = 0), this._attributions[a]++, this._update(), this
                    },
                    removeAttribution: function (a) {
                        if (a) return this._attributions[a] && (this._attributions[a]--,
                                this._update()), this
                    },
                    _update: function () {
                        if (this._map) {
                            var a = [],
                                        d;
                            for (d in this._attributions) this._attributions[d] && a.push(d);
                            d = [];
                            this.options.prefix && d.push(this.options.prefix);
                            a.length && d.push(a.join(", "));
                            this._container.innerHTML = d.join(" | ")
                        }
                    },
                    _onLayerAdd: function (a) {
                        a.layer.getAttribution && this.addAttribution(a.layer.getAttribution())
                    },
                    _onLayerRemove: function (a) {
                        a.layer.getAttribution && this.removeAttribution(a.layer.getAttribution())
                    }
                });
                c.control.attribution = function (a) {
                    return new c.Control.Attribution(a)
                };
                c.Control.Scale = c.Control.extend({
                    options: {
                        maxWidth: 100,
                        metric: !0,
                        imperial: !0,
                        updateWhenIdle: !1
                    },
                    onAdd: function (a) {
                        this._map = a;
                        var d = c.DomUtil.create("div", "leaflet-control-scale"),
                                b = this.options;
                        this._addScales(b, "leaflet-control-scale", d);
                        a.on(b.updateWhenIdle ? "moveend" : "move", this._update, this);
                        a.whenReady(this._update, this);
                        return d
                    },
                    onRemove: function (a) {
                        a.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
                    },
                    _addScales: function (a, d, b) {
                        a.metric && (this._mScale = c.DomUtil.create("div",
                                d + "-line", b));
                        a.imperial && (this._iScale = c.DomUtil.create("div", d + "-line", b))
                    },
                    _update: function () {
                        var a = this._map.getBounds(),
                                d = a.getCenter().lat,
                                a = 6378137 * Math.PI * Math.cos(d * Math.PI / 180) * (a.getNorthEast().lng - a.getSouthWest().lng) / 180,
                                d = this._map.getSize(),
                                c = this.options,
                                b = 0;
                        0 < d.x && (b = a * (c.maxWidth / d.x));
                        this._updateScales(c, b)
                    },
                    _updateScales: function (a, d) {
                        a.metric && d && this._updateMetric(d);
                        a.imperial && d && this._updateImperial(d)
                    },
                    _updateMetric: function (a) {
                        var d = this._getRoundNum(a);
                        this._mScale.style.width =
                                this._getScaleWidth(d / a) + "px";
                        this._mScale.innerHTML = 1E3 > d ? d + " m" : d / 1E3 + " km"
                    },
                    _updateImperial: function (a) {
                        var d = 3.2808399 * a;
                        a = this._iScale;
                        var c;
                        5280 < d ? (d /= 5280, c = this._getRoundNum(d), a.style.width = this._getScaleWidth(c / d) + "px", a.innerHTML = c + " mi") : (c = this._getRoundNum(d), a.style.width = this._getScaleWidth(c / d) + "px", a.innerHTML = c + " ft")
                    },
                    _getScaleWidth: function (a) {
                        return Math.round(this.options.maxWidth * a) - 10
                    },
                    _getRoundNum: function (a) {
                        var d = Math.pow(10, (Math.floor(a) + "").length - 1);
                        a /= d;
                        return d * (10 <=
                                a ? 10 : 5 <= a ? 5 : 3 <= a ? 3 : 2 <= a ? 2 : 1)
                    }
                });
                c.control.scale = function (a) {
                    return new c.Control.Scale(a)
                };
                c.Control.Layers = c.Control.extend({
                    options: {
                        collapsed: !0,
                        autoZIndex: !0
                    },
                    initialize: function (a, d, b) {
                        c.setOptions(this, b);
                        this._layers = {};
                        this._lastZIndex = 0;
                        this._handlingClick = !1;
                        for (var e in a) this._addLayer(a[e], e);
                        for (e in d) this._addLayer(d[e], e, !0)
                    },
                    onAdd: function (a) {
                        this._initLayout();
                        this._update();
                        a.on("layeradd", this._onLayerChange, this).on("layerremove", this._onLayerChange, this);
                        return this._container
                    },
                    onRemove: function (a) {
                        a.off("layeradd", this._onLayerChange).off("layerremove", this._onLayerChange)
                    },
                    addBaseLayer: function (a, d) {
                        this._addLayer(a, d);
                        this._update();
                        return this
                    },
                    addOverlay: function (a, d) {
                        this._addLayer(a, d, !0);
                        this._update();
                        return this
                    },
                    removeLayer: function (a) {
                        a = c.stamp(a);
                        delete this._layers[a];
                        this._update();
                        return this
                    },
                    _initLayout: function () {
                        var a = this._container = c.DomUtil.create("div", "leaflet-control-layers");
                        a.setAttribute("aria-haspopup", !0);
                        if (c.Browser.touch) c.DomEvent.on(a,
                                "click", c.DomEvent.stopPropagation);
                        else c.DomEvent.disableClickPropagation(a).disableScrollPropagation(a);
                        var d = this._form = c.DomUtil.create("form", "leaflet-control-layers-list");
                        if (this.options.collapsed) {
                            if (!c.Browser.android) c.DomEvent.on(a, "mouseover", this._expand, this).on(a, "mouseout", this._collapse, this);
                            var b = this._layersLink = c.DomUtil.create("a", "leaflet-control-layers-toggle", a);
                            b.href = "#";
                            b.title = "Layers";
                            if (c.Browser.touch) c.DomEvent.on(b, "click", c.DomEvent.stop).on(b, "click", this._expand,
                                        this);
                            else c.DomEvent.on(b, "focus", this._expand, this);
                            c.DomEvent.on(d, "click", function () {
                                setTimeout(c.bind(this._onInputClick, this), 0)
                            }, this);
                            this._map.on("click", this._collapse, this)
                        } else this._expand();
                        this._baseLayersList = c.DomUtil.create("div", "leaflet-control-layers-base", d);
                        this._separator = c.DomUtil.create("div", "leaflet-control-layers-separator", d);
                        this._overlaysList = c.DomUtil.create("div", "leaflet-control-layers-overlays", d);
                        a.appendChild(d)
                    },
                    _addLayer: function (a, d, b) {
                        var e = c.stamp(a);
                        this._layers[e] = {
                            layer: a,
                            name: d,
                            overlay: b
                        };
                        this.options.autoZIndex && a.setZIndex && (this._lastZIndex++, a.setZIndex(this._lastZIndex))
                    },
                    _update: function () {
                        if (this._container) {
                            this._baseLayersList.innerHTML = "";
                            this._overlaysList.innerHTML = "";
                            var a = !1,
                                        d = !1,
                                        c, b;
                            for (c in this._layers) b = this._layers[c], this._addItem(b), d = d || b.overlay, a = a || !b.overlay;
                            this._separator.style.display = d && a ? "" : "none"
                        }
                    },
                    _onLayerChange: function (a) {
                        var d = this._layers[c.stamp(a.layer)];
                        d && (this._handlingClick || this._update(), (a = d.overlay ? "layeradd" ===
                                a.type ? "overlayadd" : "overlayremove" : "layeradd" === a.type ? "baselayerchange" : null) && this._map.fire(a, d))
                    },
                    _createRadioElement: function (a, d) {
                        var c = '<input type="radio" class="leaflet-control-layers-selector" name="' + a + '"';
                        d && (c += ' checked="checked"');
                        var c = c + "/>",
                                e = b.createElement("div");
                        e.innerHTML = c;
                        return e.firstChild
                    },
                    _addItem: function (a) {
                        var d = b.createElement("label"),
                                e, g = this._map.hasLayer(a.layer);
                        a.overlay ? (e = b.createElement("input"), e.type = "checkbox", e.className = "leaflet-control-layers-selector",
                                e.defaultChecked = g) : e = this._createRadioElement("leaflet-base-layers", g);
                        e.layerId = c.stamp(a.layer);
                        c.DomEvent.on(e, "click", this._onInputClick, this);
                        g = b.createElement("span");
                        g.className = "leaflet-control-layers-span";
                        g.innerHTML = " " + a.name;
                        d.appendChild(e);
                        d.appendChild(g);
                        (a.overlay ? this._overlaysList : this._baseLayersList).appendChild(d);
                        return d
                    },
                    _onInputClick: function () {
                        var a, d, c, b = this._form.getElementsByTagName("input"),
                                e = b.length;
                        this._handlingClick = !0;
                        for (a = 0; a < e; a++) d = b[a], c = this._layers[d.layerId],
                        d.checked && !this._map.hasLayer(c.layer) ? this._map.addLayer(c.layer) : !d.checked && this._map.hasLayer(c.layer) && this._map.removeLayer(c.layer);
                        this._handlingClick = !1;
                        this._refocusOnMap()
                    },
                    _expand: function () {
                        c.DomUtil.addClass(this._container, "leaflet-control-layers-expanded")
                    },
                    _collapse: function () {
                        this._container.className = this._container.className.replace(" leaflet-control-layers-expanded", "")
                    }
                });
                c.control.layers = function (a, d, b) {
                    return new c.Control.Layers(a, d, b)
                };
                c.PosAnimation = c.Class.extend({
                    includes: c.Mixin.Events,
                    run: function (a, d, b, e) {
                        this.stop();
                        this._el = a;
                        this._inProgress = !0;
                        this._newPos = d;
                        this.fire("start");
                        a.style[c.DomUtil.TRANSITION] = "all " + (b || 0.25) + "s cubic-bezier(0,0," + (e || 0.5) + ",1)";
                        c.DomEvent.on(a, c.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
                        c.DomUtil.setPosition(a, d);
                        c.Util.falseFn(a.offsetWidth);
                        this._stepTimer = setInterval(c.bind(this._onStep, this), 50)
                    },
                    stop: function () {
                        this._inProgress && (c.DomUtil.setPosition(this._el, this._getPos()), this._onTransitionEnd(), c.Util.falseFn(this._el.offsetWidth))
                    },
                    _onStep: function () {
                        var a = this._getPos();
                        a ? (this._el._leaflet_pos = a, this.fire("step")) : this._onTransitionEnd()
                    },
                    _transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,
                    _getPos: function () {
                        var d, b;
                        b = a.getComputedStyle(this._el);
                        if (c.Browser.any3d) {
                            b = b[c.DomUtil.TRANSFORM].match(this._transformRe);
                            if (!b) return;
                            d = parseFloat(b[1]);
                            b = parseFloat(b[2])
                        } else d = parseFloat(b.left), b = parseFloat(b.top);
                        return new c.Point(d, b, !0)
                    },
                    _onTransitionEnd: function () {
                        c.DomEvent.off(this._el, c.DomUtil.TRANSITION_END,
                                this._onTransitionEnd, this);
                        this._inProgress && (this._inProgress = !1, this._el.style[c.DomUtil.TRANSITION] = "", this._el._leaflet_pos = this._newPos, clearInterval(this._stepTimer), this.fire("step").fire("end"))
                    }
                });
                c.Map.include({
                    setView: function (a, b, e) {
                        b = b === d ? this._zoom : this._limitZoom(b);
                        a = this._limitCenter(c.latLng(a), b, this.options.maxBounds);
                        e = e || {};
                        this._panAnim && this._panAnim.stop();
                        if (this._loaded && (!e.reset && !0 !== e) && (e.animate !== d && (e.zoom = c.extend({
                            animate: e.animate
                        }, e.zoom), e.pan = c.extend({
                            animate: e.animate
                        },
                                e.pan)), this._zoom !== b ? this._tryAnimatedZoom && this._tryAnimatedZoom(a, b, e.zoom) : this._tryAnimatedPan(a, e.pan))) return clearTimeout(this._sizeTimer), this;
                        this._resetView(a, b);
                        return this
                    },
                    panBy: function (a, d) {
                        a = c.point(a).round();
                        d = d || {};
                        if (!a.x && !a.y) return this;
                        this._panAnim || (this._panAnim = new c.PosAnimation, this._panAnim.on({
                            step: this._onPanTransitionStep,
                            end: this._onPanTransitionEnd
                        }, this));
                        d.noMoveStart || this.fire("movestart");
                        if (!1 !== d.animate) {
                            c.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
                            var b = this._getMapPanePos().subtract(a);
                            this._panAnim.run(this._mapPane, b, d.duration || 0.25, d.easeLinearity)
                        } else this._rawPanBy(a), this.fire("move").fire("moveend");
                        return this
                    },
                    _onPanTransitionStep: function () {
                        this.fire("move")
                    },
                    _onPanTransitionEnd: function () {
                        c.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim");
                        this.fire("moveend")
                    },
                    _tryAnimatedPan: function (a, d) {
                        var c = this._getCenterOffset(a)._floor();
                        if (!0 !== (d && d.animate) && !this.getSize().contains(c)) return !1;
                        this.panBy(c, d);
                        return !0
                    }
                });
                c.PosAnimation =
                c.DomUtil.TRANSITION ? c.PosAnimation : c.PosAnimation.extend({
                    run: function (a, d, b, e) {
                        this.stop();
                        this._el = a;
                        this._inProgress = !0;
                        this._duration = b || 0.25;
                        this._easeOutPower = 1 / Math.max(e || 0.5, 0.2);
                        this._startPos = c.DomUtil.getPosition(a);
                        this._offset = d.subtract(this._startPos);
                        this._startTime = +new Date;
                        this.fire("start");
                        this._animate()
                    },
                    stop: function () {
                        this._inProgress && (this._step(), this._complete())
                    },
                    _animate: function () {
                        this._animId = c.Util.requestAnimFrame(this._animate, this);
                        this._step()
                    },
                    _step: function () {
                        var a = +new Date - this._startTime,
                                        d = 1E3 * this._duration;
                        a < d ? this._runFrame(this._easeOut(a / d)) : (this._runFrame(1), this._complete())
                    },
                    _runFrame: function (a) {
                        a = this._startPos.add(this._offset.multiplyBy(a));
                        c.DomUtil.setPosition(this._el, a);
                        this.fire("step")
                    },
                    _complete: function () {
                        c.Util.cancelAnimFrame(this._animId);
                        this._inProgress = !1;
                        this.fire("end")
                    },
                    _easeOut: function (a) {
                        return 1 - Math.pow(1 - a, this._easeOutPower)
                    }
                });
                c.Map.mergeOptions({
                    zoomAnimation: !0,
                    zoomAnimationThreshold: 4
                });
                c.DomUtil.TRANSITION && c.Map.addInitHook(function () {
                    if (this._zoomAnimated =
                        this.options.zoomAnimation && c.DomUtil.TRANSITION && c.Browser.any3d && !c.Browser.android23 && !c.Browser.mobileOpera) c.DomEvent.on(this._mapPane, c.DomUtil.TRANSITION_END, this._catchTransitionEnd, this)
                });
                c.Map.include(!c.DomUtil.TRANSITION ? {} : {
                    _catchTransitionEnd: function (a) {
                        this._animatingZoom && 0 <= a.propertyName.indexOf("transform") && this._onZoomTransitionEnd()
                    },
                    _nothingToAnimate: function () {
                        return !this._container.getElementsByClassName("leaflet-zoom-animated").length
                    },
                    _tryAnimatedZoom: function (a, d, c) {
                        if (this._animatingZoom) return !0;
                        c = c || {};
                        if (!this._zoomAnimated || !1 === c.animate || this._nothingToAnimate() || Math.abs(d - this._zoom) > this.options.zoomAnimationThreshold) return !1;
                        var b = this.getZoomScale(d),
                                e = this._getCenterOffset(a)._divideBy(1 - 1 / b),
                                g = this._getCenterLayerPoint()._add(e);
                        if (!0 !== c.animate && !this.getSize().contains(e)) return !1;
                        this.fire("movestart").fire("zoomstart");
                        this._animateZoom(a, d, g, b, null, !0);
                        return !0
                    },
                    _animateZoom: function (a, d, b, e, g, h) {
                        this._animatingZoom = !0;
                        c.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim");
                        this._animateToCenter = a;
                        this._animateToZoom = d;
                        c.Draggable && (c.Draggable._disabled = !0);
                        this.fire("zoomanim", {
                            center: a,
                            zoom: d,
                            origin: b,
                            scale: e,
                            delta: g,
                            backwards: h
                        })
                    },
                    _onZoomTransitionEnd: function () {
                        this._animatingZoom = !1;
                        c.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim");
                        this._resetView(this._animateToCenter, this._animateToZoom, !0, !0);
                        c.Draggable && (c.Draggable._disabled = !1)
                    }
                });
                c.TileLayer.include({
                    _animateZoom: function (a) {
                        this._animating || (this._animating = !0, this._prepareBgBuffer());
                        var d = this._bgBuffer,
                                b = c.DomUtil.TRANSFORM,
                                e = a.delta ? c.DomUtil.getTranslateString(a.delta) : d.style[b],
                                g = c.DomUtil.getScaleString(a.scale, a.origin);
                        d.style[b] = a.backwards ? g + " " + e : e + " " + g
                    },
                    _endZoomAnim: function () {
                        var a = this._tileContainer,
                                d = this._bgBuffer;
                        a.style.visibility = "";
                        a.parentNode.appendChild(a);
                        c.Util.falseFn(d.offsetWidth);
                        this._animating = !1
                    },
                    _clearBgBuffer: function () {
                        var a = this._map;
                        a && (!a._animatingZoom && !a.touchZoom._zooming) && (this._bgBuffer.innerHTML = "", this._bgBuffer.style[c.DomUtil.TRANSFORM] = "")
                    },
                    _prepareBgBuffer: function () {
                        var a =
                                this._tileContainer,
                                d = this._bgBuffer,
                                b = this._getLoadedTilesPercentage(d),
                                e = this._getLoadedTilesPercentage(a);
                        d && 0.5 < b && 0.5 > e ? (a.style.visibility = "hidden", this._stopLoadingImages(a)) : (d.style.visibility = "hidden", d.style[c.DomUtil.TRANSFORM] = "", this._tileContainer = d, d = this._bgBuffer = a, this._stopLoadingImages(d), clearTimeout(this._clearBgBufferTimer))
                    },
                    _getLoadedTilesPercentage: function (a) {
                        a = a.getElementsByTagName("img");
                        var d, c, b = 0;
                        d = 0;
                        for (c = a.length; d < c; d++) a[d].complete && b++;
                        return b / c
                    },
                    _stopLoadingImages: function (a) {
                        a =
                                Array.prototype.slice.call(a.getElementsByTagName("img"));
                        var d, b, e;
                        d = 0;
                        for (b = a.length; d < b; d++) e = a[d], e.complete || (e.onload = c.Util.falseFn, e.onerror = c.Util.falseFn, e.src = c.Util.emptyImageUrl, e.parentNode.removeChild(e))
                    }
                });
                c.Map.include({
                    _defaultLocateOptions: {
                        watch: !1,
                        setView: !1,
                        maxZoom: Infinity,
                        timeout: 1E4,
                        maximumAge: 0,
                        enableHighAccuracy: !1
                    },
                    locate: function (a) {
                        a = this._locateOptions = c.extend(this._defaultLocateOptions, a);
                        if (!navigator.geolocation) return this._handleGeolocationError({
                            code: 0,
                            message: "Geolocation not supported."
                        }),
                        this;
                        var d = c.bind(this._handleGeolocationResponse, this),
                                b = c.bind(this._handleGeolocationError, this);
                        a.watch ? this._locationWatchId = navigator.geolocation.watchPosition(d, b, a) : navigator.geolocation.getCurrentPosition(d, b, a);
                        return this
                    },
                    stopLocate: function () {
                        navigator.geolocation && navigator.geolocation.clearWatch(this._locationWatchId);
                        this._locateOptions && (this._locateOptions.setView = !1);
                        return this
                    },
                    _handleGeolocationError: function (a) {
                        var d = a.code;
                        a = a.message || (1 === d ? "permission denied" : 2 === d ? "position unavailable" :
                                "timeout");
                        this._locateOptions.setView && !this._loaded && this.fitWorld();
                        this.fire("locationerror", {
                            code: d,
                            message: "Geolocation error: " + a + "."
                        })
                    },
                    _handleGeolocationResponse: function (a) {
                        var d = a.coords.latitude,
                                b = a.coords.longitude,
                                e = new c.LatLng(d, b),
                                g = 180 * a.coords.accuracy / 40075017,
                                h = g / Math.cos(c.LatLng.DEG_TO_RAD * d),
                                d = c.latLngBounds([d - g, b - h], [d + g, b + h]),
                                b = this._locateOptions;
                        b.setView && (b = Math.min(this.getBoundsZoom(d), b.maxZoom), this.setView(e, b));
                        var e = {
                            latlng: e,
                            bounds: d,
                            timestamp: a.timestamp
                        }, j;
                        for (j in a.coords) "number" === typeof a.coords[j] && (e[j] = a.coords[j]);
                        this.fire("locationfound", e)
                    }
                })
            })(window, document);
            L.Icon.Default.imagePath = function () {
                var a = document.getElementsByTagName("script"),
                b = /[\/^]hobbit-min[\-\._]?([\w\-\._]*)\.js\??/,
                d = /[\/^]hobbit-src[\-\._]?([\w\-\._]*)\.js\??/,
                e, c, g, h, j;
                e = 0;
                for (c = a.length; e < c; e++) {
                    g = a[e].src;
                    h = g.match(b);
                    j = g.match(d);
                    if (h) return a = g.split(b)[0], (a ? a + "/" : "") + "images";
                    if (j) return a = g.split(d)[0], (a ? a + "/" : "") + "images"
                }
            } ();
            Array.prototype.indexOf || (Array.prototype.indexOf = function (a, b) {
                var d = this.length >>> 0,
                e = Number(b) || 0,
                e = 0 > e ? Math.ceil(e) : Math.floor(e);
                for (0 > e && (e += d); e < d; e++)
                    if (e in this && this[e] === a) return e;
                return -1
            });
            document.createElementNS || (document.createElementNS = function (a, b) {
                return document.createElement(b)
            });
            String.prototype.capitalize = function () {
                return this.replace(/(^|\s)([a-z])/g, function (a, b, d) {
                    return b + d.toUpperCase()
                })
            };
            !this.addEventListener && this.Element && function () {
                function a(a, b) {
                    Window.prototype[a] = HTMLDocument.prototype[a] = Element.prototype[a] = b
                }
                var b = [];
                a("addEventListener", function (a, e) {
                    var c = this;
                    b.unshift({
                        __listener: function (a) {
                            a.currentTarget = c;
                            a.pageX = a.clientX + document.documentElement.scrollLeft;
                            a.pageY = a.clientY + document.documentElement.scrollTop;
                            a.preventDefault = function () {
                                a.returnValue = !1
                            };
                            a.relatedTarget = a.fromElement || null;
                            a.stopPropagation = function () {
                                a.cancelBubble = !0
                            };
                            a.relatedTarget = a.fromElement ||
                                        null;
                            a.target = a.srcElement || c;
                            a.timeStamp = +new Date;
                            e.call(c, a)
                        },
                        listener: e,
                        target: c,
                        type: a
                    });
                    this.attachEvent("on" + a, b[0].__listener)
                });
                a("removeEventListener", function (a, e) {
                    for (var c = 0, g = b.length; c < g; ++c)
                        if (b[c].target == this && b[c].type == a && b[c].listener == e) return this.detachEvent("on" + a, b.splice(c, 1)[0].__listener)
                });
                a("dispatchEvent", function (a) {
                    try {
                        return this.fireEvent("on" + a.type, a)
                    } catch (e) {
                        for (var c = 0, g = b.length; c < g; ++c) b[c].target == this && b[c].type == a.type && b[c].call(this, a)
                    }
                })
            } ();
            var Aes = {
                cipher: function (a, b) {
                    for (var d = b.length / 4 - 1, e = [
                [],
                [],
                [],
                []
            ], c = 0; 16 > c; c++) e[c % 4][Math.floor(c / 4)] = a[c];
                    e = Aes.addRoundKey(e, b, 0, 4);
                    for (c = 1; c < d; c++) e = Aes.subBytes(e, 4), e = Aes.shiftRows(e, 4), e = Aes.mixColumns(e, 4), e = Aes.addRoundKey(e, b, c, 4);
                    e = Aes.subBytes(e, 4);
                    e = Aes.shiftRows(e, 4);
                    e = Aes.addRoundKey(e, b, d, 4);
                    d = Array(16);
                    for (c = 0; 16 > c; c++) d[c] = e[c % 4][Math.floor(c / 4)];
                    return d
                },
                keyExpansion: function (a) {
                    for (var b = a.length / 4, d = b + 6, e = Array(4 * (d + 1)), c = Array(4), g = 0; g < b; g++) e[g] = [a[4 * g], a[4 * g + 1], a[4 * g + 2],
            a[4 * g + 3]
        ];
                    for (g = b; g < 4 * (d + 1); g++) {
                        e[g] = Array(4);
                        for (a = 0; 4 > a; a++) c[a] = e[g - 1][a];
                        if (0 == g % b) {
                            c = Aes.subWord(Aes.rotWord(c));
                            for (a = 0; 4 > a; a++) c[a] ^= Aes.rCon[g / b][a]
                        } else 6 < b && 4 == g % b && (c = Aes.subWord(c));
                        for (a = 0; 4 > a; a++) e[g][a] = e[g - b][a] ^ c[a]
                    }
                    return e
                },
                subBytes: function (a, b) {
                    for (var d = 0; 4 > d; d++)
                        for (var e = 0; e < b; e++) a[d][e] = Aes.sBox[a[d][e]];
                    return a
                },
                shiftRows: function (a, b) {
                    for (var d = Array(4), e = 1; 4 > e; e++) {
                        for (var c = 0; 4 > c; c++) d[c] = a[e][(c + e) % b];
                        for (c = 0; 4 > c; c++) a[e][c] = d[c]
                    }
                    return a
                },
                mixColumns: function (a) {
                    for (var b =
                        0; 4 > b; b++) {
                        for (var d = Array(4), e = Array(4), c = 0; 4 > c; c++) d[c] = a[c][b], e[c] = a[c][b] & 128 ? a[c][b] << 1 ^ 283 : a[c][b] << 1;
                        a[0][b] = e[0] ^ d[1] ^ e[1] ^ d[2] ^ d[3];
                        a[1][b] = d[0] ^ e[1] ^ d[2] ^ e[2] ^ d[3];
                        a[2][b] = d[0] ^ d[1] ^ e[2] ^ d[3] ^ e[3];
                        a[3][b] = d[0] ^ e[0] ^ d[1] ^ d[2] ^ e[3]
                    }
                    return a
                },
                addRoundKey: function (a, b, d, e) {
                    for (var c = 0; 4 > c; c++)
                        for (var g = 0; g < e; g++) a[c][g] ^= b[4 * d + g][c];
                    return a
                },
                subWord: function (a) {
                    for (var b = 0; 4 > b; b++) a[b] = Aes.sBox[a[b]];
                    return a
                },
                rotWord: function (a) {
                    for (var b = a[0], d = 0; 3 > d; d++) a[d] = a[d + 1];
                    a[3] = b;
                    return a
                },
                sBox: [99,
        124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93,
        25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22
    ],
                rCon: [
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [2, 0, 0, 0],
        [4, 0, 0, 0],
        [8, 0, 0, 0],
        [16, 0, 0, 0],
        [32, 0, 0, 0],
        [64, 0, 0, 0],
        [128,
            0, 0, 0
        ],
        [27, 0, 0, 0],
        [54, 0, 0, 0]
    ],
                Ctr: {}
            };
            Aes.Ctr.encrypt = function (a, b, d) {
                if (!(128 == d || 192 == d || 256 == d)) return "";
                a = Utf8.encode(a);
                b = Utf8.encode(b);
                var e = d / 8,
                c = Array(e);
                for (d = 0; d < e; d++) c[d] = isNaN(b.charCodeAt(d)) ? 0 : b.charCodeAt(d);
                c = Aes.cipher(c, Aes.keyExpansion(c));
                c = c.concat(c.slice(0, e - 16));
                b = Array(16);
                d = (new Date).getTime();
                var e = d % 1E3,
                g = Math.floor(d / 1E3),
                h = Math.floor(65535 * Math.random());
                for (d = 0; 2 > d; d++) b[d] = e >>> 8 * d & 255;
                for (d = 0; 2 > d; d++) b[d + 2] = h >>> 8 * d & 255;
                for (d = 0; 4 > d; d++) b[d + 4] = g >>> 8 * d & 255;
                e = "";
                for (d = 0; 8 > d; d++) e += String.fromCharCode(b[d]);
                for (var c = Aes.keyExpansion(c), g = Math.ceil(a.length / 16), h = Array(g), j = 0; j < g; j++) {
                    for (d = 0; 4 > d; d++) b[15 - d] = j >>> 8 * d & 255;
                    for (d = 0; 4 > d; d++) b[15 - d - 4] = j / 4294967296 >>> 8 * d;
                    var k = Aes.cipher(b, c),
                        l = j < g - 1 ? 16 : (a.length - 1) % 16 + 1,
                        m = Array(l);
                    for (d = 0; d < l; d++) m[d] = k[d] ^ a.charCodeAt(16 * j + d), m[d] = String.fromCharCode(m[d]);
                    h[j] = m.join("")
                }
                a = e + h.join("");
                return a = Base64.encode(a)
            };
            Aes.Ctr.decrypt = function (a, b, d) {
                if (!(128 == d || 192 == d || 256 == d)) return "";
                a = Base64.decode(a);
                b = Utf8.encode(b);
                var e = d / 8,
                c = Array(e);
                for (d = 0; d < e; d++) c[d] = isNaN(b.charCodeAt(d)) ? 0 : b.charCodeAt(d);
                c = Aes.cipher(c, Aes.keyExpansion(c));
                c = c.concat(c.slice(0, e - 16));
                b = Array(8);
                ctrTxt = a.slice(0, 8);
                for (d = 0; 8 > d; d++) b[d] = ctrTxt.charCodeAt(d);
                e = Aes.keyExpansion(c);
                c = Math.ceil((a.length - 8) / 16);
                d = Array(c);
                for (var g = 0; g < c; g++) d[g] = a.slice(8 + 16 * g, 16 * g + 24);
                a = d;
                for (var h = Array(a.length), g = 0; g < c; g++) {
                    for (d = 0; 4 > d; d++) b[15 -
                        d] = g >>> 8 * d & 255;
                    for (d = 0; 4 > d; d++) b[15 - d - 4] = (g + 1) / 4294967296 - 1 >>> 8 * d & 255;
                    var j = Aes.cipher(b, e),
                        k = Array(a[g].length);
                    for (d = 0; d < a[g].length; d++) k[d] = j[d] ^ a[g].charCodeAt(d), k[d] = String.fromCharCode(k[d]);
                    h[g] = k.join("")
                }
                a = h.join("");
                return a = Utf8.decode(a)
            };
            var Base64 = {
                code: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                encode: function (a, b) {
                    var d, e, c, g, h = [],
                        j = "",
                        k, l, m = Base64.code;
                    l = ("undefined" == typeof b ? 0 : b) ? a.encodeUTF8() : a;
                    k = l.length % 3;
                    if (0 < k)
                        for (; 3 > k++; ) j += "=", l += "\x00";
                    for (k = 0; k < l.length; k += 3) d = l.charCodeAt(k), e = l.charCodeAt(k + 1), c = l.charCodeAt(k + 2), g = d << 16 | e << 8 | c, d = g >> 18 & 63, e = g >> 12 & 63, c = g >> 6 & 63, g &= 63, h[k / 3] = m.charAt(d) + m.charAt(e) + m.charAt(c) + m.charAt(g);
                    h = h.join("");
                    return h = h.slice(0, h.length - j.length) + j
                },
                decode: function (a,
                b) {
                    b = "undefined" == typeof b ? !1 : b;
                    var d, e, c, g, h, j = [],
                        k, l = Base64.code;
                    k = b ? a.decodeUTF8() : a;
                    for (var m = 0; m < k.length; m += 4) d = l.indexOf(k.charAt(m)), e = l.indexOf(k.charAt(m + 1)), g = l.indexOf(k.charAt(m + 2)), h = l.indexOf(k.charAt(m + 3)), c = d << 18 | e << 12 | g << 6 | h, d = c >>> 16 & 255, e = c >>> 8 & 255, c &= 255, j[m / 4] = String.fromCharCode(d, e, c), 64 == h && (j[m / 4] = String.fromCharCode(d, e)), 64 == g && (j[m / 4] = String.fromCharCode(d));
                    g = j.join("");
                    return b ? g.decodeUTF8() : g
                }
            }, Utf8 = {
                encode: function (a) {
                    a = a.replace(/[\u0080-\u07ff]/g, function (a) {
                        a = a.charCodeAt(0);
                        return String.fromCharCode(192 | a >> 6, 128 | a & 63)
                    });
                    return a = a.replace(/[\u0800-\uffff]/g, function (a) {
                        a = a.charCodeAt(0);
                        return String.fromCharCode(224 | a >> 12, 128 | a >> 6 & 63, 128 | a & 63)
                    })
                },
                decode: function (a) {
                    a = a.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (a) {
                        a = (a.charCodeAt(0) & 15) << 12 | (a.charCodeAt(1) & 63) << 6 | a.charCodeAt(2) & 63;
                        return String.fromCharCode(a)
                    });
                    return a = a.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (a) {
                        a = (a.charCodeAt(0) & 31) << 6 | a.charCodeAt(1) & 63;
                        return String.fromCharCode(a)
                    })
                }
            };
            var oldH = window.H,
        H = {};
            "object" === typeof module && "object" === typeof module.exports ? module.exports = H : "function" === typeof define && define.amd && define(H);
            H.noConflict = function () {
                window.H = oldH;
                return this
            };
            window.H = H;
            var old$$ = window.$$,
        $$ = {};
            "object" === typeof module && "object" === typeof module.exports ? module.exports = $$ : "function" === typeof define && define.amd && define($$);
            $$.noConflict = function () {
                window.$$ = old$$;
                return this
            };
            window.$$ = $$;
            $$.XMLHttpRequest = function (a, b) {
                if (window.XMLHttpRequest) httpRequest = new XMLHttpRequest;
                else if (window.ActiveXObject) try {
                    httpRequest = new ActiveXObject("Msxml2.XMLHTTP")
                } catch (d) {
                    try {
                        httpRequest = new ActiveXObject("Microsoft.XMLHTTP")
                    } catch (e) { }
                }
                httpRequest.open("GET", a, !0);
                httpRequest.onreadystatechange = function () {
                    4 === httpRequest.readyState && 200 === httpRequest.status && b(httpRequest)
                };
                httpRequest.send()
            };
            $$.downloadJSAtOnload = function (a) {
                var b = document.createElement("script");
                b.src = a;
                document.body.appendChild(b)
            };
            H.Map = L.Map.extend({});
            H.Map.include({
                loadConfig: function () {
                    var a = Aes.Ctr.decrypt(hobbitConfig, "carpass", 256),
                        a = eval("(" + a.toString() + ")");
                    H.Config = a;
                    this._iniHobbit();
                    return this
                },
                _iniHobbit: function () {
                    var a = "" == H.Config.mapLanguages ? "EN" : H.Config.mapLanguages[0],
                        b = "" == H.Config.defaultLatitude ? 13.678 : H.Config.defaultLatitude,
                        d = "" == H.Config.defaultLongitude ? 100.609 : H.Config.defaultLongitude,
                        e = "" == H.Config.defaultZoom ? 6 : H.Config.defaultZoom,
                        c = "" == H.Config.minZoom ? 5 : H.Config.minZoom,
                        g = "" == H.Config.maxZoom ? 22 : H.Config.maxZoom;
                    this.control = {};
                    this.layers = {};
                    this.active = {
                        expressway: !0,
                        streetView: !0,
                        threeDimention: !0,
                        onSearch: !1,
                        traffic: {
                            trafficColor: !1,
                            trafficGrey: !1,
                            trafficGoogle: !1,
                            trafficInfo: !0
                        },
                        position: {
                            latlng: !0,
                            utm: !1,
                            dms: !1
                        }
                    };
                    this._current = {
                        building: {
                            name: void 0,
                            floor: "1",
                            floorname: void 0
                        }
                    };
                    this._zoomEnable = {
                        traffic: H.Config.zoomEnableTraffic,
                        streetView: H.Config.zoomEnableStreetView,
                        floorPlan: H.Config.zoomEnableFloorplan
                    };
                    this._mapLayerFromConfig = H.Config.defaultMaps;
                    this._mapTypeFromConfig = H.Config.defaultMapType;
                    this._arrayMapLanguage = H.Config.mapLanguage;
                    this._mapLanguage = a;
                    this._mapLayer = H.Config.defaultMaps;
                    this._mapType = H.Config.defaultMapType;
                    this._basemapList = H.Config.fixLayers;
                    this._expressWayLayers = H.Config.expressWayLayers;
                    this._trafficLayers = H.Config.trafficLayers;
                    this._floorLayer = H.Config.floor;
                    this._customLayers = H.Config.customLayers;
                    this._serviceData = H.Config.data;
                    this._defaultSettingInMenu = H.Config.defaultMenuControlSettings;
                    this.setView([b, d], e);
                    this.setMinZoom(c);
                    this.setMaxZoom(g);
                    this.layers.expressway =
                        new H.Expressway(this);
                    H.Config.attribution && (this.control.attribution = (new L.Control.Attribution).addTo(this), this.control.attribution.setPrefix("Hobbit, Version " + H.version[H.version.length - 1]));
                    H.Config.floorPlan && (this.control.floorPlan = (new H.Control.InDoor).addTo(this), this.control.floorPlan._active = !0);
                    H.Config.measurement && (this.control.measureTools = (new H.Control.MeasureTools(this)).addTo(this));
                    H.Config.locate && (this.control.locate = (new H.Control.Locate).addTo(this));
                    H.Config.menuMapSource ?
                        this.control.mapSource = (new H.Control.MapSource).addTo(this) : (a = this._returnLayer({
                            indexMap: this._mapLayer,
                            mapType: this._mapType,
                            language: this._mapLanguage
                        }), this.addLayer(a));
                    H.Config.mousePosition && (this.control.position = (new H.Control.Position).addTo(this));
                    H.Config.scale && (this.control.scale = (new L.Control.Scale).addTo(this));
                    H.Config.search && (this.control.search = (new H.Control.Search(this)).addTo(this));
                    H.Config.streetView && (this.control.streetView = (new H.Control.StreetView).addTo(this));
                    H.Config.zoomControl &&
                        (this.control.zoom = (new L.Control.Zoom).addTo(this));
                    void 0 !== this._customLayers && "" != this._customLayers && (this.control.customLayers = (new H.Control.CustomLayer(this)).addTo(this));
                    H.Config.menuControl && (this.control.menu = (new H.Control.Menu).addTo(this));
                    H.Config.rightClick && (this.control.rightclick = new H.RightclickInfo(this), this.control.rightclick.enable());
                    H.Config.miniMap && (a = this._returnLayer(this._basemapList[1].maps.road[this._mapLanguage]), this.control.miniMap = (new L.Control.MiniMap(a, {
                        toggleDisplay: !0,
                        minimize: !0
                    })).addTo(this), this._defaultSettingInMenu.miniMap || this.control.miniMap.hide());
                    this._checkBrowser();
                    0 == this._mapLayer && this.layers.expressway.show();
                    this._changeTextLanguage(this._mapLanguage)
                },
                _checkBrowser: function () {
                    if (L.Browser.mobile)
                        for (var a = ["zoom", "attribution", "miniMap"], b = 0; b < a.length; b++) null != this.control[a[b]]._container.parentNode && this.control[a[b]].disable()
                }
            });
            H.Map.addInitHook(function () {
                this.loadConfig()
            });
            H.version = ["0.9", "1.0b"];
            H.language = {
                EN: {
                    loading: "Loading...",
                    youarehear: "You're here",
                    startroute: "Direction from here",
                    finishedroute: "Direction to here",
                    placenearby: "Place Near By",
                    selectall: "Select All",
                    totaldistance: "Total distance",
                    totaltime: "Total time",
                    _delete: "Delete",
                    metre: "m.",
                    kmetre: "km.",
                    hour: "hr.",
                    minute: "min.",
                    second: "sec.",
                    header: "Language",
                    options: "Options",
                    traffic: "Traffic",
                    language: "Language",
                    layers: "Layers",
                    tools: "Tools",
                    settings: "Settings",
                    flyto: "Flyto",
                    convert: "Coordinate Converter",
                    latitude: "Latitude",
                    longitude: "Longitude",
                    zone: "Zone",
                    deg: "Degree Decimal",
                    utm: "UTM",
                    currentlocation: "Current Location",
                    measuretools: "Measure Tools",
                    zoom: "Zoom",
                    scale: "Scale",
                    position: "Mouse Position",
                    minimap: "Mini-Map",
                    threedimension: "3D Mode",
                    unit: "Unit",
                    streetview: "Street View"
                },
                TH: {
                    loading: "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e42\u0e2b\u0e25\u0e14\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25...",
                    youarehear: "\u0e02\u0e13\u0e30\u0e19\u0e35\u0e49\u0e04\u0e38\u0e13\u0e2d\u0e22\u0e39\u0e48\u0e17\u0e35\u0e48",
                    startroute: "\u0e40\u0e2a\u0e49\u0e19\u0e17\u0e32\u0e07\u0e08\u0e32\u0e01\u0e15\u0e23\u0e07\u0e19\u0e35\u0e49",
                    finishedroute: "\u0e40\u0e2a\u0e49\u0e19\u0e17\u0e32\u0e07\u0e21\u0e32\u0e17\u0e35\u0e48\u0e19\u0e35\u0e48",
                    placenearby: "\u0e04\u0e49\u0e19\u0e2b\u0e32\u0e43\u0e19\u0e23\u0e31\u0e28\u0e21\u0e35",
                    selectall: "\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14",
                    totaldistance: "\u0e23\u0e30\u0e22\u0e30\u0e17\u0e32\u0e07\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14",
                    totaltime: "\u0e40\u0e27\u0e25\u0e32\u0e17\u0e35\u0e48\u0e43\u0e0a\u0e49",
                    _delete: "\u0e25\u0e1a",
                    metre: "\u0e40\u0e21\u0e15\u0e23",
                    kmetre: "\u0e01\u0e34\u0e42\u0e25\u0e40\u0e21\u0e15\u0e23",
                    hour: "\u0e0a\u0e31\u0e48\u0e27\u0e42\u0e21\u0e07",
                    minute: "\u0e19\u0e32\u0e17\u0e35",
                    second: "\u0e27\u0e34\u0e19\u0e32\u0e17\u0e35",
                    header: "\u0e20\u0e32\u0e29\u0e32",
                    options: "\u0e15\u0e31\u0e27\u0e40\u0e25\u0e37\u0e2d\u0e01",
                    traffic: "\u0e08\u0e23\u0e32\u0e08\u0e23",
                    language: "\u0e20\u0e32\u0e29\u0e32",
                    layers: "\u0e0a\u0e31\u0e49\u0e19\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25",
                    tools: "\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e21\u0e37\u0e2d",
                    settings: "\u0e15\u0e31\u0e49\u0e07\u0e04\u0e48\u0e32",
                    flyto: "\u0e1e\u0e32\u0e44\u0e1b",
                    convert: "\u0e41\u0e1b\u0e25\u0e07\u0e1e\u0e34\u0e01\u0e31\u0e14",
                    latitude: "\u0e25\u0e30\u0e15\u0e34\u0e08\u0e39\u0e14",
                    longitude: "\u0e25\u0e2d\u0e07\u0e08\u0e34\u0e08\u0e39\u0e14",
                    zone: "\u0e40\u0e02\u0e15",
                    deg: "\u0e2d\u0e07\u0e28\u0e32\u0e17\u0e28\u0e19\u0e34\u0e22\u0e21",
                    utm: "\u0e23\u0e30\u0e1a\u0e1a\u0e1e\u0e34\u0e01\u0e31\u0e14\u0e09\u0e32\u0e01",
                    currentlocation: "\u0e17\u0e35\u0e48\u0e15\u0e31\u0e49\u0e07\u0e1b\u0e31\u0e08\u0e38\u0e1a\u0e31\u0e19",
                    measuretools: "\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e21\u0e37\u0e2d\u0e27\u0e31\u0e14",
                    zoom: "\u0e22\u0e48\u0e2d-\u0e02\u0e22\u0e32\u0e22",
                    scale: "\u0e2a\u0e40\u0e01\u0e25",
                    position: "\u0e1e\u0e34\u0e01\u0e31\u0e14\u0e02\u0e2d\u0e07\u0e40\u0e21\u0e32\u0e17\u0e4c",
                    minimap: "\u0e41\u0e1c\u0e19\u0e17\u0e35\u0e48\u0e22\u0e48\u0e2d",
                    threedimension: "\u0e42\u0e21\u0e40\u0e14\u0e25\u0e2a\u0e32\u0e21\u0e21\u0e34\u0e15\u0e34",
                    unit: "\u0e2b\u0e19\u0e48\u0e27\u0e22\u0e27\u0e31\u0e14",
                    streetview: "\u0e21\u0e38\u0e21\u0e21\u0e2d\u0e07\u0e16\u0e19\u0e19"
                }
            };
            H.Control = L.Control.extend({});
            H.control = function (a) {
                return new H.Control(a)
            };
            L.Control.include({
                show: function () {
                    this._container.style.display = "block";
                    this.visible = !0;
                    return this
                },
                hide: function () {
                    this._container.style.display = "none";
                    this.visible = !1;
                    return this
                },
                enable: function () {
                    this._map._controlContainer.appendChild(this._container);
                    this._checkEnable(this._container);
                    return this
                },
                disable: function () {
                    this._map._controlContainer.removeChild(this._container);
                    this._checkDisable(this._container);
                    return this
                },
                _checkEnable: function (a) {
                    var b = this._map.control;
                    void 0 !== b.zoom && b.zoom._container ===
                        a && (L.DomUtil.removeClass(b.locate._container, "none-zoomcontrol"), L.DomUtil.removeClass(b.floorPlan._container, "none-zoomcontrol"));
                    void 0 !== b.scale && b.scale._container === a && L.DomUtil.removeClass(b.position._container, "none-scale");
                    void 0 !== b.attribution && b.attribution._container === a && L.DomUtil.removeClass(b.menu._container, "none-attribution");
                    void 0 !== b.streetView && b.streetView._container === a && (L.DomUtil.addClass(b.menu._container, "hasstreetview"), this._map.hasLayer(b.streetView.directionMarker) ||
                        this._map.addLayer(b.streetView.directionMarker));
                    void 0 !== b.floorPlan && b.floorPlan._container === a && (b.floorPlan._active = !0)
                },
                _checkDisable: function (a) {
                    var b = this._map.control;
                    void 0 !== b.zoom && b.zoom._container === a && (L.DomUtil.addClass(b.locate._container, "none-zoomcontrol"), L.DomUtil.addClass(b.floorPlan._container, "none-zoomcontrol"));
                    void 0 !== b.scale && b.scale._container === a && L.DomUtil.addClass(b.position._container, "none-scale");
                    void 0 !== b.attribution && b.attribution._container === a && L.DomUtil.addClass(b.menu._container,
                        "none-attribution");
                    void 0 !== b.streetView && b.streetView._container === a && (L.DomUtil.removeClass(b.menu._container, "hasstreetview"), this._map.hasLayer(b.streetView.directionMarker) && this._map.removeLayer(b.streetView.directionMarker));
                    void 0 !== b.floorPlan && b.floorPlan._container === a && (b.floorPlan.hideLocation(b.floorPlan._currentLayer), b.floorPlan._active = !1)
                }
            });
            H.Map.include({
                toggleControl: function (a) {
                    a.visible ? this.hideControl(a) : this.showControl(a);
                    return this
                },
                showControl: function (a) {
                    a.show();
                    return this
                },
                hideControl: function (a) {
                    a.hide();
                    return this
                },
                toggleUnit: function (a, b) {
                    this.active.position[a] = b;
                    return this
                },
                toggle3D: function (a, b) {
                    this.active.threeDimention = b;
                    return this
                },
                toggleLayer: function (a) {
                    console.log(a);
                    return this
                },
                toggleTraffic: function (a, b) {
                    this.active.traffic[a] = b;
                    "trafficGoogle" == a ? this.layers.trafficGoogle.toggle() : "trafficColor" == a ?
                        this.layers.trafficColor.toggle() : "trafficGrey" == a && this.layers.trafficGrey.toggle();
                    return this
                },
                toggleFunctionLayer: function (a) {
                    this[a].toggle();
                    return this
                }
            });
            H.Map.include({
                setCenter: function (a) {
                    this._resetView(a, this._zoom);
                    return this
                },
                setMapLayer: function (a, b) {
                    this._removeCurrentLayer();
                    var d = this._currentBasemapLayer = this._returnMapLayer(a, b);
                    this._basemapLayer = a;
                    void 0 !== d && this.addLayer(d);
                    return this
                },
                setBasemap: function (a) {
                    this._removeCurrentLayer();
                    var b = this._currentBasemapLayer = this._returnBasemapLayer(a);
                    this._basemapLayer = a;
                    void 0 !== b && this.addLayer(b);
                    this.layers.expressway.hide();
                    0 == a && this.layers.expressway.show();
                    return this
                },
                setMapType: function (a) {
                    this._removeCurrentLayer();
                    var b = this._currentBasemapLayer = this._returnMapTypeLayer(a);
                    this._basemapType = a;
                    void 0 !== b && this.addLayer(b);
                    return this
                },
                setLanguage: function (a) {
                    var b = this.getLanguage(),
                        d = a.toUpperCase();
                    b != d && (this.closePopup(), this._mapLanguage = a.toUpperCase(), this._removeCurrentLayer(), this.setBasemap(this.getBasemap()), this._changeControlLanguage(b, d), this._changeTextLanguage(this._mapLanguage));
                    return this
                },
                setMaxZoom: function (a) {
                    void 0 !== a && (this.options.maxZoom = a);
                    return this
                },
                setMinZoom: function (a) {
                    if (void 0 !==
                        a) {
                        var b = a > this.getZoom() ? a : this.getZoom();
                        this.setZoom(b);
                        this.options.minZoom = a
                    }
                    return this
                },
                setZoomRange: function (a, b) {
                    this.setMinZoom(a);
                    this.setMaxZoom(b);
                    return this
                },
                getMapLayer: function () {
                    return {
                        basemap: this._basemapLayer,
                        maptype: this._basemapType
                    }
                },
                getBasemap: function () {
                    return this._basemapLayer
                },
                getMapType: function () {
                    return this._basemapType
                },
                getLanguage: function () {
                    return this._mapLanguage.toUpperCase()
                },
                getCurrentFloor: function () {
                    if (void 0 !== this._current.building.name) return {
                        buildingName: this._current.building.name,
                        floorName: this._current.building.floorname
                    };
                    console.warn("Building or floor has undefined.")
                },
                getZoomRange: function () {
                    return {
                        minZoom: this.getMinZoom(),
                        maxZoom: this.getMaxZoom()
                    }
                },
                getBasemapList: function () {
                    for (var a = this._basemapList, b = [], d = 0; d < a.length; d++) b.push(a[d].title);
                    return b
                },
                getMapTypeList: function (a) {
                    this.getBasemapList();
                    if (void 0 !== a) {
                        var b = [];
                        a = this._basemapList[a].maps;
                        for (var d in a) b.push(d);
                        return b
                    }
                },
                flyto: function (a, b) {
                    b = void 0 === b ? this.getZoom() : b;
                    this.setView(a, this._limitZoom(b));
                    return this
                },
                changeFloor: function (a) {
                    var b = this.control.floorPlan._floor.children;
                    if (void 0 !== b[0])
                        for (var d = 0; d < b.length; d++) b[d].innerHTML == a && this.control.floorPlan.changeFloor(b[d])
                },
                removeLayerById: function (a) {
                    var b = this._layers;
                    if (a.constructor === Array)
                        for (var d = 0; d < a.length; d++) void 0 !== a[d] && this.hasLayer(b[a[d]]) && this.removeLayer(b[a[d]]);
                    else void 0 !== a && this.hasLayer(b[a]) && this.removeLayer(b[a]);
                    return this
                },
                _removeCurrentLayer: function () {
                    void 0 !== this._currentBasemapLayer && this.hasLayer(this._currentBasemapLayer) &&
                        this.removeLayer(this._currentBasemapLayer);
                    return this
                },
                _returnMapLayer: function (a, b) {
                    var d = this.getMapTypeList(a),
                        e;
                    for (e in d)
                        if (d[e] == b) {
                            d = [];
                            e = this.getLanguage();
                            var c = this._basemapList[a].maps[b],
                                        g;
                            for (g in c) d.push(g);
                            0 > d.indexOf(e) && (e = d[0]);
                            return this._returnLayer({
                                indexMap: a,
                                mapType: b,
                                language: e
                            })
                        }
                },
                _returnBasemapLayer: function (a) {
                    if (void 0 !== this.getBasemapList()[a]) {
                        var b = [],
                                d = this.getLanguage(),
                                e = this._basemapList[a].maps,
                                c = this._getFirstObject(e),
                                g;
                        for (g in e[c]) b.push(g);
                        0 > b.indexOf(d) &&
                                (d = b[0]);
                        return this._returnLayer({
                            indexMap: a,
                            mapType: this._getFirstObject(e),
                            language: d
                        })
                    }
                },
                _returnMapTypeLayer: function (a) {
                    var b = this.getBasemap(),
                        d = this.getMapTypeList(b),
                        e;
                    for (e in d)
                        if (d[e] == a) {
                            d = [];
                            e = this._mapLanguage.toUpperCase();
                            var c = this._basemapList[b].maps[a],
                                        g;
                            for (g in c) d.push(g);
                            0 > d.indexOf(e) && (e = d[0]);
                            return this._returnLayer({
                                indexMap: b,
                                mapType: a,
                                language: e
                            })
                        }
                },
                _returnLayer: function (a) {
                    if (L.Util.isArray(a)) return this._checkLayer(a);
                    if ("object" === typeof a) return this._checkLayer(this._basemapList[a.indexMap].maps[a.mapType][a.language],
                        a)
                },
                _checkLayer: function (a, b) {
                    for (var d = 0; d < this._basemapList.length; d++) void 0 !== this._basemapList[d].bingKey && (indexBing = d);
                    for (var e = this._basemapList[indexBing], c = [], g = new L.LayerGroup, d = 0; d < a.length; d++) {
                        var h = a[d].requestType,
                                j = a[d].URL,
                                k = a[d].options;
                        if (void 0 !== b) {
                            var l = this._basemapList[b.indexMap].title,
                                        m = b.mapType.charAt(0).toUpperCase() + b.mapType.slice(1);
                            k.attribution = l + ", " + m
                        }
                        if ("tileXYZ" == h) c[d] = new L.TileLayer(j, k), g.addLayer(c[d]);
                        else if ("WMS" == h) void 0 != k.srs && (h = k.srs.replace(":",
                                ""), k.crs = L.CRS[h]), c[d] = new L.tileLayer.wms(j, k), g.addLayer(c[d]);
                        else if ("tileBing" == h) c[d] = new L.BingLayer(e.bingKey, k), g.addLayer(c[d]);
                        else return
                    }
                    return g
                },
                _getFirstObject: function (a) {
                    for (var b in a) return b
                },
                _changeControlLanguage: function () {
                    if (this.control.search) {
                        var a = this.control.search.markers,
                                b = this.control.search.circle;
                        this.removeControl(this.control.search);
                        a && this.removeLayer(a);
                        b && this.removeLayer(b);
                        this.addControl(this.control.search);
                        this.onSearch && (a = b._latlng, b = b._mRadius, L.DomUtil.addClass(this.control.search._container,
                                "show"), L.DomUtil.addClass(this.control.search._container, "in"), L.DomUtil.addClass(this.control.search._notification, "show"), this.nearBy.search(a, b / 1E3, ""))
                    }
                },
                _changeTextLanguage: function (a) {
                    for (var b = document.querySelectorAll("[data-language]"), d = 0; d < b.length; d++) b[d].textContent = H.language[a][b[d].getAttribute("data-language")]
                }
            });
            H.map = function (a, b) {
                return new H.Map(a, b)
            };
            H.Language = L.Class.extend({
                checkLanguage: function (a, b) {
                    return H.language[a.toUpperCase()][b]
                }
            });
            H.Map.addInitHook(function () {
                this.hLanguage = new H.Language
            });
            H.NearBy = L.Class.extend({
                options: {
                    sessionID: "whh4ie55qosg3pe4cuuqwb45",
                    circleStyle: {
                        color: "#136aec",
                        fillColor: "#136aec",
                        fillOpacity: 0.1,
                        weight: 1,
                        opacity: 0.5
                    },
                    maxPOI: 1E3,
                    cluster: {
                        disableClusteringAtZoom: 20
                    }
                },
                initialize: function (a) {
                    this._active = !1;
                    this._map = a;
                    this._layer = new L.LayerGroup;
                    this._layer.addTo(a);
                    this._marker = {}
                },
                search: function (a, b, d) {
                    var e = this._map._serviceData.proxy.URL;
                    d = JSON.stringify({
                        sessionid: this.options.sessionID,
                        category: d,
                        lat: a.lat.toFixed(7),
                        lon: a.lng.toFixed(7),
                        distance: b,
                        keyword: "",
                        provinceid: 0,
                        districtid: 0,
                        subdistrictid: 0,
                        topnumber: this.options.maxPOI,
                        langId: this._checkLanguage(this._map.getLanguage()),
                        jsonp: 1
                    });
                    b *= 1E3;
                    this._map.closePopup(this.popup);
                    this._layer.clearLayers();
                    this.markers && this._map.removeLayer(this.markers);
                    this.markers = new L.MarkerClusterGroup(this.options.cluster);
                    this.circle = L.circle(a, b, this.options.circleStyle).addTo(this._layer);
                    this._map.fitBounds(this.circle.getBounds());
                    this._map.control.search.clearItem();
                    $.ajax({
                        type: "GET",
                        url: e + "hobbit_callback.php",
                        context: this,
                        data: {
                            type: "poidemo",
                            url: this._map._serviceData.mall.searchPOI,
                            json: d
                        },
                        jsonpCallback: "jsonCallback_poidemo",
                        contentType: "application/json",
                        dataType: "jsonp",
                        success: function (a) {
                            this._map.control.search._loading(!1);
                            L.DomUtil.removeClass(this._map.control.search._notification, "show");
                            var d = this._map.control.search._createCategory(a.IMAGEPATH, this._map.getLanguage());
                            this._map.control.search.clearCategory();
                            this._map.control.search._categoryListBox.appendChild(d);
                            for (var b in a.DATA) this._map.control.search.addItem({
                                data: a.DATA[b],
                                imagepath: a.IMAGEPATH
                            }), this._addMarker(a.DATA[b])
                        }
                    });
                    this._map.control.search.markers = this.markers;
                    this._map.control.search.circle = this.circle
                },
                _addMarker: function (a) {
                    var b = a.Name,
                        d = this._marker[a.ID] = new L.Marker([a.Latitude, a.Longitude]);
                    d.ID = a.ID;
                    d.POIType = a.POIType;
                    a = {
                        marker: d,
                        _self: this
                    };
                    d.bindLabel(b);
                    d.on("click", this._onMarkerClick, a);
                    this.markers.addLayer(d);
                    this._map.addLayer(this.markers)
                },
                _removeMarker: function () {
                    this.markers && this._map.removeLayer(this.markers)
                },
                _checkLanguage: function (a) {
                    if ("TH" ==
                        a) return "041E";
                    if ("EN" == a) return "0409"
                },
                _onMarkerClick: function () {
                    this._self.showPOIDetails(this.marker.ID)
                },
                showPOIDetails: function (a) {
                    var b;
                    a = this._marker[a].ID;
                    b = this._marker[a].POIType;
                    this._popup = H.popup.POIDetails({
                        minWidth: 355,
                        maxHeight: 340
                    }).setLatLng(this._marker[a]._latlng).getPOIDetails(a, b).openOn(this._map);
                    return this
                }
            });
            H.Map.addInitHook(function () {
                this.nearBy = new H.NearBy(this)
            });
            H.nearby = function (a) {
                return new H.NearBy(a)
            };
            L.Popup.include({
                options: {
                    minWidth: 50,
                    maxWidth: 300,
                    autoPan: !0,
                    closeButton: !0,
                    offset: [0, 13],
                    autoPanPadding: [5, 5],
                    keepInView: !1,
                    className: "",
                    zoomAnimation: !0
                },
                _initLayout: function () {
                    var a = this._container = L.DomUtil.create("div", "leaflet-popup " + this.options.className + " leaflet-zoom-" + (this._animated ? "animated" : "hide")),
                        b;
                    this.options.closeButton && (b = this._closeButton = L.DomUtil.create("a", "leaflet-popup-close-button", a), b.href = "#close", b.innerHTML = "&#215;", L.DomEvent.disableClickPropagation(b), L.DomEvent.on(b,
                        "click", this._onCloseButtonClick, this));
                    b = this._wrapper = L.DomUtil.create("div", "leaflet-popup-content-wrapper", a);
                    L.DomEvent.disableClickPropagation(b);
                    this._contentNode = L.DomUtil.create("div", "leaflet-popup-content", b);
                    L.DomEvent.disableScrollPropagation(this._contentNode);
                    L.DomEvent.on(b, "contextmenu", L.DomEvent.stopPropagation);
                    this._tipContainer = L.DomUtil.create("div", "leaflet-popup-tip-container", a);
                    this._tip = L.DomUtil.create("div", "leaflet-popup-tip", this._tipContainer);
                    this.options.backgroundColor ?
                        (L.DomUtil.addClass(this._closeButton, this.options.backgroundColor), L.DomUtil.addClass(this._wrapper, this.options.backgroundColor), L.DomUtil.addClass(this._contentNode, this.options.backgroundColor), L.DomUtil.addClass(this._tip, this.options.backgroundColor)) : (L.DomUtil.addClass(this._closeButton, "black"), L.DomUtil.addClass(this._wrapper, "black"), L.DomUtil.addClass(this._contentNode, "black"), L.DomUtil.addClass(this._tip, "black"))
                }
            });
            H.Popup = L.Popup.extend({
                options: {
                    minWidth: 300,
                    maxWidth: 300,
                    autoPan: !0,
                    closeButton: !0,
                    transparentButton: !0,
                    offset: [262, 0],
                    autoPanPadding: [5, 5],
                    keepInView: !1,
                    className: "",
                    zoomAnimation: !0
                },
                _transparent: function () {
                    this._ontransparent ? (L.DomUtil.removeClass(this._container, "transparent"), this._ontransparent = !1) : (L.DomUtil.addClass(this._container, "transparent"), this._ontransparent = !0)
                },
                _initLayout: function () {
                    var a = this._container = L.DomUtil.create("div", "hb-popup " + this.options.className + " hb-zoom-" + (this._animated ?
                        "animated" : "hide") + (!L.DomUtil.TRANSFORM ? " ie8" : "")),
                        b, d = L.DomEvent.stopPropagation;
                    this.options.closeButton && (b = this._closeButton = L.DomUtil.create("a", "hb-popup-close-button", a), L.DomEvent.on(b, "mousedown", d).on(b, "dblclick", d).on(b, "click", this._onCloseButtonClick, this));
                    this.options.transparentButton && (this._ontransparent = !1, b = this._transparentButton = L.DomUtil.create("a", "hb-popup-transparent-button", a), L.DomEvent.on(b, "mousedown", d).on(b, "dblclick", d).on(b, "click", this._onTransparentButtonClick,
                        this));
                    a = this._wrapper = L.DomUtil.create("div", "hb-popup-content-wrapper", a);
                    L.DomEvent.disableClickPropagation(a);
                    this._contentNode = L.DomUtil.create("div", "hb-popup-content", a);
                    L.DomEvent.disableScrollPropagation(this._contentNode);
                    L.DomEvent.on(a, "contextmenu", L.DomEvent.stopPropagation)
                },
                _updateLayout: function () {
                    var a = this._contentNode,
                        b = a.style;
                    b.width = "";
                    b.whiteSpace = "nowrap";
                    var d = a.offsetWidth,
                        d = Math.min(d, this.options.maxWidth),
                        d = Math.max(d, this.options.minWidth);
                    b.width = d + 1 + "px";
                    b.whiteSpace =
                        "";
                    b.height = "";
                    var d = a.offsetHeight,
                        e = this.options.maxHeight;
                    e && d > e ? (b.height = e + "px", L.DomUtil.addClass(a, "hb-popup-scrolled")) : L.DomUtil.removeClass(a, "hb-popup-scrolled");
                    this._containerWidth = this._container.offsetWidth
                },
                _onTransparentButtonClick: function (a) {
                    this._transparent();
                    L.DomEvent.stop(a)
                }
            });
            H.popup = function (a) {
                return new H.Popup(a)
            };
            H.Popup.ThreeDimension = H.Popup.extend({
                options: {
                    offset: [340, 0],
                    minWidth: 453,
                    maxWidth: 453
                },
                initialize: function () {
                    this._3Durl = H.Config.data.ecart3D.URL
                },
                setName: function (a) {
                    this.nameB = a;
                    return this
                },
                setID: function (a) {
                    a = this._3Durl + a;
                    var b = document.createElement("div"),
                        d = document.createElement("span"),
                        e = document.createElement("iframe");
                    b.className = "hb-3d-popup";
                    d.className = "hb-3d-name";
                    e.src = a;
                    e.className = "hb-3d-iframe";
                    void 0 !== this.nameB && (d.innerHTML = this.nameB, b.appendChild(d));
                    b.appendChild(e);
                    this.setContent(b);
                    return this
                }
            });
            H.popup.threeDimension = function (a, b) {
                return new H.Popup.ThreeDimension(a, b)
            };
            H.Popup.POIDetails = H.Popup.extend({
                options: {
                    minWidth: 300,
                    maxWidth: 300,
                    offset: [291, -18]
                },
                initialize: function (a) {
                    void 0 !== a && (void 0 !== a.minWidth && (this.options.minWidth = a.minWidth), void 0 !== a.maxWidth && (this.options.maxWidth = a.maxWidth), void 0 !== a.maxHeight && (this.options.maxHeight = a.maxHeight), void 0 !== a.offset && (this.options.offset = a.offset));
                    this.host = H.Config.data.proxy.URL;
                    this.zoclosehost = H.Config.data.mall.hostGetInfoBalloon
                },
                getPOIDetails: function (a, b) {
                    this.setContent("Loading...");
                    $.ajax({
                        type: "GET",
                        url: this.host + "hobbit_callback.php",
                        context: this,
                        data: {
                            pass: 1,
                            url: this.zoclosehost + "/info/" + a + "/" + b + "/TH"
                        },
                        jsonpCallback: "jsonCallback_inBalloon_1",
                        contentType: "application/json",
                        dataType: "jsonp",
                        success: function (a) {
                            this.setContent(a.Data);
                            this._contentNode.style.color = "black"
                        }
                    });
                    return this
                }
            });
            H.popup.POIDetails = function (a, b) {
                return new H.Popup.POIDetails(a, b)
            };
            L.Marker.include({
                _popupAnchor: [1, -20],
                hbPopup: function (a, b) {
                    var d = L.point(this._popupAnchor || [0, 0]),
                        d = d.add(H.Popup.prototype.options.offset);
                    b && b.offset && (d = d.add(b.offset));
                    b = L.extend({
                        offset: d
                    }, b);
                    this._popupHandlersAdded || (this.on("click", this.togglePopup, this).on("remove", this.closePopup, this).on("move", this._movePopup, this), this._popupHandlersAdded = !0);
                    a instanceof H.Popup ? (L.setOptions(a, b), this._popup = a) : this._popup = (new H.Popup(b, this)).setContent(a);
                    return this
                },
                whitePopup: function (a, b) {
                    return this.bindPopup(a,
                        b)
                }
            });
            L.Path.include({
                hbPopup: function (a, b) {
                    if (a instanceof H.Popup) this._popup = a;
                    else {
                        if (!this._popup || b) this._popup = new H.Popup(b, this);
                        this._popup.setContent(a)
                    }
                    this._popupHandlersAdded || (this.on("click", this._openPopup, this).on("remove", this.closePopup, this), this._popupHandlersAdded = !0);
                    return this
                },
                whitePopup: function (a, b) {
                    return this.bindPopup(a, b)
                }
            });
            H.Popup.Context = H.Popup.extend({
                options: {
                    numDigits: 4
                },
                initialize: function () {
                    this.numDigits = this.options.numDigits;
                    this.startMarker = new L.Marker([]);
                    this.id = {
                        all: "",
                        poi: 1,
                        house: 2,
                        river: 3,
                        road: 4,
                        address: 5,
                        areapolice: 6,
                        sealevel: 7,
                        aoi: 8,
                        poiinmall: 9
                    };
                    this._lang = new H.Language
                },
                getData: function (a, b, d) {
                    this._map = b;
                    this._mapLanguage = this._map._mapLanguage;
                    this.serviceInfo = this._map._serviceData.info.URL;
                    this.idEnable = this._map._serviceData.info.enable;
                    this.navigate = new H.Navigation(this._map);
                    this._latLngOfRightclick =
                        a.latlng;
                    this.property = {
                        bbox: this._map.getBounds().toBBoxString(),
                        width: this._map.getSize().x,
                        height: this._map.getSize().y,
                        x: this._map.layerPointToContainerPoint(a.layerPoint).x,
                        y: this._map.layerPointToContainerPoint(a.layerPoint).y,
                        lang: this._mapLanguage
                    };
                    this._locationTxt = this._createLocationContainer(d);
                    this._routeTxt = this._createRouteContainer(d);
                    this._nearBy = this._createNearByContainer(d);
                    this.getInfo()
                },
                getInfo: function () {
                    var a = this.property,
                        b = L.DomUtil.create("span", "hb-location-info-status",
                                this._locationTxt),
                        d = L.DomUtil.create("span", "hb-location-poimall", this._locationTxt),
                        e = L.DomUtil.create("span", "hb-location-poi", this._locationTxt),
                        c = L.DomUtil.create("span", "hb-location-aoi", this._locationTxt),
                        g = L.DomUtil.create("span", "hb-location-house", this._locationTxt),
                        h = L.DomUtil.create("span", "hb-location-river", this._locationTxt),
                        j = L.DomUtil.create("span", "hb-location-road", this._locationTxt),
                        k = L.DomUtil.create("span", "hb-location-address", this._locationTxt),
                        l = L.DomUtil.create("span", "hb-location-policestation",
                                this._locationTxt),
                        m = L.DomUtil.create("span", "hb-location-sealevel", this._locationTxt);
                    b.innerHTML = H.language[this._mapLanguage].loading;
                    var n = this.idEnable,
                        p = "",
                        r = 0,
                        q;
                    for (q in n) {
                        r++;
                        var s = n[q] && r;
                        !1 != s && (p += s + ",")
                    }
                    p = p.replace(/,+$/, "");
                    $.ajax({
                        type: "GET",
                        url: this.serviceInfo,
                        data: {
                            id: p,
                            jsoncallback: !0,
                            bbox: a.bbox,
                            width: a.width,
                            height: a.height,
                            x: a.x,
                            y: a.y,
                            lang: a.lang.toUpperCase(),
                            floor: 1
                        },
                        jsonpCallback: "jsonCallbackInfo" + p.split(",").join(""),
                        contentType: "application/json",
                        dataType: "jsonp",
                        timeout: 5E3,
                        success: function (a) {
                            function n(a, d, c) {
                                "" != a && void 0 !== a ? d.innerHTML = (c + " " + a).replace(/(^[\s]+|[\s]+$)/g, "") : d.parentNode.removeChild(d)
                            }
                            var p = a.info,
                                        q = a = "",
                                        r = "",
                                        s = q = "",
                                        t = "",
                                        q = "",
                                        q = p.poi,
                                        r = p.house,
                                        s = p.river,
                                        x = p.road,
                                        t = p.address,
                                        B = p.areaPolice,
                                        y = p.seaLevel,
                                        v = p.aoi,
                                        p = p.poi_inBuilding;
                            b.parentNode.removeChild(b);
                            n(v, c, "");
                            n(q, e, "");
                            n(s, h, "");
                            n(x, j, "");
                            n(B, l, "\u0e17\u0e49\u0e2d\u0e07\u0e17\u0e35\u0e48");
                            n(y, m, "");
                            "" != p && void 0 !== p ? (q = p.poiName, d.innerHTML = q) : d.parentNode.removeChild(d);
                            "" != r && void 0 !==
                                        r ? (q = r.name, a = r.number, g.innerHTML = q) : g.parentNode.removeChild(g);
                            "" != t && void 0 !== t ? (r = t.subDistrict, q = t.district, s = t.province, t = t.postalCode, k.innerHTML = (a + " " + r + " " + q + " " + s + " " + t).replace(/(^[\s]+|[\s]+$)/g, "")) : k.parentNode.removeChild(k)
                        },
                        error: function () {
                            for (var a = [d, e, c, g, j, h, k, l, m], n = 0; n < a.length; n++) a[n].parentNode.removeChild(a[n]);
                            b.innerHTML = "Please try again."
                        }
                    })
                },
                searchNearBy: function (a) {
                    this._map.nearBy.search(this._latlng, a, "")
                },
                _spacer: function () {
                    var a = document.createTextNode(" ");
                    this._locationTxt.appendChild(a)
                },
                _createLocationContainer: function (a) {
                    return L.DomUtil.create("div", "hb-location-info", a)
                },
                _createRouteContainer: function (a) {
                    a = L.DomUtil.create("div", "hb-route-info", a);
                    var b = L.DomUtil.create("a", "btn-start-route", a),
                        d = L.DomUtil.create("span", "text-start-route", a),
                        e = L.DomUtil.create("a", "btn-finished-route", a),
                        c = L.DomUtil.create("span", "text-finished-route", a),
                        g = this._map._currentLatLng.routing.start,
                        h = this._map._currentLatLng.routing.finished;
                    d.setAttribute("data-type",
                        "start");
                    c.setAttribute("data-type", "finished");
                    b.href = "#";
                    e.href = "#";
                    b.innerHTML = H.language[this._mapLanguage].startroute;
                    e.innerHTML = H.language[this._mapLanguage].finishedroute;
                    d.innerHTML = void 0 !== g ? g.lat.toFixed(this.numDigits) + ", " + g.lng.toFixed(this.numDigits) : "-";
                    c.innerHTML = void 0 !== h ? h.lat.toFixed(this.numDigits) + ", " + h.lng.toFixed(this.numDigits) : "-";
                    d = L.DomEvent.stop;
                    L.DomEvent.on(b, "click", d).on(b, "mousedown", d).on(b, "dblclick", d).on(b, "click", this._onRouting, this);
                    L.DomEvent.on(e, "click",
                        d).on(e, "mousedown", d).on(e, "dblclick", d).on(e, "click", this._onRouting, this);
                    return a
                },
                _createNearByContainer: function (a) {
                    var b = this;
                    a = L.DomUtil.create("div", "hb-nearby", a);
                    var d = L.DomUtil.create("span", null, a),
                        e = L.DomUtil.create("div", "right-side", a);
                    d.innerHTML = H.language[this._mapLanguage].placenearby;
                    var c = this._valueRange = document.createElement("span"),
                        g = document.createElement("span"),
                        d = document.createElement("a");
                    c.className = "hb-nearby-radius";
                    d.className = "hb-nearby-btn-search hb-icon search";
                    c.innerHTML = 0.1;
                    g.innerHTML = " km.";
                    d.href = "#";
                    if (L.Browser.ie) {
                        var h = document.createElement("div");
                        h.className = "hobbit-slider";
                        h.id = "hobbit-range-slider";
                        $(h).slider({
                            value: 1,
                            min: 1,
                            max: 100,
                            slide: function (a, d) {
                                b._valueRange.innerHTML = (d.value / 10).toFixed(1)
                            }
                        })
                    } else h = document.createElement("input"), h.className = "input-nearby", h.type = "range", h.min = 1, h.max = 100, h.value = 1, h.oninput = function () {
                        b._valueRange.innerHTML = (this.value / 10).toFixed(1)
                    };
                    e.appendChild(h);
                    e.appendChild(c);
                    e.appendChild(g);
                    e.appendChild(d);
                    e = L.DomEvent.stop;
                    L.DomEvent.on(d, "click", e).on(d, "mousedown", e).on(d, "dblclick", e).on(d, "click", this._onSearch, this);
                    return a
                },
                _onSearch: function () {
                    var a = this._valueRange.innerHTML;
                    this._map.onSearch = !0;
                    L.DomUtil.addClass(this._map.control.search._container, "show");
                    L.DomUtil.addClass(this._map.control.search._container, "in");
                    L.DomUtil.addClass(this._map.control.search._notification, "show");
                    this.searchNearBy(a)
                },
                _onRouting: function (a) {
                    a = a.currentTarget.nextElementSibling;
                    var b = this._latLngOfRightclick.lat,
                        d = this._latLngOfRightclick.lng,
                        e = a.getAttribute("data-type");
                    if ("start" == e) {
                        var e = this._map._currentLatLng.routing.start,
                                c = this._map._currentLayersId.routing,
                                g = document.createElement("div");
                        txt = document.createElement("span");
                        btn = document.createElement("input");
                        g.className = "hb-popup-routing";
                        txt.innerHTML = "Start Point";
                        btn.type = "button";
                        btn.value = "Cancel";
                        g.appendChild(txt);
                        g.appendChild(btn);
                        e = L.DomEvent.stop;
                        L.DomEvent.on(btn, "click", e).on(btn, "mousedown", e).on(btn, "dblclick", e).on(btn, "click", function () {
                            var a =
                                        this._currentLayersId.routing;
                            this.removeLayerById([a.start, a.finished, a.line, a.stroke]);
                            this._currentLatLng.routing.start = void 0;
                            this._currentLatLng.routing.finished = void 0;
                            this.closePopup()
                        }, this._map);
                        this._map.removeLayerById([c.start, c.finished, c.line, c.stroke]);
                        this.startMarker.setLatLng(this._latLngOfRightclick);
                        this.startMarker.bindLabel("Start");
                        this.startMarker.on("click", function (a) {
                            this._popup = H.popup({
                                offset: [235, -20],
                                minWidth: 220,
                                maxWidth: 320
                            }).setLatLng(a.target._latlng).setContent(g).openOn(this._map);
                            this._popup._contentNode.style.minHeight = "48px";
                            this._popup._contentNode.parentNode.style.minHeight = "50px"
                        });
                        this._map.addLayer(this.startMarker);
                        this._map._currentLayersId.routing.start = this.startMarker._leaflet_id;
                        this._map._currentLatLng.routing.start = this._latLngOfRightclick;
                        a.textContent = b.toFixed(this.numDigits) + ", " + d.toFixed(this.numDigits)
                    } else if ("finished" == e) {
                        var e = this._map._currentLatLng.routing.start,
                                h = this._latLngOfRightclick,
                                c = this._map._currentLayersId.routing;
                        this._map.removeLayerById([c.finished,
                c.line, c.stroke
            ]);
                        this._map._currentLatLng.routing.finished = this._latLngOfRightclick;
                        a.textContent = b.toFixed(this.numDigits) + ", " + d.toFixed(this.numDigits);
                        this.navigate._getRoutingInfo(e, h, function (a, d) {
                            if (0 == a.status) {
                                var b = new DistanceConverter,
                                                e = new TimeConverter,
                                                b = b.convertUnitMetre(a.route_summary.total_distance),
                                                g = e.secondToTime(a.route_summary.total_time),
                                                e = "0" == g.hour ? "" : g.hour + " hr.",
                                                p = "0" == g.minute ? "" : g.minute + " min.",
                                                r = "0" == g.second ? "" : g.second + " sec.",
                                                q = document.createElement("div"),
                                                s = document.createElement("span"),
                                                u = document.createElement("span"),
                                                g = document.createElement("input");
                                q.className = "hb-popup-routing";
                                s.innerHTML = "Total distance : " + b;
                                u.innerHTML = "Total time : " + e + " " + p + " " + r;
                                g.type = "button";
                                g.value = "Cancel";
                                q.appendChild(s);
                                q.appendChild(u);
                                q.appendChild(g);
                                b = L.DomEvent.stop;
                                L.DomEvent.on(g, "click", b).on(g, "mousedown", b).on(g, "dblclick", b).on(g, "click", function () {
                                    var a = this._currentLayersId.routing;
                                    this.removeLayerById([a.start, a.finished, a.line, a.stroke]);
                                    this._currentLatLng.routing.start =
                                                        void 0;
                                    this._currentLatLng.routing.finished = void 0;
                                    this.closePopup()
                                }, d);
                                this.finishedMarker = new L.Marker(h);
                                this.finishedMarker.bindLabel("Finished");
                                this.finishedMarker.on("click", function (a) {
                                    this._popup = H.popup({
                                        offset: [235, -20],
                                        minWidth: 220,
                                        maxWidth: 320
                                    }).setLatLng(a.target._latlng).setContent(q).openOn(this._map);
                                    this._popup._contentNode.style.minHeight = "68px";
                                    this._popup._contentNode.parentNode.style.minHeight = "70px"
                                });
                                d.addLayer(this.finishedMarker);
                                this.routingLineStroke = (new L.polyline(a.route_geometry, {
                                    color: "#0033CC",
                                    weight: 9,
                                    opacity: 1,
                                    clickable: !1,
                                    routing: !0
                                })).addTo(d);
                                this.routingLine = (new L.polyline(a.route_geometry, {
                                    color: "#33FFFF",
                                    weight: 5,
                                    opacity: 1,
                                    clickable: !1,
                                    routing: !0
                                })).addTo(d);
                                d._currentLayersId.routing.finished = this.finishedMarker._leaflet_id;
                                d._currentLayersId.routing.line = this.routingLine._leaflet_id;
                                d._currentLayersId.routing.stroke = this.routingLineStroke._leaflet_id
                            } else this._map.removeLayerById([c.start, c.finished, c.line, c.stroke]), console.warn(a.status_message)
                        }, this._map)
                    }
                    this._map.closePopup()
                },
                _debug: function () {
                    L.circleMarker(this._latlng, {
                        color: "#136aec",
                        fillColor: "#136aec",
                        fillOpacity: 0.7,
                        weight: 1,
                        opacity: 0.9,
                        radius: 2
                    }).addTo(this._map)
                }
            });
            H.Map.addInitHook(function () {
                this._currentLatLng = {
                    rightclick: void 0,
                    routing: {
                        start: void 0,
                        finished: void 0
                    }
                };
                this._currentLayersId = {
                    routing: {
                        start: void 0,
                        finished: void 0,
                        line: void 0,
                        stroke: void 0
                    }
                }
            });
            L.BingLayer = L.TileLayer.extend({
                options: {
                    subdomains: [0, 1, 2, 3],
                    type: "Aerial",
                    attribution: "Bing",
                    culture: ""
                },
                initialize: function (a, b) {
                    L.Util.setOptions(this, b);
                    this._key = a;
                    this._url = null;
                    this.meta = {};
                    this.loadMetadata()
                },
                tile2quad: function (a, b, d) {
                    for (var e = ""; 0 < d; d--) {
                        var c = 0,
                                g = 1 << d - 1;
                        0 != (a & g) && (c += 1);
                        0 != (b & g) && (c += 2);
                        e += c
                    }
                    return e
                },
                getTileUrl: function (a, b) {
                    b = this._getZoomForUrl();
                    var d = this.options.subdomains[Math.abs((a.x + a.y) % this.options.subdomains.length)];
                    return this._url.replace("{subdomain}",
                        d).replace("{quadkey}", this.tile2quad(a.x, a.y, b)).replace("{culture}", this.options.culture)
                },
                loadMetadata: function () {
                    var a = this,
                        b = "_bing_metadata_" + L.Util.stamp(this);
                    window[b] = function (d) {
                        a.meta = d;
                        window[b] = void 0;
                        var e = document.getElementById(b);
                        e.parentNode.removeChild(e);
                        d.errorDetails || a.initMetadata()
                    };
                    var d = "http://dev.virtualearth.net/REST/v1/Imagery/Metadata/" + this.options.type + "?include=ImageryProviders&jsonp=" + b + "&key=" + this._key,
                        e = document.createElement("script");
                    e.type = "text/javascript";
                    e.src = d;
                    e.id = b;
                    document.getElementsByTagName("head")[0].appendChild(e)
                },
                initMetadata: function () {
                    var a = this.meta.resourceSets[0].resources[0];
                    this.options.subdomains = a.imageUrlSubdomains;
                    this._url = a.imageUrl;
                    this._providers = [];
                    for (var b = 0; b < a.imageryProviders.length; b++)
                        for (var d = a.imageryProviders[b], e = 0; e < d.coverageAreas.length; e++) {
                            var c = d.coverageAreas[e],
                                        g = {
                                            zoomMin: c.zoomMin,
                                            zoomMax: c.zoomMax,
                                            active: !1
                                        }, c = new L.LatLngBounds(new L.LatLng(c.bbox[0] + 0.01, c.bbox[1] + 0.01), new L.LatLng(c.bbox[2] - 0.01,
                                                c.bbox[3] - 0.01));
                            g.bounds = c;
                            g.attrib = d.attribution;
                            this._providers.push(g)
                        }
                    this._update()
                },
                _update: function () {
                    null != this._url && this._map && (this._update_attribution(), L.TileLayer.prototype._update.apply(this, []))
                },
                _update_attribution: function () {
                    for (var a = this._map.getBounds(), b = this._map.getZoom(), d = 0; d < this._providers.length; d++) {
                        var e = this._providers[d];
                        b <= e.zoomMax && b >= e.zoomMin && a.intersects(e.bounds) ? e.active || (e.active = !0) : e.active && (e.active = !1)
                    }
                },
                onRemove: function (a) {
                    for (var b = 0; b < this._providers.length; b++) {
                        var d =
                                this._providers[b];
                        d.active && (d.active = !1)
                    }
                    L.TileLayer.prototype.onRemove.apply(this, [a])
                }
            });
            L.KML = L.FeatureGroup.extend({
                options: {
                    async: !0
                },
                initialize: function (a, b) {
                    L.Util.setOptions(this, b);
                    this._kml = a;
                    this._layers = {};
                    a && this.addKML(a, b, this.options.async)
                },
                loadXML: function (a, b, d, e) {
                    void 0 == e && (e = this.options.async);
                    void 0 == d && (d = this.options);
                    var c = new window.XMLHttpRequest;
                    c.open("GET", a, e);
                    try {
                        c.overrideMimeType("text/xml")
                    } catch (g) { }
                    c.onreadystatechange = function () {
                        4 == c.readyState && 200 == c.status && b(c.responseXML, d)
                    };
                    c.send(null)
                },
                addKML: function (a, b, d) {
                    var e = this;
                    this.loadXML(a, function (a,
                        d) {
                        e._addKML(a, d)
                    }, b, d)
                },
                _addKML: function (a) {
                    var b = L.KML.parseKML(a);
                    if (b && b.length) {
                        for (var d = 0; d < b.length; d++) this.fire("addlayer", {
                            layer: b[d]
                        }), this.addLayer(b[d]);
                        this.latLngs = L.KML.getLatLngs(a);
                        this.fire("loaded")
                    }
                },
                latLngs: []
            });
            L.Util.extend(L.KML, {
                parseKML: function (a) {
                    var b = this.parseStyle(a);
                    this.parseStyleMap(a, b);
                    for (var d = a.getElementsByTagName("Folder"), e = [], c, g = 0; g < d.length; g++) this._check_folder(d[g]) && (c = this.parseFolder(d[g], b)) && e.push(c);
                    d = a.getElementsByTagName("Placemark");
                    for (g = 0; g < d.length; g++) this._check_folder(d[g]) && (c = this.parsePlacemark(d[g], a, b)) && e.push(c);
                    return e
                },
                _check_folder: function (a, b) {
                    for (a = a.parentElement; a && "Folder" !== a.tagName; ) a = a.parentElement;
                    return !a || a === b
                },
                parseStyle: function (a) {
                    function b(a) {
                        for (var d = {}, c = 0; c < a.childNodes.length; c++) {
                            var g = a.childNodes[c],
                                        h = g.tagName;
                            if (e[h])
                                if ("hotSpot" === h)
                                    for (h = 0; h < g.attributes.length; h++) d[g.attributes[h].name] = g.attributes[h].nodeValue;
                                else {
                                    var j = g.childNodes[0].nodeValue;
                                    "color" === h ? (d.opacity = parseInt(j.substring(0, 2), 16) / 255, d.color = "#" + j.substring(6, 8) + j.substring(4, 6) + j.substring(2, 4)) : "width" === h ? d.weight = j : "Icon" === h ? (l = b(g), l.href && (d.href = l.href)) : "href" === h && (d.href = j)
                                }
                        }
                        return d
                    }
                    var d = {};
                    a = a.getElementsByTagName("Style");
                    for (var e = {
                        color: !0,
                        width: !0,
                        Icon: !0,
                        href: !0,
                        hotSpot: !0
                    }, c = 0; c < a.length; c++) {
                        var g = a[c],
                                h, j = {}, k = {}, l = {};
                        (h = g.getElementsByTagName("LineStyle")) && h[0] && (j = b(h[0]));
                        (h = g.getElementsByTagName("PolyStyle")) && h[0] && (k = b(h[0]));
                        k.color && (j.fillColor = k.color);
                        k.opacity && (j.fillOpacity = k.opacity);
                        (h = g.getElementsByTagName("IconStyle")) && h[0] && (l = b(h[0]));
                        l.href && (j.icon = new L.KMLIcon({
                            iconUrl: l.href,
                            shadowUrl: null,
                            iconAnchorRef: {
                                x: l.x,
                                y: l.y
                            },
                            iconAnchorType: {
                                x: l.xunits,
                                y: l.yunits
                            }
                        }));
                        d["#" + g.getAttribute("id")] = j
                    }
                    return d
                },
                parseStyleMap: function (a,
                b) {
                    for (var d = a.getElementsByTagName("StyleMap"), e = 0; e < d.length; e++) {
                        var c = d[e],
                                g, h, j;
                        if ((g = c.getElementsByTagName("key")) && g[0]) h = g[0].textContent;
                        if ((g = c.getElementsByTagName("styleUrl")) && g[0]) j = g[0].textContent;
                        "normal" == h && (b["#" + c.getAttribute("id")] = b[j])
                    }
                },
                parseFolder: function (a, b) {
                    var d, e = [],
                        c;
                    d = a.getElementsByTagName("Folder");
                    for (var g = 0; g < d.length; g++) this._check_folder(d[g], a) && (c = this.parseFolder(d[g], b)) && e.push(c);
                    d = a.getElementsByTagName("Placemark");
                    for (g = 0; g < d.length; g++) this._check_folder(d[g],
                        a) && (c = this.parsePlacemark(d[g], a, b)) && e.push(c);
                    if (e.length) return 1 === e.length ? e[0] : new L.FeatureGroup(e)
                },
                parsePlacemark: function (a, b, d) {
                    var e, c, g, h = {};
                    g = a.getElementsByTagName("styleUrl");
                    for (e = 0; e < g.length; e++) {
                        var j = g[e].childNodes[0].nodeValue,
                                k;
                        for (k in d[j]) h[k] = d[j][k]
                    }
                    d = [];
                    j = ["LineString", "Polygon", "Point"];
                    for (c in j) {
                        k = j[c];
                        g = a.getElementsByTagName(k);
                        for (e = 0; e < g.length; e++) {
                            var l = this["parse" + k](g[e], b, h);
                            l && d.push(l)
                        }
                    }
                    if (d.length) {
                        b = d[0];
                        1 < d.length && (b = new L.FeatureGroup(d));
                        var m,
                                h = "";
                        g = a.getElementsByTagName("name");
                        g.length && g[0].childNodes.length && (m = g[0].childNodes[0].nodeValue);
                        g = a.getElementsByTagName("description");
                        for (e = 0; e < g.length; e++)
                            for (c = 0; c < g[e].childNodes.length; c++) h += g[e].childNodes[c].nodeValue;
                        m && b.bindPopup("<h2>" + m + "</h2>" + h);
                        return b
                    }
                },
                parseCoords: function (a) {
                    a = a.getElementsByTagName("coordinates");
                    return this._read_coords(a[0])
                },
                parseLineString: function (a, b, d) {
                    a = this.parseCoords(a);
                    if (a.length) return new L.Polyline(a, d)
                },
                parsePoint: function (a, b, d) {
                    a =
                        a.getElementsByTagName("coordinates");
                    if (a.length) return a = a[0].childNodes[0].nodeValue.split(","), new L.KMLMarker(new L.LatLng(a[1], a[0]), d)
                },
                parsePolygon: function (a, b, d) {
                    var e = [],
                        c = [],
                        g, h;
                    b = a.getElementsByTagName("outerBoundaryIs");
                    for (g = 0; g < b.length; g++) (h = this.parseCoords(b[g])) && e.push(h);
                    b = a.getElementsByTagName("innerBoundaryIs");
                    for (g = 0; g < b.length; g++) (h = this.parseCoords(b[g])) && c.push(h);
                    if (e.length) return d.fillColor && (d.fill = !0), 1 === e.length ? new L.Polygon(e.concat(c), d) : new L.MultiPolygon(e,
                        d)
                },
                getLatLngs: function (a) {
                    a = a.getElementsByTagName("coordinates");
                    for (var b = [], d = 0; d < a.length; d++) b = b.concat(this._read_coords(a[d]));
                    return b
                },
                _read_coords: function (a) {
                    var b = "",
                        d = [],
                        e;
                    for (e = 0; e < a.childNodes.length; e++) b += a.childNodes[e].nodeValue;
                    b = b.split(/[\s\n]+/);
                    for (e = 0; e < b.length; e++) a = b[e].split(","), 2 > a.length || d.push(new L.LatLng(a[1], a[0]));
                    return d
                }
            });
            L.KMLIcon = L.Icon.extend({
                createIcon: function () {
                    var a = this._createIcon("icon");
                    a.onload = function () {
                        this.style.width = a.width + "px";
                        this.style.height = a.height + "px";
                        if ("UNITS_FRACTION" === this.anchorType.x || "fraction" === this.anchorType.x) a.style.marginLeft = -this.anchor.x * a.width + "px";
                        if ("UNITS_FRACTION" === this.anchorType.y || "fraction" === this.anchorType.x) a.style.marginTop = -(1 - this.anchor.y) * a.height + "px";
                        this.style.display = ""
                    };
                    return a
                },
                _setIconStyles: function (a, b) {
                    L.Icon.prototype._setIconStyles.apply(this, [a, b]);
                    a.anchor = this.options.iconAnchorRef;
                    a.anchorType = this.options.iconAnchorType
                }
            });
            L.KMLMarker = L.Marker.extend({
                options: {
                    icon: new L.KMLIcon.Default
                }
            });
            (function (a, b) {
                L.MarkerClusterGroup = L.FeatureGroup.extend({
                    options: {
                        maxClusterRadius: 80,
                        iconCreateFunction: null,
                        spiderfyOnMaxZoom: !0,
                        showCoverageOnHover: !0,
                        zoomToBoundsOnClick: !0,
                        singleMarkerMode: !1,
                        disableClusteringAtZoom: null,
                        removeOutsideVisibleBounds: !0,
                        animateAddingMarkers: !1,
                        spiderfyDistanceMultiplier: 1,
                        polygonOptions: {}
                    },
                    initialize: function (a) {
                        L.Util.setOptions(this, a);
                        this.options.iconCreateFunction || (this.options.iconCreateFunction = this._defaultIconCreateFunction);
                        this._featureGroup = L.featureGroup();
                        this._featureGroup.on(L.FeatureGroup.EVENTS, this._propagateEvent, this);
                        this._nonPointGroup = L.featureGroup();
                        this._nonPointGroup.on(L.FeatureGroup.EVENTS, this._propagateEvent, this);
                        this._inZoomAnimation = 0;
                        this._needsClustering = [];
                        this._needsRemoving = [];
                        this._currentShownBounds = null
                    },
                    addLayer: function (a) {
                        if (a instanceof L.LayerGroup) {
                            var b = [],
                                        c;
                            for (c in a._layers) b.push(a._layers[c]);
                            return this.addLayers(b)
                        }
                        if (!a.getLatLng) return this._nonPointGroup.addLayer(a), this;
                        if (!this._map) return this._needsClustering.push(a),
                        this;
                        if (this.hasLayer(a)) return this;
                        this._unspiderfy && this._unspiderfy();
                        this._addLayer(a, this._maxZoom);
                        b = a;
                        c = this._map.getZoom();
                        if (a.__parent)
                            for (; b.__parent._zoom >= c; ) b = b.__parent;
                        this._currentShownBounds.contains(b.getLatLng()) && (this.options.animateAddingMarkers ? this._animationAddLayer(a, b) : this._animationAddLayerNonAnimated(a, b));
                        return this
                    },
                    removeLayer: function (a) {
                        if (a instanceof L.LayerGroup) {
                            var b = [],
                                        c;
                            for (c in a._layers) b.push(a._layers[c]);
                            return this.removeLayers(b)
                        }
                        if (!a.getLatLng) return this._nonPointGroup.removeLayer(a),
                        this;
                        if (!this._map) return !this._arraySplice(this._needsClustering, a) && this.hasLayer(a) && this._needsRemoving.push(a), this;
                        if (!a.__parent) return this;
                        this._unspiderfy && (this._unspiderfy(), this._unspiderfyLayer(a));
                        this._removeLayer(a, !0);
                        this._featureGroup.hasLayer(a) && (this._featureGroup.removeLayer(a), a.setOpacity && a.setOpacity(1));
                        return this
                    },
                    addLayers: function (a) {
                        var b, c, g, h = this._map,
                                j = this._featureGroup,
                                k = this._nonPointGroup;
                        b = 0;
                        for (c = a.length; b < c; b++)
                            if (g = a[b], g.getLatLng) {
                                if (!this.hasLayer(g))
                                    if (h) {
                                        if (this._addLayer(g,
                                                                this._maxZoom), g.__parent && 2 === g.__parent.getChildCount()) {
                                            var l = g.__parent.getAllChildMarkers();
                                            j.removeLayer(l[0] === g ? l[1] : l[0])
                                        }
                                    } else this._needsClustering.push(g)
                            } else k.addLayer(g);
                        h && (j.eachLayer(function (a) {
                            a instanceof L.MarkerCluster && a._iconNeedsUpdate && a._updateIcon()
                        }), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds));
                        return this
                    },
                    removeLayers: function (a) {
                        var b, c, g, h = this._featureGroup,
                                j = this._nonPointGroup;
                        if (!this._map) {
                            b = 0;
                            for (c = a.length; b <
                                        c; b++) g = a[b], this._arraySplice(this._needsClustering, g), j.removeLayer(g);
                            return this
                        }
                        b = 0;
                        for (c = a.length; b < c; b++) g = a[b], g.__parent ? (this._removeLayer(g, !0, !0), h.hasLayer(g) && (h.removeLayer(g), g.setOpacity && g.setOpacity(1))) : j.removeLayer(g);
                        this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);
                        h.eachLayer(function (a) {
                            a instanceof L.MarkerCluster && a._updateIcon()
                        });
                        return this
                    },
                    clearLayers: function () {
                        this._map || (this._needsClustering = [], delete this._gridClusters,
                                delete this._gridUnclustered);
                        this._noanimationUnspiderfy && this._noanimationUnspiderfy();
                        this._featureGroup.clearLayers();
                        this._nonPointGroup.clearLayers();
                        this.eachLayer(function (a) {
                            delete a.__parent
                        });
                        this._map && this._generateInitialClusters();
                        return this
                    },
                    getBounds: function () {
                        var a = new L.LatLngBounds;
                        if (this._topClusterLevel) a.extend(this._topClusterLevel._bounds);
                        else
                            for (var b = this._needsClustering.length - 1; 0 <= b; b--) a.extend(this._needsClustering[b].getLatLng());
                        a.extend(this._nonPointGroup.getBounds());
                        return a
                    },
                    eachLayer: function (a, b) {
                        var c = this._needsClustering.slice(),
                                g;
                        this._topClusterLevel && this._topClusterLevel.getAllChildMarkers(c);
                        for (g = c.length - 1; 0 <= g; g--) a.call(b, c[g]);
                        this._nonPointGroup.eachLayer(a, b)
                    },
                    getLayers: function () {
                        var a = [];
                        this.eachLayer(function (b) {
                            a.push(b)
                        });
                        return a
                    },
                    hasLayer: function (a) {
                        if (!a) return !1;
                        var b, c = this._needsClustering;
                        for (b = c.length - 1; 0 <= b; b--)
                            if (c[b] === a) return !0;
                        c = this._needsRemoving;
                        for (b = c.length - 1; 0 <= b; b--)
                            if (c[b] === a) return !1;
                        return !!(a.__parent && a.__parent._group ===
                                this) || this._nonPointGroup.hasLayer(a)
                    },
                    zoomToShowLayer: function (a, b) {
                        var c = function () {
                            if ((a._icon || a.__parent._icon) && !this._inZoomAnimation)
                                if (this._map.off("moveend", c, this), this.off("animationend", c, this), a._icon) b();
                                else if (a.__parent._icon) {
                                    var g = function () {
                                        this.off("spiderfied", g, this);
                                        b()
                                    };
                                    this.on("spiderfied", g, this);
                                    a.__parent.spiderfy()
                                }
                        };
                        a._icon ? b() : a.__parent._zoom < this._map.getZoom() ? (this._map.on("moveend", c, this), a._icon || this._map.panTo(a.getLatLng())) : (this._map.on("moveend", c, this),
                                this.on("animationend", c, this), this._map.setView(a.getLatLng(), a.__parent._zoom + 1), a.__parent.zoomToBounds())
                    },
                    onAdd: function (a) {
                        this._map = a;
                        var b, c;
                        if (!isFinite(this._map.getMaxZoom())) throw "Map has no maxZoom specified";
                        this._featureGroup.onAdd(a);
                        this._nonPointGroup.onAdd(a);
                        this._gridClusters || this._generateInitialClusters();
                        a = 0;
                        for (b = this._needsRemoving.length; a < b; a++) c = this._needsRemoving[a], this._removeLayer(c, !0);
                        this._needsRemoving = [];
                        a = 0;
                        for (b = this._needsClustering.length; a < b; a++) c = this._needsClustering[a],
                        c.getLatLng ? c.__parent || this._addLayer(c, this._maxZoom) : this._featureGroup.addLayer(c);
                        this._needsClustering = [];
                        this._map.on("zoomend", this._zoomEnd, this);
                        this._map.on("moveend", this._moveEnd, this);
                        this._spiderfierOnAdd && this._spiderfierOnAdd();
                        this._bindEvents();
                        this._zoom = this._map.getZoom();
                        this._currentShownBounds = this._getExpandedVisibleBounds();
                        this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)
                    },
                    onRemove: function (a) {
                        a.off("zoomend", this._zoomEnd, this);
                        a.off("moveend", this._moveEnd, this);
                        this._unbindEvents();
                        this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", "");
                        this._spiderfierOnRemove && this._spiderfierOnRemove();
                        this._hideCoverage();
                        this._featureGroup.onRemove(a);
                        this._nonPointGroup.onRemove(a);
                        this._featureGroup.clearLayers();
                        this._map = null
                    },
                    getVisibleParent: function (a) {
                        for (; a && !a._icon; ) a = a.__parent;
                        return a || null
                    },
                    _arraySplice: function (a, b) {
                        for (var c = a.length - 1; 0 <= c; c--)
                            if (a[c] === b) return a.splice(c, 1), !0
                        },
                        _removeLayer: function (a, b, c) {
                            var g = this._gridClusters,
                                h = this._gridUnclustered,
                                j = this._featureGroup,
                                k = this._map;
                            if (b)
                                for (var l = this._maxZoom; 0 <= l && h[l].removeObject(a, k.project(a.getLatLng(), l)); l--);
                            var l = a.__parent,
                                m;
                            for (this._arraySplice(l._markers, a); l; ) {
                                l._childCount--;
                                if (0 > l._zoom) break;
                                else b && 1 >= l._childCount ? (m = l._markers[0] === a ? l._markers[1] : l._markers[0], g[l._zoom].removeObject(l, k.project(l._cLatLng, l._zoom)), h[l._zoom].addObject(m, k.project(m.getLatLng(), l._zoom)), this._arraySplice(l.__parent._childClusters,
                                        l), l.__parent._markers.push(m), m.__parent = l.__parent, l._icon && (j.removeLayer(l), c || j.addLayer(m))) : (l._recalculateBounds(), (!c || !l._icon) && l._updateIcon());
                                l = l.__parent
                            }
                            delete a.__parent
                        },
                        _propagateEvent: function (a) {
                            a.layer instanceof L.MarkerCluster && (a.type = "cluster" + a.type);
                            this.fire(a.type, a)
                        },
                        _defaultIconCreateFunction: function (a) {
                            a = a.getChildCount();
                            var b = " marker-cluster-";
                            return new L.DivIcon({
                                html: "<div><span>" + a + "</span></div>",
                                className: "marker-cluster" + (10 > a ? b + "small" : 100 > a ? b + "medium" :
                                        b + "large"),
                                iconSize: new L.Point(40, 40)
                            })
                        },
                        _bindEvents: function () {
                            var a = this._map,
                                b = this.options.showCoverageOnHover,
                                c = this.options.zoomToBoundsOnClick;
                            if (this.options.spiderfyOnMaxZoom || c) this.on("clusterclick", this._zoomOrSpiderfy, this);
                            b && (this.on("clustermouseover", this._showCoverage, this), this.on("clustermouseout", this._hideCoverage, this), a.on("zoomend", this._hideCoverage, this))
                        },
                        _zoomOrSpiderfy: function (a) {
                            var b = this._map;
                            b.getMaxZoom() === b.getZoom() ? this.options.spiderfyOnMaxZoom && a.layer.spiderfy() :
                                this.options.zoomToBoundsOnClick && a.layer.zoomToBounds()
                        },
                        _showCoverage: function (a) {
                            var b = this._map;
                            this._inZoomAnimation || (this._shownPolygon && b.removeLayer(this._shownPolygon), 2 < a.layer.getChildCount() && a.layer !== this._spiderfied && (this._shownPolygon = new L.Polygon(a.layer.getConvexHull(), this.options.polygonOptions), b.addLayer(this._shownPolygon)))
                        },
                        _hideCoverage: function () {
                            this._shownPolygon && (this._map.removeLayer(this._shownPolygon), this._shownPolygon = null)
                        },
                        _unbindEvents: function () {
                            var a = this.options.showCoverageOnHover,
                                b = this.options.zoomToBoundsOnClick,
                                c = this._map;
                            (this.options.spiderfyOnMaxZoom || b) && this.off("clusterclick", this._zoomOrSpiderfy, this);
                            a && (this.off("clustermouseover", this._showCoverage, this), this.off("clustermouseout", this._hideCoverage, this), c.off("zoomend", this._hideCoverage, this))
                        },
                        _zoomEnd: function () {
                            this._map && (this._mergeSplitClusters(), this._zoom = this._map._zoom, this._currentShownBounds = this._getExpandedVisibleBounds())
                        },
                        _moveEnd: function () {
                            if (!this._inZoomAnimation) {
                                var a = this._getExpandedVisibleBounds();
                                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, a);
                                this._topClusterLevel._recursivelyAddChildrenToMap(null, this._map._zoom, a);
                                this._currentShownBounds = a
                            }
                        },
                        _generateInitialClusters: function () {
                            var a = this._map.getMaxZoom(),
                                b = this.options.maxClusterRadius;
                            this.options.disableClusteringAtZoom && (a = this.options.disableClusteringAtZoom - 1);
                            this._maxZoom = a;
                            this._gridClusters = {};
                            for (this._gridUnclustered = {}; 0 <= a; a--) this._gridClusters[a] = new L.DistanceGrid(b), this._gridUnclustered[a] =
                                new L.DistanceGrid(b);
                            this._topClusterLevel = new L.MarkerCluster(this, -1)
                        },
                        _addLayer: function (a, b) {
                            var c = this._gridClusters,
                                g = this._gridUnclustered,
                                h, j;
                            this.options.singleMarkerMode && (a.options.icon = this.options.iconCreateFunction({
                                getChildCount: function () {
                                    return 1
                                },
                                getAllChildMarkers: function () {
                                    return [a]
                                }
                            }));
                            for (; 0 <= b; b--) {
                                h = this._map.project(a.getLatLng(), b);
                                var k = c[b].getNearObject(h);
                                if (k) {
                                    k._addChild(a);
                                    a.__parent = k;
                                    return
                                }
                                if (k = g[b].getNearObject(h)) {
                                    (h = k.__parent) && this._removeLayer(k, !1);
                                    j =
                                                new L.MarkerCluster(this, b, k, a);
                                    c[b].addObject(j, this._map.project(j._cLatLng, b));
                                    k.__parent = j;
                                    var l = a.__parent = j;
                                    for (j = b - 1; j > h._zoom; j--) l = new L.MarkerCluster(this, j, l), c[j].addObject(l, this._map.project(k.getLatLng(), j));
                                    h._addChild(l);
                                    for (j = b; 0 <= j && g[j].removeObject(k, this._map.project(k.getLatLng(), j)); j--);
                                    return
                                }
                                g[b].addObject(a, h)
                            }
                            this._topClusterLevel._addChild(a);
                            a.__parent = this._topClusterLevel
                        },
                        _mergeSplitClusters: function () {
                            this._zoom < this._map._zoom && this._currentShownBounds.contains(this._getExpandedVisibleBounds()) ?
                                (this._animationStart(), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, this._getExpandedVisibleBounds()), this._animationZoomIn(this._zoom, this._map._zoom)) : this._zoom > this._map._zoom ? (this._animationStart(), this._animationZoomOut(this._zoom, this._map._zoom)) : this._moveEnd()
                        },
                        _getExpandedVisibleBounds: function () {
                            if (!this.options.removeOutsideVisibleBounds) return this.getBounds();
                            var a = this._map.getBounds(),
                                b = a._southWest,
                                a = a._northEast,
                                c = L.Browser.mobile ?
                                        0 : Math.abs(b.lat - a.lat),
                                g = L.Browser.mobile ? 0 : Math.abs(b.lng - a.lng);
                            return new L.LatLngBounds(new L.LatLng(b.lat - c, b.lng - g, !0), new L.LatLng(a.lat + c, a.lng + g, !0))
                        },
                        _animationAddLayerNonAnimated: function (a, b) {
                            if (b === a) this._featureGroup.addLayer(a);
                            else if (2 === b._childCount) {
                                b._addToMap();
                                var c = b.getAllChildMarkers();
                                this._featureGroup.removeLayer(c[0]);
                                this._featureGroup.removeLayer(c[1])
                            } else b._updateIcon()
                        }
                    });
                    L.MarkerClusterGroup.include(!L.DomUtil.TRANSITION ? {
                        _animationStart: function () { },
                        _animationZoomIn: function (a,
                        b) {
                            this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, a);
                            this._topClusterLevel._recursivelyAddChildrenToMap(null, b, this._getExpandedVisibleBounds())
                        },
                        _animationZoomOut: function (a, b) {
                            this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, a);
                            this._topClusterLevel._recursivelyAddChildrenToMap(null, b, this._getExpandedVisibleBounds())
                        },
                        _animationAddLayer: function (a, b) {
                            this._animationAddLayerNonAnimated(a, b)
                        }
                    } : {
                        _animationStart: function () {
                            this._map._mapPane.className +=
                                " leaflet-cluster-anim";
                            this._inZoomAnimation++
                        },
                        _animationEnd: function () {
                            this._map && (this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", ""));
                            this._inZoomAnimation--;
                            this.fire("animationend")
                        },
                        _animationZoomIn: function (a, b) {
                            var c = this,
                                g = this._getExpandedVisibleBounds(),
                                h = this._featureGroup,
                                j;
                            this._topClusterLevel._recursively(g, a, 0, function (c) {
                                var l = c._latlng,
                                        m = c._markers;
                                g.contains(l) || (l = null);
                                c._isSingleParent() && a + 1 === b ? (h.removeLayer(c), c._recursivelyAddChildrenToMap(null,
                                        b, g)) : (c.setOpacity(0), c._recursivelyAddChildrenToMap(l, b, g));
                                for (j = m.length - 1; 0 <= j; j--) c = m[j], g.contains(c._latlng) || h.removeLayer(c)
                            });
                            this._forceLayout();
                            c._topClusterLevel._recursivelyBecomeVisible(g, b);
                            h.eachLayer(function (a) {
                                !(a instanceof L.MarkerCluster) && a._icon && a.setOpacity(1)
                            });
                            c._topClusterLevel._recursively(g, a, b, function (a) {
                                a._recursivelyRestoreChildPositions(b)
                            });
                            setTimeout(function () {
                                c._topClusterLevel._recursively(g, a, 0, function (a) {
                                    h.removeLayer(a);
                                    a.setOpacity(1)
                                });
                                c._animationEnd()
                            },
                                200)
                        },
                        _animationZoomOut: function (a, b) {
                            this._animationZoomOutSingle(this._topClusterLevel, a - 1, b);
                            this._topClusterLevel._recursivelyAddChildrenToMap(null, b, this._getExpandedVisibleBounds());
                            this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, a, this._getExpandedVisibleBounds())
                        },
                        _animationZoomOutSingle: function (a, b, c) {
                            var g = this._getExpandedVisibleBounds();
                            a._recursivelyAnimateChildrenInAndAddSelfToMap(g, b + 1, c);
                            var h = this;
                            this._forceLayout();
                            a._recursivelyBecomeVisible(g,
                                c);
                            setTimeout(function () {
                                if (1 === a._childCount) {
                                    var j = a._markers[0];
                                    j.setLatLng(j.getLatLng());
                                    j.setOpacity(1)
                                } else a._recursively(g, c, 0, function (a) {
                                    a._recursivelyRemoveChildrenFromMap(g, b + 1)
                                });
                                h._animationEnd()
                            }, 200)
                        },
                        _animationAddLayer: function (a, b) {
                            var c = this,
                                g = this._featureGroup;
                            g.addLayer(a);
                            b !== a && (2 < b._childCount ? (b._updateIcon(), this._forceLayout(), this._animationStart(), a._setPos(this._map.latLngToLayerPoint(b.getLatLng())), a.setOpacity(0), setTimeout(function () {
                                g.removeLayer(a);
                                a.setOpacity(1);
                                c._animationEnd()
                            }, 200)) : (this._forceLayout(), c._animationStart(), c._animationZoomOutSingle(b, this._map.getMaxZoom(), this._map.getZoom())))
                        },
                        _forceLayout: function () {
                            L.Util.falseFn(b.body.offsetWidth)
                        }
                    });
                    L.markerClusterGroup = function (a) {
                        return new L.MarkerClusterGroup(a)
                    };
                    L.MarkerCluster = L.Marker.extend({
                        initialize: function (a, b, c, g) {
                            L.Marker.prototype.initialize.call(this, c ? c._cLatLng || c.getLatLng() : new L.LatLng(0, 0), {
                                icon: this
                            });
                            this._group = a;
                            this._zoom = b;
                            this._markers = [];
                            this._childClusters = [];
                            this._childCount =
                                0;
                            this._iconNeedsUpdate = !0;
                            this._bounds = new L.LatLngBounds;
                            c && this._addChild(c);
                            g && this._addChild(g)
                        },
                        getAllChildMarkers: function (a) {
                            a = a || [];
                            for (var b = this._childClusters.length - 1; 0 <= b; b--) this._childClusters[b].getAllChildMarkers(a);
                            for (b = this._markers.length - 1; 0 <= b; b--) a.push(this._markers[b]);
                            return a
                        },
                        getChildCount: function () {
                            return this._childCount
                        },
                        zoomToBounds: function () {
                            for (var a = this._childClusters.slice(), b = this._group._map.getBoundsZoom(this._bounds), c = this._zoom + 1, g; 0 < a.length && b > c; ) {
                                c++;
                                var h = [];
                                for (g = 0; g < a.length; g++) h = h.concat(a[g]._childClusters);
                                a = h
                            }
                            b > c ? this._group._map.setView(this._latlng, c) : this._group._map.fitBounds(this._bounds)
                        },
                        getBounds: function () {
                            var a = new L.LatLngBounds;
                            a.extend(this._bounds);
                            return a
                        },
                        _updateIcon: function () {
                            this._iconNeedsUpdate = !0;
                            this._icon && this.setIcon(this)
                        },
                        createIcon: function () {
                            this._iconNeedsUpdate && (this._iconObj = this._group.options.iconCreateFunction(this), this._iconNeedsUpdate = !1);
                            return this._iconObj.createIcon()
                        },
                        createShadow: function () {
                            return this._iconObj.createShadow()
                        },
                        _addChild: function (a, b) {
                            this._iconNeedsUpdate = !0;
                            this._expandBounds(a);
                            a instanceof L.MarkerCluster ? (b || (this._childClusters.push(a), a.__parent = this), this._childCount += a._childCount) : (b || this._markers.push(a), this._childCount++);
                            this.__parent && this.__parent._addChild(a, !0)
                        },
                        _expandBounds: function (a) {
                            var b, c = a._wLatLng || a._latlng;
                            a instanceof L.MarkerCluster ? (this._bounds.extend(a._bounds), b = a._childCount) : (this._bounds.extend(c), b = 1);
                            this._cLatLng || (this._cLatLng = a._cLatLng || c);
                            a = this._childCount +
                                b;
                            this._wLatLng ? (this._wLatLng.lat = (c.lat * b + this._wLatLng.lat * this._childCount) / a, this._wLatLng.lng = (c.lng * b + this._wLatLng.lng * this._childCount) / a) : this._latlng = this._wLatLng = new L.LatLng(c.lat, c.lng)
                        },
                        _addToMap: function (a) {
                            a && (this._backupLatlng = this._latlng, this.setLatLng(a));
                            this._group._featureGroup.addLayer(this)
                        },
                        _recursivelyAnimateChildrenIn: function (a, b, c) {
                            this._recursively(a, 0, c - 1, function (a) {
                                a = a._markers;
                                var c, d;
                                for (c = a.length - 1; 0 <= c; c--) d = a[c], d._icon && (d._setPos(b), d.setOpacity(0))
                            }, function (a) {
                                a =
                                        a._childClusters;
                                var c, d;
                                for (c = a.length - 1; 0 <= c; c--) d = a[c], d._icon && (d._setPos(b), d.setOpacity(0))
                            })
                        },
                        _recursivelyAnimateChildrenInAndAddSelfToMap: function (a, b, c) {
                            this._recursively(a, c, 0, function (g) {
                                g._recursivelyAnimateChildrenIn(a, g._group._map.latLngToLayerPoint(g.getLatLng()).round(), b);
                                g._isSingleParent() && b - 1 === c ? (g.setOpacity(1), g._recursivelyRemoveChildrenFromMap(a, b)) : g.setOpacity(0);
                                g._addToMap()
                            })
                        },
                        _recursivelyBecomeVisible: function (a, b) {
                            this._recursively(a, 0, b, null, function (a) {
                                a.setOpacity(1)
                            })
                        },
                        _recursivelyAddChildrenToMap: function (a, b, c) {
                            this._recursively(c, -1, b, function (g) {
                                if (b !== g._zoom)
                                    for (var h = g._markers.length - 1; 0 <= h; h--) {
                                        var j = g._markers[h];
                                        c.contains(j._latlng) && (a && (j._backupLatlng = j.getLatLng(), j.setLatLng(a), j.setOpacity && j.setOpacity(0)), g._group._featureGroup.addLayer(j))
                                    }
                            }, function (c) {
                                c._addToMap(a)
                            })
                        },
                        _recursivelyRestoreChildPositions: function (a) {
                            for (var b = this._markers.length - 1; 0 <= b; b--) {
                                var c = this._markers[b];
                                c._backupLatlng && (c.setLatLng(c._backupLatlng), delete c._backupLatlng)
                            }
                            if (a -
                                1 === this._zoom)
                                for (a = this._childClusters.length - 1; 0 <= a; a--) this._childClusters[a]._restorePosition();
                            else
                                for (b = this._childClusters.length - 1; 0 <= b; b--) this._childClusters[b]._recursivelyRestoreChildPositions(a)
                        },
                        _restorePosition: function () {
                            this._backupLatlng && (this.setLatLng(this._backupLatlng), delete this._backupLatlng)
                        },
                        _recursivelyRemoveChildrenFromMap: function (a, b, c) {
                            var g, h;
                            this._recursively(a, -1, b - 1, function (a) {
                                for (h = a._markers.length - 1; 0 <= h; h--)
                                    if (g = a._markers[h], !c || !c.contains(g._latlng)) a._group._featureGroup.removeLayer(g),
                                g.setOpacity && g.setOpacity(1)
                            }, function (a) {
                                for (h = a._childClusters.length - 1; 0 <= h; h--)
                                    if (g = a._childClusters[h], !c || !c.contains(g._latlng)) a._group._featureGroup.removeLayer(g), g.setOpacity && g.setOpacity(1)
                            })
                        },
                        _recursively: function (a, b, c, g, h) {
                            var j = this._childClusters,
                                k = this._zoom,
                                l;
                            if (b > k)
                                for (k = j.length - 1; 0 <= k; k--) l = j[k], a.intersects(l._bounds) && l._recursively(a, b, c, g, h);
                            else if (g && g(this), h && this._zoom === c && h(this), c > k)
                                for (k = j.length - 1; 0 <= k; k--) l = j[k], a.intersects(l._bounds) && l._recursively(a, b, c,
                                        g, h)
                        },
                        _recalculateBounds: function () {
                            var a = this._markers,
                                b = this._childClusters,
                                c;
                            this._bounds = new L.LatLngBounds;
                            delete this._wLatLng;
                            for (c = a.length - 1; 0 <= c; c--) this._expandBounds(a[c]);
                            for (c = b.length - 1; 0 <= c; c--) this._expandBounds(b[c])
                        },
                        _isSingleParent: function () {
                            return 0 < this._childClusters.length && this._childClusters[0]._childCount === this._childCount
                        }
                    });
                    L.DistanceGrid = function (a) {
                        this._cellSize = a;
                        this._sqCellSize = a * a;
                        this._grid = {};
                        this._objectPoint = {}
                    };
                    L.DistanceGrid.prototype = {
                        addObject: function (a,
                        b) {
                            var c = this._getCoord(b.x),
                                g = this._getCoord(b.y),
                                h = this._grid,
                                g = h[g] = h[g] || {}, c = g[c] = g[c] || [],
                                g = L.Util.stamp(a);
                            this._objectPoint[g] = b;
                            c.push(a)
                        },
                        updateObject: function (a, b) {
                            this.removeObject(a);
                            this.addObject(a, b)
                        },
                        removeObject: function (a, b) {
                            var c = this._getCoord(b.x),
                                g = this._getCoord(b.y),
                                h = this._grid,
                                g = h[g] = h[g] || {}, h = g[c] = g[c] || [],
                                j, k;
                            delete this._objectPoint[L.Util.stamp(a)];
                            j = 0;
                            for (k = h.length; j < k; j++)
                                if (h[j] === a) return h.splice(j, 1), 1 === k && delete g[c], !0
                            },
                            eachObject: function (a, b) {
                                var c, g, h,
                                j, k, l, m, n = this._grid;
                                for (c in n)
                                    for (g in k = n[c], k) {
                                        l = k[g];
                                        h = 0;
                                        for (j = l.length; h < j; h++)
                                            if (m = a.call(b, l[h])) h--, j--
                                    }
                            },
                            getNearObject: function (a) {
                                var b = this._getCoord(a.x),
                                c = this._getCoord(a.y),
                                g, h, j, k, l, m, n, p, r = this._objectPoint,
                                q = this._sqCellSize,
                                s = null;
                                for (g = c - 1; g <= c + 1; g++)
                                    if (k = this._grid[g])
                                        for (h = b - 1; h <= b + 1; h++)
                                            if (l = k[h]) {
                                                j = 0;
                                                for (m = l.length; j < m; j++) n = l[j], p = this._sqDist(r[L.Util.stamp(n)], a), p < q && (q = p, s = n)
                                            }
                                return s
                            },
                            _getCoord: function (a) {
                                return Math.floor(a / this._cellSize)
                            },
                            _sqDist: function (a, b) {
                                var c =
                                b.x - a.x,
                                g = b.y - a.y;
                                return c * c + g * g
                            }
                        };
                        L.QuickHull = {
                            getDistant: function (a, b) {
                                return (b[0].lng - b[1].lng) * (a.lat - b[0].lat) + (b[1].lat - b[0].lat) * (a.lng - b[0].lng)
                            },
                            findMostDistantPointFromBaseLine: function (a, b) {
                                var c = 0,
                                g = null,
                                h = [],
                                j, k, l;
                                for (j = b.length - 1; 0 <= j; j--) k = b[j], l = this.getDistant(k, a), 0 < l && (h.push(k), l > c && (c = l, g = k));
                                return {
                                    maxPoint: g,
                                    newPoints: h
                                }
                            },
                            buildConvexHull: function (a, b) {
                                var c = [],
                                g = this.findMostDistantPointFromBaseLine(a, b);
                                return g.maxPoint ? (c = c.concat(this.buildConvexHull([a[0], g.maxPoint], g.newPoints)),
                                c = c.concat(this.buildConvexHull([g.maxPoint, a[1]], g.newPoints))) : [a[0]]
                            },
                            getConvexHull: function (a) {
                                var b = !1,
                                c = !1,
                                g = null,
                                h = null,
                                j;
                                for (j = a.length - 1; 0 <= j; j--) {
                                    var k = a[j];
                                    if (!1 === b || k.lat > b) g = k, b = k.lat;
                                    if (!1 === c || k.lat < c) h = k, c = k.lat
                                }
                                return [].concat(this.buildConvexHull([h, g], a), this.buildConvexHull([g, h], a))
                            }
                        };
                        L.MarkerCluster.include({
                            getConvexHull: function () {
                                var a = this.getAllChildMarkers(),
                                b = [],
                                c, g;
                                for (g = a.length - 1; 0 <= g; g--) c = a[g].getLatLng(), b.push(c);
                                return L.QuickHull.getConvexHull(b)
                            }
                        });
                        L.MarkerCluster.include({
                            _2PI: 2 *
                        Math.PI,
                            _circleFootSeparation: 25,
                            _circleStartAngle: Math.PI / 6,
                            _spiralFootSeparation: 28,
                            _spiralLengthStart: 11,
                            _spiralLengthFactor: 5,
                            _circleSpiralSwitchover: 9,
                            spiderfy: function () {
                                if (!(this._group._spiderfied === this || this._group._inZoomAnimation)) {
                                    var a = this.getAllChildMarkers(),
                                        b = this._group._map.latLngToLayerPoint(this._latlng);
                                    this._group._unspiderfy();
                                    this._group._spiderfied = this;
                                    a.length >= this._circleSpiralSwitchover ? b = this._generatePointsSpiral(a.length, b) : (b.y += 10, b = this._generatePointsCircle(a.length,
                                        b));
                                    this._animationSpiderfy(a, b)
                                }
                            },
                            unspiderfy: function (a) {
                                this._group._inZoomAnimation || (this._animationUnspiderfy(a), this._group._spiderfied = null)
                            },
                            _generatePointsCircle: function (a, b) {
                                var c = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + a) / this._2PI,
                                g = this._2PI / a,
                                h = [],
                                j, k;
                                h.length = a;
                                for (j = a - 1; 0 <= j; j--) k = this._circleStartAngle + j * g, h[j] = (new L.Point(b.x + c * Math.cos(k), b.y + c * Math.sin(k)))._round();
                                return h
                            },
                            _generatePointsSpiral: function (a, b) {
                                var c = this._group.options.spiderfyDistanceMultiplier *
                                this._spiralLengthStart,
                                g = this._group.options.spiderfyDistanceMultiplier * this._spiralFootSeparation,
                                h = this._group.options.spiderfyDistanceMultiplier * this._spiralLengthFactor,
                                j = 0,
                                k = [],
                                l;
                                k.length = a;
                                for (l = a - 1; 0 <= l; l--) j += g / c + 5E-4 * l, k[l] = (new L.Point(b.x + c * Math.cos(j), b.y + c * Math.sin(j)))._round(), c += this._2PI * h / j;
                                return k
                            },
                            _noanimationUnspiderfy: function () {
                                var a = this._group,
                                b = a._map,
                                c = a._featureGroup,
                                g = this.getAllChildMarkers(),
                                h, j;
                                this.setOpacity(1);
                                for (j = g.length - 1; 0 <= j; j--) h = g[j], c.removeLayer(h),
                        h._preSpiderfyLatlng && (h.setLatLng(h._preSpiderfyLatlng), delete h._preSpiderfyLatlng), h.setZIndexOffset && h.setZIndexOffset(0), h._spiderLeg && (b.removeLayer(h._spiderLeg), delete h._spiderLeg);
                                a._spiderfied = null
                            }
                        });
                        L.MarkerCluster.include(!L.DomUtil.TRANSITION ? {
                            _animationSpiderfy: function (a, b) {
                                var c = this._group,
                                g = c._map,
                                h = c._featureGroup,
                                j, k, l;
                                for (j = a.length - 1; 0 <= j; j--) l = g.layerPointToLatLng(b[j]), k = a[j], k._preSpiderfyLatlng = k._latlng, k.setLatLng(l), k.setZIndexOffset && k.setZIndexOffset(1E6), h.addLayer(k),
                        l = new L.Polyline([this._latlng, l], {
                            weight: 1.5,
                            color: "#222"
                        }), g.addLayer(l), k._spiderLeg = l;
                                this.setOpacity(0.3);
                                c.fire("spiderfied")
                            },
                            _animationUnspiderfy: function () {
                                this._noanimationUnspiderfy()
                            }
                        } : {
                            SVG_ANIMATION: -1 < b.createElementNS("http://www.w3.org/2000/svg", "animate").toString().indexOf("SVGAnimate"),
                            _animationSpiderfy: function (a, e) {
                                var c = this._group,
                                g = c._map,
                                h = c._featureGroup,
                                j = g.latLngToLayerPoint(this._latlng),
                                k, l, m;
                                for (k = a.length - 1; 0 <= k; k--) l = a[k], l.setOpacity ? (l.setZIndexOffset(1E6), l.setOpacity(0),
                                h.addLayer(l), l._setPos(j)) : h.addLayer(l);
                                c._forceLayout();
                                c._animationStart();
                                h = L.Path.SVG ? 0 : 0.3;
                                j = L.Path.SVG_NS;
                                for (k = a.length - 1; 0 <= k; k--)
                                    if (m = g.layerPointToLatLng(e[k]), l = a[k], l._preSpiderfyLatlng = l._latlng, l.setLatLng(m), l.setOpacity && l.setOpacity(1), m = new L.Polyline([this._latlng, m], {
                                        weight: 1.5,
                                        color: "#222",
                                        opacity: h
                                    }), g.addLayer(m), l._spiderLeg = m, L.Path.SVG && this.SVG_ANIMATION) {
                                        l = m._path.getTotalLength();
                                        m._path.setAttribute("stroke-dasharray", l + "," + l);
                                        var n = b.createElementNS(j, "animate");
                                        n.setAttribute("attributeName",
                                                "stroke-dashoffset");
                                        n.setAttribute("begin", "indefinite");
                                        n.setAttribute("from", l);
                                        n.setAttribute("to", 0);
                                        n.setAttribute("dur", 0.25);
                                        m._path.appendChild(n);
                                        n.beginElement();
                                        n = b.createElementNS(j, "animate");
                                        n.setAttribute("attributeName", "stroke-opacity");
                                        n.setAttribute("attributeName", "stroke-opacity");
                                        n.setAttribute("begin", "indefinite");
                                        n.setAttribute("from", 0);
                                        n.setAttribute("to", 0.5);
                                        n.setAttribute("dur", 0.25);
                                        m._path.appendChild(n);
                                        n.beginElement()
                                    }
                                this.setOpacity(0.3);
                                if (L.Path.SVG) {
                                    this._group._forceLayout();
                                    for (k = a.length - 1; 0 <= k; k--) l = a[k]._spiderLeg, l.options.opacity = 0.5, l._path.setAttribute("stroke-opacity", 0.5)
                                }
                                setTimeout(function () {
                                    c._animationEnd();
                                    c.fire("spiderfied")
                                }, 200)
                            },
                            _animationUnspiderfy: function (a) {
                                var b = this._group,
                                c = b._map,
                                g = b._featureGroup;
                                a = a ? c._latLngToNewLayerPoint(this._latlng, a.zoom, a.center) : c.latLngToLayerPoint(this._latlng);
                                var h = this.getAllChildMarkers(),
                                j = L.Path.SVG && this.SVG_ANIMATION,
                                k, l, m;
                                b._animationStart();
                                this.setOpacity(1);
                                for (l = h.length - 1; 0 <= l; l--) k = h[l], k._preSpiderfyLatlng &&
                                (k.setLatLng(k._preSpiderfyLatlng), delete k._preSpiderfyLatlng, k.setOpacity ? (k._setPos(a), k.setOpacity(0)) : g.removeLayer(k), j && (m = k._spiderLeg._path.childNodes[0], m.setAttribute("to", m.getAttribute("from")), m.setAttribute("from", 0), m.beginElement(), m = k._spiderLeg._path.childNodes[1], m.setAttribute("from", 0.5), m.setAttribute("to", 0), m.setAttribute("stroke-opacity", 0), m.beginElement(), k._spiderLeg._path.setAttribute("stroke-opacity", 0)));
                                setTimeout(function () {
                                    var a = 0;
                                    for (l = h.length - 1; 0 <= l; l--) k = h[l],
                                k._spiderLeg && a++;
                                    for (l = h.length - 1; 0 <= l; l--) k = h[l], k._spiderLeg && (k.setOpacity && (k.setOpacity(1), k.setZIndexOffset(0)), 1 < a && g.removeLayer(k), c.removeLayer(k._spiderLeg), delete k._spiderLeg);
                                    b._animationEnd()
                                }, 200)
                            }
                        });
                        L.MarkerClusterGroup.include({
                            _spiderfied: null,
                            _spiderfierOnAdd: function () {
                                this._map.on("click", this._unspiderfyWrapper, this);
                                if (this._map.options.zoomAnimation) this._map.on("zoomstart", this._unspiderfyZoomStart, this);
                                this._map.on("zoomend", this._noanimationUnspiderfy, this);
                                L.Path.SVG && !L.Browser.touch && this._map._initPathRoot()
                            },
                            _spiderfierOnRemove: function () {
                                this._map.off("click", this._unspiderfyWrapper, this);
                                this._map.off("zoomstart", this._unspiderfyZoomStart, this);
                                this._map.off("zoomanim", this._unspiderfyZoomAnim, this);
                                this._unspiderfy()
                            },
                            _unspiderfyZoomStart: function () {
                                if (this._map) this._map.on("zoomanim", this._unspiderfyZoomAnim, this)
                            },
                            _unspiderfyZoomAnim: function (a) {
                                L.DomUtil.hasClass(this._map._mapPane, "leaflet-touching") || (this._map.off("zoomanim", this._unspiderfyZoomAnim,
                                this), this._unspiderfy(a))
                            },
                            _unspiderfyWrapper: function () {
                                this._unspiderfy()
                            },
                            _unspiderfy: function (a) {
                                this._spiderfied && this._spiderfied.unspiderfy(a)
                            },
                            _noanimationUnspiderfy: function () {
                                this._spiderfied && this._spiderfied._noanimationUnspiderfy()
                            },
                            _unspiderfyLayer: function (a) {
                                a._spiderLeg && (this._featureGroup.removeLayer(a), a.setOpacity(1), a.setZIndexOffset(0), this._map.removeLayer(a._spiderLeg), delete a._spiderLeg)
                            }
                        })
                    })(window, document);
                    (function () {
                        L.labelVersion = "0.2.0-dev";
                        L.Label = L.Class.extend({
                            includes: L.Mixin.Events,
                            options: {
                                className: "",
                                clickable: !1,
                                direction: "right",
                                noHide: !1,
                                offset: new L.Point(12, -15),
                                opacity: 1,
                                zoomAnimation: !0
                            },
                            initialize: function (a, b) {
                                L.setOptions(this, a);
                                this._source = b;
                                this._animated = L.Browser.any3d && this.options.zoomAnimation;
                                this._isOpen = !1
                            },
                            onAdd: function (a) {
                                this._map = a;
                                this._pane = this._source instanceof L.Marker ? a._panes.markerPane : a._panes.popupPane;
                                this._container || this._initLayout();
                                this._updateContent();
                                this._pane.appendChild(this._container);
                                a.on("moveend", this._onMoveEnd, this).on("viewreset", this._onViewReset, this);
                                if (this._animated) a.on("zoomanim", this._zoomAnimation, this);
                                if (L.Browser.touch && !this.options.noHide) L.DomEvent.on(this._container, "click", this.close, this);
                                this._initInteraction();
                                this._update();
                                this.setOpacity(this.options.opacity)
                            },
                            onRemove: function (a) {
                                this._pane.removeChild(this._container);
                                a.off({
                                    zoomanim: this._zoomAnimation,
                                    moveend: this._onMoveEnd,
                                    viewreset: this._onViewReset
                                }, this);
                                this._removeInteraction();
                                this._map = null
                            },
                            setLatLng: function (a) {
                                this._latlng = L.latLng(a);
                                this._update();
                                return this
                            },
                            setContent: function (a) {
                                this._content = a;
                                this._update();
                                return this
                            },
                            close: function () {
                                var a = this._map;
                                a && (L.Browser.touch && !this.options.noHide && L.DomEvent.off(this._container, "click", this.close), a.removeLayer(this))
                            },
                            updateZIndex: function (a) {
                                this._zIndex = a;
                                this._container && this._zIndex && (this._container.style.zIndex = a)
                            },
                            setOpacity: function (a) {
                                this.options.opacity = a;
                                this._container &&
                                L.DomUtil.setOpacity(this._container, a)
                            },
                            _initLayout: function () {
                                this._container = L.DomUtil.create("div", "leaflet-label " + this.options.className + " leaflet-zoom-animated");
                                this.updateZIndex(this._zIndex)
                            },
                            _update: function () {
                                this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updatePosition(), this._container.style.visibility = "")
                            },
                            _updateContent: function () {
                                this._content && "string" === typeof this._content && (this._container.innerHTML = this._content, this._labelWidth = this._container.offsetWidth)
                            },
                            _updatePosition: function () {
                                var a = this._map.latLngToLayerPoint(this._latlng);
                                this._setPosition(a)
                            },
                            _setPosition: function (a) {
                                var b = this._map,
                                d = this._container,
                                e = b.latLngToContainerPoint(b.getCenter()),
                                b = b.layerPointToContainerPoint(a),
                                c = this.options.direction,
                                g = this._labelWidth;
                                "right" === c || "auto" === c && b.x < e.x ? (L.DomUtil.addClass(d, "leaflet-label-right"), L.DomUtil.removeClass(d, "leaflet-label-left"), a = a.add(this.options.offset)) : (L.DomUtil.addClass(d, "leaflet-label-left"), L.DomUtil.removeClass(d, "leaflet-label-right"),
                                a = a.add(L.point(-this.options.offset.x - g, this.options.offset.y)));
                                L.DomUtil.setPosition(d, a)
                            },
                            _zoomAnimation: function (a) {
                                a = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center);
                                this._setPosition(a)
                            },
                            _onMoveEnd: function () {
                                (!this._animated || "auto" === this.options.direction) && this._updatePosition()
                            },
                            _onViewReset: function (a) {
                                a && a.hard && this._update()
                            },
                            _initInteraction: function () {
                                if (this.options.clickable) {
                                    var a = this._container,
                                        b = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
                                    L.DomUtil.addClass(a,
                                        "leaflet-clickable");
                                    L.DomEvent.on(a, "click", this._onMouseClick, this);
                                    for (var d = 0; d < b.length; d++) L.DomEvent.on(a, b[d], this._fireMouseEvent, this)
                                }
                            },
                            _removeInteraction: function () {
                                if (this.options.clickable) {
                                    var a = this._container,
                                        b = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
                                    L.DomUtil.removeClass(a, "leaflet-clickable");
                                    L.DomEvent.off(a, "click", this._onMouseClick, this);
                                    for (var d = 0; d < b.length; d++) L.DomEvent.off(a, b[d], this._fireMouseEvent, this)
                                }
                            },
                            _onMouseClick: function (a) {
                                this.hasEventListeners(a.type) &&
                                L.DomEvent.stopPropagation(a);
                                this.fire(a.type, {
                                    originalEvent: a
                                })
                            },
                            _fireMouseEvent: function (a) {
                                this.fire(a.type, {
                                    originalEvent: a
                                });
                                "contextmenu" === a.type && this.hasEventListeners(a.type) && L.DomEvent.preventDefault(a);
                                "mousedown" !== a.type ? L.DomEvent.stopPropagation(a) : L.DomEvent.preventDefault(a)
                            }
                        });
                        L.BaseMarkerMethods = {
                            showLabel: function () {
                                this.label && this._map && (this.label.setLatLng(this._latlng), this._map.showLabel(this.label));
                                return this
                            },
                            hideLabel: function () {
                                this.label && this.label.close();
                                return this
                            },
                            setLabelNoHide: function (a) {
                                this._labelNoHide !== a && ((this._labelNoHide = a) ? (this._removeLabelRevealHandlers(), this.showLabel()) : (this._addLabelRevealHandlers(), this.hideLabel()))
                            },
                            bindLabel: function (a, b) {
                                var d = L.point(this.options.icon ? this.options.icon.options.labelAnchor : null) || L.point(0, 0),
                                d = d.add(L.Label.prototype.options.offset);
                                b && b.offset && (d = d.add(b.offset));
                                b = L.Util.extend({
                                    offset: d
                                }, b);
                                this._labelNoHide = b.noHide;
                                this.label || (this._labelNoHide || this._addLabelRevealHandlers(), this.on("remove",
                                this.hideLabel, this).on("move", this._moveLabel, this).on("add", this._onMarkerAdd, this), this._hasLabelHandlers = !0);
                                this.label = (new L.Label(b, this)).setContent(a);
                                return this
                            },
                            unbindLabel: function () {
                                this.label && (this.hideLabel(), this.label = null, this._hasLabelHandlers && (this._labelNoHide || this._removeLabelRevealHandlers(), this.off("remove", this.hideLabel, this).off("move", this._moveLabel, this).off("add", this._onMarkerAdd, this)), this._hasLabelHandlers = !1);
                                return this
                            },
                            updateLabelContent: function (a) {
                                this.label &&
                                this.label.setContent(a)
                            },
                            getLabel: function () {
                                return this.label
                            },
                            _onMarkerAdd: function () {
                                this._labelNoHide && this.showLabel()
                            },
                            _addLabelRevealHandlers: function () {
                                this.on("mouseover", this.showLabel, this).on("mouseout", this.hideLabel, this);
                                if (L.Browser.touch) this.on("click", this.showLabel, this)
                            },
                            _removeLabelRevealHandlers: function () {
                                this.off("mouseover", this.showLabel, this).off("mouseout", this.hideLabel, this);
                                L.Browser.touch && this.off("click", this.showLabel, this)
                            },
                            _moveLabel: function (a) {
                                this.label.setLatLng(a.latlng)
                            }
                        };
                        L.Icon.Default.mergeOptions({
                            labelAnchor: new L.Point(9, -20)
                        });
                        L.Marker.mergeOptions({
                            icon: new L.Icon.Default
                        });
                        L.Marker.include(L.BaseMarkerMethods);
                        L.Marker.include({
                            _originalUpdateZIndex: L.Marker.prototype._updateZIndex,
                            _updateZIndex: function (a) {
                                var b = this._zIndex + a;
                                this._originalUpdateZIndex(a);
                                this.label && this.label.updateZIndex(b)
                            },
                            _originalSetOpacity: L.Marker.prototype.setOpacity,
                            setOpacity: function (a, b) {
                                this.options.labelHasSemiTransparency = b;
                                this._originalSetOpacity(a)
                            },
                            _originalUpdateOpacity: L.Marker.prototype._updateOpacity,
                            _updateOpacity: function () {
                                var a = 0 === this.options.opacity ? 0 : 1;
                                this._originalUpdateOpacity();
                                this.label && this.label.setOpacity(this.options.labelHasSemiTransparency ? this.options.opacity : a)
                            }
                        });
                        L.CircleMarker.include(L.BaseMarkerMethods);
                        L.Path.include({
                            bindLabel: function (a, b) {
                                if (!this.label || this.label.options !== b) this.label = new L.Label(b, this);
                                this.label.setContent(a);
                                if (!this._showLabelAdded) {
                                    this.on("mouseover", this._showLabel, this).on("mousemove", this._moveLabel, this).on("mouseout remove", this._hideLabel,
                                        this);
                                    if (L.Browser.touch) this.on("click", this._showLabel, this);
                                    this._showLabelAdded = !0
                                }
                                return this
                            },
                            unbindLabel: function () {
                                this.label && (this._hideLabel(), this.label = null, this._showLabelAdded = !1, this.off("mouseover", this._showLabel, this).off("mousemove", this._moveLabel, this).off("mouseout remove", this._hideLabel, this));
                                return this
                            },
                            updateLabelContent: function (a) {
                                this.label && this.label.setContent(a)
                            },
                            _showLabel: function (a) {
                                this.label.setLatLng(a.latlng);
                                this._map.showLabel(this.label)
                            },
                            _moveLabel: function (a) {
                                this.label.setLatLng(a.latlng)
                            },
                            _hideLabel: function () {
                                this.label.close()
                            }
                        });
                        L.Map.include({
                            showLabel: function (a) {
                                return this.addLayer(a)
                            }
                        });
                        L.FeatureGroup.include({
                            clearLayers: function () {
                                this.unbindLabel();
                                this.eachLayer(this.removeLayer, this);
                                return this
                            },
                            bindLabel: function (a, b) {
                                return this.invoke("bindLabel", a, b)
                            },
                            unbindLabel: function () {
                                return this.invoke("unbindLabel")
                            },
                            updateLabelContent: function (a) {
                                this.invoke("updateLabelContent", a)
                            }
                        })
                    })(this, document);
                    L.Handler.PolyEdit = L.Handler.extend({
                        options: {
                            icon: new L.DivIcon({
                                iconSize: new L.Point(8, 8),
                                className: "leaflet-div-icon leaflet-editing-icon"
                            })
                        },
                        initialize: function (a, b) {
                            this._poly = a;
                            L.setOptions(this, b)
                        },
                        addHooks: function () {
                            this._poly._map && (this._markerGroup || this._initMarkers(), this._poly._map.addLayer(this._markerGroup))
                        },
                        removeHooks: function () {
                            this._poly._map && (this._poly._map.removeLayer(this._markerGroup), delete this._markerGroup, delete this._markers)
                        },
                        updateMarkers: function () {
                            this._markerGroup.clearLayers();
                            this._initMarkers()
                        },
                        _initMarkers: function () {
                            this._markerGroup || (this._markerGroup = new L.LayerGroup);
                            this._markers = [];
                            var a = this._poly._latlngs,
                        b, d, e;
                            b = 0;
                            for (d = a.length; b < d; b++) e = this._createMarker(a[b], b), e.on("click", this._onMarkerClick, this), this._markers.push(e);
                            b = 0;
                            for (a = d - 1; b < d; a = b++)
                                if (0 !== b || L.Polygon && this._poly instanceof L.Polygon) a = this._markers[a], e = this._markers[b], this._createMiddleMarker(a, e), this._updatePrevNext(a, e)
                        },
                        _createMarker: function (a, b) {
                            var d = new L.Marker(a, {
                                draggable: !0,
                                icon: this.options.icon
                            });
                            d._origLatLng = a;
                            d._index = b;
                            d.on("drag", this._onMarkerDrag, this);
                            d.on("dragend", this._fireEdit, this);
                            this._markerGroup.addLayer(d);
                            return d
                        },
                        _fireEdit: function () {
                            this._poly.fire("edit")
                        },
                        _onMarkerDrag: function (a) {
                            a = a.target;
                            L.extend(a._origLatLng, a._latlng);
                            a._middleLeft && a._middleLeft.setLatLng(this._getMiddleLatLng(a._prev, a));
                            a._middleRight && a._middleRight.setLatLng(this._getMiddleLatLng(a, a._next));
                            this._poly.redraw()
                        },
                        _onMarkerClick: function (a) {
                            if (!(3 > this._poly._latlngs.length)) {
                                a =
                                a.target;
                                var b = a._index;
                                this._markerGroup.removeLayer(a);
                                this._markers.splice(b, 1);
                                this._poly.spliceLatLngs(b, 1);
                                this._updateIndexes(b, -1);
                                this._updatePrevNext(a._prev, a._next);
                                a._middleLeft && this._markerGroup.removeLayer(a._middleLeft);
                                a._middleRight && this._markerGroup.removeLayer(a._middleRight);
                                a._prev && a._next ? this._createMiddleMarker(a._prev, a._next) : a._prev ? a._next || (a._prev._middleRight = null) : a._next._middleLeft = null;
                                this._poly.fire("edit")
                            }
                        },
                        _updateIndexes: function (a, b) {
                            this._markerGroup.eachLayer(function (d) {
                                d._index >
                                a && (d._index += b)
                            })
                        },
                        _createMiddleMarker: function (a, b) {
                            var d = this._getMiddleLatLng(a, b),
                        e = this._createMarker(d),
                        c, g, h;
                            e.setOpacity(0.6);
                            a._middleRight = b._middleLeft = e;
                            g = function () {
                                var g = b._index;
                                e._index = g;
                                e.off("click", c).on("click", this._onMarkerClick, this);
                                d.lat = e.getLatLng().lat;
                                d.lng = e.getLatLng().lng;
                                this._poly.spliceLatLngs(g, 0, d);
                                this._markers.splice(g, 0, e);
                                e.setOpacity(1);
                                this._updateIndexes(g, 1);
                                b._index++;
                                this._updatePrevNext(a, e);
                                this._updatePrevNext(e, b)
                            };
                            h = function () {
                                e.off("dragstart",
                                g, this);
                                e.off("dragend", h, this);
                                this._createMiddleMarker(a, e);
                                this._createMiddleMarker(e, b)
                            };
                            c = function () {
                                g.call(this);
                                h.call(this);
                                this._poly.fire("edit")
                            };
                            e.on("click", c, this).on("dragstart", g, this).on("dragend", h, this);
                            this._markerGroup.addLayer(e)
                        },
                        _updatePrevNext: function (a, b) {
                            a && (a._next = b);
                            b && (b._prev = a)
                        },
                        _getMiddleLatLng: function (a, b) {
                            var d = this._poly._map,
                        e = d.latLngToLayerPoint(a.getLatLng()),
                        c = d.latLngToLayerPoint(b.getLatLng());
                            return d.layerPointToLatLng(e._add(c)._divideBy(2))
                        }
                    });
                    L.Polyline.addInitHook(function () {
                        L.Handler.PolyEdit && (this.editing = new L.Handler.PolyEdit(this), this.options.editable && this.editing.enable());
                        this.on("add", function () {
                            this.editing && this.editing.enabled() && this.editing.addHooks()
                        });
                        this.on("remove", function () {
                            this.editing && this.editing.enabled() && this.editing.removeHooks()
                        })
                    });
                    L.Handler.MarkerDrag = L.Handler.extend({
                        initialize: function (a) {
                            this._marker = a
                        },
                        addHooks: function () {
                            var a = this._marker._icon;
                            this._draggable || (this._draggable = (new L.Draggable(a, a)).on("dragstart", this._onDragStart, this).on("drag", this._onDrag, this).on("dragend", this._onDragEnd, this));
                            this._draggable.enable()
                        },
                        removeHooks: function () {
                            this._draggable.disable()
                        },
                        moved: function () {
                            return this._draggable && this._draggable._moved
                        },
                        _onDragStart: function () {
                            this._marker.closePopup().fire("movestart").fire("dragstart")
                        },
                        _onDrag: function () {
                            var a = this._marker,
                        b = a._shadow,
                        d = L.DomUtil.getPosition(a._icon),
                        e = a._map.layerPointToLatLng(d);
                            b && L.DomUtil.setPosition(b, d);
                            a._latlng = e;
                            a.fire("move", {
                                latlng: e
                            }).fire("drag")
                        },
                        _onDragEnd: function () {
                            this._marker.fire("moveend").fire("dragend")
                        }
                    });
                    L.Handler.CircleDrag = L.Handler.extend({
                        options: {
                            icon: new L.DivIcon({
                                iconSize: new L.Point(8, 8),
                                className: "leaflet-div-icon leaflet-editing-icon"
                            })
                        },
                        initialize: function (a, b) {
                            this._circle = a;
                            L.Util.setOptions(this, b)
                        },
                        addHooks: function () {
                            this._circle._map && (this._dragHandler = new L.Marker(this._circle.getLatLng(), {
                                icon: this.options.icon,
                                draggable: !0
                            }), this._dragHandler.on("dragstart", this._onDragStart, this).on("drag", this._onDrag, this).on("dragend", this._onDragEnd, this), this._markerGroup = new L.LayerGroup,
                        this._markerGroup.addLayer(this._dragHandler), this._circle._map.addLayer(this._markerGroup))
                        },
                        removeHooks: function () {
                            this._circle._map && (this._circle._map.removeLayer(this._markerGroup), delete this._markerGroup)
                        },
                        _onDragStart: function () {
                            this._circle.fire("movestart").fire("dragstart")
                        },
                        _onDrag: function (a) {
                            this._circle.setLatLng(a.target.getLatLng());
                            this._circle.fire("move").fire("drag")
                        },
                        _onDragEnd: function () {
                            this._circle.fire("moveend").fire("dragend")
                        }
                    });
                    L.Handler.CircleResize = L.Handler.extend({
                        options: {
                            icon: new L.DivIcon({
                                iconSize: new L.Point(8, 8),
                                className: "leaflet-div-icon leaflet-editing-icon"
                            })
                        },
                        initialize: function (a, b) {
                            this._circle = a;
                            L.Util.setOptions(this, b)
                        },
                        addHooks: function () {
                            this._circle._map && (this._markerGroup = new L.LayerGroup, this._circle._map.addLayer(this._markerGroup), this._initHandler())
                        },
                        removeHooks: function () {
                            this._circle._map && (this._circle.off("drag", this._updateHandler, this), this._circle._map.removeLayer(this._markerGroup),
                        delete this._markerGroup, delete this._origins)
                        },
                        _initHandler: function () {
                            var a = this.options.icon,
                        b = this._circle.getBounds(),
                        b = new L.LatLng(this._circle.getLatLng().lat, b.getNorthEast().lng);
                            this._dragHandler = new L.Marker(b, {
                                icon: a,
                                draggable: !0
                            });
                            this._dragHandler.on("dragstart", this._onDragStart, this).on("drag", this._onDrag, this).on("dragend", this._onDragEnd, this);
                            this._circle.on("drag", this._updateHandler, this);
                            this._markerGroup.addLayer(this._dragHandler);
                            this._setOrigins()
                        },
                        _updateHandler: function () {
                            var a =
                        this._origins.circle,
                        b = this._origins.handler,
                        d = this._circle._map.project(this._circle.getLatLng()),
                        a = new L.Point(b.x + (d.x - a.x), b.y + (d.y - a.y));
                            this._dragHandler.setLatLng(this._circle._map.unproject(a))
                        },
                        _onDragStart: function () { },
                        _onDrag: function (a) {
                            var b = this._circle.getLatLng();
                            a = a.target.getLatLng();
                            this._circle.setRadius(b.distanceTo(a));
                            this._circle.fire("resize")
                        },
                        _onDragEnd: function () {
                            this._setOrigins()
                        },
                        _setOrigins: function () {
                            if ("undefined" !== typeof this._circle._map && this._circle._map instanceof L.Map) {
                                var a = this._circle._map;
                                this._origins = {
                                    circle: a.project(this._circle.getLatLng()),
                                    handler: a.project(this._dragHandler.getLatLng())
                                }
                            }
                        }
                    });
                    L.Circle.include({
                        initialize: function (a, b, d) {
                            L.Path.prototype.initialize.call(this, d);
                            this._latlng = L.latLng(a);
                            this._mRadius = b;
                            L.Handler.CircleDrag && (this.dragging = new L.Handler.CircleDrag(this), this.options.draggable && this.dragging.enable());
                            L.Handler.CircleResize && (this.resizing = new L.Handler.CircleResize(this), this.options.resizable && this.resizing.enable())
                        },
                        onAdd: function (a) {
                            L.Path.prototype.onAdd.call(this, a);
                            this.dragging && this.dragging.enabled() && this.dragging.addHooks();
                            this.resizing && this.resizing.enabled() &&
                        this.resizing.addHooks()
                        },
                        onRemove: function (a) {
                            this.dragging && this.dragging.enabled() && this.dragging.removeHooks();
                            this.resizing && this.resizing.enabled() && this.resizing.removeHooks();
                            L.Path.prototype.onRemove.call(this, a)
                        }
                    });
                    GeoConverter = function () {
                        this.sm_a = 6378137;
                        this.sm_b = 6356752.314;
                        this.UTMScaleFactor = 0.9996
                    };
                    GeoConverter.prototype = {
                        degToRad: function (a) {
                            return a / 180 * Math.PI
                        },
                        radToDeg: function (a) {
                            return 180 * (a / Math.PI)
                        },
                        latLngToXY: function (a, b) {
                            var d = Array(2);
                            a = parseFloat(a);
                            b = parseFloat(b);
                            var e;
                            e = Math.floor((b + 180) / 6) + 1;
                            e = this._latLngToUTMXY(this.degToRad(a), this.degToRad(b), e, d);
                            hemisphere = 0 > a ? "S" : "N";
                            return {
                                X: d[0],
                                Y: d[1],
                                zone: e,
                                hemisphere: hemisphere
                            }
                        },
                        XYToLatLng: function (a, b, d, e) {
                            var c = Array(2);
                            a = parseFloat(a);
                            b = parseFloat(b);
                            d = parseFloat(d);
                            hemi = "S" == e ? !0 : !1;
                            this._UTMXYToLatLng(a, b, d, hemi, c);
                            return {
                                lat: this.radToDeg(c[0]),
                                lng: this.radToDeg(c[1])
                            }
                        },
                        _latLngToUTMXY: function (a, b, d, e) {
                            this._mapLatLngToXY(a, b, this._UTMCentralMeridian(d), e);
                            e[0] = e[0] * this.UTMScaleFactor + 5E5;
                            e[1] *= this.UTMScaleFactor;
                            0 > e[1] && (e[1] += 1E7);
                            return d
                        },
                        _arcLengthOfMeridian: function (a) {
                            var b, d, e, c, g;
                            g = (this.sm_a - this.sm_b) / (this.sm_a + this.sm_b);
                            b = (this.sm_a + this.sm_b) / 2 * (1 + Math.pow(g, 2) / 4 + Math.pow(g, 4) / 64);
                            d = -3 * g / 2 + 9 * Math.pow(g, 3) / 16 + -3 * Math.pow(g, 5) / 32;
                            e = 15 * Math.pow(g, 2) / 16 + -15 * Math.pow(g, 4) / 32;
                            c = -35 * Math.pow(g, 3) / 48 + 105 * Math.pow(g, 5) / 256;
                            g = 315 *
                        Math.pow(g, 4) / 512;
                            return b * (a + d * Math.sin(2 * a) + e * Math.sin(4 * a) + c * Math.sin(6 * a) + g * Math.sin(8 * a))
                        },
                        _UTMCentralMeridian: function (a) {
                            return this.degToRad(-183 + 6 * a)
                        },
                        _UTMXYToLatLng: function (a, b, d, e, c) {
                            a = (a - 5E5) / this.UTMScaleFactor;
                            e && (b -= 1E7);
                            b /= this.UTMScaleFactor;
                            d = this._UTMCentralMeridian(d);
                            this._mapXYToLatLng(a, b, d, c)
                        },
                        _mapLatLngToXY: function (a, b, d, e) {
                            var c, g, h, j, k, l, m;
                            g = (Math.pow(this.sm_a, 2) - Math.pow(this.sm_b, 2)) / Math.pow(this.sm_b, 2) * Math.pow(Math.cos(a), 2);
                            c = Math.pow(this.sm_a, 2) / (this.sm_b * Math.sqrt(1 +
                        g));
                            h = Math.tan(a);
                            j = h * h;
                            Math.pow(h, 6);
                            b -= d;
                            d = 1 - j + g;
                            k = 5 - j + 9 * g + 4 * g * g;
                            l = 5 - 18 * j + j * j + 14 * g - 58 * j * g;
                            g = 61 - 58 * j + j * j + 270 * g - 330 * j * g;
                            m = 61 - 479 * j + 179 * j * j - j * j * j;
                            j = 1385 - 3111 * j + 543 * j * j - j * j * j;
                            e[0] = c * Math.cos(a) * b + c / 6 * Math.pow(Math.cos(a), 3) * d * Math.pow(b, 3) + c / 120 * Math.pow(Math.cos(a), 5) * l * Math.pow(b, 5) + c / 5040 * Math.pow(Math.cos(a), 7) * m * Math.pow(b, 7);
                            e[1] = this._arcLengthOfMeridian(a) + h / 2 * c * Math.pow(Math.cos(a), 2) * Math.pow(b, 2) + h / 24 * c * Math.pow(Math.cos(a), 4) * k * Math.pow(b, 4) + h / 720 * c * Math.pow(Math.cos(a), 6) * g * Math.pow(b,
                        6) + h / 40320 * c * Math.pow(Math.cos(a), 8) * j * Math.pow(b, 8)
                        },
                        _mapXYToLatLng: function (a, b, d, e) {
                            var c, g, h, j, k, l, m, n, p, r, q, s, u, w, z;
                            b = this._footpointLatitude(b);
                            h = (Math.pow(this.sm_a, 2) - Math.pow(this.sm_b, 2)) / Math.pow(this.sm_b, 2);
                            m = Math.cos(b);
                            h *= Math.pow(m, 2);
                            g = c = Math.pow(this.sm_a, 2) / (this.sm_b * Math.sqrt(1 + h));
                            j = Math.tan(b);
                            k = j * j;
                            l = k * k;
                            n = 1 / (g * m);
                            g *= c;
                            p = j / (2 * g);
                            g *= c;
                            r = 1 / (6 * g * m);
                            g *= c;
                            q = j / (24 * g);
                            g *= c;
                            s = 1 / (120 * g * m);
                            g *= c;
                            u = j / (720 * g);
                            g *= c;
                            m = 1 / (5040 * g * m);
                            c = j / (40320 * g * c);
                            g = -1 - 2 * k - h;
                            j = 5 + 28 * k + 24 * l + 6 * h + 8 * k * h;
                            w = -61 -
                        90 * k - 45 * l - 107 * h + 162 * k * h;
                            z = -61 - 662 * k - 1320 * l - 720 * l * k;
                            l = 1385 + 3633 * k + 4095 * l + 1575 * l * k;
                            e[0] = b + p * (-1 - h) * a * a + q * (5 + 3 * k + 6 * h - 6 * k * h - 3 * h * h - 9 * k * h * h) * Math.pow(a, 4) + u * w * Math.pow(a, 6) + c * l * Math.pow(a, 8);
                            e[1] = d + n * a + r * g * Math.pow(a, 3) + s * j * Math.pow(a, 5) + m * z * Math.pow(a, 7)
                        },
                        _footpointLatitude: function (a) {
                            var b, d, e, c;
                            c = (this.sm_a - this.sm_b) / (this.sm_a + this.sm_b);
                            b = (this.sm_a + this.sm_b) / 2 * (1 + Math.pow(c, 2) / 4 + Math.pow(c, 4) / 64);
                            a /= b;
                            b = 3 * c / 2 + -27 * Math.pow(c, 3) / 32 + 269 * Math.pow(c, 5) / 512;
                            d = 21 * Math.pow(c, 2) / 16 + -55 * Math.pow(c, 4) / 32;
                            e = 151 * Math.pow(c, 3) / 96 + -417 * Math.pow(c, 5) / 128;
                            c = 1097 * Math.pow(c, 4) / 512;
                            return a + b * Math.sin(2 * a) + d * Math.sin(4 * a) + e * Math.sin(6 * a) + c * Math.sin(8 * a)
                        }
                    };
                    H.Map.addInitHook(function () {
                        this.convertGeo = new GeoConverter
                    });
                    AreaConverter = function () { };
                    AreaConverter.prototype = {
                        squareMetreToAcre: function (a) {
                            return a / 4046.856
                        },
                        squareMetreToSquareWa: function (a) {
                            return a / 4
                        },
                        squareMetreToThaiUnit: function (a) {
                            return this._calAreaThaiUnit(this.squareMetreToSquareWa(a))
                        },
                        squareWaToSquareMetre: function (a) {
                            return 4 * a
                        },
                        squareWaToThaiUnit: function (a) {
                            return this._calAreaThaiUnit(a)
                        },
                        _calAreaThaiUnit: function (a) {
                            if (100 > a) return this._changeToThaiUnitFormat({
                                wa: a.toFixed(0)
                            });
                            if (400 > a) return this._changeToThaiUnitFormat({
                                ngan: (a / 100).toFixed(0),
                                wa: (a % 100).toFixed(1)
                            });
                            var b = a / 400 - Math.floor(a / 400);
                            return this._changeToThaiUnitFormat({
                                rai: Math.floor(a / 400),
                                ngan: Math.floor(400 * b / 100),
                                wa: (400 * b % 100).toFixed(1)
                            })
                        },
                        _changeToThaiUnitFormat: function (a) {
                            var b = "",
                        d;
                            for (d in a) {
                                b += " ";
                                if (void 0 !== a[d]) {
                                    var e = "";
                                    "rai" == d ? e = a[d] + " \u0e44\u0e23\u0e48" : "ngan" == d ? e = a[d] + " \u0e07\u0e32\u0e19" : "wa" == d && (e = a[d] + " \u0e15\u0e32\u0e23\u0e32\u0e07\u0e27\u0e32")
                                }
                                b += e
                            }
                            return b.substr(1)
                        }
                    };
                    H.Map.addInitHook(function () {
                        this.convertArea = new AreaConverter
                    });
                    DistanceConverter = function () { };
                    DistanceConverter.prototype = {
                        metreToMiles: function (a) {
                            return 6.21371E-4 * a
                        },
                        milesToMetre: function (a) {
                            return a / 6.21371E-4
                        },
                        convertUnitMetre: function (a) {
                            return 1E3 > a ? a + " m." : a / 1E3 + " km."
                        }
                    };
                    H.Map.addInitHook(function () {
                        this.convertDistance = new DistanceConverter
                    });
                    TimeConverter = function () { };
                    TimeConverter.prototype = {
                        secondToTime: function (a) {
                            a = parseInt(a);
                            var b = parseInt(a / 3600) % 24,
                        d = parseInt(a / 60) % 60;
                            return {
                                second: a % 60,
                                minute: d,
                                hour: b
                            }
                        }
                    };
                    H.Map.addInitHook(function () {
                        this.convertTime = new TimeConverter
                    });
                    H.CalculateArea = L.Class.extend({
                        initialize: function () {
                            this._geoConvert = new GeoConverter
                        },
                        polygon: function (a) {
                            if (2 < a.length) {
                                for (var b = [], d = Math.floor((a[0].lng + 180) / 6) + 1, e = 0; e < a.length; e++) {
                                    var c = [],
                                        g = this._geoConvert.degToRad(a[e].lat),
                                        h = this._geoConvert.degToRad(a[e].lng);
                                    this._geoConvert._latLngToUTMXY(g, h, d, c);
                                    b.push(c)
                                }
                                a = b[0];
                                d = b[b.length - 1];
                                c = a[0] * (b[1][1] - d[1]);
                                e = 1;
                                g = 2;
                                for (h = 0; e <= b.length - 2; e++, g++, h++) c += b[e][0] * (b[g][1] - b[h][1]);
                                c += d[0] * (a[1] - b[b.length - 2][1]);
                                return Math.abs(c / 2) / 1E3
                            }
                        },
                        circle: function (a) {
                            return Math.PI * Math.pow(a, 2)
                        }
                    });
                    H.Map.addInitHook(function () {
                        this.calculateArea = new H.CalculateArea(this)
                    });
                    H.calculateArea = function (a) {
                        return new H.CalculateArea(a)
                    };
                    H.CalculateDistance = L.Class.extend({
                        line: function (a) {
                            if (1 < a.length) {
                                for (var b = 0, d = null, e = 0; e < a.length; e++) e && (b += d.distanceTo(a[e])), d = a[e];
                                return b
                            }
                        }
                    });
                    H.Map.addInitHook(function () {
                        this.calculateDistance = new H.CalculateDistance
                    });
                    H.calculateDistance = function () {
                        return new H.CalculateDistance
                    };
                    H.TrafficInfo = L.Class.extend({
                        options: {
                            speedColor: {
                                green: "#30B100",
                                yellow: "#FA9E25",
                                red: "#990000",
                                black: "#000000"
                            }
                        },
                        line: {
                            trafiicLine: void 0,
                            trafiicLineStroke: void 0
                        },
                        initialize: function (a) {
                            this._map = a;
                            this._proxy = "hobbit/src/proxy.php";
                            this._active = !0;
                            this.checkTrafficEvent(this._active)
                        },
                        checkTrafficEvent: function (a) {
                            if (!0 == a) this._map.on("click", this._onTrafficClick);
                            else this._map.off("click", this._onTrafficClick)
                        },
                        _onTrafficClick: function (a) {
                            _avtiveTraffic = this.active.traffic;
                            if ((_avtiveTraffic.trafficColor ||
                        _avtiveTraffic.trafficGrey) && this.getZoom() >= this._zoomEnable.traffic) this.closePopup(), this.layers.trafficInfo.trafficInfo(a)
                        },
                        trafficInfo: function (a) {
                            this.getTrafficInfo(a, function (b, d) {
                                this._map = d;
                                geojson = JSON.parse(b);
                                data = geojson.features[0];
                                void 0 !== data && "" != data && (value = data.properties, geometry = data.geometry, time = _convert.time(value.time), date = _convert.date(value.date), nameTH = value.r_name_t, nameEN = value.r_name_e, speed = value.speed, line = data.geometry.coordinates.toString().replace(/,/g, " "),
                                latlng = a.latlng, _removeLine(), _addLine(line, _checkSpeedColor(speed)), this._popup = H.popup({
                                    offset: [223, 0],
                                    minWidth: 220,
                                    maxWidth: 320,
                                    closeButton: !1,
                                    transparentButton: !1
                                }).setLatLng(latlng).openOn(this._map), this._popup._wrapper.style.minHeight = "95px", this._infoTraffic = _createContainer(this._popup._contentNode), _removeAllInfo(), _addInfo({
                                    title: "\u0e0a\u0e37\u0e48\u0e2d",
                                    value: nameTH
                                }), _addInfo({
                                    title: "Name",
                                    value: nameEN
                                }), _addInfo({
                                    title: "Speed",
                                    value: speed,
                                    suffix: "km/hr."
                                }), void 0 !== time && void 0 !==
                                date && (timedate = time + " | " + date, _addInfo({
                                    title: "Last Updated",
                                    value: timedate
                                })), _btnCancel())
                            }, this._map);
                            _createContainer = function (a) {
                                return L.DomUtil.create("div", "hb-traffic-info", a)
                            };
                            _btnCancel = function () {
                                var a = document.createElement("button");
                                a.className = "hb-traffic-btn-cancel";
                                a.innerHTML = "Cancel";
                                a.onclick = function () {
                                    _closePopup();
                                    _removeLine()
                                };
                                this._infoTraffic.appendChild(a);
                                return this
                            };
                            _addInfo = function (a) {
                                suffix = a.suffix ? a.suffix : "";
                                var d = document.createElement("span");
                                d.className = "hb-traffic-span";
                                d.innerHTML = a.title + " : " + a.value + " " + suffix;
                                this._infoTraffic.appendChild(d);
                                return this
                            };
                            _removeAllInfo = function () {
                                document.getElementsByClassName("hb-traffic-info")[0].textContent = ""
                            };
                            _addLine = function (a, d) {
                                _color = this._map.layers.trafficInfo.options.speedColor;
                                this.trafiicLineStroke = this._map.layers.trafficInfo.line.trafiicLineStroke = (new L.polyline(_convert.lnglatToLatlng(a), {
                                    color: _color.black,
                                    weight: 13,
                                    opacity: 1
                                })).addTo(this._map);
                                this.trafiicLine = this._map.layers.trafficInfo.line.trafiicLine =
                                (new L.polyline(_convert.lnglatToLatlng(a), {
                                    color: d,
                                    weight: 5,
                                    opacity: 1
                                })).addTo(this._map)
                            };
                            _removeLine = function () {
                                this._map.hasLayer(this.trafiicLineStroke) && this._map.removeLayer(this.trafiicLineStroke);
                                this._map.hasLayer(this.trafiicLine) && this._map.removeLayer(this.trafiicLine)
                            };
                            _closePopup = function () {
                                this._map.closePopup()
                            };
                            _checkSpeedColor = function (a) {
                                a = parseInt(a);
                                color = this._map.layers.trafficInfo.options.speedColor;
                                return 80 < a ? color.green : 40 < a ? color.green : 10 < a ? color.yellow : 0 <= a ? color.red :
                                color.black
                            };
                            _convert = {
                                time: function (a) {
                                    if (void 0 !== a && "" != a) return a = a.split(":"), parseInt(a[0]) + 7 + ":" + a[1]
                                },
                                date: function (a) {
                                    if (void 0 !== a && "" != a) return a = a.split("/"), a[2] + "-" + a[1] + "-" + a[0]
                                },
                                lnglatToLatlng: function (a) {
                                    a = a.split(" ");
                                    for (var d = [], e = [], c = [], g = "", h = 0; h < a.length; h++) 1 == h % 2 ? d.push(a[h]) : e.push(a[h]);
                                    for (a = 0; a < d.length; a++) c.push("[" + d[a] + "," + e[a] + "]");
                                    for (d = 0; d < c.length - 1; d++) g += c[d] + ",";
                                    g += c[c.length - 1];
                                    return eval("[" + g + "]")
                                }
                            }
                        },
                        removeLine: function () {
                            this._map.hasLayer(this.line.trafiicLineStroke) &&
                        this._map.removeLayer(this.line.trafiicLineStroke);
                            this._map.hasLayer(this.line.trafiicLine) && this._map.removeLayer(this.line.trafiicLine)
                        },
                        getTrafficInfo: function (a, b, d) {
                            a = this._getURL(a);
                            a = this._proxy + "?url=" + a;
                            if (window.XMLHttpRequest) httpRequest = new XMLHttpRequest;
                            else if (window.ActiveXObject) try {
                                httpRequest = new ActiveXObject("Msxml2.XMLHTTP")
                            } catch (e) {
                                try {
                                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP")
                                } catch (c) { }
                            }
                            httpRequest.open("POST", a, !0);
                            httpRequest.onreadystatechange = function () {
                                4 ===
                                httpRequest.readyState && 200 === httpRequest.status && b && "function" === typeof b && b(httpRequest.responseText, d)
                            };
                            httpRequest.send()
                        },
                        _getURL: function (a) {
                            var b = this._map.getBounds().toBBoxString(),
                        d = this._map.getSize().x,
                        e = this._map.getSize().y,
                        c = this._map.layerPointToContainerPoint(a.layerPoint).x;
                            a = this._map.layerPointToContainerPoint(a.layerPoint).y;
                            return this._map._serviceData.traffic.URL + "?type=data&x=" + c + "&y=" + a + "&width=" + d + "&height=" + e + "&bbox=" + b
                        }
                    });
                    H.Map.addInitHook(function () {
                        this.layers.trafficInfo = new H.TrafficInfo(this)
                    });
                    H.trafficInfo = function (a) {
                        return new H.TrafficInfo(a)
                    };
                    H.Traffic = L.Class.extend({
                        initialize: function (a) {
                            this._map = a
                        },
                        getTime: function () {
                            var a = new Date,
                        b = [a.getFullYear(), a.getMonth() + 1, a.getDate()],
                        a = [a.getHours(), a.getMinutes(), a.getSeconds()];
                            a[0] = 24 > a[0] ? a[0] : a[0] - 24;
                            for (var d = 1; 3 > d; d++) 10 > a[d] && (a[d] = "0" + a[d]);
                            return b.join("-") + " " + a.join(":")
                        },
                        _checkTypeLayer: function (a, b, d) {
                            if ("tileXYZ" == a) return d.errorTileUrl = "hobbit/images/blank.png", d.format = "image/png", d.minZoom = this._map._zoomEnable.traffic, tLayer = new L.tileLayer(b, d);
                            if ("WMS" == a) return d.timeUpdate &&
                        (d.cql_filter = this.getTime()), void 0 != d.srs && (a = d.srs.replace(":", ""), d.crs = L.CRS[a]), d.type = "image", d.minZoom = this._map._zoomEnable.traffic, tLayer = new L.tileLayer.wms(b, d)
                        }
                    });
                    H.Map.addInitHook(function () {
                        this.layers._traffic = new H.Traffic(this)
                    });
                    H.Traffic1681Color = H.Traffic.extend({
                        responseNotDefined: "Traffic 1681 Color Layer is not found !",
                        responseDisable: "Traffic 1681 Color Layer is disabled !",
                        initialize: function (a) {
                            this._map = a;
                            this._info = this._map.layers.trafficInfo
                        },
                        show: function () {
                            this._checkLayerWithinList() ? this._map._trafficLayers.traffic.enable ? this._hasLayer() || (this._active(!0), this._initialLayer(), this._map.addLayer(this.trafficLayer)) : this._showWarningDisabled() : this._showWarningNotDefined()
                        },
                        hide: function () {
                            this._checkLayerWithinList() &&
                        this._checkLayerHasDefined() ? this._hasLayer() && (this._active(!1), this._info.removeLine(), this._map.closePopup(), this._map.removeLayer(this.trafficLayer)) : this._showWarningNotDefined()
                        },
                        toggle: function () {
                            this._checkLayerWithinList() ? this._map._trafficLayers.traffic.enable ? this._hasLayer() ? (this._active(!1), this._info.removeLine(), this._map.closePopup(), this._map.removeLayer(this.trafficLayer)) : (this._active(!0), this._initialLayer(), this._map.addLayer(this.trafficLayer)) : this._showWarningDisabled() :
                        this._showWarningNotDefined()
                        },
                        _active: function (a) {
                            this._map.active.traffic.trafficColor = a
                        },
                        _hasLayer: function () {
                            return this._map.hasLayer(this.trafficLayer)
                        },
                        _showWarningNotDefined: function () {
                            console.warn(this.responseNotDefined)
                        },
                        _showWarningDisabled: function () {
                            console.warn(this.responseDisable)
                        },
                        _checkLayerWithinList: function () {
                            var a = this._map._trafficLayers.traffic;
                            return void 0 !== a && "" !== a ? !0 : !1
                        },
                        _checkLayerHasDefined: function () {
                            traffic = this.trafficLayer;
                            return void 0 !== traffic && "" !== traffic ? !0 : !1
                        },
                        _initialLayer: function () {
                            var a = this._map._trafficLayers.traffic;
                            this._checkLayerWithinList() && (requestType = a.requestType, URL = a.URL, options = a.options, this.trafficLayer = this._map.layers._traffic._checkTypeLayer(requestType, URL, options))
                        }
                    });
                    H.Map.addInitHook(function () {
                        this.layers.trafficColor = new H.Traffic1681Color(this)
                    });
                    H.traffic1681Color = function (a) {
                        return new H.Traffic1681Color(a)
                    };
                    H.Traffic1681Grey = H.Traffic.extend({
                        responseNotDefined: "Traffic 1681 Grey Layer is not found !",
                        responseDisable: "Traffic 1681 Grey Layer is disabled !",
                        initialize: function (a) {
                            this._map = a;
                            this._info = this._map.layers.trafficInfo
                        },
                        show: function () {
                            this._checkLayerWithinList() ? this._map._trafficLayers.trafficGrey.enable ? this._hasLayer() || (this._active(!0), this._initialLayer(), this._map.addLayer(this.trafficLayer)) : this._showWarningDisabled() : this._showWarningNotDefined()
                        },
                        hide: function () {
                            this._checkLayerWithinList() &&
                        this._checkLayerHasDefined() ? this._hasLayer() && (this._active(!1), this._info.removeLine(), this._map.closePopup(), this._map.removeLayer(this.trafficLayer)) : this._showWarningNotDefined()
                        },
                        toggle: function () {
                            this._checkLayerWithinList() ? this._map._trafficLayers.trafficGrey.enable ? this._hasLayer() ? (this._active(!1), this._info.removeLine(), this._map.closePopup(), this._map.removeLayer(this.trafficLayer)) : (this._active(!0), this._initialLayer(), this._map.addLayer(this.trafficLayer)) : this._showWarningDisabled() :
                        this._showWarningNotDefined()
                        },
                        _active: function (a) {
                            this._map.active.traffic.trafficGrey = a
                        },
                        _hasLayer: function () {
                            return this._map.hasLayer(this.trafficLayer)
                        },
                        _showWarningNotDefined: function () {
                            console.warn(this.responseNotDefined)
                        },
                        _showWarningDisabled: function () {
                            console.warn(this.responseDisable)
                        },
                        _checkLayerWithinList: function () {
                            var a = this._map._trafficLayers.trafficGrey;
                            return void 0 !== a && "" !== a ? !0 : !1
                        },
                        _checkLayerHasDefined: function () {
                            traffic = this.trafficLayer;
                            return void 0 !== traffic && "" !== traffic ? !0 : !1
                        },
                        _initialLayer: function () {
                            var a = this._map._trafficLayers.trafficGrey;
                            this._checkLayerWithinList() && (requestType = a.requestType, URL = a.URL, options = a.options, this.trafficLayer = this._map.layers._traffic._checkTypeLayer(requestType, URL, options))
                        }
                    });
                    H.Map.addInitHook(function () {
                        this.layers.trafficGrey = new H.Traffic1681Grey(this)
                    });
                    H.traffic1681Grey = function (a) {
                        return new H.Traffic1681Grey(a)
                    };
                    H.TrafficGoogle = H.Traffic.extend({
                        responseNotDefined: "Traffic Google Layer is not found !",
                        responseDisable: "Traffic Google Layer is disabled !",
                        initialize: function (a) {
                            this._map = a
                        },
                        show: function () {
                            this._checkLayerWithinList() ? this._map._trafficLayers.googleTraffic.enable ? this._hasLayer() || (this._active(!0), this._initialLayer(), this._map.addLayer(this.trafficLayer)) : this._showWarningDisabled() : this._showWarningNotDefined()
                        },
                        hide: function () {
                            this._checkLayerWithinList() && this._checkLayerHasDefined() ?
                        this._hasLayer() && (this._active(!1), this._map.removeLayer(this.trafficLayer)) : this._showWarningNotDefined()
                        },
                        toggle: function () {
                            this._checkLayerWithinList() ? this._map._trafficLayers.googleTraffic.enable ? this._hasLayer() ? (this._active(!1), this._map.removeLayer(this.trafficLayer)) : (this._active(!0), this._initialLayer(), this._map.addLayer(this.trafficLayer)) : this._showWarningDisabled() : this._showWarningNotDefined()
                        },
                        _active: function (a) {
                            this._map.active.traffic.trafficGoogle = a
                        },
                        _hasLayer: function () {
                            return this._map.hasLayer(this.trafficLayer)
                        },
                        _showWarningNotDefined: function () {
                            console.warn(this.responseNotDefined)
                        },
                        _showWarningDisabled: function () {
                            console.warn(this.responseDisable)
                        },
                        _checkLayerWithinList: function () {
                            var a = this._map._trafficLayers.googleTraffic;
                            return void 0 !== a && "" !== a ? !0 : !1
                        },
                        _checkLayerHasDefined: function () {
                            var a = this._map._trafficLayers.googleTraffic;
                            return void 0 !== a && "" !== a ? !0 : !1
                        },
                        _initialLayer: function () {
                            var a = this._map._trafficLayers.googleTraffic;
                            this._checkLayerWithinList() && (requestType = a.requestType, URL = a.URL, options =
                        a.options, this.trafficLayer = this._map.layers._traffic._checkTypeLayer(requestType, URL, options))
                        }
                    });
                    H.Map.addInitHook(function () {
                        this.layers.trafficGoogle = new H.TrafficGoogle(this)
                    });
                    H.trafficGoogle = function (a) {
                        return new H.TrafficGoogle(a)
                    };
                    H.Expressway = L.Class.extend({
                        responseNotDefined: "Expressway Layer is not found !",
                        initialize: function (a) {
                            this._map = a
                        },
                        show: function () {
                            if (this._checkLayerWithinList()) {
                                var a = this._map.getLanguage();
                                this._hasLayer() || (this._active(!0), this.expresswayLayer = this._map._returnLayer(this._map._expressWayLayers[a]), this._map.addLayer(this.expresswayLayer))
                            } else this._showWarningNotDefined()
                        },
                        hide: function () {
                            this._checkLayerWithinList() && this._checkLayerHasDefined() ? this._hasLayer() && (this._active(!1), this._map.removeLayer(this.expresswayLayer)) :
                        this._showWarningNotDefined()
                        },
                        toggle: function () {
                            if (this._checkLayerWithinList()) {
                                var a = this._map.getLanguage();
                                this._hasLayer() ? (this._active(!1), this._map.removeLayer(this.expresswayLayer)) : (this._active(!0), this.expresswayLayer = this._map._returnLayer(this._map._expressWayLayers[a]), this._map.addLayer(this.expresswayLayer))
                            } else this._showWarningNotDefined()
                        },
                        _active: function (a) {
                            this._map.active.expressway = a
                        },
                        _hasLayer: function () {
                            return this._map.hasLayer(this.expresswayLayer)
                        },
                        _showWarningNotDefined: function () { },
                        _checkLayerWithinList: function () {
                            expressway = this._map._expressWayLayers;
                            return void 0 !== expressway && "" !== expressway ? !0 : !1
                        },
                        _checkLayerHasDefined: function () {
                            var a = this.expresswayLayer;
                            return void 0 !== a && "" !== a ? !0 : !1
                        }
                    });
                    H.Map.addInitHook(function () { });
                    H.expressway = function (a) {
                        return new H.Expressway(a)
                    };
                    H.Navigation = L.Class.extend({
                        cloudmadeURL: "http://navigation.cloudmade.com/e24e7206415a42f49d4377e019d2ac74/api/0.3/",
                        initialize: function (a) {
                            this._map = a
                        },
                        routing: function (a, b) {
                            this._getRoutingInfo(a, b, function (a, b) {
                                console.log(a);
                                b.hasLayer(this.routingLineStroke) && b.removeLayer(this.routingLineStroke);
                                b.hasLayer(this.routingLine) && b.removeLayer(this.routingLine);
                                routingLineStyle = {
                                    color: "#33FFFF",
                                    weight: 5,
                                    opacity: 1,
                                    clickable: !1
                                };
                                routingLineStrokeStyle = {
                                    color: "#0033CC",
                                    weight: 9,
                                    opacity: 1,
                                    clickable: !1
                                };
                                this.routingLineStroke = (new L.polyline(a.route_geometry, routingLineStrokeStyle)).addTo(b);
                                this.routingLine = (new L.polyline(a.route_geometry, routingLineStyle)).addTo(b)
                            }, this._map)
                        },
                        getRoutingInfo: function (a, b, d) {
                            a = this._getURL(a, b);
                            a = escape(a);
                            $.ajax({
                                url: this._map._serviceData.proxy.URL + "getContent.php?url=" + a + "&dummy=" + Math.random(),
                                dataType: "json",
                                type: "POST",
                                success: function (a) {
                                    d && "function" === typeof d && d(a)
                                }
                            })
                        },
                        _getRoutingInfo: function (a, b, d, e) {
                            a = this._getURL(a, b);
                            a = escape(a);
                            $.ajax({
                                url: this._map._serviceData.proxy.URL +
                                "getContent.php?url=" + a + "&dummy=" + Math.random(),
                                dataType: "json",
                                type: "POST",
                                success: function (a) {
                                    d && "function" === typeof d && d(a, e)
                                }
                            })
                        },
                        _getURL: function (a, b) {
                            var d = new L.latLng(a),
                        e = new L.latLng(b);
                            return this.cloudmadeURL + d.lat + "," + d.lng + "," + e.lat + "," + e.lng + "/car/shortest.js?tId=CloudMade"
                        }
                    });
                    H.Map.addInitHook(function () {
                        this.hNavigation = new H.Navigation(this)
                    });
                    H.navigation = function (a) {
                        return new H.Navigation(a)
                    };
                    H.GetInfo = L.Class.extend({
                        initialize: function (a) {
                            this.id = {
                                all: "",
                                poi: 1,
                                house: 2,
                                river: 3,
                                road: 4,
                                address: 5,
                                areapolice: 6,
                                sealevel: 7,
                                aoi: 8,
                                poiinmall: 9
                            };
                            this.timeoutOfAjax = 1500;
                            this._map = a
                        },
                        _callService: function (a, b, d) {
                            a = {
                                id: this.id[b],
                                jsoncallback: !0,
                                bbox: this._map.getBounds().toBBoxString(),
                                width: this._map.getSize().x,
                                height: this._map.getSize().y,
                                x: this._map.layerPointToContainerPoint(a.layerPoint).x,
                                y: this._map.layerPointToContainerPoint(a.layerPoint).y,
                                lang: this._map.getLanguage(),
                                floor: 1
                            };
                            $.ajax({
                                type: "GET",
                                url: this._map._serviceData.info.URL,
                                data: a,
                                async: !0,
                                jsonpCallback: "jsonCallbackInfo" + this.id[b],
                                contentType: "application/json",
                                dataType: "jsonp",
                                success: function (a) {
                                    d && "function" === typeof d && d(a.info)
                                },
                                timeout: this.timeoutOfAjax
                            })
                        },
                        _checkService: function (a, b, d) {
                            if (!0 == this._map._serviceData.info.enable[b]) return this._callService(a, b, d);
                            console.warn("This API is not available.")
                        },
                        getById: function () { },
                        getAll: function (a, b) {
                            return this._checkService(a, "all", b)
                        },
                        getPOI: function (a, b) {
                            return this._checkService(a,
                        "poi", b)
                        },
                        getHouse: function (a, b) {
                            return this._checkService(a, "house", b)
                        },
                        getRiver: function (a, b) {
                            return this._checkService(a, "river", b)
                        },
                        getRoad: function (a, b) {
                            return this._checkService(a, "road", b)
                        },
                        getAddress: function (a, b) {
                            return this._checkService(a, "address", b)
                        },
                        getAreaPoliceStation: function (a, b) {
                            return this._checkService(a, "areapolice", b)
                        },
                        getSeaLevel: function (a, b) {
                            return this._checkService(a, "sealevel", b)
                        },
                        getAOI: function (a, b) {
                            return this._checkService(a, "aoi", b)
                        },
                        getPOIinMall: function (a, b) {
                            return this._checkService(a,
                        "poiinmall", b)
                        }
                    });
                    H.Map.addInitHook(function () {
                        this.getInfo = new H.GetInfo(this)
                    });
                    H.getInfo = function (a) {
                        return new H.GetInfo(a)
                    };
                    H.Map.include({
                        getBuilding: function (a, b) {
                            return a.type ? this._getData._getBuilding(a, b) : this._getData._getBuildingWithLatLng(a, b)
                        }
                    });
                    H.GetData = L.Class.extend({
                        initialize: function (a) {
                            this._map = a;
                            this.timeoutOfAjax = 1500
                        },
                        _getBuildingWithLatLng: function (a, b) {
                            a = L.latLng(a);
                            var d = a.lat,
                        e = a.lng,
                        c = this._map.getBounds().toBBoxString();
                            this._getResultBuilding(this._map._serviceData.floorplan.URL + "?jsonCallback=true&lat=" + d + "&lng=" + e + "&bbox=" + c, b)
                        },
                        _getBuilding: function (a, b) {
                            console.log(a.type);
                            var d = a.latlng.lat,
                        e = a.latlng.lng,
                        c = this._map.getBounds().toBBoxString();
                            this._getResultBuilding(this._map._serviceData.floorplan.URL + "?jsonCallback=true&lat=" +
                        d + "&lng=" + e + "&bbox=" + c, b)
                        },
                        _getResultBuilding: function (a, b) {
                            $.ajax({
                                type: "GET",
                                url: a,
                                jsonpCallback: "jsonCallbackBuilding",
                                contentType: "application/json",
                                dataType: "jsonp",
                                success: function (a) {
                                    b && "function" === typeof b && b(a.data[0].building)
                                },
                                timeout: this.timeoutOfAjax
                            })
                        }
                    });
                    H.Map.addInitHook(function () {
                        this._getData = new H.GetData(this)
                    });
                    H.GetNearbyPOI = L.Class.extend({
                        initialize: function (a) {
                            this._map = a
                        },
                        _getProxy: function () {
                            var a = this._map._serviceData;
                            this.proxyUrl = a.proxy.URL;
                            this.proxyCallback = "hobbit_callback.php";
                            this.mallService = {
                                getInfoBalloon: a.mall.hostGetInfoBalloon,
                                getMallFloor: a.mall.getMallFloor,
                                getMallCategory: a.mall.getMallCategory,
                                searchPOI: a.mall.searchPOI,
                                searchMallPOI: a.mall.searchMallPoint
                            }
                        },
                        getDataPOI: function (a, b) {
                            this._getProxy();
                            var d = escape(this._getInputJSON_getPOI(a));
                            $.ajax({
                                url: this.proxyUrl + this.proxyCallback +
                                "?type=poidemo2&url=" + this.mallService.searchPOI + "&json=" + d + "&callback=",
                                type: "POST",
                                async: !0,
                                dataType: "jsonp",
                                contentType: "application/json",
                                jsonpCallback: "jsonCallback_poidemo2",
                                success: function (a) {
                                    b && "function" === typeof b && b(a)
                                }
                            })
                        },
                        getDataMallPOI: function (a, b) {
                            this._getProxy();
                            var d = escape(this._getInputJSON_getMallPOI(a));
                            $.ajax({
                                url: this.proxyUrl + this.proxyCallback + "?type=searchmallpoint2&url=" + this.mallService.searchMallPOI + "&json=" + d + "&callback=",
                                type: "POST",
                                async: !0,
                                dataType: "jsonp",
                                contentType: "application/json",
                                jsonpCallback: "jsonCallback_searchmallpoint2",
                                success: function (a) {
                                    b && "function" === typeof b && b(a)
                                }
                            })
                        },
                        getDataMallFloor: function (a, b) {
                            this._getProxy();
                            var d = escape(this._getInputJSON_getMallFloor(a));
                            $.ajax({
                                url: this.proxyUrl + this.proxyCallback + "?type=mallfloor&url=" + this.mallService.getMallFloor + "&json=" + d + "&callback=",
                                type: "POST",
                                async: !0,
                                dataType: "jsonp",
                                contentType: "application/json",
                                jsonpCallback: "jsonCallback_mallfloor",
                                success: function (a) {
                                    b && "function" === typeof b && b(a)
                                }
                            })
                        },
                        getDataMallCategory: function (a,
                b) {
                            this._getProxy();
                            var d = escape(this._getInputJSON_getMallCategory(a));
                            $.ajax({
                                url: this.proxyUrl + this.proxyCallback + "?type=mallcate&url=" + this.mallService.getMallCategory + "&json=" + d + "&callback=",
                                type: "POST",
                                async: !0,
                                dataType: "jsonp",
                                contentType: "application/json",
                                jsonpCallback: "jsonCallback_mallcate",
                                success: function (a) {
                                    b && "function" === typeof b && b(a)
                                }
                            })
                        },
                        getBalloonInfo: function (a, b) {
                            this._getProxy();
                            var d = this.mallService.getInfoBalloon + "info/" + a.ID + "/" + a.ptype + "/" + a.language.toUpperCase();
                            $.ajax({
                                url: this.proxyUrl +
                                this.proxyCallback + "?pass=1&url=" + d + "&callback=",
                                type: "POST",
                                async: !0,
                                dataType: "jsonp",
                                contentType: "application/json",
                                jsonpCallback: "jsonCallback_inBalloon_1",
                                success: function (a) {
                                    b && "function" === typeof b && b(a.Data)
                                }
                            })
                        },
                        _checkLanguage: function (a) {
                            a = a.toLowerCase();
                            if ("th" == a) return "041E";
                            if ("en" == a) return "0409"
                        },
                        _getInputJSON_getPOI: function (a) {
                            a = {
                                sessionid: "whh4ie55qosg3pe4cuuqwb45",
                                category: "",
                                lat: a.lat,
                                lon: a.lng,
                                distance: a.radius,
                                keyword: "",
                                provinceid: "0",
                                districtid: "0",
                                subdistrictid: "0",
                                topnumber: "500",
                                langId: this._checkLanguage(a.language),
                                jsonp: "1"
                            };
                            return JSON.stringify(a)
                        },
                        _getInputJSON_getMallFloor: function (a) {
                            a = {
                                sessionid: "whh4ie55qosg3pe4cuuqwb45",
                                mallid: a.mallID,
                                langId: this._checkLanguage(a.language),
                                jsonp: "1"
                            };
                            return JSON.stringify(a)
                        },
                        _getInputJSON_getMallCategory: function (a) {
                            a = {
                                sessionid: "whh4ie55qosg3pe4cuuqwb45",
                                pid: a.mallID,
                                langId: this._checkLanguage(a.language),
                                jsonp: "1"
                            };
                            return JSON.stringify(a)
                        },
                        _getInputJSON_getMallPOI: function (a) {
                            a = {
                                sessionid: "whh4ie55qosg3pe4cuuqwb45",
                                category: "",
                                lat: a.lat,
                                lon: a.lng,
                                distance: a.radius,
                                keyword: "",
                                provinceid: "0",
                                districtid: "0",
                                subdistrictid: "0",
                                gmID: a.mallID,
                                floorIDs: a.floorID,
                                topnumber: "500",
                                langId: this._checkLanguage(a.language),
                                jsonp: ""
                            };
                            return JSON.stringify(a)
                        }
                    });
                    H.Map.addInitHook(function () {
                        this.getNearbyPOI = new H.GetNearbyPOI(this)
                    });
                    H.getNearbyPOI = function (a) {
                        return new H.GetNearbyPOI(a)
                    };
                    H.Control.MapSource = H.Control.extend({
                        options: {},
                        initialize: function () {
                            this._identifyMapLayers();
                            this._checkboxes = {};
                            this._chkToggle = {
                                expressway: !0
                            }
                        },
                        onAdd: function (a) {
                            this._map = a;
                            this.mapLayer = this._map._mapLayer;
                            this.mapType = this._map._mapType;
                            this._layers = this._map._basemapList;
                            a = this._map._mapSrcContainer = L.DomUtil.create("div", "hb-mapsource");
                            a.setAttribute("aria-haspopup", !0);
                            var b = L.DomEvent.stopPropagation,
                        d = this._layerContainer = L.DomUtil.create("div", "hb-mapsource-layer-container", a),
                        e = this._typeContainer =
                                L.DomUtil.create("div", "hb-mapsource-type-container", a),
                        c = this._btnMapLayer = this._createButton(d, "hb-mapsource-btn-layer"),
                        g = this._btnMapType = this._createButton(e, "hb-mapsource-btn-view");
                            L.DomEvent.on(c, "dblclick", b).on(g, "dblclick", b);
                            L.Browser.retina && L.DomUtil.addClass(c, "retina");
                            L.DomEvent.on(d, "mouseover", this._onShow, this).on(d, "mouseout", this._hide, this).on(e, "mouseover", this._onShow, this).on(e, "mouseout", this._hide, this);
                            if (L.Browser.touch) L.DomEvent.on(d, "click", L.DomEvent.stop).on(d, "click",
                        this._onShow, this).on(e, "click", L.DomEvent.stop).on(e, "click", this._onShow, this);
                            this._map.on("click", this._hide, this);
                            this._mapLayerList = this._createMapLayerList(d);
                            this._update();
                            this._default(this.mapLayer, this.mapType);
                            return a
                        },
                        iniLayer: function (a, b) {
                            var d = this._map,
                        e = [],
                        c;
                            c = this._layers[a];
                            var g = d._mapLanguage.toUpperCase();
                            this._identifyMapTypes(c.maps);
                            c = c.maps[this._type[b]];
                            for (var h in c) e.push(h);
                            0 > e.indexOf(g) && (g = e[0]);
                            return d._returnLayer({
                                indexMap: a,
                                mapType: b,
                                language: g
                            })
                        },
                        _identifyMapLayers: function () {
                            this._id = [];
                            for (var a in this._layers) this._id.push(a)
                        },
                        _identifyMapTypes: function (a) {
                            this._type = {};
                            for (var b in a) this._type[b] = b
                        },
                        _update: function () {
                            var a, b = this._map._basemapLayer = parseInt(this.mapLayer);
                            a = this._map._basemapType = this.mapType;
                            this.currentLayer && this._map.removeLayer(this.currentLayer);
                            this._map._removeCurrentLayer();
                            a = this.currentLayer = this.iniLayer(b, a);
                            this._map.addLayer(a);
                            this._mapViewList = this._createMapViewList(b, this._typeContainer)
                        },
                        _createButton: function (a, b) {
                            var d = L.DomUtil.create("a",
                        b, a);
                            d.href = "#";
                            this._defaultEvent(d);
                            return d
                        },
                        _createMapLayerList: function (a) {
                            a = L.DomUtil.create("ul", "hb-mapsource-layer", a);
                            for (var b in this._layers) {
                                var d = this._getFirstObject(this._layers[b].maps);
                                void 0 !== d && "" != d && a.appendChild(this._addItemBaseMap(b, this._layers[b].title, d, this._layers[b].icon))
                            }
                            this._defaultEvent(a);
                            return a
                        },
                        _createMapViewList: function (a, b) {
                            this._removeChildItemView(b);
                            var d = L.DomUtil.create("ul", "hb-mapsource-view", b),
                        e = this._layers[a].maps;
                            this._map.getLanguage();
                            for (var c in e) d.appendChild(this._addItemMapType(a,
                        c, c, c));
                            0 == a && d.appendChild(this._addItemToggle({
                                id: "expressway",
                                title: "expressway",
                                icon: "expressway",
                                chk: this._chkToggle.expressway
                            }));
                            this._defaultEvent(d);
                            return d
                        },
                        _addItemBaseMap: function (a, b, d, e) {
                            var c = document.createElement("li"),
                        g = document.createElement("a"),
                        h = document.createElement("div"),
                        j = document.createElement("span");
                            g.href = "#";
                            g.setAttribute("data-type", d);
                            g.setAttribute("data-layer", a);
                            h.className = "hb-icon-maplayer";
                            L.Browser.retina && L.DomUtil.addClass(h, "retina");
                            e && (h.style.backgroundImage =
                        "url(data:image/png;base64," + e + ")");
                            j.innerHTML = b.capitalize();
                            g.appendChild(h);
                            g.appendChild(j);
                            c.appendChild(g);
                            a = L.DomEvent.stopPropagation;
                            L.DomEvent.on(g, "mousedown", a).on(g, "dblclick", a).on(g, "click", L.DomEvent.preventDefault).on(g, "click", this._onClick, this);
                            return c
                        },
                        _addItemMapType: function (a, b, d, e) {
                            var c = document.createElement("li"),
                        g = document.createElement("a"),
                        h = document.createElement("div"),
                        j = document.createElement("span");
                            g.href = "#";
                            g.setAttribute("data-type", d);
                            g.setAttribute("data-layer",
                        a);
                            h.className = "hb-icon-maplayer hb-icon-" + e;
                            L.Browser.retina && L.DomUtil.addClass(h, "retina");
                            j.innerHTML = b.capitalize();
                            g.appendChild(h);
                            g.appendChild(j);
                            c.appendChild(g);
                            a = L.DomEvent.stopPropagation;
                            L.DomEvent.on(g, "mousedown", a).on(g, "dblclick", a).on(g, "click", L.DomEvent.preventDefault).on(g, "click", this._onClick, this);
                            return c
                        },
                        _addItemToggle: function (a) {
                            var b = document.createElement("li"),
                        d = document.createElement("a"),
                        e = document.createElement("div"),
                        c = document.createElement("span"),
                        g = document.createElement("label"),
                        h = document.createElement("input"),
                        j = document.createElement("div");
                            e.className = "hb-icon-maplayer hb-icon-" + a.icon;
                            c.innerHTML = a.title.capitalize();
                            g.className = "hb-switch";
                            h.type = "checkbox";
                            h.className = "hb-switch";
                            h.setAttribute("data-checkbox", a.id);
                            h.checked = a.chk;
                            j.className = "hb-switch";
                            L.Browser.retina && L.DomUtil.addClass(e, "retina");
                            this._checkboxes[a.id] = h;
                            a = L.DomEvent.stopPropagation;
                            L.DomEvent.on(g, "click", a).on(g, "mousedown", a).on(g, "dblclick", a).on(g, "change", this._onExpresswayChange, this);
                            L.DomEvent.on(d, "click", a).on(d, "mousedown", a).on(d, "dblclick", a).on(d, "click", this._onExpresswayClick, this);
                            g.appendChild(h);
                            g.appendChild(j);
                            d.appendChild(e);
                            d.appendChild(c);
                            d.appendChild(g);
                            b.appendChild(d);
                            return b
                        },
                        _onExpresswayChange: function (a) {
                            input = (a.currentTarget || a.target).firstChild;
                            input.checked ? this._map.layers.expressway.show() : this._map.layers.expressway.hide()
                        },
                        _onExpresswayClick: function (a) {
                            a = (a.currentTarget || a.target).lastChild.firstChild;
                            a.checked ? (a.checked = !1, this._map.layers.expressway.hide()) :
                        (a.checked = !0, this._map.layers.expressway.show())
                        },
                        _removeChildItemView: function (a) {
                            a.lastChild && a.lastChild !== this._btnMapType && a.removeChild(a.lastChild)
                        },
                        _onClick: function (a) {
                            a = a.currentTarget;
                            0 == a.getAttribute("data-layer") ? this._chkToggle.expressway && this._map.layers.expressway.show() : this._map.layers.expressway.hide();
                            void 0 !== this._map._basemapLayer && this._map.removeLayer(this._map._basemapLayer);
                            this.mapLayer = this._map._basemapLayer = a.getAttribute("data-layer");
                            this.mapType = this._map._basemapType =
                        a.getAttribute("data-type");
                            this._setIconLayer(this._layers[this.mapLayer].icon);
                            this._setIconType(this.mapType);
                            this._update();
                            this._changeActive(a)
                        },
                        _getFirstObject: function (a) {
                            for (var b in a) return b
                        },
                        _default: function (a, b) {
                            var d = this._typeContainer.childNodes[0].nextElementSibling.childNodes;
                            L.DomUtil.addClass(this._layerContainer.childNodes[0].nextElementSibling.childNodes[a], "active");
                            for (var e = 0; e < d.length; e++) d[e].childNodes[0].getAttribute("data-type") == b && L.DomUtil.addClass(d[e], "active");
                            this._setIconLayer(this._layers[a].icon);
                            this._setIconType(b)
                        },
                        _changeActive: function (a) {
                            var b = a.parentNode.parentNode,
                        d = this._mapViewList,
                        e = b.childNodes;
                            if (b.parentNode === this._layerContainer) {
                                for (b = 0; b < e.length; b++) L.DomUtil.removeClass(e[b], "active");
                                L.DomUtil.addClass(a.parentNode, "active");
                                L.DomUtil.addClass(d.childNodes[0], "active")
                            } else if (b.className == this._mapViewList.className) {
                                a = a.getAttribute("data-type");
                                for (b = 0; b < d.childNodes.length; b++) d.childNodes[b].firstChild.getAttribute("data-type") ==
                                a && L.DomUtil.addClass(d.childNodes[b], "active")
                            }
                        },
                        _setIconLayer: function (a) {
                            this._btnMapLayer.style.backgroundImage = "url(data:image/png;base64," + a + ")"
                        },
                        _setIconType: function (a) {
                            var b = this._btnMapType.className.split(" ")[1];
                            void 0 !== b && L.DomUtil.removeClass(this._btnMapType, b);
                            L.DomUtil.addClass(this._btnMapType, "hb-icon-" + a)
                        },
                        _show: function (a) {
                            L.DomUtil.addClass(a, "show")
                        },
                        _hide: function () {
                            L.DomUtil.removeClass(this._layerContainer, "show");
                            L.DomUtil.removeClass(this._typeContainer, "show")
                        },
                        _onShow: function (a) {
                            a =
                        a.currentTarget || a.target;
                            this._hide();
                            this._show(a)
                        },
                        _defaultEvent: function (a) {
                            var b = L.DomEvent.stopPropagation;
                            L.DomEvent.on(a, "mousedown", b).on(a, "contextmenu", b).on(a, "dblclick", b).on(a, "click", L.DomEvent.preventDefault).on(a, "contextmenu", L.DomEvent.preventDefault);
                            return a
                        }
                    });
                    H.control.mapsource = function (a) {
                        return new H.Control.MapSource(a)
                    };
                    L.Control.Layers.include({
                        onAdd: function (a) {
                            this._initLayout();
                            a.control.customLayers && L.DomUtil.addClass(this._container, "has-customlayers");
                            this._update();
                            a.on("layeradd", this._onLayerChange, this).on("layerremove", this._onLayerChange, this);
                            L.DomUtil.addClass(this._layersLink, "hb-icon hb-icon-layer");
                            return this._container
                        }
                    });
                    H.Control.Layers = L.Control.Layers.extend({});
                    H.Control.CustomLayer = H.Control.Layers.extend({
                        options: {},
                        initialize: function (a) {
                            this._map = a;
                            this._layers = {};
                            this._obj = {};
                            this._lastZIndex = 0;
                            this._handlingClick = !1
                        },
                        onAdd: function (a) {
                            var b = this._layers = this._map._customLayers;
                            return void 0 !== b && "" != b ? (this._initLayout(), this._update(), a.on("layeradd", this._onLayerChange, this).on("layerremove", this._onLayerChange, this), this._container) : this._container = L.DomUtil.create("ul", "hb-control-customlayers")
                        },
                        _initLayout: function () {
                            var a = this._container = L.DomUtil.create("div",
                        "hb-control-customlayers");
                            a.setAttribute("aria-haspopup", !0);
                            if (L.Browser.touch) L.DomEvent.on(a, "click", L.DomEvent.stopPropagation);
                            else L.DomEvent.disableClickPropagation(a).disableScrollPropagation(a);
                            var b = this._form = L.DomUtil.create("div", "hb-control-customlayers-list");
                            if (this.options.collapsed) {
                                if (!L.Browser.android) L.DomEvent.on(a, "mouseover", this._expand, this).on(a, "mouseout", this._collapse, this);
                                var d = this._layersLink = L.DomUtil.create("a", "hb-control-customlayers-toggle", a);
                                d.href = "#";
                                d.title =
                                "Custom Layers";
                                L.DomUtil.addClass(this._layersLink, "hb-icon hb-icon-layer");
                                if (L.Browser.touch) L.DomEvent.on(d, "click", L.DomEvent.stop).on(d, "click", this._expand, this);
                                else L.DomEvent.on(d, "focus", this._expand, this);
                                L.DomEvent.on(b, "click", function () {
                                    setTimeout(L.bind(this._onInputClick, this), 0)
                                }, this);
                                this._map.on("click", this._collapse, this)
                            } else this._expand();
                            this._overlaysList = L.DomUtil.create("ul", "hb-control-customlayers-overlays", b);
                            a.appendChild(b)
                        },
                        _update: function () {
                            if (this._container) {
                                this._overlaysList.innerHTML =
                                "";
                                var a, b;
                                for (a in this._layers) b = {
                                    title: this._layers[a].title,
                                    layer: this._map._returnLayer(this._layers[a].layers),
                                    overlay: !0
                                }, this._addItem(b)
                            }
                        },
                        _addItem: function (a) {
                            var b = document.createElement("li"),
                        d = document.createElement("label"),
                        e, c = document.createElement("div"),
                        g = this._map.hasLayer(a.layer);
                            a.overlay && (e = document.createElement("input"), e.type = "checkbox", e.className = "hb-switch", e.defaultChecked = g);
                            d.className = "hb-switch";
                            c.className = "hb-switch";
                            e.layerId = L.stamp(a.layer);
                            this._obj[e.layerId] =
                        a;
                            L.DomEvent.on(e, "click", this._onInputClick, this);
                            d.appendChild(e);
                            d.appendChild(c);
                            e = document.createElement("span");
                            e.innerHTML = " " + a.title;
                            b.appendChild(e);
                            b.appendChild(d);
                            this._overlaysList.appendChild(b);
                            return b
                        },
                        _onInputClick: function () {
                            var a, b, d, e = this._form.getElementsByTagName("input"),
                        c = e.length;
                            this._handlingClick = !0;
                            for (a = 0; a < c; a++) b = e[a], d = this._obj[b.layerId], b.checked && !this._map.hasLayer(d.layer) ? this._map.addLayer(d.layer) : !b.checked && this._map.hasLayer(d.layer) && this._map.removeLayer(d.layer);
                            this._handlingClick = !1;
                            this._refocusOnMap()
                        },
                        _expand: function () {
                            L.DomUtil.addClass(this._container, "hb-control-customlayers-expanded")
                        },
                        _collapse: function () {
                            this._container.className = this._container.className.replace(" hb-control-customlayers-expanded", "")
                        }
                    });
                    H.control.customLayer = function (a) {
                        return new H.Control.CustomLayer(a)
                    };
                    H.RightclickInfo = L.Class.extend({
                        initialize: function (a) {
                            this._map = a
                        },
                        _fn: function (a) {
                            this.popup = (new H.Popup.Context).setLatLng(a.latlng).openOn(this);
                            this.popup.getData(a, this, this.popup._contentNode)
                        },
                        enable: function () {
                            this._map.on("contextmenu", this._fn)
                        },
                        disable: function () {
                            this._map.closePopup();
                            this._map.off("contextmenu", this._fn)
                        }
                    });
                    H.rightclickInfo = function (a) {
                        return new H.RightclickInfo(a)
                    };
                    H.Control.InDoor = H.Control.extend({
                        options: {},
                        initialize: function () {
                            this._layers = {};
                            this._showing = !1;
                            this._currentId3D = this._currentLocation = void 0
                        },
                        onAdd: function (a) {
                            var b = this._container = L.DomUtil.create("div", "hb-indoor");
                            this._map = a;
                            this._proxyFloorplan = this._map._serviceData.floorplan.URL;
                            this._proxyLayer = this._map._floorLayer.URL;
                            this._optionsFloorplan = this._map._floorLayer.options;
                            this._locationInfo = this._createInfo(b);
                            this._floor = this._createFloor(b);
                            a.on("moveend", this._update, this);
                            return b
                        },
                        getLocation: function () {
                            $.ajax({
                                type: "GET",
                                url: this._proxyFloorplan,
                                context: this,
                                data: this.property,
                                async: !0,
                                jsonpCallback: "jsonCallbackBuilding",
                                contentType: "application/json",
                                dataType: "jsonp",
                                success: function (a) {
                                    if ("" != a.data) {
                                        a = a.data[0].building;
                                        var b = a.nameEN,
                                                d = a.floors;
                                        b !== this._currentLocation && (this._map._current.building.floor = "1");
                                        if (!this._layers[b]) {
                                            var e = this._optionsFloorplan;
                                            e.layers = "Hobbit:BOI_" + this._map._current.building.floor;
                                            e.filter = b;
                                            e = L.tileLayer.wms(this._proxyLayer, e);
                                            this._layers[b] = {
                                                layer: e,
                                                floor: d
                                            }
                                        }
                                        void 0 === this._currentLocation ? (this.showLocation(this._layers[b]), this._currentLocation = b, this._map._current.building.floor = "1", this._map._current.building.floorname = this._findFloorName("1", d), this._changeTitle(b)) : b !== this._currentLocation && (this.hideLocation(this._currentLayer), this.showLocation(this._layers[b]), this._currentLocation = b, this._map._current.building.floor = "1", this._map._current.building.floorname = this._findFloorName("1", d), this._changeTitle(b));
                                        b = a._3D.id3D;
                                        a._3D.is3D &&
                                                this._map.active.threeDimention ? (this._currentId3D = b, this._create3DButton()) : this._clear3DButton();
                                        L.DomUtil.addClass(this._container, "show");
                                        L.DomUtil.addClass(this._container, "in");
                                        this._map._current.building.name = this._currentLocation;
                                        this._showing = !0
                                    } else L.DomUtil.removeClass(this._container, "in"), this._currentLayer && this.hideLocation(this._currentLayer), this._currentLocation = void 0, this._showing = !1
                                }
                            })
                        },
                        showLocation: function (a) {
                            this._currentLayer = a.layer;
                            this._map.addLayer(a.layer);
                            this._clearFloor();
                            this._updateFloor(a.floor, this._floor)
                        },
                        hideLocation: function (a) {
                            this._map.removeLayer(a);
                            this._clearFloor()
                        },
                        changeFloor: function (a) {
                            var b = a.getAttribute("data-floor"),
                        d = this._currentLocation,
                        e = this._optionsFloorplan;
                            e.layers = "Hobbit:BOI_" + b;
                            e.filter = d;
                            d = L.tileLayer.wms(this._proxyLayer, e);
                            this._map.removeLayer(this._currentLayer);
                            this._map.addLayer(d);
                            L.DomUtil.removeClass(this._currentFloor, "active");
                            L.DomUtil.addClass(a, "active");
                            this._currentLayer = d;
                            this._currentFloor = a;
                            this._map._current.building.floor =
                        b;
                            this._map._current.building.floorname = a.innerHTML
                        },
                        _update: function () {
                            16 < this._map.getZoom() && this._map.control.floorPlan._active ? (this.property = {
                                jsonCallback: !0,
                                lat: this._map.getCenter().lat.toFixed(5),
                                lng: this._map.getCenter().lng.toFixed(5),
                                bbox: this._map.getBounds().toBBoxString()
                            }, this.getLocation()) : this._showing && (L.DomUtil.removeClass(this._container, "in"), this.hideLocation(this._currentLayer), this._currentLocation = void 0, this._showing = !1)
                        },
                        _changeTitle: function (a) {
                            this.location.innerHTML =
                        a
                        },
                        _create3DButton: function () {
                            this._clear3DButton();
                            var a = this._locationInfo,
                        b = L.DomUtil.create("div", "hb-indoor-threedimention", a),
                        b = L.DomUtil.create("a", "hb-indoor-threedimention hb-icon hb-icon-threedimension", b);
                            b.title = "3D";
                            var d = L.DomEvent.stopPropagation;
                            L.DomEvent.on(b, "mousedown", d).on(b, "dblclick", d).on(b, "click", L.DomEvent.preventDefault).on(b, "click", this._on3DClick, this);
                            return a
                        },
                        _clear3DButton: function () {
                            var a = this._locationInfo.childNodes[2];
                            void 0 !== a && a.parentNode.removeChild(a)
                        },
                        _createInfo: function (a) {
                            a = L.DomUtil.create("div", "hb-indoor-location-info", a);
                            var b = L.DomUtil.create("span", null, a);
                            this.location = L.DomUtil.create("h2", "hb-indoor-location-title", a);
                            b.innerHTML = "You're here";
                            return a
                        },
                        _createFloor: function (a) {
                            a = L.DomUtil.create("div", "hb-indoor-location-floor", a);
                            var b = L.DomEvent.stopPropagation;
                            L.DomEvent.on(a, "click", b).on(a, "mousedown", b).on(a, "dblclick", b);
                            return a
                        },
                        _updateFloor: function (a, b) {
                            if (a)
                                for (var d = a.length - 1; 0 <= d; d--) {
                                    var e = a[d].boiFloorLayerName.substring(13);
                                    this._addFloor(a[d].boiFloorName, e, d, b)
                                }
                        },
                        _addFloor: function (a, b, d, e) {
                            d = L.DomUtil.create("a", null, e);
                            d.href = "#";
                            d.innerHTML = a;
                            d.setAttribute("data-floor", b);
                            1 == b && (L.DomUtil.addClass(d, "active"), this._currentFloor = d);
                            a = L.DomEvent.stopPropagation;
                            L.DomEvent.on(d, "mousedown", a).on(d, "dblclick", a).on(d, "click", L.DomEvent.preventDefault).on(d, "click", this._onClick, this);
                            return d
                        },
                        _clearFloor: function () {
                            for (; this._floor.hasChildNodes(); ) this._floor.removeChild(this._floor.lastChild)
                        },
                        _findFloorName: function (a,
                b) {
                            for (var d = 0; d < b.length; d++)
                                if (b[d].boiFloorLayerName == "Hobbit%3ABOI_" + a) return b[d].boiFloorName
                            },
                            _onClick: function (a) {
                                a = a.currentTarget;
                                a !== this._currentFloor && this.changeFloor(a)
                            },
                            _on3DClick: function () {
                                (new H.popup.threeDimension).setLatLng([13.7649040779, 100.538318911]).setName(this._currentLocation).setID(this._currentId3D).openOn(this._map);
                                return this
                            },
                            _onTransitionEnd: function () { }
                        });
                        H.control.indoor = function (a) {
                            return new H.Control.InDoor(a)
                        };
                        H.Control.Locate = H.Control.extend({
                            options: {
                                circleStyle: {
                                    color: "#136aec",
                                    fillColor: "#136aec",
                                    fillOpacity: 0.15,
                                    weight: 1,
                                    opacity: 0.5
                                },
                                markerStyle: {
                                    color: "#136aec",
                                    fillColor: "#136aec",
                                    fillOpacity: 0.7,
                                    weight: 1,
                                    opacity: 0.9,
                                    radius: 4
                                }
                            },
                            initialize: function () {
                                this._active = !1
                            },
                            onAdd: function (a) {
                                var b = this._container = L.DomUtil.create("div", "hb-locate");
                                this._map = a;
                                this._layer = new L.LayerGroup;
                                this._layer.addTo(a);
                                this._locateButton = this._createButton(b, this.toggle, this);
                                return b
                            },
                            _createButton: function (a, b) {
                                var d =
                        L.DomUtil.create("a", "hb-icon hb-icon-currentlocation", a);
                                d.href = "#";
                                d.title = "Locate";
                                var e = L.DomEvent.stopPropagation;
                                L.DomEvent.on(d, "click", e).on(d, "mousedown", e).on(d, "dblclick", e).on(d, "click", L.DomEvent.preventDefault).on(d, "click", b, this);
                                return d
                            },
                            toggle: function () {
                                this._active ? (L.DomUtil.removeClass(this._locateButton, "active"), this._map.stopLocate(), this._removeLayer(), this._active = !1) : (L.DomUtil.addClass(this._locateButton, "active"), this._locate(), this._active = !0)
                            },
                            _locate: function () {
                                this._map.locate({
                                    setView: !0
                                });
                                this._map.on("locationfound", this._onFound, this)
                            },
                            _onFound: function (a) {
                                this._visualizeLocation(a.latlng, a.accuracy / 2)
                            },
                            _visualizeLocation: function (a, b) {
                                L.circle(a, b, this.options.circleStyle).addTo(this._layer);
                                L.circleMarker(a, this.options.markerStyle).addTo(this._layer)
                            },
                            _removeLayer: function () {
                                this._layer.clearLayers();
                                this._map.off("locationfound", this._onFound, this)
                            }
                        });
                        H.control.locate = function (a) {
                            return new H.Control.Locate(a)
                        };
                        H.Control.Position = H.Control.extend({
                            options: {
                                numDigits: 5,
                                numDigits_dms: 2
                            },
                            initialize: function () { },
                            onAdd: function (a) {
                                var b = this._className = "hb-position",
                        d = this._container = L.DomUtil.create("div", b);
                                this._map = a;
                                this.geoConverter = new GeoConverter;
                                L.DomUtil.addClass(this._container, "mobile");
                                L.Browser.mobile || (this.laglngTxt = this._addLabel({
                                    className: b + "-latlng"
                                }, d), this.utmTxt = this._addLabel({
                                    className: b + "-utm"
                                }, d), this.dmsTxt = this._addLabel({
                                    className: b + "-dms"
                                }, d), this._map.on("mousemove", this._mouseMove,
                        this));
                                this.zoomTxt = this._addLabel({
                                    className: b + "-zoom"
                                }, d);
                                this._onZoom();
                                this._map.on("zoomend", this._onZoom, this);
                                return d
                            },
                            _addLabel: function (a, b) {
                                return L.DomUtil.create("span", a.className, b)
                            },
                            _onZoom: function () {
                                var a = this._map.getZoom();
                                this.zoomTxt.innerHTML = "zoom: " + a
                            },
                            _mouseMove: function (a) {
                                var b = this._map.active.position;
                                L.DomUtil.removeClass(this._container, "mobile");
                                this._clear();
                                b.latlng && (this.laglngTxt.innerHTML = this._getLatLng(a));
                                b.utm && (this.utmTxt.innerHTML = this._getUTM(a));
                                b.dms &&
                        (this.dmsTxt.innerHTML = this._getDMS(a));
                                !b.latlng && (!b.utm && !b.dms) && L.DomUtil.addClass(this._container, "mobile")
                            },
                            _clear: function () {
                                this.laglngTxt.innerHTML = "";
                                this.utmTxt.innerHTML = "";
                                this.dmsTxt.innerHTML = ""
                            },
                            _getLatLng: function (a) {
                                var b = L.Util.formatNum(a.latlng.lat, this.options.numDigits);
                                a = L.Util.formatNum(a.latlng.lng, this.options.numDigits);
                                return "Lat: " + b + " Lng: " + a
                            },
                            _getUTM: function (a) {
                                var b = this.geoConverter,
                        d = Array(2),
                        e = a.latlng.lat,
                        c = a.latlng.lng;
                                a = Math.floor((c + 180) / 6) + 1;
                                a = b._latLngToUTMXY(b.degToRad(e),
                        b.degToRad(c), a, d);
                                b = d[0].toFixed(2);
                                d = d[1].toFixed(2);
                                e = "CDEFGHJKLMNPQRSTUVWXX".charAt(Math.floor(e / 8 + 10));
                                return "UTM: " + a + e + " " + b + " " + d
                            },
                            _getDMS: function (a) {
                                var b = 1,
                        d = 1,
                        e = 0,
                        c = 0,
                        e = a.latlng.lat;
                                a = a.latlng.lng;
                                0 > e && (b = -1);
                                e = Math.abs(Math.round(1E6 * e));
                                9E7 < e && (alert(" Degrees Latitude must be in the range of -90. to 90. "), e = 0);
                                0 > a && (d = -1);
                                c = Math.abs(Math.round(1E6 * a));
                                18E7 < c && (alert(" Degrees Longitude must be in the range of -180 to 180. "), c = 0);
                                b = Math.floor(e / 1E6) * b + "\u00b0 " + Math.floor(60 * (e / 1E6 -
                        Math.floor(e / 1E6))) + "' " + (60 * Math.floor(1E5 * (60 * (e / 1E6 - Math.floor(e / 1E6)) - Math.floor(60 * (e / 1E6 - Math.floor(e / 1E6))))) / 1E5).toFixed(this.options.numDigits_dms) + '"';
                                d = Math.floor(c / 1E6) * d + "\u00b0 " + Math.floor(60 * (c / 1E6 - Math.floor(c / 1E6))) + "' " + (60 * Math.floor(1E5 * (60 * (c / 1E6 - Math.floor(c / 1E6)) - Math.floor(60 * (c / 1E6 - Math.floor(c / 1E6))))) / 1E5).toFixed(this.options.numDigits_dms) + '"';
                                return "DMS: " + b + " " + d
                            }
                        });
                        H.control.position = function (a) {
                            return new H.Control.Position(a)
                        };
                        H.Control.Search = H.Control.extend({
                            options: {
                                categorylist: {
                                    entertainment: {
                                        EN: 19,
                                        TH: 3
                                    },
                                    sport: {
                                        EN: 20,
                                        TH: 4
                                    },
                                    bank: {
                                        EN: 21,
                                        TH: 5
                                    },
                                    service: {
                                        EN: 22,
                                        TH: 6
                                    },
                                    government: {
                                        EN: 23,
                                        TH: 7
                                    },
                                    education: {
                                        EN: 24,
                                        TH: 8
                                    },
                                    hotel: {
                                        EN: 25,
                                        TH: 9
                                    },
                                    village: {
                                        EN: 26,
                                        TH: 10
                                    },
                                    shop: {
                                        EN: 27,
                                        TH: 11
                                    },
                                    food: {
                                        EN: 28,
                                        TH: 12
                                    },
                                    travel: {
                                        EN: 29,
                                        TH: 13
                                    },
                                    hospital: {
                                        EN: 30,
                                        TH: 14
                                    },
                                    religion: {
                                        EN: 31,
                                        TH: 15
                                    },
                                    office: {
                                        EN: 32,
                                        TH: 16
                                    },
                                    gas: {
                                        EN: 33,
                                        TH: 17
                                    },
                                    others: {
                                        EN: 34,
                                        TH: 18
                                    }
                                }
                            },
                            initialize: function (a) {
                                this._map = a
                            },
                            onAdd: function (a) {
                                var b = this._container = L.DomUtil.create("div", "hb-search");
                                this._map = a;
                                this._zoclosehost = this._map._serviceData.mall.hostGetInfoBalloon;
                                this._lang = new H.Language;
                                this._searchCategoryContainer = this._createSearchCategory(b);
                                this._searchResultContainer = this._createSearchResultList(b);
                                this._onLoad(b);
                                a = L.DomEvent.stopPropagation;
                                L.DomEvent.on(b, "click", a).on(b, "dblclick", a).on(b, "mousedown", a).on(b, "mousewheel", a).on(b, "MozMousePixelScroll", a);
                                return b
                            },
                            addItem: function (a) {
                                var b = document.createElement("li"),
                        d = document.createElement("a"),
                        e = document.createElement("div"),
                        c = document.createElement("span");
                                d.ID = a.data.ID;
                                d.Lat = a.data.Latitude;
                                d.Lng = a.data.Longitude;
                                d.POIType = a.data.POIType;
                                d.href = "#";
                                e.className = "hb-icon hb-icon-" + a.data.Logo.replace(".png", "");
                                c.innerHTML = a.data.Name;
                                a = L.DomEvent.stop;
                                L.DomEvent.on(d, "click", a).on(d, "mousedown", a).on(d, "dblclick", a).on(d, "click", this._onItemClick, this);
                                d.appendChild(e);
                                d.appendChild(c);
                                b.appendChild(d);
                                this._searchResultContainer.appendChild(b);
                                return b
                            },
                            clearItem: function () {
                                for (var a = this._searchResultContainer; a.hasChildNodes(); ) a.removeChild(a.lastChild);
                                return this
                            },
                            clearMarkers: function () {
                                var a = this._map.control.search.markers;
                                a && this._map.removeLayer(a);
                                return this
                            },
                            clearCircleRadius: function () {
                                var a = this._map.control.search.circle;
                                a && this._map.removeLayer(a);
                                return this
                            },
                            hide: function () {
                                L.DomUtil.removeClass(this._map.control.search._container, "in")
                            },
                            show: function () {
                                L.DomUtil.addClass(this._map.control.search._container, "in")
                            },
                            clearCategory: function () {
                                this._categoryListBox.innerHTML = ""
                            },
                            bindPopupPOIDetails: function (a, b) {
                                var d = L.point(this.options.icon.options.popupAnchor || [0, 0]),
                        d = d.add(L.Popup.prototype.options.offset);
                                b && b.offset && (d = d.add(b.offset));
                                b = L.extend({
                                    offset: d
                                }, b);
                                this._popup = new H.Popup.POIDetails(b, this);
                                this.on("click", this.togglePopup, this).on("remove", this.closePopup, this).on("move", this._movePopup, this);
                                return this
                            },
                            _onLoad: function (a) {
                                a = this._notification = L.DomUtil.create("div", "notification", a);
                                this._loader = L.DomUtil.create("span", "loading hb-icon-spinner", a)
                            },
                            _createSearchCategory: function (a) {
                                var b = L.DomEvent.stop;
                                a = L.DomUtil.create("div", "hb-search-category",
                        a);
                                var d = document.createElement("h2"),
                        e = document.createElement("ul"),
                        c = this._categoryListBox = document.createElement("div"),
                        g = document.createElement("a"),
                        h = document.createElement("a"),
                        j = document.createElement("a");
                                d.innerHTML = this._lang.checkLanguage(this._map._mapLanguage, "placenearby");
                                j.href = "#";
                                j.innerHTML = this._lang.checkLanguage(this._map._mapLanguage, "selectall");
                                j.className = "select-all";
                                e.className = "hb-search-categorylist";
                                c.className = "hb-search-categorybox";
                                g.className = "hb-popup-close-button";
                                h.className = "hb-popup-transparent-button";
                                L.DomEvent.on(g, "click", b).on(g, "mousedown", b).on(g, "dblclick", b).on(g, "click", this._onClosePopup, this);
                                L.DomEvent.on(h, "click", b).on(h, "mousedown", b).on(h, "dblclick", b).on(h, "click", this._onTransparentPopup, this);
                                L.DomEvent.on(j, "click", b).on(j, "mousedown", b).on(j, "dblclick", b).on(j, "click", this._onSelectAll, this);
                                a.appendChild(d);
                                a.appendChild(g);
                                a.appendChild(h);
                                a.appendChild(c);
                                a.appendChild(j);
                                return a
                            },
                            _createCategory: function (a, b) {
                                var d = document.createElement("ul");
                                d.className = "hb-search-categorylist";
                                var e = L.DomEvent.stopPropagation,
                        c = this.options.categorylist,
                        g;
                                for (g in c) {
                                    var h = document.createElement("li"),
                                j = document.createElement("a"),
                                k = document.createElement("div");
                                    j.href = "#";
                                    j.setAttribute("data-type", c[g][b]);
                                    j.title = g.charAt(0).toUpperCase() + g.slice(1);
                                    k.className = "hb-icon hb-icon-" + g;
                                    L.DomEvent.on(j, "click", e).on(j, "mousedown", e).on(j, "dblclick", e).on(j, "click", this._onCategoryClick, this);
                                    j.appendChild(k);
                                    h.appendChild(j);
                                    d.appendChild(h)
                                }
                                return d
                            },
                            _createSearchResultList: function (a) {
                                a = L.DomUtil.create("ul", "hb-search-result", a);
                                var b = L.DomEvent.stopPropagation;
                                L.DomEvent.on(a, "dblclick", b).on(a, "mousedown", b).on(a, "mousewheel", b).on(a, "MozMousePixelScroll", b);
                                return a
                            },
                            _onItemClick: function (a) {
                                a = a.currentTarget || a.target;
                                this._map.nearBy.showPOIDetails(a.ID);
                                this._map.setView([a.Lat, a.Lng], 20)
                            },
                            _onCategoryClick: function (a) {
                                a = a.currentTarget || a.target;
                                this._loading(!0);
                                this._map.nearBy.search(this.circle._latlng, this.circle._mRadius / 1E3, a.getAttribute("data-type"))
                            },
                            _onSelectAll: function () {
                                this._loading(!0);
                                this._map.nearBy.search(this.circle._latlng, this.circle._mRadius / 1E3, "")
                            },
                            _onClosePopup: function () {
                                this.clearItem();
                                this.clearMarkers();
                                this.clearCircleRadius();
                                this.hide();
                                this._map.onSearch = !1
                            },
                            _onTransparentPopup: function () {
                                this._ontransparent ? (L.DomUtil.removeClass(this._container, "transparent"), this._ontransparent = !1) : (L.DomUtil.addClass(this._container, "transparent"), this._ontransparent = !0)
                            },
                            _loading: function (a) {
                                this._notification.style.display = a ? "block" :
                        ""
                            }
                        });
                        H.control.search = function (a) {
                            return new H.Control.Search(a)
                        };
                        H.Control.StreetView = H.Control.extend({
                            options: {},
                            initialize: function () {
                                this._once = this._onfullscreen = this._onhalfscreen_vertical = this._onhalfscreen_horizontal = this._showing = !1
                            },
                            onAdd: function (a) {
                                var b = this._container = L.DomUtil.create("div", "hb-streetview");
                                this._map = a;
                                this.zoomEnableStreetView = this._map._zoomEnable.streetView;
                                this._header = this._createHeader(b);
                                this._streetView = this._createStreetView(b);
                                this._map.on("contextmenu", this._onContextMenu, this);
                                a = L.DomEvent.stop;
                                L.DomEvent.on(b, "mousedown",
                        a).on(b, "dblclick", a).on(b, "mousemove", a);
                                return b
                            },
                            halfScreen_horizontal: function () {
                                this._onhalfscreen_horizontal ? (this._removeClass(this, "halfscreen-horizontal"), this._removeClass(this._map.control.scale, "hasstreetview-horizontal"), this._removeClass(this._map.control.position, "hasstreetview-horizontal"), this._removeClass(this._map.control.menu, "hasstreetview-vertical"), this._removeClass(this._map.control.mapSource, "hasstreetview-vertical"), this._removeClass(this._map.control.customLayers, "hasstreetview-vertical")) :
                        (this._removeClass(this, "fullscreen"), this._removeClass(this, "halfscreen-vertical"), this._removeClass(this._map.control.scale, "hasstreetview-vertical"), this._removeClass(this._map.control.position, "hasstreetview-vertical"), this._removeClass(this._map.control.menu, "hasstreetview-vertical"), this._removeClass(this._map.control.mapSource, "hasstreetview-vertical"), this._removeClass(this._map.control.customLayers, "hasstreetview-vertical"), this._addClass(this, "halfscreen-horizontal"), this._addClass(this._map.control.scale,
                        "hasstreetview-horizontal"), this._addClass(this._map.control.position, "hasstreetview-horizontal"));
                                this._transitionType = "resize";
                                this._toggleType = "halfscreen-horizontal";
                                L.DomEvent.on(this._container, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
                                return this
                            },
                            halfScreen_vertical: function () {
                                this._onhalfscreen_vertical ? (this._removeClass(this, "halfscreen-vertical"), this._removeClass(this._map.control.scale, "hasstreetview-vertical"), this._removeClass(this._map.control.position, "hasstreetview-vertical"),
                        this._removeClass(this._map.control.menu, "hasstreetview-vertical"), this._removeClass(this._map.control.mapSource, "hasstreetview-vertical"), this._removeClass(this._map.control.customLayers, "hasstreetview-vertical")) : (this._removeClass(this, "fullscreen"), this._removeClass(this, "halfscreen-horizontal"), this._removeClass(this._map.control.scale, "hasstreetview-horizontal"), this._removeClass(this._map.control.position, "hasstreetview-horizontal"), this._addClass(this, "halfscreen-vertical"), this._addClass(this._map.control.scale,
                        "hasstreetview-vertical"), this._addClass(this._map.control.position, "hasstreetview-vertical"), this._addClass(this._map.control.menu, "hasstreetview-vertical"), this._addClass(this._map.control.mapSource, "hasstreetview-vertical"), this._addClass(this._map.control.customLayers, "hasstreetview-vertical"));
                                this._transitionType = "resize";
                                this._toggleType = "halfscreen-vertical";
                                L.DomEvent.on(this._container, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
                                return this
                            },
                            fullScreen: function () {
                                this._onfullscreen ?
                        this._removeClass(this, "fullscreen") : (this._removeClass(this, "halfscreen-horizontal"), this._removeClass(this, "halfscreen-vertical"), this._removeClass(this._map.control.scale, "hasstreetview-horizontal"), this._removeClass(this._map.control.position, "hasstreetview-horizontal"), this._removeClass(this._map.control.scale, "hasstreetview-vertical"), this._removeClass(this._map.control.position, "hasstreetview-vertical"), this._addClass(this, "fullscreen"));
                                this._transitionType = "resize";
                                this._toggleType = "fullscreen";
                                L.DomEvent.on(this._container, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
                                return this
                            },
                            open: function () {
                                var a = this;
                                this._addClass(this._map.control.menu, "hasstreetview-horizontal");
                                this._addClass(this, "show");
                                setTimeout(function () {
                                    a._addClass(a, "in")
                                }, 24);
                                this._onhalfscreen_horizontal ? (this._addClass(this._map.control.scale, "hasstreetview-horizontal"), this._addClass(this._map.control.position, "hasstreetview-horizontal")) : this._onhalfscreen_vertical && (this._addClass(this._map.control.menu,
                        "hasstreetview-vertical"), this._addClass(this._map.control.mapSource, "hasstreetview-vertical"), this._addClass(this._map.control.customLayers, "hasstreetview-vertical"));
                                this.directionMarker || this._addDirectionMarker();
                                this._showing = !0;
                                return this
                            },
                            close: function () {
                                this._transitionType = "close";
                                this._removeClass(this, "in");
                                L.DomEvent.on(this._container, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
                                return this
                            },
                            show: function () {
                                this._once && (this._streetViewService.getPanoramaByLocation(this.googleMap,
                        50, this._processSVData.bind(this)), this.open());
                                this.visible = !0;
                                return this
                            },
                            hide: function () {
                                this.remove();
                                this.visible = !1;
                                return this
                            },
                            enable: function () {
                                this.show();
                                this._map.active.streetView = !0;
                                return this
                            },
                            disable: function () {
                                this.hide();
                                this._map.active.streetView = !1;
                                return this
                            },
                            remove: function () {
                                this._showing && (this.directionMarker && (this._map.removeLayer(this.directionMarker), this.directionMarker = void 0), this.close());
                                return this
                            },
                            _onContextMenu: function (a) {
                                this._map.getZoom() >= this.zoomEnableStreetView &&
                        this._map.active.streetView ? (a = this.latlng = a.latlng, a = this.googleMap = new google.maps.LatLng(a.lat, a.lng), Function.prototype.bind || (Function.prototype.bind = function (a) {
                            if ("function" !== typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                            var d = Array.prototype.slice.call(arguments, 1),
                                        e = this,
                                        c = function () { }, g = function () {
                                            return e.apply(this instanceof c && a ? this : a, d.concat(Array.prototype.slice.call(arguments)))
                                        };
                            c.prototype = this.prototype;
                            g.prototype = new c;
                            return g
                        }), this.show(), this._streetViewService.getPanoramaByLocation(a, 50, this._processSVData.bind(this))) : this.hide()
                            },
                            _processSVData: function (a, b) {
                                if (b == google.maps.StreetViewStatus.OK) {
                                    var d = this._streetViewPanorama;
                                    d.setPano(a.location.pano);
                                    d.setPov({
                                        heading: 270,
                                        pitch: 0
                                    });
                                    d.setVisible(!0)
                                } else this.directionMarker && (this._map.removeLayer(this.directionMarker), this.directionMarker = void 0), this._showing && this.close()
                            },
                            _createHeader: function (a) {
                                a = L.DomUtil.create("div", "hb-streetview-header", a);
                                var b = L.DomUtil.create("div", "hb-streetview-btn-group", a),
                        d = this._btnHalfScreenHorizontal = L.DomUtil.create("a", "hb-streetview-btn-halfscreen-horizontal hb-icon hb-icon-expand2", b),
                        e = this._btnHalfScreenVertical = L.DomUtil.create("a", "hb-streetview-btn-halfscreen-vertical hb-icon hb-icon-expand2", b),
                        c = this._btnFullScreen = L.DomUtil.create("a", "hb-streetview-btn-fullscreen hb-icon hb-icon-expand", b),
                        b = L.DomUtil.create("a", "hb-streetview-btn-close hb-icon hb-icon-close", b);
                                d.href = "#";
                                e.href = "#";
                                c.href =
                        "#";
                                b.href = "#";
                                var g = L.DomEvent.stop;
                                L.DomEvent.on(b, "click", g).on(b, "click", this.remove, this).on(d, "click", g).on(d, "click", this.halfScreen_horizontal, this).on(e, "click", g).on(e, "click", this.halfScreen_vertical, this).on(c, "click", g).on(c, "click", this.fullScreen, this);
                                return a
                            },
                            _createStreetView: function (a) {
                                a = L.DomUtil.create("div", "hb-streetview-info", a);
                                this._iniGoogleStreetView(a);
                                return a
                            },
                            _iniGoogleStreetView: function (a) {
                                var b = this,
                        d;
                                this._streetViewService = new google.maps.StreetViewService;
                                var e =
                        this._streetViewPanorama = new google.maps.StreetViewPanorama(a);
                                google.maps.event.addListener(e, "pov_changed", function () {
                                    b.visible && (b._showing || (b.open(), b._once = !0), d = b._streetViewPanorama.getPov().heading, b._map.hasLayer(b.directionMarker) && (b.directionMarker.angle = d, b.directionMarker._latlng = b.latlng, b.directionMarker.update()))
                                });
                                google.maps.event.addListener(e, "position_changed", function () {
                                    if (b.visible) {
                                        var a = e.getPosition(),
                                        d = [],
                                        h;
                                        for (h in a) a.hasOwnProperty(h) && "function" !== typeof h && d.push(a[h]);
                                        a = {
                                            lat: d[0],
                                            lng: d[1]
                                        };
                                        b._map.hasLayer(b.directionMarker) && (b.directionMarker._latlng = b.latlng = a, b.directionMarker.update())
                                    }
                                })
                            },
                            _addDirectionMarker: function () {
                                (this.directionMarker = new (L.Marker.extend({
                                    includes: {
                                        update: function () {
                                            if (this._icon) {
                                                var a = this._map.latLngToLayerPoint(this._latlng).round();
                                                this._setPos(a);
                                                this._setAngle(this.angle)
                                            }
                                            return this
                                        },
                                        _initIcon: function () {
                                            var a = this.directionMarker = document.createElement("div"),
                                                b = this._map._panes;
                                            a.className = "hb-streetview-direction";
                                            this._icon =
                                                a;
                                            this.angle = 270;
                                            this._initInteraction();
                                            b.markerPane.appendChild(a)
                                        },
                                        _animateZoom: function (a) {
                                            a = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center);
                                            this._setPos(a);
                                            this._setAngle(this.angle)
                                        },
                                        _setAngle: function (a) {
                                            var b;
                                            b = "" + this._icon.style[L.DomUtil.TRANSFORM];
                                            this._icon.style[L.DomUtil.TRANSFORM] = b + (" rotate(" + a + "deg)")
                                        }
                                    }
                                }))(this.latlng)).addTo(this._map)
                            },
                            _onTransitionEnd: function () {
                                "resize" === this._transitionType && (google.maps.event.trigger(this._streetViewPanorama, "resize"), "halfscreen-horizontal" ===
                        this._toggleType && (this._onhalfscreen_horizontal ? (this._onhalfscreen_horizontal = !1, L.DomUtil.removeClass(this._btnHalfScreenHorizontal, "hb-icon-contract2"), L.DomUtil.addClass(this._btnHalfScreenHorizontal, "hb-icon-expand2")) : (this._onfullscreen = !1, this._onhalfscreen_horizontal = !0, this._onhalfscreen_vertical = !1, L.DomUtil.removeClass(this._btnFullScreen, "hb-icon-contract"), L.DomUtil.removeClass(this._btnHalfScreenHorizontal, "hb-icon-expand2"), L.DomUtil.removeClass(this._btnHalfScreenVertical, "hb-icon-contract2"),
                                L.DomUtil.addClass(this._btnFullScreen, "hb-icon-expand"), L.DomUtil.addClass(this._btnHalfScreenHorizontal, "hb-icon-contract2"))), "halfscreen-vertical" === this._toggleType && (this._onhalfscreen_vertical ? (this._onhalfscreen_vertical = !1, L.DomUtil.removeClass(this._btnHalfScreenVertical, "hb-icon-contract2"), L.DomUtil.addClass(this._btnHalfScreenVertical, "hb-icon-expand2")) : (this._onhalfscreen_horizontal = this._onfullscreen = !1, this._onhalfscreen_vertical = !0, L.DomUtil.removeClass(this._btnFullScreen, "hb-icon-contract"),
                                L.DomUtil.removeClass(this._btnHalfScreenHorizontal, "hb-icon-expand2"), L.DomUtil.removeClass(this._btnHalfScreenHorizontal, "hb-icon-contract2"), L.DomUtil.addClass(this._btnFullScreen, "hb-icon-expand"), L.DomUtil.addClass(this._btnHalfScreenHorizontal, "hb-icon-expand2"), L.DomUtil.addClass(this._btnHalfScreenVertical, "hb-icon-contract2"))), "fullscreen" === this._toggleType && (this._onfullscreen ? (this._onfullscreen = !1, L.DomUtil.removeClass(this._btnFullScreen, "hb-icon-contract"), L.DomUtil.addClass(this._btnFullScreen,
                                "hb-icon-expand")) : (this._onhalfscreen_horizontal = !1, this._onfullscreen = !0, this._onhalfscreen_vertical = !1, L.DomUtil.removeClass(this._btnFullScreen, "hb-icon-expand"), L.DomUtil.removeClass(this._btnHalfScreenHorizontal, "hb-icon-contract2"), L.DomUtil.addClass(this._btnFullScreen, "hb-icon-contract"), L.DomUtil.addClass(this._btnHalfScreenHorizontal, "hb-icon-expand2"))));
                                "close" === this._transitionType && (this._removeClass(this, "show"), this._removeClass(this._map.control.menu, "hasstreetview-horizontal"),
                        this._removeClass(this._map.control.scale, "hasstreetview-horizontal"), this._removeClass(this._map.control.position, "hasstreetview-horizontal"), this._removeClass(this._map.control.menu, "hasstreetview-vertical"), this._removeClass(this._map.control.mapSource, "hasstreetview-vertical"), this._removeClass(this._map.control.customLayers, "hasstreetview-vertical"), this._showing = !1);
                                L.DomEvent.off(this._container, L.DomUtil.TRANSITION_END, this._onTransitionEnd)
                            },
                            _addClass: function (a, b) {
                                a && L.DomUtil.addClass(a._container,
                        b)
                            },
                            _removeClass: function (a, b) {
                                a && L.DomUtil.removeClass(a._container, b)
                            }
                        });
                        H.control.streetView = function (a) {
                            return new H.Control.StreetView(a)
                        };
                        H.Control.MeasureTools = H.Control.extend({
                            options: {
                                popup: {
                                    show: !0
                                },
                                numDigits: 3,
                                firstRadius: 2E3,
                                defaultUnit: {
                                    distance: "km",
                                    area: "km"
                                },
                                textOfUnit: {
                                    distance: {
                                        km: "km.",
                                        miles: "miles"
                                    },
                                    area: {
                                        km: "km\u00b2",
                                        rai: "\u0e44\u0e23\u0e48",
                                        acre: "\u0e40\u0e2d\u0e40\u0e04\u0e2d\u0e23\u0e4c"
                                    }
                                },
                                style: {
                                    line: {
                                        editable: !0,
                                        color: "red",
                                        weight: 5,
                                        opacity: 0.5
                                    },
                                    polygon: {
                                        editable: !0,
                                        color: "red",
                                        fillColor: "yellow",
                                        fillOpacity: 0.4,
                                        weight: 4,
                                        opacity: 0.5
                                    },
                                    circle: {
                                        draggable: !0,
                                        resizable: !0,
                                        color: "red",
                                        fillColor: "yellow",
                                        fillOpacity: 0.4,
                                        weight: 4,
                                        opacity: 0.5
                                    }
                                }
                            },
                            initialize: function (a) {
                                this._map = a;
                                this._numDigits = this.options.numDigits;
                                this._areaCalculater = new H.CalculateArea(this._map);
                                this._distanceCalculater = new H.CalculateDistance;
                                this._distanceConverter = new DistanceConverter;
                                this._areaConverter = new AreaConverter;
                                this._active = {
                                    line: !1,
                                    polygon: !1,
                                    circle: !1
                                };
                                this._value = {
                                    line: void 0,
                                    polygon: void 0,
                                    circle: void 0
                                };
                                this._unit = {
                                    distance: this.options.defaultUnit.distance,
                                    area: this.options.defaultUnit.area
                                };
                                this._line = new L.Polyline([],
                        this.options.style.line);
                                this._line.on("edit", this._update, this);
                                this._line.on("click", function () { });
                                this._polygon = new L.Polygon([], this.options.style.polygon);
                                this._polygon.on("edit", this._update, this);
                                this._polygon.on("click", function () { });
                                this._centerCircle = [];
                                this._circle = new L.Circle(this._centerCircle, this.options.firstRadius, this.options.style.circle);
                                this._circle.on("edit", this._update, this);
                                this._circle.on("click", function () { })
                            },
                            onAdd: function (a) {
                                this._self = this;
                                this._map = a;
                                a = this._container =
                        L.DomUtil.create("div", "hb-measuretools");
                                this._createContainerMeasurement(a);
                                this._createContainerSetting(a);
                                this._default();
                                return a
                            },
                            _createContainerMeasurement: function (a) {
                                this._containerMeasurement = document.createElement("div");
                                this._textUnit = document.createElement("div");
                                this._containerMeasurement.className = "hb-measuretools-drawing";
                                this._textUnit.className = "hb-measuretools-drawing unit";
                                this._btnLine = this._createButton("Line", "hb-measuretools-drawing hb-icon hb-icon-mesLine", this._containerMeasurement,
                        this._fnLine, this);
                                this._btnPolygon = this._createButton("Polygon", "hb-measuretools-drawing hb-icon hb-icon-mesPolygon", this._containerMeasurement, this._fnPolygon, this);
                                this._btnCircle = this._createButton("Circle", "hb-measuretools-drawing hb-icon hb-icon-mesCircle", this._containerMeasurement, this._fnCircle, this);
                                this._btnDelete = this._createButton("Delete", "hb-measuretools-drawing hb-icon hb-icon-mesCancel", this._containerMeasurement, this._fnDelete, this);
                                this._containerMeasurement.appendChild(this._textUnit);
                                a.appendChild(this._containerMeasurement)
                            },
                            _createContainerSetting: function (a) {
                                this._containerSetting = document.createElement("div");
                                this._textSettingDistance = document.createElement("div");
                                this._textSettingArea = document.createElement("div");
                                this._containerSetting.className = "hb-measuretools-setting";
                                this._textSettingDistance.className = "hb-measuretools-setting-distance unit";
                                this._textSettingArea.className = "hb-measuretools-setting-area unit";
                                this._btnSettingDistance = this._createHover("Unit Distance",
                        "hb-measuretools-setting hb-icon hb-icon-mesUnit2", this._containerSetting);
                                this._btnSettingArea = this._createHover("Unit Area", "hb-measuretools-setting hb-icon hb-icon-mesUnit1", this._containerSetting);
                                this._createSettingDistanceList(this._btnSettingDistance);
                                this._createSettingAreaList(this._btnSettingArea);
                                a.appendChild(this._containerSetting)
                            },
                            _createSettingDistanceList: function (a) {
                                var b = this.options.textOfUnit.distance;
                                a = this._settingDistance = L.DomUtil.create("ul", "hb-measuretools-setting-distance",
                        a);
                                for (var d in b) a.appendChild(this._addItem(b[d], {
                                    type: "distance",
                                    unit: d
                                }, null));
                                return a
                            },
                            _createSettingAreaList: function (a) {
                                var b = this.options.textOfUnit.area;
                                a = this._settingArea = L.DomUtil.create("ul", "hb-measuretools-setting-area", a);
                                for (var d in b) a.appendChild(this._addItem(b[d], {
                                    type: "area",
                                    unit: d
                                }, null));
                                return a
                            },
                            _createButton: function (a, b, d, e, c) {
                                b = L.DomUtil.create("a", b, d);
                                b.href = "#";
                                b.title = a;
                                a = L.DomEvent.stopPropagation;
                                L.DomEvent.on(b, "click", a).on(b, "mousedown", a).on(b, "dblclick", a).on(b,
                        "click", L.DomEvent.preventDefault).on(b, "click", e, c);
                                return b
                            },
                            _createHover: function (a, b, d) {
                                b = L.DomUtil.create("a", b, d);
                                b.href = "#";
                                b.title = a;
                                a = L.DomEvent.stopPropagation;
                                L.DomEvent.on(b, "click", a).on(b, "mousedown", a).on(b, "dblclick", a).on(b, "click", L.DomEvent.preventDefault);
                                return b
                            },
                            _addItem: function (a, b) {
                                var d = document.createElement("li"),
                        e = document.createElement("a");
                                document.createElement("div");
                                var c = document.createElement("span");
                                e.href = "#";
                                e.title = a;
                                e.className = "hb-measuretools-setting-" +
                        b.type + " " + b.unit;
                                e.setAttribute("data-type", b.type);
                                e.setAttribute("data-unit", b.unit);
                                c.innerHTML = a;
                                e.appendChild(c);
                                d.appendChild(e);
                                c = L.DomEvent.stopPropagation;
                                L.DomEvent.on(e, "mousedown", c).on(e, "dblclick", c).on(e, "click", L.DomEvent.preventDefault).on(e, "click", this._fnSettingUnit, this);
                                return d
                            },
                            _fnLine: function () {
                                this._active.polygon && this._disablePolygon();
                                this._active.circle && this._disableCircle();
                                this._active.line ? this._disableLine() : this._enableLine()
                            },
                            _fnPolygon: function () {
                                this._active.line &&
                        this._disableLine();
                                this._active.circle && this._disableCircle();
                                this._active.polygon ? this._disablePolygon() : this._enablePolygon()
                            },
                            _fnCircle: function () {
                                this._active.line && this._disableLine();
                                this._active.polygon && this._disablePolygon();
                                this._active.circle ? this._disableCircle() : this._enableCircle()
                            },
                            _fnDelete: function () {
                                this._reset()
                            },
                            _fnSettingUnit: function (a) {
                                var b = a.currentTarget.getAttribute("data-type");
                                a = a.currentTarget.getAttribute("data-unit");
                                ul = document.getElementsByClassName("hb-measuretools-setting-" +
                        b)[0].children;
                                for (var d = 0; d < ul.length; d++) ul[d].classList.remove("active");
                                document.getElementsByClassName("hb-measuretools-setting-" + b + " " + a)[0].parentNode.classList.add("active");
                                "area" == b ? this._unit.area = a : "distance" == b && (this._unit.distance = a);
                                this._update()
                            },
                            _enableLine: function () {
                                this._map.on("click", this._addPointLine, this);
                                this._map.getContainer().style.cursor = "crosshair";
                                L.DomUtil.addClass(this._btnLine, "active");
                                this._measureUnit.show();
                                this._line.editing.enable();
                                this._map.hasLayer(this._line) ||
                        this._map.addLayer(this._line);
                                this._setActiveAll(!1);
                                this._active.line = !0;
                                this._update()
                            },
                            _disableLine: function () {
                                this._map.off("click", this._addPointLine, this);
                                this._map.getContainer().style.cursor = "default";
                                L.DomUtil.removeClass(this._btnLine, "active");
                                this._measureUnit.hide();
                                this._line.editing.disable();
                                this._setActiveAll(!1)
                            },
                            _addPointLine: function (a) {
                                this._line.addLatLng(a.latlng);
                                this._line.editing.updateMarkers();
                                this._line.fire("edit", {})
                            },
                            _enablePolygon: function () {
                                this._map.on("click",
                        this._addPointPolygon, this);
                                this._map.getContainer().style.cursor = "crosshair";
                                L.DomUtil.addClass(this._btnPolygon, "active");
                                this._measureUnit.show();
                                this._polygon.editing.enable();
                                this._map.hasLayer(this._polygon) || this._map.addLayer(this._polygon);
                                this._setActiveAll(!1);
                                this._active.polygon = !0;
                                this._update()
                            },
                            _disablePolygon: function () {
                                this._map.off("click", this._addPointPolygon, this);
                                this._map.getContainer().style.cursor = "default";
                                L.DomUtil.removeClass(this._btnPolygon, "active");
                                this._measureUnit.hide();
                                this._polygon.editing.disable();
                                this._setActiveAll(!1)
                            },
                            _addPointPolygon: function (a) {
                                this._polygon.addLatLng(a.latlng);
                                this._polygon.editing.updateMarkers();
                                this._polygon.fire("edit", {})
                            },
                            _enableCircle: function () {
                                this._map.getContainer().style.cursor = "crosshair";
                                L.DomUtil.addClass(this._btnCircle, "active");
                                this._measureUnit.show();
                                this._circle.on("resize", this._update, this);
                                this._circle.setLatLng(this._map.getCenter());
                                this._circle.dragging.enable();
                                this._circle.resizing.enable();
                                this._map.hasLayer(this._circle) ||
                        this._map.addLayer(this._circle);
                                this._setActiveAll(!1);
                                this._active.circle = !0;
                                this._update()
                            },
                            _disableCircle: function () {
                                this._map.closePopup();
                                this._map.getContainer().style.cursor = "default";
                                L.DomUtil.removeClass(this._btnCircle, "active");
                                this._measureUnit.hide();
                                this._circle.off("resize", this._update, this);
                                this._map.getCenter() === this._circle.getLatLng() && this.options.firstRadius === this._circle.getRadius() && this._map.hasLayer(this._circle) && this._map.removeLayer(this._circle);
                                this._circle.dragging.disable();
                                this._circle.resizing.disable();
                                this._setActiveAll(!1);
                                this._update()
                            },
                            _update: function () {
                                this._active.line && (this._value.line = this._calculate(), this._textUnit.textContent = this._convertDistance(this._value.line), this._line.hbPopup("Distance is " + this._convertDistance(this._value.line)));
                                this._active.polygon && (this._value.polygon = this._calculate(), this._textUnit.textContent = this._convertArea(this._value.polygon), this._polygon.hbPopup("Area of this polygon is " + this._convertArea(this._value.polygon)));
                                this._active.circle && (this._value.circle = this._calculate(), this._textUnit.textContent = this._convertArea(this._value.circle), this._polygon.hbPopup("Area of this circle is " + this._convertArea(this._value.circle)))
                            },
                            _reset: function () {
                                this._map.closePopup();
                                this._map.hasLayer(this._line) && (this._line.setLatLngs([]), this._line.fire("edit", {}), this._line.redraw(), this._disableLine());
                                this._map.hasLayer(this._polygon) && (this._polygon.setLatLngs([]), this._polygon.fire("edit", {}), this._polygon.redraw(), this._disablePolygon());
                                this._map.hasLayer(this._circle) && (this._map.hasLayer(this._circle) && this._map.removeLayer(this._circle), this._circle.fire("edit", {}), this._circle.redraw(), this._disableCircle())
                            },
                            _calculate: function () {
                                if (this._active.line) {
                                    for (var a = this._line.getLatLngs(), b = 0, d = null, e = 0; e < a.length; e++) {
                                        e && (b += d.distanceTo(a[e]));
                                        if (this.options.popup.show && (d = this._line.editing._markers[e])) d.hbPopup(this._convertDistance(b)), d.on("mouseover", d.openPopup, d), d.on("mouseout", d.closePopup, d);
                                        d = a[e]
                                    }
                                    return b
                                }
                                if (this._active.polygon) {
                                    for (var a =
                                this._polygon.getLatLngs(), b = 0, d = a.length, c = [], e = 0; e < d; e++) c.push(a[e]);
                                    2 < c.length && (b = this._areaCalculater.polygon(c));
                                    return b
                                }
                                if (this._active.circle) return a = this._circle.getRadius(), Math.PI * a * a
                            },
                            _convertDistance: function (a) {
                                var b = this._numDigits;
                                if ("km" == this._unit.distance) return 1E3 > a ? a.toFixed(0) + " m." : (a / 1E3).toFixed(b) + " km.";
                                if ("miles" == this._unit.distance) return this._distanceConverter.metreToMiles(a).toFixed(b) + " " + this.options.textOfUnit.distance.miles
                            },
                            _convertArea: function (a) {
                                var b =
                        this._numDigits;
                                if ("km" == this._unit.area) return 1E3 > a ? a.toFixed(0) + " m\u00b2" : this._convertNum((a / 1E3).toFixed(b)) + " km\u00b2";
                                if ("rai" == this._unit.area) return this._convertNumThaiUnit(this._areaConverter.squareMetreToThaiUnit(1E3 * a));
                                if ("acre" == this._unit.area) return this._convertNum(this._areaConverter.squareMetreToAcre(1E3 * a).toFixed(b)) + " " + this.options.textOfUnit.area.acre
                            },
                            _convertNum: function (a) {
                                var b = a.split(".")[0];
                                a = a.split(".")[1];
                                return void 0 !== a ? b.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                        "." + a : b.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            },
                            _convertNumThaiUnit: function (a) {
                                var b = a.split(" ")[0];
                                a = a.split(" ").splice(1, a.length).join(" ");
                                return this._convertNum(b) + " " + a
                            },
                            _measureUnit: {
                                show: function () {
                                    document.getElementsByClassName("hb-measuretools-drawing unit")[0].style.display = "block"
                                },
                                hide: function () {
                                    document.getElementsByClassName("hb-measuretools-drawing unit")[0].style.display = "none"
                                },
                                setValue: function (a) {
                                    document.getElementsByClassName("hb-measuretools-drawing unit")[0].innerHTML =
                                a
                                }
                            },
                            _setActiveAll: function (a) {
                                this._active = {
                                    line: a,
                                    polygon: a,
                                    circle: a,
                                    setting: {
                                        distance: a,
                                        area: a
                                    }
                                }
                            },
                            _default: function () {
                                for (var a = this._settingDistance.childNodes, b = this._settingArea.childNodes, d = 0; d < a.length; d++) a[d].childNodes[0].getAttribute("data-unit") == this._unit.distance && L.DomUtil.addClass(a[d], "active");
                                for (d = 0; d < b.length; d++) b[d].childNodes[0].getAttribute("data-unit") == this._unit.area && L.DomUtil.addClass(b[d], "active")
                            }
                        });
                        H.control.measureTools = function (a) {
                            return new H.Control.MeasureTools(a)
                        };
                        H.Control.Menu = H.Control.extend({
                            options: {
                                language: "th"
                            },
                            initialize: function () {
                                this.mainMenuPosition = 0;
                                this._history = [];
                                this._linkhistory = [];
                                this._inProgress = this._showing = !1;
                                this._checkboxes = {};
                                this._defaultSetting = H.Config.defaultMenuControlSettings
                            },
                            onAdd: function (a) {
                                var b = this,
                        d = this._container = L.DomUtil.create("div", "hb-control-menu");
                                this._map = a;
                                this._trafficLayerList = this._map._trafficLayers;
                                this._chkBoxFn = {
                                    googleTraffic: function (a) {
                                        b._map.toggleTraffic("trafficGoogle", a)
                                    },
                                    traffic: function (a) {
                                        b._map.toggleTraffic("trafficColor",
                                        a)
                                    },
                                    trafficGrey: function (a) {
                                        b._map.toggleTraffic("trafficGrey", a)
                                    },
                                    measureTools: function () {
                                        b._map.toggleControl(b._map.control.measureTools)
                                    },
                                    currentLocation: function () {
                                        b._map.toggleControl(b._map.control.locate)
                                    },
                                    zoom: function () {
                                        b._map.toggleControl(b._map.control.zoom)
                                    },
                                    scale: function () {
                                        b._map.toggleControl(b._map.control.scale)
                                    },
                                    position: function () {
                                        b._map.toggleControl(b._map.control.position)
                                    },
                                    miniMap: function () {
                                        b._map.toggleControl(b._map.control.miniMap)
                                    },
                                    "3dMode": function (a) {
                                        b._map.toggle3D(b._map.control.floorPlan.btnThreedimention,
                                        a)
                                    },
                                    streetView: function () {
                                        b._map.toggleControl(b._map.control.streetView)
                                    },
                                    decimal: function (a) {
                                        b._map.toggleUnit("latlng", a)
                                    },
                                    utm: function (a) {
                                        b._map.toggleUnit("utm", a)
                                    },
                                    degree: function (a) {
                                        b._map.toggleUnit("dms", a)
                                    }
                                };
                                this._btnToggle = this._createToggleMenu(d, this.toggleMenu, this);
                                this._menu = this._createMainMenu(d);
                                this._defaultSetLanguage();
                                this._setConfig();
                                return d
                            },
                            changeTheme: function () {
                                document.getElementById("hb-css-theme").href = "hobbit/css/theme/" + this.id + "/style.css"
                            },
                            changeLanguage: function (a) {
                                a =
                        a.currentTarget;
                                for (var b = a.getAttribute("data-set").toUpperCase(), d = a.parentNode.parentNode.children, e = 0; e < d.length; e++) L.DomUtil.removeClass(d[e].childNodes[0].lastChild, "checked");
                                L.DomUtil.addClass(a.lastChild, "checked");
                                this._self._map.setLanguage(b);
                                this._self._textLanguage.textContent = b
                            },
                            toggleMenu: function () {
                                this._showing ? (L.DomUtil.removeClass(this._container, "open"), L.DomUtil.removeClass(this._btnToggle, "active"), this._showing = !1) : (L.DomUtil.addClass(this._container, "open"), L.DomUtil.addClass(this._btnToggle,
                        "active"), this._showing = !0)
                            },
                            _createToggleMenu: function (a, b, d) {
                                a = L.DomUtil.create("a", "hb-menu-toggle hb-icon-menu", a);
                                a.href = "#";
                                var e = L.DomEvent.stopPropagation;
                                L.DomEvent.on(a, "click", e).on(a, "mousedown", e).on(a, "dblclick", e).on(a, "click", L.DomEvent.preventDefault).on(a, "click", b, d);
                                return a
                            },
                            _createMainMenu: function (a) {
                                a = L.DomUtil.create("div", "hb-menu", a);
                                this._createHeader(a);
                                this.menuContainer = L.DomUtil.create("div", "hb-menu-container", a);
                                this._optionsMenu();
                                this._trafficMenu();
                                this._toolsMenu();
                                this._settingsMenu();
                                this._languageMenu();
                                this._themeMenu();
                                this._flyToMenu();
                                this._coordinateConverterMenu();
                                this._unitMenu();
                                var b = L.DomEvent.stopPropagation;
                                L.DomEvent.on(a, "click", b).on(a, "mousedown", b).on(a, "dblclick", b);
                                return a
                            },
                            _createHeader: function (a) {
                                a = L.DomUtil.create("div", "hb-menu-header", a);
                                var b = this.btnBack = L.DomUtil.create("a", "hb-menu-btnback hb-icon-arrowleft", a);
                                this.headerTitle = L.DomUtil.create("span", "hb-menu-header-title", a);
                                var d = L.DomEvent.stopPropagation;
                                L.DomEvent.on(b,
                        "click", d).on(b, "mousedown", d).on(b, "dblclick", d).on(b, "click", L.DomEvent.preventDefault).on(b, "click", this._onBack, this);
                                return a
                            },
                            _optionsMenu: function () {
                                var a = L.DomUtil.create("ul", "hb-menu-mainmenu", this.menuContainer);
                                a.id = "hb-menu-options";
                                L.DomUtil.addClass(a, "show");
                                this.headerTitle.setAttribute("data-language", "header");
                                this.headerTitle.innerHTML = "Options";
                                this._addItemNxt({
                                    id: "traffic",
                                    title: "Traffic",
                                    icon: "traffic",
                                    datalanguage: "traffic"
                                }, a);
                                this._addItemNxt({
                                    id: "tools",
                                    title: "Tools",
                                    icon: "tools",
                                    datalanguage: "tools"
                                }, a);
                                this._addItemNxt({
                                    id: "settings",
                                    title: "Settings",
                                    icon: "settings",
                                    datalanguage: "settings"
                                }, a);
                                this._addItemNxt({
                                    id: "language",
                                    title: "Language",
                                    icon: "language",
                                    datalanguage: "language"
                                }, a);
                                return a
                            },
                            _trafficMenu: function () {
                                var a = L.DomUtil.create("ul", "hb-menu-s2", this.menuContainer);
                                a.id = "hb-menu-traffic";
                                for (var b in this._trafficLayerList) this._addItemToggle({
                                    id: b,
                                    title: this._trafficLayerList[b].title,
                                    icon: "traffic"
                                }, a);
                                return a
                            },
                            _toolsMenu: function () {
                                var a = L.DomUtil.create("ul",
                        "hb-menu-s2", this.menuContainer);
                                a.id = "hb-menu-tools";
                                this._addItemNxt({
                                    id: "flyto",
                                    title: "Flyto",
                                    icon: "flyto",
                                    datalanguage: "flyto"
                                }, a);
                                this._addItemNxt({
                                    id: "coordinate-converter",
                                    title: "Coordinate Converter",
                                    icon: "convert",
                                    datalanguage: "convert"
                                }, a);
                                this._addItemToggle({
                                    id: "measureTools",
                                    title: "Measure Tools",
                                    icon: "measuretools",
                                    datalanguage: "measuretools"
                                }, a);
                                return a
                            },
                            _settingsMenu: function () {
                                var a = L.DomUtil.create("ul", "hb-menu-s2", this.menuContainer);
                                a.id = "hb-menu-settings";
                                this._addItemToggle({
                                    id: "currentLocation",
                                    title: "Current Location",
                                    icon: "currentlocation",
                                    datalanguage: "currentlocation"
                                }, a);
                                this._addItemToggle({
                                    id: "zoom",
                                    title: "Zoom",
                                    icon: "zoom",
                                    datalanguage: "zoom"
                                }, a);
                                this._addItemToggle({
                                    id: "scale",
                                    title: "Scale",
                                    icon: "scale",
                                    datalanguage: "scale"
                                }, a);
                                this._addItemToggle({
                                    id: "position",
                                    title: "Position",
                                    icon: "position",
                                    datalanguage: "position"
                                }, a);
                                this._addItemToggle({
                                    id: "miniMap",
                                    title: "Mini-Map",
                                    icon: "minimap",
                                    datalanguage: "minimap"
                                }, a);
                                this._addItemToggle({
                                    id: "3dMode",
                                    title: "3D Mode",
                                    icon: "threedimension",
                                    datalanguage: "threedimension"
                                }, a);
                                this._addItemToggle({
                                    id: "streetView",
                                    title: "Street View",
                                    icon: "streetview",
                                    datalanguage: "streetview"
                                }, a);
                                this._addItemNxt({
                                    id: "unit",
                                    title: "Unit",
                                    icon: "unit",
                                    datalanguage: "unit"
                                }, a);
                                return a
                            },
                            _languageMenu: function () {
                                var a = this._menuLanguage = L.DomUtil.create("ul", "hb-menu-s2", this.menuContainer);
                                a.id = "hb-menu-language";
                                this._addItemSelect({
                                    id: "en",
                                    title: "English",
                                    icon: "lang-en",
                                    _self: this,
                                    datalanguage: "lang-en"
                                }, this.changeLanguage, a);
                                this._addItemSelect({
                                    id: "th",
                                    title: "Thai",
                                    icon: "lang-th",
                                    _self: this,
                                    datalanguage: "lang-th"
                                }, this.changeLanguage, a);
                                return a
                            },
                            _themeMenu: function () {
                                var a = L.DomUtil.create("ul", "hb-menu-s2", this.menuContainer);
                                a.id = "hb-menu-theme";
                                this._addItemSelect({
                                    id: "default",
                                    title: "Default",
                                    icon: "theme-default"
                                }, this.changeTheme, a);
                                this._addItemSelect({
                                    id: "zoclose",
                                    title: "Zoclose",
                                    icon: "theme-zoclose"
                                }, this.changeTheme, a);
                                return a
                            },
                            _flyToMenu: function () {
                                var a = L.DomUtil.create("ul", "hb-menu-s2", this.menuContainer);
                                a.id = "hb-menu-flyto";
                                return a
                            },
                            _coordinateConverterMenu: function () {
                                var a = L.DomUtil.create("ul", "hb-menu-s2", this.menuContainer);
                                a.id = "hb-menu-coordinate-converter";
                                var b = document.createElement("form");
                                b.id = "form-coordinate-converter";
                                a.appendChild(b);
                                return a
                            },
                            _unitMenu: function () {
                                var a = L.DomUtil.create("ul", "hb-menu-s3", this.menuContainer),
                        b = this._map.active.position.latlng,
                        d = this._map.active.position.utm,
                        e = this._map.active.position.dms;
                                a.id = "hb-menu-unit";
                                this._addItemToggle({
                                    id: "decimal",
                                    title: "Decimal",
                                    icon: "currentlocation",
                                    chk: b
                                }, a);
                                this._addItemToggle({
                                    id: "utm",
                                    title: "UTM",
                                    icon: "zoom",
                                    chk: d
                                }, a);
                                this._addItemToggle({
                                    id: "degree",
                                    title: "Degree",
                                    icon: "scale",
                                    chk: e
                                }, a);
                                return a
                            },
                            _addItemNxt: function (a, b) {
                                var d = document.createElement("li"),
                        e = document.createElement("a"),
                        c = document.createElement("div"),
                        g = document.createElement("span"),
                        h = document.createElement("div");
                                e.href = "#";
                                e.setAttribute("data-menu", a.id);
                                e.setAttribute("data-transition", "slide-left");
                                c.className = "hb-menu-icon hb-icon-" + a.icon;
                                g.innerHTML = a.title;
                                h.className =
                        "hb-menu-icon hb-icon-arrowright";
                                a.datalanguage && g.setAttribute("data-language", a.datalanguage);
                                L.DomEvent.on(e, "click", L.DomEvent.preventDefault);
                                L.DomEvent.on(e, "click", this._onNxt, this);
                                e.appendChild(c);
                                e.appendChild(g);
                                e.appendChild(h);
                                "language" == a.datalanguage && (c = this._textLanguage = document.createElement("span"), c.className = "hb-menu-span-language", c.innerHTML = this._map.getLanguage(), e.appendChild(c));
                                d.appendChild(e);
                                b.appendChild(d);
                                return d
                            },
                            _addItemToggle: function (a, b) {
                                var d = document.createElement("li"),
                        e = document.createElement("span"),
                        c = document.createElement("div"),
                        g = document.createElement("span"),
                        h = document.createElement("label"),
                        j = document.createElement("input"),
                        k = document.createElement("div");
                                c.className = "hb-menu-icon hb-icon-" + a.icon;
                                g.innerHTML = a.title;
                                h.className = "hb-switch";
                                j.type = "checkbox";
                                j.className = "hb-switch";
                                j.setAttribute("data-checkbox", a.id);
                                k.className = "hb-switch";
                                a.datalanguage && g.setAttribute("data-language", a.datalanguage);
                                void 0 !== a.chk && "" != a.chk && (j.checked = a.chk);
                                L.stamp(a);
                                this._checkboxes[a.id] = j;
                                var l = L.DomEvent.stopPropagation;
                                L.DomEvent.on(j, "click", l).on(j, "mousedown", l).on(j, "dblclick", l).on(j, "change", this._onChkBoxChange, this);
                                h.appendChild(j);
                                h.appendChild(k);
                                e.appendChild(c);
                                e.appendChild(g);
                                e.appendChild(h);
                                d.appendChild(e);
                                b.appendChild(d);
                                return d
                            },
                            _addItemSelect: function (a, b, d) {
                                var e = document.createElement("li"),
                        c = document.createElement("a"),
                        g = document.createElement("div"),
                        h = document.createElement("span"),
                        j = document.createElement("div");
                                c.href = "#";
                                c.setAttribute("data-set",
                        a.id);
                                g.className = "hb-menu-icon hb-icon-" + a.icon;
                                h.innerHTML = a.title;
                                j.className = "hb-menu-icon hb-icon hb-icon-others";
                                var k = L.DomEvent.stopPropagation;
                                L.DomEvent.on(c, "click", k).on(c, "mousedown", k).on(c, "dblclick", k).on(c, "click", L.DomEvent.preventDefault).on(c, "click", b, a);
                                c.appendChild(g);
                                c.appendChild(h);
                                c.appendChild(j);
                                e.appendChild(c);
                                d.appendChild(e);
                                return e
                            },
                            _showbtnBack: function () {
                                L.DomUtil.addClass(this.btnBack, "show")
                            },
                            _hidebtnBack: function () {
                                L.DomUtil.removeClass(this.btnBack, "show")
                            },
                            _setHeaderTitle: function () {
                                var a;
                                a = 0 === this.mainMenuPosition ? H.language[this._map.getLanguage()].options : this._linkhistory[this._linkhistory.length - 1].getElementsByTagName("span")[0].textContent;
                                this.headerTitle.innerHTML = a
                            },
                            _toTitleCase: function (a) {
                                return a.replace(/\w\S*/g, function (a) {
                                    return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase()
                                })
                            },
                            _onNxt: function (a) {
                                a = this.linkTarget = a.currentTarget;
                                var b = this.currentMenuStr = a.getAttribute("data-menu"),
                        d = a.getAttribute("data-transition");
                                this.currentMenu =
                        document.getElementById("hb-menu-" + b);
                                this._linkhistory.push(a);
                                this._history.push(this.currentMenu);
                                "slide-left" === d && this._slideLeft();
                                L.DomUtil.addClass(a, "active")
                            },
                            _onBack: function () {
                                this._slideRight()
                            },
                            _slideLeft: function () {
                                if (!this._inProgress)
                                    if (this._inProgress = !0, L.DomUtil.addClass(this.currentMenu, "show"), this.slideDirection = "left", this.mainMenuPosition -= 100, L.Browser.ie) {
                                        $(this.menuContainer).animate({
                                            left: this.mainMenuPosition + "%"
                                        }, 300);
                                        var a = this;
                                        setTimeout(function () {
                                            a._onTransitionEnd()
                                        },
                                        300)
                                    } else this.menuContainer.style[L.DomUtil.TRANSFORM] = "translate3d(" + this.mainMenuPosition + "%, 0, 0)", L.DomEvent.on(this.menuContainer, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this)
                            },
                            _slideRight: function () {
                                if (0 > this.mainMenuPosition) {
                                    if (!this._inProgress)
                                        if (this._inProgress = !0, this.slideDirection = "right", this.mainMenuPosition += 100, L.Browser.ie) {
                                            $(this.menuContainer).animate({
                                                left: this.mainMenuPosition + "%"
                                            }, 300);
                                            var a = this;
                                            setTimeout(function () {
                                                a._onTransitionEnd()
                                            }, 300)
                                        } else this.menuContainer.style[L.DomUtil.TRANSFORM] =
                                        "translate3d(" + this.mainMenuPosition + "%, 0, 0)", L.DomEvent.on(this.menuContainer, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
                                    0 === this.mainMenuPosition && this._hidebtnBack()
                                }
                            },
                            _onTransitionEnd: function () {
                                L.DomEvent.off(this.menuContainer, L.DomUtil.TRANSITION_END, this._onTransitionEnd);
                                this._inProgress = !1;
                                var a = this._history[this._history.length - 1];
                                "right" === this.slideDirection ? (a.scrollTop = 0, L.DomUtil.removeClass(a, "show"), L.DomUtil.removeClass(this._linkhistory[this._linkhistory.length - 1],
                        "active"), this._linkhistory.pop(), this._history.pop()) : 0 > this.mainMenuPosition && this._showbtnBack();
                                this._setHeaderTitle()
                            },
                            _onChkBoxChange: function (a) {
                                a = a.currentTarget || a.target;
                                var b = a.getAttribute("data-checkbox");
                                if (a.checked) this._chkBoxFn[b](!0);
                                else this._chkBoxFn[b](!1)
                            },
                            _setConfig: function () {
                                var a = this._defaultSetting,
                        b = {
                            currentLocation: this._map.control.locate,
                            position: this._map.control.position,
                            scale: this._map.control.scale,
                            streetView: this._map.control.streetView,
                            zoom: this._map.control.zoom,
                            measureTools: this._map.control.measureTools,
                            miniMap: this._map.control.miniMap,
                            "3dMode": this._map.control.floorPlan.btnThreedimention
                        }, d;
                                for (d in a) a[d] ? (this._checkboxes[d].checked = !0, void 0 !== b[d] && b[d].show()) : (this._checkboxes[d].checked = !1, void 0 !== b[d] && b[d].hide())
                            },
                            toggleLayer: function (a) {
                                console.log(a)
                            },
                            iniLayer: function (a) {
                                console.log(a);
                                new L.TileLayer(tileLayerUrl, options)
                            },
                            _defaultSetLanguage: function () {
                                for (var a = this._menuLanguage.childNodes, b = 0; b < a.length; b++) a[b].childNodes[0].getAttribute("data-set").toUpperCase() ==
                        this._map.getLanguage() && L.DomUtil.addClass(a[b].childNodes[0].lastChild, "checked")
                            }
                        });
                        H.control.menu = function (a) {
                            return new H.Control.Menu(a)
                        };
                        L.Control.MiniMap = L.Control.extend({
                            options: {
                                toggleDisplay: !1,
                                zoomLevelOffset: -5,
                                zoomLevelFixed: !1,
                                zoomAnimation: !1,
                                autoToggleDisplay: !1,
                                width: 272,
                                height: 200,
                                position: "absolute",
                                minimize: !1,
                                aimingRectOptions: {
                                    color: "#ff7800",
                                    weight: 1,
                                    clickable: !1
                                },
                                shadowRectOptions: {
                                    color: "#000000",
                                    weight: 1,
                                    clickable: !1,
                                    opacity: 0,
                                    fillOpacity: 0
                                }
                            },
                            hideText: "Hide MiniMap",
                            showText: "Show MiniMap",
                            initialize: function (a, b) {
                                L.Util.setOptions(this, b);
                                this.options.aimingRectOptions.clickable = !1;
                                this.options.shadowRectOptions.clickable = !1;
                                this._layer = a
                            },
                            onAdd: function (a) {
                                this._mainMap = a;
                                this._container = L.DomUtil.create("div", "leaflet-control-minimap");
                                this._container.style.width = this.options.width + "px";
                                this._container.style.height = this.options.height + "px";
                                this._container.style.position = this.options.position;
                                L.DomEvent.disableClickPropagation(this._container);
                                L.DomEvent.on(this._container, "mousewheel", L.DomEvent.stopPropagation);
                                this._miniMap = new L.Map(this._container, {
                                    attributionControl: !1,
                                    zoomControl: !1,
                                    zoomAnimation: this.options.zoomAnimation,
                                    autoToggleDisplay: this.options.autoToggleDisplay,
                                    touchZoom: !this.options.zoomLevelFixed,
                                    scrollWheelZoom: !this.options.zoomLevelFixed,
                                    doubleClickZoom: !this.options.zoomLevelFixed,
                                    boxZoom: !this.options.zoomLevelFixed,
                                    crs: a.options.crs
                                });
                                this._miniMap.addLayer(this._layer);
                                this._minimized = this._userToggledDisplay = this._miniMapMoving = this._mainMapMoving = !1;
                                this.options.toggleDisplay && this._addToggleButton();
                                this._miniMap.whenReady(L.Util.bind(function () {
                                    this._aimingRect = L.rectangle(this._mainMap.getBounds(),
                                this.options.aimingRectOptions).addTo(this._miniMap);
                                    this._shadowRect = L.rectangle(this._mainMap.getBounds(), this.options.shadowRectOptions).addTo(this._miniMap);
                                    this._mainMap.on("moveend", this._onMainMapMoved, this);
                                    this._mainMap.on("move", this._onMainMapMoving, this);
                                    this._miniMap.on("movestart", this._onMiniMapMoveStarted, this);
                                    this._miniMap.on("move", this._onMiniMapMoving, this);
                                    this._miniMap.on("moveend", this._onMiniMapMoved, this)
                                }, this));
                                return this._container
                            },
                            addTo: function (a) {
                                L.Control.prototype.addTo.call(this,
                        a);
                                this._miniMap.setView(this._mainMap.getCenter(), this._decideZoom(!0));
                                this._setDisplay(this._decideMinimized());
                                this.options.minimize && this._minimize();
                                return this
                            },
                            onRemove: function () {
                                this._mainMap.off("moveend", this._onMainMapMoved, this);
                                this._mainMap.off("move", this._onMainMapMoving, this);
                                this._miniMap.off("moveend", this._onMiniMapMoved, this);
                                this._miniMap.removeLayer(this._layer)
                            },
                            _addToggleButton: function () {
                                this._toggleDisplayButton = this.options.toggleDisplay ? this._createButton("", this.hideText,
                        "leaflet-control-minimap-toggle-display", this._container, this._toggleDisplayButtonClicked, this) : void 0;
                                L.DomUtil.addClass(this._toggleDisplayButton, "hb-icon hb-icon-arrowright")
                            },
                            _createButton: function (a, b, d, e, c, g) {
                                d = L.DomUtil.create("a", d, e);
                                d.innerHTML = a;
                                d.title = b;
                                a = L.DomEvent.stopPropagation;
                                L.DomEvent.on(d, "click", a).on(d, "mousedown", a).on(d, "dblclick", a).on(d, "click", L.DomEvent.preventDefault).on(d, "click", c, g);
                                return d
                            },
                            _toggleDisplayButtonClicked: function () {
                                this._userToggledDisplay = !0;
                                this._minimized ?
                        (this._restore(), this._toggleDisplayButton.title = this.hideText) : (this._minimize(), this._toggleDisplayButton.title = this.showText)
                            },
                            _setDisplay: function (a) {
                                a != this._minimized && (this._minimized ? this._restore() : this._minimize())
                            },
                            _minimize: function () {
                                this.options.toggleDisplay ? (this._container.style.width = "12px", this._container.style.height = "12px", this._toggleDisplayButton.className += " minimized") : this._container.style.display = "none";
                                this._minimized = !0
                            },
                            _restore: function () {
                                this.options.toggleDisplay ?
                        (this._container.style.width = this.options.width + "px", this._container.style.height = this.options.height + "px", this._toggleDisplayButton.className = this._toggleDisplayButton.className.replace(/(?:^|\s)minimized(?!\S)/g, "")) : this._container.style.display = "block";
                                this._minimized = !1
                            },
                            _onMainMapMoved: function () {
                                this._miniMapMoving ? this._miniMapMoving = !1 : (this._mainMapMoving = !0, this._miniMap.setView(this._mainMap.getCenter(), this._decideZoom(!0)), this._setDisplay(this._decideMinimized()));
                                this._aimingRect.setBounds(this._mainMap.getBounds())
                            },
                            _onMainMapMoving: function () {
                                this._aimingRect.setBounds(this._mainMap.getBounds())
                            },
                            _onMiniMapMoveStarted: function () {
                                var a = this._aimingRect.getBounds(),
                        b = this._miniMap.latLngToContainerPoint(a.getSouthWest()),
                        a = this._miniMap.latLngToContainerPoint(a.getNorthEast());
                                this._lastAimingRectPosition = {
                                    sw: b,
                                    ne: a
                                }
                            },
                            _onMiniMapMoving: function () {
                                !this._mainMapMoving && this._lastAimingRectPosition && (this._shadowRect.setBounds(new L.LatLngBounds(this._miniMap.containerPointToLatLng(this._lastAimingRectPosition.sw),
                        this._miniMap.containerPointToLatLng(this._lastAimingRectPosition.ne))), this._shadowRect.setStyle({
                            opacity: 1,
                            fillOpacity: 0.3
                        }))
                            },
                            _onMiniMapMoved: function () {
                                this._mainMapMoving ? this._mainMapMoving = !1 : (this._miniMapMoving = !0, this._mainMap.setView(this._miniMap.getCenter(), this._decideZoom(!1)), this._shadowRect.setStyle({
                                    opacity: 0,
                                    fillOpacity: 0
                                }))
                            },
                            _decideZoom: function (a) {
                                if (this.options.zoomLevelFixed) return a ? this.options.zoomLevelFixed : this._mainMap.getZoom();
                                if (a) return this._mainMap.getZoom() + this.options.zoomLevelOffset;
                                a = this._miniMap.getZoom() - this._mainMap.getZoom();
                                var b = this._miniMap.getZoom() - this.options.zoomLevelOffset;
                                a > this.options.zoomLevelOffset && this._mainMap.getZoom() < this._miniMap.getMinZoom() - this.options.zoomLevelOffset ? this._miniMap.getZoom() > this._lastMiniMapZoom ? (a = this._mainMap.getZoom() + 1, this._miniMap.setZoom(this._miniMap.getZoom() - 1)) : a = this._mainMap.getZoom() : a = b;
                                this._lastMiniMapZoom = this._miniMap.getZoom();
                                return a
                            },
                            _decideMinimized: function () {
                                return this._userToggledDisplay ? this._minimized :
                        this.options.autoToggleDisplay ? this._mainMap.getBounds().contains(this._miniMap.getBounds()) ? !0 : !1 : this._minimized
                            }
                        });
                        L.control.minimap = function (a) {
                            return new L.Control.MiniMap(a)
                        };