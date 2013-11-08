## $.drag() / iDrag()

调用`$.drag()` / `iDrag()` 将返回实例对象

### 配置参数

<table>
<thead>
            <tr>
              <th>参数</th>
              <th>类型</th>
              <th>默认值</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>target</td>
              <td>string/object</td>
              <td>undefined</td>
              <td>拖拽前，鼠标按下的有效区。</td>
            </tr>
            <tr>
              <td>root</td>
              <td>string/object</td>
              <td>上面target的jQuery对象</td>
              <td>拖拽时，移动的对象。</td>
            </tr>
            <tr>
              <td>min</td>
              <td>object</td>
              <td>undefined</td>
              <td>默认情况下可以是无穷小。如min:{x:0, y:0},表示移动的最小坐标不能小于(0,0)。</td>
            </tr>
            <tr>
              <td>max</td>
              <td>object</td>
              <td>undefined</td>
              <td>默认情况下可以是无穷大。如min:{x:100, y:100},表示移动的最小坐标不能大于(100,100)。</td>
            </tr>
            <tr>
              <td>start</td>
              <td>function</td>
              <td>undefined</td>
              <td>鼠标按下时的回调函数，第一个参数是一个对象{x,y}，保存的值是现在鼠标到视图窗口的坐标值</td>
            </tr>
            <tr>
              <td>move</td>
              <td>function</td>
              <td>undefined</td>
              <td>拖拽过程的回调函数，第一个参数是一个对象{x,y}，保存当前root元素的位置坐标。</td>
            </tr>
            <tr>
              <td>end</td>
              <td>function</td>
              <td>undefined</td>
              <td>拖拽结束时的回调函数，第一个参数是一个对象{x,y}，保存当前root元素的位置坐标。</td>
            </tr>
            <tr>
              <td>fixed</td>
              <td>boolean</td>
              <td>false</td>
              <td>表示root的定位模式是不是position:fixed。内部已经封装IE6兼容实现方法。</td>
            </tr>
          </tbody>
        </table>
		
## $.dialog() / iDialog()

调用`$.dialog()` / `iDialog()` 将返回实例对象

### 配置参数	

<table>
          <thead>
            <tr>
              <th>参数</th>
              <th>类型</th>
              <th>默认值</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>string</td>
              <td>时间戳+new Date()</td>
              <td>添加id可以防止生成多个同样对话框的结构，亦可通过$.dialog.get(id)方法获取该实例。</td>
            </tr>
            <tr>
              <td>title</td>
              <td>string</td>
              <td>消息</td>
              <td>对话框的标题</td>
            </tr>
            <tr>
              <td>content</td>
              <td>string/object</td>
              <td>对话宽的内容</td>
              <td>可以是普通的html字符串，或者是DOM节点对象。</td>
            </tr>
            <tr>
              <td>width</td>
              <td>int</td>
              <td>内容的宽度</td>
              <td>不设置宽度时将会根据内容宽度来设置宽度，亦可手动设置。</td>
            </tr>
            <tr>
              <td>height</td>
              <td>int</td>
              <td>内容的高度</td>
              <td>不设置高度时将会根据内容高度来设置宽度，亦可手动设置。</td>
            </tr>
           <tr>
              <td>left</td>
              <td>int</td>
              <td>让对话框在视图下居中的值</td>
              <td></td>
            </tr>
            <tr>
              <td>top</td>
              <td>int</td>
              <td>对话框在视图区域，黄金比例的值</td>
              <td></td>
            </tr>
            <tr>
              <td>padding</td>
              <td>string/int</td>
              <td>20</td>
              <td></td>
            </tr>
            <tr>
              <td>fixed</td>
              <td>boolean</td>
              <td>false</td>
              <td>表示root的定位模式是不是position:fixed。内部已经封装IE6兼容实现方法。</td>
            </tr>
            <tr>
              <td>lock</td>
              <td>boolean</td>
              <td>false</td>
              <td>是否显示遮罩</td>
            </tr>
            <tr>
              <td>opacity</td>
              <td>number</td>
              <td>0.3</td>
              <td>遮罩层的透明度</td>
            </tr>
            <tr>
              <td>background</td>
              <td>string</td>
              <td>'#000'</td>
              <td>遮罩层的颜色</td>
            </tr>
            <tr>
              <td>follow</td>
              <td>string/object</td>
              <td>false</td>
              <td>对话框展现时，是否跟随follow元素的位置</td>
            </tr>
            <tr>
              <td>drag</td>
              <td>boolean</td>
              <td>true</td>
              <td>对话框是否可以拖拽</td>
            </tr>
            <tr>
              <td>effect</td>
              <td>string</td>
              <td>'db-scale'</td>
              <td>对话框打开是的动画的样式类名类(css3动画)</td>
            </tr>
            <tr>
              <td>init</td>
              <td>function</td>
              <td>undefined</td>
              <td>对话框初始化时的回调函数</td>
            </tr>
            <tr>
              <td>show</td>
              <td>function</td>
              <td>function(){}</td>
              <td>对话框打开时的回调函数，当return false时，将阻止默认的打开函数</td>
            </tr>
            <tr>
              <td>close</td>
              <td>function</td>
              <td>function(){}</td>
              <td>对话框关闭时的回调函数，当return false时，将阻止默认的关闭函数</td>
            </tr>
          </tbody>
        </table>
		
## 外部方法		

<table>
          <thead>
            <tr>
              <th>函数</th>
              <th>参数</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>$.dialog.get()</td>
              <td>string</td>
              <td>传入在使用$.dialog()初始化时设置的id，将获得该实例的对象。</td>
            </tr>
          </tbody>
        </table>
		
* 在实例化`$.dialog()`时，得到的对象中包含着这许多属性成员和方法成员，这就给了使用者更加灵活的调用，例如动态改变对话框的标题、大小、位置、内容等。

* 除了表格《调用`$.dialog()` 将返回实例对象》上面罗列出来的成员，下面罗列出其它的成员：	

### 属性/方法成员

<table>
          <thead>
            <tr>
              <th>成员</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>$lock</td>
              <td>jQuery object</td>
              <td>遮罩层节点的jQuery 对象</td>
            </tr>
            <tr>
              <td>$dialog</td>
              <td>jQuery object</td>
              <td>对话框最外层的元素</td>
            </tr>
            <tr>
              <td>$title</td>
              <td>jQuery object</td>
              <td>标题节点的jQuery 对象</td>
            </tr>
            <tr>
              <td>$content</td>
              <td>jQuery object</td>
              <td>内容节点的jQuery 对象</td>
            </tr>
            <tr>
              <td>$close</td>
              <td>jQuery object</td>
              <td>关闭按钮节点的jQuery 对象</td>
            </tr>
            <tr>
              <td>show</td>
              <td>function</td>
              <td>显示对话框</td>
            </tr>
            <tr>
              <td>hide</td>
              <td>function</td>
              <td>关闭对话框</td>
            </tr>
            <tr>
              <td>content</td>
              <td>function</td>
              <td>设置对话框的显示内容</td>
            </tr>
          </tbody>
        </table>
		
		