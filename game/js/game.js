function game(options){
	this.container = options.container;
	this.timeLeft  = options.timeLeft;
	this.duration  = options.duration || 30;
	this.leftBtn   = options.leftBtn;
	this.rightBtn  = options.rightBtn;
	this.couples   = options.couples;
	this.gays      = options.gays;
	this.resultPage = options.resultPage;
	
	this.over          = false;//游戏结束
	this.curClickIndex = 0; //当前点击次数
	this.curSecond     = this.duration;
	this.minRandom     = 5;//最小随机数
	this.maxRandom     = 8;//最大随机数
	this.curCouples    = 0;
	this.curGays       = 0;
	
	this.curSex;
	this.curBtn;
	this.btnRandom;
	this.topAvatar;        //最上一个头像
	this.sex           = [];//性别栈
	this.avatars       = [];
	this.interval;
	this.translateX;
	this.translateY;

	this.coupleAudio;//错误提示因
	this.gayAudio;//正确提示音

	this.audioSource = [
						'sounds/sfx_hit.mp3',
						'sounds/sfx_wing.mp3'
					];
	this.audioPlay1;
	this.audioPlay2;

	this.init();
};

game.prototype = {
	//初始化函数
	init: function(){
		var i = 0 , res, win = $(window)
			winHeight = win.height(),
			winWidth = win.width();
		for(; i < 4 ; i++){
			res = this.createAvatar(i==3?1:0);
			this.sex.unshift( res.sex );
			this.avatars.unshift( res.avatar );
		}
		this.timeLeft.text(this.curSecond+'″');
		this.translateX = winWidth - 210;
		this.translateY = winHeight - 340;
		//初始按钮的性别
		this.setBtnRandom();
		this.btnRandom = this.getBtnRandom();
		this.bufferLoader();
		this.start();
	},
	//生成当个头像
	createAvatar: function(top){
       var sex = Math.round(Math.random()),//随机0，1
       	   avatar = $('<div class="avatar avatar-'+sex+'"><i></i></div>');
       	   this.container.prepend(avatar);
       	   if(top){
       	   		this.topAvatar = avatar.css({'marginTop':'-40px'}).addClass('fadeIn');
       	   } 
       	   return {sex:sex,avatar:avatar};
	},
	//游戏全程时间监听。
	gameTimeListener: function(){
		var that = this;
		this.interval = setInterval(function(){
			if(that.curSecond<1){
				clearInterval(that.interval);
				that.gameover();
				return;
			}
			that.timeLeft.text(--that.curSecond+'"');
		}, 1000);
	},
	start: function(){
		this.gameTimeListener();
		this.events();
	},
	gameover: function(){
		this.over = true;
		window.location.href = this.resultPage+'?reslut='+this.curCouples+','+this.curGays;
	},
	//情侣匹配
	matchLover: function(sex){
		var that = this;
		if(sex == this.curSex){
			this.gays.text(++this.curGays);

			this.curBtn.removeClass('errorAnimate corretAnimate');
			setTimeout(function(){
				that.curBtn.addClass('errorAnimate');
			},1);

			try{this.audioPlay1();}catch(e){}
		}else{
			this.couples.text(++this.curCouples);

			this.curBtn.removeClass('corretAnimate errorAnimate');
			setTimeout(function(){
				that.curBtn.addClass('corretAnimate');
			},1);

			try{this.audioPlay2();}catch(e){}
						
		}
	},
	//头像掉下左边函数
	avatarLeftDown: function(){
		var avatar = this.avatars.pop(), sex = this.sex.pop(), res;
		this.matchLover(sex);
		avatar.css({
			left: -this.translateX,
			bottom: -this.translateY,
			opacity:0
		});
		this.avatarDown(res, avatar);
	},
	//头像掉下右边函数
	avatarRightDown: function(){
		var avatar = this.avatars.pop(), sex = this.sex.pop(), res;
		this.matchLover(sex);
		avatar.css({
			left: this.translateX,
			bottom: -this.translateY,
			opacity:0
		});
		this.avatarDown(res, avatar);
	},
	avatarDown: function(res, avatar){
		this.avatars[0].css('marginTop',0);
		res = this.createAvatar(1);
		this.sex.unshift(res.sex);
		this.avatars.unshift(res.avatar);
		res.avatar.css('opacity',1);
		setTimeout(function(){
			avatar.remove();
		},300);	
	},
	//左边按钮事件函数
	leftBtnClick: function(){
		this.btnsRandomSwitch();
		this.avatarLeftDown();
	},
	//右边按钮事件函数
	rightBtnClick: function(){
		this.btnsRandomSwitch();
		this.avatarRightDown();
	},
	//生成按钮所需的随机数
	getBtnRandom: function(){
		var i = Math.floor(Math.random()*(this.maxRandom+1));
		if(i >= this.minRandom)return i;
		return this.getBtnRandom();
	},
	setBtnRandom: function(){
		var leftSex = parseInt(this.leftBtn.data('sex'))||Math.round(Math.random()),
			sex = [leftSex?0:1,leftSex];
		$.each([this.leftBtn, this.rightBtn], function(index){
			$(this).data('sex', sex[index]);
			$(this).removeClass('sex-btn-'+(sex[index]?0:1)).addClass('sex-btn-'+[sex[index]]);
		});		
	},
	//按钮性别随机切换
	btnsRandomSwitch: function(){
		this.curClickIndex++;
		if(this.curClickIndex > this.btnRandom){
			this.curClickIndex = 0;
			this.setBtnRandom();
		}
	},
	bufferLoader: function(params){
		function BufferLoader(context, urlList, callback) {
			this.context = context;
			this.urlList = urlList;
			this.onload = callback;
			this.bufferList = new Array();
			this.loadCount = 0;
		}

		BufferLoader.prototype.loadBuffer = function(url, index) {
			// Load buffer asynchronously
			var request = new XMLHttpRequest();
			request.open("GET", url, true);
			request.responseType = "arraybuffer";

			var loader = this;

			request.onload = function() {
				// Asynchronously decode the audio file data in request.response
				loader.context.decodeAudioData(
					request.response,
					function(buffer) {
						if (!buffer) {
							alert('error decoding file data: ' + url);
							return;
						}
						loader.bufferList[index] = buffer;
						if (++loader.loadCount == loader.urlList.length)
							loader.onload(loader.bufferList);
					},
					function(error) {
						alert('decodeAudioData error');
					}
				);
			}

			request.onerror = function() {
				alert('BufferLoader: XHR error');
			}

			request.send();
		};

		BufferLoader.prototype.load = function() {
			for (var i = 0; i < this.urlList.length; ++i)
				this.loadBuffer(this.urlList[i], i);
		};
		var that = this;
		window.onload = init;
		var bufferLoader, context;

		function init() {
			context = new webkitAudioContext();
			bufferLoader = new BufferLoader(
				context, that.audioSource,
				finishedLoading
			);
			bufferLoader.load();
		}
		
		function finishedLoading(bufferList) {
			var source1,source2;
			that.audioPlay1 = function(){
				source1 = context.createBufferSource();
				source1.buffer = bufferList[0];
				source1.connect(context.destination);
				source1.start(0);
			};
			that.audioPlay2 = function(){
				source2 = context.createBufferSource();
				source2.buffer = bufferList[1];
				source2.connect(context.destination);
				source2.start(0);
			};
		}
	},
	//全部事件绑定容器
	events: function(){
		var that = this;
		this.leftBtn.bind('touchstart', function(){
			if(that.over)return;
			that.curSex = $(this).data('sex');
			that.curBtn = $(this);
			that.leftBtnClick();
		});
		this.rightBtn.bind('touchstart', function(){
			if(that.over)return;
			that.curSex = $(this).data('sex');
			that.curBtn = $(this);
			that.rightBtnClick();
		});
	}

};