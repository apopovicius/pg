abstract class TakePhoto2 {
    constructor(
        public cameraMode: string,
        public filter: string,
    ) {}

    getSepia(): string {
        return 'Sepia5'
    }

    abstract getWhiteBalance(): void
}

//const ITP = new TakePhoto("Auto", "MD0"); // we cannot create an instance of abstract class

class Instagram2 extends TakePhoto2 {
    constructor(
        public cameraMode: string,
        public filter: string,
        public burst: number
    ) {
        super(cameraMode, filter);
    }
    getWhiteBalance(): void {
        console.log(`${this.burst}`);
    }

}

const instagramITP = new Instagram2("Manual", "Md5", 55);
instagramITP.getSepia();
instagramITP.getWhiteBalance();