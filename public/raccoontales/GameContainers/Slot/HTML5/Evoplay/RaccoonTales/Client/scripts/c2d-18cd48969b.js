window.utils && window.utils.canExecute && window.utils.canExecute();
!function r(i, a, s) {
  function o(t, e) {
    if (!a[t]) {
      if (!i[t]) {
        var n = "function" == typeof require && require;
        if (!e && n) return n(t, !0);
        if (l) return l(t, !0);
        throw(e = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND", e
      }
      n = a[t] = {exports: {}}, i[t][0].call(n.exports, function (e) {
        return o(i[t][1][e] || e)
      }, n, n.exports, r, i, a, s)
    }
    return a[t].exports
  }

  for (var l = "function" == typeof require && require, e = 0; e < s.length; e++) o(s[e]);
  return o
}({
  1: [function (e, t, n) {
    t.exports = function (e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {}],
  2: [function (e, t, n) {
    t.exports = function (e) {
      if (Array.isArray(e)) return e
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {}],
  3: [function (e, t, n) {
    var r = e("./arrayLikeToArray.js");
    t.exports = function (e) {
      if (Array.isArray(e)) return r(e)
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {"./arrayLikeToArray.js": 1}],
  4: [function (e, t, n) {
    t.exports = function (e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {}],
  5: [function (e, t, n) {
    t.exports = function (e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {}],
  6: [function (e, r, t) {
    var i = e("./setPrototypeOf.js"), a = e("./isNativeReflectConstruct.js");

    function s(e, t, n) {
      return a() ? r.exports = s = Reflect.construct.bind() : r.exports = s = function (e, t, n) {
        var r = [null];
        r.push.apply(r, t);
        t = new (Function.bind.apply(e, r));
        return n && i(t, n.prototype), t
      }, r.exports.__esModule = !0, r.exports.default = r.exports, s.apply(null, arguments)
    }

    r.exports = s, r.exports.__esModule = !0, r.exports.default = r.exports
  }, {"./isNativeReflectConstruct.js": 14, "./setPrototypeOf.js": 22}],
  7: [function (e, t, n) {
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
  8: [function (e, t, n) {
    t.exports = function (e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {}],
  9: [function (e, t, n) {
    var i = e("./superPropBase.js");

    function r() {
      return "undefined" != typeof Reflect && Reflect.get ? t.exports = r = Reflect.get.bind() : t.exports = r = function (e, t, n) {
        var r = i(e, t);
        if (r) return r = Object.getOwnPropertyDescriptor(r, t), r.get ? r.get.call(arguments.length < 3 ? e : n) : r.value
      }, t.exports.__esModule = !0, t.exports.default = t.exports, r.apply(this, arguments)
    }

    t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {"./superPropBase.js": 24}],
  10: [function (e, t, n) {
    function r(e) {
      return t.exports = r = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e)
      }, t.exports.__esModule = !0, t.exports.default = t.exports, r(e)
    }

    t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {}],
  11: [function (e, t, n) {
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
  }, {"./setPrototypeOf.js": 22}],
  12: [function (e, t, n) {
    t.exports = function (e) {
      return e && e.__esModule ? e : {default: e}
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {}],
  13: [function (e, t, n) {
    t.exports = function (e) {
      return -1 !== Function.toString.call(e).indexOf("[native code]")
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {}],
  14: [function (e, t, n) {
    t.exports = function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
        })), !0
      } catch (e) {
        return !1
      }
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {}],
  15: [function (e, t, n) {
    t.exports = function (e) {
      if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {}],
  16: [function (e, t, n) {
    t.exports = function (e, t) {
      var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != n) {
        var r, i, a = [], s = !0, o = !1;
        try {
          for (n = n.call(e); !(s = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); s = !0) ;
        } catch (e) {
          o = !0, i = e
        } finally {
          try {
            s || null == n.return || n.return()
          } finally {
            if (o) throw i
          }
        }
        return a
      }
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {}],
  17: [function (e, t, n) {
    t.exports = function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {}],
  18: [function (e, t, n) {
    t.exports = function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {}],
  19: [function (e, t, n) {
    var s = e("./objectWithoutPropertiesLoose.js");
    t.exports = function (e, t) {
      if (null == e) return {};
      var n, r = s(e, t);
      if (Object.getOwnPropertySymbols) for (var i = Object.getOwnPropertySymbols(e), a = 0; a < i.length; a++) n = i[a], 0 <= t.indexOf(n) || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
      return r
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {"./objectWithoutPropertiesLoose.js": 20}],
  20: [function (e, t, n) {
    t.exports = function (e, t) {
      if (null == e) return {};
      for (var n, r = {}, i = Object.keys(e), a = 0; a < i.length; a++) n = i[a], 0 <= t.indexOf(n) || (r[n] = e[n]);
      return r
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {}],
  21: [function (e, t, n) {
    var r = e("./typeof.js").default, i = e("./assertThisInitialized.js");
    t.exports = function (e, t) {
      if (t && ("object" === r(t) || "function" == typeof t)) return t;
      if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
      return i(e)
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {"./assertThisInitialized.js": 4, "./typeof.js": 26}],
  22: [function (e, n, t) {
    function r(e, t) {
      return n.exports = r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
        return e.__proto__ = t, e
      }, n.exports.__esModule = !0, n.exports.default = n.exports, r(e, t)
    }

    n.exports = r, n.exports.__esModule = !0, n.exports.default = n.exports
  }, {}],
  23: [function (e, t, n) {
    var r = e("./arrayWithHoles.js"), i = e("./iterableToArrayLimit.js"), a = e("./unsupportedIterableToArray.js"),
      s = e("./nonIterableRest.js");
    t.exports = function (e, t) {
      return r(e) || i(e, t) || a(e, t) || s()
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {
    "./arrayWithHoles.js": 2,
    "./iterableToArrayLimit.js": 16,
    "./nonIterableRest.js": 17,
    "./unsupportedIterableToArray.js": 27
  }],
  24: [function (e, t, n) {
    var r = e("./getPrototypeOf.js");
    t.exports = function (e, t) {
      for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = r(e));) ;
      return e
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {"./getPrototypeOf.js": 10}],
  25: [function (e, t, n) {
    var r = e("./arrayWithoutHoles.js"), i = e("./iterableToArray.js"), a = e("./unsupportedIterableToArray.js"),
      s = e("./nonIterableSpread.js");
    t.exports = function (e) {
      return r(e) || i(e) || a(e) || s()
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {
    "./arrayWithoutHoles.js": 3,
    "./iterableToArray.js": 15,
    "./nonIterableSpread.js": 18,
    "./unsupportedIterableToArray.js": 27
  }],
  26: [function (e, t, n) {
    function r(e) {
      return t.exports = r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      }, t.exports.__esModule = !0, t.exports.default = t.exports, r(e)
    }

    t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {}],
  27: [function (e, t, n) {
    var r = e("./arrayLikeToArray.js");
    t.exports = function (e, t) {
      if (e) {
        if ("string" == typeof e) return r(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(e, t) : void 0
      }
    }, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {"./arrayLikeToArray.js": 1}],
  28: [function (e, t, n) {
    var r = e("./getPrototypeOf.js"), i = e("./setPrototypeOf.js"), a = e("./isNativeFunction.js"),
      s = e("./construct.js");

    function o(e) {
      var n = "function" == typeof Map ? new Map : void 0;
      return t.exports = o = function (e) {
        if (null === e || !a(e)) return e;
        if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
        if (void 0 !== n) {
          if (n.has(e)) return n.get(e);
          n.set(e, t)
        }

        function t() {
          return s(e, arguments, r(this).constructor)
        }

        return t.prototype = Object.create(e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), i(t, e)
      }, t.exports.__esModule = !0, t.exports.default = t.exports, o(e)
    }

    t.exports = o, t.exports.__esModule = !0, t.exports.default = t.exports
  }, {"./construct.js": 6, "./getPrototypeOf.js": 10, "./isNativeFunction.js": 13, "./setPrototypeOf.js": 22}],
  29: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("./FrameAnimationConfig.js")),
      o = r(e("./SpineAnimationConfig.js")), r = function () {
        function e() {
          (0, i.default)(this, e), this.Frame = s.default, this.Spine = o.default
        }

        return (0, a.default)(e, [{
          key: "create", value: function (e, t) {
            return e.frames ? s.default.createFrom(e, t) : e.spine ? o.default.createFrom(e, t) : e
          }
        }]), e
      }();
    n.default = r
  }, {
    "./FrameAnimationConfig.js": 30,
    "./SpineAnimationConfig.js": 31,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  30: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass"));

    function c(e, t) {
      var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!r) {
        if (Array.isArray(e) || (r = function (e, t) {
          if (e) {
            if ("string" == typeof e) return o(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0
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
      var i, a = !0, s = !1;
      return {
        s: function () {
          r = r.call(e)
        }, n: function () {
          var e = r.next();
          return a = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            a || null == r.return || r.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function o(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

    r = function () {
      function u() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [],
          t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 100,
          n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
          r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : void 0;
        (0, i.default)(this, u), this.type = "frame", this.textures = e, this.speed = t / 1e3, this.loop = n, this.blendMode = r
      }

      return (0, a.default)(u, [{
        key: "duration", get: function () {
          return this.textures.length / (60 * this.speed) * 1e3
        }
      }], [{
        key: "createFrom", value: function (e, t) {
          var n = e.prefix || "", r = [];
          if ("string" == typeof e.frames) r = t.getAssetsByPrefix(e.frames); else if (e.frames) {
            var i, a = c(e.frames);
            try {
              for (a.s(); !(i = a.n()).done;) {
                var s = i.value, o = t.getAsset(n + s);
                o && r.push(o)
              }
            } catch (e) {
              a.e(e)
            } finally {
              a.f()
            }
          } else {
            if (!e.spine) throw new Error("can not parse animation config");
            console.warn("can not parse spine config " + e.spine)
          }
          if (!r.length || 1 == r.length && null == r.first) return console.warn('can not find textures with given frames "' + e.frames + '" in "' + t.id + '" component'), null;
          var l = new u(r, e.speed || 100, e.loop || !1, e.blendMode);
          return e.hasOwnProperty("zOrder") && (l.zOrder = e.zOrder), e.hasOwnProperty("displayGroup") && (l.displayGroup = e.displayGroup), e.hasOwnProperty("mask") && (l.mask = e.mask), l
        }
      }]), u
    }();
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  31: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass"));
    n.default = function () {
      function r() {
        (0, i.default)(this, r), this.spine = null, this.animation = null, this.skin = null
      }

      return (0, a.default)(r, null, [{
        key: "createFrom", value: function (e, t) {
          if (!c2d.SpineCache[e.spine]) throw new Error("can nof find spine with id: " + e.spine);
          var n = new r;
          return n.spine = c2d.SpineCache[e.spine], n.animation = e.animation || n.spine.animations[0].name, n.skin = e.skin || null, n.speed = 1, e.hasOwnProperty("scale") && "number" == typeof e.scale && (n.scale = e.scale), e.hasOwnProperty("delay") && (n.delay = e.delay), e.hasOwnProperty("loop") && (n.loop = e.loop), e.hasOwnProperty("speed") && (n.speed = e.speed), e.hasOwnProperty("zOrder") && (n.zOrder = e.zOrder), e.hasOwnProperty("displayGroup") && (n.displayGroup = e.displayGroup), e.hasOwnProperty("mask") && (n.mask = e.mask), e.hasOwnProperty("startFromRandomFrame") && (n.startFromRandomFrame = e.startFromRandomFrame), n
        }
      }]), r
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  32: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      s = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/typeof"))),
      i = r(e("@babel/runtime/helpers/classCallCheck")), a = r(e("@babel/runtime/helpers/createClass"));

    function o(e, t) {
      var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!r) {
        if (Array.isArray(e) || (r = function (e, t) {
          if (e) {
            if ("string" == typeof e) return l(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? l(e, t) : void 0
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
      var i, a = !0, s = !1;
      return {
        s: function () {
          r = r.call(e)
        }, n: function () {
          var e = r.next();
          return a = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            a || null == r.return || r.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function l(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

    r = new (function () {
      function e() {
        var t = this;
        (0, i.default)(this, e), this._audios = [], this._audioForPreload = [], this._playBeforePreload = [], this._groupVolume = Object.assign({}, {
          sfx: {},
          music: {}
        }), this._masterVolume = 1, createjs.Sound.initializeDefaultPlugins() ? (createjs.Sound.alternateExtensions = ["mp3"], createjs.Sound.addEventListener("fileload", function (e) {
          return t._fileLoad(e)
        }), createjs.Sound.addEventListener("fileerror", function (e) {
          return t._fileError(e)
        })) : console.log("ERORR:", createjs.Sound.initializeDefaultPlugins()), this._onFinishPreloadCallback = null, this.mute = !0, this._fixAudioContext(), this.usePreloadHack = !0
      }

      return (0, a.default)(e, [{
        key: "capabilities", value: function () {
          return createjs.Sound.capabilities
        }
      }, {
        key: "clear", value: function () {
          this._audios = []
        }
      }, {
        key: "mute", get: function () {
          return createjs.Sound.muted
        }, set: function (e) {
          createjs.Sound.muted = e
        }
      }, {
        key: "preloadComplete", get: function () {
          return !this._audioForPreload.length
        }
      }, {
        key: "addAudioResource", value: function (e, t) {
          this._audioForPreload.push({id: e, config: t})
        }
      }, {
        key: "preload", value: function (e) {
          var t = this, n = e.onFinish;
          if (this._audioForPreload.length) {
            this._onFinishPreloadCallback = function () {
              t.usePreloadHack = !1, n()
            };
            var r, i = o(this._audioForPreload);
            try {
              for (i.s(); !(r = i.n()).done;) {
                var a = r.value;
                "string" == typeof a.config ? createjs.Sound.registerSound(a.config, a.id) : "object" === (0, s.default)(a.config) && createjs.Sound.registerSound(a.config.file, a.id, a.config.data, null, a.config.defaultPlayProps)
              }
            } catch (e) {
              i.e(e)
            } finally {
              i.f()
            }
          } else n()
        }
      }, {
        key: "playAudio", value: function (e, t) {
          var n, r, i, a = this;
          if ((t = Object.assign(createjs.Sound.getDefaultPlayProps(e) || {}, t || {})).group = t.group || "sfx", !this.preloadComplete && t && -1 === t.loop) {
            for (var s = 0; s < this._playBeforePreload.length; ++s) if (this._playBeforePreload[s].name === e) return;
            this._playBeforePreload.push({name: e, playProps: t})
          }
          n = Array.isArray(e) ? e[0] : e, r = createjs.Sound.play(n, t), void 0 !== this._groupVolume[t.group] && r.volume !== this._groupVolume[t.group] && (r.volume = this._groupVolume[t.group].actualVolume), r.playState === createjs.Sound.PLAY_SUCCEEDED && (this._audios.push({
            id: n,
            instance: r,
            group: t.group
          }), Array.isArray(e) ? (i = e.slice(1), r.on("complete", function () {
            a._removeSoundInstance(r), i.length && a.playAudio(i, t)
          })) : r.on("complete", function () {
            a._removeSoundInstance(r)
          })), this.usePreloadHack && this.setVolume(n, r.volume)
        }
      }, {
        key: "stopAudio", value: function (e) {
          if (e) {
            for (var t = Array.isArray(e) ? e : [e], n = 0; n < this._audios.length;) -1 !== t.indexOf(this._audios[n].id) ? (this._audios[n].instance.stop(), this._audios.splice(n, 1)) : ++n;
            for (var r = 0; r < this._playBeforePreload.length; ++r) if (-1 !== t.indexOf(this._playBeforePreload[r].name)) return void this._playBeforePreload.splice(r, 1)
          } else this.stopAll()
        }
      }, {
        key: "stopAll", value: function () {
          this._audios = [], this._playBeforePreload = [], createjs.Sound.stop()
        }
      }, {
        key: "setVolume", value: function (t, e) {
          var n, r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
            i = this._audios.find(function (e) {
              return e.id === t
            });
          !i || 0 !== (n = this.getGroupVolume(i.group)) && (e = e * n, (i = i.instance).muted && !1 !== e && (i.muted = !1), 0 === r ? i.volume = e : (i.volume === e && (i.volume = 1 - i.volume), c2d.Tween.get(i).to({_volume: e}, r).addEventListener("change", function () {
            return i._updateVolume()
          })))
        }
      }, {
        key: "setAudioMute", value: function (t, e) {
          var n = this._audios.find(function (e) {
            return e.id === t
          });
          n && (e ? ((e = c2d.Tween.get(n.instance).to({_volume: 0}, e)).addEventListener("change", function () {
            return n.instance._updateVolume()
          }), e.call(function () {
            n.instance.muted = !0
          })) : n.instance.muted = !0)
        }
      }, {
        key: "setMasterVolume", value: function (e) {
          var t = this;
          this._masterVolume = e, Object.keys(this._groupVolume).forEach(function (e) {
            t.setGroupVolume(e, t.getGrouppreviousVolume(e), !0)
          })
        }
      }, {
        key: "getMasterVolume", value: function () {
          return this._masterVolume
        }
      }, {
        key: "setGroupVolume", value: function (e, t) {
          var n, r = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            i = (this._groupVolume[e = e || "sfx"].actualVolume = t * this._masterVolume, this._groupVolume[e].previousVolume && r || (this._groupVolume[e].previousVolume = t), o(this._audios));
          try {
            for (i.s(); !(n = i.n()).done;) {
              var a = n.value;
              a.group === e && (a.instance.volume = this._groupVolume[e].actualVolume * this._masterVolume)
            }
          } catch (e) {
            i.e(e)
          } finally {
            i.f()
          }
        }
      }, {
        key: "getGroupVolume", value: function (e) {
          return this._groupVolume[e].actualVolume
        }
      }, {
        key: "getGrouppreviousVolume", value: function (e) {
          return this._groupVolume[e].previousVolume
        }
      }, {
        key: "_fileLoad", value: function (e) {
          for (var t = 0; t < this._audioForPreload.length; ++t) if (this._audioForPreload[t].id === e.id) {
            this._audioForPreload.splice(t, 1);
            break
          }
          var n = (e || {}).id;
          if (n && c2d.eventManager.dispatch(n), !this._audioForPreload.length) {
            this._onFinishPreloadCallback && this._onFinishPreloadCallback();
            var r, i = o(this._playBeforePreload);
            try {
              for (i.s(); !(r = i.n()).done;) {
                var a = r.value;
                this.playAudio(a.name, a.playProps)
              }
            } catch (e) {
              i.e(e)
            } finally {
              i.f()
            }
            this._playBeforePreload = []
          }
        }
      }, {
        key: "_fileError", value: function (e) {
          console.warn("AudioManager::fileError[" + e.id + "]: " + e.src);
          for (var t = 0; t < this._audioForPreload.length; ++t) if (this._audioForPreload[t].id === e.id) {
            this._audioForPreload.splice(t, 1);
            break
          }
        }
      }, {
        key: "_removeSoundInstance", value: function (e) {
          for (var t = 0; t < this._audios.length; ++t) if (this._audios[t].instance.uniqueId === e.uniqueId) {
            this._audios.splice(t, 1);
            break
          }
        }
      }, {
        key: "_fixAudioContext", value: function () {
          var t = createjs.WebAudioPlugin.context;
          document.addEventListener("touchend", function e() {
            c2d.env.device.android() && c2d.env.device.chrome() && "function" == typeof t.resume && t.resume();
            "running" === t.state && document.removeEventListener("touchend", e)
          })
        }
      }]), e
    }());
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/typeof": 26
  }],
  33: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      a = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      s = r(e("@babel/runtime/helpers/createClass")), r = function () {
        function i() {
          function e() {
            r && clearTimeout(r), r = setTimeout(t.handleCanvasSize, 250), c2d.eventManager.dispatch(c2d.documentEvents.SCREEN_PREPARE_RESIZE)
          }

          var t = this,
            n = ((0, a.default)(this, i), this._orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait", {
              base: function () {
                return t.handleCanvasSizeBase()
              }, zoomOut: function () {
                return t.handleCanvasSizeZoomOut()
              }
            }), r = (this.handleCanvasSize = n[c2d.sceneLayout], null);
          window.addEventListener("resize", e), window.addEventListener("orientationchange", e), document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), document.addEventListener("mozfullscreenchange", e), c2d.eventManager.subscribe(game.events.Slots.ON_SLOTS_LOADED, function (e) {
            c2d.eventManager.unsubscribe(game.events.Slots.ON_SLOTS_LOADED), t.handleCanvasSize()
          }), document.documentElement.classList.add(c2d.env.language), this._enabled = !0
        }

        return (0, s.default)(i, [{
          key: "enabled", set: function (e) {
            this._enabled = e
          }
        }, {
          key: "handleCanvasSizeBase", value: function () {
            var e, t, n, r, i, a, s, o, l, u, c, h, d;

            function f() {
              a = {
                width: c2d.designSize.width,
                height: c2d.designSize.height,
                scale: Number(Math.min(document.documentElement.clientWidth / t.width, document.documentElement.clientHeight / t.height).toFixed(3))
              }, e.style.width = "".concat(a.width, "px"), e.style.height = "".concat(a.height, "px"), e.style.transform = "scale(".concat(a.scale, ")"), e.style.top = "50%", e.style.left = "50%", e.style.transform += "translateX(-50%)", e.style.transform += "translateY(-50%)", e.style["transform-origin"] = "0px 0px"
            }

            this._enabled && (e = document.querySelector(".canvas-box"), d = document.getElementById("slotCanvas"), t = c2d.designMinSize, n = c2d.designSize, window.innerHeight, window.innerWidth, r = c2d.designSize.width / c2d.designSize.height, window.innerWidth, document.documentElement.clientHeight, i = window.innerWidth / window.innerHeight, a = {}, s = 0, c2d.env.device.desktop() ? f() : c2d.env.device.landscape() ? function () {
              if (i < r) return f();
              a = {
                width: Math.ceil(c2d.designSize.width / (r / i)),
                height: c2d.designSize.height,
                scale: Number((window.innerHeight / c2d.designSize.height).toFixed(3))
              }, s = .5 * (a.width - c2d.designSize.width), e.style.width = "".concat(a.width, "px"), e.style.height = "".concat(a.height, "px"), e.style.transform = "scale(".concat(a.scale, ")"), e.style["transform-origin"] = "0px 0px", e.style.left = "0px"
            }() : c2d.env.device.portrait() && (a = {
              width: c2d.designSize.height,
              height: Number(Math.ceil(c2d.designSize.height / i).toFixed(2)),
              scale: Number((document.documentElement.clientWidth / c2d.designSize.height).toFixed(3))
            }, s = .5 * (a.width - c2d.designSize.height), e.style.width = "".concat(a.width, "px"), e.style.height = "".concat(a.height, "px"), e.style.transform = "scale(".concat(a.scale, ")"), e.style["transform-origin"] = "0px 0px", e.style.left = "0px", e.style.top = "0px"), o = Math.min(a.width / a.height, a.height / a.width), l = a.height / a.width, u = Math.min(c2d.designSize.width / c2d.designSize.height, c2d.designSize.height / c2d.designSize.width), c = a.width > a.height ? "landscape" : "portrait", h = this._orientation !== c, this._orientation = c, d.width = a.width, d.height = a.height, d = {
              isOrientationChange: h,
              orientation: c,
              screenAspectRatio: o,
              screenAspectRatioActual: l,
              designAspectRatio: u,
              paddingLeft: s,
              paddingTop: 0,
              screenWidth: a.width,
              screenHeight: a.height,
              designWidth: n.width,
              designHeight: n.height
            }, c2d.eventManager.dispatch(c2d.documentEvents.SCREEN_WAS_RESIZED, d))
          }
        }, {
          key: "handleCanvasSizeZoomOut", value: function () {
            var t, e, n, r, i, a, s, o, l, u, c, h;

            function d(e) {
              t.style.top = "".concat(e, "%"), t.style.left = "".concat(e, "%"), t.style.transform += "translateX(-".concat(e, "%)"), t.style.transform += "translateY(-".concat(e, "%)")
            }

            function f(e) {
              t.style.transform = "scale(".concat(e, ")")
            }

            function p() {
              var e = c2d.designMinSize.width;
              r = {
                width: e * n,
                height: e,
                scale: window.innerHeight / e
              }, i = .5 * (r.width - c2d.designMinSize.height), f(r.scale), d(50)
            }

            this._enabled && (t = document.querySelector(".canvas-box"), h = document.getElementById("slotCanvas"), l = c2d.designMinSize, e = c2d.designSize, window.innerHeight, window.innerWidth, o = window.innerWidth / window.innerHeight, s = c2d.designSize.height / c2d.designSize.width, n = l.height / l.width, r = {}, a = i = 0, u = .75 <= Math.min(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth), c2d.env.device.desktop() ? (f((r = {
              width: c2d.designSize.width,
              height: c2d.designSize.height,
              scale: Math.min(document.documentElement.clientWidth / l.width, document.documentElement.clientHeight / l.height)
            }).scale), d(50)) : c2d.env.device.landscape() ? (u || (r = {
              width: c2d.designSize.width,
              height: Math.floor(c2d.designSize.width / o),
              scale: document.documentElement.clientWidth / c2d.designSize.width
            }, a = .5 * (r.height - c2d.designSize.height), f(r.scale), d(0)), u && (r = {
              width: e.width,
              height: e.height,
              scale: Math.min(document.documentElement.clientWidth / e.width, document.documentElement.clientHeight / e.height)
            }, i = .5 * (r.width - c2d.designSize.width), f(r.scale), d(50))) : c2d.env.device.portrait() && c2d.env.device.mobile() ? (u || (l = c2d.designSize.width - window.innerHeight * (2 * o - s - n), r = {
              width: l * o,
              height: l,
              scale: window.innerHeight / l
            }, i = .5 * (r.width - c2d.designSize.height), f(r.scale), d(0)), u && p()) : c2d.env.device.portrait() && c2d.env.device.tablet() && p(), r.width = Math.ceil(r.width), r.height = Math.ceil(r.height), s = Math.min(r.width / r.height, r.height / r.width), o = r.height / r.width, l = Math.min(c2d.designSize.width / c2d.designSize.height, c2d.designSize.height / c2d.designSize.width), u = r.width > r.height ? "landscape" : "portrait", c = this._orientation !== u, this._orientation = u, t.style.width = "".concat(r.width, "px"), t.style.height = "".concat(r.height, "px"), t.style["transform-origin"] = "0px 0px", h.width = r.width, h.height = r.height, h = {
              isOrientationChange: c,
              orientation: u,
              screenAspectRatio: s,
              screenAspectRatioActual: o,
              designAspectRatio: l,
              paddingLeft: i,
              paddingTop: a,
              screenWidth: r.width,
              screenHeight: r.height,
              designWidth: e.width,
              designHeight: e.height
            }, c2d.eventManager.dispatch(c2d.documentEvents.SCREEN_WAS_RESIZED, h))
          }
        }, {
          key: "resolution", get: function () {
            return c2d.env.device.tablet() && 2 <= window.devicePixelRatio ? 2 : 1
          }
        }]), i
      }();
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  34: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), r = new (function () {
        function e() {
          (0, i.default)(this, e)
        }

        return (0, a.default)(e, [{
          key: "getAllCookies", value: function () {
            return this._readCookie()
          }
        }, {
          key: "erase", value: function () {
            for (var e = document.cookie.split(";"), t = 0; t < e.length; t++) {
              var n = e[t], r = n.indexOf("="), r = -1 < r ? n.substr(0, r) : n;
              0 === r.indexOf(this._gameId) && (document.cookie = r + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT")
            }
          }
        }, {
          key: "write", value: function (e, t, n) {
            var r, i;
            return e ? t ? n ? (i = (r = new Date).getTime(), r.setTime(i += 1e3 * n), document.cookie = this._gameId + e + "=" + t + "; expires=" + r.toUTCString()) : document.cookie = this._gameId + e + "=" + t : document.cookie = this._gameId + e + "=0; expires=Thu, 01 Jan 1970 00:00:01 GMT" : console.warn("Cookie: no param specified!"), this.getAllCookies()
          }
        }, {
          key: "_readCookie", value: function () {
            var n = this._gameId, e = document.cookie, r = {};
            return e.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/) ? (e = RegExp.$1).match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function (e, t) {
              r[e] = '"' === t.charAt(0) ? t.substr(1, -1).replace(/\\(.)/g, "$1") : t
            }) : e.split(/[;]/).map(function (e) {
              var e = e.split(/=/, 2), t = decodeURIComponent(e[0].trimLeft());
              1 < e.length && 0 == t.indexOf(n) && (t = t.substring(n.length), r[t] = decodeURIComponent(e[1].trimRight()))
            }), r
          }
        }, {
          key: "_gameId", get: function () {
            return (jsvars && jsvars.game_name || "game_name") + "___"
          }
        }]), e
      }());
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  35: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("./../display/index.js")),
      o = (r(e("./Environment.js")), r(e("./CanvasScaler.js"))), l = r(e("./../devtools/DevToolsComponent.js")),
      r = function () {
        function r(e) {
          var t = this, n = ((0, i.default)(this, r), e.id || "canvas");
          this._canvas = null, this._renderer = null, this._renderer3D = null, this._mainStage = null, /constructor/i.test(window.HTMLElement) || "[object SafariRemoteNotification]" === (!window.safari || "undefined" != typeof safari && safari.pushNotification).toString() || document.getElementById("slotCanvas").addEventListener("wheel", function (e) {
            return e.preventDefault()
          }, {passive: !1}), document.getElementById("slotCanvas").addEventListener("touchend", function (e) {
            1 < e.touches.length && (e.preventDefault(), e.stopImmediatePropagation())
          }, !1), this._initializeCanvas(n, {
            width: e.designSize.width,
            height: e.designSize.height
          }), this._gameViewport = new PIXI.display.Layer, this._mainStage.addChild(this._gameViewport), c2d.eventManager.subscribe(c2d.documentEvents.SCREEN_PREPARE_RESIZE, function () {
            t._gameViewport.alpha = 1e-4
          }), c2d.eventManager.subscribe(c2d.documentEvents.SCREEN_WAS_RESIZED, function (e) {
            c2d.screenParams = e.data, t._gameViewport.x = c2d.screenParams.paddingLeft, t._gameViewport.y = c2d.screenParams.paddingTop, t._gameViewport.alpha = 1, t._renderer.resize(c2d.screenParams.screenWidth, c2d.screenParams.screenHeight), t._renderer3D && t._renderer3D.resize(c2d.screenParams.screenWidth, c2d.screenParams.screenHeight);
            e = document.querySelector(".render") || document.createElement("div");
            e.innerText = "." === e.innerText ? "" : ".", e.className = "render", document.getElementsByClassName("canvas-box")[0].appendChild(e)
          }), this._gameController = null, this._canvasScaler = new o.default({renderer: this._renderer}), this._canvasScaler.handleCanvasSize(), window.addEventListener("contextmenu", function (e) {
            return e.preventDefault(), e.stopPropagation(), !1
          }), this.windowActive = !0
        }

        return (0, a.default)(r, [{
          key: "_initializeCanvas", value: function (e, t) {
            var n = t.width, t = t.height;
            this._canvas = document.getElementById(e), this._canvasBox = document.getElementsByClassName("canvas-box")[0], PIXI.settings.RESOLUTION = c2d.env.device.tablet() && 2 <= window.devicePixelRatio ? 2 : 1, PIXI.settings.PRECISION_FRAGMENT = PIXI.getMaxPrecision(document.createElement("canvas").getContext("webgl"), c2d.env.device.ios() ? "highp" : "mediump"), this._app = new PIXI.Application({
              width: n,
              height: t,
              view: this._canvas,
              clearBeforeRender: !1,
              transparent: !1,
              antialias: PIXI.isAntialiasNeeded()
            }), this._app.ticker.stop(), this._renderer = this._app.renderer, this._mainStage = new PIXI.display.Stage, this._mainStage.sortableChildren = !0, game.displayGroups.DEFAULT = c2d.display.groups.create("DEFAULT", 1), game.displayGroups.OVERLAY = c2d.display.groups.create("OVERLAY", 2), game.displayGroups.FOREGROUND = c2d.display.groups.create("FOREGROUND", 3), game.displayGroups.UI = c2d.display.groups.create("UI", 4), this._mainStage.addChild(new PIXI.display.Layer(game.displayGroups.DEFAULT)), this._mainStage.addChild(new PIXI.display.Layer(game.displayGroups.OVERLAY)), this._mainStage.addChild(new PIXI.display.Layer(game.displayGroups.FOREGROUND)), this._mainStage.addChild(new PIXI.display.Layer(game.displayGroups.UI)), this._app.stage = this._mainStage
          }
        }, {
          key: "create3DRenderer", value: function () {
            this._renderer3D = new s.default.Scene3DRenderer(this._canvas, this._renderer, this._canvasScaler)
          }
        }, {
          key: "renderer3D", get: function () {
            return this._renderer3D
          }
        }, {
          key: "getCanvasViewport", value: function (e) {
            var t = parseInt(this._canvasBox.style.width), n = window.innerWidth, n = Math.min(1, n / t);
            return {
              left: Math.floor(e.width / 2) - e.width / 2 * n,
              right: Math.floor(e.width / 2) + e.width / 2 * n,
              top: 0,
              bottom: e.height
            }
          }
        }, {
          key: "setController", value: function (e) {
            var t = this;
            this._gameController = e, this._gameViewport.addChild(e.view), window.addEventListener("windowfocusout", function () {
              clearTimeout(t.frameAnimationTimeout), t.windowActive = !1, t._mainLoop()
            }, !1), window.addEventListener("windowfocusin", function () {
              clearTimeout(t.frameAnimationTimeout), t.windowActive = !0
            }, !1)
          }
        }, {
          key: "run", value: function () {
            this._gameController.run(), this._mainLoop()
          }
        }, {
          key: "freeze", value: function (e) {
            this.frozen = e
          }
        }, {
          key: "_mainLoop", value: function () {
            var e = this, t = window.performance.now(),
              n = (void 0 === this._lastDt && (this._lastDt = t), t - this._lastDt);
            if (100 < n) for (var r = this._renderer3D ? 16 : 100, i = n / r, a = 0; a < i; a++) PIXI.Ticker.shared.update(t - n + a * r);
            this._lastDt = t, PIXI.Ticker.shared.update(t), this._gameController.update(n), this.frozen || (this._renderer3D && this._renderer3D.render(), this._renderer3D && this._renderer3D.webVR.isActive || this._renderer.render(this._mainStage)), this.windowActive ? requestAnimationFrame(function () {
              return e._mainLoop()
            }) : this.frameAnimationTimeout = setTimeout(function () {
              return e._mainLoop()
            }, 20)
          }
        }, {
          key: "showDevTools", value: function () {
            this.devTools = new l.default(this)
          }
        }, {
          key: "getRendererInfo", value: function () {
            var e = "".concat(s.default.about.NAME, " - v ").concat(s.default.about.VERSION, " - ");
            return this._renderer.type === s.default.about.RENDERER_TYPE.WEBGL ? e += "WebGL" : this._renderer.type === s.default.about.RENDERER_TYPE.CANVAS ? e += "Canvas" : e += "Unknown", e
          }
        }]), r
      }();
    n.default = r
  }, {
    "./../devtools/DevToolsComponent.js": 62,
    "./../display/index.js": 69,
    "./CanvasScaler.js": 33,
    "./Environment.js": 36,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  36: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("./Fullscreen.js")), o = r(e("./Storage.js")),
      r = new (function () {
        function t() {
          (0, i.default)(this, t);
          var e = document.querySelector("meta[name='DEBUG']");
          this._debug = "true" === e.getAttribute("content"), e.parentNode.removeChild(e), this._gameTitle = null, this._gameVendor = null, this._gameName = null, this._gameVersion = null, this._useDesktopGraphics = null, this.supportDesktopGraphics = null, this.gameConfig = {}, this._device = window.device, this._device.noConflict(), this._hhs = window.jsvars, this._storage = new o.default(this.gameId), this._debugEvents = !1
        }

        return (0, a.default)(t, [{
          key: "DEBUG", get: function () {
            return this._debug
          }
        }, {
          key: "DEBUG_HHS", get: function () {
            return this._hhs.debug
          }
        }, {
          key: "DEBUG_EVENTS", get: function () {
            return this._debugEvents
          }, set: function (e) {
            this._debugEvents = e
          }
        }, {
          key: "insideIFrame", get: function () {
            return window.top !== window.self
          }
        }, {
          key: "systemLocale", get: function () {
            return navigator.languages ? navigator.languages[0] : navigator.userLanguage || navigator.language
          }
        }, {
          key: "getCurrencySymbol", value: function (t) {
            var n;
            try {
              n = ((n = 0 == (n = Number(0).toLocaleString(this.locale || this.language, {
                style: "currency",
                currency: t,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })) ? t : n) + "").replace("0", "")
            } catch (e) {
              n = t
            }
            return n
          }
        }, {
          key: "toCurrency", value: function (t, n, e) {
            var r;
            t = c2d.env.hideCurrency ? "" : t;
            try {
              var i = this.hideCurrency ? {} : {style: "currency", currency: t};
              e && (i.minimumFractionDigits = e, i.maximumFractionDigits = e), (r = Number(n).toLocaleString(this.systemLocale || this.language, i)) == n && (r = t + " " + n)
            } catch (e) {
              r = t + " " + n
            }
            return r
          }
        }, {
          key: "setAppConfig", value: function (e) {
            this._gameTitle = e.title, this._gameVendor = e.vendor, this._gameName = e.name, this._gameVersion = e.version, this.gameSupportsDesktopGraphics = e.supportDesktopGraphics, this.useDesktopGraphics = this.gameSupportsDesktopGraphics && c2d.env.storage.getItem("useDesktopGraphics", !1), window.version = function () {
              return e.version
            }
          }
        }, {
          key: "initFullscreen", value: function () {
            this._device.ios() && this._device.instagram() || this._device.mobile() && !this._device.mobileEmulator() && (this._fullscreen = s.default.create(this._device), this._fullscreen.init())
          }
        }, {
          key: "renderInfo", get: function () {
            return this._renderInfo || ""
          }, set: function (e) {
            this._renderInfo = e
          }
        }, {
          key: "showClock", get: function () {
            return !0 === this._hhs.show_clock
          }
        }, {
          key: "showHistory", get: function () {
            return !0 === this._hhs.show_history
          }
        }, {
          key: "gameTitle", get: function () {
            return this._gameTitle
          }
        }, {
          key: "gamePath", get: function () {
            return this._hhs.game_path || ""
          }
        }, {
          key: "basePath", get: function () {
            return this._hhs.base_path || ""
          }
        }, {
          key: "gameVendor", get: function () {
            return this._gameVendor
          }
        }, {
          key: "gameName", get: function () {
            return this._gameName
          }
        }, {
          key: "gameVersion", get: function () {
            return this._gameVersion
          }
        }, {
          key: "gameId", get: function () {
            return this._hhs.game_name
          }
        }, {
          key: "language", get: function () {
            return this._hhs.language
          }, set: function (e) {
            this._hhs.language = e
          }
        }, {
          key: "locale", get: function () {
            return "locale".ls()
          }
        }, {
          key: "apiUrl", get: function () {
            return this._hhs.api_url
          }
        }, {
          key: "hideCurrency", get: function () {
            return this._hhs.hide_currency
          }
        }, {
          key: "backUrl", get: function () {
            return this._hhs.back_url
          }
        }, {
          key: "cashUrl", get: function () {
            return this._hhs.cash_url
          }
        }, {
          key: "pingUrl", get: function () {
            return this._hhs.operator_ping_url
          }
        }, {
          key: "token", get: function () {
            return this.DEBUG ? this.storage.getItem("token", this._hhs.customVars) : this._hhs.customVars
          }
        }, {
          key: "hasSwipeControls", get: function () {
            return !this.device.desktop() && "evoplay" == this.gameVendor
          }
        }, {
          key: "hasAutospinSettings", get: function () {
            return this.autospinsEnabled
          }
        }, {
          key: "hostsForStatic", get: function () {
            return this._hhs.hosts_for_static
          }
        }, {
          key: "actionUrl", get: function () {
            return this._hhs.action_url
          }
        }, {
          key: "realityCheckInterval", get: function () {
            return this._hhs.reality_check_interval
          }
        }, {
          key: "useDesktopGraphics", get: function () {
            return this._useDesktopGraphics
          }, set: function (e) {
            this._useDesktopGraphics = e, c2d.env.storage.setItem("useDesktopGraphics", e)
          }
        }, {
          key: "fullscreen", get: function () {
            return this._fullscreen
          }
        }, {
          key: "storage", get: function () {
            return this._storage
          }
        }, {
          key: "device", get: function () {
            return this._device
          }
        }, {
          key: "ui", get: function () {
            return this._getParameterByName("ui") ? this._getParameterByName("ui") : this._hhs.ui || (this.device.mini() ? "mini" : this.device.desktop() ? "desktop" : "mobile")
          }
        }, {
          key: "autospinsEnabled", get: function () {
            return !1 !== this.gameConfig.autoSpins
          }
        }, {
          key: "showExitButton", get: function () {
            return !0 === this.gameConfig.showExitButton
          }
        }, {
          key: "hideBetChangeButtons", get: function () {
            return !1 === this.gameConfig.showBetButtons
          }
        }, {
          key: "userSupportPageLink", get: function () {
            return this.gameConfig.userSupportPageLink
          }
        }, {
          key: "showMaxWinRtpMessage", get: function () {
            return this.gameConfig.showMaxWinRtpMessage
          }
        }, {
          key: "minSpinTime", get: function () {
            return this.gameConfig.minSpinTime
          }
        }, {
          key: "showRestoreSessionPopup", get: function () {
            return this.gameConfig.showRestoreSessionPopup
          }
        }, {
          key: "maxWinInTotalBets", get: function () {
            return this._maxWinInTotalBets
          }, set: function (e) {
            this._maxWinInTotalBets = e
          }
        }, {
          key: "showSessionStatistics", get: function () {
            var e = this.gameConfig.showSessionStatistics;
            return !this.isNullOrUndefined(e) && e
          }
        }, {
          key: "enableSkips", get: function () {
            var e = this.gameConfig.enableSkips;
            return !!this.isNullOrUndefined(e) || e
          }
        }, {
          key: "showTurboButton", get: function () {
            var e = this.gameConfig.showTurboButton;
            return !!this.isNullOrUndefined(e) || e
          }
        }, {
          key: "showWinsLowerThanBet", get: function () {
            var e = this.gameConfig.showWinsLowerThanBet;
            return !!this.isNullOrUndefined(e) || e
          }
        }, {
          key: "isNullOrUndefined", value: function (e) {
            return null == e
          }
        }, {
          key: "goToLobby", value: function () {
            var e = this;
            document.dispatchEvent(new CustomEvent(c2d.documentEvents.GAME_GO_TO_LOBBY)), this.exitFullscreen(), setTimeout(function () {
              e._goToUrl(e.backUrl)
            }, 200)
          }
        }, {
          key: "reload", value: function () {
            (window.jsvars.redirect_inside_iframe ? window : window.top).location.reload()
          }
        }, {
          key: "goToBank", value: function () {
            var e = this;
            document.dispatchEvent(new CustomEvent(c2d.documentEvents.GAME_GO_TO_BANK)), this.exitFullscreen(), setTimeout(function () {
              e._goToUrl(e.cashUrl)
            }, 200)
          }
        }, {
          key: "exitFullscreen", value: function () {
            document.webkitExitFullscreen && document.webkitExitFullscreen(), document.mozCancelFullScreen && document.mozCancelFullScreen(), document.msExitFullscreen && document.msExitFullscreen(), document.exitFullscreen && document.fullscreenElement && document.exitFullscreen()
          }
        }, {
          key: "_getParameterByName", value: function (e) {
            e = e.replace(/[\[\]]/g, "\\$&");
            e = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(window.location.href);
            return e ? e[2] ? decodeURIComponent(e[2].replace(/\+/g, " ")) : "" : null
          }
        }, {
          key: "_goToUrl", value: function (e) {
            "" != e && (this.fullscreen && this.fullscreen.isFullscreen && this.fullscreen.exit ? (this.fullscreen.exit(), c2d.Timeout.invoke(function () {
              window.jsvars.redirect_inside_iframe ? window.location.href = e : window.top.location.href = e
            }, 400)) : window.jsvars.redirect_inside_iframe ? window.location.href = e : window.top.location.href = e)
          }
        }]), t
      }());
    n.default = r
  }, {
    "./Fullscreen.js": 38,
    "./Storage.js": 42,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  37: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), r = new (function () {
        function e() {
          (0, i.default)(this, e), this._manifest = null, this._resolutions = {
            desktop: "hd",
            mini: "sd"
          }, this.forceDesktopGraphics = !1
        }

        return (0, a.default)(e, [{
          key: "isFileExist", value: function (e) {
            return !!this._manifest[e]
          }
        }, {
          key: "isResourceExist", value: function (e) {
            return this.isFileExist(this.getKeyForURL(this.getLocalPath(e)))
          }
        }, {
          key: "setManifest", value: function (e) {
            this._manifest = e
          }
        }, {
          key: "getKeyForURL", value: function (t) {
            var n = this;
            return t = t.split("/").splice(-2).join("/"), Object.keys(this._manifest).find(function (e) {
              return n._manifest[e] === t || e === t
            }) || null
          }
        }, {
          key: "getImageUrl", value: function (e) {
            var t = this.getKeyForURL(e);
            if (!t) throw new Error("Can not find image ".concat(e));
            var n = t.substring(0, t.lastIndexOf(".") + 1), t = t.substring(t.lastIndexOf(".") + 1);
            if (document.supportWebP && this.isFileExist("".concat(n, "webp"))) return this.getLocalPath("".concat(n, "webp"));
            if ("webp" !== t && this.isFileExist(e)) return this.getLocalPath(e);
            if (this.isFileExist("".concat(n, "jpg"))) return this.getLocalPath("".concat(n, "jpg"));
            if (this.isFileExist("".concat(n, "png"))) return this.getLocalPath("".concat(n, "png"));
            throw new Error("can not find image path for url: ".concat(e))
          }
        }, {
          key: "getMultipackAtlas", value: function (e) {
            if (this.isResourceExist(e)) return [e];
            for (var t = [], n = e.replace(".json", "-" + t.length + ".json"), r = this._resolutions[this.forceDesktopGraphics ? "desktop" : c2d.env.ui]; this.isResourceExist(n) && (!r || !t.length || -1 === this.getLocalPath(t.first).indexOf("-" + r) || -1 !== this.getLocalPath(n).indexOf("-" + r));) t.push(n), n = e.replace(".json", "-" + t.length + ".json");
            return t
          }
        }, {
          key: "getLocalPath", value: function (e) {
            if (!this._manifest) return e;
            var t = this.getLocalizedFilename(e),
              n = this._resolutions[this.forceDesktopGraphics ? "desktop" : c2d.env.ui],
              n = this._manifest[this._getPrefixedFilename(t, n)] || this._manifest[this._getPrefixedFilename(e, n)] || this._manifest[t] || this._manifest[e];
            return n || e
          }
        }, {
          key: "getFullPath", value: function (e) {
            return c2d.env.gamePath + this.getLocalPath(e)
          }
        }, {
          key: "getLocalizedFilename", value: function (e) {
            var t = this._findExtIdx(e);
            return e.substr(0, t) + "_" + c2d.env.language + e.substr(t)
          }
        }, {
          key: "getSubDomainUrl", value: function () {
            return c2d.env.hostsForStatic[0] + c2d.env.gamePath + ""
          }
        }, {
          key: "_findExtIdx", value: function (e) {
            if (!e.includes(".")) return e.length - 1;
            var t = "", n = e.lastIndexOf("/");
            return -1 !== n && (t = e.substr(0, n), e = e.substr(n)), t.length + e.indexOf(".")
          }
        }, {
          key: "_getPrefixedFilename", value: function (e, t) {
            var n = this._findExtIdx(e);
            return e.substr(0, n) + "-" + t + e.substr(n)
          }
        }]), e
      }());
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  38: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("./FullscreenIOS.js")),
      o = r(e("./FullscreenGeneric.js")), r = function () {
        function e() {
          throw(0, i.default)(this, e), new Error("no no no no")
        }

        return (0, a.default)(e, [{
          key: "init", value: function () {
            throw new Error("override me")
          }
        }], [{
          key: "create", value: function (e) {
            var t = null;
            return e.mobile() && (e.supportGenericFullscreen() && (t = new o.default), t = (t = e.ios() && e.safari() ? new s.default : t) || new o.default), t
          }
        }]), e
      }();
    n.default = r
  }, {
    "./FullscreenGeneric.js": 39,
    "./FullscreenIOS.js": 40,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  39: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass"));
    n.default = function () {
      function e() {
        (0, i.default)(this, e)
      }

      return (0, a.default)(e, [{
        key: "init", value: function () {
          document.addEventListener("touchend", function () {
            screenfull.enabled && screenfull.request()
          })
        }
      }, {
        key: "exit", value: function () {
          screenfull.enabled && screenfull.exit()
        }
      }]), e
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  40: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/defineProperty"))),
      a = r(e("@babel/runtime/helpers/classCallCheck")), s = r(e("@babel/runtime/helpers/createClass"));

    function o(t, e) {
      var n, r = Object.keys(t);
      return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t), e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })), r.push.apply(r, n)), r
    }

    r = function () {
      function e() {
        (0, a.default)(this, e), this.body = null, this.container = null, this.containerHeight = null, this.overlayBackground = null, this.overlay = null, this.parentWindowData = null, this.isIframe = window !== window.parent, this.isWebView = !1, this.device = c2d.env.device
      }

      return (0, s.default)(e, [{
        key: "init", value: function () {
          var e, t = this;
          this.supportFullscreen && (this.body = document.body, this.body.style["background-color"] = "#000000", this.container = document.querySelector("#container"), this.createOverlay(), this.setHeight(), this.showOverlay(), this.handle({type: "load"}), this.checkFullscreen(), window.addEventListener("message", function (e) {
            t.parentWindowData = function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? o(Object(n), !0).forEach(function (e) {
                  (0, i.default)(t, e, n[e])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : o(Object(n)).forEach(function (e) {
                  Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                })
              }
              return t
            }({}, e.data), t.checkFullscreen()
          }), window.addEventListener("orientationchange", function (e) {
            return t.handle(e)
          }, !1), document.addEventListener("scroll", function (e) {
            return t.handle(e)
          }), document.addEventListener("resize", function (e) {
            return t.handle(e)
          }), this.supportFullscreen || this.iosFullscreenException || (e = document.querySelector(".app-container"), window.bodyScrollLock.disableBodyScroll(e), this.hideOverlay()))
        }
      }, {
        key: "supportFullscreen", get: function () {
          return !(this.device.ipad || this.device.insideIFrame || this.device.iosYandex || this.device.iosChrome || this.device.iosOpera || this.device.iosFirefox || this.iosFullscreenException)
        }
      }, {
        key: "iOSversion", value: function () {
          var e = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
          return !!e && [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || 0, 10)]
        }
      }, {
        key: "iosFullscreenException", get: function () {
          var e = this.iOSversion();
          return e && 15 === e[0]
        }
      }, {
        key: "handle", value: function (e) {
          "load" === e.type && (this.isPortrait() || this.isFullscreen() || this.isWebView ? this.hideOverlay() : this.showOverlay()), "resize" !== e.type && "orientationchange" !== e.type || (this.checkFullscreen(), this.setHeight())
        }
      }, {
        key: "showOverlay", value: function () {
          this.hasOverlay() || (this.overlayBackground.style.visibility = "visible", this.overlay.style.visibility = "visible", this.isIframe ? window.parent.postMessage({
            type: "updateCss",
            css: "margin-bottom: 100px"
          }, "*") : (this.body.scrollTop = -(window.outerHeight - window.innerHeight), document.documentElement.style.height = "100%", this.body.style.height = "".concat(2 * window.innerHeight, "px")), this.allowEvents())
        }
      }, {
        key: "hideOverlay", value: function () {
          this.hasOverlay() && (this.overlayBackground.style.visibility = "hidden", this.overlay.style.visibility = "hidden", window.parent.postMessage({
            type: "updateCss",
            css: "margin-bottom: 0px"
          }, "*"), this.denyEvents())
        }
      }, {
        key: "hasOverlay", value: function () {
          return "visible" === this.overlay.style.visibility
        }
      }, {
        key: "allowEvents", value: function () {
          var t, e = this;
          !this.isWebView && this.supportFullscreen && (t = {}, document.ontouchmove = function (e) {
            t[window.innerHeight] = window.innerHeight
          }, document.ontouchend = function () {
            1 == Object.keys(t).length && (e.isWebView = !0, e.hideOverlay())
          })
        }
      }, {
        key: "denyEvents", value: function () {
          document.touchstart = null, document.ontouchmove = function (e) {
            e.stopPropagation()
          }
        }
      }, {
        key: "createOverlay", value: function () {
          this.overlay = document.createElement("div"), this.overlay.id = "overlay", this.overlay.style.visibility = "hidden", this.body.appendChild(this.overlay), this.overlayBackground = document.createElement("div"), this.overlayBackground.id = "overlay-background", this.overlayBackground.style.visibility = "hidden", this.container.appendChild(this.overlayBackground)
        }
      }, {
        key: "checkFullscreen", value: function () {
          this.setHeight(), this.isPortrait() || this.isFullscreen() ? this.hideOverlay() : this.showOverlay()
        }
      }, {
        key: "setHeight", value: function () {
          this.isPortrait() ? this.containerHeight = screen.height : this.containerHeight = screen.width, this.container.style.height = this.containerHeight + "px"
        }
      }, {
        key: "isPortrait", value: function () {
          return !(2 & window.orientation)
        }
      }, {
        key: "isFullscreen", value: function () {
          return window.parent.postMessage({type: "checkScreen"}, "*"), !!this.isWebView || (this.parentWindowData && this.parentWindowData.innerHeight ? window.outerHeight <= this.parentWindowData.innerHeight : window.outerHeight <= window.innerHeight)
        }
      }]), e
    }();
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/defineProperty": 8,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  41: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = null, r = function () {
        function e() {
          (0, i.default)(this, e)
        }

        return (0, a.default)(e, [{
          key: "dictionary", set: function (e) {
            s = e
          }
        }]), e
      }();
    n.default = r, Object.defineProperty(String.prototype, "ls", {
      value: function (e) {
        var t = s[this];
        if (t) {
          for (var n in e) t = t.replaceAll("$[" + n + "]", e[n]);
          return t
        }
        return this
      }, enumerable: !1, configurable: !1
    })
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  42: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass"));
    n.default = function () {
      function t(e) {
        if ((0, i.default)(this, t), this.group = e, this.general = "general", this.available = this.isStorageAvailable(), this.available) {
          try {
            this.allGamesData = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : {}
          } catch (e) {
            this.allGamesData = {}
          }
          this.generalData = this.allGamesData[this.general] || {}, this.gameData = Object.assign({
            token: "",
            skipIntro: !1
          }, this.allGamesData[e]), this._save()
        }
      }

      return (0, a.default)(t, [{
        key: "getItem", value: function (e) {
          var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : void 0;
          return this.available ? void 0 !== this.generalData[e] ? this.generalData[e] : void 0 !== this.gameData[e] ? this.gameData[e] : void 0 === this.generalData[e] && void 0 === this.gameData[e] ? t : void 0 : t
        }
      }, {
        key: "setItem", value: function (e) {
          var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : void 0;
          if (this.available) {
            if (null != t) return this.gameData.hasOwnProperty(e) ? this.gameData[e] = t : this.generalData[e] = t, this._save(), this.toString();
            this.removeItem(e)
          }
        }
      }, {
        key: "removeItem", value: function (e) {
          this.available && (this.gameData.hasOwnProperty(e) ? null === e ? this.gameData = {} : delete this.gameData[e] : null === e ? this.generalData = {} : delete this.generalData[e], this._save())
        }
      }, {
        key: "_save", value: function () {
          this.allGamesData[this.general] = this.generalData, this.allGamesData[this.group] = this.gameData, localStorage.setItem("data", JSON.stringify(this.allGamesData))
        }
      }, {
        key: "isStorageAvailable", value: function () {
          try {
            var e = window.localStorage, t = "__storage_test__";
            return e.setItem(t, t), e.removeItem(t), !0
          } catch (e) {
            return !1
          }
        }
      }, {
        key: "erase", value: function () {
          return this.isStorageAvailable() ? (localStorage.clear(), "successful") : "failed"
        }
      }, {
        key: "toString", value: function () {
          return JSON.stringify(localStorage.getItem("data"))
        }
      }]), t
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  43: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/defineProperty"))),
      u = r(e("@babel/runtime/helpers/typeof")), a = r(e("@babel/runtime/helpers/classCallCheck")),
      s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/inherits")),
      l = r(e("@babel/runtime/helpers/possibleConstructorReturn")), c = r(e("@babel/runtime/helpers/getPrototypeOf")),
      h = r(e("./IComponent.js")), r = r(e("./../event/EventDispatcher.js")), d = e("./ComponentFabric.js"),
      f = e("./metrix.js");

    function p(t, e) {
      var n, r = Object.keys(t);
      return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t), e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })), r.push.apply(r, n)), r
    }

    function m(e, t) {
      var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!r) {
        if (Array.isArray(e) || (r = function (e, t) {
          if (e) {
            if ("string" == typeof e) return v(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? v(e, t) : void 0
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
      var i, a = !0, s = !1;
      return {
        s: function () {
          r = r.call(e)
        }, n: function () {
          var e = r.next();
          return a = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            a || null == r.return || r.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function v(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

    function b(n) {
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
        return e = r ? (e = (0, c.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, l.default)(this, e)
      }
    }

    var y = {
      COMPONENT_INITIALIZED: "Component.COMPONENT_INITIALIZED",
      COMPONENT_ACTIVATED: "Component.COMPONENT_ACTIVATED",
      COMPONENT_DEACTIVATED: "Component.COMPONENT_DEACTIVATED"
    }, e = function (e) {
      (0, o.default)(r, e);
      var n = b(r);

      function r(e) {
        var t;
        return (0, a.default)(this, r), (t = n.call(this)).implement(h.default), t._name = e, t._controller = null, t._children = [], t._context = null, t._respack = null, t._initialized = !1, t._active = !1, t._autoActivate = !0, t._events = [], t._listenerEventRouter = null, t._linkedComponents = {}, t.resizeHandler = function (e) {
          return t.onResize()
        }, t
      }

      return (0, s.default)(r, [{
        key: "initialize", value: function () {
          var e = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null,
            n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
          if (this._initialized) throw new Error("Component can not be initialized twice!");
          this._context = n, this._respack = t;
          t = this._respack && this.config;
          if (t && void 0 !== t.autoActivate && (this._autoActivate = !!t.autoActivate), this.onInitialize(), this._respack) {
            var r = this._respack.getSubPacks();
            if (Object.keys(r).length) {
              var i, a, s, o = null;
              for (i in r) 0 != i.indexOf("//") && (a = r[i], (s = (0, d.createComponent)(a.type, i)).initialize(a, o || (o = {}, Object.assign(o, n), e._controller && e._controller.view && (o.view = e._controller.view), o)), this.addChild(s))
            }
          }
          this._initialized = !0, this.dispatch(y.COMPONENT_INITIALIZED)
        }
      }, {
        key: "initialized", get: function () {
          return this._initialized
        }
      }, {
        key: "activate", value: function () {
          if (this._active) throw new Error("Component can not be activated twice!");
          var e, t = m(this._children);
          try {
            for (t.s(); !(e = t.n()).done;) {
              var n = e.value;
              n.isAutoActivate && n.activate()
            }
          } catch (e) {
            t.e(e)
          } finally {
            t.f()
          }
          this.activateEvents(), this.onActivate(), this._active = !0, this._controller && this._controller.run(), this.dispatch(y.COMPONENT_ACTIVATED)
        }
      }, {
        key: "deactivate", value: function () {
          if (!this._active) throw new Error("Component can not be deactivated twice!");
          this._controller && this._controller.stop(), this.deactivateEvents(), this.onDeactivate(), this._active = !1;
          var e, t = m(this._children);
          try {
            for (t.s(); !(e = t.n()).done;) e.value.deactivate()
          } catch (e) {
            t.e(e)
          } finally {
            t.f()
          }
          this.dispatch(y.COMPONENT_DEACTIVATED)
        }
      }, {
        key: "active", get: function () {
          return this._active
        }
      }, {
        key: "update", value: function (e) {
          var t, n = m(this._children);
          try {
            for (n.s(); !(t = n.n()).done;) {
              var r = t.value;
              r.active && r.update(e)
            }
          } catch (e) {
            n.e(e)
          } finally {
            n.f()
          }
          this._controller && this._controller.update(e)
        }
      }, {
        key: "addChild", value: function (e) {
          var t = this;
          if (this._children.contains(e)) throw new Error("Component: child with [".concat(e.name, "] already added!"));
          this._children.push(e), e.subscribeAny(function (e) {
            return t.dispatch(e.name, e.data)
          }, this), this._controller && this._controller.attachComponent(e), this._active && e.isAutoActivate && e.activate()
        }
      }, {
        key: "removeChild", value: function (e) {
          var t = this.getChild(e);
          if (!t) throw new Error("Component: child with name[".concat(e, "] not found!"));
          t.deactivate(), this._controller && this._controller.detachComponent(t), t.unsubscribeAny(this), this._children.remove(t)
        }
      }, {
        key: "getChild", value: function (e) {
          var t, n = m(this._children);
          try {
            for (n.s(); !(t = n.n()).done;) {
              var r = t.value;
              if (r.name === e) return r
            }
          } catch (e) {
            n.e(e)
          } finally {
            n.f()
          }
          return console.warn("Component: child with name[".concat(e, "] not found!")), null
        }
      }, {
        key: "hasChild", value: function (e) {
          var t, n = m(this._children);
          try {
            for (n.s(); !(t = n.n()).done;) if (t.value.name === e) return !0
          } catch (e) {
            n.e(e)
          } finally {
            n.f()
          }
          return !1
        }
      }, {
        key: "exportApi", value: function (e) {
          var n = this;
          e.forEach(function (t) {
            if (!n.controller[t]) throw new Error('Failed to build API. There is no "'.concat(t, '" method in ').concat(n.controller.constructor.name));
            n[t] = function () {
              var e;
              return (e = n.controller)[t].apply(e, arguments)
            }
          })
        }
      }, {
        key: "controller", get: function () {
          return this._controller
        }, set: function (e) {
          var t = this;
          if (this._controller) throw new Error("Component: component controller already added!");
          this._controller = e, (this._controller.eventRouter = this)._controller.getLinkedComponent = function (e) {
            return t.getLinkedComponent(e)
          };
          var n, r = m(this._children);
          try {
            for (r.s(); !(n = r.n()).done;) {
              var i = n.value;
              this._controller.attachComponent(i)
            }
          } catch (e) {
            r.e(e)
          } finally {
            r.f()
          }
          this._active && this._controller.run()
        }
      }, {
        key: "context", get: function () {
          return this._context
        }
      }, {
        key: "respack", get: function () {
          return this._respack
        }
      }, {
        key: "config", get: function () {
          return this._respack.getAsset("config")
        }
      }, {
        key: "isAutoActivate", get: function () {
          return this._autoActivate
        }
      }, {
        key: "name", get: function () {
          return this._name
        }
      }, {
        key: "listenerEventRouter", get: function () {
          return this._listenerEventRouter
        }, set: function (e) {
          this._listenerEventRouter = e
        }
      }, {
        key: "getComponents", value: function () {
          if (!this.controller) return {};
          if (!(0 < arguments.length && void 0 !== arguments[0] && arguments[0])) return this.controller.components;
          var e, t = {};
          for (e in this.controller.components) t = Object.assign(this.getComponents(!1), this.controller.components[e].getComponents(!0));
          return t
        }
      }, {
        key: "getLinkedComponent", value: function (e) {
          return this._linkedComponents[e]
        }
      }, {
        key: "activateEvents", value: function () {
          var r = this,
            e = (c2d.eventManager.subscribe(c2d.documentEvents.SCREEN_WAS_RESIZED, this.resizeHandler), this.config);
          if (e.events) {
            function l(e, t, n) {
              if (r.fillProperties(t), n) {
                if ("function" != typeof r[n]) throw new Error("can not find method " + n);
                r[n](e.data)
              }
            }

            var n, t = m(e.events);
            try {
              var i = function () {
                var i = n.value;
                if (void 0 !== i.enabled && !1 === i.enabled) return "continue";

                function e(e) {
                  if (void 0 !== s) {
                    if (void 0 === e.data) return;
                    if ("object" === (0, u.default)(s)) for (var t = 0, n = Object.keys(s); t < n.length; t++) {
                      var r = n[t];
                      if (s[r] !== e.data[r]) return
                    } else if (s !== e.data) return
                  }
                  o ? c2d.Timeout.invoke(function () {
                    return l(e, i.properties, a)
                  }, o) : l(e, i.properties, a)
                }

                var t = i.eventID, a = i.eventHandler, s = i.eventData, o = i.delay ? parseInt(i.delay) : 0;
                r._listenerEventRouter && (r._listenerEventRouter.subscribe(t, e), r._events.push({id: t, cb: e}))
              };
              for (t.s(); !(n = t.n()).done;) i()
            } catch (e) {
              t.e(e)
            } finally {
              t.f()
            }
          }
        }
      }, {
        key: "deactivateEvents", value: function () {
          if (c2d.eventManager.unsubscribe(c2d.documentEvents.SCREEN_WAS_RESIZED, this.resizeHandler), this._listenerEventRouter && this._events.length) {
            var e, t = m(this._events);
            try {
              for (t.s(); !(e = t.n()).done;) {
                var n = e.value;
                if (!n.cb) throw new Error("event callback is " + n.cb);
                this._listenerEventRouter.off(n.id, n.cb)
              }
            } catch (e) {
              t.e(e)
            } finally {
              t.f()
            }
            this._events = []
          }
        }
      }, {
        key: "onInitialize", value: function () {
        }
      }, {
        key: "onActivate", value: function () {
        }
      }, {
        key: "onDeactivate", value: function () {
        }
      }, {
        key: "onResize", value: function () {
          this.fillProperties(this.config.properties)
        }
      }, {
        key: "fillProperties", value: function () {
          var e, t;
          for (e in t = this.getParticularProps(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {})) {
            var n = t[e];
            "function" == typeof this[e] ? Array.isArray(n) ? this[e].apply(this, n) : console.error("value for function: " + e, "must be array") : e in this && (this[e] = n)
          }
        }
      }, {
        key: "getParticularProps", value: function (e) {
          var t = "landscape" === c2d.screenParams.orientation, n = "portrait" === c2d.screenParams.orientation,
            r = e.landscape, i = e.portrait, a = e.tablet;
          return c2d.env.device.tablet() && this.checkTabletConfig(a) ? (a = a[n ? "portrait" : "landscape"] || {}).noMergeWithCommon ? a : Object.assign({}, n ? i : r, a) : t && r ? r : n && i ? i : e
        }
      }, {
        key: "checkTabletConfig", value: function (e) {
          if ("object" !== (0, u.default)(e) || Object.keys(e).length) return !!e;
          throw new Error("fill tablet's properties (add portrait or landscape)")
        }
      }, {
        key: "position", get: function () {
          return this.controller.view.position
        }, set: function (e) {
          var t, n;
          this.controller && this.controller.view && (n = (t = function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = null != arguments[e] ? arguments[e] : {};
              e % 2 ? p(Object(n), !0).forEach(function (e) {
                (0, i.default)(t, e, n[e])
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : p(Object(n)).forEach(function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
              })
            }
            return t
          }({}, e)).x, t = t.y, Number.isNumeric(e.x) ? this.controller.view.position = e : (e = (0, f.vw2px)(parseFloat(n)), n = (0, f.vh2px)(parseFloat(t)), this.controller.view.position.x = e, this.controller.view.position.y = n))
        }
      }, {
        key: "scale", get: function () {
          return this.controller.view.scale
        }, set: function (e) {
          Object.isObject(e) ? this.controller.view.scale = e : Number.isNumeric(e) ? this.controller.view.scale.x = this.controller.view.scale.y = e : this.controller.view.scale.x = this.controller.view.scale.y = parseFloat(e) * (0, f.getScreenZoomFactor)() / 100
        }
      }]), r
    }(r.default);
    (n.default = e).Events = y
  }, {
    "./../event/EventDispatcher.js": 93,
    "./ComponentFabric.js": 44,
    "./IComponent.js": 45,
    "./metrix.js": 46,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/defineProperty": 8,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21,
    "@babel/runtime/helpers/typeof": 26
  }],
  44: [function (e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {value: !0}), n.registerComponent = n.getComponents = n.createComponent = void 0;
    var r = {};
    n.registerComponent = function (e) {
      var t = e.ID.toLowerCase();
      if (r[t]) throw new Error("Canary: component with type [".concat(t, "] already registered!"));
      r[t] = e
    }, n.createComponent = function (e, t) {
      var e = e.toLowerCase(), n = r[e];
      if (n) return new n(t);
      throw new Error("Canary: component with type [".concat(e, "] not registered!"))
    };
    n.getComponents = function () {
      return r
    }
  }, {}],
  45: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/inherits")),
      o = r(e("@babel/runtime/helpers/possibleConstructorReturn")), l = r(e("@babel/runtime/helpers/getPrototypeOf"));

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
        return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, o.default)(this, e)
      }
    }

    r = function (e) {
      (0, s.default)(n, e);
      var t = u(n);

      function n() {
        return (0, i.default)(this, n), t.apply(this, arguments)
      }

      return (0, a.default)(n, [{
        key: "initialize", value: function (e, t) {
        }
      }, {
        key: "activate", value: function () {
        }
      }, {
        key: "update", value: function (e) {
        }
      }, {
        key: "deactivate", value: function () {
        }
      }]), n
    }(r(e("./../utils/Interface.js")).default);
    n.default = r
  }, {
    "./../utils/Interface.js": 133,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  46: [function (e, t, n) {
    "use strict";

    function r(e) {
      return e * ("portrait" == c2d.screenParams.orientation ? c2d.screenParams.designHeight : c2d.screenParams.designWidth) / 100
    }

    Object.defineProperty(n, "__esModule", {value: !0}), n.getScreenZoomFactor = function () {
      return c2d.screenParams.designAspectRatio / c2d.screenParams.screenAspectRatio
    }, n.vh2px = function (e) {
      return r(e) * c2d.screenParams.screenAspectRatioActual
    }, n.vw2px = r
  }, {}],
  47: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/toConsumableArray"))),
      a = r(e("@babel/runtime/helpers/defineProperty")), s = r(e("@babel/runtime/helpers/classCallCheck")),
      o = r(e("@babel/runtime/helpers/createClass")), l = r(e("@babel/runtime/helpers/inherits")),
      u = r(e("@babel/runtime/helpers/possibleConstructorReturn")), c = r(e("@babel/runtime/helpers/getPrototypeOf")),
      r = r(e("./../../component/Component.js")), h = e("./../../component/metrix.js");

    function d(t, e) {
      var n, r = Object.keys(t);
      return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t), e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })), r.push.apply(r, n)), r
    }

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
        return e = r ? (e = (0, c.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, u.default)(this, e)
      }
    }

    e = function (e) {
      (0, l.default)(r, e);
      var n = f(r);

      function r(e, t) {
        if ((0, s.default)(this, r), e = n.call(this, e), 0 == arguments.length) throw new Error("Component Name is undefined. Check constructor in component " + e.constructor.name);
        return e._viewCreated = !1, e._content = t || new c2d.display.Container, e
      }

      return (0, o.default)(r, [{
        key: "onInitialize", value: function () {
          this.context.view.addChild(this._content)
        }
      }, {
        key: "onActivate", value: function () {
          this._viewCreated || (this.fillProperties(this.config), this.fillProperties(this.config.properties), this._viewCreated = !0)
        }
      }, {
        key: "position", get: function () {
          return this._content.position
        }, set: function (e) {
          var t = function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = null != arguments[e] ? arguments[e] : {};
              e % 2 ? d(Object(n), !0).forEach(function (e) {
                (0, a.default)(t, e, n[e])
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : d(Object(n)).forEach(function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
              })
            }
            return t
          }({}, e), n = t.x, t = t.y;
          Number.isNumeric(e.x) ? this._content.position = e : (e = (0, h.vw2px)(parseFloat(n)), n = (0, h.vh2px)(parseFloat(t)), this._content.position.x = e, this._content.position.y = n)
        }
      }, {
        key: "pivot", get: function () {
          return this._content.pivot
        }, set: function (e) {
          this._content.pivot = e
        }
      }, {
        key: "anchor", get: function () {
          return this._content.anchor
        }, set: function (e) {
          this._content.anchor = e
        }
      }, {
        key: "visible", get: function () {
          return this._content.visible
        }, set: function (e) {
          this._content.visible = e
        }
      }, {
        key: "alpha", get: function () {
          return this._content.alpha
        }, set: function (e) {
          this._content.alpha = e
        }
      }, {
        key: "width", get: function () {
          return this._content.width
        }, set: function (e) {
          this._content.width = e
        }
      }, {
        key: "height", get: function () {
          return this._content.height
        }, set: function (e) {
          this._content.height = e
        }
      }, {
        key: "rotation", get: function () {
          return this._content.rotation
        }, set: function (e) {
          this._content.rotation = e
        }
      }, {
        key: "displayGroup", get: function () {
          return this._content.displayGroup
        }, set: function (e) {
          this._content.displayGroup = "string" == typeof e ? c2d.display.groups[e] : e
        }
      }, {
        key: "zOrder", get: function () {
          return this._content.zOrder
        }, set: function (e) {
          this._content.zOrder = e
        }
      }, {
        key: "scale", get: function () {
          return this._content.scale
        }, set: function (e) {
          Object.isObject(e) ? this._content.scale = e : Number.isNumeric(e) ? this._content.scale.x = this._content.scale.y = e : this._content.scale.x = this._content.scale.y = parseFloat(e) * (0, h.getScreenZoomFactor)() / 100
        }
      }, {
        key: "scaleX", get: function () {
          return this._content.scale.x
        }, set: function (e) {
          this._content.scale.x = e
        }
      }, {
        key: "scaleY", get: function () {
          return this._content.scale.y
        }, set: function (e) {
          this._content.scale.y = e
        }
      }, {
        key: "mask", set: function (e) {
          var t, n = new PIXI.Graphics;
          (t = n.beginFill(0)).drawRect.apply(t, (0, i.default)(e)).endFill(), this._content.mask = n
        }
      }]), r
    }(r.default);
    (n.default = e).ID = "View"
  }, {
    "./../../component/Component.js": 43,
    "./../../component/metrix.js": 46,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/defineProperty": 8,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21,
    "@babel/runtime/helpers/toConsumableArray": 25
  }],
  48: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      s = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/typeof"))),
      i = r(e("@babel/runtime/helpers/classCallCheck")), a = r(e("@babel/runtime/helpers/createClass")),
      o = r(e("@babel/runtime/helpers/get")), l = r(e("@babel/runtime/helpers/inherits")),
      u = r(e("@babel/runtime/helpers/possibleConstructorReturn")), c = r(e("@babel/runtime/helpers/getPrototypeOf")),
      h = r(e("./../sprite/index.js")), d = r(e("./../../display/index.js")),
      f = r(e("./../../animation/FrameAnimationConfig.js"));

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
      (0, l.default)(r, e);
      var t = p(r);

      function r(e) {
        return (0, i.default)(this, r), (e = t.call(this, e, new d.default.AnimatedSprite))._prevAnimationName = null, e._animations = {}, e
      }

      return (0, a.default)(r, [{
        key: "onInitialize", value: function () {
          if (this.context.view.addChild(this._content), this.config.animations) for (var e = 0, t = Object.keys(this.config.animations); e < t.length; e++) {
            var n = t[e];
            this._animations[n] = f.default.createFrom(this.config.animations[n], this.respack)
          }
          (0, o.default)((0, c.default)(r.prototype), "onInitialize", this).call(this)
        }
      }, {
        key: "stop", value: function () {
          this._content.stop()
        }
      }, {
        key: "play", value: function (e) {
          var t, n, r, i, a = this;
          "string" == typeof e ? this._playAnimation(e) : "object" === (0, s.default)(e) && (t = e.delay || 0, n = e.type || "loop", r = e.animations || Object.keys(this._animations), i = "random" === n ? Math.floor(Math.random() * r.length) : 0, this._content.onComplete = function () {
            "loop" === n ? ++i >= r.length && (i = 0) : "random" === n ? i = Math.floor(Math.random() * r.length) : ++i >= r.length && (i = r.length - 1), c2d.call(function () {
              return a._playAnimation(r[i])
            }, t)
          }, c2d.call(function () {
            return a._playAnimation(r[i])
          }, t))
        }
      }, {
        key: "onComplete", set: function (e) {
          var t = this;
          this._content.onComplete = function () {
            t._content.onComplete = null, "function" == typeof e ? e() : t.fillProperties(e)
          }
        }
      }, {
        key: "_playAnimation", value: function (e) {
          e && this._prevAnimationName !== e ? this._content.setAnimation(this._animations[e]) : this._content._currentTime = 0, this._prevAnimationName = e, this._content.play()
        }
      }]), r
    }(h.default);
    (n.default = r).ID = "AnimatedSprite"
  }, {
    "./../../animation/FrameAnimationConfig.js": 30,
    "./../../display/index.js": 69,
    "./../sprite/index.js": 53,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/get": 9,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21,
    "@babel/runtime/helpers/typeof": 26
  }],
  49: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/get")),
      o = r(e("@babel/runtime/helpers/inherits")), l = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
      u = r(e("@babel/runtime/helpers/getPrototypeOf"));
    r(e("./../../component/Component.js")), r(e("./../../display/index.js"));

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
      (0, o.default)(n, e);
      var t = c(n);

      function n(e) {
        return (0, i.default)(this, n), (e = t.call(this, e)).event = null, e.eventData = null, e
      }

      return (0, a.default)(n, [{
        key: "onInitialize", value: function () {
          var e = this;
          (0, s.default)((0, u.default)(n.prototype), "onInitialize", this).call(this), this._sprite.buttonMode = !0, this._sprite.interactive = !0, this._sprite.mouseup = this._sprite.touchend = function () {
            return e._release()
          }
        }
      }, {
        key: "_release", value: function () {
          this.dispatch(this.event, this.eventData)
        }
      }, {
        key: "disabled", value: function (e) {
          this._sprite.buttonMode = !e, this._sprite.interactive = !e, this.config.textureDisabled && this.setTexture(e ? this.config.textureDisabled : this.config.texture)
        }
      }]), n
    }(r(e("./../sprite/index.js")).default);
    (n.default = r).ID = "Button"
  }, {
    "./../../component/Component.js": 43,
    "./../../display/index.js": 69,
    "./../sprite/index.js": 53,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/get": 9,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  50: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/inherits")),
      o = r(e("@babel/runtime/helpers/possibleConstructorReturn")), l = r(e("@babel/runtime/helpers/getPrototypeOf")),
      u = r(e("./../../components/View/index.js")), c = r(e("./../../display/index.js"));

    function h(e, t) {
      var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!r) {
        if (Array.isArray(e) || (r = function (e, t) {
          if (e) {
            if ("string" == typeof e) return d(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? d(e, t) : void 0
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
      var i, a = !0, s = !1;
      return {
        s: function () {
          r = r.call(e)
        }, n: function () {
          var e = r.next();
          return a = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            a || null == r.return || r.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function d(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

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
        var e, t = (0, l.default)(n);
        return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, o.default)(this, e)
      }
    }

    r = function (e) {
      (0, s.default)(n, e);
      var t = f(n);

      function n(e) {
        return (0, i.default)(this, n), t.call(this, e)
      }

      return (0, a.default)(n, [{
        key: "onInitialize", value: function () {
          this.context.view.addChild(this._content)
        }
      }, {
        key: "setEmitter", value: function (e, t) {
          var n = this, r = -1;
          this._content && (r = this.context.view.children.indexOf(this._content), this.context.view.removeChild(this._content)), this._content = new c.default.Emitter([].concat(e).map(function (e) {
            return n.respack.getAsset(e)
          }), this.respack.getAsset(t)), -1 !== r ? this.context.view.addChildAt(this._content, r) : this.context.view.addChild(this._content)
        }
      }, {
        key: "effect", set: function (e) {
          this._content && this.context.view.removeChild(this._content), this._content = new PIXINeutrinoEffect(this.respack.getAsset(e), [0, 0, 0], 0)
        }
      }, {
        key: "position", set: function (e) {
          this._content.updateOwnerPos ? this._content.updateOwnerPos(e.x, e.y) : this._content.position = e
        }
      }, {
        key: "enableEmit", set: function (e) {
          if (this._content.effect) {
            var t, n = h(this._content.effect.od);
            try {
              for (n.s(); !(t = n.n()).done;) {
                var r = t.value;
                e ? r.start() : r.stop()
              }
            } catch (e) {
              n.e(e)
            } finally {
              n.f()
            }
          } else this._content.enableEmit = e
        }
      }, {
        key: "cleanup", value: function () {
          this._content.cleanup()
        }
      }, {
        key: "update", value: function (e) {
          this._content.update && this._content.update(e / 1e3)
        }
      }]), n
    }(u.default);
    (n.default = r).ID = "Emitter"
  }, {
    "./../../components/View/index.js": 47,
    "./../../display/index.js": 69,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  51: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"), i = e("./../component/ComponentFabric.js"),
      a = r(e("./view/index.js")), s = r(e("./sprite/index.js")), o = r(e("./button/index.js")),
      l = r(e("./text/index.js")), u = r(e("./spine/index.js")), c = r(e("./emitter/index.js")),
      h = r(e("./animatedSprite/index.js")), r = r(e("./videoSprite/index.js"));
    (0, i.registerComponent)(a.default), (0, i.registerComponent)(s.default), (0, i.registerComponent)(o.default), (0, i.registerComponent)(l.default), (0, i.registerComponent)(u.default), (0, i.registerComponent)(c.default), (0, i.registerComponent)(h.default), (0, i.registerComponent)(r.default)
  }, {
    "./../component/ComponentFabric.js": 44,
    "./animatedSprite/index.js": 48,
    "./button/index.js": 49,
    "./emitter/index.js": 50,
    "./spine/index.js": 52,
    "./sprite/index.js": 53,
    "./text/index.js": 54,
    "./videoSprite/index.js": 55,
    "./view/index.js": 56,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  52: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/inherits")),
      o = r(e("@babel/runtime/helpers/possibleConstructorReturn")), l = r(e("@babel/runtime/helpers/getPrototypeOf")),
      u = r(e("./../../components/View/index.js")), c = r(e("./../../display/index.js"));

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
        return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, o.default)(this, e)
      }
    }

    r = function (e) {
      (0, s.default)(n, e);
      var t = h(n);

      function n(e) {
        return (0, i.default)(this, n), (e = t.call(this, e))._skin = null, e
      }

      return (0, a.default)(n, [{
        key: "spine", set: function (e) {
          this._content && this._content.parent && (t = this.context.view.getChildIndex(this._content), this.context.view.removeChild(this._content));
          var t, n = this.respack.getAsset(e);
          if (!n) throw new Error("Something wrong with spine asset: " + e);
          this._content = new c.default.Spine(n), void 0 !== t ? this.context.view.addChildAt(this._content, t) : this.context.view.addChild(this._content)
        }
      }, {
        key: "skin", get: function () {
          return this._skin
        }, set: function (e) {
          this._content && (this._content.skin = e, this._skin = e)
        }
      }, {
        key: "oneStateAnimation", set: function (e) {
          this._content && (this._content.oneStateAnimation = e)
        }
      }, {
        key: "play", value: function (e) {
          var t = this, n = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            r = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
          this._content && c2d.call(function () {
            return t._content.play(e, n, r)
          }, 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 0)
        }
      }, {
        key: "playRandom", value: function (e) {
          var t = this, n = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            r = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            i = e[Math.floor(e.length * Math.random())];
          this.play(i, !1, r), n && (this._content.onComplete = function () {
            t.playRandom(e, !0, !0)
          })
        }
      }, {
        key: "stop", value: function () {
          this._content && this._content.stop()
        }
      }, {
        key: "speed", set: function (e) {
          this._content && (this._content.speed = e)
        }
      }, {
        key: "loop", set: function (e) {
          this._content && (this._content.loop = e)
        }
      }, {
        key: "onComplete", set: function (e) {
          var t = this;
          this._content.onComplete = function () {
            t._content.onComplete = null, "function" == typeof e ? e() : t.fillProperties(e)
          }
        }
      }, {
        key: "onEvent", set: function (n) {
          var r = this;
          this._content.onEvent = function (e, t) {
            "function" == typeof n ? n(e, t) : r.fillProperties(n)
          }
        }
      }, {
        key: "attach", value: function () {
          for (var t = this, e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
          for (var i, a, s = 0, o = n; s < o.length; s++) (i = o[s]).emitter && ((a = {}).emitter = this._respack.getAsset(i.emitter), a.textures = i.textures.map(function (e) {
            return t._respack.getAsset(e)
          }), this._content.attachEmitter(i.slot, a))
        }
      }, {
        key: "getChildByName", value: function (e) {
          return this._content.getChildByName(e)
        }
      }]), n
    }(u.default);
    (n.default = r).ID = "Spine"
  }, {
    "./../../components/View/index.js": 47,
    "./../../display/index.js": 69,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  53: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/inherits")),
      o = r(e("@babel/runtime/helpers/possibleConstructorReturn")), l = r(e("@babel/runtime/helpers/getPrototypeOf")),
      u = r(e("./../../components/View/index.js")), c = r(e("./../../display/index.js"));

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
        return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, o.default)(this, e)
      }
    }

    r = function (e) {
      (0, s.default)(r, e);
      var n = h(r);

      function r(e, t) {
        return (0, i.default)(this, r), n.call(this, e, t || new c.default.Sprite)
      }

      return (0, a.default)(r, [{
        key: "texture", set: function (e) {
          e = "string" == typeof e ? this.respack.getAsset(e) : e, this._content.texture = e
        }
      }, {
        key: "blendMode", set: function (e) {
          e = "string" == typeof e ? c2d.display.blendMode[e] : e, this._content.blendMode = e
        }
      }, {
        key: "crossFade", value: function (e) {
          var t = this, n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1e3,
            r = (e = "string" == typeof e ? this.respack.getAsset(e) : e, new c.default.Sprite(e));
          r.alpha = 0, this._content.addChild(r), c2d.Tween.get(r).to({alpha: 1}, n).call(function () {
            t._content.texture = e, t._content.removeChild(r)
          })
        }
      }, {
        key: "fade", value: function () {
          var e = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
            n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1,
            r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1e3;
          this.visible = !0, this._content.alpha = t, c2d.Tween.get(this._content).to({alpha: n}, r).call(function () {
            0 === n && (e.visible = !1)
          })
        }
      }]), r
    }(u.default);
    (n.default = r).ID = "Sprite"
  }, {
    "./../../components/View/index.js": 47,
    "./../../display/index.js": 69,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  54: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/get")),
      o = r(e("@babel/runtime/helpers/inherits")), l = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
      u = r(e("@babel/runtime/helpers/getPrototypeOf")), c = r(e("./../../component/Component.js"));
    r(e("./../../display/index.js"));

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
        var e, t = (0, u.default)(n);
        return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, l.default)(this, e)
      }
    }

    r = function (e) {
      (0, o.default)(n, e);
      var t = h(n);

      function n(e) {
        return (0, i.default)(this, n), t.call(this, e)
      }

      return (0, a.default)(n, [{
        key: "onInitialize", value: function () {
          (0, s.default)((0, u.default)(n.prototype), "onInitialize", this).call(this), this.textField = c2d.display.TextField.create(this.config.text, this.config.size, this.config.color), this.textField.x = this.config.position.x, this.textField.y = this.config.position.y, this.context.view.addChild(this.textField)
        }
      }, {
        key: "text", get: function () {
          return this.textField.text
        }, set: function (e) {
          this.textField.text = e
        }
      }]), n
    }(c.default);
    (n.default = r).ID = "Text"
  }, {
    "./../../component/Component.js": 43,
    "./../../display/index.js": 69,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/get": 9,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  55: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/inherits")),
      o = r(e("@babel/runtime/helpers/possibleConstructorReturn")), l = r(e("@babel/runtime/helpers/getPrototypeOf")),
      u = r(e("./../sprite/index.js")), c = r(e("./../../display/index.js"));

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
        return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, o.default)(this, e)
      }
    }

    r = function (e) {
      (0, s.default)(r, e);
      var n = h(r);

      function r(e) {
        var t;
        return (0, i.default)(this, r), (t = n.call(this, e, new c.default.Sprite))._video = null, t._fullscreen = !1, t._resizeToFullscreenHandler = function () {
          return t.resizeToFullscreen()
        }, t
      }

      return (0, a.default)(r, [{
        key: "fullscreen", set: function (e) {
          this._fullscreen && !e ? (c2d.eventManager.unsubscribe(c2d.documentEvents.SCREEN_WAS_RESIZED, this._resizeToFullscreenHandler), this.resizeToOrigin()) : !this._fullscreen && e && (this.resizeToFullscreen(), c2d.eventManager.subscribe(c2d.documentEvents.SCREEN_WAS_RESIZED, this._resizeToFullscreenHandler)), this._fullscreen = e
        }
      }, {
        key: "play", value: function (e) {
          var t = this, n = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
          e = "string" == typeof e ? this.respack.getAsset(e) : e, this.texture = e, this._video = e.baseTexture.source, this._video.currentTime = 0, this._video.loop = n, e.update(), this._fullscreen && this.resizeToFullscreen(), this._video.oncanplay = function () {
            t._video.oncanplay = null;
            var e = t._video.play();
            void 0 !== e && e.then(function (e) {
              console.log("Playback started!")
            }).catch(function (e) {
              console.log("Playback was prevented with error:" + e)
            })
          }
        }
      }, {
        key: "stop", value: function () {
          this._video && (this._video.oncanplay = null, this._video.currentTime = 0, this._video.pause())
        }
      }, {
        key: "pause", value: function () {
          this._video && this._video.pause()
        }
      }, {
        key: "resume", value: function () {
          this._video && this._video.play()
        }
      }, {
        key: "onComplete", set: function (e) {
          var t = this;
          this._video && (this._video.loop = !1, this._video.onended = function () {
            t._video.onended = null, "function" == typeof e ? e() : t.fillProperties(e)
          })
        }
      }, {
        key: "resizeToFullscreen", value: function () {
          var e, t, n;
          this._video && (t = (e = c2d.screenParams).screenWidth, n = e.screenHeight, c2d.engine.renderer3D && !c2d.engine.renderer3D.fullscreen && !c2d.env.device.desktop() && c2d.env.device.portrait() && (n = e.designHeight), this._content.position.x = -e.paddingLeft, this._content.width = this._video.videoWidth, this._content.height = this._video.videoHeight, this._content.scale = {
            x: t / this._video.videoWidth,
            y: n / this._video.videoHeight
          })
        }
      }, {
        key: "resizeToOrigin", value: function () {
          this._video && (this._content.scale = {
            x: 1,
            y: 1
          }, this._content.width = this._video.videoWidth, this._content.height = this._video.videoHeight)
        }
      }]), r
    }(u.default);
    (n.default = r).ID = "VideoSprite"
  }, {
    "./../../display/index.js": 69,
    "./../sprite/index.js": 53,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  56: [function (e, t, n) {
    arguments[4][47][0].apply(n, arguments)
  }, {
    "./../../component/Component.js": 43,
    "./../../component/metrix.js": 46,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/defineProperty": 8,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21,
    "@babel/runtime/helpers/toConsumableArray": 25,
    dup: 47
  }],
  57: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/get")),
      o = r(e("@babel/runtime/helpers/inherits")), l = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
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
      (0, o.default)(n, e);
      var t = c(n);

      function n() {
        var e;
        return (0, i.default)(this, n), (e = t.call(this))._model = null, e._view = null, e._eventRouter = null, e._components = {}, e
      }

      return (0, a.default)(n, [{
        key: "initialize", value: function () {
          var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null,
            t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
          this.model = e, this.view = t, (0, s.default)((0, u.default)(n.prototype), "initialize", this).call(this)
        }
      }, {
        key: "run", value: function () {
          (0, s.default)((0, u.default)(n.prototype), "run", this).call(this), this._view && this._view.show()
        }
      }, {
        key: "update", value: function (e) {
          (0, s.default)((0, u.default)(n.prototype), "update", this).call(this, e), this._ran && this._view && this._view.update(e)
        }
      }, {
        key: "stop", value: function () {
          (0, s.default)((0, u.default)(n.prototype), "stop", this).call(this), this._view && this._view.hide()
        }
      }, {
        key: "attachComponent", value: function (e) {
          var t = "_" + e.name;
          this[t] || (this[t] = e, Object.defineProperty(this, e.name, {
            get: function () {
              return e
            }
          }), this._components[e.name] = e, this.onComponentAttached(e))
        }
      }, {
        key: "detachComponent", value: function (e) {
          var t = "_" + e.name;
          this[t] && (this.onComponentDetached(e), delete this[t], delete this[e.name], delete this._components[e.name])
        }
      }, {
        key: "dispatch", value: function () {
          var e;
          if (this._ran && this._eventRouter) return (e = this._eventRouter).dispatch.apply(e, arguments);
          console.warn("Controller: Set events router before dispatch!")
        }
      }, {
        key: "subscribe", value: function () {
          var e;
          if (this._ran && this._eventRouter) return (e = this._eventRouter).subscribe.apply(e, arguments);
          console.warn("Controller: Set events router before subscribe!")
        }
      }, {
        key: "unsubscribe", value: function () {
          var e;
          if (this._ran && this._eventRouter) return (e = this._eventRouter).unsubscribe.apply(e, arguments);
          console.warn("Controller: Set events router before unsubscribe!")
        }
      }, {
        key: "once", value: function () {
          var e;
          if (this._ran && this._eventRouter) return (e = this._eventRouter).once.apply(e, arguments);
          console.warn("Controller: Set events router before once!")
        }
      }, {
        key: "model", get: function () {
          return this._model
        }, set: function (e) {
          this._model = e
        }
      }, {
        key: "view", get: function () {
          return this._view
        }, set: function (e) {
          this._view && (this._view.dispatcher = null, this._view = null), e && (this._view = e, this._view.dispatcher = this)
        }
      }, {
        key: "components", get: function () {
          return this._components
        }
      }, {
        key: "eventRouter", get: function () {
          return this._eventRouter
        }, set: function (e) {
          this._eventRouter = e
        }
      }, {
        key: "onInitialize", value: function () {
        }
      }, {
        key: "onRun", value: function () {
        }
      }, {
        key: "onStop", value: function () {
        }
      }, {
        key: "onComponentAttached", value: function (e) {
          e.listenerEventRouter = this._eventRouter
        }
      }, {
        key: "onComponentDetached", value: function (e) {
        }
      }]), n
    }(r(e("./Controller.js")).default);
    n.default = r
  }, {
    "./Controller.js": 58,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/get": 9,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  58: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("./IController.js"));
    n.default = function () {
      function e() {
        (0, i.default)(this, e), this.implement(s.default), this._ran = !1
      }

      return (0, a.default)(e, [{
        key: "initialize", value: function () {
          this.onInitialize()
        }
      }, {
        key: "run", value: function () {
          this._ran || (this._ran = !0, this.onRun())
        }
      }, {
        key: "update", value: function (e) {
        }
      }, {
        key: "stop", value: function () {
          this._ran && (this.onStop(), this._ran = !1)
        }
      }, {
        key: "onInitialize", value: function () {
        }
      }, {
        key: "onRun", value: function () {
        }
      }, {
        key: "onStop", value: function () {
        }
      }]), e
    }()
  }, {
    "./IController.js": 59,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  59: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/inherits")),
      o = r(e("@babel/runtime/helpers/possibleConstructorReturn")), l = r(e("@babel/runtime/helpers/getPrototypeOf"));

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
        return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, o.default)(this, e)
      }
    }

    r = function (e) {
      (0, s.default)(n, e);
      var t = u(n);

      function n() {
        return (0, i.default)(this, n), t.apply(this, arguments)
      }

      return (0, a.default)(n, [{
        key: "run", value: function () {
        }
      }, {
        key: "update", value: function (e) {
        }
      }, {
        key: "stop", value: function () {
        }
      }]), n
    }(r(e("./../utils/Interface.js")).default);
    n.default = r
  }, {
    "./../utils/Interface.js": 133,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  60: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass"));
    n.default = function () {
      function e() {
        (0, i.default)(this, e)
      }

      return (0, a.default)(e, [{
        key: "initWithModel", value: function (e) {
          for (var t in e) t in this && (this[t] = e[t])
        }
      }]), e
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  61: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/objectWithoutProperties"))),
      a = r(e("@babel/runtime/helpers/defineProperty")), s = r(e("@babel/runtime/helpers/classCallCheck")),
      o = r(e("@babel/runtime/helpers/createClass")), l = ["click"];

    function u(t, e) {
      var n, r = Object.keys(t);
      return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t), e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })), r.push.apply(r, n)), r
    }

    n.default = function () {
      function e() {
        (0, s.default)(this, e), this.build(), this.menu = null, this.items = []
      }

      return (0, o.default)(e, [{
        key: "build", value: function () {
          this.contextListener(), this.clickListener(), this.keyupListener(), this.resizeListener()
        }
      }, {
        key: "contextListener", value: function () {
          var t = this;
          document.addEventListener("contextmenu", function (e) {
            e.preventDefault(), t.toggleMenuOn(), t.positionMenu(e)
          })
        }
      }, {
        key: "clickListener", value: function () {
          var n = this;
          document.addEventListener("click", function (e) {
            var t = n.isClickedInsideElement(e, "context-menu__link");
            t ? (e.preventDefault(), n.menuItemListener(t)) : 1 === (e.which || e.button) && n.toggleMenuOff()
          })
        }
      }, {
        key: "keyupListener", value: function () {
          var t = this;
          window.onkeyup = function (e) {
            27 === e.keyCode && t.toggleMenuOff()
          }
        }
      }, {
        key: "resizeListener", value: function () {
          var t = this;
          window.onresize = function (e) {
            t.toggleMenuOff()
          }
        }
      }, {
        key: "toggleMenuOn", value: function () {
          this.menu && this.toggleMenuOff(), this.menu = document.createElement("div"), this.menu.id = "context-menu", this.menu.setAttribute("class", "context-menu"), this.menu.innerHTML = "\n    <style>\n      ".concat(".context-menu {\n  -display: none;\n  position: absolute;\n  z-index: 100000;\n  padding: 6px 0;\n  width: 240px;\n  background-color: #fff;\n  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);\n  border-radius: 4px;\n}\n\n.context-menu--active {\n  display: block;\n}\n\n.context-menu__items {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.context-menu__item {\n  font-family: OpenSans, Arial;\n  font-size: 16px;\n  -webkit-font-smoothing: antialiased;\n  display: block;\n  margin-bottom: 4px;\n}\n\n.context-menu__icon {\n  padding-right: 4px;\n  font-weight: bold;\n}\n\n.context-menu__item:last-child {\n  margin-bottom: 0;\n}\n\n.context-menu__link {\n  display: block;\n  padding: 4px 8px;\n  color: #0b2e46;\n  text-decoration: none;\n  border-radius: 2px;\n}\n\n.context-menu__link:hover {\n  color: #fff;\n  background-color: #0b2e46;\n}", '\n    </style>\n    <ul class="context-menu__items">\n      ').concat(this.menues.map(function (e) {
            return e.outerHTML
          }).join(""), "\n    </ul>\n    "), document.body.appendChild(this.menu)
        }
      }, {
        key: "menues", get: function () {
          return Object.values(this.items).map(function (e) {
            return e.view
          })
        }
      }, {
        key: "addLabel", value: function (e, t) {
          var n = document.createElement("li");
          n.setAttribute("class", "context-menu__item"), n.innerHTML = '<a href="#" class="context-menu__link" data-action="'.concat(e, '"><i class="context-menu__icon" id="icon"></i><span id="title">').concat(e, "</span></a>");
          this.items[e] = function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = null != arguments[e] ? arguments[e] : {};
              e % 2 ? u(Object(n), !0).forEach(function (e) {
                (0, a.default)(t, e, n[e])
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach(function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
              })
            }
            return t
          }({
            view: n, toggle: function () {
              var e = "" === n.querySelector("#icon").innerHTML;
              return n.querySelector("#icon").innerHTML = e ? "\t✓ " : "", e
            }, setTitle: function (e) {
              n.querySelector("#title").innerHTML = e
            }, title: e
          }, t)
        }
      }, {
        key: "toggleMenuOff", value: function () {
          this.menu && (document.body.removeChild(this.menu), this.menu = null)
        }
      }, {
        key: "mobilePositionMenu", value: function (e) {
          var e = this.getPosition(e.touches[0]), t = this.menu.offsetWidth + 4, n = this.menu.offsetHeight + 4,
            r = window.innerWidth, i = window.innerHeight;
          r - e.x < t ? this.menu.style.left = r - t + "px" : this.menu.style.left = e.x + "px", i - e.y < n ? this.menu.style.top = i - n + "px" : this.menu.style.top = e.y + "px"
        }
      }, {
        key: "positionMenu", value: function (e) {
          var e = this.getPosition(e), t = this.menu.offsetWidth + 4, n = this.menu.offsetHeight + 4,
            r = window.innerWidth, i = window.innerHeight;
          r - e.x < t ? this.menu.style.left = r - t + "px" : this.menu.style.left = e.x + "px", i - e.y < n ? this.menu.style.top = i - n + "px" : this.menu.style.top = e.y + "px"
        }
      }, {
        key: "getPosition", value: function (e) {
          var t = 0, n = 0;
          return e || window.event, e.pageX || e.pageY ? (t = e.pageX, n = e.pageY) : (e.clientX || e.clientY) && (t = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, n = e.clientY + document.body.scrollTop + document.documentElement.scrollTop), {
            x: t,
            y: n
          }
        }
      }, {
        key: "isClickedInsideElement", value: function (e, t) {
          var n = e.srcElement || e.target;
          if (n.classList.contains(t)) return n;
          for (; n = n.parentNode;) if (n.classList && n.classList.contains(t)) return n;
          return !1
        }
      }, {
        key: "menuItemListener", value: function (e) {
          var e = e.getAttribute("data-action"), t = this.items[e], t = (t.click, (0, i.default)(t, l));
          this.items[e].click(t), this.toggleMenuOff()
        }
      }]), e
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/defineProperty": 8,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/objectWithoutProperties": 19
  }],
  62: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("./SnackBar.js")), o = r(e("./ContextMenu.js")),
      l = r(e("./PerformanceMonitor.js")), u = r(e("./measure/Measure.js")), r = function () {
        function t(e) {
          (0, i.default)(this, t), this.engine = e, this.snackBar = new s.default, this.onCreate(), this.onResizeScreen()
        }

        return (0, a.default)(t, [{
          key: "onCreate", value: function () {
            this.createTimeScale(), this.createContextMenu(), this.createPerformanceMonitor()
          }
        }, {
          key: "createTimeScale", value: function () {
            function n(e) {
              c2d.timescale = Number(e), t.snackBar.show({title: "Time Scale: ".concat(c2d.timescale)})
            }

            var t = this;
            document.addEventListener("wheel", function (e) {
              e.altKey && (e.deltaY < 0 && c2d.timescale < 10 ? n((c2d.timescale + Number((1 <= c2d.timescale ? 1 : .1).toFixed(1))).toFixed(1)) : 0 < e.deltaY && .1 < c2d.timescale && n((c2d.timescale - Number((1 < c2d.timescale ? 1 : .1).toFixed(1))).toFixed(1)))
            }), document.addEventListener("keydown", function (e) {
              var t;
              e.altKey && (t = +e.key, "ArrowUp" === e.key && c2d.timescale < 10 ? n((c2d.timescale + Number((1 <= c2d.timescale ? 1 : .1).toFixed(1))).toFixed(1)) : "ArrowDown" === e.key && .1 < c2d.timescale ? n((c2d.timescale - Number((1 < c2d.timescale ? 1 : .1).toFixed(1))).toFixed(1)) : 0 < t && t < 11 && n(t))
            })
          }
        }, {
          key: "createContextMenu", value: function () {
            var e = this;
            this.contextMenu = new o.default, this.contextMenu.addLabel("New User", {
              click: function () {
                return e.newUser()
              }
            }), this.contextMenu.addLabel("Emulation Tool", {
              click: function () {
                return game.api.showShifter()
              }
            }), this.contextMenu.addLabel("Performance Monitor", {
              click: function () {
                return e.showPerformanceMonitor.apply(e, arguments)
              }
            }), this.contextMenu.addLabel("Measure System", {
              click: function () {
                return e.showMeasure.apply(e, arguments)
              }
            })
          }
        }, {
          key: "createMeasure", value: function () {
            this.measureSystem = new u.default, c2d.engine._gameViewport.addChild(this.measureSystem), c2d.engine._gameViewport.interactive = !1
          }
        }, {
          key: "destroyMeasure", value: function () {
            this.measureSystem.destroy(), c2d.engine._gameViewport.interactive = !0
          }
        }, {
          key: "createPerformanceMonitor", value: function () {
            this.performanceMonitor = new l.default(this.engine), this.performanceMonitor.visible = !1
          }
        }, {
          key: "createSpector", value: function () {
            this.spector = new Spector
          }
        }, {
          key: "newUser", value: function () {
            c2d.env.storage.erase(), window.location.reload()
          }
        }, {
          key: "showMeasure", value: function (e) {
            (0, e.toggle)() ? this.createMeasure() : this.destroyMeasure()
          }
        }, {
          key: "showPerformanceMonitor", value: function (e) {
            (0, e.toggle)(), this.performanceMonitor.visible = !this.performanceMonitor.visible
          }
        }, {
          key: "onResizeScreen", value: function () {
            var n = this;
            c2d.eventManager.subscribe(c2d.documentEvents.SCREEN_WAS_RESIZED, function (e) {
              var t = c2d.env.device.tablet() ? 2 : 1;
              n.snackBar.show({
                title: "\n      Canvas size: ".concat(e.data.screenWidth * t, " * ").concat(e.data.screenHeight * t, "\n      "),
                time: 5e3
              })
            })
          }
        }]), t
      }();
    n.default = r
  }, {
    "./ContextMenu.js": 61,
    "./PerformanceMonitor.js": 63,
    "./SnackBar.js": 64,
    "./measure/Measure.js": 65,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  63: [function (e, t, n) {
    "use strict";

    function c() {
      var n = 0, r = document.createElement("div");

      function e(e) {
        return r.appendChild(e.dom), e
      }

      function t(e) {
        for (var t = 0; t < r.children.length; t++) r.children[t].style.display = t === e ? "block" : "none";
        n = e
      }

      r.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000", r.id = "PerformanceMonitor", r.addEventListener("click", function (e) {
        e.preventDefault(), t(++n % r.children.length)
      }, !1);
      var i, a = (performance || Date).now(), s = a, o = 0, l = e(new c.Panel("FPS", "#0ff", "#002")),
        u = e(new c.Panel("MS", "#0f0", "#020"));
      return self.performance && self.performance.memory && (i = e(new c.Panel("MB", "#f08", "#201"))), t(0), {
        REVISION: 16,
        dom: r,
        addPanel: e,
        showPanel: t,
        begin: function () {
          a = (performance || Date).now()
        },
        end: function () {
          o++;
          var e, t = (performance || Date).now();
          return u.update(t - a, 200), s + 1e3 <= t && (l.update(1e3 * o / (t - s), 100), s = t, o = 0, i && (e = performance.memory, i.update(e.usedJSHeapSize / 1048576, e.jsHeapSizeLimit / 1048576))), t
        },
        update: function () {
          a = this.end()
        },
        domElement: r,
        setMode: t
      }
    }

    var r, i, s, o, a = e("@babel/runtime/helpers/interopRequireDefault"),
      l = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, a(e("@babel/runtime/helpers/classCallCheck"))),
      u = a(e("@babel/runtime/helpers/createClass")), a = ((window.Stats = c).Panel = function (n, r, i) {
        var a = 1 / 0, s = 0, o = Math.round, l = o(window.devicePixelRatio || 1), u = 80 * l, e = 48 * l, c = 3 * l,
          h = 2 * l, d = 3 * l, f = 15 * l, p = 74 * l, m = 30 * l, v = document.createElement("canvas"),
          b = (v.width = u, v.height = e, v.style.cssText = "width:80px;height:48px", v.getContext("2d"));
        return b.font = "bold " + 9 * l + "px Helvetica,Arial,sans-serif", b.textBaseline = "top", b.fillStyle = i, b.fillRect(0, 0, u, e), b.fillStyle = r, b.fillText(n, c, h), b.fillRect(d, f, p, m), b.fillStyle = i, b.globalAlpha = .9, b.fillRect(d, f, p, m), {
          dom: v,
          update: function (e, t) {
            a = Math.min(a, e), s = Math.max(s, e), b.fillStyle = i, b.globalAlpha = 1, b.fillRect(0, 0, u, f), b.fillStyle = r, b.fillText(o(e) + " " + n + " (" + o(a) + "-" + o(s) + ")", c, h), b.drawImage(v, d + l, f, p - l, m, d, f, p - l, m), b.fillRect(d + p - l, f, l, m), b.fillStyle = i, b.globalAlpha = .9, b.fillRect(d + p - l, f, l, o((1 - e / t) * m))
          }
        }
      }, !function (t) {
        function e() {
          this._drawCalls = -1, this._maxDeltaDrawCalls = -1
        }

        e.prototype.attach = function (e) {
          this.glhook = new t.GLHook(e), this.texturehook = new t.TextureHook(e)
        }, Object.defineProperty(e.prototype, "drawCalls", {
          get: function () {
            return this.glhook && this.glhook.isInit ? this.glhook.drawPasses : -1
          }, enumerable: !0, configurable: !0
        }), Object.defineProperty(e.prototype, "maxDeltaDrawCalls", {
          get: function () {
            return this._maxDeltaDrawCalls
          }, enumerable: !0, configurable: !0
        }), Object.defineProperty(e.prototype, "deltaDrawCalls", {
          get: function () {
            if (-1 == this._drawCalls) return this._drawCalls = this.drawCalls, 0;
            var e = this.drawCalls, t = e - this._drawCalls;
            return this._drawCalls = e, this._maxDeltaDrawCalls = Math.max(this._maxDeltaDrawCalls, t), t
          }, enumerable: !0, configurable: !0
        }), Object.defineProperty(e.prototype, "maxTextureCount", {
          get: function () {
            return this.texturehook && this.texturehook.isInit ? this.texturehook.maxTexturesCount : 0
          }, enumerable: !0, configurable: !0
        }), Object.defineProperty(e.prototype, "texturesCount", {
          get: function () {
            return this.texturehook && this.texturehook.isInit ? this.texturehook.currentTextureCount : 0
          }, enumerable: !0, configurable: !0
        }), e.prototype.reset = function () {
          this._maxDeltaDrawCalls = -1, this._drawCalls = -1, this.glhook && this.glhook.reset(), this.texturehook && this.texturehook.reset()
        }, e.prototype.release = function () {
          this.glhook && this.glhook.release(), this.texturehook && this.texturehook.release()
        }, t.BaseHooks = e
      }(o = o || {}), !function (e) {
        function t(e) {
          this.drawPasses = 0, this.isInit = !1, this.realGLDrawElements = function () {
          }, e ? e.__proto__.drawElements && (this.gl = e, this.realGLDrawElements = e.__proto__.drawElements, e.__proto__.drawElements = this.fakeGLdrawElements.bind(this), this.isInit = !0, console.log("[GLHook] GL was Hooked!")) : console.error("[GLHook] GL can't be NULL")
        }

        t.prototype.fakeGLdrawElements = function (e, t, n, r) {
          this.drawPasses++, this.realGLDrawElements.call(this.gl, e, t, n, r)
        }, t.prototype.reset = function () {
          this.drawPasses = 0
        }, t.prototype.release = function () {
          this.isInit && (this.gl.__proto__.drawElements = this.realGLDrawElements, console.log("[GLHook] Hook was removed!")), this.isInit = !1
        }, e.GLHook = t
      }(o = o || {}), r = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
        e.__proto__ = t
      } || function (e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
      }, function (e, t) {
        function n() {
          this.constructor = e
        }

        r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
      });

    function h(e) {
      var t = i.call(this) || this;
      if (!e) return console.error("[Phaser Hooks]Phaser Game can't passed or NULL"), t;
      var n = window;
      return n.Phaser ? n.Phaser.VERSION.startsWith("3") ? e.renderer.gl && e.renderer.gl instanceof WebGLRenderingContext ? t.attach(e.renderer.gl) : console.error("[Phaser 3 Hooks]Canvas renderer is not allowed") : e.renderer instanceof PIXI.Renderer ? t.attach(e.renderer.gl) : console.error("[Phaser 2 Hooks]Canvas renderer is not allowed") : console.error("[Phaser Hooks] THIS HOOK ONLY FOR PHASER 2CE or PHASER 3!!!!"), t
    }

    function d(e) {
      var t = s.call(this) || this;
      if (!e) return console.error("PIXI Application can't passed or NULL"), t;
      if (e.renderer instanceof PIXI.Renderer) {
        t.attach(e.renderer.gl);
        var n = e.renderer.texture._managedTextures;
        if (n && t.texturehook) {
          console.log("[PIXI Hooks] Collect used textures:", n.length);
          for (var r = 0; r < n.length; ++r) for (var i = n[r]._glTextures, a = 0; a < i.length; ++a) i[a].gl === e.renderer.gl && t.texturehook.registerTexture(i[a].texture)
        }
      } else console.error("[PIXI Hook]Canvas renderer is not allowed");
      return t
    }

    e = o = o || {}, i = e.BaseHooks, a(h, i), e.PhaserHooks = h, e = o = o || {}, s = e.BaseHooks, a(d, s), e.PIXIHooks = d, function (e) {
      function t(e, t) {
        this.hook = e, t ? this.stats = t : (this.stats = null, window.Stats && (this.stats = new window.Stats)), this.stats ? (this.dcPanel = this.stats.addPanel(new window.Stats.Panel("DC:", "#330570", "#A69700")), this.tcPanel = this.stats.addPanel(new window.Stats.Panel("TC:", "#A62500", "#00B454")), this.stats.showPanel(0)) : console.error("Stats can't found in window, pass instance of Stats.js as second param")
      }

      t.prototype.update = function () {
        this.stats && (this.hook && (this.dcPanel.update(this.hook.deltaDrawCalls, Math.max(50, this.hook.maxDeltaDrawCalls)), this.tcPanel.update(this.hook.texturesCount, Math.max(20, this.hook.maxTextureCount))), this.stats.update())
      }, t.prototype.reset = function () {
        this.hook && this.hook.reset()
      }, e.StatsJSAdapter = t
    }(o = o || {}), function (e) {
      function t(e) {
        this.createdTextures = new Array, this.maxTexturesCount = 0, this.isInit = !1, this.realGLCreateTexture = function () {
        }, this.realGLDeleteTexture = function () {
        }, e ? e.__proto__.createTexture && (this.gl = e, this.realGLCreateTexture = e.__proto__.createTexture, this.realGLDeleteTexture = e.__proto__.deleteTexture, e.__proto__.createTexture = this.fakeGLCreateTexture.bind(this), e.__proto__.deleteTexture = this.fakeGLDeleteTexture.bind(this), this.isInit = !0, console.log("[TextureHook] GL was Hooked!")) : console.error("[TextureHook] GL can't be NULL")
      }

      Object.defineProperty(t.prototype, "currentTextureCount", {
        get: function () {
          return this.createdTextures.length
        }, enumerable: !0, configurable: !0
      }), t.prototype.registerTexture = function (e) {
        this.createdTextures.push(e), this.maxTexturesCount = Math.max(this.createdTextures.length, this.maxTexturesCount)
      }, t.prototype.fakeGLCreateTexture = function () {
        var e = this.realGLCreateTexture.call(this.gl);
        return this.registerTexture(e), e
      }, t.prototype.fakeGLDeleteTexture = function (e) {
        var t = this.createdTextures.indexOf(e);
        -1 < t && this.createdTextures.splice(t, 1), this.realGLDeleteTexture.call(this.gl, e)
      }, t.prototype.reset = function () {
        this.createdTextures = new Array, this.maxTexturesCount = 0
      }, t.prototype.release = function () {
        this.isInit && (this.gl.__proto__.createTexture = this.realGLCreateTexture, this.gl.__proto__.deleteTexture = this.realGLDeleteTexture, console.log("[TextureHook] Hook was removed!")), this.isInit = !1
      }, e.TextureHook = t
    }(o = o || {});
    a = function () {
      function s(e) {
        (0, l.default)(this, s);
        var t, n, r, i = new o.PIXIHooks({renderer: e._renderer}), a = new o.StatsJSAdapter(i);
        this.stats = a.stats, this.stats.showPanel(0), c2d.engine.renderer3D ? (t = this.stats.addPanel(new c.Panel("", "#ff8", "#221")), n = 0, r = e.renderer3D._renderer3D.info.render, PIXI.Ticker.shared.add(function () {
          n = Math.max(r.triangles, n), t.update(r.triangles, n), a.update()
        })) : PIXI.Ticker.shared.add(function () {
          a.update()
        }), document.body.appendChild(this.stats.dom)
      }

      return (0, u.default)(s, [{
        key: "visible", get: function () {
          return "hidden" !== document.querySelector("#PerformanceMonitor").style.visibility
        }, set: function (e) {
          document.querySelector("#PerformanceMonitor").style.visibility = e ? "visible" : "hidden"
        }
      }]), s
    }();
    n.default = a
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  64: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass"));
    n.default = function () {
      function e() {
        (0, i.default)(this, e), this.timeoutId = null
      }

      return (0, a.default)(e, [{
        key: "show", value: function (e) {
          var t = e.time, t = void 0 === t ? 2e3 : t, e = e.title,
            n = (clearTimeout(this.timeoutId), document.querySelector("#snackbar") || document.createElement("div"));
          n.innerHTML = "\n    <style>\n      ".concat(this._getStyle({time: t}), "\n    </style>\n      ").concat(e, "\n    "), n.id = "snackbar", n.className = "show", document.body.appendChild(n), this.timeoutId = setTimeout(function () {
            n.className = n.className.replace("show", "")
          }, t)
        }
      }, {
        key: "_getStyle", value: function (e) {
          e = e.time;
          return "#snackbar {\n      visibility: hidden;\n      min-width: 250px;\n      margin-left: -125px;\n      background-color: #333;\n      color: #fff;\n      text-align: center;\n      border-radius: 2px;\n      padding: 16px;\n      position: absolute;\n      left: 50%;\n      z-index: 10;\n      z-index: 1;\n      left: 50%;\n      bottom: 50%;\n      font-size: 17px;\n      font-family: OpenSans, Arial;\n      pointer-events: none;\n      opacity: 1\n    }\n    \n    #snackbar.show {\n      visibility: visible;\n      -webkit-animation: fadein 0.5s, fadeout 0.5s ".concat(e / 1e3, "s;\n      animation: fadein 0.5s, fadeout 0.5s ").concat(e / 1e3, "s;\n    }\n    \n    @-webkit-keyframes fadein {\n      from {opacity: 1;} \n      to {opacity: 1;}\n    }\n    \n    @keyframes fadein {\n      from {opacity: 0;}\n      to {opacity: 1;}\n    }\n    \n    @-webkit-keyframes fadeout {\n      from {opacity: 1;} \n      to {opacity: 0;}\n    }\n    \n    @keyframes fadeout {\n      from {opacity: 1;}\n      to {opacity: 0;}\n    }")
        }
      }]), e
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  65: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/assertThisInitialized")),
      o = r(e("@babel/runtime/helpers/inherits")), l = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
      u = r(e("@babel/runtime/helpers/getPrototypeOf")), c = r(e("./MeasureBox.js")), h = r(e("./MeasureMarker.js"));

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
        var e, t = (0, u.default)(n);
        return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, l.default)(this, e)
      }
    }

    r = function (e) {
      (0, o.default)(n, e);
      var t = d(n);

      function n() {
        var e;
        return (0, i.default)(this, n), (e = t.apply(this, arguments)).coords = c2d.engine._renderer.plugins.interaction.mouse.global, e.bounds = c2d.designSize, e.displayGroup = game.displayGroups.DEBUG, e.interactive = !0, e.onMouseDown = e.onMouseDown.bind((0, s.default)(e)), e.onMouseUp = e.onMouseUp.bind((0, s.default)(e)), e.addRulers(), e.addPositionMarker(), e.addMeasureBox(), e.addEventListeners(), e
      }

      return (0, a.default)(n, [{
        key: "addRulers", value: function () {
          var e, t, n, r = new c2d.display.Container, i = new c2d.display.Container, a = new c2d.display.Graphics,
            s = 100;
          for (a.lineStyle(1, 0), a.beginFill(13421772, 1), a.drawRect(0, 0, this.bounds.width - 1, 25), e = this.bounds.width / 5, n = 1; n < e; n++) a.moveTo(5 * n, 0), a.lineTo(5 * n, 5);
          for (e = this.bounds.width / s, n = 1; n < e; n++) a.moveTo(n * s, 0), a.lineTo(n * s, 10), (t = new c2d.display.TextField(n * s, {fontSize: 10})).anchor.set(.5, 0), t.x = n * s, t.y = 12, r.addChild(t);
          for (a.endFill(), r.addChildAt(new c2d.display.Sprite(a.generateCanvasTexture()), 0), this.addChild(r), a.clear(), a.lineStyle(1, 0), a.beginFill(13421772, 1), a.drawRect(0, 0, 25, this.bounds.height), e = this.bounds.height / 5, n = 1; n < e; n++) a.moveTo(0, 5 * n), a.lineTo(5, 5 * n);
          for (e = this.bounds.height / s, n = 1; n < e; n++) a.moveTo(0, n * s), a.lineTo(10, n * s), (t = new c2d.display.TextField(n * s, {fontSize: 10})).anchor.set(.5, 0), t.x = 12, t.y = n * s, t.rotation = -Math.PI / 2, i.addChild(t);
          a.endFill(), i.addChildAt(new c2d.display.Sprite(a.generateCanvasTexture()), 0), this.addChild(i)
        }
      }, {
        key: "addPositionMarker", value: function () {
          this.positionMarker = new h.default(this, this.bounds, this.coords), this.positionMarker.updatePosition()
        }
      }, {
        key: "addMeasureBox", value: function () {
          this.measureBox = new c.default(this, this.bounds, this.coords), this.measureBox.update()
        }
      }, {
        key: "onMouseDown", value: function () {
          this.measureBox.clear(), this.measureBox.startDraw()
        }
      }, {
        key: "onMouseUp", value: function () {
          this.measureBox.stopDraw()
        }
      }, {
        key: "addEventListeners", value: function () {
          document.addEventListener("mousedown", this.onMouseDown), document.addEventListener("mouseup", this.onMouseUp)
        }
      }, {
        key: "mousemove", value: function () {
          this.update()
        }
      }, {
        key: "update", value: function () {
          this.positionMarker.updatePosition(), this.measureBox.update()
        }
      }, {
        key: "destroy", value: function () {
          this.removeFromParent(), this.measureBox.clear(), document.removeEventListener("mousedown", this.onMouseDown), document.removeEventListener("mouseup", this.onMouseUp)
        }
      }]), n
    }(PIXI.Container);
    n.default = r
  }, {
    "./MeasureBox.js": 66,
    "./MeasureMarker.js": 67,
    "@babel/runtime/helpers/assertThisInitialized": 4,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  66: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass"));
    n.default = function () {
      function r(e, t, n) {
        (0, i.default)(this, r), this.bounds = t, this.coords = n, this.container = new c2d.display.Container, this.gfx = new c2d.display.Graphics, this.startLabel = new c2d.display.TextField("", {
          fontSize: 16,
          stroke: "#ffffff",
          strokeThickness: 5
        }), this.widthLabel = new c2d.display.TextField("", {
          fontSize: 16,
          stroke: "#ffffff",
          strokeThickness: 5
        }), this.heightLabel = new c2d.display.TextField("", {
          fontSize: 16,
          stroke: "#ffffff",
          strokeThickness: 5
        }), this.widthLabel.anchor.set(.5, 0), this.heightLabel.anchor.set(0, .5), this.container.addChild(this.gfx), this.container.addChild(this.startLabel), this.container.addChild(this.widthLabel), this.container.addChild(this.heightLabel), e.addChildAt(this.container, 2)
      }

      return (0, a.default)(r, [{
        key: "startDraw", value: function () {
          this.draw = !0, this.container.visible = !0, this.startPoint = {x: this.coords.x, y: this.coords.y}
        }
      }, {
        key: "stopDraw", value: function () {
          this.draw = !1
        }
      }, {
        key: "clear", value: function () {
          this.container.visible = !1, this.gfx.clear(), this.startLabel.text = "", this.widthLabel.text = "", this.heightLabel.text = ""
        }
      }, {
        key: "update", value: function () {
          var e, t, n, r, i;
          this.draw && (e = this.gfx, n = this.startPoint, e.clear(), e.lineStyle(1, 255, .6), e.beginFill(255, .6), r = Math.round(Math.min(n.x, this.coords.x)), i = Math.round(Math.min(n.y, this.coords.y)), t = Math.round(Math.abs(n.x - this.coords.x)), n = Math.round(Math.abs(n.y - this.coords.y)), e.drawRect(r, i, t, n), e.endFill(), this.startLabel.x = r, this.startLabel.y = i, this.startLabel.text = r + ", " + i, this.widthLabel.y = i + n, this.widthLabel.x = r + t / 2, this.widthLabel.text = t, this.heightLabel.y = i + n / 2, this.heightLabel.x = r + t, this.heightLabel.text = n)
        }
      }]), r
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  67: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      a = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      s = r(e("@babel/runtime/helpers/createClass"));
    n.default = function () {
      function i(e, t, n) {
        (0, a.default)(this, i);
        var r = new c2d.display.Graphics;
        r.lineStyle(1, 6710886), r.beginFill(12303291, .8), r.drawRect(0, 0, 120, 50), r.endFill(), this.stats = new c2d.display.Container, this.text = new c2d.display.TextField("0, 0", {fontSize: 18}), this.bounds = t, this.coords = n, (t = new c2d.display.Graphics).lineStyle(1, 0), t.beginFill(), t.moveTo(0, 0), t.lineTo(0, this.bounds.height), t.endFill(), this.lineX = new c2d.display.Sprite(t.generateCanvasTexture()), this.lineX.x = 0, this.lineX.y = 0, this.lineX.anchor.set(0), t.clear(), t.lineStyle(1, 0), t.beginFill(), t.moveTo(0, 0), t.lineTo(this.bounds.width, 0), t.endFill(), this.lineY = new c2d.display.Sprite(t.generateCanvasTexture()), this.lineY.x = 0, this.lineY.y = 0, this.lineY.anchor.set(0), this.stats.addChild(new c2d.display.Sprite(r.generateCanvasTexture())), this.stats.addChild(this.text), e.addChild(this.stats), e.addChild(this.lineX), e.addChild(this.lineY), this.text.x = 60, this.text.y = 25, this.text.anchor.set(.5)
      }

      return (0, s.default)(i, [{
        key: "updatePosition", value: function () {
          var e = this.coords.x < this.bounds.width / 2 ? 0 : 1, t = this.coords.y < this.bounds.height / 2 ? 0 : 1;
          this.lineX.x = this.stats.x = 0 < this.coords.x ? this.coords.x < this.bounds.width ? this.coords.x : this.bounds.width : 0, this.lineY.y = this.stats.y = 0 < this.coords.y ? this.coords.y < this.bounds.height ? this.coords.y : this.bounds.height : 0, this.text.text = Math.round(this.stats.x) + ", " + Math.round(this.stats.y), this.stats.pivot.x = e * this.stats.width, this.stats.pivot.y = t * this.stats.height
        }
      }]), i
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  68: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/inherits")),
      o = r(e("@babel/runtime/helpers/possibleConstructorReturn")), l = r(e("@babel/runtime/helpers/getPrototypeOf"));

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
        return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, o.default)(this, e)
      }
    }

    r = function (e) {
      (0, s.default)(r, e);
      var n = u(r);

      function r(e) {
        var t;
        return (0, i.default)(this, r), (t = n.call(this)).animation = null, t.zOrder = 0, e && t.setAnimation(e), t
      }

      return (0, a.default)(r, [{
        key: "setAnimation", value: function (e) {
          var t, n = this;
          if (!e) throw new Error("animation is " + e);
          this.supportCacheAnimation(e) ? this.animation.onComplete = null : this.clear(), "frame" === e.type ? (this.animation = c2d.display.AnimatedSprite.createFrom(e), this.animation.play()) : (this.animation || (this.animation = new c2d.display.Spine(e.spine)), this.animation.skeleton.setToSetupPose(), e.skin && (this.animation.skin = e.skin), this.animation.play(e.animation, e.loop, !0), this.animation.speed = e.speed, e.startFromRandomFrame && (this.animation.currentTime = Math.random() * this.animation.totalTime)), e.blendMode && (this.animation.blendMode = c2d.display.blendMode[e.blendMode]), e.mask && ((t = new PIXI.Graphics).beginFill(0).drawRect(e.mask.x, e.mask.y, e.mask.width, e.mask.height).endFill(), this.animation.addChild(t), this.animation.mask = t), this.zOrder = e.zOrder || 0, this.displayGroup = e.displayGroup ? game.displayGroups[e.displayGroup] : null, this.animation.parent || this.addChild(this.animation), e.scale && setTimeout(function () {
            n.scaleX = e.scale, n.scaleY = e.scale
          }, 0)
        }
      }, {
        key: "supportCacheAnimation", value: function (e) {
          return "frame" !== e.type && e.spine && this.animation && !this.animation.mask && this.animation.spineData && this.animation.spineData.hash === e.spine.hash
        }
      }, {
        key: "totalTime", get: function () {
          return this.animation.totalTime
        }
      }, {
        key: "currentTime", get: function () {
          return this.animation.currentTime
        }, set: function (e) {
          this.animation.currentTime = e
        }
      }, {
        key: "loop", get: function () {
          return this.animation.loop
        }, set: function (e) {
          this.animation.loop = e
        }
      }, {
        key: "onComplete", set: function (e) {
          this.animation.onComplete = e
        }
      }, {
        key: "onEvent", set: function (e) {
          this.animation.onEvent = e
        }
      }, {
        key: "scaleX", get: function () {
          return this.animation.scale.x
        }, set: function (e) {
          this.animation.scale.x = e
        }
      }, {
        key: "scaleY", get: function () {
          return this.animation.scale.y
        }, set: function (e) {
          this.animation.scale.y = e
        }
      }, {
        key: "stop", value: function () {
          this.animation.stop()
        }
      }, {
        key: "clear", value: function () {
          this.animation && this.animation.parent && (this.animation.mask = null, this.animation.removeFromParent(), this.animation.onComplete = null), this.animation = null
        }
      }]), r
    }(PIXI.Container);
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  69: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("./view/View.js"))),
      a = r(e("./view/TextField.js")), s = r(e("./animation/Animation.js")), o = r(e("./sprite/AnimatedSprite.js")),
      l = r(e("./sprite/NineSliceSprite.js")), u = r(e("./sprite/OrthoSprite.js")), c = r(e("./sprite/gltf/index.js")),
      h = r(e("./spine/Spine.js")), d = r(e("./spine/SpineButton.js")), f = r(e("./spine/SpineToggleButton.js")),
      p = r(e("./label/LabelSprite.js")), m = r(e("./particles/Emitter.js")), r = r(e("./scene3D/Scene3DRenderer.js")),
      v = {};
    PIXI.utils.skipHello(), PIXI.utils.getResolutionOfUrl = function () {
      return 1
    }, v.createRenderer = PIXI.autoDetectRenderer, v.about = {
      NAME: "pixi.js",
      VERSION: PIXI.VERSION,
      RENDERER_TYPE: PIXI.RENDERER_TYPE
    }, v.View = i.default, v.TextField = a.default, v.Animation = s.default, v.AnimatedSprite = o.default, v.NineSliceSprite = l.default, v.OrthoSprite = u.default, v.SkinnedMesh = c.default, v.Spine = h.default, v.SpineButton = d.default, v.SpineToggleButton = f.default, v.LabelSprite = p.default, v.Emitter = m.default, v.Scene3DRenderer = r.default, v.Container = PIXI.Container, v.Sprite = PIXI.Sprite, v.Graphics = PIXI.Graphics, v.Texture = PIXI.Texture, v.BaseTexture = PIXI.BaseTexture, Object.defineProperty(PIXI.Container.prototype, "displayGroup", {
      set: function (e) {
        null == (this.parentGroup = e) && (this._activeParentLayer = null)
      }, get: function () {
        return this.parentGroup
      }, enumerable: !1, configurable: !1
    }), v.groups = {}, v.groups.create = function (e, t) {
      return v.groups[e] = new PIXI.display.Group(t, !0), v.groups[e]
    }, v.filters = {
      DropShadowFilter: PIXI.filters.DropShadowFilter,
      BlurFilter: PIXI.filters.BlurFilter
    }, v.blendMode = {NORMAL: PIXI.BLEND_MODES.NORMAL, ADD: PIXI.BLEND_MODES.ADD}, n.default = v
  }, {
    "./animation/Animation.js": 68,
    "./label/LabelSprite.js": 70,
    "./particles/Emitter.js": 71,
    "./scene3D/Scene3DRenderer.js": 72,
    "./spine/Spine.js": 74,
    "./spine/SpineButton.js": 75,
    "./spine/SpineToggleButton.js": 76,
    "./sprite/AnimatedSprite.js": 77,
    "./sprite/NineSliceSprite.js": 78,
    "./sprite/OrthoSprite.js": 79,
    "./sprite/gltf/index.js": 89,
    "./view/TextField.js": 90,
    "./view/View.js": 91,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  70: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      o = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      i = r(e("@babel/runtime/helpers/createClass")), l = r(e("@babel/runtime/helpers/inherits")),
      a = r(e("@babel/runtime/helpers/possibleConstructorReturn")), s = r(e("@babel/runtime/helpers/getPrototypeOf"));

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
      var i, a = !0, s = !1;
      return {
        s: function () {
          r = r.call(e)
        }, n: function () {
          var e = r.next();
          return a = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            a || null == r.return || r.return()
          } finally {
            if (s) throw i
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
        var e, t = (0, s.default)(n);
        return e = r ? (e = (0, s.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, a.default)(this, e)
      }
    }

    r = function (e) {
      (0, l.default)(s, e);
      var a = h(s);

      function s(e, t) {
        var n, r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
          i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {x: .5, y: .5};
        return (0, o.default)(this, s), (n = a.call(this))._assetsPack = e, n._prefix = t, n._text = "", n._contentSize = {
          width: 0,
          height: 0
        }, n._padding = r, n._blendMode = PIXI.BLEND_MODES.NORMAL, n.anchor = i, n._charMapping = {
          ".": "dot",
          " ": "space"
        }, n
      }

      return (0, i.default)(s, [{
        key: "text", get: function () {
          return this._text
        }, set: function (e) {
          this.removeChildren(), "string" != typeof e && (e = e.toString()), this._text = e, this._contentSize = {
            width: 0,
            height: 0
          };
          var t, n = 0, r = u(e);
          try {
            for (r.s(); !(t = r.n()).done;) {
              var i = t.value, a = new PIXI.Sprite, s = this._charMapping[i];
              s && (i = s), a.blendMode = this._blendMode, a.texture = this._assetsPack.getAsset(this._prefix + i), a.x = n, a.y = -a.height * this.anchor.y, this.addChild(a), n += a.width + this._padding, this._contentSize.height = (this._contentSize.height > a.height ? this._contentSize : a).height
            }
          } catch (e) {
            r.e(e)
          } finally {
            r.f()
          }
          0 < e.length && (n -= this._padding), this._contentSize.width = n;
          var o, l = u(this.children);
          try {
            for (l.s(); !(o = l.n()).done;) o.value.x -= n * this.anchor.x
          } catch (e) {
            l.e(e)
          } finally {
            l.f()
          }
        }
      }, {
        key: "toMaxWidth", value: function (e) {
          e /= this._contentSize.width;
          1 < e || (this.scale.x = e, this.scale.y = e)
        }
      }, {
        key: "contentSize", get: function () {
          return this._contentSize
        }
      }, {
        key: "blendMode", get: function () {
          return this._blendMode
        }, set: function (e) {
          this._blendMode = e;
          var t, n = u(this.children);
          try {
            for (n.s(); !(t = n.n()).done;) t.value.blendMode = e
          } catch (e) {
            n.e(e)
          } finally {
            n.f()
          }
        }
      }]), s
    }(PIXI.Container);
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  71: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      a = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/assertThisInitialized")),
      l = r(e("@babel/runtime/helpers/get")), u = r(e("@babel/runtime/helpers/inherits")),
      i = r(e("@babel/runtime/helpers/possibleConstructorReturn")), c = r(e("@babel/runtime/helpers/getPrototypeOf"));

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
      (0, u.default)(i, e);
      var r = h(i);

      function i(e, t) {
        var n;
        return (0, a.default)(this, i), (n = r.call(this))._emitter = new PIXI.particles.Emitter((0, o.default)(n), [].concat(e), t), n._followNode = null, n
      }

      return (0, s.default)(i, [{
        key: "updateSpawnPos", value: function () {
          var e;
          (e = this._emitter).updateSpawnPos.apply(e, arguments)
        }
      }, {
        key: "updateOwnerPos", value: function () {
          var e;
          (e = this._emitter).updateOwnerPos.apply(e, arguments)
        }
      }, {
        key: "cleanup", value: function () {
          var e;
          (e = this._emitter).cleanup.apply(e, arguments)
        }
      }, {
        key: "resetPositionTracking", value: function () {
          var e;
          (e = this._emitter).cleanup.apply(e, arguments)
        }
      }, {
        key: "enableEmit", set: function (e) {
          this._emitter.emit = e
        }
      }, {
        key: "followNode", set: function (e) {
          this._followNode = e
        }
      }, {
        key: "moveOnPath", value: function (e, t) {
          var n = this, r = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
            a = !(4 < arguments.length && void 0 !== arguments[4]) || arguments[4],
            s = 5 < arguments.length ? arguments[5] : void 0,
            o = (this.resetPositionTracking(), this.updateSpawnPos(e[0].x, e[0].y), new BSpline(e, a)),
            e = (this.t = 0, c2d.Tween.get(this, {override: !0, loop: r}));
          return e.to({t: 1}, t), i && e.call(i), e.addEventListener("change", function () {
            var e = o.calcAt(n.t);
            s && s(e, n._emitter), n.updateSpawnPos(e.x, e.y)
          }), e
        }
      }, {
        key: "playOnceAndDestroy", value: function () {
          var e = this;
          this._emitter.playOnceAndDestroy(function () {
            e._emitter.destroy(), e.removeFromParent()
          })
        }
      }, {
        key: "updateTransform", value: function () {
          this._followNode && (e = this._followNode.toGlobal({
            x: 0,
            y: 0
          }), e = this.toLocal(e), this.updateSpawnPos(e.x, e.y)), this.lastTime = this.lastTime || Date.now();
          var e = .001 * (Date.now() - this.lastTime);
          this.lastTime = Date.now(), this._emitter.ownerPos && this._emitter.update(e * c2d.timescale), (0, l.default)((0, c.default)(i.prototype), "updateTransform", this).call(this)
        }
      }]), i
    }(PIXI.Container);
    n.default = r
  }, {
    "@babel/runtime/helpers/assertThisInitialized": 4,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/get": 9,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  72: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("./WebVR.js"));

    function o(e, t) {
      var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!r) {
        if (Array.isArray(e) || (r = function (e, t) {
          if (e) {
            if ("string" == typeof e) return l(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? l(e, t) : void 0
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
      var i, a = !0, s = !1;
      return {
        s: function () {
          r = r.call(e)
        }, n: function () {
          var e = r.next();
          return a = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            a || null == r.return || r.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function l(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

    r = function () {
      function r(e, t, n) {
        (0, i.default)(this, r), this._renderer = t, this._renderer3D = new THREE.WebGLRenderer({
          canvas: e,
          context: t.gl,
          premultipliedAlpha: !1
        }), this._renderer3D.setPixelRatio(PIXI.settings.RESOLUTION), THREE.Cache.enabled = !0, this._renderer3D.shadowMap.enabled = !0, this._renderer3D.shadowMap.type = THREE.PCFSoftShadowMap, this._renderer3D.autoClear = !0, this._renderer3D.autoClearColor = !1, this._renderer3D.autoClearDepth = !0, this._renderer3D.autoClearStencil = !1, this._webVR = new s.default(this._renderer3D, n), this._viewport = new THREE.Vector4, this._fullscreen = !1, this._current3DScene = null, this._current3DCamera = null, this.set2DRenderMode()
      }

      return (0, a.default)(r, [{
        key: "renderer", get: function () {
          return this._renderer3D
        }
      }, {
        key: "fullscreen", get: function () {
          return this._fullscreen && c2d.env.device.portrait && !c2d.env.device.desktop()
        }, set: function (e) {
          this._fullscreen = e
        }
      }, {
        key: "webVR", get: function () {
          return this._webVR
        }
      }, {
        key: "vr", get: function () {
          return this._renderer3D.vr
        }
      }, {
        key: "domElement", get: function () {
          return this._renderer3D.domElement
        }
      }, {
        key: "extensions", get: function () {
          return this._renderer3D.extensions
        }
      }, {
        key: "current3DScene", get: function () {
          return this._current3DScene
        }, set: function (e) {
          this._current3DScene = e
        }
      }, {
        key: "current3DCamera", get: function () {
          return this._current3DCamera
        }, set: function (e) {
          this._current3DCamera = e
        }
      }, {
        key: "viewport", get: function () {
          return this._viewport
        }
      }, {
        key: "resize", value: function (e, t) {
          this.webVR.isActive ? this._viewport.set(0, 0, e, t) : this._fullscreen || c2d.env.device.desktop() || !c2d.env.device.portrait() ? (this._renderer3D.setSize(e, t, !1), this._viewport.set(0, 0, e, t)) : (this._renderer3D.setSize(e, t, !1), t = t - c2d.screenParams.designHeight, this._viewport.set(0, t, e, c2d.screenParams.designHeight))
        }
      }, {
        key: "set2DRenderMode", value: function () {
          var e = this._renderer.gl;
          if (this._renderer._activeShader) {
            var t = this._renderer._activeShader;
            this._renderer._activeShader = null, t.dirty = !0, this._renderer.bindShader(t, !0);
            for (var n = 0; n < 16; ++n) e.disableVertexAttribArray(n);
            e.enableVertexAttribArray(0), e.enableVertexAttribArray(1), e.enableVertexAttribArray(2), e.enableVertexAttribArray(3)
          }
          this._renderer._activeVao && (this._renderer._activeVao.dirty = !0), this._renderer._activeVao = null, this._renderer._activeBlendMode = null;
          var r, i = o(this._renderer.boundTextures);
          try {
            for (i.s(); !(r = i.n()).done;) {
              var a = r.value;
              this._renderer.unbindTexture(a)
            }
          } catch (e) {
            i.e(e)
          } finally {
            i.f()
          }
          this._renderer.state.resetToDefault(), this._renderer.state.resetAttributes(), this._renderer.state.setCullFace(!1), e.viewport(0, 0, c2d.screenParams.screenWidth * PIXI.settings.RESOLUTION, c2d.screenParams.screenHeight * PIXI.settings.RESOLUTION)
        }
      }, {
        key: "set3DRenderMode", value: function () {
          this._renderer.state.setCullFace(!0), this._renderer3D.state.reset(), this._renderer3D.state.setBlending(THREE.NormalBlending), this._renderer3D.setViewport(this._viewport), this._renderer.gl.viewport(this._viewport.x, this._viewport.y, this._viewport.z, this._viewport.w)
        }
      }, {
        key: "render", value: function () {
          this._current3DScene && this._current3DCamera && (this.set3DRenderMode(), this._renderer3D.render(this._current3DScene, this._current3DCamera), this.set2DRenderMode())
        }
      }]), r
    }();
    n.default = r
  }, {
    "./WebVR.js": 73,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  73: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass"));
    n.default = function () {
      function r(e, t) {
        var n = this;
        (0, i.default)(this, r), this._renderer = e, this._display = null, this._canvasScaler = t, this._canvasBoxWidth = this._canvasBoxHeight = null, this._enabledPossibility = !1, navigator.getVRDisplays().then(function (e) {
          e.length && n._renderer.vr.setDevice(e[0])
        }), window.addEventListener("deviceorientation", function e() {
          n._enabledPossibility = !0, window.removeEventListener("deviceorientation", e)
        }), window.addEventListener("vrdisplayconnect", function (e) {
          return n.onEnter()
        }, !1), window.addEventListener("vrdisplaydisconnect", function (e) {
          return n.notFound()
        }, !1), window.addEventListener("vrdisplaypresentchange", function (e) {
          n._display = event.detail.display, n._display.isPresenting ? n.onEnter() : n.onExit()
        }, !1), c2d.env.device.ios() || window.addEventListener("resize", function () {
          return n.resize()
        }), this._exitVRButton = this.createExitVRButton(), this._exitVRButton.onclick = function () {
          return n.exit()
        }
      }

      return (0, a.default)(r, [{
        key: "createExitVRButton", value: function () {
          var e = document.createElement("button");
          return e.style.position = "absolute", e.style.bottom = "45px", e.style.width = "100px", e.style.padding = "12px 6px", e.style.border = "1px solid #fff", e.style.borderRadius = "4px", e.style.background = "transparent", e.style.color = "#fff", e.style.font = "normal 13px sans-serif", e.style.textAlign = "center", e.style.opacity = "0.5", e.style.outline = "none", e.style.zIndex = "999", e.style.left = "calc(50% - 50px)", e.textContent = "EXIT VR", e.id = "EXIT VR BUTTON", e.style.display = "none", document.querySelector(".app-container").appendChild(e), e
        }
      }, {
        key: "onEnter", value: function () {
          this._canvasScaler.enabled = !1, this._exitVRButton.style.display = "", this._renderer.vr.enabled = !0, this._renderer.vr.setDevice(this._display), c2d.eventManager.dispatch(game.events.FlatUI.ON_VR_ENTER);
          var e = document.querySelector(".canvas-box");
          this._canvasBoxWidth = e.style.width, this._canvasBoxHeight = e.style.height
        }
      }, {
        key: "onExit", value: function () {
          this._canvasScaler.enabled = !0, this._canvasScaler.handleCanvasSize(), this._exitVRButton.style.display = "none", this._renderer.vr.enabled = !1, c2d.eventManager.dispatch(game.events.FlatUI.ON_VR_EXIT)
        }
      }, {
        key: "exit", value: function () {
          this._display && this._display.exitPresent()
        }
      }, {
        key: "enter", value: function () {
          var e, t = this;
          this._enabledPossibility ? c2d.env.device.portrait() ? (e = function e() {
            c2d.eventManager.unsubscribe(c2d.documentEvents.SCREEN_WAS_RESIZED, e), game.api.hidePopup()
          }, game.api.showPopup({message: "Turn your phone landscape to enter VR"}), c2d.eventManager.subscribe(c2d.documentEvents.SCREEN_WAS_RESIZED, e)) : navigator.getVRDisplays().then(function (e) {
            0 < e.length ? (t._display = e[0], t._display.requestPresent([{source: c2d.engine.renderer3D.domElement}])) : t.notFound()
          }) : window.DeviceOrientationEvent && window.DeviceMotionEvent && window.DeviceOrientationEvent.requestPermission && window.DeviceMotionEvent.requestPermission ? (window.DeviceOrientationEvent.requestPermission().then(function (e) {
            console.log(e)
          }), window.DeviceMotionEvent.requestPermission().then(function (e) {
            console.log(e)
          })) : (game.api.showPopup({message: "Please turn on motion & orientation access in your browser settings to enable VR mode"}), c2d.call(function () {
            game.api.hidePopup()
          }, 2500))
        }
      }, {
        key: "resize", value: function () {
          var e, t, n, r;
          this.isActive && (e = window.screen.width * window.devicePixelRatio, t = window.screen.height * window.devicePixelRatio, n = document.getElementById("slotCanvas"), r = document.querySelector(".canvas-box"), t < e ? (r.style.width = this._canvasBoxWidth, r.style.height = this._canvasBoxHeight) : (r.style.width = this._canvasBoxHeight, r.style.height = this._canvasBoxWidth), n.width = e, n.height = t)
        }
      }, {
        key: "notFound", value: function () {
          game.api.showPopup({
            header: "Error",
            image: "popup_smile",
            message: "WebVR is not supported"
          }), c2d.eventManager.dispatch(game.events.FlatUI.ON_VR_NOT_FOUND)
        }
      }, {
        key: "isActive", get: function () {
          return !1
        }
      }]), r
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  74: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      o = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/toConsumableArray"))),
      i = r(e("@babel/runtime/helpers/classCallCheck")), a = r(e("@babel/runtime/helpers/createClass")),
      s = r(e("@babel/runtime/helpers/get")), l = r(e("@babel/runtime/helpers/inherits")),
      u = r(e("@babel/runtime/helpers/possibleConstructorReturn")), c = r(e("@babel/runtime/helpers/getPrototypeOf")),
      h = r(e("../particles/Emitter.js"));

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
        var e, t = (0, c.default)(n);
        return e = r ? (e = (0, c.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, u.default)(this, e)
      }
    }

    r = function (e) {
      (0, l.default)(n, e);
      var t = d(n);

      function n(e) {
        var s;
        return (0, i.default)(this, n), (s = t.call(this, e))._prevAnimation = null, s._oneStateAnimation = !1, s._onCompleteCallback = null, (s.spineData = e).attachLabels && e.attachLabels.forEach(function (e) {
          var t, n = e.key, r = e.font, e = e.slotData, r = Object.assign({}, r),
            i = Array.isArray(r.fontFamily) ? r.fontFamily : [r.fontFamily],
            a = (r.fontFamily = [].concat((0, o.default)(i), ["OpenSans", "Arial"]), s.skeleton.findSlot(e.name).currentSprite);
          if (a && 10 < a.width) {
            for (r.wordWrap = !0, r.wordWrapWidth = a.width, (t = new c2d.display.TextField(n.ls(), r)).scale.x = 1 / a.scale.x, t.scale.y = -1 / a.scale.y, t.anchor = c2d.geom.Point.create(.5, .5); a.width < PIXI.TextMetrics.measureText(t.text, t.style).width;) t.style.fontSize = parseFloat(t.style.fontSize) - 2 + "px";
            for (; a.height < PIXI.TextMetrics.measureText(t.text, t.style).height;) t.style.fontSize = parseFloat(t.style.fontSize) - 2 + "px"
          } else t = new c2d.display.TextField(n.ls(), r);
          t.anchor = c2d.geom.Point.create(.5, .5), s.attach(e.name, t)
        }), s
      }

      return (0, a.default)(n, [{
        key: "skin", set: function (e) {
          var t;
          this.skeleton.setSkin(null), null !== e && ((t = this.spineData.findSkin(e)) ? this.skeleton.setSkin(t) : console.error("Skin: " + e + " no't found!"))
        }
      }, {
        key: "oneStateAnimation", set: function (e) {
          this._oneStateAnimation = e
        }
      }, {
        key: "play", value: function (e) {
          var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
          e = e || this._prevAnimation || this.spineData.animations.first.name, !n && this.currentAnimation == e || !n && this._oneStateAnimation && this._prevAnimation === e || (this.state.setAnimation(0, e, t), this._prevAnimation = e), this._onCompleteCallback && (this.onComplete = this._onCompleteCallback)
        }
      }, {
        key: "currentAnimation", get: function () {
          return this.track && !this.isComplete ? this.track.animation.name : null
        }
      }, {
        key: "stop", value: function () {
          this.state.clearTrack(0)
        }
      }, {
        key: "pause", value: function () {
          this.track && (this.track.timeScale = 0)
        }
      }, {
        key: "resume", value: function () {
          this.track && (this.track.timeScale = 1)
        }
      }, {
        key: "attachEmitter", value: function (e, t) {
          e = this.getChildByName(e);
          if (e && e.children.length) return t = new h.default(t.textures, t.emitter), e.children[0].addChild(t), t
        }
      }, {
        key: "attach", value: function (e, t) {
          e = this.getChildByName(e);
          e && e.children.length && e.children[0].addChild(t)
        }
      }, {
        key: "getChildByName", value: function (e) {
          return this.children[this.skeleton.findSlotIndex(e)]
        }
      }, {
        key: "findSlot", value: function (e) {
          return this.skeleton.findSlot(e)
        }
      }, {
        key: "rootBone", get: function () {
          return this.skeleton.getRootBone()
        }
      }, {
        key: "findBone", value: function (e) {
          return this.skeleton.findBone(e)
        }
      }, {
        key: "findAnimation", value: function (e) {
          return this.spineData.findAnimation(e)
        }
      }, {
        key: "onComplete", set: function (e) {
          var t = this;
          e && (this.track ? (this.track.loop = !1, this.track.listener = this.track.listener || {}, this.track.listener.complete = function () {
            t.track.listener && (t.track.listener.complete = null), c2d.Timeout.invoke(e)
          }, this._onCompleteCallback = null) : this._onCompleteCallback = e)
        }
      }, {
        key: "totalTime", get: function () {
          return this.track ? this.track.animationEnd : 0
        }
      }, {
        key: "currentTime", get: function () {
          return this.track ? this.track.getAnimationTime() : 0
        }, set: function (e) {
          this.track && (this.track.trackTime = e)
        }
      }, {
        key: "isComplete", get: function () {
          return this.totalTime === this.currentTime
        }
      }, {
        key: "speed", set: function (e) {
          this.track && (this.track.timeScale = e)
        }
      }, {
        key: "loop", set: function (e) {
          this.track && (this.track.loop = e)
        }
      }, {
        key: "onEvent", set: function (r) {
          r && (this.track.listener = this.track.listener || {}, this.track.listener.event = function () {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            c2d.Timeout.invoke(function () {
              return r.apply(void 0, t)
            })
          })
        }
      }, {
        key: "track", get: function () {
          return this.state.getCurrent(0)
        }
      }, {
        key: "findEvent", value: function (e) {
          return this.spineData.findEvent(e)
        }
      }, {
        key: "setTouchOnSlot", value: function (e, t) {
          var n = t.down, r = t.up, i = t.over, t = t.out, e = this.findSlot(e).currentSprite;
          e && (e.interactive = e.buttonMode = n || r || i || t, e.mousedown = e.touchstart = n, e.mouseup = e.touchend = r, e.mouseover = i, e.mouseout = e.touchcancel = e.touchendoutside = t)
        }
      }, {
        key: "update", value: function (e) {
          (0, s.default)((0, c.default)(n.prototype), "update", this).call(this, e * c2d.timescale)
        }
      }], [{
        key: "createFrom", value: function (e) {
          var t = new n(e.spine);
          return e.skin && (t.skin = e.skin), t.play(e.animation, e.loop), t.speed = speed, t
        }
      }]), n
    }(PIXI.spine.Spine);
    n.default = r
  }, {
    "../particles/Emitter.js": 71,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/get": 9,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21,
    "@babel/runtime/helpers/toConsumableArray": 25
  }],
  75: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      a = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      s = r(e("@babel/runtime/helpers/createClass"));
    n.default = function () {
      function i(e, t, n, r) {
        (0, a.default)(this, i), this.name = t, this.forceHideOnClick = !1, this._state = null, this.states = {}, this.states.normal = this.initNormalState(e), this.states.hover = this.initHoverState(e), this.states.pressed = this.initPressedState(e), this.states.disabled = this.initDisabledState(e), this._visible = !0, this._clickHandler = n, this._hoverHandler = null, this._longClickHandler = null, this.buttonsGroup = r, this.state = i.State.NORMAL
      }

      return (0, s.default)(i, [{
        key: "initNormalState", value: function (e) {
          var t = this, e = e.skeleton.findSlot(this.name + "_" + i.State.NORMAL);
          if (!e) return null;
          e = e.currentSprite;
          return e.interactive = !0, e.buttonMode = !0, e.mouseover = function () {
            t.state = i.State.HOVER, t._hoverHandler && t._hoverHandler(), t.buttonsGroup && t._buttonsHover()
          }, e.mousedown = function () {
            t.state = i.State.PRESSED
          }, e.touchstart = function () {
            t.initLongClickHandler(), t.state = i.State.PRESSED
          }, e
        }
      }, {
        key: "initHoverState", value: function (e) {
          var t = this, e = e.skeleton.findSlot(this.name + "_" + i.State.HOVER);
          if (!e) return null;
          e = e.currentSprite;
          return e.interactive = !0, e.buttonMode = !0, e.mouseout = e.touchcancel = e.touchendoutside = function () {
            t.state = i.State.NORMAL
          }, e.mousedown = e.touchstart = function () {
            t.state = i.State.PRESSED, t.initLongClickHandler()
          }, e
        }
      }, {
        key: "initPressedState", value: function (e) {
          var t = this, e = e.skeleton.findSlot(this.name + "_" + i.State.PRESSED);
          if (!e) return null;
          var n = e.currentSprite;
          return n.interactive = !0, n.buttonMode = !0, n.mouseout = n.touchcancel = n.touchendoutside = function () {
            t.stopLongClickHandler(), t.state = i.State.NORMAL
          }, n.touchmove = function (e) {
            n.containsPoint(e.data.global) || (t.stopLongClickHandler(), t.state = i.State.NORMAL)
          }, n.mouseup = function () {
            return t.action()
          }, n.touchend = function () {
            t.stopLongClickHandler(), t.action()
          }, n
        }
      }, {
        key: "initDisabledState", value: function (e) {
          e = e.skeleton.findSlot(this.name + "_" + i.State.DISABLED);
          return e ? e.currentSprite : null
        }
      }, {
        key: "state", get: function () {
          return this._state
        }, set: function (e) {
          this._state == e || this.hasOverlayLayer || (this.forceSetState = e)
        }
      }, {
        key: "forceSetState", set: function (e) {
          if (this.states[e]) {
            for (var t in this.states) this.states[t] && (this.states[t].visible = t === e);
            e === i.State.PRESSED && (this.states[e]._touchDown = !0), this._state = e, this._visible = !0
          } else this.states[i.State.NORMAL] ? this.state = i.State.NORMAL : this.states[i.State.DISABLED] && (this.state = i.State.DISABLED)
        }
      }, {
        key: "visible", get: function () {
          return this._visible
        }, set: function (e) {
          if (this._visible != e) if (this._visible = e, this._visible) this.state = i.State.NORMAL; else for (var t in this._state = null, this.states) this.states[t] && (this.states[t].visible = !1)
        }
      }, {
        key: "longClickHandler", set: function (e) {
          this._longClickHandler = e
        }
      }, {
        key: "hoverHandler", set: function (e) {
          this._hoverHandler = e
        }
      }, {
        key: "action", value: function () {
          this.state = i.State.HOVER, this._clickHandler && !this.hasOverlayLayer && (this.forceHideOnClick && (this.state = i.State.NORMAL, this.visible = !1), this._clickHandler(this)), this.stopLongClickHandler()
        }
      }, {
        key: "initLongClickHandler", value: function () {
          var e = this;
          this._longClickHandler && c2d.Tween.get(this._longClickHandler).wait(1e3).call(function () {
            e._longClickHandler(), e.state = i.State.NORMAL
          })
        }
      }, {
        key: "stopLongClickHandler", value: function () {
          this._longClickHandler && c2d.Tween.removeTweens(this._longClickHandler)
        }
      }, {
        key: "hasOverlayLayer", get: function () {
          return null != document.querySelector(".js-overlay")
        }
      }, {
        key: "_buttonsHover", value: function () {
          var t = this;
          this.buttonsGroup.filter(function (e) {
            return e != t && e.state == c2d.display.SpineButton.State.HOVER
          }).forEach(function (e) {
            e.forceSetState = c2d.display.SpineButton.State.NORMAL
          })
        }
      }], [{
        key: "State", get: function () {
          return {NORMAL: "normal", HOVER: "hover", PRESSED: "pressed", DISABLED: "disabled"}
        }
      }]), i
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  76: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      o = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      i = r(e("@babel/runtime/helpers/createClass")), l = r(e("./SpineButton.js")), r = function () {
        function s(e, t, n) {
          var r = this, i = n.enable, i = void 0 === i || i, a = n.clickHandler;
          (0, o.default)(this, s), this.spineButtonOn = new l.default(e, t + "_ON", function () {
            a(r.enable = !r.enable)
          }), this.spineButtonOff = new l.default(e, t + "_OFF", function () {
            a(r.enable = !r.enable)
          }), this.enable = i
        }

        return (0, i.default)(s, [{
          key: "enable", get: function () {
            return this._enable
          }, set: function (e) {
            this._enable = e, this.spineButtonOn.visible = this._enable, this.spineButtonOff.visible = !this._enable
          }
        }]), s
      }();
    n.default = r
  }, {
    "./SpineButton.js": 75,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  77: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      s = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      o = r(e("@babel/runtime/helpers/createClass")), l = r(e("@babel/runtime/helpers/get")),
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

    var d = [PIXI.Texture.EMPTY], r = function (e) {
      (0, u.default)(a, e);
      var i = h(a);

      function a() {
        var e, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [],
          n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : .1,
          r = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
        return (0, s.default)(this, a), (e = i.call(this, d))._animationSequence = null, e.setAnimation({
          textures: t,
          speed: n,
          loop: r
        }), e
      }

      return (0, o.default)(a, [{
        key: "scaleX", get: function () {
          return this.scale.x
        }, set: function (e) {
          this.scale.x = e
        }
      }, {
        key: "scaleY", get: function () {
          return this.scale.y
        }, set: function (e) {
          this.scale.y = e
        }
      }, {
        key: "play", value: function (e) {
          var t = this, n = null;
          if (this._animationSequence && this._animationSequence.length && (n = this._animationSequence.shift()), void 0 !== e && (this.playing && this.stop(), "function" == typeof e ? (this.loop = !1, this.onComplete = function () {
            n ? (t.setAnimation(n), t.play(e)) : e()
          }) : this.onComplete = null, this.setAnimation(e)), n && (this.onComplete = function () {
            t.play(n)
          }), !this.textures.length || !this.textures.first) throw new Error("textures is empty");
          (0, l.default)((0, c.default)(a.prototype), "play", this).call(this)
        }
      }, {
        key: "stop", value: function () {
          (0, l.default)((0, c.default)(a.prototype), "stop", this).call(this), this._currentTime = 0, this._texture = this._textures[this.currentFrame]
        }
      }, {
        key: "pause", value: function () {
          (0, l.default)((0, c.default)(a.prototype), "stop", this).call(this)
        }
      }, {
        key: "resume", value: function () {
          (0, l.default)((0, c.default)(a.prototype), "play", this).call(this)
        }
      }, {
        key: "setAnimation", value: function (e) {
          e.textures && e.textures.length && (this.textures = e.textures, this._currentTime = 0, this.gotoAndStop(0), this.updateTexture()), void 0 !== e.speed && (this.animationSpeed = e.speed), void 0 !== e.loop && (this.loop = e.loop), void 0 !== e.blendMode && (this.blendMode = PIXI.BLEND_MODES[e.blendMode])
        }
      }, {
        key: "setSequence", value: function (e) {
          e ? (this._animationSequence = e.slice(), this.setAnimation(this._animationSequence.shift())) : this._animationSequence = null
        }
      }, {
        key: "gotoAndStop", value: function (e) {
          (0, l.default)((0, c.default)(a.prototype), "gotoAndStop", this).call(this, e)
        }
      }, {
        key: "clear", value: function () {
          this.textures = [PIXI.Texture.EMPTY], this._currentTime = 0
        }
      }, {
        key: "fps", get: function () {
          return 60 * this.animationSpeed / 1e3
        }, set: function (e) {
          this.animationSpeed = 1e3 * e / 60
        }
      }, {
        key: "duration", get: function () {
          return this.totalFrames / this.fps
        }
      }, {
        key: "totalTime", get: function () {
          return this.totalFrames / this.fps
        }
      }, {
        key: "currentTime", set: function (e) {
          this.gotoAndPlay(parseInt(e * this.fps))
        }
      }, {
        key: "update", value: function (e) {
          (0, l.default)((0, c.default)(a.prototype), "update", this).call(this, e * c2d.timescale)
        }
      }], [{
        key: "createFrom", value: function (e) {
          return new a(e.textures, e.speed, e.loop)
        }
      }]), a
    }(PIXI.AnimatedSprite);
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/get": 9,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  78: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      u = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/defineProperty"))),
      c = r(e("@babel/runtime/helpers/slicedToArray")), h = r(e("@babel/runtime/helpers/classCallCheck")),
      i = r(e("@babel/runtime/helpers/createClass")), a = r(e("@babel/runtime/helpers/inherits")),
      s = r(e("@babel/runtime/helpers/possibleConstructorReturn")), o = r(e("@babel/runtime/helpers/getPrototypeOf"));

    function d(t, e) {
      var n, r = Object.keys(t);
      return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t), e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })), r.push.apply(r, n)), r
    }

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
        var e, t = (0, o.default)(n);
        return e = r ? (e = (0, o.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, s.default)(this, e)
      }
    }

    r = function (e) {
      (0, a.default)(l, e);
      var o = f(l);

      function l(e, t) {
        var n, t = (0, c.default)(t, 4), r = t[0], i = t[1], a = t[2], t = t[3],
          s = ((0, h.default)(this, l), n = o.call(this, null), e.baseTexture), e = e.orig;
        return [new c2d.geom.Rectangle(e.x, e.y, r, i), new c2d.geom.Rectangle(e.x + r, e.y, e.width - r - a, i), new c2d.geom.Rectangle(e.x + e.width - a, e.y, a, i), new c2d.geom.Rectangle(e.x, e.y + i, r, e.y + e.height - i - t), new c2d.geom.Rectangle(e.x + r, e.y + i, e.width - r - a, e.y + e.height - i - t), new c2d.geom.Rectangle(e.x + e.width - a, e.y + i, a, e.y + e.height - i - t), new c2d.geom.Rectangle(e.x, e.y + e.height - t, r, t), new c2d.geom.Rectangle(e.x + r, e.y + e.height - t, e.width - r - a, t), new c2d.geom.Rectangle(e.x + e.width - a, e.y + e.height - t, a, t)].forEach(function (e) {
          e = new c2d.display.Sprite(new PIXI.Texture(s, e));
          n.addChild(e)
        }), n.p1 = new c2d.geom.Point(r, i), n.p2 = new c2d.geom.Point(e.width - a, e.height - t), n.orig = function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? d(Object(n), !0).forEach(function (e) {
              (0, u.default)(t, e, n[e])
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : d(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            })
          }
          return t
        }({}, e), n
      }

      return (0, i.default)(l, [{
        key: "setSize", value: function (e, t) {
          var n = this.children, r = [this.p1, this.p2], i = r[0], r = r[1], e = e - i.x - this.orig.width + r.x,
            t = t - i.y - this.orig.height + r.y;
          n[1].width = n[4].width = n[7].width = e, n[3].height = n[4].height = n[5].height = t, n[1].x = n[4].x = n[7].x = i.x, n[2].x = n[5].x = n[8].x = i.x + e, n[3].y = n[4].y = n[5].y = i.y, n[6].y = n[7].y = n[8].y = i.y + t
        }
      }, {
        key: "setMiddleSize", value: function (e, t) {
          this.setSize(e + this.p1.x + this.orig.width - this.p2.x, t + this.p1.y + this.orig.height - this.p2.y)
        }
      }]), l
    }(PIXI.Sprite);
    (n.default = r).ID = "NineSliceSprite"
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/defineProperty": 8,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21,
    "@babel/runtime/helpers/slicedToArray": 23
  }],
  79: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/inherits")),
      o = r(e("@babel/runtime/helpers/possibleConstructorReturn")), l = r(e("@babel/runtime/helpers/getPrototypeOf"));

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
        return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, o.default)(this, e)
      }
    }

    r = function (e) {
      (0, s.default)(n, e);
      var t = u(n);

      function n() {
        return (0, i.default)(this, n), t.apply(this, arguments)
      }

      return (0, a.default)(n, [{
        key: "onContextChange", value: function () {
          var e = this.renderer.gl;
          this.shader = new PIXI.Shader(e, "\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uMVP;\nvarying vec2 vTextureCoord;\n\n\nvoid main(void)\n{\n    vTextureCoord = aTextureCoord;\n    gl_Position = vec4((uMVP * vec4(aVertexPosition.x, aVertexPosition.y, 0.0, 1.0)).xy, 0.0, 1.0);\n}\n", "\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    vec4 sample = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = sample;\n}\n"), this.tempQuad = new PIXI.Quad(e), this.tempQuad.initVao(this.shader), this.tempQuad.upload()
        }
      }, {
        key: "render", value: function (e) {
          var t, n, r, i, a;
          e.texture.valid && (t = this.renderer, n = this.tempQuad, r = c2d.screenParams, this.projectionMatrix = c2d.geom.mat4.create(), c2d.geom.mat4.ortho(this.projectionMatrix, 0, r.canvasWidth * r.canvasScaleCoef, r.canvasHeight * r.canvasScaleCoef, 0, 0, 1), r = c2d.geom.mat4.create(), i = c2d.geom.mat4.create(), a = c2d.geom.quat.create(), c2d.geom.quat.fromEuler(a, e.euler.x, e.euler.y, e.euler.z), c2d.geom.mat4.fromRotationTranslation(r, a, [e.worldTransform.tx, e.worldTransform.ty, 0]), c2d.geom.mat4.scale(r, r, [e.width / 2 * e.worldTransform.a, e.height / 2 * e.worldTransform.d, 1]), c2d.geom.mat4.multiply(i, this.projectionMatrix, r), t.bindVao(n.vao), t.bindShader(this.shader), this.shader.uniforms.uSampler = t.bindTexture(e.texture.baseTexture), this.shader.uniforms.uMVP = i, t.state.setBlendMode(e.blendMode), n.vao.draw(this.renderer.gl.TRIANGLES, 6, 0))
        }
      }]), n
    }(PIXI.ObjectRenderer), e = function (e) {
      (0, s.default)(n, e);
      var t = u(n);

      function n(e) {
        return (0, i.default)(this, n), (e = t.call(this, e)).euler = {
          x: 0,
          y: 0,
          z: 0
        }, e.pluginName = "OrthoSpriteRenderer", e
      }

      return (0, a.default)(n)
    }(PIXI.Sprite);
    n.default = e, PIXI.Renderer.registerPlugin("OrthoSpriteRenderer", r)
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  80: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass"));
    n.default = function () {
      function n(e, t) {
        (0, i.default)(this, n), this.bufferView = t, this.componentType = e.componentType, this.byteOffset = void 0 !== e.byteOffset ? e.byteOffset : 0, this.byteStride = t.byteStride, this.normalized = void 0 !== e.normalized && e.normalized, this.count = e.count, this.type = e.type, this.size = n.type2NumOfComponent(this.type), this.min = e.min, this.max = e.max
      }

      return (0, a.default)(n, [{
        key: "typedArray", get: function () {
          return n.arrayBuffer2TypedArray(this.bufferView.data, this.byteOffset, this.count * n.type2NumOfComponent(this.type), this.componentType)
        }
      }], [{
        key: "type2NumOfComponent", value: function (e) {
          switch (e) {
            case"SCALAR":
              return 1;
            case"VEC2":
              return 2;
            case"VEC3":
              return 3;
            case"VEC4":
            case"MAT2":
              return 4;
            case"MAT3":
              return 9;
            case"MAT4":
              return 16
          }
        }
      }, {
        key: "arrayBuffer2TypedArray", value: function (e, t, n, r) {
          switch (r) {
            case 5120:
              return new Int8Array(e, t, n);
            case 5121:
              return new Uint8Array(e, t, n);
            case 5122:
              return new Int16Array(e, t, n);
            case 5123:
              return new Uint16Array(e, t, n);
            case 5124:
              return new Int32Array(e, t, n);
            case 5125:
              return new Uint32Array(e, t, n);
            case 5126:
              return new Float32Array(e, t, n);
            default:
              throw new Error("GLTF: unsupported array buffer type [".concat(r, "]"))
          }
        }
      }]), n
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  81: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      u = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      i = r(e("@babel/runtime/helpers/createClass")), a = r(e("./Accessor.js"));

    function c(e, t) {
      var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!r) {
        if (Array.isArray(e) || (r = function (e, t) {
          if (e) {
            if ("string" == typeof e) return o(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0
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
      var i, a = !0, s = !1;
      return {
        s: function () {
          r = r.call(e)
        }, n: function () {
          var e = r.next();
          return a = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            a || null == r.return || r.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function o(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

    var h = function () {
      function n(e, t) {
        if ((0, u.default)(this, n), this._input = t[e.input].typedArray, this._output = t[e.output].typedArray, this._outputStride = a.default.type2NumOfComponent(t[e.output].type), this._interpolation = e.interpolation || "LINEAR", this._curIdx = 0, this._endT = this._input[this._input.length - 1], this._inputMax = this._endT - this._input[0], 4 === this._outputStride) this._animationOutputValueVec4a = c2d.geom.quat.create(), this._animationOutputValueVec4b = c2d.geom.quat.create(), this._curValue = c2d.geom.quat.create(), this._lerpFunc = c2d.geom.quat.slerp; else {
          if (3 !== this._outputStride) throw new Error("GLTF: not supported outputStride [".concat(outputStride, "]"));
          this._animationOutputValueVec4a = c2d.geom.vec3.create(), this._animationOutputValueVec4b = c2d.geom.vec3.create(), this._curValue = c2d.geom.vec3.create(), this._lerpFunc = c2d.geom.vec3.lerp
        }
      }

      return (0, i.default)(n, [{
        key: "getValueAt", value: function (e) {
          e > this._endT && (e -= this._inputMax * Math.ceil((e - this._endT) / this._inputMax), this._curIdx = 0);
          for (var t = this._input.length; this._curIdx <= t - 2 && e >= this._input[this._curIdx + 1];) this._curIdx++;
          this._curIdx >= t - 1 && (e -= this._inputMax, this._curIdx = 0);
          for (var n = this._curIdx, r = n * this._outputStride, i = r + this._outputStride, n = Math.max(0, e - this._input[n]) / (this._input[n + 1] - this._input[n]), a = 0; a < this._outputStride; a++) this._animationOutputValueVec4a[a] = this._output[r + a], this._animationOutputValueVec4b[a] = this._output[i + a];
          return "LINEAR" === this._interpolation && this._lerpFunc(this._curValue, this._animationOutputValueVec4a, this._animationOutputValueVec4b, n), this._curValue
        }
      }]), n
    }(), s = (0, i.default)(function e(t) {
      if ((0, u.default)(this, e), void 0 === t.node) throw new Error("GLTF: target must have node [".concat(t, "]"));
      this._node = t.node, this._path = t.path
    }), d = (0, i.default)(function e(t, n) {
      (0, u.default)(this, e), this._sampler = n._samplers[t.sampler], this._target = new s(t.target)
    }), r = (0, i.default)(function e(t, n) {
      (0, u.default)(this, e), this._name = t.name || "", this._samplers = [];
      var r, i = c(t.samplers);
      try {
        for (i.s(); !(r = i.n()).done;) {
          var a = r.value;
          this._samplers.push(new h(a, n))
        }
      } catch (e) {
        i.e(e)
      } finally {
        i.f()
      }
      this._channels = [];
      var s, o = c(t.channels);
      try {
        for (o.s(); !(s = o.n()).done;) {
          var l = s.value;
          this._channels.push(new d(l, this))
        }
      } catch (e) {
        o.e(e)
      } finally {
        o.f()
      }
    });
    n.default = r
  }, {
    "./Accessor.js": 80,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  82: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/createClass"))),
      a = r(e("@babel/runtime/helpers/classCallCheck"));
    n.default = (0, i.default)(function e(t, n) {
      (0, a.default)(this, e), this.byteLength = t.byteLength, this.byteOffset = void 0 !== t.byteOffset ? t.byteOffset : 0, this.byteStride = void 0 !== t.byteStride ? t.byteStride : 0, this.target = void 0 !== t.target ? t.target : null, this.data = n.slice(this.byteOffset, this.byteOffset + this.byteLength)
    })
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  83: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/createClass"))),
      a = r(e("@babel/runtime/helpers/classCallCheck"));
    n.default = (0, i.default)(function e(t) {
      (0, a.default)(this, e), this._name = t.name || "", this._alphaMode = void 0 !== t.alphaMode ? t.alphaMode : null, this._baseColorFactor = [1, 1, 1, 1], this._baseTexture = null, this._normalTexture = null, t.pbrMetallicRoughness && (t.pbrMetallicRoughness.baseColorFactor && (this._baseColorFactor = t.pbrMetallicRoughness.baseColorFactor), t.pbrMetallicRoughness.baseColorTexture && (this._baseTexture = t.pbrMetallicRoughness.baseColorTexture.index)), t.normalTexture && (this._normalTexture = t.normalTexture.index)
    })
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  84: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      a = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      s = r(e("@babel/runtime/helpers/createClass"));
    n.default = function () {
      function i(e, t) {
        if ((0, a.default)(this, i), !e.primitives || 1 < e.primitives.length) throw new Error("GLTF: mesh have incorrect primitives [".concat(e.primitives, "]"));
        var n, r = e.primitives[0];
        for (n in this._glDatas = {}, this._drawMode = void 0 !== r.mode ? r.mode : 4, this._material = void 0 !== r.material ? r.material : null, this._attributes = {}, r.attributes) this._attributes[n] = t[r.attributes[n]];
        void 0 !== r.indices && (this._indices = void 0 !== r.indices ? t[r.indices].typedArray : null, this._indicesType = t[r.indices].componentType)
      }

      return (0, s.default)(i, [{
        key: "sortTriangles", value: function (e) {
          for (var t = this._attributes.POSITION.typedArray, n = [], r = 0; r < this._indices.length; r += 3) {
            var i = [this._indices[r], this._indices[r + 1], this._indices[r + 2]],
              i = {indices: i, dist: t[3 * i[0] + e] + t[3 * i[1] + e] + t[3 * i[2] + e]};
            n.push(i)
          }
          for (var n = n.sort(function (e, t) {
            return e.dist > t.dist ? 1 : -1
          }), a = 0; a < this._indices.length; a += 3) {
            var s = n[a / 3].indices;
            this._indices[a] = s[0], this._indices[a + 1] = s[1], this._indices[a + 2] = s[2]
          }
        }
      }, {
        key: "calculateTangents", value: function () {
          for (var e = this._attributes.POSITION.typedArray, t = this._attributes.TEXCOORD_0.typedArray, n = new Float32Array(e.length), r = {
            typedArray: n,
            componentType: this._attributes.POSITION.componentType,
            normalized: !1,
            byteStride: !1,
            byteOffset: !1
          }, i = [], a = (i.push(c2d.geom.vec3.create()), i.push(c2d.geom.vec3.create()), i.push(c2d.geom.vec3.create()), []), s = (a.push(c2d.geom.vec2.create()), a.push(c2d.geom.vec2.create()), a.push(c2d.geom.vec2.create()), c2d.geom.vec3.create()), o = c2d.geom.vec3.create(), l = 0; l < this._indices.length; l += 3) {
            for (var u = [this._indices[l], this._indices[l + 1], this._indices[l + 2]], c = 0; c < 3; ++c) {
              var h = u[c], d = u[(c + 1) % 3];
              c2d.geom.vec3.set(i[c], e[3 * d] - e[3 * h], e[3 * d + 1] - e[3 * h + 1], e[3 * d + 2] - e[3 * h + 2]), c2d.geom.vec2.set(a[c], t[2 * d] - t[2 * h], t[2 * d + 1] - t[2 * h + 1])
            }
            for (var f = 0; f < 3; ++f) {
              var p = (f + 2) % 3, m = c2d.geom.vec3.clone(i[f]), v = c2d.geom.vec3.clone(i[p]),
                b = c2d.geom.vec2.clone(a[f]), p = c2d.geom.vec2.clone(a[p]), y = c2d.geom.vec3.create(),
                g = 1 / (b[0] * -p[1] - b[1] * -p[0]);
              c2d.geom.vec3.scale(s, m, -p[1] * g), c2d.geom.vec3.scale(o, v, -b[1] * g), c2d.geom.vec3.subtract(y, s, o), c2d.geom.vec3.normalize(y, y), n[3 * (l + f)] = y[0], n[3 * (l + f) + 1] = y[1], n[3 * (l + f) + 2] = y[2]
            }
          }
          if (this._attributes.TANGENT) throw new Error("GLTF: mesh already hase tangents");
          this._attributes.TANGENT = r
        }
      }]), i
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  85: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      a = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      s = r(e("@babel/runtime/helpers/createClass"));

    function o(e, t) {
      var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!r) {
        if (Array.isArray(e) || (r = function (e, t) {
          if (e) {
            if ("string" == typeof e) return l(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? l(e, t) : void 0
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
      var i, a = !0, s = !1;
      return {
        s: function () {
          r = r.call(e)
        }, n: function () {
          var e = r.next();
          return a = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            a || null == r.return || r.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function l(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

    n.default = function () {
      function i(e) {
        (0, a.default)(this, i), this._name = e.name || "", this._parent = e.parent || null, this._children = e.children ? e.children.slice() : [], this._mesh = e.mesh, this._skin = e.skin, this._matrix = c2d.geom.mat4.create(), this._worldMatrix = c2d.geom.mat4.create(), this._translation = c2d.geom.vec3.create(), this._rotation = c2d.geom.quat.create(), this._scale = c2d.geom.vec3.fromValues(1, 1, 1), void 0 !== e.matrix ? (c2d.geom.mat4.copy(this._matrix, e.matrix), c2d.geom.mat4.getTranslation(this._translation, this._matrix), c2d.geom.mat4.getRotation(this._rotation, this._matrix), c2d.geom.mat4.getScaling(this._scale, this._matrix)) : (e.scale && c2d.geom.vec3.copy(this._scale, e.scale), e.rotation && c2d.geom.quat.copy(this._rotation, e.rotation), e.translation && c2d.geom.vec3.copy(this._translation, e.translation), this.updateMatrixFromTRS()), this._worldMatrixDirty = !0
      }

      return (0, s.default)(i, [{
        key: "clone", value: function () {
          var e, t = new i({
            name: this._name,
            parent: this._parent,
            children: [],
            mesh: this._mesh,
            skin: this._skin,
            matrix: this._matrix
          }), n = o(this._children);
          try {
            for (n.s(); !(e = n.n()).done;) {
              var r = e.value.clone();
              (r._parent = t)._children.push(r)
            }
          } catch (e) {
            n.e(e)
          } finally {
            n.f()
          }
          return t
        }
      }, {
        key: "updateMatrixFromTRS", value: function () {
          var e = c2d.geom.mat4.create();
          c2d.geom.mat4.fromRotationTranslation(e, this._rotation, this._translation), c2d.geom.mat4.scale(this._matrix, e, this._scale)
        }
      }, {
        key: "worldMatrix", get: function () {
          return this.updateMatrixFromTRS(), this._parent ? c2d.geom.mat4.multiply(this._worldMatrix, this._parent.worldMatrix, this._matrix) : this._matrix
        }
      }, {
        key: "getChildByName", value: function (e) {
          var t, n = o(this._children);
          try {
            for (n.s(); !(t = n.n()).done;) {
              var r = t.value;
              if (r._name === e) return r
            }
          } catch (e) {
            n.e(e)
          } finally {
            n.f()
          }
          return null
        }
      }]), i
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  86: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"), i = r(e("@babel/runtime/helpers/classCallCheck")),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/inherits")),
      o = r(e("@babel/runtime/helpers/possibleConstructorReturn")), l = r(e("@babel/runtime/helpers/getPrototypeOf")),
      g = r(e("./UniversalShader.js"));

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
        return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, o.default)(this, e)
      }
    }

    r = function (e) {
      (0, s.default)(n, e);
      var t = u(n);

      function n() {
        return (0, i.default)(this, n), t.apply(this, arguments)
      }

      return (0, a.default)(n, [{
        key: "onContextChange", value: function () {
          this.shaders = {}, this.angle = .1, this.uLightPosition = new Float32Array([0, 15, 12])
        }
      }, {
        key: "start", value: function () {
        }
      }, {
        key: "flush", value: function () {
        }
      }, {
        key: "render", value: function (e, t) {
          var n = this, r = this.renderer.gl, i = this.renderer, a = e._mesh,
            s = (i.state.setBlendMode(PIXI.BLEND_MODES.NORMAL), i.state.setCullFace(!1), i.state.setDepthTest(!0), "BLEND" === a._material._alphaMode ? i.state.setBlend(!0) : i.state.setBlend(!1), a._glDatas[i.CONTEXT_UID]);
          if (!s) {
            i.bindVao(null);
            var o, l, u, c = 0;
            for (o in e._skin && (c |= g.default.bitMasks.HAS_SKIN), a._attributes.NORMAL && (c |= g.default.bitMasks.HAS_LIGHT), a._material._normalTexture && (c |= g.default.bitMasks.HAS_NORMALMAP), this.shaders[c] || (this.shaders[c] = new g.default(r, c)), (s = {
              shader: this.shaders[c],
              indexBuffer: PIXI.glCore.GLBuffer.createIndexBuffer(r, a._indices, r.STATIC_DRAW),
              vao: null
            }).vao = new PIXI.glCore.VertexArrayObject(r), s.vao.addIndex(PIXI.glCore.GLBuffer.createIndexBuffer(r, a._indices, r.STATIC_DRAW)), a._attributes) s.shader.attributes[o] ? (l = a._attributes[o], u = PIXI.glCore.GLBuffer.createVertexBuffer(r, l.typedArray, r.STATIC_DRAW), s.vao.addAttribute(u, s.shader.attributes[o], l.componentType, l.normalized, l.byteStride, l.byteOffset)) : console.warn("GLTF: shader doesn't have [".concat(a.primitives, "] attribute"));
            a._glDatas[i.CONTEXT_UID] = s
          }
          var c = c2d.screenParams, h = c.screenWidth - 2 * c.paddingLeft + 1, d = c.designHeight + 1,
            f = c.screenHeight - d - c.paddingTop, p = (r.viewport(c.paddingLeft, f, h, d), s.shader),
            f = (i.bindShader(p, !1), c2d.geom.mat4.create()),
            h = (c2d.geom.mat4.perspective(f, 1.05, h / d, .01, 500), c2d.geom.mat4.create()),
            d = (t ? c2d.geom.mat4.copy(h, t) : c2d.geom.mat4.lookAt(h, [0, 0, .25], [0, 0, 0], [0, 1, 0]), c2d.geom.mat4.create()),
            t = c2d.geom.mat4.create(), m = c2d.geom.mat4.create(),
            v = (c2d.geom.mat4.multiply(d, h, e.worldMatrix), c2d.geom.mat4.multiply(t, f, d), c2d.geom.mat4.invert(m, e.worldMatrix), c2d.geom.mat4.transpose(m, m), p.uniforms.uMVP = t, p.uniforms.uMV = e.worldMatrix, p.uniforms.uMVNormal = m, p.uniforms.uLightPosition = this.uLightPosition, window.uLightPosition = function (e) {
              n.uLightPosition = e
            }, c2d.geom.mat4.create());
          if (e._skin) for (var h = c2d.geom.mat4.create(), b = (c2d.geom.mat4.invert(h, e.worldMatrix), 0); b < e._skin._joints.length; ++b, 0) {
            var y = r.getUniformLocation(p.program, "jointsMatrix[" + b + "]");
            r.uniformMatrix4fv(y, !1, v)
          }
          i.bindTexture(a._material._baseTexture, 0, !0), a._material._normalTexture && i.bindTexture(a._material._normalTexture, 1, !0), i.bindVao(s.vao), r.drawElements(a._drawMode, a._indices.length, a._indicesType, 0), i.state.setCullFace(!1), i.state.setDepthTest(!1), i.state.setBlend(!0), i.state.setBlendMode(PIXI.BLEND_MODES.NORMAL), r.viewport(0, 0, c.screenWidth, c.screenHeight)
        }
      }]), n
    }(PIXI.ObjectRenderer);
    PIXI.Renderer.registerPlugin("SkinnedMeshRenderer", r)
  }, {
    "./UniversalShader.js": 88,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  87: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/createClass"))),
      a = r(e("@babel/runtime/helpers/classCallCheck"));
    n.default = (0, i.default)(function e(t, n) {
      if ((0, a.default)(this, e), this._name = t.name || "", this._skeleton = null, this._joints = t.joints || [], t.inverseBindMatrices) {
        var r = n[t.inverseBindMatrices];
        this._inverseBindMatrices = [];
        for (var i = 0; i < t.joints.length; ++i) this._inverseBindMatrices.push(new Float32Array(r.bufferView.data, r.byteOffset + 16 * i * 4, 16))
      }
    })
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  88: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/inherits")),
      o = r(e("@babel/runtime/helpers/possibleConstructorReturn")), l = r(e("@babel/runtime/helpers/getPrototypeOf"));

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
        return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, o.default)(this, e)
      }
    }

    r = function (e) {
      (0, s.default)(r, e);
      var n = u(r);

      function r(e, t) {
        return (0, i.default)(this, r), (e = n.call(this, e, (t & r.bitMasks.HAS_SKIN ? "#define HAS_SKIN;\n" : "") + (t & r.bitMasks.HAS_LIGHT ? "#define HAS_LIGHT;\n" : "") + (t & r.bitMasks.HAS_NORMALMAP ? "#define HAS_NORMALMAP;\n" : "") + include("./shaders/universal.vert"), (t & r.bitMasks.HAS_LIGHT ? "#define HAS_LIGHT;\n" : "") + (t & r.bitMasks.HAS_NORMALMAP ? "#define HAS_NORMALMAP;\n" : "") + include("./shaders/universal.frag"))).bind(), e.uniforms.uBaseTexture = 0, e.uniforms.uNormalTexture = 1, e.uniforms.uLightPosition = new Float32Array([1, 0, 1]), e
      }

      return (0, a.default)(r, null, [{
        key: "bitMasks", get: function () {
          return {HAS_SKIN: 2, HAS_LIGHT: 4, HAS_NORMALMAP: 8}
        }
      }]), r
    }(PIXI.Shader);
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  89: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/inherits"))),
      a = r(e("@babel/runtime/helpers/possibleConstructorReturn")), s = r(e("@babel/runtime/helpers/getPrototypeOf")),
      o = r(e("@babel/runtime/helpers/createClass")), J = r(e("@babel/runtime/helpers/classCallCheck")),
      Q = (e("./Renderer.js"), r(e("./BufferView.js"))), ee = r(e("./Accessor.js")), te = r(e("./Material.js")),
      ne = r(e("./Animation.js")), re = r(e("./Node.js")), ie = r(e("./Mesh.js")), ae = r(e("./Skin.js"));

    function se(e, t) {
      var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!r) {
        if (Array.isArray(e) || (r = function (e, t) {
          if (e) {
            if ("string" == typeof e) return l(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? l(e, t) : void 0
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
      var i, a = !0, s = !1;
      return {
        s: function () {
          r = r.call(e)
        }, n: function () {
          var e = r.next();
          return a = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            a || null == r.return || r.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function l(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

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
        var e, t = (0, s.default)(n);
        return e = r ? (e = (0, s.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, a.default)(this, e)
      }
    }

    var oe = (0, o.default)(function e(t) {
      (0, J.default)(this, e), this._name = t.name || "", this._nodes = t.nodes || []
    }), r = function (e) {
      (0, i.default)($, e);
      var K = u($);

      function $() {
        var t, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          n = ((0, J.default)(this, $), t = K.call(this), e.json || {}), I = e.buffers || null, L = e.images;
        if (t._bufferViews = [], n.bufferViews) {
          var r, i = se(n.bufferViews);
          try {
            for (i.s(); !(r = i.n()).done;) {
              var a = r.value;
              t._bufferViews.push(new Q.default(a, I[a.buffer]))
            }
          } catch (e) {
            i.e(e)
          } finally {
            i.f()
          }
        }
        if (t._accessors = [], n.accessors) {
          var s, o = se(n.accessors);
          try {
            for (o.s(); !(s = o.n()).done;) {
              var l = s.value;
              t._accessors.push(new ee.default(l, t._bufferViews[l.bufferView]))
            }
          } catch (e) {
            o.e(e)
          } finally {
            o.f()
          }
        }
        if (t._images = [], n.images) {
          var u, c = se(n.images);
          try {
            for (c.s(); !(u = c.n()).done;) {
              var h = u.value;
              if (!h.uri) throw new Error("GLTF: support only uri images [".concat(h, "]"));
              t._images.push(L[h.uri])
            }
          } catch (e) {
            c.e(e)
          } finally {
            c.f()
          }
        }
        if (t._materials = [], n.materials) {
          var d, f = se(n.materials);
          try {
            for (f.s(); !(d = f.n()).done;) {
              var F = d.value, p = new te.default(F);
              null !== p._baseTexture && (p._baseTexture = t._images[p._baseTexture]), null !== p._normalTexture && (p._normalTexture = t._images[p._normalTexture]), t._materials.push(p)
            }
          } catch (e) {
            f.e(e)
          } finally {
            f.f()
          }
        }
        if (t._scenes = [], n.scenes) {
          var m, v = se(n.scenes);
          try {
            for (v.s(); !(m = v.n()).done;) {
              var H = m.value;
              t._scenes.push(new oe(H, n))
            }
          } catch (e) {
            v.e(e)
          } finally {
            v.f()
          }
        }
        if (t._nodes = [], n.nodes) {
          var b, y = se(n.nodes);
          try {
            for (y.s(); !(b = y.n()).done;) {
              var N = b.value;
              t._nodes.push(new re.default(N, n))
            }
          } catch (e) {
            y.e(e)
          } finally {
            y.f()
          }
          var g, _ = se(t._nodes);
          try {
            for (_.s(); !(g = _.n()).done;) {
              var w, k = g.value, x = (k._children = k._children.map(function (e) {
                return t._nodes[e]
              }), se(k._children));
              try {
                for (x.s(); !(w = x.n()).done;) w.value._parent = k
              } catch (e) {
                x.e(e)
              } finally {
                x.f()
              }
            }
          } catch (e) {
            _.e(e)
          } finally {
            _.f()
          }
          var C, S = se(t._scenes);
          try {
            for (S.s(); !(C = S.n()).done;) {
              var z = C.value;
              z._nodes = z._nodes.map(function (e) {
                return t._nodes[e]
              })
            }
          } catch (e) {
            S.e(e)
          } finally {
            S.f()
          }
        }
        if (t._meshes = [], n.meshes) {
          var B, M = se(n.meshes);
          try {
            for (M.s(); !(B = M.n()).done;) {
              var q = B.value, P = new ie.default(q, t._accessors);
              null !== P._material && (P._material = t._materials[P._material], P && P._material._normalTexture && P.calculateTangents()), t._meshes.push(P)
            }
          } catch (e) {
            M.e(e)
          } finally {
            M.f()
          }
        }
        if (t._skins = [], n.skins) {
          var V, E = se(n.skins);
          try {
            for (E.s(); !(V = E.n()).done;) {
              var R = V.value, O = new ae.default(R, t._accessors);
              O._skeleton = R.skeleton ? t._nodes[R.skeleton] : null, O._joints = R.joints.map(function (e) {
                return t._nodes[e]
              }), t._skins.push(O)
            }
          } catch (e) {
            E.e(e)
          } finally {
            E.f()
          }
        }
        var U, j = se(t._nodes);
        try {
          for (j.s(); !(U = j.n()).done;) {
            var A = U.value;
            void 0 !== A._mesh && (A._mesh = t._meshes[A._mesh]), void 0 !== A._skin && (A._skin = t._skins[A._skin])
          }
        } catch (e) {
          j.e(e)
        } finally {
          j.f()
        }
        if (t._animations = [], n.animations) {
          var G, T = se(n.animations);
          try {
            for (T.s(); !(G = T.n()).done;) {
              var W, X = G.value, Y = new ne.default(X, t._accessors), D = se(Y._channels);
              try {
                for (D.s(); !(W = D.n()).done;) {
                  var Z = W.value;
                  Z._target._node = t._nodes[Z._target._node]
                }
              } catch (e) {
                D.e(e)
              } finally {
                D.f()
              }
              t._animations.push(Y)
            }
          } catch (e) {
            T.e(e)
          } finally {
            T.f()
          }
          t._animationTime = 0
        }
        return void 0 !== n.scene ? t._scene = t._scenes[n.scene] : t._scene = t._scenes[0] || new oe({name: "undefined"}), t.pluginName = "SkinnedMeshRenderer", t._matrix = new c2d.geom.mat4.create, t
      }

      return (0, o.default)($, [{
        key: "getNodeByName", value: function (e) {
          var t, n = se(this._nodes);
          try {
            for (n.s(); !(t = n.n()).done;) {
              var r = t.value;
              if (r._name === e) return r
            }
          } catch (e) {
            n.e(e)
          } finally {
            n.f()
          }
          return null
        }
      }, {
        key: "_renderWebGL", value: function (e) {
          e.setObjectRenderer(e.plugins[this.pluginName]);
          var t, n = se(this._scene._nodes);
          try {
            for (n.s(); !(t = n.n()).done;) {
              var r = t.value;
              this.renderNode(r, e.plugins[this.pluginName])
            }
          } catch (e) {
            n.e(e)
          } finally {
            n.f()
          }
        }
      }, {
        key: "renderNode", value: function (e, t) {
          e._mesh && t.render(e, this._matrix);
          var n, r = se(e._children);
          try {
            for (r.s(); !(n = r.n()).done;) {
              var i = n.value;
              this.renderNode(i, t)
            }
          } catch (e) {
            r.e(e)
          } finally {
            r.f()
          }
        }
      }, {
        key: "update", value: function (e) {
          if (this._animationTime += e / 1e3 * c2d.timescale, this._animations && 1 <= this._animations.length) {
            var t, e = this._animations[0], n = se(e._samplers);
            try {
              for (n.s(); !(t = n.n()).done;) t.value.getValueAt(this._animationTime)
            } catch (e) {
              n.e(e)
            } finally {
              n.f()
            }
            var r, i = se(e._channels);
            try {
              for (i.s(); !(r = i.n()).done;) {
                var a = r.value, s = a._sampler, o = a._target._node;
                switch (a._target._path) {
                  case"rotation":
                    c2d.geom.quat.copy(o._rotation, s._curValue);
                    break;
                  case"translation":
                    c2d.geom.vec3.copy(o._translation, s._curValue);
                    break;
                  case"scale":
                    c2d.geom.vec3.copy(o._scale, s._curValue)
                }
                o._worldMatrixDirty = !0
              }
            } catch (e) {
              i.e(e)
            } finally {
              i.f()
            }
          }
        }
      }]), $
    }(PIXI.Container);
    n.default = r
  }, {
    "./Accessor.js": 80,
    "./Animation.js": 81,
    "./BufferView.js": 82,
    "./Material.js": 83,
    "./Mesh.js": 84,
    "./Node.js": 85,
    "./Renderer.js": 86,
    "./Skin.js": 87,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  90: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      a = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/inherits")),
      i = r(e("@babel/runtime/helpers/possibleConstructorReturn")), l = r(e("@babel/runtime/helpers/getPrototypeOf"));

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
        return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, i.default)(this, e)
      }
    }

    r = function (e) {
      (0, o.default)(i, e);
      var t = u(i);

      function i() {
        return (0, a.default)(this, i), t.apply(this, arguments)
      }

      return (0, s.default)(i, null, [{
        key: "create", value: function (e, t, n) {
          var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "left";
          return new i(e, {font: "".concat(t, "px Arial"), fill: n, align: r})
        }
      }, {
        key: "fromConfig", value: function (e) {
          return i.create(e.text, e.size, e.color)
        }
      }]), i
    }(PIXI.Text);
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  91: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      a = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/get")),
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

    function h(i, a) {
      var s = a.dispatch;
      a.dispatch = function () {
        for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
        s.apply(a, n), i._dispatcher && (e = i._dispatcher).dispatch.apply(e, n)
      }, a.on("removed", function (e) {
        a.dispatch = s
      })
    }

    r = function (e) {
      (0, l.default)(i, e);
      var t = c(i);

      function i() {
        var e;
        return (0, a.default)(this, i), (e = t.call(this))._respack = null, e.visible = !1, e._dispatcher = null, e
      }

      return (0, s.default)(i, [{
        key: "initialize", value: function (e) {
          this._respack = e, this.onInitialize()
        }
      }, {
        key: "show", value: function () {
          this.visible = !0, this.onShow()
        }
      }, {
        key: "hide", value: function () {
          this.onHide(), this.visible = !1
        }
      }, {
        key: "update", value: function (e) {
        }
      }, {
        key: "addChild", value: function (e) {
          (0, o.default)((0, u.default)(i.prototype), "addChild", this).call(this, e), e instanceof i || h(this, e)
        }
      }, {
        key: "addChildAt", value: function (e, t) {
          (0, o.default)((0, u.default)(i.prototype), "addChildAt", this).call(this, e, t), e instanceof i || h(this, e)
        }
      }, {
        key: "dispatch", value: function () {
          for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
          (e = (0, o.default)((0, u.default)(i.prototype), "dispatch", this)).call.apply(e, [this].concat(n)), this._dispatcher && (e = this._dispatcher).dispatch.apply(e, n)
        }
      }, {
        key: "dispatcher", set: function (e) {
          this._dispatcher = e
        }
      }, {
        key: "onInitialize", value: function () {
        }
      }, {
        key: "onShow", value: function () {
        }
      }, {
        key: "onHide", value: function () {
        }
      }]), i
    }(PIXI.Container);
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/get": 9,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  92: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass"));
    n.default = function () {
      function r(e, t, n) {
        (0, i.default)(this, r), this._name = e, this._target = t, this._data = n, Object.seal(this)
      }

      return (0, a.default)(r, [{
        key: "name", get: function () {
          return this._name
        }
      }, {
        key: "target", get: function () {
          return this._target
        }
      }, {
        key: "data", get: function () {
          return this._data
        }, set: function (e) {
          this._data = e
        }
      }]), r
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  93: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), l = r(e("@babel/runtime/helpers/get")),
      s = r(e("@babel/runtime/helpers/inherits")), o = r(e("@babel/runtime/helpers/possibleConstructorReturn")),
      u = r(e("@babel/runtime/helpers/getPrototypeOf")), c = r(e("./Event.js"));

    function h(e, t) {
      var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!r) {
        if (Array.isArray(e) || (r = function (e, t) {
          if (e) {
            if ("string" == typeof e) return d(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? d(e, t) : void 0
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
      var i, a = !0, s = !1;
      return {
        s: function () {
          r = r.call(e)
        }, n: function () {
          var e = r.next();
          return a = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            a || null == r.return || r.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function d(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

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
        var e, t = (0, u.default)(n);
        return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, o.default)(this, e)
      }
    }

    function p(e, t) {
      this.fn = e, this.context = t, this.once = !1
    }

    r = PIXI.utils.EventEmitter, r.prototype.owner = null, r.prototype.dispatch = function (e, t) {
      return "string" == typeof e && (e = new c.default(e, this.owner || this, t)), this.emit(e.name, e)
    }, r.prototype.subscribe = r.prototype.on, r.prototype.unsubscribe = r.prototype.off, e = function (e) {
      (0, s.default)(o, e);
      var n = f(o);

      function o(e) {
        var t;
        return (0, i.default)(this, o), (t = n.call(this))._anyListeners = [], t
      }

      return (0, a.default)(o, [{
        key: "emit", value: function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
          var r, i = (i = (0, l.default)((0, u.default)(o.prototype), "emit", this)).call.apply(i, [this].concat(t)),
            a = (t.shift(), h(this._anyListeners));
          try {
            for (a.s(); !(r = a.n()).done;) {
              var s = r.value;
              s.fn.apply(s.context, t)
            }
          } catch (e) {
            a.e(e)
          } finally {
            a.f()
          }
          return i
        }
      }, {
        key: "subscribeAny", value: function (e) {
          return this._anyListeners.push(new p(e, 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this)), this
        }
      }, {
        key: "unsubscribeAny", value: function (e) {
          var t, n = [], r = h(this._anyListeners);
          try {
            for (r.s(); !(t = r.n()).done;) {
              var i = t.value;
              i.context === e && n.push(i)
            }
          } catch (e) {
            r.e(e)
          } finally {
            r.f()
          }
          for (var a = 0, s = n; a < s.length; a++) {
            var o = s[a];
            this._anyListeners.remove(o)
          }
          return this
        }
      }]), o
    }(PIXI.utils.EventEmitter);
    n.default = e
  }, {
    "./Event.js": 92,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/get": 9,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  94: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass"));

    function s(e, t) {
      this.cb = e, this.once = t || !1
    }

    var l = function () {
      function r(e, t, n) {
        (0, i.default)(this, r), this._name = e, this._data = t, this._finish = n, this._lockCount = 0
      }

      return (0, a.default)(r, [{
        key: "name", get: function () {
          return this._name
        }
      }, {
        key: "data", get: function () {
          return this._data
        }
      }, {
        key: "lock", value: function () {
          this._lockCount++
        }
      }, {
        key: "unlock", value: function () {
          this._lockCount <= 0 ? console.warn("Unlock not locked event:", this._name) : this._lockCount--, 0 === this._lockCount && this._finish && this._finish(this)
        }
      }, {
        key: "locked", get: function () {
          return !!this._lockCount
        }
      }]), r
    }(), r = function () {
      function e() {
        (0, i.default)(this, e), this._listeners = {}, Object.seal(this)
      }

      return (0, a.default)(e, [{
        key: "dispatch", value: function (e, t, n) {
          c2d.env.DEBUG_EVENTS && console.log(e, t);
          var r = [game.events.FlatUI.SKIP_WIN_PRESSED, game.events.FlatUI.QUICK_STOP_PRESSED];
          if (!r.includes(e) || c2d.env.enableSkips) {
            var i = this._listeners[e];
            if (i) {
              for (var a = new l(e, t, n), s = 0; s < i.length;) {
                var o = i[s];
                o.cb(a), o.once ? i.splice(s, 1) : ++s
              }
              a.locked || n && n()
            } else n && n()
          }
        }
      }, {
        key: "subscribe", value: function (e, t) {
          this._addListener(e, new s(t))
        }
      }, {
        key: "subscribeOnce", value: function (e, t) {
          this._addListener(e, new s(t, !0))
        }
      }, {
        key: "_addListener", value: function (e, t) {
          this._listeners[e] ? this._listeners[e].push(t) : this._listeners[e] = [t]
        }
      }, {
        key: "unsubscribe", value: function (e, t) {
          var n = this._listeners[e];
          if (n) for (var r = 0; r < n.length;) n[r].cb === t ? n.splice(r, 1) : ++r
        }
      }]), e
    }();
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  95: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass"));
    n.default = function () {
      function e() {
        (0, i.default)(this, e), this._states = {}, this._transitions = {}, this._firstStateId = ""
      }

      return (0, a.default)(e, [{
        key: "addState", value: function (e) {
          if (this._states[e.id]) throw new Error("FSMConfiguration: state with id [".concat(e.id, "] is already added!"));
          this._states[e.id] = e
        }
      }, {
        key: "removeState", value: function (e) {
          delete this._states[e]
        }
      }, {
        key: "states", get: function () {
          return this._states
        }
      }, {
        key: "addTransition", value: function (e) {
          if (!this._states[e.from]) throw new Error("FSMConfiguration: state with id [".concat(e.from, "] not registered!"));
          if (!this._states[e.to]) throw new Error("FSMConfiguration: state with id [".concat(e.to, "] not registered!"));
          this._transitions[e.key] = e
        }
      }, {
        key: "removeTransition", value: function (e, t) {
          delete this._transitions[e + t]
        }
      }, {
        key: "transitions", get: function () {
          return this._transitions
        }
      }, {
        key: "firstStateId", get: function () {
          return this._firstStateId
        }, set: function (e) {
          this._firstStateId = e
        }
      }]), e
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  96: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/inherits")),
      a = r(e("@babel/runtime/helpers/possibleConstructorReturn")), l = r(e("@babel/runtime/helpers/getPrototypeOf")),
      u = r(e("./../event/EventDispatcher.js")), c = r(e("./StateTransition.js")), h = r(e("../utils/Timeout.js"));

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
        var e, t = (0, l.default)(n);
        return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, a.default)(this, e)
      }
    }

    r = function (e) {
      (0, o.default)(a, e);
      var n = d(a);

      function a(e) {
        var t;
        return (0, i.default)(this, a), (t = n.call(this))._name = e, t._initialized = !1, t._firstStateId = null, t._currentState = null, t._states = {}, t._transitions = {}, t._isChangingNow = !1, t._statesQueue = [], t
      }

      return (0, s.default)(a, [{
        key: "initialize", value: function (e) {
          if (!this._initialized) {
            for (var t in this._states = e.states, this._transitions = e.transitions, this._firstStateId = e.firstStateId, this._states) this._states[t].initialize(this);
            this._initialized = !0
          }
        }
      }, {
        key: "update", value: function (e) {
          this._initialized && this._currentState && this._currentState.update(e)
        }
      }, {
        key: "changeState", value: function (e) {
          var t = this, n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
          if (!this._initialized) throw new Error("FSM: isn't initialized!");
          if (this._isChangingNow) this._statesQueue.push({id: e, params: n}); else {
            this._isChangingNow = !0;
            var r = this._getStateById(e);
            if (!r) throw new Error("FSM: state with id [".concat(e, "] not found!"));
            if (this._currentState && !this._isTransitionValid(this._currentState, r)) throw new Error("FSM: transition from [".concat(this._currentState.id, "] to [").concat(r.id, "] not registered!"));
            r && !r.initialized && r.initialize(this);
            var i = this._currentState ? this._currentState.id : "NONE";
            this.dispatch(a.Events.STATE_WILL_CHANGE, {
              name: this._name,
              newState: r.id,
              prevState: i
            }), this._currentState && this._currentState.exit(), h.default.invoke(function () {
              var e;
              t._currentState = r, t._currentState.params = n, t._currentState.enter(), t.dispatch(a.Events.STATE_DID_CHANGE, {
                name: t._name,
                newState: t._currentState.id,
                prevState: i
              }), t._isChangingNow = !1, 0 < t._statesQueue.length && (e = t._statesQueue.shift(), t.changeState(e.id, e.params))
            })
          }
        }
      }, {
        key: "start", value: function () {
          this.changeState(this._firstStateId)
        }
      }, {
        key: "name", get: function () {
          return this._name
        }
      }, {
        key: "isInitialized", get: function () {
          return this._initialized
        }
      }, {
        key: "currentState", get: function () {
          return this._currentState
        }
      }, {
        key: "_getStateById", value: function (e) {
          var t = this._states[e];
          return t || console.warn("FSM: state with id [".concat(e, "] not found!")), t
        }
      }, {
        key: "_isTransitionValid", value: function (e, t) {
          e = c.default.keyFromIds(e.id, t.id);
          return void 0 !== this._transitions[e]
        }
      }]), a
    }(u.default);
    (n.default = r).Events = {
      STATE_WILL_CHANGE: "FSM.STATE_WILL_CHANGE",
      STATE_DID_CHANGE: "FSM.STATE_DID_CHANGE",
      STATE_PHASE_DID_CHANGE: "FSM.STATE_PHASE_DID_CHANGE"
    }
  }, {
    "../utils/Timeout.js": 134,
    "./../event/EventDispatcher.js": 93,
    "./StateTransition.js": 98,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  97: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("./FSM.js"));
    n.default = function () {
      function t(e) {
        (0, i.default)(this, t), this._id = e, this._fsm = null, this._params = null, this._initialized = !1, this._currentPhase = "nophase", this.PHASES = {
          ENTER: "enter",
          EXIT: "exit"
        }
      }

      return (0, a.default)(t, [{
        key: "initialize", value: function (e) {
          var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
          this._fsm = e, this._params = t, this._initialized = !0
        }
      }, {
        key: "enter", value: function () {
          this.enterPhase()
        }
      }, {
        key: "update", value: function (e) {
        }
      }, {
        key: "exit", value: function () {
          this.exitPhase()
        }
      }, {
        key: "changeState", value: function (e) {
          this._fsm.changeState(e, 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null)
        }
      }, {
        key: "registerPhases", value: function (e) {
          this.PHASES = Object.assign(this.PHASES, e)
        }
      }, {
        key: "enterPhase", value: function () {
          this._setPhase(this.PHASES.ENTER)
        }
      }, {
        key: "exitPhase", value: function () {
          this._setPhase(this.PHASES.EXIT)
        }
      }, {
        key: "setPhase", value: function (e, t) {
          if (Object.values && !Object.values(this.PHASES).contains(e)) throw new Error("FSM: I don't' know what is the phase " + e + ". RegisteredPhases: [" + JSON.stringify(this.PHASES) + "]");
          return this._setPhase(e, t)
        }
      }, {
        key: "_setPhase", value: function (e, t) {
          var n = this._currentPhase;
          return this._currentPhase = e, this._fsm.dispatch(s.default.Events.STATE_PHASE_DID_CHANGE, Object.assign({
            name: this._fsm._name,
            stateId: this.id,
            newPhase: e,
            prevPhase: n,
            phaseData: t
          }, t))
        }
      }, {
        key: "currentPhase", get: function () {
          return this._currentPhase
        }
      }, {
        key: "id", get: function () {
          return this._id
        }
      }, {
        key: "initialized", get: function () {
          return this._initialized
        }
      }, {
        key: "params", get: function () {
          return this._params
        }, set: function (e) {
          this._params = e
        }
      }]), t
    }()
  }, {
    "./FSM.js": 96,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  98: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass"));
    n.default = function () {
      function n(e, t) {
        (0, i.default)(this, n), this._from = e, this._to = t
      }

      return (0, a.default)(n, [{
        key: "from", get: function () {
          return this._from
        }
      }, {
        key: "to", get: function () {
          return this._to
        }
      }, {
        key: "key", get: function () {
          return n.keyFromIds(this._from, this._to)
        }
      }], [{
        key: "keyFromIds", value: function (e, t) {
          return "".concat(e, "=>").concat(t)
        }
      }]), n
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  99: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("./primitives/Point.js"))),
      a = r(e("./primitives/Line.js")), s = r(e("./primitives/Rectangle.js")), o = r(e("./primitives/Curve.js")),
      l = r(e("./primitives/Vector.js")), u = r(e("./primitives/Vec2.js")), c = r(e("./primitives/Vec3.js")),
      h = r(e("./primitives/Quaternion.js")), r = r(e("./primitives/Mat4.js")), e = {};
    e.Point = i.default, e.Line = a.default, e.Rectangle = s.default, e.Curve = o.default, e.Vector = l.default, e.vec2 = u.default, e.vec3 = c.default, e.quat = h.default, e.mat4 = r.default, e.Circle = PIXI.Circle, e.Polygon = PIXI.Polygon, n.default = e
  }, {
    "./primitives/Curve.js": 100,
    "./primitives/Line.js": 101,
    "./primitives/Mat4.js": 102,
    "./primitives/Point.js": 103,
    "./primitives/Quaternion.js": 104,
    "./primitives/Rectangle.js": 105,
    "./primitives/Vec2.js": 106,
    "./primitives/Vec3.js": 107,
    "./primitives/Vector.js": 108,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  100: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/createClass"))),
      a = r(e("@babel/runtime/helpers/classCallCheck"));
    n.default = (0, i.default)(function e(t, n, r) {
      (0, a.default)(this, e), this.a = t, this.anchor = n, this.b = r, Object.seal(this)
    })
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  101: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), h = r(e("./Point.js")), r = function () {
        function n(e, t) {
          (0, i.default)(this, n), this.a = e, this.b = t, Object.seal(this)
        }

        return (0, a.default)(n, [{
          key: "getLineIntersectionPoint", value: function (e) {
            var t = this.a.x, n = this.a.y, r = this.b.x, i = this.b.y, a = e.a.x, s = e.a.y, r = r - t, i = i - n,
              o = e.b.x - a, e = e.b.y - s, l = r * e - o * i;
            if (0 == l) return null;
            var u, c = 0 < l;
            return (u = r * (s = n - s) - i * (a = t - a)) < 0 == c || (o = o * s - e * a) < 0 == c || l < u == c || l < o == c ? null : new h.default(t + (s = o / l) * r, n + s * i)
          }
        }], [{
          key: "create", value: function (e, t) {
            return new n(e, t)
          }
        }]), n
      }();
    n.default = r
  }, {
    "./Point.js": 103,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  102: [function (e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
    n.default = {
      create: function () {
        var e = new Float32Array(16);
        return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
      }, clone: function (e) {
        var t = new Float32Array(16);
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
      }, copy: function (e, t) {
        return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
      }, perspective: function (e, t, n, r, i) {
        var t = 1 / Math.tan(t / 2), a = 1 / (r - i);
        return e[0] = t / n, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = t, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = (i + r) * a, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = 2 * i * r * a, e[15] = 0, e
      }, lookAt: function (e, t, n, r) {
        var i = void 0, a = void 0, s = void 0, o = void 0, l = void 0, u = void 0, c = void 0, h = void 0, d = t[0],
          f = t[1], t = t[2], p = r[0], m = r[1], r = r[2], v = n[0], b = n[1], n = n[2];
        return Math.abs(d - v) < 1e-6 && Math.abs(f - b) < 1e-6 && Math.abs(t - n) < 1e-6 ? mat4.identity(e) : (v = d - v, b = f - b, c = t - n, i = m * (c *= h = 1 / Math.sqrt(v * v + b * b + c * c)) - r * (b *= h), a = r * (v *= h) - p * c, s = p * b - m * v, (h = Math.sqrt(i * i + a * a + s * s)) ? (i *= h = 1 / h, a *= h, s *= h) : s = a = i = 0, o = b * s - c * a, l = c * i - v * s, u = v * a - b * i, (h = Math.sqrt(o * o + l * l + u * u)) ? (o *= h = 1 / h, l *= h, u *= h) : u = l = o = 0, e[0] = i, e[1] = o, e[2] = v, e[3] = 0, e[4] = a, e[5] = l, e[6] = b, e[7] = 0, e[8] = s, e[9] = u, e[10] = c, e[11] = 0, e[12] = -(i * d + a * f + s * t), e[13] = -(o * d + l * f + u * t), e[14] = -(v * d + b * f + c * t), e[15] = 1, e)
      }, ortho: function (e, t, n, r, i, a, s) {
        var o = 1 / (t - n), l = 1 / (r - i), u = 1 / (a - s);
        return e[0] = -2 * o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * l, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * u, e[11] = 0, e[12] = (t + n) * o, e[13] = (i + r) * l, e[14] = (s + a) * u, e[15] = 1, e
      }, transpose: function (e, t) {
        var n, r, i, a, s, o;
        return e === t ? (n = t[1], r = t[2], i = t[3], a = t[6], s = t[7], o = t[11], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = n, e[6] = t[9], e[7] = t[13], e[8] = r, e[9] = a, e[11] = t[14], e[12] = i, e[13] = s, e[14] = o) : (e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15]), e
      }, invert: function (e, t) {
        var n = t[0], r = t[1], i = t[2], a = t[3], s = t[4], o = t[5], l = t[6], u = t[7], c = t[8], h = t[9],
          d = t[10], f = t[11], p = t[12], m = t[13], v = t[14], t = t[15], b = n * o - r * s, y = n * l - i * s,
          g = n * u - a * s, _ = r * l - i * o, w = r * u - a * o, k = i * u - a * l, x = c * m - h * p,
          C = c * v - d * p, S = c * t - f * p, M = h * v - d * m, P = h * t - f * m, E = d * t - f * v,
          R = b * E - y * P + g * M + _ * S - w * C + k * x;
        return R ? (e[0] = (o * E - l * P + u * M) * (R = 1 / R), e[1] = (i * P - r * E - a * M) * R, e[2] = (m * k - v * w + t * _) * R, e[3] = (d * w - h * k - f * _) * R, e[4] = (l * S - s * E - u * C) * R, e[5] = (n * E - i * S + a * C) * R, e[6] = (v * g - p * k - t * y) * R, e[7] = (c * k - d * g + f * y) * R, e[8] = (s * P - o * S + u * x) * R, e[9] = (r * S - n * P - a * x) * R, e[10] = (p * w - m * g + t * b) * R, e[11] = (h * g - c * w - f * b) * R, e[12] = (o * C - s * M - l * x) * R, e[13] = (n * M - r * C + i * x) * R, e[14] = (m * y - p * _ - v * b) * R, e[15] = (c * _ - h * y + d * b) * R, e) : null
      }, multiply: function (e, t, n) {
        var r = t[0], i = t[1], a = t[2], s = t[3], o = t[4], l = t[5], u = t[6], c = t[7], h = t[8], d = t[9],
          f = t[10], p = t[11], m = t[12], v = t[13], b = t[14], t = t[15], y = n[0], g = n[1], _ = n[2], w = n[3];
        return e[0] = y * r + g * o + _ * h + w * m, e[1] = y * i + g * l + _ * d + w * v, e[2] = y * a + g * u + _ * f + w * b, e[3] = y * s + g * c + _ * p + w * t, y = n[4], g = n[5], _ = n[6], w = n[7], e[4] = y * r + g * o + _ * h + w * m, e[5] = y * i + g * l + _ * d + w * v, e[6] = y * a + g * u + _ * f + w * b, e[7] = y * s + g * c + _ * p + w * t, y = n[8], g = n[9], _ = n[10], w = n[11], e[8] = y * r + g * o + _ * h + w * m, e[9] = y * i + g * l + _ * d + w * v, e[10] = y * a + g * u + _ * f + w * b, e[11] = y * s + g * c + _ * p + w * t, y = n[12], g = n[13], _ = n[14], w = n[15], e[12] = y * r + g * o + _ * h + w * m, e[13] = y * i + g * l + _ * d + w * v, e[14] = y * a + g * u + _ * f + w * b, e[15] = y * s + g * c + _ * p + w * t, e
      }, translate: function (e, t, n) {
        var r, i, a, s, o, l, u, c, h, d, f, p, m = n[0], v = n[1], n = n[2];
        return t === e ? (e[12] = t[0] * m + t[4] * v + t[8] * n + t[12], e[13] = t[1] * m + t[5] * v + t[9] * n + t[13], e[14] = t[2] * m + t[6] * v + t[10] * n + t[14], e[15] = t[3] * m + t[7] * v + t[11] * n + t[15]) : (r = t[0], i = t[1], a = t[2], s = t[3], o = t[4], l = t[5], u = t[6], c = t[7], h = t[8], d = t[9], f = t[10], p = t[11], e[0] = r, e[1] = i, e[2] = a, e[3] = s, e[4] = o, e[5] = l, e[6] = u, e[7] = c, e[8] = h, e[9] = d, e[10] = f, e[11] = p, e[12] = r * m + o * v + h * n + t[12], e[13] = i * m + l * v + d * n + t[13], e[14] = a * m + u * v + f * n + t[14], e[15] = s * m + c * v + p * n + t[15]), e
      }, rotate: function (e, t, n, r) {
        var i, a, s, o, l, u, c, h, d, f, p, m, v, b, y, g, _, w, k, x, C = r[0], S = r[1], r = r[2],
          M = Math.sqrt(C * C + S * S + r * r);
        return Math.abs(M) < glMatrix.EPSILON ? null : (C *= M = 1 / M, S *= M, r *= M, M = Math.sin(n), n = Math.cos(n), a = t[0], s = t[1], o = t[2], l = t[3], u = t[4], c = t[5], h = t[6], d = t[7], f = t[8], p = t[9], m = t[10], v = t[11], y = C * S * (i = 1 - n) - r * M, g = S * S * i + n, _ = r * S * i + C * M, w = C * r * i + S * M, k = S * r * i - C * M, x = r * r * i + n, e[0] = a * (n = C * C * i + n) + u * (b = S * C * i + r * M) + f * (r = r * C * i - S * M), e[1] = s * n + c * b + p * r, e[2] = o * n + h * b + m * r, e[3] = l * n + d * b + v * r, e[4] = a * y + u * g + f * _, e[5] = s * y + c * g + p * _, e[6] = o * y + h * g + m * _, e[7] = l * y + d * g + v * _, e[8] = a * w + u * k + f * x, e[9] = s * w + c * k + p * x, e[10] = o * w + h * k + m * x, e[11] = l * w + d * k + v * x, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e)
      }, scale: function (e, t, n) {
        var r = n[0], i = n[1], n = n[2];
        return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * i, e[5] = t[5] * i, e[6] = t[6] * i, e[7] = t[7] * i, e[8] = t[8] * n, e[9] = t[9] * n, e[10] = t[10] * n, e[11] = t[11] * n, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
      }, rotateX: function (e, t, n) {
        var r = Math.sin(n), n = Math.cos(n), i = t[4], a = t[5], s = t[6], o = t[7], l = t[8], u = t[9], c = t[10],
          h = t[11];
        return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[4] = i * n + l * r, e[5] = a * n + u * r, e[6] = s * n + c * r, e[7] = o * n + h * r, e[8] = l * n - i * r, e[9] = u * n - a * r, e[10] = c * n - s * r, e[11] = h * n - o * r, e
      }, rotateY: function (e, t, n) {
        var r = Math.sin(n), n = Math.cos(n), i = t[0], a = t[1], s = t[2], o = t[3], l = t[8], u = t[9], c = t[10],
          h = t[11];
        return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = i * n - l * r, e[1] = a * n - u * r, e[2] = s * n - c * r, e[3] = o * n - h * r, e[8] = i * r + l * n, e[9] = a * r + u * n, e[10] = s * r + c * n, e[11] = o * r + h * n, e
      }, rotateZ: function (e, t, n) {
        var r = Math.sin(n), n = Math.cos(n), i = t[0], a = t[1], s = t[2], o = t[3], l = t[4], u = t[5], c = t[6],
          h = t[7];
        return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = i * n + l * r, e[1] = a * n + u * r, e[2] = s * n + c * r, e[3] = o * n + h * r, e[4] = l * n - i * r, e[5] = u * n - a * r, e[6] = c * n - s * r, e[7] = h * n - o * r, e
      }, fromRotationTranslation: function (e, t, n) {
        var r = t[0], i = t[1], a = t[2], t = t[3], s = a + a, o = r * (c = r + r), l = r * (h = i + i), r = r * s,
          u = i * h, i = i * s, a = a * s, c = t * c, h = t * h, t = t * s;
        return e[0] = 1 - (u + a), e[1] = l + t, e[2] = r - h, e[3] = 0, e[4] = l - t, e[5] = 1 - (o + a), e[6] = i + c, e[7] = 0, e[8] = r + h, e[9] = i - c, e[10] = 1 - (o + u), e[11] = 0, e[12] = n[0], e[13] = n[1], e[14] = n[2], e[15] = 1, e
      }, getTranslation: function (e, t) {
        return e[0] = t[12], e[1] = t[13], e[2] = t[14], e
      }, getScaling: function (e, t) {
        var n = t[0], r = t[1], i = t[2], a = t[4], s = t[5], o = t[6], l = t[8], u = t[9], t = t[10];
        return e[0] = Math.sqrt(n * n + r * r + i * i), e[1] = Math.sqrt(a * a + s * s + o * o), e[2] = Math.sqrt(l * l + u * u + t * t), e
      }, getRotation: function (e, t) {
        var n = t[0] + t[5] + t[10], r = 0;
        return 0 < n ? (r = 2 * Math.sqrt(n + 1), e[3] = .25 * r, e[0] = (t[6] - t[9]) / r, e[1] = (t[8] - t[2]) / r, e[2] = (t[1] - t[4]) / r) : t[0] > t[5] & t[0] > t[10] ? (r = 2 * Math.sqrt(1 + t[0] - t[5] - t[10]), e[3] = (t[6] - t[9]) / r, e[0] = .25 * r, e[1] = (t[1] + t[4]) / r, e[2] = (t[8] + t[2]) / r) : t[5] > t[10] ? (r = 2 * Math.sqrt(1 + t[5] - t[0] - t[10]), e[3] = (t[8] - t[2]) / r, e[0] = (t[1] + t[4]) / r, e[1] = .25 * r, e[2] = (t[6] + t[9]) / r) : (r = 2 * Math.sqrt(1 + t[10] - t[0] - t[5]), e[3] = (t[1] - t[4]) / r, e[0] = (t[8] + t[2]) / r, e[1] = (t[6] + t[9]) / r, e[2] = .25 * r), e
      }
    }
  }, {}],
  103: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/inherits")),
      o = r(e("@babel/runtime/helpers/possibleConstructorReturn")), l = r(e("@babel/runtime/helpers/getPrototypeOf"));

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
        return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, o.default)(this, e)
      }
    }

    r = function (e) {
      (0, s.default)(n, e);
      var t = u(n);

      function n() {
        return (0, i.default)(this, n), t.apply(this, arguments)
      }

      return (0, a.default)(n, [{
        key: "isInsideRectangle", value: function (e) {
          return this.x > e.x && this.x < e.x + e.width && this.y > e.y && this.y < e.y + e.height
        }
      }], [{
        key: "create", value: function (e, t) {
          return new n(e, t)
        }
      }, {
        key: "from", value: function (e) {
          return new n((e = e || n.ZERO).x, e.y)
        }
      }, {
        key: "ZERO", get: function () {
          return new n(0, 0)
        }
      }, {
        key: "distance", value: function (e, t) {
          return Math.sqrt((e.x - t.x) * (e.x - t.x) + (e.y - t.y) * (e.y - t.y))
        }
      }]), n
    }(PIXI.Point);
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  104: [function (e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, n.default = {
      create: function () {
        var e = new Float32Array(4);
        return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e
      }, copy: function (e, t) {
        return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e
      }, clone: function (e) {
        var t = new glMatrix.ARRAY_TYPE(4);
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
      }, slerp: function (e, t, n, r) {
        var i, a = t[0], s = t[1], o = t[2], t = t[3], l = n[0], u = n[1], c = n[2], n = n[3], h = void 0, d = void 0,
          f = void 0;
        return (h = a * l + s * u + o * c + t * n) < 0 && (h = -h, l = -l, u = -u, c = -c, n = -n), f = 1e-6 < 1 - h ? (h = Math.acos(h), i = Math.sin(h), d = Math.sin((1 - r) * h) / i, Math.sin(r * h) / i) : (d = 1 - r, r), e[0] = d * a + f * l, e[1] = d * s + f * u, e[2] = d * o + f * c, e[3] = d * t + f * n, e
      }, fromEuler: function (e, t, n, r) {
        var i = .5 * Math.PI / 180, i = (t *= i, n *= i, r *= i, Math.sin(t)), t = Math.cos(t), a = Math.sin(n),
          n = Math.cos(n), s = Math.sin(r), r = Math.cos(r);
        return e[0] = i * n * r - t * a * s, e[1] = t * a * r + i * n * s, e[2] = t * n * s - i * a * r, e[3] = t * n * r + i * a * s, e
      }
    }
  }, {}],
  105: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      a = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      s = r(e("@babel/runtime/helpers/createClass")), o = r(e("@babel/runtime/helpers/inherits")),
      i = r(e("@babel/runtime/helpers/possibleConstructorReturn")), l = r(e("@babel/runtime/helpers/getPrototypeOf")),
      d = r(e("./Point.js")), f = r(e("./Line.js"));

    function p(e, t) {
      var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!r) {
        if (Array.isArray(e) || (r = function (e, t) {
          if (e) {
            if ("string" == typeof e) return u(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? u(e, t) : void 0
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
      var i, a = !0, s = !1;
      return {
        s: function () {
          r = r.call(e)
        }, n: function () {
          var e = r.next();
          return a = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            a || null == r.return || r.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function u(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

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
        var e, t = (0, l.default)(n);
        return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, i.default)(this, e)
      }
    }

    r = function (e) {
      (0, o.default)(i, e);
      var t = c(i);

      function i() {
        return (0, a.default)(this, i), t.apply(this, arguments)
      }

      return (0, s.default)(i, [{
        key: "getIntersectionPoints", value: function (e) {
          var t, n = f.default.create(d.default.create(this.x, this.y), d.default.create(this.x + this.width, this.y)),
            r = f.default.create(d.default.create(this.x + this.width, this.y), d.default.create(this.x + this.width, this.y + this.height)),
            i = f.default.create(d.default.create(this.x, this.y + this.height), d.default.create(this.x + this.width, this.y + this.height)),
            a = [f.default.create(d.default.create(this.x, this.y), d.default.create(this.x, this.y + this.height)), r, n, i],
            s = [], o = p(e);
          try {
            for (o.s(); !(t = o.n()).done;) {
              var l, u = t.value, c = p(a);
              try {
                for (c.s(); !(l = c.n()).done;) {
                  var h = l.value.getLineIntersectionPoint(u);
                  h && s.push(h)
                }
              } catch (e) {
                c.e(e)
              } finally {
                c.f()
              }
            }
          } catch (e) {
            o.e(e)
          } finally {
            o.f()
          }
          return s.sort(function (e, t) {
            return e.x - t.x
          }), [s.first, s.last]
        }
      }], [{
        key: "create", value: function (e, t, n, r) {
          return new i(e, t, n, r)
        }
      }]), i
    }(PIXI.Rectangle);
    n.default = r
  }, {
    "./Line.js": 101,
    "./Point.js": 103,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  106: [function (e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, n.default = {
      create: function () {
        var e = new Float32Array(2);
        return e[0] = 0, e[1] = 0, e
      }, clone: function (e) {
        var t = new Float32Array(2);
        return t[0] = e[0], t[1] = e[1], t
      }, copy: function (e, t) {
        return e[0] = t[0], e[1] = t[1], e
      }, set: function (e, t, n) {
        return e[0] = t, e[1] = n, e
      }, add: function (e, t, n) {
        return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e
      }, subtract: function (e, t, n) {
        return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e
      }
    }
  }, {}],
  107: [function (e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, n.default = {
      create: function () {
        var e = new Float32Array(3);
        return e[0] = 0, e[1] = 0, e[2] = 0, e
      }, fromValues: function (e, t, n) {
        var r = new Float32Array(3);
        return r[0] = e, r[1] = t, r[2] = n, r
      }, clone: function (e) {
        var t = new Float32Array(3);
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t
      }, copy: function (e, t) {
        return e[0] = t[0], e[1] = t[1], e[2] = t[2], e
      }, length: function (e) {
        var t = e[0], n = e[1], e = e[2];
        return Math.sqrt(t * t + n * n + e * e)
      }, set: function (e, t, n, r) {
        return e[0] = t, e[1] = n, e[2] = r, e
      }, add: function (e, t, n) {
        return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e
      }, subtract: function (e, t, n) {
        return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e[2] = t[2] - n[2], e
      }, scale: function (e, t, n) {
        return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e
      }, normalize: function (e, t) {
        var n = t[0], r = t[1], i = t[2];
        return 0 < (n = n * n + r * r + i * i) && (n = 1 / Math.sqrt(n), e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n), e
      }, lerp: function (e, t, n, r) {
        var i = t[0], a = t[1], t = t[2];
        return e[0] = i + r * (n[0] - i), e[1] = a + r * (n[1] - a), e[2] = t + r * (n[2] - t), e
      }
    }
  }, {}],
  108: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass"));
    n.default = function () {
      function n(e, t) {
        (0, i.default)(this, n), this.x = e || 0, this.y = t || 0
      }

      return (0, a.default)(n, [{
        key: "angle", get: function () {
          return Math.atan2(this.y, this.x)
        }, set: function (e) {
          var t = this.length;
          this.x = Math.cos(e) * t, this.y = Math.sin(e) * t
        }
      }, {
        key: "length", get: function () {
          return Math.sqrt(this.x * this.x + this.y * this.y)
        }, set: function (e) {
          var t = this.angle;
          this.x = Math.cos(t) * e, this.y = Math.sin(t) * e
        }
      }, {
        key: "add", value: function (e) {
          this.x += e.x, this.y += e.y
        }
      }, {
        key: "sub", value: function (e) {
          this.x -= e.x, this.y -= e.y
        }
      }, {
        key: "mult", value: function (e) {
          this.x *= e, this.y *= e
        }
      }, {
        key: "div", value: function (e) {
          this.x /= e, this.y /= e
        }
      }, {
        key: "mag", set: function (e) {
          this.normalize(), this.mult(e)
        }
      }, {
        key: "limit", value: function (e) {
          var t = this.x * this.x + this.y * this.y;
          e * e < t && (this.div(Math.sqrt(t)), this.mult(e))
        }
      }, {
        key: "normalize", value: function () {
          var e = this.length;
          this.x = this.x / e, this.y = this.y / e
        }
      }]), n
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  109: [function (e, I, L) {
    "use strict";
    var t = e("@babel/runtime/helpers/interopRequireDefault"), s = e("@babel/runtime/helpers/typeof"),
      n = t(e("./utils/boxtypes/ObjectBox.js")), r = t(e("./utils/boxtypes/ArrayBox.js")),
      i = (e("./utils/polyfill/String.js"), e("./utils/polyfill/Array.js"), e("./utils/polyfill/DevicePolyfill.js"), e("./utils/polyfill/Object.js"), e("./utils/polyfill/Math.js"), e("./utils/polyfill/Number.js"), e("./utils/polyfill/Pixi.js"), e("./utils/polyfill/Element.js"), t(e("./common/Environment.js"))),
      a = t(e("./common/Cookie.js")), o = t(e("./common/Localization.js")), l = t(e("./event/Event.js")),
      u = t(e("./event/EventDispatcher.js")), c = t(e("./event/EventManager.js")), h = t(e("./loader/AssetsLoader.js")),
      d = t(e("./loader/AssetsPacksLoader.js")), f = t(e("./loader/formats/threejs/Scene3DLoader.js")),
      p = t(e("./utils/Timeout.js")), m = function (e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || "object" !== s(e) && "function" != typeof e) return {default: e};
        t = A(t);
        if (t && t.has(e)) return t.get(e);
        var n, r = {}, i = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (n in e) {
          var a;
          "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && ((a = i ? Object.getOwnPropertyDescriptor(e, n) : null) && (a.get || a.set) ? Object.defineProperty(r, n, a) : r[n] = e[n])
        }
        r.default = e, t && t.set(e, r);
        return r
      }(e("./utils/Functions.js")), v = t(e("./utils/WindowFocus.js")), b = t(e("./geometry/index.js")),
      y = t(e("./display/index.js")), g = t(e("./tween/index.js")), _ = t(e("./animation/AnimationConfig.js")),
      w = t(e("./audio/AudioManager.js")), k = t(e("./fsm/FSM.js")), x = t(e("./fsm/Configuration.js")),
      C = t(e("./fsm/State.js")), S = t(e("./fsm/StateTransition.js")), M = t(e("./component/Component.js")),
      P = t(e("./controller/ComponentController.js")), E = t(e("./controller/Controller.js")),
      R = t(e("./controller/Model.js")), O = e("./component/ComponentFabric.js"),
      j = (e("./components/index.js"), t(e("./common/Engine.js"))), t = t(e("./common/FileManager.js"));

    function A(e) {
      if ("function" != typeof WeakMap) return null;
      var t = new WeakMap, n = new WeakMap;
      return (A = function (e) {
        return e ? n : t
      })(e)
    }

    var T, D = window.c2d || {about: {NAME: "CanaryEngine", VERSION: "1.0.1"}};
    D.env = i.default, D.cookie = a.default, D.utils = {
      ObjectBox: n.default,
      ArrayBox: r.default
    }, D.locale = new o.default, D.Event = l.default, D.EventDispatcher = u.default, D.eventManager = new c.default, D.loader = new h.default("", 100), D.packsLoader = new d.default, D.scene3DLoader = new f.default, D.Timeout = p.default, D.once = m.once, D.last = m.last, D.call = m.call, D.wait = m.wait, D.getUniqId = m.getUniqId, (0, v.default)(), D.geom = b.default, D.display = y.default, D.Tween = g.default, D.animationConfig = new _.default, D.SpineCache = {}, D.AudioManager = w.default, D.fsm = {
      FSM: k.default,
      Configuration: x.default,
      State: C.default,
      StateTransition: S.default
    }, D.documentEvents = {}, D.Component = M.default, D.ComponentController = P.default, D.Controller = E.default, D.Model = R.default, D.registerComponent = O.registerComponent, D.createComponent = O.createComponent, D.components = (0, O.getComponents)(), D.designSize = {error: "design size wasn't specified"}, D.designMinSize = {error: "design min size wasn't specified"}, D.getCanvasViewport = {error: "canvas size wasn't specified"}, D.sceneLayout = "base", D.createGame = function (e) {
      D.designSize = {
        width: e.designSize.width,
        height: e.designSize.height
      }, D.designMinSize = {
        width: e.minSize.width,
        height: e.minSize.height
      }, D.sceneLayout = e.layout || D.sceneLayout;
      var t = new j.default(e), n = (D.getCanvasViewport = function () {
        return t.getCanvasViewport(e.designSize)
      }, (e.minSize.width / e.minSize.height).toFixed(2));
      return n < 1.25 && console.warn("(application.json) minSize should be wider.\nExpected ratio:\t1.25\nCurrent ratio:\t" + n + "\nPlease increase WIDTH  or decrease HEIGHT. Or there are will be problems with UI."), t
    }, D.onDOMReady = function (e) {
      function t() {
        "complete" === document.readyState || "interactive" === document.readyState || "loaded" === document.readyState ? e() : document.addEventListener("DOMContentLoaded", e)
      }

      window.utils.allHTMLpreloaded ? t() : window.utils.onHTMLpreloaded = t
    }, D.FileManager = t.default, D.timescale = 1, D.screenParams = {
      paddingLeft: 0,
      canvasScaleCoef: 1,
      canvasWidth: 0,
      canvasHeight: 0
    }, Object.defineProperty(window, "c2d", {
      get: function () {
        return T
      }, set: function (e) {
        T = e
      }, enumerable: !1, configurable: !1
    }), D.engine = null, window.c2d = D, Object.seal(window.c2d)
  }, {
    "./animation/AnimationConfig.js": 29,
    "./audio/AudioManager.js": 32,
    "./common/Cookie.js": 34,
    "./common/Engine.js": 35,
    "./common/Environment.js": 36,
    "./common/FileManager.js": 37,
    "./common/Localization.js": 41,
    "./component/Component.js": 43,
    "./component/ComponentFabric.js": 44,
    "./components/index.js": 51,
    "./controller/ComponentController.js": 57,
    "./controller/Controller.js": 58,
    "./controller/Model.js": 60,
    "./display/index.js": 69,
    "./event/Event.js": 92,
    "./event/EventDispatcher.js": 93,
    "./event/EventManager.js": 94,
    "./fsm/Configuration.js": 95,
    "./fsm/FSM.js": 96,
    "./fsm/State.js": 97,
    "./fsm/StateTransition.js": 98,
    "./geometry/index.js": 99,
    "./loader/AssetsLoader.js": 111,
    "./loader/AssetsPacksLoader.js": 114,
    "./loader/formats/threejs/Scene3DLoader.js": 121,
    "./tween/index.js": 131,
    "./utils/Functions.js": 132,
    "./utils/Timeout.js": 134,
    "./utils/WindowFocus.js": 135,
    "./utils/boxtypes/ArrayBox.js": 136,
    "./utils/boxtypes/ObjectBox.js": 137,
    "./utils/polyfill/Array.js": 138,
    "./utils/polyfill/DevicePolyfill.js": 139,
    "./utils/polyfill/Element.js": 140,
    "./utils/polyfill/Math.js": 141,
    "./utils/polyfill/Number.js": 142,
    "./utils/polyfill/Object.js": 143,
    "./utils/polyfill/Pixi.js": 144,
    "./utils/polyfill/String.js": 145,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/typeof": 26
  }],
  110: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass"));
    n.default = function () {
      function n(e, t) {
        (0, i.default)(this, n), this._url = e, this._callbacks = [t]
      }

      return (0, a.default)(n, [{
        key: "onComplete", value: function (t) {
          this._asset = t, this._callbacks.forEach(function (e) {
            return e(t)
          }), this._callbacks = []
        }
      }, {
        key: "addCallback", value: function (e) {
          this._callbacks.push(e)
        }
      }, {
        key: "asset", get: function () {
          return this._asset
        }
      }]), n
    }()
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  111: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/assertThisInitialized"))),
      l = r(e("@babel/runtime/helpers/get")), a = r(e("@babel/runtime/helpers/inherits")),
      s = r(e("@babel/runtime/helpers/possibleConstructorReturn")), u = r(e("@babel/runtime/helpers/getPrototypeOf")),
      c = r(e("@babel/runtime/helpers/classCallCheck")), h = r(e("@babel/runtime/helpers/createClass")),
      d = r(e("./../common/FileManager.js")), f = r(e("./AssetCache.js")), p = r(e("./formats/AssetsAlphaJPG.js")),
      m = r(e("./formats/AssetsSea3D.js")), v = r(e("./formats/AssetsScene.js")), b = e("./formats/AssetsWebP.js");

    function y(n) {
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
        return e = r ? (e = (0, u.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, s.default)(this, e)
      }
    }

    var g = function () {
      function e() {
        (0, c.default)(this, e), this._resources = {}
      }

      return (0, h.default)(e, [{
        key: "add", value: function (e) {
          this._resources[e.name] = e
        }
      }, {
        key: "addChildUrl", value: function (e, t) {
          this._resources[e.name].imageUrl = t
        }
      }, {
        key: "deleteResource", value: function (e) {
          this._resources[e.name] && delete this._resources[e.name]
        }
      }, {
        key: "resources", get: function () {
          return this._resources
        }
      }]), e
    }(), r = function (e) {
      (0, a.default)(o, e);
      var t = y(o);

      function o() {
        var r;
        return (0, c.default)(this, o), (r = t.call(this, "", 100)).assetsCache = {}, r.preload = new g, r.waitForReload = !1, r.allImages = 0, r.loadedImages = 0, r.pre(b.webpParserBefore), r.pre(function (e, t) {
          "json" !== e.extension && r.allImages++, t()
        }), r.use(b.webpParserAfter), r.use(p.default), r.use(m.default), r.use(function (e, t) {
          "json" !== e.extension && r.loadedImages++;
          var n = r.allImages ? r.loadedImages / r.allImages : 0;
          document.dispatchEvent(new CustomEvent("preloader.step", {
            detail: {
              stage: "image",
              percent: n,
              url: e.url
            }
          })), t()
        }), r.onError.add(function () {
          r.waitForReload || (r.waitForReload = !0, r.onComplete.detach(r.onComplete._head._next), r.reset(), setTimeout(function () {
            return r.tryToReload()
          }, window.utils.reloadDelays.assets))
        }), window.THREE && (0, v.default)((0, i.default)(r)), r.onError.add(function (e, t, n) {
          console.error("AssetsLoader: ".concat(e.message, " [").concat(n && n.url ? n.url : "*", "]!"))
        }), r
      }

      return (0, h.default)(o, [{
        key: "isImage", value: function (e) {
          return e.includes("_image")
        }
      }, {
        key: "add", value: function (e, t, n, r) {
          function i(e) {
            s.preload.deleteResource(e), r(e)
          }

          var a, s = this;
          return this.assetsCache[t] ? this.assetsCache[t].asset && this.assetsCache[t].asset.data ? i(this.assetsCache[t].asset) : this.assetsCache[t].addCallback(i) : (a = null, a = this.preload.resources[e] ? this.preload.resources[e].assetCache : new f.default(t, i), this.assetsCache[t] = a, "crossOrigin" in (n = null === n ? function (e) {
            !e.error && e.data && a.onComplete(e)
          } : n) && (n.crossOrigin = "anonymous"), (0, l.default)((0, u.default)(o.prototype), "add", this).call(this, e, d.default.getLocalPath(t), n, function (e) {
            e.error || !e.data || s.waitForReload || a.onComplete(e)
          })), this
        }
      }, {
        key: "load", value: function (e) {
          var t = this;
          this._onLoadFinished || (this._onLoadFinished = function () {
            t.waitForReload || (t._onLoadFinished = null, c2d.call(e))
          }), (0, l.default)((0, u.default)(o.prototype), "load", this).call(this, this._onLoadFinished)
        }
      }, {
        key: "_loadResource", value: function (e) {
          return e.url = d.default.getSubDomainUrl() + e.url, (0, l.default)((0, u.default)(o.prototype), "_loadResource", this).apply(this, arguments)
        }
      }, {
        key: "loadAsset", value: function (e, t, n) {
          3 < arguments.length && void 0 !== arguments[3] && arguments[3] && (t += "?=".concat(Math.randomRangeInt(0, Number.MAX_SAFE_INTEGER)));
          this.reset().add(e, t, function (e) {
            void 0 === e || null === e.data || e.error ? console.error(e.error) : n(e.data)
          }).load()
        }
      }, {
        key: "tryToReload", value: function () {
          this._removeErroneousAssetsFromCache(), this._addErroneousAssetsToLoader(), this._resourcesParsing = [], this.load(this._onLoadFinished), this.waitForReload = !1
        }
      }, {
        key: "_removeErroneousAssetsFromCache", value: function () {
          var t = this;
          Object.values(this.preload.resources).forEach(function (e) {
            delete t.assetsCache[e.url], e.imageUrl && delete t.assetsCache[e.imageUrl]
          })
        }
      }, {
        key: "_addErroneousAssetsToLoader", value: function () {
          var t = this;
          Object.values(this.preload.resources).forEach(function (e) {
            t.add(e.name, e.url, e.options, e.cb)
          })
        }
      }]), o
    }(PIXI.Loader);
    n.default = r
  }, {
    "./../common/FileManager.js": 37,
    "./AssetCache.js": 110,
    "./formats/AssetsAlphaJPG.js": 115,
    "./formats/AssetsScene.js": 116,
    "./formats/AssetsSea3D.js": 117,
    "./formats/AssetsWebP.js": 118,
    "@babel/runtime/helpers/assertThisInitialized": 4,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/get": 9,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21
  }],
  112: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), r = function () {
        function n(e, t) {
          (0, i.default)(this, n), this.id = e, this.type = t, this._assets = {}, this._subPacks = {}, this._dirty = !0, this.required = [], Object.seal(this)
        }

        return (0, a.default)(n, [{
          key: "addAsset", value: function (e, t) {
            this._assets[e] && console.warn("AssetsPack[".concat(this.id, "]: asset with id [").concat(e, "] already added!")), this._assets[e] = t, this._dirty = !0
          }
        }, {
          key: "hasAsset", value: function (e) {
            return this._assets[e]
          }
        }, {
          key: "getAsset", value: function (e) {
            return this.hasAsset(e) || console.warn("AssetsPack[".concat(this.id, "]: asset with id [").concat(e, "] not found!")), this._assets[e]
          }
        }, {
          key: "getAssetsByPrefix", value: function (e) {
            var t, n = [];
            for (t in this._dirty && (this._assets = this.sortObject(this._assets), this._dirty = !1), this._assets) t.contains(e) && n.push(this._assets[t]);
            return n
          }
        }, {
          key: "sortObject", value: function (e) {
            var t, n = {}, r = [];
            for (t in e) e.hasOwnProperty(t) && r.push(t);
            for (r.sort(function (e, t) {
              return e.length === t.length ? e.localeCompare(t) : e.length - t.length
            }), t = 0; t < r.length; t++) n[r[t]] = e[r[t]];
            return n
          }
        }, {
          key: "addSubPack", value: function (e) {
            this._subPacks[e.id] && console.warn("AssetsPack[".concat(this.id, "]: sub pack with id [").concat(e.id, "] already added!")), this._subPacks[e.id] = e
          }
        }, {
          key: "getSubPack", value: function (e) {
            var t = this._subPacks[e];
            return t || console.warn("AssetsPack[".concat(this.id, "]: sub pack with id [").concat(e, "] not found!")), t
          }
        }, {
          key: "getSubPacks", value: function () {
            return this._subPacks
          }
        }]), n
      }();
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  113: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), r = new (function () {
        function e() {
          (0, i.default)(this, e), this._packsMap = {}
        }

        return (0, a.default)(e, [{
          key: "clear", value: function () {
            this._packsMap = {}
          }
        }, {
          key: "addPack", value: function (e) {
            this._packsMap[e.id] = e
          }
        }, {
          key: "getPack", value: function (e) {
            return this._packsMap[e]
          }
        }]), e
      }());
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  114: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      v = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/typeof"))),
      i = r(e("@babel/runtime/helpers/classCallCheck")), a = r(e("@babel/runtime/helpers/createClass")),
      s = r(e("./AssetsLoader.js")), o = r(e("./AssetsPack.js")), l = r(e("./AssetsPackCache.js")),
      b = r(e("../audio/AudioManager.js")), y = r(e("./../common/FileManager.js"));

    function g(e, t) {
      var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!r) {
        if (Array.isArray(e) || (r = function (e, t) {
          if (e) {
            if ("string" == typeof e) return u(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? u(e, t) : void 0
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
      var i, a = !0, s = !1;
      return {
        s: function () {
          r = r.call(e)
        }, n: function () {
          var e = r.next();
          return a = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            a || null == r.return || r.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function u(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

    r = function () {
      function e() {
        (0, i.default)(this, e), this._loader = new s.default, this._animations = null, this._cachedSpineAnimations = {}, this._spritesheetsPack = null, this._cachedSpritesheets = {}, this._respackSpritesheets = [], this._allSpritesheetsLoaded = !1, this._componentsUrl = "", this._imagesUrl = "", this._animationsUrl = "", this._audioUrl = "", this._fonts = "", this._preloadComponents = {}
      }

      return (0, a.default)(e, [{
        key: "loadPack", value: function (n, r, i) {
          var a = this, e = l.default.getPack(n);
          e ? i(e) : (r.config && r.config.fonts && (this._fonts = r.config.fonts, this._loadFonts(this._fonts)), this._loadResourcesManifests(r, function () {
            var e = c2d.env.ui, t = (function e(t) {
              var n = document.createElement("link");
              n.onerror = function () {
                document.head.removeChild(n), c2d.call(function () {
                  return e(t)
                }, window.utils.reloadDelays.styles)
              }, n.href = t, n.rel = "stylesheet", document.documentElement.querySelector("head").appendChild(n)
            }(c2d.FileManager.getFullPath("styles/".concat(e, ".bundle.css"))), a.hasPackedResources && (a._addAnimationsJson(), a._addSpritesheetsJson()), new o.default(n, r.type));
            a._addPackAssets(t, r), a._loader.load(function () {
              l.default.addPack(t), i(t)
            })
          }))
        }
      }, {
        key: "onLoadAnimationsJson", value: function (e) {
          this._animations = e.data, this._allSpritesheetsLoaded && this._parseSpineAnimations()
        }
      }, {
        key: "onLoadSpritesheetsJson", value: function (n) {
          var r, s = this, o = (this._spritesheetsPack = n.data, c2d.last(function () {
            s._allSpritesheetsLoaded = !0, s._animations && s._parseSpineAnimations()
          }, Object.keys(this._spritesheetsPack).length));
          for (r in this._spritesheetsPack) !function (a) {
            var e = a + "_image", t = s._imagesUrl + s._spritesheetsPack[a].meta.image;
            s._loader.add(e, t, {parentResource: n}, function (e) {
              var i = new PIXI.Spritesheet(e.texture.baseTexture, s._spritesheetsPack[a]);
              i.parse(function () {
                s._cachedSpritesheets[a] = {spritesheet: i, textures: i.textures};
                var e, t = g(s._respackSpritesheets);
                try {
                  for (t.s(); !(e = t.n()).done;) {
                    var n = e.value;
                    if (a = a.replace(/-\d/g, ""), n.spritesheet === a) for (var r in i._frames) n.respack.addAsset(r, PIXI.utils.TextureCache[r])
                  }
                } catch (e) {
                  t.e(e)
                } finally {
                  t.f()
                }
                o()
              })
            }), r = a
          }(r);
          y.default.forceDesktopGraphics = !1
        }
      }, {
        key: "_loadFonts", value: function (e) {
          Array.from(Object.values(e)).forEach(function (e) {
            var t = e.fontFamily, e = e.fontWeight, n = document.createElement("span");
            n.setAttribute("style", "font-family: '" + t + "'; font-weight: " + e + ";"), document.getElementsByClassName("font_preload")[0].appendChild(n)
          })
        }
      }, {
        key: "_loadResourcesManifests", value: function (e, t) {
          var u = this;
          (function n(r) {
            function e(e) {
              var t = u._componentsUrl + e;
              u._loader.add("config" + e, t, {}, function (e) {
                return Object.assign(r.config, e.data)
              })
            }

            var t = r.config;
            if ("string" == typeof t) r.config = {}, e(t); else if (Array.isArray(t)) {
              r.config = {};
              var i, a = g(t);
              try {
                for (a.s(); !(i = a.n()).done;) e(i.value)
              } catch (e) {
                a.e(e)
              } finally {
                a.f()
              }
            }
            var s, t = r.resources,
              o = ("string" == typeof t && (s = u._componentsUrl + t, u._loader.add(t, s, null, function (e) {
                return r.resources = e.data
              })), r.components);
            if ("string" == typeof o) {
              t = u._componentsUrl + o;
              u._loader.add(o, t, null, function (e) {
                for (var t in r.components = e.data, r.components) n(r.components[t])
              })
            } else for (var l in o) n(o[l])
          })(e), Object.keys(this._loader.resources).length ? this._loader.load(t) : t()
        }
      }, {
        key: "_addPackAssets", value: function (e, t) {
          t.config && this._addPackConfig(e, t.config), t.components && this._addPackComponents(e, t.components), t.resources && this._addPackResources(e, t.resources), t.required && (e.required = t.required)
        }
      }, {
        key: "_addPackConfig", value: function (e, t) {
          e.addAsset("config", t)
        }
      }, {
        key: "_addPackComponents", value: function (e, t) {
          for (var n in t) {
            var r = t[n], i = new o.default(n, r.type);
            e.addSubPack(i), r.name = n, r.parent = e.id, this._addPackAssets(i, r)
          }
          e.addAsset("components", t)
        }
      }, {
        key: "_addSpritesheets", value: function (e) {
          var n = this, t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
            r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
            i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : function () {
            };
          y.default.forceDesktopGraphics = c2d.env.useDesktopGraphics, [].concat(e).reduce(function (e, t) {
            return e.concat(y.default.getMultipackAtlas(n._imagesUrl + t))
          }, []).call(function (e) {
            return i = c2d.last(i, e.length)
          }).forEach(function (e) {
            n._loader.add(e, e, t, function (e) {
              t.preload && c2d.engine._renderer.texture.updateTexture(e.spritesheet.baseTexture), r && r(e), i(e)
            })
          }), y.default.forceDesktopGraphics = !1
        }
      }, {
        key: "_addAnimationsJson", value: function () {
          var t = this;
          this._loader.add("animations", "animations.json", null, function (e) {
            t.onLoadAnimationsJson(e)
          })
        }
      }, {
        key: "_addSpritesheetsJson", value: function () {
          var t = this;
          y.default.forceDesktopGraphics = c2d.env.useDesktopGraphics, this._loader.add("spritesheets", "spritesheets.json", null, function (e) {
            t.onLoadSpritesheetsJson(e)
          })
        }
      }, {
        key: "_addSpineCache", value: function (e, t, n) {
          var r = n.spineData, n = n.useDynamicText;
          if (c2d.SpineCache[e] = r, t.addAsset(e, r), n) {
            r.attachLabels = [];
            var i, a = g(r.slots);
            try {
              for (a.s(); !(i = a.n()).done;) {
                var s, o, l = i.value, u = l.name.indexOf("["), c = l.name.indexOf("]");
                -1 !== u && -1 !== c && (s = l.name.substring(0, u), o = l.name.substring(u + 1, c), this._fonts && this._fonts[s] ? r.attachLabels.push({
                  slotData: l,
                  font: this._fonts[s],
                  key: o
                }) : console.warn("Font: ", s, "not found"))
              }
            } catch (e) {
              a.e(e)
            } finally {
              a.f()
            }
          }
        }
      }, {
        key: "_parseSpineAnimations", value: function () {
          var e, m = this;
          for (e in this._animations) !function (p) {
            m._cachedSpineAnimations[p].forEach(function (e) {
              var t, n = e.name, r = e.respack, i = e.spritesheets, e = e.useDynamicText, a = [], s = g(i);
              try {
                for (s.s(); !(t = s.n()).done;) {
                  var o = t.value, l = o;
                  if (m._cachedSpritesheets[l]) a.push(l); else for (var u = 0, l = o.replace(".json", "-" + u + ".json"); m._cachedSpritesheets[l];) a.push(l), l = o.replace(".json", "-" + ++u + ".json")
                }
              } catch (e) {
                s.e(e)
              } finally {
                s.f()
              }
              for (var c = new PIXI.spine.Atlas, h = 0, d = a; h < d.length; h++) {
                var f = d[h];
                c.addTextureHash(m._cachedSpritesheets[f].textures, !0)
              }
              i = m._animations[y.default.getLocalizedFilename(p)] || m._animations[p], i = new PIXI.spine.core.SkeletonJson(new PIXI.spine.core.AtlasAttachmentLoader(c)).readSkeletonData(i);
              m._addSpineCache(n, r, {spineData: i, useDynamicText: e})
            })
          }(e)
        }
      }, {
        key: "_addPackResources", value: function (s, o) {
          var l = this, u = this._preloadComponents[s.id] && this._preloadComponents[s.id].preloadTextures;
          if (o.spritesheets) for (var e in o.spritesheets) this.hasPackedResources ? this._respackSpritesheets.push({
            respack: s,
            spritesheet: o.spritesheets[e]
          }) : this._addSpritesheets(o.spritesheets[e], {preload: u}, function (e) {
            for (var t in e.data.frames) s.addAsset(t, PIXI.utils.TextureCache[t])
          });
          if (o.textures) {
            var t, n = function (e) {
              return s.addAsset(e.name, e.texture)
            };
            for (t in o.textures) {
              var r = this._imagesUrl + o.textures[t];
              this._loader.add(t, r, null, n)
            }
          }
          if (o.videos) for (var i in o.videos) {
            var a = y.default.getFullPath(this._animationsUrl + o.videos[i]);
            s.addAsset(i, a)
          }
          if (o.spine) for (var c in o.spine) !function (t) {
            var n, r = o.spine[t], i = Array.isArray(r) ? r[0] : r.armature,
              e = Array.isArray(r) ? [].concat(r[1]) : [].concat(r.spritesheets), a = r.useDynamicText;
            l.hasPackedResources ? (l._cachedSpineAnimations[i] || (l._cachedSpineAnimations[i] = []), l._cachedSpineAnimations[i].push({
              name: t,
              respack: s,
              spritesheets: e,
              useDynamicText: a
            })) : (n = new PIXI.spine.Atlas, l._addSpritesheets(e, {preload: u}, function (e) {
              return n.addTextureHash(e.textures, !0)
            }, function (e) {
              l._loader.add(t, l._animationsUrl + i, {metadata: {spineAtlas: n}, parentResource: e}, function (e) {
                var t;
                r.scale && ((t = e.spineData.bones.find(function (e) {
                  return "root" === e.name
                })).scaleX = r.scale, t.scaleY = r.scale), l._addSpineCache(e.name, s, {
                  spineData: e.spineData,
                  useDynamicText: a
                })
              })
            }))
          }(c);
          if (o.scene3D) for (var h in o.scene3D) !function (t) {
            var n, e, r = o.scene3D[t];
            r.sea ? (e = l._animationsUrl + r.sea, l._loader.add(t, e, {xhrType: "arraybuffer"}, function (e) {
              return s.addAsset(e.name, {loader: e.data, scene: e.data.container})
            })) : r.scene && (n = l._animationsUrl + r.scene, e = l._animationsUrl + r.scene.replace(".scene", ".bin"), l._loader.add(t + "_binary", e, {xhrType: "arraybuffer"}, function (e) {
              l._loader.add(t, n, {
                xhrType: "json",
                metadata: {binaryData: e.data, imagesUrl: l.imagesUrl},
                parentResource: e
              }, function (e) {
                s.addAsset(e.name, {
                  scene: e.scene,
                  textures: e.textures,
                  materials: e.materials,
                  animations: e.animations,
                  startUpAnimations: e.startUpAnimations,
                  cutscenes: e.cutscenes
                })
              })
            }))
          }(h);
          if (o.emitters) for (var d in o.emitters) {
            var f = o.emitters[d];
            "object" === (0, v.default)(f) ? console.error("PIXINeutrinoEffect: deprecated!") : (f = this._animationsUrl + f, this._loader.add(d, f, null, function (e) {
              return s.addAsset(e.name, e.data)
            }))
          }
          if (o.audio) for (var p in o.audio) {
            var m = o.audio[p];
            "string" == typeof m ? (b.default.capabilities().ogg || (m = m.replace(".ogg", ".mp3")), m = y.default.getFullPath(this.audioUrl + m)) : "object" === (0, v.default)(m) && (b.default.capabilities().ogg || (m.file = m.file.replace(".ogg", ".mp3")), m.file = y.default.getFullPath(this.audioUrl + m.file)), b.default.addAudioResource(p, m)
          }
        }
      }, {
        key: "hasPackedResources", get: function () {
          return y.default.isFileExist("animations.json") && y.default.isFileExist("spritesheets.json")
        }
      }, {
        key: "componentsUrl", get: function () {
          return this._componentsUrl
        }, set: function (e) {
          this._componentsUrl = e
        }
      }, {
        key: "imagesUrl", get: function () {
          return this._imagesUrl
        }, set: function (e) {
          this._imagesUrl = e, this._loader._imagesUrl = e
        }
      }, {
        key: "animationsUrl", get: function () {
          return this._animationsUrl
        }, set: function (e) {
          this._animationsUrl = e
        }
      }, {
        key: "audioUrl", get: function () {
          return this._audioUrl
        }, set: function (e) {
          this._audioUrl = e
        }
      }, {
        key: "preloadComponents", set: function (e) {
          this._preloadComponents = e
        }
      }]), e
    }();
    n.default = r
  }, {
    "../audio/AudioManager.js": 32,
    "./../common/FileManager.js": 37,
    "./AssetsLoader.js": 111,
    "./AssetsPack.js": 112,
    "./AssetsPackCache.js": 113,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/typeof": 26
  }],
  115: [function (e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {value: !0}), n.default = function (e, s) {
      var o = this;
      if (!(e.data && e.data.frames && e.data.meta && e.data.meta.mask)) return s();
      var l, u = e.name + "_image", t = e.name + "_mask";
      if (!this.resources[u]) return s();
      this.resources[t] || (l = this.resources[u].texture.baseTexture.source, this.add(t, this._imagesUrl + e.data.meta.mask, {parentResource: e}, function (e) {
        for (var e = e.texture.baseTexture.source, t = new PIXI.CanvasRenderTarget(l.width, l.height), n = (t.context.drawImage(l, 0, 0), t.context.getImageData(0, 0, l.width, l.height)), r = (t.context.drawImage(e, 0, 0), t.context.getImageData(0, 0, e.width, e.height)), i = n.width * n.height * 4, a = 0; a < i; a += 4) n.data[a + 3] = r.data[a];
        return t.context.putImageData(n, 0, 0), o.resources[u].texture.baseTexture.source = t.canvas, o.resources[u].texture.baseTexture.update(), s()
      }))
    }
  }, {}],
  116: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      l = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = function (e) {
        var o = {clamp: THREE.ClampToEdgeWrapping, mirror: THREE.MirroredRepeatWrapping};
        document.dispatchEvent(new CustomEvent("preloader.setup", {
          detail: {
            stages: {
              image: {begin: 30, count: 20},
              texture: {begin: 50, count: 50}
            }
          }
        })), THREE.cloneSkinnedMesh = i, e.use(function ($, J) {
          if ("scene" === $.extension) {
            var Q = {}, i = function () {
              $.data.textures = Q;
              for (var e = {json: $.data, binaryData: $.metadata.binaryData}, L = function (e, t, n, r) {
                var i, a = {}, s = te($.data.materials);
                try {
                  for (s.s(); !(i = s.n()).done;) {
                    var o = i.value;
                    a[o.name] = o
                  }
                } catch (e) {
                  s.e(e)
                } finally {
                  s.f()
                }
                $.scene = e, $.textures = Q, $.materials = a, $.animations = t, $.startUpAnimations = n, $.cutscenes = r, J()
              }, F = {
                position: THREE.VectorKeyframeTrack,
                quaternion: THREE.QuaternionKeyframeTrack,
                scale: THREE.VectorKeyframeTrack,
                visible: THREE.BooleanKeyframeTrack
              }, t = e.json, n = new THREE.Scene, r = 0; r < t.meshes.length; ++r) {
                var i, a = t.meshes[r], s = new THREE.BufferGeometry;
                for (i in a.attributes) {
                  var o = a.attributes[i], l = new ne[o.type](e.binaryData, o.offset, o.count * o.elements),
                    l = new THREE.BufferAttribute(l, o.elements);
                  s.addAttribute(i, l)
                }
                var u, c = 0, h = te(a.subMeshes);
                try {
                  for (h.s(); !(u = h.n()).done;) {
                    var H = u.value;
                    c += H.count
                  }
                } catch (e) {
                  h.e(e)
                } finally {
                  h.f()
                }
                var d, N = new Uint16Array(e.binaryData, a.subMeshes[0].offset, c),
                  f = (s.setIndex(new THREE.BufferAttribute(N, 1)), 0), p = 0, m = te(a.subMeshes);
                try {
                  for (m.s(); !(d = m.n()).done;) {
                    var v = d.value;
                    s.addGroup(f, v.count, p), f += v.count, ++p
                  }
                } catch (e) {
                  m.e(e)
                } finally {
                  m.f()
                }
                a.tangent && THREE.BufferGeometryUtils.computeTangents(s), t.meshes[r] = s
              }
              for (var b = 0; b < t.materials.length; ++b) t.materials[b] = c2d.scene3DLoader.createMaterial(t.materials[b], t);
              for (var y = 0; y < t.animations.length; ++y) {
                var g, _ = t.animations[y], w = [], k = te(_.baked);
                try {
                  for (k.s(); !(g = k.n()).done;) {
                    var x, C = g.value, S = te(C.tracks);
                    try {
                      for (S.s(); !(x = S.n()).done;) {
                        var M = x.value, z = F[M.name], B = new Float32Array(e.binaryData, M.times[0], M.times[1]),
                          P = void 0;
                        P = "visible" === M.name ? function (e) {
                          var t, n = [], r = te(e);
                          try {
                            for (r.s(); !(t = r.n()).done;) {
                              var i = t.value;
                              n.push(!!i)
                            }
                          } catch (e) {
                            r.e(e)
                          } finally {
                            r.f()
                          }
                          return n
                        }(new Uint8Array(e.binaryData, M.values[0], M.values[1])) : new Float32Array(e.binaryData, M.values[0], M.values[1]), w.push(new z(C.target + "." + M.name, B, P, THREE.InterpolateLinear))
                      }
                    } catch (e) {
                      S.e(e)
                    } finally {
                      S.f()
                    }
                  }
                } catch (e) {
                  k.e(e)
                } finally {
                  k.f()
                }
                if (_.events) {
                  var E, q = [], V = [], R = te(_.events);
                  try {
                    for (R.s(); !(E = R.n()).done;) {
                      var U = E.value;
                      q.push(U.time), V.push(U.value)
                    }
                  } catch (e) {
                    R.e(e)
                  } finally {
                    R.f()
                  }
                  w.push(new THREE.StringKeyframeTrack(_.target + ".stringEvent", q, V))
                }
                t.animations[y] = {name: _.name, clip: new THREE.AnimationClip(_.name, -1, w)}
              }
              e.animations = {}, e.startUpAnimations = [];
              var O = t.ambientLight,
                j = (O && ((j = new THREE.AmbientLight).color = new THREE.Color(O.color), j.intensity = O.intensity, n.add(j)), (O = t.skybox) && "panoramic" === O.type && ((j = t.textures[O.texture]).flipY = !0, O = {
                  resolution: j.image.width / 2,
                  generateMipmaps: !0,
                  minFilter: THREE.LinearMipMapLinearFilter,
                  magFilter: THREE.LinearFilter
                }, n.background = new THREE.CubemapGenerator(c2d.engine.renderer3D.renderer).fromEquirectangular(j, O)), t.fog);
              j && ("linear" === j.mode ? n.fog = new THREE.Fog(j.color, j.near, j.far) : n.fog = new THREE.FogExp2(j.color, j.density));
              var G, A = [], T = te(t.nodes);
              try {
                for (T.s(); !(G = T.n()).done;) {
                  var W = G.value;
                  A.push(function (e, t) {
                    var n, r;
                    if (void 0 !== e.mesh) {
                      if (e.materials) {
                        r = [];
                        var i, a = te(e.materials);
                        try {
                          for (a.s(); !(i = a.n()).done;) {
                            var s = i.value;
                            r.push(t.json.materials[s])
                          }
                        } catch (e) {
                          a.e(e)
                        } finally {
                          a.f()
                        }
                      } else r = [THREE.MeshStandardMaterial()];
                      if (void 0 !== e.lightmap) for (var o = t.json.textures["lightmap-" + e.lightmap], l = 0; l < r.length; ++l) r[l].lightMap = o, r[l].lightMapIntensity = 1;
                      n = new (e.skeleton ? THREE.SkinnedMesh : THREE.Mesh)(t.json.meshes[e.mesh], r)
                    } else if (e.light) {
                      var u = e.light;
                      "Directional" === u.type ? n = new THREE.DirectionalLight(u.color, u.intensity) : "Point" === u.type ? n = new THREE.PointLight(u.color, u.intensity, u.range) : "Spot" === u.type ? n = new THREE.SpotLight(u.color, u.intensity, u.range, u.spotAngle / 180 * Math.PI, 1) : console.warn("Light type [" + u.type + "] + isn't support!"), n && u.shadows && (n.castShadow = !0, n.shadow.mapSize.width = 2048, n.shadow.mapSize.height = 2048, n.shadow.camera.left = -20, n.shadow.camera.right = 20, n.shadow.camera.top = 20, n.shadow.camera.bottom = -20, n.shadow.camera.near = .5, n.shadow.camera.far = 200, n.shadow.camera.visible = !0)
                    } else if (e.b) n = new THREE.Bone; else if (e.particles) {
                      var c, u = c2d.screenParams.screenWidth, h = e.particles,
                        d = (h.maxParticleCount = 500, h.texture.value = t.json.textures[h.texture.value], h.texture.frames = new THREE.Vector2(h.texture.frames.x, h.texture.frames.y), h.blending !== h && (h.blending = THREE[h.blending], h.blending !== THREE.NoBlending && (h.transparent = !0)), h.scale),
                        f = (h.scale = u * d, new SPE.Group(h)), p = te(h.emitters);
                      try {
                        for (p.s(); !(c = p.n()).done;) {
                          var m = c.value;
                          0 === m.duration && (m.duration = null), m.type = SPE.distributions[m.type], m.position.type && (m.position.distribution = SPE.distributions[m.position.type]), m.velocity.type && (m.velocity.distribution = SPE.distributions[m.velocity.type]), m.acceleration.type && (m.acceleration.distribution = SPE.distributions[m.acceleration.type]);
                          for (var v = 0; v < m.color.value.length; ++v) m.color.value[v] = new THREE.Color(m.color.value[v]);
                          m.position.spread = re(m.position.spread), m.position.spreadClamp = re(m.position.spreadClamp), m.position.radiusScale = re(m.position.radiusScale), m.velocity.value = re(m.velocity.value), m.velocity.spread = re(m.velocity.spread), m.acceleration.value = re(m.acceleration.value), m.acceleration.spread = re(m.acceleration.spread), m.rotation.axis = re(m.rotation.axis), f.addEmitter(new SPE.Emitter(m))
                        }
                      } catch (e) {
                        p.e(e)
                      } finally {
                        p.f()
                      }
                      u = c2d.Tween.get(f, {loop: !0});
                      u.to({}, 10), u.addEventListener("change", function (e) {
                        var t = PIXI.Ticker.shared.deltaMS / 1e3 * c2d.timescale;
                        f.tick(t)
                      }), n = new THREE.Object3D, f.mesh.frustumCulled = !1, n.particleGroup = f, n.add(f.mesh)
                    } else n = new THREE.Object3D;
                    n.stringEvent = "null", e.castShadow && (n.castShadow = e.castShadow);
                    e.receiveShadow && (n.receiveShadow = e.receiveShadow);
                    e.camera && ("perspective" === e.camera.type ? (n.camera = new THREE.PerspectiveCamera(e.camera.fov, 1, e.camera.near, e.camera.far), n.camera.quaternion.set(0, 1, 0, 0), n.add(n.camera)) : console.warn("Camera type [" + e.camera.type + "] isn't support!"));
                    n.name = e.n, n.visible = e.v, n.position.fromArray(new Float32Array(t.binaryData, e.mtx, 3)), n.quaternion.fromArray(new Float32Array(t.binaryData, e.mtx + 12, 4)), n.scale.fromArray(new Float32Array(t.binaryData, e.mtx + 28, 3)), e.light && ((d = new THREE.Vector3(0, 0, 1)).applyQuaternion(n.quaternion), d.add(n.position), n.target.position.copy(d), n.target.updateMatrixWorld(!0));
                    if (e.animations) {
                      t.animations[n.name] || (t.animations[n.name] = {});
                      var b, y = te(e.animations);
                      try {
                        for (y.s(); !(b = y.n()).done;) {
                          var g = b.value, _ = t.json.animations[g];
                          t.animations[n.name][_.name] ? console.warn("Node [" + n.name + "] is identical, animation [" + _.name + "] skipped.") : t.animations[n.name][_.name] = _.clip
                        }
                      } catch (e) {
                        y.e(e)
                      } finally {
                        y.f()
                      }
                      void 0 !== e.defaultAnimation && t.startUpAnimations.push({
                        node: n,
                        animation: t.json.animations[e.defaultAnimation].clip
                      })
                    }
                    return n
                  }(W, e))
                }
              } catch (e) {
                T.e(e)
              } finally {
                T.f()
              }
              var X, D = te(t.scene);
              try {
                for (D.s(); !(X = D.n()).done;) !function e(t, n, r, i) {
                  var a = i.json;
                  var s = r[t];
                  a = a.nodes[t];
                  if (a.skeleton) {
                    for (var o = [], l = [], u = a.skeleton, c = Array.from(new Float32Array(i.binaryData, u.inverseBindMatrices[0], u.inverseBindMatrices[1])), h = 0; h < u.bones.length; ++h) {
                      var d = u.bones[h], d = r[d], d = (d.matrixAutoUpdate = !0, o.push(d), new THREE.Matrix4);
                      d.fromArray(c, 16 * h), l.push(d)
                    }
                    s.bind(new THREE.Skeleton(o, l), s.matrixWorld), s.matrixAutoUpdate = !0;
                    var f, p = te(s.material);
                    try {
                      for (p.s(); !(f = p.n()).done;) {
                        var m = f.value;
                        m.skinning = !0
                      }
                    } catch (e) {
                      p.e(e)
                    } finally {
                      p.f()
                    }
                  }
                  n.add(s);
                  if (a.childs) {
                    var v, b = te(a.childs);
                    try {
                      for (b.s(); !(v = b.n()).done;) {
                        var y = v.value;
                        e(y, s, r, i)
                      }
                    } catch (e) {
                      b.e(e)
                    } finally {
                      b.f()
                    }
                  }
                }(X.value, n, A, e)
              } catch (e) {
                D.e(e)
              } finally {
                D.f()
              }
              e.cutscenes = {};
              var Y, I = te(t.cutscenes);
              try {
                for (I.s(); !(Y = I.n()).done;) {
                  var Z = Y.value, K = new ee.default(Z, A, t.animations);
                  e.cutscenes[K.name] = K
                }
              } catch (e) {
                I.e(e)
              } finally {
                I.f()
              }
              L(n, e.animations, e.startUpAnimations, e.cutscenes)
            }, t = 0;
            if ($.data.textures && Object.keys($.data.textures).length) {
              var a, s = 0, n = (t += Object.keys($.data.textures).length, te($.data.textures));
              try {
                for (n.s(); !(a = n.n()).done;) !function () {
                  var e, n = a.value, r = n.name;
                  THREE.Cache.get(r) ? t-- : (new (e = ($.data.compressTextures ? [{
                    extension: ".dds",
                    Loader: THREE.DDSLoader,
                    support: c2d.engine.renderer3D.extensions.get("WEBGL_compressed_texture_s3tc")
                  }, {
                    extension: ".pvr",
                    Loader: THREE.PVRLoader,
                    support: c2d.engine.renderer3D.extensions.get("WEBGL_compressed_texture_pvrtc")
                  }, {
                    extension: ".ktx",
                    Loader: THREE.KTXLoader,
                    support: c2d.engine.renderer3D.extensions.get("WEBGL_compressed_texture_astc")
                  }] : [{extension: ".png", Loader: THREE.TextureLoader, support: !0}]).find(function (e) {
                    return e.support
                  })).Loader).load(l.default.getFullPath($.metadata.imagesUrl + r + e.extension), function (e) {
                    s++;
                    var t = $.data.textures.length ? s / $.data.textures.length : 0;
                    document.dispatchEvent(new CustomEvent("preloader.step", {
                      detail: {
                        stage: "texture",
                        percent: t,
                        url: $.url
                      }
                    })), e.name = r, e.flipY = !1, e.magFilter = THREE.LinearFilter, e.minFilter = THREE.LinearMipMapLinearFilter, n.wrap ? (e.wrapS = o[n.wrap], e.wrapT = o[n.wrap]) : (e.wrapS = THREE.RepeatWrapping, e.wrapT = THREE.RepeatWrapping), e.onUpdate = function () {
                      console.log("onUpdate texture: " + e.name)
                    }, Q[r] = e, THREE.Cache.add(r, e.image), i()
                  })
                }()
              } catch (e) {
                n.e(e)
              } finally {
                n.f()
              }
            }
            t ? i = c2d.last(i, t) : i()
          } else J()
        })
      }, r(e("./../../common/FileManager.js"))), ee = r(e("./threejs/Cutscene.js"));

    function te(e, t) {
      var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!r) {
        if (Array.isArray(e) || (r = function (e, t) {
          if (e) {
            if ("string" == typeof e) return o(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0
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
      var i, a = !0, s = !1;
      return {
        s: function () {
          r = r.call(e)
        }, n: function () {
          var e = r.next();
          return a = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            a || null == r.return || r.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function o(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

    var ne = {
      char: Int8Array,
      byte: Uint8Array,
      short: Int16Array,
      ushort: Uint16Array,
      int: Int32Array,
      uint: Uint32Array,
      float: Float32Array
    };

    function re(e) {
      return new THREE.Vector3(e.x, e.y, e.z)
    }

    function i(e) {
      var t, n = {scene: e.clone(!0)}, r = {}, i = (e.traverse(function (e) {
        e.isSkinnedMesh && (r[e.name] = e)
      }), {}), a = {};
      for (t in n.scene.traverse(function (e) {
        e.isBone && (i[e.name] = e), e.isSkinnedMesh && (a[e.name] = e)
      }), r) {
        for (var s = r[t].skeleton, o = a[t], l = [], u = 0; u < s.bones.length; ++u) {
          var c = i[s.bones[u].name];
          l.push(c)
        }
        o.bind(new THREE.Skeleton(l, s.boneInverses), new THREE.Matrix4)
      }
      return n.scene.name = e.name + " (clone)", n.scene
    }
  }, {
    "./../../common/FileManager.js": 37,
    "./threejs/Cutscene.js": 119,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  117: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      s = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = function (e, t) {
        {
          var n;
          "sea" === e.extension ? ((n = new THREE.SEA3D({
            container: new THREE.Scene,
            path: ""
          })).onComplete = function () {
            e.data = n, t()
          }, n.load(e.data)) : t()
        }
      }, r(e("./../../common/FileManager.js")));
    window.THREE && window.THREE.SEA3D && THREE.SEA3D.EXTENSIONS_LOADER.push({
      setTypeRead: function () {
        this.file.typeRead[SEA3D.TextureURL.prototype.type] = function (e) {
          var t = [{
              extension: ".dds",
              Loader: THREE.DDSLoader,
              support: c2d.engine.renderer3D.extensions.get("WEBGL_compressed_texture_s3tc")
            }, {
              extension: ".pvr",
              Loader: THREE.PVRLoader,
              support: c2d.engine.renderer3D.extensions.get("WEBGL_compressed_texture_pvrtc")
            }, {
              extension: ".ktx",
              Loader: THREE.KTXLoader,
              support: c2d.engine.renderer3D.extensions.get("WEBGL_compressed_texture_astc")
            }, {extension: ".png", Loader: THREE.TextureLoader, support: !0}].find(function (e) {
              return e.support
            }), n = new t.Loader, r = -1 < e.url.lastIndexOf(".") ? e.url.substr(0, e.url.lastIndexOf(".")) : e.url,
            n = n.load(s.default.getFullPath("images/" + r + t.extension));
          n.name = e.name, n.wrapS = n.wrapT = THREE.RepeatWrapping, n.flipY = !1, void 0 !== this.config.anisotropy && (n.anisotropy = this.config.anisotropy), this.domain.textures = this.textures = this.textures || [], this.textures.push(this.objects["tex/" + e.name] = e.tag = n)
        }, this.file.typeRead[SEA3D.CubeMapURL.prototype.type] = function (e) {
          for (var t = [{
            extension: ".dds",
            Loader: THREE.DDSLoader,
            support: c2d.engine.renderer3D.extensions.get("WEBGL_compressed_texture_s3tc")
          }, {
            extension: ".pvr",
            Loader: THREE.PVRLoader,
            support: c2d.engine.renderer3D.extensions.get("WEBGL_compressed_texture_pvrtc")
          }, {
            extension: ".ktx",
            Loader: THREE.KTXLoader,
            support: c2d.engine.renderer3D.extensions.get("WEBGL_compressed_texture_astc")
          }, {extension: ".png", Loader: THREE.TextureLoader, support: !0}].find(function (e) {
            return e.support
          }), n = new t.Loader, r = this.toFaces(e.faces), i = 0; i < r.length; i++) r[i] = n.load(s.default.getFullPath("images/" + r[i] + t.extension));
          var a = new THREE.CubeTexture(r);
          a.name = e.name, a.wrapS = a.wrapT = THREE.RepeatWrapping, a.flipY = !1, void 0 !== this.config.anisotropy && (a.anisotropy = this.config.anisotropy), this.domain.cubemaps = this.cubemaps = this.cubemaps || [], this.cubemaps.push(this.objects["cmap/" + e.name] = e.tag = a)
        }
      }
    })
  }, {"./../../common/FileManager.js": 37, "@babel/runtime/helpers/interopRequireDefault": 12}],
  118: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.webpParserAfter = function (e, t) {
        return t()
      }, n.webpParserBefore = function (e, t) {
        ["webp", "png", "jpg"].contains(e.extension) && (e.url = i.default.getSubDomainUrl() + i.default.getImageUrl(e.url));
        return t()
      }, r(e("./../../common/FileManager.js")))
  }, {"./../../common/FileManager.js": 37, "@babel/runtime/helpers/interopRequireDefault": 12}],
  119: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      o = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      i = r(e("@babel/runtime/helpers/createClass"));

    function l(e, t) {
      var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!r) {
        if (Array.isArray(e) || (r = function (e, t) {
          if (e) {
            if ("string" == typeof e) return u(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? u(e, t) : void 0
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
      var i, a = !0, s = !1;
      return {
        s: function () {
          r = r.call(e)
        }, n: function () {
          var e = r.next();
          return a = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            a || null == r.return || r.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function u(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

    var a = function () {
      function r(e, t, n) {
        (0, o.default)(this, r), this._node = t, this._start = e.start, this._duration = e.duration, this._clip = n[e.animation].clip, this._mixer = null, this._action = null, e.pOffset ? (this._positionOffset = new THREE.Vector3, this._positionOffset.fromArray(e.pOffset)) : this._positionOffset = null, e.rOffset ? (this._rotationOffset = new THREE.Quaternion, this._rotationOffset.fromArray(e.rOffset)) : this._rotationOffset = null, this._prevPosition = new THREE.Vector3, this._prevRotation = new THREE.Quaternion
      }

      return (0, i.default)(r, [{
        key: "startTime", get: function () {
          return this._start
        }
      }, {
        key: "isPlaying", get: function () {
          return !!this._mixer
        }
      }, {
        key: "play", value: function () {
          var e = this,
            t = (this._mixer = new THREE.AnimationMixer(this._node), this._mixer.addEventListener("finished", function () {
              return e.onClipFinished()
            }), this._action = this._mixer.clipAction(this._clip), this._action.clampWhenFinished = !0, Math.max(1, Math.floor(this._duration / this._clip.duration)));
          this._action.setLoop(THREE.LoopRepeat, t), this._action.play()
        }
      }, {
        key: "update", value: function (e) {
          var t;
          this._mixer && (t = !!this._action && !this._action.paused, this._prevPosition.copy(this._node.position), this._prevRotation.copy(this._node.rotation), this._mixer.update(e), t && this.applyOffset())
        }
      }, {
        key: "onClipFinished", value: function () {
        }
      }, {
        key: "applyOffset", value: function () {
          var e;
          this._prevPosition.sub(this._node.position), this._prevPosition.length() < 1e-4 || (this._rotationOffset && ((e = new THREE.Matrix4).makeRotationFromQuaternion(this._rotationOffset), this._node.position.applyMatrix4(e)), this._positionOffset && (this._node.position.x += this._positionOffset.x, this._node.position.y += this._positionOffset.y, this._node.position.z += this._positionOffset.z))
        }
      }]), r
    }(), s = function () {
      function n(e, t) {
        (0, o.default)(this, n), this._start = e.start, this._duration = e.duration
      }

      return (0, i.default)(n, [{
        key: "play", value: function () {
        }
      }, {
        key: "update", value: function (e) {
        }
      }]), n
    }(), c = function () {
      function r(e, t, n) {
        (0, o.default)(this, r), "animation" === e.type ? this._type = r.Type.ANIMATION : "activation" === e.type ? this._type = r.Type.ACTIVATION : console.warn("Incorrect type of cutscene track"), this._track = e, this._node = t[e.node], this._time = 0, this._isPlaying = !1, this._animations = n
      }

      return (0, i.default)(r, [{
        key: "play", value: function () {
          this._time = 0, this._isPlaying = !0, this._clips = [];
          var e, t = l(this._track.clips);
          try {
            for (t.s(); !(e = t.n()).done;) {
              var n = e.value;
              this._type === r.Type.ANIMATION ? this._clips.push(new a(n, this._node, this._animations)) : this._type === r.Type.ACTIVATION && this._clips.push(new s(n, this._node))
            }
          } catch (e) {
            t.e(e)
          } finally {
            t.f()
          }
          this._clips.length && this._clips.first.startTime <= 0 && this._clips.first.play()
        }
      }, {
        key: "update", value: function (e) {
          this._isPlaying && (this._time += e, this._clips.length && (this._clips.first.isPlaying ? (this._clips.first.update(e), 1 < this._clips.length && this._clips[1].startTime <= this._time && (this._clips.shift(), this._clips.first.play())) : this._clips.first.startTime <= this._time && this._clips.first.play()))
        }
      }], [{
        key: "Type", get: function () {
          return {ANIMATION: 0, ACTIVATION: 1}
        }
      }]), r
    }(), r = function () {
      function s(e, t, n) {
        (0, o.default)(this, s), this._name = e.name, this._tracks = [];
        var r, i = l(e.tracks);
        try {
          for (i.s(); !(r = i.n()).done;) {
            var a = r.value;
            this._tracks.push(new c(a, t, n))
          }
        } catch (e) {
          i.e(e)
        } finally {
          i.f()
        }
      }

      return (0, i.default)(s, [{
        key: "name", get: function () {
          return this._name
        }
      }, {
        key: "play", value: function () {
          var e, t = l(this._tracks);
          try {
            for (t.s(); !(e = t.n()).done;) e.value.play()
          } catch (e) {
            t.e(e)
          } finally {
            t.f()
          }
        }
      }, {
        key: "update", value: function (e) {
          var t, n = l(this._tracks);
          try {
            for (n.s(); !(t = n.n()).done;) t.value.update(e)
          } catch (e) {
            n.e(e)
          } finally {
            n.f()
          }
        }
      }]), s
    }();
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  120: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      a = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      s = r(e("@babel/runtime/helpers/createClass")), r = function () {
        function i(e, t) {
          var r = this;
          (0, a.default)(this, i), this._material = e, this._config = t, this._type = t.type, this._frames = t.frames.split(",").map(function (e) {
            return parseInt(e)
          }), this._framesCount = t.framesCount, this._fps = t.fps, this._offsetType = t.offsetType.split(","), this._offsetSpeed = t.offsetSpeed.split(",").map(function (e) {
            return parseFloat(e)
          }), this._offsetCurve = t.offsetCurve.split(",").map(function (e) {
            return parseFloat(e)
          }), this._playTime = 0, this._currentFrame = 0, this._tween = c2d.Tween.get(e, {loop: !0}), this._tween.to({}, 10), this._tween.addEventListener("change", function (e) {
            var t = PIXI.Ticker.shared.deltaMS / 1e3 * c2d.timescale;
            if (r._playTime += t, "kFrame" === r._type) r._currentFrame += r._fps * t, r._currentFrame >= r._framesCount && (r._currentFrame = 0), r.updateFrame(); else if ("kOffset" === r._type) {
              var n = i.getTextureOffset(r._material);
              if (n) {
                switch (r._offsetType[0]) {
                  case"kLinear":
                    n.x += t * r._offsetSpeed[0];
                    break;
                  case"kSin":
                    n.x = Math.sin(r._playTime * r._offsetSpeed[0]) * r._offsetCurve[0];
                    break;
                  case"kCos":
                    n.x = Math.cos(r._playTime * r._offsetSpeed[0]) * r._offsetCurve[0]
                }
                switch (r._offsetType[1]) {
                  case"kLinear":
                    n.y -= t * r._offsetSpeed[1];
                    break;
                  case"kSin":
                    n.y = 1 - Math.sin(r._playTime * r._offsetSpeed[1]) * r._offsetCurve[1];
                    break;
                  case"kCos":
                    n.y = 1 - Math.cos(r._playTime * r._offsetSpeed[1]) * r._offsetCurve[1]
                }
                1 < n.x && --n.x, 1 < n.y && --n.y, n.x < -1 && (n.x += 1), n.y < -1 && (n.y += 1), i.setTextureOffset(r._material, n)
              } else console.warn(r._material.name + ": doesn't have any textures for animation")
            }
          })
        }

        return (0, s.default)(i, [{
          key: "clone", value: function () {
            return new i(this._material, this._config)
          }
        }, {
          key: "updateFrame", value: function () {
            var e = 1 / this._frames[0], t = 1 / this._frames[1], n = Math.trunc(this._currentFrame / this._frames[0]),
              r = Math.trunc(this._currentFrame) - n * this._frames[0];
            i.setTextureRepeat(this._material, new THREE.Vector2(e, t)), i.setTextureOffset(this._material, this.offset = new THREE.Vector2(r * e, n * t))
          }
        }, {
          key: "config", get: function () {
            return this._config
          }
        }, {
          key: "tween", get: function () {
            return this._tween
          }
        }], [{
          key: "getTextureOffset", value: function (e) {
            return e.map ? e.map.offset : e.normalMap ? e.normalMap.offset : e.metalnessMap ? e.metalnessMap.offset : e.roughnessMap ? e.roughnessMap.offset : e.aoMap ? e.aoMap.offset : e.emissiveMap ? e.emissiveMap.offset : null
          }
        }, {
          key: "setTextureOffset", value: function (e, t) {
            e.map && (e.map.offset = t), e.normalMap && (e.normalMap.offset = t), e.metalnessMap && (e.metalnessMap.offset = t), e.roughnessMap && (e.roughnessMap.offset = t), e.aoMap && (e.aoMap.offset = t), e.emissiveMap && (e.emissiveMap.offset = t)
          }
        }, {
          key: "getTextureRepeat", value: function (e) {
            return e.map ? e.map.repeat : e.normalMap ? e.normalMap.repeat : e.metalnessMap ? e.metalnessMap.repeat : e.roughnessMap ? e.roughnessMap.repeat : e.aoMap ? e.aoMap.repeat : e.emissiveMap ? e.emissiveMap.repeat : null
          }
        }, {
          key: "setTextureRepeat", value: function (e, t) {
            e.map && (e.map.repeat = t), e.normalMap && (e.normalMap.repeat = t), e.metalnessMap && (e.metalnessMap.repeat = t), e.roughnessMap && (e.roughnessMap.repeat = t), e.aoMap && (e.aoMap.offset = t), e.emissiveMap && (e.emissiveMap.repeat = t)
          }
        }]), i
      }();
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  121: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("./StandartMaterial.js")),
      o = r(e("./materials/texture.js")), l = r(e("./materials/lightmap.js")), u = r(e("./materials/lighting.js")),
      c = r(e("./materials/animation.js"));
    n.default = function () {
      function e() {
        (0, i.default)(this, e), this._shaders = {}, this.registerShader("texture", o.default), this.registerShader("lightmap", l.default), this.registerShader("lighting", u.default), this.registerShader("animation", c.default)
      }

      return (0, a.default)(e, [{
        key: "registerShader", value: function (e, t) {
          this._shaders[e] = t
        }
      }, {
        key: "createMaterial", value: function (e, t) {
          return this._shaders[e.shader] ? this._shaders[e.shader](e, t) : (0, s.default)(e, t)
        }
      }]), e
    }()
  }, {
    "./StandartMaterial.js": 122,
    "./materials/animation.js": 123,
    "./materials/lighting.js": 125,
    "./materials/lightmap.js": 126,
    "./materials/texture.js": 129,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  122: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      o = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = function (e, t) {
        var n;
        {
          var r, i;
          e.blend && "additive" === e.blend || "multiply" === e.blend ? ((n = new THREE.MeshBasicMaterial).name = e.name, (i = t.textures[e.mainMap]) && (n.map = i), e.color && (n.color = new THREE.Color(e.color)), n.blending = "multiply" === e.blend ? THREE.MultiplyBlending : THREE.AdditiveBlending, n.transparent = !0, n.depthWrite = !1, n.fog = !1, n.side = THREE.DoubleSide) : ((n = new THREE.MeshPhysicalMaterial).name = e.name, i = t.textures[e.mainMap], a = t.textures[e.bumpMap], r = t.textures[e.emitMap], s = t.textures[e.metallicMap], t = t.textures[e.aoMap], i && (n.map = i), a && (n.normalMap = a, n.normalScale = new THREE.Vector2(e.bumpScale, e.bumpScale)), n.roughness = e.roughness, n.metalness = e.metalness, i = void 0 === e.aoMapIntensity ? 1 : e.aoMapIntensity, s ? (n.metalnessMap = s, n.roughnessMap = s, t && (n.aoMap = s, n.aoMapIntensity = i)) : t && (n.aoMap = t, n.aoMapIntensity = i), e.emission && (r && (n.emissiveMap = r), e.emitColor && (n.emissive = new THREE.Color(e.emitColor), n.emissiveIntensity = 1)), e.color && (n.color = new THREE.Color(e.color)), n.opacity = e.opacity, 1 === e.mode ? n.alphaTest = .5 : 3 === e.mode && (n.transparent = !0), e.doubleSided && (n.side = THREE.DoubleSide), void 0 !== e.fog && (n.fog = e.fog))
        }
        {
          var a;
          e.offset && (a = e.offset.split(",").map(function (e) {
            return parseFloat(e)
          }), o.default.setTextureOffset(n, new THREE.Vector2(a[0], a[1])))
        }
        {
          var s;
          e.repeat && (s = e.repeat.split(",").map(function (e) {
            return parseFloat(e)
          }), o.default.setTextureRepeat(n, new THREE.Vector2(s[0], s[1])))
        }
        e.animation && (n.animation = new o.default(n, e.animation));
        return n
      }, r(e("./MaterialAnimation.js")))
  }, {"./MaterialAnimation.js": 120, "@babel/runtime/helpers/interopRequireDefault": 12}],
  123: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = function (e, t) {
        var u, c, h, d, f = new THREE.ShaderMaterial({
          vertexShader: a,
          fragmentShader: s,
          uniforms: {
            colorMap: {value: t.textures[e.colorMap]}, color: {
              value: function (e) {
                var t = new THREE.Vector4(1, 1, 1, 1), n = new THREE.Color(e.color);
                t.x = n.r, t.y = n.g, t.z = n.b, e.transparent && (t.w = e.opacity);
                return t
              }(e)
            }, mapST: {value: new THREE.Vector4}
          }
        });
        e.transparent && (f.transparent = !0);
        e.frames && (u = e.frames.split(",").map(function (e) {
          return parseInt(e)
        }), c = u[0] * u[1], h = e.fps);
        e.offset && (d = e.offset.split(",").map(function (e) {
          return parseFloat(e)
        }));

        function n(a, s) {
          var o = 0, l = [0, 0], e = c2d.Tween.get(f, {loop: !0});
          e.to({}, 10), e.addEventListener("change", function (e) {
            var t = PIXI.ticker.shared.deltaMS / 1e3 * c2d.timescale;
            if (d && (l[0] += d[0] * t, l[1] -= d[1] * t), u) {
              for (o += h * t; c <= o;) {
                if (!a) {
                  o = c - 1, c2d.Tween.removeTweens(f), s && s();
                  break
                }
                o -= c
              }
              var t = 1 / u[0], n = 1 / u[1], r = Math.trunc(o / u[0]), i = Math.trunc(o) - r * u[0];
              f.uniforms.mapST.value.set(t, n, i * t + l[0], r * n + l[1])
            } else f.uniforms.mapST.value.set(1, 1, l[0], l[1])
          })
        }

        e.autoPlay ? n(!0) : f.playFrameAnimation = n;
        return (0, i.default)(f, e), f
      }, r(e("./base.js"))), n = r(e("./shaderParts/fog.js")),
      a = "\n" + n.default.vert.defines + "\n\nvarying vec2 vUv;\nuniform vec4 mapST;\n\nvoid main() {\n  vUv = uv * mapST.xy + mapST.zw;\n  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n" + n.default.vert.body + "\n  gl_Position = projectionMatrix * mvPosition;\n}\n",
      s = "\n" + n.default.frag.defines + "\n\nvarying vec2 vUv;\n\nuniform vec4 color;\nuniform sampler2D colorMap;\n\n#ifdef ALPHA_TEST\nuniform float cutOff;\n#endif  \n\nvoid main() {\n  vec4 result = texture2D(colorMap, vUv) * color;\n  \n#ifdef ALPHA_TEST\n  if (result.a < cutOff) discard;\n#endif\n\n" + n.default.frag.body + "\n  gl_FragColor = result;\n}\n"
  }, {"./base.js": 124, "./shaderParts/fog.js": 127, "@babel/runtime/helpers/interopRequireDefault": 12}],
  124: [function (e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {value: !0}), n.default = function (e, t) {
      e.name = t.name, e.type = t.shader, void 0 !== t.cutOff && (e.defines.ALPHA_TEST = "", e.uniforms.cutOff = {value: t.cutOff});
      void 0 !== t.blending && (e.blending = THREE[t.blending], e.blending !== THREE.NoBlending && (e.transparent = !0));
      void 0 !== t.doubleSided && (e.side = THREE.DoubleSide);
      void 0 !== t.depthWrite && (e.depthWrite = t.depthWrite);
      void 0 !== t.depthTest && (e.depthTest = t.depthTest);
      t.fog && (e.fog = t.fog, e.uniforms.fogColor = {value: new THREE.Color}, e.uniforms.fogDensity = {value: 0}, e.uniforms.fogNear = {value: 0}, e.uniforms.fogFar = {value: 0})
    }
  }, {}],
  125: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = function (e, t) {
        var n;
        n = new THREE.ShaderMaterial({
          vertexShader: a, fragmentShader: s, uniforms: {
            color: {
              value: function (e) {
                var t = new THREE.Vector4(1, 1, 1, 1), n = new THREE.Color(e.color);
                t.x = n.r, t.y = n.g, t.z = n.b, e.transparent && (t.w = e.opacity);
                return t
              }(e)
            },
            grayscale: {value: 0},
            shininessFactor: {value: e.shininessFactor},
            specularStrength: {value: e.specularStrength},
            secondColor: {value: new THREE.Vector4(0, 0, 0, 0)},
            ambientLightColor: {value: 0},
            lightProbe: {value: 0},
            directionalLights: {value: 0},
            spotLights: {value: 0},
            rectAreaLights: {value: 0},
            pointLights: {value: 0},
            hemisphereLights: {value: 0},
            directionalShadowMap: {value: 0},
            directionalShadowMatrix: {value: 0},
            spotShadowMap: {value: 0},
            spotShadowMatrix: {value: 0},
            pointShadowMap: {value: 0},
            pointShadowMatrix: {value: 0}
          }, lights: !0
        }), e.transparent && (n.transparent = !0);
        e.colorMap && (n.defines.COLOR_MAP = "", n.uniforms.colorMap = {value: t.textures[e.colorMap]});
        e.normalMap && (n.defines.USE_TANGENT = "", n.defines.NORMAL_MAP = "", n.uniforms.normalMap = {value: t.textures[e.normalMap]});
        e.specularMap && (n.defines.SPECULAR_MAP = "", n.uniforms.specularMap = {value: t.textures[e.specularMap]});
        e.reflectionMap && (n.defines.REFLECTION_MAP = "", n.uniforms.reflectionMap = {value: t.textures[e.reflectionMap]}, n.uniforms.reflectionStrength = {value: e.reflectionStrength});
        e.emissMap && (n.defines.EMISS_MAP = "", n.uniforms.emissMap = {value: t.textures[e.emissMap]});
        e.maskMap && (n.defines.MASK_MAP = "", n.uniforms.maskMap = {value: t.textures[e.maskMap]}, n.uniforms.colorMask = {
          value: function (e) {
            var t = new THREE.Vector4(1, 1, 1, 1), n = new THREE.Color(e.colorMask);
            return t.x = n.r, t.y = n.g, t.z = n.b, t.w = e.maskStrength, t
          }(e)
        });
        return (0, i.default)(n, e), n
      }, r(e("./base.js"))), n = r(e("./shaderParts/fog.js")), r = r(e("./shaderParts/skinning.js")),
      a = "\n" + n.default.vert.defines + "\n" + r.default.vert.defines + "\n\nvarying vec2 vUv;\nvarying vec3 vNormal;\nvarying vec3 vViewPosition;\n\n#ifdef USE_TANGENT\n  varying vec3 vTangent;\n  varying vec3 vBitangent;\n#endif\n\t\nvoid main() {\n  vec3 transformed = position;\n  vec3 objectNormal = normal;\n\t#ifdef USE_TANGENT\n\t  vec3 objectTangent = tangent.xyz; \n\t#endif\n  \n" + r.default.vert.body + "\n\n  vec3 transformedNormal = normalMatrix * objectNormal;\n\tvNormal = normalize(transformedNormal);\n\n\t#ifdef USE_TANGENT\n    vec3 transformedTangent = normalMatrix * objectTangent;\n\t\tvTangent = normalize(transformedTangent);\n\t\tvBitangent = normalize(cross(vNormal, vTangent) * tangent.w);    \n\t#endif\n\n  vUv = uv;\n  \n  vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);\n\n" + n.default.vert.body + "\n\n  vViewPosition = -mvPosition.xyz;\n  \n  gl_Position = projectionMatrix * mvPosition;\n}\n",
      s = "\n" + n.default.frag.defines + "\n\nvarying vec2 vUv;\nvarying vec3 vNormal;\nvarying vec3 vViewPosition;\n\n#ifdef USE_TANGENT\n  varying vec3 vTangent;\n  varying vec3 vBitangent;\n#endif\n\nuniform vec4 color;\nuniform float grayscale;\n\n#ifdef COLOR_MAP\nuniform sampler2D colorMap;\n#endif\n\n#ifdef NORMAL_MAP\n  uniform sampler2D normalMap;\n#endif\n\n#ifdef SPECULAR_MAP\n  uniform sampler2D specularMap;\n#endif\n\n#ifdef REFLECTION_MAP\n  uniform sampler2D reflectionMap;\n  uniform float reflectionStrength;\n#endif\n\n#ifdef EMISS_MAP \n  uniform sampler2D emissMap;\n#endif\n\n#ifdef MASK_MAP \n  uniform sampler2D maskMap;\n  uniform vec4 colorMask;\n#endif\n\nuniform float shininessFactor;\nuniform float specularStrength;\n\nuniform vec3 ambientLightColor;\nstruct DirectionalLight {\n  vec3 direction;\n  vec3 color;\n  int shadow;\n  float shadowBias;\n  float shadowRadius;\n  vec2 shadowMapSize;\n};\nuniform DirectionalLight directionalLights[1];\n\nuniform vec4 secondColor;\n\n#ifdef ALPHA_TEST\nuniform float cutOff;\n#endif  \n\nvoid main() {\n#ifdef COLOR_MAP\n  vec4 result = texture2D(colorMap, vUv);\n#else\n  vec4 result = vec4(1.0, 1.0, 1.0, 1.0);\n#endif\n  result.a *= color.a;\n  \n#ifdef ALPHA_TEST\n  if (result.a < cutOff) discard;\n#endif\n  \n#ifdef EMISS_MAP \n  vec3 emissColor = texture2D(emissMap, vUv).rgb;\n#endif\n\n#ifdef MASK_MAP\n  float mask = texture2D(maskMap, vUv).r;\n  result.rgb = mix(result.rgb, colorMask.rgb, mask * colorMask.a);\n#endif\n\n  vec3 viewDirection = normalize(vViewPosition);\n  vec3 lightDirection = directionalLights[0].direction;\n  \n#ifdef NORMAL_MAP\n  mat3 vTBN = mat3(vTangent, vBitangent, vNormal);\n  vec3 mapN = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;\n  \n  mapN.xy = mapN.xy;\n  vec3 normal = normalize(vTBN * mapN);\n#else\n  vec3 normal = vNormal;\n#endif\n  float diffuseFactor = clamp(dot(normal, lightDirection), 0.0, 1.0);\n\t\n  vec3 ambientLighting = ambientLightColor * color.rgb * (1.0 - diffuseFactor);\n  vec3 diffuseLighting = directionalLights[0].color * color.rgb * diffuseFactor;\n\n  vec3 specularReflection;\n#ifdef SPECULAR_MAP\n  vec4 specColor = texture2D(specularMap, vUv);\n#else\n  vec4 specColor = vec4(1.0, 1.0, 1.0, 1.0);\n#endif\n\n  float shininess = 0.1 + specColor.a * shininessFactor;\n\n  if (dot(normal, lightDirection) < 0.0) {\n    specularReflection = vec3(0.0, 0.0, 0.0);\n  } else {\n    specularReflection = specColor.rgb * pow(max(0.0, dot(reflect(-lightDirection, normal), viewDirection)), shininess);\n  }\n  \n#ifdef REFLECTION_MAP\n  vec3 worldRefl = reflect(-viewDirection, normal);\n  vec3 reflectionColor = texture2D(reflectionMap, worldRefl.xy).rgb * specColor.a;\n  \n  result.rgb = mix(result.rgb, reflectionColor, reflectionStrength * specColor.a);\n#endif\n\n  result.rgb *= ambientLighting + diffuseLighting;\n  result.rgb += specularReflection * specularStrength;\n  \n#ifdef EMISS_MAP \n  #ifdef MASK_MAP\n    emissColor *= 1.0 - mask * colorMask.a;\n  #endif\n  \n  result.rgb += emissColor;\n#endif\n\n  result.rgb += secondColor.rgb * secondColor.a;\n\n  result.rgb = mix(result.rgb, vec3(dot(result.rgb, vec3(0.299, 0.587, 0.114))), grayscale);\n\n" + n.default.frag.body + "\n\n  gl_FragColor = result;\n}\n"
  }, {
    "./base.js": 124,
    "./shaderParts/fog.js": 127,
    "./shaderParts/skinning.js": 128,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  126: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = function (e, t) {
        var n;
        n = new THREE.ShaderMaterial({
          vertexShader: a,
          fragmentShader: s,
          uniforms: {
            colorMap: {value: t.textures[e.colorMap]},
            ambientLightColor: {value: 0},
            lightProbe: {value: 0},
            directionalLights: {value: 0},
            spotLights: {value: 0},
            rectAreaLights: {value: 0},
            pointLights: {value: 0},
            hemisphereLights: {value: 0},
            directionalShadowMap: {value: 0},
            directionalShadowMatrix: {value: 0},
            spotShadowMap: {value: 0},
            spotShadowMatrix: {value: 0},
            pointShadowMap: {value: 0},
            pointShadowMatrix: {value: 0}
          },
          lights: !0
        }), e.reflectionMap && e.normalMap && (n.defines.REFLECTION = "", n.uniforms.reflectionMap = {value: t.textures[e.reflectionMap]}, n.uniforms.normalMap = {value: t.textures[e.normalMap]});
        e.lightMap && (n.defines.LIGHT_MAP = "", n.uniforms.lightMap = {value: t.textures[e.lightMap]});
        return (0, i.default)(n, e), n
      }, r(e("./base.js"))), n = r(e("./shaderParts/fog.js")),
      a = "\n" + n.default.vert.defines + "\n\nvarying vec2 vUv;\n\n#ifdef LIGHT_MAP\nattribute vec2 uv2;\nvarying vec2 vUv2;\n#endif\n\nuniform mat4 directionalShadowMatrix[1];\n#ifdef USE_SHADOWMAP\nvarying vec4 vDirectionalShadowCoord[1];\n#endif\n\n#ifdef REFLECTION\nvarying vec3 vWorldViewDir;\n#endif\n\nvoid main() {\n  vUv = uv;\n  \n#ifdef LIGHT_MAP\n  vUv2 = uv2;\n#endif\n\n  vec4 worldPosition = modelMatrix * vec4(position, 1.0);\n  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n\n#ifdef REFLECTION  \n  vWorldViewDir = normalize(cameraPosition - worldPosition.xyz);\n#endif\n\n" + n.default.vert.body + "\n\n#ifdef USE_SHADOWMAP\n  vDirectionalShadowCoord[0] = directionalShadowMatrix[0] * worldPosition;\n#endif\n\n  gl_Position = projectionMatrix * mvPosition;\n}\n",
      s = "\n" + n.default.frag.defines + "\n\nvarying vec2 vUv;\n\nuniform sampler2D colorMap;\n\n#ifdef LIGHT_MAP\nuniform sampler2D lightMap;\nvarying vec2 vUv2;\n#endif\n\n#ifdef REFLECTION\nuniform sampler2D reflectionMap;\nuniform sampler2D normalMap;\n\nvarying vec3 vWorldViewDir;\n#endif\n\n#ifdef ALPHA_TEST\nuniform float cutOff;\n#endif  \n\nstruct DirectionalLight {\n  vec3 direction;\n  vec3 color;\n  int shadow;\n  float shadowBias;\n  float shadowRadius;\n  vec2 shadowMapSize;\n};\nuniform DirectionalLight directionalLights[1];\n\nuniform sampler2D directionalShadowMap[1];\n#ifdef USE_SHADOWMAP\nvarying vec4 vDirectionalShadowCoord[1];\n#endif\n\nconst float PackUpscale = 256. / 255.;\nconst float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3(256. * 256. * 256., 256. * 256.,  256.);\nconst vec4 UnpackFactors = UnpackDownscale / vec4(PackFactors, 1.);\n\nfloat unpackRGBAToDepth(const in vec4 v) {\n\treturn dot(v, UnpackFactors);\n}\n\nfloat texture2DCompare(sampler2D depths, vec2 uv, float compare) {\n  return step(compare, unpackRGBAToDepth(texture2D(depths, uv)));\n}\n\nfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n  const vec2 offset = vec2( 0.0, 1.0 );\n  vec2 texelSize = vec2( 1.0 ) / size;\n  vec2 centroidUV = floor( uv * size + 0.5 ) / size;\n  float lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n  float lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n  float rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n  float rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n  vec2 f = fract( uv * size + 0.5 );\n  float a = mix( lb, lt, f.y );\n  float b = mix( rb, rt, f.y );\n  float c = mix( a, b, f.x );\n  return c;\n}\n\nfloat getShadow(sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord) {\n  float shadow = 1.0;\n  shadowCoord.xyz /= shadowCoord.w;\n  shadowCoord.z += shadowBias;\n  bvec4 inFrustumVec = bvec4(shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0);\n  bool inFrustum = all(inFrustumVec);\n  bvec2 frustumTestVec = bvec2(inFrustum, shadowCoord.z <= 1.0);\n  bool frustumTest = all(frustumTestVec);\n  if (frustumTest) {\n  #if defined(SHADOWMAP_TYPE_PCF)\n    vec2 texelSize = vec2(1.0) / shadowMapSize;\n    float dx0 = - texelSize.x * shadowRadius;\n    float dy0 = - texelSize.y * shadowRadius;\n    float dx1 = + texelSize.x * shadowRadius;\n    float dy1 = + texelSize.y * shadowRadius;\n    shadow = (\n      texture2DCompare(shadowMap, shadowCoord.xy + vec2(dx0, dy0), shadowCoord.z) +\n      texture2DCompare(shadowMap, shadowCoord.xy + vec2(0.0, dy0), shadowCoord.z) +\n      texture2DCompare(shadowMap, shadowCoord.xy + vec2(dx1, dy0), shadowCoord.z) +\n      texture2DCompare(shadowMap, shadowCoord.xy + vec2(dx0, 0.0), shadowCoord.z) +\n      texture2DCompare(shadowMap, shadowCoord.xy, shadowCoord.z) +\n      texture2DCompare(shadowMap, shadowCoord.xy + vec2(dx1, 0.0), shadowCoord.z) +\n      texture2DCompare(shadowMap, shadowCoord.xy + vec2(dx0, dy1), shadowCoord.z) +\n      texture2DCompare(shadowMap, shadowCoord.xy + vec2(0.0, dy1), shadowCoord.z) +\n      texture2DCompare(shadowMap, shadowCoord.xy + vec2(dx1, dy1), shadowCoord.z)\n    ) * (1.0 / 9.0);\n  #elif defined(SHADOWMAP_TYPE_PCF_SOFT)\n    vec2 texelSize = vec2(1.0) / shadowMapSize;\n    float dx0 = - texelSize.x * shadowRadius;\n    float dy0 = - texelSize.y * shadowRadius;\n    float dx1 = + texelSize.x * shadowRadius;\n    float dy1 = + texelSize.y * shadowRadius;\n    shadow = (\n      texture2DShadowLerp(shadowMap, shadowMapSize, shadowCoord.xy + vec2(dx0, dy0), shadowCoord.z) +\n      texture2DShadowLerp(shadowMap, shadowMapSize, shadowCoord.xy + vec2(0.0, dy0), shadowCoord.z) +\n      texture2DShadowLerp(shadowMap, shadowMapSize, shadowCoord.xy + vec2(dx1, dy0), shadowCoord.z) +\n      texture2DShadowLerp(shadowMap, shadowMapSize, shadowCoord.xy + vec2(dx0, 0.0), shadowCoord.z) +\n      texture2DShadowLerp(shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z) + \n      texture2DShadowLerp(shadowMap, shadowMapSize, shadowCoord.xy + vec2(dx1, 0.0), shadowCoord.z) +\n      texture2DShadowLerp(shadowMap, shadowMapSize, shadowCoord.xy + vec2(dx0, dy1), shadowCoord.z) +\n      texture2DShadowLerp(shadowMap, shadowMapSize, shadowCoord.xy + vec2(0.0, dy1), shadowCoord.z) +\n      texture2DShadowLerp(shadowMap, shadowMapSize, shadowCoord.xy + vec2(dx1, dy1), shadowCoord.z)\n    ) * (1.0 / 9.0);\n  #else\n    shadow = texture2DCompare(shadowMap, shadowCoord.xy, shadowCoord.z);\n  #endif\n  }\n  return min(0.75 + shadow, 1.0);\n}\n\nvoid main() {\n  vec4 result = texture2D(colorMap, vUv);\n  \n#ifdef ALPHA_TEST\n  if (result.a < cutOff) discard;\n#endif\n  \n#ifdef REFLECTION\n  vec4 encodedNormal = texture2D(normalMap, vUv);\n  vec3 localCoords = vec3(2.0 * encodedNormal.r - 1.0, 2.0 * encodedNormal.g - 1.0, 2.0 * encodedNormal.b - 1.0);\n\n  vec3 worldRefl = reflect(vWorldViewDir, localCoords);\n\n  vec3 reflectionColor = texture2D(reflectionMap, worldRefl.xy).rgb * encodedNormal.a * 1.0;\n#endif\n  \n#ifdef USE_SHADOWMAP\n  DirectionalLight directionalLight = directionalLights[0];\n  result.rgb *= getShadow(directionalShadowMap[0], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[0]);\n#endif\n\n#ifdef REFLECTION\n  result.rgb += reflectionColor;\n#endif\n\n#ifdef LIGHT_MAP\n  vec3 lightMap_color = texture2D(lightMap, vUv2).rgb;\n  result.rgb *= lightMap_color;\n#endif\n\n" + n.default.frag.body + "\n  \n  gl_FragColor = result;\n}\n"
  }, {"./base.js": 124, "./shaderParts/fog.js": 127, "@babel/runtime/helpers/interopRequireDefault": 12}],
  127: [function (e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
    n.default = {
      vert: {
        defines: "\n#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif\n",
        body: "\n  #ifdef USE_FOG\n\t  fogDepth = -mvPosition.z;\n  #endif\n"
      },
      frag: {
        defines: "\n#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t\t\n    #define LOG2 1.442695\n    #define saturate(a) clamp( a, 0.0, 1.0 )\n    #define whiteCompliment(a) ( 1.0 - saturate( a ) )\n  \n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif\n",
        body: "\n#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment(exp2(-fogDensity * fogDensity * fogDepth * fogDepth * LOG2));\n\t#else\n\t\tfloat fogFactor = smoothstep(fogNear, fogFar, fogDepth);\n\t#endif\n\tresult.rgb = mix(result.rgb, fogColor, fogFactor);\n#endif\n"
      }
    }
  }, {}],
  128: [function (e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
    n.default = {
      vert: {
        defines: "\n#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n",
        body: "\n#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\t\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n\t\t\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif\n"
      }
    }
  }, {}],
  129: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = function (e, t) {
        var n;
        n = new THREE.ShaderMaterial({
          vertexShader: a, fragmentShader: s, uniforms: {
            color: {
              value: function (e) {
                var t = new THREE.Vector4(1, 1, 1, 1), n = new THREE.Color(e.color);
                t.x = n.r, t.y = n.g, t.z = n.b, e.transparent && (t.w = e.opacity);
                return t
              }(e)
            }
          }
        }), e.colorMap && (n.defines.COLOR_MAP = "", n.uniforms.colorMap = {value: t.textures[e.colorMap]});
        e.transparent && (n.transparent = !0);
        t = e.st.split(",").map(function (e) {
          return parseFloat(e)
        });
        return n.uniforms.uvTransform = {value: new THREE.Matrix3}, n.uniforms.uvTransform.value.setUvTransform(t[2], t[3], t[0], t[1], 0, 0, 0), (0, i.default)(n, e), n
      }, r(e("./base.js"))), n = r(e("./shaderParts/fog.js")), r = r(e("./shaderParts/skinning.js")),
      a = "\n" + n.default.vert.defines + "\n" + r.default.vert.defines + "\n\n#ifdef COLOR_MAP\n  varying vec2 vUv;\n  uniform mat3 uvTransform;\n#endif\n\nvoid main() {\n  vec3 transformed = position;\n  vec3 objectNormal = vec3(0.0, 0.0, 0.0); // use in skinningPart\n  \n" + r.default.vert.body + "\n\n#ifdef COLOR_MAP\n  vUv = (uvTransform * vec3(uv, 1)).xy;\n#endif\n\n  vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);\n  \n" + n.default.vert.body + "\n  \n  gl_Position = projectionMatrix * mvPosition;\n}\n",
      s = "\n" + n.default.frag.defines + "\n\nuniform vec4 color;\n\n#ifdef COLOR_MAP\n  varying vec2 vUv;\n  uniform sampler2D colorMap;\n#endif\n\n#ifdef ALPHA_TEST\nuniform float cutOff;\n#endif  \n\nvoid main() {\n#ifdef COLOR_MAP\n  vec4 result = texture2D(colorMap, vUv) * color;\n#else\n  vec4 result = color;\n#endif\n\n#ifdef ALPHA_TEST\n  if (result.a < cutOff) discard;\n#endif\n\n" + n.default.frag.body + "\n\n  gl_FragColor = result;\n}\n"
  }, {
    "./base.js": 124,
    "./shaderParts/fog.js": 127,
    "./shaderParts/skinning.js": 128,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  130: [function (e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {value: !0}), n.default = function (w, t, k, n) {
      if (!(0 <= w && w <= 1 && 0 <= k && k <= 1)) throw new Error("bezier x values must be in [0, 1] range");
      if (w === t && k === n) return a;
      for (var x = new (i ? Float32Array : Array)(E), e = 0; e < E; ++e) x[e] = O(e * R, w, k);

      function r(e) {
        for (var t = 0, n = 1, r = E - 1; n !== r && x[n] <= e; ++n) t += R;
        var i = t + (e - x[--n]) / (x[n + 1] - x[n]) * R, a = j(i, w, k);
        if (S <= a) {
          for (var s = e, o = i, l = w, u = k, c = 0; c < C; ++c) {
            var h = j(o, l, u);
            if (0 === h) return o;
            var d = O(o, l, u) - s;
            o -= d / h
          }
          return o
        }
        if (0 === a) return i;
        for (var f, p, m = e, v = t, b = t + R, y = w, g = k, _ = 0; 0 < (f = O(p = v + (b - v) / 2, y, g) - m) ? b = p : v = p, Math.abs(f) > M && ++_ < P;) ;
        return p
      }

      return function (e) {
        return 0 === e ? 0 : 1 === e ? 1 : O(r(e), t, n)
      }
    };
    var C = 4, S = .001, M = 1e-7, P = 10, E = 11, R = 1 / (E - 1), i = "function" == typeof Float32Array;

    function r(e, t) {
      return 1 - 3 * t + 3 * e
    }

    function O(e, t, n) {
      return ((r(t, n) * e + (3 * n - 6 * t)) * e + 3 * t) * e
    }

    function j(e, t, n) {
      return 3 * r(t, n) * e * e + 2 * (3 * n - 6 * t) * e + 3 * t
    }

    function a(e) {
      return e
    }
  }, {}],
  131: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      r = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("./bezier.js"))),
      a = createjs.Tween,
      i = (a.Ease = createjs.Ease, a.getBezierEasing = r.default, a.NAME = "tween.js", a.VERSION = "0.6.2", a.prototype._addStep);
    a.prototype._addStep = function (e) {
      return 0 < e.d && (e.d = e.d / c2d.timescale), i.call(this, e)
    }, a.prototype.forceComplete = function () {
      return this.setPosition(this.duration)
    }, createjs.Ticker && (createjs.Ticker = null), a.tick = function (e, t) {
      for (var n = a._tweens.slice().sort(function (e, t) {
        return t._prevPosition - t.duration - (e._prevPosition - e.duration)
      }), r = 0; r < n.length; r++) {
        var i = n[r];
        t && !i.ignoreGlobalPause || i._paused || i.tick(i._useTicks ? 1 : e)
      }
    }, PIXI.Ticker.shared.add(function () {
      PIXI.Ticker.shared.deltaMS = Math.max(.001, PIXI.Ticker.shared.deltaTime / PIXI.settings.TARGET_FPMS), createjs.Tween.tick(PIXI.Ticker.shared.deltaMS, !1), window.THREE && window.THREE.SEA3D && THREE.SEA3D.AnimationHandler.update(PIXI.Ticker.shared.deltaMS / 1e3 * c2d.timescale)
    }), n.default = a
  }, {"./bezier.js": 130, "@babel/runtime/helpers/interopRequireDefault": 12}],
  132: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.call = function (e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
          n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : [],
          r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        if (e) return 0 < t ? a.default.invoke(function () {
          return e.apply(r, n)
        }, t) : e.apply(r, n)
      }, n.getUniqId = function () {
        var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 10, s = [65, 90],
          o = ["letter", "number"], l = ["toLowerCase", "toUpperCase"];
        return (0, i.default)(new Array(a)).reduce(function (e) {
          var t = o[Math.round(Math.random())], n = l[Math.round(Math.random())], r = s[0], i = s[1],
            i = Math.round(r - .5 + Math.random() * (i - r + 1)), r = Math.round(.5 + Math.random() * (a - 1 + 1));
          return e + ("letter" === t ? String.fromCodePoint(i) : String(r))[n]()
        }, "")
      }, n.last = function (e, t) {
        var n;
        if (2 != arguments.length) throw new Error("Arguments count should be 2: (function, calls)");
        return function () {
          return e && 0 == --t && (n = e.apply(this, arguments), e = null), n
        }
      }, n.once = function (e) {
        if (1 != arguments.length) throw new Error("Arguments count should be 1: (function)");
        var t;
        return function () {
          return e && (t = e.apply(this, arguments), e = null), t
        }
      }, n.wait = function (t) {
        return new Promise(function (e) {
          c2d.Timeout.invoke(e, t)
        })
      }, r(e("@babel/runtime/helpers/toConsumableArray"))), a = r(e("./Timeout.js"))
  }, {
    "./Timeout.js": 134,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/toConsumableArray": 25
  }],
  133: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/createClass"))),
      a = r(e("@babel/runtime/helpers/classCallCheck"));
    n.default = (0, i.default)(function e() {
      throw(0, a.default)(this, e), new Error("Interfaces can't be inherited!")
    })
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  134: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      a = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      s = r(e("@babel/runtime/helpers/createClass")), o = r(e("./../tween/index.js")), l = 0, u = {}, c = {},
      r = function () {
        function i() {
          (0, a.default)(this, i)
        }

        return (0, s.default)(i, null, [{
          key: "invoke", value: function (e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, n = ++l, r = {};
            return u[n] = r, o.default.get(r).wait(t).call(function () {
              i.clear(n), e()
            }), n
          }
        }, {
          key: "invokeOnce", value: function (e, t) {
            var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
              n = (this.resetInvoke(e), i.invoke(function () {
                delete c[e], t()
              }, n));
            c[e] = n
          }
        }, {
          key: "resetInvoke", value: function (e) {
            c[e] && (i.clear(c[e]), delete c[e])
          }
        }, {
          key: "reportInvokeOnce", value: function () {
            console.group("invokeOnce"), console.log("TIMEOUTS:", JSON.stringify(c)), console.groupEnd()
          }
        }, {
          key: "clear", value: function (e) {
            var t = u[e];
            t ? (o.default.removeTweens(t), delete u[e]) : console.warn("Can not find timeout id to clear it")
          }
        }]), i
      }();
    n.default = r
  }, {
    "./../tween/index.js": 131,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/interopRequireDefault": 12
  }],
  135: [function (e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {value: !0}), n.default = function () {
      var n = "visible", r = "hidden", i = r;
      i in document ? document.addEventListener("visibilitychange", e) : (i = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", e) : (i = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", e) : (i = "msHidden") in document ? document.addEventListener("msvisibilitychange", e) : "onfocusin" in document ? document.onfocusin = document.onfocusout = e : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = e;

      function e(e) {
        var t = {focus: n, focusin: n, pageshow: n, blur: r, focusout: r, pagehide: r};
        (e = e || window.event).type in t ? a(document.body.className = t[e.type]) : a(document.body.className = this[i] ? r : n)
      }

      void 0 !== document[i] && e({type: document[i] ? "blur" : "focus"});

      function a(e) {
        e === n ? window.dispatchEvent(new Event("windowfocusin")) : e === r && window.dispatchEvent(new Event("windowfocusout"))
      }
    }
  }, {}],
  136: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/classCallCheck"))),
      a = r(e("@babel/runtime/helpers/createClass")), s = r(e("@babel/runtime/helpers/inherits")),
      o = r(e("@babel/runtime/helpers/possibleConstructorReturn")), l = r(e("@babel/runtime/helpers/getPrototypeOf"));

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
        return e = r ? (e = (0, l.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, o.default)(this, e)
      }
    }

    r = function (e) {
      (0, s.default)(n, e);
      var t = u(n);

      function n() {
        return (0, i.default)(this, n), t.apply(this, arguments)
      }

      return (0, a.default)(n, [{
        key: "delayMap", value: function (t) {
          for (var n = this, r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1, i = this.length, a = [], s = i; s;) !function () {
            var e = i - s--;
            c2d.Timeout.invoke(function () {
              console.error(e), a.push(t(n[e], e))
            }, r * (1 + e))
          }();
          return a
        }
      }]), n
    }((0, r(e("@babel/runtime/helpers/wrapNativeSuper")).default)(Array));
    n.default = r
  }, {
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21,
    "@babel/runtime/helpers/wrapNativeSuper": 28
  }],
  137: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault"),
      i = (Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, r(e("@babel/runtime/helpers/slicedToArray"))),
      a = r(e("@babel/runtime/helpers/classCallCheck")), s = r(e("@babel/runtime/helpers/createClass")),
      o = r(e("@babel/runtime/helpers/assertThisInitialized")), l = r(e("@babel/runtime/helpers/inherits")),
      u = r(e("@babel/runtime/helpers/possibleConstructorReturn")), c = r(e("@babel/runtime/helpers/getPrototypeOf"));

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
        return e = r ? (e = (0, c.default)(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), (0, u.default)(this, e)
      }
    }

    r = function (e) {
      (0, l.default)(r, e);
      var n = h(r);

      function r(e) {
        var t;
        return (0, a.default)(this, r), t = n.call(this, e), Object.assign((0, o.default)(t), e), t
      }

      return (0, s.default)(r, [{
        key: "pack", get: function () {
          return Object.entries(this)
        }
      }, {
        key: "unpack", value: function (e) {
          return e.reduce(function (e, t) {
            var t = (0, i.default)(t, 2), n = t[0], t = t[1];
            return e[n] = t, e
          }, {})
        }
      }, {
        key: "reduce", value: function (e) {
          e = this.pack.reduce(e, 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : void 0);
          return this.unpack(e)
        }
      }, {
        key: "map", value: function (e) {
          return this.unpack(this.pack.map(e))
        }
      }, {
        key: "filter", value: function (e) {
          return this.unpack(this.pack.filter(e))
        }
      }, {
        key: "find", value: function (e) {
          return this.unpack(this.pack.find(e))
        }
      }, {
        key: "values", value: function () {
          return Object.values(this)
        }
      }, {
        key: "entries", value: function () {
          return Object.entries(this)
        }
      }]), r
    }((0, r(e("@babel/runtime/helpers/wrapNativeSuper")).default)(Object));
    n.default = r
  }, {
    "@babel/runtime/helpers/assertThisInitialized": 4,
    "@babel/runtime/helpers/classCallCheck": 5,
    "@babel/runtime/helpers/createClass": 7,
    "@babel/runtime/helpers/getPrototypeOf": 10,
    "@babel/runtime/helpers/inherits": 11,
    "@babel/runtime/helpers/interopRequireDefault": 12,
    "@babel/runtime/helpers/possibleConstructorReturn": 21,
    "@babel/runtime/helpers/slicedToArray": 23,
    "@babel/runtime/helpers/wrapNativeSuper": 28
  }],
  138: [function (e, t, n) {
    "use strict";

    function r(e, t) {
      var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!r) {
        if (Array.isArray(e) || (r = function (e, t) {
          if (e) {
            if ("string" == typeof e) return o(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0
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
      var i, a = !0, s = !1;
      return {
        s: function () {
          r = r.call(e)
        }, n: function () {
          var e = r.next();
          return a = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            a || null == r.return || r.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function o(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

    Array.isArray || Object.defineProperty(Array, "isArray", {
      value: function (e) {
        return "[object Array]" === Object.prototype.toString.call(e)
      }, enumerable: !1
    }), Array.prototype.from || Object.defineProperty(Array, "from", {
      value: function (e) {
        var t, n = [];
        for (t in e) n.push(e[t]);
        return n
      }, enumerable: !1
    }), Array.prototype.sum || Object.defineProperty(Array.prototype, "sum", {
      value: function () {
        var e, t = 0, n = r(this);
        try {
          for (n.s(); !(e = n.n()).done;) t += e.value
        } catch (e) {
          n.e(e)
        } finally {
          n.f()
        }
        return t
      }, enumerable: !1
    }), Array.prototype.equal || Object.defineProperty(Array.prototype, "equal", {
      value: function (e) {
        if (this.length !== e.length) return !1;
        for (var t = 0; t < this.length; t++) if (this[t] !== e[t]) return !1;
        return !0
      }, enumerable: !1
    }), Array.prototype.min || Object.defineProperty(Array.prototype, "min", {
      value: function () {
        return 0 === this.length ? void 0 : Math.min.apply(Math, this)
      }, enumerable: !1
    }), Array.prototype.max || Object.defineProperty(Array.prototype, "max", {
      value: function () {
        return 0 === this.length ? void 0 : Math.max.apply(Math, this)
      }, enumerable: !1
    }), Array.prototype.contains || Object.defineProperty(Array.prototype, "contains", {
      value: function (e) {
        return -1 !== this.indexOf(e)
      }, enumerable: !1
    }), Array.prototype.call || Object.defineProperty(Array.prototype, "call", {
      value: function (e) {
        return e(this), this
      }, enumerable: !1
    }), Array.prototype.remove || Object.defineProperty(Array.prototype, "remove", {
      value: function (e) {
        e = this.indexOf(e);
        return -1 !== e && (this.splice(e, 1), !0)
      }, enumerable: !1
    }), Array.prototype.exclude || Object.defineProperty(Array.prototype, "exclude", {
      value: function (t) {
        return this.filter(function (e) {
          return t.indexOf(e) < 0
        })
      }, enumerable: !1
    }), Array.prototype.last || Object.defineProperty(Array.prototype, "last", {
      get: function () {
        return this[this.length - 1]
      }, enumerable: !1
    }), Array.prototype.first || Object.defineProperty(Array.prototype, "first", {
      get: function () {
        return this[0]
      }, enumerable: !1
    }), Array.prototype.flat || Object.defineProperty(Array.prototype, "flat", {
      configurable: !0, value: function n() {
        var r = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
        return r ? Array.prototype.reduce.call(this, function (e, t) {
          return Array.isArray(t) ? e.push.apply(e, n.call(t, r - 1)) : e.push(t), e
        }, []) : Array.prototype.slice.call(this)
      }, writable: !0
    }), Array.prototype.random || Object.defineProperty(Array.prototype, "random", {
      value: function () {
        return this[Math.floor(Math.random() * this.length)]
      }, enumerable: !1
    }), Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
      value: function (e, t) {
        if (null == this) throw new TypeError('"this" is null or not defined');
        var n = Object(this), r = n.length >>> 0;
        if (0 == r) return !1;
        var i, a, t = 0 | t, s = Math.max(0 <= t ? t : r - Math.abs(t), 0);
        for (; s < r;) {
          if ((i = n[s]) === (a = e) || "number" == typeof i && "number" == typeof a && isNaN(i) && isNaN(a)) return !0;
          s++
        }
        return !1
      }
    }), Array.prototype.flatMap || Object.defineProperty(Array.prototype, "flatMap", {
      value: function (r) {
        return this.reduce(function (e, t, n) {
          return e.concat(r(t, n, this))
        }, [])
      }, enumerable: !1
    })
  }, {}],
  139: [function (e, t, n) {
    "use strict";
    var r = window.device, i = (r.instagram = function () {
      return -1 < window.navigator.userAgent.toLowerCase().toLowerCase().indexOf("instagram ")
    }, r.mobileEmulator = function () {
      return (this.mobile() || this.ipad()) && ("MacIntel" === window.navigator.platform || "Win32" === window.navigator.platform)
    }, window.device.mobile), a = (r.mobile = function () {
      return i.call(this) || -1 !== window.navigator.platform.toLowerCase().indexOf("blackberry")
    }, window.device.blackberry), s = (r.blackberry = function () {
      return a.call(this) || -1 !== window.navigator.platform.toLowerCase().indexOf("blackberry")
    }, window.device.chrome), o = (r.uc = function () {
      return s.call(this) && -1 !== window.navigator.userAgent.toLowerCase().indexOf("ucbrowser")
    }, r.chrome = function () {
      return s.call(this) && -1 == window.navigator.userAgent.toLowerCase().indexOf("ucbrowser")
    }, window.device.tablet);
    r.tablet = function () {
      var e, t = o.call(this);
      return -1 !== window.navigator.userAgent.toLowerCase().indexOf("ucbrowser") && (e = Math.min(window.innerWidth, window.innerHeight) / Math.max(window.innerWidth, window.innerHeight), t = t || 2 / 3 < e), t
    }, r.supportGenericFullscreen = function () {
      return this.android() || this.blackberry()
    }, r.mini = function () {
      return 240 == window.innerWidth && 320 == window.innerHeight
    }
  }, {}],
  140: [function (e, t, n) {
    "use strict";
    var r;
    Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector), (r = Element.prototype).closest = r.closest || function (e) {
      for (var t = this; t;) {
        if (t.matches(e)) return t;
        t = t.parentElement
      }
      return null
    }
  }, {}],
  141: [function (e, t, n) {
    "use strict";
    Math.randomRange = function (e, t) {
      return Math.random() * (t - e) + e
    }, Math.randomRangeInt = function (e, t) {
      return Math.floor(Math.random() * (t - e)) + e
    }, Math.randomColor = function () {
      return "0x" + Math.floor(16777215 * Math.random()).toString(16)
    }
  }, {}],
  142: [function (e, t, n) {
    "use strict";
    Number.isNumeric = function (e) {
      return !isNaN(parseFloat(e)) && isFinite(e)
    }
  }, {}],
  143: [function (e, t, n) {
    "use strict";
    var r = e("@babel/runtime/helpers/interopRequireDefault")(e("@babel/runtime/helpers/typeof"));

    function f(e, t) {
      var n, r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (!r) {
        if (Array.isArray(e) || (r = function (e, t) {
          if (e) {
            if ("string" == typeof e) return o(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0
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
      var i, a = !0, s = !1;
      return {
        s: function () {
          r = r.call(e)
        }, n: function () {
          var e = r.next();
          return a = e.done, e
        }, e: function (e) {
          s = !0, i = e
        }, f: function () {
          try {
            a || null == r.return || r.return()
          } finally {
            if (s) throw i
          }
        }
      }
    }

    function o(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }

    Object.defineProperty(Object.prototype, "isObject", {
      value: function (e) {
        return null !== e && ("object" === (0, r.default)(e) || "function" == typeof e)
      }, enumerable: !1
    }), Object.defineProperty(Object.prototype, "isImplements", {
      value: function (e) {
        return this.__interfaces && this.__interfaces.contains(e.name)
      }, enumerable: !1
    }), Object.defineProperty(Object.prototype, "implement", {
      value: function () {
        function e(e) {
          return null !== e && "function" == typeof e
        }

        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
        for (var i = 0, a = n; i < a.length; i++) {
          var s = a[i], o = (d = u = h = c = l = o = void 0, s), l = this;
          if (!e(o.constructor)) throw new Error("Only class can be interface of another class!");
          var u, c = Object.getOwnPropertyNames(o.prototype), h = (c.shift(), f(c));
          try {
            for (h.s(); !(u = h.n()).done;) {
              var d = u.value;
              if (!e(o.prototype[d])) throw new Error("Interfaces can describe only class methods!");
              if (!e(l[d])) throw new Error("The class '".concat(l.constructor.name, "' must implement method '").concat(d, "' from interface '").concat(o.name, "'"))
            }
          } catch (e) {
            h.e(e)
          } finally {
            h.f()
          }
          this.__interfaces || (this.__interfaces = []), this.__interfaces.push(s.name)
        }
      }, enumerable: !1
    }), Object.defineProperty(Object.prototype, "deepFreeze", {
      value: function (t) {
        return Object.freeze(t), Object.getOwnPropertyNames(t).forEach(function (e) {
          e in t && null !== t[e] && ("object" === (0, r.default)(t[e]) || "function" == typeof t[e]) && !Object.isFrozen(t[e]) && Object.deepFreeze(t[e])
        }), t
      }, enumerable: !1
    }), Object.defineProperty(Object.prototype, "getClass", {
      value: function (e) {
        return e.constructor
      }, enumerable: !1
    }), Object.keys || (Object.keys = function (e) {
      var t, n = [];
      for (t in e) e.hasOwnProperty(t) && n.push(t);
      return n
    }), Object.values || (Object.values = function (t) {
      return Object.keys(t).map(function (e) {
        return t[e]
      })
    }), Object.entries || (Object.entries = function (t) {
      return Object.keys(t).map(function (e) {
        return [e, t[e]]
      })
    })
  }, {"@babel/runtime/helpers/interopRequireDefault": 12, "@babel/runtime/helpers/typeof": 26}],
  144: [function (e, t, n) {
    "use strict";
    PIXI.Ticker.shared.autoStart = !1, PIXI.Ticker.shared.stop(), PIXI.isAntialiasNeeded = function () {
      return !(!c2d.env.device.ios() || 15 === c2d.env.device.iOSVersion())
    }, PIXI.getMaxPrecision = function (e) {
      var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "highp";
      if (!e) return "lowp";
      if ("highp" === t) {
        if (0 < e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision && 0 < e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision) return "highp";
        t = "mediump"
      }
      return "mediump" === t && 0 < e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision && 0 < e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision ? "mediump" : "lowp"
    }, Object.defineProperty(PIXI.Container.prototype, "removeFromParent", {
      value: function () {
        this.parent && this.parent.removeChild(this)
      }, enumerable: !1
    }), ["onPointerDown", "onPointerCancel", "onPointerUp", "onPointerMove"].forEach(function (e) {
      var t = PIXI.InteractionManager.prototype[e];
      PIXI.InteractionManager.prototype[e] = function (e) {
        e.touches && 1 < e.touches.length ? e.preventDefault() : t.call(this, e)
      }
    })
  }, {}],
  145: [function (e, t, n) {
    "use strict";
    Object.defineProperty(String.prototype, "contains", {
      value: function (e) {
        return "" !== e && -1 !== this.indexOf(e)
      }, enumerable: !1, configurable: !1
    }), Object.defineProperty(String.prototype, "replaceAll", {
      value: function (e, t) {
        return this.split(e).join(t)
      }, enumerable: !1, configurable: !1
    }), String.prototype.trimLeft || (String.prototype.trimLeft = function () {
      return this.replace(/^[\s\uFEFF\xA0]+/g, "")
    }), String.prototype.trimRight || (String.prototype.trimRight = function () {
      return this.replace(/[\s\uFEFF\xA0]+$/g, "")
    }), String.prototype.substr || (String.prototype.substr = function (e) {
      for (var t = "", n = 0 === (n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0) ? this.length : n, e = 0 <= e ? e > this.length ? this.length : e : 0 < this.length + e ? this.length + e : 0, r = e + n > this.length ? this.length : e + n, i = e; i < r; i++) t += this[i];
      return t
    })
  }, {}]
}, {}, [109]);
