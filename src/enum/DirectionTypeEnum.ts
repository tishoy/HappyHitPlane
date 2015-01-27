class DirectionTypeEnum{
    static directionList:number[] = [27, -3, -27, 3];
    /**
      *  上
      */
    static up: number = 0;
    /**
      *  右
      */
    static right: number = 1;
    /**
      *  下
      */
    static down: number = 2;
    /**
      *  左
      */
    static left: number = 3;

    static getGridByDirection(direction:number): number[] {
        switch (direction) {
        case DirectionTypeEnum.up:
            return [7, 8, 9, 10, 11, 18, 26, 27, 28];

        case DirectionTypeEnum.right:
            return [-19, -12, -10, -3, -2, -1, 6, 8, 17];

        case DirectionTypeEnum.down:
            return [-7, -8, -9, -10, -11, -18, -26, -27, -28];

        case DirectionTypeEnum.left:
            return [-17, -8, -6, 1, 2, 3, 10, 12, 19];

        default:
            egret.Logger.info("direction error");
            return [];
        }
    }
} 