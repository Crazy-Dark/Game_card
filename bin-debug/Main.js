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
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.count = 0; // 卡片动态显示时所记录的数字
        _this.clickArr = []; // 点击卡片时所存放的数据
        // 游戏配置
        _this.init = {
            text: ["春眠不觉晓", "处处闻亭鸟", "夜来风雨声", "夜来风雨声"],
            startTextNum: 0,
            col: 5,
            row: 5,
            gao_kuan: 1.3,
            kunxi: 30,
            textNum: 5,
            title: "《春晓》",
            backgroundImage: "cx_png",
        };
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this); // 调用onAddToStage
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()]; // 加载资源
                    case 1:
                        _a.sent(); // 加载资源
                        this.createGameScene(); // 创建游戏场景
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 3:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("cardBackground", 0, loadingView)]; // 加载刚加入的图片
                    case 3:
                        _a.sent(); // 加载刚加入的图片
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var _this = this;
        var sky = this.createBitmapByName(this.init.backgroundImage);
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH / 3;
        sky.y = 2 * stageH / 3 - 100;
        // 创建卡片
        var newCardArr = this.createNewArr();
        var cards = [];
        newCardArr.forEach(function (element, index) {
            // 创建卡片内容
            var shape = new egret.Shape();
            shape.graphics.beginFill(0x0000ff);
            shape.graphics.drawRect((index % _this.init.col) * (_this.stage.stageWidth / (_this.init.col + 3) + _this.init.kunxi) + (_this.stage.stageWidth - _this.stage.stageWidth / (_this.init.col + 3) * _this.init.col - _this.init.kunxi * (_this.init.col - 1)) / 2, (Math.floor(index / _this.init.col)) * ((_this.stage.stageWidth / (_this.init.col + 3)) * _this.init.gao_kuan + _this.init.kunxi) + 80, _this.stage.stageWidth / (_this.init.col + 3), (_this.stage.stageWidth / (_this.init.col + 3)) * _this.init.gao_kuan);
            shape.graphics.endFill();
            _this.addChild(shape);
            var cardWord = new egret.TextField();
            _this.addChild(cardWord);
            cardWord.width = _this.stage.stageWidth / (_this.init.col + 3);
            cardWord.height = (_this.stage.stageWidth / (_this.init.col + 3)) * _this.init.gao_kuan;
            cardWord.x = (index % _this.init.col) * (cardWord.width + _this.init.kunxi) + (_this.stage.stageWidth - cardWord.width * _this.init.col - _this.init.kunxi * (_this.init.col - 1)) / 2;
            cardWord.y = (Math.floor(index / _this.init.col)) * (cardWord.height + _this.init.kunxi) + 80;
            cardWord.textColor = 0xffffff;
            cardWord.size = 40;
            cardWord.backgroundColor = 0xffffff;
            cardWord.text = element > 0 ? _this.init.text[_this.init.startTextNum].split('')[element - 1] : ""; // 文本内容
            cardWord.textAlign = egret.HorizontalAlign.CENTER;
            cardWord.verticalAlign = egret.VerticalAlign.MIDDLE;
            cardWord.name = String(element);
            // 创建卡片图片
            var card = _this.createBitmapByName("cardBg_jpg");
            _this.addChild(card);
            card.width = _this.stage.stageWidth / (_this.init.col + 3);
            card.height = (_this.stage.stageWidth / (_this.init.col + 3)) * _this.init.gao_kuan;
            card.x = (index % _this.init.col) * (card.width + _this.init.kunxi) + (_this.stage.stageWidth - card.width * _this.init.col - _this.init.kunxi * (_this.init.col - 1)) / 2;
            card.y = (Math.floor(index / _this.init.col)) * (card.height + _this.init.kunxi) + 80;
            card.name = String(element);
            card.touchEnabled = false;
            card.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.cardClick, _this, true);
            cards.push(card);
        });
        this.cards = cards;
        // 遮罩层
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        topMask.graphics.endFill();
        this.addChild(topMask);
        this.topMask = topMask;
        // 开始按钮
        var startBtn = new egret.Shape();
        startBtn.graphics.beginFill(0x00ff00, 1);
        startBtn.graphics.drawRect(0, 0, 140, 80);
        startBtn.x = this.stage.stageWidth / 2 - 70;
        startBtn.y = 400;
        this.addChild(startBtn);
        this.startBtn = startBtn;
        startBtn.touchEnabled = true;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this, false);
        var startText = new egret.TextField();
        this.addChild(startText);
        startText.x = this.stage.stageWidth / 2 - 70;
        startText.y = 400;
        startText.width = 140;
        startText.height = 80;
        startText.textColor = 0xffffff;
        startText.text = '开始游戏';
        startText.textAlign = egret.HorizontalAlign.CENTER;
        startText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.startText = startText;
        // 结束按钮
        var overBtn = new egret.Shape();
        overBtn.graphics.beginFill(0xff0000, 1);
        overBtn.graphics.drawRect(0, 0, 140, 80);
        overBtn.x = this.stage.stageWidth / 2 - 70;
        overBtn.y = 400;
        overBtn.alpha = 0;
        this.addChild(overBtn);
        this.overBtn = overBtn;
        overBtn.touchEnabled = false;
        overBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.overClick, this, false);
        var overText = new egret.TextField();
        this.addChild(overText);
        overText.x = this.stage.stageWidth / 2 - 70;
        overText.y = 400;
        overText.width = 140;
        overText.height = 80;
        overText.textColor = 0xffffff;
        overText.alpha = 0;
        overText.text = '游戏结束';
        overText.textAlign = egret.HorizontalAlign.CENTER;
        overText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.overText = overText;
        // 下一关按钮
        var nextBtn = new egret.Shape();
        nextBtn.graphics.beginFill(0x0000ff, 1);
        nextBtn.graphics.drawRect(0, 0, 140, 80);
        nextBtn.x = this.stage.stageWidth / 2 - 70;
        nextBtn.y = 400;
        nextBtn.alpha = 0;
        this.addChild(nextBtn);
        this.nextBtn = nextBtn;
        nextBtn.touchEnabled = false;
        nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextClick, this, true);
        var nextText = new egret.TextField();
        this.addChild(nextText);
        nextText.x = this.stage.stageWidth / 2 - 70;
        nextText.y = 400;
        nextText.width = 140;
        nextText.height = 80;
        nextText.alpha = 0;
        nextText.textColor = 0xffffff;
        nextText.text = '下一关';
        nextText.textAlign = egret.HorizontalAlign.CENTER;
        nextText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.nextText = nextText;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 点击开始按钮事件
     * @param evt 事件
     */
    Main.prototype.startClick = function (evt) {
        this.startBtn.touchEnabled = false; // 开始按钮不能点击
        console.log("\u6E38\u620F\u5F00\u59CB");
        this.cardAnimation();
        this.topMask.alpha = 0;
        this.startBtn.alpha = 0;
        this.startText.alpha = 0;
    };
    /**
     * 点击游戏结束按钮
     * @param evt
     */
    Main.prototype.overClick = function (evt) {
        this.overBtn.touchEnabled = false; // 开始按钮不能点击
        console.log("\u6E38\u620F\u5DF2\u7ECF\u7ED3\u675F\u4E86");
    };
    /**
     * 点击下一关
     * @param evt
     */
    Main.prototype.nextClick = function (evt) {
        this.nextBtn.touchEnabled = false; // 开始按钮不能点击
        console.log("\u4E0B\u4E00\u5C40");
        this.count = 0;
        this.clickArr = [];
        this.nextBtn.alpha = 0;
        this.nextText.alpha = 0;
        this.topMask.alpha = 0;
        this.init.startTextNum += 1;
        this.runGame();
    };
    /**
     * 点击卡片事件
     * @param evt
     */
    Main.prototype.cardClick = function (evt) {
        evt.target.alpha = 0;
        this.clickArr.push(evt.target.name);
        this.isSame(evt.target.name);
    };
    /**
     * 判断点击的是否正确
     * @param wordId 传入的文本的id字符串
     */
    Main.prototype.isSame = function (wordId) {
        if (this.clickArr.length >= this.init.textNum) {
            this.nextGame();
        }
        if (this.clickArr.length == Number(wordId)) {
            console.log("\u76F8\u540C\u7684");
        }
        else {
            this.overGame();
        }
    };
    /**
     * 游戏结束函数
     */
    Main.prototype.overGame = function () {
        console.log("\u6E38\u620F\u7ED3\u675F......");
        this.topMask.alpha = 1;
        this.overBtn.alpha = 1;
        this.overText.alpha = 1;
        this.overBtn.touchEnabled = true;
        this.cards.forEach(function (e) {
            e.touchEnabled = false;
        });
    };
    /**
     * 下一关函数
     */
    Main.prototype.nextGame = function () {
        this.topMask.alpha = 1;
        this.nextBtn.alpha = 1;
        this.nextText.alpha = 1;
        this.cards.forEach(function (e) {
            e.touchEnabled = false;
        });
        if (this.init.startTextNum == this.init.text.length - 1) {
            console.log("\u5DF2\u7ECF\u662F\u6700\u540E\u4E00\u5173");
        }
        else {
            this.nextBtn.touchEnabled = true;
        }
    };
    /**
     * 卡片动态显示
     * @param result
     */
    Main.prototype.cardAnimation = function () {
        var timer = new egret.Timer(1000, (this.init.textNum + 1));
        //注册事件侦听器
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        timer.start();
    };
    /**
     * 计时器执行函数
     */
    Main.prototype.timerFunc = function () {
        var _this = this;
        this.cards.forEach(function (e) {
            if (_this.count <= 5 && e.name == String(_this.count)) {
                e.alpha = 1;
            }
        });
        this.count++;
        this.cards.forEach(function (e) {
            if (_this.count <= 5 && e.name == String(_this.count)) {
                e.alpha = 0;
            }
        });
    };
    /**
     * 计时器结束函数
     */
    Main.prototype.timerComFunc = function () {
        this.count = 0;
        console.log("计时结束");
        this.cards.forEach(function (element) {
            element.touchEnabled = true;
        });
    };
    /**
     * 返回添加了空卡片的数组
     */
    Main.prototype.createNewArr = function () {
        var newArr = [];
        // 插入空白区域
        for (var i = 0; i < this.init.col * this.init.row; i++) {
            if (i < this.init.textNum) {
                newArr.push(i + 1);
            }
            else {
                newArr.push("");
            }
        }
        // 打乱顺序
        newArr.sort(function () {
            return Math.random() > 0.5 ? 1 : -1;
        });
        console.log(newArr);
        return newArr;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
