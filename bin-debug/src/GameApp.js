/**
* Created by Trlanfeng on 2014/8/11.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameApp = (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        _super.call(this);
        //private GameUI:GameUI = new GameUI();
        this.GameUI = new GameUI();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.welcomescene, this);
    }
    //private sprite3:egret.Bitmap;
    //private sprite4:egret.Bitmap;
    //欢迎场景
    GameApp.prototype.welcomescene = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.welcomescene, this);

        //UI状态：start
        this.stage.addChild(this.GameUI);
        this.GameUI.start();
        this.GameUI.button_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startgame, this);
        this.GameUI.button_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_left_click, this);
        this.GameUI.button_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_right_click, this);
        this.GameUI.timer.addEventListener(egret.TimerEvent.TIMER, this.daojishi, this);
        this.GameUI.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.endgame, this);
    };

    //开始游戏
    GameApp.prototype.startgame = function () {
        //UI状态：play
        this.GameUI.play();

        //初始化分数为0，并开始计时
        this.GameUI.score = 0;
        this.GameUI.scorepanel.text = "分数：" + this.GameUI.score.toString();
        this.GameUI.timer.start();

        //创建精灵数组，用于存放初始化的4个精灵，其中三个显示在游戏中，一个显示在游戏外，用于向上移动
        this.spriteArray = [];
        for (var i = 0; i < 4; i++) {
            var sprite = new egret.Bitmap();
            sprite.texture = RES.getRes(this.randomsprite());
            sprite.anchorX = 0.5;
            sprite.anchorY = 0.5;
            sprite.x = this.stage.stageWidth / 2;
            if (i == 3) {
                sprite.y = -70;
            } else {
                sprite.y = this.stage.stageHeight * ((155 + (2 - i) * 120) / 800);
            }
            this.spriteArray.push(sprite);
            this.stage.addChild(sprite);
        }
    };

    //左侧按钮点击事件
    GameApp.prototype.button_left_click = function () {
        //初始化第一个精灵的缓动
        var tw = egret.Tween.get(this.spriteArray[0]);
        if (this.spriteArray[0].texture == RES.getRes("sprite1")) {
            this.GameUI.score += 1;
            this.GameUI.scorepanel.text = "分数：" + this.GameUI.score.toString();
            tw.to({ x: 0, y: this.stage.stageHeight, alpah: 0 }, 100).call(this.resetsprite, this);
            for (var i = 1; i < 4; i++) {
                var twlist = egret.Tween.get(this.spriteArray[i]);
                twlist.to({ y: this.stage.stageHeight * ((155 + (3 - i) * 120) / 800) }, 100);
            }
        } else {
            //this.scorepanel.text = "游戏结束";
            this.endgame();
        }
    };

    //右侧按钮点击事件
    GameApp.prototype.button_right_click = function () {
        //初始化第一个精灵的缓动
        var tw = egret.Tween.get(this.spriteArray[0]);
        if (this.spriteArray[0].texture == RES.getRes("sprite2")) {
            this.GameUI.score += 1;
            this.GameUI.scorepanel.text = "分数：" + this.GameUI.score.toString();
            tw.to({ x: this.stage.stageWidth, y: this.stage.stageHeight, alpah: 0 }, 100).call(this.resetsprite, this);
            for (var i = 1; i < 4; i++) {
                var twlist = egret.Tween.get(this.spriteArray[i]);
                twlist.to({ y: this.stage.stageHeight * ((155 + (3 - i) * 120) / 800) }, 100);
            }
        } else {
            //this.scorepanel.text = "游戏结束";
            this.endgame();
        }
    };

    //第一个精灵正确移动后，重置该精灵，重新选择精灵图片并添加至数组末尾
    GameApp.prototype.resetsprite = function () {
        this.stage.removeChild(this.spriteArray[0]);
        this.spriteArray.shift();
        var sprite = new egret.Bitmap();
        sprite.texture = RES.getRes(this.randomsprite());
        sprite.anchorX = 0.5;
        sprite.anchorY = 0.5;
        sprite.x = this.stage.stageWidth / 2;

        //sprite.y = this.stage.stageHeight*(35/800);
        sprite.y = -70;

        //sprite.visible = false;
        this.spriteArray.push(sprite);
        this.stage.addChild(sprite);
    };

    //精灵移动错误时，结束游戏，并添加重新开始按钮
    GameApp.prototype.endgame = function () {
        this.GameUI.stop();
        for (var i = 0; i < 4; i++) {
            this.stage.removeChild(this.spriteArray[i]);
        }
        var zongfen = this.GameUI.score;
        if (zongfen > 200) {
            this.GameUI.pingyu.text = "你真是太厉害了，超越了99%的人，再加把劲，一定能够突破记录的！";
        } else {
            var x = zongfen / 222;
            var y = (3 + (1 - x) * 20) / 100;
            var z = (x + (x * y)) * 100;
            this.GameUI.pingyu.text = "你超越了" + z.toFixed(1).toString() + "%的人，继续加油！";
        }
    };

    //随机选择精灵图片
    GameApp.prototype.randomsprite = function () {
        var spritename;
        var i;
        i = Math.random();
        if (i > 0.5) {
            spritename = "sprite1";
        } else {
            spritename = "sprite2";
        }
        return spritename;
    };
    GameApp.prototype.daojishi = function () {
        this.GameUI.timerpanel.text = "30";
    };
    return GameApp;
})(egret.DisplayObjectContainer);
GameApp.prototype.__class__ = "GameApp";
