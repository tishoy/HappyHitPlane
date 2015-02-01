
class GameApp extends egret.DisplayObjectContainer {
    /**
     * ���ؽ��Ƚ���
     */
    private loadingPanel:LoadingPanel;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event: egret.Event) {
        egret.Injector.mapClass(RES.AnalyzerBase, RES.PropertiesAnalyzer, RES.PropertiesAnalyzer.TYPE);

        this.addChild(GameConfig.gameScene());

        //��ʼ��Resource��Դ���ؿ�
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }
    /**
     * �����ļ���������,��ʼԤ����preload��Դ�顣
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("loading");
    }
    /**
     * preload��Դ����������
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            PopUpManager.removePopUp(this.loadingPanel);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        } else if (event.groupName == "loading") {
            this.loadingPanel = new LoadingPanel();
            PopUpManager.addPopUp(this.loadingPanel);
            RES.loadGroup("preload");
        }

    }
    /**
     * preload��Դ�����ؽ���
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingPanel.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * ������Ϸ����
     */
    private createGameScene(): void {
        PanelManager.initPanel();
        window["onorientationchange"] = function(){
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(MainNotify.onOrientationChange,window["orientation"],false));
            if(GlobalData.isVerticalGame && GlobalData.initIsVertical && (window["orientation"] != 0)){
                location.reload();
            }
            if(GlobalData.isVerticalGame&&GameConfig.isVertical()){
                NativeApi.showVerticalTips(true);
            }else if(GlobalData.isVerticalGame&&!GameConfig.isVertical()){
                NativeApi.removeVerticalTips();
            }
        }; 
        if(GlobalData.isVerticalGame&&GameConfig.isVertical()){
            NativeApi.showVerticalTips();
        }
        Global.dispatchEvent(MainNotify.openStartPanelNotify, null, false);

        //Global.shareToWeiXin("EGER���ٿ�������", "EGER�����������У�������ȡ��ʾ�����ɣ�", "http://wx.9ria.com/games/eger", "http://wx.9ria.com/games/eger/resource/assets/icon.png");
    }

}


