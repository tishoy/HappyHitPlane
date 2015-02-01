/**
 * Created by tishoy on 15/1/31.
 * 玩家武器装备道具
 */
class WeaponData extends egret.EventDispatcher {
    private static instance: WeaponData;

    private radar: number = 0;
    private fireBoom:number = 0;
    private angryBird:number = 0;

    constructor() {
        super();
        if (WeaponData.instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }

    static getInstance(): WeaponData {
        if (!this.instance) {
            this.instance = new WeaponData();
        }
        return this.instance;
    }

    initialize(): void {
//        radar = 
    }
}