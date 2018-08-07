/**
 * Created by tishoy on 18/7/31.
 * 游戏主界面
 */
class GamePanel extends BasePanel {


    private bg:egret.Bitmap;
    private gameData: GameData;


    public constructor() {
        super();
    }

    initPanel():void {
        this.initData();



        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);
        this.bg.touchEnabled = true;
    }

    initData():void {
        this.gameData = GameData.getInstance();
    }

}