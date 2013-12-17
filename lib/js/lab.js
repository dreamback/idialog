~function(iDialog, $, undefined){
function corner(options) {
    this.id = options.id || 'cornerDialog';
    this.width = options.width;
    this.height = options.height;
    this.title = options.title;
    this.content = options.content || 'loading';

    this.dialog = null;
    this.init();
};

corner.prototype = {
    init: function() {
        var that = this;
        iDialog({
            id: this.id,
            title: this.title,
            width: this.width,
            height: this.height,
            lock: false,
            effect: false,
            fixed: true,
            drag: false,
            content: this.content,
            show: function() {
                if (!-[1,] && !window.XMLHttpRequest) {
                    this.$dialog[0].style.setExpression('top', 'eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight)');
                    this.$dialog[0].style.setExpression('left', 'eval(document.documentElement.scrollLeft+document.documentElement.clientWidth-this.offsetWidth)');
                    this.$dialog[0].style.display = 'block';
                    this.$dialog[0].style.height = 0;
                } else {
                    this.$dialog.css({
                        top: 'auto',
                        left: 'auto',
                        right: 0,
                        bottom: 0,
                        height: 0,
                        display: 'block'
                    });
                }
                that.dialog = this.$dialog;
                that.show();
                return false;
            },
            hide: function() {
                that.hide();
                return false;
            }
        });
    },
    show: function() {
        this.dialog.animate({
            height: this.height
        },
        800);
        // this.dialog.show().height(this.height)
    },
    hide: function(height) {
        // this.dialog.animate({
        //     height: height || 0
        // },
        // 800,
        // function() {
        //     $(this).hide();
        // });
        this.dialog.hide();
    }
};
$.cornerDialog = function(options) {
    return new corner(options);
};
}(iDialog, jQuery);
