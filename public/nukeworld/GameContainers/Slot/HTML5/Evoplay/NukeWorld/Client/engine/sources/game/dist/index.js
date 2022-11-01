!function e(t, i, s) {
    function n(r, a) {
        if (!i[r]) {
            if (!t[r]) {
                var l = "function" == typeof require && require;
                if (!a && l) return l(r, !0);
                if (o) return o(r, !0);
                var c = new Error("Cannot find module '" + r + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var h = i[r] = {exports: {}};
            t[r][0].call(h.exports, (function (e) {
                return n(t[r][1][e] || e)
            }), h, h.exports, e, t, i, s)
        }
        return i[r].exports
    }

    for (var o = "function" == typeof require && require, r = 0; r < s.length; r++) n(s[r]);
    return n
}({
    1: [function (e, t, i) {
        "use strict";

        function s(e) {
            this.Latest = e;
            const t = Object.getOwnPropertyDescriptors(e.prototype), i = Object.getPrototypeOf(e.prototype);
            Object.defineProperties(this.prototype, t), Object.setPrototypeOf(this.prototype, i)
        }

        Object.defineProperty(i, "__esModule", {value: !0}), i.modifiable = void 0, i.modifiable = function (e) {
            const t = Object.getOwnPropertyDescriptors(e.prototype), i = Object.getPrototypeOf(e.prototype);

            class n extends e {
            }

            return Object.defineProperties(n.prototype, t), Object.setPrototypeOf(n.prototype, i), n.Latest = e, n.modify = s, n
        }
    }, {}],
    2: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.Game = void 0;
        const s = e("./components/ComponentsManager"), n = e("./GameController"), o = e("./LayersManager"),
            r = e("./integration/RemoteApi"), a = e("./components/inner/index");
        i.Game = class {
            constructor({application: e}) {
                this.enableAudioOnResume = !1, this.paused = !1, this.systemPaused = !1, this.application = e, this.initialize(), this.addSignals()
            }

            initialize() {
                this.localStorage = new c2d.store.LocalStorage(this.application.title), this.assetsStore = new c2d.store.AssetsStore, this.cookies = new c2d.store.Cookies(this.application.title), this.device = new c2d.Device, this.audioManager = new c2d.AudioManager;
                const e = {
                    device: this.device,
                    canvasConfig: this.application.canvas,
                    resizeHandler: e => this.onResizeScreen(e)
                };
                this.layout = c2d.Layout.create(e);
                const t = {
                    application: this.application,
                    platform: this.device.type,
                    language: jsvars.language,
                    resourcesDirectory: this.device.resourcesResolution,
                    respectVersions: !1 !== jsvars.respectVersions
                };
                this.loader = new c2d.Loader(t), this.engine = new c2d.Engine(this.layout.canvas), this.localization = c2d.Localization, this.size = {
                    gameField: {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    }
                }, this.gameController = new n.GameController(this), this.componentsManager = new s.ComponentsManager, this.components = this.componentsManager.components, this.sources = a.sources, this.inactiveHandler(), this.remoteApi = new r.RemoteApi, this.remoteApi.pauseHandler = e => {
                    this.paused = e, this.checkNeedPause()
                }, c2d.time.start()
            }

            checkNeedPause() {
                this.systemPaused || this.paused ? this.pause() : this.resume()
            }

            inactiveHandler() {
                let e, t, i, s = this;
                void 0 !== document.hidden ? (e = "hidden", i = "visibilitychange", t = "visibilityState") : void 0 !== document.mozHidden ? (e = "mozHidden", i = "mozvisibilitychange", t = "mozVisibilityState") : void 0 !== document.msHidden ? (e = "msHidden", i = "msvisibilitychange", t = "msVisibilityState") : void 0 !== document.webkitHidden && (e = "webkitHidden", i = "webkitvisibilitychange", t = "webkitVisibilityState"), document.addEventListener(i, (function () {
                    s.systemPaused = "visible" !== document[t], s.checkNeedPause()
                }), !1)
            }

            addSignals() {
                this.signals = {
                    onGoToUrl: new c2d.Signal,
                    onApplicationReady: new c2d.Signal,
                    onAudioEnabled: new c2d.Signal
                }
            }

            run(e) {
                this._hidePreLoader = e, c2d.series([this.createCanvas, [this.loadLayers, this.loadFSM], this.createLayers, this.createFSM, this.createComponents, this.loadGameResources, this.startGame], this)
            }

            pause() {
                c2d.time.pause(), this.engine.pause(), this.enableAudioOnResume = game.isAudioEnabled(), this.audioManager.enabled = !1
            }

            resume() {
                c2d.time.resume(), this.engine.resume(), this.enableAudioOnResume && (this.audioManager.enabled = !0)
            }

            loadComplete() {
                this._hidePreLoader(), this.loadAudio(), this.signals.onApplicationReady.emit(), this.remoteApi.onLoad()
            }

            loadLayers(e) {
                const t = `${this.loader.paths.game}data/layers.json`;
                this.loader.add("layers", t, e)
            }

            createLayers(e) {
                this.layers = new o.LayersManager;
                const t = this.loader.resources.layers.data;
                this.layers.initialize(this.engine.stage, t), e()
            }

            createCanvas(e) {
                this.engine.createCanvas(this.device, this.application.renderer), e()
            }

            onResizeScreen(e) {
                this.size = e, this.engine.resize(e.canvasField.width, e.canvasField.height, e.scale), this.layers && this.layers.resize(this.size), Object.values(this.components).forEach(t => t.resizeScreen(e))
            }

            createComponents(e) {
                this.gameController.instantiateComponents(this.application.components), e()
            }

            loadGameResources(e) {
                this.gameController.loadGame(e)
            }

            loadFSM(e) {
                const t = `${this.loader.paths.game}data/fsm.json`;
                this.loader.add("fsm", t, e), this.loader.load()
            }

            createFSM(e) {
                const t = new c2d.fsm.FSMConfig(this.loader.resources.fsm.data);
                this.fsm = new c2d.fsm.FSM(t, this.componentsManager.handlers), e()
            }

            startGame(e) {
                this.gameController.createComponents(this.application.components), this.layout.init(), this.gameController.initializeComponents(), this.fsm.registerStates(), this.fsm.start(), e()
            }

            loadAudio(e) {
                const t = c2d.last(() => {
                    this.gameController.shareComponentsResources(["audios"])
                }, Object.values(this.components).length);
                Object.values(this.components).forEach(e => e.loadAudio(() => {
                    Object.keys(this.audioManager.groups).forEach(e => {
                        this.setAudioGroupVolume(e, this.getAudioGroupVolume(e))
                    }), t()
                })), this.setMasterVolume(this.getMasterVolume()), this.setAudioEnabled(this.isAudioEnabled()), c2d.display.Factory.types.FactoryButton.signals.playAudio.connect(e => this.audioManager.playAudio(e));
                let i = this.isAudioEnabled();
                c2d.utils.trackFocus({
                    onLost: () => {
                        i = this.isAudioEnabled(), this.audioManager.enabled = !1
                    }, onFound: () => {
                        i && (this.audioManager.enabled = !0)
                    }
                }), e && e()
            }

            isAudioEnabled() {
                return this.localStorage.get("audio_enabled", !0)
            }

            setAudioEnabled(e) {
                this.audioManager.enabled = e, this.localStorage.set("audio_enabled", e), this.signals.onAudioEnabled.emit(e)
            }

            getMasterVolume() {
                return this.localStorage.get("master_volume", 1)
            }

            setMasterVolume(e) {
                this.audioManager.setMasterVolume(e), this.localStorage.set("master_volume", e)
            }

            setAudioGroupVolume(e, t) {
                this.audioManager.setGroupVolume(e, t), this.localStorage.set(`${e}_volume`, t)
            }

            getAudioGroupVolume(e) {
                return this.localStorage.get(`${e}_volume`, 1)
            }

            goToUrl(e, t) {
                this.signals.onGoToUrl.emit({
                    url: e,
                    type: t
                }), jsvars.redirect_inside_iframe ? window.location.href = e : window.top.location.href = e, this.remoteApi.onGoToUrl(t)
            }
        }
    }, {
        "./GameController": 3,
        "./LayersManager": 4,
        "./components/ComponentsManager": 6,
        "./components/inner/index": 17,
        "./integration/RemoteApi": 19
    }],
    3: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.GameController = void 0;
        const s = e("./components/inner/ComponentDescriptor");
        i.GameController = class {
            constructor(e) {
                this.game = e
            }

            loadGame(e) {
                this.game.device.supportWebP && this.game.loader.pre((e, t) => {
                    if (["webp", "png", "jpg"].includes(e.extension)) {
                        const t = Object.values(this.game.components).map(e => e.resourceLoader.manifest).filter(Boolean),
                            i = e.url.lastIndexOf(e.extension),
                            s = e.url.slice(0, i) + e.url.slice(i).replace(e.extension, "webp"),
                            n = -1 !== e.url.indexOf("?") ? e.url.substring(e.url.indexOf("?")) : "";
                        t.some(e => e.files.find(e => e + n === s)) && (e.url = s, e.extension = "webp")
                    }
                    t()
                }), game.loader.pre((e, t) => {
                    e.loadType = e._determineLoadType(), this.game.application.version && (e.url += `?version=${this.game.application.version.replace(/\./g, "_")}`), t()
                }), this.loadResources(e)
            }

            initializeComponents() {
                this.shareComponentsResources(["configs", "skeletons", "textures", "animations", "fonts", "r3d"]), Object.values(this.game.components).forEach(e => {
                    e.getConfigsData({type: "strings"}).forEach(e => this.game.localization.addToDictionary(e)), e.initialize()
                }), Object.values(this.game.componentsManager.handlers).forEach(e => e.initialize())
            }

            instantiateComponents(e) {
                Object.entries(e).forEach(([e, t]) => {
                    this.game.componentsManager.instantiateComponent(new s.ComponentDescriptor(e, t))
                })
            }

            loadResources(e) {
                const t = Object.values(this.game.components), i = c2d.last(e, t.length);
                t.forEach(e => e.loadResources(i)), this.game.loader.load()
            }

            createComponents(e) {
                Object.entries(e).forEach(([e, t]) => {
                    this.game.componentsManager.createComponent(Object.assign({name: e}, t), {audio: this.game.audioManager})
                })
            }

            shareComponentsResources(e) {
                const t = Object.values(this.game.components);
                t.filter(e => e.resourceLoader.sharedResources).forEach(t => {
                    t.resourceLoader.sharedResources.map(e => this.game.components[e] || ((e, t) => {
                        throw new Error(`Can not find shared component ${t} required by ${e}`)
                    })(t.name, e)).forEach(i => ((e, t, i) => {
                        i.forEach(i => {
                            t.assetsStore[i] = Object.assign(Object.assign({}, e.assetsStore.getPublicResources(i)), t.assetsStore[i])
                        })
                    })(i, t, e))
                })
            }
        }
    }, {"./components/inner/ComponentDescriptor": 10}],
    4: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.LayersManager = void 0;
        i.LayersManager = class {
            constructor() {
                this.list = {}
            }

            initialize(e, t) {
                this.tree = new c2d.display.FactoryTree({config: t, parent: e}), this.list = this.tree.nodeMap
            }

            resize(e) {
                this.tree ? this.tree.update(null, e) : Object.values(this.list).forEach(e => e.update())
            }

            toObjectConfig(e) {
                if (c2d.type.isObject(e)) return e;
                if (c2d.type.isArray(e)) return e.reduce((e, t) => (e[t] = t, e), {});
                if (c2d.type.isString(e)) {
                    const t = {};
                    return t[e] = e, t
                }
                return null
            }
        }
    }, {}],
    5: [function (e, t, i) {
        "use strict";
        var s = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        }, n = this && this.__rest || function (e, t) {
            var i = {};
            for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (i[s] = e[s]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var n = 0;
                for (s = Object.getOwnPropertySymbols(e); n < s.length; n++) t.indexOf(s[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[n]) && (i[s[n]] = e[s[n]])
            }
            return i
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.ComponentResourcesLoader = void 0;
        const o = e("./Config");
        i.ComponentResourcesLoader = class {
            constructor(e) {
                this.postLoadHandlers = [], this.component = e, this.loader = game.loader, this.sharedResources = e.descriptor.sharedResources, this._spineAtlas = new PIXI.spine.TextureAtlas, this.postLoadHandlers = [], PIXI.LoaderResource.setExtensionXhrType("glb", PIXI.LoaderResource.XHR_RESPONSE_TYPE.BUFFER), PIXI.LoaderResource.setExtensionXhrType("r3d", PIXI.LoaderResource.XHR_RESPONSE_TYPE.BUFFER)
            }

            loadFile(e, t) {
                this.loader.add(e, e, {}, i => {
                    i.error && console.error(e, i.error), t(i.data)
                })
            }

            loadFileSync(e) {
                return s(this, void 0, void 0, (function* () {
                    return new Promise(t => {
                        this.loadFile(e, e => {
                            t(e)
                        })
                    })
                }))
            }

            load(e) {
                return s(this, void 0, void 0, (function* () {
                    yield this.loadManifest(), yield this.loadTranslations(), yield this.loadResourcesConfig(), yield this.loadResources(), this.callPostLoadHandlers(), e()
                }))
            }

            callPostLoadHandlers() {
                this.postLoadHandlers.forEach(e => e()), this.postLoadHandlers = []
            }

            loadManifest() {
                return s(this, void 0, void 0, (function* () {
                    const {directories: e} = this.component.descriptor;
                    this.manifest = new c2d.Manifest(this.loader);
                    for (const t of e) {
                        const e = yield this.loadFileSync(this.component.descriptor.getManifestPath(t));
                        this.manifest.addFiles(e, t)
                    }
                }))
            }

            parseResource(e, t, i) {
                const {file: s, set: o, type: r} = i, a = n(i, ["file", "set", "type"]);
                if (s) {
                    const n = `/resources/${t}/${s}`, o = this.manifest.getExtraDirectoriesFiles(n);
                    let r = this.manifest.getFilesPack(n);
                    if (o && (1 == Object.keys(o).length ? r = Object.values(o)[0] : i.extraFiles = o), i.file = r.length > 1 ? r : r[0], !i.file && !i.extraFiles) throw new Error(`Can not find file ${e}${n} in manifest `)
                }
                Object.values(a).forEach(i => {
                    c2d.type.isObject(i) && this.parseResource(e, t, i)
                })
            }

            loadTranslations() {
                return s(this, void 0, void 0, (function* () {
                    const e = this.manifest.getFilesInDirectory("translations");
                    let t = this.manifest.language;
                    !e.length || "string" == typeof t && "true" !== t && "false" !== t && t.length || (t = "en");
                    const i = e.find(e => e.name.indexOf(t) == e.name.length - t.length);
                    if (i) {
                        const e = i.name.substring(0, i.name.length - t.length - 1),
                            s = yield this.loadFileSync(i.path);
                        game.localization.addToDictionary(((e, t) => {
                            const i = {};
                            return Object.entries(e).forEach(([e, s]) => i[`${t}.${e}`] = s), i
                        })(s, e))
                    }
                }))
            }

            loadResourcesConfig() {
                return s(this, void 0, void 0, (function* () {
                    this.resourcesConfig = {};
                    const e = this.component.descriptor, t = (e, {resources: t, loadRawImages: i = !1}) => {
                        this._filterResources(t), Object.entries(t).forEach(([t, i]) => {
                            Object.values(i).forEach(i => {
                                this.parseResource(e, t, i)
                            })
                        }), c2d.utils.Object.mergeDeep(this.resourcesConfig, t, !0), this.loadRawImages = i
                    };
                    for (const i in e.resources) {
                        const s = e.paths[i];
                        for (const n of e.resources[i]) {
                            const i = yield this.loadFileSync(`${s}${e.typeAsPath}/${n}`);
                            t(`${s}${e.typeAsPath}`, i)
                        }
                    }
                }))
            }

            loadResources() {
                return s(this, void 0, void 0, (function* () {
                    return new Promise(e => {
                        const t = {
                            fonts: (e, t) => this.loadFonts(e, t),
                            configs: (e, t) => this.loadConfigs(e, t),
                            spritesheets: (e, t) => this.loadSpriteSheets(e, t),
                            skeletons: (e, t) => this.loadSkeletons(e, t),
                            textures: (e, t) => this.loadTextures(e, t),
                            gltf: (e, t) => this.loadGltf(e, t),
                            r3d: (e, t) => this.loadR3d(e, t)
                        }, i = c2d.last(e, Object.keys(t).length);
                        Object.entries(t).forEach(([e, t]) => t(this.resourcesConfig[e], c2d.once(i)))
                    })
                }))
            }

            loadSpriteSheets(e = [], t) {
                const i = e => {
                    this._spineAtlas.addTextureHash(e.textures, !1), this.component.assetsStore.addTextures(e.textures), e.data.animations && this.component.assetsStore.addAnimations(e.data.animations)
                }, s = ({file: e, pixelize: t, prerender: s}, n) => {
                    this.loader.add(e, e, {}, e => {
                        i(e), t && (e.spritesheet.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST), s && game.engine.renderer.texture.updateTexture(e.spritesheet.baseTexture), n()
                    })
                };
                e = e.filter(({useRawImages: e}) => !e || !this.loadRawImages);
                const n = c2d.last(t, e.length, !0);
                e.forEach(({file: e, pixelize: t, prerender: i}) => {
                    const o = [].concat(e), r = c2d.last(n, o.length, !0);
                    o.forEach(e => s({file: e, pixelize: t, prerender: i}, r))
                })
            }

            loadImages(e, t) {
                if (!this.loadRawImages) return void t();
                const i = c2d.last(t, e.length, !0), s = {};
                e.forEach(e => {
                    const t = `${this.component.descriptor.paths.game}${this.component.descriptor.name}/assets/spine/images/${e}.png`;
                    this.loader.add(e, t, s, e => {
                        const t = {};
                        t[e.name] = e.texture, this.component.assetsStore.addTextures(t), this._spineAtlas.addTextureHash(t, !1), i()
                    })
                })
            }

            loadSkeletons(e = [], t) {
                const i = [], s = c2d.last(() => {
                    const e = [...new Set(i.flatMap(e => e.files))];
                    this.loadImages(e, t)
                }, e.length, !0), n = {spineAtlas: this._spineAtlas, metadata: {spineAtlas: !1}};
                e.forEach(({file: e, scale: t, attachLabels: o}) => {
                    const r = new c2d.File(e).name;
                    this.loader.add(e, e, n, e => {
                        i.push(this._onSkeletonLoaded(r, e.data, {scale: t, attachLabels: o})), s()
                    })
                })
            }

            loadTextures(e = [], t) {
                const i = game.engine.compressedExtensions;
                let s = null;
                i.dxt ? s = "dds" : i.pvrtc ? s = "pvr" : i.astc && (s = "astc");
                const n = c2d.last(t, e.length, !0);
                e.forEach(({file: e, compressed: t}) => {
                    const i = new c2d.File(e);
                    t && s && (i.extension = s);
                    this.loader.add(i.name, i.path, {}, e => {
                        e.texture.baseTexture.alphaMode = PIXI.ALPHA_MODES.PREMULTIPLY_ALPHA, this.component.assetsStore.addTexture(i.name, e.texture), n()
                    })
                })
            }

            loadGltf(e = [], t) {
                const i = c2d.last(t, e.length, !0);
                e.forEach(({file: e}) => {
                    const t = new c2d.File(e).name;
                    this.loader.add(e, e, {}, e => {
                        const s = new c2d.display3d.GLTFLoader;
                        s.load(e.data, () => {
                            this.component.assetsStore.addScene3d(t, s.scene), i()
                        })
                    })
                })
            }

            loadR3d(e = [], t) {
                const i = c2d.last(t, e.length, !0);
                e.forEach(({file: e}) => {
                    const t = new c2d.File(e).name;
                    this.loader.add(e, e, {}, e => {
                        this._on3DResourcesLoaded(t, e.data), i()
                    })
                })
            }

            _onSkeletonLoaded(e, t, {scale: i, attachLabels: s}) {
                const n = t, o = n.bones.find(e => "root" === e.name);
                i && (o.scaleX = o.scaleY = i), n.attachLabels = s, this.postLoadHandlers.push(() => {
                    const t = (new PIXI.spine.SpineParser).createJsonParser().readSkeletonData(this._spineAtlas, n);
                    n.attachLabels && this._addSpineLabel(e, t), this.component.assetsStore.addSkeleton(e, t)
                });
                const r = n.events || {};
                return Object.entries(r).filter(([e, t]) => t.audio).forEach(([e, t]) => {
                    n.attachSounds = n.attachSounds || {}, n.attachSounds[e] = t
                }), n
            }

            _on3DResourcesLoaded(e, t) {
                this.postLoadHandlers.push(() => {
                    const i = new c2d.display3d.R3DLoader(this.component.assetsStore);
                    i.load(t), this.component.assetsStore.addResource3d(e, i.scene)
                })
            }

            loadConfigs(e = {}, t) {
                const i = Object.entries(e).filter(([e, t]) => "on_demand" !== t.load), s = c2d.last(t, i.length, !0);
                i.forEach(([e, t]) => this._loadConfig(e, t, s))
            }

            _loadConfig(e, t, i, s, r = []) {
                const {file: a, extraFiles: l, set: c} = t, h = n(t, ["file", "extraFiles", "set"]);
                if (s && !a && !l) return void this.loadChildConfigs(s, h, i, [...r, e]);
                const u = new o.Config(Object.assign(Object.assign({}, t), {name: e}));
                s ? s.addChild(r, u) : this.component.assetsStore.addConfig(u);
                const d = () => this.loadChildConfigs(u, h, i);
                if (l || a) {
                    if (l) {
                        const e = Object.entries(l), t = c2d.last(() => d(), e.length);
                        e.forEach(([e, i]) => {
                            this.loadFile(i, i => {
                                u.addData(i, e), t()
                            })
                        })
                    }
                    if (a) {
                        const e = e => {
                            u.addData(e), d()
                        };
                        this.loadFile(a, e)
                    }
                } else d()
            }

            loadChildConfigs(e, t, i, s) {
                const n = Object.entries(t), o = c2d.last(i, n.length, !0);
                n.forEach(([t, i]) => {
                    c2d.type.isObject(i) ? this._loadConfig(t, i, o, e, s) : o()
                })
            }

            loadFonts(e = [], t) {
                const i = c2d.last(t, e.length, !0);
                if (e.length) {
                    const t = document.createElement("div");
                    t.classList.add("font_preload"), t.style.opacity = "0", t.style.position = "absolute", t.style.left = "-9999px", document.body.appendChild(t);
                    const s = window.FontFace;
                    s ? e.forEach(e => {
                        const {name: t, file: o} = e;
                        n(e, ["name", "file"]);
                        new s(t, `url(${o})`, {}).load().then(e => {
                            document.fonts.add(e), i()
                        })
                    }) : e.forEach(e => {
                        const {name: s, file: o} = e, r = n(e, ["name", "file"]), a = document.createElement("link");
                        a.href = o, a.rel = "stylesheet", a.type = "text/css";
                        const l = document.createElement("span");
                        l.style.fontFamily = `font-family: '${r.fontFamily}'`, l.style.fontWeight = `font-weight: '${r.fontWeight}'`, l.innerHTML = l.getAttribute("style"), t.appendChild(l), document.head.appendChild(a), a.onload = i, this.component.assetsStore.addFont(s, r)
                    })
                }
            }

            _parseLoadedSkeletons() {
                Object.entries(this._skeletonsData).forEach(([e, t]) => {
                    const i = (new PIXI.spine.SpineParser).createJsonParser().readSkeletonData(this._spineAtlas, t);
                    t.attachLabels && this._addSpineLabel(e, i), this.component.assetsStore.addSkeleton(e, i)
                })
            }

            _addSpineLabel(e, t) {
                const i = this.component.assetsStore;
                let s = i.getConfig("spine_config");
                s && s.attachLabels ? (s = s.attachLabels, t.attachLabels = [], t.slots.forEach(o => {
                    const r = o.name.indexOf("${") + 2, a = o.name.indexOf("}", r);
                    if (-1 !== r && -1 !== a) {
                        const l = o.name.substring(r, a), c = s[l];
                        if (!c) return void console.error("Spine attachLabels parse: No found label config with key.", `spine: ${e}`, `slot: ${o.name}`, `label: ${l}`);
                        const {text: h, style: u, bitmapFont: d} = c, p = n(c, ["text", "style", "bitmapFont"]),
                            m = h && h, f = u && i.getConfig("spine_styles")[u];
                        let g;
                        d && (g = {}, Object.entries(i.textures).forEach(([e, t]) => {
                            if (e.includes(d)) {
                                const i = e.substr(d.length);
                                g[i] = t
                            }
                        }));
                        const b = Object.assign(Object.assign({}, p), {
                            slotData: o,
                            name: l,
                            text: m,
                            style: f,
                            bitmapTextures: g
                        });
                        t.attachLabels.push(b)
                    }
                }), 0 === t.attachLabels.length && console.error("Skeleton parse: No found slots.", `spine: ${e}`)) : console.error("Spine attachLabels parse: No found spine_config or attachLabels parameters.", `spine: ${e}`)
            }

            _filterResources(e) {
                const t = e => void 0 === e.only || e.only === this.loader.platform;
                Object.entries(e).forEach(([i, s]) => {
                    c2d.type.isArray(s) ? e[i] = s.filter(t) : c2d.type.isObject(s) && (e[i] = (e => {
                        const i = {};
                        return Object.entries(e).forEach(([e, s]) => {
                            t(s) && (i[e] = s)
                        }), i
                    })(s))
                })
            }

            loadAudio(e) {
                const t = e => {
                    e.forEach(e => {
                        const t = game.audioManager.loadAudio(e);
                        this.component.assetsStore.addAudio(e.name, t)
                    })
                };
                this.resourcesConfig.audios && t(this.resourcesConfig.audios), this.resourcesConfig.configs && Object.entries(this.resourcesConfig.configs).forEach(([e, i]) => {
                    if ("audio_config" !== i.type) return;
                    this.loader.add(e, i.file, {}, e => {
                        e.data.forEach(e => {
                            const t = `/resources/audios/${e.file}`, i = this.manifest.getFile(t);
                            e.file = i
                        }), t(e.data)
                    })
                }), e()
            }

            set resourcesConfig(e) {
                this._resourcesConfig = e, this.component.assetsStore.resourcesConfig = this._resourcesConfig
            }

            get resourcesConfig() {
                return this._resourcesConfig
            }
        }
    }, {"./Config": 7}],
    6: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.ComponentsManager = void 0;
        const s = e("./inner/index"), n = e("./InstancesHelper");
        i.ComponentsManager = class {
            constructor() {
                this.instancesHelper = new n.InstancesHelper, this._components = {}, this._handlers = {}
            }

            registerComponent(e, t = null, i) {
                if (s.sources.components[e]) throw new Error(`Can not register component ${e} twice`);
                s.sources.components[e] = t, i && (t.version = i)
            }

            updateComponent(e, t) {
                const i = s.sources.components[e];
                if (!i) throw new Error(`Component not registered ${e}`);
                s.sources.components[e] = Object.assign(Object.assign({}, i), t)
            }

            getRegisteredComponent(e) {
                const t = s.sources.components[e];
                if (!t) throw new Error("there is no component with id " + e);
                return this.instancesHelper.getRegisteredModdedComponent(e, t)
            }

            instantiateComponent(e) {
                const t = this.getRegisteredComponent(e.type);
                if (!t) return void console.error("Comopnent is undefined.", e.type);
                const {Component: i, Handler: s} = t;
                if (!i) throw new Error(`Can not find registered component with type ${e.type}`);
                const n = new i(e);
                if (this._components[n.name] = n, s) {
                    const e = new s(n);
                    this._handlers[n.name] = e, n.setHandler(e)
                }
                if (n.layers = n.layers || {}, n.layer = null, e.layer) {
                    const t = game.layers.toObjectConfig(e.layer);
                    Object.entries(t).forEach(([e, t]) => {
                        n.layers[e] = game.layers.list[t], n.layers[e] ? n.layer || (n.layer = n.layers[e]) : console.error(`Layer "${t}" is undefined. Component "${n.name}"`)
                    })
                } else n.layers = game.layers.list, n.layer = game.layers.list.default;
                return n
            }

            createComponent({name: e, type: t}, i) {
                const s = this.components[e];
                return s ? (s.create(i, this.getRegisteredComponent(t)), this.handlers[e] && this.handlers[e].create(), s) : null
            }

            getComponent(e) {
                const t = this._components[e];
                if (null === t) throw new Error("there is no component with id " + e);
                return t
            }

            get registeredComponents() {
                return s.sources.components
            }

            get components() {
                return this._components
            }

            get handlers() {
                return this._handlers
            }
        }
    }, {"./InstancesHelper": 8, "./inner/index": 17}],
    7: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.Config = void 0;
        i.Config = class {
            constructor({name: e, data: t, set: i, type: s}) {
                this.children = [], this.dataMap = {}, this.name = e, this._data = t || {default: {}}, i && (this.set = i), s && (this.type = s)
            }

            get fullData() {
                return this._data
            }

            get data() {
                return this.orientationSpecificData
            }

            get orientationSpecificData() {
                let e;
                if (e = game.engine.device.desktop ? "desktop" : game.engine.device.orientation, e == this._currentOrientation) return this._currentOrientationData;
                const t = this._data[e] || this._data.default;
                return this.updateChildren(t), this._currentOrientation = e, this._currentOrientationData = t, t
            }

            addData(e, t) {
                t ? this._data[t] = e : this._data.default = e
            }

            addChild(e = [], t) {
                Array.isArray(e) || (e = e.split(".")), this.children.push({path: e, config: t})
            }

            updateChildren(e) {
                this.children.forEach(({path: t, config: i}) => {
                    t.reduce((e, t) => (e[t] || (e[t] = {}), e[t]), e)[i.name] = i.data
                })
            }

            findNodesWithName(e, t = "default") {
                this.dataMap[t] || (this.dataMap[t] = {}), e.name && (this.dataMap[t][e.name] = e), e.children && e.children.forEach(e => {
                    this.findNodesWithName(e, t)
                })
            }

            createMap() {
                Object.keys(this._data).forEach(e => {
                    this.findNodesWithName(this._data[e], e)
                })
            }
        }
    }, {}],
    8: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.InstancesHelper = void 0;
        i.InstancesHelper = class {
            constructor() {
                this._logger = c2d.Logger.Of("Game.Components.InstancesHelper"), this._moddedCache = {}, this._mainEntitiesNames = ["Store", "View", "Controller", "Component", "Handler"]
            }

            getModesList() {
                var e, t;
                const i = [],
                    s = null === (t = null === (e = null === application || void 0 === application ? void 0 : application.setup) || void 0 === e ? void 0 : e.gameConfig) || void 0 === t ? void 0 : t.data;
                return s ? (this.addModeIfNeeded(s, "showTurboButton", !1, i, "hideTurboButton"), this.addModeIfNeeded(s, "enableSkips", !1, i, "disableSkips"), this.addModeIfNeeded(s, "showWinsLowerThanBet", !1, i, "hideWinsLowerThanBet"), this.addModeIfNeeded(s, "showSessionStatistics", !0, i, "showSessionStatistics"), i) : i
            }

            addModeIfNeeded(e, t, i, s, n) {
                c2d.type.isNullOrUndefined(e[t]) || e[t] !== i || s.push(n)
            }

            getRegisteredModdedComponent(e, t) {
                if (this._moddedCache[e]) return this._moddedCache[e];
                if (!t.classes || !t.classes.mods) return t;
                const i = Object.assign({}, t);
                for (let e of this._mainEntitiesNames) i[e] && this._findClass(e, i);
                return this._moddedCache[e] = i, i
            }

            _findClass(e, t) {
                let i = this._getClassByPath(e, t);
                if (!i) return this._logger.error("InstancesHelper logic error"), !1;
                t[e] = i
            }

            _getClassByPath(e, t) {
                return this._checkPathWithModes(e, t.classes.mods), t[e]
            }

            _checkPathWithModes(e, t) {
                const i = this.getModesList();
                for (let s of i) t[s] && t[s][e] && t[s][e]()
            }
        }
    }, {}],
    9: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.Component = void 0;
        const s = e("../ComponentResourcesLoader");
        i.Component = class {
            constructor(e, ...t) {
                this._logger = c2d.Logger.Of("Engine.Component"), this.validate(...arguments), this.name = e.name, this.layer = e.layer, this.descriptor = e, this.assetsStore = new c2d.store.AssetsStore, this.resourceLoader = new s.ComponentResourcesLoader(this)
            }

            setHandler(e) {
                this.handler = e
            }

            validate(...e) {
            }

            loadResources(e) {
                this.resourceLoader.load(e)
            }

            loadAudio(e) {
                this.resourceLoader.loadAudio(e)
            }

            create(e, t) {
                this._logger.debug("Create component: " + this.name, "background: #EEEEFF; color: #111111;"), this.create = () => {
                    throw new Error("component was created")
                };
                const {Store: i, View: s, Controller: n, classes: o} = this.validateSources(t);
                this.createStore(i, o, e), this.createView(s, o, e), this.createController(n, o, e), this.audio = e.audio, this.onCreate(e)
            }

            validateSources(e) {
                return e
            }

            createStore(e, t, i) {
                if (!e) return;
                const s = {component: this, classes: t};
                this.store = new e(s), this.store.create(Object.assign(Object.assign({}, i), {componentName: this.name}))
            }

            createView(e, t, i) {
                if (!e) return;
                const s = {
                    store: this.store,
                    assetsStore: this.assetsStore,
                    layer: this.layer,
                    layers: this.layers,
                    classes: t
                };
                this.view = new e(s), this.view.setComponent(this), this.view.create && this.view.create()
            }

            createController(e, t, i) {
                if (!e) return;
                const s = {store: this.store, view: this.view, assetsStore: this.assetsStore, classes: t};
                this.controller = new e(s), this.controller.create(i)
            }

            onCreate(...e) {
            }

            initialize(e) {
                this.initialize = () => {
                    throw new Error("component was initialized")
                }, this.controller && this.controller.initialize && this.controller.initialize(e), this.store && this.store.initialize && this.store.initialize(e), this.view && this.view.initialize && this.view.initialize(e), this.onInitialize(...arguments), this.properties && this.fillProperties(this.properties)
            }

            onInitialize(...e) {
            }

            run() {
                this.onRun()
            }

            onRun() {
            }

            destroy(...e) {
                this.onDestroy(...e)
            }

            onDestroy(...e) {
            }

            resizeScreen(...e) {
                this.controller && this.controller.resizeScreen(...e), this.view && this.view.resizeScreen(...e), this.onResizeScreen(...e)
            }

            onResizeScreen(...e) {
            }

            getConfig(e) {
                return this.assetsStore.hasConfig(e) && this.assetsStore.getConfig(e)
            }

            getConfigs(e) {
                return this.assetsStore.getConfigs({type: e})
            }

            getConfigsData(e) {
                return this.assetsStore.getConfigsData(e)
            }

            fillProperties(e) {
                Object.entries(e).forEach(([e, t]) => {
                    "function" == typeof this[e] ? Array.isArray(t) ? this[e].apply(this, t) : this._logger.error("value for function: " + e, "must be array") : e in this && (this[e] = t)
                })
            }

            set view(e) {
                e && !this._view && (this._view = e, this._view.name = this.name + "Component")
            }

            get view() {
                return this._view
            }

            get publicApiMethods() {
                return []
            }

            get name() {
                return this._name
            }

            set name(e) {
                this._name = e
            }

            get events() {
                return this._events
            }

            set events(e) {
                this._events = e
            }

            get properties() {
                return this._properties || this.config.properties
            }

            get config() {
                return this.getConfig("config")
            }

            get resourcesConfig() {
                return this.resourceLoader.resourcesConfig
            }
        }
    }, {"../ComponentResourcesLoader": 5}],
    10: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.ComponentDescriptor = void 0;
        i.ComponentDescriptor = class {
            constructor(e, t) {
                const {
                    version: i = null,
                    sources: s = {},
                    type: n,
                    resources: o = {},
                    sharedResources: r = null,
                    layer: a = null,
                    modules: l = []
                } = t;
                this.name = e, this.modules = l, this.type = n, this.version = i, this.sources = s, this.resources = o, this.sharedResources = r, this.layer = a, this.paths = {
                    game: `${game.loader.paths.game}components/`,
                    components: `${game.loader.paths.components}`,
                    gameModules: `${game.loader.paths.gameModules}`
                }
            }

            get typeAsPath() {
                return this.type.toLowerCase()
            }

            getManifestPath(e) {
                return `${e}/resources/manifest.json`
            }

            get directories() {
                return Object.keys(this.resources).map(e => `${this.paths[e]}${this.typeAsPath}`)
            }
        }
    }, {}],
    11: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.Controller = void 0;
        i.Controller = class {
            constructor({store: e, assetsStore: t, view: i, classes: s}) {
                this._store = e, this._assetsStore = t, this.view = i, this.classes = s
            }

            create() {
                this.onCreate(...arguments)
            }

            onCreate(...e) {
            }

            initialize(...e) {
                this.onInitialize(...e)
            }

            onInitialize(...e) {
            }

            resizeScreen(...e) {
                this.onResizeScreen(...e)
            }

            onResizeScreen(...e) {
            }

            get config() {
                return this.assetsStore && this.assetsStore.getConfig("config")
            }

            get store() {
                return this._store
            }

            get assetsStore() {
                return this._assetsStore
            }
        }
    }, {}],
    12: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.FactoryView = void 0;
        const s = e("./View");

        class n extends s.View {
            buildTree(e, t, i, s) {
                let n;
                c2d.type.isString(e) && (n = e, e = this.assetsStore.getConfig(e)), s && (this._prefabs = s), e.__prefabs = Object.assign(Object.assign(Object.assign({}, e.__prefabs), this.getPrefabs()), s), i = Object.assign({
                    texts: this.getTexts(),
                    styles: this.getStyles(),
                    textures: this.assetsStore.textures,
                    skeletons: this.assetsStore.skeletons
                }, i), this.tree = new c2d.display.FactoryTree({
                    config: e,
                    parent: t,
                    variables: i
                }), this._initialConfig = n || e
            }

            getTexts() {
                return c2d.Localization.dictionary
            }

            getStyles() {
                return this.assetsStore.getConfigsData({set: "style"}).reduce((e, t) => e = Object.assign(Object.assign({}, e), t), {})
            }

            getPrefabs() {
                return this.assetsStore.getConfigs({set: "prefab"}).reduce((e, t) => (e[t.name] = t.data, e), {})
            }

            onResizeScreen() {
                this.updateTree()
            }

            updateTree(e) {
                this.tree && (e = e || this._initialConfig, c2d.type.isString(e) && (e = this.assetsStore.getConfig(e)), e.__prefabs = Object.assign(Object.assign(Object.assign({}, e.__prefabs), this.getPrefabs()), this._prefabs), this.tree.update(e))
            }

            callTreeNodes(e, ...t) {
                Object.values(this.tree.nodeMap).forEach(i => i[e] && i[e](...t))
            }

            setHandlers(e) {
                Object.keys(e).forEach(t => {
                    const i = this.tree.nodeMap[t];
                    c2d.type.isArray(i) ? i.forEach(i => {
                        i.setHandlers && i.setHandlers(e[t])
                    }) : i && i.setHandlers && i.setHandlers(e[t])
                })
            }
        }

        i.FactoryView = n
    }, {"./View": 15}],
    13: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.Handler = void 0;
        i.Handler = class {
            constructor(e) {
                this._states = {}, this._logger = {}, this.component = e, this._logger = c2d.Logger.Of(e.name), this.events = c2d.observer, this.events.config = c2d.EventsConfig
            }

            create() {
                this.onCreate()
            }

            update() {
            }

            onCreate() {
            }

            initialize() {
                if (this.registerActions(this.actionsConfig), this.registerStates(this.statesConfig), this.customStatesConfig) throw new Error(`${this.component.constructor.name}.${this.constructor.name}.customStatesConfig deprecated. Use statesConfig instead`);
                if (this.baseStatesConfig) throw new Error(`${this.component.constructor.name}.${this.constructor.name}.baseStatesConfig deprecated. Use statesConfig instead`);
                this.onInitialize(), this.events.subscribe(c2d.EventsConfig.ENGINE_TICK_UPDATE, this.update.bind(this))
            }

            onInitialize() {
            }

            registerActions(e) {
                Object.entries(e).forEach(([e, t]) => {
                    game.fsm.actions[e] = t
                })
            }

            registerStates(e) {
                Object.entries(e).forEach(([e, t]) => {
                    this.registerState(e, t)
                })
            }

            registerState(e, t) {
                this._states[e] = this._states[e] || {}, Object.entries(t).forEach(([t, i]) => {
                    this._states[e][t] = this._states[e][t] || [];
                    const s = c2d.type.isString(i) ? this[i] : i, n = `${this.constructor.name}:${s.name}`;
                    this._states[e][t].push({
                        key: n, handler: (...e) => {
                            if (c2d.type.isFunction(s)) {
                                this.phaseStateLog(!1, s.name);
                                const t = e[0];
                                return this.addFinishChecker(t, s.name), s.call(this, ...e)
                            }
                            if (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), i).get) return console.log(` %c${this.component.name}`, "background: #e9fafa; color: #111111;"), s
                        }
                    })
                })
            }

            addFinishChecker(e, t) {
                if (e) {
                    const i = e.finish;
                    e.finish = () => {
                        i(), this.phaseStateLog(!0, t)
                    }
                }
            }

            phaseStateLog(e, t) {
                const i = e ? "<--" : "--\x3e", s = e ? "#F8E4F8" : "#e9fafa",
                    n = game.fsm.currentState && game.fsm.currentState.currentPhase ? game.fsm.currentState.currentPhase.waitHandlers : [];
                this._logger.fsmDetails(` %c${i}  ${this.component.name} (${this.constructor.name}:${t}), actions queue:`, `background: ${s}; color: #111111;`, n)
            }

            fireAction(e, t) {
                game.fsm.currentState.currentPhase.actions[e] ? game.fsm.currentState.currentPhase.actions[e](t) : console.warn(`missing action ${e}. Available actions: ${Object.keys(game.fsm.actions)}`)
            }

            get states() {
                return this._states
            }

            get config() {
                return this.component.config
            }

            get statesConfig() {
                return {}
            }

            get globalActionsConfig() {
                return {}
            }

            get actionsConfig() {
                return {}
            }
        }
    }, {}],
    14: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.Store = void 0;
        const s = window.globalStore = {};
        i.Store = class {
            constructor({component: e, classes: t}) {
                this.component = e, this.classes = t
            }

            create({assetsStore: e = null}) {
                this.assetsStore = e, this.addToGlobal(), this.onCreate()
            }

            onCreate() {
            }

            addToGlobal() {
            }

            getItem(e) {
                return s[e] && s[e]()
            }

            addItem(e, t) {
                void 0 !== s[e] && console.error(`The store item "${e}" will be overwritten.`), (t = t || e) in this ? s[e] = () => {
                    const e = this[t];
                    return c2d.type.isFunction(e) ? e.bind(this) : e
                } : console.error(`"${e}" is undefined.`)
            }

            removeItem(e, t) {
                t = t || e, delete s[e]
            }
        }
    }, {}],
    15: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.View = void 0;
        i.View = class {
            constructor({store: e, assetsStore: t, classes: i, layer: s, layers: n}) {
                this.store = e, this.assetsStore = t, this.classes = i, this.layer = s, this.layers = n
            }

            setComponent(e) {
                this.component = e
            }

            create(...e) {
                this.onCreate(...e)
            }

            onCreate(...e) {
            }

            initialize(...e) {
                this.onInitialize(...e)
            }

            onInitialize(...e) {
            }

            get config() {
                return this.assetsStore && this.assetsStore.getConfig("config")
            }

            getSkeleton(e) {
                return this.assetsStore.getSkeleton(e)
            }

            resizeScreen(...e) {
                this.onResizeScreen(...e)
            }

            onResizeScreen(...e) {
            }

            createSpineAnimation(e, t) {
                const i = this.assetsStore.getSkeleton(t), s = new c2d.display.Spine(i);
                return this.layers[e].addChild(s), s
            }
        }
    }, {}],
    16: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.VisualComponent = void 0;
        const s = e("./Component");

        class n extends s.Component {
            constructor(e, ...t) {
                super(e, ...t)
            }

            setWindowSize(e, t) {
                this._windowWidth = e, this._windowHeight = t, this.onWindowResize(e, t)
            }

            set screenOrientation(e) {
                if (this._screenOrientation = n.screenOrientations[e], "landscape" === e) this.onLandscape(); else {
                    if ("portrait" !== e) throw new Error("unsupported screen orientation " + e);
                    this.onPortrait()
                }
            }

            get screenOrientation() {
                return this._screenOrientation
            }

            onWindowResize(e, t) {
            }

            onLandscape() {
            }

            onPortrait() {
            }
        }

        i.VisualComponent = n
    }, {"./Component": 9}],
    17: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.sources = void 0;
        const s = e("./Component"), n = e("./VisualComponent"), o = e("./ComponentDescriptor"), r = e("./Handler"),
            a = e("./Store"), l = e("./Controller"), c = e("./View"), h = e("./FactoryView"), u = {
                Component: s.Component,
                ComponentDescriptor: o.ComponentDescriptor,
                Handler: r.Handler,
                Store: a.Store,
                Controller: l.Controller,
                View: c.View,
                FactoryView: h.FactoryView,
                VisualComponent: n.VisualComponent,
                components: {}
            };
        i.sources = u
    }, {
        "./Component": 9,
        "./ComponentDescriptor": 10,
        "./Controller": 11,
        "./FactoryView": 12,
        "./Handler": 13,
        "./Store": 14,
        "./View": 15,
        "./VisualComponent": 16
    }],
    18: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../c2d/utils/decorators/modifiable"), n = e("./Game");
        window.modifiable = s.modifiable, window.game = new n.Game({application: window.application})
    }, {"../c2d/utils/decorators/modifiable": 1, "./Game": 2}],
    19: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.RemoteApi = void 0;
        i.RemoteApi = class {
            constructor() {
                this._listen(), window.dispatchEvent(new Event("onremoteapiinit"))
            }

            onLoad() {
                this._send("app.onload")
            }

            onGoToUrl(e) {
                this._send(`app.goto.${e}`)
            }

            onEnterIdle() {
                this._send("app.enter.idle")
            }

            onExitIdle() {
                this._send("app.exit.idle")
            }

            onSoundChange(e) {
                this._send(`app.sound.${e ? "on" : "off"}`)
            }

            onFullscreenChange(e) {
                this._send(`app.fullscreen.${e ? "on" : "off"}`)
            }

            onError(e) {
                this._send("app.error", e)
            }

            _send(e, t = {}) {
                window.dispatchEvent(new CustomEvent("onremoteapisendmessage", {
                    detail: {
                        message: e,
                        params: t
                    }
                })), window.parent && window.parent.postMessage({message: e, params: t}, "*")
            }

            _listen() {
                window.addEventListener("message", e => this._onMessage(e), !1)
            }

            _onMessage(e) {
                if (!e || !c2d.type.isObject(e.data)) return;
                if ("app.set.state" === e.data.message) {
                    const t = e.data.state;
                    if (!c2d.type.isObject(t)) return;
                    "balance" in t && this.setBalance(t.balance), "pause" in t && this.setPause(t.pause), "depositPopupEnabled" in t && this.setDepositPopupEnabled(t.depositPopupEnabled), "soundEnabled" in t && this.setSound(t.soundEnabled), "fullscreenEnabled" in t && this.setFullscreen(t.fullscreenEnabled)
                }
            }

            setBalance(e) {
                this._balanceHandler && this._balanceHandler(e)
            }

            setPause(e) {
                this._pauseHandler && this._pauseHandler(Boolean(e))
            }

            setDepositPopupEnabled(e) {
                this._depositPopupHandler && this._depositPopupHandler(Boolean(e))
            }

            setSound(e) {
                this._soundHandler && this._soundHandler(Boolean(e))
            }

            setFullscreen(e) {
                this._fullscreenHandler && this._fullscreenHandler(Boolean(e))
            }

            set balanceHandler(e) {
                this._balanceHandler = e
            }

            set pauseHandler(e) {
                this._pauseHandler = e
            }

            set depositPopupHandler(e) {
                this._depositPopupHandler = e
            }

            set soundHandler(e) {
                this._soundHandler = e
            }

            set fullscreenHandler(e) {
                this._fullscreenHandler = e
            }
        }
    }, {}],
    20: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.array.iterator"), e("core-js/modules/web.dom-collections.iterator");
        const s = game.sources.components.Camera.Handler;

        class n extends s.Latest {
            get stateConfig_NukeWorld() {
                return {
                    Replay: {begin: this.onReplayBegin, exit: this.onReplayExit},
                    Prelude: {enter: this.onPreludeEnter},
                    CharacterAction: {enter: this.onCharacterSkip},
                    ActionBomb: {enter: this.onCharacterAction},
                    ActionGun: {enter: this.onCharacterAction},
                    ActionLaser: {enter: this.onCharacterAction},
                    ActionCut: {enter: this.onCutAction},
                    ActionBoss: {enter: this.onBossAction}
                }
            }

            onReplayEnter(e) {
                let {finish: t} = e;
                t();
                return {
                    onAbort: () => {
                        this.isAbort = !0, this.component.onAbort()
                    }
                }
            }

            onReplayBegin(e) {
                let {finish: t} = e;
                this.isAbort = !1, t()
            }

            onReplayExit(e) {
                let {finish: t} = e;
                return t(), {
                    onFinish: () => {
                        this.isAbort = !1
                    }
                }
            }

            onInitialize() {
                return this.registerStates(this.stateConfig_NukeWorld), super.onInitialize(...arguments)
            }

            onPreludeEnter(e) {
                let {finish: t} = e;
                this.component.play("startGame"), t()
            }

            onCutAction(e) {
                let {finish: t} = e;
                this.isIntro || this.isAbort ? t() : (t(), this.component.play("cutAction"))
            }

            onCharacterAction(e) {
                let {finish: t} = e;
                this.isIntro || this.isAbort || this.component.play("characterAction"), t()
            }

            onCharacterSkip(e) {
                let {finish: t} = e;
                if (t(), !this.isIntro) return {onSkip: () => this.component.onSkip()}
            }

            onBossAction(e) {
                let {finish: t} = e;
                if (t(), !this.isIntro) return {
                    actions: {
                        cameraAction: () => {
                            this.isAbort ? t() : this.component.play("attack_kill")
                        }
                    }, onSkip: () => this.component.onSkip()
                }
            }
        }

        s.modify(n)
    }, {"core-js/modules/es.array.iterator": 344, "core-js/modules/web.dom-collections.iterator": 353}],
    21: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./NukeWorldCameraHandler.js")
    }, {"./NukeWorldCameraHandler.js": 20}],
    22: [function (e, t, i) {
        "use strict";

        class s extends game.sources.Component {
            onCreate() {
                this.setGlobalFont(this.assetsStore.getConfig("defaults").font)
            }

            setGlobalFont(e) {
                const {fontFamily: t = "Arial", fontWeight: i = 400, fill: s = "0xFFFFFF", fontSize: n = 16} = e.style;
                c2d.display.TextField.defaultStyle = e.style
            }

            hideUI() {
                this.controller.hideUI()
            }

            showUI() {
                this.controller.showUI()
            }
        }

        class n extends game.sources.Store {
        }

        class o extends game.sources.Handler {
            get statesConfig() {
                return {Init: {enter: this.onInitEnter, exit: this.onInitExit}}
            }

            get globalActionsConfig() {
                return {}
            }

            onInitEnter(e) {
                let {finish: t} = e;
                t()
            }

            onInitExit(e) {
                let {finish: t} = e;
                return t(), {onFinish: () => this.component.showUI()}
            }
        }

        class r extends game.sources.Controller {
            hideUI() {
                this.view.hideUI()
            }

            showUI() {
                this.view.showUI()
            }
        }

        class a extends game.sources.View {
            hideUI() {
                this.layers.ui.visible = !1
            }

            showUI() {
                this.layers.ui.visible = !0
            }
        }

        game.componentsManager.registerComponent("Game", {Component: s, Handler: o, Store: n, Controller: r, View: a})
    }, {}],
    23: [function (e, t, i) {
        "use strict";
        const s = game.sources.components.GameScreen, n = s.Handler;

        class o extends n.Latest {
            get statesConfig_Nukeworld() {
                return {
                    CombinateSymbols: {enter: this.onSkipWait, exit: this.endSkipState},
                    DecaySymbols: {enter: this.onSkipWait, exit: this.endSkipState},
                    CharacterAction: {enter: this.onSkipWait, exit: this.endSkipState},
                    ActionBoss: {enter: this.onSkipWait, exit: this.endSkipState},
                    SpinSymbols: {exit: this.endSkipState},
                    DropSymbols: {exit: this.endSkipState},
                    ShowResult: {exit: this.endSkipState}
                }
            }

            onInitialize() {
                this.registerStates(this.statesConfig_Nukeworld), super.onInitialize()
            }

            onSkipWait(e) {
                let {finish: t, skip: i} = e;
                if (t(), this.isSkip) return;
                const s = () => {
                    this.isSkip = !0, i()
                };
                this.component.store.turboMode ? c2d.Timeout.wait(0).then(s) : this._updateSpinHandler(c2d.once(s))
            }

            endSkipState(e) {
                let {finish: t, skip: i} = e;
                this._updateSpinHandler(() => {
                }), this.isSkip && (this.isSkip = !1, i()), t()
            }
        }

        n.modify(o);
        const r = s.Store;

        class a extends r.Latest {
            get turboMode() {
                return this.getItem("turboMode")
            }
        }

        r.modify(a);
        const l = s.View;

        class c extends l.Latest {
            initSpinAnimation() {
            }

            toNormalSpinButton() {
            }

            toSkipSpinButton() {
            }
        }

        l.modify(c)
    }, {}],
    24: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./NukeworldGameScreen.js")
    }, {"./NukeworldGameScreen.js": 23}],
    25: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.number.to-fixed");

        class s extends game.sources.VisualComponent {
            build() {
                this.controller.build()
            }

            show() {
                this.controller.show()
            }

            hide() {
                this.controller.hide()
            }

            reset() {
                this.controller.reset()
            }

            change(e, t) {
                this.controller.change(e, t)
            }
        }

        class n extends game.sources.Store {
            getUpdateWins() {
                return this.getItem("refactorWins")
            }
        }

        class o extends game.sources.Handler {
            get statesConfig_History() {
                return {
                    Init: {exit: this.onInitExit},
                    Intro: {enter: this.onIntroEnter, exit: this.onIntroExit},
                    Replay: {enter: this.onReplayEnter, exit: this.onReplayExit},
                    Spin: {enter: this.onReset},
                    SpinStop: {enter: this.onUpdateSpinData},
                    NextDrop: {enter: this.onUpdateSpinData},
                    ActionBoss: {enter: this.onReset},
                    ShowAllLines: {enter: this.onWin}
                }
            }

            onInitialize() {
                this.registerStates(this.statesConfig_History), super.onInitialize()
            }

            onInitExit(e) {
                let {finish: t} = e;
                return this.component.build(), this.component.hide(), this.wins = this.component.store.getUpdateWins(), t(), {onFinish: () => this.component.show()}
            }

            onUpdateSpinData(e) {
                let {finish: t} = e;
                this.wins = this.component.store.getUpdateWins(), t()
            }

            onIntroEnter(e) {
                let {finish: t} = e;
                this.component.hide(), t()
            }

            onIntroExit(e) {
                let {finish: t} = e;
                this.component.show(), this.component.reset(), t()
            }

            onReplayEnter(e) {
                let {finish: t} = e;
                this.component.reset(), this.component.view.toReplayLayer(), t()
            }

            onReplayExit(e) {
                let {finish: t} = e;
                this.component.reset(), this.component.view.toMainLayer(), t()
            }

            onReset(e) {
                let {finish: t} = e;
                this.component.reset(), t()
            }

            onWin(e) {
                let {finish: t} = e;
                this.component.change(this.wins), t()
            }
        }

        class r extends game.sources.Controller {
            build() {
                this.view.build()
            }

            hide() {
                this.view.hide()
            }

            show() {
                this.view.show()
            }

            reset() {
                this.view.clear()
            }

            change(e) {
                this.view.showGroupWins(e)
            }
        }

        class a extends game.sources.FactoryView {
            build() {
                this.styles = this.assetsStore.getConfig("styles");
                const e = this.layers.game_screen.children[0].nodeMap.gameBars;
                this.buildTree("factoryUI", e), game.engine.device.mobile && this.updateTree()
            }

            toReplayLayer() {
                this.layers.replay.children[0].addChild(this.tree.mainNode)
            }

            toMainLayer() {
                this.layers.game_screen.children[0].nodeMap.gameBars.addChild(this.tree.mainNode)
            }

            hide() {
                this.tree.mainNode.visible = !1
            }

            show() {
                this.tree.mainNode.visible = !0, this.updateTree()
            }

            updateTree() {
                game.engine.device.mobile ? super.updateTree("factoryUI_settings") : super.updateTree("factoryUI")
            }

            showGroupWins(e) {
                e.forEach(e => {
                    const {code: t, pos: i, amount: s} = e;
                    this.addItem(t, i.length, s)
                }), this.updateTree()
            }

            addItem(e, t, i) {
                const s = new c2d.display.Container;
                s.name = "item_" + e, s.pivot.set(-20, 0);
                const n = this.assetsStore.getTexture("back"), o = new c2d.display.Sprite(n);
                o.y = 25;
                const r = this.assetsStore.getTexture("".concat(e, "_0")), a = new c2d.display.Sprite(r),
                    l = new c2d.display.TextField("x" + t, this.styles);
                l.x = 85, l.y = 20, i = i.toFixed(2);
                const c = new c2d.display.TextField(i, this.styles);
                c.x = 150, c.y = 20, s.addChild(o, a, l, c), this.tree.nodeMap.historyContent.addChildAt(s)
            }

            clear() {
                this.tree.nodeMap.historyContent.removeChildren(), this.updateTree()
            }
        }

        game.componentsManager.registerComponent("HistoryBar", {
            Component: s,
            Handler: o,
            Store: n,
            Controller: r,
            View: a
        })
    }, {"core-js/modules/es.number.to-fixed": 347}],
    26: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.array.iterator"), e("core-js/modules/web.dom-collections.iterator");
        const s = game.sources.components.Intro, n = s.Handler;

        class o extends n.Latest {
            onIntroBegin(e) {
                let {finish: t} = e;
                const i = () => {
                    this.isAbort = this.component.nextAction(), t()
                };
                this.isFirst ? (this.isFirst = !1, c2d.Timeout.invoke(() => {
                    i()
                }, 1)) : this.isAbort ? i() : this.isManualControl ? this.delay = () => {
                    this.delay = null, i()
                } : this.delay = c2d.Timeout.invoke(() => {
                    this.delay = null, i()
                }, 3)
            }
        }

        n.modify(o);
        const r = s.View;

        class a extends r.Latest {
            build() {
                return game.engine.device.desktop ? c2d.Tween.to(this.layers.reelsetArea, 1, {
                    pixi: {
                        scale: .9,
                        x: 50,
                        y: 30
                    }
                }) : c2d.Tween.to(this.layers.reelsetArea, 1, {
                    pixi: {
                        scale: .9,
                        x: 30,
                        y: 100
                    }
                }), super.build(...arguments)
            }

            closeIntro() {
                if (this.tree) return c2d.Tween.to(this.layers.reelsetArea, .5, {
                    pixi: {
                        scale: 1,
                        x: 0,
                        y: 0
                    }
                }), super.closeIntro(...arguments)
            }

            callQueueAction(e, t) {
                const i = this.tree.nodeMap[t + "_button"], s = this.tree.nodeMap[t + "_buttonLabel"];
                if (c2d.type.isNumber(this.nextQueueAction)) {
                    const e = this.actionList[this.nextQueueAction];
                    this.tree.nodeMap[e.name + "_button"].interactive = !0, this.tree.nodeMap[e.name + "_buttonLabel"].style.fill = "white"
                }
                this.nextQueueAction = e, i.interactive = !1, s.style.fill = 39896, this.abortHandler && this.abortHandler()
            }

            nextAction(e) {
                this.tree && (this.nextQueueAction = null, this.currentAction && (this.tree.nodeMap[this.currentAction + "_description"].visible = !1, this.tree.nodeMap[this.currentAction + "_button"].interactive = !0, this.tree.nodeMap[this.currentAction + "_buttonLabel"].style.fill = "white"), this.currentAction = e, this.tree.nodeMap[this.currentAction + "_description"].visible = !0, this.tree.nodeMap[this.currentAction + "_button"].interactive = !1, this.tree.nodeMap[this.currentAction + "_buttonLabel"].style.fill = 16768512)
            }
        }

        r.modify(a)
    }, {"core-js/modules/es.array.iterator": 344, "core-js/modules/web.dom-collections.iterator": 353}],
    27: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.promise");
        var s = function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };

        class n extends game.sources.VisualComponent {
            build() {
                this.controller.build()
            }

            startGame(e) {
                this.controller.startGame(e)
            }

            show() {
                this.view.show()
            }

            hide() {
                this.view.hide()
            }

            reset() {
                this.controller.reset()
            }

            change(e, t) {
                return s(this, void 0, void 0, (function* () {
                    yield this.controller.change(e, t)
                }))
            }
        }

        class o extends game.sources.Store {
            getSymbolPosition(e, t) {
                return this.getItem("getSymbolPosition")(e, t)
            }

            getPower() {
                const e = this.getItem("spinData");
                return e && e.extra && e.extra.skill_scale
            }

            getUpdateWins() {
                return this.getItem("refactorWins")
            }
        }

        class r extends game.sources.Handler {
            get statesConfig_Power() {
                return {
                    Init: {exit: this.onStartGame},
                    Intro: {enter: this.onIntroEnter, exit: this.onIntroExit},
                    Replay: {enter: this.onReplayEnter, exit: this.onReplayExit},
                    Spin: {enter: this.onReset, exit: this.onReset},
                    SpinStop: {enter: this.onUpdateSpinData},
                    NextDrop: {enter: this.onUpdateSpinData},
                    ActionBoss: {exit: this.onReset},
                    ShowAllLines: {enter: this.onWin}
                }
            }

            onInitialize() {
                this.registerStates(this.statesConfig_Power), super.onInitialize()
            }

            onIntroEnter(e) {
                let {finish: t} = e;
                this.isIntro = !0, this.component.hide(), t()
            }

            onIntroExit(e) {
                let {finish: t} = e;
                this.isIntro = !1, this.component.reset(), this.component.show(), t()
            }

            onAbort() {
                this.abort || (this.abort = !0)
            }

            onReplayEnter(e) {
                let {finish: t} = e;
                return this.component.view.toReplayLayer(), t(), {onAbort: () => this.onAbort()}
            }

            onReplayExit(e) {
                let {finish: t} = e;
                this.component.view.toMainLayer(), this.component.reset(), this.abort = !1, t()
            }

            onUpdateSpinData(e) {
                let {finish: t} = e;
                this.power = this.component.store.getPower(), this.wins = this.component.store.getUpdateWins(), t()
            }

            onStartGame(e) {
                let {finish: t} = e;
                this.component.build(), this.power = this.component.store.getPower(), this.wins = this.component.store.getUpdateWins(), this.component.startGame(this.power), t()
            }

            onReset(e) {
                let {finish: t} = e;
                this.abort = !1, this.component.reset(), t()
            }

            onWin(e) {
                let {finish: t} = e;
                this.abort || this.isIntro ? t() : this.component.change(this.power, this.wins).then(t)
            }
        }

        class a extends game.sources.Controller {
            build() {
                this.view.build()
            }

            startGame() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                this.view.progress = e
            }

            reset() {
                this.view.progress = 0
            }

            change(e, t) {
                return s(this, void 0, void 0, (function* () {
                    c2d.Timeout.wait(1).then(() => {
                        this.view.progress = e
                    }), yield this.view.showGroupWins(t)
                }))
            }
        }

        class l extends game.sources.View {
            build() {
                this.particleList = [], this.segmentsFull = [], this.segments = [], this.segmentsGlow = [], this.tweens = [];
                const e = this.assetsStore.getTexturesPack(this.config.icon.animation),
                    t = .001 * this.config.icon.speed;
                this.icon = new c2d.display.AnimatedSprite(e, t), this.icon.y = 60, this.layers.game_screen.children[0].nodeMap.gameBars.addChild(this.icon), this._createSegments(), this._createLabels(), this.progress = 0
            }

            toReplayLayer() {
                this.layers.replay.children[0].addChild(this.icon)
            }

            toMainLayer() {
                this.layers.game_screen.children[0].nodeMap.gameBars.addChild(this.icon)
            }

            onResizeScreen() {
                this.particleList && this.particleList.forEach(e => {
                    let {particle: t, column: i, row: s} = e;
                    const n = t.findBone("particle_start"), o = this.store.getSymbolPosition(i, s),
                        r = this.icon.toLocal(o);
                    n.x = r.x, n.y = -r.y
                })
            }

            get config() {
                return this.assetsStore.configs.powerBar.data
            }

            get maxProgress() {
                return this.config.segment.segments_count * this.config.segment.count
            }

            show() {
                this.icon.visible = !0
            }

            hide() {
                this.icon.visible = !1
            }

            _createSegments() {
                const e = this.config.segment, t = this.assetsStore.getTexture("segment_full");
                let i = e.x;
                for (let s = 0; s < e.count; s++) {
                    const n = new c2d.display.Sprite(t);
                    n.x = i, n.y = e.y, n.alpha = .5, i += e.indent * s, this.segmentsFull.push(n)
                }
                i = e.x;
                const s = this.assetsStore.getTexture("mini_segment_full");
                for (let t = 0; t < this.maxProgress; t++) {
                    const n = new c2d.display.Sprite(s), o = new c2d.display.Sprite(s);
                    n.x = i, n.y = e.y, o.position = n.position, i += e.mini_indent, t % e.count == e.count - 1 && (i += e.indent - e.count * e.mini_indent), this.segments.push(n), this.segmentsGlow.push(o), this.icon.addChild(o, n)
                }
            }

            _createLabels() {
                const e = this.config.text;
                this.label = new c2d.display.TextField("", e.style), this.label.x = e.x, this.label.y = e.y, this.icon.addChild(this.label)
            }

            _clearTweens() {
                for (; this.tweens.length;) {
                    this.tweens.pop().kill()
                }
                this.segments.forEach((e, t) => {
                    e.alpha = t < this._progress ? 1 : .5, this.segmentsGlow[t].tint = 16777215
                })
            }

            set progress(e) {
                this._clearTweens(), this._progress = e, this.segments.forEach((t, i) => t.alpha = i < e ? 1 : .5), this.segmentsGlow.forEach((t, i) => t.visible = i < e), this._updateText(), this._progress == this.maxProgress && this.full()
            }

            get progress() {
                return this._progress
            }

            _updateText() {
                this.label.text = "".concat(this._progress, "/").concat(this.maxProgress)
            }

            full() {
                this.icon.gotoAndPlay(0)
            }

            showGroupWins(e) {
                return new Promise(t => {
                    this.particleList = [];
                    const i = c2d.last(() => {
                        this.particleList = [], t()
                    }, e.length);
                    e.forEach(e => {
                        const t = e.pos[Math.floor(.5 * e.pos.length)], {column: s, row: n} = (e.code, t),
                            o = this._createParticle({color: 16777215}), r = o.findBone("particle_start"),
                            a = this.store.getSymbolPosition(s, n), l = this.icon.toLocal(a);
                        r.x = l.x, r.y = -l.y, this.particleList.push({
                            particle: o,
                            column: s,
                            row: n
                        }), o.play("animation", {}).then(() => o.destroy()).then(i)
                    })
                })
            }

            _createParticle(e) {
                let {color: t} = e;
                const i = this.assetsStore.getSkeleton("particle"), s = new c2d.display.Spine(i),
                    n = s.findBone("particle_end");
                return s.tint = t, n.x = this.config.segment.x + .5 * this.segmentsFull.first.width + this.progress * this.config.segment.mini_indent, n.y = -this.config.segment.y - .5 * this.segmentsFull.first.height, this.icon.addChild(s), s
            }
        }

        game.componentsManager.registerComponent("PowerBar", {
            Component: n,
            Handler: r,
            Store: o,
            Controller: a,
            View: l
        })
    }, {"core-js/modules/es.promise": 349}],
    28: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.array.iterator"), e("core-js/modules/es.promise"), e("core-js/modules/web.dom-collections.iterator");
        var s = function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0});
        const n = game.sources.components.Reelset.Component;

        class o extends n.Latest {
            validateSources(e) {
                return super.validateSources(...arguments)
            }

            actionGun(e) {
                return s(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.actionGun(e), this.active = !1
                }))
            }

            actionLaser(e) {
                return s(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.actionLaser(e), this.active = !1
                }))
            }

            actionCut(e, t) {
                return s(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.actionCut(e, t), this.active = !1
                }))
            }

            decaySymbolsBeforeAction(e) {
                return s(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.decaySymbolsBeforeAction(e), this.active = !1
                }))
            }

            decaySymbols(e) {
                return s(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.decaySymbols(e), this.active = !1
                }))
            }

            combinateWinSymbols(e) {
                return s(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.combinateWinSymbols(e), this.active = !1
                }))
            }

            actionBoss2(e) {
                return s(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.actionBoss2(e), this.active = !1
                }))
            }

            actionBoss3(e, t, i) {
                return s(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.actionBoss3(e, t, i), this.active = !1
                }))
            }

            actionBoss4(e, t) {
                return s(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.actionBoss4(e, t), this.active = !1
                }))
            }
        }

        n.modify(o)
    }, {
        "core-js/modules/es.array.iterator": 344,
        "core-js/modules/es.promise": 349,
        "core-js/modules/web.dom-collections.iterator": 353
    }],
    29: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.array.iterator"), e("core-js/modules/es.array.sort"), e("core-js/modules/es.promise"), e("core-js/modules/web.dom-collections.iterator");
        var s = function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        const n = game.sources.components.Reelset.Controller;

        class o extends n.Latest {
            doStopReels() {
                return this._spinStarted && this._spinStopping && this.view.stopReels_NukeWorld(), super.doStopReels(...arguments)
            }

            combinateWinSymbols(e) {
                return new Promise(t => {
                    const i = c2d.last(t, e.length);
                    e.forEach(e => {
                        if (!e) return void i();
                        const {from: t, to: s} = e;
                        if (0 == t.is_new) return void i();
                        t.positions = Array.fromObject(t.positions), s.positions = Array.fromObject(s.positions);
                        const n = t.positions.first[0], o = t.positions.first[1];
                        let r, a = +t.code;
                        4 == t.positions.length ? (a = "2" + a, r = [2, 2]) : 9 == t.positions.length ? (a = "3" + a, r = [3, 3]) : 16 == t.positions.length && (a = "4" + a, r = [4, 4]), this.view.combinateSymbols({
                            column: n,
                            row: o,
                            id: a
                        }, r).then(i)
                    })
                })
            }

            decaySymbolsBeforeAction(e) {
                return new Promise(t => {
                    const i = c2d.last(t, e.length);
                    e.forEach((t, s) => {
                        if (!t) return void i();
                        const {from: n, to: o} = t;
                        if (1 == n.is_new) return void i();
                        if (n.positions = Array.fromObject(n.positions), o.positions = Array.fromObject(o.positions), o && o.positions && o.positions.length > 0) return void i();
                        const r = n.positions.first[0], a = n.positions.first[1], l = n.code;
                        let c;
                        4 == n.positions.length && (c = [2, 2]), 9 == n.positions.length && (c = [3, 3]), this.view.decaySymbols({
                            column: r,
                            row: a,
                            id: l
                        }, c).then(i), e[s] = null
                    })
                })
            }

            decaySymbols(e) {
                return new Promise(t => {
                    const i = c2d.last(t, e.length);
                    e.forEach((t, s) => {
                        if (!t) return void i();
                        const {from: n, to: o} = t;
                        if (n.positions = Array.fromObject(n.positions), o.positions = Array.fromObject(o.positions), o && o.positions && o.positions.length > 0) return void i();
                        const r = n.positions.first[0], a = n.positions.first[1], l = n.code;
                        let c;
                        4 == n.positions.length && (c = [2, 2]), 9 == n.positions.length && (c = [3, 3]), this.view.decaySymbols({
                            column: r,
                            row: a,
                            id: l
                        }, c).then(i), e[s] = null
                    })
                })
            }

            actionGun(e) {
                const t = [];
                return t.push(e.pop()), e.sort(() => Math.random() - .5), t.push(...e), new Promise(e => {
                    const i = c2d.last(e, t.length);
                    t.reduce((e, t, s) => (this.view.actionGun(t, e, .2 * s).then(i), t), null)
                })
            }

            actionLaser(e) {
                return new Promise(t => {
                    const i = c2d.last(t, this.columns), s = [];
                    e.forEach(e => {
                        s.push(e.column), this.view.replaceSymbols(e).then(i)
                    });
                    for (let t = 0; t < this.columns; t++) s.includes(t) || this.view.destroySymbols({
                        column: t,
                        row: e[0].row
                    }).then(i)
                })
            }

            actionCut(e, t) {
                const i = e.length + t.length;
                return new Promise(s => {
                    const n = c2d.last(s, i);
                    e.forEach((e, t) => {
                        this.view.replaceSymbols(e, {delay: .1 * t}).then(n)
                    }), t.forEach((e, t) => {
                        const [i, s] = Array.fromObject(e), o = .1 * Math.floor(t / 2);
                        this.view.destroySymbols({column: i, row: s}, o).then(n)
                    })
                })
            }

            actionBoss2(e) {
                return new Promise(t => {
                    const i = c2d.last(t, e.length);
                    let s = !1;
                    e.forEach((e, t) => {
                        3 == e.column && 3 == e.row && (s = !0), this.view.actionBoss2(e).then(i)
                    }), s || this.view.actionBoss2({column: 3, row: 3, id: e.first.id}, !1)
                })
            }

            actionBoss3(e, t, i) {
                return e = this._updateDestroyDataBoss3(e, i), i = this._updateReplaceDataBoss3(i, t), new Promise(s => {
                    const n = c2d.last(s, t.length + i.length + 1);
                    this.destroySymbols(e).then(n), i.forEach(e => {
                        this.view.replaceSymbols(e).then(n)
                    }), t.forEach((e, t) => {
                        const [i, s] = Array.fromObject(e);
                        this.view.actionBoss3({column: i, row: s}).then(n)
                    })
                })
            }

            _updateDestroyDataBoss3(e, t) {
                const i = [...t];
                return e.filter(e => {
                    const t = i.findIndex(t => e[0] == t.column && e[1] == t.row);
                    return -1 == t || (i.splice(t, 1), !1)
                })
            }

            _updateReplaceDataBoss3(e, t) {
                const i = [...t];
                return e.filter(e => {
                    const t = i.findIndex(t => e.column == t[0] && e.row == t[1]);
                    return -1 == t || (i.splice(t, 1), !1)
                })
            }

            actionBoss4(e, t) {
                return e -= 4, this.dataBoss4 ? (this.dataBoss4.index = e, Promise.resolve()) : (this.dataBoss4 = {
                    index: e,
                    data: t,
                    isComplete: !1
                }, new Promise(i => {
                    const s = Array.fromObject(t[e]), n = c2d.last(i, 2);
                    if (this.destroySymbols(s).then(n), 0 == e) {
                        const [e, t] = Array.fromObject(s.first);
                        this.addStickySymbol({column: e, row: t, id: 40}).then(n)
                    } else if (1 == e) {
                        const e = c2d.last(n, 2);
                        s.forEach((t, i) => {
                            if (i % 4 != 0) return;
                            const [s, n] = Array.fromObject(t);
                            this.addStickySymbol({column: s, row: n, id: 20}).then(e)
                        })
                    } else {
                        const e = c2d.last(n, s.length);
                        s.forEach(t => {
                            const [i, s] = Array.fromObject(t);
                            this.view.replaceSymbols({column: i, row: s, id: 0}).then(e)
                        }), this.dataBoss4.isComplete = !0
                    }
                }))
            }

            showWinSymbols() {
                const e = Object.create(null, {showWinSymbols: {get: () => super.showWinSymbols}});
                return s(this, arguments, void 0, (function* () {
                    return !this.dataBoss4 || this.dataBoss4.isComplete ? e.showWinSymbols.call(this, ...arguments) : new Promise(t => {
                        const {index: i, data: s} = this.dataBoss4;
                        2 != i ? (e.showWinSymbols.call(this, ...arguments).then(() => {
                            const e = Array.fromObject(s[i]);
                            if (0 == i) {
                                const [t, n] = Array.fromObject(e.first);
                                this.removeStickySymbol({
                                    column: t,
                                    row: n,
                                    change: !1
                                }), Array.fromObject(s[i + 1]).forEach((e, t) => {
                                    if (t % 4 != 0) return;
                                    const [i, s] = Array.fromObject(e);
                                    this.addStickySymbol({column: i, row: s, id: 20, animation: ""})
                                })
                            } else 1 == i && (e.forEach((e, t) => {
                                if (t % 4 != 0) return;
                                const [i, s] = Array.fromObject(e);
                                this.removeStickySymbol({column: i, row: s, change: !1})
                            }), Array.fromObject(s[i + 1]).forEach((e, t) => {
                                const [i, s] = Array.fromObject(e);
                                this.addStickySymbol({column: i, row: s, id: 0, animation: ""})
                            }))
                        }).then(t), this.view.boss4UpdateBones(i, s)) : e.showWinSymbols.call(this, ...arguments).then(t)
                    })
                }))
            }

            completeSpin() {
                const e = Object.create(null, {completeSpin: {get: () => super.completeSpin}});
                return s(this, void 0, void 0, (function* () {
                    if (this.dataBoss4 && !this.dataBoss4.isComplete) {
                        const {index: e, data: t} = this.dataBoss4 || {};
                        if (e < 2) {
                            const i = Array.fromObject(t[e + 1]);
                            yield this.destroySymbols(i), 1 == e && (i.forEach(e => {
                                const [t, i] = Array.fromObject(e);
                                this.removeStickySymbol({column: t, row: i})
                            }), this.dataBoss4.isComplete = !0)
                        }
                    }
                    yield e.completeSpin.call(this)
                }))
            }

            startSpin() {
                this.dataBoss4 = null, super.startSpin(...arguments)
            }
        }

        n.modify(o)
    }, {
        "core-js/modules/es.array.iterator": 344,
        "core-js/modules/es.array.sort": 345,
        "core-js/modules/es.promise": 349,
        "core-js/modules/web.dom-collections.iterator": 353
    }],
    30: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.array.iterator"), e("core-js/modules/web.dom-collections.iterator");
        const s = game.sources.components.Reelset.Handler;

        class n extends s.Latest {
            get statesConfig_Nuke() {
                return {
                    CombinateSymbols: {check: this.hasCombinateSymbols, enter: this.onCombinateSymbols},
                    DecaySymbols: {check: this.hasCombinateSymbols, enter: this.onDecaySymbols},
                    ActionBomb: {enter: this.onActionBomb},
                    ActionGun: {enter: this.onActionGun},
                    ActionLaser: {enter: this.onActionLaser},
                    ActionCut: {enter: this.onActionCut},
                    ActionBoss: {enter: this.onActionBoss}
                }
            }

            onInitialize() {
                this.registerStates(this.statesConfig_Nuke), super.onInitialize()
            }

            onAbort() {
                super.onAbort(), this.completeCall && this.completeCall()
            }

            updateSpinData() {
                return this.spinEvent = this.component.store.getSpinEvent(), this.combinateSymbols = this.component.store.getCombinateSymbols(), this.symbolsBoss3 = this.component.store.getSymbolsBoss3(), this.symbolsBoss4 = this.component.store.getSymbolsBoss4(), this.nextBoss = this.component.store.getNextBoss(), super.updateSpinData(...arguments)
            }

            onActionBomb(e) {
                let {finish: t} = e;
                return this.abort ? t() : (this.completeCall = t, {
                    actions: {
                        specAction: () => {
                            this.completeCall = null, this.swapSymbols ? this.component.swapSymbols(this.swapSymbols).then(t) : t()
                        }
                    }
                })
            }

            onActionGun(e) {
                let {finish: t} = e;
                if (!this.abort) return this.completeCall = t, {
                    actions: {
                        specAction: () => {
                            this.completeCall = null, this.component.actionGun(this.replaceSymbols).then(t)
                        }
                    }
                };
                t()
            }

            onActionLaser(e) {
                let {finish: t} = e;
                return this.abort ? t() : (this.completeCall = t, {
                    actions: {
                        specAction: () => {
                            this.completeCall = null, this.replaceSymbols ? this.component.actionLaser(this.replaceSymbols).then(t) : t()
                        }
                    }
                })
            }

            onActionCut(e) {
                let {finish: t} = e;
                return this.abort ? t() : (this.completeCall = t, {
                    actions: {
                        specAction: () => {
                            this.completeCall = null, this.component.actionCut(this.replaceSymbols, this.dropData).then(t)
                        }
                    }
                })
            }

            onActionBoss(e) {
                let {finish: t} = e;
                const i = c2d.last(t, 2);
                if (this.completeCall = i, this.hasCombinateSymbols() ? this.component.decaySymbolsBeforeAction(this.combinateSymbols).then(i) : i(), this.nextBoss > 5) return void this.component.actionBoss4(this.nextBoss - 1, this.symbolsBoss4).then(i);
                let s;
                if ("boss_2" == this.spinEvent) {
                    const e = {};
                    this.replaceSymbols && this.replaceSymbols.forEach(t => {
                        e[t.id] = e[t.id] || [], e[t.id].push(t)
                    }), s = Object.values(e)
                }
                return {
                    actions: {
                        specAction: e => {
                            if (this.completeCall = null, this.abort) i(); else if ("boss_2" == this.spinEvent) {
                                const {index: t} = e;
                                this.component.actionBoss2(s[t]).then(() => {
                                    t == s.length - 1 && i()
                                })
                            } else "boss_3" == this.spinEvent ? this.component.actionBoss3(this.dropData, this.symbolsBoss3, this.replaceSymbols).then(i) : "boss_4" == this.spinEvent ? this.component.actionBoss4(this.nextBoss - 1, this.symbolsBoss4).then(i) : this.swapSymbols ? this.component.swapSymbols(this.swapSymbols).then(i) : this.replaceSymbols ? this.component.replaceSymbols(this.replaceSymbols).then(i) : i()
                        }
                    }
                }
            }

            hasCombinateSymbols() {
                return this.combinateSymbols.length > 0
            }

            onCombinateSymbols(e) {
                let {finish: t} = e;
                if (this.abort) return t();
                this.component.combinateWinSymbols(this.combinateSymbols).then(t)
            }

            onDecaySymbols(e) {
                let {finish: t} = e;
                if (this.abort) return t();
                this.component.decaySymbols(this.combinateSymbols).then(t)
            }
        }

        s.modify(n)
    }, {"core-js/modules/es.array.iterator": 344, "core-js/modules/web.dom-collections.iterator": 353}],
    31: [function (e, t, i) {
        "use strict";
        const s = game.sources.components.Reelset.Store;

        class n extends s.Latest {
            getSpinEvent() {
                const e = this.getItem("spinData");
                return e && e.extra && e.extra.event || ""
            }

            getCombinateSymbols() {
                const e = this.getItem("spinData"), t = e && e.extra && e.extra.patterns;
                return Object.values(t || [])
            }

            getSymbolsBoss3() {
                const e = this.getItem("spinData"), t = e && e.extra && e.extra.boss_3_bombs_positions;
                return Object.values(t || [])
            }

            getSymbolsBoss4() {
                const e = this.getItem("spinData"), t = e && e.extra && e.extra.boss4_all_bombs_pos;
                return Object.values(t || [])
            }

            getNextBoss() {
                const e = this.getItem("spinData"), t = e && e.extra && e.extra.next_boss;
                return c2d.type.isNumber(t) ? t : -1
            }
        }

        s.modify(n)
    }, {}],
    32: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.array.iterator"), e("core-js/modules/es.promise"), e("core-js/modules/web.dom-collections.iterator");
        const s = game.sources.components.Reelset.View;

        class n extends s.Latest {
            buildLayout() {
                super.buildLayout(...arguments)
            }

            initializeVars() {
                super.initializeVars(), this.underStickyAnimation = ""
            }

            startSpin(e) {
                return game.audioManager.playAudio("reels_fall"), super.startSpin(...arguments)
            }

            stopReels_NukeWorld() {
                game.audioManager.stopAudio("reels_fall"), game.audioManager.playAudio("reels_on")
            }

            dropPresentSymbols() {
                return game.audioManager.playAudio("reels_fall"), super.dropPresentSymbols(...arguments)
            }

            completeSpin() {
                return game.audioManager.stopAudio("reels_on"), super.completeSpin(...arguments)
            }

            actionGun(e, t, i) {
                let {column: s, row: n, id: o} = e;
                const r = new c2d.Timeline;
                r.set({}, {}, i);
                const a = this.getGlobalSymbolPosition(s, n), l = this.layers.winSymbols.toLocal(a);
                if (t) {
                    const e = new c2d.display.Spine(this.assetsStore.getSkeleton("gunshot"));
                    this.layers.winSymbols.addChild(e);
                    const i = this.getGlobalSymbolPosition(t.column, t.row), s = this.layers.winSymbols.toLocal(i);
                    e.position.copyFrom(s);
                    const n = e.findBone("path_end"), o = e.toLocal(a);
                    n.x = o.x, n.y = -o.y, e.visible = !1, r.add(() => {
                        e.visible = !0, e.play("animation").then(() => e.destroy())
                    })
                }
                const c = this.reels[s].getSymbol(n), h = this.getVoidSymbol();
                return this.layers.winSymbols.addChild(h), h.position.copyFrom(l), new Promise(e => {
                    const t = c2d.once(() => {
                        r.kill(), this.removeAbortHandler(t), h.returnToPool(), e()
                    });
                    this.abortHandler.push(t), r.add(() => {
                        c.setAnimation({animation: "replace"}), h.setAnimation({
                            id: o,
                            animation: "replace"
                        }).then(t).then(() => c.setAnimation({id: o, animation: "static"}, {replace: !0}))
                    })
                })
            }

            actionBoss2(e) {
                let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                const {column: i, row: s, id: n} = e,
                    o = (this.reels[i].getSymbol(s), this.getGlobalSymbolPosition(i, s)),
                    r = this.layers.winSymbols.toLocal(o), a = this.assetsStore.getSkeleton("splatter"),
                    l = new c2d.display.Spine(a);
                return l.name = "splatter", l.tint = {
                    1: 16772608,
                    2: 16711680,
                    3: 65297,
                    4: 34815
                }[n], l.position.copyFrom(r), new Promise(i => {
                    const s = c2d.once(() => {
                        this.removeAbortHandler(s), l.destroy(), i()
                    });
                    this.abortHandler.push(s);
                    const n = c2d.last(s, 2);
                    t ? this.replaceSymbols(e, {qeue: !0}).then(n) : n(), this.layers.winSymbols.addChild(l), l.play("animation").then(n)
                })
            }

            actionBoss3(e) {
                let {column: t, row: i} = e;
                return new Promise(e => {
                    const s = c2d.once(() => {
                        this.removeAbortHandler(s), n.setAnimation({
                            id: 0,
                            animation: "static"
                        }, {replace: !0}), o.putChild(n), e()
                    });
                    this.abortHandler.push(s);
                    const n = this.reels[t].getSymbol(i), o = n.parent;
                    this.layers.winSymbols.putChild(n), n.setAnimation({animation: "fire_boss_3"}).then(s)
                })
            }

            boss4UpdateBones(e, t) {
                const i = Array.fromObject(t[e]), s = Array.fromObject(t[e + 1]);
                if (0 == e) {
                    const e = {x: 135, y: 142}, [t, n] = Array.fromObject(i.first), o = this.getStickySymbol(t, n);
                    s.forEach((t, i) => {
                        if (i % 4 != 0) return;
                        const [s, n] = Array.fromObject(t), r = this.getGlobalSymbolPosition(s, n), a = o.toLocal(r),
                            l = "bomb_ctrl_" + (i / 4 + 1), c = o.spine.findBone(l);
                        c.x = a.x - e.x, c.y = -(a.y - e.y)
                    })
                } else if (1 == e) {
                    const e = {x: 55, y: 48};
                    let t = 0;
                    i.forEach((i, n) => {
                        if (n % 4 != 0) return;
                        const [o, r] = Array.fromObject(i), a = this.getStickySymbol(o, r);
                        for (let i = 1; i < 4; i++) {
                            const n = s[t];
                            if (t++, !n) return !0;
                            const [o, r] = Array.fromObject(n), l = this.getGlobalSymbolPosition(o, r),
                                c = a.spine.toLocal(l), h = "bomb_ctrl_" + i, u = a.spine.findBone(h);
                            u.x = c.x - e.x, u.y = -(c.y - e.y)
                        }
                    })
                }
            }
        }

        s.modify(n)
    }, {
        "core-js/modules/es.array.iterator": 344,
        "core-js/modules/es.promise": 349,
        "core-js/modules/web.dom-collections.iterator": 353
    }],
    33: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./NukeWorldReelset.js"), e("./NukeWorldReelsetHandler.js"), e("./NukeWorldReelsetStore.js"), e("./NukeWorldReelsetController.js"), e("./NukeWorldReelsetView.js")
    }, {
        "./NukeWorldReelset.js": 28,
        "./NukeWorldReelsetController.js": 29,
        "./NukeWorldReelsetHandler.js": 30,
        "./NukeWorldReelsetStore.js": 31,
        "./NukeWorldReelsetView.js": 32
    }],
    34: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        }, n = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.Camera = void 0;
        let o = class extends game.sources.Component {
            build() {
                this.controller.build()
            }

            play(e) {
                return n(this, void 0, void 0, (function* () {
                    this.store.turboMode && c2d.Timeout.wait(0).then(() => this.onSkip()), yield this.controller.play(e)
                }))
            }

            onSkip() {
                this.controller.onSkip()
            }

            onAbort() {
                this.controller.onAbort()
            }
        };
        o = s([modifiable], o), i.Camera = o
    }, {}],
    35: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        }, n = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.CameraController = void 0;
        let o = class extends game.sources.Controller {
            build() {
                this.view.build()
            }

            play(e) {
                return n(this, void 0, void 0, (function* () {
                    yield this.view.play(e)
                }))
            }

            onResizeScreen() {
                this.view.reposition()
            }

            onSkip() {
                this.view.onSkip()
            }

            onAbort() {
                this.view.onAbort()
            }
        };
        o = s([modifiable], o), i.CameraController = o
    }, {}],
    36: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.CameraHandler = void 0;
        let n = class extends game.sources.Handler {
            get statesConfig() {
                return {
                    Init: {enter: this.onInitEnter},
                    Intro: {enter: this.onIntroEnter, exit: this.onIntroExit},
                    Replay: {enter: this.onReplayEnter, exit: this.onReplayExit}
                }
            }

            onInitEnter({finish: e}) {
                this.component.build(), e()
            }

            onIntroEnter({finish: e}) {
                this.isIntro = !0, e()
            }

            onIntroExit({finish: e}) {
                this.isIntro = !1, e()
            }

            onReplayEnter({finish: e}) {
                this.isAbort = !1, e();
                return {
                    onAbort: () => {
                        this.onAbort()
                    }
                }
            }

            onReplayExit({finish: e}) {
                return this.isAbort = !1, e(), {
                    onFinish: () => {
                        this.component.play("default")
                    }
                }
            }

            onAbort() {
                this.isAbort = !0, this.component.onAbort()
            }
        };
        n = s([modifiable], n), i.CameraHandler = n
    }, {}],
    37: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.CameraStore = void 0;
        let n = class extends game.sources.Store {
            get turboMode() {
                return this.getItem("turboMode")
            }
        };
        n = s([modifiable], n), i.CameraStore = n
    }, {}],
    38: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        }, n = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.CameraView = void 0;
        let o = class extends game.sources.View {
            build() {
                this.timelines = [], this.camera = this.layer, this.reposition()
            }

            reposition() {
                !game.device.desktop && this.currentAnimation && (this.timelines.length ? this._restoreCurrentAnimation(this.currentAnimation) : this._restoreEndAnimation(this.currentAnimation))
            }

            _restoreEndAnimation(e) {
                const t = this.getConfig(e);
                if (!t) return console.error("Animation is undefined.", e);
                const {animation: i, position: s, scale: n, skew: o, rotation: r} = t.last;
                if (i) return this._restoreEndAnimation(e);
                (n || 0 === n) && (c2d.type.isNumber(n) ? this.camera.scale.set(n) : this.camera.scale.set(1 / n.x, 1 / n.y)), (o || 0 === o) && (c2d.type.isNumber(o) ? this.camera.skew.set(o) : this.camera.skew.set(o.x, o.y)), s && this.camera.pivot.set(s.x, s.y), r && this.camera.rotation.set(r)
            }

            _restoreCurrentAnimation(e) {
                const t = this.timelines.first.time();
                this.timelines.first.remove(), this.timelines = [], this._play(e, t)
            }

            play(e) {
                return n(this, void 0, void 0, (function* () {
                    this.timescale = 1, this.timelines = [], yield this._play(e)
                }))
            }

            _play(e, t = null) {
                const i = this.getConfig(e);
                if (!i) return console.error("Animation is undefined.", e);
                this.currentAnimation = e;
                const s = new c2d.Timeline;
                this.timelines.push(s), s.timeScale(this.timescale);
                let n = 0;
                return i.forEach(e => {
                    const {
                        time: t = 0,
                        animation: i,
                        easeType: o = "Linear",
                        ease: r = "none",
                        position: a,
                        scale: l,
                        skew: c,
                        rotation: h
                    } = e;
                    let u, d, p;
                    (l || 0 === l) && (u = c2d.type.isNumber(l) ? {scale: l} : {
                        scaleX: 1 / l.x,
                        scaleY: 1 / l.y
                    }), (c || 0 === c) && (d = c2d.type.isNumber(c) ? {skew: c} : {
                        skewX: c.x,
                        skewY: c.y
                    }), a && (p = {pivotX: a.x, pivotY: a.y});
                    const m = Object.assign(Object.assign(Object.assign(Object.assign({}, p), u), d), {rotation: h});
                    Object.keys(m).length > 0 && s.to(this.camera, t - n, {
                        pixi: m,
                        ease: c2d.easing[o][r]
                    }, n), n = t, i && s.add(() => this._play(i, t))
                }), t && s.time(t), this.promise || (this.promise = c2d.waitLast()), s.add(() => {
                    var e;
                    const t = this.timelines.indexOf(s);
                    this.timelines.splice(t, 1), null === (e = this.promise) || void 0 === e || e.call(), this.promise = null
                }), this.promise
            }

            onSkip() {
                this.timescale = 3, this.timelines.forEach(e => e.timeScale(3))
            }

            onAbort() {
                this.timelines.forEach(e => {
                    e.progress(1)
                })
            }

            getConfig(e) {
                let t;
                return game.device.desktop ? t = this.config.animations[e + "_desktop"] : game.device.tablet ? t = game.device.portrait ? this.config.animations[e + "_tablet_portrait"] || this.config.animations[e + "_portrait"] : this.config.animations[e + "_tablet_landscape"] || this.config.animations[e + "_landscape"] : game.device.portrait ? t = this.config.animations[e + "_portrait"] : game.device.landscape && (t = this.config.animations[e + "_landscape"]), t || this.config.animations[e]
            }
        };
        o = s([modifiable], o), i.CameraView = o
    }, {}],
    39: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("./Camera"), n = e("./CameraStore"), o = e("./CameraHandler"), r = e("./CameraController"),
            a = e("./CameraView"), l = {
                Component: s.Camera,
                Store: n.CameraStore,
                Handler: o.CameraHandler,
                Controller: r.CameraController,
                View: a.CameraView
            };
        (c2d.Logger ? c2d.Logger.Of("Camera") : console).info("component version v0.01.1"), game.componentsManager.registerComponent("Camera", l, "v0.01.1")
    }, {"./Camera": 34, "./CameraController": 35, "./CameraHandler": 36, "./CameraStore": 37, "./CameraView": 38}],
    40: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.Celebration = void 0;
        let n = class extends game.sources.VisualComponent {
            check() {
                return this.controller.check(...arguments)
            }

            playWinAudio() {
                return this.controller.playWinAudio(...arguments)
            }

            show() {
                this.controller.showWin(...arguments)
            }

            hasFSWin() {
                return !!this.config.fsStages
            }

            showFS() {
                this.controller.showFSWin(...arguments)
            }

            outFS() {
                this.controller.outFSWin(...arguments)
            }

            skip() {
                this.controller.skipWin(...arguments)
            }

            hide() {
                this.controller.hide(...arguments)
            }

            initLines() {
                this.controller.init(...arguments)
            }

            isShowBigWin() {
                return "bigWin" == this.view.currentState
            }

            isShowHugeWin() {
                return "hugeWin" == this.view.currentState
            }

            isShowMegaWin() {
                return "megaWin" == this.view.currentState
            }

            getViewAmount() {
                return this.view.amount.text
            }

            newStageHandler(e) {
                this.handler.newStageHandler(e)
            }
        };
        n = s([modifiable], n), i.Celebration = n
    }, {}],
    41: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.CelebrationController = void 0;
        let n = class extends game.sources.Controller {
            init() {
                this.canSkip = !1, this.initView(), this.initBackground(), this.initAmount(), this.initLabel(), this.initEmitter(), this.setWinResolver()
            }

            setWinResolver() {
                game.audioManager.addConflictResolver("win", e => {
                    const t = this.store.getBet();
                    let i;
                    if (this.config.showEveryWin) {
                        i = this.store.getWinsData().total
                    } else i = this.store.getTotalWin();
                    const s = i / t, n = [...this.config.lowStages, Number.MAX_VALUE];
                    return e[Math.min(n.findIndex(e => s < e) - 1, e.length - 1)]
                })
            }

            initView() {
                this.view.init()
            }

            initBackground() {
                this.view.createBackground(this.config.background)
            }

            initAmount() {
                this.view.createAmount(this.assetsStore.getConfig("amount"))
            }

            initLabel() {
                this.view.createLabel(this.assetsStore.getConfig("label"))
            }

            initEmitter() {
                this.view.createEmitter(this.assetsStore.getConfig("emitter"))
            }

            check() {
                const e = this.store.getBet();
                let t;
                if (this.config.showEveryWin) {
                    t = this.store.getWinsData().total
                } else {
                    const e = this.store.getNextAction();
                    if ("spin" != e && "freespin" != e) return !1;
                    t = this.store.getTotalWin()
                }
                const i = this.config.stages;
                return !i[0].entryBet || t / e >= i[0].entryBet
            }

            playWinAudio() {
                const e = this.store.getBet();
                let t;
                if (this.config.showEveryWin) {
                    t = this.store.getWinsData().total
                } else t = this.store.getTotalWin();
                const i = t / e;
                if (this.config.lowStages) {
                    const {lowStages: e} = this.config, t = "win_" + e.map(e => e || 0).filter(e => e <= i).length;
                    this._playSoundIfIsset(t)
                } else this._playSoundIfIsset("win_1")
            }

            _playSoundIfIsset(e) {
                this.assetsStore.hasAudio(e) && game.audioManager.playAudio(e)
            }

            calculateDuration(e, t, i) {
                const s = i ? this.config.fsStages : this.config.stages;
                if (s[0].entryBet = s[0].entryBet || 0, e < s[0].entryBet) return {duration: 0};
                const n = [];
                let o, r = 0;
                return this.config.duration ? r += this.config.duration : this.config.speed && (r += s[0].entryBet / this.config.speed * 1e3), r && n.push({
                    duration: r,
                    toCoins: s[0].entryBet * t
                }), s.some((i, a) => {
                    const l = s[a + 1];
                    if (l && (l.entryBet = l.entryBet || 0), l && l.entryBet <= e) {
                        let s;
                        if (i.duration ? s = i.duration : i.speed ? s = (l.entryBet - i.entryBet) / i.speed * 1e3 : this.config.duration ? s = this.config.duration : this.config.speed && (s = (l.entryBet - i.entryBet) / this.config.speed * 1e3), n.push({
                            label: i.label,
                            duration: s,
                            toCoins: l.entryBet * t,
                            animation: i.animation
                        }), r += s, l.entryBet === e) return l.resultDelay && (o = l.resultDelay), n.push({
                            label: l.label,
                            animation: l.animation
                        }), !0
                    } else {
                        if (l && l.entryBet > e) {
                            let t;
                            i.speed ? t = i.speed : i.duration ? t = (l.entryBet - i.entryBet) / (.001 * i.duration) : this.config.speed ? t = this.config.speed : this.config.duration && (t = (l.entryBet - i.entryBet) / (.001 * this.config.duration));
                            const s = (e - i.entryBet) / t * 1e3;
                            return r += s, i.resultDelay && (o = i.resultDelay), n.push({
                                label: i.label,
                                duration: s,
                                animation: i.animation
                            }), !0
                        }
                        if (!l) {
                            let t;
                            return i.duration ? t = i.duration : i.speed ? t = (e - i.entryBet) / i.speed * 1e3 : this.config.duration ? t = this.config.duration : this.config.speed && (t = (e - i.entryBet) / this.config.speed * 1e3), r += t, i.resultDelay && (o = i.resultDelay), n.push({
                                label: i.label,
                                duration: t,
                                animation: i.animation
                            }), !0
                        }
                    }
                }), {duration: r, resultDelay: o, stages: n}
            }

            showWin(e) {
                this.canSkip = !0;
                const t = this.store.getBet();
                let i;
                if (this.config.showEveryWin) {
                    i = this.store.getWinsData().total
                } else i = this.store.getTotalWin();
                const s = i / t, n = this.calculateDuration(s, t), {stages: o, duration: r} = n;
                if (!r || !i) return;
                let {resultDelay: a, skipDelay: l} = n;
                c2d.type.isNumber(a) || (a = this.config.resultDelay), this.skipDelay = l = this.config.skipDelay;
                const c = {stages: o, duration: r, resultDelay: a, skipDelay: l};
                this.showAmount(i, c), this.showEmitter(r), this.skipTimeout = c2d.Timeout.invoke(() => this.canSkip = !1, .001 * r), this.outPhaseTimeout = c2d.Timeout.invoke(e, .001 * (r + a))
            }

            showFSWin(e) {
                const t = this.store.getBet(), i = this.store.getFSTotalWin();
                this.isSkip = !1, this.canSkip = !0;
                const s = i / t, n = this.calculateDuration(s, t, !0), {stages: o, duration: r} = n;
                let {resultDelay: a, skipDelay: l} = n;
                c2d.type.isNumber(a) || (a = this.config.resultDelay), this.skipDelay = l = this.config.skipDelay;
                const c = {stages: o, duration: r, skipDelay: l, resultDelay: a, waitSkip: !0};
                this.showAmount(i, c), this.showEmitter(r), this.skipTimeout = c2d.Timeout.invoke(() => this.canSkip = !1, .001 * (r + a)), this.outPhaseTimeout = c2d.Timeout.invoke(e, .001 * (r + a))
            }

            outFSWin(e) {
                this.isSkip ? e() : this.view.playOut(e)
            }

            showAmount(e, t) {
                this.view.showAmount(e, t)
            }

            showEmitter(e) {
                this.view.showEmitter(e)
            }

            skipWin() {
                if (!this.canSkip) return;
                this.isSkip = !0, this.canSkip = !1, this.skipTimeout.progress(1);
                const e = this.outPhaseTimeout.target;
                this.outPhaseTimeout.kill(), c2d.Timeout.invoke(e, .001 * this.skipDelay), this.view.skipWin()
            }

            hide() {
                this.view.clear()
            }
        };
        n = s([modifiable], n), i.CelebrationController = n
    }, {}],
    42: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.CelebrationHandler = void 0;
        let n = class extends game.sources.Handler {
            get statesConfig() {
                return {
                    Init: {exit: this.onInitExit},
                    Intro: {enter: this.onIntroEnter, begin: this.onIntroBegin, exit: this.onIntroExit},
                    Replay: {enter: this.onReplayEnter, exit: this.onReplayExit},
                    ShowAllLines: {enter: this.onShowAllLinesEnter},
                    Celebration: {check: this.hasCelebration, enter: this.onCelebrationEnter},
                    FreespinsWin: {check: this.hasFSCelebration},
                    ShowFreespinsWin: {enter: this.onFreespinsWinEnter, exit: this.onFreespinsWinExit}
                }
            }

            onInitExit({finish: e}) {
                this.component.initLines(), e()
            }

            onIntroEnter({finish: e}) {
                return this.isIntro = !0, this.isAbort = !1, e(), {onAbort: () => this.onAbort()}
            }

            onAbort() {
                this.isAbort || (this.component.skip(), this.isAbort = !0, this.waitHandler && this.waitHandler())
            }

            onIntroBegin({finish: e}) {
                this.isAbort = !1, e()
            }

            onIntroExit({finish: e}) {
                this.isIntro = !1, this.isAbort = !1, e()
            }

            onReplayEnter({finish: e}) {
                return this.isAbort = !1, e(), {onAbort: () => this.onAbort()}
            }

            onReplayExit({finish: e}) {
                this.isAbort = !1, e()
            }

            onShowAllLinesEnter({finish: e}) {
                this.isAbort || this.component.playWinAudio(), e()
            }

            hasCelebration() {
                return !this.isIntro && (!this.isAbort && this.component.check())
            }

            onCelebrationEnter({finish: e}) {
                return this.waitHandler = e, this.component.show(e), {
                    onSkip: () => {
                        this.component.skip()
                    }, onFinish: () => {
                        this.component.hide()
                    }
                }
            }

            hasFSCelebration() {
                return !this.isIntro && (!this.isAbort && (this.hasFSWin = this.component.hasFSWin(), this.hasFSWin))
            }

            onFreespinsWinEnter({finish: e}) {
                if (this.hasFSWin) return this.component.showFS(e), {
                    onSkip: () => {
                        this.component.skip()
                    }
                };
                e()
            }

            onFreespinsWinExit({finish: e}) {
                if (this.hasFSWin) return this.component.outFS(e), {
                    onFinish: () => {
                        this.component.hide()
                    }
                };
                e()
            }

            newStageHandler(e) {
                this.events.emit(this.events.config.COMPONENTS_CELEBRATION_NEW_STAGE, e)
            }

            sendRewardShowEvent(e) {
                const t = this.component.store.getItem("multiplier");
                t && (e.multiplier = t), this.events.emit(this.events.config.COMPONENTS_REWARD_SHOW, e)
            }

            sendRewardHideEvent() {
                this.events.emit(this.events.config.COMPONENTS_REWARD_HIDE)
            }

            sendRewardAmountUpdateEvent(e) {
                this.events.emit(this.events.config.COMPONENTS_REWARD_AMOUNT_UPDATE, e)
            }
        };
        n = s([modifiable], n), i.CelebrationHandler = n
    }, {}],
    43: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.CelebrationStore = void 0;
        let n = class extends game.sources.Store {
            addToGlobal() {
                this.addItem("hasCelebration")
            }

            get hasCelebration() {
                return this.component.controller.check()
            }

            getMultiplier() {
                return this.getItem("multiplier")
            }

            getWinsData() {
                return this.getItem("wins")
            }

            getTotalWin() {
                return this.getItem("totalWin")
            }

            getBet() {
                var e;
                return (null === (e = this.getItem("spinData")) || void 0 === e ? void 0 : e.bet) || this.getItem("bet")
            }

            getFSTotalWin() {
                return this.getItem("spinData").freespins.wins.total
            }

            hasWins() {
                return this.getItem("totalWin")
            }

            getNextAction() {
                return this.getItem("getNextAction")
            }
        };
        n = s([modifiable], n), i.CelebrationStore = n
    }, {}],
    44: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.CelebrationView = void 0;
        const n = e("./view/CelebrationAmountView"), o = e("./view/CelebrationLabelView"),
            r = e("./view/CelebrationBackgroundView");
        let a = class extends game.sources.View {
            constructor() {
                super(...arguments), this.rewardVisible = !1
            }

            init() {
            }

            createBackground(e) {
                e.spine && (this.bg = new r.CelebrationBackgroundView, this.bg.initialize(e, this.assetsStore), this.bg.visible = !1, this.layers.background.addChild(this.bg))
            }

            createAmount(e) {
                this.amountConfig = e, this.bg && this.bg.useSpineAmount ? (this.amount = this.bg.spine.attachLabels.amount, this.amount.attached = !0) : (this.amount = new n.CelebrationAmountView, this.amount.initialize(e, this.assetsStore), this.amount.visible = !1, this.layers.amount.addChild(this.amount))
            }

            createLabel(e) {
                e && (this.label = new o.CelebrationLabelView, this.label.initialize(e, this.assetsStore), this.label.visible = !1, this.layers.label.addChild(this.label), this.bg.useSpineLabel && this.label.attach(this.bg))
            }

            createEmitter(e) {
                var t;
                if (!e) return;
                this.patriclesStack = [], e.prefix = [].concat(e.prefix);
                const i = [...e.prefix];
                for (const t in e.stages) {
                    const s = e.stages[t];
                    s.prefix && i.push(...s.prefix)
                }
                const s = [];
                if (i.forEach(e => {
                    const t = this.assetsStore.getTexturesPack(e);
                    s.push({prefix: e, framerate: 30, loop: !0, textures: t})
                }), this.emitter = new c2d.display.Emitter(s, e.particles), this.emitter.config = e, e.position && this.emitter.position.set(e.position.x, e.position.y), this.bg.useSpineParticles) {
                    const i = this.bg.spine.getChildByName(e.attach),
                        s = null === (t = this.amount.bg) || void 0 === t ? void 0 : t.getChildByName(e.attach);
                    i ? this.bg.spine.attach(e.attach, this.emitter) : s && this.amount.bg.attach(e.attach, this.emitter)
                } else this.layers.emitter.addChild(this.emitter)
            }

            showEmitter(e) {
                this.emitter && (this.emitter.enableEmit = !0, this.assetsStore.hasAudio("counter") && game.audioManager.playAudio("counter"), e *= .001, e += .5, c2d.Timeout.invokeOnce("celebration_emmit", () => this.hideEmitter(), e))
            }

            hideEmitter() {
                c2d.Timeout.resetInvoke("celebration_emmit"), this.emitter.enableEmit = !1, this.assetsStore.hasAudio("counter") && game.audioManager.stopAudio("counter"), this.emitter._emitter.particleImages.push(...this.patriclesStack)
            }

            showAmount(e, t) {
                const {stages: i, duration: s, resultDelay: n, skipDelay: o} = t;
                return i ? this.countTween(e, t) : this._setTextAmount(e), this.amount.attached || (this.amount.visible = !0, this.amount.play(t)), this.amount
            }

            _setTextAmount(e) {
                var t;
                const i = this.component.store.getItem("multiplier");
                (null === (t = this.amountConfig) || void 0 === t ? void 0 : t.useRewardEvents) && i && i > 1 ? this._sendRewardAmountEvent(e) : this.amount.text = e
            }

            _sendRewardAmountEvent(e) {
                e ? this.rewardVisible ? this.component.handler.sendRewardAmountUpdateEvent({
                    type: "multiplierBigWin",
                    value: +e
                }) : (this.component.handler.sendRewardShowEvent({
                    type: "multiplierBigWin",
                    value: +e
                }), this.rewardVisible = !0) : (this.component.handler.sendRewardHideEvent(), this.rewardVisible = !1)
            }

            countTween(e, t) {
                var i;
                const {stages: s, duration: n, resultDelay: o, skipDelay: r} = t;
                this.startWithLabel(s);
                const a = this.amountValueTween = new c2d.Timeline, l = {value: 0}, c = () => {
                    this._setTextAmount(l.value.toFixed(2))
                };
                (null === (i = this.emitter) || void 0 === i ? void 0 : i.config.stages) && (this.patriclesStack = this.emitter._emitter.particleImages, this.emitter._emitter.particleImages = [], this.emitter.config.prefix.length && this.patriclesStack.forEach(({prefix: e}, t) => {
                    if (this.emitter.config.prefix.includes(e)) {
                        const e = this.patriclesStack.splice(t, 1)[0];
                        this.emitter._emitter.particleImages.push(e)
                    }
                })), s.forEach((t, i) => {
                    this.label && t.label && (this.label.labels[t.label].visible = !0);
                    const n = i == s.length - 1, o = t.toCoins || e,
                        r = n ? c2d.easing.Sine.easeOut : c2d.easing.Linear.easeNone;
                    a.to(l, .001 * t.duration, {
                        value: o, onStart: () => {
                            var e;
                            if (t.label) {
                                if (this.currentState = t.label, null === (e = this.emitter) || void 0 === e ? void 0 : e.config.stages) for (const e in this.emitter.config.stages) if (e == t.label) {
                                    const {prefix: t} = this.emitter.config.stages[e];
                                    if (!t) break;
                                    for (let e = this.patriclesStack.length - 1; e > -1; e--) {
                                        const i = this.patriclesStack[e];
                                        t.includes(i.prefix) && (this.patriclesStack.splice(e, 1), this.emitter._emitter.particleImages.push(i))
                                    }
                                    break
                                }
                                this.component.newStageHandler(t)
                            }
                        }, onUpdate: c, ease: r
                    })
                }), this.bg && (this.bg.visible = !0, this.bg.play(t)), this.label && this.label.play(t)
            }

            playOut(e) {
                this.amount.playOut(), this.bg ? this.bg.playOut(e) : e()
            }

            startWithLabel(e) {
                (this.config.startWithLabel || e[0].label) && e.some((t, i) => {
                    if (t.label && i > 0) return e[0].label = t.label, e[0].animation = t.animation, delete t.label, !0
                })
            }

            skipWin() {
                this.amountValueTween.progress(1), !this.amount.attached && this.amount.skip(), this.bg && this.bg.skip(), this.label && this.label.skip(), this.emitter && c2d.Timeout.invoke(() => {
                    this.hideEmitter()
                }, .5)
            }

            clear() {
                this.currentState = null, this._setTextAmount(""), this.amount.attached || (this.amount.visible = !1, this.amount.timeline && this.amount.timeline.kill()), this.label && !this.label.attached && (this.label.visible = !1, this.label.timeline && this.label.timeline.kill()), this.bg && (this.bg.visible = !1, this.bg.timeline && this.bg.timeline.kill()), this.emitter && this.hideEmitter(), this.label && Object.values(this.label.labels).forEach(e => {
                    e.visible = !1
                })
            }
        };
        a = s([modifiable], a), i.CelebrationView = a
    }, {"./view/CelebrationAmountView": 47, "./view/CelebrationBackgroundView": 48, "./view/CelebrationLabelView": 49}],
    45: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("./Celebration"), n = e("./CelebrationHandler"), o = e("./CelebrationStore"),
            r = e("./CelebrationController"), a = e("./CelebrationView"), l = e("./view/CelebrationAmountView"),
            c = e("./view/CelebrationLabelView"), h = e("./view/CelebrationBackgroundView"),
            u = e("./mods/hideWinsLowerThanBet/HideWinsLowerThanBetController"), d = {
                Amount: l.CelebrationAmountView,
                Label: c.CelebrationLabelView,
                Background: h.CelebrationBackgroundView
            }, p = {
                Component: s.Celebration,
                Handler: n.CelebrationHandler,
                Store: o.CelebrationStore,
                Controller: r.CelebrationController,
                View: a.CelebrationView,
                classes: d
            };
        c2d.recursiveSet("classes.mods.hideWinsLowerThanBet.Controller", u.HideWinsLowerThanBetMod, p);
        (c2d.Logger ? c2d.Logger.Of("Celebration") : console).info("component version v0.01.0"), game.componentsManager.registerComponent("Celebration", p, "v0.01.0")
    }, {
        "./Celebration": 40,
        "./CelebrationController": 41,
        "./CelebrationHandler": 42,
        "./CelebrationStore": 43,
        "./CelebrationView": 44,
        "./mods/hideWinsLowerThanBet/HideWinsLowerThanBetController": 46,
        "./view/CelebrationAmountView": 47,
        "./view/CelebrationBackgroundView": 48,
        "./view/CelebrationLabelView": 49
    }],
    46: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.HideWinsLowerThanBetMod = void 0;
        const s = e("../../CelebrationController");
        i.HideWinsLowerThanBetMod = () => {
            const e = s.CelebrationController;

            class t extends e.Latest {
                setWinResolver() {
                    game.audioManager.addConflictResolver("win", e => {
                        const t = this.store.getBet();
                        let i;
                        if (this.config.showEveryWin) {
                            i = this.store.getWinsData().total
                        } else i = this.store.getTotalWin();
                        const s = i / t, n = [...this.config.lowStages, Number.MAX_VALUE],
                            o = Math.min(n.findIndex(e => s < e) - 1, e.length - 1),
                            r = e.find(e => !/^win/.test(e.name));
                        return r && e.splice(e.indexOf(r), 1), r && i < t ? r : e[o]
                    })
                }
            }

            e.modify(t)
        }
    }, {"../../CelebrationController": 41}],
    47: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        }, n = this && this.__rest || function (e, t) {
            var i = {};
            for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (i[s] = e[s]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var n = 0;
                for (s = Object.getOwnPropertySymbols(e); n < s.length; n++) t.indexOf(s[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[n]) && (i[s[n]] = e[s[n]])
            }
            return i
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.CelebrationAmountView = void 0;
        const o = "in_counter", r = "idle_counter", a = "out_counter";
        let l = class extends c2d.display.Container {
            initialize(e, t) {
                if (e.bitmapFont) {
                    this.isBitmapText = !0;
                    const i = {}, s = e.bitmapFont;
                    Object.entries(t.textures).forEach(([e, t]) => {
                        if (e.includes(s)) {
                            const n = e.substr(s.length);
                            i[n] = t
                        }
                    });
                    const n = e.fontSize;
                    this.label = new c2d.display.BitmapText(null, {textures: i, fontSize: n, padding: e.bitmapPadding})
                } else {
                    const i = t.getConfig("styles")[e.style];
                    e.fontSize && (i.fontSize = e.fontSize), this.label = new c2d.display.TextField("", i)
                }
                e.position && this.position.copyFrom(e.position);
                const i = e.anchor;
                if (i ? this.label.anchor.copyFrom(i) : this.label.anchor.set(.5), e.scale && (this.label.scale.x *= e.scale.x, this.label.scale.y *= e.scale.y), e.tween && (this.tweenOptions = e.tween), e.spineBackground) {
                    const i = t.getSkeleton(e.spineBackground);
                    this.bg = new c2d.display.Spine(i), this.addChild(this.bg), this.bg.attach("text", this.label)
                } else this.addChild(this.label)
            }

            getAnimationDuration(e) {
                const t = this.bg.findAnimation(e);
                return t || console.error(`Can not find animation "${e}". Available animations: [${this.bg.spineData.animations.map(e => e.name)}]`), t.duration
            }

            play({duration: e, resultDelay: t, skipDelay: i, waitSkip: s = !1}) {
                if (this.waitSkip = s, this.timeline = new c2d.Timeline, this.bg) {
                    const i = this.getAnimationDuration(o), s = this.getAnimationDuration(a),
                        n = () => this.bg.play(o, {force: !0}), l = () => this.bg.play(r, {force: !0, loop: !0}),
                        c = () => this.bg.play(a, {force: !0}), h = .001 * (e + t) - i - s;
                    this.timeline.to({}, i, {onStart: n}).to({}, h, {onStart: l}), this.waitSkip ? this.endAnimation = c : this.timeline.to({}, s, {onStart: c})
                } else if (this.tweenOptions) {
                    const {iterations: i, start: s, end: o} = this.tweenOptions, r = [...i], {duration: a, ease: l} = o,
                        c = n(o, ["duration", "ease"]), h = e + t - (a || 0);
                    this.timeline.set(this, {pixi: s});
                    const u = r.reduce((e, t) => {
                        var {duration: i, ease: s} = t, o = n(t, ["duration", "ease"]);
                        let r;
                        c2d.type.isNumber(i) ? e -= r = i : (r = e, e = 0);
                        c2d.utils.Searcher.findAttr(s, c2d.easing);
                        return this.timeline.to(this, .001 * r, {pixi: o, ease: s}), e
                    }, h), d = {pixi: c, ease: c2d.utils.Searcher.findAttr(l, c2d.easing), delay: .001 * u};
                    this.waitSkip ? this.endAnimation = () => {
                        c2d.Tween.to(this, .001 * (a || 0), d)
                    } : this.timeline.to(this, .001 * (a || 0), d)
                }
                this.skipDuration = .001 * (e + t - i)
            }

            playOut() {
                this.skip()
            }

            skip() {
                this.waitSkip ? (this.timeline.kill(), this.endAnimation()) : this.timeline.time(this.skipDuration)
            }

            get text() {
                return this.label.text
            }

            set text(e) {
                this.label.text = e
            }
        };
        l = s([modifiable], l), i.CelebrationAmountView = l
    }, {}],
    48: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.CelebrationBackgroundView = void 0;
        const n = [{start: "in_big_win", idle: "idle_big_win", out: "out_big_win"}, {
            start: "big_win_break_huge",
            idle: "idle_huge_win",
            out: "out_huge_win"
        }, {start: "huge_win_break_mega", idle: "idle_mega_win", out: "out_mega_win"}];
        let o = class extends c2d.display.Container {
            initialize(e, t) {
                const i = t.getSkeleton(e.spine);
                this.spine = new c2d.display.Spine(i), this.addChild(this.spine), e.mixTime && this.spine.mixAllAnimations(e.mixTime), this.useSpineLabel = e.useSpineLabel, this.useSpineAmount = e.useSpineAmount, this.useSpineParticles = e.useSpineParticles, this.skipAnimationSpeed = e.skipAnimationSpeed || 1, this.transitionAnimationOffset = e.transitionAnimationOffset || 0
            }

            play({stages: e, duration: t, resultDelay: i, skipDelay: s, waitSkip: n = !1}) {
                let o;
                this.timeline && this.timeline.kill(), this.timeline = new c2d.Timeline;
                let r = 0, a = -1;
                const l = e.reduce((e, t) => {
                    const {label: i = "", duration: s = 0, animation: n} = t;
                    return i ? (o && (this.addTween({
                        index: ++a,
                        duration: o,
                        delay: r,
                        animation: n
                    }), r = 0), o = s) : c2d.type.isNumber(o) ? o += s : r += s, e - s
                }, t + i);
                this.skipDelay = .001 * s, this.lastState = ++a, this.addTween({
                    index: this.lastState,
                    duration: o + l,
                    out: !n,
                    animation: e.last.animation,
                    delay: r
                })
            }

            playOut(e) {
                this.skip(e, !1)
            }

            getAnimationDuration(e) {
                if (!e) return 0;
                const t = this.spine.findAnimation(e);
                return t ? t.duration : 0
            }

            addTween({index: e, duration: t = 0, delay: i = 0, out: s = !1, animation: o = {}}) {
                t *= .001, i *= .001;
                const r = .001 * this.transitionAnimationOffset, a = n[e], l = o.start || a.start,
                    c = this.getAnimationDuration(l), h = t - c;
                if (e > 0 && (i += r), this.timeline.add(() => this.spine.play(l), `+=${i}`).add(() => {
                    const e = o.idle || a.idle;
                    this.spine.play(e, {loop: !0, force: !1});
                    const t = this.spine.findAnimation(e);
                    if (t.duration) {
                        const e = t.duration - r, i = Math.round(h / e) || 1;
                        this.spine.track.timeScale = e * i / h
                    }
                }, `+=${c}`).set({}, {}, `+=${h}`), this.lastStateAnimation = {
                    idle: o.idle || a.idle,
                    out: o.out || a.out
                }, s) {
                    const e = this.lastStateAnimation.out, t = this.getAnimationDuration(e),
                        i = () => this.spine.play(e);
                    this.timeline.add(i, `-=${t}`)
                }
            }

            skip(e, t = !0) {
                const i = this.skipAnimationSpeed, s = this.lastStateAnimation.idle, n = this.lastStateAnimation.out;
                t && this.spine.track && (this.spine.track.timeScale = i);
                const o = this.skipDelay, r = this.getAnimationDuration(n) / i;
                this.timeline.kill();
                const a = this.timeline = new c2d.Timeline;
                a.add(() => this.spine.play(s, {
                    speed: 1,
                    loop: !0
                })).set({}, {}, `+=${o}`).add(() => this.spine.play(n, {speed: i}), `-=${r}`), e && a.add(e)
            }
        };
        o = s([modifiable], o), i.CelebrationBackgroundView = o
    }, {}],
    49: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        }, n = this && this.__rest || function (e, t) {
            var i = {};
            for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (i[s] = e[s]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var n = 0;
                for (s = Object.getOwnPropertySymbols(e); n < s.length; n++) t.indexOf(s[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[n]) && (i[s[n]] = e[s[n]])
            }
            return i
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.CelebrationLabelView = void 0;
        let o = class extends c2d.display.Container {
            initialize(e, t) {
                this.config = e, this.labels = {}, this.skipAnimationSpeed = this.config.skipAnimationSpeed || 1, this.config.tween && (this.tweenParams = this.config.tween);
                const i = t.getConfig("styles");
                Object.entries(this.config.states).forEach(([e, t]) => {
                    c2d.type.isArray(t.translation) || (t.translation = [t.translation]), c2d.type.isArray(t.style) || (t.style = [t.style]), t.position && !c2d.type.isArray(t.style) && (t.position = [t.position]);
                    const s = new c2d.display.Container;
                    s.visible = !1, this.config.position && s.position.copyFrom(this.config.position), this.config.scale && s.scale.copyFrom(this.config.scale), t.translation.forEach((e, n) => {
                        const o = i && i[t.style[n % t.style.length]], r = new c2d.display.TextField(e, o);
                        if (t.fitToArea) {
                            const {width: e, height: i} = t.fitToArea;
                            r.fitToArea(e, i)
                        }
                        const a = this.config.anchor;
                        a ? r.anchor.copyFrom(a) : r.anchor.set(.5), t.position && r.position.copyFrom(t.position[n % t.position.length]), s.addChild(r)
                    }), this.addChild(s), this.labels[e] = s
                })
            }

            attach(e) {
                this.attached = !0, Object.entries(this.config.states).forEach(([t, i]) => {
                    const s = this.labels[t];
                    e.spine.attach(i.slot, s)
                })
            }

            play({stages: e, duration: t, resultDelay: i, skipDelay: s}) {
                if (this.attached) return;
                if (this.label.visible = !0, !this.tweenParams) return;
                let n;
                this.statesList = [], this.skipDelay = .001 * s;
                let o = .001 * this.tweenParams.shift || 0;
                const r = e.reduce((e, {label: t = "", duration: i = 0}) => {
                    if (t) {
                        if (n) {
                            const e = this.addTween(n.label, n.duration, o);
                            this.statesList.push(e), o = 0
                        }
                        n = {label: t, duration: i}
                    } else n ? n.duration += i : o += i;
                    return e - i
                }, t + i), a = n.duration + r - this.tweenParams.backShift, l = this.addTween(n.label, a, o);
                this.statesList.push(l), this.nextState(0)
            }

            addTween(e, t, i = 0, s = !1) {
                const o = c2d.type.isString(e) ? this.labels[e] : e, r = this.tweenParams, a = [...r.iterations],
                    l = r.end, {duration: c, ease: h} = l, u = n(l, ["duration", "ease"]);
                let d = c;
                s && (d /= this.skipAnimationSpeed);
                const p = t - (d || 0), m = new c2d.Timeline({paused: !0});
                m.set(o, {visible: !0, pixi: r.start, delay: i});
                const f = a.reduce((e, t, i) => {
                    var {duration: r, ease: a} = t, l = n(t, ["duration", "ease"]);
                    let c;
                    c2d.type.isNumber(r) ? (c = r, 0 === i && s && (c /= this.skipAnimationSpeed), e -= c) : (c = e, e = 0);
                    c2d.utils.Searcher.findAttr(a, c2d.easing);
                    return m.to(o, .001 * c, {pixi: l, ease: a}), e
                }, p), g = c2d.utils.Searcher.findAttr(h, c2d.easing);
                return m.to(o, .001 * d, {pixi: u, ease: g, delay: .001 * f}), m.set(o, {visible: !1}), {
                    label: o,
                    timeline: m,
                    durationStart: .001 * a[0].duration,
                    durationProgress: .001 * p
                }
            }

            nextState(e) {
                if (e === this.statesList.length) return;
                (this.currentState = this.statesList[e]).timeline.eventCallback("onComplete", () => this.nextState(++e)).play()
            }

            skip() {
                if (this.attached) return;
                const e = this.skipAnimationSpeed, t = this.statesList.last, i = this.currentState,
                    s = i.timeline.time(), n = i.timeline.totalDuration(), o = .001 * this.tweenParams.backShift || 0;
                if (i.timeline.eventCallback("onComplete", null), i === t) {
                    n - s > this.skipDelay && i.timeline.time(n - this.skipDelay)
                } else if (s < i.durationStart) {
                    const n = this.skipDelay - s / e - o, r = this.addTween(t.label, 1e3 * n, 0, !0);
                    i.timeline.eventCallback("onReverseComplete", () => r.timeline.play()).timeScale(e).reverse().set(i.label, {visible: !1})
                } else if (s > i.durationProgress) {
                    const r = this.skipDelay - (n - s) / e - o, a = this.addTween(t.label, 1e3 * r, 0, !0);
                    i.timeline.timeScale(e).add(() => a.timeline.play())
                } else {
                    const s = (n - i.durationProgress) / e, r = this.skipDelay - s - o,
                        a = this.addTween(t.label, 1e3 * r, 0, !0), l = i.timeline.getTweensOf(i.label, !1).last,
                        c = () => {
                            i.label.visible = !1, a.timeline.play()
                        };
                    c2d.Tween.to(i.label, s, Object.assign(Object.assign({}, l.vars), {onComplete: c})), i.timeline.kill()
                }
            }
        };
        o = s([modifiable], o), i.CelebrationLabelView = o
    }, {}],
    50: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.GameScreen = void 0;
        let n = class extends game.sources.VisualComponent {
            set visible(e) {
                this.view.visible = e
            }

            _getForceSpin() {
                return !1
            }

            get forceSpin() {
                return this._getForceSpin()
            }

            get respins() {
                return this.store.respins
            }

            get activeRespins() {
                return this.store.activeRespins
            }

            build() {
                this.controller.build()
            }

            onInitState() {
                this.controller.onIdleFinish()
            }

            onReplayExit() {
                this.visible = !0
            }

            onIdleEnter() {
                this.controller.onIdleEnter()
            }

            onIdleBegin(e) {
                this.controller.onIdleBegin()
            }

            onIdleFinish() {
                this.controller.onIdleFinish()
            }

            onSpin() {
                this.controller.onSpin()
            }

            onSpinExit() {
                this.controller.onSpinExit()
            }

            callSpinAction() {
                this.controller.callSpinAction()
            }

            toHome() {
                this.controller.toHome()
            }

            set balance(e) {
                this.store.setBalance(e), this.controller.updateBalance(e)
            }

            get balance() {
                return this.store.getbalance()
            }
        };
        n = s([modifiable], n), i.GameScreen = n
    }, {}],
    51: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.GameScreenController = void 0;
        let n = class extends game.sources.Controller {
            onInitialize() {
                super.onInitialize(), game.remoteApi.depositPopupHandler = e => this.store.isShowDepositPopup = e
            }

            onDestroy() {
                game.remoteApi.depositPopupHandler = null
            }

            create() {
                super.create(), this.spinHandler = null
            }

            get isRoundCheck() {
                return !1
            }

            toHome() {
                console.info("Home"), game.goToUrl(this.store.backURL, "lobby")
            }

            build() {
                this.view.build(), this.addListeners(), this.setWinResolver()
            }

            setWinResolver() {
                game.audioManager.addConflictResolver("sounds/you_win", e => e[1])
            }

            onIdleEnter() {
                this.view.onIdleEnter()
            }

            onIdleBegin() {
                this.isIdle = !0, this.view.onIdleBegin()
            }

            onIdleFinish() {
                this.isIdle = !1, this.view.onIdleFinish()
            }

            onSpin() {
                this.view.onSpin()
            }

            onSpinButton() {
                this.callSpinAction()
            }

            onChangeBet() {
            }

            onSpinExit() {
            }

            onCollectEnter() {
            }

            onRoundEnter() {
            }

            onCollectExit() {
            }

            getActionHandlers() {
                return {panelDarkness: () => this.view.closeAllPanel()}
            }

            addListeners() {
                const e = this.getActionHandlers();
                this.view.setHandlers(e)
            }

            callSpinAction() {
                this.spinHandler && (!this.isIdle || this.store.enoughMoneyToSpin ? (this.view.onSpinAction(), this.spinHandler && this.spinHandler(), this.spinHandler = null) : this.showNotMoney())
            }

            showNotMoney() {
                if (this.store.isShowDepositPopup) {
                    const e = this.store.cashURL ? () => this.makeDeposit() : null;
                    this.view.showNotMoneyPopup(e)
                }
            }

            makeDeposit() {
                console.info("Make Deposit"), this.store.cashURL && game.goToUrl(this.store.cashURL, "bank")
            }
        };
        n = s([modifiable], n), i.GameScreenController = n
    }, {}],
    52: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.GameScreenHandler = void 0;
        let n = class extends game.sources.Handler {
            get statesConfig() {
                return {
                    Start: {enter: this.onStart},
                    Init: {enter: this.onInitEnter, exit: this.onInitExit},
                    Intro: {enter: this.onReplayEnter, exit: this.onReplayExit},
                    Replay: {enter: this.onReplayEnter, exit: this.onReplayExit},
                    Gifts: {begin: this.onIdleBegin},
                    Idle: {enter: this.onIdleEnter, begin: this.onIdleBegin},
                    Spin: {check: this.onSpinCheck, enter: this.onSpinEnter, exit: this.onSpinExit},
                    ShowAllLines: {enter: this.onShowAllLinesEnter},
                    Celebration: {enter: this.onCelebration},
                    SpinSymbols: {enter: this.onSkipWait},
                    DropSymbols: {enter: this.onSkipWait},
                    ShowResult: {enter: this.onSkipWait},
                    ShowSingleLines: {enter: this.onShowSingleLinesEnter},
                    ShowFreespinsPopup: {enter: this.onFreespinsPopupEnter},
                    ShowFreespinsWin: {enter: this.onFreespinsWinEnter}
                }
            }

            get globalActionsConfig() {
                return this.getGlobalActionsConfig()
            }

            getGlobalActionsConfig() {
                return {}
            }

            onStart({finish: e}) {
                this.isSpin = !1, e()
            }

            onInitEnter({finish: e}) {
                this.component.build(), e()
            }

            onInitExit({finish: e}) {
                this.component.onInitState(), e()
            }

            onReplayEnter({finish: e}) {
                this.component.visible = !1, e()
            }

            onReplayExit({finish: e}) {
                return e(), {onFinish: () => this.component.onReplayExit()}
            }

            onIdleEnter({finish: e}) {
                this.component.onIdleEnter(), e()
            }

            onIdleBegin({finish: e}) {
                this.isSpin = !1, this.component.onIdleBegin();
                const t = () => {
                    this.onSpinAction(), e()
                }, i = this.component.activeRespins;
                this.component.forceSpin || i ? t() : this._updateSpinHandler(t);
                return {onFinish: () => this.onIdleFinish(), actions: {playReplay: e, applyBonus: t}}
            }

            onSpinAction() {
                this.isSpin = !0
            }

            onIdleFinish() {
                this.component.onIdleFinish()
            }

            onSpinCheck() {
                return this.isSpin
            }

            onSpinEnter({finish: e}) {
                this.component.onSpin(), e()
            }

            onSpinExit({finish: e}) {
                this.component.onSpinExit(), e()
            }

            onShowAllLinesEnter({finish: e, skip: t}) {
                this._updateSpinHandler(t), e()
            }

            onShowSingleLinesEnter({finish: e, skip: t}) {
                this._updateSpinHandler(t), e()
            }

            onCelebration({finish: e, skip: t}) {
                this._updateSpinHandler(t), e()
            }

            onSkipWait({finish: e, skip: t}) {
                this._updateSpinHandler(t), e()
            }

            onFreespinsPopupEnter({finish: e, skip: t}) {
                this._updateSpinHandler(t), e()
            }

            onFreespinsWinEnter({finish: e, skip: t}) {
                this.component.store.isReplay ? e() : this._updateSpinHandler(() => {
                    t(), e()
                })
            }

            _updateSpinHandler(e) {
                this.component.view.resetButtonSkipState(), this.component.controller.spinHandler = e
            }
        };
        n = s([modifiable], n), i.GameScreenHandler = n
    }, {}],
    53: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.GameScreenStore = void 0;
        let n = class extends game.sources.Store {
            get currentWin() {
                return this.getItem("wins").total
            }

            onCreate() {
                this._isShowDepositPopup = !0
            }

            get cashURL() {
                return this.getItem("cashURL")
            }

            get showInfo() {
                return this.getItem("showInfo")
            }

            get spaceSpin() {
                return this.getItem("spaceSpin")
            }

            getBalance() {
                return this.getItem("balance")
            }

            setBalance(e) {
                this.getItem("setBalance")(e)
            }

            getTotalWin() {
                return this.getItem("totalWin")
            }

            getFsWin() {
                return this.getItem("fsWin")
            }

            getGifts() {
                return this.getItem("giftSpins") || {}
            }

            get nextAction() {
                return this.getItem("getNextAction")
            }

            getNextAction() {
                return this.getItem("getNextAction")
            }

            get availableActions() {
                return this.getItem("getAvailableActions")
            }

            getInitData() {
                return this.getItem("initData")
            }

            get isRestore() {
                return !!this.getInitData()
            }

            getCurrentAction() {
                return this.getItem("getCurrentAction")
            }

            getInitSpin() {
                return this.getItem("initSpin")
            }

            getInitFreespin() {
                return this.getItem("initfreespin")
            }

            getBet() {
                return this.getItem("bet")
            }

            get enoughMoneyToSpin() {
                const e = this.getGifts();
                return !(!e || !e.left) || this.getBet() <= this.getBalance()
            }

            hasCelebration() {
                return this.getItem("hasCelebration")
            }

            get showPrompts() {
                return this.getItem("showPrompts")
            }

            getWinsData() {
                return this.getItem("wins")
            }

            getSpinData() {
                return this.getItem("spinData")
            }

            get isIntro() {
                return this.getItem("isIntro")
            }

            get isReplay() {
                return this.getItem("isReplay")
            }

            get isFreespins() {
                return this.getItem("isFreespins")
            }

            get respins() {
                return this.getItem("respins")
            }

            get activeRespins() {
                return this.respins && this.respins.count < this.respins.total
            }

            get isShowDepositPopup() {
                return this._isShowDepositPopup
            }

            set isShowDepositPopup(e) {
                this._isShowDepositPopup = e
            }

            get bonusBuy() {
                return this.getItem("bonusBuy")
            }
        };
        n = s([modifiable], n), i.GameScreenStore = n
    }, {}],
    54: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.GameScreenView = void 0;
        let n = class extends game.sources.FactoryView {
            build() {
                this.isIdle = !1, this._interactive = !0, this.buildTree(), this.initButtonsAnimations(), this.onSkipState()
            }

            buildTree() {
                const e = this.layers.game_screen, t = this.buildVariables();
                super.buildTree("gamescreen_tree", e, t)
            }

            buildVariables() {
                return {}
            }

            _getInteractive() {
                return this._interactive
            }

            get interactive() {
                return this._getInteractive()
            }

            getAnimationButtons() {
                return [this.tree.nodeMap.betButtonClose]
            }

            initButtonsAnimations() {
                this.getAnimationButtons().forEach(e => {
                    e && (e = c2d.type.isArray(e) ? e : [e]).forEach(e => {
                        const t = () => {
                            e.tween.tl.clear(), e.tween.scaleTo(.9, .2)
                        }, i = () => {
                            e.tween.tl.clear(), e.tween.scaleTo(1, .2)
                        };
                        e && e.addButtonListener ? (e && e.addButtonListener("pointerDown", t), e && e.addButtonListener("pointerUp", i), e && e.addButtonListener("pointerUpOutside", i)) : e.setHandlers(() => {
                            e.tween.tl.clear(), e.tween.scaleTo(.9, .1), e.tween.scaleTo(1, .1)
                        })
                    })
                })
            }

            onIdleEnter() {
            }

            onIdleBegin() {
                this.isIdle = !0
            }

            onIdleFinish() {
                this.isIdle = !1
            }

            onSpin() {
                this.onSkipState()
            }

            onRoundEnter() {
            }

            onCollectEnter() {
            }

            onSkipState() {
            }

            set visible(e) {
                this.layer.visible = e
            }

            hideDarkness() {
                const e = this.tree.nodeMap.panelDarkness;
                e && (e.tween.tl.clear(), e.tween.fadeTo(0, .2, {
                    onComplete: () => {
                        e.visible = !1
                    }
                }))
            }

            showDarkness() {
                const e = this.tree.nodeMap.panelDarkness;
                e && (e.visible = !0, e.tween.tl.clear(), e.tween.fadeTo(1, .2))
            }

            closeAllPanel() {
            }

            showNotMoneyPopup(e) {
                this.showPopup({
                    text: "${texts.core.not_money_msg}",
                    buttonText: "${texts.core.make_deposit}",
                    confirm: e,
                    isConfirm: e
                })
            }

            showPopup({text: e = "", confirm: t}) {
                console.warn(e), t && t()
            }

            onSpinAction() {
            }

            resetButtonSkipState() {
            }
        };
        n = s([modifiable], n), i.GameScreenView = n
    }, {}],
    55: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("./GameScreen"), n = e("./GameScreenHandler"), o = e("./GameScreenStore"),
            r = e("./GameScreenController"), a = e("./GameScreenView"),
            l = e("./mods/disableSkips/DisableSkipsGameScreenHandler"),
            c = e("./mods/hideWinsLowerThanBet/HideWinsLowerThanBetController"), h = {
                Component: s.GameScreen,
                Handler: n.GameScreenHandler,
                Store: o.GameScreenStore,
                Controller: r.GameScreenController,
                View: a.GameScreenView
            };
        c2d.recursiveSet("classes.mods.disableSkips.Handler", l.DisableSkipsGameScreenHandlerMod, h), c2d.recursiveSet("classes.mods.hideWinsLowerThanBet.Controller", c.HideWinsLowerThanBetMod, h);
        (c2d.Logger ? c2d.Logger.Of("GameScreen") : console).info("component version v0.01.0"), game.componentsManager.registerComponent("GameScreen", h, "v0.01.0"), e("./modifications/spin/index"), e("./modifications/balance/index"), e("./modifications/gifts/index"), e("./modifications/bet/index"), e("./modifications/win/index"), e("./modifications/autospins/index"), e("./modifications/popup/index"), e("./modifications/swipemode/index"), e("./modifications/home/index"), e("./modifications/menu/index"), e("./modifications/rules/index"), e("./modifications/freespins/index"), e("./modifications/spindelay/index")
    }, {
        "./GameScreen": 50,
        "./GameScreenController": 51,
        "./GameScreenHandler": 52,
        "./GameScreenStore": 53,
        "./GameScreenView": 54,
        "./modifications/autospins/index": 61,
        "./modifications/balance/index": 66,
        "./modifications/bet/index": 72,
        "./modifications/freespins/index": 75,
        "./modifications/gifts/index": 81,
        "./modifications/home/index": 85,
        "./modifications/menu/index": 90,
        "./modifications/popup/index": 96,
        "./modifications/rules/index": 101,
        "./modifications/spin/index": 106,
        "./modifications/spindelay/index": 110,
        "./modifications/swipemode/index": 115,
        "./modifications/win/index": 120,
        "./mods/disableSkips/DisableSkipsGameScreenHandler": 121,
        "./mods/hideWinsLowerThanBet/HideWinsLowerThanBetController": 122
    }],
    56: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Component;

        class n extends s.Latest {
            _getForceSpin() {
                return super._getForceSpin() || this.autoSpinsLeft
            }

            get autoSpinsLeft() {
                return this.controller.checkAutospinsOptions(), this.controller.autoSpinsLeft
            }
        }

        s.modify(n)
    }, {}],
    57: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Controller;

        class n extends s.Latest {
            create() {
                return this._autoSpinsLeft = 0, super.create()
            }

            onSpin() {
                const e = super.onSpin();
                return this.store.isFreespins ? e : this.autoSpinsLeft ? (this.store.activeRespins || (this.autoSpinsLeft--, this.view.disableAutospinsButton()), e) : e
            }

            onSpinExit() {
                return this.checkAutospinsOptions(), super.onSpinExit()
            }

            getActionHandlers() {
                const e = super.getActionHandlers();
                return e.autospinsButtonShow = () => this.showAutoSpins(), e.autospinsButtonClose = () => this.view.hideAutoSpinsPanel(), e.autospinCountButton = e => this.view.changeCountAutoSpins(e), e.autospinsButtonOk = () => this.playAutoSpins(), e
            }

            showAutoSpins() {
                if (this.autoSpinsLeft) this.autoSpinsLeft = 0, this.view.disableAutospinsButton(); else {
                    if (this.isIdle && !this.store.enoughMoneyToSpin) return void this.showNotMoney();
                    this.view.showAutoSpinsPanel()
                }
            }

            playAutoSpins() {
                this.autoSpinsLeft = this.view.autoSpinsCount, this.autoSpinsLeft && (this.view.hideAutoSpinsPanel(), this.onSpinButton())
            }

            showNotMoney() {
                return this.autoSpinsLeft = 0, super.showNotMoney()
            }

            checkAutospinsOptions() {
                if (!this._autoSpinsLeft) return void this.view.disableAutospinsButton();
                const {nextAction: e} = this.store;
                if ("freespin" === e || "initfreespin" === e) return this.autoSpinsLeft = 0, void this.view.disableAutospinsButton();
                !this.store.enoughMoneyToSpin && this.showNotMoney();
                const t = this.store.getBalance();
                this.view.autoSpinSingleWin && this.view.autoSpinSingleWin <= this.lastWin && (this.autoSpinsLeft = 0), this.view.autoSpinIncreased && this.view.autoSpinIncreased < t && (this.autoSpinsLeft = 0), this.view.autoSpinReduced && this.view.autoSpinReduced >= t && (this.autoSpinsLeft = 0), this.view.disableAutospinsButton()
            }

            get autoSpinsLeft() {
                return this._autoSpinsLeft
            }

            set autoSpinsLeft(e) {
                e < 0 || (this._autoSpinsLeft = e, this.view.setAutoSpinsLeft(e))
            }

            onChangeBet() {
                return this.view.savedAutoSpinOpiton = !1, super.onChangeBet()
            }
        }

        s.modify(n)
    }, {}],
    58: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Handler;

        class n extends s.Latest {
            get stateConfig_Autospins() {
                return {
                    Freespins: {enter: this.onFreespinsEnter_Autospins},
                    BonusGame: {enter: this.onFreespinsEnter_Autospins}
                }
            }

            onInitialize() {
                return this.registerStates(this.stateConfig_Autospins), super.onInitialize()
            }

            onFreespinsEnter_Autospins({finish: e}) {
                this.component.controller.autoSpinsLeft = 0, this.component.controller.checkAutospinsOptions(), e()
            }
        }

        s.modify(n)
    }, {}],
    59: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Store;

        class n extends s.Latest {
            addToGlobal() {
                return this.addItem("isAutospins"), super.addToGlobal()
            }

            get isAutospins() {
                return !!this.component.controller.autoSpinsLeft
            }

            get enableAutospins() {
                return this.getItem("enableAutospins")
            }
        }

        s.modify(n)
    }, {}],
    60: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.View;

        class n extends s.Latest {
            _getInteractive() {
                return super._getInteractive() && !this.isShowAutospinsPanel
            }

            build() {
                const e = super.build();
                return this.initAutoSpin(), e
            }

            initAutoSpin() {
                this.isShowAutospinsPanel = !1, this.autospinsActive = !1, this.hideAutoSpinsPanel(), this.setAutoSpinsLeft(0);
                const e = this.tree.nodeMap.autospinCountButton.first;
                this.changeCountAutoSpins(e);
                const t = this.tree.nodeMap.AutoSpinSliderSingleWin, i = this.tree.nodeMap.AutoSpinSliderIncreased,
                    s = this.tree.nodeMap.AutoSpinSliderReduced, n = (e, t) => {
                        if (t == e.minValue) {
                            const t = this.tree.variables;
                            e.label.text = c2d.display.Factory.realizeProperty("${texts.core.off}", t)
                        }
                    };
                t.setHandlers(n), i.setHandlers(n), s.setHandlers(n), this.hideAutoSpinButton()
            }

            hideAutoSpinButton() {
                const e = this.tree.nodeMap.autospinsButtonShow;
                !this.store.enableAutospins && e && (e.visible = !1)
            }

            getAnimationButtons() {
                const e = super.getAnimationButtons();
                return e.push(this.tree.nodeMap.autospinsButtonShow), e.push(this.tree.nodeMap.autospinsButtonOk), e.push(this.tree.nodeMap.autospinCountButton), e
            }

            onIdleBegin() {
                const e = super.onIdleBegin();
                return this.enableAutospinsButton(), e
            }

            enableAutospinsButton() {
                this.tree.nodeMap.autospinsButtonShow.enable(!0)
            }

            onIdleFinish() {
                const e = super.onIdleFinish();
                return this.disableAutospinsButton(), e
            }

            disableAutospinsButton() {
                this._autoSpinsLeft || this._autoSpinsLeft || this.isIdle || this.tree.nodeMap.autospinsButtonShow.enable(!1)
            }

            onSpin() {
                const e = super.onSpin();
                return this.savedAutoSpinOpiton = !1, e
            }

            closeAllPanel() {
                const e = super.closeAllPanel();
                return this.hideAutoSpinsPanel(), e
            }

            hideAutoSpinsPanel() {
                if (!this.autoSpinsPanel.visible) return;
                this.isShowAutospinsPanel = !1, this.hideDarkness();
                const e = c2d.display.Factory.calcProperty("$[100sh]") - this.autoSpinsPanel.children[0].y;
                this.autoSpinsPanel.tween.tl.clear(), this.autoSpinsPanel.tween.moveTo(null, e, .2, {
                    onComplete: () => {
                        this.autoSpinsPanel.visible = !1
                    }
                })
            }

            showAutoSpinsPanel() {
                if (this.closeAllPanel(), this.isShowAutospinsPanel = !0, this.showDarkness(), this.autoSpinsPanel.y = c2d.display.Factory.calcProperty("$[100sh]") - this.autoSpinsPanel.children[0].y, this.autoSpinsPanel.visible = !0, this.autoSpinsPanel.tween.tl.clear(), this.autoSpinsPanel.tween.moveTo(null, 0, .2), !this.savedAutoSpinOpiton) {
                    this.savedAutoSpinOpiton = !0;
                    const e = this.tree.nodeMap.AutoSpinSliderSingleWin, t = this.tree.nodeMap.AutoSpinSliderIncreased,
                        i = this.tree.nodeMap.AutoSpinSliderReduced, s = this.store.getBalance(),
                        n = this.store.getBet();
                    e.maxValue = 100 * n, e.value = 0, e.redraw(e.value), e.handler(e, e.value), t.minValue = Math.ceil(s), t.maxValue = s + 1e3 * n, t.value = t.minValue, t.redraw(t.value), t.handler(t, t.value), i.maxValue = Math.max(0, s - n), i.value = 0, i.redraw(i.value), i.handler(i, i.value)
                }
                this.autoSpinsPanel.visible = !0
            }

            get autoSpinSingleWin() {
                const e = this.tree.nodeMap.AutoSpinSliderSingleWin;
                return e.value != e.minValue && e.value
            }

            get autoSpinIncreased() {
                const e = this.tree.nodeMap.AutoSpinSliderIncreased;
                return e.value != e.minValue && e.value
            }

            get autoSpinReduced() {
                const e = this.tree.nodeMap.AutoSpinSliderReduced;
                return e.value != e.minValue && e.value
            }

            changeCountAutoSpins(e) {
                this.currentAutoSpinCountNode && this.currentAutoSpinCountNode.enable(!0), e.enable(!1), this.currentAutoSpinCount = e.variables.count, this.currentAutoSpinCountNode = e
            }

            get autoSpinsPanel() {
                return this.tree.nodeMap.autospinsPanel
            }

            get autoSpinsCount() {
                return this.currentAutoSpinCount
            }

            setAutoSpinsLeft(e) {
                this._autoSpinsLeft = e, this.tree.nodeMap.autospinLeft.visible = !!e, this.tree.nodeMap.autospinLeftValue.text = e, this.tree.nodeMap.autospinsButtonShow.toggle(e ? 1 : 0), e > 0 && !this.autospinsActive && (this.autospinsActive = !0, this.tree.nodeMap.autospinsArrow.rotation = 0, this.tree.nodeMap.autospinsArrow.tween.rotateTo(2 * Math.PI, 1.5, {
                    repeat: -1,
                    ease: c2d.easing.Linear.easeNone
                })), 0 == e && this.autospinsActive && (this.autospinsActive = !1, this.tree.nodeMap.autospinsArrow.tween.tl.clear(), this.tree.nodeMap.autospinsArrow.tween.rotateTo(2 * Math.PI, .3))
            }
        }

        s.modify(n)
    }, {}],
    61: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./GameScreenAutospins"), e("./GameScreenAutospinsHandler"), e("./GameScreenAutospinsStore"), e("./GameScreenAutospinsController"), e("./GameScreenAutospinsView")
    }, {
        "./GameScreenAutospins": 56,
        "./GameScreenAutospinsController": 57,
        "./GameScreenAutospinsHandler": 58,
        "./GameScreenAutospinsStore": 59,
        "./GameScreenAutospinsView": 60
    }],
    62: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Component;

        class n extends s.Latest {
            onInitState() {
                return this.controller.initializeBalance(), super.onInitState()
            }

            onReplayExit() {
                return this.controller.initializeBalance(), super.onReplayExit()
            }

            updateBalance() {
                const e = this.store.getBalance();
                this.controller.updateBalance(e)
            }

            updateBalanceOnRound() {
                this.controller.updateBalanceOnSpin()
            }

            getViewBalance() {
                return this.view.tree.nodeMap.balanceValue.text
            }
        }

        s.modify(n)
    }, {}],
    63: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Controller;

        class n extends s.Latest {
            onInitialize() {
                super.onInitialize(), game.remoteApi.balanceHandler = e => this.updateBalance(e)
            }

            onDestroy() {
                super.onDestroy(), game.remoteApi.balanceHandler = null
            }

            initializeBalance() {
                var e;
                let t = this.store.getBalance();
                if ("freespin" == this.store.getCurrentAction()) {
                    const i = null === (e = this.store.getWinsData()) || void 0 === e ? void 0 : e.total;
                    c2d.type.isNumber(i) && t - i > 0 && (t -= i)
                }
                this.updateBalance(t)
            }

            onIdleEnter() {
                return this.updateBalance(), super.onIdleEnter()
            }

            onSpin() {
                const e = super.onSpin();
                return this.updateBalanceOnSpin(), e
            }

            updateBalanceOnSpin() {
                const e = this.store.getBalance();
                let t = e;
                if (this.store.bonusBuy) {
                    const {price: e} = this.store.bonusBuy;
                    t -= e
                } else if (!this.store.isGifts && !this.store.isFreespins && !this.store.activeRespins) {
                    t -= this.store.getBet()
                }
                t != e && (this.updateBalance(t), this.store.setBalance(t))
            }

            updateBalance(e) {
                if (!e && !c2d.type.isNumber(e)) return;
                !c2d.type.isString(e) && e.before && (e = e.before);
                const t = this.store.getItem("currency");
                e = c2d.utils.formatters.StringFormatter.toCurrency(e.toFixed(2), {currency: t}), this.view.setBalance(e)
            }
        }

        s.modify(n)
    }, {}],
    64: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Handler;

        class n extends s.Latest {
            get stateConfig_Balance() {
                return {
                    Gifts: {enter: this.onGiftsEnter_Balance, begin: this.onIdleBegin_Balance},
                    ShowAllLines: {enter: this.onShowAllLinesEnter_Balance},
                    ShowFinalResult: {enter: this.onShowFinalResultEnter_Balance},
                    Celebration: {exit: this.onCelebrationExit_Balance},
                    BonusGameFinish: {exit: this.onBonusGameFinishExit_Balance},
                    RoundStart: {enter: this.onRoundStartEnter_Balance},
                    Round: {exit: this.onRoundExit_Balance},
                    Idle: {begin: this.onIdleBegin_Balance},
                    Spin: {exit: this.onSpinExitUpdateBalance}
                }
            }

            onSpinExitUpdateBalance({finish: e}) {
                this.component.store.currentWin || this.component.updateBalance(), e()
            }

            onInitialize() {
                return game.fsm.actions.updateBalance = {}, this.registerStates(this.stateConfig_Balance), super.onInitialize()
            }

            onGiftsEnter_Balance({finish: e}) {
                this.component.updateBalance(), e()
            }

            onShowAllLinesEnter_Balance({finish: e}) {
                this.component.store.hasCelebration() || this.component.updateBalance(), e()
            }

            onCelebrationExit_Balance({finish: e}) {
                this.component.updateBalance(), e()
            }

            onShowFinalResultEnter_Balance({finish: e}) {
                this.component.updateBalance(), e()
            }

            onBonusGameFinishExit_Balance({finish: e}) {
                this.component.updateBalance(), e()
            }

            onRoundStartEnter_Balance({finish: e}) {
                this.component.updateBalanceOnRound(), e()
            }

            onRoundExit_Balance({finish: e}) {
                this.component.updateBalance(), e()
            }

            onIdleBegin_Balance({finish: e}) {
                e();
                const t = () => {
                    this.component.updateBalance()
                };
                return t(), {actions: {updateBalance: t}}
            }
        }

        s.modify(n)
    }, {}],
    65: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.View;

        class n extends s.Latest {
            setBalance(e) {
                this.tree.nodeMap.balanceValue.text = e
            }
        }

        s.modify(n)
    }, {}],
    66: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./GameScreenBalanceHandler"), e("./GameScreenBalance"), e("./GameScreenBalanceController"), e("./GameScreenBalanceView")
    }, {
        "./GameScreenBalance": 62,
        "./GameScreenBalanceController": 63,
        "./GameScreenBalanceHandler": 64,
        "./GameScreenBalanceView": 65
    }],
    67: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Component;

        class n extends s.Latest {
            onInitState() {
                const e = super.onInitState();
                return this.controller.initializeBet(), this.updateBet(), this.disableBet(), e
            }

            onReplayExit() {
                return this.updateBet(), this.disableBet(), super.onReplayExit()
            }

            onIdleBegin(e) {
                const t = super.onIdleBegin(e);
                return e || this.updateBet(), t
            }

            onIdleFinish() {
                const e = super.onIdleFinish();
                return this.disableBet(), e
            }

            resetBet() {
                this.controller.resetBet()
            }

            updateBet() {
                this.controller.updateBet()
            }

            disableBet() {
                this.controller.disableBet()
            }

            getViewBet() {
                return this.view.tree.nodeMap.betValue.text
            }

            clickBetSubButton() {
                var e;
                null === (e = this.view.tree.nodeMap.betSubButton) || void 0 === e || e.clickAction()
            }

            clickBetAddButton() {
                var e;
                null === (e = this.view.tree.nodeMap.betAddButton) || void 0 === e || e.clickAction()
            }
        }

        s.modify(n)
    }, {}],
    68: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Controller;

        class n extends s.Latest {
            create() {
                return this.betIndex = null, this.betRanges = null, this.changeBetHandler = null, this.showedChangeBetPopup = !1, super.create()
            }

            initializeBet() {
                const e = this.store.getRanges();
                if (!e) return;
                const t = e.bet;
                this.betRanges = t, this.view.initializeBet({ranges: t}), this.updateBet()
            }

            onIdleEnter() {
                return this.updateBet(), super.onIdleEnter()
            }

            onSpin() {
                return this.view.interactive && (this.showedChangeBetPopup = !1), super.onSpin()
            }

            getActionHandlers() {
                const e = super.getActionHandlers();
                return Object.assign(Object.assign({}, e), this.getBetActions())
            }

            getBetActions() {
                return {
                    betAddButton: () => this.onBetAddButton(),
                    betSubButton: () => this.onBetSubButton(),
                    betButtonShow: () => this.showBetPanel(),
                    betPanelSlider: (e, t) => this.slideBet(e, t),
                    betButtonClose: () => this.hideBetPanel(),
                    betButtonConfirm: () => this.betConfirm()
                }
            }

            addListeners() {
                return this.addBetListeners(), super.addListeners()
            }

            addBetListeners() {
                game.device.desktop && document.addEventListener("keyup", e => {
                    this.view.interactive && (this.store.showInfo || this.store.arrowBet && ("ArrowLeft" === e.code ? this.onBetSubButton() : "ArrowRight" === e.code ? this.onBetAddButton() : "ArrowDown" === e.code ? this.onBetSubButton() : "ArrowUp" === e.code && this.onBetAddButton()))
                })
            }

            showChangeBetPopup() {
                this.assetsStore.getConfig("config").changeBetPopup && !this.showedChangeBetPopup && (this.showedChangeBetPopup = !0, this.view.showChangeBetPopup()), this.changeBetHandler && this.changeBetHandler(this.store.getBet())
            }

            showBetPanel() {
                this.view.interactive && (this.view.betPanel.visible || (this.updateBet(), this.view.showBetPanel()))
            }

            hideBetPanel() {
                this.slideBetIndex = this.betIndex, this.view.hideBetPanel()
            }

            resetBet() {
                const e = this.store.getBet();
                this.betRanges.includes(e) || this.updateBet(this.betRanges.first)
            }

            updateBet(e, t) {
                if (!this.betRanges) return !1;
                e || (e = this.store.getBet());
                const i = this.betRanges.indexOf(e);
                let s = 0 == i, n = i == this.betRanges.length - 1;
                const o = this.store.getGifts();
                o && o.left && (e = o.bet, s = n = !0);
                const r = {min: s, max: n, value: e, index: i, enoughMoney: e > this.store.getBalance()};
                if (this.view.updateBet(r, t), t) this.slideBetIndex = i, this.betIndex = i; else {
                    const t = this.store.getBet();
                    if (this.betIndex = i, this.store.setBet(e), c2d.type.isNumber(t) && t != e) return this.onChangeBet(), !0
                }
                return !1
            }

            slideBet(e, t) {
                const i = this.betRanges[t];
                this.updateBet(i, !0)
            }

            betConfirm() {
                this.hideBetPanel();
                const e = this.betRanges[this.slideBetIndex];
                this.updateBet(e) && this.showChangeBetPopup()
            }

            disableBet() {
                this.view.hideBetPanel(), this.view.confirmBet({min: !0, max: !0})
            }

            onBetSubButton() {
                if (!this.view.interactive) return;
                if (!this.isIdle) return;
                if (0 == this.betIndex) return;
                this.betIndex--;
                const e = this.betRanges[this.betIndex];
                this.updateBet(e), this.showChangeBetPopup()
            }

            onBetAddButton() {
                if (!this.view.interactive) return;
                if (!this.isIdle) return;
                if (this.betIndex == this.betRanges.length - 1) return;
                this.betIndex++;
                const e = this.betRanges[this.betIndex];
                this.updateBet(e), this.showChangeBetPopup()
            }
        }

        s.modify(n)
    }, {}],
    69: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Handler;

        class n extends s.Latest {
            get stateConfig_Bet() {
                return {
                    Start: {enter: this.onStart_Bet},
                    Gifts: {enter: this.onGiftsEnter_Bet},
                    Idle: {enter: this.onIdleEnter_Bet}
                }
            }

            onInitialize() {
                return game.fsm.actions.changeBet = {}, this.registerStates(this.stateConfig_Bet), super.onInitialize()
            }

            onStart_Bet({finish: e, actions: t}) {
                this.component.controller.changeBetHandler = t.changeBet, e()
            }

            onGiftsEnter_Bet({finish: e}) {
                this.component.updateBet(), e()
            }

            onIdleEnter_Bet({finish: e}) {
                this.component.resetBet(), e()
            }
        }

        s.modify(n)
    }, {}],
    70: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Store;

        class n extends s.Latest {
            get arrowBet() {
                return this.getItem("arrowBet")
            }

            setBet(e) {
                this.getItem("setBet")(e)
            }

            getRanges() {
                return this.getItem("ranges")
            }

            get showMaxWinRtpMessage() {
                return this.getItem("showMaxWinRtpMessage")
            }

            get maxWinRTP() {
                return this.getItem("maxWinRTP")
            }

            get showBetButtons() {
                return this.getItem("showBetButtons")
            }

            get rtp() {
                return this.getItem("rtp")
            }
        }

        s.modify(n)
    }, {}],
    71: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.View;

        class n extends s.Latest {
            _getInteractive() {
                return super._getInteractive() && !this.isShowBetPanel
            }

            get betPanel() {
                return this.tree.nodeMap.betPanel
            }

            initializeBet({ranges: e}) {
                this.tree.nodeMap.betPanelSlider.maxValue = e.length - 1, this.tree.nodeMap.betPanelMin.text = e.first, this.tree.nodeMap.betPanelMax.text = e.last, this.tree.nodeMap.betPanelSlider.pin.setStates("big"), this.hideBetPanel(), this.showBetInfoText(), this.hideBetBarButton()
            }

            getAnimationButtons() {
                const e = super.getAnimationButtons();
                return e.push(this.tree.nodeMap.betSubButton), e.push(this.tree.nodeMap.betAddButton), e.push(this.tree.nodeMap.betButtonShow), e.push(this.tree.nodeMap.betButtonConfirm), e
            }

            showBetInfoText() {
                const e = this.tree.nodeMap.betPanelInfoText, t = this.store.showMaxWinRtpMessage;
                e && t && (this.updateMaxWinRTP(), e.visible = !0)
            }

            updateMaxWinRTP() {
                const e = this.tree.nodeMap.betPanelInfoText, t = this.getTexts()["core.max_win"],
                    i = this.store.maxWinRTP;
                if (!e || !t || !i) return;
                let s = .01 * Math.floor(100 * this.rawBet * i);
                const n = this.store.getItem("currency");
                s = c2d.utils.formatters.StringFormatter.toCurrency(s.toFixed(2), {currency: n});
                const o = {rtp: this.store.rtp, max: this.tree.nodeMap.betPanelValue.text, min: s};
                e.text = c2d.display.Factory.realizeProperty(t, o)
            }

            hideBetBarButton() {
                this.store.showBetButtons || (this.tree.nodeMap.betSubButton && (this.tree.nodeMap.betSubButton.visible = !1), this.tree.nodeMap.betAddButton && (this.tree.nodeMap.betAddButton.visible = !1))
            }

            onIdleBegin() {
                const e = super.onIdleBegin();
                return this.enableBetButton(), e
            }

            onIdleFinish() {
                const e = super.onIdleFinish();
                return this.disableBetButton(), e
            }

            closeAllPanel() {
                const e = super.closeAllPanel();
                return this.hideBetPanel(), e
            }

            updateBet(e, t) {
                const {value: i, index: s, enoughMoney: n} = e;
                this.rawBet = i;
                const o = this.store.getItem("currency"),
                    r = c2d.utils.formatters.StringFormatter.toCurrency(i.toFixed(2), {currency: o});
                this.tree.nodeMap.betPanelValue.text = r, this.updateMaxWinRTP(), t || (this.tree.nodeMap.betPanelSlider.redraw(s), this.tree.nodeMap.betPanelSlider.value = s, this.confirmBet(Object.assign(Object.assign({}, e), {value: r})));
                const a = [this.tree.nodeMap.betPanelSlider.sliderBackFull];
                n ? c2d.Tween.to(a, .2, {
                    pixi: {
                        colorize: 16711680,
                        colorizeAmount: 1,
                        brightness: 3
                    }
                }) : c2d.Tween.to(a, .2, {pixi: {colorMatrixFilter: null}})
            }

            confirmBet({value: e, index: t, min: i, max: s, enoughMoney: n}) {
                e && (this.tree.nodeMap.betValue.text = e), this.tree.nodeMap.betSubButton && this.tree.nodeMap.betSubButton.enable(this.isBetInteractive && !i), this.tree.nodeMap.betAddButton && this.tree.nodeMap.betAddButton.enable(this.isBetInteractive && !s)
            }

            hideBetPanel() {
                if (!this.betPanel.visible) return;
                this.isShowBetPanel = !1, this.hideDarkness();
                const e = c2d.display.Factory.calcProperty("$[bottom]") - this.betPanel.children[0].y;
                this.betPanel.tween.tl.clear(), this.betPanel.tween.moveTo(null, e, .2, {
                    onComplete: () => {
                        this.betPanel.visible = !1
                    }
                })
            }

            showBetPanel() {
                this.closeAllPanel(), this.isShowBetPanel = !0, this.showDarkness(), this.betPanel.y = c2d.display.Factory.calcProperty("$[bottom]") - this.betPanel.children[0].y, this.betPanel.visible = !0, this.betPanel.tween.tl.clear(), this.betPanel.tween.moveTo(null, 0, .2)
            }

            enableBetButton() {
                const e = this.store.getGifts();
                if (e && +e.left) return;
                let t = this.tree.nodeMap.betButtonShow;
                t = c2d.type.isArray(t) ? t : [t], t.forEach(e => {
                    e.enable ? e.enable(!0) : e.interactive = !0
                }), this.isBetInteractive = !0
            }

            disableBetButton() {
                let e = this.tree.nodeMap.betButtonShow;
                e = c2d.type.isArray(e) ? e : [e], e.forEach(e => {
                    e.enable ? e.enable(!1) : e.interactive = !1
                }), this.isBetInteractive = !1
            }

            showChangeBetPopup() {
                this.showPopup({text: "${texts.core.change_bet_msg}", isClose: !1})
            }
        }

        s.modify(n)
    }, {}],
    72: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./GameScreenBetHandler"), e("./GameScreenBet"), e("./GameScreenBetStore"), e("./GameScreenBetController"), e("./GameScreenBetView")
    }, {
        "./GameScreenBet": 67,
        "./GameScreenBetController": 68,
        "./GameScreenBetHandler": 69,
        "./GameScreenBetStore": 70,
        "./GameScreenBetView": 71
    }],
    73: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Handler;

        class n extends s.Latest {
            get stateConfig_Freespins() {
                return {
                    Freespins: {enter: this.onFreespinsEnter_Freespins},
                    FreespinsProgress: {exit: this.onFreespinsProgressExit_Freespins}
                }
            }

            onInitialize() {
                return this.registerStates(this.stateConfig_Freespins), super.onInitialize()
            }

            onFreespinsEnter_Freespins({finish: e}) {
                e();
                return {actions: {updateFreespinsCounter: e => this.component.view.updateFreespinsCounter(e)}}
            }

            onFreespinsProgressExit_Freespins({finish: e}) {
                this.component.view.hideFreespinsCounter(), e()
            }
        }

        s.modify(n)
    }, {}],
    74: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.View;

        class n extends s.Latest {
            hideFreespinsCounter() {
                this.tree.nodeMap.freespinsPanel.visible = !1
            }

            updateFreespinsCounter(e = 0) {
                if (this.store.isReplay) return;
                if (this.store.isIntro) return;
                e = +e;
                const t = +this.tree.nodeMap.freespinsValue.text;
                e > 0 && t != e && this.shakeFreespinsIcon(), this.tree.nodeMap.freespinsValue.text = e, this.tree.nodeMap.freespinsPanel.visible || (this.tree.nodeMap.freespinsPanel.visible = !0)
            }

            shakeFreespinsIcon() {
                const e = this.tree.nodeMap.freespinsIcon;
                e && (new c2d.Timeline).to(e, .2, {rotation: Math.PI / 20}).to(e, .2, {rotation: -Math.PI / 20}).to(e, .2, {rotation: 0})
            }
        }

        s.modify(n)
    }, {}],
    75: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./GameScreenFreespinsHandler"), e("./GameScreenFreespinsView")
    }, {"./GameScreenFreespinsHandler": 73, "./GameScreenFreespinsView": 74}],
    76: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Component;

        class n extends s.Latest {
            get isGifts() {
                return !!this.controller.giftLeft
            }

            updateGifts(e) {
                this.controller.updateGifts(e)
            }

            useGifts() {
                this.controller.useGifts()
            }
        }

        s.modify(n)
    }, {}],
    77: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Controller;

        class n extends s.Latest {
            get giftLeft() {
                const e = this.store.getGifts();
                return e && e.left
            }

            updateGifts(e) {
                c2d.type.isNumber(e) || (e = this.giftLeft), this.view.updateGifts(e)
            }

            useGifts() {
                const e = this.giftLeft && this.giftLeft - 1;
                this.view.updateGifts(e)
            }
        }

        s.modify(n)
    }, {}],
    78: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Handler;

        class n extends s.Latest {
            get stateConfig_Gifts() {
                return {
                    Replay: {exit: this.onReplayExit_Gifts},
                    Gifts: {
                        check: this.onGiftsCheck_Gifts,
                        enter: this.onGiftsEnter_Gifts,
                        exit: this.onGiftsExit_Gifts
                    },
                    Freespins: {enter: this.onFreespinsEnter_Gifts},
                    FreespinsProgress: {exit: this.onFreespinsProgressExit_Gifts}
                }
            }

            onInitialize() {
                return this.registerStates(this.stateConfig_Gifts), super.onInitialize()
            }

            onReplayExit_Gifts({finish: e}) {
                return e(), {onFinish: () => this.component.updateGifts()}
            }

            onGiftsCheck_Gifts() {
                return this.component.isGifts
            }

            onGiftsEnter_Gifts({finish: e}) {
                const t = this.component.store.getGifts();
                this.component.showPopup({
                    text: "${texts.core.you_prize} " + t.left + " ${texts.core.gift_spins}",
                    buttonText: "OK",
                    isClose: !1
                }), this.component.updateGifts(), e()
            }

            onGiftsExit_Gifts({finish: e}) {
                this.component.updateGifts(0), e()
            }

            onFreespinsEnter_Gifts({finish: e}) {
                e();
                return {actions: {updateFreespinsCounter: () => this.component.updateGifts(0)}}
            }

            onFreespinsProgressExit_Gifts({finish: e}) {
                this.component.updateGifts(), e()
            }

            onSpinAction() {
                return this.useGifts(), super.onSpinAction()
            }

            useGifts() {
                const e = this.component.activeRespins;
                !this.component.store.isGifts || this.component.store.isFreespins || e || this.component.useGifts()
            }
        }

        s.modify(n)
    }, {}],
    79: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Store;

        class n extends s.Latest {
            addToGlobal() {
                return this.addItem("isGifts"), super.addToGlobal()
            }

            get isGifts() {
                return !!this.component.controller.giftLeft
            }
        }

        s.modify(n)
    }, {}],
    80: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.View;

        class n extends s.Latest {
            build() {
                const e = super.build();
                return this.updateGifts(0), e
            }

            updateGifts(e = 0) {
                e = +e;
                const t = +this.tree.nodeMap.giftsValue.text;
                e > 0 && t != e && this.shakeGiftIcon(), this.tree.nodeMap.giftsValue.text = e, this.tree.nodeMap.giftsPanel.visible = !!e
            }

            shakeGiftIcon() {
                const e = this.tree.nodeMap.giftsIcon;
                e && (new c2d.Timeline).to(e, .2, {rotation: Math.PI / 20}).to(e, .2, {rotation: -Math.PI / 20}).to(e, .2, {rotation: 0})
            }
        }

        s.modify(n)
    }, {}],
    81: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./GameScreenGiftsHandler"), e("./GameScreenGifts"), e("./GameScreenGiftsStore"), e("./GameScreenGiftsController"), e("./GameScreenGiftsView")
    }, {
        "./GameScreenGifts": 76,
        "./GameScreenGiftsController": 77,
        "./GameScreenGiftsHandler": 78,
        "./GameScreenGiftsStore": 79,
        "./GameScreenGiftsView": 80
    }],
    82: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Controller;

        class n extends s.Latest {
            getActionHandlers() {
                const e = super.getActionHandlers();
                return e.homeButton = () => this.onHomeButton(), e
            }

            onHomeButton() {
                this.view.showHomePopup(() => this.toHome())
            }
        }

        s.modify(n)
    }, {}],
    83: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Store;

        class n extends s.Latest {
            get backURL() {
                return this.getItem("backURL")
            }
        }

        s.modify(n)
    }, {}],
    84: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.View;

        class n extends s.Latest {
            getAnimationButtons() {
                const e = super.getAnimationButtons();
                return e.push(this.tree.nodeMap.homeButton), e
            }

            showHomePopup(e) {
                this.showPopup({text: "${texts.core.home_msg}", buttonText: "${texts.core.leave}", confirm: e})
            }
        }

        s.modify(n)
    }, {}],
    85: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./GameScreenHomeStore"), e("./GameScreenHomeController"), e("./GameScreenHomeView")
    }, {"./GameScreenHomeController": 82, "./GameScreenHomeStore": 83, "./GameScreenHomeView": 84}],
    86: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Component;

        class n extends s.Latest {
            enableMenuButton() {
                this.controller.enableMenuButton()
            }

            disableMenuButton() {
                this.controller.disableMenuButton()
            }
        }

        s.modify(n)
    }, {}],
    87: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Controller;

        class n extends s.Latest {
            create() {
                const e = super.create();
                return this.menuHandler = null, e
            }

            getActionHandlers() {
                const e = super.getActionHandlers();
                return e.menuButton = () => this.onInfoButton(), e
            }

            onInfoButton() {
                this.menuHandler && this.menuHandler()
            }

            enableMenuButton() {
                this.view.enableMenuButton()
            }

            disableMenuButton() {
                this.view.disableMenuButton()
            }
        }

        s.modify(n)
    }, {}],
    88: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Handler;

        class n extends s.Latest {
            get stateConfig_Menu() {
                return {
                    Start: {enter: this.onStart_Menu},
                    Gifts: {begin: this.onIdleBegin_Menu},
                    Idle: {begin: this.onIdleBegin_Menu},
                    Choice: {enter: this.onChoiceEnter_Menu}
                }
            }

            onInitialize() {
                return this.registerStates(this.stateConfig_Menu), super.onInitialize()
            }

            onStart_Menu({finish: e, actions: t}) {
                this.component.controller.menuHandler = t.infoButton, e()
            }

            onIdleBegin_Menu(e) {
                return this.updateButton_Menu(e)
            }

            onChoiceEnter_Menu(e) {
                return this.updateButton_Menu(e)
            }

            updateButton_Menu({finish: e}) {
                this.component.enableMenuButton(), e();
                return {onFinish: () => this.component.disableMenuButton()}
            }
        }

        s.modify(n)
    }, {}],
    89: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.View;

        class n extends s.Latest {
            build() {
                super.build(), this.disableMenuButton()
            }

            getAnimationButtons() {
                const e = super.getAnimationButtons();
                return e.push(this.tree.nodeMap.menuButton), e
            }

            enableMenuButton() {
                this.tree.nodeMap.menuButton.enable(!0)
            }

            disableMenuButton() {
                this.tree.nodeMap.menuButton.enable(!1)
            }
        }

        s.modify(n)
    }, {}],
    90: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./GameScreenMenuHandler"), e("./GameScreenMenuController"), e("./GameScreenMenuView"), e("./GameScreenMenu")
    }, {
        "./GameScreenMenu": 86,
        "./GameScreenMenuController": 87,
        "./GameScreenMenuHandler": 88,
        "./GameScreenMenuView": 89
    }],
    91: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Component;

        class n extends s.Latest {
            showPopup(e) {
                this.controller.showPopup(e)
            }

            closePopup() {
                this.controller.closePopup()
            }

            isShowPopup() {
                return this.view.tree.nodeMap.popup.visible
            }

            clickConfirmPopup() {
                this.isShowPopup || console.error("Impossible to press the Confirm button. Popup not shown"), this.view.tree.nodeMap.popupButtonConfirm.visible || console.error("Impossible to press the Confirm button. Button not shown"), this.view.tree.nodeMap.popupButtonConfirm.clickAction()
            }

            clickClosePopup() {
                this.isShowPopup || console.error("Impossible to press the Close button. Popup not shown"), this.view.tree.nodeMap.popupButtonClose.visible || console.error("Impossible to press the Close button. Button not shown"), this.view.tree.nodeMap.popupButtonClose.clickAction()
            }
        }

        s.modify(n)
    }, {}],
    92: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Controller;

        class n extends s.Latest {
            getActionHandlers() {
                const e = super.getActionHandlers();
                return e.popupButtonClose = () => this.view.closePopup(), e
            }

            showPopup(e) {
                this.view.showPopup(e)
            }

            closePopup() {
                this.view.closePopup()
            }
        }

        s.modify(n)
    }, {}],
    93: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Handler;

        class n extends s.Latest {
            get stateConfig_Popup() {
                return {
                    RestorePopup: {check: this.checkMainRestore_Popup, enter: this.onMainRestore_Popup},
                    ShowFreespinsPopup: {enter: this.onFreespinsPopupRestore_Popup},
                    FreespinsRestore: {enter: this.onFreespinsRestore_Popup}
                }
            }

            onInitialize() {
                return this.registerStates(this.stateConfig_Popup), super.onInitialize()
            }

            checkMainRestore_Popup() {
                const {nextAction: e, isRestore: t, showRestoreSessionPopup: i} = this.component.store;
                return i && "spin" !== e && "extrabonus_spin" !== e && "initspin" !== e && "freespin" !== e && t
            }

            checkFreespinPopupRestore_Popup() {
                const {nextAction: e, isRestore: t, showRestoreSessionPopup: i} = this.component.store;
                return i && "freespin" === e && t
            }

            checkFreespinRestore_Popup() {
                const {nextAction: e, isRestore: t, showRestoreSessionPopup: i} = this.component.store;
                return i && "initspin" === e && t
            }

            onMainRestore_Popup({finish: e}) {
                this.showRestorePopup().then(e)
            }

            onFreespinsPopupRestore_Popup({finish: e}) {
                this.checkFreespinPopupRestore_Popup() && this.showRestorePopup(), e()
            }

            onFreespinsRestore_Popup({finish: e}) {
                this.checkFreespinRestore_Popup() ? this.showRestorePopup().then(e) : e()
            }

            showRestorePopup() {
                const e = c2d.waitLast(), t = c2d.call(() => {
                    this.component.closePopup(), e.call()
                }, 5);
                return this.component.showPopup({
                    text: "${texts.core.restore_popup}",
                    isClose: !1,
                    isConfirm: !0,
                    buttonText: "${texts.core.close}",
                    confirm: () => {
                        c2d.Timeout.clear(t), e.call()
                    }
                }), e
            }

            getGlobalActionsConfig() {
                const e = super.getGlobalActionsConfig();
                return e.networkError = e => this.networkError(e), e.networkResolveError = () => this.networkResolveError(), e
            }

            networkError(e) {
                this.component.showPopup({
                    text: e.message,
                    isClose: !1,
                    isConfirm: c2d.type.isNumber(e.code),
                    buttonText: "${texts.core.back_to_lobby}",
                    confirm: () => this.component.toHome()
                })
            }

            networkResolveError() {
                this.component.closePopup()
            }
        }

        s.modify(n)
    }, {}],
    94: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Store;

        class n extends s.Latest {
            get backURL() {
                return this.getItem("backURL")
            }

            get showRestoreSessionPopup() {
                return this.getItem("showRestoreSessionPopup")
            }
        }

        s.modify(n)
    }, {}],
    95: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.View;

        class n extends s.Latest {
            build() {
                return this._isShowPopup = !1, super.build()
            }

            _getInteractive() {
                return super._getInteractive() && !this._isShowPopup
            }

            getAnimationButtons() {
                const e = super.getAnimationButtons();
                return e.push(this.tree.nodeMap.popupButtonConfirm), e
            }

            showPopup({
                          text: e,
                          confirm: t,
                          isClose: i = !0,
                          isConfirm: s = !0,
                          buttonText: n = "${texts.core.confirm}"
                      }) {
                if (!this.tree) return;
                if (!this.store.showPrompts) return void (t && t());
                this._isShowPopup = !0;
                const o = this.tree.variables;
                e = c2d.display.Factory.realizeProperty(e, o), n = c2d.display.Factory.realizeProperty(n, o);
                const r = this.tree.nodeMap.popup;
                if (this.tree.nodeMap.popupText.text = e, this.tree.nodeMap.popupButtonClose.visible = i, game.audioManager.playAudio("popup"), s) {
                    this.tree.nodeMap.popupButtonConfirm.visible = !0;
                    const e = this.tree.nodeMap.popupButtonText, i = this.tree.nodeMap.popupButtonBg;
                    e.text = n, e.fitToArea(.9 * i.width, i.height), this.tree.nodeMap.popupButtonConfirm.setHandlers(() => {
                        this.closePopup(), t && t()
                    }, !0)
                } else this.tree.nodeMap.popupButtonConfirm.visible = !1;
                const a = this.tree.nodeMap.panelDarkness;
                a && (a.visible = !0, a.tween.tl.clear(), a.tween.fadeTo(1, .2)), r.y = c2d.display.Factory.calcProperty("$[bottom]") - r.children[0].y, r.visible = !0, r.tween.tl.clear(), r.tween.moveTo(null, 0, .2)
            }

            closePopup() {
                if (!this.tree) return;
                const e = this.tree.nodeMap.popup;
                if (!e.visible) return;
                this._isShowPopup = !1;
                const t = this.tree.nodeMap.panelDarkness;
                t && (t.tween.tl.clear(), t.tween.fadeTo(0, .2, {
                    onComplete: () => {
                        t.visible = !1
                    }
                }));
                const i = c2d.display.Factory.calcProperty("$[bottom]") - e.children[0].y;
                e.tween.tl.clear(), e.tween.moveTo(null, i, .2, {
                    onComplete: () => {
                        e.visible = !1
                    }
                })
            }
        }

        s.modify(n)
    }, {}],
    96: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./GameScreenPopup"), e("./GameScreenPopupHandler"), e("./GameScreenPopupController"), e("./GameScreenPopupView"), e("./GameScreenPopupStore")
    }, {
        "./GameScreenPopup": 91,
        "./GameScreenPopupController": 92,
        "./GameScreenPopupHandler": 93,
        "./GameScreenPopupStore": 94,
        "./GameScreenPopupView": 95
    }],
    97: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Component;

        class n extends s.Latest {
            enableRulesButton() {
                this.controller.enableRulesButton()
            }

            disableRulesButton() {
                this.controller.disableRulesButton()
            }
        }

        s.modify(n)
    }, {}],
    98: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Controller;

        class n extends s.Latest {
            create() {
                const e = super.create();
                return this.rulesHandler = null, e
            }

            getActionHandlers() {
                const e = super.getActionHandlers();
                return e.rulesButton = () => this.onRulesButton(), e
            }

            onRulesButton() {
                this.rulesHandler && this.rulesHandler()
            }

            enableRulesButton() {
                this.view.enableRulesButton()
            }

            disableRulesButton() {
                this.view.disableRulesButton()
            }
        }

        s.modify(n)
    }, {}],
    99: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Handler;

        class n extends s.Latest {
            get stateConfig_Rules() {
                return {
                    Start: {enter: this.onStart_Rules},
                    Gifts: {begin: this.onIdleBegin_Rules},
                    Idle: {begin: this.onIdleBegin_Rules},
                    Choice: {enter: this.onChoiceEnter_Rules}
                }
            }

            onInitialize() {
                return this.registerStates(this.stateConfig_Rules), super.onInitialize()
            }

            onStart_Rules({finish: e, actions: t}) {
                this.component.controller.rulesHandler = t.rulesButton, e()
            }

            onIdleBegin_Rules(e) {
                return this.updateButton_Rules(e)
            }

            onChoiceEnter_Rules(e) {
                return this.updateButton_Rules(e)
            }

            updateButton_Rules({finish: e}) {
                this.component.enableRulesButton(), e();
                return {onFinish: () => this.component.disableRulesButton()}
            }
        }

        s.modify(n)
    }, {}],
    100: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.View;

        class n extends s.Latest {
            build() {
                super.build(), this.disableRulesButton()
            }

            getAnimationButtons() {
                const e = super.getAnimationButtons();
                return e.push(this.tree.nodeMap.rulesButton), e
            }

            enableRulesButton() {
                this.tree.nodeMap.rulesButton && this.tree.nodeMap.rulesButton.enable(!0)
            }

            disableRulesButton() {
                this.tree.nodeMap.rulesButton && this.tree.nodeMap.rulesButton.enable(!1)
            }
        }

        s.modify(n)
    }, {}],
    101: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./GameScreenRulesHandler"), e("./GameScreenRulesController"), e("./GameScreenRulesView"), e("./GameScreenRules")
    }, {
        "./GameScreenRules": 97,
        "./GameScreenRulesController": 98,
        "./GameScreenRulesHandler": 99,
        "./GameScreenRulesView": 100
    }],
    102: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Component;

        class n extends s.Latest {
            clickSpinButton() {
                this.view.tree.nodeMap.spinButton.clickAction()
            }
        }

        s.modify(n)
    }, {}],
    103: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Controller;

        class n extends s.Latest {
            getActionHandlers() {
                const e = super.getActionHandlers();
                return e.spinButton = () => this.onSpinButton(), e
            }

            addListeners() {
                return this.addSpinListeners(), super.addListeners()
            }

            addSpinListeners() {
                game.device.desktop && document.addEventListener("keyup", e => {
                    this.view.interactive && (this.store.showInfo || this.store.spaceSpin && "Space" === e.code && (this.view.tweenSpinButton(), this.onSpinButton()))
                })
            }

            changeSpinButtonState(e = "normal") {
                "normal" == e ? this.view.toNormalSpinButton() : "skip" == e ? this.view.toSkipSpinButton() : "collect" === e ? this.view.toCollectSpinButton() : "disable" === e ? this.view.toDisableSpinButton() : console.error("wrong spin button state", e)
            }
        }

        s.modify(n)
    }, {}],
    104: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Handler;

        class n extends s.Latest {
            get stateConfig_Spin() {
                return {
                    ShowFreespinsPopup: {enter: this.onFreespinsPopupEnter_Spin},
                    ShowFreespinsWin: {enter: this.onFreespinsWinEnter_Spin},
                    BonusGame: {enter: this.onBonusGameEnter_Spin}
                }
            }

            onInitialize() {
                return this.registerStates(this.stateConfig_Spin), super.onInitialize()
            }

            onFreespinsPopupEnter_Spin({finish: e, skip: t}) {
                this.component.controller.changeSpinButtonState("collect"), e();
                return {
                    onFinish: (...e) => {
                        this.component.controller.changeSpinButtonState("skip")
                    }
                }
            }

            onFreespinsWinEnter_Spin({finish: e, skip: t}) {
                this.component.controller.changeSpinButtonState("collect"), e();
                return {
                    onFinish: (...e) => {
                        this.component.controller.changeSpinButtonState("skip")
                    }
                }
            }

            onBonusGameEnter_Spin({finish: e, skip: t}) {
                this.component.controller.changeSpinButtonState("disable"), e()
            }
        }

        s.modify(n)
    }, {}],
    105: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.View;

        class n extends s.Latest {
            constructor() {
                super(...arguments), this._currentButtonState = "normal", this._skipWasPressed = !1
            }

            build() {
                const e = super.build();
                return this.initSpinAnimation(), e
            }

            initSpinAnimation() {
                this.tree.nodeMap.spinButton.addButtonListener("pointerDown", () => this.tweenSpinButtonDown()), this.tree.nodeMap.spinButton.addButtonListener("pointerUp", () => this.tweenSpinButtonUp()), this.tree.nodeMap.spinButton.addButtonListener("pointerUpOutside", () => this.tweenSpinButtonUp())
            }

            tweenSpinButton() {
                const e = this.tree.nodeMap.spinButton;
                e.isEnabled && !this._skipWasPressed && (e.tween.tl.clear(), e.tween.scaleTo(.9, .1), e.tween.scaleTo(1, .1), "skip" === this._currentButtonState && (this._skipWasPressed = !0, this.disableSpinButton()))
            }

            tweenSpinButtonDown() {
                const e = this.tree.nodeMap.spinButton;
                e.isEnabled && !this._skipWasPressed && (e.tween.tl.clear(), e.tween.scaleTo(.9, .1))
            }

            tweenSpinButtonUp() {
                const e = this.tree.nodeMap.spinButton;
                e.isEnabled && !this._skipWasPressed && (e.tween.tl.clear(), e.tween.scaleTo(1, .1), "skip" === this._currentButtonState && (this._skipWasPressed = !0, this.disableSpinButton()))
            }

            onIdleEnter() {
                return this.toNormalSpinButton(), super.onIdleEnter()
            }

            onIdleBegin() {
                return this.toNormalSpinButton(), this.enableSpinButton(), super.onIdleBegin()
            }

            onSkipState() {
                return this.toSkipSpinButton(), super.onSkipState()
            }

            onCollectEnter() {
                return this.disableSpinButton(), super.onCollectEnter()
            }

            hasActualRespin() {
                const e = this.store.respins;
                return e && e.count < e.total
            }

            toNormalSpinButton() {
                this.tree.nodeMap.spinButton.enable(!0), this.hasActualRespin() ? this.setState("respin") : this.setState("normal")
            }

            toSkipSpinButton() {
                this.tree.nodeMap.spinButton.enable(!0), this.hasActualRespin() ? this.setState("respin") : this.setState("skip")
            }

            toCollectSpinButton() {
                this.tree.nodeMap.spinButton.enable(!0), this.setState("normal", !1), this.setState("collect")
            }

            setState(e, t = !0) {
                this._skipWasPressed = !1, this.enableSpinButton(), this._currentButtonState = e, this.tree.nodeMap.spinButton.setStates(e, t)
            }

            enableSpinButton() {
                this.tree.nodeMap.spinButton.enable(!0)
            }

            disableSpinButton() {
                this.tree.nodeMap.spinButton.enable(!1)
            }

            toDisableSpinButton() {
                this.tree.nodeMap.spinButton.enable(!1)
            }

            resetButtonSkipState() {
                this._skipWasPressed = !1, this.enableSpinButton()
            }
        }

        s.modify(n)
    }, {}],
    106: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./GameScreenSpin"), e("./GameScreenSpinHandler"), e("./GameScreenSpinController"), e("./GameScreenSpinView")
    }, {
        "./GameScreenSpin": 102,
        "./GameScreenSpinController": 103,
        "./GameScreenSpinHandler": 104,
        "./GameScreenSpinView": 105
    }],
    107: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Handler;

        class n extends s.Latest {
            get stateConfig_SpinDelay() {
                return {Gifts: {begin: this.onIdleBegin_SpinDelay}, Idle: {begin: this.onIdleBegin_SpinDelay}}
            }

            onInitialize() {
                return this.registerStates(this.stateConfig_SpinDelay), super.onInitialize()
            }

            onIdleBegin_SpinDelay({finish: e}) {
                this.component.view.updateSpinDelay(), e()
            }
        }

        s.modify(n)
    }, {}],
    108: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Store;

        class n extends s.Latest {
            get minSpinTime() {
                return this.getItem("minSpinTime")
            }
        }

        s.modify(n)
    }, {}],
    109: [function (e, t, i) {
        "use strict";
        var s = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0});
        const n = game.sources.components.GameScreen.View;

        class o extends n.Latest {
            _getInteractive() {
                return super._getInteractive() && !this.isSpinDelay
            }

            updateSpinDelay() {
                return s(this, void 0, void 0, (function* () {
                    this.spinTimeout && (this.layers.game_screen.alpha = .6, this.layers.game_screen.interactiveChildren = !1, this.isSpinDelay = !0, yield this.spinTimeout, this.layers.game_screen.alpha = 1, this.layers.game_screen.interactiveChildren = !0, this.isSpinDelay = !1)
                }))
            }

            onSpinAction() {
                const e = super.onSpinAction(), t = this.store.minSpinTime;
                return t && (this.spinTimeout = c2d.Timeout.wait(t)), e
            }
        }

        n.modify(o)
    }, {}],
    110: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./GameScreenSpinDelayHandler"), e("./GameScreenSpinDelayStore"), e("./GameScreenSpinDelayView")
    }, {"./GameScreenSpinDelayHandler": 107, "./GameScreenSpinDelayStore": 108, "./GameScreenSpinDelayView": 109}],
    111: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Controller;

        class n extends s.Latest {
            getActionHandlers() {
                const e = super.getActionHandlers();
                return e.swipeModeButtonClose = () => this.view.hideSwipeModePopup(), e.enableSwipeModeButton = () => this.enableSwipeMode(), e
            }

            addListeners() {
                const e = super.addListeners();
                return game.device.mobile && (this.view.swipeHandler = () => this.onSpinButton()), e
            }

            enableSwipeMode() {
                this.view.hideSwipeModePopup(), this.store.setSwipeMode(!0)
            }
        }

        s.modify(n)
    }, {}],
    112: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Handler;

        class n extends s.Latest {
            get stateConfig_SwipeMode() {
                return {BonusGame: {enter: this.onBonusGameEnter_SwipeMode, exit: this.onBonusGameExit_SwipeMode}}
            }

            onInitialize() {
                return this.registerStates(this.stateConfig_SwipeMode), super.onInitialize()
            }

            onBonusGameEnter_SwipeMode({finish: e}) {
                this.component.view.hideSwipeMode(), e()
            }

            onBonusGameExit_SwipeMode({finish: e}) {
                this.component.view.showSwipeMode(), e()
            }
        }

        s.modify(n)
    }, {}],
    113: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Store;

        class n extends s.Latest {
            get swipeMode() {
                return this.getItem("swipeMode")
            }

            setSwipeMode(e) {
                this.getItem("setSwipeMode")(e)
            }
        }

        s.modify(n)
    }, {}],
    114: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.View;

        class n extends s.Latest {
            _getInteractive() {
                return super._getInteractive() && !this.isShowSwipePopup
            }

            build() {
                const e = super.build();
                return this.initSwipeMode(), e
            }

            initSwipeMode() {
                if (this.isShowSwipePopup = !1, this.layers.touch_area && !game.device.desktop) {
                    const e = +game.localStorage.getItem("swipeMode"), t = new c2d.display.Factory.types.Container,
                        i = {
                            left: -game.size.gameField.x,
                            top: -game.size.gameField.y,
                            width: game.size.gameField.width,
                            height: game.size.gameField.height
                        };
                    t.setHitArea(i.left, i.top, i.width, i.height), t.interactive = !0, this.layers.touch_area.addChild(t), this.swipeContainer = t;
                    let s = !e, n = [];
                    t.on("pointerdown", ({data: e}) => {
                        const {y: t} = e.global;
                        n.push(t)
                    }).on("pointerup", ({data: e}) => {
                        if (!n.length) return;
                        if (n.length > 1 || !this.interactive) return void (n = []);
                        const {y: t} = e.global, [i] = n;
                        if (t - i > 100) {
                            !+game.localStorage.getItem("swipeMode") && s ? this.isIdle && (s = !1, this.showSwipeModePopup()) : this.store.swipeMode && this.swipeHandler && this.swipeHandler()
                        }
                        n = []
                    })
                }
            }

            onResizeScreen() {
                if (super.onResizeScreen(), game.device.desktop || !this.swipeContainer) return;
                const e = {
                    left: -game.size.gameField.x,
                    top: -game.size.gameField.y,
                    width: game.size.gameField.width,
                    height: game.size.gameField.height
                };
                this.swipeContainer.setHitArea(e.left, e.top, e.width, e.height)
            }

            showSwipeModePopup() {
                this.isShowSwipePopup = !0;
                const e = this.tree.nodeMap.panelDarkness;
                e && (e.visible = !0, e.tween.tl.clear(), e.tween.fadeTo(1, .2));
                const t = this.tree.nodeMap.swipeModePopup;
                t.y = c2d.display.Factory.calcProperty("$[bottom]") - t.children[0].y, t.visible = !0, t.tween.tl.clear(), t.tween.moveTo(null, 0, .2)
            }

            hideSwipeModePopup() {
                this.store.setSwipeMode(!1), this.isShowSwipePopup = !1;
                const e = this.tree.nodeMap.swipeModePopup;
                if (!e || !e.visible) return;
                const t = this.tree.nodeMap.panelDarkness;
                t && (t.tween.tl.clear(), t.tween.fadeTo(0, .2, {
                    onComplete: () => {
                        t.visible = !1
                    }
                }));
                const i = c2d.display.Factory.calcProperty("$[bottom]") - e.children[0].y;
                e.tween.tl.clear(), e.tween.moveTo(null, i, .2, {
                    onComplete: () => {
                        e.visible = !1
                    }
                })
            }

            hideSwipeMode() {
                this.tree.nodeMap.touchArea && (this.tree.nodeMap.touchArea.visible = !1)
            }

            showSwipeMode() {
                this.tree.nodeMap.touchArea && (this.tree.nodeMap.touchArea.visible = !0)
            }
        }

        s.modify(n)
    }, {}],
    115: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./GameScreenSwipeModeHandler"), e("./GameScreenSwipeModeStore"), e("./GameScreenSwipeModeController"), e("./GameScreenSwipeModeView")
    }, {
        "./GameScreenSwipeModeController": 111,
        "./GameScreenSwipeModeHandler": 112,
        "./GameScreenSwipeModeStore": 113,
        "./GameScreenSwipeModeView": 114
    }],
    116: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Component;

        class n extends s.Latest {
            onReplayExit() {
                const e = super.onReplayExit();
                return this.clearTotalWin(), e
            }

            onSpin() {
                return this.onSpinUpdateTotal(), super.onSpin()
            }

            onSpinUpdateTotal() {
                if (this.store.isFreespins) {
                    const e = this.store.getFsWin();
                    e && this.showFsWin(e)
                } else this.clearTotalWin()
            }

            updateTotalWin(e) {
                this.controller.updateTotalWin(e)
            }

            showFsWin(e) {
                this.controller.showFsWin(e)
            }

            clearTotalWin() {
                this.controller.clearTotalWin()
            }

            getViewWin() {
                return this.view.tree.nodeMap.winValue.text
            }
        }

        s.modify(n)
    }, {}],
    117: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Controller;

        class n extends s.Latest {
            clearTotalWin() {
                this.store.isFreespins || (this.lastWin = 0, this.view.clearTotalWin())
            }

            updateTotalWin(e) {
                if (!e) return void this.clearTotalWin();
                this.lastWin = e;
                const t = this.store.getItem("currency");
                e = c2d.utils.formatters.StringFormatter.toCurrency(e.toFixed(2), {currency: t}), this.view.updateTotalWin(e)
            }

            showFsWin(e) {
                if (!e && 0 !== e) return;
                const t = this.store.getItem("currency");
                e = c2d.utils.formatters.StringFormatter.toCurrency(e.toFixed(2), {currency: t}), this.view.updateFsWin(e)
            }
        }

        s.modify(n)
    }, {}],
    118: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.Handler;

        class n extends s.Latest {
            get stateConfig_Win() {
                return {
                    Gifts: {begin: this.onIdleBegin_Win},
                    Idle: {begin: this.onIdleBegin_Win},
                    ShowFinalResult: {enter: this.onShowFinalResultEnter_Win},
                    ShowAllLines: {enter: this.onShowAllLinesEnter_Win},
                    Freespins: {enter: this.onFreespinsEnter_Win},
                    FreespinsProgress: {enter: this.onFreespinsProgressEnter_Win},
                    ShowFreespinsWin: {enter: this.onFreespinsWinEnter_Win},
                    Celebration: {enter: this.onCelebration_Win, exit: this.onCelebrationExit_Win}
                }
            }

            onInitialize() {
                return this.registerStates(this.stateConfig_Win), super.onInitialize()
            }

            onIdleBegin_Win({finish: e}) {
                const t = this.component.store.getTotalWin();
                this.component.updateTotalWin(t), e()
            }

            onShowAllLinesEnter_Win({finish: e}) {
                this.component.store.hasCelebration() || this.updateTotalWin_Win(), e()
            }

            onFreespinsEnter_Win({finish: e}) {
                this.component.view.clearTotalWin(), e()
            }

            onFreespinsWinEnter_Win({finish: e}) {
                const t = this.component.store.getFsWin();
                this.component.showFsWin(t), e()
            }

            onFreespinsProgressEnter_Win({finish: e}) {
                const t = this.component.store.getFsWin();
                this.component.showFsWin(t || 0), e()
            }

            onCelebration_Win({finish: e}) {
                this.component.clearTotalWin(), e()
            }

            onCelebrationExit_Win({finish: e}) {
                this.updateTotalWin_Win(), e()
            }

            onShowFinalResultEnter_Win({finish: e}) {
                const t = this.component.store.getTotalWin();
                this.component.updateTotalWin(t), e()
            }

            updateTotalWin_Win() {
                let e;
                e = this.component.config.showEveryWin ? this.component.store.getWinsData().total : this.component.store.getTotalWin(), this.component.updateTotalWin(e)
            }
        }

        s.modify(n)
    }, {}],
    119: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = game.sources.components.GameScreen.View;

        class n extends s.Latest {
            build() {
                const e = super.build();
                return this.clearTotalWin(), e
            }

            clearTotalWin() {
                this.tree.nodeMap.winValue.text = "", this.tree.nodeMap.winPanel.visible = !1
            }

            updateTotalWin(e) {
                this.tree.nodeMap.fsLabel && (this.tree.nodeMap.winLabel.visible = !0, this.tree.nodeMap.fsLabel.visible = !1), this.tree.nodeMap.winValue.text = e, this.tree.nodeMap.winPanel.visible = !0
            }

            updateFsWin(e) {
                this.tree.nodeMap.fsLabel && (this.tree.nodeMap.winLabel.visible = !1, this.tree.nodeMap.fsLabel.visible = !0, this.tree.nodeMap.winValue.text = e, this.tree.nodeMap.winPanel.visible = !0)
            }
        }

        s.modify(n)
    }, {}],
    120: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./GameScreenWinHandler"), e("./GameScreenWin"), e("./GameScreenWinController"), e("./GameScreenWinView")
    }, {
        "./GameScreenWin": 116,
        "./GameScreenWinController": 117,
        "./GameScreenWinHandler": 118,
        "./GameScreenWinView": 119
    }],
    121: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.DisableSkipsGameScreenHandlerMod = void 0;
        const s = e("./../../GameScreenHandler");
        i.DisableSkipsGameScreenHandlerMod = () => {
            const e = s.GameScreenHandler;

            class t extends e.Latest {
                onShowAllLinesEnter({finish: e, skip: t}) {
                    e()
                }

                onCelebration({finish: e, skip: t}) {
                    e()
                }

                onSkipWait({finish: e, skip: t}) {
                    e()
                }
            }

            e.modify(t)
        }
    }, {"./../../GameScreenHandler": 52}],
    122: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.HideWinsLowerThanBetMod = void 0;
        const s = e("./../../GameScreenController");
        i.HideWinsLowerThanBetMod = () => {
            const e = s.GameScreenController;

            class t extends e.Latest {
                setWinResolver() {
                    game.audioManager.addConflictResolver("sounds/you_win", e => {
                        const t = this.store.getBet(), i = this.store.getTotalWin(), s = e[0], n = e[1];
                        return i < t ? s : n
                    })
                }
            }

            e.modify(t)
        }
    }, {"./../../GameScreenController": 51}],
    123: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.InfoScreen = void 0;
        let n = class extends game.sources.VisualComponent {
            constructor(...e) {
                super(...e), this.statistic = {
                    rounds: -1,
                    totalWin: 0,
                    totalStake: 0,
                    netWin: 0,
                    _timeEnter: new Date,
                    _giftSpinsInProgress: !1,
                    _updated: !1
                }, this._localStorageSupported = this._localStorageTest(), this._localStorageVariable = {}
            }

            _localStorageTest() {
                try {
                    return localStorage.setItem("test", "test"), localStorage.removeItem("test"), !0
                } catch (e) {
                    return !1
                }
            }

            _localStorageSet(e, t) {
                this._localStorageSupported ? localStorage.setItem(e, t) : this._localStorageVariable[e] = t
            }

            _localStorageGet(e) {
                return this._localStorageSupported ? localStorage.getItem(e) : this._localStorageVariable[e]
            }

            build() {
                this._setupStatistic(), this.view.build()
            }

            onIntroShow() {
                this.view.onIntroShow()
            }

            onIntroHide() {
                this.view.onIntroHide()
            }

            showMenu() {
                this.view.showMenu()
            }

            closeMenu() {
                this.view.closeMenu()
            }

            onDestroy() {
                game.remoteApi.soundHandler = null
            }

            callRules() {
                this.view.callRules()
            }

            switchTab(e) {
                this.view.switchTab(e)
            }

            _setupStatistic() {
                if (!jsvars.session_id) return;
                let e = this._localStorageGet("InfoScreen.statistic");
                if (!e) return;
                const t = JSON.parse(e);
                t[jsvars.session_id] && (this.statistic = t[jsvars.session_id], this.statistic._timeEnter = new Date(this.statistic._timeEnter))
            }

            gainStatistic() {
                this.statistic._updated || (this.statistic.rounds++, this.statistic._updated = !0, this.statistic.rounds > 0 && (this.statistic.totalWin += this.store.getTotalWin(), this.statistic.totalStake += this.getCurrentBet(), this.statistic.netWin = this.statistic.totalWin - this.statistic.totalStake), this._updateInLocalStorage())
            }

            unlockSetStatistic() {
                this.statistic._updated = !1, this._updateInLocalStorage()
            }

            _updateInLocalStorage() {
                if (!jsvars.session_id) return;
                let e = this._localStorageGet("InfoScreen.statistic");
                const t = e ? JSON.parse(e) : {};
                for (let e in t) {
                    new Date - new Date(t[e]._timeEnter) > 864e5 && delete t[e]
                }
                t[jsvars.session_id] = this.statistic, this._localStorageSet("InfoScreen.statistic", JSON.stringify(t))
            }

            getCurrentBet() {
                const e = c2d.globalStore.get("giftSpins"), t = e && e(), i = t && t.left,
                    s = i || this.statistic._giftSpinsInProgress ? 0 : this.store.getBet();
                return this.statistic._giftSpinsInProgress = !!i, s
            }

            getStatistic() {
                return this.statistic
            }
        };
        n = s([modifiable], n), i.InfoScreen = n
    }, {}],
    124: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.InfoScreenConfig = void 0;
        let n = class extends game.sources.Store {
        };
        n.isShowInfo = !1, n.showTurboButton = !1, n.turboMode = !1, n.showIntro = !0, n.spaceSpin = !0, n.arrowBet = !0, n.swipeMode = !1, n.hideSpin = !1, n = s([modifiable], n), i.InfoScreenConfig = n
    }, {}],
    125: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.InfoScreenHandler = void 0;
        let n = class extends game.sources.Handler {
            constructor(e) {
                super(e), this.subscribeEvents()
            }

            subscribeEvents() {
                this.events.subscribe(this.events.config.COMPONENTS_INFOSCREEN_CLOSE_MENU, this.closeMenu.bind(this)), this.events.subscribe(this.events.config.COMPONENTS_INFOSCREEN_UNLOCK_STATISTIC, this.unlockStatistic.bind(this))
            }

            get statesConfig() {
                return {
                    Start: {enter: this.onStartEnter},
                    Init: {exit: this.onInitExit},
                    Intro: {enter: this.onIntroEnter, exit: this.onIntroExit},
                    Gifts: {begin: this.onIdleBegin},
                    Idle: {begin: this.onIdleBegin},
                    Replay: {exit: this.onReplayExit}
                }
            }

            get globalActionsConfig() {
                return this.getGlobalActionsConfig()
            }

            getGlobalActionsConfig() {
                return {infoButton: () => this.component.showMenu(), rulesButton: () => this.component.callRules()}
            }

            onStartEnter({finish: e}) {
                e()
            }

            onInitExit({finish: e}) {
                this.component.build(), e()
            }

            onIntroEnter({finish: e}) {
                this.component.onIntroShow(), e()
            }

            onIntroExit({finish: e}) {
                this.component.onIntroHide(), e()
            }

            onIdleBegin({finish: e}) {
                return this.component.gainStatistic(), e(), {onFinish: () => this.component.closeMenu()}
            }

            onReplayExit({finish: e}) {
                e()
            }

            closeMenu() {
                this.component.closeMenu()
            }

            unlockStatistic() {
                this.component.unlockSetStatistic()
            }
        };
        n = s([modifiable], n), i.InfoScreenHandler = n
    }, {}],
    126: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.InfoScreenStore = void 0;
        let n = class extends game.sources.Store {
            onCreate() {
                const e = this.classes.InfoScreenConfig;
                this.isShowInfo = e.isShowInfo, this.showTurboButton = e.showTurboButton, this._turboMode = this.initTumbler("turboMode", e.turboMode), this._showIntro = this.initTumbler("showIntro", e.showIntro), game.device.desktop && (this._spaceSpin = this.initTumbler("spaceSpin", e.spaceSpin), this._arrowBet = this.initTumbler("arrowBet", e.arrowBet)), game.device.mobile && (this._swipeMode = this.initTumbler("swipeMode", e.swipeMode), this._hideSpin = this.initTumbler("hideSpin", e.hideSpin))
            }

            initTumbler(e, t) {
                let i = game.localStorage.getItem(e);
                return i = c2d.type.isString(i) ? "1" === i : t, i
            }

            addToGlobal() {
                this.addItem("showInfo"), this.addItem("turboMode"), this.addItem("setTurboMode"), this.addItem("showIntro"), this.addItem("setShowIntro"), game.device.desktop && (this.addItem("spaceSpin"), this.addItem("arrowBet")), game.device.mobile && (this.addItem("swipeMode"), this.addItem("setSwipeMode"), this.addItem("hideSpin"))
            }

            get showInfo() {
                return this.isShowInfo
            }

            getMusicVolume() {
                return game.getAudioGroupVolume("music")
            }

            getSoundVolume() {
                return game.getAudioGroupVolume("sfx")
            }

            getMasterVolume() {
                return game.getMasterVolume()
            }

            isAudioEnabled() {
                return game.isAudioEnabled()
            }

            get turboMode() {
                return this._turboMode
            }

            get showTurboButton() {
                return this._showTurboButton || !1
            }

            set showTurboButton(e) {
                this._showTurboButton = e
            }

            get showControl() {
                return this._showControl || !1
            }

            set showControl(e) {
                this._showControl = e
            }

            setTurboMode(e) {
                e = !!e, game.localStorage.setItem("turboMode", e ? "1" : "0"), this._turboMode = e
            }

            get showIntro() {
                return this._showIntro
            }

            setShowIntro(e) {
                game.localStorage.setItem("showIntro", e ? "1" : "0"), this._showIntro = e
            }

            get spaceSpin() {
                return this._spaceSpin
            }

            setSpaceSpin(e) {
                game.localStorage.setItem("spaceSpin", e ? "1" : "0"), this._spaceSpin = e
            }

            get arrowBet() {
                return this._arrowBet
            }

            setArrowBet(e) {
                game.localStorage.setItem("arrowBet", e ? "1" : "0"), this._arrowBet = e
            }

            get swipeMode() {
                return this._swipeMode
            }

            setSwipeMode(e) {
                game.localStorage.setItem("swipeMode", e ? "1" : "0"), this._swipeMode = e
            }

            get hideSpin() {
                return this._hideSpin
            }

            setHideSpin(e) {
                game.localStorage.setItem("hideSpin", e ? "1" : "0"), this._hideSpin = e
            }

            get rtp() {
                return this.getItem("rtp")
            }

            get reelsCount() {
                return Object.values(this.getItem("symbols") || {}).length
            }

            get symbolsCount() {
                const e = Object.values(this.getItem("symbols") || {});
                return Object.keys(e[0] || {}).length
            }

            get showHistory() {
                return this.getItem("showHistory")
            }

            get enableSoundButton() {
                return this.getItem("enableSoundButton")
            }

            get showSoundButton() {
                return this.getItem("showSoundButton")
            }

            get enableFullscreenButton() {
                return this.getItem("enableFullscreenButton")
            }

            get showFullscreenButton() {
                return this.getItem("showFullscreenButton")
            }

            get hideCurrency() {
                return this.getItem("hideCurrency")
            }

            get userSupportPageLink() {
                return this.getItem("userSupportPageLink")
            }

            get gameVersion() {
                return game.application.version
            }

            getTotalWin() {
                return this.getItem("totalWin")
            }

            getBet() {
                return this.getItem("bet")
            }
        };
        n = s([modifiable], n), i.InfoScreenStore = n
    }, {}],
    127: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.InfoScreenView = void 0;
        let n = class extends game.sources.View {
            constructor(e) {
                super(e), this.screensView = new this.classes.ScreensView(e), this.darknessView = new this.classes.DarknessView(e), this.menuView = new this.classes.MenuView(e)
            }

            create(...e) {
                super.create(...e), this.screensView.create && this.screensView.create(), this.darknessView.create && this.darknessView.create(), this.menuView.create && this.menuView.create()
            }

            initialize(...e) {
                super.initialize(...e), this.screensView.initialize(...e), this.darknessView.initialize(...e), this.menuView.initialize(...e)
            }

            resizeScreen(...e) {
                super.resizeScreen(...e), this.screensView.resizeScreen(...e), this.darknessView.resizeScreen(...e), this.menuView.resizeScreen(...e)
            }

            getHandlers() {
                return {
                    sound_button: e => this.soundButtonHandler(Boolean(e.toggleIndex % 2)),
                    turbo_button: e => this.turboButtonHandler(Boolean(e.toggleIndex % 2)),
                    closeButton: () => this.closeMenu()
                }
            }

            onInitialize() {
                super.onInitialize(), this.playSoundAfterIntro = game.isAudioEnabled(), game.setAudioEnabled(!1), game.remoteApi.soundHandler = e => this.soundButtonHandler(e)
            }

            build() {
                this.buildViews(), this.addListeners(), this.layers.info_screen.visible = !1, this.playSoundAfterIntro && game.setAudioEnabled(!0), this.store.showTurboButton || this.store.setTurboMode(!1)
            }

            buildViews() {
                this.darknessView.build(), this.menuView.build(), this.screensView.build()
            }

            onIntroShow() {
                game.setAudioEnabled(!1), this.toggleTurboAfterIntro = this.store.turboMode, this.store.setTurboMode(!1)
            }

            onIntroHide() {
                this.playSoundAfterIntro && game.setAudioEnabled(!0), this.toggleTurboAfterIntro && this.store.setTurboMode(!0)
            }

            showMenu() {
                this.layers.info_screen.visible = !0, this.store.isShowInfo = !0, this.menuView.showMenu(), this.darknessView.showMenu(), this.screensView.showMenu()
            }

            closeMenu() {
                this.store.isShowInfo = !1, this.screensView.closeMenu(), this.darknessView.closeMenu(), this.menuView.closeMenu()
            }

            onDestroy() {
                game.remoteApi.soundHandler = null
            }

            callRules() {
                this.showMenu(), this.switchTab("rules")
            }

            addListeners() {
                const e = this.getHandlers();
                this.darknessView.setHandlers(e), this.menuView.setHandlers(e), this.screensView.setHandlers(e)
            }

            soundButtonHandler(e) {
                const t = this.component.handler.events;
                t.emit(t.config.SOUND_TURN_STATE_CHANGE, {isSoundEnabled: e}), game.setAudioEnabled(e), game.remoteApi.onSoundChange(e), this.darknessView.updateSoundButton(), this.screensView.updateSettings()
            }

            turboButtonHandler(e) {
                const t = this.component.handler.events;
                t.emit(t.config.TURBO_TURN_STATE_CHANGE, {isFastPlayEnabled: e}), this.store.setTurboMode(e), this.darknessView.updateTurboButton(), this.screensView.updateSettings()
            }

            switchTab(e) {
                this.screensView.switchTab(e), this.menuView.switchTab(e)
            }

            setComponent(e) {
                super.setComponent(e), this.darknessView.setComponent(e), this.menuView.setComponent(e), this.screensView.setComponent(e), this.darknessView.setBaseView(this), this.menuView.setBaseView(this), this.screensView.setBaseView(this)
            }

            setAnimations(e) {
                e.forEach(e => {
                    const t = () => {
                        const {icon: t} = e.nodeMap;
                        t.tween.tl.clear(), t.tween.scaleTo(1, .2)
                    };
                    e && e.addButtonListener("pointerDown", () => {
                        const {icon: t} = e.nodeMap;
                        t.tween.tl.clear(), t.tween.scaleTo(.9, .2)
                    }), e && e.addButtonListener("pointerUp", t), e && e.addButtonListener("pointerUpOutside", t)
                })
            }
        };
        n = s([modifiable], n), i.InfoScreenView = n
    }, {}],
    128: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("./InfoScreenComponent"), n = e("./InfoScreenHandler"), o = e("./InfoScreenStore"),
            r = e("./views/ScreensView"), a = e("./views/MenuView"), l = e("./views/DarknessView"),
            c = e("./InfoScreenView"), h = e("./InfoScreenConfig"),
            u = e("./mods/hideTurboButton/HideTurboInfoScreenView"),
            d = e("./mods/showSessionStatistics/ShowSessionStatisticsInfoScreenView");
        e("./views/modifications/paytable/index"), e("./views/modifications/fullscreen/index"), e("./views/modifications/settings/index"), e("./views/modifications/history/index"), e("./views/modifications/bonusroom/index"), e("./views/modifications/turbo/index"), e("./views/modifications/control/index");
        const p = {
            ScreensView: r.ScreensView,
            MenuView: a.MenuView,
            DarknessView: l.DarknessView,
            InfoScreenConfig: h.InfoScreenConfig
        };
        c2d.recursiveSet("mods.hideTurboButton.View", u.HideTurboInfoScreenViewMod, p), c2d.recursiveSet("mods.showSessionStatistics.View", d.ShowSessionStatisticsInfoScreenViewMod, p);
        const m = {
            Component: s.InfoScreen,
            Handler: n.InfoScreenHandler,
            Store: o.InfoScreenStore,
            View: c.InfoScreenView,
            classes: p
        };
        (c2d.Logger ? c2d.Logger.Of("InfoScreen") : console).info("component version v0.01.4"), game.componentsManager.registerComponent("InfoScreen", m, "v0.01.4")
    }, {
        "./InfoScreenComponent": 123,
        "./InfoScreenConfig": 124,
        "./InfoScreenHandler": 125,
        "./InfoScreenStore": 126,
        "./InfoScreenView": 127,
        "./mods/hideTurboButton/HideTurboInfoScreenView": 129,
        "./mods/showSessionStatistics/ShowSessionStatisticsInfoScreenView": 130,
        "./views/DarknessView": 131,
        "./views/MenuView": 132,
        "./views/ScreensView": 133,
        "./views/modifications/bonusroom/index": 138,
        "./views/modifications/control/index": 141,
        "./views/modifications/fullscreen/index": 145,
        "./views/modifications/history/index": 150,
        "./views/modifications/paytable/index": 153,
        "./views/modifications/settings/index": 156,
        "./views/modifications/turbo/index": 159
    }],
    129: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.HideTurboInfoScreenViewMod = void 0;
        const s = e("../../InfoScreenView");
        i.HideTurboInfoScreenViewMod = () => {
            const e = s.InfoScreenView;

            class t extends e.Latest {
                build() {
                    super.build(), this.darknessView.tree.nodeMap.turbo_button.visible = !1, this.screensView.tree.nodeMap.turboMode.visible = !1, this.store.showTurboButton = !1, this.store.setTurboMode(!1)
                }
            }

            e.modify(t)
        }
    }, {"../../InfoScreenView": 127}],
    130: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.ShowSessionStatisticsInfoScreenViewMod = void 0;
        const s = e("../../views/ScreensView"), n = e("../../views/MenuView");
        i.ShowSessionStatisticsInfoScreenViewMod = () => {
            const e = s.ScreensView, t = n.MenuView;

            class i extends e.Latest {
                constructor() {
                    super(...arguments), this.active = !1, this.timer = null
                }

                build() {
                    this._logger = c2d.Logger.Of("Components.Reelset.Controller"), this.addStatisticDescription(), super.build(), this.timer = this.tree.nodeMap.time_in_game
                }

                addStatisticDescription() {
                    const e = this.getPrefabs().rulesTab, t = this._findInPrefab(e, "gameplay_items");
                    if (!t) return this._logger.error('ShowSessionStatisticsInfoScreenViewMod error: no GridLayout with name "gameplay_items" in the game(rules.json)');
                    t.children.push({
                        __prefab: "gameplayItem",
                        __variables: {
                            icon: "${textures.btn_statistic}",
                            label: "${texts.core.statistics_title}",
                            description: "${texts.core.statistics_description}"
                        }
                    })
                }

                showTab(e) {
                    return "statistic" == e ? (this.active = !0, this.drawStatistic()) : (this.pauseTimer(), this.active = !1), super.showTab(e)
                }

                drawStatistic() {
                    const e = this.store.getItem("currency");
                    this.statistic = this.component.getStatistic(), this.tree.nodeMap.rounds_played.text = this.statistic.rounds, this.tree.nodeMap.net_win.text = this.toCurrency(this.statistic.netWin, e), this.tree.nodeMap.total_stake.text = this.toCurrency(this.statistic.totalStake, e), this.tree.nodeMap.total_win.text = this.toCurrency(this.statistic.totalWin, e), this.startTimer()
                }

                startTimer() {
                    this.timer.isStarted ? this.timer.resume() : this.timer.start(this.statistic._timeEnter)
                }

                pauseTimer() {
                    this.timer.isStarted && this.timer.pause()
                }

                toCurrency(e, t) {
                    return c2d.utils.formatters.StringFormatter.toCurrency(e.toFixed(2), {currency: t})
                }
            }

            class o extends t.Latest {
                init() {
                    super.init(), this.tree.nodeMap.statisticTab_button.visible = !0
                }
            }

            t.modify(o), e.modify(i)
        }
    }, {"../../views/MenuView": 132, "../../views/ScreensView": 133}],
    131: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.DarknessView = void 0;
        let n = class extends game.sources.FactoryView {
            build() {
                this.buildTree(), this.darkness = this.tree.nodeMap.panelDarkness, this.needUpdateTree = !0
            }

            buildVariables() {
                return {}
            }

            buildTree() {
                const e = this.layers.darkness_area, t = this.buildVariables();
                super.buildTree("darkness_tree", e, t), this.init()
            }

            init() {
                this.initButtonsAnimations(), this.initSoundButton()
            }

            initButtonsAnimations() {
                const e = [this.tree.nodeMap.sound_button, this.tree.nodeMap.turbo_button];
                this.view.setAnimations(e)
            }

            initSoundButton() {
                const e = this.tree.nodeMap.sound_button;
                e && (this.store.showSoundButton || (e.visible = !1), this.store.enableSoundButton || e.enable(!1))
            }

            showMenu() {
                this.isCanClose = !0, this.needUpdateTree && (this.needUpdateTree = !1, this.updateTree()), this.showDarkness()
            }

            closeMenu() {
                this.isCanClose && (this.isCanClose = !1, this.hideDarkness())
            }

            updateMenuButtons() {
                this.updateSoundButton(), this.updateTurboButton()
            }

            updateSoundButton() {
                const e = this.store.isAudioEnabled() ? 0 : 1;
                this.tree.nodeMap.sound_button.toggle(e, !0)
            }

            updateTurboButton() {
                const e = this.store.turboMode ? 0 : 1;
                this.tree.nodeMap.turbo_button.toggle(e, !0)
            }

            showDarkness() {
                this.layers.game_screen.visible = !1, this.darkness.alpha = 0, this.darkness.tween.tl.clear(), this.darkness.tween.fadeTo(1, .3), this.updateMenuButtons()
            }

            hideDarkness() {
                this.layers.game_screen.visible = !0, this.darkness.tween.tl.clear(), this.darkness.tween.fadeTo(0, .3, {
                    onComplete: () => {
                        this.layers.info_screen.visible = !1
                    }
                })
            }

            onResizeScreen() {
                this.isCanClose ? this.updateTree() : this.needUpdateTree = !0
            }

            setBaseView(e) {
                this.view = e
            }
        };
        n = s([modifiable], n), i.DarknessView = n
    }, {}],
    132: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.MenuView = void 0;
        let n = class extends game.sources.FactoryView {
            build() {
                this.buildTree(), this.buildButtons(), this.init(), this.needUpdateTree = !0
            }

            init() {
                this.initButtonsAnimations()
            }

            buildVariables() {
                return {}
            }

            buildTree() {
                const e = this.layers.menu_area, t = this.buildVariables();
                super.buildTree("menu_tree", e, t)
            }

            initButtonsAnimations() {
                const e = [this.tree.nodeMap.statisticTab_button, this.tree.nodeMap.paytableTab_button, this.tree.nodeMap.rulesTab_button, this.tree.nodeMap.historyTab_button, this.tree.nodeMap.settingTab_button, this.tree.nodeMap.bonus_button, this.tree.nodeMap.fullscreen_button];
                this.view.setAnimations(e)
            }

            buildButtons() {
                this._buttons = [], Object.values(this.tree.nodeMap.menuButtons.nodeMap).forEach(e => {
                    e.config && e.config.tab && (this._buttons.push(e), e.addButtonListener("pointerUp", () => this.switchTab(e.config.tab)))
                })
            }

            showMenu() {
                this.isCanClose = !0, this.needUpdateTree && (this.needUpdateTree = !1, this.updateTree());
                const e = this.tree.nodeMap.menu_container;
                e.tween.tl.clear(), game.device.portrait ? (e.x = 0, e.y = c2d.display.Factory.calcProperty("$[100sh]") - e.children[0].width, e.tween.moveTo(null, 0, .2)) : (e.y = 0, e.x = -e.children[0].width, e.tween.moveTo(0, null, .2))
            }

            closeMenu() {
                if (!this.isCanClose) return;
                this.isCanClose = !1;
                const e = this.tree.nodeMap.menu_container;
                e.tween.tl.clear();
                const t = () => {
                };
                if (game.device.portrait) {
                    const t = c2d.display.Factory.calcProperty("$[100sh]") - e.children[0].width;
                    e.tween.moveTo(null, t, .3)
                } else {
                    const i = -e.children[0].width;
                    e.tween.moveTo(i, null, .3, {onComplete: t})
                }
                this.switchTab()
            }

            switchTab(e) {
                Object.values(this._buttons).forEach((t, i) => {
                    e && t.config.tab === e ? (t._setInteraction(!1), t.setFactoryState("tint", "select"), this.view.screensView.switchTab(e)) : (t._setInteraction(!0), t.setFactoryState("tint", "normal"))
                }), this._currentActiveButton = e
            }

            onResizeScreen() {
                this.isCanClose ? this.updateTree() : this.needUpdateTree = !0
            }

            showBonusRoomButton() {
            }

            setBaseView(e) {
                this.view = e
            }
        };
        n = s([modifiable], n), i.MenuView = n
    }, {}],
    133: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.ScreensView = void 0;
        let n = class extends game.sources.FactoryView {
            build() {
                this.addGameVersion(), this.addUserSupportPageLink(), this.createMap(), this.buildTree(), this.buildScreens(), this.init(), this.needUpdateTree = !0
            }

            createMap() {
                const e = this.assetsStore.configs.screens_tree, t = e.fullData;
                Object.keys(t).forEach(e => {
                    const i = this.getPrefabs();
                    c2d.display.FactoryTree.dispensePrefabs(t[e], i)
                }), e.createMap()
            }

            addGameVersion() {
                const e = this.getPrefabs();
                this._findInPrefab(e.rulesTab, "rules").children.push({
                    __prefab: "sectionText",
                    __variables: {text: "${texts.core.game_version}"}
                })
            }

            addUserSupportPageLink() {
                const e = this.store.userSupportPageLink;
                if (!e) return;
                const t = this.getPrefabs();
                this._findInPrefab(t.rulesTab, "rules").children.push({__prefab: "user_support_link"}), t.user_support_link.__variables = {user_support_link: e}, this.getTexts()["core.contacts"] += " " + e
            }

            _findInPrefab(e, t) {
                var i;
                if ((null == e ? void 0 : e.name) == t) return e;
                if (null === (i = e.children) || void 0 === i ? void 0 : i.length) for (const i of e.children) {
                    const e = this._findInPrefab(i, t);
                    if (e) return e
                }
            }

            buildVariables() {
                return {
                    rtp: this.store.rtp,
                    columns: this.store.reelsCount,
                    rows: this.store.symbolsCount,
                    gameVersion: this.store.gameVersion
                }
            }

            buildTree() {
                const e = this.layers.screens_area, t = this.buildVariables();
                super.buildTree("screens_tree", e, t)
            }

            buildScreens() {
                this._optionsScreens = [];
                const e = this.tree.nodeMap.content_container;
                Object.values(e.nodeMap).forEach(e => {
                    e.config && e.config.screen && this._optionsScreens.push(e)
                }), e.y = c2d.display.Factory.calcProperty("$[100sh]")
            }

            showMenu() {
                this.needUpdateTree && (this.needUpdateTree = !1, this.updateTree()), this.switchTab()
            }

            closeMenu() {
                this.switchTab()
            }

            switchTab(e) {
                this.isCanClose = Boolean(e), e && this.needUpdateTree && (this.needUpdateTree = !1, this.updateTree());
                const t = () => {
                    Object.values(this._optionsScreens).forEach(t => {
                        t && (e && t.config.screen === e ? (t.visible = !0, this.showTab(e)) : (this.onTabHide(t), t.visible = !1))
                    }), this._currentScreen = e
                }, i = this.tree.nodeMap.content_container;
                if (i.tween.tl.clear(), e) {
                    t();
                    const e = 0;
                    i.y = c2d.display.Factory.calcProperty("$[100sh]"), i.tween.moveTo(null, e, .3)
                } else {
                    const e = c2d.display.Factory.calcProperty("$[100sh]");
                    i.tween.moveTo(null, e, .3, {onComplete: () => t()})
                }
            }

            onResizeScreen() {
                this.updateTree(), this.isCanClose ? this.updateTree() : this.needUpdateTree = !0
            }

            setBaseView(e) {
                this.view = e
            }

            init() {
            }

            showTab(e) {
            }

            showHistoryInfo(...e) {
            }

            setSettingsHandlers(e) {
            }

            updateAudio(...e) {
            }

            onTabHide(e) {
            }

            updateSettings() {
            }

            disableBonusRoomButtons() {
            }

            enableBonusRoomButtons() {
            }

            addBonusButton(e) {
            }
        };
        n = s([modifiable], n), i.ScreensView = n
    }, {}],
    134: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../../InfoScreenComponent").InfoScreen;

        class n extends s.Latest {
            addBonusButton(e) {
                this.view.screensView.addBonusButton(e), this.view.menuView.showBonusRoomButton()
            }

            callBonusRoom() {
                this.showMenu(), this.switchTab("bonus")
            }

            disableBonusRoomButtons() {
                this.view.screensView.disableBonusRoomButtons()
            }

            enableBonusRoomButtons() {
                this.view.screensView.enableBonusRoomButtons()
            }

            emitShowCustomMenu(e) {
                this.handler.emitShowCustomMenu(e)
            }

            emitHideCustomMenu() {
                this.handler.emitHideCustomMenu()
            }

            emitHideInstantCustomMenu() {
                this.handler.emitHideInstantCustomMenu()
            }
        }

        s.modify(n)
    }, {"../../../InfoScreenComponent": 123}],
    135: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../../InfoScreenHandler").InfoScreenHandler;

        class n extends s.Latest {
            get stateConfig_BonusRoom() {
                return {Init: {exit: this.onInitExit_BonusRoom}, Idle: {begin: this.onIdleBegin_BonusRoom}}
            }

            getGlobalActionsConfig() {
                const e = super.getGlobalActionsConfig();
                return e.bonusButton = () => this.component.callBonusRoom(), e
            }

            onInitExit_BonusRoom({finish: e}) {
                return e(), {
                    actions: {
                        addBonusButton: e => {
                            this.component.addBonusButton(e)
                        }
                    }, onFinish: () => {
                        this.component.disableBonusRoomButtons()
                    }
                }
            }

            onIdleBegin_BonusRoom({finish: e}) {
                return this.component.enableBonusRoomButtons(), e(), {
                    onFinish: () => {
                        this.component.disableBonusRoomButtons()
                    }
                }
            }

            onInitialize() {
                return game.fsm.actions.addBonusButton = {}, game.fsm.actions.bonusButton = {}, this.registerStates(this.stateConfig_BonusRoom), super.onInitialize()
            }

            emitShowCustomMenu(e) {
                this.events.emit(this.events.config.COMPONENTS_INFOSCREEN_SHOW_CUSTOM_SCREEN, e)
            }

            emitHideCustomMenu() {
                this.events.emit(this.events.config.COMPONENTS_INFOSCREEN_HIDE_CUSTOM_SCREEN)
            }

            emitHideInstantCustomMenu() {
                this.events.emit(this.events.config.COMPONENTS_INFOSCREEN_HIDE_INSTANT_CUSTOM_SCREEN)
            }
        }

        s.modify(n)
    }, {"../../../InfoScreenHandler": 125}],
    136: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../MenuView").MenuView;

        class n extends s.Latest {
            showBonusRoomButton() {
                this.tree.nodeMap.bonus_button.visible || (this.tree.nodeMap.bonus_button.visible = !0)
            }
        }

        s.modify(n)
    }, {"../../MenuView": 132}],
    137: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../ScreensView").ScreensView;

        class n extends s.Latest {
            build() {
                super.build(), this.bonusItems = []
            }

            addBonusButton(e) {
                this.bonusItems.push(e), this.buildButtonNode(e), this.addBonusButtonListener(e)
            }

            buildButtonNode({title: e, name: t, texture: i}) {
                const s = this.getPrefabs(), n = this.tree.nodeMap.bonusItems, o = {
                    texts: this.getTexts(),
                    styles: this.getStyles(),
                    textures: this.assetsStore.textures,
                    skeletons: this.assetsStore.skeletons
                }, r = {__prefab: "bonusButton", __variables: {title: e, texture: i, name: t}};
                this.tree.actualConfigMap.bonusItems.children.push(r), n.nodeMap || (n.nodeMap = {}), n.nodeList = this.tree._buildDeeper({
                    config: r,
                    variables: o,
                    prefabs: s,
                    parent: n,
                    nodeMaps: [n.nodeMap]
                }), this.tree.update()
            }

            addBonusButtonListener({name: e}) {
                this.tree.nodeMap.bonusItems.nodeMap[e].setHandlers(this.emitShowCustomMenu.bind(this, e))
            }

            hideBonusScreens() {
                this.component.emitHideInstantCustomMenu()
            }

            onTabHide(e) {
                super.onTabHide(e), "bonusTab_container" === e.name && this.hideBonusScreens()
            }

            closeMenu() {
                super.closeMenu(), this.bonusItems && this.component.emitHideCustomMenu()
            }

            emitShowCustomMenu(e) {
                this.component.emitShowCustomMenu(e)
            }

            disableBonusRoomButtons() {
                this.bonusItems.forEach(({name: e}) => {
                    this.tree.nodeMap.bonusItems.nodeMap[e].setStates("disabled")
                })
            }

            enableBonusRoomButtons() {
                this.bonusItems.forEach(({name: e}) => {
                    this.tree.nodeMap.bonusItems.nodeMap[e].setStates("normal")
                })
            }
        }

        s.modify(n)
    }, {"../../ScreensView": 133}],
    138: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./MenuBonusRoomView"), e("./ScreensBonusRoomView"), e("./InfoScreenBonusRoom"), e("./InfoScreenBonusRoomHandler")
    }, {
        "./InfoScreenBonusRoom": 134,
        "./InfoScreenBonusRoomHandler": 135,
        "./MenuBonusRoomView": 136,
        "./ScreensBonusRoomView": 137
    }],
    139: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../../InfoScreenView").InfoScreenView;

        class n extends s.Latest {
            addListeners() {
                return this.addControlListener(), super.addListeners()
            }

            addControlListener() {
                const e = {
                    spaceSpin: e => {
                        this.store.setSpaceSpin(e), this.store.setArrowBet(e)
                    }, swipeMode: e => {
                        this.store.setSwipeMode(e)
                    }
                };
                this.screensView.setControlHandlers(e)
            }
        }

        s.modify(n)
    }, {"../../../InfoScreenView": 127}],
    140: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../ScreensView").ScreensView;

        class n extends s.Latest {
            init() {
                return this.initControlSettings(), super.init()
            }

            initControlSettings() {
                this.tree.nodeMap.control.visible = !0, game.device.desktop && this.tree.nodeMap.spaceSpin && (this.spaceSpinTumbler = this.tree.nodeMap.spaceSpin.nodeMap.tumbler), game.device.mobile && this.tree.nodeMap.swipeMode && (this.swipeModeTumbler = this.tree.nodeMap.swipeMode.nodeMap.tumbler)
            }

            showTab(e) {
                return "settings" == e && this.updateControlSettings(), super.showTab(e)
            }

            updateControlSettings() {
                if (this.spaceSpinTumbler) {
                    const e = this.store.spaceSpin;
                    this.spaceSpinTumbler.toggle(e, !1)
                }
                if (this.swipeModeTumbler) {
                    const e = this.store.swipeMode;
                    this.swipeModeTumbler.toggle(e, !1)
                }
            }

            setControlHandlers(e) {
                this.spaceSpinTumbler ? this.spaceSpinTumbler.setHandlers(e.spaceSpin) : e.spaceSpin(!1), this.swipeModeTumbler ? this.swipeModeTumbler.setHandlers(e.swipeMode) : e.swipeMode(!1)
            }
        }

        s.modify(n)
    }, {"../../ScreensView": 133}],
    141: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./ScreensControlView"), e("./InfoScreenControlView")
    }, {"./InfoScreenControlView": 139, "./ScreensControlView": 140}],
    142: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../../InfoScreenView").InfoScreenView;

        class n extends s.Latest {
            getHandlers() {
                const e = super.getHandlers();
                return e.fullscreen_button = e => {
                    const t = Boolean(document.fullscreenElement);
                    t ? document.exitFullscreen && document.exitFullscreen() : document.documentElement.requestFullscreen(), game.remoteApi.onFullscreenChange(!t)
                }, e
            }
        }

        s.modify(n)
    }, {"../../../InfoScreenView": 127}],
    143: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../../InfoScreenComponent").InfoScreen;

        class n extends s.Latest {
            onInitialize() {
                super.onInitialize(), game.remoteApi.fullscreenHandler = e => this.view.screensView.updateFullscreenButtonState(e)
            }

            onDestroy() {
                super.onDestroy(), game.remoteApi.fullscreenHandler = null
            }
        }

        s.modify(n)
    }, {"../../../InfoScreenComponent": 123}],
    144: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../MenuView").MenuView;

        class n extends s.Latest {
            constructor(e) {
                super(e), this._button = null
            }

            init() {
                return this._button = this.tree.nodeMap.fullscreen_button, this._button && this.initFullscreen(), super.init()
            }

            initFullscreen() {
                if (this.store.showFullscreenButton || (this._button.visible = !1), !this.store.enableFullscreenButton) return void this._button.enable(!1);
                const e = () => c2d.Timeout.invoke(() => {
                    const e = Boolean(document.fullscreenElement);
                    this.updateFullscreenButtonState(e)
                }, .1);
                document.addEventListener("webkitfullscreenchange", e), document.addEventListener("mozfullscreenchange", e), document.addEventListener("fullscreenchange", e)
            }

            updateFullscreenButtonState(e) {
                this._button && this._button.toggle(e ? 1 : 0, !0, "pointerDown")
            }
        }

        s.modify(n)
    }, {"../../MenuView": 132}],
    145: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./InfoScreenFullscreenComponent"), e("./InfoScreenFullScreenView"), e("./MenuFullscreenView")
    }, {"./InfoScreenFullScreenView": 142, "./InfoScreenFullscreenComponent": 143, "./MenuFullscreenView": 144}],
    146: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../../InfoScreenComponent").InfoScreen;

        class n extends s.Latest {
            updateHistoryHandler(e) {
                this.store.showHistory && this.view.screensView.updateHistoryHandler(e)
            }

            updateReplayHandler(e) {
                this.view.screensView.updateReplayHandler(e)
            }
        }

        s.modify(n)
    }, {"../../../InfoScreenComponent": 123}],
    147: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../../InfoScreenHandler").InfoScreenHandler;

        class n extends s.Latest {
            get stateConfig_History() {
                return {
                    Start: {enter: this.onStartEnter_History},
                    Gifts: {begin: this.onIdleBegin_History},
                    Idle: {begin: this.onIdleBegin_History},
                    Replay: {exit: this.onReplayExit_History}
                }
            }

            onInitialize() {
                return this.registerStates(this.stateConfig_History), super.onInitialize()
            }

            onStartEnter_History({finish: e, actions: {getHistory: t}}) {
                this.component.updateHistoryHandler(t), e()
            }

            onIdleBegin_History({finish: e, actions: t}) {
                const {playReplay: i} = t;
                this.component.updateReplayHandler(i), e()
            }

            onReplayExit_History({finish: e}) {
                this.component.showMenu(), this.component.view.screensView.switchTab("history"), e()
            }
        }

        s.modify(n)
    }, {"../../../InfoScreenHandler": 125}],
    148: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../MenuView").MenuView;

        class n extends s.Latest {
            init() {
                this.hideHistory(), super.init()
            }

            hideHistory() {
                this.store.showHistory || (this.tree.nodeMap.historyTab_button.visible = !1)
            }
        }

        s.modify(n)
    }, {"../../MenuView": 132}],
    149: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../ScreensView").ScreensView;

        class n extends s.Latest {
            init() {
                return this.isReplay = !0, this.isHistoryInfo = !1, this.isClear = !0, this.initHistory(), super.init()
            }

            initHistory() {
                this.historyTree = this.tree.nodeMap.history, this.historyTree.nodeMap.historyScrollContainer.setTopOverScrollHandler(() => this.historyTopOverScroll()), this.historyTree.nodeMap.historyScrollContainer.setBottomOverScrollHandler(() => this.historyBottomOverScroll()), this.historyTree.nodeMap.prevScroller.setHandlers(() => this.historyTopOverScroll()), this.historyTree.nodeMap.nextScroller.setHandlers(() => this.historyBottomOverScroll())
            }

            historyTopOverScroll() {
                this.currentPage > 1 && this.pageHandler(this.currentPage - 1)
            }

            historyBottomOverScroll() {
                this.currentPage < this.totalPage && this.pageHandler(this.currentPage + 1)
            }

            updateHistoryHandler(e) {
                this.historyHandler = (t = 0) => {
                    const i = t || this.currentPage;
                    e(e => this.updateHistoryData(e), i)
                }
            }

            updateReplayHandler(e) {
                this.playReplay = e
            }

            _checkDidReplay() {
                this.didUpdateReplayHandler = !c2d.type.isNullOrUndefined(this.currentPage), this.didUpdateReplayHandler && (this.currentPage = this.beforeReplayPage, this.historyHandler())
            }

            _saveOldPageAndSetItZero() {
                this.beforeReplayPage = this.currentPage, this.currentPage = 0
            }

            showTab(e) {
                return "history" == e && this.isClear && this.historyHandler(), super.showTab(e)
            }

            updateHistoryData({data: e, settings: t}) {
                var i;
                const s = Array.fromObject(e.events), n = s.length;
                n !== ((null === (i = this.tree.nodeMap.historyLines.nodeList) || void 0 === i ? void 0 : i.length) || 0) && (this.clear(), this.createLines(n)), this.isClear = !1;
                const o = s.map(e => {
                    const t = e.aggregated_data, i = {
                        date: null,
                        time: null,
                        bet: null,
                        action: null,
                        win: null,
                        lose: null,
                        button: null
                    }, [s, n] = t.datetime.split(" "), o = this.store.hideCurrency ? "" : t.currency;
                    return i.date = s, i.time = n, i.bet = t.total_bet + " " + o, i.action = t.round_id, +t.total_win ? i.win = t.total_win + " " + o : i.lose = t.total_win + " " + o, i.button = this.createButton({
                        field: t,
                        event: e
                    }), i
                });
                this.updateFieldsData(o), this.updateHistoryNavigation(e.navigation)
            }

            clear() {
                this.isClear = !0, this.updateConfigs([]), this.tree.nodeMap.historyLines.removeChildren(), this.tree.nodeMap.historyLines.nodeMap = {}, this.tree.nodeMap.historyLines.nodeList = [], this.historyTree.nodeMap.prevScroller.visible = !1, this.historyTree.nodeMap.nextScroller.visible = !1
            }

            addNodes(e) {
                const t = this.tree.nodeMap.historyLines, i = this.getPrefabs();
                this.updateConfigs(e), t.nodeMap || (t.nodeMap = {}), t.nodeList || (t.nodeList = []), t.nodeList = this.tree._buildDeeper({
                    config: e,
                    nodeMaps: [t.nodeMap],
                    variables: t.__variables,
                    prefabs: i,
                    parent: t
                }), this.tree.update()
            }

            createLines(e) {
                const t = Array.from({length: e}, (e, t) => ({
                    __prefab: "historyItem",
                    __variables: {color: t % 2 == 0 ? "0x07080a" : "0x171b23"}
                }));
                this.addNodes(t)
            }

            updateFieldsData(e) {
                const t = this.tree.nodeMap.historyLines.nodeList;
                e.forEach(({date: e, time: i, action: s, bet: n, lose: o, win: r, button: a}, l) => {
                    const c = t[l];
                    c.nodeMap.cache.cacheAsBitmap = !1, c.nodeMap.historyDateValue.text = e, c.nodeMap.historyTimeValue.text = i, c.nodeMap.historyActionValue.text = s, c.nodeMap.historyBetValue.text = n, o ? (c.nodeMap.historyLoseValue.text = o, c.nodeMap.historyWinValue.text = "") : (c.nodeMap.historyWinValue.text = r, c.nodeMap.historyLoseValue.text = ""), a && (c.nodeMap.clickGroup.removeChildren(), c.nodeMap.clickGroup.addChild(a)), c.nodeMap.cache.cacheAsBitmap = !0
                })
            }

            createButton(e) {
                return this.isReplay ? this.createReplayButton(e) : this.isHistoryInfo ? this.createInfoButton(e) : void 0
            }

            createReplayButton({field: e, event: t}) {
                const i = Array.fromObject(t.actions).last.cutted_response.available_actions[0];
                if ("spin" == i || "extrabonus_spin" == i) {
                    const t = this.historyTree.__variables.textures.btn_start_replay, i = new c2d.display.Sprite(t);
                    return i.pointerdown = () => {
                        game.audioManager.playAudio("click"), this.playReplay(e.round_id)
                    }, i.anchor.set(.5), i.interactive = !0, i.buttonMode = !0, i
                }
            }

            createInfoButton({field: e}) {
                const t = this.historyTree.__variables.textures.btn_info, i = new c2d.display.Sprite(t);
                return i.pointerdown = () => {
                    game.audioManager.playAudio("click"), this.showHistoryInfo(e.round_id)
                }, i.anchor.set(.5), i.interactive = !0, i.buttonMode = !0, i
            }

            updateHistoryNavigation(e) {
                const {current_page: t, total_pages_count: i} = e;
                this.currentPage = t, this.totalPage = i, this.pageHandler = e => {
                    this.historyHandler(e)
                }, this.historyTree.nodeMap.prevScroller.visible = this.currentPage > 1, this.historyTree.nodeMap.nextScroller.visible = this.currentPage < this.totalPage, this.historyTree.nodeMap.historyContent.onTreeDidUpdate(), this.historyTree.nodeMap.historyScrollContainer.onTreeDidUpdate(), this.historyTree.nodeMap.historyScrollContainer.scrollTop(), this.historyTree.nodeMap.historyScrollContainer.content.y = 0
            }

            switchTab(e) {
                super.switchTab(e), e || this.clear()
            }

            updateConfigs(e) {
                const t = this.assetsStore.configs.screens_tree.dataMap;
                Object.keys(t).forEach(i => {
                    const s = t[i];
                    s.historyLines && (s.historyLines.children = e)
                })
            }

            onResizeScreen() {
                var e;
                const t = (null === (e = null == this ? void 0 : this.tree) || void 0 === e ? void 0 : e.nodeMap.historyLines.nodeList) || [];
                t.forEach(e => e.nodeMap.cache.cacheAsBitmap = !1), super.onResizeScreen(), t.forEach(e => e.nodeMap.cache.cacheAsBitmap = !0)
            }
        }

        s.modify(n)
    }, {"../../ScreensView": 133}],
    150: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./InfoScreenHistoryHandler"), e("./InfoScreenHistoryComponent"), e("./MenuHistoryView"), e("./ScreensHistoryView")
    }, {
        "./InfoScreenHistoryComponent": 146,
        "./InfoScreenHistoryHandler": 147,
        "./MenuHistoryView": 148,
        "./ScreensHistoryView": 149
    }],
    151: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../ScreensView").ScreensView;

        class n extends s.Latest {
            init() {
                return this.initPaytable(), super.init()
            }

            initPaytable() {
                const e = this.store.getItem("directory"), t = e.paytable, i = this.tree.nodeMap.paytable.nodeMap;
                let s;
                s = c2d.type.isArray(i.symbols) ? i.symbols : [i.symbols], s.forEach((e, i) => {
                    e.children.forEach(e => {
                        c2d.type.isNullOrUndefined(e.id) || e.setPayments(t[e.id])
                    })
                }), i.LinesWinMap && i.LinesWinMap.drawLines(e.lines)
            }

            showTab(e) {
                return super.showTab(e)
            }
        }

        s.modify(n)
    }, {"../../ScreensView": 133}],
    152: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../MenuView").MenuView;

        class n extends s.Latest {
            init() {
                super.init(), this.tree.nodeMap.paytableTab_button.visible = !0
            }
        }

        s.modify(n)
    }, {"../../MenuView": 132}],
    153: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./InfoScreenPaytableView"), e("./MenuPaytableView")
    }, {"./InfoScreenPaytableView": 151, "./MenuPaytableView": 152}],
    154: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../../InfoScreenView").InfoScreenView;

        class n extends s.Latest {
            addListeners() {
                return this.addSettingsListener(), super.addListeners()
            }

            addSettingsListener() {
                const e = {
                    audioEnabled: e => {
                        game.setAudioEnabled(e), game.remoteApi.onSoundChange(e), this.darknessView.updateMenuButtons()
                    },
                    soundVolume: (e, t) => game.setAudioGroupVolume("sfx", t),
                    musicVolume: (e, t) => game.setAudioGroupVolume("music", t),
                    spaceSpin: e => {
                        this.store.setSpaceSpin(e), this.store.setArrowBet(e)
                    },
                    swipeMode: e => {
                        this.store.setSwipeMode(e)
                    },
                    turboMode: e => {
                        this.store.setTurboMode(e), this.darknessView.updateMenuButtons()
                    }
                };
                this.screensView.setSettingsHandlers(e), this.screensView.updateAudio()
            }
        }

        s.modify(n)
    }, {"../../../InfoScreenView": 127}],
    155: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../ScreensView").ScreensView;

        class n extends s.Latest {
            init() {
                return this.initSettings(), super.init()
            }

            initSettings() {
                this.audioEnabledTumbler = this.tree.nodeMap.audio.nodeMap.tumbler, this.soundVolumeSlider = this.tree.nodeMap.soundVolume.nodeMap.slider, this.musicVolumeSlider = this.tree.nodeMap.musicVolume.nodeMap.slider, this.showIntroTumbler = this.tree.nodeMap.showIntro.nodeMap.tumbler;
                this.showIntroTumbler.setHandlers(e => this.store.setShowIntro(e))
            }

            showTab(e) {
                return "settings" == e && this.updateSettings(), super.showTab(e)
            }

            updateSettings() {
                const e = this.store.isAudioEnabled();
                this.audioEnabledTumbler.toggle(e, !1);
                const t = this.store.showIntro;
                this.showIntroTumbler.toggle(t, !1)
            }

            setSettingsHandlers(e) {
                super.setSettingsHandlers(e), this.audioEnabledTumbler.setHandlers(e.audioEnabled), this.soundVolumeSlider.setHandlers(e.soundVolume), this.musicVolumeSlider.setHandlers(e.musicVolume)
            }

            updateAudio() {
                this.audioEnabledTumbler.toggle(this.store.isAudioEnabled(), !1);
                const e = this.store.getSoundVolume();
                this.soundVolumeSlider.value = e, this.soundVolumeSlider.redraw(e);
                const t = this.store.getMusicVolume();
                this.musicVolumeSlider.value = t, this.musicVolumeSlider.redraw(t)
            }
        }

        s.modify(n)
    }, {"../../ScreensView": 133}],
    156: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./ScreensSettingsView"), e("./InfoScreenSettingsView")
    }, {"./InfoScreenSettingsView": 154, "./ScreensSettingsView": 155}],
    157: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../DarknessView").DarknessView;

        class n extends s.Latest {
            init() {
                super.init(), this.tree.nodeMap.turbo_button.visible = !0, this.store.showTurboButton = !0
            }
        }

        s.modify(n)
    }, {"../../DarknessView": 131}],
    158: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../ScreensView").ScreensView;

        class n extends s.Latest {
            init() {
                return this.initSettingsTurbo(), super.init()
            }

            initSettingsTurbo() {
                this.tree.nodeMap.turboMode && (this.turboModeTumbler = this.tree.nodeMap.turboMode.nodeMap.tumbler), this.tree.nodeMap.turboModeTumbler.visible = !0
            }

            showTab(e) {
                return "settings" == e && this.updateSettingsTurbo(), super.showTab(e)
            }

            updateSettingsTurbo() {
                if (this.turboModeTumbler) {
                    const e = this.store.turboMode;
                    this.turboModeTumbler.toggle(e, !1)
                }
            }

            setSettingsHandlers(e) {
                super.setSettingsHandlers(e), this.turboModeTumbler ? this.turboModeTumbler.setHandlers(e.turboMode) : e.turboMode(!1)
            }
        }

        s.modify(n)
    }, {"../../ScreensView": 133}],
    159: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./ScreensTurboView"), e("./DarknessTurboView")
    }, {"./DarknessTurboView": 157, "./ScreensTurboView": 158}],
    160: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.Intro = void 0;
        let n = class extends game.sources.VisualComponent {
            get isShow() {
                return this.controller.isShow
            }

            build(e) {
                this.controller.build(e)
            }

            closeIntro(e) {
                this.controller.closeIntro(e)
            }

            nextAction() {
                return this.controller.nextAction()
            }

            updateStore() {
                this.controller.updateStore()
            }

            updateAbortHandler(e) {
                this.controller.updateAbortHandler(e)
            }

            get active() {
                return this._active
            }

            set active(e) {
                this._active = e
            }

            clickCloseButton() {
                const e = this.view.tree.nodeMap.spinButton;
                e || console.error("Intro close button not initialize."), e.clickAction()
            }

            clickShowToggle() {
                var e;
                const t = null === (e = this.view.tree) || void 0 === e ? void 0 : e.nodeMap.tumbler;
                t || console.error("Intro show toggle not initialize."), t.clickAction()
            }

            getShowToggleState() {
                var e;
                const t = null === (e = this.view.tree) || void 0 === e ? void 0 : e.nodeMap.tumbler;
                return t ? !!(t.toggleIndex % 2) : (console.error("Intro show toggle not initialize."), null)
            }

            clickSlideButton(e) {
                this.view.slideButtonHandler[e] || console.error(`Intro slide button ${e} not initialize.`), this.view.slideButtonHandler[e]()
            }

            clickPreviousButton() {
                this.view.prevButtonHandler || console.error("Intro previous button not initialize."), this.view.prevButtonHandler()
            }

            clickNextButton() {
                this.view.nextButtonHandler || console.error("Intro next button not initialize."), this.view.nextButtonHandler()
            }

            getCurrentSlideIndex() {
                const e = this.view.currentAction;
                let t = null;
                return this.view.actionList.find((i, s) => {
                    if (i.name == e) return t = s, !0
                }), t
            }

            getSlidesCount() {
                return this.view.actionList.length
            }
        };
        n = s([modifiable], n), i.Intro = n
    }, {}],
    161: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.Controller = void 0;
        let n = class extends game.sources.Controller {
            create() {
                super.create(), this.currentData = null, this.dataIndex = null, this.actionList = this.assetsStore.getConfigs({set: "slide"}), this.actionList && 0 != this.actionList || console.error("The action list is undefined.")
            }

            get isShow() {
                return "boolean" != typeof this._isShow && (this._isShow = this.store.isShowIntro()), this._isShow
            }

            get storeData() {
                return this.assetsStore.getConfigs({set: "slide"}).reduce((e, t) => (e[t.name] = t.data, e), {})
            }

            build() {
                this.view.build(this.actionList), this.view.addSpinButtonListener(() => {
                    this._isShow = !1
                }), this.view.addShowToggleListener(e => {
                    this.store.setShowIntro(e)
                })
            }

            closeIntro(e) {
                this.view.closeIntro()
            }

            updateAbortHandler(e) {
                this.view.abortHandler = t => {
                    e(t)
                }
            }

            nextAction() {
                return c2d.type.isNumber(this.view.nextQueueAction) && (this.view.actionIndex = this.view.nextQueueAction), this.updateAction(), !1
            }

            updateAction() {
                const e = this.actionList[this.view.actionIndex];
                this.view.actionIndex = ++this.view.actionIndex % this.actionList.length, this.view.nextAction(e.name), this.currentData = this.storeData[e.name], this.dataIndex = 0, this.updateStore()
            }

            updateStore() {
                const e = this.currentData[this.dataIndex];
                return this.dataIndex++, e ? (this.store.setResponseToStore(e), !0) : (console.error("data is undefined.", this.dataIndex, this.currentData), !1)
            }
        };
        n = s([modifiable], n), i.Controller = n
    }, {}],
    162: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.Handler = void 0;
        let n = class extends game.sources.Handler {
            get statesConfig() {
                return {
                    Intro: {
                        check: this.checkIntro,
                        enter: this.onIntroEnter,
                        exit: this.onIntroExit,
                        begin: this.onIntroBegin
                    }, Spin: {check: this.checkSpin}, PresentDrop: {exit: this.onDropEnter}
                }
            }

            checkIntro() {
                return this.component.isShow
            }

            checkSpin() {
                return !this.isAbort && this.checkIntro()
            }

            onIntroEnter({finish: e, actions: t, abort: i}) {
                this.component.active = !0, this.isFirst = !0, this.component.build();
                this.component.updateAbortHandler(e => {
                    this.isAbort = !0, this.delay ? (this.isManualControl ? this.delay() : this.delay.progress(1), this.component.isShow || (this.isAbort = !0)) : i(), this.isManualControl = !0
                }), e()
            }

            onIntroExit({finish: e}) {
                this.component.closeIntro(!0), e(), this.component.active = !1
            }

            onIntroBegin({finish: e}) {
                const t = () => {
                    this.isAbort = this.component.nextAction(), e()
                };
                this.isAbort || this.isFirst ? (this.isFirst = !1, t()) : this.isManualControl ? this.delay = () => {
                    this.delay = null, t()
                } : this.delay = c2d.Timeout.invoke(() => {
                    this.delay = null, t()
                }, 3)
            }

            onDropEnter({finish: e}) {
                this.component.active ? (this.component.updateStore(), e()) : e()
            }
        };
        n = s([modifiable], n), i.Handler = n
    }, {}],
    163: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.Store = void 0;
        let n = class extends game.sources.Store {
            addToGlobal() {
                this.addItem("isIntro")
            }

            get isIntro() {
                return this.component.active
            }

            isShowIntro() {
                return this.getItem("showIntro")
            }

            get setShowIntro() {
                return this.getItem("setShowIntro")
            }

            setResponseToStore(e) {
                return this.getItem("setResponseToStore")(e)
            }
        };
        n = s([modifiable], n), i.Store = n
    }, {}],
    164: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.View = void 0;
        let n = class extends game.sources.FactoryView {
            build(e) {
                this.actionIndex = 0, this.abortHandler = null, this.actionList = e, this.nextQueueAction = null;
                const t = this.layers.intro;
                this.buildTree("intro_tree", t), this.addListeners()
            }

            callQueueAction(e, t) {
                const i = this.tree.nodeMap[t + "_button"];
                this.tree.nodeMap[t + "_buttonLabel"];
                if (c2d.type.isNumber(this.nextQueueAction)) {
                    const e = this.actionList[this.nextQueueAction], t = this.tree.nodeMap[e + "_button"];
                    t && (t.interactive = !0)
                }
                this.nextQueueAction = e, i.interactive = !1, this.abortHandler && this.abortHandler()
            }

            addListeners() {
                if (this.slideButtonHandler = [], this.actionList.forEach((e, t) => {
                    const i = this.callQueueAction.bind(this, t, e.name);
                    this.tree.nodeMap[e.name + "_button"].on("pointerup", i), this.slideButtonHandler.push(i)
                }), this.prevButtonHandler = () => {
                    this.actionIndex = (this.actionIndex - 2 + this.actionList.length) % this.actionList.length, this.abortHandler && this.abortHandler()
                }, this.nextButtonHandler = () => {
                    this.abortHandler && this.abortHandler()
                }, this.tree.nodeMap.touchArea) {
                    let e;
                    this.tree.nodeMap.touchArea.on("pointerdown", t => {
                        e = t.data.global.x
                    }).on("pointerup", t => {
                        e && (t.data.global.x - e > 100 ? this.prevButtonHandler() : t.data.global.x - e < -100 && this.nextButtonHandler(), e = null)
                    })
                }
                const e = this.tree.nodeMap.swipe_button_prev, t = this.tree.nodeMap.swipe_button_next;
                e && e.setHandlers(this.prevButtonHandler), t && t.setHandlers(this.nextButtonHandler)
            }

            addSpinButtonListener(e) {
                this.closeButtonHandler = () => {
                    e(), this.abortHandler && this.abortHandler(!0)
                }, this.tree.nodeMap.spinButton.addButtonListener("pointerDown", this.closeButtonHandler)
            }

            addShowToggleListener(e) {
                const t = this.tree.nodeMap.tumbler;
                this.showToggleHandler = () => {
                    const i = !(t.toggleIndex % 2);
                    e(i)
                }, t.setHandlers(this.showToggleHandler)
            }

            closeIntro() {
                this.tree && (this.tree.mainNode.destroy(), this.tree = null)
            }

            nextAction(e) {
                this.tree && (this.nextQueueAction = null, this.currentAction && (this.tree.nodeMap[this.currentAction + "_buttonLabel"].visible = !1, this.tree.nodeMap[this.currentAction + "_description"].visible = !1, this.tree.nodeMap[this.currentAction + "_button"].interactive = !0, this.tree.nodeMap[this.currentAction + "_button"].setStates("normal")), this.currentAction = e, this.tree.nodeMap[this.currentAction + "_buttonLabel"].visible = !0, this.tree.nodeMap[this.currentAction + "_description"].visible = !0, this.tree.nodeMap[this.currentAction + "_button"].interactive = !1, this.tree.nodeMap[this.currentAction + "_button"].setStates("active"))
            }

            onResizeScreen() {
                this.tree && (super.onResizeScreen(), this.updateView())
            }

            updateView() {
                if (c2d.type.isNumber(this.nextQueueAction)) {
                    this.actionList[this.nextQueueAction];
                    this.tree.nodeMap[this.queueAction + "_button"].interactive = !1
                }
                this.currentAction && (this.tree.nodeMap[this.currentAction + "_buttonLabel"].visible = !0, this.tree.nodeMap[this.currentAction + "_description"].visible = !0, this.tree.nodeMap[this.currentAction + "_button"].interactive = !1, this.tree.nodeMap[this.currentAction + "_button"].setStates("active"))
            }
        };
        n = s([modifiable], n), i.View = n
    }, {}],
    165: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("./Intro"), n = e("./IntroHandler"), o = e("./IntroStore"), r = e("./IntroController"),
            a = e("./IntroView"),
            l = {Component: s.Intro, Handler: n.Handler, Store: o.Store, Controller: r.Controller, View: a.View};
        (c2d.Logger ? c2d.Logger.Of("Intro") : console).info("component version v0.01.0"), game.componentsManager.registerComponent("Intro", l, "v0.01.0")
    }, {"./Intro": 160, "./IntroController": 161, "./IntroHandler": 162, "./IntroStore": 163, "./IntroView": 164}],
    166: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.Lines = void 0;
        const n = e("./modifications/graphics/GraphicsLinesController"),
            o = e("./modifications/graphics/GraphicsLineObjectController"),
            r = e("./modifications/graphics/GraphicsLinesView"),
            a = e("./modifications/graphics/GraphicsLineAmountView"),
            l = e("./modifications/animatedsprite/AnimatedSpriteLinesController"),
            c = e("./modifications/animatedsprite/AnimatedSpriteLinesView"),
            h = e("./modifications/animatedmesh/AnimatedMeshLinesController"),
            u = e("./modifications/animatedmesh/AnimatedMeshLinesView"),
            d = e("./modifications/spine/SpineLinesController"), p = e("./modifications/spine/SpineLinesView");
        let m = class extends game.sources.VisualComponent {
            validateSources(e) {
                const t = this.config;
                if (t.lineType) {
                    const e = t.lineType.toLowerCase();
                    "graphics" == e ? (n.graphicsLinesControllerModify(), o.graphicsLineObjectControllerModify(), r.graphicsLinesViewModify(), a.graphicsLineAmountViewModify()) : "animatedsprite" == e ? (l.animatedSpriteLinesControllerModify(), c.animatedSpriteLinesViewModify()) : "animatedmesh" == e ? (h.animatedMeshLinesControllerModify(), u.animatedMeshLinesViewModify()) : "spine" == e && (d.spineLinesControllerModify(), p.spineLinesViewModify())
                }
                return e
            }

            show() {
                this.controller.showWin(...arguments)
            }

            hide() {
                this.controller.hide(...arguments)
            }

            initLines() {
                this.controller.initLines(...arguments)
            }

            beginIdle() {
                this.controller.beginIdle(...arguments)
            }

            endIdle() {
                this.controller.endIdle(...arguments)
            }
        };
        m = s([modifiable], m), i.Lines = m
    }, {
        "./modifications/animatedmesh/AnimatedMeshLinesController": 173,
        "./modifications/animatedmesh/AnimatedMeshLinesView": 174,
        "./modifications/animatedsprite/AnimatedSpriteLinesController": 175,
        "./modifications/animatedsprite/AnimatedSpriteLinesView": 176,
        "./modifications/graphics/GraphicsLineAmountView": 177,
        "./modifications/graphics/GraphicsLineObjectController": 178,
        "./modifications/graphics/GraphicsLinesController": 179,
        "./modifications/graphics/GraphicsLinesView": 180,
        "./modifications/spine/SpineLinesController": 181,
        "./modifications/spine/SpineLinesView": 182
    }],
    167: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.LinesController = void 0;
        const n = e("./controller/LineObjectController");
        let o = class extends game.sources.Controller {
            onInitialize() {
                this.lines = [], this.symbolPoints = [], this.mergePos = [];
                const e = this.assetsStore.getConfig("reels");
                this.columnsCount = e.count, this.rowsCount = e.symbols.count, this.columnsIndent = e.indent || 0, this.rowsIndent = e.symbols.indent || 0, this.reelsPositionY = e.positionY || [], this.symbolWidth = e.symbols.width, this.symbolHeight = e.symbols.height, this.boundWidth = this.columnsCount * (this.symbolWidth + this.columnsIndent), c2d.type.isArray(this.rowsCount) ? (this.maxRows = Math.max(...this.rowsCount), this.boundHeight = this.maxRows * (this.symbolHeight + this.rowsIndent)) : (this.maxRows = this.rowsCount, this.boundHeight = this.rowsCount * (this.symbolHeight + this.rowsIndent)), this.clearRepeatList(), this.initView()
            }

            initView(e = {}) {
                const t = Object.assign({
                    symbolWidth: this.symbolWidth,
                    symbolHeight: this.symbolHeight,
                    merge: this.config.lineStyle.merge
                }, e);
                this.view.initParams(t)
            }

            initLines(e) {
                const t = this.assetsStore.getConfig("list");
                t && t.length > 0 ? this.listConfig = t.map(t => Object.assign(Object.assign({}, t), e.find(e => +e.id == +t.id))) : this.listConfig = e, this._initSymbolPoints(), this.listConfig && this._initLinesCoordinate()
            }

            _initSymbolPoints() {
                for (let e = 0; e < this.columnsCount; e++) if (this.symbolPoints[e] = [], c2d.type.isArray(this.rowsCount)) for (let t = 0; t < this.rowsCount[e]; t++) this.symbolPoints[e][t] = {
                    x: e * (this.symbolWidth + this.columnsIndent) + this.symbolWidth / 2 + this.columnsIndent / 2,
                    y: t * (this.symbolHeight + this.rowsIndent) + this.symbolHeight / 2 + this.rowsIndent / 2 + (this.reelsPositionY[e] || 0)
                }; else for (let t = 0; t < this.rowsCount; t++) this.symbolPoints[e][t] = {
                    x: e * (this.symbolWidth + this.columnsIndent) + this.symbolWidth / 2 + this.columnsIndent / 2,
                    y: t * (this.symbolHeight + this.rowsIndent) + this.symbolHeight / 2 + this.rowsIndent / 2
                }
            }

            _initLinesCoordinate() {
                Object.values(this.listConfig).forEach(e => {
                    e.coordinates ? this._changeCoordsToAbsolute(e) : e.coordinates = Object.values(e.symbols).map((e, t) => Object.assign({}, this.symbolPoints[t][e]));
                    const t = this._createLine(e);
                    this.lines[e.id] = t
                })
            }

            _changeCoordsToAbsolute(e) {
                const t = Math.min(0, ...this.reelsPositionY);
                e.coordinates = Object.values(e.coordinates).map(e => ({
                    x: e.x * this.boundWidth,
                    y: e.y * this.boundHeight + t
                }))
            }

            _createLine(e, t = {}) {
                const i = Object.assign({id: e.id, coordinates: e.coordinates, symbolPositions: e.symbols}, t),
                    s = new n.LineObjectController;
                s.initialize(i);
                const o = this.config.lineStyle.tailWidth, r = {leftTailWidth: o, rightTailWidth: o};
                return s.generateLine(r), s
            }

            showWin({data: e, amountValue: t, hasEmitter: i = !0}) {
                if (!e && t) return void this.showAmount({amountValue: t});
                let s = !1, n = !1;
                const o = Array.fromObject(e);
                o.forEach(e => {
                    let r, a = !1;
                    if (this.view.drawBorder(e.pos), "group" === e.type) {
                        const t = this._showWinGroup(e);
                        r = Object.assign({}, t)
                    } else if ("scatter" === e.type) {
                        if (this.config.scatter) {
                            n = !0;
                            const t = this._showScatters(e);
                            r = Object.assign(Object.assign({}, r), t)
                        }
                    } else if (void 0 !== e.idx) {
                        s = !0;
                        const t = Object.assign({}, this.lines[e.idx]);
                        this.updateRepeatList(t.id), this.config.inverseLine && (a = t.double = e.pos.length == this.columnsCount, a || (t.reverse = e.pos.find(({column: e}) => e === this.columnsCount - 1))), this.config.directLine && "RTL" === e.direction && (t.coordinates = [...t.coordinates].reverse());
                        const n = this._showLine(e, t);
                        r = Object.assign({}, n), i && 1 === o.length && this.showEmitter(t)
                    }
                    this.showAmount({amountValue: t, amountParam: r, isLineWin: s, isScatterWin: n, double: a})
                })
            }

            getAmountPostion(e) {
                let {column: t, row: i} = e.pos[2] || e.pos[0];
                const s = this.config.lineStyle && this.config.lineStyle.amount, n = s && s.relativeColumn;
                return n && e.pos.find(e => {
                    if (e.column == n) return t = e.column, i = e.row, !0
                }), {column: t, row: i}
            }

            _showLine(e, t) {
                this.view.drawLine(t), t.double && this.view.drawLine(Object.assign(Object.assign({}, t), {reverse: !0}));
                const {column: i, row: s} = this.getAmountPostion(e);
                return {position: this.symbolPoints[i][s]}
            }

            _showScatters(e) {
                const t = Array.fromObject(e.pos)[0], [i, s] = Array.fromObject(t);
                return {position: this.symbolPoints[i][s]}
            }

            _showWinGroup(e) {
                this.config.lineStyle.merge ? (this.mergePos = [...this.mergePos, ...e.pos], this.mergeDelay || (this.mergeDelay = c2d.Timeout.invoke(() => {
                    this._drawWinGroup(this.mergePos)
                }, 0))) : this._drawWinGroup(e.pos);
                const t = e.pos.find(({code: t}) => t === e.code), {column: i, row: s} = t || e.pos.last;
                return {position: this.symbolPoints[i][s]}
            }

            _drawWinGroup(e, t) {
                this.generateGroupCoordinate(e).forEach(e => this.view.drawLine(Object.assign({coordinates: e}, t))), this.mergeDelay = null
            }

            generateGroupCoordinate(e) {
                const t = [], i = this._generateGroupMap(e);
                let s = this._findFirstGroupSymbol(i);
                for (; s;) {
                    const e = this._generateGroupPath(i, s);
                    t.push(e), s = this._findFirstGroupSymbol(i)
                }
                return t
            }

            _generateGroupMap(e) {
                const t = 0, i = 1, s = 2, n = 3, o = [];
                return this.mergePos = e.filter(({column: e, row: r}) => {
                    if (o[e] = o[e] || [], o[e][r]) return !1;
                    o[e][r] = {};
                    const a = {
                        top: o[e][r - 1],
                        right: o[e + 1] && o[e + 1][r],
                        bottom: o[e][r + 1],
                        left: o[e - 1] && o[e - 1][r]
                    };
                    return a.top ? delete a.top[s] : o[e][r][t] = !0, a.right ? delete a.right[n] : o[e][r][i] = !0, a.bottom ? delete a.bottom[t] : o[e][r][s] = !0, a.left ? delete a.left[i] : o[e][r][n] = !0, !0
                }), o
            }

            _findFirstGroupSymbol(e) {
                let t = 0;
                for (; t < this.maxRows;) {
                    let i = 0;
                    for (; i < this.columnsCount;) {
                        const s = e[i] && e[i][t];
                        if (s && Object.keys(s).length > 0) return {column: i, row: t};
                        i++
                    }
                    t++
                }
            }

            _generateGroupPath(e, t) {
                const i = 0, s = 1, n = 2, o = 3, r = [];
                let a, l = Object.assign({}, t);
                const c = (e, {column: t, row: r}) => {
                    const a = Object.assign({}, this.symbolPoints[t][r]);
                    return e === i ? (a.x += -this.symbolWidth / 2, a.y += -this.symbolHeight / 2) : e === s ? (a.x += this.symbolWidth / 2, a.y += -this.symbolHeight / 2) : e === n ? (a.x += this.symbolWidth / 2, a.y += this.symbolHeight / 2) : e === o && (a.x += -this.symbolWidth / 2, a.y += this.symbolHeight / 2), a
                }, h = t => e[t.column][t.row], u = h(t);
                u[i] ? a = i : u[s] ? a = s : u[n] ? a = n : u[o] && (a = o), -1 === a && console.error("Start side is undefined.", t), r.push(c(a, t));
                const d = e => (e + 1) % 4,
                    p = (e, {column: t, row: r}) => e === i ? {column: t + 1, row: r} : e === s ? {
                        column: t,
                        row: r + 1
                    } : e === n ? {column: t - 1, row: r} : e === o ? {column: t, row: r - 1} : void 0, m = a,
                    f = (e, t) => e === m && t === u;
                let g;
                do {
                    g = h(l);
                    const e = a;
                    g[a] ? g[d(a)] ? (a = d(a), r.push(c(a, l))) : l = p(a, l) : (r.push(c(a, l)), a = (a + 3) % 4, l = p(a, l)), f(e, g) || delete g[e], g = h(l)
                } while (!f(a, g));
                return delete g[a], r.first.column === r.last.column && r.first.row === r.last.row || console.error("The path is not closed."), r
            }

            showEmitter(e) {
                const t = this.assetsStore.getConfig("emitter");
                t && t.showOnce && this.hasLineRepeat(e.id) || (e.double ? (this.view.showEmitter({
                    id: e.id,
                    coordinates: e.coordinates,
                    reverse: !0
                }), this.view.showEmitter({id: e.id, coordinates: e.coordinates})) : this.view.showEmitter({
                    id: e.id,
                    coordinates: e.coordinates,
                    reverse: e.reverse
                }))
            }

            showAmount({amountValue: e, amountParam: t, isLineWin: i, isScatterWin: s, double: n}) {
                if (!e) return;
                const o = this.config.amount, r = this.config.lineStyle && this.config.lineStyle.amount,
                    a = this.config.scatter && this.config.scatter.amount, l = i && r && !1 !== r.enable,
                    c = s && a && !1 === a.enable;
                if (!o && !l && !c) return;
                let h, u = t;
                if (o && (h = "default", u = Object.assign(Object.assign({}, t), o)), i && r) {
                    if (!1 === r.enable) return;
                    h = "line", u = Object.assign(Object.assign({}, u), r), "line" == r.relative && (u.position = t.position)
                } else if (s && a) {
                    if (!1 === a.enable) return;
                    h = "scatter", u = Object.assign(Object.assign({}, t), a)
                }
                this.view.showAmount(h, e, u, n)
            }

            hide() {
                this.mergePos = [], this.view.clear()
            }

            beginIdle() {
                this.hide(), this.clearRepeatList()
            }

            endIdle() {
                this.hide()
            }

            updateRepeatList(e) {
                this.repeatLineList[e] ? this.repeatLineList[e]++ : this.repeatLineList[e] = 1
            }

            clearRepeatList() {
                this.repeatLineList = []
            }

            hasLineRepeat(e) {
                return this.repeatLineList[e] > 1
            }
        };
        o = s([modifiable], o), i.LinesController = o
    }, {"./controller/LineObjectController": 171}],
    168: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.LinesHandler = void 0;
        let n = class extends game.sources.Handler {
            get statesConfig() {
                return {
                    Start: {enter: this.onStart},
                    Init: {exit: this.onInitExit},
                    Intro: {enter: this.onIntroEnter, begin: this.onIntroBegin, exit: this.onIntroExit},
                    Replay: {enter: this.onReplayEnter, begin: this.onIdleBegin, exit: this.onReplayExit},
                    Gifts: {begin: this.onIdleBegin},
                    Idle: {begin: this.onIdleBegin},
                    Spin: {enter: this.onSpinEnter},
                    ShowAllLines: {
                        check: this.hasShowAllLines,
                        enter: this.onShowAllLinesEnter,
                        exit: this.onShowAllLinesExit
                    },
                    ShowSingleLines: {enter: this.onIdleBegin}
                }
            }

            onStart({finish: e, actions: t}) {
                e();
                return {
                    actions: {
                        changeBet: () => {
                            this.component.hide()
                        }
                    }
                }
            }

            onInitExit({finish: e}) {
                const t = this.component.store.getLinesData();
                this.component.initLines(t), e()
            }

            onIntroEnter({finish: e}) {
                return this.isAbort = !1, e(), {onAbort: () => this.onAbort()}
            }

            onAbort() {
                this.isAbort || (this.isAbort = !0)
            }

            onIntroBegin({finish: e}) {
                this.isAbort = !1, e()
            }

            onIntroExit({finish: e}) {
                this.isAbort = !1, this.component.hide(), e()
            }

            onReplayEnter({finish: e}) {
                return this.isAbort = !1, e(), {onAbort: () => this.onAbort()}
            }

            onReplayExit({finish: e}) {
                this.isAbort = !1, e()
            }

            onIdleBegin({finish: e}) {
                this.component.beginIdle(), e();
                return {
                    actions: {
                        showNextLine: e => {
                            this.component.hide();
                            const t = this.component.store.isIntro ? null : e.amount;
                            e && this.component.show({data: [e], amountValue: t})
                        }
                    }, onFinish: () => {
                        this.component.endIdle()
                    }
                }
            }

            onShowAllLinesExit({finish: e}) {
                this.component.hide(), e()
            }

            onSpinEnter({finish: e}) {
                this.component.hide(), e()
            }

            hasShowAllLines() {
                if (this.isAbort) return !1;
                if (!this.config.showAllLines) return !1;
                const e = this.component.store.getUpdateWins();
                return e && e.length > 0
            }

            onShowAllLinesEnter({finish: e}) {
                if (!this.isAbort) return this.config.showAllLines.showTotalAmount && !this.component.store.hasCelebration() && this._showAmount(), e(), {
                    actions: {
                        showAllLine: this._showAllLine.bind(this),
                        showNextLine: this._showNextLine.bind(this)
                    }, onFinish: () => {
                        this.config.showAllLines.hideAfterAll && this.component.hide()
                    }
                };
                e()
            }

            _showAmount() {
                if (this.component.store.isIntro) return;
                const e = this.component.store.getWins().total;
                this.component.show({amountValue: e})
            }

            _showAllLine(e) {
                const t = !(e.length > 1);
                this.component.show({data: e, hasEmitter: t})
            }

            _showNextLine(e) {
                let t;
                !this.component.store.isIntro && this.config.showAllLines.showSingleAmounts && (t = e.amount);
                const i = 1 == this.component.store.getUpdateWins().length;
                this.component.show({data: [e], amountValue: t, hasEmitter: i})
            }

            sendRewardShowEvent(e) {
                if ("totalWin" === e.type) {
                    const t = this.component.store.getItem("multiplier");
                    t && (e.multiplier = t, e.multiplier > 1 && (e.type = "multiplierTowalWin"))
                }
                this.events.emit(this.events.config.COMPONENTS_REWARD_SHOW, e)
            }

            sendRewardHideEvent() {
                this.events.emit(this.events.config.COMPONENTS_REWARD_HIDE)
            }
        };
        n = s([modifiable], n), i.LinesHandler = n
    }, {}],
    169: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.LinesStore = void 0;
        let n = class extends game.sources.Store {
            getLinesData() {
                const e = this.getItem("directory");
                return e && e.lines ? Object.keys(e.lines).map(t => ({
                    id: t,
                    symbols: Array.fromObject(e.lines[t])
                })) : null
            }

            getWins() {
                return this.getItem("wins")
            }

            getUpdateWins() {
                return this.getItem("refactorWins")
            }

            hasCelebration() {
                return this.getItem("hasCelebration")
            }

            get isIntro() {
                return this.getItem("isIntro")
            }
        };
        n = s([modifiable], n), i.LinesStore = n
    }, {}],
    170: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        }, n = this && this.__rest || function (e, t) {
            var i = {};
            for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (i[s] = e[s]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var n = 0;
                for (s = Object.getOwnPropertySymbols(e); n < s.length; n++) t.indexOf(s[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[n]) && (i[s[n]] = e[s[n]])
            }
            return i
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.LinesView = void 0;
        let o = class extends game.sources.View {
            constructor(e) {
                super(e), this.initVars()
            }

            initVars() {
                this.amountsOptions = {}, this.amounts = {}, this.activeAmounts = [], this.emittersPool = [], this.emittersActive = [], this.emitterTween = []
            }

            initParams({symbolWidth: e, symbolHeight: t, merge: i}) {
                this.symbolWidth = e, this.symbolHeight = t, this.merge = i, this.emitterConfig = this.assetsStore.getConfig("emitter"), this.addLayers(), this.initBorder(), this.initAmount()
            }

            addLayers() {
                this.lineLayer = new c2d.display.Container, this.lineLayer.name = "line_view", this.layers.lines.addChild(this.lineLayer)
            }

            initBorder() {
                this.borderConfig = this.assetsStore.getConfig("border"), this.borderConfig && (this.bordersPool = [], this.activeBorders = [])
            }

            createBorder() {
                const e = this.getSkeleton(this.borderConfig.skeleton), t = new c2d.display.Spine(e);
                t.name = "border", t.visible = !1, this.bordersPool.push(t), this.layers.borders.addChild(t)
            }

            drawBorder(e) {
                this.borderConfig && e.forEach(({column: e, row: t}, i) => {
                    0 === this.bordersPool.length && this.createBorder();
                    const s = this.bordersPool.pop();
                    this.activeBorders.push(s), s.visible = !0;
                    const n = s.spineData.animations.first.name, o = {
                            speed: this.borderConfig.speed,
                            loop: this.borderConfig.loop,
                            force: this.borderConfig.loop
                        }, r = this.symbolWidth / 2 + this.symbolWidth * e,
                        a = this.symbolHeight / 2 + this.symbolHeight * t;
                    s.position.set(r, a), s.play(n, o)
                })
            }

            createEmitter() {
                const e = this.assetsStore.getTexturesPack(this.emitterConfig.prefix),
                    t = new c2d.display.Emitter(e, this.emitterConfig.particles);
                t.name = "lines_emitter", t.tween.settings = this.emitterConfig.tween, this.layers.lines.addChild(t), this.emittersPool.push(t)
            }

            initAmount(e = {}) {
                const t = this.config.lineStyle && this.config.lineStyle.amount,
                    i = this.config.scatter && this.config.scatter.amount,
                    s = Object.assign(Object.assign({}, e), this.config.amount);
                this.config.amount && this.createAmount("default", s), t && !1 !== t.enable && this.createAmount("line", Object.assign(Object.assign({}, s), t)), i && !1 !== i.enable && this.createAmount("scatter", Object.assign(Object.assign({}, s), i))
            }

            createAmount(e, t) {
                t && (this.amountsOptions[e] = t), this.amounts[e] = this.amounts[e] || [];
                const i = new this.classes.LineAmountView;
                i.initialize(this.amountsOptions[e], this.assetsStore), i.returnToPool = () => {
                    this.layers.amount.removeChild(i), i.timeline && i.timeline.pause(), i.visible = !1, this.amounts[e].push(i)
                }, i.returnToPool()
            }

            drawLine({id: e, coordinates: t}) {
                t.reduce((e, i, s) => {
                    const n = t[s + 1];
                    return this.drawLineToPoint(e, i, n), i
                }, null)
            }

            showEmitter({id: e, coordinates: t, reverse: i}) {
                if (!this.emitterConfig) return;
                i && (e = "r" + e), this.emittersPool.length || this.createEmitter();
                const s = this.emittersPool.pop(), o = [...t];
                i && o.reverse();
                const r = o.shift(), a = s.tween.settings, {duration: l, timeResolution: c = 6, curviness: h = 0} = a,
                    u = n(a, ["duration", "timeResolution", "curviness"]), d = Object.assign({
                        paused: !0,
                        bezier: {type: "thruBasic", values: o, timeResolution: c, curviness: h},
                        onComplete: () => s.enableEmit = !1
                    }, u), p = c2d.Tween.fromTo(s._emitter.spawnPos, l, r, d);
                this.emitterTween.push(p), p.play(), s.enableEmit = !0, this.emittersActive.push(s)
            }

            showAmount(e, t, i, s) {
                if (!this.amounts[e]) return;
                0 === this.amounts[e].length && this.createAmount(e);
                const n = this.amounts[e].pop();
                if (this.layers.amount.addChild(n), this.config.useRewardEvents) {
                    const s = "line" === e ? "lineAnimation" : "totalWin";
                    return void this.component.handler.sendRewardShowEvent({type: s, value: t, position: i.position})
                }
                const {x: o, y: r} = i.position || {x: 0, y: 0};
                n.position.set(o, r), n.text = t, n.setColor(i.textColor);
                const a = n.options.scale || {x: 1, y: 1};
                s ? n.scale.set(1.5 * a.x, 1.5 * a.y) : n.scale.copyFrom(a), n.visible = !0, n.timeline && n.timeline.restart(), this.activeAmounts.push(n)
            }

            drawLineToPoint(e, t, i) {
            }

            clear() {
                for (this.config.useRewardEvents && this.component.handler.sendRewardHideEvent(); this.activeAmounts.length;) this.activeAmounts.pop().returnToPool();
                for (; this.emitterTween.length;) this.emitterTween.pop().pause();
                for (; this.emittersActive.length;) {
                    const e = this.emittersActive.pop();
                    e.enableEmit = !1, this.emittersPool.push(e)
                }
                if (this.borderConfig) for (; this.activeBorders.length;) {
                    const e = this.activeBorders.pop();
                    e.currentTime = 0, e.pause(), e.visible = !1, this.bordersPool.push(e)
                }
            }
        };
        o = s([modifiable], o), i.LinesView = o
    }, {}],
    171: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.LineObjectController = void 0;
        let n = class {
            initialize({id: e, coordinates: t}) {
                this.id = e, this.coordinates = t
            }

            generateLine({leftTailWidth: e, rightTailWidth: t}) {
                e && this.coordinates.unshift({
                    x: this.coordinates.first.x - e,
                    y: this.coordinates.first.y
                }), t && this.coordinates.push({x: this.coordinates.last.x + t, y: this.coordinates.last.y})
            }
        };
        n = s([modifiable], n), i.LineObjectController = n
    }, {}],
    172: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("./Lines"), n = e("./LinesHandler"), o = e("./LinesStore"), r = e("./LinesController"),
            a = e("./LinesView"), l = e("./controller/LineObjectController"), c = e("./view/LineAmountView"),
            h = e("./view/LineMarkerView"), u = {
                LineObjectController: l.LineObjectController,
                LineAmountView: c.LineAmountView,
                LineMarkerView: h.LineMarkerView
            }, d = {
                Component: s.Lines,
                Handler: n.LinesHandler,
                Store: o.LinesStore,
                Controller: r.LinesController,
                View: a.LinesView,
                classes: u
            };
        (c2d.Logger ? c2d.Logger.Of("Lines") : console).info("component version v0.01.0"), game.componentsManager.registerComponent("Lines", d, "v0.01.0")
    }, {
        "./Lines": 166,
        "./LinesController": 167,
        "./LinesHandler": 168,
        "./LinesStore": 169,
        "./LinesView": 170,
        "./controller/LineObjectController": 171,
        "./view/LineAmountView": 183,
        "./view/LineMarkerView": 184
    }],
    173: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.animatedMeshLinesControllerModify = void 0;
        const s = e("../../LinesController").LinesController;
        i.animatedMeshLinesControllerModify = function () {
            class e extends s.Latest {
                initLines(e) {
                    super.initLines(e), this.lines.length > 0 ? this.view.meshPoints = this.lines.first.coordinates : this.view.meshPoints = [{
                        x: 0,
                        y: 0
                    }, {x: this.boundWidth, y: 0}], this.view.createSegments(1)
                }
            }

            s.modify(e)
        }
    }, {"../../LinesController": 167}],
    174: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.animatedMeshLinesViewModify = void 0;
        const s = e("../../LinesView").LinesView;
        i.animatedMeshLinesViewModify = function () {
            class e extends s.Latest {
                initVars() {
                    super.initVars(), this.segmentPool = [], this.activeSegment = [], this.calculatePool = {}, this._meshPoints = []
                }

                initParams(e) {
                    const t = this.config.lineStyle;
                    this.segmentTextures = this.assetsStore.getTexturesPack(t.textures), this.blend = t.blend, this.segmentTail = t.segmentTailWidth, this.animationSpeed = t.speed, this.animationLoop = t.loop, super.initParams(e)
                }

                set meshPoints(e) {
                    const t = e.first.x, i = (e.last.x - t) / 100;
                    for (let e = 0; e < 100; e++) this._meshPoints.push({x: i * e, y: 0})
                }

                createSegments(e = 1) {
                    const t = {speed: this.animationSpeed, loop: this.animationLoop};
                    for (let i = 0; i < e; i++) {
                        const e = new c2d.display.AnimatedMesh(this.segmentTextures, this._meshPoints, t);
                        this.blend && (e.blendMode = this.blend), e.visible = !1, this.segmentPool.push(e), this.lineLayer.addChild(e)
                    }
                }

                drawLine({id: e = null, coordinates: t}) {
                    0 === this.segmentPool.length && this.createSegments();
                    const i = this.segmentPool.pop();
                    if (i.position.set(0), i.points[0].copyFrom(t.first), null !== e && this.calculatePool[e]) {
                        this.calculatePool[e].forEach((e, t) => {
                            i.points[t + 1].set(...e)
                        })
                    } else {
                        const s = t.map(e => ({x: e.x - i.x, y: e.y - i.y})), n = s.shift(),
                            o = {bezier: {values: s, curviness: 1}, paused: !0}, r = c2d.Tween.to(n, 1, o), a = [],
                            l = i.points.length;
                        for (let e = 1; e < l; e++) r.progress(e / (l - 1)), i.points[e].copyFrom(n), a.push([n.x, n.y]);
                        null !== e && (this.calculatePool[e] = a)
                    }
                    i.visible = !0, i.play(), this.activeSegment.push(i)
                }

                clear() {
                    for (super.clear(); this.activeSegment.length;) {
                        const e = this.activeSegment.pop();
                        e.stop(), e.visible = !1, e.position.set(0), this.segmentPool.push(e)
                    }
                }
            }

            s.modify(e)
        }
    }, {"../../LinesView": 170}],
    175: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.animatedSpriteLinesControllerModify = void 0;
        const s = e("../../LinesController").LinesController;
        i.animatedSpriteLinesControllerModify = function () {
            class e extends s.Latest {
                initLines(e) {
                    super.initLines(e);
                    const t = Object.values(this.lines).reduce((e, t) => e < t.coordinates.length ? t.coordinates.length : e, 0);
                    this.view.createSegments(t)
                }
            }

            s.modify(e)
        }
    }, {"../../LinesController": 167}],
    176: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.animatedSpriteLinesViewModify = void 0;
        const s = e("../../LinesView").LinesView;
        i.animatedSpriteLinesViewModify = function () {
            class e extends s.Latest {
                initVars() {
                    super.initVars(), this.segmentPool = [], this.activeSegment = [], this.tweens = []
                }

                initParams(e) {
                    const t = this.config.lineStyle;
                    this.segmentTextures = this.assetsStore.getTexturesPack(t.textures), this.segmentTail = t.segmentTailWidth, this.animationDelay = t.delay || 0, this.animationSpeed = t.speed, this.animationLoop = t.loop, super.initParams(e)
                }

                createSegments(e = 1, t = "") {
                    const i = this.config.lineStyle;
                    for (let t = 0; t < e; t++) {
                        const e = new c2d.display.AnimatedSprite(this.segmentTextures, this.animationSpeed, this.animationLoop);
                        e.anchor.set(0, .5), e.visible = !1, i.blendMode && (e.blendMode = PIXI.BLEND_MODES[i.blendMode]), this.segmentPool.push(e), this.lineLayer.addChild(e)
                    }
                }

                drawLine(e) {
                    const {id: t, coordinates: i} = e;
                    if (this.animationDelay) {
                        const e = new c2d.Timeline;
                        this.tweens.push(e), i.reduce((t, s, n) => {
                            const o = i[n + 1];
                            if (t) {
                                const i = n * this.animationDelay * .001, r = [t, s, o];
                                e.call(this.drawLineToPoint, r, this, i)
                            }
                            return s
                        }, null)
                    } else super.drawLine(e)
                }

                drawLineToPoint(e, t, i) {
                    if (!e) return;
                    0 === this.segmentPool.length && this.createSegments();
                    const s = this.segmentPool.pop();
                    if (this.segmentTail) {
                        const i = c2d.geom.Point.distance(e, t), n = this.segmentTail / i;
                        s.position.copyFrom({
                            x: e.x - (t.x - e.x) * n,
                            y: e.y - (t.y - e.y) * n
                        }), s.scaleX = (c2d.geom.Point.distance(e, t) + 2 * this.segmentTail) / s.width
                    } else s.position.copyFrom(e), s.scaleX = c2d.geom.Point.distance(e, t) / s.width;
                    s.rotation = Math.atan((t.y - e.y) / (t.x - e.x)), t.x < e.x && (s.rotation += Math.PI), s.visible = !0, s.play(), this.activeSegment.push(s)
                }

                clear() {
                    for (super.clear(); this.tweens.length;) {
                        this.tweens.pop().kill()
                    }
                    for (; this.activeSegment.length;) {
                        const e = this.activeSegment.pop();
                        e.stop(), e.visible = !1, e.scaleX = 1, e.rotation = 0, e.position.set(0), this.segmentPool.push(e)
                    }
                }
            }

            s.modify(e)
        }
    }, {"../../LinesView": 170}],
    177: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.graphicsLineAmountViewModify = void 0;
        const s = e("../../view/LineAmountView").LineAmountView;
        i.graphicsLineAmountViewModify = function () {
            return class extends s.Latest {
                buildLayers() {
                    this.shadow = new c2d.display.Graphics, this.shadow.name = "amount_shadow", this.bg = new c2d.display.Graphics, this.bg.name = "amount_background";
                    const e = new PIXI.filters.BlurFilter;
                    e.blur = 2, this.shadow.filters = [e], this.addChild(this.shadow), this.addChild(this.bg), super.buildLayers()
                }

                clear() {
                    this.shadow.clear(), this.bg.clear()
                }

                updateBack(e) {
                    if (this.fill && this.bg.beginFill(this.fill), this.border && c2d.type.isNumber(this.borderSize)) {
                        const t = [this.borderSize, e.borderColor, this.lineAlpha];
                        this.bg.lineStyle(...t)
                    } else this.bg.lineStyle(null, null, null);
                    if (this.border && c2d.type.isNumber(this.borderShadowSize)) {
                        const t = [this.borderShadowSize, e.borderShadowColor, this.lineAlpha];
                        this.shadow.lineStyle(...t)
                    } else this.shadow.lineStyle(null, null, null);
                    const t = this.padding ? this.padding : {x: 0, y: 0},
                        i = e.position.x - this.pivot.x - this.textLayer.width / 2 - t.x,
                        s = e.position.y - this.pivot.y - this.textLayer.height / 2 - t.y,
                        n = this.textLayer.width + 2 * t.x, o = this.textLayer.height + 2 * t.y;
                    this._drawRect(i, s, n, o), this.bg.endFill()
                }

                _drawRect(e, t, i, s) {
                    this.bg.drawRect(Math.floor(e), Math.floor(t), Math.floor(i), Math.floor(s)), this.shadow && this.shadow.drawRect(Math.floor(e), Math.floor(t), Math.floor(i), Math.floor(s))
                }
            }
        }
    }, {"../../view/LineAmountView": 183}],
    178: [function (e, t, i) {
        "use strict";
        var s = this && this.__rest || function (e, t) {
            var i = {};
            for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (i[s] = e[s]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var n = 0;
                for (s = Object.getOwnPropertySymbols(e); n < s.length; n++) t.indexOf(s[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[n]) && (i[s[n]] = e[s[n]])
            }
            return i
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.graphicsLineObjectControllerModify = void 0;
        const n = e("../../controller/LineObjectController").LineObjectController;
        i.graphicsLineObjectControllerModify = function () {
            class e extends n.Latest {
                initialize(e) {
                    const {color: t, shadowColor: i, symbolPositions: n, showHoles: o} = e,
                        r = (s(e, ["color", "shadowColor", "symbolPositions", "showHoles"]), super.initialize(e));
                    return this.color = t, this.shadowColor = i, this.symbolPositions = n, this.showHoles = o, this.symbolCoordinates = [], r
                }

                generateSymbolPoints({width: e, height: t, symbolPoints: i}) {
                    this.symbolPositions.forEach((s, n) => {
                        this.symbolCoordinates[n] || (this.symbolCoordinates[n] = []);
                        const o = i[n][s], r = {};
                        let a, l, c, h, u;
                        if (this.coordinates.some((i, s) => {
                            if (i.x > o.x - e / 2) {
                                if (u = s, s > 0 && (a = this.coordinates[s - 1]), i.x < o.x + e / 2) l = i; else {
                                    if (!a) return !0;
                                    l = this._findIntersectionPoint(a, i, o, e, t)
                                }
                                return !0
                            }
                        }), void 0 === u || !l) return;
                        const d = [...this.coordinates.slice(u)];
                        d.some((t, i) => {
                            if (t.x > o.x + e / 2) return c = i > 0 ? d[i - 1] : l, h = t, !0
                        }), a && (a.y === l.y ? r.input = {
                            x: o.x - e / 2,
                            y: l.y
                        } : r.input = this._findCollisionPoint(a, l, o, e, t)), h && (c.y === h.y ? r.output = {
                            x: o.x + e / 2,
                            y: c.y
                        } : r.output = this._findCollisionPoint(h, c, o, e, t)), this.symbolCoordinates[n][s] = r
                    })
                }

                getPathWithSymbols(e) {
                    const t = this.coordinates, i = [];
                    let s = [];
                    s = Array.fromObject(e).map(e => {
                        const {column: t, row: i} = e;
                        return this.symbolCoordinates[t][i]
                    }).filter(e => e).reverse();
                    let n = [], o = 0;
                    for (; o < t.length;) if (0 !== s.length) if (s.last.input && t[o].x < s.last.input.x) n.push(t[o]), o++; else {
                        if (s.last.input && (n.push(s.last.input), i.push(n), n = []), !s.last.output) break;
                        for (; o < t.length && t[o].x < s.last.output.x;) o++;
                        n.push(s.last.output), s.pop()
                    } else n.push(t[o]), o++;
                    return i.push(n), i
                }

                _findIntersectionPoint(e, t, i, s, n) {
                    const o = Math.abs(t.y - i.y);
                    if (e.y === t.y && o < n / 2) return {x: i.x, y: t.y};
                    {
                        let o;
                        o = e.y > t.y ? [{x: i.x - s / 2, y: i.y - n / 2}, {
                            x: i.x + s / 2,
                            y: i.y + n / 2
                        }] : [{x: i.x - s / 2, y: i.y + n / 2}, {x: i.x + s / 2, y: i.y - n / 2}];
                        const r = e.x, a = e.y, l = t.x, c = t.y, h = o[0].x, u = o[0].y, d = o[1].x, p = o[1].y,
                            m = l - r, f = d - h, g = p - u;
                        let b = (c - a) * f - g * m;
                        if (!b || !f) return;
                        let y = h * p - u * d;
                        if (b = ((r * c - a * l) * f - y * m) / b, y = (g * b - y) / f, (r <= b && l >= b || l <= b && r >= b) && (h <= b && d >= b || d <= b && h >= b)) return {
                            x: b,
                            y: y
                        }
                    }
                }

                _findCollisionPoint(e, t, i, s, n) {
                    const o = Math.abs(e.x - t.x), r = Math.abs(e.y - t.y);
                    let a, l;
                    a = e.x < i.x ? s - (i.x + s / 2 - t.x) : s - (t.x - (i.x - s / 2)), l = e.y < i.y ? n - (i.y + n / 2 - t.y) : n - (t.y - (i.y - n / 2));
                    const c = (o - a) / o, h = (r - l) / r, u = Math.max(c, h);
                    return {x: (e.x - t.x) * (1 - u) + t.x, y: (e.y - t.y) * (1 - u) + t.y}
                }
            }

            n.modify(e)
        }
    }, {"../../controller/LineObjectController": 171}],
    179: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.graphicsLinesControllerModify = void 0;
        const s = e("../../LinesController").LinesController;
        i.graphicsLinesControllerModify = function () {
            class e extends s.Latest {
                _createLine(e, t = {}) {
                    e.showHoles = e.showHoles || this.config.lineStyle.showHoles, e.color = e.color || this.config.lineStyle.color || Math.randomColor(), e.shadowColor = e.shadowColor || this.config.lineStyle.shadowColor || "0x000000";
                    const i = Object.assign({color: e.color, shadowColor: e.shadowColor, showHoles: e.showHoles}, t),
                        s = super._createLine(e, i);
                    if (this.config.lineStyle.showHoles) {
                        const e = {width: this.symbolWidth, height: this.symbolHeight, symbolPoints: this.symbolPoints};
                        s.generateSymbolPoints(e)
                    }
                    return e.marker && this._createMarkers(e.marker, s), s
                }

                _createMarkers(e, t) {
                    const i = this.assetsStore.getConfig("markers");
                    let s, n;
                    e.left && (s = Object.assign(Object.assign({
                        textColor: t.color,
                        sideName: i.sideNames.left
                    }, i.style), e.left)), e.right && (n = Object.assign(Object.assign({
                        textColor: t.color,
                        sideName: i.sideNames.right
                    }, i.style), e.right)), this.view.createMarker(s, n, t)
                }

                _showLine(e, t) {
                    let i;
                    if (t.showHoles && e.pos) {
                        t.getPathWithSymbols(e.pos).forEach(e => {
                            if (e.length > 1) {
                                const i = {id: t.id, coordinates: e, color: t.color, shadowColor: t.shadowColor};
                                this.view.drawLine(i)
                            }
                        }), Array.fromObject(e.pos).forEach((e, s) => {
                            const {column: n, row: o} = e, r = this.symbolPoints[n][o];
                            this.view.showSymbol(r, t.color, t.shadowColor), 0 === s && (i = r)
                        })
                    } else {
                        const s = {id: t.id, coordinates: t.coordinates, color: t.color, shadowColor: t.shadowColor};
                        this.view.drawLine(s);
                        const {column: n, row: o} = this.getAmountPostion(e);
                        i = this.symbolPoints[n][o]
                    }
                    return {textColor: t.color, borderColor: t.color, borderShadowColor: t.shadowColor, position: i}
                }

                _showScatters(e) {
                    const t = this.config.scatter, i = t.color || this.config.color || Math.randomColor();
                    t.showHoles && Array.fromObject(e.pos).forEach((e, s) => {
                        const [n, o] = Array.fromObject(e), r = this.symbolPoints[n][o];
                        this.view.showSymbol(r, i, t.shadowColor)
                    });
                    const s = Array.fromObject(e.pos)[0], [n, o] = Array.fromObject(s), r = this.symbolPoints[n][o];
                    return {textColor: i, borderColor: i, borderShadowColor: t.shadowColor, position: r}
                }

                _showWinGroup(e) {
                    const t = this.config.lineStyle.color || Math.randomColor(), i = this.config.lineStyle.shadowColor;
                    this.config.lineStyle.merge ? (this.mergePos = [...this.mergePos, ...e.pos], this.mergeDelay || (this.mergeDelay = c2d.Timeout.invoke(() => {
                        this.view.clearGraphics(), this._drawWinGroup(this.mergePos, {color: t, shadowColor: i})
                    }, 0))) : this._drawWinGroup(e.pos, {color: t, shadowColor: i});
                    const s = e.pos.find(({code: t}) => t === e.code), {column: n, row: o} = s || e.pos.last,
                        r = this.symbolPoints[n][o];
                    return {textColor: t, borderColor: t, borderShadowColor: i, position: r}
                }

                showAllLines(e) {
                    this.lines.forEach(e => {
                        const t = {id: e.id, coordinates: e.coordinates, color: e.color};
                        this.view.drawLine(t)
                    })
                }
            }

            s.modify(e)
        }
    }, {"../../LinesController": 167}],
    180: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.graphicsLinesViewModify = void 0;
        const s = e("../../LinesView"), n = e("../../view/LineMarkerView"), o = s.LinesView;
        i.graphicsLinesViewModify = function () {
            class e extends o.Latest {
                initParams(e) {
                    const t = this.config.lineStyle;
                    this.lineSize = t.lineSize, this.shadowSize = t.shadowSize, this.lineCurvature = t.lineCurvature, this.alpha = t.alpha, this.lineAlpha = t.lineAlpha, this.fillAlpha = t.fillAlpha, super.initParams(e)
                }

                addLayers() {
                    if (super.addLayers(), this.shadowSize) {
                        this.shadowSize += this.lineSize, this.shadow = new c2d.display.Graphics, this.shadow.name = "line_shadow", this.lineLayer.addChild(this.shadow);
                        const e = new PIXI.filters.BlurFilter;
                        e.blur = 2, this.shadow.filters = [e]
                    }
                    this.graphics = new c2d.display.Graphics, this.graphics.name = "line_graphics", this.graphics.alpha = this.alpha, this.lineLayer.addChild(this.graphics), this.markerLayer = new c2d.display.Container, this.markerLayer.name = "marker", this.layers.lines.addChild(this.markerLayer)
                }

                initAmount(e = {}) {
                    const t = this.config.lineStyle,
                        i = Object.assign({borderSize: t.size, borderShadowSize: t.shadowSize}, e);
                    super.initAmount(i)
                }

                createMarker(e, t, i) {
                    i.markers = [];
                    const s = (e, t) => {
                        const s = new n.LineMarkerView;
                        s.initialize(e, this.assetsStore), s.position.copyFrom(t), s.updateTextures(i.id, e.sideName), s.onPointOver(() => {
                            this.clear();
                            const e = {
                                id: i.id,
                                coordinates: i.coordinates,
                                color: i.color,
                                shadowColor: i.shadowColor
                            };
                            this.drawLine(e)
                        }), s.onPointOut(() => {
                            this.clear()
                        }), i.markers.push(s), this.markerLayer.addChild(s)
                    };
                    e && s(e, i.coordinates.first), t && s(t, i.coordinates.last)
                }

                drawLine(e) {
                    const {id: t, coordinates: i, color: s, shadowColor: n} = e;
                    this.fillAlpha && (this.graphics.endFill(), this.graphics.beginFill(s, this.fillAlpha)), this.lineAlpha && this.graphics.lineStyle(this.lineSize, s, this.lineAlpha), this.shadow && this.shadow.lineStyle(this.shadowSize, n, this.lineAlpha), i.first.x == i.last.x && i.first.y == i.last.y && (i.first.x = i.first.x + (i[1].x - i.first.x) / 2, i.first.y = i.first.y + (i[1].y - i.first.y) / 2, i.push(Object.assign({}, i.first))), super.drawLine(e)
                }

                showSymbol(e, t, i) {
                    this.lineAlpha && this.graphics.lineStyle(this.lineSize, t, this.lineAlpha), this.shadow && this.shadow.lineStyle(this.shadowSize, i, this.lineAlpha);
                    const s = e.x - this.symbolWidth / 2, n = e.y - this.symbolHeight / 2, o = this.symbolWidth,
                        r = this.symbolHeight;
                    this._drawRect(s, n, o, r)
                }

                showAmount(e, t, i, s) {
                    const n = super.showAmount(e, t, i, s);
                    n && n.updateBack(i)
                }

                drawLineToPoint(e, t, i) {
                    if (!e) return void this._moveTo(t);
                    const s = c2d.geom.Point.distance(e, t);
                    let n = this.lineCurvature > s ? s : this.lineCurvature;
                    if (n && i) {
                        const e = c2d.geom.Point.distance(t, i);
                        n = n > e ? e : n
                    }
                    if (!n || !i || e.y === t.y && t.y == i) this._lineTo(t); else {
                        let o, r;
                        if (e.y === t.y) {
                            const i = e.x < t.x ? -1 : 1;
                            o = {x: t.x + n * i, y: t.y}
                        } else {
                            const i = n / s;
                            o = {x: (t.x - e.x) * (1 - i) + e.x, y: (t.y - e.y) * (1 - i) + e.y}
                        }
                        if (t.y === i.y) {
                            const e = t.x < i.x ? 1 : -1;
                            r = {x: t.x + n * e, y: t.y}
                        } else {
                            const e = n / c2d.geom.Point.distance(t, i);
                            r = {x: (i.x - t.x) * e + t.x, y: (i.y - t.y) * e + t.y}
                        }
                        this._lineTo(o), this._bezierCurveTo(t, r)
                    }
                }

                _moveTo(e) {
                    const t = [Math.floor(e.x), Math.floor(e.y)];
                    this.graphics.moveTo(...t), this.shadow && this.shadow.moveTo(...t)
                }

                _lineTo(e) {
                    const t = [Math.floor(e.x), Math.floor(e.y)];
                    this.graphics.lineTo(...t), this.shadow && this.shadow.lineTo(...t)
                }

                _bezierCurveTo(e, t) {
                    const i = [Math.floor(e.x), Math.floor(e.y), Math.floor(t.x), Math.floor(t.y)];
                    this.graphics.quadraticCurveTo(...i), this.shadow && this.shadow.quadraticCurveTo(...i)
                }

                _drawRect(e, t, i, s) {
                    const n = [Math.floor(e), Math.floor(t), Math.floor(i), Math.floor(s)];
                    this.graphics.drawRect(...n), this.shadow && this.shadow.drawRect(...n)
                }

                clear() {
                    super.clear(), this.graphics.clear(), this.graphics.alpha = this.alpha, this.shadow && this.shadow.clear()
                }

                clearGraphics() {
                    this.graphics.clear()
                }
            }

            o.modify(e)
        }
    }, {"../../LinesView": 170, "../../view/LineMarkerView": 184}],
    181: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.spineLinesControllerModify = void 0;
        const s = e("../../LinesController").LinesController;
        i.spineLinesControllerModify = function () {
            class e extends s.Latest {
                initLines(e) {
                    super.initLines(e);
                    const t = Object.values(this.lines).reduce((e, t) => e < t.coordinates.length ? t.coordinates.length : e, 0);
                    this.view.createSegments(t)
                }
            }

            s.modify(e)
        }
    }, {"../../LinesController": 167}],
    182: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.spineLinesViewModify = void 0;
        const s = e("../../LinesView").LinesView;
        i.spineLinesViewModify = function () {
            class e extends s.Latest {
                initVars() {
                    super.initVars(), this.segmentPool = [], this.activeSegment = [], this.tweens = []
                }

                initParams(e) {
                    const t = this.config.lineStyle;
                    this.skeleton = this.assetsStore.getSkeleton(t.spine), this.segmentTail = t.segmentTailWidth, this.animationSpeed = t.speed, this.animationLoop = t.loop, this.animationDelay = t.delay || 0, this.alphaTime = t.alphaTime || 0, super.initParams(e)
                }

                createSegments(e = 1) {
                    for (let t = 0; t < e; t++) {
                        const e = new c2d.display.Spine(this.skeleton);
                        e.name = "line" + t, e.visible = !1, this.segmentPool.push(e), this.lineLayer.addChild(e)
                    }
                }

                drawLine(e) {
                    const {id: t, reverse: i, double: s} = e;
                    let {coordinates: n} = e;
                    if (this.animationDelay) {
                        const e = new c2d.Timeline;
                        this.tweens.push(e), i && (n = [...n].reverse()), n.reduce((t, i, s) => {
                            const o = n[s + 1];
                            if (t) {
                                const n = s * this.animationDelay * .001, r = [t, i, o];
                                e.call(this.drawLineToPoint, r, this, n)
                            }
                            return i
                        }, null)
                    } else super.drawLine(e)
                }

                drawLineToPoint(e, t, i) {
                    if (!e) return;
                    0 === this.segmentPool.length && this.createSegments();
                    const s = this.segmentPool.pop();
                    if (this.activeSegment.push(s), s.visible = !0, s.findAnimation("in")) s.play("in", {
                        speed: this.animationSpeed,
                        force: !0
                    }), s.findAnimation("idle") && s.play("idle", {
                        speed: this.animationSpeed,
                        loop: this.animationLoop,
                        force: !1
                    }); else {
                        const e = s.spineData.animations.first.name;
                        s.play(e, {speed: this.animationSpeed, loop: this.animationLoop, force: !0})
                    }
                    const n = c2d.geom.Point.distance(e, t);
                    let o;
                    const r = s.width;
                    if (this.segmentTail) {
                        const i = this.segmentTail / n;
                        s.position.copyFrom({
                            x: e.x - (t.x - e.x) * i,
                            y: e.y - (t.y - e.y) * i
                        }), o = (n + 2 * this.segmentTail) / r
                    } else s.position.copyFrom(e), o = n / r;
                    s.rootBone.scaleX = o, s.pivot.x = -n / 2, s.rotation = Math.atan((t.y - e.y) / (t.x - e.x)), t.x < e.x && (s.rotation += Math.PI), s.update(), s.currentTime = 0, s.resume()
                }

                clear() {
                    for (super.clear(); this.tweens.length;) {
                        this.tweens.pop().kill()
                    }
                    for (; this.activeSegment.length;) {
                        const e = this.activeSegment.pop();
                        e.currentTime = 0, e.pause(), e.visible = !1, e.rootBone.scaleX = 1, e.rotation = 0, e.position.set(0), this.segmentPool.push(e)
                    }
                }
            }

            s.modify(e)
        }
    }, {"../../LinesView": 170}],
    183: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        }, n = this && this.__rest || function (e, t) {
            var i = {};
            for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (i[s] = e[s]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var n = 0;
                for (s = Object.getOwnPropertySymbols(e); n < s.length; n++) t.indexOf(s[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[n]) && (i[s[n]] = e[s[n]])
            }
            return i
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.LineAmountView = void 0;
        let o = class extends c2d.display.Container {
            initialize(e, t) {
                this.options = e, this.returnToPool = null, this.bg = null, this.textColor = e.textColor, this.fill = e.fill, this.border = e.border, this.borderSize = e.borderSize, e.padding && (this.padding = e.padding), c2d.type.isNumber(e.borderShadowSize) && (this.borderShadowSize = e.borderShadowSize + e.borderSize);
                const i = e.fontSize;
                if (e.bitmapFont) {
                    this.isBitmapLabel = !0;
                    const s = {}, n = e.bitmapFont;
                    Object.entries(t.textures).forEach(([e, t]) => {
                        if (e.includes(n)) {
                            const i = e.substr(n.length);
                            s[i] = t
                        }
                    }), this.label = new c2d.display.BitmapText(null, {
                        textures: s,
                        fontSize: i,
                        padding: e.bitmapPadding
                    })
                } else {
                    const t = {
                        fontSize: i + "px",
                        fontFamily: e.fontFamily || "Arial",
                        fill: this.textColor || "#ffffff",
                        stroke: e.textStrokeColor || "#000000",
                        strokeThickness: e.textStrokeWidth || 0
                    };
                    this.label = new c2d.display.TextField("", t)
                }
                const s = e.anchor;
                s ? this.label.anchor.copyFrom(s) : this.label.anchor.set(.5);
                const o = e.scale;
                if (o && this.scale.copyFrom(o), this.textLayer = new c2d.display.Container, e.tween) {
                    const t = [...e.tween.iteration];
                    this.timeline = new c2d.Timeline({paused: !0});
                    const i = e.tween.delay || 0, s = t.shift(), {duration: o} = s, r = n(s, ["duration"]);
                    this.timeline.fromTo(this.textLayer, .001 * o, {pixi: e.tween.start}, {
                        dealy: i,
                        pixi: r
                    }), t.forEach(e => {
                        var {duration: t} = e, i = n(e, ["duration"]);
                        this.timeline.to(this.textLayer, .001 * t, {pixi: i})
                    })
                }
                this.buildLayers()
            }

            buildLayers() {
                this.textLayer.addChild(this.label), this.addChild(this.textLayer)
            }

            set text(e) {
                this.label.text = (0 ^ e) === e ? e : e.toFixed(2)
            }

            setColor(e) {
                this.isBitmapLabel || !e && this.textColor || (this.label.style.fill = e)
            }
        };
        o = s([modifiable], o), i.LineAmountView = o
    }, {}],
    184: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.LineMarkerView = void 0;
        let n = class extends c2d.display.Container {
            initialize(e, t) {
                this.assetsStore = t, this.config = e, this._drawImage(), this.config.label && this._drawText(), this.activate()
            }

            _drawText() {
                let e;
                const t = this.config.fontSize > 0 ? this.config.fontSize : 24;
                if (this.config.bitmapFont) {
                    const i = {}, s = this.config.bitmapFont;
                    Object.entries(this.assetsStore.textures).forEach(([e, t]) => {
                        if (e.includes(s)) {
                            const n = e.substr(s.length);
                            i[n] = t
                        }
                    }), e = new c2d.display.BitmapText(i, t)
                } else {
                    const i = {
                        fontFamily: this.config.fontFamily || "Arial",
                        fill: this.config.textColor || "white",
                        fontSize: t + "px",
                        stroke: "black",
                        strokeThickness: 1
                    };
                    e = new c2d.display.TextField("", i), e.anchor.set(.5)
                }
                e.name = "marker_label", e.text = this.config.label || "", this.addChild(e), this._label = e
            }

            _drawImage() {
                const e = new c2d.display.Sprite, t = this.config.anchor;
                t ? e.anchor.copyFrom(t) : e.anchor.set(.5);
                const i = this.config.scale;
                i && e.scale.copyFrom(i), this.addChild(e), this._image = e
            }

            _getAsset(e, t) {
                if (c2d.type.isString(e)) {
                    const i = e.replace(/\$\{id}|\$\{side}/gi, e => t[e.match(/\$\{(.*)\}/i)[1]]);
                    return this.assetsStore.textures[i]
                }
            }

            findTextures(e, t) {
                const i = e.toString().padStart(2, "0"), s = this.config.textures, n = {};
                return n.enable = s.enable ? this._getAsset(s.enable, {
                    ID: i,
                    SIDE: t
                }) : PIXI.Texture.EMPTY, n.disabled = s.disabled ? this._getAsset(s.disabled, {
                    ID: i,
                    SIDE: t
                }) : PIXI.Texture.EMPTY, n.activated = s.activated ? this._getAsset(s.activated, {
                    ID: i,
                    SIDE: t
                }) : this.textureEnabled, n.deactivated = s.deactivated ? this._getAsset(s.deactivated, {
                    ID: i,
                    SIDE: t
                }) : this.textureEnabled, n
            }

            updateTextures(e, t) {
                this.textures = this.findTextures(e, t), this.interactive ? this.activate() : this.deactivate()
            }

            set text(e) {
                this._label && (this._label.text = e)
            }

            onPointOver(e) {
                this.on("pointerover", e)
            }

            onPointOut(e) {
                this.on("pointerout", e)
            }

            activate() {
                this.interactive = !0, this.textures && this.textures.activated && (this._image.texture = this.textures.activated)
            }

            deactivate() {
                this.interactive = !1, this.textures && this.textures.deactivated && (this._image.texture = this.textures.deactivated)
            }
        };
        n = s([modifiable], n), i.LineMarkerView = n
    }, {}],
    185: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        }, n = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.Network = void 0;
        let o = class extends game.sources.Component {
            constructor() {
                super(...arguments), this._logger = c2d.Logger.Of("Component.Network.Component")
            }

            onCreate() {
                this.onReconnectStart = new c2d.Signal, this.onReconnectSuccess = new c2d.Signal
            }

            onInitialize() {
                this.customVars = game.application.setup.customVars || this.customVars
            }

            initErrorAction(e) {
                this.reportError = e
            }

            paramsForRequest() {
                const e = {};
                return this.store.freespins && (e.freegame_type = this.store.freespins.type), e
            }

            sendRequest({url: e, method: t, payload: i = {}, reconnectOnError: s = !1}) {
                return n(this, void 0, void 0, (function* () {
                    this.closeSession && (this.reportCloseSession(), yield c2d.waitLast());
                    const o = e => n(this, void 0, void 0, (function* () {
                        return new Promise(t => c2d.call(t, e))
                    })), r = () => n(this, void 0, void 0, (function* () {
                        return yield new Promise(s => {
                            const n = new XMLHttpRequest;
                            n.onreadystatechange = () => {
                                if (4 === n.readyState) if (200 === n.status && n.responseText.length) try {
                                    s(JSON.parse(n.responseText))
                                } catch (e) {
                                    s()
                                } else s()
                            }, n.onerror = () => {
                                s()
                            };
                            const o = this._toFormData(i);
                            n.open(t, e, !0), n.send(o)
                        })
                    }));
                    let a = null, l = 0;
                    do {
                        l > 0 && (yield o(2)), l++, a = yield r(), !a && s && 1 === l && this.onReconnectStart.emit()
                    } while (!a && s);
                    return l > 1 && this.onReconnectSuccess.emit(), this.handler.emitResponse({response: a, url: e}), a
                }))
            }

            sendApiRequest(e, t = {}) {
                return n(this, void 0, void 0, (function* () {
                    const {url: i, password: s, login: n} = this.store.userApi;
                    return yield this.sendRequest({
                        url: i,
                        method: "POST",
                        payload: {login: n, password: s, action: e, args: JSON.stringify(t)},
                        reconnectOnError: !1
                    })
                }))
            }

            sendGameRequest(e = {}, t = !1) {
                return n(this, void 0, void 0, (function* () {
                    return e = Object.assign({
                        time_offset: this.store.timezoneOffset,
                        game: this.store.gameName,
                        customVars: this.customVars,
                        bet: this.store.global.bet,
                        lines: this.store.global.lines && this.store.global.lines.length,
                        action: this.store.getNextAction
                    }, e), t || (e.request_id = this.store.global.nextRequestId), yield this.sendRequest({
                        url: this.store.actionURL,
                        method: "POST",
                        payload: {data: JSON.stringify(e), shifter: game.cookies.get("shifter") || "{}"},
                        reconnectOnError: !0
                    })
                }))
            }

            createUser() {
                return n(this, void 0, void 0, (function* () {
                    return this.customVars ? Promise.resolve() : yield this.sendApiRequest("registerUser", {currency: this.store.currency}).then(({newUserId: e}) => (this.userId = e, {
                        mode: "real",
                        user_id: e,
                        game: this.store.gameName
                    })).then(e => this.sendApiRequest("getCustomVars", e)).then(({customVars: e}) => {
                        this.customVars = e
                    }).catch(e => {
                        this._logger.error(e)
                    })
                }))
            }

            registerBonus(e) {
                return n(this, void 0, void 0, (function* () {
                    return e = Object.assign({
                        user_id: this.userId,
                        game: this.store.gameName,
                        currency: this.store.currency
                    }, e), yield this.sendApiRequest("registerBonus", e)
                }))
            }

            setBalance(e) {
                return n(this, void 0, void 0, (function* () {
                    const t = {user_id: this.userId, balance: e};
                    return this.sendApiRequest("setBalance", t)
                }))
            }

            getHistory({page: e}) {
                return n(this, void 0, void 0, (function* () {
                    return this.sendGameRequest({action: "history", type: "byrounds", page: e}, !0)
                }))
            }

            getRoundHistory(e) {
                return n(this, void 0, void 0, (function* () {
                    const {round_id: t} = e;
                    return this.sendGameRequest({action: "replay", type: "round", round_id: t}, !0)
                }))
            }

            getGameSettings() {
                return n(this, void 0, void 0, (function* () {
                    return this.sendGameRequest({action: "settings"}, !0)
                }))
            }

            _toFormData(e) {
                const t = new FormData;
                return Object.entries(e).forEach(([e, i]) => {
                    t.append(e, i)
                }), t
            }

            get customVars() {
                return game.localStorage.get("customVars")
            }

            set customVars(e) {
                game.localStorage.set("customVars", e)
            }

            get userId() {
                return game.localStorage.get("userId")
            }

            set userId(e) {
                game.localStorage.set("userId", e)
            }

            getRawResponse() {
                return this.store.rawResponse
            }

            loadGameSettings() {
                return n(this, void 0, void 0, (function* () {
                    if (!this.store.showMaxWinRtpMessage) return;
                    const e = yield this.getGameSettings();
                    this.store.setGameSettings(e)
                }))
            }

            ping() {
                if (this.closeSession) return;
                const e = this.store.pingUrl;
                if (!e) return;
                const t = new XMLHttpRequest;
                t.open("GET", e, !0), t.overrideMimeType("application/json"), t.onreadystatechange = () => {
                    4 === Number(t.readyState) && 200 === Number(t.status) && setTimeout(() => {
                        this.ping()
                    }, 1e4)
                }, t.onerror = () => this._logger.error("Ping broken."), t.send(null)
            }

            connectGameSocket() {
                const e = this.store.gameSocket;
                if (!e) return;
                const {encrypted: t} = e;
                c2d.transport.init(), c2d.transport.setReadyHandler(() => {
                    setTimeout(() => {
                        c2d.transport.send({encrypted: t}, "auth")
                    }, 10)
                }), c2d.transport.setResponseHandler(e => {
                    const {payload: t} = e;
                    t && (null != t.balance ? this.updateBalance && (this.store.setBalance(t.balance), this.updateBalance()) : "closeSession" == t.name && (this.closeSession = !0, this.checkSession()))
                })
            }

            checkSession() {
                this.closeSession && this.closeSessionAction && this.reportCloseSession()
            }

            reportCloseSession() {
                this.reportError({message: "core.session_close".ls(), code: 1})
            }
        };
        o = s([modifiable], o), i.Network = o
    }, {}],
    186: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        }, n = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.NetworkHandler = void 0;
        let o = class extends game.sources.Handler {
            constructor(e) {
                super(e), this._logger = c2d.Logger.Of("Component.Network.Handler"), this.subscribeEvents()
            }

            get statesConfig() {
                return {
                    Start: {enter: this.onStartEnter},
                    Init: {exit: this.onInitExit},
                    Intro: {enter: this.onIntroEnter, exit: this.onIntroExit},
                    Replay: {enter: this.onIntroEnter, exit: this.onIntroExit},
                    ReplayProgress: {enter: this.onReplayProgressEnter},
                    Gifts: {begin: this.onIdleBegin},
                    Idle: {begin: this.onIdleBegin},
                    SpinStart: {enter: this.onSpinStartEnter},
                    SpinProgress: {enter: this.onSpinProgressEnter},
                    BonusGame: {check: this.checkBonusGame, begin: this.onBonusGameBegin},
                    BonusGameInit: {check: this.checkBonusGameInit, enter: this.onBonusGameInitEnter},
                    BonusGameStep: {check: this.checkBonusGameStep, begin: this.onBonusGameStepBegin},
                    BonusGameFinish: {enter: this.onBonusGameFinishEnter},
                    PresentDrop: {exit: this.onDropProgressEnter},
                    FreeSpins: {check: this.checkGetFreespins},
                    InitFreespin: {check: this.checkInitFreespin, enter: this.onInitFreespinEnter},
                    InitSpin: {check: this.checkInitSpin, enter: this.onInitSpinEnter}
                }
            }

            get globalActionsConfig() {
                return {}
            }

            get actionsConfig() {
                return {networkError: {}, networkResolveError: {}}
            }

            sendRequest(e) {
                this.component.sendRequest(e)
            }

            subscribeEvents() {
                this.events.subscribe(this.events.config.COMPONENTS_NETWORK_SEND_REQUEST, this.sendRequest.bind(this))
            }

            emitResponse(e) {
                this.events.emit(this.events.config.COMPONENTS_NETWORK_GET_RESPONSE, e)
            }

            onInitialize() {
                this.startData = null, this.ignoreParseResponse = !1, this.component.initErrorAction(e => this.reportError(e)), this.component.store.setTimezoneOffset(), this.component.onReconnectStart.connect(() => this.reportReconnectStart()), this.component.onReconnectSuccess.connect(() => this.reportReconnectSuccess())
            }

            checkGetFreespins() {
                return !1
            }

            onInitExit({finish: e}) {
                return this.component.connectGameSocket(), this.component.ping(), e(), {
                    onFinish: () => {
                        game.loadComplete()
                    }
                }
            }

            onStartEnter({finish: e}) {
                this.component.store.addSpinData(), this.component.createUser().then(() => this.component.sendGameRequest({action: "init"})).then(e => !e || e.error ? Promise.reject(e.error) : e).then(e => this.onGameApiResponse(e)).then(() => this.component.loadGameSettings()).then(e).catch(e => this.reportError(e));
                return {
                    actions: {
                        getHistory: (e, t = 1) => this.component.getHistory({page: t}).then(t => e(t)),
                        getRoundHistory: (e, t) => this.component.getRoundHistory({round_id: t}).then(t => e(t))
                    }
                }
            }

            onIntroEnter({finish: e}) {
                this.ignoreParseResponse = !0, e();
                return {onAbort: () => this.abort = !0}
            }

            onReplayProgressEnter({finish: e}) {
                this.abort = !1, e()
            }

            onIntroExit({finish: e}) {
                this.abort = !1, this.ignoreParseResponse = !1, this.onGameApiResponse(this.startData).then(e)
            }

            onIdleBegin({finish: e, actions: t}) {
                const {updateBalance: i} = t;
                return this.component.updateBalance = i, this.component.closeSessionAction = !0, this.component.checkSession(), game.remoteApi.onEnterIdle(), e(), {
                    onFinish: () => {
                        game.remoteApi.onExitIdle(), this.component.updateBalance = null, this.component.closeSessionAction = !1
                    }
                }
            }

            checkBonusGame() {
                return !this.abort && this.checkBonusGameStep()
            }

            onBonusGameBegin({finish: e}) {
                e()
            }

            checkBonusGameInit() {
                return !this.abort && "initbonus" === this.component.store.getNextAction
            }

            onBonusGameInitEnter({finish: e}) {
                this.sendBaseGameRequest({bonus_game: this.component.store.bonusType}).then(e, e => this.reportError(e))
            }

            checkBonusGameStep() {
                return "bonus" === this.component.store.getNextAction
            }

            onBonusGameStepBegin({finish: e}) {
                return {
                    actions: {
                        bonusChoice: t => {
                            this.sendBaseGameRequest({
                                bonus_game: this.component.store.bonusType,
                                choice: t
                            }).then(e, e => this.reportError(e))
                        }
                    }
                }
            }

            onBonusGameFinishEnter({finish: e}) {
                e()
            }

            onSpinStartEnter({finish: e}) {
                const t = this.component.paramsForRequest();
                this.spinCompleteCall = c2d.waitLast(2), this.sendBaseGameRequest(t).then(() => {
                    this.spinCompleteCall.call()
                }, e => this.reportError(e)), e()
            }

            onSpinProgressEnter({finish: e}) {
                this.spinCompleteCall.then(e), this.spinCompleteCall.call()
            }

            onDropProgressEnter({finish: e}) {
                const t = this.component.paramsForRequest();
                this.sendBaseGameRequest(t).then(e, e => this.reportError(e))
            }

            checkInitFreespin() {
                return "initfreespin" == this.component.store.getNextAction
            }

            onInitFreespinEnter({finish: e}) {
                const t = this.component.paramsForRequest();
                this.sendBaseGameRequest(t).then(e, e => this.reportError(e))
            }

            checkInitSpin() {
                return "initspin" == this.component.store.getNextAction
            }

            onInitSpinEnter({finish: e}) {
                this.sendBaseGameRequest().then(e, e => this.reportError(e))
            }

            onGameApiResponse(e) {
                return n(this, void 0, void 0, (function* () {
                    this.component.config.isForceInit && (yield this.checkInitData(e)), this.startData = e, this.component.store.setResponseToStore(e)
                }))
            }

            checkInitData(e) {
                return n(this, void 0, void 0, (function* () {
                    "initfreespin" == e.available_actions[0] ? e.spin.wins.total || (yield this.initFreespin(e)) : "initspin" == e.available_actions[0] && e.spin && e.spin.freespins && !e.spin.freespins.wins.total && (yield this.initSpin(e))
                }))
            }

            initFreespin(e) {
                return n(this, void 0, void 0, (function* () {
                    this.component.store.setNextRequestId(e), this.component.store.updateAvailableActions(e), yield this.component.sendGameRequest().then(e => e.error ? Promise.reject(e.error) : e).then(t => {
                        e.initfreespin = t.initfreespin, e.available_actions = t.available_actions
                    }).catch(e => this.reportError(e))
                }))
            }

            initSpin(e) {
                return n(this, void 0, void 0, (function* () {
                    this.component.store.setNextRequestId(e), this.component.store.updateAvailableActions(e), yield this.component.sendGameRequest().then(e => e.error ? Promise.reject(e.error) : e).then(t => {
                        e.initspin = t.initspin, e.available_actions = t.available_actions
                    }).catch(e => this.reportError(e))
                }))
            }

            sendBaseGameRequest(e) {
                return n(this, void 0, void 0, (function* () {
                    this.ignoreParseResponse || (yield this.component.sendGameRequest(e).then(e => e.error ? Promise.reject(e.error) : (this.events.emit(this.events.config.COMPONENTS_INFOSCREEN_UNLOCK_STATISTIC), e)).then(e => this.onGameApiResponse(e)))
                }))
            }

            reportReconnectStart() {
                this.fireAction("networkError", {message: "core.trying_to_reconnect".ls()})
            }

            reportReconnectSuccess() {
                this.fireAction("networkResolveError")
            }

            reportError(e) {
                this._logger.error(e);
                [0, 37, 40].includes(e.code) && (e.message = `core.server_error_${e.code}`.ls()), this.fireAction("networkError", e), game.remoteApi.onError(e)
            }
        };
        o = s([modifiable], o), i.NetworkHandler = o
    }, {}],
    187: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.NetworkStore = void 0;
        let n = class extends game.sources.Store {
            constructor() {
                super(...arguments), this._logger = c2d.Logger.Of("Component.Network.Store")
            }

            onCreate() {
                const {
                    actionURL: e,
                    backURL: t,
                    cashURL: i,
                    userApi: s,
                    gameName: n,
                    showHistory: o,
                    currency: r,
                    hideCurrency: a,
                    showPrompts: l = !0,
                    enableSoundButton: c = !0,
                    showSoundButton: h = !0,
                    enableFullscreenButton: u = !0,
                    showFullscreenButton: d = !0,
                    gameConfig: p,
                    pingUrl: m,
                    gameSocket: f
                } = game.application.setup, {
                    autoSpins: g = !0,
                    minSpinTime: b,
                    showExitButton: y,
                    userSupportPageLink: S,
                    showMaxWinRtpMessage: w,
                    showBetButtons: v = !0,
                    showRestoreSessionPopup: _
                } = (null == p ? void 0 : p.data) || {};
                this.global = {
                    gameName: n,
                    actionURL: e,
                    backURL: t,
                    cashURL: i,
                    userApi: s,
                    currency: r,
                    hideCurrency: a,
                    showHistory: o,
                    showPrompts: l,
                    enableSoundButton: c,
                    showSoundButton: h,
                    showRestoreSessionPopup: _,
                    enableFullscreenButton: u,
                    showFullscreenButton: d,
                    showMaxWinRtpMessage: w,
                    showBetButtons: v,
                    enableAutospins: g,
                    minSpinTime: b,
                    showExitButton: y,
                    userSupportPageLink: S,
                    pingUrl: m,
                    gameSocket: f
                }
            }

            addToGlobal() {
                this.addItem("setResponseToStore"), this.addItem("setBalance"), this.addItem("setBet"), this.addItem("rawResponse"), this.addItem("initData"), this.addItem("getAvailableActions"), this.addItem("getNextAction"), this.addItem("getCurrentAction"), this.addItem("rtp"), this.addItem("balance"), this.addItem("currency"), this.addItem("denomination"), this.addItem("bet"), this.addItem("multiplier"), this.addItem("freezeData"), this.addItem("ranges"), this.addItem("totalWin"), this.addItem("fsWin"), this.addItem("directory"), this.addItem("giftSpins"), this.addItem("giftFreeSpins"), this.addItem("backURL"), this.addItem("cashURL"), this.addItem("showHistory"), this.addItem("bonusType"), this.addItem("bonusGames"), this.addItem("bonus"), this.addItem("freespins"), this.addItem("showPrompts"), this.addItem("enableSoundButton"), this.addItem("showSoundButton"), this.addItem("enableFullscreenButton"), this.addItem("showFullscreenButton"), this.addItem("hideCurrency"), this.addItem("winNumbers"), this.addItem("setWinNumbers"), this.addItem("showBetButtons"), this.addItem("showMaxWinRtpMessage"), this.addItem("enableAutospins"), this.addItem("minSpinTime"), this.addItem("showExitButton"), this.addItem("userSupportPageLink"), this.addItem("showRestoreSessionPopup"), this.addItem("restoreState"), this.addItem("maxWinRTP")
            }

            addSpinData() {
                this.addItem("wins"), this.addItem("groupWin"), this.addItem("refactorWins"), this.addItem("symbols"), this.addItem("patterns"), this.addItem("spinData"), this.addItem("extraData"), this.addItem("initfreespin"), this.addItem("initSpin"), this.addItem("respins")
            }

            get showBetButtons() {
                return this.global.showBetButtons
            }

            get showRestoreSessionPopup() {
                return this.global.showRestoreSessionPopup
            }

            get showMaxWinRtpMessage() {
                return this.global.showMaxWinRtpMessage
            }

            get enableAutospins() {
                return this.global.enableAutospins
            }

            get minSpinTime() {
                return this.global.minSpinTime || 0
            }

            get showExitButton() {
                return this.global.showExitButton
            }

            get userSupportPageLink() {
                return this.global.userSupportPageLink
            }

            get pingUrl() {
                return this.global.pingUrl
            }

            get gameSocket() {
                return this.global.gameSocket
            }

            get maxWinRTP() {
                return this.global.maxWinRTP
            }

            get userApi() {
                return this.global.userApi
            }

            get actionURL() {
                return this.global.actionURL
            }

            get timezoneOffset() {
                return this.global.timezoneOffset
            }

            get gameName() {
                return this.global.gameName
            }

            get rawResponse() {
                return this.global.rawResponse
            }

            get initData() {
                return this.global.initData
            }

            get getAvailableActions() {
                return this.global.availableActions
            }

            get getNextAction() {
                return this.global.nextActions
            }

            get getCurrentAction() {
                return this.global.currentAction
            }

            get rtp() {
                return this.global.rtp
            }

            get backURL() {
                return this.global.backURL
            }

            get showHistory() {
                return this.global.showHistory
            }

            get showPrompts() {
                return this.global.showPrompts
            }

            get enableSoundButton() {
                return this.global.enableSoundButton
            }

            get showSoundButton() {
                return this.global.showSoundButton
            }

            get enableFullscreenButton() {
                return this.global.enableFullscreenButton
            }

            get showFullscreenButton() {
                return this.global.showFullscreenButton
            }

            get hideCurrency() {
                return this.global.hideCurrency
            }

            get cashURL() {
                return this.global.cashURL
            }

            get balance() {
                return this.global.balance
            }

            get currency() {
                return this.global.currency
            }

            get denomination() {
                return this.global.denomination
            }

            get lines() {
                return this.global.lines
            }

            get bet() {
                return this.global.bet
            }

            get ranges() {
                return this.global.ranges
            }

            get totalWin() {
                return this.global.totalWin
            }

            get fsWin() {
                return this.global.fsWin
            }

            get wins() {
                return this.global.wins
            }

            get symbols() {
                return this.global.symbols
            }

            get directory() {
                return this.global.directory
            }

            get patterns() {
                return this.global.patterns
            }

            get spinData() {
                return this.global.spinData
            }

            get extraData() {
                return this.global.extra
            }

            get initfreespin() {
                return this.global.initfreespin
            }

            get initSpin() {
                return this.global.initSpin
            }

            get respins() {
                return this.global.respins
            }

            get groupWin() {
                return this.global.groupWin
            }

            get refactorWins() {
                return this.global.refactorWins
            }

            get giftSpins() {
                return this.global.giftSpins
            }

            get giftFreeSpins() {
                return this.global.giftFreeSpins
            }

            get bonusType() {
                const e = this.bonusGames && Object.values(this.bonusGames).find(e => "START" == e.status);
                return this.bonus.bonus_name || e.name || Object.keys(this.bonus)[0]
            }

            get bonusGames() {
                return this.global.bonusGames
            }

            get bonus() {
                return this.global.bonusGame
            }

            get freespins() {
                return this.global.freespins
            }

            get multiplier() {
                return this.global.multiplier
            }

            get freezeData() {
                return this.global.freezeData
            }

            get winNumbers() {
                return this.global.winNumbers
            }

            get restoreState() {
                return this.global.restoreState
            }

            setWinNumbers(e) {
                this.global.winNumbers = e
            }

            setTimezoneOffset() {
                this.global.timezoneOffset = (new Date).getTimezoneOffset()
            }

            setBalance(e) {
                this.global.balance = parseFloat(e)
            }

            setBet(e) {
                this.global.bet = parseFloat(e)
            }

            setGameSettings(e) {
                this.global.maxWinRTP = e.max_win_in_total_bets
            }

            setResponseToStore(e) {
                this._logger.info("data:", e), this._logger.info("extra:", e.spin && e.spin.extra), this.updateRawResponse(e), this.updateInit(e), this.setNextRequestId(e), this.updateRTP(e), this.updateBalance(e), this.updateDenomination(e), this.updateBet(e), this.updateMultiplier(e), this.updateFreezeData(e), this.updateFixedBet(e), this.updateCurrency(e), this.updateAvailableActions(e), this.updateNextActions(e), this.updateCurrentActions(e), this.updateDirectory(e), this.updateRanges(e), this.updateSymbols(e), this.updateWins(e), this.updateLines(e), this.updatePatterns(e), this.updateSpinData(e), this.updateFsWin(e), this.updateExtra(e), this.updateInitFreespins(e), this.updateInitSpin(e), this.updateGiftSpins(e), this.updateGiftFreeSpins(e), this.updateBonusGames(e), this.updateBonusGame(e), this.updateFreespins(e), this.updateRespins(e), this.updateRestoreState(e)
            }

            updateRestoreState({init: e}) {
                this.global.restoreState = (null == e ? void 0 : e.restorestate) || !1
            }

            updateRawResponse(e) {
                this.global.rawResponse = c2d.utils.Object.cloneDeep(e)
            }

            updateInit({init: e}) {
                this.global.initData = e
            }

            setNextRequestId({init: e}) {
                (null == e ? void 0 : e.next_request_id) ? this.global.nextRequestId = e.next_request_id : this.global.nextRequestId++
            }

            updateRTP({init: e}) {
                var t;
                const i = null === (t = null == e ? void 0 : e.directory) || void 0 === t ? void 0 : t.rtp;
                i && (this.global.rtp = i)
            }

            updateBalance({balance: e}) {
                if (!e) return;
                const {before: t, after: i} = e;
                this.global.balance = parseFloat(i), this._logger.info("Balance:", this.global.balance)
            }

            updateDenomination({denomination: e}) {
                e && (this.global.denomination = parseFloat(e))
            }

            updateBet({init: e, spin: t, initspin: i, initfreespin: s, extrabonus: n}) {
                const o = null == n ? void 0 : n.spins, {bet: r = this.global.bet} = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, e), s), i), t), o);
                this.setBet(r)
            }

            updateMultiplier({init: e, spin: t, initspin: i, initfreespin: s, extrabonus: n}) {
                const o = null == n ? void 0 : n.spins, {multiplier: r = 1} = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, e), s), i), t), o);
                this.global.multiplier = r
            }

            updateFreezeData({init: e, spin: t, initspin: i, initfreespin: s, extrabonus: n}) {
                const o = null == n ? void 0 : n.spins, {freeze: r} = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, e), s), i), t), o);
                this.global.freezeData = r
            }

            updateFixedBet({fixedBet: e}) {
                e && (this.global.fixedBet = parseInt(e, 10))
            }

            updateCurrency({init: e}) {
                e && (this.global.currency = this.global.hideCurrency ? "" : e.currency)
            }

            updateAvailableActions({available_actions: e}) {
                e && (this.global.availableActions = Object.values(e))
            }

            updateNextActions({available_actions: e}) {
                e && (this.global.nextActions = this.global.availableActions.find(e => "collect" !== e && "gamble" !== e))
            }

            updateCurrentActions({spin: e}) {
                this.global.currentAction = null == e ? void 0 : e.type
            }

            updateDirectory({init: e}) {
                (null == e ? void 0 : e.directory) && (this.global.directory = e.directory)
            }

            updateLines(e) {
                var t;
                (null === (t = this.global.directory) || void 0 === t ? void 0 : t.lines) && (this.global.lines = Array.fromObject(this.global.directory.lines))
            }

            updateRanges({init: e}) {
                if (!(null == e ? void 0 : e.ranges)) return;
                this.global.ranges = e.ranges;
                const t = e.ranges.bet, i = t[Object.keys(t)[0]];
                this.global.ranges.bet = Array.fromObject(i)
            }

            updateWins({spin: e, macro_round: t}) {
                var i, s, n, o, r;
                (null === (i = null == t ? void 0 : t.wins) || void 0 === i ? void 0 : i.total) ? this.global.totalWin = t.wins.total : (null === (s = null == e ? void 0 : e.wins) || void 0 === s ? void 0 : s.total) ? this.global.totalWin = e.wins.total : this.global.totalWin = 0, this.global.wins = {}, this.global.wins.total = null === (n = null == e ? void 0 : e.wins) || void 0 === n ? void 0 : n.total;
                let a = (null === (o = null == e ? void 0 : e.wins) || void 0 === o ? void 0 : o.pos_wins) && Array.fromObject(e.wins.pos_wins),
                    l = (null === (r = null == e ? void 0 : e.wins) || void 0 === r ? void 0 : r.line_wins) && Array.fromObject(e.wins.line_wins);
                a = this.global.wins.posWins = a || [], l = this.global.wins.lineWins = l || [], this.global.groupWin = [...l, ...a];
                const c = this.global.symbols, h = this.global.groupWin.map(e => {
                    e.pos = Array.fromObject(e.pos);
                    const t = e.pos.map((e, t) => {
                        const [i, s] = Array.fromObject(e), n = c[i][s];
                        return Object.assign(Object.assign({}, n), {column: i, row: s})
                    });
                    return Object.assign(Object.assign({}, e), {pos: t})
                }).sort((e, t) => e.amount - t.amount || t.code - e.code || e.idx - t.idx);
                this.global.refactorWins = h
            }

            updateSymbols({init: e = {}, spin: t = {}, initspin: i = {}, initfreespin: s = {}}) {
                const {symbols: n} = Object.assign(Object.assign(Object.assign(Object.assign({symbols: e.start_symbols}, e), i), s), t);
                e.start_symbols && this._logger.error("Replace init.start_symbols to init.symbols!"), n && (this.global.symbols = n)
            }

            updateExtra({init: e = {}, spin: t = {}, initspin: i = {}, initfreespin: s = {}}) {
                const n = Object.assign(Object.assign(Object.assign(Object.assign({}, e.extra), t.extra), i.extra), s.extra);
                this.global.extra = n
            }

            updateInitFreespins({initfreespin: e}) {
                this.global.initfreespin = e
            }

            updateInitSpin({initspin: e}) {
                this.global.initSpin = e
            }

            updatePatterns({spin: e}) {
                if (this.global.patterns = {}, !e) return;
                const {extra: t, symbols: i} = e, {swap_positions: s, move_position: n} = t || {};
                this.global.patterns.swapSymbols = Array.fromObject(s || []), this.global.patterns.moveSymbols = Array.fromObject(n || []), this.global.patterns.replaceSymbols = this.parseReplaceSymbols(i)
            }

            parseReplaceSymbols(e) {
                const t = [];
                return Array.fromObject(e).forEach((e, i) => {
                    Array.fromObject(e).forEach(({extra: e}, s) => {
                        e && void 0 !== e.replace && t.push({column: i, row: s, id: e.replace})
                    })
                }), t
            }

            updateSpinData({spin: e}) {
                this.global.spinData = e
            }

            updateFsWin({spin: e}) {
                var t;
                this.global.fsWin = null === (t = null == e ? void 0 : e.freespins) || void 0 === t ? void 0 : t.wins.total
            }

            updateGiftSpins({extrabonus: e}) {
                this.global.giftSpins = null == e ? void 0 : e.spins
            }

            updateGiftFreeSpins({extrabonus: e}) {
                this.global.giftFreeSpins = null == e ? void 0 : e.freespins
            }

            updateBonusGames({bonus_games: e}) {
                e && (this.global.bonusGames = e)
            }

            updateBonusGame({bonus: e = {}, initbonus: t = {}}) {
                this.global.bonusGame = Object.assign(Object.assign({}, t), e)
            }

            updateFreespins({initfreespin: e = {}, spin: t = {}}) {
                const {freespins: i} = Object.assign(Object.assign({}, e), t);
                this.global.freespins = i
            }

            updateRespins({spin: e}) {
                this.global.respins = null == e ? void 0 : e.respin_chain
            }

            updateInitBonus({initbonus: e = {}}) {
                this.global.initbonus = e
            }
        };
        n = s([modifiable], n), i.NetworkStore = n
    }, {}],
    188: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("./Network"), n = e("./NetworkHandler"), o = e("./NetworkStore");
        e("./modifications/bonusbuy/index"), e("./modifications/jackpots/index");
        const r = {Component: s.Network, Handler: n.NetworkHandler, Store: o.NetworkStore};
        (c2d.Logger ? c2d.Logger.Of("Network") : console).info("component version v0.01.0"), game.componentsManager.registerComponent("Network", r, "v0.01.0")
    }, {
        "./Network": 185,
        "./NetworkHandler": 186,
        "./NetworkStore": 187,
        "./modifications/bonusbuy/index": 191,
        "./modifications/jackpots/index": 193
    }],
    189: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../Network").Network;

        class n extends s.Latest {
            paramsForRequest() {
                let e = super.paramsForRequest();
                if (this.store.bonusBuy) {
                    const {params: t} = this.store.bonusBuy;
                    e = Object.assign(Object.assign({}, t), e)
                }
                return e
            }
        }

        s.modify(n)
    }, {"../../Network": 185}],
    190: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../NetworkStore").NetworkStore;

        class n extends s.Latest {
            addToGlobal() {
                super.addToGlobal(), this.addItem("bonusBuy"), this.addItem("setBonusBuy")
            }

            get bonusBuy() {
                return this.global.bonusBuy
            }

            setBonusBuy(e) {
                this.global.bonusBuy = e
            }

            setResponseToStore(e) {
                super.setResponseToStore(e), this.setBonusBuy(null)
            }
        }

        s.modify(n)
    }, {"../../NetworkStore": 187}],
    191: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./NetworkBonusBuy"), e("./NetworkBonusBuyStore")
    }, {"./NetworkBonusBuy": 189, "./NetworkBonusBuyStore": 190}],
    192: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../NetworkStore").NetworkStore;

        class n extends s.Latest {
            setResponseToStore(e) {
                super.setResponseToStore(e), this.parseJackpotsSettings(e), this.parseJackpotsNode(e)
            }

            addToGlobal() {
                super.addToGlobal(), this.addItem("jackpotsSettings"), this.addItem("jackpots")
            }

            parseJackpotsSettings({init: e}) {
                if (!e) return;
                const {jackpots_settings: t} = e;
                this.global.jackpotsSettings = t
            }

            parseJackpotsNode({jackpots: e}) {
                this.global.jackpots = e
            }

            get jackpotsSettings() {
                return this.global.jackpotsSettings
            }

            get jackpots() {
                return this.global.jackpots
            }
        }

        s.modify(n)
    }, {"../../NetworkStore": 187}],
    193: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), e("./NetworkStoreJackpot")
    }, {"./NetworkStoreJackpot": 192}],
    194: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        }, n = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.Reelset = void 0;
        const o = e("./modifications/sticky/StickyReelsetStore"), r = e("./modifications/sticky/StickyReelsetHandler"),
            a = e("./modifications/sticky/StickyReelsetController"), l = e("./modifications/sticky/StickyReelsetView"),
            c = e("./modifications/sticky/StickyWinView"), h = e("./modifications/wheel/AnimationsRandomize"),
            u = e("./modifications/wheel/WheelReelView"), d = e("./modifications/drop/DropReelView");
        let p = class extends game.sources.VisualComponent {
            validateSources(e) {
                const t = this.config;
                return "wheels" === t.reelType ? (h.animationsRandomizeModify(), u.wheelReelViewModify()) : "drop" === t.reelType && d.dropReelViewModify(), t.sticky && (o.stickyStoreModify(), r.stickyHandlerModify(), a.stickyControllerModify(), l.stickyViewModify(), c.stickyWinViewModify()), e
            }

            onInitialize() {
                this.controller.buildLayout()
            }

            onAbort() {
                this.active && this.controller.onAbort()
            }

            getGlobalSymbolPosition(e, t) {
                return this.controller.getGlobalSymbolPosition(e, t)
            }

            setReelsSymbols(e, t) {
                this.controller.clearSupportSymbols(), this.controller.setAllSymbols(e, t)
            }

            onSpin() {
                this.controller.onSpin()
            }

            startSpin(e) {
                return this.active = !0, new Promise(t => {
                    this.controller.startSpin(e, () => {
                        t(), this.active = !1
                    }), this.store.turboMode ? this.controller.skipSpin() : this.skipCall = c2d.once(() => this.controller.skipSpin())
                })
            }

            progressSpin() {
                return this.active = !0, new Promise(e => {
                    this.controller.progressSpin(() => {
                        e(), this.active = !1
                    })
                })
            }

            skipSpin() {
                this.skipCall && this.skipCall()
            }

            stopSpin(e) {
                return this.active = !0, new Promise(t => {
                    this.controller.stopSpin(e, () => {
                        t(), this.active = !1
                    })
                })
            }

            updateStopOptions(e) {
                this.controller.updateStopOptions(e)
            }

            showWinSymbols(e, t) {
                return n(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.showWinSymbols(e, t), this.active = !1
                }))
            }

            destroyWinSymbols(e, t) {
                return n(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.destroyWinSymbols(e, t), this.active = !1
                }))
            }

            dropPresentSymbols(e) {
                return n(this, void 0, void 0, (function* () {
                    return this.active = !0, new Promise(t => {
                        this.controller.dropPresentSymbols(e).then(() => {
                            t(), this.active = !1
                        }), this.store.turboMode ? this.controller.skipSpin() : this.skipCall = c2d.once(() => this.controller.skipSpin())
                    })
                }))
            }

            finishShowResult() {
                this.controller.finishShowResult()
            }

            skipShowResult() {
                this.controller.skipShowResult()
            }

            addStickySymbol(e) {
                this.controller.addStickySymbol(e)
            }

            moveStickySymbol(e, t) {
                this.controller.moveStickySymbol(e, t)
            }

            removeStickySymbol(e) {
                this.controller.removeStickySymbol(e)
            }

            removeAllStickySymbols() {
                this.controller.removeAllStickySymbols && this.controller.removeAllStickySymbols()
            }

            swapSymbols(e) {
                return n(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.swapSymbols(e), this.active = !1
                }))
            }

            moveSymbols(e) {
                return n(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.moveSymbols(e), this.active = !1
                }))
            }

            replaceState() {
                return n(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.replaceState(), this.active = !1
                }))
            }

            replaceSymbols(e, t, i) {
                return n(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.replaceSymbols(e, t, i), this.active = !1
                }))
            }

            hasFreespins() {
                return this.store.hasFreespins()
            }

            hasSingleLines() {
                const e = this.hasFreespins(), t = this.getConfig("win").showSingleLines;
                return !this.store.isAutospins && this.hasActiveRespins || e || t
            }

            hasMainRestore() {
                return this.store.hasMainRestore()
            }

            emitReelStopped(e) {
                this.handler.emitReelStopped(e)
            }

            get hasActiveRespins() {
                return this.store.hasActiveRespins
            }

            get respins() {
                return this.store.respins
            }

            get canSkipShowLines() {
                return this.controller.configs.win.canSkipShowLines
            }

            get showIdleLines() {
                return this.controller.configs.win.showIdleLines
            }
        };
        p = s([modifiable], p), i.Reelset = p
    }, {
        "./modifications/drop/DropReelView": 201,
        "./modifications/sticky/StickyReelsetController": 202,
        "./modifications/sticky/StickyReelsetHandler": 203,
        "./modifications/sticky/StickyReelsetStore": 204,
        "./modifications/sticky/StickyReelsetView": 205,
        "./modifications/sticky/StickyWinView": 206,
        "./modifications/wheel/AnimationsRandomize": 207,
        "./modifications/wheel/WheelReelView": 208
    }],
    195: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        }, n = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.Controller = void 0;
        let o = class extends game.sources.Controller {
            constructor() {
                super(...arguments), this._logger = c2d.Logger.Of("Components.Reelset.Controller")
            }

            onCreate() {
                this.configs = {
                    config: this.config,
                    intrigue: this.assetsStore.getConfig("intrigue"),
                    win: this.assetsStore.getConfig("win"),
                    mask: this.assetsStore.getConfig("mask"),
                    tweens: this.assetsStore.getConfig("tweens"),
                    rules: this.assetsStore.getConfig("rules"),
                    timings: this.assetsStore.getConfig("timings"),
                    animations: this.assetsStore.getConfig("animations"),
                    symbolAnimationsMaps: this.assetsStore.getConfig("symbolAnimationsMaps")
                }, this.view.configs = this.configs, this.initializeVars()
            }

            initializeVars() {
                this.columns = this.config.layout.reels.count, this.freezes = [!1, !1, !1, !1, !1], this.reverse = [!1, !1, !1, !1, !1], this._spinStarted = !0, this._spinStopping = !1, this._spinComplete = !1
            }

            updateReelsReverse(e) {
                this.reverse = e, this.animationsService.reverse = e
            }

            buildLayout() {
                this.initializeAnimations(), this.initIntrigue(), this.view.initializeReels(), this.view.buildLayout(), this.view.createReels(), this.view.sortReels(), this.view.initializeWinView()
            }

            initializeAnimations() {
                if (!this.config.reelType) return;
                const e = {columns: this.columns, assetsStore: this.assetsStore, reverse: this.reverse};
                this.animationsService = new this.classes.AnimationsManager, this.animationsService.initialize(Object.assign(Object.assign({}, this.configs), e)), this.animationsService.initializeRules(), this.animationsService.parseSymbolsAnimations(), this.view.initializeAnimations(this.animationsService)
            }

            onFreespins() {
                this.animationsService.initializeRules("freespins")
            }

            onFreespinsEnd() {
                this.animationsService.initializeRules()
            }

            initIntrigue() {
                this.configs.intrigue && (this.intrigueRules = this.configs.intrigue.list)
            }

            getGlobalSymbolPosition(e, t) {
                return this.view.getGlobalSymbolPosition(e, t)
            }

            onAbort() {
                this.view.onAbort(), this.skipSpin()
            }

            onSpin() {
                this.view.onSpin()
            }

            setAllSymbols(e, t) {
                const {outcome: i, replaces: s} = this.parseDataResult(e, t);
                this.replaces = s, this.view.setAllSymbols(i)
            }

            clearSupportSymbols() {
                this.view.clearSupportSymbols()
            }

            idleIn() {
            }

            idleOut() {
            }

            startSpin(e, t) {
                this._spinStarted = this._spinStopping = this._spinComplete = !1, this.prepareSpinReelsOptions(), this.animationsService && this.animationsService.startSpin();
                const i = e._parse ? e._parse.outcome : e;
                this.validateRectDelays("start", i), this.view.startSpin(this.spinReelsOptions).then(() => {
                    t && t(), this._spinStarted = !0, this.doStopReels()
                })
            }

            validateRectDelays(e, t) {
                const i = this.animationsService.rules;
                Object.entries(t).forEach(([t, s]) => {
                    Object.entries(s).forEach(([s, n]) => {
                        if (i.rect[n.id]) {
                            let s = Number(t), o = s + i.rect[n.id][0] - 1, r = 0;
                            "start" === e && (s++, o++, r = this.spinReelsOptions[t][e].delay);
                            for (let t = s; t < o; t++) this.spinReelsOptions[t][e].delay = r
                        }
                    })
                })
            }

            prepareSpinReelsOptions() {
                this._spinSkiped = !1, this.progressTimeout = null, this.stoppingReelIndex = -1;
                const e = this.spinReelsOptions = [], t = .001 * +this.configs.timings.reelStartDuration,
                    i = .001 * +this.configs.timings.reelStepDuration,
                    s = .001 * +this.configs.timings.startDelayBetweenReels,
                    n = .001 * +this.configs.timings.startDelaySymbols,
                    o = this.configs.tweens && this.configs.tweens.startSpin;
                let r = 0;
                for (let a = 0; a < this.columns; a++) e[a] = {}, this.freezes[a] ? e[a].freeze = !0 : e[a].start = {
                    reverse: this.reverse[a],
                    duration: t,
                    stepDuration: i,
                    delay: s * r++,
                    symbolsDelay: n,
                    tween: o
                }
            }

            progressSpin(e) {
                if (this._spinSkiped) return e();
                const t = .001 * +this.configs.timings.spinProgressDuration;
                this.progressTimeout = c2d.Timeout.invoke(e, t)
            }

            skipSpin() {
                this._spinSkiped = !0;
                const e = {intrigue: !1, delay: 0, duration: .001 * +this.configs.timings.reelStopDuration};
                this.updateStopOptions(e);
                const t = +this.configs.timings.spinSkipSpeed;
                this.view.skipSpin(t), this.progressTimeout && this.progressTimeout.progress(1), c2d.globalStore.get("reelset.stopType.drop") || this.stopIntrigue(!0)
            }

            stopSpin(e, t, i) {
                this.phaseCallback = t;
                const {outcome: s, replaces: n} = this.parseDataResult(e);
                this.replaces = n;
                const o = this.getIntrigueList(s);
                this.initStopOptions({outcome: s, intrigue: o}), this.view.prepareStopSpin(s);
                const r = () => {
                    this._spinStopping = !0, this.doStopReels()
                };
                this.animationsService ? this.animationsService.stopSpin().then(r) : r()
            }

            getIntrigueList(e) {
                if (!this.intrigueRules) return [];
                const t = [], i = this.intrigueRules;
                t.length = this.columns, t.fill(!1);
                const {counter: s, ignore: n} = this.prepareIntrigue();
                return e.forEach((o, r) => {
                    Object.entries(s).some(([e, s]) => {
                        const n = s >= i[e].min && s < i[e].max, o = !i[e].reels || i[e].reels.includes(r);
                        if (n && o) return t[r] = !0
                    }), r != e.length - 1 && o.forEach(({row: e, id: t}) => {
                        if (!i[t]) return;
                        const o = r * this.view.maxRow + e;
                        n.includes(o) || (s[t] || (s[t] = 0), s[t]++)
                    })
                }), t
            }

            prepareIntrigue() {
                return {counter: {}, ignore: []}
            }

            initStopOptions({outcome: e, intrigue: t}) {
                const i = c2d.last(() => this.completeSpin(), this.columns);
                c2d.type.isNullOrUndefined(this.configs.timings.stopDelayBetweenReels) && this._logger.error("configs.timings.stopDelayBetweenReels is nod defined");
                const s = .001 * +this.configs.timings.stopDelayBetweenReels;
                for (let n = 0; n < this.columns; n++) {
                    const o = this.spinReelsOptions[n];
                    if (o.freeze) {
                        i();
                        continue
                    }
                    const r = .001 * +this.configs.timings.reelStopDuration,
                        a = .001 * +this.configs.timings.intrigueDuration,
                        l = .001 * this.configs.timings.stopDelaySymbols,
                        c = this.configs.tweens && this.configs.tweens.stopSpin, h = t[n],
                        u = h ? +this.configs.timings.intrigueSpeed : 1;
                    o.stop = Object.assign(Object.assign({
                        outcome: e[n],
                        intrigue: h,
                        intrigueDuration: a,
                        duration: r,
                        symbolsDelay: l,
                        delay: s,
                        speed: u,
                        tween: c
                    }, o.stop), {callback: i})
                }
                this.validateRectDelays("stop", e)
            }

            updateStopOptions(e) {
                let t = this.stoppingReelIndex + 1;
                const i = this.spinReelsOptions;
                if (i) if (c2d.type.isArray(e)) for (; t < e.length; t++) {
                    const s = e[t];
                    if (!s) continue;
                    const n = i[t] || {};
                    n.stop = Object.assign(Object.assign({}, n.stop), s)
                } else for (; t < i.length; t++) {
                    const s = i[t] || {};
                    s.stop = Object.assign(Object.assign({}, s.stop), e)
                }
            }

            doStopReels() {
                this._spinStarted && this._spinStopping && c2d.Timeout.invoke(() => this.doStopNext())
            }

            doStopNext() {
                const e = ++this.stoppingReelIndex, t = this.spinReelsOptions,
                    i = c2d.globalStore.get("reelset.stopType.drop");
                if (e >= t.length) return void (!i && !this._spinSkiped && this.stopIntrigue());
                const s = t[e];
                if (!s || s.freeze || !s.stop) return this.doStopNext();
                this.view.doStopReel(e, s.stop).then(() => this.doStopNext()), i || (s.stop.intrigue ? this.playIntrigue({index: e}) : !this._spinSkiped && this.stopIntrigue())
            }

            playIntrigue({index: e}) {
                const t = .001 * +this.configs.timings.intrigueDuration;
                this.view.playIntrigue(e, t)
            }

            stopIntrigue(e) {
                this.view.stopIntrigue(e)
            }

            completeSpin() {
                return n(this, void 0, void 0, (function* () {
                    this._spinComplete = !0, yield this.view.completeSpin(), this.phaseCallback && this.phaseCallback()
                }))
            }

            finishShowResult() {
                this.view.setAllSymbols(null, "static")
            }

            skipShowResult() {
                this.view.skipShowResult()
            }

            showWinSymbols(e, t = {}) {
                return n(this, void 0, void 0, (function* () {
                    const {updateCall: i = new Function} = t;
                    this.view.prepareShowWin();
                    let s = +this.configs.timings.delayBetweenWinGroups || 0;
                    return s *= .001, new Promise(n => {
                        const o = c2d.last(() => {
                            t.clear && this.view.hideWinSymbols(), n()
                        }, e.length);
                        e.forEach(({pos: e}, n) => {
                            this.view.showWinSymbols(e, {
                                delay: s * n,
                                onStart: () => i(n),
                                animation: t.animation
                            }).then(o)
                        }), this.view.updatePriorityWinSymbols(), this.view.showLoseSymbols()
                    })
                }))
            }

            destroyWinSymbols(e, t = {}) {
                return this.view.prepareShowWin(), new Promise(t => {
                    const i = c2d.last(() => {
                        this.view.hideWinSymbols(!1), t()
                    }, e.length), s = {animation: "destroy"};
                    e.forEach(({pos: e}, t) => {
                        this.view.showWinSymbols(e, s).then(i)
                    })
                })
            }

            mergeWinGroups(e) {
                const t = e.map(e => e.map(e => e));
                for (let e = t.length - 2; e >= 0; e--) {
                    const i = [];
                    t[e].forEach(({column: s, row: n}) => {
                        let o = e + 1;
                        for (; o < t.length;) {
                            const e = t[o];
                            e.forEach((t, r) => {
                                t.column === s && t.row === n && (i.includes(o) || i.push(o), e.splice(r, 1))
                            }), o++
                        }
                    }), i.sort((e, t) => t - e).forEach(i => {
                        t[e].push(...t[i]), t.splice(i, 1)
                    })
                }
                return t
            }

            dropPresentSymbols(e) {
                return n(this, void 0, void 0, (function* () {
                    yield this.view.dropPresentSymbols(e), this.prepareSpinReelsOptions()
                }))
            }

            swapSymbols(e) {
                return new Promise(t => {
                    const i = c2d.last(t, e.length);
                    e.forEach(e => {
                        this.view.swapSymbols(e).then(i)
                    })
                })
            }

            moveSymbols(e) {
                return new Promise(t => {
                    const i = c2d.last(t, e.length);
                    e.forEach(e => {
                        this.view.moveSymbols(e).then(i)
                    })
                })
            }

            replaceState() {
                return n(this, void 0, void 0, (function* () {
                    if (!this.replaces || 0 == this.replaces.length) return;
                    const e = [];
                    let t = !1;
                    this.replaces.forEach((i, s) => {
                        i && i.forEach(({row: i, id: n}) => {
                            -1 == n && (t = !0), e.push({column: s, row: i, id: n})
                        })
                    }), yield this.replaceSymbols(e), t && this.view.linkRectSymbols()
                }))
            }

            replaceSymbols(e, t, i) {
                return new Promise(s => {
                    const n = c2d.last(s, e.length);
                    e.forEach(e => {
                        this.view.replaceSymbols(e, t, i).then(n)
                    })
                })
            }

            destroySymbols(e) {
                return new Promise(t => {
                    const i = c2d.last(t, e.length);
                    e.forEach((e, t) => {
                        const [s, n] = Array.fromObject(e);
                        this.view.destroySymbols({column: s, row: n}).then(i)
                    })
                })
            }

            parseDataResult(...e) {
            }
        };
        o = s([modifiable], o), i.Controller = o
    }, {}],
    196: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.Handler = void 0;
        let n = class extends game.sources.Handler {
            get statesConfig() {
                return {
                    Start: {enter: this.onStart},
                    Init: {enter: this.onInitEnter, exit: this.onInitExit},
                    Intro: {enter: this.onIntroEnter, begin: this.onIntroBegin, exit: this.onIntroExit},
                    Replay: {begin: this.onIdleBegin},
                    Gifts: {begin: this.onIdleBegin},
                    Idle: {begin: this.onIdleBegin},
                    Spin: {check: this.hasSpin, enter: this.onSpinEnter, exit: this.onSpinExit},
                    SpinSymbols: {enter: this.waitSkip},
                    SpinStart: {enter: this.onSpinStart},
                    SpinProgress: {enter: this.onSpinProgress},
                    SpinStop: {enter: this.onSpinStop},
                    Drop: {check: this.hasDrop, begin: this.onShowResultExit},
                    DropSymbols: {enter: this.waitSkip},
                    PresentDrop: {enter: this.onPresentDrop},
                    NextDrop: {enter: this.onNextDrop},
                    ShowAllLines: {check: this.hasWins, enter: this.onShowAllLinesEnter},
                    ShowSingleLines: {check: this.hasSingleLines, enter: this.onShowSingleLinesEnter},
                    MainRestore: {check: this.hasMainRestore},
                    DestroyWinSymbols: {check: this.hasDestroyWinSymbols, enter: this.onDestroyWinSymbols},
                    ReplaceSymbols: {check: this.hasReplace, enter: this.replaceState},
                    ShowFreespinsReels: {enter: this.onShowFreespinsReelsEnter},
                    HideFreespinsReels: {enter: this.onHideFreespinsReelsEnter}
                }
            }

            get stateConfig_Replay() {
                return {
                    Replay: {enter: this.onReplayEnter, exit: this.onReplayExit},
                    ReplayProgress: {enter: this.onReplayProgressEnter}
                }
            }

            onInitialize() {
                game.fsm.actions.showNextLine = {}, this.registerStates(this.stateConfig_Replay)
            }

            emitReelStopped(e) {
                this.events.emit(this.events.config.COMPONENTS_REELSET_STOP_REEL, e)
            }

            onStart({finish: e, actions: t}) {
                e();
                return {
                    actions: {
                        changeBet: () => {
                            this.winData && this.winData.length > 0 && (this.winData = [], this.component.finishShowResult())
                        }
                    }
                }
            }

            onInitEnter({finish: e}) {
                e()
            }

            onInitExit({finish: e}) {
                this.component.mode = "basegame", this.initReels(), e()
            }

            initReels({forceReplace: e = !1} = {}) {
                const t = this.component.store.getInitFreespin(), i = this.component.store.getInitSpin();
                let s;
                s = t && t.symbols ? t.symbols : i && i.symbols ? i.symbols : this.component.store.getOutcome(), this.component.setReelsSymbols(s, e), this.updateSpinData()
            }

            onReplayEnter({finish: e}) {
                return e(), {onAbort: () => this.onAbort()}
            }

            onReplayProgressEnter({finish: e}) {
                this.isRepeat = !0, this.abort = !1;
                const t = this.component.store.getOutcome();
                this.component.setReelsSymbols(t, !0), e()
            }

            onReplayExit({finish: e}) {
                return this.isRepeat = !1, this.abort = !1, this.component.removeAllStickySymbols(), this.component.skipShowResult(), e(), {onFinish: () => this.initReels({forceReplace: !0})}
            }

            onIntroEnter({finish: e}) {
                const t = this.component.store.getOutcome();
                return t && (this.component.setReelsSymbols(t), this.updateSpinData()), e(), {onAbort: () => this.onAbort()}
            }

            onIntroBegin({finish: e}) {
                e(), this.abort = !1
            }

            onIntroExit({finish: e}) {
                return this.abort = !1, this.component.removeAllStickySymbols(), e(), {onFinish: () => this.initReels()}
            }

            onSpinEnter({finish: e}) {
                return this.component.onSpin(), e(), {
                    onFinish: () => {
                        this.isRepeat && (this.isRepeat = !1, this.initReels())
                    }
                }
            }

            onShowFreespinsReelsEnter({finish: e}) {
                this.abort || (this.component.controller.onFreespins(), this.initReels()), e()
            }

            onHideFreespinsReelsEnter({finish: e}) {
                this.abort || (this.component.controller.onFreespinsEnd(), this.initReels()), e()
            }

            onAbort() {
                this.abort || (this.abort = !0, this.component.onAbort())
            }

            onSpinExit({finish: e}) {
                this.abort && this.component.removeAllStickySymbols(), e()
            }

            onSpinStart({finish: e}) {
                this.winData = [], this.config.sticky && this._testSticky();
                const t = this.component.store.getOutcome();
                this.component.startSpin(t).then(e).catch(e => console.error(e))
            }

            _testSticky() {
                !this.stickyPosition && (this.stickyPosition = 0), this.stickyPosition++
            }

            onSpinProgress({finish: e}) {
                this.component.progressSpin().then(e).catch(e => console.error(e))
            }

            onSpinStop({finish: e}, t = !1) {
                c2d.globalStore.set("reelset.stopType.drop", t), this.updateSpinData(), console.info("%c Win ", "background: #54ff54;", this.winData);
                const i = this.component.store.getOutcome();
                this.component.stopSpin(i).then(e).catch(e => console.error(e))
            }

            waitSkip({finish: e}) {
                e();
                return {
                    onSkip: () => this.component.skipSpin(),
                    actions: {updateSpin: e => this.component.updateStopOptions(e)}
                }
            }

            updateSpinData() {
                this.winData = this.component.store.getUpdateWins(), this.dropData = this.component.store.getDestroySymbols(), this.updatePatterns()
            }

            updatePatterns() {
                this.swapSymbols = null, this.moveSymbols = null, this.replaceSymbols = null;
                const {swapSymbols: e, moveSymbols: t, replaceSymbols: i} = this.component.store.getPatterns();
                e && e.length && (this.swapSymbols = e), t && t.length && (this.moveSymbols = t), i && i.length && (this.replaceSymbols = i)
            }

            hasReplace() {
                return !this.abort && !!this.component.controller.replaces
            }

            replaceState({finish: e}) {
                this.component.replaceState().then(e)
            }

            hasWins() {
                return !this.abort && (this.winData && this.winData.length > 0)
            }

            onShowAllLinesEnter({finish: e, actions: t}) {
                if (this.abort) return void e();
                const i = {clear: !0, updateCall: e => t.showNextLine(this.winData[e])};
                let s;
                this.component.showWinSymbols(this.winData, i).then(e), this.component.canSkipShowLines && (s = () => {
                    i.clear = !1, this.component.skipShowResult(), e()
                });
                return {onFinish: () => this.component.finishShowResult(), onSkip: s}
            }

            hasDestroyWinSymbols() {
                return this.winData || (this.winData = this.component.store.getUpdateWins()), this.hasWins()
            }

            onDestroyWinSymbols({finish: e}) {
                this.component.destroyWinSymbols(this.winData).then(e)
            }

            onShowResultExit({finish: e}) {
                this.component.finishShowResult(), e()
            }

            onIdleBegin({finish: e, actions: t}) {
                this.component.controller.idleIn(), this.component.store.getInitSpin() ? this.winData = [] : this.winData || (this.winData = this.component.store.getUpdateWins());
                let i = 0;
                const s = () => {
                    this.winData && this.winData[i] && t.showNextLine(this.winData[i])
                };
                return this.component.showIdleLines && this.winData.length > 0 && !this.component.store.isAutospins ? s() : this.component.finishShowResult(), e(), {
                    actions: {
                        showNextLine: e => {
                            i = (i + 1) % this.winData.length, this.component.showWinSymbols([e], {
                                clear: !0,
                                animation: "win_static"
                            }).then(() => s())
                        }
                    }, onFinish: () => {
                        this.winData = null, this.component.controller.idleOut()
                    }
                }
            }

            hasSingleLines() {
                return !this.abort && (this.component.hasSingleLines() && this.winData && this.winData.length > 1)
            }

            hasMainRestore() {
                return this.component.hasMainRestore() && this.winData && this.winData.length > 0
            }

            onShowSingleLinesEnter({finish: e, actions: t}) {
                this.winData || (this.winData = this.component.store.getUpdateWins());
                let i = 0;
                const s = () => {
                    this.winData && i < this.winData.length ? (t.showNextLine(this.winData[i]), ++i) : e()
                };
                return this.winData && this.winData.length > 0 ? s() : (this.component.finishShowResult(), e()), {
                    actions: {
                        showNextLine: e => {
                            this.component.showWinSymbols([e], {clear: !0}).then(() => s())
                        }
                    }, onFinish: () => {
                        this.winData = null, this.component.controller.idleOut(), this.component.finishShowResult()
                    }, onSkip: e
                }
            }

            hasSpin() {
                return !1
            }

            hasDrop() {
                return !this.abort && (this.dropData && this.dropData.length > 0)
            }

            onPresentDrop({finish: e}) {
                this.abort ? e() : (this.isNeedDrop = !0, this.component.dropPresentSymbols(this.dropData).then(e))
            }

            onNextDrop(e) {
                const {finish: t} = e;
                if (!this.abort || this.isNeedDrop) return this.isNeedDrop = !1, this.onSpinStop(e, !0);
                t()
            }
        };
        n = s([modifiable], n), i.Handler = n
    }, {}],
    197: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.Store = void 0;
        let n = class extends game.sources.Store {
            addToGlobal() {
                this.addItem("getSymbolPosition")
            }

            getSymbolPosition(e, t) {
                return this.component.getGlobalSymbolPosition.call(this.component, e, t)
            }

            hasFreespins() {
                const e = this.getItem("getNextAction");
                return "freespin" == e || "initfreespin" == e || "initspin" == e
            }

            hasMainRestore() {
                const e = this.getItem("getNextAction");
                return "freespin" != e && "freerespin" != e && "initspin" != e
            }

            getInitFreespin() {
                return this.getItem("initfreespin")
            }

            get respins() {
                var e;
                return null === (e = this.getSpinData()) || void 0 === e ? void 0 : e.respin_chain
            }

            get hasActiveRespins() {
                return this.respins && this.respins.total != this.respins.count
            }

            getInitData() {
                return this.getItem("initData")
            }

            getInitSpin() {
                return this.getItem("initSpin")
            }

            getSpinData() {
                return this.getItem("spinData")
            }

            getDestroySymbols() {
                const e = this.getItem("spinData");
                return Array.fromObject(e && e.drop && e.drop.pos || [])
            }

            getGroupWin() {
                return this.getItem("groupWin")
            }

            getUpdateWins() {
                return this.getItem("refactorWins")
            }

            getOutcome() {
                return this.getItem("symbols")
            }

            getPatterns() {
                return this.getItem("patterns")
            }

            hasWins() {
                const e = this.getItem("spinData");
                return e && e.drop_chain.count
            }

            get turboMode() {
                return this.getItem("turboMode")
            }

            get isAutospins() {
                return this.getItem("isAutospins")
            }

            getTotalWin() {
                return this.getItem("totalWin")
            }

            getBet() {
                return this.getItem("bet")
            }
        };
        n = s([modifiable], n), i.Store = n
    }, {}],
    198: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        }, n = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.View = void 0;
        let o = class extends game.sources.View {
            constructor(e) {
                super(e), this.initializeVars()
            }

            initializeVars() {
                this.name = "reelsetComponent", this.reels = [], this.symbolPool = [], this.abortHandler = []
            }

            initializeAnimations(e) {
                this.animationsService = e
            }

            buildLayout() {
                this.initializetMask(), this.initializeIntrigue()
            }

            onAbort() {
                return n(this, void 0, void 0, (function* () {
                    if (this.isAbort = !0, this.abortHandler.length) {
                        let e;
                        for (; this.abortHandler.length;) {
                            const t = this.abortHandler.length - 1;
                            if (e === t) throw new Error(t.toString());
                            e = t, yield this.abortHandler[t]()
                        }
                    }
                }))
            }

            removeAbortHandler(e) {
                const t = this.abortHandler.indexOf(e);
                this.abortHandler.splice(t, 1)
            }

            initializetMask() {
                this.configs.mask && (this.maskView = new this.classes.Mask, this.maskView.initialize({
                    config: this.configs.mask,
                    layers: this.layers,
                    assetsStore: this.assetsStore
                }))
            }

            initializeIntrigue() {
                this.configs.intrigue && (this.intrigue = new this.classes.Intrigue, this.layers.intrigue.addChild(this.intrigue), this.intrigue.init(this.configs.intrigue, this.assetsStore, this.layers))
            }

            getSymbolPosition(e, t) {
                const i = +this.symbolConfig.width + +this.symbolConfig.indentX,
                    s = +this.symbolConfig.height + +this.symbolConfig.indentY;
                return {x: +e * i + .5 * i, y: +t * s + .5 * s}
            }

            getGlobalSymbolPosition(e, t) {
                const i = this.reels[e];
                return i ? i.getGlobalSymbolPosition(t) : this.getSymbolPosition(e, t)
            }

            getVoidSymbol() {
                if (this.symbolPool.length > 0) {
                    const e = this.symbolPool.pop();
                    return e.visible = !0, e
                }
                const e = new this.classes.Symbol;
                return e.initialize(this.symbolConfig, this.animationsService), e.returnToPool = () => this.returnToPool(e), e
            }

            returnToPool(e) {
                e.parent && e.parent.removeChild(e), e.removeAnimation(), e.visible = !1, this.symbolPool.push(e)
            }

            initializeReels() {
                const e = this.config.layout.reels;
                this.columns = e.count, this.rows = e.symbols.count, this.maxRow = c2d.type.isArray(this.rows) ? Math.max(...this.rows) : this.rows
            }

            createReels() {
                const e = this.config.layout.reels, t = e.positionY || 0;
                this.symbolConfig = {
                    debug: this.config.debugMode,
                    width: e.symbols.width,
                    height: e.symbols.height,
                    indentX: e.indent,
                    indentY: e.symbols.indent
                };
                const i = this.symbolConfig.width + this.symbolConfig.indentX;
                for (let e = 0; e < this.columns; e++) {
                    const s = new this.classes.Reel;
                    s.initialize({
                        animationsService: this.animationsService,
                        assetsStore: this.assetsStore,
                        configs: this.configs
                    });
                    const n = c2d.type.isArray(t) ? t[e] : t;
                    s.position.set(i * e, n);
                    const o = c2d.type.isArray(this.rows) ? this.rows[e] : this.rows;
                    s.buildReelLayout(e, {
                        getVoidSymbol: this.getVoidSymbol.bind(this),
                        symbolConfig: this.symbolConfig,
                        rows: o
                    }), this.layers.reels.addChild(s), this.reels.push(s)
                }
            }

            sortReels() {
                const e = this.config.layout.reels.priority;
                if (!e) return;
                const t = [];
                e.forEach(e => {
                    t.push(this.reels[e])
                }), t.reverse().forEach(e => {
                    this.layers.reels.addChildAt(e, 0)
                })
            }

            initializeWinView(e) {
                this.winView = new this.classes.Win, this.winView.initialize(Object.assign({
                    layers: this.layers,
                    reels: this.reels,
                    configs: this.configs,
                    animationsService: this.animationsService,
                    getVoidSymbol: this.getVoidSymbol.bind(this)
                }, e))
            }

            skipShowResult() {
                this.getAllSymbols().forEach((e, t) => {
                    this.reels[t];
                    e.forEach(e => {
                        e.stopAnimation(), e.setAnimation({animation: "static"}, {force: !0})
                    })
                })
            }

            setAllSymbols(e, t) {
                this.winView.returnWinSymbols(), this.winView.clear(), e ? (this._updateOutcome(e, t), this._setReelsSymbols(e), this.linkRectSymbols(), this.markPresentSymbols()) : this._setReelsSymbolsAnimation(t)
            }

            _updateOutcome(e, t) {
                t && e.forEach((e, i) => {
                    e.forEach(e => {
                        e.animation = t
                    })
                })
            }

            _setReelsSymbols(e) {
                e.forEach((e, t) => {
                    t >= this.reels.length || this.reels[t].setAllSymbols(e)
                })
            }

            _setReelsSymbolsAnimation(e) {
                this.reels.forEach(t => t.setAllSymbols(null, e))
            }

            setSymbol({column: e, row: t, id: i, animation: s, config: o}) {
                return n(this, void 0, void 0, (function* () {
                    yield this.reels[e].setSymbol(t, {id: i, animation: s, config: o})
                }))
            }

            onSpin() {
                this.isAbort = !1, this.winView.returnWinSymbols()
            }

            startSpin(e) {
                this.winView.onAbort(), this.winView.returnWinSymbols(), this.winView.clear();
                const t = this.configs.animations && this.configs.animations.beforeSpin;
                t && this.setAllSymbols(null, t);
                const i = c2d.waitLast(this.reels.length);
                return this.reels.forEach((t, s) => {
                    const n = e[s].start;
                    if (e[s].freeze || !n) return i.call();
                    t.startSpin(n).then(i.call).catch(i.call)
                }), i
            }

            skipSpin(e) {
                this.reels.forEach(t => t.skipSpin(e))
            }

            prepareStopSpin(e) {
            }

            doStopReel(e, t) {
                return n(this, void 0, void 0, (function* () {
                    yield this.reels[e].stopSpin(t), this.component.emitReelStopped(e)
                }))
            }

            playIntrigue(e, t) {
                if (!this.intrigue) return;
                const i = this.getGlobalSymbolPosition(e, 1), s = this.layers.intrigue.parent.toLocal(i);
                this.intrigue.play(s, t)
            }

            stopIntrigue(e) {
                this.intrigue && this.intrigue.stop(e)
            }

            completeSpin() {
                return n(this, void 0, void 0, (function* () {
                    this.linkRectSymbols(), this.markPresentSymbols();
                    const e = this.configs.timings.delayAfterStop / 1e3;
                    e && !this.isAbort && (yield c2d.Timeout.wait(e))
                }))
            }

            clearSupportSymbols() {
                this.reels.forEach(e => e.clearSupportSymbols())
            }

            getAllSymbols() {
                return this.reels.map(e => [...e.symbols])
            }

            linkRectSymbols() {
                if (!this.animationsService) return;
                const e = this.animationsService.rules;
                0 != Object.keys(e.rect).length && this.getAllSymbols().forEach((t, i) => {
                    const s = this.reels[i];
                    t.forEach((t, i) => {
                        if (t.link || !c2d.type.isNumber(t.id)) return;
                        const n = e.rect[t.id];
                        if (!n) return;
                        const o = (n[1] - 1) / 2;
                        let r = 0;
                        n[1] % 2 == 0 ? s.reverse && (r = n[1] - 1) : r = o;
                        for (let e = 0; e < n[0]; e++) for (let s = 0; s < n[1]; s++) {
                            const n = i + s - r, o = this.reels[t.column + e].symbols[n];
                            o && o != t && (o.link = t)
                        }
                    })
                })
            }

            markPresentSymbols() {
                this.reels.forEach(e => e.markPresentSymbols())
            }

            prepareShowWin() {
                this.winView.prepareShowWin()
            }

            showWinSymbols(e, t) {
                return n(this, void 0, void 0, (function* () {
                    const i = () => this.winView.onAbort();
                    this.abortHandler.push(i), yield this.winView.showWinSymbols(e, t), this.removeAbortHandler(i)
                }))
            }

            updatePriorityWinSymbols() {
                this.winView.updatePriorityWinSymbols()
            }

            showLoseSymbols() {
                this.winView.showLoseSymbols()
            }

            hideWinSymbols(e) {
                this.winView.returnWinSymbols(e)
            }

            dropPresentSymbols(e) {
                const t = c2d.waitLast(this.reels.length);
                let i = this.configs.timings.presentDropDuration;
                i *= .001;
                const s = [];
                return e.forEach(e => {
                    const [t, i] = Array.fromObject(e);
                    s[t] = s[t] || [], s[t][i] = !0
                }), this.reels.forEach((e, n) => {
                    e.dropPresentSymbols(s[n], i).then(t.call)
                }), t
            }

            swapSymbols({from: e, to: t}) {
                const i = this.reels[e[0]].getSymbol(e[1]), s = this.reels[t[0]].getSymbol(t[1]);
                this.layers.winSymbols.putChild(i), this.layers.winSymbols.putChild(s);
                const n = new c2d.Timeline, o = this.getSymbolPosition(e[0], e[1]),
                    r = this.getSymbolPosition(t[0], t[1]), a = .5 * (r.x - o.x), l = .5 * (r.y - o.y),
                    c = a * Math.cos(.5 * Math.PI) - l * Math.sin(.5 * Math.PI),
                    h = a * Math.sin(.5 * Math.PI) + l * Math.cos(.5 * Math.PI),
                    u = a * Math.cos(1.5 * Math.PI) - l * Math.sin(1.5 * Math.PI),
                    d = a * Math.sin(1.5 * Math.PI) + l * Math.cos(1.5 * Math.PI),
                    p = {x: c + o.x + 1 * a, y: h + o.y + 1 * l}, m = {x: u + o.x + 1 * a, y: d + o.y + 1 * l},
                    f = {x: i.x, y: i.y}, g = {x: s.x, y: s.y};
                let b = !0;
                n.to(f, 1, {
                    bezier: {type: "quadratic", values: [{x: o.x, y: o.y}, {x: p.x, y: p.y}, {x: r.x, y: r.y}]},
                    onUpdate: () => {
                        b && i.position.set(f.x, f.y)
                    },
                    ease: c2d.easing.Power4.easeInOut
                }, 0).to(g, 1, {
                    bezier: {
                        type: "quadratic",
                        values: [{x: r.x, y: r.y}, {x: m.x, y: m.y}, {x: o.x, y: o.y}]
                    }, onUpdate: () => {
                        b && s.position.set(g.x, g.y)
                    }, ease: c2d.easing.Power4.easeInOut
                }, 0).add(() => {
                    b = !1;
                    const n = i.id;
                    i.setAnimation({id: s.id}), s.setAnimation({id: n}), this.reels[e[0]].returnSymbol(i), this.reels[t[0]].returnSymbol(s), i.position.copyFrom(this.reels[e[0]].getSymbolPosition(e[1])), s.position.copyFrom(this.reels[t[0]].getSymbolPosition(t[1]))
                });
                const y = c2d.waitLast(), S = c2d.once(() => {
                    this.removeAbortHandler(S), n.progress(1), n.kill(), y.call()
                });
                return this.abortHandler.push(S), n.add(S), y
            }

            moveSymbols({from: e, to: t}, i = 1, s = !1) {
                const n = new c2d.Timeline, o = this.reels[e[0]].getSymbol(e[1]), r = o.id,
                    a = this.getGlobalSymbolPosition(e[0], e[1]), l = this.layers.winSymbols.toLocal(a),
                    c = this.getGlobalSymbolPosition(t[0], t[1]), h = this.layers.winSymbols.toLocal(c);
                this.layers.winSymbols.putChild(o), n.fromTo(o, i, {pixi: {x: l.x, y: l.y}}, {
                    pixi: {
                        x: h.x,
                        y: h.y
                    }
                }, 0).add(() => {
                    o.position.copyFrom(l), this.reels[t[0]].getSymbol(t[1]).setAnimation({id: r}), this.reels[e[0]].returnSymbol(o), s && o.removeAnimation()
                });
                const u = c2d.waitLast(), d = c2d.once(() => {
                    this.removeAbortHandler(d), n.kill(), u.call()
                });
                return this.abortHandler.push(d), n.add(d), u
            }

            replaceSymbols(e, t) {
                this.replaceSymbolDelay = this.replaceSymbolDelay || [];
                const {column: i, row: s, id: n} = e, {delay: o = 0, queue: r = !1} = t || {},
                    a = this.reels[i].getSymbol(s);
                if (-1 == n) return a.removeAnimation(), Promise.resolve();
                const l = c2d.waitLast();
                let c;
                if (c = r ? () => this._qeueReplaceSymbols(a, n).then(l.call) : () => this._syncReplaceSymbols(a, e).then(l.call), o) {
                    let e = null, t = !0;
                    const i = c2d.once(() => {
                        this.removeAbortHandler(i), t && (e && e.kill(), l.call())
                    });
                    this.abortHandler.push(i), e = c2d.Timeout.invoke(() => {
                        t = !1, i(), c()
                    }, o)
                } else c();
                return l
            }

            _qeueReplaceSymbols(e, t) {
                const i = c2d.waitLast(), s = c2d.once(() => {
                    this.removeAbortHandler(s), i.call()
                });
                return this.abortHandler.push(s), e.setAnimation({animation: "replace"}).then(() => e.setAnimation({
                    id: t,
                    animation: "appear"
                })).then(s).then(() => e.setAnimation({animation: "static"})), i
            }

            _syncReplaceSymbols(e, t) {
                const {column: i, row: s, id: n} = t, o = this.getGlobalSymbolPosition(i, s),
                    r = this.layers.winSymbols.toLocal(o), a = this.getVoidSymbol();
                this.layers.winSymbols.addChild(a), a.position.copyFrom(r);
                const l = c2d.waitLast(), c = c2d.once(() => {
                    this.removeAbortHandler(c), a.returnToPool(), e.setAnimation({
                        id: n,
                        animation: "static"
                    }, {replace: !0}), l.call()
                });
                this.abortHandler.push(c);
                return !e && console.error(t), e.setAnimation({animation: "replace"}), a.setAnimation({
                    id: n,
                    animation: "appear"
                }).then(c), l
            }

            destroySymbols({column: e, row: t}, i = 0) {
                const s = this.reels[e].getSymbol(t), n = c2d.waitLast();
                let o = null, r = !0;
                const a = c2d.once(() => {
                    this.removeAbortHandler(a), r && (o && o.kill(), n.call())
                });
                return this.abortHandler.push(a), o = c2d.Timeout.invoke(() => {
                    r = !1, a(), s.setAnimation({animation: "destroy"}).then(() => s.removeAnimation()).then(n.call)
                }, i), n
            }

            combinateSymbols(e, t) {
                const {column: i, row: s, id: n} = e, o = this.reels[i].getSymbol(s), r = c2d.waitLast(t[0] * t[1]);
                for (let n = 0; n < t[0]; n++) for (let a = 0; a < t[1]; a++) if (0 == n && 0 == a) this.replaceSymbols(e).then(r.call); else {
                    const e = this.reels[i + n].getSymbol(s + a);
                    e.setAnimation({animation: "replace"}).then(() => {
                        e.removeAnimation(), e.link = o
                    }).then(r.call)
                }
                return r
            }

            decaySymbols(e, t) {
                const {column: i, row: s, id: n} = e, o = this.reels[i].getSymbol(s), r = c2d.waitLast(),
                    a = c2d.once(() => {
                        this.removeAbortHandler(a), r.call()
                    });
                this.abortHandler.push(a);
                const l = c2d.last(a, t[0] * t[1]);
                return o.setAnimation({animation: "replace"}).then(() => {
                    for (let e = 0; e < t[0]; e++) for (let o = 0; o < t[1]; o++) {
                        this.reels[i + e].getSymbol(s + o).setAnimation({
                            id: n,
                            animation: "appear"
                        }, {replace: !0}).then(l)
                    }
                }), r
            }

            shiftReel(e, t) {
                this.reels[t].shift(e)
            }
        };
        o = s([modifiable], o), i.View = o
    }, {}],
    199: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("./Reelset"), n = e("./ReelsetHandler"), o = e("./ReelsetStore"), r = e("./ReelsetController"),
            a = e("./ReelsetView");
        e("./modifications/controller/parseDataResult");
        const l = e("./services/AnimationsManager"), c = e("./services/Animator"), h = e("./view/WinView"),
            u = e("./view/ReelView"), d = e("./view/SymbolView"), p = e("./view/IntrigueView"),
            m = e("./view/MaskView"), f = e("./mods/hideWinsLowerThanBet/HideWinsLowerThanBetReelsetView"), g = {
                Animator: c.Animator,
                AnimationsManager: l.AnimationsManager,
                Win: h.WinView,
                Reel: u.ReelView,
                Symbol: d.SymbolView,
                Intrigue: p.IntrigueView,
                Mask: m.MaskView
            };
        c2d.recursiveSet("mods.hideWinsLowerThanBet.View", f.HideWinsLowerThanBetReelsetViewMod, g);
        const b = {
            Component: s.Reelset,
            Handler: n.Handler,
            Store: o.Store,
            Controller: r.Controller,
            View: a.View,
            classes: g
        };
        (c2d.Logger ? c2d.Logger.Of("Reelset") : console).info("component version v0.01.0"), game.componentsManager.registerComponent("Reelset", b, "v0.01.0")
    }, {
        "./Reelset": 194,
        "./ReelsetController": 195,
        "./ReelsetHandler": 196,
        "./ReelsetStore": 197,
        "./ReelsetView": 198,
        "./modifications/controller/parseDataResult": 200,
        "./mods/hideWinsLowerThanBet/HideWinsLowerThanBetReelsetView": 209,
        "./services/AnimationsManager": 211,
        "./services/Animator": 212,
        "./view/IntrigueView": 213,
        "./view/MaskView": 214,
        "./view/ReelView": 215,
        "./view/SymbolView": 216,
        "./view/WinView": 217
    }],
    200: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("../../ReelsetController").Controller;

        class n extends s.Latest {
            parseDataResult(e, t = !1, i = !1) {
                if (!t && e._parse) return c2d.utils.Object.cloneDeep(e._parse);
                const s = !!this.store.getInitData(), n = this.animationsService && this.animationsService.rules,
                    o = [];
                let r;
                Object.entries(e).forEach(([i, a]) => {
                    const l = o[i = +i] = [];
                    Object.entries(a).forEach(([o, a]) => {
                        o = +o;
                        const {code: c, extra: h} = a, u = {id: c, row: o};
                        if (h && (u.extra = h, c2d.type.isNumber(parseInt(h.replace)) && (t || s && !this.config.restoreReplace ? u.id = h.replace : (r = r || {}, r[i] = r[i] || {}, r[i][o] = {code: h.replace}))), -1 != c) {
                            if (n) {
                                const t = n.rect[c];
                                if (t) {
                                    let s = o;
                                    for (let n = 0; n < t[0]; n++) for (let r = 0; r < t[1]; r++) {
                                        const a = e[i + n][o + r];
                                        if (!a || a.code != c) {
                                            0 == n && o <= 0 && (s -= t[1] - r);
                                            break
                                        }
                                        a.code = -1
                                    }
                                    return u.row = s, void l.push({row: s, id: c})
                                }
                            }
                            l.push(u)
                        }
                    })
                });
                const a = this.refactorViewData(o, i);
                let l;
                return r && (l = this.parseDataResult(r, !1, !0).outcome), e._parse ? (e._parse.outcome = a, e._parse.replaces = l) : Object.defineProperty(e, "_parse", {
                    value: {
                        outcome: a,
                        replaces: l
                    }, enumerable: !1
                }), this.parseDataResult(e)
            }

            refactorViewData(e, t) {
                const i = [], s = [0, this.view.maxRow - 1], n = this.animationsService && this.animationsService.rules;
                return e.forEach((e, t) => {
                    i[t] || (i[t] = []), e.forEach(e => {
                        const {row: o, id: r} = e;
                        if (o < s[0] ? s[0] = o : o > s[1] && (s[1] = o), n && n.rect && n.rect[r]) {
                            const e = n.rect[r], a = (e[1] - 1) / 2;
                            let l;
                            l = e[1] % 2 == 0 ? 0 : a, i[t].push({row: o + l, id: r});
                            for (let s = 0; s < e[0]; s++) {
                                i[t + s] || (i[t + s] = []);
                                for (let n = 0; n < e[1]; n++) 0 == s && n == l || i[t + s].push({row: o + n, id: -1})
                            }
                            const c = o + e[1] - 1;
                            c > s[1] && (s[1] = c)
                        } else i[t].push(e)
                    }), i[t].sort((e, t) => e.row - t.row)
                }), t || this.addSupportData(i, s), i
            }

            addSupportData(e, t) {
                e.forEach(e => {
                    const i = e.first.row;
                    if (i > t[0]) {
                        const s = [];
                        for (let e = t[0]; e < i; e++) s.push({row: e});
                        e.unshift(...s)
                    }
                    const s = e.last.row;
                    if (s < t[1]) for (let i = s + 1; i <= t[1]; i++) e.push({row: i})
                })
            }
        }

        s.modify(n)
    }, {"../../ReelsetController": 195}],
    201: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.dropReelViewModify = void 0;
        const s = e("../../view/ReelView").ReelView;
        i.dropReelViewModify = function () {
            class e extends s.Latest {
                setAllSymbols(e, t) {
                    if (e) {
                        const t = [...this.supportRows];
                        if (this.supportRows[0] = -1 * e.first.row, this.supportRows[1] = e.last.row - this.rows + 1, t[0] < this.supportRows[0]) {
                            const e = this.supportRows[0] - t[0];
                            let i = t[0];
                            for (; i < e;) {
                                const e = this.getVoidSymbol(), t = -1 * (i + 1), s = this.getSymbolPosition(t);
                                e.column = this.reelIndex, e.row = t, e.position.copyFrom(s), this.symbolsLayer.addChildAt(e, 0), this.symbols.unshift(e), i++
                            }
                        } else if (t[0] > this.supportRows[0]) {
                            const e = t[0] - this.supportRows[0];
                            for (let t = 0; t < e; t++) this.symbols.shift().returnToPool()
                        }
                        if (t[1] < this.supportRows[1]) {
                            const e = this.supportRows[1] - t[1];
                            for (let t = 0; t < e; t++) {
                                const e = this.getVoidSymbol(), i = t + this.rows, s = this.getSymbolPosition(i);
                                e.column = this.reelIndex, e.row = i, e.position.copyFrom(s), this.symbolsLayer.addChild(e), this.symbols.push(e)
                            }
                        } else if (t[1] > this.supportRows[1]) {
                            const e = t[1] - this.supportRows[1];
                            for (let t = 0; t < e; t++) this.symbols.pop().returnToPool()
                        }
                    }
                    super.setAllSymbols(e, t)
                }

                doStartSpin({duration: e, symbolsDelay: t, tween: i}) {
                    const s = e - t * (this.rows - 1), n = this.timeline.duration();
                    if (s < 0) {
                        let t = e / (this.rows - 1) * 1e3;
                        t = parseInt(t.toString()), console.error(`Reelset, Max "startDelaySymbols" value = ${t}.`)
                    }
                    this.symbols.forEach((e, o) => {
                        if (!e) return;
                        let r = n;
                        this.reverse ? r += t * o : r += t * (this.symbols.length - o - 1);
                        const a = this.configs.timings.drop ? this.getSymbolDropDelay(e, this.configs.timings.drop.start) : r;
                        this.timeline.fromTo(e, s, i.from, Object.assign(Object.assign({}, i.to), {onComplete: () => e.returnToPool()}), a)
                    }), this.symbols = []
                }

                doStopSpin(e) {
                    const {outcome: t, duration: i = 1, symbolsDelay: s, tween: n} = e;
                    this.supportRows[0] = -1 * t.first.row, this.supportRows[1] = t.last.row - this.rows + 1, this.doStopSpinDrops(e)
                }

                spinComplete() {
                    super.spinComplete()
                }
            }

            s.modify(e)
        }
    }, {"../../view/ReelView": 215}],
    202: [function (e, t, i) {
        "use strict";
        var s = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.stickyControllerModify = void 0;
        const n = e("../../ReelsetController").Controller;
        i.stickyControllerModify = function () {
            class e extends n.Latest {
                initializeVars() {
                    super.initializeVars(), this.stickyList = {}
                }

                updateStickyData() {
                    if (this.stickyData = this.store.freezeData, this.addStickySymbols = [], this.currentStickySymbols = [], this.removeStickySymbols = [], !this.stickyData) return;
                    const e = {}, t = {};
                    this.stickyData.current && Object.values(this.stickyData.current.pos_freeze).forEach(({
                                                                                                              code: i,
                                                                                                              pos: s
                                                                                                          }) => {
                        t[s[0]] = t[s[0]] || {}, e[s[0]] = e[s[0]] || {};
                        const n = {id: i, column: s[0], row: s[1]};
                        e[s[0]][s[1]] = t[s[0]][s[1]] = n, this.currentStickySymbols.push(n), this.removeStickySymbols.push(n)
                    }), this.stickyData.next && Object.values(this.stickyData.next.pos_freeze).forEach(({
                                                                                                            code: e,
                                                                                                            pos: i
                                                                                                        }) => {
                        if (t[i[0]] && t[i[0]][i[1]]) {
                            const e = t[i[0]][i[1]], s = this.removeStickySymbols.indexOf(e);
                            this.removeStickySymbols.splice(s, 1), delete t[i[0]][i[1]]
                        } else {
                            const t = {id: e, column: i[0], row: i[1]};
                            this.addStickySymbols.push(t)
                        }
                    })
                }

                hasSticky() {
                    return !!this.stickyData
                }

                restoreStickies() {
                    return new Promise(e => {
                        if (this.currentStickySymbols.length) {
                            const t = c2d.last(e, this.currentStickySymbols.length);
                            this.currentStickySymbols.forEach(e => {
                                const {id: i, column: s, row: n} = e, o = {column: s, row: n, id: i, animation: null};
                                this.addStickySymbol(o).then(t)
                            })
                        } else e()
                    })
                }

                addStickies() {
                    return new Promise(e => {
                        if (this.addStickySymbols.length) {
                            const t = c2d.last(e, this.addStickySymbols.length);
                            this.addStickySymbols.forEach(e => {
                                const {id: i, column: s, row: n} = e, o = {column: s, row: n, id: i};
                                this.addStickySymbol(o).then(t)
                            })
                        } else e()
                    })
                }

                removeStickies() {
                    return new Promise(e => {
                        if (this.removeStickySymbols.length) {
                            const t = c2d.last(e, this.removeStickySymbols.length);
                            this.removeStickySymbols.forEach(e => {
                                const {column: i, row: s} = e, n = {column: i, row: s};
                                this.removeStickySymbol(n).then(t)
                            })
                        } else e()
                    })
                }

                prepareIntrigue() {
                    const {counter: e, ignore: t} = super.prepareIntrigue(), i = Object.entries(this.stickyList),
                        s = this.intrigueRules;
                    return i.forEach(([i, n]) => {
                        s[i] && (e[i] || (e[i] = 0), e[i] += n.length, t.push(...n))
                    }), {counter: e, ignore: t}
                }

                addStickySymbol(e) {
                    const {column: t, row: i} = e, s = t * this.view.maxRow + i;
                    return new Promise(t => {
                        const {id: i} = this.view.addSticky(e, t);
                        (i || 0 === i) && (!this.stickyList[i] && (this.stickyList[i] = []), this.stickyList[i].push(s))
                    })
                }

                moveStickySymbol(e, t) {
                    const {id: i, remove: s} = this.view.moveSticky(e, t);
                    s && this._removeStickyData(Object.assign(Object.assign({}, e), {id: i}))
                }

                removeStickySymbol(e) {
                    return s(this, void 0, void 0, (function* () {
                        const {id: t} = this.view.removeSticky(e);
                        this._removeStickyData(Object.assign(Object.assign({}, e), {id: t}));
                        const i = this.configs.timings.removeStickyDuration / 1e3;
                        i && (yield c2d.Timeout.wait(i))
                    }))
                }

                _removeStickyData({column: e, row: t, id: i}) {
                    if (!i && 0 !== i) return;
                    const s = e * this.view.maxRow + t, n = this.stickyList[i].indexOf(s);
                    this.stickyList[i].splice(n, 1), 0 == this.stickyList[i].length && delete this.stickyList[i]
                }

                removeAllStickySymbols() {
                    this.stickyList = {}, this.view.removeAllStickySymbols()
                }
            }

            n.modify(e)
        }
    }, {"../../ReelsetController": 195}],
    203: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.stickyHandlerModify = void 0;
        const s = e("../../ReelsetHandler").Handler;
        i.stickyHandlerModify = function () {
            class e extends s.Latest {
                get stateConfig_Sticky() {
                    return {
                        RestoreSticky: {check: this.hasRestoreSticky, enter: this.restoreStickies},
                        AddSticky: {check: this.hasAddSticky, enter: this.addStickies},
                        RemoveSticky: {check: this.hasRemoveSticky, enter: this.removeStickies}
                    }
                }

                onReplayExit({finish: e}) {
                    return super.onReplayExit({
                        finish: () => {
                        }
                    }).onFinish(), this.updateSpinData(), this.hasRestoreSticky() ? (this.component.controller.restoreStickies().then(this.component.controller.removeStickies()).then(this.component.controller.addStickies()).then(e), {
                        onFinish: () => {
                        }
                    }) : (e(), {
                        onFinish: () => {
                        }
                    })
                }

                onInitialize() {
                    return this.registerStates(this.stateConfig_Sticky), super.onInitialize()
                }

                updateSpinData() {
                    return this.component.controller.updateStickyData(), super.updateSpinData()
                }

                hasSticky() {
                    return this.component.controller.hasSticky()
                }

                hasRestoreSticky() {
                    return this.hasSticky()
                }

                hasAddSticky() {
                    return this.hasSticky()
                }

                hasRemoveSticky() {
                    return this.hasSticky()
                }

                restoreStickies({finish: e}) {
                    this.component.controller.restoreStickies().then(e)
                }

                addStickies({finish: e}) {
                    this.abort ? e() : this.component.controller.addStickies().then(e)
                }

                removeStickies({finish: e}) {
                    this.abort ? e() : this.component.controller.removeStickies().then(e)
                }
            }

            s.modify(e)
        }
    }, {"../../ReelsetHandler": 196}],
    204: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.stickyStoreModify = void 0;
        const s = e("../../ReelsetStore").Store;
        i.stickyStoreModify = function () {
            class e extends s.Latest {
                addToGlobal() {
                    return this.addItem("stickyData"), super.addToGlobal()
                }

                get stickyData() {
                    return {
                        remove: this.component.controller.removeStickySymbols,
                        current: this.component.controller.currentStickySymbols,
                        add: this.component.controller.addStickySymbols
                    }
                }

                get freezeData() {
                    return this.getItem("freezeData")
                }
            }

            s.modify(e)
        }
    }, {"../../ReelsetStore": 197}],
    205: [function (e, t, i) {
        "use strict";
        var s = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.stickyViewModify = void 0;
        const n = e("../../ReelsetView").View;
        i.stickyViewModify = function () {
            class e extends n.Latest {
                initializeVars() {
                    super.initializeVars(), this.stickyList = {}, this.stickyCount = 0, this.underStickyAnimation = "replace"
                }

                initializeWinView(e) {
                    super.initializeWinView({
                        getStickySymbol: this.getStickySymbol.bind(this),
                        returnStickySymbol: this.returnStickySymbol.bind(this)
                    })
                }

                get hasSticky() {
                    return this.stickyCount > 0
                }

                getStickySymbol(e, t) {
                    return this.stickyList[e * this.maxRow + t]
                }

                returnStickySymbol(e) {
                    const t = e.toGlobal({x: 0, y: 0}), i = this.layers.sticky.toLocal(t);
                    e.position.copyFrom(i), this.layers.sticky.addChild(e)
                }

                _setReelsSymbolsAnimation(e) {
                    if (!this.hasSticky) return super._setReelsSymbolsAnimation(e);
                    const t = {replace: !0};
                    this.reels.forEach((i, s) => {
                        i.symbols.forEach(i => {
                            const n = this.getStickySymbol(s, i.row);
                            if (n) {
                                let s = e;
                                "static" == e && (s = "sticky_idle"), n.setAnimation({animation: s}, t), i.setAnimation({animation: this.underStickyAnimation}, t)
                            } else i.setAnimation({animation: e}, t)
                        })
                    })
                }

                completeSpin() {
                    const e = Object.create(null, {completeSpin: {get: () => super.completeSpin}});
                    return s(this, void 0, void 0, (function* () {
                        yield e.completeSpin.call(this), yield this.hideUnderSticky()
                    }))
                }

                hideUnderSticky() {
                    return s(this, void 0, void 0, (function* () {
                        if (!this.hasSticky || !this.underStickyAnimation) return Promise.resolve();
                        Object.keys(this.stickyList).forEach(e => {
                            const t = (e = +e) % this.maxRow, i = (e - t) / this.maxRow;
                            this.reels[i].getSymbol(t).setAnimation({animation: this.underStickyAnimation})
                        })
                    }))
                }

                addSticky({column: e, row: t, id: i, animation: s = "sticky_in"}, n) {
                    e = +e, t = +t, n = n || new Function;
                    const o = e * this.maxRow + t;
                    if (this.stickyList[o]) return n(), {};
                    const r = this.reels[e], a = r.getSymbol(t), l = this.getVoidSymbol(),
                        c = r.getGlobalSymbolPosition(t), h = this.layers.sticky.toLocal(c);
                    return l.position.copyFrom(h), this.layers.sticky.addChild(l), l.zIndex = t, this.layers.sticky.sortChildren(), i || 0 === i ? this.underStickyAnimation && a.setAnimation({animation: this.underStickyAnimation}) : (l.pullAnimation(a), i = l.id), s ? l.setAnimation({
                        id: i,
                        animation: s
                    }).then(n).then(() => l.setAnimation({animation: "sticky_idle"})) : (l.setAnimation({
                        id: i,
                        animation: "sticky_idle"
                    }), n()), this.stickyList[o] = l, this.stickyCount++, {id: i}
                }

                moveSticky(e, t) {
                    const i = this.reels[t.column];
                    let s;
                    if (i) s = i.getGlobalSymbolPosition(t.row); else {
                        const e = this.symbolConfig.width + this.symbolConfig.indentX,
                            i = this.symbolConfig.height + this.symbolConfig.indentY;
                        s = this.layers.reels.toGlobal({x: e * t.column + e / 2, y: i * t.row + i / 2})
                    }
                    const n = this.layers.sticky.toLocal(s), o = !i || t.row >= i.rows,
                        r = t.column * this.maxRow + t.row, a = this.getStickySymbol(e.column, e.row);
                    if (!a) return void console.error("Sticky is undefined.");
                    const l = a.id, c = e.column * this.maxRow + e.row;
                    return delete this.stickyList[c], this._doMoveSticky(a, n).then(() => {
                        o ? this._doRemoveSticky({}, a) : this.stickyList[r] = a
                    }), {id: l, remove: o}
                }

                _doMoveSticky(e, t) {
                    e.setAnimation({animation: "sticky_move"});
                    const i = new c2d.Timeline;
                    return i.to(e, .5, {
                        pixi: {x: t.x, y: t.y},
                        ease: c2d.easing.Power3.easeIn
                    }), new Promise(e => i.add(e))
                }

                removeSticky({column: e = -1, row: t = -1, change: i = !0}) {
                    let s, n;
                    if (e = +e, (t = +t) > -1) {
                        const o = this.reels[e];
                        o && t < o.rows && (s = e * this.maxRow + t, n = i ? o && o.getSymbol(t) : null)
                    }
                    const {id: o} = this._doRemoveSticky({lineIndex: s, symbol: n});
                    return {id: o}
                }

                _doRemoveSticky({lineIndex: e, symbol: t}, i) {
                    let s = i && i.id;
                    if (c2d.type.isNumber(e)) {
                        if (!i) {
                            if (!(i = this.stickyList[e])) return {};
                            s = i.id
                        }
                        delete this.stickyList[e], t && (i && t.pullAnimation(i), t.setAnimation({animation: "sticky_out"}).then(() => t.setAnimation({animation: "static"})))
                    }
                    return i.returnToPool(), this.stickyCount--, {id: s, sticky: i}
                }

                removeAllStickySymbols() {
                    Object.entries(this.stickyList).forEach(([e, t]) => {
                        const i = (e = +e) % this.maxRow, s = (e - i) / this.maxRow, n = this.reels[s].getSymbol(i);
                        this._doRemoveSticky({lineIndex: e, symbol: n}, t)
                    })
                }
            }

            n.modify(e)
        }
    }, {"../../ReelsetView": 198}],
    206: [function (e, t, i) {
        "use strict";
        var s = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.stickyWinViewModify = void 0;
        const n = e("../../view/WinView").WinView;
        i.stickyWinViewModify = function () {
            class e extends n.Latest {
                initializeVars() {
                    super.initializeVars(), this.winStickies = []
                }

                initialize(e) {
                    const {getStickySymbol: t, returnStickySymbol: i} = e;
                    this.getStickySymbol = t, this.returnStickySymbol = i, super.initialize(e)
                }

                returnWinSymbols() {
                    for (super.returnWinSymbols(); this.winStickies.length > 0;) {
                        const e = this.winStickies.pop();
                        this.returnStickySymbol(e)
                    }
                }

                showWinSymbols(e, t) {
                    const i = super.showWinSymbols(e, t);
                    return this.winStickies.length > 0 && this.layers.winSymbols.children.filter(e => this.winStickies.includes(e)).forEach(e => this.layers.winSymbols.addChild(e)), i
                }

                putWinSymbol(e, t, i) {
                    const s = this.getStickySymbol(t, i);
                    return s ? this.winStickies.includes(s) ? null : (this.winStickies.push(s), this.layers.winSymbols.putChild(s), s) : super.putWinSymbol(e, t, i)
                }

                winState(e, t, i, s) {
                    return this.winStickies.includes(e) && (i = "sticky_win"), super.winState(e, t, i, s)
                }

                loseState(e, t, i) {
                    const n = Object.create(null, {loseState: {get: () => super.loseState}});
                    return s(this, void 0, void 0, (function* () {
                        const s = this.getStickySymbol(e.column, e.row);
                        return s ? (t = "sticky_lose", n.loseState.call(this, s, t, i)) : n.loseState.call(this, e, t, i)
                    }))
                }
            }

            n.modify(e)
        }
    }, {"../../view/WinView": 217}],
    207: [function (e, t, i) {
        "use strict";
        var s = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.animationsRandomizeModify = void 0;
        const n = e("../../services/AnimationsManager").AnimationsManager;
        i.animationsRandomizeModify = function () {
            class e extends n.Latest {
                initializeVars() {
                    super.initializeVars(), this.randomQueue = [], this.randomCooldown = [], this.spinning = !1
                }

                initialize(e) {
                    const {columns: t, reverse: i} = e;
                    super.initialize(e), this.columns = t, this.reverse = i
                }

                initializeRules(e) {
                    super.initializeRules(e);
                    const t = this.configs.rules, i = this.types[e] || this.types[t.default] || {}, {
                            chances: s,
                            countChance: n,
                            reelsValid: o,
                            cooldown: r
                        } = this.parseRulesConfig(i.randomize), a = this.initializeReelsRules(s, n, o),
                        l = this._sortChances(a);
                    this.rules.chance = l, this.rules.cooldown = r
                }

                parseRulesConfig(e) {
                    const t = {reel: {}, reelset: {}}, i = [], s = {};
                    let n = 0;
                    if (e && e.forEach(({id: e, chance: o, reels: r, cooldown: a}) => {
                        o > 0 && (n += o, s[e] = o), r && i.push([e, r]), a && (a.reel && (t.reel[e] = a.reel), a.reelset && (t.reelset[e] = a.reelset))
                    }), 0 == n) {
                        const e = "symbols";
                        Object.keys(this.symbols[e]).forEach(e => {
                            n += 1, s[e] = 1
                        })
                    }
                    return {cooldown: t, reelsValid: i, chances: s, countChance: n}
                }

                initializeReelsRules(e, t, i) {
                    const s = [];
                    for (let i = 0; i < this.columns; i++) this.randomQueue[i] = [], this.randomCooldown[i] = {}, s[i] = {
                        valid: Object.assign({}, e),
                        count: t
                    };
                    return i.forEach(([e, t]) => {
                        s.forEach((i, s) => {
                            i.valid[e] && !t.includes(s) && (i.count -= i.valid[e], delete i.valid[e])
                        })
                    }), s
                }

                _sortChances(e) {
                    return e.map((e, t) => {
                        const i = [];
                        return Object.entries(e.valid).forEach(([t, s]) => {
                            s /= e.count;
                            const n = i.last;
                            !n || s >= n.chance ? i.push({id: t, chance: s}) : i.some((e, n) => {
                                if (s < e.chance) return i.splice(n, 0, {id: t, chance: s}), !0
                            })
                        }), i
                    })
                }

                getRandomAnimation(e = {}, t) {
                    this.randomQueue[t].length ? (e.id = this.randomQueue[t].pop(), this.decreaseCooldown(t), this.callToStopSpin && this.callToStopSpin()) : (e.id = this.getRandomId(t), this.decreaseCooldown(t), this.increaseCooldown(t, e.id), this.updateQueue(t, e));
                    const i = this.getAnimation(e);
                    return i ? Object.assign(Object.assign({}, e), i) : null
                }

                updateQueue(e, t) {
                    const {id: i} = t;
                    if (this.rules.train && this.rules.train[i]) {
                        const s = [...this.rules.train[i].sequence].reverse();
                        t.id = s.pop(), this.randomQueue[e].push(...s)
                    } else this.rules.rect[i] && (t.id = this._updateQueueWithRect({id: i, reelIndex: e}))
                }

                _updateQueueWithRect({id: e, reelIndex: t}) {
                    const i = this.rules.rect[e], s = (i[1] - 1) / 2;
                    let n = 0;
                    i[1] % 2 == 0 ? this.reverse[t] && (n = i[1] - 1) : n = s;
                    for (let s = 0; s < i[0]; s++) for (let o = 0; o < i[1]; o++) 0 == s && n == o ? this.randomQueue[t + s].push(e) : this.randomQueue[t + s].push(null);
                    return this.randomQueue[t].pop()
                }

                decreaseCooldown(e) {
                    const t = this.randomCooldown[e];
                    Object.keys(t).forEach(e => {
                        t[e] -= 1, 0 == t[e] && delete t[e]
                    })
                }

                increaseCooldown(e, t) {
                    const i = this.rules.cooldown.reelset[t], s = this.rules.cooldown.reel[t];
                    if (i && this.randomCooldown.forEach(e => {
                        (!e[t] || e[t] < i) && (e[t] = i)
                    }), s) {
                        const i = this.randomCooldown[e];
                        (!i[t] || i[t] < s) && (i[t] = s)
                    }
                }

                getRandomId(e) {
                    const t = [...this.rules.chance[e]];
                    let i, s, n = 1;
                    do {
                        c2d.type.isNumber(s) && (n -= t[s].chance, t.splice(s, 1), s = null);
                        const e = Math.random() * n;
                        let o = 0;
                        t.some((t, n) => {
                            if (e < o + t.chance) return i = t.id, s = n, !0;
                            o += t.chance
                        }) || (i = t.last.id, s = t.length - 1)
                    } while (this._hasWrongId(i, e));
                    return i
                }

                _hasWrongId(e, t) {
                    if (this.randomCooldown[t][e] > 0) return !0;
                    if (this.rules.train && !this.spinning && this.rules.train[e]) return !0;
                    const i = this.rules.rect[e];
                    if (i) {
                        if (!this.spinning) return !0;
                        const e = t + i[0];
                        for (let i = t; i < e; i++) if (!this.randomQueue[i] || this.randomQueue[i].length > 0) return !0
                    }
                    return !1
                }

                startSpin() {
                    return s(this, void 0, void 0, (function* () {
                        this.spinning = !0
                    }))
                }

                stopSpin() {
                    return this.spinning = !1, new Promise(e => {
                        this.callToStopSpin = () => !!this.readyToStopSpin && (this.callToStopSpin = null, e(), !0), this.callToStopSpin()
                    })
                }

                get readyToStopSpin() {
                    return this.randomQueue.every(e => 0 == e.length)
                }
            }

            n.modify(e)
        }
    }, {"../../services/AnimationsManager": 211}],
    208: [function (e, t, i) {
        "use strict";
        var s = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        }, n = this && this.__rest || function (e, t) {
            var i = {};
            for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (i[s] = e[s]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var n = 0;
                for (s = Object.getOwnPropertySymbols(e); n < s.length; n++) t.indexOf(s[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[n]) && (i[s[n]] = e[s[n]])
            }
            return i
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.wheelReelViewModify = void 0;
        const o = e("../../view/ReelView"), r = e("../../services/Animator"), a = o.ReelView;
        i.wheelReelViewModify = function () {
            class e extends a.Latest {
                initialize(e) {
                    super.initialize(e), this.isRandomizePriority = !1, this.useTimeAdjustment = !1, this.supportRows = [2, 2], this.axis = 1, this.animator = new r.Animator;
                    const t = new c2d.display.Container;
                    this.symbolsLayer.addChild(t), this.symbolsLayer = t
                }

                buildSymbols({startRow: e, symbolsCount: t}) {
                    super.buildSymbols({startRow: e, symbolsCount: t}), this.hideSupportSymbols()
                }

                randomizeVoidSymbols() {
                    this.getSupportSymbols().forEach(e => {
                        e.isVoid() && (e.setRandomAnimation({animation: "appear"}), e.pause(), e.visible = !1)
                    })
                }

                hideSupportSymbols() {
                    this.getSupportSymbols().forEach(e => {
                        e.link || e.isPresent || (e.visible = !1)
                    })
                }

                showSupportSymbols() {
                    this.getSupportSymbols().forEach(e => {
                        e.visible = !0
                    })
                }

                startSpin(e) {
                    this.spinSkipped = !1, this.isStartSpin = !0, this.showSupportSymbols();
                    const {delay: t, reverse: i, duration: s = 1, stepDuration: o} = e,
                        r = n(e, ["delay", "reverse", "duration", "stepDuration"]);
                    return this.reverse = i, this.axis = this.reverse ? -1 : 1, this.animator.clear(), t && (this.animator.add(t), this.startWheelDealy = t), this.doStartSpin(Object.assign(Object.assign({}, r), {duration: s})), this._rotateDuration = o || s / 5, new Promise(e => {
                        this.animator.call(() => {
                            this.isStartSpin = !1
                        }), this.animator.call(e), this._doRotateItems({loop: !0}), this.animator.play()
                    })
                }

                _onUpdate(e) {
                    this.symbolsLayer.y = this.symbolHeight * e * this.axis
                }

                doStartSpin({duration: e, tween: t}) {
                    let i = null;
                    t && t.ease && (i = r.Animator.getEaseFunction(t.ease)), this.animator.add(e, {
                        onStart: () => this._moveAnimations(e),
                        onUpdate: this._onUpdate.bind(this),
                        ease: i
                    })
                }

                _doRotateItems({duration: e, id: t, loop: i, extra: s}) {
                    e || (e = this._rotateDuration), this.animator.add(e, {
                        loop: i,
                        onStart: () => this._shiftSymbols({id: t, duration: e, extra: s}),
                        onUpdate: this._onUpdate.bind(this),
                        onRepeat: () => this._shiftSymbols({id: t, duration: e, extra: s})
                    })
                }

                _shiftSymbols({id: e, move: t = !0, duration: i, extra: s}) {
                    let n, o;
                    if (this.reverse) {
                        const e = this.symbols.last.y;
                        let t = this.symbols.length - 1;
                        for (; t > 0;) this.symbols[t].y = this.symbols[t - 1].y, t--;
                        n = this.symbols.last, o = this.symbols.shift(), o.y = e, this.symbols.push(o)
                    } else {
                        const e = this.symbols.first.y, t = this.symbols.length - 1;
                        for (let e = 0; e < t; e++) this.symbols[e].y = this.symbols[e + 1].y;
                        n = this.symbols.first, o = this.symbols.pop(), o.y = e, this.symbols.unshift(o)
                    }
                    o.removeAnimation(), c2d.type.isNumber(e) ? e > -1 && o.setAnimation({
                        id: e,
                        extra: s
                    }, {replace: !0}) : o.setRandomAnimation({animation: "appear"}, {replace: !0}), this.isRandomizePriority && this.addWithPriority(o), this.linkSymbol(n, o), !o.link && o.pause(), t && this._moveAnimations(i)
                }

                _moveAnimations(e) {
                    let t, i;
                    if (this.reverse ? (t = this.getSymbol(this.rows), i = this.getSymbol(0)) : (t = this.getSymbol(-1), i = this.getSymbol(this.rows - 1)), t.resume(), i.setAnimation({animation: "gone"}, {once: !0}), this.useTimeAdjustment) {
                        let s = e;
                        s /= this.animator.timeScale(), t.setAnimationDuration(s), i.setAnimationDuration(s)
                    }
                }

                skipSpin(e) {
                    return c2d.Timeout.completeInvoke("intrigueReel"), this.isStartSpin && this.startWheelDealy && this.animator.time < this.startWheelDealy && (this.animator.time = this.startWheelDealy), super.skipSpin(e)
                }

                stopSpin(e) {
                    const t = Object.create(null, {stopSpin: {get: () => super.stopSpin}});
                    return s(this, void 0, void 0, (function* () {
                        if (c2d.globalStore.get("reelset.stopType.drop")) return void (yield t.stopSpin.call(this, e));
                        const {
                            delay: i = 0,
                            intrigueDuration: s = this._rotateDuration,
                            duration: o = this._rotateDuration,
                            callback: r,
                            intrigue: a,
                            speed: l
                        } = e, c = n(e, ["delay", "intrigueDuration", "duration", "callback", "intrigue", "speed"]);
                        a && s && (yield c2d.Timeout.wait(s, "intrigueReel"));
                        const h = this.animator;
                        h.getCurrentTween().loop = !1, !this.spinSkipped && h.timeScale(l);
                        const u = c2d.waitLast();
                        a ? this.skipCall = u.call : h.call(u.call, {
                            start: h.time,
                            delay: i
                        }), this.doStopSpin(Object.assign({duration: o}, c)), h.call(u.call).call(() => this.spinComplete()).call(r), yield u
                    }))
                }

                doStopSpin(e) {
                    if (c2d.globalStore.get("reelset.stopType.drop")) return this.doStopSpinDrops(e);
                    const {outcome: t, duration: i, tween: s} = e;
                    this._addPreviousSymbols(t), this._addPresentSymbols(t, i), this._addNextSymbols(t), this._lastRotateLayer(t, i, s), this._lastShiftSymbols(t)
                }

                _addPreviousSymbols(e) {
                    if (this.reverse) for (; e.first.row < 0;) {
                        const {id: t, extra: i} = e.shift();
                        this._doRotateItems({id: t, extra: i})
                    } else for (; e.last.row > this.rows - 1;) {
                        const {id: t, extra: i} = e.pop();
                        this._doRotateItems({id: t, extra: i})
                    }
                }

                _addPresentSymbols(e, t) {
                    let i = this.rows;
                    1 == this.supportRows[0] && (i -= 1);
                    for (let t = 0; t < i; t++) {
                        const {id: t, extra: i} = this.reverse ? e.shift() : e.pop();
                        this._doRotateItems({id: t, extra: i})
                    }
                }

                _addNextSymbols(e) {
                    if (this.supportRows[0] < 3) return;
                    const t = this.supportRows[0] - 2, i = this.reverse ? e.shift() : e.pop(), s = i ? i.id : null,
                        n = i ? i.extra : null;
                    for (let e = 0; e < t; e++) this._doRotateItems({id: s, extra: n})
                }

                _lastRotateLayer(e, t, i) {
                    t || (t = this._rotateDuration);
                    let s, n, o = null;
                    if (i && i.ease && (o = r.Animator.getEaseFunction(i.ease)), e.length > 0) {
                        const t = this.reverse ? e.shift() : e.pop();
                        s = t.id, n = t.extra
                    }
                    this.animator.add(t, {
                        onStart: () => this._shiftSymbols({id: s, move: !0, duration: t, extra: n}),
                        onUpdate: this._onUpdate.bind(this),
                        ease: o
                    })
                }

                _lastShiftSymbols(e) {
                    this.animator.call(() => {
                        const t = this.reverse ? e.shift() : e.pop(), i = t ? t.id : null, s = t ? t.extra : null;
                        this._shiftSymbols({id: i, move: !1, extra: s}), this.symbolsLayer.y = 0
                    })
                }

                spinComplete() {
                    super.spinComplete(), this.announceAllSymbols(), this.hideSupportSymbols()
                }

                shift(e) {
                    this.animator.clear(), this.animator.call(() => this._shiftPrepare(e));
                    return this.animator.add(.5, {
                        onStart: () => this._moveAnimations(.5),
                        onUpdate: this._onUpdate.bind(this),
                        ease: r.Animator.easeInSine
                    }), this.animator.call(() => this._shiftComplete()), new Promise(e => {
                        this.animator.call(e), this.animator.play()
                    })
                }

                _shiftPrepare(e) {
                    this.showSupportSymbols(), e.forEach(({id: e, row: t, extra: i}) => {
                        const s = this.getSymbol(t - this.axis);
                        s && (-1 == e ? s.removeAnimation() : s.setAnimation({id: e, extra: i}, {replace: !0}))
                    });
                    const t = this.reverse ? 0 : this.rows - 1;
                    this.getSymbol(t).isPresent = !1
                }

                _shiftComplete() {
                    this._shiftSymbols({move: !1}), this.symbolsLayer.y = 0, this.markPresentSymbols(), this.hideSupportSymbols()
                }
            }

            a.modify(e)
        }
    }, {"../../services/Animator": 212, "../../view/ReelView": 215}],
    209: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.HideWinsLowerThanBetReelsetViewMod = void 0;
        const s = e("../../ReelsetView"), n = e("./HideWinsLowerThanBetReelsetWinView");
        i.HideWinsLowerThanBetReelsetViewMod = () => {
            const e = s.View;

            class t extends e.Latest {
                initializeWinView(e) {
                    n.HideWinsLowerThanBetReelsetWinViewMod(), this.winView = new game.sources.components.Reelset.classes.Win, this.winView.initialize(Object.assign({
                        layers: this.layers,
                        reels: this.reels,
                        configs: this.configs,
                        animationsService: this.animationsService,
                        getVoidSymbol: this.getVoidSymbol.bind(this)
                    }, e))
                }
            }

            e.modify(t)
        }
    }, {"../../ReelsetView": 198, "./HideWinsLowerThanBetReelsetWinView": 210}],
    210: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.HideWinsLowerThanBetReelsetWinViewMod = void 0;
        i.HideWinsLowerThanBetReelsetWinViewMod = () => {
            const e = game.sources.components.Reelset.classes.Win;
            game.sources.components.Reelset.classes.Win = class extends e {
                showWinSymbols(e, t) {
                    const i = c2d.globalStore.get("bet")();
                    return c2d.globalStore.get("totalWin")() >= i ? super.showWinSymbols(e, t) : new Promise(i => {
                        this.completeCall.push(i);
                        const s = c2d.last(() => this.onComplete(), e.length);
                        e.forEach(({column: e, row: i, code: n, animation: o}, r) => {
                            o = t.animation || o || "win";
                            let a = this.loseList[e][i];
                            if (!a) return void s();
                            if (this.loseList[e][i] = null, this.fullWinList[e] = this.fullWinList[e] || [], this.fullWinList[e][i]) return void s();
                            if (this.fullWinList[e][i] = !0, a = this.putWinSymbol(a, e, i), !a) return void s();
                            if (a.animationsService && !a.id && 0 !== a.id) return void s();
                            const l = a.getAnimation({id: a.id, animation: o}),
                                c = a.spine.getDurationByAnimationKey(l.config.animation);
                            c2d.Timeout.wait(c).then(s)
                        })
                    })
                }

                showLoseSymbols() {
                }
            }
        }
    }, {}],
    211: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        }, n = this && this.__rest || function (e, t) {
            var i = {};
            for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (i[s] = e[s]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var n = 0;
                for (s = Object.getOwnPropertySymbols(e); n < s.length; n++) t.indexOf(s[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[n]) && (i[s[n]] = e[s[n]])
            }
            return i
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.AnimationsManager = void 0;
        let o = class {
            constructor() {
                this.initializeVars()
            }

            initializeVars() {
                this.symbols = {}, this.spinePool = [], this._hasLong
            }

            initialize(e) {
                var {assetsStore: t} = e, i = n(e, ["assetsStore"]);
                this.configs = i, this.assetsStore = t
            }

            initializeRules(e) {
                const t = this.configs.rules;
                if (!t) return void (this.rules = {rect: {}, train: {}, priority: {}});
                this.types = {}, t.types.forEach(e => {
                    this.types[e.id] = e
                });
                const i = this.types[t.default];
                let s;
                s = e && this.types[e] && e !== t.default ? {
                    priority: this.types[e].priority || i.priority || [],
                    features: Object.assign(Object.assign({}, i.features), this.types[e].features)
                } : i;
                const n = {};
                if (s.priority && s.priority.forEach((e, t) => {
                    n[e] = t
                }), s.features = s.features || {}, this.rules = {
                    rect: {},
                    train: {},
                    priority: n
                }, s.features.rect && s.features.rect.forEach(e => {
                    this.rules.rect[e.id] = e.size
                }), s.features.train && s.features.train.forEach(e => {
                    this.rules.train[e.id] = e
                }), !this._hasLong) {
                    const e = Object.keys(this.rules.rect).length;
                    this._hasLong = e > 0
                }
            }

            hasLongSymbols() {
                return this._hasLong
            }

            parseSymbolsAnimations() {
                const e = {symbols: this.configs.animations.symbols || []};
                this.skeletonList = [], this._parseSymbolsConfig(e), delete this.skeletonList
            }

            _parseSymbolsConfig(e) {
                Object.entries(e).forEach(([e, t]) => {
                    this.symbols[e] = this._parseSymbolData(t, e)
                })
            }

            _parseSymbolData(e, t) {
                const i = {};
                if (!c2d.type.isArray(e)) throw new Error(`symbolsList should be Array type. Got '${typeof e}'. See: https://git.slygods.com/evoplay_slots/components/reelset/-/commit/eeb6f969e7b1e8c13a5c2290395cf504e9418b9b`);
                return e.forEach(({id: e, data: s}) => {
                    i[e] = this._parseSymbolAnimations(s, e, t)
                }), i
            }

            _parseSymbolAnimations(e, t, i) {
                const s = {};
                return e.forEach(e => {
                    const i = this.assetsStore.getSkeleton(e.spine);
                    if (!i) throw new Error(`Can not create animation "${e.key}" for symbol ${t}.`);
                    this.skeletonList.includes(i) || this.skeletonList.push(i);
                    const n = this.skeletonList.indexOf(i);
                    e.poolIndex = n, e.spine = i, s[e.key] = Object.assign({}, e)
                }), this._parseExtraAnimations(s, t), s
            }

            _parseExtraAnimations(e, t) {
                this.configs.animations.extra && this.configs.animations.extra.forEach(i => {
                    if (c2d.type.isString(i.spine)) {
                        const e = this.assetsStore.getSkeleton(i.spine);
                        if (!e) throw new Error(`Can not create extra animation "${i.key}" for symbol ${t}.`);
                        this.skeletonList.includes(e) || this.skeletonList.push(e);
                        const s = this.skeletonList.indexOf(e);
                        i.poolIndex = s, i.spine = e
                    }
                    e[i.key] = Object.assign({}, i)
                })
            }

            getAnimationConfig(e, t, i = "symbols") {
                const s = this.configs.symbolAnimationsMaps;
                t = t || s.default;
                let n = this.symbols[i][e][t];
                return !n && s[t] && (s[t].some(t => null === t ? (n = null, !0) : (n = this.symbols[i][e][t], n)), null === n) ? null : (n || (console.warn(`AnimationsManager error: no animation found in animations.json, symbol id: ${e}, animation key: ${t}. Used default animation.`), n = this.symbols[i][e][s.default]), !n && console.error("Config not found."), n || {})
            }

            returnToPool(e, t) {
                t.stop(), this.spinePool[e].push(t)
            }

            getSpineFromPool(e) {
                return this.spinePool[e] || (this.spinePool[e] = []), this.spinePool[e].pop()
            }

            getAnimation({id: e, animation: t, modifier: i = "symbols"} = {}, s) {
                if (!c2d.type.isString(e) && !c2d.type.isNumber(e)) return null;
                const n = this.getAnimationConfig(e, t, i);
                if (!n) return {};
                let o = this.getSpineFromPool(n.poolIndex);
                return o || (o = new c2d.display.Spine(n.spine), o.returnToPool = () => this.returnToPool(n.poolIndex, o)), {
                    spine: o,
                    config: n
                }
            }

            startSpin() {
                return Promise.resolve()
            }

            stopSpin() {
                return Promise.resolve()
            }
        };
        o = s([modifiable], o), i.AnimationsManager = o
    }, {}],
    212: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.array.iterator"), e("core-js/modules/es.object.assign"), e("core-js/modules/web.dom-collections.iterator"), Object.defineProperty(i, "__esModule", {value: !0}), i.Animator = void 0;
        i.Animator = class {
            static easeInQuad(e) {
                return e * e
            }

            static easeOutCubic(e) {
                return 1 - Math.pow(1 - e, 3)
            }

            static easeOutQuart(e) {
                return 1 - Math.pow(1 - e, 4)
            }

            static easeOutSine(e) {
                return Math.sin(e * Math.PI / 2)
            }

            static easeInSine(e) {
                return 1 - Math.cos(e * Math.PI / 2)
            }

            static easeInBack(e) {
                return 2.70158 * e * e * e - 1.70158 * e * e
            }

            static easeOutBack(e) {
                return 1 + 2.70158 * Math.pow(e - 1, 3) + 1.70158 * Math.pow(e - 1, 2)
            }

            static getEaseFunction(e) {
                const t = this[e];
                if ("function" != typeof t) throw new Error('Can not find ease "'.concat(e, '" in Animator.'));
                return t
            }

            constructor() {
                this.clear()
            }

            clear() {
                this.stop(), this.time = 0, this.tweens = [], this.track = [], this._speed = 1, this._playing = !1, this._tween = null, this._track = []
            }

            get speed() {
                return this._speed
            }

            set speed(e) {
                this._speed = e
            }

            timeScale(e) {
                if (!c2d.type.isNumber(e)) return this._speed;
                this._speed = e
            }

            update() {
                let e = this._tween;
                if (!e) return this.pause();
                for (this.time += this._speed * c2d.time.deltaTime; e && this.time >= e.start;) {
                    if (this.time >= e.end) {
                        if (!e.loop) {
                            e.onUpdate && e.onUpdate(1), e.onComplete && e.onComplete(), e = this.tweens[e.index + 1], e && e.onStart && e.onStart();
                            continue
                        }
                        e.onRepeat && e.onRepeat(), this.time -= e.duration
                    }
                    let t = (this.time - e.start) / e.duration;
                    if (e.ease && (t = e.ease(t)), e.onUpdate && e.onUpdate(t), !(t > 1 && e.loop)) break
                }
                this._tween = e, this.updateTrack()
            }

            updateTrack() {
                let e = this._track.length - 1;
                for (; e > -1; e--) {
                    const t = this._track[e];
                    if (!(this.time >= t.start)) break;
                    t.onStart(), this._track.pop()
                }
            }

            add(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const {delay: i, loop: s, onRepeat: n, onStart: o, onUpdate: r, onComplete: a, ease: l} = t;
                let c = this.tweens.last || {}, h = c.end || 0;
                return i && (this.tweens.push({
                    start: h,
                    duration: i,
                    end: h + i,
                    index: this.tweens.length
                }), c = this.tweens.last, h = c.end), this.tweens.push(Object.assign(Object.assign({}, t), {
                    start: h,
                    duration: e,
                    end: h + e,
                    index: this.tweens.length
                })), this
            }

            call(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (!c2d.type.isFunction(e)) return void console.error("First argument is not a Function.", e);
                const {delay: i = 0} = t;
                let {start: s} = t;
                if (s) {
                    s += i;
                    const t = {start: s, onStart: e};
                    let n;
                    if (0 == this.track.length || s < this.track.last.start) n = this.track.length, this.track.push(t); else {
                        !this.track.some((e, i) => {
                            n = i, e.start <= s && this.track.splice(i, 0, t)
                        }) && console.error("Call not added, something went wrong.")
                    }
                    this.time < s ? this._track.splice(n, 0, t) : this.time == s && e()
                } else t.onStart = e, this.add(0, t);
                return this
            }

            getLastTween() {
                return this.tweens.last
            }

            getCurrentTween() {
                return this._tween
            }

            pause() {
                return this._playing ? (this._playing = !1, PIXI.Ticker.shared.remove(this.update, this), this) : this
            }

            resume() {
                return this._playing || !this._tween || (this._playing = !0, PIXI.Ticker.shared.add(this.update, this, PIXI.UPDATE_PRIORITY.HIGH), this.update()), this
            }

            stop() {
                this.pause()
            }

            play() {
                this.time = 0;
                const e = this._tween = this.tweens[0];
                e && e.onStart && e.onStart(), this.track.length && (this._track = [...this.track]), this.resume()
            }
        }
    }, {
        "core-js/modules/es.array.iterator": 344,
        "core-js/modules/es.object.assign": 348,
        "core-js/modules/web.dom-collections.iterator": 353
    }],
    213: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.IntrigueView = void 0;
        let n = class extends c2d.display.Container {
            init(e, t, i) {
                this.name = "intrigue", this.visible = !1, this.back = this.createIntrigueLayer("intrigueBackground", e.background, t, i), this.over = this.createIntrigueLayer("intrigueOverground", e.overground, t, i)
            }

            createIntrigueLayer(e, t, i, s) {
                const n = t.spine, o = i.getSkeleton(n), r = new c2d.display.Spine(o);
                r.name = e;
                const a = t.customLayer;
                return a && !s[a] && console.warn(`IntrigueView error: no ${a} in layers, check please application.json or intrigue config`), (a && s[a] ? s[a] : this).addChild(r), r
            }

            play(e, t) {
                this.over.play("in", {}), this.over.play("idle", {force: !1, loop: !0});
                const i = this.over.findAnimation("out");
                if (i && i.duration) {
                    const e = t - i.duration;
                    this.over.play("out", {force: !1, delay: e})
                }
                this.visible ? (c2d.Tween.to(this.back, .2, {
                    pixi: {
                        x: e.x,
                        y: e.y
                    }
                }), c2d.Tween.to(this.over, .2, {
                    pixi: {
                        x: e.x,
                        y: e.y
                    }
                })) : (this.back.position.copyFrom(e), this.over.position.copyFrom(e), this.visible = !0, this.back.play("in").then(() => this.back.play("idle", {
                    loop: !0,
                    force: !1
                })))
            }

            stop(e) {
                if (!this.visible) return;
                this.intrigueTimeout && this.intrigueTimeout.kill();
                const t = () => this.visible = !1;
                if (e) {
                    const e = c2d.last(t, 2);
                    this.over.play("out").then(e), this.back.play("out").then(e)
                } else this.back.play("out").then(t)
            }
        };
        n = s([modifiable], n), i.IntrigueView = n
    }, {}],
    214: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.MaskView = void 0;
        let n = class {
            constructor() {
                this.initializeVars()
            }

            initializeVars() {
            }

            initialize({config: e, layers: t, assetsStore: i}) {
                this.config = e, this.layers = t, this.assetsStore = i, this.createMask()
            }

            createMask() {
                if (this.config.texture) {
                    const e = this.assetsStore.getTexture(this.config.texture);
                    this.mask = new c2d.display.Sprite(e), this.mask.renderable = !1
                } else this.config.rect && (this.mask = new PIXI.Graphics, this.mask.beginFill(16777215), this.mask.drawRect(...this.config.rect));
                this.layers.reelsMask.addChild(this.mask), this.layers.reelsMask.mask = this.mask
            }
        };
        n = s([modifiable], n), i.MaskView = n
    }, {}],
    215: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        }, n = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        }, o = this && this.__rest || function (e, t) {
            var i = {};
            for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (i[s] = e[s]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var n = 0;
                for (s = Object.getOwnPropertySymbols(e); n < s.length; n++) t.indexOf(s[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[n]) && (i[s[n]] = e[s[n]])
            }
            return i
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.ReelView = void 0;
        let r = class extends c2d.display.Container {
            initialize({animationsService: e, configs: t}) {
                this.name = "reel", this.symbols = [], this.symbolPositionY = [], this.supportRows = [0, 0], this.symbolsLayer = this, this.animationsService = e, this.configs = t
            }

            buildReelLayout(e, {getVoidSymbol: t, symbolConfig: i, rows: s}) {
                this.getVoidSymbol = t, this.reelIndex = e, this.symbolConfig = i, this.rows = s, this.symbolWidth = i.width + i.indentX, this.symbolHeight = i.height + i.indentY, this.buildSymbols({
                    startRow: 0,
                    symbolsCount: s
                })
            }

            buildSymbols({startRow: e, symbolsCount: t}) {
                for (e += -this.supportRows[0], t += this.supportRows[1]; e < t;) this._addSymbol(e), ++e
            }

            _addSymbol(e) {
                const t = .5 * this.symbolWidth, i = .5 * this.symbolHeight, s = this.getVoidSymbol(),
                    n = i + this.symbolHeight * e;
                this.symbolPositionY[e] = n, s.column = this.reelIndex, s.row = e, s.position.copyFrom({
                    x: t,
                    y: n
                }), this.symbolsLayer.addChild(s), this.symbols.push(s)
            }

            getSupportSymbols() {
                return [...this.symbols.slice(0, this.supportRows[0]), ...this.symbols.slice(this.supportRows[1] + this.rows)]
            }

            getSymbolPosition(e) {
                const t = .5 * this.symbolWidth;
                return e > -1 && e < this.rows ? {x: t, y: this.symbolPositionY[e]} : {
                    x: t,
                    y: .5 * this.symbolHeight + this.symbolHeight * e
                }
            }

            getGlobalSymbolPosition(e) {
                return this.toGlobal(this.getSymbolPosition(e))
            }

            getSymbol(e) {
                return e += this.supportRows[0], this.symbols[+e]
            }

            getPresentSymbols() {
                return this.symbols.slice(this.supportRows[0], this.supportRows[0] + this.rows)
            }

            setSymbol(e, t, i) {
                return n(this, void 0, void 0, (function* () {
                    yield this.getSymbol(e).setAnimation(t, i)
                }))
            }

            setAllSymbols(e, t) {
                if (e) e.forEach(({row: e, id: t, animation: i, extra: s}) => {
                    this._updateSymbol({row: e, id: t, animation: i, extra: s})
                }); else for (let e = 0; e < this.rows; e++) this.setSymbol(e, {animation: t}, {replace: !0});
                this.randomizeVoidSymbols(), this.sortPriority()
            }

            clearSupportSymbols() {
                this.getSupportSymbols().forEach(e => {
                    e.id = null
                })
            }

            _updateSymbol({row: e, symbol: t, id: i, animation: s, extra: n}) {
                t = t || this.getSymbol(e), (s || i || 0 === i) && -1 != i ? t.setAnimation({
                    id: i,
                    animation: s,
                    extra: n
                }, {replace: !0}) : t.removeAnimation()
            }

            randomizeVoidSymbols() {
            }

            sortPriority() {
                this.symbolsLayer.children.sort((e, t) => t.priority - e.priority || e.column - t.column || e.row - t.row)
            }

            addWithPriority(e) {
                const t = this.symbolsLayer.children.last;
                !e.priority || t.priority <= e.priority ? this.symbolsLayer.addChild(e) : this.symbolsLayer.children.some((t, i) => {
                    if (t.priority >= e.priority) return this.symbolsLayer.addChildAt(e, i), !0
                })
            }

            startSpin(e) {
                this.spinSkipped = !1;
                const {delay: t, reverse: i, duration: s = 1} = e, n = o(e, ["delay", "reverse", "duration"]);
                return this.reverse = i, this.clearTimeline(), t && this.timeline.set({}, {}, `+=${t}`), this.doStartSpin(Object.assign(Object.assign({}, n), {duration: s})), new Promise((e, t) => {
                    this.timeline.add(e)
                })
            }

            clearTimeline() {
                this.timeline && this.timeline.kill(), this.timeline = new c2d.Timeline
            }

            doStartSpin({duration: e}) {
                const t = e / this.symbols.length, i = this.timeline.duration();
                this.symbols.forEach((e, s) => {
                    let n = i;
                    this.reverse ? n += t * (this.symbols.length - s - 1) : n += t * s, this.timeline.add(() => {
                        e.removeAnimation()
                    }, n)
                }), this.timeline.set({}, {}, `+=${t}`)
            }

            skipSpin(e) {
                this.spinSkipped = !0, this._setTimeScale(e), this.skipCall && this.skipCall()
            }

            _setTimeScale(e) {
                this.animator && this.animator.timeScale(e), this.timeline && this.timeline.timeScale(e)
            }

            stopSpin(e) {
                const {delay: t = 0, duration: i = 1, callback: s, intrigue: n, speed: r} = e,
                    a = o(e, ["delay", "duration", "callback", "intrigue", "speed"]);
                this.timeline || (this.timeline = new c2d.Timeline);
                const l = this.timeline;
                return l.clear(), !this.spinSkipped && this._setTimeScale(r), new Promise(e => {
                    const o = c2d.once(e);
                    if (n) this.skipCall = o; else {
                        const e = c2d.globalStore.get("reelset.stopType.drop") && this.configs.timings.drop ? Math.abs(this.configs.timings.drop.stop.columnDelay / 1e3) : t;
                        l.add(o, e)
                    }
                    this.doStopSpin(Object.assign({duration: i}, a)), l.add(o).add(() => this.spinComplete()).add(s), l.play()
                })
            }

            doStopSpin({outcome: e, duration: t = 1}) {
                const i = t / this.symbols.length, s = this.timeline.duration();
                this.symbols.forEach((t, n) => {
                    let o = s;
                    this.reverse ? o += i * (this.symbols.length - n - 1) : o += i * n, this.timeline.add(() => {
                        t.setAnimation({id: e[n].id}), t.announce()
                    }, o)
                }), this.timeline.set({}, {}, `+=${i}`)
            }

            spinComplete() {
                this._setTimeScale(1), this.markPresentSymbols()
            }

            announceAllSymbols() {
                for (let e = 0; e < this.rows; e++) this.getSymbol(e).announce()
            }

            linkSymbol(e, t) {
                const i = this.animationsService.rules;
                i.rect[t.id] ? (!this.reverse || i.rect[t.id][1] > 2) && (e.link = t) : i.rect[e.id] && (this.reverse || i.rect[e.id][1] > 2) && (t.link = e)
            }

            markPresentSymbols() {
                for (let e = 0; e < this.rows; e++) {
                    const t = this.getSymbol(e);
                    t.column = this.reelIndex, t.row = e, t.isPresent = !0, t.visible = !0, t.isLink() && (t.link.visible = !0)
                }
            }

            returnSymbol(e) {
                this.symbolsLayer.putChild(e)
            }

            shift(e) {
            }

            getSymbolDropDelay(e, t) {
                if (!t) return 0;
                const i = this.configs.config.layout.reels, s = i.count, n = i.symbols.count;
                let o = t.defaultDelay ? t.defaultDelay / 1e3 : 0;
                const r = (e, t, i) => {
                    if (i) {
                        let s = e;
                        i < 0 && (s = t - s), o += s * Math.abs(i) / 1e3
                    }
                };
                return r(e.row, n, t.rowDelay), r(e.column, s, t.columnDelay), o
            }

            dropPresentSymbols(e, t) {
                return e ? (c2d.globalStore.set("reelset.stopType.drop", !0), this.clearTimeline(), this.symbols.reduceRight((i, s, n) => {
                    const o = n - this.supportRows[0];
                    if (e[o]) return s.returnToPool(), this.symbols[n] = null, ++i;
                    if (i > 0 && o >= 0) {
                        this.symbols[n + i] = s, this.symbols[n] = null, s.column = this.reelIndex, s.row = o + i;
                        const e = this.getSymbolPosition(o + i);
                        this.timeline.to(s, t, {
                            pixi: {y: e.y},
                            onComplete: () => s.announce("in_place"),
                            ease: c2d.easing.Power2.easeIn
                        }, 0)
                    }
                    return i
                }, 0), new Promise(e => {
                    c2d.Timeout.invoke(e, t)
                })) : Promise.resolve()
            }

            doStopSpinDrops({outcome: e, duration: t = 1, symbolsDelay: i, tween: s}) {
                const n = t - i * (this.rows - 1);
                if (n < 0) {
                    let e = t / (this.rows - 1) * 1e3;
                    e = parseInt(e.toString()), console.error(`Reelset, Max "stopDelaySymbols" value = ${e}.`)
                }
                !this.reverse && e.reverse(), e.reduce((e, {row: t, id: o}, r) => {
                    const a = t + this.supportRows[0];
                    if (this.symbols[a]) return e;
                    const l = this.getVoidSymbol();
                    this.symbolsLayer.addChild(l), this.symbols[a] = l;
                    const c = this.getSymbolPosition(t);
                    l.column = this.reelIndex, l.row = t, l.position.copyFrom(c);
                    const h = Object.assign({}, s.to);
                    h.pixi = Object.assign(Object.assign({}, s.to.pixi), {y: c.y});
                    const u = this.configs.timings.drop ? this.getSymbolDropDelay(l, this.configs.timings.drop.stop) : e;
                    return this.timeline.fromTo(l, n, s.from, Object.assign(Object.assign({}, h), {
                        onStart: () => this._updateSymbol({
                            symbol: l,
                            id: o
                        }), onComplete: () => l.announce("in_place")
                    }), u), e + i
                }, this.timeline.duration())
            }
        };
        r = s([modifiable], r), i.ReelView = r
    }, {}],
    216: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        }, n = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.SymbolView = void 0;
        let o = class extends c2d.display.Container {
            initialize(e, t) {
                this.name = "symbol", this.column = null, this.row = null, this.link = null, this.animationsService = t, this.symbolConfig = e, this._isPresent = !1, this.spine = null, this.spineIndex = null;
                const {width: i, height: s, debug: n} = e;
                if (n) {
                    const e = new c2d.display.Graphics;
                    e.beginFill(6908415), e.drawRect(-i / 2, -s / 2, i, s), this.addChild(e)
                }
            }

            get isPresent() {
                return this._isPresent
            }

            set isPresent(e) {
                this.isLink() ? this.link.isPresent = e : this._isPresent = e
            }

            stopAnimation() {
                this.spine && this.spine.stop()
            }

            setAnimation({id: e, animation: t, modifier: i}, s) {
                var o, r;
                return n(this, void 0, void 0, (function* () {
                    let {once: n = !1} = s || {};
                    const {replace: a = !1, onComplete: l, onEvent: c, force: h} = s || {};
                    if (!this.id && 0 !== this.id && !e && 0 !== e) return Promise.resolve();
                    if (a) this.link = null, this.oneTimeAnimation = null; else if (this.isLink()) return this.link.setAnimation({
                        id: e,
                        animation: t,
                        modifier: i
                    }, s);
                    if ("static" == t && (n = !0), n) {
                        if (this.oneTimeAnimation === t) return Promise.resolve();
                        this.oneTimeAnimation = t
                    }
                    e || 0 === e || (e = this.id);
                    const u = this.getAnimation({id: e, animation: t, modifier: i});
                    if (!u) return this.removeAnimation(), Promise.resolve();
                    const {spine: d, config: p} = u;
                    if (!p) return Promise.resolve();
                    if (this.id = e, this.spineIndex === p.poolIndex && (null === (o = this.spine.skin) || void 0 === o ? void 0 : o.toString()) === (null === (r = p.skin) || void 0 === r ? void 0 : r.toString())) d.returnToPool(); else {
                        if (!d) return console.error("Symbol spine is undefined", {
                            id: e,
                            animation: t,
                            modifier: i
                        }), Promise.reject();
                        this.spineIndex = p.poolIndex, this.spine && (this.removeChild(this.spine), this.spine.returnToPool()), this._changeSkin(d, p.skin), this.reposition(), this.priority = this.animationsService.rules.priority[e]
                    }
                    this.animation = p.animation;
                    const m = {loop: p.loop, force: !0, onComplete: l, onEvent: c};
                    void 0 !== h ? m.force = h : void 0 !== p.force && (m.force = p.force), yield this.spine.play(p.animation, m)
                }))
            }

            _changeSkin(e, t) {
                t && (e.skin = t), this.addChild(e), this.spine = e
            }

            setRandomAnimation(e = {}, t) {
                return n(this, void 0, void 0, (function* () {
                    if (this.isLink()) return Promise.resolve();
                    const {replace: i = !1} = t || {};
                    i && (this.oneTimeAnimation = null);
                    const s = this.getRandomAnimation(e);
                    if (!s) return this.removeAnimation(), Promise.resolve();
                    const {spine: n, config: o, id: r, animation: a} = s;
                    if (!n) return console.error("Symbol spine is undefined", s), Promise.reject();
                    this.spineIndex = o.poolIndex, this.id = r, this.animation = a, this.spine && (this.removeChild(this.spine), this.spine.returnToPool()), this._changeSkin(n, o.skin), this.reposition(), this.priority = this.animationsService.rules.priority[r], yield this.spine.play(o.animation, {
                        loop: o.loop,
                        force: o.force
                    })
                }))
            }

            reposition() {
                const {width: e, height: t, indentX: i, indentY: s} = this.symbolConfig,
                    n = this.animationsService.rules, o = e + i, r = t + s;
                this.pivot.set(0);
                const a = n.rect[this.id];
                a && (this.pivot.x = -o / 2 * (a[0] - 1), 2 == a[1] && (this.pivot.y = -r / 2))
            }

            removeAnimation() {
                this.link = null, this.oneTimeAnimation = null, this._isPresent = !1, this.spine && (this.removeChild(this.spine), this.spine.returnToPool()), this.spineIndex = null, this.id = null, this.animation = null, this.spine = null, this.priority = null
            }

            isVoid() {
                return !this.id && 0 !== this.id && !this.link
            }

            isLink() {
                return !!this.link
            }

            getAnimation(e) {
                return this.animationsService.getAnimation(e, this.column)
            }

            getRandomAnimation(e) {
                return this.animationsService.getRandomAnimation(e, this.column)
            }

            pullAnimation(e) {
                this.isLink() && console.error("Add handler"), this.removeAnimation(), this.id = e.id, this.animation = e.animation, this.priority = e.priority, this._isPresent = e._isPresent, this.spineIndex = e.spineIndex, this.spine = e.spine, this.addChild(e.spine), e.spine = null, e.removeAnimation()
            }

            announce(e = "stop") {
                return n(this, void 0, void 0, (function* () {
                    this.isLink() ? yield this.link.announce() : yield this.setAnimation({animation: e}, {once: !0}).then(() => {
                        this.setAnimation({animation: "static"})
                    })
                }))
            }

            pause() {
                return this.isLink() ? this.link.pause() : (this.spine && this.spine.pause(), this)
            }

            resume() {
                return this.isLink() ? this.link.resume() : (this.spine && this.spine.resume(), this)
            }

            setAnimationDuration(e) {
                return this.isLink() ? this.link.setAnimationDuration(e) : (this.spine && this.spine.duration(e), this)
            }
        };
        o = s([modifiable], o), i.SymbolView = o
    }, {}],
    217: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        }, n = this && this.__awaiter || function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.WinView = void 0;
        let o = class {
            constructor() {
                this.initializeVars()
            }

            initializeVars() {
                this.layers = null, this.reels = null, this.fullWinList = null, this.winSymbols = [], this.completeCall = []
            }

            initialize({layers: e, reels: t, configs: i, getVoidSymbol: s, animationsService: n}) {
                this.layers = e, this.reels = t, this.configs = i, this.getVoidSymbol = s, this.animationsService = n
            }

            get hasWin() {
                return this.fullWinList && this.fullWinList.length > 0
            }

            clear() {
                this.fullWinList = []
            }

            getPresentSymbols() {
                return this.reels.map(e => e.getPresentSymbols())
            }

            prepareShowWin() {
                this.clear(), this.timeline && this.timeline.kill(), this.timeline = new c2d.Timeline, this.symbolsDelay = +this.configs.timings.delayBetweenSymbolsWin || 0, this.symbolsDelay *= .001, this.loseList = this.getPresentSymbols()
            }

            onAbort() {
                for (this.timeline && this.timeline.kill(); this.completeCall.length;) this.onComplete()
            }

            onComplete() {
                if (0 == this.completeCall.length) return;
                this.completeCall.pop()()
            }

            showWinSymbols(e, t) {
                return new Promise(i => {
                    this.completeCall.push(i);
                    const s = c2d.last(() => this.onComplete(), e.length);
                    t.onStart && this.timeline.add(t.onStart, t.delay), e.forEach(({
                                                                                       column: e,
                                                                                       row: i,
                                                                                       code: n,
                                                                                       animation: o
                                                                                   }, r) => {
                        o = t.animation || o;
                        let a = this.loseList[e][i];
                        if (!a) return void s();
                        if (this.loseList[e][i] = null, this.fullWinList[e] = this.fullWinList[e] || [], this.fullWinList[e][i]) return void s();
                        if (this.fullWinList[e][i] = !0, a = this.putWinSymbol(a, e, i), !a) return void s();
                        if (a.animationsService && !a.id && 0 !== a.id) return void s();
                        const l = t.delay + r * this.symbolsDelay;
                        this.timeline.add(() => {
                            const e = {onComplete: s, column: a.column, row: a.row, animation: o, symbol: a, id: n};
                            this.changeSymbolState(e, !0)
                        }, l)
                    })
                })
            }

            putWinSymbol(e, t, i) {
                return e.link && (e = e.link), this.winSymbols.includes(e) ? null : (this.winSymbols.push(e), this.layers.winSymbols.putChild(e), e)
            }

            updatePriorityWinSymbols() {
                this.winSymbols.sort((e, t) => e.column - t.column || e.row - t.row).forEach(e => this.layers.winSymbols.addChild(e))
            }

            showLoseSymbols() {
                const e = [];
                this.loseList.forEach((t, i) => {
                    t.forEach((t, s) => {
                        if (t) {
                            if ((t = this.putLoseSymbol(t, i, s)).link) t = t.link, i = t.column, s = t.row; else if (t.animationsService && !t.id && 0 !== t.id) return;
                            this.winSymbols.includes(t) || e.includes(t) || (e.push(t), this.changeSymbolState({
                                symbol: t,
                                column: i,
                                row: s,
                                animation: "lose"
                            }).then(() => {
                                const e = this.configs.animations && this.configs.animations.afterLose;
                                e && this.changeSymbolState({symbol: t, column: i, row: s, animation: e})
                            }))
                        }
                    })
                })
            }

            putLoseSymbol(e, t, i) {
                return e
            }

            changeSymbolState(e, t) {
                return n(this, void 0, void 0, (function* () {
                    const {column: i, row: s, id: n, onComplete: o} = e;
                    let {symbol: r, animation: a} = e;
                    r = r || this.reels[i].getSymbol(s), t ? (a = a || "win", yield this.winState(r, n, a, o)) : yield this.loseState(r, a, o)
                }))
            }

            winState(e, t, i, s) {
                const n = {once: !1, replace: !0, onComplete: s};
                return new Promise(t => {
                    (new c2d.Timeline).add(() => {
                        e.setAnimation({animation: i}, n).then(t)
                    })
                })
            }

            loseState(e, t, i) {
                return n(this, void 0, void 0, (function* () {
                    const s = {once: !0, replace: !1, onComplete: i};
                    yield e.setAnimation({animation: t}, s)
                }))
            }

            returnWinSymbols(e = !0) {
                const t = e && this.configs.animations && this.configs.animations.afterWin;
                for (; this.winSymbols.length;) {
                    const e = this.winSymbols.pop(), i = {replace: !0};
                    t && e.setAnimation({animation: t}, i), this.reels[e.column].returnSymbol(e)
                }
            }
        };
        o = s([modifiable], o), i.WinView = o
    }, {}],
    218: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.Replay = void 0;
        let n = class extends game.sources.VisualComponent {
            build() {
                this.controller.build()
            }

            closeReplay(e) {
                this.controller.closeReplay(e)
            }

            startReplay(e) {
                this.controller.startReplay(e)
            }

            updateStore() {
                this.controller.updateStore()
            }

            makeChoice({choiceAction: e}) {
                const t = this.store.getSpinData();
                if (t) {
                    const {choice: i, multichoice: s} = t, n = i || s;
                    c2d.Timeout.invoke(() => e(n), 0)
                }
            }

            updateRepeatHandler(e) {
                this.controller.updateRepeatHandler(e)
            }

            updateAbortHandler(e) {
                this.controller.updateAbortHandler(e)
            }

            complete() {
                this.controller.complete()
            }

            checkGiftFreespins() {
                return this.store.checkGiftFreespins()
            }

            canPlayRespin() {
                const e = this.store.respins, t = this.controller;
                return e && t.dataIndex < t.data.length - 1
            }

            get active() {
                return this._active
            }

            set active(e) {
                this._active = e
            }

            updateFreespins() {
                this.controller.updateFreespins(...arguments)
            }

            disableCloseButton() {
                this.view.tree.nodeMap.closeButton.enable(!1)
            }

            enableCloseButton() {
                this.view.tree.nodeMap.closeButton.enable(!0)
            }

            setReplayFrameVisibility(e) {
                this.view.setVisible(e)
            }
        };
        n = s([modifiable], n), i.Replay = n
    }, {}],
    219: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.ReplayController = void 0;
        let n = class extends game.sources.Controller {
            create() {
                super.create(), this.data = null, this.dataIndex = -1
            }

            build() {
                this.view.build()
            }

            updateHistoryHandler(e) {
                this.getHistory = () => e(e => this.updateHistoryData(e), this.dataRound)
            }

            updateData(e) {
                this.startHandler = e, this.getHistory()
            }

            updateHistoryData(e) {
                var t, i;
                this.previousData = Array.fromObject(e.previous).last, this.data = Array.fromObject(e.current);
                const s = this.data.first.response.extrabonus;
                if ((null == s ? void 0 : s.freespins) && (this.previousData = this.data.splice(0, 1)[0]), this.previousData && (this.previousData.response.balance.before = this.previousData.response.balance.after, this.previousData.response.spin)) {
                    const [e, s] = [null === (t = this.data.first.response.spin) || void 0 === t ? void 0 : t.bet, null === (i = this.data.first.response.initfreespin) || void 0 === i ? void 0 : i.bet];
                    this.previousData.response.spin.bet = s || e
                }
                this.view.initTimeline(this.data), this.repeat(), this.startHandler()
            }

            repeat() {
                this.previousData ? (this.store.setResponseToStore(this.previousData.response), this.updateCounters(this.previousData)) : (console.error("Previous data is undefined."), this.store.setResponseToStore(this.data.first.response), this.updateCounters(this.data.first)), this.view.updateTimeline(0)
            }

            closeReplay(e) {
                this.data = null, this.dataRound = null
            }

            discardDataIndex() {
                this.hiddenIndex = 0, this.dataIndex = -1
            }

            updateRepeatHandler(e) {
                this.view.updateRepeatHandler(t => {
                    this.discardDataIndex(), !t && this.repeat(), e()
                })
            }

            updateAbortHandler(e) {
                this.view.onPlay(), this.view.abortHandler = c2d.once(() => {
                    e(), this.closeReplay()
                })
            }

            startReplay(e) {
                this.dataRound = e, this.discardDataIndex()
            }

            updateStore() {
                ++this.dataIndex;
                const e = this.data[this.dataIndex];
                e ? ("collect" === e.action_name && c2d.globalStore.set("isCollectReplay", !0), this.updateCounters(e), this.store.setResponseToStore(e.response)) : console.error("data is undefined.", this.dataIndex, this.data)
            }

            updateCounters(e) {
                const t = this.store.hideCurrency ? "" : e.currency;
                let i = 0;
                this.dataIndex > 0 && (i = this.data[this.dataIndex - 1].response.macro_round.wins.total), i = c2d.utils.formatters.StringFormatter.toCurrency(i.toFixed(2), {currency: t});
                let s = e.response.balance.before;
                s = c2d.utils.formatters.StringFormatter.toCurrency(s.toFixed(2), {currency: t});
                let {bet: n} = Object.assign(Object.assign(Object.assign(Object.assign({}, e.response.spin), e.response.initspin), e.response.initfreespin), e.response.init);
                n = n ? c2d.utils.formatters.StringFormatter.toCurrency(n.toFixed(2), {currency: t}) : null, this.view.updateValue(s, n, i)
            }

            complete() {
                var e, t;
                const i = this.data[this.dataIndex], s = this.store.hideCurrency ? "" : i.currency;
                let n = i.response.balance.after;
                n = c2d.utils.formatters.StringFormatter.toCurrency(n.toFixed(2), {currency: s});
                let o = null === (e = i.response.macro_round) || void 0 === e ? void 0 : e.wins.total;
                c2d.type.isNumber(o) || (o = null === (t = i.response.spin) || void 0 === t ? void 0 : t.wins.total), o = c2d.utils.formatters.StringFormatter.toCurrency(o.toFixed(2), {currency: s}), this.view.updateValue(n, null, o), i.response.spin || i.response.initbonus ? this.view.updateTimeline(this.dataIndex - this.hiddenIndex + 1) : this.hiddenIndex++
            }
        };
        n = s([modifiable], n), i.ReplayController = n
    }, {}],
    220: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.ReplayHandler = void 0;
        let n = class extends game.sources.Handler {
            get statesConfig() {
                return {
                    Start: {enter: this.onStartEnter},
                    Init: {enter: this.onInitEnter},
                    Gifts: {begin: this.onIdleBegin},
                    Idle: {begin: this.onIdleBegin},
                    Replay: {
                        check: this.checkReplay,
                        enter: this.onReplayEnter,
                        begin: this.onReplayBegin,
                        exit: this.onReplayExit
                    },
                    ReplayProgress: {check: this.onReplayProgressCheck},
                    Spin: {check: this.checkSpin, exit: this.onSpinExit},
                    SpinProgress: {enter: this.onSpinProgressEnter},
                    PresentDrop: {enter: this.onPresentDrop},
                    Freespins: {enter: this.onFreespinsEnter},
                    InitFreespin: {enter: this.onSpinProgressEnter, exit: this.onSpinExit},
                    InitSpin: {enter: this.onSpinProgressEnter, exit: this.onSpinExit},
                    BonusGameInit: {enter: this.onBonusStepEnter},
                    BonusGameStep: {begin: this.onBonusFinishEnter},
                    Round: {check: this.checkSpin, exit: this.onRoundExit},
                    RoundProgress: {begin: this.onRoundProgressBegin},
                    Choice: {enter: this.onChoiceEnter, exit: this.onChoiceExit},
                    RoundStart: {enter: this.onSpinProgressEnter, exit: this.onSpinExit}
                }
            }

            onStartEnter({finish: e, actions: {getRoundHistory: t}}) {
                this.component.controller.updateHistoryHandler(t), e()
            }

            onInitEnter({finish: e}) {
                this.component.active = !1, this.component.build(), e()
            }

            onIdleBegin({finish: e}) {
                return e(), {
                    actions: {
                        playReplay: e => {
                            this.component.active = !0, this.component.startReplay(e)
                        }
                    }
                }
            }

            checkReplay() {
                return !!this.component.active && !this.isAbort
            }

            onReplayEnter({finish: e, abort: t}) {
                this.component.setReplayFrameVisibility(!0), this.isAbort = !1, this.component.controller.updateData(e), this.firstPlay = !0;
                this.component.updateAbortHandler(() => {
                    this.isAbort = !0, t()
                })
            }

            onReplayBegin({finish: e}) {
                this.component.active && !this.isAbort ? (this.component.view.hideFreespinsCounter(), this.firstPlay || this.component.canPlayRespin() ? e() : (this.firstPlay = !0, this.component.updateRepeatHandler(e))) : e()
            }

            onReplayProgressCheck() {
                return this.component.active && !this.isAbort
            }

            onReplayExit({finish: e}) {
                this.component.closeReplay(!0), this.component.setReplayFrameVisibility(!1), this.component.active = !1, this.isAbort = !1, e()
            }

            checkSpin() {
                if (!this.component.active || this.isAbort) return !1;
                const e = this.firstPlay;
                this.firstPlay = !1;
                const t = this.component.checkGiftFreespins();
                return !e || !t
            }

            onSpinProgressEnter({finish: e}) {
                this.component.active && !this.isAbort ? (this.component.updateStore(), e()) : e()
            }

            onChoiceEnter({finish: e, actions: t}) {
                if (!this.component.active || this.isAbort) return c2d.Timeout.invoke(() => t.abortChoice(), 0), void e();
                this.component.updateStore(), this.component.makeChoice(t), e()
            }

            onChoiceExit({finish: e}) {
                this.component.active && !this.isAbort ? (this.component.complete(), e()) : e()
            }

            onSpinExit({finish: e}) {
                this.component.active && !this.isAbort ? (this.component.complete(), e()) : e()
            }

            onPresentDrop({finish: e}) {
                this.component.active && !this.isAbort ? (this.component.complete(), this.component.updateStore(), e()) : e()
            }

            onBonusStepEnter({finish: e}) {
                this.component.active && !this.isAbort ? (this.component.updateStore(), e()) : e()
            }

            onBonusFinishEnter({finish: e}) {
                this.component.active && !this.isAbort ? (this.component.complete(), this.component.updateStore(), e()) : e()
            }

            onFreespinsEnter({finish: e}) {
                if (!this.component.active || this.isAbort) return void e();
                e();
                return {actions: {updateFreespinsCounter: e => this.component.view.updateFreespins(e)}}
            }

            onRoundProgressBegin({finish: e}) {
                c2d.globalStore.set("isCollectReplay", !1), e()
            }

            onRoundExit({finish: e}) {
                c2d.globalStore.set("isCollectReplay", !1), e()
            }
        };
        n = s([modifiable], n), i.ReplayHandler = n
    }, {}],
    221: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.ReplayStore = void 0;
        let n = class extends game.sources.Store {
            addToGlobal() {
                this.addItem("isReplay")
            }

            get isReplay() {
                return this.component.active
            }

            setResponseToStore(e) {
                return this.getItem("setResponseToStore")(e)
            }

            checkGiftFreespins() {
                return !!this.getItem("giftFreeSpins")
            }

            getInitFreespin() {
                return this.getItem("initfreespin")
            }

            getSpinData() {
                return this.getItem("spinData")
            }

            get respins() {
                return this.getItem("respins")
            }

            get hideCurrency() {
                return this.getItem("hideCurrency")
            }
        };
        n = s([modifiable], n), i.ReplayStore = n
    }, {}],
    222: [function (e, t, i) {
        "use strict";
        var s = this && this.__decorate || function (e, t, i, s) {
            var n, o = arguments.length, r = o < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.ReplayView = void 0;
        let n = class extends game.sources.FactoryView {
            build() {
                this.abortHandler = null;
                const e = this.layers.replay;
                this.action_texts = {
                    spin: "core.spin",
                    respin: "core.freerespin",
                    freespin: "core.freespin",
                    freerespin: "core.freerespin",
                    extrabonusspin: "core.gift",
                    bonus: "core.bonus"
                }, this.buildTree("replay_tree", e), this.addListeners(), this.setVisible(!1)
            }

            setVisible(e) {
                this.layers.replay.visible = e;
                const t = this.tree.nodeMap.effect, i = t.tween;
                e ? (i.tl.repeat(-1), i.tl.yoyo(!0), i.tl.fromTo(t, .4, {pixi: {anchorX: .25}}, {
                    pixi: {anchorX: .75},
                    ease: c2d.easing.RoughEase.ease.config({strength: 2, points: 20, randomize: !0, clamp: !0})
                }, 0).to(t, .4, {
                    pixi: {anchorX: .25},
                    ease: c2d.easing.RoughEase.ease.config({strength: 2, points: 20, randomize: !0, clamp: !0})
                }, .4).set(t, {pixi: {scaleX: -t.scale.x}}, .1).set(t, {pixi: {scaleY: -t.scale.y}}, .2).set(t, {pixi: {scaleX: t.scale.x}}, .3).set(t, {pixi: {scaleY: t.scale.y}}, .4).set(t, {pixi: {scaleX: -t.scale.x}}, .5).set(t, {pixi: {scaleY: -t.scale.y}}, .6).set(t, {pixi: {scaleX: t.scale.x}}, .7).set(t, {pixi: {scaleY: t.scale.y}}, .8)) : i.tl.clear()
            }

            initTimeline(e) {
                var t;
                const i = this.tree.nodeMap.timeline;
                i.config.x = 0;
                let s = e.length;
                e.forEach(e => {
                    e.response.spin || e.response.bonus || s--
                });
                const [n, o, r] = i.children;
                this.step = 100 / Math.min(4, s), s > 4 && (this.step -= 1);
                const a = o.config.chain = [];
                for (; r.children.length;) {
                    const e = r.children.last;
                    r.removeChild(e), e.destroy()
                }
                const l = r.config.children = [], c = {
                    __type: "TextField",
                    style: "${styles.text__small}",
                    anchor: {x: 0, y: 0},
                    pivot: {x: -10, y: 0}
                };
                a.push({beginFill: ["0xffffff"]});
                let h = 0;
                for (let i = 0; i <= e.length; i++) {
                    let s = 0;
                    if (i) {
                        s = `$[${(this.step * (i - h)).toFixed(0)}pw - 4]`
                    }
                    if (e[i]) {
                        const n = e[i];
                        if (!n.response.spin && !n.response.bonus) {
                            h++;
                            continue
                        }
                        const o = Object.assign(Object.assign({}, c), {
                            x: s,
                            text: (null === (t = this.action_texts[n.action_name]) || void 0 === t ? void 0 : t.ls()) || n.action_name
                        });
                        l.push(o);
                        const a = new c2d.display.Factory.types.TextField;
                        r.addChild(a)
                    }
                    a.push({drawRect: [s, -10, 6, 35]})
                }
                this.dataLength = e.length - h, n.config.chain = [], n.clear(), this.updateTree()
            }

            updateTimeline(e) {
                const [t] = this.tree.nodeMap.timeline.children;
                if (this.timelineTween && this.timelineTween.kill(), e) {
                    e--;
                    const i = .5, s = {w: this.step * e};
                    this.timelineTween = c2d.Tween.to(s, i, {
                        w: this.step * (e + 1), onUpdate: () => {
                            const e = [0, 0, "$[" + s.w.toFixed(0) + "pw]", 15];
                            t.config.chain = [{beginFill: ["0xffffff"]}, {drawRect: e}], t.updateFromConfig()
                        }, onComplete: () => this._moveTimeline(e)
                    })
                } else {
                    t.config.chain = [], t.clear();
                    const e = this.tree.nodeMap.timeline;
                    e.config.x = 0, e.updateFromConfig()
                }
            }

            _moveTimeline(e) {
                if (!e || e + 3 >= this.dataLength) return;
                e--;
                const t = this.tree.nodeMap.timeline, i = {x: -this.step * e};
                let s = -this.step * (e + 1);
                e + 5 == this.dataLength && (s += 4), c2d.Tween.to(i, .5, {
                    x: s, onUpdate: () => {
                        t.config.x = "$[" + i.x.toFixed(0) + "pw]", t.updateFromConfig()
                    }
                })
            }

            updateValue(e, t, i) {
                null !== e && (this.tree.nodeMap.balanceValue.text = e), t && (this.tree.nodeMap.betValue.text = t), this.tree.nodeMap.winValue.text = i
            }

            addListeners() {
                this.tree.nodeMap.closeButton.setHandlers(() => {
                    this.abortHandler(), this.repeatHandler && this.repeatHandler(!0)
                }), this.tree.nodeMap.repeatButton.setHandlers(() => {
                    this.onPlay(), this.repeatHandler && this.repeatHandler()
                })
            }

            updateRepeatHandler(e) {
                this.repeatHandler = e, this.tree.nodeMap.repeatButton.enable(!0)
            }

            onPlay() {
                this.tree.nodeMap.repeatButton.enable(!1)
            }

            updateFreespins(e = 0) {
                e = +e, this.tree.nodeMap.freespinsValue.text = e, this.tree.nodeMap.freespinsPanel.visible || (this.tree.nodeMap.freespinsPanel.visible = !0)
            }

            hideFreespinsCounter() {
                this.tree.nodeMap.freespinsPanel.visible = !1
            }
        };
        n = s([modifiable], n), i.ReplayView = n
    }, {}],
    223: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("./ReplayComponent"), n = e("./ReplayHandler"), o = e("./ReplayStore"), r = e("./ReplayController"),
            a = e("./ReplayView"), l = {
                Component: s.Replay,
                Handler: n.ReplayHandler,
                Store: o.ReplayStore,
                Controller: r.ReplayController,
                View: a.ReplayView
            };
        (c2d.Logger ? c2d.Logger.Of("Replay") : console).info("component version v0.01.0"), game.componentsManager.registerComponent("Replay", l, "v0.01.0")
    }, {
        "./ReplayComponent": 218,
        "./ReplayController": 219,
        "./ReplayHandler": 220,
        "./ReplayStore": 221,
        "./ReplayView": 222
    }],
    224: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.promise");
        var s = function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.Tournament = void 0;

        class n extends game.sources.Component {
            init() {
                return s(this, void 0, void 0, (function* () {
                    yield this.controller.init()
                }))
            }

            disableTournamentButton() {
                this.controller.disableTournamentButton()
            }

            enableTournamentButton() {
                this.controller.enableTournamentButton()
            }
        }

        i.Tournament = n, i.Tournament = n = c2d.utils.decorators.modifiable(n)
    }, {"core-js/modules/es.promise": 349}],
    225: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.promise");
        var s = function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.TournamentController = void 0;
        const n = e("./TournamentServerManager.js");

        class o extends game.sources.Controller {
            constructor(e) {
                super(e), this._serverManager = new n.default
            }

            init(e) {
                return s(this, void 0, void 0, (function* () {
                    yield this._serverManager.init({
                        tournamentStatusChanged: e => this.onTournamentStatusChanged(e),
                        positionUpdate: e => this.onPositionUpdate(e)
                    }), yield this._updateTournaments(), yield this._updateUserPosition(), this.view.build(e), this.view._serverManager = this._serverManager
                }))
            }

            _updateTournaments() {
                return s(this, void 0, void 0, (function* () {
                    const e = yield this._serverManager.requestTournamentsList();
                    this.store.updateTournaments(e), this.view.updateTournaments()
                }))
            }

            _updateUserPosition() {
                return s(this, void 0, void 0, (function* () {
                    if (this.store.currentTournament) {
                        const e = yield this._serverManager.requestUserPosition(this.store.currentTournament.id);
                        this.onPositionUpdate(e)
                    }
                }))
            }

            _updateLeaderboard() {
                return s(this, void 0, void 0, (function* () {
                    if (this.store.currentTournament) {
                        const e = yield this._serverManager.requestTournamentLeaderboard(this.store.currentTournament.id);
                        this.store.updateLeaderboard(e), this.view.updateLeaderboard()
                    }
                }))
            }

            onTournamentStatusChanged() {
                return s(this, void 0, void 0, (function* () {
                    if (yield this._updateTournaments(), this.store.currentTournament) {
                        const e = yield this._serverManager.requestUserPosition(this.store.currentTournament.id);
                        this.store.clearUserData(), this.store.updateUserData(e.position, e.score), this.view.updateButtonWithTimer(), this._updateLeaderboard()
                    }
                }))
            }

            onPositionUpdate(e) {
                this.store.updateUserData(null == e ? void 0 : e.position, null == e ? void 0 : e.score), this.view.updateUserPosition()
            }

            disableTournamentButton() {
                this.view.disableTournamentButton()
            }

            enableTournamentButton() {
                this.view.enableTournamentButton(), this.view.updateUserPosition()
            }
        }

        i.TournamentController = o, i.TournamentController = o = c2d.utils.decorators.modifiable(o)
    }, {"./TournamentServerManager.js": 227, "core-js/modules/es.promise": 349}],
    226: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0}), i.TournamentHandler = void 0;

        class s extends game.sources.Handler {
            get statesConfig() {
                return {
                    Init: {enter: this.onInitEnter},
                    Idle: {begin: this.onIdleBegin},
                    Gifts: {begin: this.onIdleBegin}
                }
            }

            onInitEnter(e) {
                let {finish: t} = e;
                this.component.init().then(t)
            }

            onIdleBegin(e) {
                let {finish: t} = e;
                this.component.enableTournamentButton();
                return t(), {
                    onFinish: () => {
                        this.component.disableTournamentButton()
                    }
                }
            }
        }

        i.TournamentHandler = s, i.TournamentHandler = s = c2d.utils.decorators.modifiable(s)
    }, {}],
    227: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.promise");
        var s = function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0});
        i.default = class {
            constructor() {
                this._baseUrl = "", this._token = null, this._currency = null, this._language = null
            }

            init(e) {
                return s(this, void 0, void 0, (function* () {
                    const {api: t, user: i} = game.application.setup.tournament;
                    this._baseUrl = "".concat(t.host).concat("tsb/api/v1", "/tournament"), this._token = t.token, this._currency = i.currency, this._language = i.language, yield this._initSocket(e)
                }))
            }

            requestTournamentsList() {
                return s(this, void 0, void 0, (function* () {
                    const e = "".concat(this._baseUrl, "?currency=").concat(this._currency, "&lang=").concat(this._language, "&token=").concat(this._token),
                        t = yield this._sendRequest(e);
                    return null == t ? void 0 : t.list
                }))
            }

            requestTournamentLeaderboard(e) {
                var t;
                return s(this, void 0, void 0, (function* () {
                    const i = "".concat(this._baseUrl, "/").concat(e, "/result?currency=").concat(this._currency),
                        s = yield this._sendRequest(i);
                    return null === (t = null == s ? void 0 : s.data) || void 0 === t ? void 0 : t.result
                }))
            }

            requestUserPosition(e) {
                return s(this, void 0, void 0, (function* () {
                    const t = "".concat(this._baseUrl, "/").concat(e, "/position?currency=").concat(this._currency, "&token=").concat(this._token),
                        i = yield this._sendRequest(t);
                    return null == i ? void 0 : i.data
                }))
            }

            _sendRequest(e) {
                return s(this, void 0, void 0, (function* () {
                    return new Promise(t => {
                        const i = new XMLHttpRequest;
                        i.onreadystatechange = () => {
                            if (4 === i.readyState) if (200 === i.status && i.responseText.length) try {
                                t(JSON.parse(i.responseText))
                            } catch (e) {
                                t(null)
                            } else t(null)
                        }, i.onerror = () => t(null), i.open("GET", e, !0), i.send()
                    })
                }))
            }

            _requestSocketConfig() {
                return s(this, void 0, void 0, (function* () {
                    const e = "".concat(this._baseUrl, "/socket?token=").concat(this._token);
                    return this._sendRequest(e)
                }))
            }

            _initSocket(e) {
                return s(this, void 0, void 0, (function* () {
                    return new Promise(t => {
                        c2d.transport.init(), c2d.transport.setReadyHandler(() => {
                            t()
                        }), c2d.transport.setResponseHandler(t => {
                            try {
                                const {payload: i} = t;
                                i.name in e && e[i.name](i)
                            } catch (e) {
                                console.error("ServerManager: error:", e)
                            }
                        })
                    })
                }))
            }
        }
    }, {"core-js/modules/es.promise": 349}],
    228: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.array.iterator"), e("core-js/modules/web.dom-collections.iterator"), Object.defineProperty(i, "__esModule", {value: !0}), i.TournamentStore = void 0;

        class s extends game.sources.Store {
            constructor() {
                super(...arguments), this._tournaments = [], this._currentTournament = null, this._leaderboard = [], this._ranges = [], this._userPosition = null, this._userPosition = null
            }

            get tournaments() {
                return this._tournaments
            }

            get currentTournament() {
                return this._currentTournament
            }

            get isCurrentTournamentImmediatelyUpdates() {
                return ["money_total_bets", "total_spins"].includes(this.currentTournament.rankingType)
            }

            updateTournaments(e) {
                if (!e) return;
                const t = this.ranges;
                e.forEach(e => {
                    const i = t.find(t => t >= +e.minimalBetAmount);
                    e.minBet = i
                }), this._tournaments = e, this._currentTournament = e.first, this.updateMinBet()
            }

            get ranges() {
                return this._ranges.length > 0 || (this._ranges = this.getItem("ranges").bet.slice()), this._ranges
            }

            get leaderboard() {
                return this._leaderboard
            }

            updateLeaderboard(e) {
                this._leaderboard = e
            }

            get userPosition() {
                return this._userPosition
            }

            get userScore() {
                return this._userScore
            }

            get betRanges() {
                return this.getItem("ranges").bet
            }

            get currency() {
                return this.getItem("currency")
            }

            get currentTournamentIsPending() {
                var e;
                return "pending" === (null === (e = this.currentTournament) || void 0 === e ? void 0 : e.status)
            }

            updateMinBet() {
                this._tournaments.forEach(e => {
                    const {minBet: t} = e;
                    e.updatedMinBet = "".concat(t, " ").concat(this.currency)
                })
            }

            clearUserData() {
                this._userPosition = null, this._userScore = null
            }

            updateUserData(e, t) {
                this._userPosition = e, this._userScore = t
            }
        }

        i.TournamentStore = s, i.TournamentStore = s = c2d.utils.decorators.modifiable(s)
    }, {"core-js/modules/es.array.iterator": 344, "core-js/modules/web.dom-collections.iterator": 353}],
    229: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.object.assign"), e("core-js/modules/es.promise");
        var s = function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };
        Object.defineProperty(i, "__esModule", {value: !0}), i.TournamentView = void 0;
        const n = {desktop: 330, mobile: 720}, o = e("./prefab/TournamentList.js"),
            r = e("./prefab/LeaderBoardTable.js"), a = e("./prefab/Timer.js"), l = e("./prefab/RulesText.js");

        class c extends game.sources.FactoryView {
            constructor(e) {
                super(e), this.timerLocalization = {
                    days: "core.tournament_time_D".ls(),
                    hours: "core.tournament_time_H".ls(),
                    minutes: "core.tournament_time_M".ls(),
                    seconds: "core.tournament_time_S".ls()
                }, this.welcomeScreenTimer = null, this.intervalTimer = null, this.showLeaderBoardClicked = !1
            }

            build(e) {
                if (this._interactive = !0, !this.store.currentTournament) return;
                this.buildTree(e), this.initTournamentList(), this.initLeaderBoard(), this.initRules(), this.addButtonsHandler(), this.createTimerForButton();
                const {currentTournament: t} = this.store;
                "finished" !== (null == t ? void 0 : t.status) && this.showTournamentWelcomeScreen()
            }

            buildTree() {
                const e = this.layers.tournament;
                super.buildTree("tournament_tree", e), this.buildButton(), this.updateUserPosition(), this.disableTournamentButton()
            }

            buildButton() {
                const e = {__prefab: "tournament_button", name: "tournamentButton"};
                e.__prefabs = Object.assign({}, this.getPrefabs());
                const t = {
                    texts: this.getTexts(),
                    styles: this.getStyles(),
                    textures: this.assetsStore.textures,
                    skeletons: this.assetsStore.skeletons
                }, i = new c2d.display.Container;
                this.buttonTree = new c2d.display.FactoryTree({
                    config: e,
                    parent: i,
                    variables: t
                }), this.layers.custom_buttons.addChild(i)
            }

            addButtonsHandler() {
                this.buttonTree.nodeMap.tournamentButton.setHandlers(() => this.showTournamentScreen()), this.tree.nodeMap.tournamentScreen.nodeMap.closeButton.setHandlers(() => this.closeTournamentScreen()), this.tree.nodeMap.rules.nodeMap.backButton.setHandlers(() => this.hideWindows()), this.tree.nodeMap.leaderboard.nodeMap.backButton.setHandlers(() => this.hideWindows())
            }

            initTournamentList() {
                this.tournamentList = new o.default(this.tree, this.tree.variables, this.getPrefabs()), this.tournamentList.update(this.store.tournaments), this.tournamentList.rulesHandler = e => {
                    this.showRules(e)
                }, this.tournamentList.leaderBoardHandler = e => {
                    this.showLeaderBoard(e)
                }
            }

            initRules() {
                this.rulesText = new l.default(this.tree, this.tree.variables, this.getPrefabs())
            }

            initLeaderBoard() {
                this.leaderBoardTable = new r.default(this.tree, this.tree.variables, this.getPrefabs()), this.leaderBoardTable.rulesHandler = e => {
                    this.showRules(e)
                }
            }

            updateTournaments() {
                var e;
                null === (e = this.tournamentList) || void 0 === e || e.update(this.store.tournaments), this.updateUserPosition()
            }

            updateLeaderboard() {
            }

            updateUserPosition() {
                if (!this.buttonTree) return;
                const {
                    userScore: e,
                    userPosition: t,
                    isCurrentTournamentImmediatelyUpdates: i,
                    currentTournamentIsPending: s,
                    currentTournament: n
                } = this.store;
                if (!i && !this.isTournamentButtonActive) return;
                const o = PIXI.Texture.from(n.icon);
                this.updateVisualButtonData(t, e, s, o)
            }

            updateButtonWithTimer() {
                this.updateUserPosition(), this.createTimerForButton()
            }

            updateVisualButtonData(e, t, i, s) {
                this.buttonTree.nodeMap.position.text = e ? "#".concat(e) : "#----", this.buttonTree.nodeMap.points.text = i ? "core.tournament_popup_time_pending".ls() : c2d.type.isNumber(t) ? "".concat(t, " pt") : "----pt", this.buttonTree.nodeMap.icon.texture = s
            }

            createTimerForButton() {
                this.tournamentButtonTimer && (this.tournamentButtonTimer.destroy(), this.tournamentButtonTimer = null);
                const {finishDateTime: e, startDateTime: t} = this.store.currentTournament,
                    i = new Date(1e3 * t) > new Date, s = i ? t : e,
                    n = this.buttonTree.nodeMap.tournamentButton.nodeMap.leftTime, {
                        days: o,
                        hours: r,
                        minutes: l,
                        seconds: c
                    } = this.timerLocalization;
                this.tournamentButtonTimer = new a.default(s, e => {
                    let {days: t, hours: i, minutes: s, seconds: a} = e;
                    n.text = t <= 0 ? "".concat(i).concat(r, ":").concat(s).concat(l, ":").concat(a).concat(c) : "".concat(t).concat(o, ":").concat(i).concat(r, ":").concat(s).concat(l)
                }, () => {
                    this.tournamentButtonTimer && (this.tournamentButtonTimer.destroy(), this.tournamentButtonTimer = null), i || (n.text = "core.tournament_finished".ls())
                });
                const {currentTournament: h} = this.store
            }

            showTournamentScreen() {
                this.tree.nodeMap.tournamentScreen.visible = !0
            }

            showTournamentWelcomeScreen() {
                const e = this.tree.nodeMap.tournamentWelcomeScreen, {
                        finishDateTime: t,
                        startDateTime: i,
                        prizeLineNumber: s,
                        updatedMinBet: o,
                        prizeCurrency: r,
                        prizeFund: l,
                        texts: c,
                        logo: h
                    } = this.store.currentTournament, u = new Date(1e3 * i) > new Date, d = u ? i : t,
                    p = PIXI.Texture.from(h);
                e.nodeMap.timer_text.text = u ? "core.tournament_popup_time_pending".ls() : "core.tournament_popup_time_left".ls(), e.nodeMap.start_text.text = c.title, e.nodeMap.type.text = c.ranking, l ? (e.nodeMap.prize_pool_layout.visible = !0, e.nodeMap.prize_pool.text = "".concat(l, " ").concat(r)) : e.nodeMap.prize_pool_layout.visible = !1, e.nodeMap.prizes.text = s, e.nodeMap.bet_level.text = o, e.nodeMap.logo.texture = p, this.checkStringMaxWidth(e.nodeMap.info_layout, n), e.nodeMap.closeButton.setHandlers(() => {
                    this.closeTournamentWelcomeScreen()
                }), e.nodeMap.welcome_close_button.setHandlers(() => {
                    this.closeTournamentWelcomeScreen()
                }), e.nodeMap.info_layout.onTreeDidUpdate(), this.welcomeScreenTimer = new a.default(d, t => {
                    let {days: i, hours: s, minutes: n, seconds: o} = t;
                    i <= 0 ? (e.nodeMap.timer_days.text = s, e.nodeMap.timer_0_description.text = "core.tournament_time_hours".ls(), e.nodeMap.timer_hours.text = n, e.nodeMap.timer_1_description.text = "core.tournament_time_minutes".ls(), e.nodeMap.timer_minutes.text = o, e.nodeMap.timer_2_description.text = "core.tournament_time_seconds".ls()) : (e.nodeMap.timer_days.text = i, e.nodeMap.timer_0_description.text = "core.tournament_time_days".ls(), e.nodeMap.timer_hours.text = s, e.nodeMap.timer_1_description.text = "core.tournament_time_hours".ls(), e.nodeMap.timer_minutes.text = n, e.nodeMap.timer_2_description.text = "core.tournament_time_minutes".ls())
                }, () => {
                }), e.visible = !0
            }

            checkStringMaxWidth(e, t) {
                const i = t[game.device.mobile ? "mobile" : "desktop"];
                e.width > i && (e.scale.x = e.scale.y = i / e.width)
            }

            closeTournamentScreen() {
                this.tree.nodeMap.tournamentScreen.visible = !1, this.hideWindows()
            }

            onResizeScreen() {
                var e;
                super.onResizeScreen(), this.updateButton(), game.device.desktop || null === (e = this.rulesText) || void 0 === e || e.onOrientationChange()
            }

            closeTournamentWelcomeScreen() {
                const e = this.tree.nodeMap.tournamentWelcomeScreen;
                this.welcomeScreenTimer && (this.welcomeScreenTimer.destroy(), this.welcomeScreenTimer = null), e.visible = !1
            }

            showRules(e) {
                let {rules: t, title: i} = e;
                this.tree.nodeMap.rules.nodeMap.tournament_name.text = i, this.tree.nodeMap.rules.visible = !0, this.rulesText.update(t)
            }

            hideWindows() {
                this.tree.nodeMap.rules.visible = !1, this.tree.nodeMap.leaderboard.visible = !1, this.leaderBoardTable.hideLeaderBoard(), this.stopAutoUpdate()
            }

            disableTournamentButton() {
                this.buttonTree && (this.buttonTree.nodeMap.tournamentButton.setStates("disabled"), this.buttonTree.nodeMap.tournamentButton.interactive = !1)
            }

            enableTournamentButton() {
                this.buttonTree && (this.buttonTree.nodeMap.tournamentButton.setStates("normal"), this.buttonTree.nodeMap.tournamentButton.interactive = !0)
            }

            showLeaderBoard(e) {
                return s(this, void 0, void 0, (function* () {
                    if (this.showLeaderBoardClicked) return;
                    this.showLeaderBoardClicked = !0;
                    const t = (yield this._serverManager.requestTournamentsList()).find(t => {
                            let {id: i} = t;
                            return i === e
                        }), i = yield this._serverManager.requestTournamentLeaderboard(e),
                        s = yield this._serverManager.requestUserPosition(e);
                    this.leaderBoardTable.showLeaderBoard(t, {
                        leaderBoard: i,
                        user: s
                    }), this.tree.nodeMap.leaderboard.nodeMap.rulesButton.setHandlers(() => {
                        this.showRules(t.texts), this.leaderBoardTable.hideLeaderBoard(), this.tree.nodeMap.leaderboard.visible = !1, this.stopAutoUpdate()
                    }), "live" === t.status && this.startAutoUpdate(e);
                    const n = "".concat("core.tournament_leaderboard_header".ls(), ": ").concat(t.texts.title);
                    this.tree.nodeMap.leaderboard.nodeMap.tournament_name.text = n, this.tree.nodeMap.leaderboard.visible = !0, this.showLeaderBoardClicked = !1
                }))
            }

            startAutoUpdate(e) {
                this.intervalTimer = c2d.Timeout.interval(() => {
                    this.updateLeaderBoard(e)
                }, 20)
            }

            updateLeaderBoard(e) {
                return s(this, void 0, void 0, (function* () {
                    const t = yield this._serverManager.requestTournamentLeaderboard(e),
                        i = yield this._serverManager.requestUserPosition(e);
                    this.leaderBoardTable.update({leaderBoard: t, user: i})
                }))
            }

            stopAutoUpdate() {
                this.intervalTimer && (c2d.Timeout.clear(this.intervalTimer), this.intervalTimer = null)
            }

            updateButton() {
                if (!this.buttonTree) return;
                const e = {__prefab: "tournament_button", name: "tournamentButton"};
                e.__prefabs = Object.assign(Object.assign({}, this.getPrefabs()), this._prefabs), this.buttonTree.update(e)
            }

            get isTournamentButtonActive() {
                return this.buttonTree.nodeMap.tournamentButton.interactive
            }
        }

        i.TournamentView = c, i.TournamentView = c = c2d.utils.decorators.modifiable(c)
    }, {
        "./prefab/LeaderBoardTable.js": 232,
        "./prefab/RulesText.js": 234,
        "./prefab/Timer.js": 235,
        "./prefab/TournamentList.js": 236,
        "core-js/modules/es.object.assign": 348,
        "core-js/modules/es.promise": 349
    }],
    230: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("./Tournament.js"), n = e("./TournamentHandler.js"), o = e("./TournamentStore.js"),
            r = e("./TournamentController.js"), a = e("./TournamentView.js");

        class l extends game.sources.Component {
        }

        let c = {
            Component: s.Tournament,
            Handler: n.TournamentHandler,
            Store: o.TournamentStore,
            Controller: r.TournamentController,
            View: a.TournamentView
        };
        jsvars.tournament || (c = {Component: l});
        (c2d.Logger ? c2d.Logger.Of("Tournament") : console).info("component version ".concat("v0.01.0")), game.componentsManager.registerComponent("Tournament", c, "v0.01.0")
    }, {
        "./Tournament.js": 224,
        "./TournamentController.js": 225,
        "./TournamentHandler.js": 226,
        "./TournamentStore.js": 228,
        "./TournamentView.js": 229
    }],
    231: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        i.default = class {
            buildDynamicTree(e, t, i) {
                return new c2d.display.FactoryTree({config: e, parent: t, variables: i})
            }
        }
    }, {}],
    232: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.array.flat-map"), e("core-js/modules/es.array.iterator"), e("core-js/modules/es.array.unscopables.flat-map"), e("core-js/modules/es.object.assign"), e("core-js/modules/web.dom-collections.iterator"), Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("./DynamicTree.js"), n = e("./Paginator.js");

        class o extends s.default {
            constructor(e, t, i) {
                super(), this.parent = e.nodeMap.tournamentTableRoot, this.parentTree = e, this.variables = t, this.textures = t.textures, this.prefabs = i, this.data = null, this.maxRecords = 50, this.currentPage = 0, this.paginator = null, this.initPaginator()
            }

            initPaginator() {
                const e = this.parent.nodeMap.paginatorContainer;
                this.paginator = new n.default(e => {
                    this.showPage(e)
                }, this.parentTree, e, this.prefabs)
            }

            update(e) {
                if (!this._isActive) return;
                this.data = e;
                const {user: t, leaderBoard: i} = e;
                if (this.prizeList.forEach((e, t) => {
                    const s = i[t];
                    if (s) s.prize = e; else {
                        const s = {position: t + 1, name: "", score: "", result: e};
                        i.push(s)
                    }
                }), t.position) if (t.position > this.prizeList.length) this.updateUserRating(Object.assign(Object.assign({}, t), {result: ""})); else {
                    const e = i.find(e => {
                        let {position: i} = e;
                        return i === t.position
                    });
                    this.updateUserRating(e)
                } else this.hideUserRating();
                this.paginator.page = this.currentPage
            }

            showLeaderBoard(e, t) {
                let {prizes: i} = e;
                this._isActive = !0, this.prizeList = i.flatMap(e => {
                    let {top: t, bottom: i, text: s} = e;
                    return Array.from({length: i - t + 1}, () => s)
                });
                const s = Math.ceil(this.prizeList.length / this.maxRecords), n = game.device.desktop ? 8 : 4;
                this.paginator.createPagination(s, n), this.update(t)
            }

            hideLeaderBoard() {
                this._isActive = !1, this.currentPage = 0, this.paginator.clear()
            }

            updateUserRating(e) {
                let {position: t, name: i, score: s, result: n} = e;
                const {rating_container: o} = this.parent.nodeMap;
                o.nodeMap.position_text.text = t, o.nodeMap.id_text.text = i, o.nodeMap.score_text.text = s, o.nodeMap.result_text.text = n, this.showUserRating()
            }

            showPage() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                var t;
                this.currentPage = e;
                const {leaderBoard: i, user: s} = this.data, n = e * this.maxRecords, o = n + this.maxRecords,
                    r = i.slice(n, o), a = r.length;
                a !== ((null === (t = this.parent.nodeMap.leaderBoardContainer.nodeList) || void 0 === t ? void 0 : t.length) || 0) && (this.clear(), this.createItems(a)), this.updateFieldsData(r, s.position)
            }

            createItems(e) {
                const t = Array.from({length: e}, (e, t) => {
                    const i = t % 2 == 0;
                    return {
                        __prefab: "tournament_table_item",
                        __variables: {color: i ? "0x000000" : "${styles.color__primary}", alpha: i ? 0 : 1}
                    }
                });
                this.addNodes(t), this.parentTree.update()
            }

            clear() {
                this.parentTree.actualConfigMap.leaderBoardContainer.children = [], this.parent.nodeMap.leaderBoardContainer.removeChildren(), this.parent.nodeMap.leaderBoardContainer.nodeMap = {}, this.parent.nodeMap.leaderBoardContainer.nodeList = []
            }

            addNodes(e) {
                const t = this.parent.nodeMap.leaderBoardContainer, i = this.prefabs;
                this.parentTree.actualConfigMap.leaderBoardContainer.children.push(...e), t.nodeMap || (t.nodeMap = {}), t.nodeList || (t.nodeList = []), t.nodeList = this.parentTree._buildDeeper({
                    config: e,
                    nodeMaps: [t.nodeMap],
                    variables: t.__variables,
                    prefabs: i,
                    parent: t
                }), this.parentTree.update()
            }

            updateFieldsData(e, t) {
                const i = this.parent.nodeMap.leaderBoardContainer.nodeList;
                e.forEach((e, s) => {
                    let {position: n, name: o, score: r, result: a} = e;
                    const l = i[s];
                    t === n ? l.setStates("user") : l.setStates("base"), l.nodeMap.position_text.text = n, l.nodeMap.id_text.text = o, l.nodeMap.score_text.text = r, l.nodeMap.result_text.text = a
                })
            }

            showUserRating() {
                "user" !== o.getCurrentFactoryState(this.parent) && this.parent.setStates("user")
            }

            hideUserRating() {
                "base" !== o.getCurrentFactoryState(this.parent) && this.parent.setStates("base")
            }

            static getCurrentFactoryState(e) {
                const t = e._currentStates;
                if (t) return Object.values(t).first
            }
        }

        i.default = o
    }, {
        "./DynamicTree.js": 231,
        "./Paginator.js": 233,
        "core-js/modules/es.array.flat-map": 343,
        "core-js/modules/es.array.iterator": 344,
        "core-js/modules/es.array.unscopables.flat-map": 346,
        "core-js/modules/es.object.assign": 348,
        "core-js/modules/web.dom-collections.iterator": 353
    }],
    233: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.array.iterator"), e("core-js/modules/web.dom-collections.iterator"), Object.defineProperty(i, "__esModule", {value: !0});
        i.default = class {
            constructor(e, t, i, s) {
                this.parentTree = t, this.parent = i, this.prefabs = s, this.callback = e, this._page = 0
            }

            createPagination(e, t) {
                this.pages = e, this.maxButtons = t;
                const i = Math.min(this.pages, this.maxButtons),
                    s = Array.from({length: i}, e => ({__prefab: "page_button"}));
                this.addNodes(s)
            }

            addNodes(e) {
                const t = this.parent, i = this.prefabs;
                this.parentTree.actualConfigMap.paginatorContainer.children.push(...e), t.nodeMap || (t.nodeMap = {}), t.nodeList || (t.nodeList = []), t.nodeList = this.parentTree._buildDeeper({
                    config: e,
                    nodeMaps: [t.nodeMap],
                    variables: t.__variables,
                    prefabs: i,
                    parent: t
                }), this.parentTree.update()
            }

            clear() {
                this.parentTree.actualConfigMap.paginatorContainer.children = [], this.parent.removeChildren(), this.parent.nodeMap = {}, this.parent.nodeList = [], this._page = 0
            }

            set page(e) {
                const t = this.parent.nodeList, i = this.parentTree.nodeMap.tournamentTableScroller;
                if (!(null == t ? void 0 : t.length)) return;
                const s = game.device.desktop ? 2 : this.maxButtons;
                this._page = e;
                let n = Math.max(Math.floor(e - this.maxButtons / s), 0);
                n > this.pages - this.maxButtons ? n = this.pages - this.maxButtons : n -= 1, n = n < 0 ? 0 : n, t.forEach((t, s) => {
                    t.nodeMap.pageButtonText.text = n + s + 1, t.setHandlers(() => {
                        this.page = n + s, i.scrollTop()
                    }, !0), s + n === e ? t.setStates("active") : t.setStates("normal")
                }), this.callback(e)
            }

            get page() {
                return this._page
            }
        }
    }, {"core-js/modules/es.array.iterator": 344, "core-js/modules/web.dom-collections.iterator": 353}],
    234: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.object.assign"), e("core-js/modules/es.string.split"), Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("./DynamicTree.js");

        class n extends s.default {
            constructor(e, t, i) {
                super(), this.parent = e.nodeMap.rules_scroll, this.variables = t, this.textures = t.textures, this.prefabs = i, this.text = null
            }

            update(e) {
                this.text = e, this._clear(), this._createRules(e), this.parent.onTreeDidUpdate()
            }

            _createRules(e) {
                const t = e.split("\r\n\r\n"), {_relative: i} = this.parent.nodeMap.rules_text_container._variables,
                    s = c2d.display.Factory.calcProperty("$[100pw - 20]", i.size);
                t.forEach((e, t) => {
                    const i = {__type: "TextField", style: "${styles.text}", wordWrapWidth: s, text: e},
                        n = Object.assign({}, this.variables);
                    i.__prefabs = Object.assign({}, this.prefabs);
                    const o = new c2d.display.Container;
                    this.buildDynamicTree(i, o, n), this.parent.nodeMap.rules_text_container.addChild(o), this.parent.nodeMap.rules_text_container.onTreeDidUpdate()
                })
            }

            onOrientationChange() {
                this.text && this.update(this.text)
            }

            _clear() {
                this.parent.nodeMap.rules_text_container.removeChildren()
            }
        }

        i.default = n
    }, {"./DynamicTree.js": 231, "core-js/modules/es.object.assign": 348, "core-js/modules/es.string.split": 352}],
    235: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = e => e > 9 ? e : "0" + e;
        i.default = class {
            constructor(e, t, i) {
                this.finishDate = 1e3 * e, this._updateHandler = t, this._finishHandler = i, this._isStarted = !1, this._tickTimer = null, this.startTimer()
            }

            startTimer() {
                this._isStarted || (this._isStarted = !0, this.tick())
            }

            tick() {
                const e = new Date(this.finishDate) - new Date;
                if (e <= 0) this.stopTimer(); else {
                    const t = new Date(e), i = {
                        days: s(Math.floor(t / 864e5)),
                        hours: s(Math.floor(t / 36e5 % 24)),
                        minutes: s(Math.floor(t / 6e4 % 60)),
                        seconds: s(Math.floor(t / 1e3 % 60))
                    };
                    this._updateHandler(i), this._tickTimer = c2d.call(() => this.tick(), 1)
                }
            }

            stopTimer() {
                this._isStarted = !1, this._updateHandler({
                    days: "00",
                    hours: "00",
                    minutes: "00",
                    seconds: "00"
                }), this._finishHandler()
            }

            destroy() {
                this._tickTimer && c2d.Timeout.clear(this._tickTimer), this._isStarted = !1
            }
        }
    }, {}],
    236: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.object.assign"), Object.defineProperty(i, "__esModule", {value: !0});
        const s = e("./DynamicTree.js"), n = e("./Timer.js");

        class o extends s.default {
            constructor(e, t, i) {
                super(), this.tournaments = [], this.parent = e.nodeMap.tournamentListRoot, this.variables = t, this.textures = t.textures, this.prefabs = i, this.rulesHandler = () => {
                }, this.leaderBoardHandler = () => {
                }
            }

            update(e) {
                this._clear(), e.forEach((t, i) => {
                    this._createTournament(e[i], i)
                }), this.parent.nodeMap.tournamentContainer.onTreeDidUpdate(), this.parent.nodeMap.body_center.onTreeDidUpdate()
            }

            onOrientationChange() {
            }

            _createTournament(e, t) {
                const i = this._createTournamentFromConfig(e, t);
                this.tournaments.push(i), i.container && this.parent.nodeMap.tournamentContainer.addChild(i.container)
            }

            _createTournamentFromConfig(e, t) {
                const {
                        id: i,
                        games: s,
                        finishDateTime: o,
                        startDateTime: r,
                        prizeLineNumber: a,
                        logo: l,
                        updatedMinBet: c,
                        name: h,
                        prizeCurrency: u,
                        prizeFund: d,
                        status: p,
                        texts: m
                    } = e, f = PIXI.Texture.from(l), g = {__prefab: "tournament_pin", name: "pin_".concat(t)},
                    b = s.map(e => {
                        let {title: t} = e;
                        return t
                    }).join("\n"), y = {
                        tournament_type: m.type,
                        game_name: m.title,
                        icon_tournament: f,
                        prize_pool: "".concat(d, " ").concat(u),
                        prize_pool_alpha: d > 0 ? 1 : 0,
                        tournament_info_name: m.title,
                        tournament_info_type: m.ranking,
                        tournament_info_prize_pool: "".concat(d, " ").concat(u),
                        tournament_info_prizes: a,
                        tournament_info_bet_level: c,
                        tournament_info_games: b
                    }, S = Object.assign(Object.assign({}, this.variables), y);
                g.__prefabs = Object.assign({}, this.prefabs);
                const w = new c2d.display.Container;
                w._bounds.customBounds = [0, 0, 462, 650];
                const v = this.buildDynamicTree(g, w, S).nodeMap["pin_".concat(t)];
                v.setStates(p), v.nodeMap.info_btn.setHandlers(() => {
                    v.nodeMap.tournament_info._visible = !0
                }), v.nodeMap.rules_btn.setHandlers(() => {
                    this.rulesHandler(m)
                }), v.nodeMap.leaderboard_button.setHandlers(() => {
                    this.leaderBoardHandler(i)
                }), v.nodeMap.close_info.setHandlers(() => {
                    v.nodeMap.tournament_info._visible = !1
                });
                const _ = new Date(1e3 * r) > new Date, x = _ ? r : o;
                return {
                    timer: new n.default(x, e => {
                        let {days: t, hours: i, minutes: s, seconds: n} = e;
                        t <= 0 ? (v.nodeMap.timer_days.text = i, v.nodeMap.timer_0_description.text = "core.tournament_time_hours".ls(), v.nodeMap.timer_hours.text = s, v.nodeMap.timer_1_description.text = "core.tournament_time_minutes".ls(), v.nodeMap.timer_minutes.text = n, v.nodeMap.timer_2_description.text = "core.tournament_time_seconds".ls()) : (v.nodeMap.timer_days.text = t, v.nodeMap.timer_0_description.text = "core.tournament_time_days".ls(), v.nodeMap.timer_hours.text = i, v.nodeMap.timer_1_description.text = "core.tournament_time_hours".ls(), v.nodeMap.timer_minutes.text = s, v.nodeMap.timer_2_description.text = "core.tournament_time_minutes".ls())
                    }, () => {
                        _ || (v.nodeMap.finish_text.visible = !0, v.nodeMap.numbers_container.visible = !1)
                    }), container: w
                }
            }

            _clear() {
                this.tournaments.forEach(e => {
                    let {timer: t} = e;
                    return t.destroy()
                }), this.tournaments = [], this.parent.nodeMap.tournamentContainer.removeChildren()
            }
        }

        i.default = o
    }, {"./DynamicTree.js": 231, "./Timer.js": 235, "core-js/modules/es.object.assign": 348}],
    237: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});

        class s extends game.sources.VisualComponent {
            onInitialize() {
                const e = this.getConfig("styles_text"), t = {resolution: 1, chars: game.localization.uniqueChars};
                PIXI.BitmapText.breakWords = ["zh", "zhtw", "ja"].includes(game.loader.language), Object.entries(e).forEach(([e, i]) => {
                    const s = PIXI.BitmapFont.from(e, i, t);
                    i.lineHeight && (s.lineHeight = i.lineHeight), s.__style = i
                })
            }
        }

        i.default = s
    }, {}],
    238: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        const s = {Component: e("./UIFactory").default};
        (c2d.Logger ? c2d.Logger.Of("UIFactory") : console).info("component version v0.01.3"), game.componentsManager.registerComponent("UIFactory", s, "v0.01.3")
    }, {"./UIFactory": 237}],
    239: [function (e, t, i) {
        "use strict";

        class s extends game.sources.VisualComponent {
            build() {
                this.controller.build()
            }

            playStartGame() {
                this.controller.playStartGame()
            }

            onSkip() {
                this.controller.onSkip()
            }

            playActionBoss() {
                this.controller.playActionBoss()
            }

            endActionBoss() {
                this.controller.endActionBoss()
            }

            playActionBomb() {
                this.controller.playActionBomb()
            }

            playActionGun() {
                this.controller.playActionGun()
            }

            playActionLaser() {
                this.controller.playActionLaser()
            }

            playActionCut() {
                this.controller.playActionCut()
            }

            onAbort() {
                this.controller.onAbort()
            }
        }

        class n extends game.sources.Handler {
            get statesConfig_Background() {
                return {
                    Init: {enter: this.onInitEnter, exit: this.onStartGame},
                    Intro: {enter: this.onIntroEnter, exit: this.onIntroExit},
                    Replay: {enter: this.onReplayEnter, begin: this.onReplayBegin, exit: this.onReplayExit},
                    CharacterAction: {enter: this.onCharacterSkip},
                    ActionBomb: {enter: this.onActionBomb},
                    ActionGun: {enter: this.onActionGun},
                    ActionLaser: {enter: this.onActionLaser},
                    ActionCut: {enter: this.onActionCut},
                    ActionBoss: {enter: this.onBossAction, exit: this.onEndBossAction}
                }
            }

            onInitialize() {
                this.registerStates(this.statesConfig_Background), super.onInitialize()
            }

            onInitEnter(e) {
                let {finish: t} = e;
                this.component.build(), t()
            }

            onStartGame(e) {
                let {finish: t} = e;
                this.component.playStartGame(), t()
            }

            onIntroEnter(e) {
                let {finish: t} = e;
                this.isIntro = !0, t()
            }

            onIntroExit(e) {
                let {finish: t} = e;
                this.isIntro = !1, t()
            }

            onReplayEnter(e) {
                let {finish: t} = e;
                t();
                return {
                    onAbort: () => {
                        this.isAbort = !0, this.component.onAbort()
                    }
                }
            }

            onReplayBegin(e) {
                let {finish: t} = e;
                this.isAbort = !1, t()
            }

            onReplayExit(e) {
                let {finish: t} = e;
                return t(), {
                    onFinish: () => {
                        this.isAbort = !1
                    }
                }
            }

            onCharacterSkip(e) {
                let {finish: t} = e;
                if (t(), !this.isIntro) return {onSkip: () => this.component.onSkip()}
            }

            onBossAction(e) {
                let {finish: t} = e;
                if (t(), !this.isIntro) return {
                    actions: {
                        startPersAnimation: () => {
                            this.isAbort || this.component.playActionBoss()
                        }
                    }
                }
            }

            onEndBossAction(e) {
                let {finish: t} = e;
                this.isIntro || this.isAbort || this.component.endActionBoss(), t()
            }

            onActionBomb(e) {
                let {finish: t} = e;
                this.isIntro || this.isAbort || this.component.playActionBomb(), t()
            }

            onActionGun(e) {
                let {finish: t} = e;
                this.isIntro || this.isAbort || this.component.playActionGun(), t()
            }

            onActionLaser(e) {
                let {finish: t} = e;
                this.isIntro || this.isAbort || this.component.playActionLaser(), t()
            }

            onActionCut(e) {
                let {finish: t} = e;
                this.isIntro || this.isAbort || this.component.playActionCut(), t()
            }
        }

        class o extends game.sources.Controller {
            build() {
                this.view.build()
            }

            playStartGame() {
                this.view.playStartGame()
            }

            onSkip() {
                this.view.onSkip()
            }

            playActionBoss() {
                this.view.playActionBoss()
            }

            endActionBoss() {
                this.view.endActionBoss()
            }

            playActionBomb() {
                this.view.playActionBomb()
            }

            playActionGun() {
                this.view.playActionGun()
            }

            playActionLaser() {
                this.view.playActionLaser()
            }

            playActionCut() {
                this.view.playActionCut()
            }

            onAbort() {
                this.view.onAbort()
            }
        }

        class r extends game.sources.View {
            build() {
                this.buildBackGraphics(), game.engine.device.desktop ? this.buildDesktop() : this.buildMobile(), this.updateView()
            }

            buildBackGraphics() {
                this.backGraphics = new c2d.display.Graphics, this.layers.background.addChildAt(this.backGraphics)
            }

            buildDesktop() {
                this.background = new c2d.display.Spine(this.assetsStore.getSkeleton("bg")), this.background.name = "background", this.layers.background.addChild(this.background), this.background.attach("enemie_hero_place_slot", this.layers.reelset), this.background.attach("enemie_hero_place_slot", this.layers.boss), this.background.attach("main_hero_place_slot", this.layers.character), this.mainBone = this.background.findBone("main_ctrl")
            }

            buildMobile() {
                this.bgPortrait = new c2d.display.Spine(this.assetsStore.getSkeleton("bg_paralax_portrait")), this.bgPortrait.name = "background_portrait", this.bgPortrait.visible = !1, this.layers.background.addChild(this.bgPortrait), this.bgLandscape = new c2d.display.Spine(this.assetsStore.getSkeleton("bg_paralax_landscape")), this.bgLandscape.name = "background_landscape", this.bgLandscape.visible = !1, this.layers.background.addChild(this.bgLandscape)
            }

            onResizeScreen() {
                this.updateView()
            }

            updateView() {
                if (!this.backGraphics) return;
                this.backGraphics.x = -this.layers.background.x;
                const e = game.size.gameField.width, t = game.size.gameField.height;
                if (this.backGraphics.clear().beginFill(6120445).drawRect(.5 * -e - 100, -4e3 - .5 * t, e + 200, 4e3).endFill(), game.engine.device.desktop) return;
                const i = this.background;
                if (i && (i.pause(), i.visible = !1), game.engine.device.portrait ? this.background = this.bgPortrait : this.background = this.bgLandscape, this.background.attach("enemie_hero_place_slot", this.layers.reelset), this.background.attach("enemie_hero_place_slot", this.layers.boss), this.background.attach("main_hero_place_slot", this.layers.character), this.background.visible = !0, i) {
                    let e = i.track;
                    const t = {track: null, loop: e.loop};
                    for (this.background.play(e.animation.name, t), t.track.trackTime = e.getAnimationTime(), t.track.timeScale = e.timeScale, t.track.listener = e.listener, e = e.next; e;) {
                        const t = {track: null, loop: e.loop, delay: e.delay, force: !1};
                        this.background.play(e.animation.name, t), t.track.timeScale = e.timeScale, t.track.listener = e.listener, e = e.next
                    }
                }
                this.mainBone = this.background.findBone("main_ctrl")
            }

            playStartGame() {
                this.background.play("in"), this.background.play("static", {loop: !0, force: !1})
            }

            onSkip() {
                "static" != this.background.currentAnimation && "in" != this.background.currentAnimation && (this.background.speed = 3)
            }

            playActionBoss() {
            }

            endActionBoss() {
            }

            playActionBomb() {
                if (!game.engine.device.desktop) return;
                this.background.play("bomb", {
                    onComplete: () => {
                        this.background.speed = 1
                    }
                }), this.background.play("static", {loop: !0, force: !1})
            }

            playActionGun() {
                if (!game.engine.device.desktop) return;
                this.background.play("gun", {
                    onComplete: () => {
                        this.background.speed = 1
                    }
                }), this.background.play("static", {loop: !0, force: !1})
            }

            playActionLaser() {
                if (!game.engine.device.desktop) return;
                this.background.play("laser", {
                    onComplete: () => {
                        this.background.speed = 1
                    }
                }), this.background.play("static", {loop: !0, force: !1})
            }

            playActionCut() {
                if (!game.engine.device.desktop) return;
                this.background.play("cut", {
                    onComplete: () => {
                        this.background.speed = 1
                    }
                }), this.background.play("static", {loop: !0, force: !1})
            }

            onAbort() {
                this.background.speed = 1, this.background.play("static", {loop: !0, force: !0})
            }
        }

        game.componentsManager.registerComponent("Background", {Component: s, Handler: n, Controller: o, View: r})
    }, {}],
    240: [function (e, t, i) {
        "use strict";
        e("core-js/modules/es.promise"), e("core-js/modules/es.string.includes");
        var s = function (e, t, i, s) {
            return new (i || (i = Promise))((function (n, o) {
                function r(e) {
                    try {
                        l(s.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        l(s.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? n(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                        e(t)
                    }))).then(r, a)
                }

                l((s = s.apply(e, t || [])).next())
            }))
        };

        class n extends game.sources.VisualComponent {
            build() {
                this.active = !1, this.controller.build()
            }

            onInit() {
                this.controller.onInit()
            }

            showStartBoss(e) {
                this.controller.showStartBoss(e), this.active = !1
            }

            playActionBomb(e) {
                return s(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.playActionBomb(e), this.active = !1
                }))
            }

            playActionGun(e) {
                return s(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.playActionGun(e), this.active = !1
                }))
            }

            playActionLaser(e) {
                return s(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.playActionLaser(e), this.active = !1
                }))
            }

            playActionCut(e) {
                return s(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.playActionCut(e), this.active = !1
                }))
            }

            playActionBoss(e, t) {
                return s(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.playActionBoss(e, t), this.active = !1
                }))
            }

            onAbort() {
                this.controller.onAbort()
            }

            changeBoss() {
                return s(this, void 0, void 0, (function* () {
                    this.active = !0, yield this.controller.changeBoss(), this.active = !1
                }))
            }

            onSkip() {
                this.controller.onSkip()
            }
        }

        class o extends game.sources.Store {
            getSymbolPosition(e, t) {
                return this.getItem("getSymbolPosition")(e, t)
            }

            getNextBoss() {
                const e = this.getItem("spinData"), t = e && e.extra && e.extra.next_boss;
                return c2d.type.isNumber(t) ? t : -1
            }

            getSpinEvent() {
                const e = this.getItem("spinData");
                return e && e.extra && e.extra.event || ""
            }

            getReplaceSymbols() {
                const {replaceSymbols: e} = this.getItem("patterns");
                return e || []
            }

            getNextAction() {
                return this.getItem("getNextAction")
            }

            getTotalWin() {
                return this.getItem("totalWin")
            }

            getInitData() {
                return this.getItem("initData")
            }
        }

        class r extends game.sources.Handler {
            get statesConfig_Heroes() {
                return {
                    Init: {exit: this.onInitExit},
                    Intro: {enter: this.onIntroEnter, exit: this.onIntroExit},
                    Gifts: {begin: this.onGiftsBegin},
                    Replay: {enter: this.onReplayEnter, begin: this.onReplayBegin, exit: this.onReplayExit},
                    Idle: {begin: this.onIdleBegin},
                    Spin: {enter: this.onSpinEnter, exit: this.onSpinExit},
                    SpinStop: {enter: this.onSpinStopEnter},
                    CharacterAction: {check: this.hasCharacterAction, enter: this.onCharacterAction},
                    ActionBomb: {check: this.hasActionBomb, enter: this.onActionBomb},
                    ActionGun: {check: this.hasActionGun, enter: this.onActionGun},
                    ActionLaser: {check: this.hasActionLaser, enter: this.onActionLaser},
                    ActionCut: {check: this.hasActionCut, enter: this.onActionCut},
                    ActionBoss: {check: this.hasActionBoss, enter: this.onBossAction}
                }
            }

            onInitialize() {
                this.registerStates(this.statesConfig_Heroes), super.onInitialize(), this.component.build()
            }

            onInitExit(e) {
                let {finish: t} = e;
                this.component.onInit(), t()
            }

            onIntroEnter(e) {
                let {finish: t} = e;
                this.component.controller.onIntroEnter(), t();
                return {
                    onAbort: () => {
                        this.abort = !0, this.component.onAbort()
                    }
                }
            }

            onIntroExit(e) {
                let {finish: t} = e;
                return this.component.controller.onIntroExit(), t(), {
                    onFinish: () => {
                        const e = this.component.store.getNextAction();
                        this.component.store.getTotalWin() && "spin" == e || this.component.changeBoss()
                    }
                }
            }

            onGiftsBegin(e) {
                let {finish: t} = e;
                this.component.showStartBoss(0), t()
            }

            onReplayEnter(e) {
                let {finish: t} = e;
                t();
                return {
                    onAbort: () => {
                        this.abort = !0, this.component.onAbort()
                    }
                }
            }

            onReplayBegin(e) {
                let {finish: t} = e;
                this.abort = !1, this.component.showStartBoss(0), t()
            }

            onReplayExit(e) {
                let {finish: t} = e;
                return t(), {
                    onFinish: () => {
                        this.abort = !1;
                        const e = this.component.store.getNextAction();
                        this.component.store.getTotalWin() && "spin" == e || this.component.changeBoss()
                    }
                }
            }

            onIdleBegin(e) {
                let {finish: t} = e;
                this.component.showStartBoss(0), t()
            }

            onActionBomb(e) {
                let {actions: t, finish: i} = e;
                this.abort ? i() : this.component.playActionBomb(t.specAction).then(i)
            }

            onActionGun(e) {
                let {actions: t, finish: i} = e;
                this.abort ? i() : this.component.playActionGun(t.specAction).then(i)
            }

            onActionLaser(e) {
                let {actions: t, finish: i} = e;
                this.abort ? i() : this.component.playActionLaser(t.specAction).then(i)
            }

            onActionCut(e) {
                let {actions: t, finish: i} = e;
                this.abort ? i() : this.component.playActionCut(t.specAction).then(i)
            }

            hasActionBoss() {
                if (this.abort) return !1;
                const e = this.component.store.getInitData(), t = this.component.store.getNextAction();
                return (!e || "spin" != t) && (this.spinEvent = this.component.store.getSpinEvent(), this.spinEvent.includes("boss"))
            }

            onBossAction(e) {
                let {finish: t, actions: i} = e;
                if (!this.abort) return this.component.playActionBoss(i.cameraAction, i.specAction).then(t), {onSkip: () => this.component.onSkip()};
                t()
            }

            onSpinEnter(e) {
                let {finish: t} = e;
                t()
            }

            onSpinExit(e) {
                let {finish: t} = e;
                t(), this.abort = !1
            }

            onSpinStopEnter(e) {
                let {finish: t} = e;
                this.abort ? t() : this.component.changeBoss().then(t)
            }

            hasCharacterAction() {
                return this.spinEvent = this.component.store.getSpinEvent(), !!this.spinEvent
            }

            onCharacterAction(e) {
                let {finish: t} = e;
                return t(), {onSkip: () => this.component.onSkip()}
            }

            hasActionBomb() {
                return "bomb" == this.spinEvent
            }

            hasActionGun() {
                return "gun" == this.spinEvent
            }

            hasActionLaser() {
                return "laser" == this.spinEvent
            }

            hasActionCut() {
                return "cut" == this.spinEvent
            }
        }

        class a extends game.sources.Controller {
            build() {
                this.view.build()
            }

            onInit() {
                const e = this.store.getNextAction();
                this.store.getTotalWin() && "spin" == e || this.showStartBoss(!0)
            }

            onIntroEnter() {
                this.isIntro = !0
            }

            onIntroExit() {
                this.isIntro = !1
            }

            showStartBoss(e, t) {
                if (!t && this.view.onBegin(), e = c2d.type.isNumber(e) ? e : this.store.getNextBoss(), c2d.type.isNumber(e)) {
                    if ((e = e < 2 ? 0 : e - 2) > 5) return
                } else e = 0;
                e != this.currentIndex && (this.currentIndex = e, this.view.outBoss(), this.view.inBoss(this.currentIndex).then(e => {
                    e || (this.currentIndex = null)
                }))
            }

            playActionBomb(e) {
                return s(this, void 0, void 0, (function* () {
                    yield this.view.playActionBomb(e)
                }))
            }

            playActionGun(e) {
                return s(this, void 0, void 0, (function* () {
                    const t = this.store.getReplaceSymbols();
                    yield this.view.playActionGun(e, t)
                }))
            }

            playActionLaser(e) {
                return s(this, void 0, void 0, (function* () {
                    yield this.view.playActionLaser(e)
                }))
            }

            playActionCut(e) {
                return s(this, void 0, void 0, (function* () {
                    yield this.view.playActionCut(e)
                }))
            }

            playActionBoss(e, t) {
                return s(this, void 0, void 0, (function* () {
                    if (this.store.getNextBoss() > 5) return;
                    this.isIntro || (e(), yield this.view.playActionPersUp());
                    const i = this.store.getSpinEvent(), s = this.store.getReplaceSymbols();
                    let n;
                    if ("boss_2" == i) {
                        const e = {};
                        s.forEach(t => {
                            e[t.id] = e[t.id] || [], e[t.id].push(t)
                        }), n = Object.keys(e).length
                    }
                    yield this.view.playActionBoss(t, n), this.currentIndex++, this.view.inBoss(this.currentIndex).then(e => {
                        e || (this.currentIndex = null)
                    })
                }))
            }

            onAbort() {
                this.view.onAbort()
            }

            changeBoss() {
                return s(this, void 0, void 0, (function* () {
                    let e = this.store.getNextBoss();
                    if (c2d.type.isNumber(e)) {
                        if (e -= 2, e < 0 && (e = 0), e > 4) return this.view.outBoss(), void (this.currentIndex = null);
                        e != this.currentIndex && (this.currentIndex = e, yield this.view.inBoss(e).then(e => {
                            e || (this.currentIndex = null)
                        }))
                    }
                }))
            }

            onSkip() {
                this.view.onSkip()
            }
        }

        class l extends game.sources.View {
            build() {
                this.buildPers(), this.buildPersLabel(), this.buildBosses(), this.updateView()
            }

            buildBosses() {
                this.boss = [];
                ["boss_1", "boss_2", "boss_3", "boss_4"].forEach((e, t) => {
                    const i = this.assetsStore.getSkeleton(e);
                    this.boss[t] = new c2d.display.Spine(i), this.boss[t].name = e, this.boss[t].visible = !1, this.layers.boss.addChild(this.boss[t])
                })
            }

            buildPers() {
                const e = this.assetsStore.getSkeleton("pers");
                this.pers = new c2d.display.Spine(e), this.layers.character.addChild(this.pers), this.pers.play("idle", {loop: !0}), this.persLeftTopCtrl = this.pers.findBone("left_top_ctrl"), this.persRightBotCtrl = this.pers.findBone("right_bot_ctrl")
            }

            buildPersLabel() {
                this.labelContainer = new c2d.display.Container, this.labelContainer.name = "charLabelContainer", this.labelBG = new c2d.display.Spine(this.assetsStore.getSkeleton("combo")), this.labelBG.name = "charLabelBG";
                const e = new PIXI.TextStyle({
                    fill: "white",
                    fontSize: 70,
                    fontWeight: 400,
                    padding: 50,
                    fontFamily: "kenyancoffeerg"
                });
                this.labelText = new c2d.display.TextField("", e), this.labelText.name = "charLabelText", this.labelText.anchor.set(.5, .5), this.labelText.alpha = 0, this.labelTween = new c2d.Timeline({paused: !0}).set(this.labelText, {
                    pixi: {
                        alpha: 0,
                        pivotX: 200
                    }
                }).to(this.labelText, .2, {pixi: {alpha: 1, pivotX: 0}}, 1.5).to(this.labelText, .2, {
                    pixi: {
                        alpha: 0,
                        pivotX: -200
                    }
                }, 3.5), this.labelContainer.addChild(this.labelBG, this.labelText)
            }

            onResizeScreen() {
                this.updateView()
            }

            updateView() {
                this.updatePers(), this.updateBosses()
            }

            updateBosses() {
                c2d.call(() => {
                    this.updateBoneBoss1(), this.updateBoneBoss2(), this.updateBoneBoss3()
                }, .1)
            }

            updateBoneBoss1() {
                const e = this.boss[0];
                if (!e) return;
                const t = e.findBone("left_top_ctrl");
                let i = this.store.getSymbolPosition(3, 3);
                i = this.layers.boss.toLocal(i), t.x = i.x, t.y = -i.y
            }

            updateBoneBoss2() {
                const e = this.boss[1];
                if (!e) return;
                const t = e.findBone("left_top_ctrl");
                let i = this.store.getSymbolPosition(3, 3);
                i = this.layers.boss.toLocal(i), t.x = i.x, t.y = -i.y
            }

            updateBoneBoss3() {
                const e = this.boss[2];
                if (!e) return;
                const t = e.findBone("left_top_ctrl");
                let i = this.store.getSymbolPosition(3, 3);
                i = this.layers.boss.toLocal(i), t.x = i.x, t.y = -i.y
            }

            updatePers() {
                this.pers && (game.engine.device.mobile ? game.engine.device.portrait ? this.pers.attach("camera_text_portrait", this.labelContainer) : this.pers.attach("camera_text_landscape", this.labelContainer) : this.pers.attach("camera_text", this.labelContainer), c2d.call(() => {
                    const e = this.pers.track.animation.name;
                    this.updatePersBones(e)
                }, .2))
            }

            updatePersBones(e) {
                if ("idle" != e) if ("bomb" == e) {
                    let e = this.store.getSymbolPosition(3, 3);
                    e = this.layers.character.toLocal(e), this.persLeftTopCtrl.x = e.x, this.persLeftTopCtrl.y = -e.y
                } else if ("gun" == e) {
                    const {column: e, row: t} = this.lastGunData, i = this.store.getSymbolPosition(e, t),
                        s = this.pers.toLocal(i);
                    this.persLeftTopCtrl.x = s.x, this.persLeftTopCtrl.y = -s.y
                } else if ("laser" == e) {
                    const e = this.store.getSymbolPosition(0, 4), t = this.pers.toLocal(e);
                    this.persLeftTopCtrl.x = t.x, this.persLeftTopCtrl.y = -t.y
                } else if ("cut" == e) {
                    const e = this.store.getSymbolPosition(0, 0), t = this.pers.toLocal(e);
                    this.persLeftTopCtrl.x = t.x, this.persLeftTopCtrl.y = -t.y;
                    const i = this.store.getSymbolPosition(6, 6), s = this.pers.toLocal(i);
                    this.persRightBotCtrl.x = s.x, this.persRightBotCtrl.y = -s.y
                } else if ("attack_kill" == e) {
                    const e = this.getBossPosition(), t = this.pers.toLocal(e);
                    this.persRightBotCtrl.x = t.x, this.persRightBotCtrl.y = -t.y
                }
            }

            getBossPosition() {
                const e = this.currentBoss.findBone("attack_kill_ctrl");
                return this.currentBoss.toGlobal({x: e.x, y: -e.y})
            }

            playPersDefense() {
                this.pers.play("defense", {speed: this.timescale}).then(() => this.playPersIdle())
            }

            playBossDefense() {
                this.currentBoss && this.currentBoss.play("defense", {speed: this.timescale}).then(() => this.playBossIdle())
            }

            playPersIdle() {
                "idle" != this.pers.currentAnimation && (this.labelTween.progress(1), this.labelTween.timeScale(1), this.labelBG.currentTime = this.labelBG.totalTime, this.labelBG.speed = 1, this.pers.play("idle", {
                    loop: !0,
                    speed: 1
                }))
            }

            playBossIdle() {
                this.currentBoss && "idle" != this.currentBoss.currentAnimation && this.currentBoss.play("idle", {
                    loop: !0,
                    speed: 1
                })
            }

            playActionBomb(e) {
                return this.tlIdleAttack && this.tlIdleAttack.kill(), this.timescale = 1, new Promise(t => {
                    this.labelText.text = "game.rules_vortex_feature_title".ls(), this.labelBG.play("bomb", {speed: this.timescale}), this.labelTween.restart(), this.pers.play("bomb", {
                        speed: this.timescale,
                        onEvent: (i, s) => {
                            let {data: n} = s;
                            "continue" === n.name ? (t(), e()) : "defense" === n.name && this.playBossDefense()
                        },
                        onComplete: () => {
                            t(), this.playPersIdle()
                        }
                    }), this.updatePersBones("bomb")
                })
            }

            playActionGun(e, t) {
                return this.tlIdleAttack && this.tlIdleAttack.kill(), this.timescale = 1, new Promise(i => {
                    this.labelText.text = "game.rules_ricochet_feature_title".ls(), this.labelBG.play("gun", {speed: this.timescale}), this.labelTween.restart(), this.pers.play("gun", {
                        speed: this.timescale,
                        onEvent: (t, i) => {
                            let {data: s} = i;
                            "continue" === s.name ? e() : "defense" === s.name && this.playBossDefense()
                        },
                        onComplete: () => {
                            this.playPersIdle(), i()
                        }
                    }), this.lastGunData = t.last || {}, this.updatePersBones("gun")
                })
            }

            playActionLaser(e) {
                return this.tlIdleAttack && this.tlIdleAttack.kill(), this.timescale = 1, new Promise(t => {
                    this.labelText.text = "game.rules_flare_feature_title".ls(), this.labelBG.play("laser", {speed: this.timescale}), this.labelTween.restart(), this.pers.play("laser", {
                        speed: this.timescale,
                        onEvent: (t, i) => {
                            let {data: s} = i;
                            "continue" === s.name ? e() : "defense" === s.name && this.playBossDefense()
                        },
                        onComplete: () => {
                            this.playPersIdle(), t()
                        }
                    }), this.updatePersBones("laser")
                })
            }

            playActionCut(e) {
                return this.tlIdleAttack && this.tlIdleAttack.kill(), this.timescale = 1, new Promise(t => {
                    this.labelText.text = "game.rules_eviscerate_feature_title".ls(), this.labelBG.play("cut", {speed: this.timescale}), this.labelTween.restart(), this.pers.play("cut", {
                        speed: this.timescale,
                        onEvent: (t, i) => {
                            let {data: s} = i;
                            "continue" === s.name ? e() : "defense" === s.name && this.playBossDefense()
                        },
                        onComplete: () => {
                            this.playPersIdle(), t()
                        }
                    }), this.updatePersBones("cut")
                })
            }

            playActionPersUp() {
                return this.tlIdleAttack && this.tlIdleAttack.kill(), this.timescale = 1, new Promise(e => {
                    this.pers.play("attack_kill", {
                        speed: this.timescale, onEvent: (t, i) => {
                            let {data: s} = i;
                            "deathrattle_in" === s.name && e()
                        }, onComplete: () => {
                            this.playPersIdle(), e()
                        }
                    }), this.updatePersBones("attack_kill")
                })
            }

            playActionBoss(e, t) {
                if (!this.currentBoss) return e(), Promise.resolve();
                const i = this.store.getSpinEvent();
                return "boss_1" == i ? this.playBoss1(e) : "boss_2" == i ? this.playBoss2(e, t) : "boss_3" == i ? this.playBoss3(e) : "boss_4" == i ? this.playBoss4(e) : Promise.resolve()
            }

            inBoss(e) {
                return this.currentBoss && (this.currentBoss.visible = !1, this.currentBoss = null), this.isAbort ? Promise.resolve(!1) : (this.currentBoss = this.boss[e], this.currentBoss ? new Promise(e => {
                    this.currentBoss.visible = !0;
                    this.currentBoss.play("in", {
                        speed: this.timescale, onComplete: () => {
                            e(!0), this.playBossIdle()
                        }
                    })
                }) : Promise.resolve(!0))
            }

            outBoss() {
                return s(this, void 0, void 0, (function* () {
                    if (!this.currentBoss) return;
                    const e = this.currentBoss;
                    this.currentBoss = null, e.findAnimation("out") ? yield e.play("out", {speed: this.timescale}).then(() => {
                        e.visible = !1
                    }) : e.visible = !1
                }))
            }

            playBoss1(e) {
                return new Promise(t => {
                    const i = this.boss[0];
                    this.updateBoneBoss1(), i.play("defeat", {speed: this.timescale, onComplete: e});
                    i.play("deathrattle_out", {
                        speed: this.timescale, force: !1, onComplete: () => {
                            i.visible = !1, this.currentBoss = !1, t()
                        }
                    })
                })
            }

            playBoss2(e, t) {
                return new Promise(i => {
                    const s = this.boss[1];
                    let n = 0;
                    let o = "deathrattle_2_colors";
                    3 === t && (o = "deathrattle_3_colors"), this.updateBoneBoss2(), s.play("defeat", {speed: this.timescale}), s.play(o, {
                        speed: this.timescale,
                        force: !1,
                        onEvent: (t, i) => {
                            let {data: s} = i;
                            s.name.includes("color") && (e({index: n}), n++)
                        },
                        onComplete: () => {
                            s.visible = !1, this.currentBoss = !1, i()
                        }
                    })
                })
            }

            playBoss3(e) {
                return new Promise(t => {
                    const i = this.boss[2];
                    this.updateBoneBoss3();
                    i.play("defeat", {speed: this.timescale}), i.play("deathrattle", {
                        speed: this.timescale,
                        force: !1,
                        onEvent: (t, i) => {
                            let {data: s} = i;
                            "continue" == s.name && e()
                        },
                        onComplete: () => {
                            i.visible = !1, this.currentBoss = !1, t()
                        }
                    })
                })
            }

            playBoss4(e) {
                return new Promise(t => {
                    const i = this.boss[3];
                    i.play("defeat", {speed: this.timescale}), i.play("deathrattle", {
                        speed: this.timescale,
                        force: !1,
                        onEvent: (t, i) => {
                            let {data: s} = i;
                            "continue" == s.name && e()
                        },
                        onComplete: () => {
                            i.visible = !1, this.currentBoss = !1, t()
                        }
                    })
                })
            }

            onAbort() {
                return s(this, void 0, void 0, (function* () {
                    this.isAbort = !0, yield this.onPersAbort(), yield this.onBossesAbort(), this.isAbort = !1
                }))
            }

            onPersAbort() {
                return s(this, void 0, void 0, (function* () {
                    "idle" != this.pers.currentAnimation && (yield this.pers.play(null), this.playPersIdle())
                }))
            }

            onBossesAbort() {
                return s(this, void 0, void 0, (function* () {
                    this.currentBoss && (yield this.currentBoss.play(null), this.currentBoss.visible && this.playBossIdle())
                }))
            }

            onSkip() {
                this.timescale = 3, this.onSkipPers(), this.onSkipBoss()
            }

            onSkipPers() {
                "idle" != this.pers.currentAnimation && (this.pers.speed = 3, this.labelBG.speed = 3, this.labelTween.timeScale(3))
            }

            onSkipBoss() {
                "idle" != this.currentBoss.currentAnimation && (this.currentBoss.speed = 3)
            }

            onBegin() {
                this.timescale = 1, this.onIdleAttack()
            }

            onIdleAttack() {
                this.tlIdleAttack && this.tlIdleAttack.kill(), this.tlIdleAttack = new c2d.Timeline, this.tlIdleAttack.add(() => this.playBossIdleAttack(), 15), this.tlIdleAttack.add(() => this.playPersIdleAttack(), 30), this.tlIdleAttack.add(() => this.onIdleAttack())
            }

            playPersIdleAttack() {
                if (!this.currentBoss) return;
                this.pers.play("attack_light", {
                    speed: 1, onEvent: (e, t) => {
                        let {data: i} = t;
                        "attack" === i.name && this.playBossDefense()
                    }
                }).then(() => this.playPersIdle())
            }

            playBossIdleAttack() {
                if (!this.currentBoss) return;
                this.currentBoss.play("attack_light", {
                    speed: 1, onEvent: (e, t) => {
                        let {data: i} = t;
                        "attack" === i.name && this.playPersDefense()
                    }
                }).then(() => this.playBossIdle())
            }
        }

        game.componentsManager.registerComponent("Heroes", {Component: n, Handler: r, Store: o, Controller: a, View: l})
    }, {"core-js/modules/es.promise": 349, "core-js/modules/es.string.includes": 351}],
    241: [function (e, t, i) {
        t.exports = function (e) {
            if ("function" != typeof e) throw TypeError(String(e) + " is not a function");
            return e
        }
    }, {}],
    242: [function (e, t, i) {
        var s = e("../internals/is-object");
        t.exports = function (e) {
            if (!s(e) && null !== e) throw TypeError("Can't set " + String(e) + " as a prototype");
            return e
        }
    }, {"../internals/is-object": 287}],
    243: [function (e, t, i) {
        var s = e("../internals/well-known-symbol"), n = e("../internals/object-create"),
            o = e("../internals/object-define-property"), r = s("unscopables"), a = Array.prototype;
        null == a[r] && o.f(a, r, {configurable: !0, value: n(null)}), t.exports = function (e) {
            a[r][e] = !0
        }
    }, {
        "../internals/object-create": 300,
        "../internals/object-define-property": 302,
        "../internals/well-known-symbol": 342
    }],
    244: [function (e, t, i) {
        "use strict";
        var s = e("../internals/string-multibyte").charAt;
        t.exports = function (e, t, i) {
            return t + (i ? s(e, t).length : 1)
        }
    }, {"../internals/string-multibyte": 329}],
    245: [function (e, t, i) {
        t.exports = function (e, t, i) {
            if (!(e instanceof t)) throw TypeError("Incorrect " + (i ? i + " " : "") + "invocation");
            return e
        }
    }, {}],
    246: [function (e, t, i) {
        var s = e("../internals/is-object");
        t.exports = function (e) {
            if (!s(e)) throw TypeError(String(e) + " is not an object");
            return e
        }
    }, {"../internals/is-object": 287}],
    247: [function (e, t, i) {
        var s = e("../internals/to-indexed-object"), n = e("../internals/to-length"),
            o = e("../internals/to-absolute-index"), r = function (e) {
                return function (t, i, r) {
                    var a, l = s(t), c = n(l.length), h = o(r, c);
                    if (e && i != i) {
                        for (; c > h;) if ((a = l[h++]) != a) return !0
                    } else for (; c > h; h++) if ((e || h in l) && l[h] === i) return e || h || 0;
                    return !e && -1
                }
            };
        t.exports = {includes: r(!0), indexOf: r(!1)}
    }, {"../internals/to-absolute-index": 333, "../internals/to-indexed-object": 334, "../internals/to-length": 336}],
    248: [function (e, t, i) {
        "use strict";
        var s = e("../internals/fails");
        t.exports = function (e, t) {
            var i = [][e];
            return !!i && s((function () {
                i.call(null, t || function () {
                    throw 1
                }, 1)
            }))
        }
    }, {"../internals/fails": 269}],
    249: [function (e, t, i) {
        var s = e("../internals/is-object"), n = e("../internals/is-array"),
            o = e("../internals/well-known-symbol")("species");
        t.exports = function (e, t) {
            var i;
            return n(e) && ("function" != typeof (i = e.constructor) || i !== Array && !n(i.prototype) ? s(i) && null === (i = i[o]) && (i = void 0) : i = void 0), new (void 0 === i ? Array : i)(0 === t ? 0 : t)
        }
    }, {"../internals/is-array": 285, "../internals/is-object": 287, "../internals/well-known-symbol": 342}],
    250: [function (e, t, i) {
        var s = e("../internals/an-object");
        t.exports = function (e, t, i, n) {
            try {
                return n ? t(s(i)[0], i[1]) : t(i)
            } catch (t) {
                var o = e.return;
                throw void 0 !== o && s(o.call(e)), t
            }
        }
    }, {"../internals/an-object": 246}],
    251: [function (e, t, i) {
        var s = e("../internals/well-known-symbol")("iterator"), n = !1;
        try {
            var o = 0, r = {
                next: function () {
                    return {done: !!o++}
                }, return: function () {
                    n = !0
                }
            };
            r[s] = function () {
                return this
            }, Array.from(r, (function () {
                throw 2
            }))
        } catch (e) {
        }
        t.exports = function (e, t) {
            if (!t && !n) return !1;
            var i = !1;
            try {
                var o = {};
                o[s] = function () {
                    return {
                        next: function () {
                            return {done: i = !0}
                        }
                    }
                }, e(o)
            } catch (e) {
            }
            return i
        }
    }, {"../internals/well-known-symbol": 342}],
    252: [function (e, t, i) {
        var s = {}.toString;
        t.exports = function (e) {
            return s.call(e).slice(8, -1)
        }
    }, {}],
    253: [function (e, t, i) {
        var s = e("../internals/to-string-tag-support"), n = e("../internals/classof-raw"),
            o = e("../internals/well-known-symbol")("toStringTag"), r = "Arguments" == n(function () {
                return arguments
            }());
        t.exports = s ? n : function (e) {
            var t, i, s;
            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (i = function (e, t) {
                try {
                    return e[t]
                } catch (e) {
                }
            }(t = Object(e), o)) ? i : r ? n(t) : "Object" == (s = n(t)) && "function" == typeof t.callee ? "Arguments" : s
        }
    }, {
        "../internals/classof-raw": 252,
        "../internals/to-string-tag-support": 339,
        "../internals/well-known-symbol": 342
    }],
    254: [function (e, t, i) {
        var s = e("../internals/has"), n = e("../internals/own-keys"),
            o = e("../internals/object-get-own-property-descriptor"), r = e("../internals/object-define-property");
        t.exports = function (e, t) {
            for (var i = n(t), a = r.f, l = o.f, c = 0; c < i.length; c++) {
                var h = i[c];
                s(e, h) || a(e, h, l(t, h))
            }
        }
    }, {
        "../internals/has": 276,
        "../internals/object-define-property": 302,
        "../internals/object-get-own-property-descriptor": 303,
        "../internals/own-keys": 311
    }],
    255: [function (e, t, i) {
        var s = e("../internals/well-known-symbol")("match");
        t.exports = function (e) {
            var t = /./;
            try {
                "/./"[e](t)
            } catch (i) {
                try {
                    return t[s] = !1, "/./"[e](t)
                } catch (e) {
                }
            }
            return !1
        }
    }, {"../internals/well-known-symbol": 342}],
    256: [function (e, t, i) {
        var s = e("../internals/fails");
        t.exports = !s((function () {
            function e() {
            }

            return e.prototype.constructor = null, Object.getPrototypeOf(new e) !== e.prototype
        }))
    }, {"../internals/fails": 269}],
    257: [function (e, t, i) {
        "use strict";
        var s = e("../internals/iterators-core").IteratorPrototype, n = e("../internals/object-create"),
            o = e("../internals/create-property-descriptor"), r = e("../internals/set-to-string-tag"),
            a = e("../internals/iterators"), l = function () {
                return this
            };
        t.exports = function (e, t, i) {
            var c = t + " Iterator";
            return e.prototype = n(s, {next: o(1, i)}), r(e, c, !1, !0), a[c] = l, e
        }
    }, {
        "../internals/create-property-descriptor": 259,
        "../internals/iterators": 292,
        "../internals/iterators-core": 291,
        "../internals/object-create": 300,
        "../internals/set-to-string-tag": 324
    }],
    258: [function (e, t, i) {
        var s = e("../internals/descriptors"), n = e("../internals/object-define-property"),
            o = e("../internals/create-property-descriptor");
        t.exports = s ? function (e, t, i) {
            return n.f(e, t, o(1, i))
        } : function (e, t, i) {
            return e[t] = i, e
        }
    }, {
        "../internals/create-property-descriptor": 259,
        "../internals/descriptors": 261,
        "../internals/object-define-property": 302
    }],
    259: [function (e, t, i) {
        t.exports = function (e, t) {
            return {enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t}
        }
    }, {}],
    260: [function (e, t, i) {
        "use strict";
        var s = e("../internals/export"), n = e("../internals/create-iterator-constructor"),
            o = e("../internals/object-get-prototype-of"), r = e("../internals/object-set-prototype-of"),
            a = e("../internals/set-to-string-tag"), l = e("../internals/create-non-enumerable-property"),
            c = e("../internals/redefine"), h = e("../internals/well-known-symbol"), u = e("../internals/is-pure"),
            d = e("../internals/iterators"), p = e("../internals/iterators-core"), m = p.IteratorPrototype,
            f = p.BUGGY_SAFARI_ITERATORS, g = h("iterator"), b = function () {
                return this
            };
        t.exports = function (e, t, i, h, p, y, S) {
            n(i, t, h);
            var w, v, _, x = function (e) {
                    if (e === p && A) return A;
                    if (!f && e in k) return k[e];
                    switch (e) {
                        case"keys":
                        case"values":
                        case"entries":
                            return function () {
                                return new i(this, e)
                            }
                    }
                    return function () {
                        return new i(this)
                    }
                }, C = t + " Iterator", P = !1, k = e.prototype, B = k[g] || k["@@iterator"] || p && k[p],
                A = !f && B || x(p), M = "Array" == t && k.entries || B;
            if (M && (w = o(M.call(new e)), m !== Object.prototype && w.next && (u || o(w) === m || (r ? r(w, m) : "function" != typeof w[g] && l(w, g, b)), a(w, C, !0, !0), u && (d[C] = b))), "values" == p && B && "values" !== B.name && (P = !0, A = function () {
                return B.call(this)
            }), u && !S || k[g] === A || l(k, g, A), d[t] = A, p) if (v = {
                values: x("values"),
                keys: y ? A : x("keys"),
                entries: x("entries")
            }, S) for (_ in v) (f || P || !(_ in k)) && c(k, _, v[_]); else s({
                target: t,
                proto: !0,
                forced: f || P
            }, v);
            return v
        }
    }, {
        "../internals/create-iterator-constructor": 257,
        "../internals/create-non-enumerable-property": 258,
        "../internals/export": 268,
        "../internals/is-pure": 288,
        "../internals/iterators": 292,
        "../internals/iterators-core": 291,
        "../internals/object-get-prototype-of": 306,
        "../internals/object-set-prototype-of": 310,
        "../internals/redefine": 316,
        "../internals/set-to-string-tag": 324,
        "../internals/well-known-symbol": 342
    }],
    261: [function (e, t, i) {
        var s = e("../internals/fails");
        t.exports = !s((function () {
            return 7 != Object.defineProperty({}, 1, {
                get: function () {
                    return 7
                }
            })[1]
        }))
    }, {"../internals/fails": 269}],
    262: [function (e, t, i) {
        var s = e("../internals/global"), n = e("../internals/is-object"), o = s.document,
            r = n(o) && n(o.createElement);
        t.exports = function (e) {
            return r ? o.createElement(e) : {}
        }
    }, {"../internals/global": 275, "../internals/is-object": 287}],
    263: [function (e, t, i) {
        t.exports = {
            CSSRuleList: 0,
            CSSStyleDeclaration: 0,
            CSSValueList: 0,
            ClientRectList: 0,
            DOMRectList: 0,
            DOMStringList: 0,
            DOMTokenList: 1,
            DataTransferItemList: 0,
            FileList: 0,
            HTMLAllCollection: 0,
            HTMLCollection: 0,
            HTMLFormElement: 0,
            HTMLSelectElement: 0,
            MediaList: 0,
            MimeTypeArray: 0,
            NamedNodeMap: 0,
            NodeList: 1,
            PaintRequestList: 0,
            Plugin: 0,
            PluginArray: 0,
            SVGLengthList: 0,
            SVGNumberList: 0,
            SVGPathSegList: 0,
            SVGPointList: 0,
            SVGStringList: 0,
            SVGTransformList: 0,
            SourceBufferList: 0,
            StyleSheetList: 0,
            TextTrackCueList: 0,
            TextTrackList: 0,
            TouchList: 0
        }
    }, {}],
    264: [function (e, t, i) {
        var s = e("../internals/engine-user-agent");
        t.exports = /(iphone|ipod|ipad).*applewebkit/i.test(s)
    }, {"../internals/engine-user-agent": 265}],
    265: [function (e, t, i) {
        var s = e("../internals/get-built-in");
        t.exports = s("navigator", "userAgent") || ""
    }, {"../internals/get-built-in": 273}],
    266: [function (e, t, i) {
        var s, n, o = e("../internals/global"), r = e("../internals/engine-user-agent"), a = o.process,
            l = a && a.versions, c = l && l.v8;
        c ? n = (s = c.split("."))[0] + s[1] : r && (!(s = r.match(/Edge\/(\d+)/)) || s[1] >= 74) && (s = r.match(/Chrome\/(\d+)/)) && (n = s[1]), t.exports = n && +n
    }, {"../internals/engine-user-agent": 265, "../internals/global": 275}],
    267: [function (e, t, i) {
        t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
    }, {}],
    268: [function (e, t, i) {
        var s = e("../internals/global"), n = e("../internals/object-get-own-property-descriptor").f,
            o = e("../internals/create-non-enumerable-property"), r = e("../internals/redefine"),
            a = e("../internals/set-global"), l = e("../internals/copy-constructor-properties"),
            c = e("../internals/is-forced");
        t.exports = function (e, t) {
            var i, h, u, d, p, m = e.target, f = e.global, g = e.stat;
            if (i = f ? s : g ? s[m] || a(m, {}) : (s[m] || {}).prototype) for (h in t) {
                if (d = t[h], u = e.noTargetGet ? (p = n(i, h)) && p.value : i[h], !c(f ? h : m + (g ? "." : "#") + h, e.forced) && void 0 !== u) {
                    if (typeof d == typeof u) continue;
                    l(d, u)
                }
                (e.sham || u && u.sham) && o(d, "sham", !0), r(i, h, d, e)
            }
        }
    }, {
        "../internals/copy-constructor-properties": 254,
        "../internals/create-non-enumerable-property": 258,
        "../internals/global": 275,
        "../internals/is-forced": 286,
        "../internals/object-get-own-property-descriptor": 303,
        "../internals/redefine": 316,
        "../internals/set-global": 322
    }],
    269: [function (e, t, i) {
        t.exports = function (e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        }
    }, {}],
    270: [function (e, t, i) {
        "use strict";
        e("../modules/es.regexp.exec");
        var s = e("../internals/redefine"), n = e("../internals/fails"), o = e("../internals/well-known-symbol"),
            r = e("../internals/regexp-exec"), a = e("../internals/create-non-enumerable-property"), l = o("species"),
            c = !n((function () {
                var e = /./;
                return e.exec = function () {
                    var e = [];
                    return e.groups = {a: "7"}, e
                }, "7" !== "".replace(e, "$<a>")
            })), h = "$0" === "a".replace(/./, "$0"), u = o("replace"), d = !!/./[u] && "" === /./[u]("a", "$0"),
            p = !n((function () {
                var e = /(?:)/, t = e.exec;
                e.exec = function () {
                    return t.apply(this, arguments)
                };
                var i = "ab".split(e);
                return 2 !== i.length || "a" !== i[0] || "b" !== i[1]
            }));
        t.exports = function (e, t, i, u) {
            var m = o(e), f = !n((function () {
                var t = {};
                return t[m] = function () {
                    return 7
                }, 7 != ""[e](t)
            })), g = f && !n((function () {
                var t = !1, i = /a/;
                return "split" === e && ((i = {}).constructor = {}, i.constructor[l] = function () {
                    return i
                }, i.flags = "", i[m] = /./[m]), i.exec = function () {
                    return t = !0, null
                }, i[m](""), !t
            }));
            if (!f || !g || "replace" === e && (!c || !h || d) || "split" === e && !p) {
                var b = /./[m], y = i(m, ""[e], (function (e, t, i, s, n) {
                    return t.exec === r ? f && !n ? {done: !0, value: b.call(t, i, s)} : {
                        done: !0,
                        value: e.call(i, t, s)
                    } : {done: !1}
                }), {REPLACE_KEEPS_$0: h, REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: d}), S = y[0], w = y[1];
                s(String.prototype, e, S), s(RegExp.prototype, m, 2 == t ? function (e, t) {
                    return w.call(e, this, t)
                } : function (e) {
                    return w.call(e, this)
                })
            }
            u && a(RegExp.prototype[m], "sham", !0)
        }
    }, {
        "../internals/create-non-enumerable-property": 258,
        "../internals/fails": 269,
        "../internals/redefine": 316,
        "../internals/regexp-exec": 318,
        "../internals/well-known-symbol": 342,
        "../modules/es.regexp.exec": 350
    }],
    271: [function (e, t, i) {
        "use strict";
        var s = e("../internals/is-array"), n = e("../internals/to-length"),
            o = e("../internals/function-bind-context"), r = function (e, t, i, a, l, c, h, u) {
                for (var d, p = l, m = 0, f = !!h && o(h, u, 3); m < a;) {
                    if (m in i) {
                        if (d = f ? f(i[m], m, t) : i[m], c > 0 && s(d)) p = r(e, t, d, n(d.length), p, c - 1) - 1; else {
                            if (p >= 9007199254740991) throw TypeError("Exceed the acceptable array length");
                            e[p] = d
                        }
                        p++
                    }
                    m++
                }
                return p
            };
        t.exports = r
    }, {"../internals/function-bind-context": 272, "../internals/is-array": 285, "../internals/to-length": 336}],
    272: [function (e, t, i) {
        var s = e("../internals/a-function");
        t.exports = function (e, t, i) {
            if (s(e), void 0 === t) return e;
            switch (i) {
                case 0:
                    return function () {
                        return e.call(t)
                    };
                case 1:
                    return function (i) {
                        return e.call(t, i)
                    };
                case 2:
                    return function (i, s) {
                        return e.call(t, i, s)
                    };
                case 3:
                    return function (i, s, n) {
                        return e.call(t, i, s, n)
                    }
            }
            return function () {
                return e.apply(t, arguments)
            }
        }
    }, {"../internals/a-function": 241}],
    273: [function (e, t, i) {
        var s = e("../internals/path"), n = e("../internals/global"), o = function (e) {
            return "function" == typeof e ? e : void 0
        };
        t.exports = function (e, t) {
            return arguments.length < 2 ? o(s[e]) || o(n[e]) : s[e] && s[e][t] || n[e] && n[e][t]
        }
    }, {"../internals/global": 275, "../internals/path": 312}],
    274: [function (e, t, i) {
        var s = e("../internals/classof"), n = e("../internals/iterators"),
            o = e("../internals/well-known-symbol")("iterator");
        t.exports = function (e) {
            if (null != e) return e[o] || e["@@iterator"] || n[s(e)]
        }
    }, {"../internals/classof": 253, "../internals/iterators": 292, "../internals/well-known-symbol": 342}],
    275: [function (e, t, i) {
        (function (e) {
            var i = function (e) {
                return e && e.Math == Math && e
            };
            t.exports = i("object" == typeof globalThis && globalThis) || i("object" == typeof window && window) || i("object" == typeof self && self) || i("object" == typeof e && e) || Function("return this")()
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    276: [function (e, t, i) {
        var s = {}.hasOwnProperty;
        t.exports = function (e, t) {
            return s.call(e, t)
        }
    }, {}],
    277: [function (e, t, i) {
        t.exports = {}
    }, {}],
    278: [function (e, t, i) {
        var s = e("../internals/global");
        t.exports = function (e, t) {
            var i = s.console;
            i && i.error && (1 === arguments.length ? i.error(e) : i.error(e, t))
        }
    }, {"../internals/global": 275}],
    279: [function (e, t, i) {
        var s = e("../internals/get-built-in");
        t.exports = s("document", "documentElement")
    }, {"../internals/get-built-in": 273}],
    280: [function (e, t, i) {
        var s = e("../internals/descriptors"), n = e("../internals/fails"),
            o = e("../internals/document-create-element");
        t.exports = !s && !n((function () {
            return 7 != Object.defineProperty(o("div"), "a", {
                get: function () {
                    return 7
                }
            }).a
        }))
    }, {"../internals/descriptors": 261, "../internals/document-create-element": 262, "../internals/fails": 269}],
    281: [function (e, t, i) {
        var s = e("../internals/fails"), n = e("../internals/classof-raw"), o = "".split;
        t.exports = s((function () {
            return !Object("z").propertyIsEnumerable(0)
        })) ? function (e) {
            return "String" == n(e) ? o.call(e, "") : Object(e)
        } : Object
    }, {"../internals/classof-raw": 252, "../internals/fails": 269}],
    282: [function (e, t, i) {
        var s = e("../internals/shared-store"), n = Function.toString;
        "function" != typeof s.inspectSource && (s.inspectSource = function (e) {
            return n.call(e)
        }), t.exports = s.inspectSource
    }, {"../internals/shared-store": 326}],
    283: [function (e, t, i) {
        var s, n, o, r = e("../internals/native-weak-map"), a = e("../internals/global"),
            l = e("../internals/is-object"), c = e("../internals/create-non-enumerable-property"),
            h = e("../internals/has"), u = e("../internals/shared-key"), d = e("../internals/hidden-keys"),
            p = a.WeakMap;
        if (r) {
            var m = new p, f = m.get, g = m.has, b = m.set;
            s = function (e, t) {
                return b.call(m, e, t), t
            }, n = function (e) {
                return f.call(m, e) || {}
            }, o = function (e) {
                return g.call(m, e)
            }
        } else {
            var y = u("state");
            d[y] = !0, s = function (e, t) {
                return c(e, y, t), t
            }, n = function (e) {
                return h(e, y) ? e[y] : {}
            }, o = function (e) {
                return h(e, y)
            }
        }
        t.exports = {
            set: s, get: n, has: o, enforce: function (e) {
                return o(e) ? n(e) : s(e, {})
            }, getterFor: function (e) {
                return function (t) {
                    var i;
                    if (!l(t) || (i = n(t)).type !== e) throw TypeError("Incompatible receiver, " + e + " required");
                    return i
                }
            }
        }
    }, {
        "../internals/create-non-enumerable-property": 258,
        "../internals/global": 275,
        "../internals/has": 276,
        "../internals/hidden-keys": 277,
        "../internals/is-object": 287,
        "../internals/native-weak-map": 296,
        "../internals/shared-key": 325
    }],
    284: [function (e, t, i) {
        var s = e("../internals/well-known-symbol"), n = e("../internals/iterators"), o = s("iterator"),
            r = Array.prototype;
        t.exports = function (e) {
            return void 0 !== e && (n.Array === e || r[o] === e)
        }
    }, {"../internals/iterators": 292, "../internals/well-known-symbol": 342}],
    285: [function (e, t, i) {
        var s = e("../internals/classof-raw");
        t.exports = Array.isArray || function (e) {
            return "Array" == s(e)
        }
    }, {"../internals/classof-raw": 252}],
    286: [function (e, t, i) {
        var s = e("../internals/fails"), n = /#|\.prototype\./, o = function (e, t) {
            var i = a[r(e)];
            return i == c || i != l && ("function" == typeof t ? s(t) : !!t)
        }, r = o.normalize = function (e) {
            return String(e).replace(n, ".").toLowerCase()
        }, a = o.data = {}, l = o.NATIVE = "N", c = o.POLYFILL = "P";
        t.exports = o
    }, {"../internals/fails": 269}],
    287: [function (e, t, i) {
        t.exports = function (e) {
            return "object" == typeof e ? null !== e : "function" == typeof e
        }
    }, {}],
    288: [function (e, t, i) {
        t.exports = !1
    }, {}],
    289: [function (e, t, i) {
        var s = e("../internals/is-object"), n = e("../internals/classof-raw"),
            o = e("../internals/well-known-symbol")("match");
        t.exports = function (e) {
            var t;
            return s(e) && (void 0 !== (t = e[o]) ? !!t : "RegExp" == n(e))
        }
    }, {"../internals/classof-raw": 252, "../internals/is-object": 287, "../internals/well-known-symbol": 342}],
    290: [function (e, t, i) {
        var s = e("../internals/an-object"), n = e("../internals/is-array-iterator-method"),
            o = e("../internals/to-length"), r = e("../internals/function-bind-context"),
            a = e("../internals/get-iterator-method"), l = e("../internals/call-with-safe-iteration-closing"),
            c = function (e, t) {
                this.stopped = e, this.result = t
            };
        (t.exports = function (e, t, i, h, u) {
            var d, p, m, f, g, b, y, S = r(t, i, h ? 2 : 1);
            if (u) d = e; else {
                if ("function" != typeof (p = a(e))) throw TypeError("Target is not iterable");
                if (n(p)) {
                    for (m = 0, f = o(e.length); f > m; m++) if ((g = h ? S(s(y = e[m])[0], y[1]) : S(e[m])) && g instanceof c) return g;
                    return new c(!1)
                }
                d = p.call(e)
            }
            for (b = d.next; !(y = b.call(d)).done;) if ("object" == typeof (g = l(d, S, y.value, h)) && g && g instanceof c) return g;
            return new c(!1)
        }).stop = function (e) {
            return new c(!0, e)
        }
    }, {
        "../internals/an-object": 246,
        "../internals/call-with-safe-iteration-closing": 250,
        "../internals/function-bind-context": 272,
        "../internals/get-iterator-method": 274,
        "../internals/is-array-iterator-method": 284,
        "../internals/to-length": 336
    }],
    291: [function (e, t, i) {
        "use strict";
        var s, n, o, r = e("../internals/object-get-prototype-of"),
            a = e("../internals/create-non-enumerable-property"), l = e("../internals/has"),
            c = e("../internals/well-known-symbol"), h = e("../internals/is-pure"), u = c("iterator"), d = !1;
        [].keys && ("next" in (o = [].keys()) ? (n = r(r(o))) !== Object.prototype && (s = n) : d = !0), null == s && (s = {}), h || l(s, u) || a(s, u, (function () {
            return this
        })), t.exports = {IteratorPrototype: s, BUGGY_SAFARI_ITERATORS: d}
    }, {
        "../internals/create-non-enumerable-property": 258,
        "../internals/has": 276,
        "../internals/is-pure": 288,
        "../internals/object-get-prototype-of": 306,
        "../internals/well-known-symbol": 342
    }],
    292: [function (e, t, i) {
        arguments[4][277][0].apply(i, arguments)
    }, {dup: 277}],
    293: [function (e, t, i) {
        var s, n, o, r, a, l, c, h, u = e("../internals/global"),
            d = e("../internals/object-get-own-property-descriptor").f, p = e("../internals/classof-raw"),
            m = e("../internals/task").set, f = e("../internals/engine-is-ios"),
            g = u.MutationObserver || u.WebKitMutationObserver, b = u.process, y = u.Promise, S = "process" == p(b),
            w = d(u, "queueMicrotask"), v = w && w.value;
        v || (s = function () {
            var e, t;
            for (S && (e = b.domain) && e.exit(); n;) {
                t = n.fn, n = n.next;
                try {
                    t()
                } catch (e) {
                    throw n ? r() : o = void 0, e
                }
            }
            o = void 0, e && e.enter()
        }, S ? r = function () {
            b.nextTick(s)
        } : g && !f ? (a = !0, l = document.createTextNode(""), new g(s).observe(l, {characterData: !0}), r = function () {
            l.data = a = !a
        }) : y && y.resolve ? (c = y.resolve(void 0), h = c.then, r = function () {
            h.call(c, s)
        }) : r = function () {
            m.call(u, s)
        }), t.exports = v || function (e) {
            var t = {fn: e, next: void 0};
            o && (o.next = t), n || (n = t, r()), o = t
        }
    }, {
        "../internals/classof-raw": 252,
        "../internals/engine-is-ios": 264,
        "../internals/global": 275,
        "../internals/object-get-own-property-descriptor": 303,
        "../internals/task": 331
    }],
    294: [function (e, t, i) {
        var s = e("../internals/global");
        t.exports = s.Promise
    }, {"../internals/global": 275}],
    295: [function (e, t, i) {
        var s = e("../internals/fails");
        t.exports = !!Object.getOwnPropertySymbols && !s((function () {
            return !String(Symbol())
        }))
    }, {"../internals/fails": 269}],
    296: [function (e, t, i) {
        var s = e("../internals/global"), n = e("../internals/inspect-source"), o = s.WeakMap;
        t.exports = "function" == typeof o && /native code/.test(n(o))
    }, {"../internals/global": 275, "../internals/inspect-source": 282}],
    297: [function (e, t, i) {
        "use strict";
        var s = e("../internals/a-function"), n = function (e) {
            var t, i;
            this.promise = new e((function (e, s) {
                if (void 0 !== t || void 0 !== i) throw TypeError("Bad Promise constructor");
                t = e, i = s
            })), this.resolve = s(t), this.reject = s(i)
        };
        t.exports.f = function (e) {
            return new n(e)
        }
    }, {"../internals/a-function": 241}],
    298: [function (e, t, i) {
        var s = e("../internals/is-regexp");
        t.exports = function (e) {
            if (s(e)) throw TypeError("The method doesn't accept regular expressions");
            return e
        }
    }, {"../internals/is-regexp": 289}],
    299: [function (e, t, i) {
        "use strict";
        var s = e("../internals/descriptors"), n = e("../internals/fails"), o = e("../internals/object-keys"),
            r = e("../internals/object-get-own-property-symbols"), a = e("../internals/object-property-is-enumerable"),
            l = e("../internals/to-object"), c = e("../internals/indexed-object"), h = Object.assign,
            u = Object.defineProperty;
        t.exports = !h || n((function () {
            if (s && 1 !== h({b: 1}, h(u({}, "a", {
                enumerable: !0, get: function () {
                    u(this, "b", {value: 3, enumerable: !1})
                }
            }), {b: 2})).b) return !0;
            var e = {}, t = {}, i = Symbol();
            return e[i] = 7, "abcdefghijklmnopqrst".split("").forEach((function (e) {
                t[e] = e
            })), 7 != h({}, e)[i] || "abcdefghijklmnopqrst" != o(h({}, t)).join("")
        })) ? function (e, t) {
            for (var i = l(e), n = arguments.length, h = 1, u = r.f, d = a.f; n > h;) for (var p, m = c(arguments[h++]), f = u ? o(m).concat(u(m)) : o(m), g = f.length, b = 0; g > b;) p = f[b++], s && !d.call(m, p) || (i[p] = m[p]);
            return i
        } : h
    }, {
        "../internals/descriptors": 261,
        "../internals/fails": 269,
        "../internals/indexed-object": 281,
        "../internals/object-get-own-property-symbols": 305,
        "../internals/object-keys": 308,
        "../internals/object-property-is-enumerable": 309,
        "../internals/to-object": 337
    }],
    300: [function (e, t, i) {
        var s, n = e("../internals/an-object"), o = e("../internals/object-define-properties"),
            r = e("../internals/enum-bug-keys"), a = e("../internals/hidden-keys"), l = e("../internals/html"),
            c = e("../internals/document-create-element"), h = e("../internals/shared-key"), u = h("IE_PROTO"),
            d = function () {
            }, p = function (e) {
                return "<script>" + e + "<\/script>"
            }, m = function () {
                try {
                    s = document.domain && new ActiveXObject("htmlfile")
                } catch (e) {
                }
                var e, t;
                m = s ? function (e) {
                    e.write(p("")), e.close();
                    var t = e.parentWindow.Object;
                    return e = null, t
                }(s) : ((t = c("iframe")).style.display = "none", l.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(p("document.F=Object")), e.close(), e.F);
                for (var i = r.length; i--;) delete m.prototype[r[i]];
                return m()
            };
        a[u] = !0, t.exports = Object.create || function (e, t) {
            var i;
            return null !== e ? (d.prototype = n(e), i = new d, d.prototype = null, i[u] = e) : i = m(), void 0 === t ? i : o(i, t)
        }
    }, {
        "../internals/an-object": 246,
        "../internals/document-create-element": 262,
        "../internals/enum-bug-keys": 267,
        "../internals/hidden-keys": 277,
        "../internals/html": 279,
        "../internals/object-define-properties": 301,
        "../internals/shared-key": 325
    }],
    301: [function (e, t, i) {
        var s = e("../internals/descriptors"), n = e("../internals/object-define-property"),
            o = e("../internals/an-object"), r = e("../internals/object-keys");
        t.exports = s ? Object.defineProperties : function (e, t) {
            o(e);
            for (var i, s = r(t), a = s.length, l = 0; a > l;) n.f(e, i = s[l++], t[i]);
            return e
        }
    }, {
        "../internals/an-object": 246,
        "../internals/descriptors": 261,
        "../internals/object-define-property": 302,
        "../internals/object-keys": 308
    }],
    302: [function (e, t, i) {
        var s = e("../internals/descriptors"), n = e("../internals/ie8-dom-define"), o = e("../internals/an-object"),
            r = e("../internals/to-primitive"), a = Object.defineProperty;
        i.f = s ? a : function (e, t, i) {
            if (o(e), t = r(t, !0), o(i), n) try {
                return a(e, t, i)
            } catch (e) {
            }
            if ("get" in i || "set" in i) throw TypeError("Accessors not supported");
            return "value" in i && (e[t] = i.value), e
        }
    }, {
        "../internals/an-object": 246,
        "../internals/descriptors": 261,
        "../internals/ie8-dom-define": 280,
        "../internals/to-primitive": 338
    }],
    303: [function (e, t, i) {
        var s = e("../internals/descriptors"), n = e("../internals/object-property-is-enumerable"),
            o = e("../internals/create-property-descriptor"), r = e("../internals/to-indexed-object"),
            a = e("../internals/to-primitive"), l = e("../internals/has"), c = e("../internals/ie8-dom-define"),
            h = Object.getOwnPropertyDescriptor;
        i.f = s ? h : function (e, t) {
            if (e = r(e), t = a(t, !0), c) try {
                return h(e, t)
            } catch (e) {
            }
            if (l(e, t)) return o(!n.f.call(e, t), e[t])
        }
    }, {
        "../internals/create-property-descriptor": 259,
        "../internals/descriptors": 261,
        "../internals/has": 276,
        "../internals/ie8-dom-define": 280,
        "../internals/object-property-is-enumerable": 309,
        "../internals/to-indexed-object": 334,
        "../internals/to-primitive": 338
    }],
    304: [function (e, t, i) {
        var s = e("../internals/object-keys-internal"),
            n = e("../internals/enum-bug-keys").concat("length", "prototype");
        i.f = Object.getOwnPropertyNames || function (e) {
            return s(e, n)
        }
    }, {"../internals/enum-bug-keys": 267, "../internals/object-keys-internal": 307}],
    305: [function (e, t, i) {
        i.f = Object.getOwnPropertySymbols
    }, {}],
    306: [function (e, t, i) {
        var s = e("../internals/has"), n = e("../internals/to-object"), o = e("../internals/shared-key"),
            r = e("../internals/correct-prototype-getter"), a = o("IE_PROTO"), l = Object.prototype;
        t.exports = r ? Object.getPrototypeOf : function (e) {
            return e = n(e), s(e, a) ? e[a] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? l : null
        }
    }, {
        "../internals/correct-prototype-getter": 256,
        "../internals/has": 276,
        "../internals/shared-key": 325,
        "../internals/to-object": 337
    }],
    307: [function (e, t, i) {
        var s = e("../internals/has"), n = e("../internals/to-indexed-object"),
            o = e("../internals/array-includes").indexOf, r = e("../internals/hidden-keys");
        t.exports = function (e, t) {
            var i, a = n(e), l = 0, c = [];
            for (i in a) !s(r, i) && s(a, i) && c.push(i);
            for (; t.length > l;) s(a, i = t[l++]) && (~o(c, i) || c.push(i));
            return c
        }
    }, {
        "../internals/array-includes": 247,
        "../internals/has": 276,
        "../internals/hidden-keys": 277,
        "../internals/to-indexed-object": 334
    }],
    308: [function (e, t, i) {
        var s = e("../internals/object-keys-internal"), n = e("../internals/enum-bug-keys");
        t.exports = Object.keys || function (e) {
            return s(e, n)
        }
    }, {"../internals/enum-bug-keys": 267, "../internals/object-keys-internal": 307}],
    309: [function (e, t, i) {
        "use strict";
        var s = {}.propertyIsEnumerable, n = Object.getOwnPropertyDescriptor, o = n && !s.call({1: 2}, 1);
        i.f = o ? function (e) {
            var t = n(this, e);
            return !!t && t.enumerable
        } : s
    }, {}],
    310: [function (e, t, i) {
        var s = e("../internals/an-object"), n = e("../internals/a-possible-prototype");
        t.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {
            var e, t = !1, i = {};
            try {
                (e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(i, []), t = i instanceof Array
            } catch (e) {
            }
            return function (i, o) {
                return s(i), n(o), t ? e.call(i, o) : i.__proto__ = o, i
            }
        }() : void 0)
    }, {"../internals/a-possible-prototype": 242, "../internals/an-object": 246}],
    311: [function (e, t, i) {
        var s = e("../internals/get-built-in"), n = e("../internals/object-get-own-property-names"),
            o = e("../internals/object-get-own-property-symbols"), r = e("../internals/an-object");
        t.exports = s("Reflect", "ownKeys") || function (e) {
            var t = n.f(r(e)), i = o.f;
            return i ? t.concat(i(e)) : t
        }
    }, {
        "../internals/an-object": 246,
        "../internals/get-built-in": 273,
        "../internals/object-get-own-property-names": 304,
        "../internals/object-get-own-property-symbols": 305
    }],
    312: [function (e, t, i) {
        var s = e("../internals/global");
        t.exports = s
    }, {"../internals/global": 275}],
    313: [function (e, t, i) {
        t.exports = function (e) {
            try {
                return {error: !1, value: e()}
            } catch (e) {
                return {error: !0, value: e}
            }
        }
    }, {}],
    314: [function (e, t, i) {
        var s = e("../internals/an-object"), n = e("../internals/is-object"),
            o = e("../internals/new-promise-capability");
        t.exports = function (e, t) {
            if (s(e), n(t) && t.constructor === e) return t;
            var i = o.f(e);
            return (0, i.resolve)(t), i.promise
        }
    }, {"../internals/an-object": 246, "../internals/is-object": 287, "../internals/new-promise-capability": 297}],
    315: [function (e, t, i) {
        var s = e("../internals/redefine");
        t.exports = function (e, t, i) {
            for (var n in t) s(e, n, t[n], i);
            return e
        }
    }, {"../internals/redefine": 316}],
    316: [function (e, t, i) {
        var s = e("../internals/global"), n = e("../internals/create-non-enumerable-property"),
            o = e("../internals/has"), r = e("../internals/set-global"), a = e("../internals/inspect-source"),
            l = e("../internals/internal-state"), c = l.get, h = l.enforce, u = String(String).split("String");
        (t.exports = function (e, t, i, a) {
            var l = !!a && !!a.unsafe, c = !!a && !!a.enumerable, d = !!a && !!a.noTargetGet;
            "function" == typeof i && ("string" != typeof t || o(i, "name") || n(i, "name", t), h(i).source = u.join("string" == typeof t ? t : "")), e !== s ? (l ? !d && e[t] && (c = !0) : delete e[t], c ? e[t] = i : n(e, t, i)) : c ? e[t] = i : r(t, i)
        })(Function.prototype, "toString", (function () {
            return "function" == typeof this && c(this).source || a(this)
        }))
    }, {
        "../internals/create-non-enumerable-property": 258,
        "../internals/global": 275,
        "../internals/has": 276,
        "../internals/inspect-source": 282,
        "../internals/internal-state": 283,
        "../internals/set-global": 322
    }],
    317: [function (e, t, i) {
        var s = e("./classof-raw"), n = e("./regexp-exec");
        t.exports = function (e, t) {
            var i = e.exec;
            if ("function" == typeof i) {
                var o = i.call(e, t);
                if ("object" != typeof o) throw TypeError("RegExp exec method returned something other than an Object or null");
                return o
            }
            if ("RegExp" !== s(e)) throw TypeError("RegExp#exec called on incompatible receiver");
            return n.call(e, t)
        }
    }, {"./classof-raw": 252, "./regexp-exec": 318}],
    318: [function (e, t, i) {
        "use strict";
        var s, n, o = e("./regexp-flags"), r = e("./regexp-sticky-helpers"), a = RegExp.prototype.exec,
            l = String.prototype.replace, c = a,
            h = (s = /a/, n = /b*/g, a.call(s, "a"), a.call(n, "a"), 0 !== s.lastIndex || 0 !== n.lastIndex),
            u = r.UNSUPPORTED_Y || r.BROKEN_CARET, d = void 0 !== /()??/.exec("")[1];
        (h || d || u) && (c = function (e) {
            var t, i, s, n, r = this, c = u && r.sticky, p = o.call(r), m = r.source, f = 0, g = e;
            return c && (-1 === (p = p.replace("y", "")).indexOf("g") && (p += "g"), g = String(e).slice(r.lastIndex), r.lastIndex > 0 && (!r.multiline || r.multiline && "\n" !== e[r.lastIndex - 1]) && (m = "(?: " + m + ")", g = " " + g, f++), i = new RegExp("^(?:" + m + ")", p)), d && (i = new RegExp("^" + m + "$(?!\\s)", p)), h && (t = r.lastIndex), s = a.call(c ? i : r, g), c ? s ? (s.input = s.input.slice(f), s[0] = s[0].slice(f), s.index = r.lastIndex, r.lastIndex += s[0].length) : r.lastIndex = 0 : h && s && (r.lastIndex = r.global ? s.index + s[0].length : t), d && s && s.length > 1 && l.call(s[0], i, (function () {
                for (n = 1; n < arguments.length - 2; n++) void 0 === arguments[n] && (s[n] = void 0)
            })), s
        }), t.exports = c
    }, {"./regexp-flags": 319, "./regexp-sticky-helpers": 320}],
    319: [function (e, t, i) {
        "use strict";
        var s = e("../internals/an-object");
        t.exports = function () {
            var e = s(this), t = "";
            return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.dotAll && (t += "s"), e.unicode && (t += "u"), e.sticky && (t += "y"), t
        }
    }, {"../internals/an-object": 246}],
    320: [function (e, t, i) {
        "use strict";
        var s = e("./fails");

        function n(e, t) {
            return RegExp(e, t)
        }

        i.UNSUPPORTED_Y = s((function () {
            var e = n("a", "y");
            return e.lastIndex = 2, null != e.exec("abcd")
        })), i.BROKEN_CARET = s((function () {
            var e = n("^r", "gy");
            return e.lastIndex = 2, null != e.exec("str")
        }))
    }, {"./fails": 269}],
    321: [function (e, t, i) {
        t.exports = function (e) {
            if (null == e) throw TypeError("Can't call method on " + e);
            return e
        }
    }, {}],
    322: [function (e, t, i) {
        var s = e("../internals/global"), n = e("../internals/create-non-enumerable-property");
        t.exports = function (e, t) {
            try {
                n(s, e, t)
            } catch (i) {
                s[e] = t
            }
            return t
        }
    }, {"../internals/create-non-enumerable-property": 258, "../internals/global": 275}],
    323: [function (e, t, i) {
        "use strict";
        var s = e("../internals/get-built-in"), n = e("../internals/object-define-property"),
            o = e("../internals/well-known-symbol"), r = e("../internals/descriptors"), a = o("species");
        t.exports = function (e) {
            var t = s(e), i = n.f;
            r && t && !t[a] && i(t, a, {
                configurable: !0, get: function () {
                    return this
                }
            })
        }
    }, {
        "../internals/descriptors": 261,
        "../internals/get-built-in": 273,
        "../internals/object-define-property": 302,
        "../internals/well-known-symbol": 342
    }],
    324: [function (e, t, i) {
        var s = e("../internals/object-define-property").f, n = e("../internals/has"),
            o = e("../internals/well-known-symbol")("toStringTag");
        t.exports = function (e, t, i) {
            e && !n(e = i ? e : e.prototype, o) && s(e, o, {configurable: !0, value: t})
        }
    }, {"../internals/has": 276, "../internals/object-define-property": 302, "../internals/well-known-symbol": 342}],
    325: [function (e, t, i) {
        var s = e("../internals/shared"), n = e("../internals/uid"), o = s("keys");
        t.exports = function (e) {
            return o[e] || (o[e] = n(e))
        }
    }, {"../internals/shared": 327, "../internals/uid": 340}],
    326: [function (e, t, i) {
        var s = e("../internals/global"), n = e("../internals/set-global"),
            o = s["__core-js_shared__"] || n("__core-js_shared__", {});
        t.exports = o
    }, {"../internals/global": 275, "../internals/set-global": 322}],
    327: [function (e, t, i) {
        var s = e("../internals/is-pure"), n = e("../internals/shared-store");
        (t.exports = function (e, t) {
            return n[e] || (n[e] = void 0 !== t ? t : {})
        })("versions", []).push({
            version: "3.6.5",
            mode: s ? "pure" : "global",
            copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
        })
    }, {"../internals/is-pure": 288, "../internals/shared-store": 326}],
    328: [function (e, t, i) {
        var s = e("../internals/an-object"), n = e("../internals/a-function"),
            o = e("../internals/well-known-symbol")("species");
        t.exports = function (e, t) {
            var i, r = s(e).constructor;
            return void 0 === r || null == (i = s(r)[o]) ? t : n(i)
        }
    }, {"../internals/a-function": 241, "../internals/an-object": 246, "../internals/well-known-symbol": 342}],
    329: [function (e, t, i) {
        var s = e("../internals/to-integer"), n = e("../internals/require-object-coercible"), o = function (e) {
            return function (t, i) {
                var o, r, a = String(n(t)), l = s(i), c = a.length;
                return l < 0 || l >= c ? e ? "" : void 0 : (o = a.charCodeAt(l)) < 55296 || o > 56319 || l + 1 === c || (r = a.charCodeAt(l + 1)) < 56320 || r > 57343 ? e ? a.charAt(l) : o : e ? a.slice(l, l + 2) : r - 56320 + (o - 55296 << 10) + 65536
            }
        };
        t.exports = {codeAt: o(!1), charAt: o(!0)}
    }, {"../internals/require-object-coercible": 321, "../internals/to-integer": 335}],
    330: [function (e, t, i) {
        "use strict";
        var s = e("../internals/to-integer"), n = e("../internals/require-object-coercible");
        t.exports = "".repeat || function (e) {
            var t = String(n(this)), i = "", o = s(e);
            if (o < 0 || o == 1 / 0) throw RangeError("Wrong number of repetitions");
            for (; o > 0; (o >>>= 1) && (t += t)) 1 & o && (i += t);
            return i
        }
    }, {"../internals/require-object-coercible": 321, "../internals/to-integer": 335}],
    331: [function (e, t, i) {
        var s, n, o, r = e("../internals/global"), a = e("../internals/fails"), l = e("../internals/classof-raw"),
            c = e("../internals/function-bind-context"), h = e("../internals/html"),
            u = e("../internals/document-create-element"), d = e("../internals/engine-is-ios"), p = r.location,
            m = r.setImmediate, f = r.clearImmediate, g = r.process, b = r.MessageChannel, y = r.Dispatch, S = 0,
            w = {}, v = function (e) {
                if (w.hasOwnProperty(e)) {
                    var t = w[e];
                    delete w[e], t()
                }
            }, _ = function (e) {
                return function () {
                    v(e)
                }
            }, x = function (e) {
                v(e.data)
            }, C = function (e) {
                r.postMessage(e + "", p.protocol + "//" + p.host)
            };
        m && f || (m = function (e) {
            for (var t = [], i = 1; arguments.length > i;) t.push(arguments[i++]);
            return w[++S] = function () {
                ("function" == typeof e ? e : Function(e)).apply(void 0, t)
            }, s(S), S
        }, f = function (e) {
            delete w[e]
        }, "process" == l(g) ? s = function (e) {
            g.nextTick(_(e))
        } : y && y.now ? s = function (e) {
            y.now(_(e))
        } : b && !d ? (o = (n = new b).port2, n.port1.onmessage = x, s = c(o.postMessage, o, 1)) : !r.addEventListener || "function" != typeof postMessage || r.importScripts || a(C) || "file:" === p.protocol ? s = "onreadystatechange" in u("script") ? function (e) {
            h.appendChild(u("script")).onreadystatechange = function () {
                h.removeChild(this), v(e)
            }
        } : function (e) {
            setTimeout(_(e), 0)
        } : (s = C, r.addEventListener("message", x, !1))), t.exports = {set: m, clear: f}
    }, {
        "../internals/classof-raw": 252,
        "../internals/document-create-element": 262,
        "../internals/engine-is-ios": 264,
        "../internals/fails": 269,
        "../internals/function-bind-context": 272,
        "../internals/global": 275,
        "../internals/html": 279
    }],
    332: [function (e, t, i) {
        var s = e("../internals/classof-raw");
        t.exports = function (e) {
            if ("number" != typeof e && "Number" != s(e)) throw TypeError("Incorrect invocation");
            return +e
        }
    }, {"../internals/classof-raw": 252}],
    333: [function (e, t, i) {
        var s = e("../internals/to-integer"), n = Math.max, o = Math.min;
        t.exports = function (e, t) {
            var i = s(e);
            return i < 0 ? n(i + t, 0) : o(i, t)
        }
    }, {"../internals/to-integer": 335}],
    334: [function (e, t, i) {
        var s = e("../internals/indexed-object"), n = e("../internals/require-object-coercible");
        t.exports = function (e) {
            return s(n(e))
        }
    }, {"../internals/indexed-object": 281, "../internals/require-object-coercible": 321}],
    335: [function (e, t, i) {
        var s = Math.ceil, n = Math.floor;
        t.exports = function (e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? n : s)(e)
        }
    }, {}],
    336: [function (e, t, i) {
        var s = e("../internals/to-integer"), n = Math.min;
        t.exports = function (e) {
            return e > 0 ? n(s(e), 9007199254740991) : 0
        }
    }, {"../internals/to-integer": 335}],
    337: [function (e, t, i) {
        var s = e("../internals/require-object-coercible");
        t.exports = function (e) {
            return Object(s(e))
        }
    }, {"../internals/require-object-coercible": 321}],
    338: [function (e, t, i) {
        var s = e("../internals/is-object");
        t.exports = function (e, t) {
            if (!s(e)) return e;
            var i, n;
            if (t && "function" == typeof (i = e.toString) && !s(n = i.call(e))) return n;
            if ("function" == typeof (i = e.valueOf) && !s(n = i.call(e))) return n;
            if (!t && "function" == typeof (i = e.toString) && !s(n = i.call(e))) return n;
            throw TypeError("Can't convert object to primitive value")
        }
    }, {"../internals/is-object": 287}],
    339: [function (e, t, i) {
        var s = {};
        s[e("../internals/well-known-symbol")("toStringTag")] = "z", t.exports = "[object z]" === String(s)
    }, {"../internals/well-known-symbol": 342}],
    340: [function (e, t, i) {
        var s = 0, n = Math.random();
        t.exports = function (e) {
            return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++s + n).toString(36)
        }
    }, {}],
    341: [function (e, t, i) {
        var s = e("../internals/native-symbol");
        t.exports = s && !Symbol.sham && "symbol" == typeof Symbol.iterator
    }, {"../internals/native-symbol": 295}],
    342: [function (e, t, i) {
        var s = e("../internals/global"), n = e("../internals/shared"), o = e("../internals/has"),
            r = e("../internals/uid"), a = e("../internals/native-symbol"), l = e("../internals/use-symbol-as-uid"),
            c = n("wks"), h = s.Symbol, u = l ? h : h && h.withoutSetter || r;
        t.exports = function (e) {
            return o(c, e) || (a && o(h, e) ? c[e] = h[e] : c[e] = u("Symbol." + e)), c[e]
        }
    }, {
        "../internals/global": 275,
        "../internals/has": 276,
        "../internals/native-symbol": 295,
        "../internals/shared": 327,
        "../internals/uid": 340,
        "../internals/use-symbol-as-uid": 341
    }],
    343: [function (e, t, i) {
        "use strict";
        var s = e("../internals/export"), n = e("../internals/flatten-into-array"), o = e("../internals/to-object"),
            r = e("../internals/to-length"), a = e("../internals/a-function"),
            l = e("../internals/array-species-create");
        s({target: "Array", proto: !0}, {
            flatMap: function (e) {
                var t, i = o(this), s = r(i.length);
                return a(e), (t = l(i, 0)).length = n(t, i, i, s, 0, 1, e, arguments.length > 1 ? arguments[1] : void 0), t
            }
        })
    }, {
        "../internals/a-function": 241,
        "../internals/array-species-create": 249,
        "../internals/export": 268,
        "../internals/flatten-into-array": 271,
        "../internals/to-length": 336,
        "../internals/to-object": 337
    }],
    344: [function (e, t, i) {
        "use strict";
        var s = e("../internals/to-indexed-object"), n = e("../internals/add-to-unscopables"),
            o = e("../internals/iterators"), r = e("../internals/internal-state"),
            a = e("../internals/define-iterator"), l = r.set, c = r.getterFor("Array Iterator");
        t.exports = a(Array, "Array", (function (e, t) {
            l(this, {type: "Array Iterator", target: s(e), index: 0, kind: t})
        }), (function () {
            var e = c(this), t = e.target, i = e.kind, s = e.index++;
            return !t || s >= t.length ? (e.target = void 0, {value: void 0, done: !0}) : "keys" == i ? {
                value: s,
                done: !1
            } : "values" == i ? {value: t[s], done: !1} : {value: [s, t[s]], done: !1}
        }), "values"), o.Arguments = o.Array, n("keys"), n("values"), n("entries")
    }, {
        "../internals/add-to-unscopables": 243,
        "../internals/define-iterator": 260,
        "../internals/internal-state": 283,
        "../internals/iterators": 292,
        "../internals/to-indexed-object": 334
    }],
    345: [function (e, t, i) {
        "use strict";
        var s = e("../internals/export"), n = e("../internals/a-function"), o = e("../internals/to-object"),
            r = e("../internals/fails"), a = e("../internals/array-method-is-strict"), l = [], c = l.sort,
            h = r((function () {
                l.sort(void 0)
            })), u = r((function () {
                l.sort(null)
            })), d = a("sort");
        s({target: "Array", proto: !0, forced: h || !u || !d}, {
            sort: function (e) {
                return void 0 === e ? c.call(o(this)) : c.call(o(this), n(e))
            }
        })
    }, {
        "../internals/a-function": 241,
        "../internals/array-method-is-strict": 248,
        "../internals/export": 268,
        "../internals/fails": 269,
        "../internals/to-object": 337
    }],
    346: [function (e, t, i) {
        e("../internals/add-to-unscopables")("flatMap")
    }, {"../internals/add-to-unscopables": 243}],
    347: [function (e, t, i) {
        "use strict";
        var s = e("../internals/export"), n = e("../internals/to-integer"), o = e("../internals/this-number-value"),
            r = e("../internals/string-repeat"), a = e("../internals/fails"), l = 1..toFixed, c = Math.floor,
            h = function (e, t, i) {
                return 0 === t ? i : t % 2 == 1 ? h(e, t - 1, i * e) : h(e * e, t / 2, i)
            };
        s({
            target: "Number",
            proto: !0,
            forced: l && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)) || !a((function () {
                l.call({})
            }))
        }, {
            toFixed: function (e) {
                var t, i, s, a, l = o(this), u = n(e), d = [0, 0, 0, 0, 0, 0], p = "", m = "0", f = function (e, t) {
                    for (var i = -1, s = t; ++i < 6;) s += e * d[i], d[i] = s % 1e7, s = c(s / 1e7)
                }, g = function (e) {
                    for (var t = 6, i = 0; --t >= 0;) i += d[t], d[t] = c(i / e), i = i % e * 1e7
                }, b = function () {
                    for (var e = 6, t = ""; --e >= 0;) if ("" !== t || 0 === e || 0 !== d[e]) {
                        var i = String(d[e]);
                        t = "" === t ? i : t + r.call("0", 7 - i.length) + i
                    }
                    return t
                };
                if (u < 0 || u > 20) throw RangeError("Incorrect fraction digits");
                if (l != l) return "NaN";
                if (l <= -1e21 || l >= 1e21) return String(l);
                if (l < 0 && (p = "-", l = -l), l > 1e-21) if (i = (t = function (e) {
                    for (var t = 0, i = e; i >= 4096;) t += 12, i /= 4096;
                    for (; i >= 2;) t += 1, i /= 2;
                    return t
                }(l * h(2, 69, 1)) - 69) < 0 ? l * h(2, -t, 1) : l / h(2, t, 1), i *= 4503599627370496, (t = 52 - t) > 0) {
                    for (f(0, i), s = u; s >= 7;) f(1e7, 0), s -= 7;
                    for (f(h(10, s, 1), 0), s = t - 1; s >= 23;) g(1 << 23), s -= 23;
                    g(1 << s), f(1, 1), g(2), m = b()
                } else f(0, i), f(1 << -t, 0), m = b() + r.call("0", u);
                return m = u > 0 ? p + ((a = m.length) <= u ? "0." + r.call("0", u - a) + m : m.slice(0, a - u) + "." + m.slice(a - u)) : p + m
            }
        })
    }, {
        "../internals/export": 268,
        "../internals/fails": 269,
        "../internals/string-repeat": 330,
        "../internals/this-number-value": 332,
        "../internals/to-integer": 335
    }],
    348: [function (e, t, i) {
        var s = e("../internals/export"), n = e("../internals/object-assign");
        s({target: "Object", stat: !0, forced: Object.assign !== n}, {assign: n})
    }, {"../internals/export": 268, "../internals/object-assign": 299}],
    349: [function (e, t, i) {
        "use strict";
        var s, n, o, r, a = e("../internals/export"), l = e("../internals/is-pure"), c = e("../internals/global"),
            h = e("../internals/get-built-in"), u = e("../internals/native-promise-constructor"),
            d = e("../internals/redefine"), p = e("../internals/redefine-all"), m = e("../internals/set-to-string-tag"),
            f = e("../internals/set-species"), g = e("../internals/is-object"), b = e("../internals/a-function"),
            y = e("../internals/an-instance"), S = e("../internals/classof-raw"), w = e("../internals/inspect-source"),
            v = e("../internals/iterate"), _ = e("../internals/check-correctness-of-iteration"),
            x = e("../internals/species-constructor"), C = e("../internals/task").set, P = e("../internals/microtask"),
            k = e("../internals/promise-resolve"), B = e("../internals/host-report-errors"),
            A = e("../internals/new-promise-capability"), M = e("../internals/perform"),
            I = e("../internals/internal-state"), R = e("../internals/is-forced"),
            j = e("../internals/well-known-symbol"), O = e("../internals/engine-v8-version"), L = j("species"),
            T = "Promise", E = I.get, V = I.set, H = I.getterFor(T), D = u, G = c.TypeError, F = c.document,
            W = c.process, z = h("fetch"), N = A.f, U = N, $ = "process" == S(W),
            q = !!(F && F.createEvent && c.dispatchEvent), X = R(T, (function () {
                if (!(w(D) !== String(D))) {
                    if (66 === O) return !0;
                    if (!$ && "function" != typeof PromiseRejectionEvent) return !0
                }
                if (l && !D.prototype.finally) return !0;
                if (O >= 51 && /native code/.test(D)) return !1;
                var e = D.resolve(1), t = function (e) {
                    e((function () {
                    }), (function () {
                    }))
                };
                return (e.constructor = {})[L] = t, !(e.then((function () {
                })) instanceof t)
            })), Q = X || !_((function (e) {
                D.all(e).catch((function () {
                }))
            })), Y = function (e) {
                var t;
                return !(!g(e) || "function" != typeof (t = e.then)) && t
            }, J = function (e, t, i) {
                if (!t.notified) {
                    t.notified = !0;
                    var s = t.reactions;
                    P((function () {
                        for (var n = t.value, o = 1 == t.state, r = 0; s.length > r;) {
                            var a, l, c, h = s[r++], u = o ? h.ok : h.fail, d = h.resolve, p = h.reject, m = h.domain;
                            try {
                                u ? (o || (2 === t.rejection && te(e, t), t.rejection = 1), !0 === u ? a = n : (m && m.enter(), a = u(n), m && (m.exit(), c = !0)), a === h.promise ? p(G("Promise-chain cycle")) : (l = Y(a)) ? l.call(a, d, p) : d(a)) : p(n)
                            } catch (e) {
                                m && !c && m.exit(), p(e)
                            }
                        }
                        t.reactions = [], t.notified = !1, i && !t.rejection && Z(e, t)
                    }))
                }
            }, K = function (e, t, i) {
                var s, n;
                q ? ((s = F.createEvent("Event")).promise = t, s.reason = i, s.initEvent(e, !1, !0), c.dispatchEvent(s)) : s = {
                    promise: t,
                    reason: i
                }, (n = c["on" + e]) ? n(s) : "unhandledrejection" === e && B("Unhandled promise rejection", i)
            }, Z = function (e, t) {
                C.call(c, (function () {
                    var i, s = t.value;
                    if (ee(t) && (i = M((function () {
                        $ ? W.emit("unhandledRejection", s, e) : K("unhandledrejection", e, s)
                    })), t.rejection = $ || ee(t) ? 2 : 1, i.error)) throw i.value
                }))
            }, ee = function (e) {
                return 1 !== e.rejection && !e.parent
            }, te = function (e, t) {
                C.call(c, (function () {
                    $ ? W.emit("rejectionHandled", e) : K("rejectionhandled", e, t.value)
                }))
            }, ie = function (e, t, i, s) {
                return function (n) {
                    e(t, i, n, s)
                }
            }, se = function (e, t, i, s) {
                t.done || (t.done = !0, s && (t = s), t.value = i, t.state = 2, J(e, t, !0))
            }, ne = function (e, t, i, s) {
                if (!t.done) {
                    t.done = !0, s && (t = s);
                    try {
                        if (e === i) throw G("Promise can't be resolved itself");
                        var n = Y(i);
                        n ? P((function () {
                            var s = {done: !1};
                            try {
                                n.call(i, ie(ne, e, s, t), ie(se, e, s, t))
                            } catch (i) {
                                se(e, s, i, t)
                            }
                        })) : (t.value = i, t.state = 1, J(e, t, !1))
                    } catch (i) {
                        se(e, {done: !1}, i, t)
                    }
                }
            };
        X && (D = function (e) {
            y(this, D, T), b(e), s.call(this);
            var t = E(this);
            try {
                e(ie(ne, this, t), ie(se, this, t))
            } catch (e) {
                se(this, t, e)
            }
        }, (s = function (e) {
            V(this, {
                type: T,
                done: !1,
                notified: !1,
                parent: !1,
                reactions: [],
                rejection: !1,
                state: 0,
                value: void 0
            })
        }).prototype = p(D.prototype, {
            then: function (e, t) {
                var i = H(this), s = N(x(this, D));
                return s.ok = "function" != typeof e || e, s.fail = "function" == typeof t && t, s.domain = $ ? W.domain : void 0, i.parent = !0, i.reactions.push(s), 0 != i.state && J(this, i, !1), s.promise
            }, catch: function (e) {
                return this.then(void 0, e)
            }
        }), n = function () {
            var e = new s, t = E(e);
            this.promise = e, this.resolve = ie(ne, e, t), this.reject = ie(se, e, t)
        }, A.f = N = function (e) {
            return e === D || e === o ? new n(e) : U(e)
        }, l || "function" != typeof u || (r = u.prototype.then, d(u.prototype, "then", (function (e, t) {
            var i = this;
            return new D((function (e, t) {
                r.call(i, e, t)
            })).then(e, t)
        }), {unsafe: !0}), "function" == typeof z && a({global: !0, enumerable: !0, forced: !0}, {
            fetch: function (e) {
                return k(D, z.apply(c, arguments))
            }
        }))), a({global: !0, wrap: !0, forced: X}, {Promise: D}), m(D, T, !1, !0), f(T), o = h(T), a({
            target: T,
            stat: !0,
            forced: X
        }, {
            reject: function (e) {
                var t = N(this);
                return t.reject.call(void 0, e), t.promise
            }
        }), a({target: T, stat: !0, forced: l || X}, {
            resolve: function (e) {
                return k(l && this === o ? D : this, e)
            }
        }), a({target: T, stat: !0, forced: Q}, {
            all: function (e) {
                var t = this, i = N(t), s = i.resolve, n = i.reject, o = M((function () {
                    var i = b(t.resolve), o = [], r = 0, a = 1;
                    v(e, (function (e) {
                        var l = r++, c = !1;
                        o.push(void 0), a++, i.call(t, e).then((function (e) {
                            c || (c = !0, o[l] = e, --a || s(o))
                        }), n)
                    })), --a || s(o)
                }));
                return o.error && n(o.value), i.promise
            }, race: function (e) {
                var t = this, i = N(t), s = i.reject, n = M((function () {
                    var n = b(t.resolve);
                    v(e, (function (e) {
                        n.call(t, e).then(i.resolve, s)
                    }))
                }));
                return n.error && s(n.value), i.promise
            }
        })
    }, {
        "../internals/a-function": 241,
        "../internals/an-instance": 245,
        "../internals/check-correctness-of-iteration": 251,
        "../internals/classof-raw": 252,
        "../internals/engine-v8-version": 266,
        "../internals/export": 268,
        "../internals/get-built-in": 273,
        "../internals/global": 275,
        "../internals/host-report-errors": 278,
        "../internals/inspect-source": 282,
        "../internals/internal-state": 283,
        "../internals/is-forced": 286,
        "../internals/is-object": 287,
        "../internals/is-pure": 288,
        "../internals/iterate": 290,
        "../internals/microtask": 293,
        "../internals/native-promise-constructor": 294,
        "../internals/new-promise-capability": 297,
        "../internals/perform": 313,
        "../internals/promise-resolve": 314,
        "../internals/redefine": 316,
        "../internals/redefine-all": 315,
        "../internals/set-species": 323,
        "../internals/set-to-string-tag": 324,
        "../internals/species-constructor": 328,
        "../internals/task": 331,
        "../internals/well-known-symbol": 342
    }],
    350: [function (e, t, i) {
        "use strict";
        var s = e("../internals/export"), n = e("../internals/regexp-exec");
        s({target: "RegExp", proto: !0, forced: /./.exec !== n}, {exec: n})
    }, {"../internals/export": 268, "../internals/regexp-exec": 318}],
    351: [function (e, t, i) {
        "use strict";
        var s = e("../internals/export"), n = e("../internals/not-a-regexp"),
            o = e("../internals/require-object-coercible");
        s({
            target: "String",
            proto: !0,
            forced: !e("../internals/correct-is-regexp-logic")("includes")
        }, {
            includes: function (e) {
                return !!~String(o(this)).indexOf(n(e), arguments.length > 1 ? arguments[1] : void 0)
            }
        })
    }, {
        "../internals/correct-is-regexp-logic": 255,
        "../internals/export": 268,
        "../internals/not-a-regexp": 298,
        "../internals/require-object-coercible": 321
    }],
    352: [function (e, t, i) {
        "use strict";
        var s = e("../internals/fix-regexp-well-known-symbol-logic"), n = e("../internals/is-regexp"),
            o = e("../internals/an-object"), r = e("../internals/require-object-coercible"),
            a = e("../internals/species-constructor"), l = e("../internals/advance-string-index"),
            c = e("../internals/to-length"), h = e("../internals/regexp-exec-abstract"),
            u = e("../internals/regexp-exec"), d = e("../internals/fails"), p = [].push, m = Math.min,
            f = !d((function () {
                return !RegExp(4294967295, "y")
            }));
        s("split", 2, (function (e, t, i) {
            var s;
            return s = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function (e, i) {
                var s = String(r(this)), o = void 0 === i ? 4294967295 : i >>> 0;
                if (0 === o) return [];
                if (void 0 === e) return [s];
                if (!n(e)) return t.call(s, e, o);
                for (var a, l, c, h = [], d = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""), m = 0, f = new RegExp(e.source, d + "g"); (a = u.call(f, s)) && !((l = f.lastIndex) > m && (h.push(s.slice(m, a.index)), a.length > 1 && a.index < s.length && p.apply(h, a.slice(1)), c = a[0].length, m = l, h.length >= o));) f.lastIndex === a.index && f.lastIndex++;
                return m === s.length ? !c && f.test("") || h.push("") : h.push(s.slice(m)), h.length > o ? h.slice(0, o) : h
            } : "0".split(void 0, 0).length ? function (e, i) {
                return void 0 === e && 0 === i ? [] : t.call(this, e, i)
            } : t, [function (t, i) {
                var n = r(this), o = null == t ? void 0 : t[e];
                return void 0 !== o ? o.call(t, n, i) : s.call(String(n), t, i)
            }, function (e, n) {
                var r = i(s, e, this, n, s !== t);
                if (r.done) return r.value;
                var u = o(e), d = String(this), p = a(u, RegExp), g = u.unicode,
                    b = (u.ignoreCase ? "i" : "") + (u.multiline ? "m" : "") + (u.unicode ? "u" : "") + (f ? "y" : "g"),
                    y = new p(f ? u : "^(?:" + u.source + ")", b), S = void 0 === n ? 4294967295 : n >>> 0;
                if (0 === S) return [];
                if (0 === d.length) return null === h(y, d) ? [d] : [];
                for (var w = 0, v = 0, _ = []; v < d.length;) {
                    y.lastIndex = f ? v : 0;
                    var x, C = h(y, f ? d : d.slice(v));
                    if (null === C || (x = m(c(y.lastIndex + (f ? 0 : v)), d.length)) === w) v = l(d, v, g); else {
                        if (_.push(d.slice(w, v)), _.length === S) return _;
                        for (var P = 1; P <= C.length - 1; P++) if (_.push(C[P]), _.length === S) return _;
                        v = w = x
                    }
                }
                return _.push(d.slice(w)), _
            }]
        }), !f)
    }, {
        "../internals/advance-string-index": 244,
        "../internals/an-object": 246,
        "../internals/fails": 269,
        "../internals/fix-regexp-well-known-symbol-logic": 270,
        "../internals/is-regexp": 289,
        "../internals/regexp-exec": 318,
        "../internals/regexp-exec-abstract": 317,
        "../internals/require-object-coercible": 321,
        "../internals/species-constructor": 328,
        "../internals/to-length": 336
    }],
    353: [function (e, t, i) {
        var s = e("../internals/global"), n = e("../internals/dom-iterables"), o = e("../modules/es.array.iterator"),
            r = e("../internals/create-non-enumerable-property"), a = e("../internals/well-known-symbol"),
            l = a("iterator"), c = a("toStringTag"), h = o.values;
        for (var u in n) {
            var d = s[u], p = d && d.prototype;
            if (p) {
                if (p[l] !== h) try {
                    r(p, l, h)
                } catch (e) {
                    p[l] = h
                }
                if (p[c] || r(p, c, u), n[u]) for (var m in o) if (p[m] !== o[m]) try {
                    r(p, m, o[m])
                } catch (e) {
                    p[m] = o[m]
                }
            }
        }
    }, {
        "../internals/create-non-enumerable-property": 258,
        "../internals/dom-iterables": 263,
        "../internals/global": 275,
        "../internals/well-known-symbol": 342,
        "../modules/es.array.iterator": 344
    }]
}, {}, [18, 39, 21, 22, 165, 26, 223, 239, 188, 199, 33, 172, 45, 238, 55, 24, 128, 240, 27, 25, 230]);
