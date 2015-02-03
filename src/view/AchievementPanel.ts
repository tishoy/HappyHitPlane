/**
 * Created by tishoy on 15/1/31.
 * 成就界面
 */
class AchievementPanel extends BasePanel{
     private scrollPane: egret.ScrollView;
     private itemList:AchievementItem[];
      
    constructor() {
        super();
//         this.scrollPane = new egret.ScrollView(scrollContainter);
         this.initPanel();
     }

    /**
     * 对滑动面板测试，效果不佳
     */
    initPanel(): void {
        this.scrollPane = new egret.ScrollView();
        var achievementData: string[] = RES.getRes("description");
        var item: AchievementItem;
        for (var i = 0; i < achievementData.length; i++) {
            item = new AchievementItem();
        }

         this.addChild(this.scrollPane);
         this.scrollPane.setScrollPosition(0, 0, false);
         this.scrollPane.touchEnabled = true;

     }
 }