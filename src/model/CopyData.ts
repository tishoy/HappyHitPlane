/**
 * Created by tishoy on 15/1/31.
 * 副本数据
 */
class CopyData {
    private static instance: CopyData;
    currentCopy:number;
    copyStarList: number[];

    constructor() {
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
        this.currentCopy = 0;
        this.copyStarList = [];
    }

    saveCopyStar(star:number): void{

    }

    nextCopy(): void{
        this.currentCopy++;
        //this.copyStart(this.currentCopy);
    }
} 