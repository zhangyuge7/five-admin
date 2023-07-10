export default {
  // 国际化语言。'zh-cn' 中文简体 | 'zh-tw' 中文繁体 | 'en' 英文
  defaultLanguage: 'zh-cn',
  // elementplus组件尺寸。'default' 默认 | 'large' 大 | 'small' 小
  elementSize: 'default',

  // ----------------------------------------布局配置--------------------------------------------------
  // 布局类型。'default' 默认 | 'singleAside' 单侧栏(经典) | 'doubleAside' 双侧栏 | 'crosswise' 横向上下布局 | 'mixture' 混合导航布局
  layoutType: 'doubleAside',

  // ----------------------------------------侧栏菜单--------------------------------------------------
  // 侧栏菜单是否折叠
  menuIsCollapse: false,
  // 是否只保持一个子菜单的展开
  subMenuUniqueOpened: true,
  // 是否永远显示主菜单标题
  isMainMenuShowTitle: true,

  // ----------------------------------------tabs 标签页--------------------------------------------------
  // 是否使用多标签页
  isTabs: true,
  // 标签显示图标
  tabsIcon: true,
  // 始终保持一个 tab 固定不可关闭（当所有路由的 meta.fixedTab 不为 true 时，始终保持有一个 tab 不可关闭）
  tabsOneFiexd: true,
  // tabs风格。'' 风格一 | 'border-card' 风格二
  tabsType: '',

  // ----------------------------------------过渡动画--------------------------------------------------
  // 页面切换动画。'fade' 渐变 | 'scale' 缩放 | 'slide' 滑动
  transitionNames: 'fade',
  // 是否启用页面切换动画
  isTransition: true,

  // ----------------------------------------页脚--------------------------------------------------
  showFooter: false, // 是否显示页脚
  // 页脚显示的文本内容,可以使用多语言翻译模板
  footerText: 'Copyright © 2023 ZhangYuge 拥有所有版权',

  // ----------------------------------------其它设置--------------------------------------------------

  enableBacktop: true, // 是否开启主界面回到顶部

  // ----------------------------------------固定配置（不在应用配置中出现）--------------------------------------------------
  // 路由来源。 'front' 前端 | 'back' 后端 | 'mixture' 前后端都加载
  routeSource: 'mixture',
  dynamicTitle: true, // 动态 html 标题
  enableGray: false, // 开启灰色模式

}
