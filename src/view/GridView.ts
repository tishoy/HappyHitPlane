/**
 * Created by tishoy on 15/1/31.
 * 主界面每个格子
 */
class GridView extends egret.Sprite{
    private _selected:boolean;    //
    private _statu: boolean;  //0为关闭，1为打开
    private type:number;
    view: egret.Bitmap;
    sheet:egret.SpriteSheet;
    row;
    column;
    gamePanel:GamePanel;

    constructor() {
        super();
        this.init();
    }

    init() {
        this.gamePanel = PanelManager.gamePanel;
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
                    break;

                case GridTypeEnum.body:
                    this.view.texture = this.sheet.getTexture("hitBody");
                    if (GameData.getInstance().keeping) {
                        EffectUtils.shakeObj(this.view);
                    }
                    break;

                case GridTypeEnum.head:
                    this.view.texture = this.sheet.getTexture("hitHead");
                    if (GameData.getInstance().keeping) {
                        EffectUtils.shakeScreen();
                    }
                    break;
            }
        } else if (this.selected) {
            this.view.texture = this.sheet.getTexture("select");
            EffectUtils.blinkEffect(this.view);
        } else {
            this.view.texture = null;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }
    }

    private onReset(e: GameEvent): void {
        if (e.type == GameEvent.GAME_RESET) {
            this.statu = false;
        }
    }

    private onEnd(e: GameEvent): void {
        TipsManager.removeTips(this);
        console.log(81);
        if (e.type == GameEvent.GAME_VICTORY) {
            this.statu = true;
        } else if (e.type == GameEvent.GAME_LOST){

        }
    }

    private onTouch(e: egret.TouchEvent): void {
        if (!this._selected) {
            this.selected = true;
            if (this.gamePanel.selectedGrid) {
                this.gamePanel.selectedGrid.selected = false;
                this.gamePanel.selectedGrid = this;
            } else {
                this.gamePanel.selectedGrid = this;
            }
        } else {
            if (this.gamePanel.selectedWeapon) {
                GameController.getInstance().useWeapon(this.column, this.row);
            }
            else {
                this.gamePanel.selectedGrid = null;
                this.statu = true;
            }
        }
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        this._selected = value;
        this.updateView();
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
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.updateView();
    }
} 