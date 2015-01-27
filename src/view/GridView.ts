class GridView extends egret.Sprite{
    private _selected:boolean;    //瞄准
    private _statu: boolean;  //0为关闭，1为打开
    contentGroup: egret.gui.Group;
    view: egret.Bitmap;
    sheet:egret.SpriteSheet;
    row;
    column;
    //特效
    private scaleRate:number;

    constructor() {
        super();
        this.init();
    }

    init() {
        this.touchEnabled = true;
        this.width = this.height = 48;
        this.sheet = RES.getRes("mapView");
        this.view = new egret.Bitmap();
//        this.view.texture = this.sheet.getTexture("hitHole");
        this.addChild(this.view);

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        Global.addEventListener(GameEvent.GAME_RESET, this.onReset, this);
        Global.addEventListener(GameEvent.GAME_LOST, this.onEnd, this);
        Global.addEventListener(GameEvent.GAME_VICTORY, this.onEnd, this);
    }

    updateView() {
        if (this.statu) {
            var type = MapData.getInstance().getMapGridType(this.column, this.row);
            switch (type) {
                case GridTypeEnum.miss:
                    this.view.texture = this.sheet.getTexture("hitHole");
                    TipsManager.addTips(this, "洞哦！",1);
                    break;

                case GridTypeEnum.body:
                    this.view.texture = this.sheet.getTexture("hitBody");
                    TipsManager.addTips(this,"身子呀！",2);
                    break;

                case GridTypeEnum.head:
                    this.view.texture = this.sheet.getTexture("hitHead");
                    TipsManager.addTips(this,"脑瓜子！",3);
                    break;
            }
        } else if (this.selected) {
            this.view.texture = this.sheet.getTexture("select");
        } 
    }

    private onReset(e: GameEvent): void {
        if (e.type == GameEvent.GAME_RESET) {
            this.statu = false;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }
    }

    private onEnd(e: GameEvent): void {
        if (e.type == GameEvent.GAME_VICTORY) {
            this.statu = true;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        } else if (e.type == GameEvent.GAME_LOST){
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }
    }

    private onTouch(e: egret.TouchEvent): void {
        if (!this._selected) {
            this.selected = true;
//            if (PanelManager.openGamePanel().selectedGrid) {
//                StageManager.gameWin.selectedGrid.selected = false;
//                StageManager.gameWin.selectedGrid = this;
//            } else {
//                StageManager.gameWin.selectedGrid = this;
//            }
        } else {
            this.statu = true;
//            StageManager.gameWin.selectedGrid = null;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            var type = MapData.getInstance().getMapGridType(this.column, this.row);
            GameController.getInstance().logHitResult(type);
        }
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        this._selected = value;
        if (this._selected) {
           egret.Tween.get(this, { loop: true }).to({ apha : 0}, 1000).to({ apha : 1}, 1000);
        } 
        this.updateView();
    }

    get statu(): boolean {
        return this._statu;
    }

    set statu(value: boolean) {
        this._statu = value;
        if (!this._statu) {
            egret.Tween.removeTweens(this);
            this.scaleX = this.scaleY = this.alpha = 1;
        }
        if (this._selected) {
            egret.Tween.removeTweens(this);
            this.scaleX = this.scaleY = this.alpha = 1;
            this._selected = false;

            var type = MapData.getInstance().getMapGridType(this.column, this.row);
            switch (type) {
                case GridTypeEnum.body:
                    //this.scaleX = this.scaleY = 0.5;
//                    egret.Tween.get(this, { loop: true }).to({ apha: 0 }, 1800).to({ apha: 1 }, 2000);
                    break;

                case GridTypeEnum.head:
//                    egret.Tween.get(this, { loop: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 1000).to({ scaleX: 1, scaleY: 1 }, 800);
                    break;
            }
        }
        this.updateView();
    }
} 