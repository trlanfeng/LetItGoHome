var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Trlanfeng on 2014/8/27.
*/
var GameUI = (function (_super) {
    __extends(GameUI, _super);
    //private GameApp:GameApp = new GameApp();
    function GameUI() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initUI, this);
    }
    //private GameApp:GameApp = new GameApp();
    GameUI.prototype.initUI = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.initUI, this);

        //创建游戏背景
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("bg");
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;
        this.addChild(bg);

        //添加开始游戏按钮
        this.button_start = new egret.Bitmap();
        this.button_start.texture = RES.getRes("button");
        this.button_start.anchorX = 0.5;
        this.button_start.anchorY = 0.5;
        this.button_start.x = this.stage.stageWidth / 2;
        this.button_start.y = this.stage.stageHeight / 2;
        this.button_start.touchEnabled = true;
        this.addChild(this.button_start);

        //添加开始游戏按钮文字
        this.button_start_text = new egret.TextField();
        this.button_start_text.text = "开始";
        this.button_start_text.anchorX = 0.5;
        this.button_start_text.anchorY = 0.5;
        this.button_start_text.x = this.button_start.x;
        this.button_start_text.y = this.button_start.y;
        this.addChild(this.button_start_text);

        //添加分数面板
        this.score = 0;
        this.scorepanel = new egret.TextField();
        this.scorepanel.width = 200;
        this.scorepanel.textAlign = egret.HorizontalAlign.CENTER;
        this.scorepanel.anchorX = 0.5;
        this.scorepanel.x = this.stage.stageWidth / 2;
        this.scorepanel.textColor = 0xffffff;
        this.scorepanel.fontFamily = "微软雅黑";
        this.addChild(this.scorepanel);

        //添加评语面板
        this.pingyu = new egret.TextField();
        this.pingyu.width = 200;
        this.pingyu.textAlign = egret.HorizontalAlign.CENTER;
        this.pingyu.anchorX = 0.5;
        this.pingyu.x = this.stage.stageWidth / 2;
        this.pingyu.textColor = 0xffffff;
        this.pingyu.fontFamily = "微软雅黑";
        this.pingyu.size = 18;
        this.pingyu.y = 150;
        this.addChild(this.pingyu);

        //添加计时功能
        this.timerpanel = new egret.TextField();
        this.timerpanel.width = 200;
        this.timerpanel.textAlign = egret.HorizontalAlign.CENTER;
        this.timerpanel.anchorX = 0.5;
        this.timerpanel.x = this.stage.stageWidth / 2;
        this.timerpanel.textColor = 0xffffff;
        this.timerpanel.fontFamily = "微软雅黑";
        this.addChild(this.timerpanel);
        this.timer = new egret.Timer(30000, 1);

        //创建用于游戏的控制按钮
        this.button_left = new egret.Bitmap();
        this.button_left.texture = RES.getRes("button");
        this.button_left.x = 15;
        this.button_left.y = this.stage.stageHeight - 65;
        this.button_left.width = 50;
        this.button_left.height = 50;
        this.button_left.touchEnabled = true;
        this.addChild(this.button_left);
        this.button_right = new egret.Bitmap();
        this.button_right.texture = RES.getRes("button");
        this.button_right.x = this.stage.stageWidth - 65;
        this.button_right.y = this.stage.stageHeight - 65;
        this.button_right.width = 50;
        this.button_right.height = 50;
        this.button_right.touchEnabled = true;
        this.addChild(this.button_right);
    };
    GameUI.prototype.start = function () {
        this.button_start.visible = true;
        this.button_start_text.y = this.button_start.y;
        this.button_start_text.text = "开始";
        this.button_start_text.visible = true;
        this.button_left.visible = false;
        this.button_right.visible = false;
        this.timerpanel.visible = false;
        this.scorepanel.visible = false;
        this.pingyu.visible = false;
    };
    GameUI.prototype.play = function () {
        this.button_start.visible = false;
        this.button_start_text.visible = false;
        this.button_left.visible = true;
        this.button_right.visible = true;
        this.timerpanel.visible = true;
        this.scorepanel.visible = true;
        this.scorepanel.size = 18;
        this.scorepanel.text = "分数：" + this.score.toString();
        this.scorepanel.y = this.stage.stageHeight - 50;
        this.pingyu.visible = false;
    };
    GameUI.prototype.stop = function () {
        this.button_start.y = 300;
        this.button_start.visible = true;
        this.button_start_text.y = this.button_start.y;
        this.button_start_text.text = "重新开始";
        this.button_start_text.visible = true;
        this.button_left.visible = false;
        this.button_right.visible = false;
        this.timerpanel.visible = false;
        this.scorepanel.size = 28;
        this.scorepanel.y = 200;
        this.scorepanel.visible = true;
        this.pingyu.visible = true;
    };
    return GameUI;
})(egret.DisplayObjectContainer);
GameUI.prototype.__class__ = "GameUI";
