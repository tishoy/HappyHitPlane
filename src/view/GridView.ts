/**
 * Created by tishoy on 15/1/31.
 */
class GridView extends egret.Sprite{
    private _selected:boolean;    //
    private _statu: boolean;  //0为关闭，1为打开
    private type:number;
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
        this.addChild(this.view);

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        Global.addEventListener(GameEvent.GAME_RESET, this.onReset, this);
        Global.addEventListener(GameEvent.GAME_LOST, this.onEnd, this);
        Global.addEventListener(GameEvent.GAME_VICTORY, this.onEnd, this);
    }

    updateView() {
        if (this.statu) {
            switch (this.type) {
                case GridTypeEnum.miss:
                    this.view.texture = this.sheet.getTexture("hitHole");
                    TipsManager.addTips(this, "洞哦！", 1);
                    
                    break;

                case GridTypeEnum.body:
                    this.view.texture = this.sheet.getTexture("hitBody");
                    EffectUtils.shakeObj(this.view);
                    TipsManager.addTips(this, "身子呀！", 2);
                    break;

                case GridTypeEnum.head:
                    this.view.texture = this.sheet.getTexture("hitHead");
                    EffectUtils.shakeScreen(1);
                    TipsManager.addTips(this,"脑瓜子！",3);
                    break;
            }
        } else if (this.selected) {
            this.view.texture = this.sheet.getTexture("select");
            EffectUtils.blinkEffect(this.view);
        } else {
            this.view.texture = null;
        }
    }

    private onReset(e: GameEvent): void {
        if (e.type == GameEvent.GAME_RESET) {
            TipsManager.removeTips(this);
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
            if (PanelManager.gamePanel.selectedGrid) {
                PanelManager.gamePanel.selectedGrid.selected = false;
                PanelManager.gamePanel.selectedGrid = this;
            } else {
                PanelManager.gamePanel.selectedGrid = this;
            }
        } else {
            PanelManager.gamePanel.selectedGrid = null;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.statu = true;
        }
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        this._selected = value;
        this.updateView();
        if (this._selected) {
           egret.Tween.get(this.view, { loop: true }).to({ apha : 0}, 1000).to({ apha : 1}, 1000);
        } 
    }

    get statu(): boolean {
        return this._statu;
    }

    set statu(value: boolean) {
        this.type = GameController.getInstance().getGridViewType(this.column, this.row);
        this._statu = value;
        if (this._selected) {
            this._selected = false;
        }
        this.updateView();
    }
} 