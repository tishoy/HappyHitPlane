class AchievementPanel extends BasePanel{
     private scrollPane: egret.ScrollView;
     private itemList:AchievementItem[];
      
    constructor() {
        super();
//         this.scrollPane = new egret.ScrollView(scrollContainter);
         this.initView();
     }

    initView(): void {
        this.scrollPane = new egret.ScrollView();
        var achievementData: string[] = RES.getRes("description");
        var item: AchievementItem;
        for (var i = 0; i < achievementData.length; i++) {
            item = new AchievementItem();
            this.scrollPane.addChild(item);
        }

         this.addChild(this.scrollPane);
         this.scrollPane.setScrollPosition(0, 0, false);
         this.scrollPane.touchEnabled = true;

     }
 }