## iDrag & iDialog 介绍

### 特点： 

iDialog.js依赖于jquery编写的简单易用的对话框，同时还可以通过添加css3，改变对话框的展现动画。
提供了两个方法：

- 1、拖拽函数 iDrag() 或 $.drag();
- 2、对话框函数 iDialog() 或 $.dialog(); 

### 跨平台兼容: 

兼容：IE6+、Firefox、Chrome等主流浏览器(其它暂时没条件测试)。并且IE6下也能支持现代浏览器的静止定位(fixed)、覆盖下拉控件。 

### 渐进增强的体验: 

确保IE家族功能完善的前提下，现代浏览器适当的添加css3增强体验，如阴影、圆角、和`scale show`、`super scale show` 、`right slide show`动画,动画亦可自己修改css文件进行扩展。 

### 丰富的接口: 

1．`$.drag()`函数，提供了拖拽范围设置，拖拽前，拖拽过程，拖拽结束的回调函数；
2．`$.dialog()`函数，提供了css3展示特效、大小、位置、显示、关闭和外部访问接口等，更多参考后面的`API`。 

### 快速入门：

``` html
<script src="lib/js/jquery-1.8.3.min.js"></script>
<script src="lib/js/jquery.dialog.plugin.js" dialog-theme="default"></script>
```

* `jquery.iDialog.js`是依赖jquery实现的，所以加载它之前必须加载jQuery;
* `dialog-theme="default"`表示将自动加载`default.css`样式表;
* `default.css`必须保存在theme文件夹里，且该文件夹与`jquery.iDialog.js`需在同一目录下。

### iDrag()完整例子:

JS代码： 

``` javascript
 var log = $('#drag-demo-log');
  iDrag({
    target:'#drag-demo',
    min:{x:0, y:0},
    max:{x:658, y:170},
    start: function (pos) {
      log.html('start:x='+pos.x+', y='+pos.y);
    },
    move: function(pos){
      log.html('move:left='+pos.x+', top='+pos.y);
    },
    end: function(pos){
       log.html('end:left='+pos.x+', top='+pos.y);
    }
  });
```

###  iDialog()例子:

``` javascript
  iDialog({
      title:'Hello World',
      id:'DemoDialog  ',
      content:'<p>大家好：<br> 我是minDialog</p>',
      lock: true,
      width:500,
      fixed: true,
      height:300
  }); 
```

### 更多>> 

更多方法请查看[API](API.html)

任何问题可以联系：heshimeng1987@qq.com 