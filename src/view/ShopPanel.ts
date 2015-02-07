/**
 * Created by tishoy on 15/2/7.
 * 商城界面
 */
class ShopPanel extends BasePanel{
    private bg:egret.Bitmap;
    private itemList: any[];
    private swipePane: egret.HSwipePane;
    private closeBtn: EButton;

    constructor() {
        super();
    }

    initPanel(): void {
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);

        this.closeBtn = new EButton(this,"cancelBtn");
        this.closeBtn.x = this.w - this.closeBtn.width;
        this.closeBtn.y = 0;
        this.addChild(this.closeBtn);
        this.closeBtn.visible = true;
        this.closeBtn.touchEnabled = true;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameCancelTouchTap, this);

        this.itemList = [];
        this.swipePane = new egret.HSwipePane();
        this.swipePane.x = 50;
        this.swipePane.y = 300;
        this.swipePane.space = 380;
        this.swipePane.touchEnabled = true;
        this.swipePane.pageSize = new egret.Point(380, 600);
        this.addChild(this.swipePane);

        this.updateView();
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.updateView, this);
    }

    updateView(): void {
        var logo:egret.Bitmap;
        for (var i = 0; i < 10; i++) {
            logo = new egret.Bitmap();
            logo.texture = this.assets.getTexture("logoImg");
            this.itemList[i] = logo;
        }
        this.swipePane.itemList = this.itemList;
        console.log("结束了");
    }

    onGameCancelTouchTap(e: egret.TouchEvent): void {
        Global.confirm("", "确定退出？", this.closePanel, this.backToGame, 1);
    }

    private backToGame(): void {
        Global.dispatchEvent(MainNotify.closeShopPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.openGamePanelNotify, null, false);
    }

} 