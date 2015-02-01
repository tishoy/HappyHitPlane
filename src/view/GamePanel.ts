/**
 * Created by tishoy on 15/1/31.
 * 游戏主界面
 */
class GamePanel extends BasePanel{

    constructor(){
        super();
    }

    private gameData:GameData;
    private map:egret.Bitmap;
    private bg:egret.Bitmap;
    private startBtn:EButton;
    private setBtn:EButton;
    private helpBtn:EButton;
    private shopBtn:EButton;
    private fbBtn:EButton;

    private setBtn2:EButton;
    private helpBtn2:EButton;
    private shopBtn2:EButton;
    private fbBtn2:EButton;

    selectedGrid:GridView;

    private mapName: ETextField;
    private headTimesLabel: ETextField;
    private headNum: egret.BitmapText;
    private bodyTimesLabel: ETextField;
    private bodyNum: egret.BitmapText;
    private hitTimesLabel: ETextField;
    private hitNum: egret.BitmapText;
    private lastStepLabel: ETextField;
    private lastStepNum: egret.BitmapText;
    private typerTF: ETextField;

    private items:ETabBar;
    // 初始化面板
    initPanel():void{
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);   
        this.bg.touchEnabled = true;

        this.map = new egret.Bitmap(RES.getRes("mapView").getTexture("grid"));
        this.map.x = 0;
        this.map.y = 300;
        this.addChild(this.map);

        var grid: GridView;
        for (var i = 0; i < 81; i++) {
            grid = new GridView();
            grid.column = i % 9;
            grid.row = Math.floor(i / 9);
            grid.x = 10 + grid.column * 50;
            grid.y = 315 + grid.row * 50;
            grid.name = "grid" + i;
            this.addChildAt(grid,this.getChildIndex	(this.map) + 1);
        }

        this.mapName = new ETextField();
        this.mapName.bold = true;
        this.mapName.strokeColor = 0xFFFFFF;
        this.mapName.stroke = 1;
        this.mapName.width = 370;
        this.mapName.x = 100;
        this.mapName.y = 30;
        this.addChild(this.mapName);

        this.headTimesLabel = new ETextField();
        this.headTimesLabel.bold = true;
        this.headTimesLabel.strokeColor = 0x000000;
        this.headTimesLabel.stroke = 1;
        this.headTimesLabel.width = 370;
        this.headTimesLabel.setText("爆头次数");
        this.headTimesLabel.x = 38;
        this.headTimesLabel.y = 140;
        this.addChild(this.headTimesLabel);

        this.headNum = new egret.BitmapText();
        this.headNum.spriteSheet = RES.getRes("font_json");
        this.headNum.x = 178;
        this.headNum.y = 131;
        this.addChild(this.headNum);

        this.bodyTimesLabel = new ETextField();
        this.bodyTimesLabel.bold = true;
        this.bodyTimesLabel.strokeColor = 0x000000;
        this.bodyTimesLabel.stroke = 1;
        this.bodyTimesLabel.width = 370;
        this.bodyTimesLabel.setText("击中次数");
        this.bodyTimesLabel.x = 220;
        this.bodyTimesLabel.y = 140;
        this.addChild(this.bodyTimesLabel);

        this.bodyNum = new egret.BitmapText();
        this.bodyNum.spriteSheet = RES.getRes("font_json");
        this.bodyNum.x = 360;
        this.bodyNum.y = 131;
        this.addChild(this.bodyNum);

        this.hitTimesLabel = new ETextField();
        this.hitTimesLabel.bold = true;
        this.hitTimesLabel.strokeColor = 0x000000;
        this.hitTimesLabel.stroke = 1;
        this.hitTimesLabel.width = 370;
        this.hitTimesLabel.setText("射击次数");
        this.hitTimesLabel.x = 185;
        this.hitTimesLabel.y = 83;
        this.addChild(this.hitTimesLabel);

        this.hitNum = new egret.BitmapText();
        this.hitNum.spriteSheet = RES.getRes("font_json");
        this.hitNum.x = 325;
        this.hitNum.y = 74;
        this.addChild(this.hitNum);

        this.lastStepLabel = new ETextField();
        this.lastStepLabel.bold = true;
        this.lastStepLabel.strokeColor = 0x000000;
        this.lastStepLabel.stroke = 1;
        this.lastStepLabel.width = 370;
        this.lastStepLabel.setText("剩余次数");
        this.lastStepLabel.x = 120;
        this.lastStepLabel.y = 190;
        this.addChild(this.lastStepLabel);

        this.lastStepNum = new egret.BitmapText();
        this.lastStepNum.spriteSheet = RES.getRes("font_json");
        this.lastStepNum.x = 260;
        this.lastStepNum.y = 181;
        this.addChild(this.lastStepNum);

        this.startBtn = new EButton(this,"startBtn",this.onStartBtnTouchTap);
        this.startBtn.x = this.w/2 - this.startBtn.width/2;
        this.startBtn.y = this.h/2 - this.startBtn.height/2;        
        //this.addChild(this.startBtn);
        this.startBtn.visible = false;

        this.helpBtn = new EButton(this,"helpBtn",null,"",30,1);
        this.helpBtn.x = 20;
        this.helpBtn.y = this.h - this.helpBtn.height - 20;
        //this.addChild(this.helpBtn);   
        this.helpBtn.visible = false;

        this.shopBtn = new EButton(this,"shopBtn",null,"",30,2);
        this.shopBtn.x = 150;
        this.shopBtn.y = this.h - this.shopBtn.height - 20;
        //this.addChild(this.shopBtn);   
        this.shopBtn.visible = false;

        this.fbBtn = new EButton(this,"fbBtn",null,"",30,3);
        this.fbBtn.x = 270;
        this.fbBtn.y = this.h - this.fbBtn.height - 20;
        //this.addChild(this.fbBtn);   
        this.fbBtn.visible = false;

        this.setBtn = new EButton(this,"setBtn",null,"设置",30,1);
        this.setBtn.x = this.w - this.setBtn.width - 20;
        this.setBtn.y = this.h - this.setBtn.height - 20;
        //this.addChild(this.setBtn);   
        this.setBtn.visible = false;

        //TipsManager.addTips(this.helpBtn,"我是排行榜按钮哦！",1);
        //TipsManager.addTips(this.shopBtn,"我是商店按钮哦！",2);
        //TipsManager.addTips(this.fbBtn,"我是facebook按钮哦！",3);
        //TipsManager.addTips(this.setBtn,"我是设置按钮哦！",4);
        
        this.items = new ETabBar(this, "cancelBtn", "acceptBtn", this.tabBarCallBack, ["导弹", "雷达", "燃烧"], 20);
        this.items.x = this.w / 2;
        this.items.y = 240;
        this.items.setSelectedIndex(2);
//        this.addChild(this.items);

        this.initEffect();
        this.gameData = GameData.getInstance();
        Global.addEventListener(GameEvent.GAME_CONTINUE, this.updateHitTimes, this);
        Global.addEventListener(GameEvent.GAME_START, this.updateHitTimes, this);
        Global.addEventListener(GameEvent.GAME_VICTORY, this.onVictory, this);
        Global.addEventListener(GameEvent.GAME_LOST, this.onLost, this);
    }

    private tabBarCallBack(e) {
//        this.items.setSelectedIndex();
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
        GameController.getInstance().nextCopy();
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
//        this.htmlTF.y = -350;
        this.startBtn.alpha = 0;
        this.helpBtn.y = this.h + 150;
        this.shopBtn.y = this.h + 150;
        this.fbBtn.y = this.h + 150;
        this.setBtn.y = this.h + 150;
        var onComplete:Function = function(){
            egret.Tween.get(this.startBtn).to({alpha:1},300);
            egret.Tween.get(this.alertTF).to({alpha:1},300);
            egret.Tween.get(this.tipsTF).to({alpha:1},300);

            egret.Tween.get(this.setBtn2).to({alpha:1},300);
            egret.Tween.get(this.fbBtn2).to({alpha:1},300);
            egret.Tween.get(this.shopBtn2).to({alpha:1},300);
            egret.Tween.get(this.helpBtn2).to({alpha:1},300);


            egret.Tween.get(this.setBtn).to({y: this.h - this.setBtn.height - 20},300,egret.Ease.backOut);
            egret.Tween.get(this.fbBtn).to({y: this.h - this.fbBtn.height - 20},300,egret.Ease.backOut);
            egret.Tween.get(this.shopBtn).to({y: this.h - this.shopBtn.height - 20},300,egret.Ease.backOut);
            egret.Tween.get(this.helpBtn).to({y: this.h - this.helpBtn.height - 20},300,egret.Ease.backOut);
        };
//        this.htmlTF.visible = true;
        this.startBtn.visible = true;
        this.helpBtn.visible = true;
        this.shopBtn.visible = true;
        this.fbBtn.visible = true;
        this.setBtn.visible = true;
//        egret.Tween.get(this.htmlTF).to({y:60},600,egret.Ease.backOut).call(onComplete,this);   
    }

    public onStartBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openGameOverPanelNotify,null,false);
        Global.dispatchEvent(MainNotify.closeGamePanelNotify,null,false);
    }

}

