/**
 * jQuery拖拽 & 弹出层
 * API: http://dreamback.github.io/idialog/
 * @author: heshimeng1987@qq.com
 */
~function($, window, undefined) {
    var win = $(window),
        doc = $(document),
        ie = $.browser.msie,
        version = parseInt($.browser.version),
        ie6 = ie && version < 7,
        dialog,
        dialogZindex = 1e4;

    //插入皮肤
    (function(){
        var script = document.getElementsByTagName('script'),
            i = 0,
            len = script.length,
            link = document.createElement('link'),
            theme,
            path;
            link.setAttribute('rel', 'stylesheet');
        for( ; i < len; i++){
            theme = script['dialog-theme']||script[i].getAttribute('dialog-theme');
            if(theme){
                path = (script[i].src||script[i].getAttribute('src'));
                path = path.substring(0, path.lastIndexOf('/'))+'/theme/';
                link.setAttribute('href', path+theme+'/style.css');
                script[i].parentNode.insertBefore(link, script[i]);
                break;
            }
        }
    })();

    drag = function(target, options) {
        return new drag.fn.init(target, options);
    };

    drag.fn = drag.prototype = {
        init: function(options) {

            var that           = this,
            ie6fix             = '(document.documentElement || document.body)';
            this.target        = $(options.target);
            options            = options || {};
            this.root          = options.root ? $(options.root) : this.target;
            this.min           = options.min;
            this.max           = options.max;
            this.start         = options.start;
            this.move          = options.move;
            this.end           = options.end;
            this.fixed         = options.fixed;
            this.startPosition = {};
            this.movePosition  = {};
            
            var _down = function(e) {
                e = that.fixEvent(e);
                that.startPosition = {
                    x: e.layerX,
                    y: e.layerY
                };
                that.start && that.start(that.startPosition);
                doc.bind('mousemove', _move)
                    .bind('mouseup', _end);
                this.setCapture && this.setCapture(false); //ie 鼠标移出浏览器依然可以拖拽
                e.preventDefault(); //阻止默认行为，chrome的拖拽选择文字行为
                return false;
            },
            _move = function(e) {
                e = that.fixEvent(e);

                that.movePosition = {
                    x: e.clientX - that.startPosition.x,
                    y: e.clientY - that.startPosition.y
                };
                that.limit();
                if (that.fixed && ie6) { //IE6 fixed
                    that.root[0].style.setExpression('left', 'eval(' + ie6fix + '.scrollLeft + ' + (that.movePosition.x - win.scrollLeft()) + ') + "px"');
                    that.root[0].style.setExpression('top', 'eval(' + ie6fix + '.scrollTop + ' + (that.movePosition.y - win.scrollTop()) + ') + "px"');
                } else {
                    that.root.css({
                        left: that.movePosition.x,
                        top: that.movePosition.y
                    });
                }
                that.move && that.move(that.movePosition);
                return false;
            },
            _end = function() {
                doc.unbind('mousemove', _move)
                    .unbind('mouseup', _end);
                that.end && that.end(that.movePosition);
                return false;
            };

            this.target.bind('mousedown', _down).bind('mouseup', function() {
                this.releaseCapture && this.releaseCapture();
            });
        },
        fixEvent: function(e) {
            if (!e.pageX) {
                e.pageX = e.clientX + win.scrollTop();
                e.pageY = e.clientY + win.scrollLeft();
            }
            if (!e.layerX) {
                e.layerX = e.clientX - parseInt(this.root.css('left'));
                e.layerY = e.clientY - parseInt(this.root.css('top'));
            }
            return e;
        },
        /**
         * 限制
         */
        limit: function() {
            if (this.min !== undefined) {
                this.movePosition = {
                    x: Math.max(this.min.x, this.movePosition.x),
                    y: Math.max(this.min.y, this.movePosition.y)
                };
            }
            if (this.max !== undefined) {
                this.movePosition = {
                    x: Math.min(this.max.x, this.movePosition.x),
                    y: Math.min(this.max.y, this.movePosition.y)
                };
            }
        }
    };
    drag.fn.init.prototype = drag.fn;
    window.iDrag = $.drag = drag;

    dialog = function(options) {
        if (options.id  && dialog.get[options.id] !== undefined) {
            dialog.get[options.id].show();
            return dialog.get[options.id];
        }
        return new dialog.fn.init(options);
    };

    dialog.fn = dialog.prototype = {
        init: function(options) {
            this.id         = options.id;
            this._lock      = options.lock || false;
            this.fixed      = options.fixed || false;
            this.width      = options.width || 'auto';
            this.height     = options.height || 'auto';
            this.top        = options.top;
            this.left       = options.left;
            this.padding    = options.padding || 20;
            this._content   = options.content || 'loading...';
            this._init      = options.init;
            this._show      = options.show || function(){};
            this._hide      = options.hide || function(){};
            this.opacity    = options.opacity === undefined ? .3 : options.opacity;
            this.background = options.background || '#000';
            this.title      = options.title === undefined ? '消息' : options.title;
            this.follow     = options.follow === undefined ? false : $(options.follow);
            this.drag       = options.drag === undefined ? true : options.drag;
            this.effect     = options.effect === undefined ? 'i-scale' : options.effect;
            this.esc        = options.esc===undefined ? true : options.esc;
            this.time       = options.time;
            this.inited     = false;
            this.myDrag     = {};
            this._btn       = options.btn;
            
            this.$body      = $(document.body);

            this.show();
            this.events();
            this._init && this._init.call(this);
        },
        lock: function() {
            var lock = document.createElement('div');
            this.$lock = $(lock).addClass('i-dialog-lock').css({
                zIndex: ++dialogZindex,
                height: doc.height(),
                background: this.background
            }).html(!ie6 ? '' : '<iframe src="about:blank"></iframe>');
            this.$body[0].appendChild(lock);
        },
        createHTML: function() {
            this._lock && this.lock();
            this.inited = true;
            var dialog = document.createElement('div'),
                html = '',
                that = this;
            if (this.title!==false) {
                html = '<div class="target">' +
                    '<h2 class="title">' + this.title + '</h2>' +
                    '<a href="javascript:void(0);" title="关闭" class="close">×</a>' +
                    '</div>';
            }
            html += '<div class="content"></div>';
            if(this._btn) html+='<div class="wrapBtn"></div>';
            this.$body[0].appendChild(dialog);
            this.$dialog = $(dialog).addClass('i-dialog').html(html).css({
                zIndex: ++dialogZindex,
                width: this.width,
                height: this.height
            });
            this.$dialog.find('*').each(function(){
                that[ '$'+this.className ] = $(this);
                this.className = 'i-'+this.className;
            });
            this.$content.css({
                padding: this.padding
            });
            this.effect&&this.$dialog.addClass(this.effect);
            this._btn && this.btn(this._btn,1);
            if(this.drag){
                this.myDrag = $.drag({
                    target: this.$target,
                    root: this.$dialog,
                    fixed: this.fixed
                });
            }else{
                this.$target.css('cursor','default');
            }
            this.setPosition();
            this.content();
            if(this.title===false){
                this.$dialog.css({background:'none',boxShadow:'none',borderRadius:0,border:'none'});
            }
        },
        content: function(content) {
            this._content = content || this._content;
            if (typeof this._content == 'string') {
                this.$content.html(this._content);
            } else if (typeof this._content == 'object' && this._content.nodeType === 1) {
                this.$content[0].appendChild(this._content);
                this._content.style.display='block';
            }
            return this;
        },
        setPosition: function() {
            if (this.fixed) {
                if (!ie6) {
                    this.$dialog.css({
                        position: 'fixed'
                    });
                } else {
                    this.$dialog.css({
                        position: 'absolute'
                    });
                    $('html').css({
                        backgroundImage: 'url(about:blank)',
                        backgroundAttachment: 'fixed'
                    });
                }
            } else {
                this.$dialog.css({
                    position: 'absolute'
                });
            }
        },
        show: function() {
            !this.inited && this.createHTML();
            if(this.id && !dialog.get[this.id]){
                dialog.get[this.id] = this;
            }
            if(this._show.call(this)===false)return;
            if(this._lock){
                this.$lock.show();
                ie&&version<9&&this.$lock.css({opacity: this.opacity});
            }
            this.width = this.$dialog.width();
            this.height = this.$dialog.height();
            var winWidth = win.width(),
                winHeight = win.height(),
                scrollLeft = win.scrollLeft(),
                scrollTop = win.scrollTop(),
                that = this;
            this.follow&&this._follow();
            this.$dialog.show().css({
                top: this.top!==undefined?this.top : ((winHeight - this.height)*.382  + (ie6 || !this.fixed ? scrollTop : 0)),
                left: this.top!==undefined?this.left : ((winWidth - this.width) / 2 + (ie6 || !this.fixed ? scrollLeft : 0)),
                width: this.width,
                height: this.height
            });
            this.width = this.$dialog.outerWidth();
            this.height = this.$dialog.outerHeight();
            setTimeout(function() {
                that._lock && that.$lock.css({
                    opacity: that.opacity
                });
                that.effect&&that.$dialog.addClass('i-show');
            }, this.effect?50:0);    
            this.time = this.time ? setTimeout(function(){that.hide();}, this.time) : 0;
        },
        _follow: function(){
            var offset = this.follow.offset(),
                width  = parseInt(this.follow.outerWidth()),
                height = parseInt(this.follow.outerHeight()),
                scrollTop = win.scrollTop(),
                scrollLeft = win.scrollLeft(),
                winWidth = win.width(),
                winHeight = win.height(),
                maxTop = scrollTop+winHeight-this.height,
                maxLeft = scrollLeft+winWidth-this.width;
            this.top = offset.top + height;
            this.left = offset.left-(this.width-width)/2;

            this.top = this.top >  maxTop ? offset.top-this.height : this.top;
            this.left = this.left > maxLeft ? maxLeft : this.left;
        },
        hide: function() {
            if(this._hide.call(this)===false)return;
            var style = this.$dialog[0].style,
                time = 0,
                that = this;
            if (style.transform !== undefined || style.webkitTransform !== undefined ||
                style.mozTransform !== undefined || style.msTransform !== undefined) {
                time = 300;
            }
            this.$dialog.removeClass('i-show');
            this._lock && this.$lock.css({
                opacity: 0
            });
            this.time && clearTimeout(this.time);
            setTimeout(function() {
                that._lock && that.$lock.hide();
                that.$dialog.hide();
            }, this.effect?time:0);
        },
        events: function() {
            var that = this,
                timeout = null;
            win.bind('resize', function() {
                timeout && clearTimeout(timeout);
                timeout = setTimeout(function() {
                    that.limit();
                    (parseInt(that.$dialog.css('left'))>that.myDrag.max.x)&&that.$dialog.css('left',that.myDrag.max.x);
                    (parseInt(that.$dialog.css('top'))>that.myDrag.max.y)&&that.$dialog.css('top',that.myDrag.max.y);
                }, 100);
            });
            this.$close && this.$close.bind('click', function() {
                that.hide();
            });
            this.$lock && this.$lock.bind('dblclick', function() {
                that.hide();
            });
            this.esc&&doc.bind('keyup', function(e) {
                if (e.keyCode == 27&&that.$dialog.css('display')!='none'){
                     that.hide();
                }
            });
            this.$dialog.bind('mousedown', function () {
                $.each(dialog.get, function(){
                    if(this.$dialog.zIndex == dialogZindex)this.$dialog.css({zIndex:dialogZindex-1});
                });
                $(this).css({zIndex:dialogZindex});
            })
            //设置限制拖拽区域
            if(this.drag){
                this.myDrag.start = function() {
                    that.limit();
                }
            };
        },
        limit: function(){
            var winWidth = win.width(),
                winHeight = win.height(),
                scrollLeft = win.scrollLeft(),
                scrollTop = win.scrollTop();
            this.myDrag.min = {
                x: 0,
                y: 0
            };                
            if (this.fixed && ie6) {
                this.myDrag.min = {
                    x: scrollLeft,
                    y: scrollTop
                };
            }
            if (this.fixed) {
                this.myDrag.max = !ie6 ? {
                    x: winWidth - this.width,
                    y: winHeight - this.height
                } : {
                    x: winWidth + scrollLeft - this.width,
                    y: winHeight + scrollTop - this.height
                };
            } else {
                this.myDrag.max = {
                    x: winWidth - this.width,
                    y: doc.height() - this.height
                };
            }
        },
        btn: function(btns,type){
            var input, that = this;
                $.each(btns, function(key){
                    input = (!type&&that._btn[key]) ? that._btn[key].input : document.createElement('input');
                    input.type = 'button';
                    input.value = this.val||input.value;
                    input.className = this.type || input.className || '';
                    if(this.disabled === true){
                        input.disabled = 'disabled';
                        input.className += ' i-disabled';
                    }else if(this.disabled === false){
                        input.disabled = '';
                        input.className = input.className.replace(' i-disabled','');  
                    }
                    if(type||!that._btn[key])that.$wrapBtn.append(input);
                    if(!that._btn[key])that._btn[key] = this;
                    that._btn[key].input = input;

                    input.onclick = this.click ? (function(self){
                        return function(){
                         if((self.click&&false !== self.click.call(that, this))||!self.click)that.hide();   
                        }
                    })(this) : input.onclick || function(){that.hide()};
                });
        }
    };

    dialog.fn.init.prototype = dialog.fn;
    window.iDialog = $.dialog = dialog;

    dialog.get = {};
    window.iDialog.get = $.dialog.get = dialog.get;

}(jQuery, this);

