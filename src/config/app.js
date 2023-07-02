export default {
  // 国际化语言。'zh-cn' 中文简体 | 'zh-tw' 中文繁体 | 'en' 英文
  defaultLanguage: 'zh-cn',
  // elementplus组件尺寸。'default' 默认 | 'large' 大 | 'small' 小
  elementSize: 'default',
  // 路由来源。 'front' 前端 | 'back' 后端 | 'mixture' 混合前后端
  routeSource: 'mixture',

  // ----------------------------------------侧栏菜单--------------------------------------------------
  // 侧栏菜单是否折叠
  menuIsCollapse: false,
  // 是否只保持一个子菜单的展开
  subMenuUniqueOpened: true,

  // ----------------------------------------tabs 标签页--------------------------------------------------
  // 是否使用多标签页
  isTabs: true,
  // 标签显示图标
  tabsIcon: true,
  // 始终保持一个 tab 固定不可关闭（当所有路由的 meta.fixedTab 不为 true 时，始终保持有一个 tab 不可关闭）
  tabsOneFiexd: true,

  // ----------------------------------------过渡动画--------------------------------------------------
  // 页面切换动画。'fade' 渐变 | 'scale' 缩放 | 'slide' 滑动
  transitionNames: 'scale',
  // 是否启用页面切换动画
  isTransition: false,

  // ----------------------------------------其它设置--------------------------------------------------
  enableBacktop: true, // 是否开启主界面回到顶部

}
