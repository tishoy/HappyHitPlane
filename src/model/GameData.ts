/**
 * Created by tishoy on 15/1/31.
 */
class GameData{
    private static instance: GameData;
    public model: number;
    private _keeping:boolean = false;
    private _hitTimes: number;
    private _missTimes: number;
    private _bodyTimes: number;
    private _headTimes: number;
    mapName:string;
    private _lastSetp: number;
    private _result: number;
    oneStar:number;
    doubleStar:number;
    tripleStar: number;

    constructor() {
        if (GameData.instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }

    static getInstance(): GameData {
        if (!this.instance) {
            this.instance = new GameData();
        }
        return this.instance;
    }

    initialize(): void {
        this._hitTimes = 0;
        this._missTimes = 0;
        this._bodyTimes = 0;
        this._headTimes = 0;
        this._lastSetp = 0;
        this.model = 0;
    }

    clear(): void {
        this._hitTimes = 0;
        this._missTimes = 0;
        this._bodyTimes = 0;
        this._headTimes = 0;
    }

    private  checkGameOver(): boolean {
        if (this.headTimes != 3) {
            return true;
        } else {
            return false;
        }
    }

    set hitTimes(value: number) {
        this._hitTimes = value;
    }

    get hitTimes(): number {
        return this._hitTimes;
    }

    set missTimes(value: number) {
        this._missTimes = value;
    }

    get missTimes(): number {
        return this._missTimes;
    }

    set bodyTimes(value: number) {
        this._bodyTimes = value;
    }

    get bodyTimes(): number {
        return this._bodyTimes;
    }

    set headTimes(value: number) {
        this._headTimes = value;
    }

    get headTimes(): number {
        return this._headTimes;
    }

    set lastStep(value: number) {
        this._lastSetp = value;
        if (this._lastSetp == 0) {
            if (this.checkGameOver()) {
                this.keeping = false;
                GameController.getInstance().endGame();
            } 
        } 
    }

    get lastStep(): number {
        return this._lastSetp;
    }

    set keeping(value: boolean) {
        if (this._keeping == value) {
            if (this._keeping == true) {
                Global.dispatchEvent(GameEvent.GAME_CONTINUE,null,false);
                if (this.headTimes == 3) {
                    this._result = GameResultEnum.victory;
                    this._keeping = false;
                    GameController.getInstance().endGame();
                    if (this._lastSetp > 0) {
                        if (this._lastSetp > this.oneStar - this.doubleStar) {
                            if (this._lastSetp > this.oneStar - this.tripleStar) {
                                
                            }
                        }
                    }
                    Global.dispatchEvent(GameEvent.GAME_VICTORY,null,false);
                } else if (this.model == GameModelEnum.advanture && this.lastStep == 0) {
                    this._result = GameResultEnum.lost;
                    this._keeping = false;
                    GameController.getInstance().endGame();
                    Global.dispatchEvent(GameEvent.GAME_LOST, null, false);
                }
            } else {
                Global.dispatchEvent(GameEvent.GAME_RESET, null, false);
            }
            return;
        } else {
            this._keeping = value;
        if (this._keeping) {
                Global.dispatchEvent(GameEvent.GAME_START, null, false);
            } 
        }
    }

    get keeping():boolean {
        return this._keeping;
    }

    get result(): number {
        return this._result;
    }
}