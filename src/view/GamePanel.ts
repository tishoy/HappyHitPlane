/**
 * Created by tishoy on 15/1/31.
 * 游戏主界面
 */
class GamePanel extends BasePanel{
    selectedGrid:GridView;
    selectedWeapon:number;

    private gameData:GameData;
    private map:egret.Bitmap;
    private bg:egret.Bitmap;
    private mapName: ETextField;
    private headTimesLabel: ETextField;
    private headNum: egret.BitmapText;
    private bodyTimesLabel: ETextField;
    private bodyNum: egret.BitmapText;
    private hitTimesLabel: ETextField;
    private hitNum: egret.BitmapText;
    private lastStepLabel: ETextField;
    private lastStepNum: egret.BitmapText;
    private radarButton:EToggleButton;
    private fireButton:EToggleButton;
    private birdButton:EToggleButton;
    private gamecancel: EToggleButton;
    constructor(){
        super();
    }

    // 初始化面板
    initPanel():void{
        this.gameData = GameData.getInstance();

        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);   
        this.bg.touchEnabled = true;

        this.map = new egret.Bitmap(RES.getRes("mapView").getTexture("grid"));
        this.map.x = 0;
        this.addChild(this.map);

        this.gamecancel.y = this.h / 2 - this.gamecancel.height / 2 - 100;
        this.addChild(this.gamecancel);
        this.gamecancel.visible = true;
        this.gamecancel.touchEnabled = true;
        console.log("222222222222222222222222222");
        this.gamecancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ongamecancelTouchTap, this);

   
        //TipsManager.addTips(this.helpBtn,"我是排行榜按钮哦！",1);
        //TipsManager.addTips(this.shopBtn,"我是商店按钮哦！",2);
        //TipsManager.addTips(this.fbBtn,"我是facebook按钮哦！",3);
        //TipsManager.addTips(this.setBtn,"我是设置按钮哦！",4);

        //this.radarButton.setSelected(false);
        //this.fireButton.setSelected(false);
        //this.birdButton.setSelected(false);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
    }
    ongamecancelTouchTap(e: egret.TouchEvent): void {
        console.log("1111111111111111111111111111111");
        Global.dispatchEvent(MainNotify.closeGamePanelNotify, null,false);

    private onAdded(e:egret.Event){
        this.initEffect();
        Global.addEventListener(GameEvent.GAME_CONTINUE, this.updateHitTimes, this);
        Global.addEventListener(GameEvent.GAME_START, this.updateHitTimes, this);
        Global.addEventListener(GameEvent.GAME_VICTORY, this.onVictory, this);
        Global.addEventListener(GameEvent.GAME_LOST, this.onLost, this);
    }

    private updateHitTimes(e: GameEvent): void {
        this.headNum.text = this.gameData.headTimes.toString();
        this.bodyNum.text = this.gameData.bodyTimes.toString();
        this.hitNum.text = this.gameData.hitTimes.toString();
        if (GameData.getInstance().model == GameModelEnum.advanture) {
            this.mapName.visible = true;
            this.lastStepLabel.visible = true;
            this.lastStepNum.visible = true;
            if (e.type == GameEvent.GAME_START) {
                this.mapName.setText("");
                EffectUtils.typerEffect(this.mapName, "地图名称：" + this.gameData.mapName);
            }
            this.lastStepNum.text = this.gameData.lastStep.toString();
        } else {
            this.lastStepLabel.visible = false;
            this.mapName.visible = false;
            this.lastStepNum.visible = false;
        }
    }

    private onVictory(e: GameEvent): void {
        if (this.gameData.model == GameModelEnum.common) {
            RES.getResAsync("description", this.startAnimation, this);
        } else if (this.gameData.model == GameModelEnum.advanture) {
            Global.confirm("提示", "恭喜您闯关成功,是否再来一关？", this.onNextCopyCancel, this.onNextCopyConfirm,1);
        }
    }

    private onLost(e: GameEvent):void{
        console.log("收到事件");
        Global.alert("提示", "任务失败, 请从新再来", this.onThisCopyConfirm, 2);
    }

    private onNextCopyConfirm(): void {
        CopyData.getInstance().nextCopy();
        GameController.getInstance().startCopy();
    }

    private onNextCopyCancel(): void {
        Global.dispatchEvent(MainNotify.closeGamePanelNotify, null, false);
        Global.dispatchEvent(MainNotify.openStartPanelNotify, null, false);
    }

    private startAnimation(result: Array<any>): void {
        var step = GameData.getInstance().hitTimes;
        if (step <= 10) {
            var lineArr: Array<any> = result[step];
        } else if (step < 15) {
            var lineArr: Array<any> = result[11];
        } else if (step < 20) {
            var lineArr: Array<any> = result[12];
        } else if (step < 50) {
            var lineArr: Array<any> = result[13];
        } else if (step < 81) {
            var lineArr: Array<any> = result[14];
        } else {
            var lineArr: Array<any> = result[15];
        }
        var text: string = "";
        text = lineArr[1]["text"];
        Global.alert("提示", "您使用了" + step + "步打出了所有飞机！" + text, this.goonCommonGame, 3);
    }

    private goonCommonGame(): void {
        GameController.getInstance().commonGame();
    }

    private onThisCopyConfirm(): void {
        GameController.getInstance().startCopy();
    }

    private initEffect():void{
        this.headTimesLabel.alpha = 0;
        this.headNum.alpha = 0;
        this.bodyTimesLabel.alpha = 0;
        this.bodyNum.alpha = 0;
        this.hitTimesLabel.alpha = 0;
        this.hitNum.alpha = 0;
        this.lastStepLabel.alpha =0;
        this.lastStepNum.alpha = 0;
        var onComplete:Function = function(){
            egret.Tween.get(this.headTimesLabel).to({alpha:1},300);
            egret.Tween.get(this.headNum).to({alpha:1},300);
            egret.Tween.get(this.bodyTimesLabel).to({alpha:1},300);
            egret.Tween.get(this.bodyNum).to({alpha:1},300);
            egret.Tween.get(this.hitTimesLabel).to({alpha:1},300);
            egret.Tween.get(this.hitNum).to({alpha:1},300);
            if (GameData.getInstance().model == GameModelEnum.advanture) {
                egret.Tween.get(this.lastStepLabel).to({alpha:1},300);
                egret.Tween.get(this.lastStepNum).to({alpha:1},300);
            }
        };
        this.headTimesLabel.visible = true;
        this.headNum.visible = true;
        this.bodyTimesLabel.visible = true;
        this.bodyNum.visible = true;
        this.hitTimesLabel.visible = true;
        this.hitNum.visible = true;
        if (GameData.getInstance().model == GameModelEnum.advanture) {
            this.lastStepLabel.visible = true;
            this.lastStepNum.visible = true;
        } else {
            this.lastStepLabel.visible = false;
            this.lastStepNum.visible = false;
        }
        egret.Tween.get(this.map).to({y:300},600,egret.Ease.backOut).call(onComplete,this);
    }

}

