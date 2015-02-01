class AchievementItem extends egret.Sprite{
    
    private bg:egret.Bitmap;

    constructor() {
        super();
        this.initView();
    }

    initView():void {
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("mapView").getTexture("panel");
        this.addChild(this.bg);   
    }
} 