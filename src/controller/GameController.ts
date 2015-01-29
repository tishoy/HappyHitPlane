class GameController {
    private static instance: GameController;

    private mapData: MapData;
    private gameData:GameData;
    private random: boolean = true;
    private copyList:Array<any>;
    private copy:number = 0;

    constructor() {
        if (GameController.instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }

    static getInstance(): GameController {
        if (!this.instance) {
            this.instance = new GameController();
        }
        return this.instance;
    }

    initialize(): void {
        this.copy = 0;
        this.mapData = MapData.getInstance();
        this.gameData = GameData.getInstance();
        if (localStorage.getItem("adventureCopy")) {
            this.copy = localStorage.getItem("adventureCopy");
        } else {
            this.copy = 0;
        }
        this.copyList = RES.getRes("copy");
        this.initMap();
    }

    initMap():void {
        this.mapData.initialize();
    }

    startCopy(copy: number = 0): void {
        this.mapData.clear();
        this.gameData.clear();
        this.gameData.model = GameModelEnum.advanture;
        this.gameData.keeping = false;
        if (copy == 0) {
            this.loadMap(this.copy);
        } else {
            this.loadMap(copy);
        }
    }

    nextCopy(): void {
        this.copy++;
        this.startCopy(this.copy);
        //localStorage.setItem("advantureCopy", this.copy.toString());
    }

    loadMap(copy:number):void {
        var currentMap: any = this.copyList[copy];
        this.gameData.mapName = currentMap.name;
        var headList:Array<number> = currentMap.head;
        var directionList:Array<number> = currentMap.direction;
        var lightList: Array<number> = currentMap.light;
        var starList: Array<number> = currentMap.step;
        this.gameData.lastStep = starList[0];
        this.gameData.oneStar = starList[0];
        this.gameData.doubleStar = starList[1];
        this.gameData.tripleStar = starList[2];
        for (var i = 0; i < headList.length; i++) {
            this.mapData.setPlaneGridByHead(headList[i], directionList[i]);
        }
        for (var j = 0; j < lightList.length; j++) {
            var grid: GridView = <GridView>PanelManager.gamePanel.getChildByName("grid" + (lightList[j].toString()));
            if (this.mapData.map[lightList[j]].gridType == GridTypeEnum.head) {
                this.gameData.headTimes++;
            }
            grid.statu = true;
        }
        this.startGame();
    }

    commonGame(): void {
        this.mapData.clear();
        this.gameData.clear();
        this.gameData.model = GameModelEnum.common;
        this.gameData.keeping = false;
        while (this.mapData.numPlane < 3) {
            this.addPlane();
            if (this.mapData.numPlane == 3) {
                this.startGame();
            }
        }
    }

    infiniteGame(): void {
       
    }

    getGridViewType(column: number, row: number): number {
        var grid: GridData = MapData.getInstance().getMapGrid(column, row);
        GameController.getInstance().logHitResult(grid.gridType);
        RecordData.getInstance().recordStep(grid);
        return grid.gridType;

    }

    logHitResult(gridType: number): void {
        switch (gridType) {
            case GridTypeEnum.head:
                this.gameData.headTimes++;
                break;

            case GridTypeEnum.body:
                if (this.gameData.keeping) {
                    this.gameData.bodyTimes++;
                }
                break;

            case GridTypeEnum.miss:
                if (this.gameData.keeping) {
                    this.gameData.missTimes++;
                }
                break;

            default:
                egret.Logger.info("no this grid type");
                return;
        }
        if (this.gameData.keeping) {
            this.gameData.hitTimes++;
            if (this.gameData.model == GameModelEnum.advanture) {
                this.gameData.lastStep--;
            }
        }
        this.gameData.keeping = this.gameData.keeping;
    }

    addPlane(): void {
        var direction: number = 0;
        var headColumn: number = 0;
        var headRow: number = 0;
        
        if (this.random) {
            direction = Math.floor(Math.random() * 4);
            switch (direction) {
                case DirectionTypeEnum.up:
                    headColumn = 2 + Math.floor(Math.random() * 5);
                    headRow = Math.floor(Math.random() * 6);
                    break;
                case DirectionTypeEnum.right:
                    headColumn = 3 + Math.floor(Math.random() * 6);
                    headRow = 2 + Math.floor(Math.random() * 5);
                    break;
                case DirectionTypeEnum.down:
                    headColumn = 2 + Math.floor(Math.random() * 5);
                    headRow = 3 + Math.floor(Math.random() * 6);
                    break;
                case DirectionTypeEnum.left:
                    headColumn = Math.floor(Math.random() * 6);
                    headRow = 2 + Math.floor(Math.random() * 5);
                    break;
            }
            //处理特殊情况，无法放置三架飞机的情况！！！
            if (this.mapData.setPlaneGrid(headColumn, headRow, direction)) {
                this.mapData.numPlane++;
            } 
        }
    }

    endGame(): void {
        this.gameData.keeping = false;
        //Global.dispatchEvent(MainNotify.closeGameOverPanelNotify, null, false);
    }

    startGame(): void {
        this.gameData.keeping = true;
    }
} 