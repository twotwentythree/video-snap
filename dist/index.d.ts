export declare class VideoSnap {
    private readonly video;
    private readonly canvas;
    private readonly context;
    /** Wait for video to rewind to targetTime and resolve Promise */
    private static rewindVideo;
    /**
     * @param videoSourceUrl - URL to a video
     */
    constructor(videoSourceUrl: string);
    /**
     * Asynchronously take snapshots from video provided in constructor.
     * Specific number of snapshots equally distributed to whole video length.
     *
     * @param {number} numberOfFrames - number of images video should be sliced to
     * @param {Config} config - configuration for snapshots;
     *
     * @return Promise with array of Blob URLs to captured images.
     */
    getFrames(numberOfFrames: number, config?: Config): Promise<Blob[]>;
    /**
     * Capture image from specific time of the video provided in constructor;
     *
     * @param time - time of the video where image should be taken
     * @param config - image capture params
     *
     * @return Promise with Blob URL to captured image.
     */
    getFrameFrom(time: number, config?: Config): Promise<Blob>;
    /**
     * Wait until video loaded, then resolves Promise
     * Rejects Promise on error
     * Rejects Promise if wait time exceeded maxWaitTime (if specified)
     * */
    private waitVideoLoading;
    /**
     * Make specific amount of snapshots evenly distributed from start to end of the video.
     *
     * @param numberOfImages - amount of snapshots to make
     * @param config - configuration object
     *
     * @return Promise with array of Blob url's to images
     */
    private getEvenlyDistributedImages;
    /**
     * Set video to a specific time and wait while video rewind.
     * Then draw image on canvas and convert it to Blob URL
     */
    private captureImage;
    /**
     * Convert image from canvas into Blob url in JPG (PNG in Edge)
     */
    private convertCanvasImageToBlobUrl;
}
interface Config {
    imageQuality?: number;
    maxVideoLoadTime?: number;
}
export {};
