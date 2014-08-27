var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Trlanfeng on 2014/8/27.
*/
var GameLoad = (function (_super) {
    __extends(GameLoad, _super);
    //初始化
    function GameLoad() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    GameLoad.prototype.onAddToStage = function (event) {
        this.loadingview = new LoadingUI();
        this.stage.addChild(this.loadingview);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    GameLoad.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoading, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);

        //加载mygame组资源
        RES.loadGroup("mygame");
    };
    GameLoad.prototype.onResourceLoading = function (event) {
        if (event.groupName == "mygame") {
            this.loadingview.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    GameLoad.prototype.onResourceLoadComplete = function () {
        this.stage.removeChild(this.loadingview);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoading, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);

        //显示FPS信息
        //egret.Profiler.getInstance().run();
        //进入游戏场景
        //var gameui:GameUI = new GameUI();
        //this.stage.addChild(gameui);
        var gameapp = new GameApp();
        this.stage.addChild(gameapp);
    };
    return GameLoad;
})(egret.DisplayObjectContainer);
GameLoad.prototype.__class__ = "GameLoad";
