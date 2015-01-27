
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

    private mapName: ETextField;
    private headTimes: ETextField;
    private bodyTimes: ETextField;
    private hitTimes: ETextField;
    private lastStep: ETextField;
    private typerTF: ETextField;
    // 初始化面板
    public initPanel():void{
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
        this.mapName.strokeColor = 0x000000;
        this.mapName.stroke = 1;
        this.mapName.width = 370;
        this.mapName.setText("");
        this.mapName.x = this.w / 2 - this.mapName.width / 2;
        this.mapName.y = this.h / 2 + 100;
//        this.addChild(this.mapName);
//        this.mapName = new HtmlText([["我是", 0xff0000, 18], ["多颜色", 0x55ff00, 30], ["文本", 0xff0000, 40], ["组件", 0x55ff00]], 30, false, 1, 0xFFFFFF);
//        this.mapName.x = this.w / 2 - this.mapName.width/2;
//        this.mapName.y = -350;
//        this.addChild(this.mapName);


        this.typerTF = new ETextField();
        this.typerTF.bold = true;
        this.typerTF.strokeColor = 0x000000;
        this.typerTF.stroke = 1;
        this.typerTF.width = 370;
        this.typerTF.setText("");
        this.typerTF.x = this.w/2 -this.typerTF.width/2;
        this.typerTF.y = this.h/2 + 100;
        //this.addChild(this.typerTF);

        //EffectUtils.typerEffect(this.typerTF,"牛逼大了，打字机效果呢！");

        this.helpBtn2 = new EButton(this,"helpBtn",this.alert1,"",30,1);
        this.helpBtn2.x = 20;
        this.helpBtn2.y = 200;
        //this.addChild(this.helpBtn2);   
        this.helpBtn2.alpha = 0;


        this.shopBtn2 = new EButton(this,"shopBtn",this.alert2,"",30,2);
        this.shopBtn2.x = 150;
        this.shopBtn2.y = 200;
        //this.addChild(this.shopBtn2);   
        this.shopBtn2.alpha = 0;

        this.fbBtn2 = new EButton(this,"fbBtn",this.alert3,"",30,3);
        this.fbBtn2.x = 270;
        this.fbBtn2.y = 200;
        //this.addChild(this.fbBtn2);  
        this.fbBtn2.alpha = 0; 

        this.setBtn2 = new EButton(this,"setBtn",this.alert4,"设置",30,1);
        this.setBtn2.x = this.w - this.setBtn2.width - 20;
        this.setBtn2.y = 200;
        //this.addChild(this.setBtn2); 
        this.setBtn2.alpha = 0;  

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

        this.initEffect();
        this.gameData = GameData.getInstance();
        Global.addEventListener(GameEvent.GAME_CONTINUE, this.updateHitTimes, this);
        Global.addEventListener(GameEvent.GAME_START, this.updateHitTimes, this);
    }

    private updateHitTimes(e: GameEvent): void {
        this.hitTimes.text = this.gameData.hitTimes.toString();
        this.bodyTimes.text = this.gameData.bodyTimes.toString();
        this.headTimes.text = this.gameData.headTimes.toString();
        if (GameData.getInstance().model == GameModelEnum.advanture) {
            this.mapName.visible = true;
            this.lastStep.visible = true;
            this.mapName.text = this.gameData.mapName;
            this.lastStep.text = this.gameData.lastStep.toString();
//            this.step.source = this.lastStep;
        } else {
            this.mapName.visible = false;
            this.lastStep.visible = false;
        }
    }

    private alert1():void{
        Global.alert("提示","我是一个提示栗子，哈哈",null,1);
    }

    private alert2():void{
        Global.alert("提示","我是一个提示栗子，哈哈",null,2);
    }

    private alert3():void{
        Global.alert("提示","我是一个提示栗子，哈哈",null,3);
    }

    private alert4():void{
        Global.alert("提示","我是一个提示栗子，哈哈",null,4);
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

