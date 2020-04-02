//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {  // 创建一个Mian类 扩展 ...



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);  // 调用onAddToStage
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })

    }

    private async runGame() {
        await this.loadResource()   // 加载资源
        this.createGameScene();     // 创建游戏场景
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            await RES.loadGroup("cardBackground", 0, loadingView)  // 加载刚加入的图片
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private topMask: egret.Shape;
    private startBtn: egret.Shape;
    private overBtn: egret.Shape;
    private nextBtn: egret.Shape;
    private startText: egret.TextField;
    private overText: egret.TextField;
    private nextText: egret.TextField;

    private cards;   // 所有卡片数组
    private count = 0;    // 卡片动态显示时所记录的数字
    private clickArr = [];  // 点击卡片时所存放的数据
    // 游戏配置
    private init = {
        text: ["春眠不觉晓", "处处闻亭鸟", "夜来风雨声","夜来风雨声"], // 游戏中显示的文字
        startTextNum: 0,        // 从第几个开始
        col: 5,   // 列
        row: 5,   // 行
        gao_kuan: 1.3,      // 高/宽   比例
        kunxi: 30,         // 卡片间的空隙
        textNum: 5,
        title: "《春晓》",
        backgroundImage: "cx_png",
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let sky = this.createBitmapByName(this.init.backgroundImage);
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH / 3;
        sky.y = 2 * stageH / 3 - 100;


        // 创建卡片
        
        let newCardArr = this.createNewArr();
        let cards = [];
        newCardArr.forEach((element, index) => {
            // 创建卡片内容
            let shape:egret.Shape = new egret.Shape();
            shape.graphics.beginFill(0x0000ff);
            shape.graphics.drawRect( (index % this.init.col) * (this.stage.stageWidth / (this.init.col + 3) + this.init.kunxi) + (this.stage.stageWidth - this.stage.stageWidth / (this.init.col + 3) * this.init.col - this.init.kunxi * (this.init.col - 1)) / 2, (Math.floor(index / this.init.col)) * ((this.stage.stageWidth / (this.init.col + 3)) * this.init.gao_kuan + this.init.kunxi) + 80, this.stage.stageWidth / (this.init.col + 3), (this.stage.stageWidth / (this.init.col + 3)) * this.init.gao_kuan );
            shape.graphics.endFill();
            this.addChild( shape );
            let cardWord = new egret.TextField();
            this.addChild(cardWord);
            cardWord.width = this.stage.stageWidth / (this.init.col + 3);
            cardWord.height = (this.stage.stageWidth / (this.init.col + 3)) * this.init.gao_kuan;
            cardWord.x = (index % this.init.col) * (cardWord.width + this.init.kunxi) + (this.stage.stageWidth - cardWord.width * this.init.col - this.init.kunxi * (this.init.col - 1)) / 2;
            cardWord.y = (Math.floor(index / this.init.col)) * (cardWord.height + this.init.kunxi) + 80;
            cardWord.textColor = 0xffffff;
            cardWord.size = 40;
            cardWord.backgroundColor = 0xffffff;
            cardWord.text = element > 0 ? this.init.text[this.init.startTextNum].split('')[element - 1] : "";  // 文本内容
            cardWord.textAlign = egret.HorizontalAlign.CENTER;
            cardWord.verticalAlign = egret.VerticalAlign.MIDDLE;
            cardWord.name = String(element);

            // 创建卡片图片
            let card = this.createBitmapByName("cardBg_jpg");
            this.addChild(card);
            card.width = this.stage.stageWidth / (this.init.col + 3);
            card.height = (this.stage.stageWidth / (this.init.col + 3)) * this.init.gao_kuan;
            card.x = (index % this.init.col) * (card.width + this.init.kunxi) + (this.stage.stageWidth - card.width * this.init.col - this.init.kunxi * (this.init.col - 1)) / 2;
            card.y = (Math.floor(index / this.init.col)) * (card.height + this.init.kunxi) + 80;
            card.name = String(element);
            card.touchEnabled = false;
            card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cardClick, this, true);
            cards.push(card);
        });
        this.cards = cards;

        // 遮罩层
        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        topMask.graphics.endFill();
        this.addChild(topMask);
        this.topMask = topMask;


        // 开始按钮
        let startBtn = new egret.Shape();
        startBtn.graphics.beginFill(0x00ff00, 1);
        startBtn.graphics.drawRect(0, 0, 140, 80);
        startBtn.x = this.stage.stageWidth / 2 - 70;
        startBtn.y = 400;
        this.addChild(startBtn);
        this.startBtn = startBtn;
        startBtn.touchEnabled = true;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this, false);

        let startText = new egret.TextField();
        this.addChild(startText);
        startText.x = this.stage.stageWidth / 2 - 70;
        startText.y = 400;
        startText.width = 140;
        startText.height = 80;
        startText.textColor = 0xffffff;
        startText.text = '开始游戏'
        startText.textAlign = egret.HorizontalAlign.CENTER;
        startText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.startText = startText;

        // 结束按钮
        let overBtn = new egret.Shape();
        overBtn.graphics.beginFill(0xff0000, 1);
        overBtn.graphics.drawRect(0, 0, 140, 80);
        overBtn.x = this.stage.stageWidth / 2 - 70;
        overBtn.y = 400;
        overBtn.alpha = 0;
        this.addChild(overBtn);
        this.overBtn = overBtn;
        overBtn.touchEnabled = false;
        overBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.overClick, this, false);

        let overText = new egret.TextField();
        this.addChild(overText);
        overText.x = this.stage.stageWidth / 2 - 70;
        overText.y = 400;
        overText.width = 140;
        overText.height = 80;
        overText.textColor = 0xffffff;
        overText.alpha = 0;
        overText.text = '游戏结束'
        overText.textAlign = egret.HorizontalAlign.CENTER;
        overText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.overText = overText;

        // 下一关按钮
        let nextBtn = new egret.Shape();
        nextBtn.graphics.beginFill(0x0000ff, 1);
        nextBtn.graphics.drawRect(0, 0, 140, 80);
        nextBtn.x = this.stage.stageWidth / 2 - 70;
        nextBtn.y = 400;
        nextBtn.alpha = 0;
        this.addChild(nextBtn);
        this.nextBtn = nextBtn;
        nextBtn.touchEnabled = false;
        nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextClick, this, true)

        let nextText = new egret.TextField();
        this.addChild(nextText);
        nextText.x = this.stage.stageWidth / 2 - 70;
        nextText.y = 400;
        nextText.width = 140;
        nextText.height = 80;
        nextText.alpha = 0;
        nextText.textColor = 0xffffff;
        nextText.text = '下一关'
        nextText.textAlign = egret.HorizontalAlign.CENTER;
        nextText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.nextText = nextText;
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 点击开始按钮事件
     * @param evt 事件
     */
    private startClick(evt: egret.TouchEvent) {
        this.startBtn.touchEnabled = false; // 开始按钮不能点击
        console.log(`游戏开始`);
        this.cardAnimation();
        this.topMask.alpha = 0;
        this.startBtn.alpha = 0;
        this.startText.alpha = 0;
    }

    /**
     * 点击游戏结束按钮
     * @param evt 
     */
    private overClick(evt: egret.TouchEvent) {
        this.overBtn.touchEnabled = false; // 开始按钮不能点击
        console.log(`游戏已经结束了`);
    }

    /**
     * 点击下一关
     * @param evt 
     */
    private nextClick(evt: egret.TouchEvent) {
        this.nextBtn.touchEnabled = false; // 开始按钮不能点击
        console.log(`下一局`);
        this.count = 0;
        this.clickArr = []; 
        this.nextBtn.alpha = 0;
        this.nextText.alpha = 0;
        this.topMask.alpha = 0;
        this.init.startTextNum += 1;
        this.runGame();

    }
    
    /**
     * 点击卡片事件
     * @param evt 
     */
    private cardClick(evt: egret.TouchEvent) {
        evt.target.alpha = 0;
        this.clickArr.push(evt.target.name);
        this.isSame(evt.target.name); 
    }

    /**
     * 判断点击的是否正确
     * @param wordId 传入的文本的id字符串
     */
    private isSame(wordId: string) {
        if(this.clickArr.length >= this.init.textNum) {
            this.nextGame();
        }
        if(this.clickArr.length == Number(wordId)){
            console.log(`相同的`)
        } else { 
            this.overGame();
        }

    }

    /**
     * 游戏结束函数
     */
    private overGame() {
        console.log(`游戏结束......`);
        this.topMask.alpha = 1;
        this.overBtn.alpha = 1;
        this.overText.alpha = 1;
        this.overBtn.touchEnabled = true;
        this.cards.forEach(e => {
            e.touchEnabled = false;
        });
    }

    /**
     * 下一关函数
     */
    private nextGame() {
        this.topMask.alpha = 1;
        this.nextBtn.alpha = 1;
        this.nextText.alpha = 1;
        this.cards.forEach(e => {
            e.touchEnabled = false;
        });
        if(this.init.startTextNum == this.init.text.length - 1) {
            console.log(`已经是最后一关`);
        } else {
            this.nextBtn.touchEnabled = true;
        }
    }

    /**
     * 卡片动态显示
     * @param result 
     */
    private cardAnimation() {
        let timer:egret.Timer = new egret.Timer(1000,(this.init.textNum + 1));
        //注册事件侦听器
        timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
        timer.start();
    }

    /**
     * 计时器执行函数
     */  
    private timerFunc() {
        this.cards.forEach(e => {
            if(this.count <= 5 && e.name == String(this.count)) {
                e.alpha = 1;
            }
        });
        this.count ++;
        this.cards.forEach(e => {
            if(this.count <= 5 && e.name == String(this.count)) {
                e.alpha = 0;
            }
        });  
    }

    /**
     * 计时器结束函数
     */
    private timerComFunc(){
        this.count = 0;
        console.log("计时结束");
        this.cards.forEach(element => {         
            element.touchEnabled = true;
        });

    }

    /**
     * 返回添加了空卡片的数组
     */
    private createNewArr() {
        let newArr = []
        // 插入空白区域
        for(let i = 0; i < this.init.col * this.init.row; i ++) {
            if(i < this.init.textNum) {
                newArr.push(i + 1);
            }else{
                newArr.push("");
            }
        }
        // 打乱顺序
        newArr.sort(function () {
            return Math.random() > 0.5 ? 1 : -1;
        })
        console.log(newArr);
        return newArr;
    }
}

