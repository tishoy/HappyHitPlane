class ItemData extends egret.EventDispatcher {
    private static instance: ItemData;

    private radar: number = 0;
    private fireBoom:number = 0;

    constructor() {
        super();
        if (ItemData.instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }

    static getInstance(): ItemData {
        if (!this.instance) {
            this.instance = new ItemData();
        }
        return this.instance;
    }

    initialize(): void {
//        radar = 
    }
}