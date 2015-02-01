/**
 * Created by tishoy on 15/1/31.
 * 副本数据
 */
class CopyData {
    private static instance: CopyData;
    copyStarList: number[];

    constructor() {
//        super();
        if (CopyData.instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }

    static getInstance(): CopyData {
        if (!this.instance) {
            this.instance = new CopyData();
        }
        return this.instance;
    }

    initialize(): void {

    }
} 