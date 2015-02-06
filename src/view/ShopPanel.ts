class ShopPanel extends BasePanel{
    private bg:egret.Bitmap;
    private itemList: any[];
    private swipePane: egret.HSwipePane;
    private pbClose: EButton;

    constructor() {
        super();
    }

    initPanel(): void {
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);

        this.itemList = [];
        this.swipePane = new egret.HSwipePane();
        this.swipePane.x = 50;
        this.swipePane.y = 300;
        this.swipePane.space = 380;
        this.swipePane.touchEnabled = true;
        this.swipePane.pageSize = new egret.Point(380, 600);
        this.addChild(this.swipePane);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.updateView, this);
    }

    updateView(): void {
        var logo:egret.Bitmap;
        for (var i = 0; i < 10; i++) {
            logo = new egret.Bitmap();
            logo.texture = this.assets.getTexture("logoImg");
            this.itemList[i] = logo;
        }
        this.swipePane.itemList = this.itemList;
    }

} 