var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by tishoy on 15/1/31.
 * 游戏主界面
 */
var GamePanel = (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel() {
        _super.call(this);
    }
    // 初始化面板
    GamePanel.prototype.initPanel = function () {
        this.gameData = GameData.getInstance();
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);
        this.bg.touchEnabled = true;
        this.map = new egret.Bitmap(RES.getRes("mapView").getTexture("grid"));
        this.map.x = 0;
        this.addChild(this.map);
        var grid;
        for (var i = 0; i < 81; i++) {
            grid = new GridView();
            grid.column = i % 9;
            grid.row = Math.floor(i / 9);
            grid.x = 10 + grid.column * 50;
            grid.y = 315 + grid.row * 50;
            grid.name = "grid" + i;
            this.addChildAt(grid, this.getChildIndex(this.map) + 1);
        }
        this.mapName = new ETextField();
        this.mapName.bold = true;
        this.mapName.strokeColor = 0xFFFFFF;
        this.mapName.stroke = 1;
        this.mapName.width = 370;
        this.mapName.x = 100;
        this.mapName.y = 30;
        this.mapName.visible = false;
        this.addChild(this.mapName);
        this.headTimesLabel = new ETextField();
        this.headTimesLabel.bold = true;
        this.headTimesLabel.strokeColor = 0x000000;
        this.headTimesLabel.stroke = 1;
        this.headTimesLabel.width = 370;
        this.headTimesLabel.setText("爆头次数");
        this.headTimesLabel.x = 38;
        this.headTimesLabel.y = 140;
        this.headTimesLabel.visible = false;
        this.addChild(this.headTimesLabel);
        this.headNum = new egret.BitmapText();
        this.headNum.spriteSheet = RES.getRes("font_json");
        this.headNum.x = 178;
        this.headNum.y = 131;
        this.headNum.visible = false;
        this.addChild(this.headNum);
        this.bodyTimesLabel = new ETextField();
        this.bodyTimesLabel.bold = true;
        this.bodyTimesLabel.strokeColor = 0x000000;
        this.bodyTimesLabel.stroke = 1;
        this.bodyTimesLabel.width = 370;
        this.bodyTimesLabel.setText("击中次数");
        this.bodyTimesLabel.x = 220;
        this.bodyTimesLabel.y = 140;
        this.bodyTimesLabel.visible = false;
        this.addChild(this.bodyTimesLabel);
        this.gameCancel = new EButton(this, "cancelBtn");
        this.gameCancel.x = this.w - this.gameCancel.height;
        this.gameCancel.y = 0;
        this.addChild(this.gameCancel);
        this.gameCancel.visible = true;
        this.gameCancel.touchEnabled = true;
        this.gameCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ongamecancelTouchTap, this);
        this.bodyNum = new egret.BitmapText();
        this.bodyNum.spriteSheet = RES.getRes("font_json");
        this.bodyNum.x = 360;
        this.bodyNum.y = 131;
        this.bodyNum.visible = false;
        this.addChild(this.bodyNum);
        this.hitTimesLabel = new ETextField();
        this.hitTimesLabel.bold = true;
        this.hitTimesLabel.strokeColor = 0x000000;
        this.hitTimesLabel.stroke = 1;
        this.hitTimesLabel.width = 370;
        this.hitTimesLabel.setText("射击次数");
        this.hitTimesLabel.x = 185;
        this.hitTimesLabel.y = 83;
        this.hitTimesLabel.visible = false;
        this.addChild(this.hitTimesLabel);
        this.hitNum = new egret.BitmapText();
        this.hitNum.spriteSheet = RES.getRes("font_json");
        this.hitNum.x = 325;
        this.hitNum.y = 74;
        this.hitNum.visible = false;
        this.addChild(this.hitNum);
        this.lastStepLabel = new ETextField();
        this.lastStepLabel.bold = true;
        this.lastStepLabel.strokeColor = 0x000000;
        this.lastStepLabel.stroke = 1;
        this.lastStepLabel.width = 370;
        this.lastStepLabel.setText("剩余次数");
        this.lastStepLabel.x = 120;
        this.lastStepLabel.y = 190;
        this.lastStepLabel.visible = false;
        this.addChild(this.lastStepLabel);
        this.lastStepNum = new egret.BitmapText();
        this.lastStepNum.spriteSheet = RES.getRes("font_json");
        this.lastStepNum.x = 260;
        this.lastStepNum.y = 181;
        this.lastStepNum.visible = false;
        this.addChild(this.lastStepNum);
        this.selectedWeapon = WeaponEnum.radarID;
        //TipsManager.addTips(this.helpBtn,"我是排行榜按钮哦！",1);
        //TipsManager.addTips(this.shopBtn,"我是商店按钮哦！",2);
        //TipsManager.addTips(this.fbBtn,"我是facebook按钮哦！",3);
        //TipsManager.addTips(this.setBtn,"我是设置按钮哦！",4);
        //this.radarButton.setSelected(false);
        //this.fireButton.setSelected(false);
        //this.birdButton.setSelected(false);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
    };
    GamePanel.prototype.ongamecancelTouchTap = function (e) {
        Global.confirm("", "确定退出？", this.closePanel, this.onNextCopyCancel, 1);
    };
    GamePanel.prototype.onAdded = function (e) {
        this.initEffect();
        Global.addEventListener(GameEvent.GAME_CONTINUE, this.updateHitTimes, this);
        Global.addEventListener(GameEvent.GAME_START, this.updateHitTimes, this);
        Global.addEventListener(GameEvent.GAME_VICTORY, this.onVictory, this);
        Global.addEventListener(GameEvent.GAME_LOST, this.onLost, this);
    };
    GamePanel.prototype.updateHitTimes = function (e) {
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
        }
        else {
            this.lastStepLabel.visible = false;
            this.mapName.visible = false;
            this.lastStepNum.visible = false;
        }
    };
    GamePanel.prototype.onVictory = function (e) {
        if (this.gameData.model == GameModelEnum.common) {
            RES.getResAsync("description", this.startAnimation, this);
        }
        else if (this.gameData.model == GameModelEnum.advanture) {
            Global.confirm("提示", "恭喜您闯关成功,是否再来一关？", this.onNextCopyCancel, this.onNextCopyConfirm, 1);
        }
    };
    GamePanel.prototype.onLost = function (e) {
        console.log("收到事件");
        Global.alert("提示", "任务失败, 请从新再来", this.onThisCopyConfirm, 2);
    };
    GamePanel.prototype.onNextCopyConfirm = function () {
        CopyData.getInstance().nextCopy();
        GameController.getInstance().startCopy();
    };
    GamePanel.prototype.onNextCopyCancel = function () {
        Global.dispatchEvent(MainNotify.closeGamePanelNotify, null, false);
        Global.dispatchEvent(MainNotify.openStartPanelNotify, null, false);
    };
    GamePanel.prototype.startAnimation = function (result) {
        var step = GameData.getInstance().hitTimes;
        if (step <= 10) {
            var lineArr = result[step];
        }
        else if (step < 15) {
            var lineArr = result[11];
        }
        else if (step < 20) {
            var lineArr = result[12];
        }
        else if (step < 50) {
            var lineArr = result[13];
        }
        else if (step < 81) {
            var lineArr = result[14];
        }
        else {
            var lineArr = result[15];
        }
        var text = "";
        text = lineArr[1]["text"];
        Global.alert("提示", "您使用了" + step + "步打出了所有飞机！" + text, this.goonCommonGame, 3);
    };
    GamePanel.prototype.goonCommonGame = function () {
        GameController.getInstance().commonGame();
    };
    GamePanel.prototype.onThisCopyConfirm = function () {
        GameController.getInstance().startCopy();
    };
    GamePanel.prototype.initEffect = function () {
        this.headTimesLabel.alpha = 0;
        this.headNum.alpha = 0;
        this.bodyTimesLabel.alpha = 0;
        this.bodyNum.alpha = 0;
        this.hitTimesLabel.alpha = 0;
        this.hitNum.alpha = 0;
        this.lastStepLabel.alpha = 0;
        this.lastStepNum.alpha = 0;
        var onComplete = function () {
            egret.Tween.get(this.headTimesLabel).to({ alpha: 1 }, 300);
            egret.Tween.get(this.headNum).to({ alpha: 1 }, 300);
            egret.Tween.get(this.bodyTimesLabel).to({ alpha: 1 }, 300);
            egret.Tween.get(this.bodyNum).to({ alpha: 1 }, 300);
            egret.Tween.get(this.hitTimesLabel).to({ alpha: 1 }, 300);
            egret.Tween.get(this.hitNum).to({ alpha: 1 }, 300);
            if (GameData.getInstance().model == GameModelEnum.advanture) {
                egret.Tween.get(this.lastStepLabel).to({ alpha: 1 }, 300);
                egret.Tween.get(this.lastStepNum).to({ alpha: 1 }, 300);
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
        }
        else {
            this.lastStepLabel.visible = false;
            this.lastStepNum.visible = false;
        }
        egret.Tween.get(this.map).to({ y: 300 }, 600, egret.Ease.backOut).call(onComplete, this);
    };
    return GamePanel;
})(BasePanel);
GamePanel.prototype.__class__ = "GamePanel";
//# sourceMappingURL=GamePanel.js.map