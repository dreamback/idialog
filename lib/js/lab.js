function cornerDialog(options) {
	this.id = options.id || 'cornerDialog';
	this.width = options.width;
	this.height = options.width;
	this.title = options.title;
	this.content = options.content || 'loading';

	this.init();
};

cornerDialog.prototype = {
	init: function() {
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
				if (!-[1, ] && !window.XMLHttpRequest) {
					this.$dialog[0].style.setExpression('top', 'eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0))');
					this.$dialog[0].style.setExpression('left', 'eval(document.documentElement.scrollLeft+document.documentElement.clientWidth-this.offsetWidth)-(parseInt(this.currentStyle.marginLeft,10)||0)-(parseInt(this.currentStyle.marginRight,10)||0)');
				} else {
					this.$dialog.css({
						top: 'auto',
						left: 'auto',
						right: 0,
						bottom: 0,
						height: 0,
						width: this.width
					});
				}
				this.$dialog.show().animate({
					height: this.height
				}, 800);
				return false;
			},
			hide: function() {
				this.$dialog.animate({
					height: 0
				}, 800, function() {
					$(this).hide();
				});
				return false;
			}
		});
	}
};
iDialog.cornerDialog = function(options) {
	return new cornerDialog(options);
};