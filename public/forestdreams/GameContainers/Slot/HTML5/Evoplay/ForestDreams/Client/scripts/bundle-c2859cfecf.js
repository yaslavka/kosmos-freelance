window.utils && window.utils.canExecute && window.utils.canExecute();
!function r(i, s, o) {
    function a(t, e) {
        if (!s[t]) {
            if (!i[t]) {
                var n = "function" == typeof require && require;
                if (!e && n) return n(t, !0);
                if (l) return l(t, !0);
                throw(e = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND", e
            }
            n = s[t] = {exports: {}}, i[t][0].call(n.exports, function (e) {
                return a(i[t][1][e] || e)
            }, n, n.exports, r, i, s, o)
        }
        return s[t].exports
    }

    for (var l = "function" == typeof require && require, e = 0; e < o.length; e++) a(o[e]);
    return a
}({
    1: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            g = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            i = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/inherits")),
            o = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            a = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function l(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, a.default)(n);
                return e = r ? (e = (0, a.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, o.default)(this, e)
            }
        }

        r = function (e) {
            (0, s.default)(v, e);
            var y = l(v);

            function v(e, t, n, r) {
                (0, g.default)(this, v), (i = y.call(this)).lineConfig = t, i.animation = n, i.segments = [];
                for (var i, s = e.symbolWidth + e.indent, o = e.symbolHeight + e.rowsIndent, a = (i.x = .5 * s, i.y = .5 * o, r.expandValue || (r.expandPercent ? r.expandPercent * s / 100 : 0)), l = 0; l < i.lineConfig.symbols.length - 1; l++) {
                    var u = l * s, c = i.lineConfig.symbols[l] * o, h = (l + 1) * s,
                        f = i.lineConfig.symbols[l + 1] * o, p = Math.sqrt((h - u) * (h - u) + (f - c) * (f - c)) + a,
                        d = (h - u) / p, p = (f - c) / p, m = i.createSegment(), b = Math.atan2(f - c, h - u);
                    m.width = c2d.geom.Point.distance({x: u, y: c}, {
                        x: h,
                        y: f
                    }) + a, m.x = u - d * a * .5, m.y = c - p * a * .5, m.rotation = b
                }
                return i
            }

            return (0, i.default)(v, [{
                key: "animateSegments", value: function (n, e) {
                    var t, r = this;
                    for (t in this.segments) !function (e) {
                        var t = r.segments[e];
                        t.stop(), r.removeChild(t), c2d.Timeout.invoke(function () {
                            r.addChild(t), (t.animation || t).play(r.animation), t.onComplete = function () {
                                return r.removeChild(t)
                            }, t.loop = !1
                        }, e * n)
                    }(t)
                }
            }, {
                key: "createSegment", value: function () {
                    var e = new c2d.display.Animation(this.animation);
                    return e.animation.pivot.x = 0, e.animation.pivot.y = .5, e.animation.anchor && (e.animation.anchor.x = 0, e.animation.anchor.y = .5), this.addChild(e), this.segments.push(e), e
                }
            }]), v
        }(c2d.display.Container);
        n.default = r
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    2: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/inherits")),
            a = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            l = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function u(e, t) {
            var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (!r) {
                if (Array.isArray(e) || (r = function (e, t) {
                    if (e) {
                        if ("string" == typeof e) return c(e, t);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? c(e, t) : void 0
                    }
                }(e)) || t && e && "number" == typeof e.length) return r && (e = r), n = 0, {
                    s: t = function () {
                    }, n: function () {
                        return n >= e.length ? {done: !0} : {done: !1, value: e[n++]}
                    }, e: function (e) {
                        throw e
                    }, f: t
                };
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var i, s = !0, o = !1;
            return {
                s: function () {
                    r = r.call(e)
                }, n: function () {
                    var e = r.next();
                    return s = e.done, e
                }, e: function (e) {
                    o = !0, i = e
                }, f: function () {
                    try {
                        s || null == r.return || r.return()
                    } finally {
                        if (o) throw i
                    }
                }
            }
        }

        function c(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
            return r
        }

        function h(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, l.default)(n);
                return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, a.default)(this, e)
            }
        }

        r = function (e) {
            (0, o.default)(n, e);
            var t = h(n);

            function n() {
                return (0, i.default)(this, n), t.apply(this, arguments)
            }

            return (0, s.default)(n, [{
                key: "onInitialize", value: function () {
                    this._config = this._view._respack.getAsset("config")
                }
            }, {
                key: "initLines", value: function (e) {
                    this._view.initLines(e)
                }
            }, {
                key: "show", value: function (e, t) {
                    this.hide();
                    var n, r = u(e);
                    try {
                        for (r.s(); !(n = r.n()).done;) {
                            var i = n.value;
                            void 0 !== i.idx ? (this._view.createLine(i), this._view.showLine(i.idx, t)) : (this._view.createScatters(i), this._view.showScatters())
                        }
                    } catch (e) {
                        r.e(e)
                    } finally {
                        r.f()
                    }
                }
            }]), n
        }(game.src.Lines.Controller);
        n.default = r
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    3: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/get")),
            a = r(e("@babel/runtime/helpers/inherits")), l = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            u = r(e("@babel/runtime/helpers/getPrototypeOf")), c = r(e("./ChunkLine.js"));

        function h(e, t) {
            var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (!r) {
                if (Array.isArray(e) || (r = function (e, t) {
                    if (e) {
                        if ("string" == typeof e) return f(e, t);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? f(e, t) : void 0
                    }
                }(e)) || t && e && "number" == typeof e.length) return r && (e = r), n = 0, {
                    s: t = function () {
                    }, n: function () {
                        return n >= e.length ? {done: !0} : {done: !1, value: e[n++]}
                    }, e: function (e) {
                        throw e
                    }, f: t
                };
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var i, s = !0, o = !1;
            return {
                s: function () {
                    r = r.call(e)
                }, n: function () {
                    var e = r.next();
                    return s = e.done, e
                }, e: function (e) {
                    o = !0, i = e
                }, f: function () {
                    try {
                        s || null == r.return || r.return()
                    } finally {
                        if (o) throw i
                    }
                }
            }
        }

        function f(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
            return r
        }

        function p(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, u.default)(n);
                return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, l.default)(this, e)
            }
        }

        r = function (e) {
            (0, a.default)(n, e);
            var t = p(n);

            function n() {
                return (0, i.default)(this, n), t.apply(this, arguments)
            }

            return (0, s.default)(n, [{
                key: "onInitialize", value: function () {
                    (0, o.default)((0, u.default)(n.prototype), "onInitialize", this).call(this), this.backConfig = this.config.chunkLines.back, this.foreConfig = this.config.chunkLines.fore
                }
            }, {
                key: "createLine", value: function (e) {
                    var t = e.idx, n = this._getLineConfig(t),
                        r = new c.default(this, n, c2d.animationConfig.create(this.backConfig, this._respack), this.backConfig);
                    return r.id = t, this.foreConfig = "right" == e.winDirection ? this.config.chunkLines.foreRight : this.config.chunkLines.foreLeft, this.foreConfig && (r.impulse = new c.default(this, n, c2d.animationConfig.create(this.foreConfig, this._respack), this.foreConfig), r.impulse.displayGroup = game.displayGroups.FOREGROUND, "right" == e.winDirection && r.impulse.segments.reverse()), this.lines.push(r), r
                }
            }, {
                key: "showLine", value: function (t) {
                    var e = this.lines.find(function (e) {
                        return e.id == t
                    });
                    if (this.labels[t]) {
                        var n, r = h(this.labels[t]);
                        try {
                            for (r.s(); !(n = r.n()).done;) n.value.activate()
                        } catch (e) {
                            r.e(e)
                        } finally {
                            r.f()
                        }
                    }
                    this.backConfig.moveSpeed && e.animateSegments(this.backConfig.moveSpeed), this.foreConfig && this.foreConfig.moveSpeed && e.impulse.animateSegments(this.foreConfig.moveSpeed), this.linesLayer.addChild(e), e.impulse && this.linesLayer.addChild(e.impulse)
                }
            }, {
                key: "hideLine", value: function (t) {
                    var e = this.lines.find(function (e) {
                        return e.id == t
                    });
                    (0, o.default)((0, u.default)(n.prototype), "hideLine", this).call(this, t), e.impulse && e.impulse.parent && e.impulse.parent.removeChild(e.impulse)
                }
            }]), n
        }(game.src.Lines.View);
        n.default = r
    }, {
        "./ChunkLine.js": 1,
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    4: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"), i = r(e("./ChunkLinesView.js")),
            r = r(e("./ChunkLinesController.js"));
        game.src.Lines.View = i.default, game.src.Lines.Controller = r.default
    }, {"./ChunkLinesController.js": 2, "./ChunkLinesView.js": 3, "@babel/runtime/helpers/interopRequireDefault": 46}],
    5: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            o = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            a = r(e("@babel/runtime/helpers/createClass")), l = r(e("@babel/runtime/helpers/get")),
            u = r(e("@babel/runtime/helpers/inherits")), i = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            c = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function h(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, c.default)(n);
                return e = r ? (e = (0, c.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, i.default)(this, e)
            }
        }

        r = function (e) {
            (0, u.default)(s, e);
            var i = h(s);

            function s() {
                var e;
                (0, o.default)(this, s);
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                return (e = i.call.apply(i, [this].concat(n))).animation = null, e.FUN_TRACK = 1, e._skin = "", e
            }

            return (0, a.default)(s, [{
                key: "initialize", value: function () {
                    for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                    (e = (0, l.default)((0, c.default)(s.prototype), "initialize", this)).call.apply(e, [this].concat(n)), this._initAnimation()
                }
            }, {
                key: "_initAnimation", value: function () {
                    var e = this.config.spine, e = new c2d.display.Spine(this._respack.getAsset(e));
                    this._content.addChild(e), this.animation = e
                }
            }, {
                key: "play", value: function (e, t) {
                    return this.animation.state.setAnimation(0, e, t)
                }
            }, {
                key: "playFsIn", value: function () {
                    var e = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : function () {
                    }, n = this.animation.state.setAnimation(0, "fs_in");
                    this.animation.state.addAnimation(0, "idle", !0, 0), n.listener = {
                        complete: function () {
                            e.skin = "fs", t()
                        }
                    }
                }
            }, {
                key: "funAnimation", value: function () {
                    "fs" !== this._skin && (this.dispatch("background_fun"), this.animation.state.setAnimation(this.FUN_TRACK, "event_1"))
                }
            }, {
                key: "runFunIdle", value: function () {
                    var e = this;
                    this.funTimer && this.funAnimation(), this.funTimer = c2d.Timeout.invoke(function () {
                        return e.runFunIdle()
                    }, this.randomDelay)
                }
            }, {
                key: "skin", get: function () {
                    return this._skin
                }, set: function (e) {
                    this._skin = e, this.animation.skin = e, this.animation.skeleton.setToSetupPose()
                }
            }, {
                key: "randomDelay", get: function () {
                    return 3e4 * Math.random() + 6e4
                }
            }]), s
        }(game.components.view);
        (n.default = r).ID = "background", game.registerComponent(r, {})
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    6: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            s = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            o = r(e("@babel/runtime/helpers/createClass")), a = r(e("@babel/runtime/helpers/get")),
            l = r(e("@babel/runtime/helpers/inherits")), i = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            u = r(e("@babel/runtime/helpers/getPrototypeOf")), r = r(e("../background/index.js"));

        function c(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, u.default)(n);
                return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, i.default)(this, e)
            }
        }

        e = function (e) {
            (0, l.default)(i, e);
            var t = c(i);

            function i() {
                return (0, s.default)(this, i), t.apply(this, arguments)
            }

            return (0, o.default)(i, [{
                key: "initialize", value: function () {
                    for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                    (e = (0, a.default)((0, u.default)(i.prototype), "initialize", this)).call.apply(e, [this].concat(n)), this._setMixes()
                }
            }, {
                key: "funAnimation", value: function () {
                    "fs" !== this._skin && (this.dispatch("front_fun"), this.animation.state.setAnimation(0, "event_1"), this.animation.state.addAnimation(0, "idle", !0, 0))
                }
            }, {
                key: "_setMixes", value: function () {
                    this.animation.stateData.setMix("idle", "event_1", .4), this.animation.stateData.setMix("event_1", "idle", .4)
                }
            }, {
                key: "randomDelay", get: function () {
                    return 3e4 * Math.random() + 9e4
                }
            }]), i
        }(r.default);
        (n.default = e).ID = "front", game.registerComponent(e, {})
    }, {
        "../background/index.js": 5,
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    7: [function (e, t, n) {
        "use strict";
        e("./intro/index.js"), e("./spirit/index.js"), e("./sphere/index.js"), e("./background/index.js"), e("./front/index.js"), e("./preroll/index.js")
    }, {
        "./background/index.js": 5,
        "./front/index.js": 6,
        "./intro/index.js": 10,
        "./preroll/index.js": 11,
        "./sphere/index.js": 12,
        "./spirit/index.js": 13
    }],
    8: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        n.default = {PLAY_BUTTON_CLICK: "PLAY_BUTTON_CLICK"}
    }, {}],
    9: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            o = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/createClass"))),
            a = r(e("@babel/runtime/helpers/classCallCheck")), l = r(e("@babel/runtime/helpers/inherits")),
            i = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            s = r(e("@babel/runtime/helpers/getPrototypeOf")), u = r(e("./IntroEvents.js"));

        function c(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, s.default)(n);
                return e = r ? (e = (0, s.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, i.default)(this, e)
            }
        }

        r = function (e) {
            (0, l.default)(s, e);
            var i = c(s);

            function s(e, t) {
                (0, a.default)(this, s), n = i.call(this);
                var n, r = new c2d.display.Spine(e.getAsset(t));
                return n.addChild(r), r.play("introButton_pressed"), r.interactive = r.buttonMode = !n.disable, r.mouseover = function () {
                    r.play("introButton_hover")
                }, r.mouseup = r.touchend = r.mouseout = r.touchleave = r.touchendoutside = function () {
                    r.play("introButton_normal")
                }, r.mousedown = r.touchstart = function () {
                    r.play("introButton_out"), c2d.eventManager.dispatch(u.default.PLAY_BUTTON_CLICK)
                }, n
            }

            return (0, o.default)(s)
        }(c2d.display.Container);
        n.default = r
    }, {
        "./IntroEvents.js": 8,
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    10: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/assertThisInitialized")),
            a = r(e("@babel/runtime/helpers/get")), l = r(e("@babel/runtime/helpers/inherits")),
            u = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            c = r(e("@babel/runtime/helpers/getPrototypeOf")), h = r(e("./PlayButton.js")),
            f = r(e("./IntroEvents.js"));

        function p(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, c.default)(n);
                return e = r ? (e = (0, c.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, u.default)(this, e)
            }
        }

        r = function (e) {
            (0, l.default)(n, e);
            var t = p(n);

            function n() {
                var e;
                return (0, i.default)(this, n), (e = t.apply(this, arguments)).playButton = null, window.INTRO = (0, o.default)(e), e
            }

            return (0, s.default)(n, [{
                key: "onActivate", value: function () {
                    c2d.env.device.mobile() && this.ratio < 2 && this.respack._assets.introVertical_small && (this.config.properties.portrait.spine = "introVertical_small"), (0, a.default)((0, c.default)(n.prototype), "onActivate", this).call(this)
                }
            }, {
                key: "ratio", get: function () {
                    var e = c2d.screenParams;
                    return e.screenHeight / e.screenWidth
                }
            }, {
                key: "onResize", value: function () {
                    (0, a.default)((0, c.default)(n.prototype), "onResize", this).call(this), this.addButtons(), this.addZorders()
                }
            }, {
                key: "addButtons", value: function () {
                    var e = this;
                    this.playButton && (this.playButton.removeFromParent(), this.playButton = null, c2d.eventManager.unsubscribe(f.default.PLAY_BUTTON_CLICK, this._playButtonClick)), this.playButton = new h.default(this._respack, "ui_spin"), this._content.skeleton.findSlot("intro_button_back").currentSprite.addChild(this.playButton), c2d.env.device.desktop() ? this.playButton.y = this.config.playButtonY : c2d.env.device.portrait() ? this.playButton.scale.set(this.config.playButtonPortraitScale) : this.playButton.y = this.config.playButtonLandscapeY, this._playButtonClick = function () {
                        e.playButton.destroy(), e.hide()
                    }, c2d.eventManager.subscribe(f.default.PLAY_BUTTON_CLICK, this._playButtonClick)
                }
            }, {
                key: "addZorders", value: function () {
                    this._content.displayGroup = game.displayGroups.FOREGROUND, this._content.zOrder = 1e3, this.playButton && (this.playButton.displayGroup = game.displayGroups.FOREGROUND, this.playButton.zOrder = 1001)
                }
            }]), n
        }(game.components.intro);
        (n.default = r).ID = "customintro", game.registerComponent(r, {})
    }, {
        "./IntroEvents.js": 8,
        "./PlayButton.js": 9,
        "@babel/runtime/helpers/assertThisInitialized": 39,
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    11: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/get")),
            a = r(e("@babel/runtime/helpers/inherits")), l = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            u = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function c(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, u.default)(n);
                return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, l.default)(this, e)
            }
        }

        r = function (e) {
            (0, a.default)(n, e);
            var t = c(n);

            function n() {
                var e;
                if ((0, i.default)(this, n), e = t.apply(this, arguments), 0 == arguments.length) throw new Error("There are no arguments in preroll constructor!");
                return e.touchStartFunction = null, e.touchEndFunction = null, e.isPlaying = !1, e
            }

            return (0, s.default)(n, [{
                key: "isYaBrowser", get: function () {
                    return 0 < navigator.userAgent.search(/YaBrowser/)
                }
            }, {
                key: "isMsIeBrowser", get: function () {
                    return 0 < window.navigator.userAgent.indexOf("MSIE ") || !!navigator.userAgent.match(/Trident.*rv\:11\./)
                }
            }, {
                key: "onActivate", value: function () {
                    var e = this;
                    (0, o.default)((0, u.default)(n.prototype), "onActivate", this).call(this), this.isPrerollSkipped = this.getLinkedComponent("intro").isIntroSkipped, this.isPrerollSkipped && (this.visible = !1), this.ui = this.getLinkedComponent("ui"), this.inputType = "click", this._hideHandler = function () {
                        return e.hide()
                    }, this._dontShowAgainHandler = function () {
                    }, this._preventHandler = function () {
                    }, this.exitInProgress = !1, this.addMainContent()
                }
            }, {
                key: "addMainContent", value: function () {
                    var e = this;
                    this.isPrerollSkipped || c2d.env.device.uc() || this.isYaBrowser || this.isMsIeBrowser ? this._content.destroy() : (this._videoOverlay = document.createElement("div"), this._videoOverlay.id = "videoOverlay", this._videoOverlay.setAttribute("style", "background-color:#000000; width:100vw; height:100vh; position:fixed; top:0; left:0; visibility: hidden;"), this._videoOverlay.style.cursor = "pointer", this._videoOverlay.addEventListener("scroll", this._preventHandler()), this._video = document.createElement("video"), this._video.setAttribute("src", this.respack.getAsset(this.config.video.nameLandscape)), this._video.setAttribute("style", "width:100%; height:100%;" + (c2d.env.device.desktop() ? " " : "object-fit:contain;")), this._video.setAttribute("playsinline", ""), this._video.onloadedmetadata = function () {
                        return e.onLoaded()
                    }, this._videoOverlay.appendChild(this._video), document.body.appendChild(this._videoOverlay), this.onResize())
                }
            }, {
                key: "onLoaded", value: function () {
                    var e, t = this,
                        n = (this._playButton = document.createElement("div"), this._playButtonStyle = document.createElement("style"), c2d.env.device.desktop() ? "bottom: 4%;" : "bottom: 50%;");
                    this._playButtonStyle.textContent = "#blink { -webkit-animation: blink 2s linear infinite; animation: blink 2s linear infinite;↵}↵@-webkit-keyframes blink { 0% { color: rgba(255, 255, 255, 1); text-shadow: 0px 0px 6px rgba(0, 0, 0, 1); }↵  50% { color: rgba(255, 255, 255, 0); text-shadow: 0px 0px 6px rgba(0, 0, 0, 0); } 100% { color: rgba(255, 255, 255, 1); text-shadow: 0px 0px 6px rgba(0, 0, 0, 0); } } @keyframes blink { 0% { color: rgba(255, 255, 255, 1); text-shadow: 0px 0px 6px rgba(0, 0, 0, 1); } 50% { color: rgba(255, 255, 255, 0); text-shadow: 0px 0px 6px rgba(0, 0, 0, 0); } 100% { color: rgba(255, 255, 255, 1); text-shadow: 0px 0px 6px rgba(0, 0, 0, 1); } }", this._playButton.setAttribute("style", "color: #FFFFFF; position: absolute;" + n + "left: 50%; transform: translate(-50%); margin: auto; text-align: center; font-size: 26px;  text-shadow: 0px 0px 6px rgba(0, 0, 0, 1); font-family: BalsamiqSansBold; font-stretch: ultra-expanded; animation: blink 2s linear infinite; cursor:pointer;"), this.isPlaying || (this._playButton.innerHTML = (c2d.env.device.desktop() ? "CLICK" : "TAP") + " TO PLAY", this._playButton.appendChild(this._playButtonStyle), document.body.appendChild(this._playButton), e = function () {
                        t._content.interactive = !1, t._playButton.removeEventListener(t.inputType, e, {once: !0}), t._toggleClickHandler(), e = function () {
                        }
                    }, this._content.interactive = !0, this._content.buttonMode = !0, this._content.once("click", e), this._playButton.addEventListener(this.inputType, e, {once: !0})), this._toggleClickHandler = function () {
                        return t.toggleClick()
                    }, this._videoOverlay.addEventListener(this.inputType, this._toggleClickHandler)
                }
            }, {
                key: "toggleClick", value: function () {
                    var e = this;
                    this.isPlaying = !0, this._videoOverlay.setAttribute("style", "background-color:#000000; width:100vw; height:100vh; position:fixed; top:0; left:0; visibility: visible;"), this.playPromise = this._video.play(), this._video.muted = !1, this._video.onended = function () {
                        return e.hide()
                    }, this._video.removeAttribute("poster"), this._videoOverlay.removeEventListener(this.inputType, this._toggleClickHandler), this._videoOverlay.style.cursor = "default", this._playButton.setAttribute("style", "color: #FFFFFF; position: absolute; bottom: 4%; left: 50%; transform: translate(-50%); margin: auto; text-align: center; font-size: 26px;  text-shadow: 0px 0px 6px rgba(0, 0, 0, 1); font-family: BalsamiqSansBold; font-stretch: ultra-expanded; cursor:pointer;"), this._playButton.addEventListener(this.inputType, function () {
                        e._hideHandler(), e._dontShowAgainHandler()
                    }), this._playButton.innerHTML = "SKIP"
                }
            }, {
                key: "onResize", value: function () {
                }
            }, {
                key: "videoOnResize", value: function () {
                    c2d.env.device.desktop() || this.isPlaying && (this._video.currentTime, c2d.env.device.portrait() ? this._videoOverlay.appendChild(this._video) : this._videoOverlay.appendChild(this._videoPortrait))
                }
            }, {
                key: "hide", value: function () {
                    this.isPrerollSkipped || this.exitInProgress || (this.exitInProgress = !0, this._playButton.removeEventListener(this.inputType, this._hideHandler), this._playButton.removeEventListener(this.inputType, this._preventHandler()), this._videoOverlay.removeEventListener("scroll", this._preventHandler()), this.onFinish && this.onFinish(), this._videoOverlay.remove(), this._content.destroy(), document.body.removeChild(this._playButton))
                }
            }, {
                key: "stop", value: function () {
                }
            }, {
                key: "start", value: function (e) {
                    var t = this;
                    if (this.isPrerollSkipped) return this.hide(), void e();
                    this.isStarted = !0, this.onFinish = function () {
                        return e()
                    }, this.hideCallback = function () {
                        return t.hide()
                    }, c2d.eventManager.subscribe(game.events.FlatUI.PLAY_BUTTON_PRESSED, this.hideCallback), this.addSwipe()
                }
            }, {
                key: "addSwipe", value: function () {
                    var r = this;
                    this.removeSwipeListeners();
                    this.touchStartFunction = function (e) {
                        document.removeEventListener("touchend", r.touchEndFunction), r.touchEndFunction = null;
                        var n = e.changedTouches[0].screenX;
                        e.changedTouches[0].screenY;
                        r.touchEndFunction = function (e) {
                            var t = e.changedTouches[0].screenX;
                            e.changedTouches[0].screenY;
                            n < t ? 70 < t - n && r.decreaseStage(!1) : 70 < n - t && r.increaseStage(!1), document.removeEventListener("touchend", r.touchEndFunction), r.touchEndFunction = null
                        }, document.addEventListener("touchend", r.touchEndFunction)
                    }, document.addEventListener("touchstart", this.touchStartFunction)
                }
            }, {
                key: "removeSwipeListeners", value: function () {
                    document.removeEventListener("touchstart", this.touchStartFunction), document.removeEventListener("touchend", this.touchEndFunction), this.touchStartFunction = null, this.touchEndFunction = null
                }
            }, {
                key: "isPrerollSkipped", get: function () {
                    return c2d.env.storage.getItem("skipPreroll")
                }, set: function (e) {
                    c2d.env.storage.setItem("skipPreroll", e)
                }
            }]), n
        }(game.components.sprite);
        (n.default = r).ID = "Preroll", game.registerComponent(r, {})
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    12: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            f = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/regenerator"))),
            o = r(e("@babel/runtime/helpers/slicedToArray")), a = r(e("@babel/runtime/helpers/asyncToGenerator")),
            l = r(e("@babel/runtime/helpers/classCallCheck")), u = r(e("@babel/runtime/helpers/createClass")),
            c = r(e("@babel/runtime/helpers/get")), h = r(e("@babel/runtime/helpers/inherits")),
            i = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            p = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function d(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, p.default)(n);
                return e = r ? (e = (0, p.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, i.default)(this, e)
            }
        }

        r = function (e) {
            (0, h.default)(s, e);
            var n, r, i = d(s);

            function s() {
                var e;
                (0, l.default)(this, s);
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                return (e = i.call.apply(i, [this].concat(n))).animations = [], e.duration = 500, e.easing = c2d.Tween.Ease.quartIn, e.patternPositions = [{
                    reelId: 1,
                    symId: 2
                }, {reelId: 3, symId: 0}, {reelId: 3, symId: 2}, {reelId: 1, symId: 0}, {
                    reelId: 2,
                    symId: 1
                }], e.patternInformation = [], e.moveTweens = [], e
            }

            return (0, u.default)(s, [{
                key: "initialize", value: function () {
                    for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                    (e = (0, c.default)((0, p.default)(s.prototype), "initialize", this)).call.apply(e, [this].concat(n)), this._generatePattern()
                }
            }, {
                key: "_initAnimation", value: function () {
                    var e = this.config.spine, e = new c2d.display.Spine(this._respack.getAsset(e));
                    return this._content.addChild(e), e.visible = !1, e
                }
            }, {
                key: "_generatePattern", value: function () {
                    var o = this;
                    this.patternInformation = this.patternPositions.map(function (e) {
                        var t = o._getGridPosition(e), n = t.x, r = t.y, i = t.halfWidth, t = t.halfHeight,
                            s = o._initAnimation();
                        return s.position.x = n + i, s.position.y = r + t, s.zOrder = o.config.patternZOrder, s.displayGroup = game.displayGroups.FOREGROUND, s.visible = !0, s.alpha = 0, {
                            position: e,
                            animation: s
                        }
                    })
                }
            }, {
                key: "_getGridPosition", value: function (e) {
                    var t = e.reelId, e = e.symId, n = this.config, r = n.columnsWidth, i = n.columnsIndent,
                        s = n.rowsHeight;
                    return {x: (r + i) * t, y: (s + n.rowsIndent) * e, halfWidth: .5 * r, halfHeight: .5 * s}
                }
            }, {
                key: "playSphereShow", value: function (n, r, i) {
                    return new Promise(function (e) {
                        var t;
                        "" !== r ? (t = n.state.setAnimation(0, r), n.state.addAnimation(0, i, !0, 0), t.listener = {
                            complete: function () {
                                e(), t.listener = {}
                            }
                        }) : (n.state.setAnimation(0, i, !0), e())
                    })
                }
            }, {
                key: "skipSphereMove", value: function () {
                    this.animations.forEach(function (e) {
                        c2d.Tween.removeTweens(e), e.removeFromParent()
                    }), this.clear()
                }
            }, {
                key: "move", value: (r = (0, a.default)(f.default.mark(function e(t, n) {
                    var r, i, s, o, a, l, u, c, h = arguments;
                    return f.default.wrap(function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                return r = 2 < h.length && void 0 !== h[2] ? h[2] : "in", i = 3 < h.length && void 0 !== h[3] ? h[3] : "idle", s = 4 < h.length && void 0 !== h[4] ? h[4] : this.duration, o = 5 < h.length && void 0 !== h[5] ? h[5] : this.easing, a = this._content.toLocal(t, t.parent), l = this._content.toLocal(n, n.parent), u = this._initAnimation(), c = this.config.sphereZOder, u.zOrder = c, this.animations.push(u), u.position.set(a.x, a.y), u.visible = !0, e.next = 14, this.playSphereShow(u, r, i);
                            case 14:
                                return c2d.eventManager.dispatch("SymbolReplacer.REELSET_PLAY_WILD_FLY"), e.next = 17, this.translate(l, u, s, o);
                            case 17:
                            case"end":
                                return e.stop()
                        }
                    }, e, this)
                })), function (e, t) {
                    return r.apply(this, arguments)
                })
            }, {
                key: "moveBack", value: (n = (0, a.default)(f.default.mark(function e(t, n) {
                    var r, i, s, o, a, l, u = arguments;
                    return f.default.wrap(function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                return r = 2 < u.length && void 0 !== u[2] ? u[2] : this.duration, i = 3 < u.length && void 0 !== u[3] ? u[3] : this.easing, s = this._content.toLocal(t, t.parent), o = this._content.toLocal(n, n.parent), a = this._initAnimation(), l = this.config.sphereZOder, a.zOrder = l, this.animations.push(a), a.position.set(s.x, s.y), a.visible = !0, a.state.setAnimation(0, "idle", !0), e.next = 13, this.translate(o, a, r, i);
                            case 13:
                            case"end":
                                return e.stop()
                        }
                    }, e, this)
                })), function (e, t) {
                    return n.apply(this, arguments)
                })
            }, {
                key: "translate", value: function (n, r, i, s) {
                    var o = this;
                    return new Promise(function (e) {
                        var t = c2d.Tween.get(r).to(n, i, s).call(function () {
                            r.visible = !1, r.removeFromParent(), o.animations.remove(r), o.moveTweens.remove(t), e()
                        });
                        o.moveTweens.push(t)
                    })
                }
            }, {
                key: "showPattern", value: function (t, e) {
                    if (this.patternIsShowing) return e();
                    var n = this.patternInformation.filter(function (e) {
                        var e = e.position, n = e.reelId, r = e.symId;
                        return !t.find(function (e) {
                            var e = e.in_position, e = Object.values(e), e = (0, o.default)(e, 2), t = e[0], e = e[1];
                            return n === t && r === e
                        })
                    }), r = c2d.last(e, n.length);
                    n.forEach(function (e) {
                        var e = e.animation, t = (e.alpha = 1, e.state.setAnimation(0, "pattern_in"));
                        e.state.addAnimation(0, "pattern_idle", !0, 0), t.listener = {
                            complete: function () {
                                r(), t.listener = {}
                            }
                        }
                    })
                }
            }, {
                key: "instantPatternShow", value: function (t) {
                    this.patternIsShowing || this.patternInformation.filter(function (e) {
                        var e = e.position, n = e.reelId, r = e.symId;
                        return !t.find(function (e) {
                            var e = e.in_position, e = Object.values(e), e = (0, o.default)(e, 2), t = e[0], e = e[1];
                            return n === t && r === e
                        })
                    }).forEach(function (e) {
                        e = e.animation;
                        e.state.setAnimation(0, "pattern_idle", !0), e.alpha = 1
                    })
                }
            }, {
                key: "hidePatternFragment", value: function (n, r) {
                    this.patternInformation.find(function (e) {
                        var t = e.position, e = (e.animation, t.reelId), t = t.symId;
                        return e === n && t === r
                    }).animation.alpha = 0
                }
            }, {
                key: "hidePattern", value: function (e) {
                    if (!this.patternIsShowing) return e();
                    c2d.eventManager.dispatch("Reelset.PATERN_RESPIN_STOP");
                    var t = c2d.last(e, this.patternInformation.length);
                    this.patternInformation.forEach(function (e) {
                        e = e.animation;
                        c2d.Tween.get(e).to({alpha: 0}, 300).call(t)
                    })
                }
            }, {
                key: "instantPatternHide", value: function () {
                    this.patternIsShowing && this.patternInformation.forEach(function (e) {
                        e = e.animation;
                        c2d.Tween.removeTweens(e), e.alpha = 0
                    })
                }
            }, {
                key: "removeSphere", value: function () {
                    var e = this, t = c2d.last(function () {
                        e.clear()
                    }, this.animations.length);
                    this.animations.forEach(function (e) {
                        c2d.Tween.removeTweens(e), e.removeFromParent(), t()
                    })
                }
            }, {
                key: "clear", value: function () {
                    this.moveTweens = [], this.animations = []
                }
            }, {
                key: "hasSphere", get: function () {
                    return 0 < this.animations.length
                }
            }, {
                key: "patternIsShowing", get: function () {
                    return this.patternInformation.map(function (e) {
                        return e.animation
                    }).some(function (e) {
                        return 0 < e.alpha
                    })
                }
            }]), s
        }(game.components.view);
        (n.default = r).ID = "sphere", game.registerComponent(r, {})
    }, {
        "@babel/runtime/helpers/asyncToGenerator": 40,
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51,
        "@babel/runtime/helpers/slicedToArray": 54,
        "@babel/runtime/regenerator": 59
    }],
    13: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            o = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            a = r(e("@babel/runtime/helpers/createClass")), l = r(e("@babel/runtime/helpers/get")),
            u = r(e("@babel/runtime/helpers/inherits")), i = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            c = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function h(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, c.default)(n);
                return e = r ? (e = (0, c.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, i.default)(this, e)
            }
        }

        r = function (e) {
            (0, u.default)(s, e);
            var i = h(s);

            function s() {
                var e;
                (0, o.default)(this, s);
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                return (e = i.call.apply(i, [this].concat(n))).animation = null, e.SPIRIT_TRACK = 0, e.GLOW_TRACK = 1, e.KODAMA_TRACK = 2, e.track_animation = "track_1", e.kodama_track_animation = "kodama", e.desktopScale = null, e.isCatchKodama = !1, e.probabilityNormalize = 0, e
            }

            return (0, a.default)(s, [{
                key: "initialize", value: function () {
                    for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                    (e = (0, l.default)((0, c.default)(s.prototype), "initialize", this)).call.apply(e, [this].concat(n)), this._initAnimation()
                }
            }, {
                key: "_initAnimation", value: function () {
                    var e = this.config.spine, e = new c2d.display.Spine(this._respack.getAsset(e));
                    this._content.addChild(e), this.animation = e, this.setMixes()
                }
            }, {
                key: "onResize", value: function () {
                    this.onResizeBase(), this.onResizeFS()
                }
            }, {
                key: "onResizeBase", value: function () {
                    (0, l.default)((0, c.default)(s.prototype), "onResize", this).call(this), c2d.env.device.desktop() && (this.desktopScale = this.desktopScale || this.scale.x, this.scale.set(this.desktopScale))
                }
            }, {
                key: "onResizeFS", value: function () {
                    var e = this.slotsModel.freespins.isActiveStatus;
                    this.scale.set((e ? this.config.fsScale : 1) * (this.desktopScale || this.scale.x))
                }
            }, {
                key: "addGlow", value: function () {
                    this.animation.state.setAnimation(this.GLOW_TRACK, this.track_animation, !0)
                }
            }, {
                key: "removeGlow", value: function () {
                    this.animation.state.setEmptyAnimation(this.GLOW_TRACK, 1.5)
                }
            }, {
                key: "addKodama", value: function () {
                    this.animation.state.setAnimation(this.KODAMA_TRACK, this.kodama_track_animation, !0)
                }
            }, {
                key: "removeKodama", value: function () {
                    this.animation.state.setEmptyAnimation(this.KODAMA_TRACK, .5)
                }
            }, {
                key: "setAnimation", value: function (e) {
                    return this.animation.state.setAnimation(this.SPIRIT_TRACK, e, 1 < arguments.length && void 0 !== arguments[1] && arguments[1])
                }
            }, {
                key: "addAnimation", value: function (e) {
                    return this.animation.state.addAnimation(this.SPIRIT_TRACK, e, 1 < arguments.length && void 0 !== arguments[1] && arguments[1], 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0)
                }
            }, {
                key: "playBornIn", value: function (e) {
                    c2d.eventManager.dispatch("Fun.FOREST_EYES_1");
                    var t = this.setAnimation("born_in");
                    this.addAnimation("born_idle", !0), t.listener = {complete: e}
                }
            }, {
                key: "skipBornIn", value: function () {
                    this.setAnimation("born_idle", !0)
                }
            }, {
                key: "playBorn", value: function (e) {
                    var t = this,
                        n = (this.removeKodama(), c2d.eventManager.dispatch("Fun.FOREST_JUMP"), this.setAnimation("born_out", !1)),
                        n = (this.addAnimation("idle_fs", !0, 0), n.listener = {
                            event: function () {
                                t.removeGlow(), e()
                            }
                        }, this.onResizeBase(), this.config.fsScale * (this.desktopScale || this.scale.x));
                    c2d.Tween.get(this, {override: !0}).to({scaleX: n, scaleY: n}, 1e3)
                }
            }, {
                key: "playIdle", value: function () {
                    var e = this.slotsModel.freespins.isActiveStatus, t = e ? "idle_fs" : "idle";
                    e ? this.removeGlow() : this.addGlow(), this.isCatchKodama && !e && this.addKodama(), this.setAnimation(t, !0)
                }
            }, {
                key: "playHit", value: function (e) {
                    c2d.eventManager.dispatch("Fun.FOREST_BALL");
                    var t = this.setAnimation("hit");
                    this.addAnimation("idle", !0), t.listener = {event: e}
                }
            }, {
                key: "playThrow", value: function (e) {
                    "fun_1_fs" === this.animation.currentAnimation && (this.animation.currentTime = this.animation.totalTime), c2d.eventManager.dispatch("Fun.FOREST_BALL_FS");
                    var t = this.setAnimation("fs_throw");
                    this.addAnimation("idle_fs", !0), t.listener = {event: e}
                }
            }, {
                key: "skipThrow", value: function () {
                    this.animation.state.getCurrent(this.SPIRIT_TRACK).listener = {}, this.setAnimation("idle_fs", !0)
                }
            }, {
                key: "setMixes", value: function () {
                    this.animation.stateData.setMix("idle", "kodama", .3), this.animation.stateData.setMix("kodama", "idle", .3), this.animation.stateData.setMix("fun_1", "kodama", .3), this.animation.stateData.setMix("kodama", "fun_1", .3), this.animation.stateData.setMix("idle", "hit", .3), this.animation.stateData.setMix("idle", "fun_1", .4), this.animation.stateData.setMix("hit", "idle", .4), this.animation.stateData.setMix("idle_fs", "fs_throw", .3), this.animation.stateData.setMix("fs_throw", "idle_fs", .2)
                }
            }, {
                key: "backKodama", value: function (e) {
                    c2d.eventManager.dispatch("Fun.FOREST_BALL"), this.isCatchKodama = !1;
                    var t = this.setAnimation("return", !1);
                    this.removeKodama(), this.addGlow(), this.addAnimation("idle", !0), t.listener = {event: e}
                }
            }, {
                key: "сatchKodama", value: function () {
                    this.addGlow(), this.addKodama(), this.setAnimation("idle", !0), this.isCatchKodama = !0
                }
            }, {
                key: "funAnimation", value: function () {
                    this.dispatch("spirit_fun"), this.setAnimation("fun_1"), c2d.eventManager.dispatch("Fun.FOREST_EYES_1"), this.isCatchKodama && this.addKodama(), this.addAnimation("idle", !0)
                }
            }, {
                key: "runFunIdle", value: function () {
                    var e = this;
                    this.funTimer && this.funAnimation(), this.funTimer = c2d.Timeout.invoke(function () {
                        return e.runFunIdle()
                    }, 2e4)
                }
            }, {
                key: "funAnimationFS", value: function () {
                    var e = Math.random(), t = .35 - this.probabilityNormalize, n = .55 + this.probabilityNormalize;
                    e < t || n < e ? this.probabilityNormalize += .03 : (this.probabilityNormalize = 0, this.dispatch("spirit_fun"), c2d.eventManager.dispatch("Fun.FOREST_JUMP"), this.setAnimation("fun_1_fs"), this.animation.onEvent = function (e, t) {
                        "fs_1_29" === t.data.name && (c2d.eventManager.dispatch("SHAKE"), c2d.eventManager.dispatch("Fun.FOREST_LAND"))
                    }, this.addAnimation("idle_fs", !0))
                }
            }, {
                key: "stopFunAnimation", value: function () {
                    c2d.eventManager.dispatch("stop_spirit_fun"), this.funTimer && (c2d.Timeout.clear(this.funTimer), this.funTimer = null)
                }
            }, {
                key: "runFunAfterWin", value: function () {
                    Math.random() < .1 && this.funAnimation()
                }
            }, {
                key: "spiritCenter", get: function () {
                    return this.animation.findSlot("kodama_inplace").currentSprite
                }
            }, {
                key: "spiritThrow", get: function () {
                    return this.animation.findSlot("kodama_throw").currentSprite
                }
            }, {
                key: "spiritFsThrow", get: function () {
                    return this.animation.findSlot("fs_kodama_throw").currentSprite
                }
            }, {
                key: "currentAnimation", get: function () {
                    return this.animation.currentAnimation
                }
            }]), s
        }(game.components.view);
        (n.default = r).ID = "spirit", game.registerComponent(r, {})
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    14: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/get")),
            a = r(e("@babel/runtime/helpers/inherits")), l = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            u = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function c(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, u.default)(n);
                return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, l.default)(this, e)
            }
        }

        r = function (e) {
            (0, a.default)(n, e);
            var t = c(n);

            function n() {
                return (0, i.default)(this, n), t.apply(this, arguments)
            }

            return (0, s.default)(n, [{
                key: "onEnterState", value: function (e) {
                    var t = this;
                    (0, o.default)((0, u.default)(n.prototype), "onEnterState", this).call(this, e), c2d.eventManager.subscribe("SHAKE", function () {
                        t.shake(t.slots.spirit.config.shakeSettings)
                    }), this.slots.spirit.isCatchKodama = this.slots.model.extra && this.slots.model.extra.hidden_wild, this.slots.spirit.isCatchKodama && this.slots.spirit.addKodama()
                }
            }, {
                key: "shake", value: function (e, r) {
                    var i = this, s = e.power, o = e.amplitude, a = e.time, l = (new Date).getTime(),
                        u = Math.ceil(a / (2 * o)), c = 0;
                    (function t(e) {
                        var n = Math.cos(c / u * Math.PI - Math.PI / 2);
                        c2d.Tween.get(i.slots.view).to({
                            x: n * +s,
                            y: n * +s * (.5 - Math.random())
                        }, 1.5 * o, c2d.Tween.Ease.quintInOut).to({
                            x: n * -s,
                            y: n * -s * (.5 - Math.random())
                        }, 1.25 * o, c2d.Tween.Ease.quintInOut).call(function (e) {
                            l + a > (new Date).getTime() ? t() : (i.slots.view.position.set(0, 0), r && r())
                        }), c++
                    })()
                }
            }]), n
        }(game.src.SlotsFSM.IGResponseController);
        n.default = r
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    15: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            s = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            o = r(e("@babel/runtime/helpers/createClass")), a = r(e("@babel/runtime/helpers/get")),
            l = r(e("@babel/runtime/helpers/inherits")), i = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            u = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function c(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, u.default)(n);
                return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, i.default)(this, e)
            }
        }

        r = function (e) {
            (0, l.default)(i, e);
            var t = c(i);

            function i() {
                return (0, s.default)(this, i), t.apply(this, arguments)
            }

            return (0, o.default)(i, [{
                key: "onEnterState", value: function () {
                    for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                    (e = (0, a.default)((0, u.default)(i.prototype), "onEnterState", this)).call.apply(e, [this].concat(n)), this.slots.spirit.isCatchKodama = this.slots.model.extra && this.slots.model.extra.hidden_wild, this.slots.spirit.isCatchKodama && this.slots.spirit.addKodama(), this.slots.spirit.runFunIdle()
                }
            }]), i
        }(game.src.SlotsFSM.IdleController);
        n.default = r
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    16: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/inherits")),
            a = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            l = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function u(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, l.default)(n);
                return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, a.default)(this, e)
            }
        }

        r = function (e) {
            (0, o.default)(n, e);
            var t = u(n);

            function n() {
                return (0, i.default)(this, n), t.apply(this, arguments)
            }

            return (0, s.default)(n, [{
                key: "changeState", value: function () {
                    var e = this;
                    this.introStartEvent = function () {
                        e.slots.components.intro.start(function () {
                            e.state.changeState(game.slots.FSM_STATES.CHECK_STATE)
                        }), e.slots.components.intro.onResize()
                    }, !this.slots.components.preroll || this.isYaBrowser || this.isMsIeBrowser ? this.introStartEvent() : this.slots.components.preroll.start(function () {
                        e.introStartEvent()
                    })
                }
            }, {
                key: "isYaBrowser", get: function () {
                    return 0 < navigator.userAgent.search(/YaBrowser/)
                }
            }, {
                key: "isMsIeBrowser", get: function () {
                    return 0 < window.navigator.userAgent.indexOf("MSIE ") || !!navigator.userAgent.match(/Trident.*rv\:11\./)
                }
            }]), n
        }(game.src.SlotsFSM.IntroController);
        n.default = r
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    17: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/get")),
            a = r(e("@babel/runtime/helpers/inherits")), l = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            u = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function c(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, u.default)(n);
                return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, l.default)(this, e)
            }
        }

        r = function (e) {
            (0, a.default)(r, e);
            var t = c(r);

            function r() {
                return (0, i.default)(this, r), t.apply(this, arguments)
            }

            return (0, s.default)(r, [{
                key: "onExitState", value: function () {
                    var n = this;
                    this.slots.model.totalWin || "initfreespin" === this.slots.model.nextAction || this.slots.model.reels.flatMap(function (e) {
                        return e.symbols
                    }).filter(function (e) {
                        return !e.type
                    }).forEach(function (e) {
                        var t = e.reelId, e = e.id;
                        return n.slots.reelset.controller.view.runFunIdle(t, e)
                    }), (0, o.default)((0, u.default)(r.prototype), "onExitState", this).call(this)
                }
            }]), r
        }(game.src.SlotsFSM.BGEndController);
        n.default = r
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    18: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            l = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/regenerator"))),
            u = r(e("@babel/runtime/helpers/slicedToArray")), c = r(e("@babel/runtime/helpers/asyncToGenerator")),
            o = r(e("@babel/runtime/helpers/classCallCheck")), i = r(e("@babel/runtime/helpers/createClass")),
            h = r(e("@babel/runtime/helpers/get")), f = r(e("@babel/runtime/helpers/inherits")),
            s = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            p = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function d(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, p.default)(n);
                return e = r ? (e = (0, p.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, s.default)(this, e)
            }
        }

        r = function (e) {
            (0, f.default)(a, e);
            var t, n, s = d(a);

            function a() {
                var n;
                (0, o.default)(this, a);
                for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                (n = s.call.apply(s, [this].concat(t))).callBackForSkip = function () {
                }, n.phasesForSkip = ["showResult", "showLineWins", "showToggleLines", "showKodamaMove", "showBeforeForestAwaken", "showBornSpirit"], n.steps.showToggleLines = {
                    phase: "SHOW_TOGGLE_LINES",
                    check: function () {
                        return n.hasAnyWinsMoreOne
                    },
                    show: n.showToggleLines,
                    skip: n.skipShowToggleLines
                }, n.steps.showPattern = {
                    phase: "SHOW_PATTERN", check: function () {
                        return n.hasFreeze || n.hasKodamaMoves
                    }, show: n.showPattern, skip: n.skipShowPattern
                }, n.steps.showKodamaMove = {
                    phase: "SHOW_KODAMA_MOVE", check: function () {
                        return n.needKodamaMove
                    }, show: n.showKodamaMove, skip: n.skipShowKodamaMove
                }, n.steps.hidePattern = {
                    phase: "HIDE_PATTERN", check: function () {
                        return n.hasUnfreeze || n.hasScatterWins
                    }, show: n.hidePattern, skip: n.skipHidePattern
                }, n.steps.showNeedToHide = {
                    phase: "SHOW_NEED_TO_HIDE", check: function () {
                        return n.needHide
                    }, show: n.showNeedToHide, skip: !1
                }, n.steps.showBeforeForestAwaken = {
                    phase: "SHOW_BEFORE_FOREST_AWAKEN", check: function () {
                        return n.hasScatterWins
                    }, show: n.showBeforeForestAwaken, skip: n.skipShowBeforeForestAwaken
                }, n.steps.showBornSpirit = {
                    phase: "SHOW_BORN_SPIRIT", check: function () {
                        return n.needBornSpirit
                    }, show: n.showBornSpirit, skip: n.skipShowBornSpirit
                }, n.steps.showForestAwaken = {
                    phase: "SHOW_FOREST_AWAKEN", check: function () {
                        return n.hasScatterWins
                    }, show: n.showForestAwaken, skip: !1
                }, n.steps.setMask = {
                    phase: "SET_MASK", check: function () {
                        return !0
                    }, show: n.setMask, skip: !1
                }, n.steps.removeMask = {
                    phase: "REMOVE_MASK", check: function () {
                        return !0
                    }, show: n.removeMask, skip: !1
                };
                var i = Object.keys(n.steps).reduce(function (e, t) {
                    return e[n.steps[t].phase] = t, e
                }, {});
                return n.state.registerPhases(i), n.onSkipPhases = function () {
                    return n.skipPhases()
                }, n
            }

            return (0, i.default)(a, [{
                key: "skipPhases", value: function () {
                    var t, e;
                    this.currentPhase !== this.state.currentPhase && (t = this.state.currentPhase, this.currentPhase = t, this.phasesForSkip.includes(t) && (e = this.phasesForSkip.find(function (e) {
                        return e === t
                    }).split("").map(function (e, t) {
                        return t ? e : e.toUpperCase()
                    }).join(""), this["skip" + e](this.callBackForSkip)))
                }
            }, {
                key: "addSkipListeners", value: function () {
                    c2d.eventManager.subscribe(game.events.FlatUI.SKIP_WIN_PRESSED, this.onSkipPhases)
                }
            }, {
                key: "removeSkipListeners", value: function () {
                    c2d.eventManager.unsubscribe(game.events.FlatUI.SKIP_WIN_PRESSED, this.onSkipPhases)
                }
            }, {
                key: "onEnterState", value: function () {
                    for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                    (e = (0, h.default)((0, p.default)(a.prototype), "onEnterState", this)).call.apply(e, [this].concat(n)), this.currentPhase = null
                }
            }, {
                key: "setFrozen", value: function (e) {
                    this.slots.reelset.setFrozen(this.slots.model.freeze.frozen), e()
                }
            }, {
                key: "showReplace", value: (n = (0, c.default)(l.default.mark(function e(t) {
                    var n, r, i, s, o = this;
                    return l.default.wrap(function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                if (this.slots.model.replace._symbols.length) return r = (0, u.default)(this.slots.model.replace._symbols, 1), r = r[0], n = r.reelId, r = r.id, i = this.slots.spirit.spiritThrow, s = this.slots.reelset.controller.view.getSymbol(n, r), this.slots.spirit.backKodama((0, c.default)(l.default.mark(function e() {
                                    return l.default.wrap(function (e) {
                                        for (; ;) switch (e.prev = e.next) {
                                            case 0:
                                                return e.next = 2, o.slots.sphere.moveBack(i, s, 500, c2d.Tween.Ease.quartOut);
                                            case 2:
                                                (0, h.default)((0, p.default)(a.prototype), "showReplace", o).call(o, t), c2d.eventManager.dispatch("SymbolReplacer.REELSET_PLAY_WILD_IN");
                                            case 4:
                                            case"end":
                                                return e.stop()
                                        }
                                    }, e)
                                }))), e.abrupt("return");
                                e.next = 6;
                                break;
                            case 6:
                                (0, h.default)((0, p.default)(a.prototype), "showReplace", this).call(this, t), c2d.eventManager.dispatch("SymbolReplacer.REELSET_PLAY_WILD_IN");
                            case 8:
                            case"end":
                                return e.stop()
                        }
                    }, e, this)
                })), function (e) {
                    return n.apply(this, arguments)
                })
            }, {
                key: "showResult", value: function (e) {
                    this.callBackForSkip = e, this.state.setPhase(this.state.PHASES.SHOW_RESULT), (0, h.default)((0, p.default)(a.prototype), "showResult", this).call(this, e)
                }
            }, {
                key: "skipShowResult", value: function (e) {
                    var t = c2d.once(function () {
                        return e()
                    });
                    c2d.eventManager.dispatch(game.events.Slots.ON_SKIP_WIN_RESULT, {}, t)
                }
            }, {
                key: "showToggleLines", value: function (e) {
                    this.callBackForSkip = e, (0, h.default)((0, p.default)(a.prototype), "showToggleLinesWins", this).call(this, e)
                }
            }, {
                key: "skipShowToggleLines", value: (t = (0, c.default)(l.default.mark(function e(t) {
                    return l.default.wrap(function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                return this.slots.stopTogglingWinLines(), e.next = 3, c2d.wait(1e3);
                            case 3:
                                t();
                            case 4:
                            case"end":
                                return e.stop()
                        }
                    }, e, this)
                })), function (e) {
                    return t.apply(this, arguments)
                })
            }, {
                key: "showUnfreeze", value: function (e) {
                    var t = this, n = c2d.once(function () {
                        t.hasSkipped || e()
                    });
                    this.state.setPhase(this.state.PHASES.SHOW_UNFREEZE), this.slots.reelset.once(game.events.Reelset.REELSET_DID_FINISH_UNFREEZE_ANIMATION, n), this.slots.reelset.startUnfreeze(this.slots.model.freeze.unfreeze)
                }
            }, {
                key: "showPattern", value: function (e) {
                    this.callBackForSkip = e, this.state.setPhase(this.state.PHASES.SHOW_PATTERN), this.slots.reelset.controller.prepareSymbolsForShowPattern(this.slots.model);
                    var t, n = [];
                    this.slots.model.extra && this.slots.model.extra.pattern_wilds && (t = this.slots.model.extra.pattern_wilds, n = Object.values(t).filter(function (e) {
                        return e.in_position
                    })), c2d.eventManager.dispatch("Reelset.PATERN_ACTIVATE"), c2d.eventManager.dispatch("Reelset.PATERN_RESPIN"), this.slots.sphere.showPattern(n, function () {
                    }), e()
                }
            }, {
                key: "skipShowPattern", value: function (e) {
                    this.slots.reelset.controller.prepareSymbolsForShowPattern(this.slots.model);
                    var t, n = [];
                    this.slots.model.extra && this.slots.model.extra.pattern_wilds && (t = this.slots.model.extra.pattern_wilds, n = Object.values(t).filter(function (e) {
                        return e.in_position
                    })), this.slots.sphere.instantPatternShow(n), e()
                }
            }, {
                key: "showKodamaMove", value: function (e) {
                    this.callBackForSkip = e, this.state.setPhase(this.state.PHASES.SHOW_KODAMA_MOVE);
                    var t = this.slots.model.extra.pattern_wilds, t = Object.values(t);
                    c2d.eventManager.dispatch("SymbolReplacer.REELSET_PLAY_WILD_ON"), this.slots.reelset.controller.startMoveKodama(t, e)
                }
            }, {
                key: "skipShowKodamaMove", value: function (e) {
                    var t = this.slots.model.extra.pattern_wilds, t = Object.values(t);
                    this.slots.sphere.skipSphereMove(), this.slots.reelset.controller.skipMoveKodama(t, e)
                }
            }, {
                key: "showLineWins", value: function (e) {
                    this.callBackForSkip = e, this.slots.sphere.hidePattern(function () {
                    }), (0, h.default)((0, p.default)(a.prototype), "showLineWins", this).call(this, e), this.slots.spirit.runFunAfterWin()
                }
            }, {
                key: "skipShowLineWins", value: function (e) {
                    this.slots.sphere.hidePattern(function () {
                    }), this.slots.cancelShowLineWins(), this.slots.reelset.controller.skipAllWins(), e()
                }
            }, {
                key: "hidePattern", value: function (e) {
                    this.callBackForSkip = e, this.state.setPhase(this.state.PHASES.HIDE_PATTERN), this.slots.sphere.hidePattern(e)
                }
            }, {
                key: "skipHidePattern", value: function (e) {
                    this.slots.sphere.instantPatternHide(), e()
                }
            }, {
                key: "showBeforeForestAwaken", value: function (e) {
                    this.callBackForSkip = e, this.state.setPhase(this.state.PHASES.SHOW_BEFORE_FOREST_AWAKEN), this.slots.reelset.controller.prepareSymbolsForShowPattern(this.slots.model);
                    var t = this.slots.model.scatterWins.flatMap(function (e) {
                        return e.positions
                    });
                    this.slots.reelset.controller.moveKodamaToSpirit(t, this.slots.spirit.spiritCenter, e), c2d.eventManager.dispatch("Fun.SPIRIT_AWAKE")
                }
            }, {
                key: "skipShowBeforeForestAwaken", value: function (e) {
                    var t = this.slots.model.scatterWins.flatMap(function (e) {
                        return e.positions
                    });
                    this.slots.reelset.controller.skipMoveKodamaToSpirit(t, e)
                }
            }, {
                key: "showForestAwaken", value: function (e) {
                    var t = this;
                    this.state.setPhase(this.state.PHASES.SHOW_FOREST_AWAKEN);
                    this.slots.spirit.playBorn(function () {
                        t.slots.background.playFsIn(e), t.slots.front.playFsIn(), t.slots.reelset.controller.setFsSkin()
                    })
                }
            }, {
                key: "showNeedToHide", value: function (e) {
                    var r = this, i = this.slots.model.extra.need_to_hide;
                    this.state.setPhase(this.state.PHASES.SHOW_NEED_TO_HIDE), this.slots.spirit.playHit(function () {
                        var e = r.slots.spirit.spiritThrow, t = r.slots.reelset.controller.view.getHideKodama(i);
                        r.slots.sphere.move(e, t, "", "kodama_hide_idle", 500, c2d.Tween.Ease.quartOut), c2d.eventManager.dispatch("SymbolReplacer.REELSET_PLAY_WILD_OUT")
                    }), this.slots.reelset.controller.view.hideKodama(i, (0, c.default)(l.default.mark(function e() {
                        var t, n;
                        return l.default.wrap(function (e) {
                            for (; ;) switch (e.prev = e.next) {
                                case 0:
                                    return t = r.slots.reelset.controller.view.getHideKodama(i), n = r.slots.spirit.spiritThrow, e.next = 4, r.slots.sphere.move(t, n, "in_return", "kodama_hide_return", 500, c2d.Tween.Ease.quartIn);
                                case 4:
                                    r.slots.spirit.isCatchKodama();
                                case 5:
                                case"end":
                                    return e.stop()
                            }
                        }, e)
                    }))).then(e)
                }
            }, {
                key: "skipShowReplace", value: function (e) {
                    this.slots.reelset.skipReplaceSymbols(this.slots.model.replace.symbols, e)
                }
            }, {
                key: "showBornSpirit", value: function (e) {
                    this.callBackForSkip = e, c2d.eventManager.dispatch("Reelset.PATERN_RESPIN_STOP"), this.state.setPhase(this.state.PHASES.SHOW_BORN_SPIRIT), this.slots.spirit.playBornIn(e)
                }
            }, {
                key: "skipShowBornSpirit", value: function (e) {
                    this.slots.spirit.skipBornIn(), e()
                }
            }, {
                key: "hasKodamaMoves", get: function () {
                    if (!this.slots.model.extra || !this.slots.model.extra.pattern_wilds) return !1;
                    var e = this.slots.model.extra.pattern_wilds;
                    return !Object.values(e).every(function (e) {
                        return e.in_position
                    })
                }
            }, {
                key: "needKodamaMove", get: function () {
                    return this.slots.model.extra && this.slots.model.extra.pattern_wilds
                }
            }, {
                key: "needBornSpirit", get: function () {
                    if (!this.needKodamaMove) return !1;
                    var e = this.slots.model.extra.pattern_wilds;
                    return 3 < Object.values(e).length && "born_idle" !== this.slots.spirit.currentAnimation
                }
            }, {
                key: "needHide", get: function () {
                    return this.slots.model.extra && this.slots.model.extra.need_to_hide
                }
            }, {
                key: "setMask", value: function (e) {
                    this.state.setPhase(this.state.PHASES.SET_MASK), this.slots.reelset.controller.view.setMask(), e()
                }
            }, {
                key: "removeMask", value: function (e) {
                    this.state.setPhase(this.state.PHASES.REMOVE_MASK), this.slots.reelset.controller.view.removeMask(), e()
                }
            }, {
                key: "order", get: function () {
                    return [this.state.PHASES.REMOVE_MASK, this.state.PHASES.SHOW_REPLACE, this.state.PHASES.SET_FROZEN, this.state.PHASES.SHOW_UNFREEZE, this.state.PHASES.SHOW_RESULT, this.state.PHASES.SHOW_LINE_WINS, this.state.PHASES.SHOW_TOGGLE_LINES, this.state.PHASES.SHOW_NEED_TO_HIDE, this.state.PHASES.SHOW_PATTERN, this.state.PHASES.SHOW_KODAMA_MOVE, this.state.PHASES.SHOW_BORN_SPIRIT, this.state.PHASES.HIDE_PATTERN, this.state.PHASES.SHOW_BEFORE_FOREST_AWAKEN, this.state.PHASES.SHOW_FOREST_AWAKEN, this.state.PHASES.SHOW_FREEZE, this.state.PHASES.SHOW_RESPIN, this.state.PHASES.SET_MASK, this.state.PHASES.REPORT_FINISH]
                }
            }]), a
        }(game.src.SlotsFSM.BGShowResultController);
        n.default = r
    }, {
        "@babel/runtime/helpers/asyncToGenerator": 40,
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51,
        "@babel/runtime/helpers/slicedToArray": 54,
        "@babel/runtime/regenerator": 59
    }],
    19: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            s = r(e("@babel/runtime/helpers/createClass")), a = r(e("@babel/runtime/helpers/get")),
            l = r(e("@babel/runtime/helpers/inherits")), o = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            u = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function c(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, u.default)(n);
                return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, o.default)(this, e)
            }
        }

        r = function (e) {
            (0, l.default)(o, e);
            var t = c(o);

            function o() {
                return (0, i.default)(this, o), t.apply(this, arguments)
            }

            return (0, s.default)(o, [{
                key: "onEnterState", value: function () {
                    var e, r = this, i = this.slots.ui.controller.model.autospinsData.isActive;
                    this.slots.model.reels.flatMap(function (e) {
                        return e.symbols
                    }).forEach(function (e) {
                        var t = e.reelId, n = e.id;
                        r.slots.reelset.controller.view.stopFunIdle(t, n), i && (e = game.src.Reelset.SymbolAnimations.getAnimation(e, "static"), r.slots.reelset.controller.view.setSymbolAnimation(t, n, e))
                    }), this.slots.spirit.stopFunAnimation();
                    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++) n[s] = arguments[s];
                    (e = (0, a.default)((0, u.default)(o.prototype), "onEnterState", this)).call.apply(e, [this].concat(n))
                }
            }]), o
        }(game.src.SlotsFSM.BGSpinStartController);
        n.default = r
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    20: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/get")),
            a = r(e("@babel/runtime/helpers/inherits")), l = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            u = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function c(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, u.default)(n);
                return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, l.default)(this, e)
            }
        }

        r = function (e) {
            (0, a.default)(n, e);
            var t = c(n);

            function n() {
                return (0, i.default)(this, n), t.apply(this, arguments)
            }

            return (0, s.default)(n, [{
                key: "onExitState", value: function () {
                    (0, o.default)((0, u.default)(n.prototype), "onExitState", this).call(this), this.slots.spirit.onResize()
                }
            }]), n
        }(game.src.SlotsFSM.FSEndController);
        n.default = r
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    21: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/get")),
            a = r(e("@babel/runtime/helpers/inherits")), l = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            u = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function c(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, u.default)(n);
                return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, l.default)(this, e)
            }
        }

        r = function (e) {
            (0, a.default)(n, e);
            var t = c(n);

            function n() {
                return (0, i.default)(this, n), t.apply(this, arguments)
            }

            return (0, s.default)(n, [{
                key: "onEnterState", value: function () {
                    (0, o.default)((0, u.default)(n.prototype), "onEnterState", this).call(this)
                }
            }]), n
        }(game.src.SlotsFSM.FSRestoreController);
        n.default = r
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    22: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            a = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            i = r(e("@babel/runtime/helpers/createClass")), l = r(e("@babel/runtime/helpers/get")),
            u = r(e("@babel/runtime/helpers/inherits")), s = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            c = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function h(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, c.default)(n);
                return e = r ? (e = (0, c.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, s.default)(this, e)
            }
        }

        r = function (e) {
            (0, u.default)(o, e);
            var s = h(o);

            function o() {
                var n;
                (0, a.default)(this, o);
                for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                (n = s.call.apply(s, [this].concat(t))).callBackForSkip = function () {
                }, n.phasesForSkip = ["showResult", "showSpiritThrow", "showReplace", "showLineWins", "showToggleLines"], n.steps.showSpiritThrow = {
                    phase: "SHOW_SPIRIT_THROW",
                    check: function () {
                        return n.hasReplace
                    },
                    show: n.showSpiritThrow,
                    skip: !1
                };
                var i = Object.keys(n.steps).reduce(function (e, t) {
                    return e[n.steps[t].phase] = t, e
                }, {});
                return n.state.registerPhases(i), n.onSkipPhases = function () {
                    return n.skipPhases()
                }, n
            }

            return (0, i.default)(o, [{
                key: "skipPhases", value: function () {
                    var t, e;
                    this.currentPhase !== this.state.currentPhase && (t = this.state.currentPhase, this.currentPhase = t, this.phasesForSkip.includes(t) && (e = this.phasesForSkip.find(function (e) {
                        return e === t
                    }).split("").map(function (e, t) {
                        return t ? e : e.toUpperCase()
                    }).join(""), this["skip" + e](this.callBackForSkip)))
                }
            }, {
                key: "addSkipListeners", value: function () {
                    c2d.eventManager.subscribe(game.events.FlatUI.SKIP_WIN_PRESSED, this.onSkipPhases)
                }
            }, {
                key: "removeSkipListeners", value: function () {
                    c2d.eventManager.unsubscribe(game.events.FlatUI.SKIP_WIN_PRESSED, this.onSkipPhases)
                }
            }, {
                key: "onEnterState", value: function () {
                    for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                    (e = (0, l.default)((0, c.default)(o.prototype), "onEnterState", this)).call.apply(e, [this].concat(n)), this.currentPhase = null, this.skipToggleLines = !1
                }
            }, {
                key: "showReplace", value: function (e) {
                    (0, l.default)((0, c.default)(o.prototype), "showReplace", this).call(this, e), c2d.eventManager.dispatch("SymbolReplacer.REELSET_PLAY_WILD_IN")
                }
            }, {
                key: "showLineWins", value: function (e) {
                    this.callBackForSkip = e, (0, l.default)((0, c.default)(o.prototype), "showLineWins", this).call(this, e)
                }
            }, {
                key: "skipShowLineWins", value: function (e) {
                    this.slots.cancelShowLineWins(), this.slots.reelset.controller.skipAllWins(), this.skipToggleLines = !0, e()
                }
            }, {
                key: "showSpiritThrow", value: function (e) {
                    this.callBackForSkip = e, this.state.setPhase(this.state.PHASES.SHOW_SPIRIT_THROW), this.slots.reelset.controller.view.startSpiritThrow(this.slots.model.replace, e)
                }
            }, {
                key: "skipShowSpiritThrow", value: function (e) {
                    this.slots.sphere.hasSphere ? this.slots.sphere.removeSphere() : this.slots.spirit.skipThrow(), e()
                }
            }, {
                key: "showToggleLinesWins", value: function (e) {
                    this.skipToggleLines ? e() : (this.callBackForSkip = e, (0, l.default)((0, c.default)(o.prototype), "showToggleLinesWins", this).call(this, e))
                }
            }, {
                key: "skipShowToggleLines", value: function (e) {
                    this.skipToggleLinesWins(e)
                }
            }, {
                key: "showResult", value: function (e) {
                    this.callBackForSkip = e, this.state.setPhase(this.state.PHASES.SHOW_RESULT), (0, l.default)((0, c.default)(o.prototype), "showResult", this).call(this, e)
                }
            }, {
                key: "skipShowResult", value: function (e) {
                    var t = c2d.once(function () {
                        return e()
                    });
                    c2d.eventManager.dispatch(game.events.Slots.ON_SKIP_WIN_RESULT, {}, t)
                }
            }, {
                key: "order", get: function () {
                    return [this.state.PHASES.SHOW_SPIRIT_THROW, this.state.PHASES.SHOW_REPLACE, this.state.PHASES.SHOW_RESULT, this.state.PHASES.SHOW_LINE_WINS, this.state.PHASES.SHOW_TOGGLE_LINES, this.state.PHASES.REPORT_FINISH]
                }
            }]), o
        }(game.src.SlotsFSM.FSShowResultController);
        n.default = r
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    23: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            s = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            o = r(e("@babel/runtime/helpers/createClass")), a = r(e("@babel/runtime/helpers/get")),
            l = r(e("@babel/runtime/helpers/inherits")), i = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            u = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function c(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, u.default)(n);
                return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, i.default)(this, e)
            }
        }

        r = function (e) {
            (0, l.default)(i, e);
            var t = c(i);

            function i() {
                return (0, s.default)(this, i), t.apply(this, arguments)
            }

            return (0, o.default)(i, [{
                key: "onEnterState", value: function () {
                    for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                    (e = (0, a.default)((0, u.default)(i.prototype), "onEnterState", this)).call.apply(e, [this].concat(n)), this.slots.spirit.funAnimationFS()
                }
            }]), i
        }(game.src.SlotsFSM.FSSpinStartController);
        n.default = r
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    24: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/get")),
            a = r(e("@babel/runtime/helpers/inherits")), l = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            u = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function c(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, u.default)(n);
                return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, l.default)(this, e)
            }
        }

        r = function (e) {
            (0, a.default)(n, e);
            var t = c(n);

            function n() {
                return (0, i.default)(this, n), t.apply(this, arguments)
            }

            return (0, s.default)(n, [{
                key: "onExitState", value: function () {
                    (0, o.default)((0, u.default)(n.prototype), "onExitState", this).call(this), this.slots.spirit.onResize()
                }
            }]), n
        }(game.src.SlotsFSM.FSStartController);
        n.default = r
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    25: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/createClass"))),
            s = r(e("@babel/runtime/helpers/classCallCheck")), o = r(e("@babel/runtime/helpers/inherits")),
            a = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            l = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function u(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, l.default)(n);
                return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, a.default)(this, e)
            }
        }

        r = function (e) {
            (0, o.default)(n, e);
            var t = u(n);

            function n(e) {
                return (0, s.default)(this, n), (e = t.call(this, e)).uiConfig.states.INTRO_STATE.enter = {
                    introTumbler: {visible: !0},
                    home: {visible: !1},
                    audio: {visible: !1},
                    radio: {visible: !1, title: "", text: ""},
                    quickSettingsPanel: {visible: !1},
                    balancePanel: {visible: !1},
                    betPanel: {visible: !1},
                    paytable: {visible: !1},
                    clockText: {visible: !1},
                    rules: {visible: !1}
                }, e
            }

            return (0, i.default)(n)
        }(game.src.FlatUI.State);
        n.default = r
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    26: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            o = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            a = r(e("@babel/runtime/helpers/createClass")), l = r(e("@babel/runtime/helpers/inherits")),
            i = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            s = r(e("@babel/runtime/helpers/getPrototypeOf")), u = e("./styles.js");

        function c(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, s.default)(n);
                return e = r ? (e = (0, s.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, i.default)(this, e)
            }
        }

        r = function (e) {
            (0, l.default)(s, e);
            var i = c(s);

            function s() {
                var e;
                (0, o.default)(this, s);
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                return (e = i.call.apply(i, [this].concat(n))).longDeviceButtonIndent = 70, e
            }

            return (0, a.default)(s, [{
                key: "onInitialize", value: function () {
                    var e = this;
                    game.src.FlatUI.components.initialize({respack: this._respack}), flatUI.styles = c2d.env.device.desktop() ? u.desktop : u.mobile, c2d.env.device.desktop() || (flatUI.styles.Panel.paytableButtonLowerLandscape = !0), this.config = this._respack.getAsset("config"), this.displayGroup = game.displayGroups.UI, this.zOrder = 0, this.buildLayout(), c2d.eventManager.subscribe(c2d.documentEvents.SCREEN_WAS_RESIZED, function () {
                        e.onResize.call(e)
                    }), this.onResize()
                }
            }, {
                key: "onResize", value: function () {
                    var e;
                    c2d.env.device.desktop() || c2d.env.device.portrait() && (e = 1.5 < this.ratio || c2d.env.device.tablet() ? this.actionButton.height / 2 + this.longDeviceButtonIndent : 0, this.actionButton.position.y += e)
                }
            }, {
                key: "ratio", get: function () {
                    var e = c2d.screenParams;
                    return e.screenHeight / e.screenWidth
                }
            }, {
                key: "actionButton", get: function () {
                    return this.controlsPanel.findChildById("actionButton")
                }
            }]), s
        }(game.src.FlatUI.View);
        n.default = r
    }, {
        "./styles.js": 27,
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    27: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.mobile = n.desktop = void 0;
        var r = {accent: 821689, negative: 14240844, bright: 15066597, panel: 0}, i = {
            primary: {
                normal: {color: 3684408, alpha: .8},
                hover: {color: 2697513, alpha: 1},
                pressed: {color: 2171169, alpha: .8},
                disabled: {color: 5592405, alpha: .8}
            },
            accent: {
                normal: {color: r.accent, alpha: 1},
                hover: {color: 1874345, alpha: 1},
                pressed: {color: 2927033, alpha: 1},
                disabled: {color: r.accent, alpha: 1}
            },
            negative: {
                normal: {color: r.negative, alpha: .8},
                hover: {color: 15293532, alpha: 1},
                pressed: {color: 16342108, alpha: .8},
                disabled: {color: r.negative, alpha: .8}
            }
        }, s = {back: {color: 5066061, alpha: 1}, fore: {color: 15066597, alpha: 1}}, o = {
            primary: {
                normal: {
                    normal: {color: 16748739, alpha: .8},
                    hover: {color: 16748739, alpha: .7},
                    pressed: {color: 16748739, alpha: .9},
                    disabled: {color: 15658734, alpha: 1}
                },
                toggled: {
                    normal: {color: 14680003, alpha: .8},
                    hover: {color: 14680003, alpha: .7},
                    pressed: {color: 14680003, alpha: .9},
                    disabled: {color: 14680003, alpha: 1}
                }
            }
        }, a = {
            primary: {color: 1052688, alpha: 1},
            secondary: {color: 0, alpha: 1},
            textArea: {color: 1579032, alpha: 1},
            tile: {color: 0, alpha: 1},
            shadow: {color: 0, alpha: .75},
            transparent: {color: 16711680, alpha: 0}
        }, r = {
            Color: r, Progressbar: s, FlatButton: i, ToggleButton: o, Panel: a, TextField: {
                spin_button_numbers: {
                    fontWeight: "700",
                    fontSize: "32px",
                    padding: 10,
                    fill: "0xFFFFFF",
                    stroke: "#0bc8ff",
                    strokeThickness: 2
                },
                autospin_button_numbers: {
                    fontWeight: "700",
                    fontSize: "32px",
                    padding: 10,
                    fill: "0xFFFFFF",
                    stroke: "#0bc8ff",
                    strokeThickness: 2
                },
                spin_button_text: {
                    fontWeight: "700",
                    fontSize: "21px",
                    padding: 10,
                    fill: "0xFFFFFF",
                    stroke: "#0bc8ff",
                    strokeThickness: 2
                },
                main_screen_numbers: {fontWeight: "700", fontSize: "32px", padding: 10, fill: "0xFFFFFF"},
                main_screen_text: {fontWeight: "400", fontSize: "28px", padding: 10, fill: "0x858585"},
                main_screen_show_intro: {fontWeight: "400", fontSize: "28px", padding: 10, fill: "0xFFFFFF"},
                main_screen_curved: {
                    fontWeight: "700",
                    fontSize: "15px",
                    fill: "0xFFFFFF",
                    radius: 83,
                    letterSpacing: 3
                },
                main_screen_gameName: {
                    fontWeight: "700",
                    fontSize: "24px",
                    padding: 10,
                    fill: "0xC4C4C4",
                    stroke: "#111111",
                    strokeThickness: 0,
                    letterSpacing: 0
                },
                main_screen_clock: {
                    fontWeight: "700",
                    fontSize: "24px",
                    padding: 10,
                    fill: "0xC4C4C4",
                    stroke: "#111111",
                    strokeThickness: 1,
                    wordWrap: !(n.mobile = {
                        Color: r, Progressbar: s, FlatButton: i, ToggleButton: o, Panel: a, TextField: {
                            spin_button_numbers: {
                                fontWeight: "700",
                                fontSize: "32px",
                                padding: 10,
                                fill: "0xFFFFFF",
                                stroke: "#0bc8ff",
                                strokeThickness: 2
                            },
                            autospin_button_numbers: {
                                fontWeight: "700",
                                fontSize: "32px",
                                padding: 10,
                                fill: "0xFFFFFF",
                                stroke: "#0bc8ff",
                                strokeThickness: 2
                            },
                            spin_button_text: {
                                fontWeight: "700",
                                fontSize: "21px",
                                padding: 10,
                                fill: "0xFFFFFF",
                                stroke: "#0bc8ff",
                                strokeThickness: 2
                            },
                            main_screen_numbers: {
                                fontWeight: "700",
                                fontSize: "32px",
                                padding: 10,
                                fill: "0xFFFFFF",
                                wordWrap: !1
                            },
                            main_screen_text: {fontWeight: "400", fontSize: "22px", padding: 10, fill: "0xFFFFFF"},
                            main_screen_show_intro: {
                                fontWeight: "400",
                                fontSize: "20px",
                                padding: 10,
                                fill: "0xFFFFFF"
                            },
                            main_screen_curved: {
                                fontWeight: "700",
                                fontSize: "15px",
                                fill: "0xFFFFFF",
                                radius: 83,
                                letterSpacing: 3
                            },
                            main_screen_gameName: {
                                fontWeight: "400",
                                fontSize: "20px",
                                padding: 10,
                                wordWrap: !1,
                                fill: "0xFFFFFF",
                                stroke: "#111111",
                                strokeThickness: 0,
                                letterSpacing: 0
                            },
                            main_screen_clock: {
                                fontWeight: "400",
                                fontSize: "17px",
                                padding: 10,
                                fill: "0x000000",
                                wordWrap: !1
                            },
                            option_screen_tab_active: {
                                fontWeight: "700",
                                fontSize: "32px",
                                padding: 10,
                                fill: "0x00ACED"
                            },
                            option_screen_tab_normal: {
                                fontWeight: "700",
                                fontSize: "32px",
                                padding: 10,
                                fill: "0xC4C4C4",
                                align: "center"
                            },
                            option_screen_title: {fontWeight: "400", fontSize: "40px", padding: 10, fill: "0xC4C4C4"},
                            option_screen_subtitle: {
                                fontWeight: "400",
                                fontSize: "30px",
                                padding: 10,
                                fill: "0xC4C4C4"
                            },
                            option_screen_description: {
                                fontWeight: "400",
                                fontSize: "25px",
                                padding: 10,
                                fill: "0xC4C4C4"
                            },
                            statistic_key: {fontWeight: "700", fontSize: "26px", padding: 10, fill: "0xC4C4C4"},
                            statistic_value: {fontWeight: "700", fontSize: "26px", padding: 10, fill: "0x0099FA"}
                        }
                    })
                },
                option_screen_tab_active: {fontWeight: "700", fontSize: "32px", padding: 10, fill: "0x00ACED"},
                option_screen_tab_normal: {fontWeight: "700", fontSize: "32px", padding: 10, fill: "0xC4C4C4"},
                option_screen_title: {fontWeight: "400", fontSize: "40px", padding: 10, fill: "0xC4C4C4"},
                option_screen_subtitle: {fontWeight: "400", fontSize: "30px", padding: 10, fill: "0xC4C4C4"},
                option_screen_description: {fontWeight: "400", fontSize: "25px", padding: 10, fill: "0xC4C4C4"},
                statistic_key: {fontWeight: "700", fontSize: "32px", padding: 10, fill: "0xC4C4C4"},
                statistic_value: {fontWeight: "700", fontSize: "32px", padding: 10, fill: "0x0099FA"}
            }
        };
        n.desktop = r
    }, {}],
    28: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"), i = r(e("./FSM/IntroController.js")),
            s = r(e("./ui/BetRecordDetails.js")), o = r(e("./FSM/IGResponseController.js")),
            a = r(e("./FSM/basegame/BGShowResultController.js")), l = r(e("./FSM/basegame/BGSpinStartController.js")),
            u = r(e("./FSM/basegame/BGEndController.js")), c = r(e("./FSM/freespins/FSStartController.js")),
            h = r(e("./FSM/freespins/FSRestoreController.js")), f = r(e("./FSM/freespins/FSShowResultController.js")),
            p = r(e("./FSM/freespins/FSSpinStartController.js")), d = r(e("./FSM/freespins/FSEndController.js")),
            m = r(e("./flatUI/View.js")), b = r(e("./flatUI/FlatUIState.js")),
            y = r(e("./reelset/ReelsetController.js")), v = r(e("./reelset/ReelsetView.js")),
            g = r(e("./reelset/ReelNya.js")), S = r(e("./reelset/SymbolAnimations.js")),
            r = r(e("./FSM/IdleController.js"));
        game.src.SlotsFSM.IntroController = i.default, game.src.FlatUI.bet.BetRecordDetails = s.default, game.src.SlotsFSM.IGResponseController = o.default, game.src.SlotsFSM.BGShowResultController = a.default, game.src.SlotsFSM.BGSpinStartController = l.default, game.src.SlotsFSM.BGEndController = u.default, game.src.SlotsFSM.IdleController = r.default, game.src.SlotsFSM.FSStartController = c.default, game.src.SlotsFSM.FSRestoreController = h.default, game.src.SlotsFSM.FSShowResultController = f.default, game.src.SlotsFSM.FSSpinStartController = p.default, game.src.SlotsFSM.FSEndController = d.default, game.src.Reelset.Controller = y.default, game.src.Reelset.View = v.default, game.src.Reelset.ReelNya = g.default, game.src.Reelset.SymbolAnimations = S.default, game.src.FlatUI.View = m.default, game.src.FlatUI.State = b.default
    }, {
        "./FSM/IGResponseController.js": 14,
        "./FSM/IdleController.js": 15,
        "./FSM/IntroController.js": 16,
        "./FSM/basegame/BGEndController.js": 17,
        "./FSM/basegame/BGShowResultController.js": 18,
        "./FSM/basegame/BGSpinStartController.js": 19,
        "./FSM/freespins/FSEndController.js": 20,
        "./FSM/freespins/FSRestoreController.js": 21,
        "./FSM/freespins/FSShowResultController.js": 22,
        "./FSM/freespins/FSSpinStartController.js": 23,
        "./FSM/freespins/FSStartController.js": 24,
        "./flatUI/FlatUIState.js": 25,
        "./flatUI/View.js": 26,
        "./reelset/ReelNya.js": 29,
        "./reelset/ReelsetController.js": 30,
        "./reelset/ReelsetView.js": 31,
        "./reelset/SymbolAnimations.js": 32,
        "./ui/BetRecordDetails.js": 34,
        "@babel/runtime/helpers/interopRequireDefault": 46
    }],
    29: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            o = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            a = r(e("@babel/runtime/helpers/createClass")), l = r(e("@babel/runtime/helpers/get")),
            u = r(e("@babel/runtime/helpers/inherits")), i = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            c = r(e("@babel/runtime/helpers/getPrototypeOf")), h = r(e("./SymbolsContainer.js"));

        function f(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, c.default)(n);
                return e = r ? (e = (0, c.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, i.default)(this, e)
            }
        }

        r = function (e) {
            (0, u.default)(s, e);
            var i = f(s);

            function s() {
                var e;
                (0, o.default)(this, s);
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                return (e = i.call.apply(i, [this].concat(n))).invisibleFreezeSymbols = [], e
            }

            return (0, a.default)(s, [{
                key: "startSpinAnimation", value: function () {
                    var e = this;
                    this.state = "spinning", this._speedStop = !1, this._symbols.forEach(function (e) {
                        e.visible = !0, e.show()
                    }), this._makeOneRotation(this.settings.delays.reelStart, c2d.Tween.Ease.quadIn, !1, -1, function () {
                        e.onReelStarted(), e._makeOneRotation(e.settings.delays.reelSpinning, c2d.Tween.Ease.linear, !0, -1, function () {
                        })
                    })
                }
            }, {
                key: "initialize", value: function (e, t) {
                    this._id = e, this.settings = t, this._extraAnimations = this.settings.extraAnimations || {}, this._startFrozenAnimation = this._extraAnimations.startFrozenAnimation || null, this._frozenAnimation = this._extraAnimations.frozenSymbolAnimation || null, this._endFrozenAnimation = this._extraAnimations.endFrozenAnimation || null, this.position = this.settings.getPositionForReel(e), this._symbolsContainer = new c2d.display.Container, this._symbolsContainer.virtualY = 0, this.addChild(this._symbolsContainer), this.grid = {
                        startY: .5 * this.settings.rowsHeight + (this.settings.rowsHeight + this.settings.rowsIndent) * -this.extraSymbolsCount,
                        stepY: this.settings.rowsHeight + this.settings.rowsIndent,
                        lastY: .5 * this.settings.rowsHeight + (this.settings.rowsHeight + this.settings.rowsIndent) * (this.settings.rowsCount + this.extraSymbolsCount),
                        trackY: (this.settings.rowsHeight + this.settings.rowsIndent) * (this.settings.rowsCount + 2)
                    };
                    for (var n = this.extraSymbolsCount, r = -n; r < this.settings.rowsCount + n; ++r) {
                        var i = new h.default;
                        i.position = c2d.geom.Point.create(this.settings.columnsWidth * i.anchor.x, this.grid.startY + this.grid.stepY * (r + n)), this._symbolsContainer.addChild(i), this._symbols.push(i)
                    }
                    0 !== this.extraSymbolsCount && (this._symbols.first.visible = !1, this._symbols.last.visible = !1), this.createMask()
                }
            }, {
                key: "onReelStopped", value: function () {
                    for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                    (e = (0, l.default)((0, c.default)(s.prototype), "onReelStopped", this)).call.apply(e, [this].concat(n)), this.invisibleFreezeSymbols.length && this.hideSymbols(this.invisibleFreezeSymbols)
                }
            }, {
                key: "freezeSymbols", value: function (e, t) {
                    (0, l.default)((0, c.default)(s.prototype), "freezeSymbols", this).call(this, e, t), this.invisibleFreezeSymbols = this.invisibleFreezeSymbols.concat(e)
                }
            }, {
                key: "unfreezeSymbols", value: function (e, t) {
                    var n = this, r = c2d.last(function () {
                        n.showSymbols(e), n.replaceSymbols(e), n.invisibleFreezeSymbols = [], t()
                    }, e.length);
                    e.forEach(function (e) {
                        n.getSymbol(e.id).unfreeze(n.freezeAnimations[e.id], e, function () {
                            r(), delete n.freezeAnimations[e.id]
                        })
                    }), this.hideSymbols(e)
                }
            }, {
                key: "unfreezeSymbolsImmediately", value: function () {
                }
            }, {
                key: "replaceSymbols", value: function (e) {
                    var n = this;
                    e.forEach(function (e) {
                        var t = n.getSymbol(e.id);
                        "pattern_in" !== t.currentAnimation && t.setAnimation(game.src.Reelset.SymbolAnimations.getAnimation(e, "static"))
                    })
                }
            }, {
                key: "showSymbols", value: function (e) {
                    var t = this;
                    e.forEach(function (e) {
                        e = e.symId;
                        t.getSymbol(e).alpha = 1
                    })
                }
            }, {
                key: "hideSymbols", value: function (e, t) {
                    var n = this, r = c2d.last(t, e.length);
                    e.forEach(function (e) {
                        e = e.symId, e = n.getSymbol(e);
                        c2d.Tween.get(e).to({alpha: 0}, 250).call(r)
                    })
                }
            }, {
                key: "createMask", value: function () {
                    var e, t, n;
                    this.settings.mask && this.settings.mask.spriteName && (e = (n = this.settings.mask).scale, t = n.position, n = n.spriteName, n = new c2d.display.Sprite(this.respack.getAsset(n)), e && n.scale.set(e.x, e.y), t && n.position.set(t.x, t.y), this.addChild(n), this.mask = n)
                }
            }]), s
        }(game.src.Reelset.ReelNya);
        n.default = r
    }, {
        "./SymbolsContainer.js": 33,
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    30: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            s = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/slicedToArray"))),
            o = r(e("@babel/runtime/helpers/classCallCheck")), a = r(e("@babel/runtime/helpers/createClass")),
            l = r(e("@babel/runtime/helpers/get")), u = r(e("@babel/runtime/helpers/inherits")),
            i = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            c = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function h(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, c.default)(n);
                return e = r ? (e = (0, c.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, i.default)(this, e)
            }
        }

        var f = game.events.Reelset, p = game.src.Reelset.SymbolAnimations, r = function (e) {
            (0, u.default)(i, e);
            var t = h(i);

            function i(e) {
                return (0, o.default)(this, i), (e = t.call(this, e)).WILD_ID = 0, e.slotsModel = null, e
            }

            return (0, a.default)(i, [{
                key: "startSpin", value: function () {
                    var e = 0 < arguments.length && void 0 !== arguments[0] && arguments[0];
                    this.memberNotWinSymbols = null, this.view.startSpinAnimation(this.model.reels, e)
                }
            }, {
                key: "initReels", value: function () {
                    for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                    (e = (0, l.default)((0, c.default)(i.prototype), "initReels", this)).call.apply(e, [this].concat(n)), this.setStartAlphaForSymbols()
                }
            }, {
                key: "onRun", value: function () {
                    var t = this;
                    (0, l.default)((0, c.default)(i.prototype), "onRun", this).call(this), this.defineLinkedComponents(), this.eventRouter.listenerEventRouter.once(game.events.Slots.ON_MODEL_CHANGED, function (e) {
                        t.slotsModel = e.data
                    })
                }
            }, {
                key: "beforeSpin", value: function (e) {
                    this.setStartAlphaForSymbols(), e()
                }
            }, {
                key: "onInitialize", value: function () {
                    for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                    (e = (0, l.default)((0, c.default)(i.prototype), "onInitialize", this)).call.apply(e, [this].concat(n)), this.view.model = this.model
                }
            }, {
                key: "setStartAlphaForSymbols", value: function () {
                    var t = this;
                    this.model.symbols.forEach(function (e) {
                        t.view.getSymbol(e.reelId, e.id).alpha = 1
                    })
                }
            }, {
                key: "defineLinkedComponents", value: function () {
                    this.view.sphere || (this.view.sphere = this.getLinkedComponent("sphere"), this.view.spirit = this.getLinkedComponent("spirit"))
                }
            }, {
                key: "showReplaceSymbols", value: function (e, t) {
                    this.dispatch(f.REELSET_DID_SHOW_REPLACE_SYMBOLS), this.replaceSymbols(e, t)
                }
            }, {
                key: "prepareSymbolsForShowPattern", value: function (e) {
                    var r = this, i = e.lineWins.flatMap(function (e) {
                        return e.positions
                    }).sort(function (e, t) {
                        return 10 * e.reelId - 10 * t.reelId - (e.symId - t.symId)
                    }).filter(function (e, t, n) {
                        return r.filterWinWilds(e, t, n)
                    });
                    this.model.reels.flatMap(function (e) {
                        return e.symbols
                    }).reduce(function (e, t) {
                        var e = (0, s.default)(e, 2), n = e[0], e = e[1];
                        return (r.isWild(i, t) ? e : n).push(t), [n, e]
                    }, [[], []]).forEach(function (e, t) {
                        var n = t ? "static" : "lose";
                        e.forEach(function (e) {
                            var t = r.symbolAnimations.getAnimation(e, n);
                            r.view.setSymbolAnimation(e.reelId, e.id, t)
                        })
                    })
                }
            }, {
                key: "filterWinWilds", value: function (e, t, n) {
                    var r = e.reelId, e = e.symId, n = !t || n[t - 1].reelId !== r || n[t - 1].symId !== e,
                        t = this.model.getSymbol(r, e).type === this.WILD_ID;
                    return n && t
                }
            }, {
                key: "isWild", value: function (e, t) {
                    var n = t.reelId, r = t.id;
                    return e.find(function (e) {
                        var t = e.reelId, e = e.symId;
                        return t === n && e === r
                    })
                }
            }, {
                key: "startMoveKodama", value: function (e, t) {
                    this.view.startMoveKodama(e, t)
                }
            }, {
                key: "skipMoveKodama", value: function (e, t) {
                    this.view.skipMoveKodama(e, t)
                }
            }, {
                key: "moveKodamaToSpirit", value: function (e, t, n) {
                    this.view.startMoveKodamaToSpirit(e, t, n)
                }
            }, {
                key: "skipMoveKodamaToSpirit", value: function (e, t) {
                    this.view.sphere.hasSphere ? (this.view.sphere.removeSphere(), t()) : this.view.skipMoveKodamaToSpirit(e, t)
                }
            }, {
                key: "showScatterWins", value: function (e, t) {
                    var i = this, n = e.reduce(function (e, t) {
                        return e + t.positions.length
                    }, 0), s = c2d.last(function () {
                        t && t(), i.dispatch(f.REELSET_DID_SHOW_WIN_SCATTERS)
                    }, n);
                    this.dispatch(f.REELSET_WILL_SHOW_WIN_SCATTERS, {type: e.first.type}), e.forEach(function (e) {
                        e.positions.forEach(function (e) {
                            var t = e.reelId, n = e.symId,
                                r = i.symbolAnimations.getAnimation({type: i.WILD_ID}, i.model.turboMode ? "win_turbo" : "win");
                            i.view.setSymbolAnimation(t, n, r, function () {
                                i.view.setSymbolAnimation(t, n, i.symbolAnimations.getAnimation({type: i.WILD_ID}, "static")), s()
                            }), i.dispatch(f.REELSET_SHOW_WIN_SYMBOL, {
                                position: e,
                                symbol: i.view.getSymbol(t, n),
                                type: i.WILD_ID
                            })
                        })
                    }), this.showNotWinSymbols(this.model.getNotWinSymbols(e))
                }
            }, {
                key: "setFsSkin", value: function () {
                    var n = this;
                    this.model.reels.flatMap(function (e) {
                        return e.symbols
                    }).forEach(function (e) {
                        var t = e.reelId, e = e.id, t = n.view.getSymbol(t, e);
                        t && t.setFSSkin()
                    })
                }
            }, {
                key: "replaceSymbols", value: function (e, t) {
                    var s = this, o = c2d.once(function () {
                        c2d.eventManager.dispatch("SymbolReplacer.REELSET_MULTIPLIER")
                    }), a = c2d.last(t, e.length);
                    e.forEach(function (e) {
                        var t = e.reelId, n = e.id, e = e.replace, r = s.model.getSymbol(t, n),
                            i = (s.model.freespins.isActiveStatus && (e = "kodama_".concat(t, "_").concat(n)), r.type = e, p.getAnimationForSymbol(t, n, "static")),
                            r = p.getAnimationForSymbol(t, n, "replace");
                        "base" !== r.skin && o(), s.view.setSymbolAnimation(t, n, r, function () {
                            s.view.setSymbolAnimation(t, n, i), a()
                        })
                    })
                }
            }, {
                key: "skipReplaceSymbols", value: function (e, t) {
                    var i = this, s = c2d.last(t, e.length);
                    e.forEach(function (e) {
                        var t = e.reelId, n = e.id, e = e.replace, r = i.model.getSymbol(t, n),
                            r = (i.model.freespins.isActiveStatus && (e = "kodama_".concat(t, "_").concat(n)), r.type = e, p.getAnimationForSymbol(t, n, "static"));
                        i.view.setSymbolAnimation(t, n, r), s()
                    })
                }
            }, {
                key: "playWinAnimation", value: function (e, t, n) {
                    var r = this, i = this.model.getSymbol(e, t), s = this.view.getSymbol(e, t),
                        o = this.view.reels[e].freezeAnimations[t];
                    this.view.stopSymbolAnimation(e, t), i.type && o ? (s.alpha = 0, o.setAnimation(game.src.Reelset.SymbolAnimations.getAnimation({type: 0}, "freeze_win")), o.onComplete = function () {
                        o.setAnimation(game.src.Reelset.SymbolAnimations.getAnimation({type: 0}, "freeze_idle")), n()
                    }) : this.view.setSymbolAnimation(e, t, this.symbolAnimations.getAnimation(i, this.model.turboMode ? "win_turbo" : "win"), function () {
                        r.view.setSymbolAnimation(e, t, r.symbolAnimations.getAnimation(i, "static")), n()
                    })
                }
            }, {
                key: "showNotWinSymbols", value: function (e) {
                    var r = this, t = e;
                    (t = this.memberNotWinSymbols ? e.filter(function (t) {
                        return !r.memberNotWinSymbols.some(function (e) {
                            return t.symId === e.symId && t.reelId === e.reelId
                        })
                    }) : t).map(function (e) {
                        return r.model.getSymbol(e.reelId, e.symId)
                    }).forEach(function (e) {
                        var t = r.view.reels[e.reelId].freezeAnimations[e.id],
                            n = r.symbolAnimations.getAnimation(e, "lose");
                        n && r.view.setSymbolAnimation(e.reelId, e.id, n), e.type && t && (r.view.getSymbol(e.reelId, e.id).alpha = 0)
                    }), this.memberNotWinSymbols = e
                }
            }, {
                key: "skipAllWins", value: function () {
                    var n = this;
                    this.dispatch(f.REELSET_DID_SKIP_ALL_WINS), this.memberNotWinSymbols = null, this.model.symbols.forEach(function (e) {
                        n.view.setSymbolAnimation(e.reelId, e.id, n.symbolAnimations.getAnimation(e, "static"));
                        var t = n.view.getSymbol(e.reelId, e.id), e = n.view.reels[e.reelId].freezeAnimations[e.id];
                        t.alpha < 1 && e && e.setAnimation(game.src.Reelset.SymbolAnimations.getAnimation({type: 0}, "freeze_idle"))
                    })
                }
            }]), i
        }(game.src.Reelset.Controller);
        n.default = r
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51,
        "@babel/runtime/helpers/slicedToArray": 54
    }],
    31: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            u = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/regenerator"))),
            c = r(e("@babel/runtime/helpers/slicedToArray")), h = r(e("@babel/runtime/helpers/asyncToGenerator")),
            f = r(e("@babel/runtime/helpers/classCallCheck")), p = r(e("@babel/runtime/helpers/createClass")),
            d = r(e("@babel/runtime/helpers/inherits")), i = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            s = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function m(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, s.default)(n);
                return e = r ? (e = (0, s.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, i.default)(this, e)
            }
        }

        r = function (e) {
            (0, d.default)(l, e);
            var i, s, t, n, r, o, a = m(l);

            function l() {
                var e;
                (0, f.default)(this, l);
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                return (e = a.call.apply(a, [this].concat(n))).sphere = null, e.spirit = null, e.model = null, e.WILD_ID = 0, e.HIDE_WILD_ID = 1, e
            }

            return (0, p.default)(l, [{
                key: "moveKodamaToSpirit",
                value: (o = (0, h.default)(u.default.mark(function e(t, n) {
                    var r, i, s;
                    return u.default.wrap(function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                return r = t.reelId, i = t.symId, s = this.getSymbol(r, i), e.next = 4, this.playKodamaIn(r, i);
                            case 4:
                                return e.next = 6, this.sphere.move(s, n, "", "idle_gather");
                            case 6:
                            case"end":
                                return e.stop()
                        }
                    }, e, this)
                })), function (e, t) {
                    return o.apply(this, arguments)
                })
            }, {
                key: "startSpiritThrow", value: function (e, t) {
                    var n = this, r = e.symbols;
                    this.spirit.playThrow(function () {
                        var e = r.map(function (e) {
                            var t = e.reelId, e = e.id, t = n.getSymbol(t, e);
                            return n.sphere.move(n.spirit.spiritFsThrow, t, "", "pattern_idle", 500, c2d.Tween.Ease.quartOut)
                        });
                        Promise.all(e).then(t)
                    })
                }
            }, {
                key: "startMoveKodamaToSpirit", value: function (e, t) {
                    var n = this, r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : function () {
                    }, e = e.map(function (e) {
                        return n.moveKodamaToSpirit(e, t)
                    });
                    Promise.all(e).then(function () {
                        r()
                    })
                }
            }, {
                key: "skipMoveKodamaToSpirit", value: function (e, t) {
                    var i = this, s = c2d.last(t, e.length);
                    e.forEach(function (e) {
                        var t, n = e.reelId, e = e.symId, r = i.getSymbol(n, e);
                        "pattern_in" === r.currentAnimation ? (r.onComplete = function () {
                        }, r.endAnimation(), r.alpha = 0, s()) : (t = i.settings.extraAnimations, i.setSymbolAnimation(n, e, t.pattern_in, function () {
                            r.alpha = 0, s()
                        }))
                    })
                }
            }, {
                key: "startMoveKodama", value: (r = (0, h.default)(u.default.mark(function e(t, n) {
                    var i, r, s = this;
                    return u.default.wrap(function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                return i = [], r = t.map(function (e) {
                                    var t, n, r;
                                    return e.in_position ? (r = Object.values(e.in_position), t = (r = (0, c.default)(r, 2))[0], r = r[1], s.sphere.hidePatternFragment(t, r), i.push({
                                        reelId: t,
                                        symId: r
                                    }), Promise.resolve()) : (t = e.from, r = e.to, e = Object.values(t), e = (t = (0, c.default)(e, 2))[0], t = t[1], r = Object.values(r), n = (r = (0, c.default)(r, 2))[0], r = r[1], i.push({
                                        reelId: n,
                                        symId: r
                                    }), s.moveKodamaToPoint(e, t, n, r))
                                }), e.next = 4, Promise.all(r);
                            case 4:
                                return c2d.eventManager.dispatch("SymbolReplacer.REELSET_PLAY_WILD_IN"), e.next = 7, this.playRealKodamasOut(i);
                            case 7:
                                this.playKodamaIdle(i), n();
                            case 9:
                            case"end":
                                return e.stop()
                        }
                    }, e, this)
                })), function (e, t) {
                    return r.apply(this, arguments)
                })
            }, {
                key: "skipMoveKodama", value: (n = (0, h.default)(u.default.mark(function e(t, n) {
                    var i, r, s = this;
                    return u.default.wrap(function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                return i = [], r = t.map(function (e) {
                                    var t, n, r;
                                    return e.in_position ? (r = Object.values(e.in_position), t = (r = (0, c.default)(r, 2))[0], r = r[1], s.getSymbol(t, r).onComplete = function () {
                                    }, s.getSymbol(t, r).endAnimation(), s.sphere.hidePatternFragment(t, r), i.push({
                                        reelId: t,
                                        symId: r
                                    }), Promise.resolve()) : (t = e.from, r = e.to, e = Object.values(t), e = (t = (0, c.default)(e, 2))[0], t = t[1], r = Object.values(r), n = (r = (0, c.default)(r, 2))[0], r = r[1], s.getSymbol(e, t).onComplete = function () {
                                    }, s.getSymbol(e, t).endAnimation(), s.getSymbol(n, r).onComplete = function () {
                                    }, s.getSymbol(n, r).endAnimation(), s.instantKodamaToPoint(e, t, n, r))
                                }), e.next = 4, Promise.all(r);
                            case 4:
                                return e.next = 6, this.playRealKodamasOut(i);
                            case 6:
                                this.playKodamaIdle(i), n();
                            case 8:
                            case"end":
                                return e.stop()
                        }
                    }, e, this)
                })), function (e, t) {
                    return n.apply(this, arguments)
                })
            }, {
                key: "playRealKodamasOut", value: (t = (0, h.default)(u.default.mark(function e(t) {
                    var i, n, s = this;
                    return u.default.wrap(function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                return i = this.settings.extraAnimations, n = t.map(function (e) {
                                    var n = e.reelId, r = e.symId;
                                    return new Promise(function (e) {
                                        var t = s.getSymbol(n, r);
                                        s.sphere.hidePatternFragment(n, r), t.HIDE_WILD_ID === s.HIDE_WILD_ID ? (t.animation.play("pattern_out"), t.onComplete = e) : s.setSymbolAnimation(n, r, i.pattern_out, function () {
                                            return e()
                                        })
                                    })
                                }), e.next = 4, Promise.all(n);
                            case 4:
                            case"end":
                                return e.stop()
                        }
                    }, e, this)
                })), function (e) {
                    return t.apply(this, arguments)
                })
            }, {
                key: "instantKodamaToPoint", value: (s = (0, h.default)(u.default.mark(function e(t, n, r, i) {
                    return u.default.wrap(function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                return this.model.getSymbol(r, i).type = this.WILD_ID, e.next = 4, this.playKodamaIn(t, n);
                            case 4:
                                this.playKodamaOut(r, i);
                            case 5:
                            case"end":
                                return e.stop()
                        }
                    }, e, this)
                })), function (e, t, n, r) {
                    return s.apply(this, arguments)
                })
            }, {
                key: "moveKodamaToPoint", value: (i = (0, h.default)(u.default.mark(function e(t, n, r, i) {
                    var s, o;
                    return u.default.wrap(function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                return s = this.getSymbol(t, n), o = this.getSymbol(r, i), this.model.getSymbol(r, i).type = this.WILD_ID, this.playKodamaIn(t, n), e.next = 7, this.sphere.move(s, o);
                            case 7:
                            case"end":
                                return e.stop()
                        }
                    }, e, this)
                })), function (e, t, n, r) {
                    return i.apply(this, arguments)
                })
            }, {
                key: "playKodamaIn", value: function (r, i) {
                    var s = this;
                    return new Promise(function (e) {
                        var t = s.settings.extraAnimations, n = s.getSymbol(r, i);
                        n.onComplete = function () {
                        }, n.endAnimation(), n.animation.stop(), s.setSymbolAnimation(r, i, t.pattern_in, function () {
                            s.getSymbol(r, i).alpha = 0, e()
                        })
                    })
                }
            }, {
                key: "playKodamaOut", value: function (n, r) {
                    var i = this;
                    return new Promise(function (e) {
                        var t = i.settings.extraAnimations;
                        i.sphere.hidePatternFragment(n, r), i.setSymbolAnimation(n, r, t.pattern_out, function () {
                            return e()
                        })
                    })
                }
            }, {
                key: "playKodamaIdle", value: function (e) {
                    var n = this;
                    e.map(function (e) {
                        var t = e.reelId, e = e.symId;
                        n.getSymbol(t, e).animation.play("pattern_idle")
                    })
                }
            }, {
                key: "hideKodama", value: function (o, a) {
                    var l = this;
                    return new Promise(function (e) {
                        var t = Object.values(o), t = (0, c.default)(t, 2), n = t[0], r = t[1],
                            t = l.settings.extraAnimations, i = t.kodama_hide, s = t.kodama_empty;
                        c2d.eventManager.dispatch("Fun.KODAMA_FACE"), l.setSymbolAnimation(n, r, i, function () {
                            l.setSymbolAnimation(n, r, s), l.setKodamaHiding(n, r), e()
                        }), l.getSymbol(n, r).animation.onEvent = function (e, t) {
                            "in" === t.data.name && a()
                        }
                    })
                }
            }, {
                key: "setKodamaHiding", value: function (e, t) {
                    var n = this.getReel(e);
                    n.getSymbol(t).HIDE_WILD_ID = this.HIDE_WILD_ID, n.once(game.events.Reelset.REEL_DID_SPINNING, function () {
                        n._symbols.forEach(function (e) {
                            e.HIDE_WILD_ID = 0
                        })
                    })
                }
            }, {
                key: "getHideKodama", value: function (e) {
                    var e = Object.values(e), e = (0, c.default)(e, 2), t = e[0], e = e[1], t = this.getSymbol(t, e);
                    return t.stopFunAnimation(), t
                }
            }, {
                key: "createMask", value: function () {
                }
            }, {
                key: "runFunIdle", value: function (e, t) {
                    e = this.getSymbol(e, t);
                    this.model.freespins.isActiveStatus ? e.stopFunAnimation() : e.runFunIdle()
                }
            }, {
                key: "stopFunIdle", value: function (e, t) {
                    this.getSymbol(e, t).stopFunAnimation()
                }
            }, {
                key: "removeMask", value: function () {
                    window.reels = this.reels, this.reels.forEach(function (e) {
                        e.mask && (e.mask.removeFromParent(), e.mask = null)
                    })
                }
            }, {
                key: "setMask", value: function () {
                    this.reels.forEach(function (e) {
                        e.createMask()
                    })
                }
            }]), l
        }(game.src.Reelset.View);
        n.default = r
    }, {
        "@babel/runtime/helpers/asyncToGenerator": 40,
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51,
        "@babel/runtime/helpers/slicedToArray": 54,
        "@babel/runtime/regenerator": 59
    }],
    32: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/get")),
            a = r(e("@babel/runtime/helpers/inherits")), l = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            u = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function c(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, u.default)(n);
                return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, l.default)(this, e)
            }
        }

        r = function (e) {
            (0, a.default)(r, e);
            var t = c(r);

            function r() {
                return (0, i.default)(this, r), t.apply(this, arguments)
            }

            return (0, s.default)(r, null, [{
                key: "getAnimation", value: function (e, t) {
                    var n = e.type,
                        t = (String(e.type).includes("/") && (e.type = String(e.type).split("/")[0]), (0, o.default)((0, u.default)(r), "getAnimation", this).call(this, e, t));
                    return t && !["0", "kodama_1_0", "kodama_1_2", "kodama_3_0", "kodama_3_2", "kodama_2_1"].contains(String(n)) && Number(e.type) < 10 && (t.skin = this._reelsetModel.freespins && this._reelsetModel.freespins.isActiveStatus ? "fs" : "base"), t
                }
            }]), r
        }(game.src.Reelset.SymbolAnimations);
        n.default = r
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    33: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
            s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/get")),
            a = r(e("@babel/runtime/helpers/inherits")), l = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            u = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function c(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, u.default)(n);
                return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, l.default)(this, e)
            }
        }

        r = function (e) {
            (0, a.default)(n, e);
            var t = c(n);

            function n(e) {
                return (0, i.default)(this, n), (e = t.call(this, e)).anchor = new c2d.geom.Point(.5, .5), e.currentAnimation = "", e.funTimer = null, e.FUN_TRACK = 1, e.HIDE_WILD_ID = 0, e
            }

            return (0, s.default)(n, [{
                key: "setAnimation", value: function (e) {
                    this.animation && (this.skin = null), this.HIDE_WILD_ID || ((0, o.default)((0, u.default)(n.prototype), "setAnimation", this).call(this, e), this.currentAnimation = e.animation, this.animation.anchor = new c2d.geom.Point(.5, .5))
                }
            }, {
                key: "freeze", value: function (e, t) {
                    e = new c2d.display.Animation(game.src.Reelset.SymbolAnimations.getAnimation(e, "freeze_idle"));
                    return e.anchor = new c2d.geom.Point(.5, .5), e.x = this.x, e.y = this.y, t && t(), e
                }
            }, {
                key: "unfreeze", value: function (e, t, n) {
                    e.setAnimation(game.src.Reelset.SymbolAnimations.getAnimation(t, "freeze_out")), e.onComplete = function () {
                        e.parent.removeChild(e), n && n()
                    }
                }
            }, {
                key: "stop", value: function () {
                    this.animation.stop()
                }
            }, {
                key: "hide", value: function () {
                    this.alpha = 0
                }
            }, {
                key: "show", value: function () {
                    this.alpha = 1
                }
            }, {
                key: "hasAnimation", value: function (e) {
                    return this.animation.stateData.skeletonData.findAnimation(e)
                }
            }, {
                key: "setFSSkin", value: function () {
                    this.animation.stateData.skeletonData.findSkin("fs") && (this.skin = "fs")
                }
            }, {
                key: "endAnimation", value: function () {
                    this.animation.currentTime = this.animation.totalTime
                }
            }, {
                key: "skin", set: function (e) {
                    this.animation.skin = e
                }
            }, {
                key: "funAnimation", value: function () {
                    this.funTimer = null, this.animation && this.animation.state.data.skeletonData.animations.some(function (e) {
                        return "event_2" === e.name
                    }) && (c2d.eventManager.dispatch("Fun.KODAMA_FUN"), this.animation.state.setAnimation(this.FUN_TRACK, "event_2"))
                }
            }, {
                key: "stopFunAnimation", value: function () {
                    this.funTimer && (c2d.Timeout.clear(this.funTimer), this.funTimer = null)
                }
            }, {
                key: "runFunIdle", value: function () {
                    var e = this;
                    this.funTimer && this.funAnimation(), this.funTimer = c2d.Timeout.invoke(function () {
                        return e.runFunIdle()
                    }, this.randomDelay)
                }
            }, {
                key: "randomDelay", get: function () {
                    return 1e4 * Math.random() + 5e3
                }
            }]), n
        }(c2d.display.Animation);
        n.default = r
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51
    }],
    34: [function (e, t, n) {
        "use strict";
        var r = e("@babel/runtime/helpers/interopRequireDefault"),
            i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/slicedToArray"))),
            s = r(e("@babel/runtime/helpers/toConsumableArray")), o = r(e("@babel/runtime/helpers/classCallCheck")),
            a = r(e("@babel/runtime/helpers/createClass")), l = r(e("@babel/runtime/helpers/get")),
            u = r(e("@babel/runtime/helpers/inherits")), c = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
            h = r(e("@babel/runtime/helpers/getPrototypeOf"));

        function f(n) {
            var r = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = (0, h.default)(n);
                return e = r ? (e = (0, h.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, c.default)(this, e)
            }
        }

        var r = flatUI.layout, p = r.FrameLayout, d = r.GridLayout, e = function (e) {
            (0, u.default)(n, e);
            var t = f(n);

            function n() {
                return (0, o.default)(this, n), t.apply(this, arguments)
            }

            return (0, a.default)(n, [{
                key: "initialize", value: function (e) {
                    this.multiplierSkin = {
                        "1_0": "base",
                        "1_2": "base",
                        "3_0": "x3",
                        "3_2": "x2",
                        "2_1": "x5"
                    }, this.animalSkin = "fs", this.kodamaSkin = "base", this.wildsForFS = {
                        4: 8,
                        5: 12
                    }, (0, l.default)((0, h.default)(n.prototype), "initialize", this).call(this, e)
                }
            }, {
                key: "featuresOrder", get: function () {
                    return [this.inflateBetInfo(), this.hasReelset && this.inflateReelset(), this.hasBonusGame && this.inflateBonusGame(this.betRecordModel.bonusGame), this.inflateBalance(), this.inflateActionResult(), this.hasReplaces && this.hasFreespins && this.inflateReplacesFS(this.betRecordModel.replace), this.hasReplaces && !this.hasFreespins && this.inflateReplaces(this.betRecordModel.replace), this.inflateGameFeature(), this.hasWinFreespins && this.inflateWinFreespins(), this.hasWinMoreFreespins && this.inflateWinMoreFreespins(), this.hasWinBonusGame && this.inflateWinBonusGame(), this.hasFreespins && this.inflateFreespinsFeature(), this.hasBonusGame && this.inflateBonusGameFeature(), this.hasFreezes && this.inflateFreezes(this.betRecordModel.freeze), this.hasWalks && this.inflateWalks(this.betRecordModel.walks), this.hasExpands && this.inflateExpands(this.betRecordModel.reels.filter(function (e) {
                        return e.expanded
                    })), this.hasExtra && this.inflateExtra(this.betRecordModel.extra), this.hasCollectibleWins && this.inflateWinCollectibleWins(this.betRecordModel.collectibleWins), this.hasWinFirstRespin && this.inflateWinFirstRespin(this.betRecordModel.respin), this.hasWinNextRespin && this.inflateWinNextRespin(this.betRecordModel.respin), this.hasFreespinsExtra && this.inflateFreespinsExtra(this.betRecordModel.freespins.extra), this.hasWins && this.inflateWins(this.betRecordModel)]
                }
            }, {
                key: "inflateWins", value: function (e) {
                    var n = this, e = e.lineWins, r = {simple: [], multi: []};
                    return (void 0 === e ? [] : e).forEach(function (e) {
                        var t = n.inflateLineWin(e, n.parameters.lineWin);
                        (1 < e.multiplier ? r.multi : r.simple).push(t)
                    }), new p({layoutWidth: "100%", align: "center"}, [new d({
                        layoutWidth: "100%",
                        columnCount: 1,
                        padding: 2
                    }, [].concat((0, s.default)(r.simple), [r.multi.length && this.inflateFeature({header: "history_multiplier_header".ls()})], (0, s.default)(r.multi)))])
                }
            }, {
                key: "hasFreezes", get: function () {
                    return !1
                }
            }, {
                key: "replaceSymbols", value: function (e) {
                    var r = this.betRecordModel.reels.map(function (e) {
                        return {
                            symbols: e.symbols.map(function (e) {
                                return Object.assign({}, e)
                            })
                        }
                    });
                    return e.forEach(function (e) {
                        var t = e.reelId, n = e.id, e = e.replace;
                        r[t].symbols[n].type = e
                    }), r
                }
            }, {
                key: "patternSymbols", value: function (e) {
                    var n = this.betRecordModel.reels.map(function (e) {
                        return {
                            symbols: e.symbols.map(function (e) {
                                return Object.assign({}, e)
                            })
                        }
                    });
                    return Object.entries(e).flatMap(function (e) {
                        var e = (0, i.default)(e, 2), e = (e[0], e[1]), t = e.in_position;
                        e.to;
                        return t
                    }).filter(function (e) {
                        return e
                    }).forEach(function (e) {
                        var t = e[0], e = e[1];
                        n[t].symbols[e].type = 0
                    }), n
                }
            }, {
                key: "hasFinalLooseRespin", get: function () {
                    return this.betRecordModel.respin && this.betRecordModel.respin.isFinalRespin && !this.betRecordModel.extra.pattern_wilds
                }
            }, {
                key: "betRecordModelReels", get: function () {
                    var r;
                    return this.hasFinalLooseRespin ? (r = this.betRecordModel.reels.map(function (e) {
                        return {
                            symbols: e.symbols.map(function (e) {
                                return Object.assign({}, e)
                            })
                        }
                    }), this.betRecordModel.freeze.unfreeze.positions.forEach(function (e) {
                        var t = e.reelId, n = e.symId, e = e.type;
                        r[t].symbols[n].type = e
                    }), r) : this.hasFreespins && this.hasReplaces ? this.replaceSymbols(this.betRecordModel.replace.symbols) : this.hasWinFreespins || this.hasWinNextRespin ? this.patternSymbols(this.betRecordModel.extra.pattern_wilds) : this.hasReplaces && !this.hasFreespins ? this.replaceSymbols(this.betRecordModel.replace._symbols) : this.betRecordModel.reels
                }
            }, {
                key: "createReelsetSymbols", value: function () {
                    var a = this, e = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).iconScale,
                        l = void 0 === e ? this.reelsetScale : e, u = [],
                        e = this.betRecordModelReels.reduce(function (e, t) {
                            return e.concat(t.symbols)
                        }, []), c = game.src.Reelset.SymbolAnimations.reelsetViewConfig;
                    return e.forEach(function (e) {
                        var t = e.reelId, n = e.id, r = e.type, i = c.columnsWidth + c.columnsIndent,
                            s = c.reelViewConfig.rowsHeight + c.reelViewConfig.rowsIndent,
                            o = n * a.betRecordModel.reels.length + t;
                        u[o] = new game.src.FlatUI.bet.BetHistorySymbol(e, "static", {
                            zoom: l,
                            layoutWidth: i * l + "px",
                            layoutHeight: s * l + "px"
                        }), u[o].animation.animation.skin = 0 === r ? a.hasFreespins && a.multiplierSkin["".concat(t, "_").concat(n)] || a.kodamaSkin : a.animalSkin
                    }), this.reelsetSymbols = u
                }
            }, {
                key: "inflateWinFirstRespin", value: function () {
                    return this.inflateFeature({
                        icon: "11",
                        animation: "history_idle",
                        header: "history_respin_header".ls(),
                        text: "history_respin_description".ls(),
                        iconScale: .75
                    })
                }
            }, {
                key: "inflateWinNextRespin", value: function (e) {
                    return this.inflateFeature({
                        icon: "11",
                        animation: "history_idle",
                        header: "history_respin_header".ls(),
                        text: "history_respin_description".ls(),
                        iconScale: .75
                    })
                }
            }, {
                key: "inflateWinFreespins", value: function () {
                    var e = Object.entries(this.betRecordModel.extra.pattern_wilds).length;
                    return this.inflateFeature({
                        icon: "12",
                        animation: "history_idle",
                        header: "history_freespins_header".ls(),
                        text: "history_freespins_description".ls({AMOUNT: this.wildsForFS[e].toString()}),
                        iconScale: .75
                    })
                }
            }, {
                key: "inflateReplacesFS", value: function () {
                    return this.inflateFeature({
                        icon: "10",
                        animation: "history_idle",
                        header: "history_wilds_in_freespins_header".ls(),
                        text: "history_wilds_in_freespins_description".ls(),
                        iconScale: .65
                    })
                }
            }, {
                key: "inflateReplaces", value: function () {
                    return this.inflateFeature({
                        icon: "9",
                        animation: "history_idle",
                        header: "history_peekaboo_header".ls(),
                        text: "history_peekaboo_appear_description".ls(),
                        iconScale: .85
                    })
                }
            }, {
                key: "inflateExtra", value: function (e) {
                    return e.need_to_hide ? this.inflateRandomEvent() : null
                }
            }, {
                key: "inflateRandomEvent", value: function () {
                    return this.inflateFeature({
                        icon: "9",
                        animation: "history_idle",
                        header: "history_peekaboo_header".ls(),
                        text: "history_peekaboo_hide_description".ls(),
                        iconScale: .85
                    })
                }
            }]), n
        }(game.src.FlatUI.bet.BetRecordDetails);
        n.default = e
    }, {
        "@babel/runtime/helpers/classCallCheck": 41,
        "@babel/runtime/helpers/createClass": 42,
        "@babel/runtime/helpers/get": 43,
        "@babel/runtime/helpers/getPrototypeOf": 44,
        "@babel/runtime/helpers/inherits": 45,
        "@babel/runtime/helpers/interopRequireDefault": 46,
        "@babel/runtime/helpers/possibleConstructorReturn": 51,
        "@babel/runtime/helpers/slicedToArray": 54,
        "@babel/runtime/helpers/toConsumableArray": 56
    }],
    35: [function (e, t, n) {
        "use strict";
        e("./components/index.js"), e("./extensions/index.js"), e("../../../-sources/extensions/lines/linesChunk/index.js"), game.run()
    }, {
        "../../../-sources/extensions/lines/linesChunk/index.js": 4,
        "./components/index.js": 7,
        "./extensions/index.js": 28
    }],
    36: [function (e, t, n) {
        t.exports = function (e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
            return r
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {}],
    37: [function (e, t, n) {
        t.exports = function (e) {
            if (Array.isArray(e)) return e
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {}],
    38: [function (e, t, n) {
        var r = e("./arrayLikeToArray.js");
        t.exports = function (e) {
            if (Array.isArray(e)) return r(e)
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {"./arrayLikeToArray.js": 36}],
    39: [function (e, t, n) {
        t.exports = function (e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {}],
    40: [function (e, t, n) {
        function l(e, t, n, r, i, s, o) {
            try {
                var a = e[s](o), l = a.value
            } catch (e) {
                return void n(e)
            }
            a.done ? t(l) : Promise.resolve(l).then(r, i)
        }

        t.exports = function (a) {
            return function () {
                var e = this, o = arguments;
                return new Promise(function (t, n) {
                    var r = a.apply(e, o);

                    function i(e) {
                        l(r, t, n, i, s, "next", e)
                    }

                    function s(e) {
                        l(r, t, n, i, s, "throw", e)
                    }

                    i(void 0)
                })
            }
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {}],
    41: [function (e, t, n) {
        t.exports = function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {}],
    42: [function (e, t, n) {
        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        t.exports = function (e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), Object.defineProperty(e, "prototype", {writable: !1}), e
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {}],
    43: [function (e, t, n) {
        var i = e("./superPropBase.js");

        function r() {
            return "undefined" != typeof Reflect && Reflect.get ? t.exports = r = Reflect.get.bind() : t.exports = r = function (e, t, n) {
                var r = i(e, t);
                if (r) return r = Object.getOwnPropertyDescriptor(r, t), r.get ? r.get.call(arguments.length < 3 ? e : n) : r.value
            }, t.exports.__esModule = !0, t.exports.default = t.exports, r.apply(this, arguments)
        }

        t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {"./superPropBase.js": 55}],
    44: [function (e, t, n) {
        function r(e) {
            return t.exports = r = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }, t.exports.__esModule = !0, t.exports.default = t.exports, r(e)
        }

        t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {}],
    45: [function (e, t, n) {
        var r = e("./setPrototypeOf.js");
        t.exports = function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {writable: !1}), t && r(e, t)
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {"./setPrototypeOf.js": 53}],
    46: [function (e, t, n) {
        t.exports = function (e) {
            return e && e.__esModule ? e : {default: e}
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {}],
    47: [function (e, t, n) {
        t.exports = function (e) {
            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {}],
    48: [function (e, t, n) {
        t.exports = function (e, t) {
            var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (null != n) {
                var r, i, s = [], o = !0, a = !1;
                try {
                    for (n = n.call(e); !(o = (r = n.next()).done) && (s.push(r.value), !t || s.length !== t); o = !0) ;
                } catch (e) {
                    a = !0, i = e
                } finally {
                    try {
                        o || null == n.return || n.return()
                    } finally {
                        if (a) throw i
                    }
                }
                return s
            }
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {}],
    49: [function (e, t, n) {
        t.exports = function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {}],
    50: [function (e, t, n) {
        t.exports = function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {}],
    51: [function (e, t, n) {
        var r = e("./typeof.js").default, i = e("./assertThisInitialized.js");
        t.exports = function (e, t) {
            if (t && ("object" === r(t) || "function" == typeof t)) return t;
            if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
            return i(e)
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {"./assertThisInitialized.js": 39, "./typeof.js": 57}],
    52: [function (e, R, t) {
        var w = e("./typeof.js").default;

        function n() {
            "use strict";
            R.exports = function () {
                return o
            }, R.exports.__esModule = !0, R.exports.default = R.exports;
            var o = {}, e = Object.prototype, l = e.hasOwnProperty, t = "function" == typeof Symbol ? Symbol : {},
                r = t.iterator || "@@iterator", n = t.asyncIterator || "@@asyncIterator",
                i = t.toStringTag || "@@toStringTag";

            function s(e, t, n) {
                return Object.defineProperty(e, t, {value: n, enumerable: !0, configurable: !0, writable: !0}), e[t]
            }

            try {
                s({}, "")
            } catch (e) {
                s = function (e, t, n) {
                    return e[t] = n
                }
            }

            function a(e, t, n, r) {
                var i, s, o, a, t = t && t.prototype instanceof h ? t : h, t = Object.create(t.prototype),
                    r = new S(r || []);
                return t._invoke = (i = e, s = n, o = r, a = "suspendedStart", function (e, t) {
                    if ("executing" === a) throw new Error("Generator is already running");
                    if ("completed" === a) {
                        if ("throw" === e) throw t;
                        return k()
                    }
                    for (o.method = e, o.arg = t; ;) {
                        var n = o.delegate;
                        if (n) {
                            n = function e(t, n) {
                                var r = t.iterator[n.method];
                                if (void 0 === r) {
                                    if (n.delegate = null, "throw" === n.method) {
                                        if (t.iterator.return && (n.method = "return", n.arg = void 0, e(t, n), "throw" === n.method)) return c;
                                        n.method = "throw", n.arg = new TypeError("The iterator does not provide a 'throw' method")
                                    }
                                    return c
                                }
                                r = u(r, t.iterator, n.arg);
                                if ("throw" === r.type) return n.method = "throw", n.arg = r.arg, n.delegate = null, c;
                                r = r.arg;
                                return r ? r.done ? (n[t.resultName] = r.value, n.next = t.nextLoc, "return" !== n.method && (n.method = "next", n.arg = void 0), n.delegate = null, c) : r : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, c)
                            }(n, o);
                            if (n) {
                                if (n === c) continue;
                                return n
                            }
                        }
                        if ("next" === o.method) o.sent = o._sent = o.arg; else if ("throw" === o.method) {
                            if ("suspendedStart" === a) throw a = "completed", o.arg;
                            o.dispatchException(o.arg)
                        } else "return" === o.method && o.abrupt("return", o.arg);
                        a = "executing";
                        n = u(i, s, o);
                        if ("normal" === n.type) {
                            if (a = o.done ? "completed" : "suspendedYield", n.arg === c) continue;
                            return {value: n.arg, done: o.done}
                        }
                        "throw" === n.type && (a = "completed", o.method = "throw", o.arg = n.arg)
                    }
                }), t
            }

            function u(e, t, n) {
                try {
                    return {type: "normal", arg: e.call(t, n)}
                } catch (e) {
                    return {type: "throw", arg: e}
                }
            }

            o.wrap = a;
            var c = {};

            function h() {
            }

            function f() {
            }

            function p() {
            }

            var t = {}, d = (s(t, r, function () {
                    return this
                }), Object.getPrototypeOf), d = d && d(d(_([]))),
                m = (d && d !== e && l.call(d, r) && (t = d), p.prototype = h.prototype = Object.create(t));

            function b(e) {
                ["next", "throw", "return"].forEach(function (t) {
                    s(e, t, function (e) {
                        return this._invoke(t, e)
                    })
                })
            }

            function y(o, a) {
                var t;
                this._invoke = function (n, r) {
                    function e() {
                        return new a(function (e, t) {
                            !function t(e, n, r, i) {
                                var s, e = u(o[e], o, n);
                                if ("throw" !== e.type) return (n = (s = e.arg).value) && "object" == w(n) && l.call(n, "__await") ? a.resolve(n.__await).then(function (e) {
                                    t("next", e, r, i)
                                }, function (e) {
                                    t("throw", e, r, i)
                                }) : a.resolve(n).then(function (e) {
                                    s.value = e, r(s)
                                }, function (e) {
                                    return t("throw", e, r, i)
                                });
                                i(e.arg)
                            }(n, r, e, t)
                        })
                    }

                    return t = t ? t.then(e, e) : e()
                }
            }

            function v(e) {
                var t = {tryLoc: e[0]};
                1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
            }

            function g(e) {
                var t = e.completion || {};
                t.type = "normal", delete t.arg, e.completion = t
            }

            function S(e) {
                this.tryEntries = [{tryLoc: "root"}], e.forEach(v, this), this.reset(!0)
            }

            function _(t) {
                if (t) {
                    var n, e = t[r];
                    if (e) return e.call(t);
                    if ("function" == typeof t.next) return t;
                    if (!isNaN(t.length)) return n = -1, (e = function e() {
                        for (; ++n < t.length;) if (l.call(t, n)) return e.value = t[n], e.done = !1, e;
                        return e.value = void 0, e.done = !0, e
                    }).next = e
                }
                return {next: k}
            }

            function k() {
                return {value: void 0, done: !0}
            }

            return s(m, "constructor", f.prototype = p), s(p, "constructor", f), f.displayName = s(p, i, "GeneratorFunction"), o.isGeneratorFunction = function (e) {
                e = "function" == typeof e && e.constructor;
                return !!e && (e === f || "GeneratorFunction" === (e.displayName || e.name))
            }, o.mark = function (e) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(e, p) : (e.__proto__ = p, s(e, i, "GeneratorFunction")), e.prototype = Object.create(m), e
            }, o.awrap = function (e) {
                return {__await: e}
            }, b(y.prototype), s(y.prototype, n, function () {
                return this
            }), o.AsyncIterator = y, o.async = function (e, t, n, r, i) {
                void 0 === i && (i = Promise);
                var s = new y(a(e, t, n, r), i);
                return o.isGeneratorFunction(t) ? s : s.next().then(function (e) {
                    return e.done ? e.value : s.next()
                })
            }, b(m), s(m, i, "Generator"), s(m, r, function () {
                return this
            }), s(m, "toString", function () {
                return "[object Generator]"
            }), o.keys = function (n) {
                var e, r = [];
                for (e in n) r.push(e);
                return r.reverse(), function e() {
                    for (; r.length;) {
                        var t = r.pop();
                        if (t in n) return e.value = t, e.done = !1, e
                    }
                    return e.done = !0, e
                }
            }, o.values = _, S.prototype = {
                constructor: S, reset: function (e) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(g), !e) for (var t in this) "t" === t.charAt(0) && l.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0)
                }, stop: function () {
                    this.done = !0;
                    var e = this.tryEntries[0].completion;
                    if ("throw" === e.type) throw e.arg;
                    return this.rval
                }, dispatchException: function (n) {
                    if (this.done) throw n;
                    var r = this;

                    function e(e, t) {
                        return s.type = "throw", s.arg = n, r.next = e, t && (r.method = "next", r.arg = void 0), !!t
                    }

                    for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                        var i = this.tryEntries[t], s = i.completion;
                        if ("root" === i.tryLoc) return e("end");
                        if (i.tryLoc <= this.prev) {
                            var o = l.call(i, "catchLoc"), a = l.call(i, "finallyLoc");
                            if (o && a) {
                                if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
                                if (this.prev < i.finallyLoc) return e(i.finallyLoc)
                            } else if (o) {
                                if (this.prev < i.catchLoc) return e(i.catchLoc, !0)
                            } else {
                                if (!a) throw new Error("try statement without catch or finally");
                                if (this.prev < i.finallyLoc) return e(i.finallyLoc)
                            }
                        }
                    }
                }, abrupt: function (e, t) {
                    for (var n = this.tryEntries.length - 1; 0 <= n; --n) {
                        var r = this.tryEntries[n];
                        if (r.tryLoc <= this.prev && l.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                            var i = r;
                            break
                        }
                    }
                    var s = (i = i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc ? null : i) ? i.completion : {};
                    return s.type = e, s.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, c) : this.complete(s)
                }, complete: function (e, t) {
                    if ("throw" === e.type) throw e.arg;
                    return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), c
                }, finish: function (e) {
                    for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                        var n = this.tryEntries[t];
                        if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), g(n), c
                    }
                }, catch: function (e) {
                    for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                        var n, r, i = this.tryEntries[t];
                        if (i.tryLoc === e) return "throw" === (n = i.completion).type && (r = n.arg, g(i)), r
                    }
                    throw new Error("illegal catch attempt")
                }, delegateYield: function (e, t, n) {
                    return this.delegate = {
                        iterator: _(e),
                        resultName: t,
                        nextLoc: n
                    }, "next" === this.method && (this.arg = void 0), c
                }
            }, o
        }

        R.exports = n, R.exports.__esModule = !0, R.exports.default = R.exports
    }, {"./typeof.js": 57}],
    53: [function (e, n, t) {
        function r(e, t) {
            return n.exports = r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
                return e.__proto__ = t, e
            }, n.exports.__esModule = !0, n.exports.default = n.exports, r(e, t)
        }

        n.exports = r, n.exports.__esModule = !0, n.exports.default = n.exports
    }, {}],
    54: [function (e, t, n) {
        var r = e("./arrayWithHoles.js"), i = e("./iterableToArrayLimit.js"), s = e("./unsupportedIterableToArray.js"),
            o = e("./nonIterableRest.js");
        t.exports = function (e, t) {
            return r(e) || i(e, t) || s(e, t) || o()
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {
        "./arrayWithHoles.js": 37,
        "./iterableToArrayLimit.js": 48,
        "./nonIterableRest.js": 49,
        "./unsupportedIterableToArray.js": 58
    }],
    55: [function (e, t, n) {
        var r = e("./getPrototypeOf.js");
        t.exports = function (e, t) {
            for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = r(e));) ;
            return e
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {"./getPrototypeOf.js": 44}],
    56: [function (e, t, n) {
        var r = e("./arrayWithoutHoles.js"), i = e("./iterableToArray.js"), s = e("./unsupportedIterableToArray.js"),
            o = e("./nonIterableSpread.js");
        t.exports = function (e) {
            return r(e) || i(e) || s(e) || o()
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {
        "./arrayWithoutHoles.js": 38,
        "./iterableToArray.js": 47,
        "./nonIterableSpread.js": 50,
        "./unsupportedIterableToArray.js": 58
    }],
    57: [function (e, t, n) {
        function r(e) {
            return t.exports = r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }, t.exports.__esModule = !0, t.exports.default = t.exports, r(e)
        }

        t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {}],
    58: [function (e, t, n) {
        var r = e("./arrayLikeToArray.js");
        t.exports = function (e, t) {
            if (e) {
                if ("string" == typeof e) return r(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(e, t) : void 0
            }
        }, t.exports.__esModule = !0, t.exports.default = t.exports
    }, {"./arrayLikeToArray.js": 36}],
    59: [function (t, e, n) {
        t = t("../helpers/regeneratorRuntime")();
        e.exports = t;
        try {
            regeneratorRuntime = t
        } catch (e) {
            "object" == typeof globalThis ? globalThis.regeneratorRuntime = t : Function("r", "regeneratorRuntime = r")(t)
        }
    }, {"../helpers/regeneratorRuntime": 52}]
}, {}, [35]);