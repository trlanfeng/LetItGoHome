/**
 * Created by Trlanfeng on 2014/8/11.
 */

class GameApp extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.welcomescene,this);
    }

    //private GameUI:GameUI = new GameUI();
    private GameUI:GameUI = new GameUI();
    //精灵数组，用于存储所有需要的精灵一级循环
    private spriteArray:egret.Bitmap[];
    private sprite1:egret.Bitmap;
    private sprite2:egret.Bitmap;
    //private sprite3:egret.Bitmap;
    //private sprite4:egret.Bitmap;

    //欢迎场景
    public welcomescene(event:egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.welcomescene,this);
        //UI状态：start
        this.stage.addChild(this.GameUI);
        this.GameUI.start();
        this.GameUI.button_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startgame,this);
        this.GameUI.button_left.addEventListener(egret.TouchEvent.TOUCH_TAP,this.button_left_click,this);
        this.GameUI.button_right.addEventListener(egret.TouchEvent.TOUCH_TAP,this.button_right_click,this);
        this.GameUI.timer.addEventListener(egret.TimerEvent.TIMER,this.daojishi,this);
        this.GameUI.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.endgame,this);
    }
    //开始游戏
    public startgame() {
        //UI状态：play
        this.GameUI.play();
        //初始化分数为0，并开始计时
        this.GameUI.score = 0;
        this.GameUI.scorepanel.text = "分数：" + this.GameUI.score.toString();
        this.GameUI.timer.start();
        //创建精灵数组，用于存放初始化的4个精灵，其中三个显示在游戏中，一个显示在游戏外，用于向上移动
        this.spriteArray = [];
        for (var i:number=0;i<4;i++) {
            var sprite:egret.Bitmap = new egret.Bitmap();
            sprite.texture = RES.getRes(this.randomsprite());
            sprite.anchorX = 0.5;
            sprite.anchorY = 0.5;
            sprite.x = this.stage.stageWidth/2;
            if (i == 3) {
                sprite.y = -70;
            } else {
                sprite.y = this.stage.stageHeight*((155+(2-i)*120)/800);
            }
            this.spriteArray.push(sprite);
            this.stage.addChild(sprite);
        }
    }
    //左侧按钮点击事件
    public button_left_click() {
        //初始化第一个精灵的缓动
        var tw = egret.Tween.get(this.spriteArray[0]);
        if (this.spriteArray[0].texture == RES.getRes("sprite1")) {
            this.GameUI.score += 1;
            this.GameUI.scorepanel.text = "分数：" + this.GameUI.score.toString();
            tw.to({x:0,y:this.stage.stageHeight,alpah:0},100).call(this.resetsprite,this);
            for (var i:number=1;i<4;i++) {
                var twlist = egret.Tween.get(this.spriteArray[i]);
                twlist.to({y:this.stage.stageHeight*((155+(3-i)*120)/800)},100);
            }
        } else {
            //this.scorepanel.text = "游戏结束";
            this.endgame();
        }
    }
    //右侧按钮点击事件
    public button_right_click() {
        //初始化第一个精灵的缓动
        var tw = egret.Tween.get(this.spriteArray[0]);
        if (this.spriteArray[0].texture == RES.getRes("sprite2")) {
            this.GameUI.score += 1;
            this.GameUI.scorepanel.text = "分数：" + this.GameUI.score.toString();
            tw.to({x:this.stage.stageWidth,y:this.stage.stageHeight,alpah:0},100).call(this.resetsprite,this);
            for (var i:number=1;i<4;i++) {
                var twlist = egret.Tween.get(this.spriteArray[i]);
                twlist.to({y:this.stage.stageHeight*((155+(3-i)*120)/800)},100);
            }
        } else {
            //this.scorepanel.text = "游戏结束";
            this.endgame();
        }
    }
    //第一个精灵正确移动后，重置该精灵，重新选择精灵图片并添加至数组末尾
    public resetsprite() {
        this.stage.removeChild(this.spriteArray[0]);
        this.spriteArray.shift();
        var sprite:egret.Bitmap = new egret.Bitmap();
        sprite.texture = RES.getRes(this.randomsprite());
        sprite.anchorX = 0.5;
        sprite.anchorY = 0.5;
        sprite.x = this.stage.stageWidth/2;
        //sprite.y = this.stage.stageHeight*(35/800);
        sprite.y = -70;
        //sprite.visible = false;
        this.spriteArray.push(sprite);
        this.stage.addChild(sprite);
    }
    //精灵移动错误时，结束游戏，并添加重新开始按钮
    public endgame() {
        this.GameUI.stop();
        for (var i:number=0;i<4;i++) {
            this.stage.removeChild(this.spriteArray[i]);
        }
        var zongfen:number = this.GameUI.score;
        if (zongfen > 200) {
            this.GameUI.pingyu.text = "你真是太厉害了，超越了99%的人，再加把劲，一定能够突破记录的！";
        } else {
            var x:number = zongfen/222;
            var y:number = (3+(1-x)*20)/100;
            var z:number = (x + (x * y))*100;
            this.GameUI.pingyu.text = "你超越了" + z.toFixed(1).toString() +"%的人，继续加油！";
        }
    }
    //随机选择精灵图片
    public randomsprite():string {
        var spritename:string;
        var i:number;
        i = Math.random();
        if (i > 0.5) {
            spritename = "sprite1";
        } else {
            spritename = "sprite2";
        }
        return spritename;
    }
    public daojishi() {
        this.GameUI.timerpanel.text = "30";
    }
}