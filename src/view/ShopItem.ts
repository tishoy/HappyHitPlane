/**
 * Created by tishoy on 15/2/9.
 */
class ShopItem extends egret.Sprite{
    private _id:number;
    private _itemName:ETextField;

    constructor () {
        super();
        this._itemName = new ETextField();
        this.initView();
    }

    private initView():void{
        this._itemName.scaleX = this._itemName.scaleY = 4;
        this.addChild(this._itemName);
    }

    private updateView():void {

    }

    set name(value:string) {
        this._itemName.text = value;
        this.updateView();
    }

    set id(value:number) {
        this._id = value;
    }
}