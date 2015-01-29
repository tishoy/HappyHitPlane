class RecordData {
    private static instance: RecordData;

    private recordedStep: Array<StepData>;
    private currentStep: number;
    private wings: number; 
     private bottom: number; 

    constructor() {
        if (RecordData.instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }

    static getInstance(): RecordData {
        if (!this.instance) {
            this.instance = new RecordData();
        }
        return this.instance;
    }

    initialize(): void {

    }

    recordStep(gridData:GridData): void {
        var stepData: StepData = new StepData();
        this.currentStep++;
        stepData.type = gridData.gridType;
        if (stepData.type == GridTypeEnum.body) {
            stepData.bodyType = gridData.bodyType;
        }
        this.recordedStep.push(stepData);
    }

    checkAchievement(id:number): void {
        switch (id) {
            //尚未确定成就表的模式，没有策划~也是个蛋疼的事，需要自己拟定表格了。
            //爱吃鸡翅膀的成就
            case 0:
                if (this.recordedStep[this.currentStep].bodyType ==BodyGridEnum.wing) {
                    this.wings++;
                    if (this.wings > 5) {
                        //成就达成 dispatch 消息
                    }
                }
                break;
               
            case 1:
                if (this.recordedStep[this.currentStep].bodyType == BodyGridEnum.bottom) {
                    this.bottom++;
                    if (this.bottom == 3 && this.currentStep < 10) {
                        //获得翠菊之手的成就
                    }
                }
                break;

            case 2:
                for (var i = 0; i < 3; i++) {
                    if (this.recordedStep[this.currentStep - i].type == GridTypeEnum.miss) {
                        //正在进行时判断
                        //获得乌鸦惨叫的成就
                    }
                }
                break;
        }
    }
} 