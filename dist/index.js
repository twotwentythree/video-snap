"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoSnap = void 0;
var VIDEO_READY_STATE = 4;
var VideoSnap = /** @class */ (function () {
    /**
     * @param videoSourceUrl - URL to a video
     */
    function VideoSnap(videoSourceUrl) {
        this.video = document.createElement('video');
        this.canvas = document.createElement('canvas');
        var context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error('Could not create canvas context');
        }
        this.context = context;
        this.video.src = videoSourceUrl;
    }
    /** Wait for video to rewind to targetTime and resolve Promise */
    VideoSnap.rewindVideo = function (video, targetTime) {
        return new Promise(function (resolve) {
            var handler = function () {
                video.removeEventListener('seeked', handler);
                resolve();
            };
            video.addEventListener('seeked', handler);
            video.currentTime = targetTime;
        });
    };
    /**
     * Asynchronously take snapshots from video provided in constructor.
     * Specific number of snapshots equally distributed to whole video length.
     *
     * @param {number} numberOfFrames - number of images video should be sliced to
     * @param {Config} config - configuration for snapshots;
     *
     * @return Promise with array of Blob URLs to captured images.
     */
    VideoSnap.prototype.getFrames = function (numberOfFrames, config) {
        if (config === void 0) { config = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.video.readyState !== VIDEO_READY_STATE)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.waitVideoLoading(config.maxVideoLoadTime)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        // Match canvas and video size
                        this.canvas.height = this.video.videoHeight;
                        this.canvas.width = this.video.videoWidth;
                        return [2 /*return*/, this.getEvenlyDistributedImages(numberOfFrames, config)];
                }
            });
        });
    };
    /**
     * Capture image from specific time of the video provided in constructor;
     *
     * @param time - time of the video where image should be taken
     * @param config - image capture params
     *
     * @return Promise with Blob URL to captured image.
     */
    VideoSnap.prototype.getFrameFrom = function (time, config) {
        if (config === void 0) { config = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.video.readyState !== VIDEO_READY_STATE)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.waitVideoLoading(config.maxVideoLoadTime)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        // Match canvas and video size
                        this.canvas.height = this.video.videoHeight;
                        this.canvas.width = this.video.videoWidth;
                        return [4 /*yield*/, this.captureImage(time, config.imageQuality)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Wait until video loaded, then resolves Promise
     * Rejects Promise on error
     * Rejects Promise if wait time exceeded maxWaitTime (if specified)
     * */
    VideoSnap.prototype.waitVideoLoading = function (maxWaitTime) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var onLoadedHandler = function () {
                removeListeners();
                resolve();
            };
            var onErrorHandler = function () {
                removeListeners();
                reject('Error loading video');
            };
            var removeListeners = function () {
                _this.video.removeEventListener('error', onErrorHandler);
                _this.video.removeEventListener('loadedmetadata', onLoadedHandler);
            };
            _this.video.addEventListener('loadedmetadata', onLoadedHandler);
            _this.video.addEventListener('error', onErrorHandler);
            if (maxWaitTime) {
                setTimeout(onErrorHandler, maxWaitTime);
            }
        });
    };
    /**
     * Make specific amount of snapshots evenly distributed from start to end of the video.
     *
     * @param numberOfImages - amount of snapshots to make
     * @param config - configuration object
     *
     * @return Promise with array of Blob url's to images
     */
    VideoSnap.prototype.getEvenlyDistributedImages = function (numberOfImages, config) {
        return __awaiter(this, void 0, void 0, function () {
            var images, step, i, image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        images = [];
                        step = this.video.duration / numberOfImages;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < numberOfImages)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.captureImage(step * i, config.imageQuality)];
                    case 2:
                        image = _a.sent();
                        images.push(image);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, images];
                }
            });
        });
    };
    /**
     * Set video to a specific time and wait while video rewind.
     * Then draw image on canvas and convert it to Blob URL
     */
    VideoSnap.prototype.captureImage = function (time, quality) {
        if (quality === void 0) { quality = 1; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, VideoSnap.rewindVideo(this.video, time)];
                    case 1:
                        _a.sent();
                        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
                        return [2 /*return*/, this.convertCanvasImageToBlobUrl(this.canvas, quality)];
                }
            });
        });
    };
    /**
     * Convert image from canvas into Blob url in JPG (PNG in Edge)
     */
    VideoSnap.prototype.convertCanvasImageToBlobUrl = function (canvas, quality) {
        return new Promise(function (resolve) {
            if (canvas.toBlob) {
                canvas.toBlob(function (blob) { return resolve(blob); }, 'image/jpeg', quality);
            }
            else if (canvas.msToBlob) {
                var blob = canvas.msToBlob();
                resolve(blob);
            }
            else {
                throw new Error('canvas.toBlob and canvas.msToBlob are not supported');
            }
        });
    };
    return VideoSnap;
}());
exports.VideoSnap = VideoSnap;
