# 权限

## 路由与菜单的权限控制

+ 前端权限解决方案为根据角色值决定路由是否过滤。
  + 在运行时获取到用户信息后，前端路由信息首次加载，公共路由信息二次加载时，根据路由的元数据 meta 中的 roles 与用户信息中的 roles 取交集，如果有值则将路由添加到路由器，并显示菜单，否则过滤掉。
+ 后端权限解决方案，建议在后端处理，前端不过滤 meta.roles 为空值（非 [] 空数组）的路由信息，后端构建 元数据 meta 时不关注 roles 即可

## 权限指令

* 角色权限指令

  * v-hasRole:or     值可以为字符串和数组，角色值匹配其一就显示组件
  * v-hasRole:all    值只可以是数组，当前用户角色必须包含val中的所有值才为 true
  * v-hasRole        v-hasRole:or 的简写

* 权限标识符指令

  * v-hasPerm:or   值可以为字符串和数组，权限标识码匹配其一就显示组件
  * v-hasPerm:all   值只可以是数组，权限标识码全部包含才显示组件
  * v-hasPerm     v-hasPerm:or 的简写

  

# 路由

## 路由来源配置

+ 在 '/src/config/app.js' 中配置路由的来源。'front' 前端 | 'back' 后端 | 'mixture' 混合前后端
+ 'front'：只加载前端路由文件中的路由
+ 'back'：只加载后端请求的路由
+ 'mixture'：前端路由文件中的路由 及 后端请求的路由都会被加载
+ 无论哪个配置，路由在加载时都会根据 path 去重 ，根据 meta.sort 排序，只对一级菜单有效。同时也会根据 meta.roles 做权限过滤。

## 公共路由

+ 在 '/src/router/commonRoutes.js' 中定义的路由信息为公共路由信息

+ 公共路由无论是前端控制的路由还是后端控制的路由，公共路由都会被加载。
+ 公共路由在路由器创建时就会被加载进路由器，在运行时还会再次被加载，以保证可以根据角色过滤及决定在 layout 内显示还是在 layout 外显示。

## meta

+ 路由对象的 meta 如果为空，路由则不显示在菜单中

```json
{
    title:'标题', // 在菜单中显示的标题。（必填）
    icon:'el:home', // 在菜单中显示的图标。（选填）
    isHide: Boolean, // 是否在菜单中隐藏。（选填，默认为 false）
    hideChildren: Boolean, // 是否在菜单中隐藏所有子级。（选填，默认为 false）。注意，只有当 isHide 为 true 时生效
    link:String, // 外链接地址。（选填）。当 isIframe 为 false 时，新窗口打开；isIframe 为 true 时，内嵌 iframe 内打开
    isIframe:Boolean, // 是否为 iframe 内嵌外链接。（选填，默认为 false）
    isOuter:Boolean, // 在 layout 框架外打开。（选填，默认为 false）。如登录页面，数据大屏等。
    roles:Array, // 角色权限。（选填，默认为 空 值）为 [] 时所有角色都不显示，为 空 值时所有角色都显示，当没有权限时 hideChildren 永远为 true
    sort:Number, // 菜单排序显示。（选填）。只对一级菜单有效。
    isKeep:Boolean, //是否缓存组件实例。（选填，默认为 false）。注意：组件必须声明 name ，并且组件的 name 要与对应路由的 name 匹配
    transition:String, // 页面切换动画。（选填）。只对页面有效，目录无效
}

// 后端获取路由时注意
{
    roles:null | undefind, // 建议不填。为null或不定义都可以，否则将把路由的权限交给前端处理
    sort:Number, // 建议填，否则可能出现与预想排序不一致
}

```



# 菜单



# 全局事件总线

# 过渡动画
