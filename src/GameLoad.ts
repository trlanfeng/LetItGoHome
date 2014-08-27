/**
 * Created by Trlanfeng on 2014/8/27.
 */
class GameLoad extends egret.DisplayObjectContainer {
    //加载资源
    private loadingview:LoadingUI;
    //初始化
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event) {
        this.loadingview = new LoadingUI();
        this.stage.addChild(this.loadingview);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/resource.json","resource/");
    }
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceLoading,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        //加载mygame组资源
        RES.loadGroup("mygame");
    }
    private onResourceLoading(event:RES.ResourceEvent):void {
        if (event.groupName == "mygame") {
            this.loadingview.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }
    private onResourceLoadComplete() {
        this.stage.removeChild(this.loadingview);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceLoading,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        //显示FPS信息
        //egret.Profiler.getInstance().run();
        //进入游戏场景
        //var gameui:GameUI = new GameUI();
        //this.stage.addChild(gameui);
        var gameapp:GameApp = new GameApp();
        this.stage.addChild(gameapp);
    }
}