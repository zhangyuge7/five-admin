export const defaultLanguages = [
  { label: '中文简体', value: 'zh-cn' },
  { label: '中文繁体', value: 'zh-tw' },
  { label: 'EN', value: 'en' },
]
export const elementSizes = [
  { label: 'size.default', value: 'default' },
  { label: 'size.large', value: 'large' },
  { label: 'size.small', value: 'small' },
]
export const layoutTypes = [
  { label: '单侧栏(经典)', value: 'singleAside' },
  { label: '双侧栏', value: 'doubleAside' },
  { label: '横向上下布局', value: 'crosswise' },
  { label: '混合导航布局', value: 'mixture' },
  // { label: '默认', value: 'default' },
]

export const tabsTypes = [
  { label: '风格一', value: 'card' },
  { label: '风格二', value: 'border-card' },
  { label: '风格三', value: '' },
]

export const transitionNames = [
  { label: '渐变', value: 'fade' },
  { label: '缩放', value: 'scale' },
  { label: '滑动', value: 'slide' },
]

export const routeSources = [
  { label: '前端', value: 'frontend' },
  { label: '后端', value: 'backend' },
  { label: '混合', value: 'mixture' },
]

export default {
  // 国际化语言。'zh-cn' 中文简体 | 'zh-tw' 中文繁体 | 'en' 英文
  defaultLanguage: defaultLanguages[0].value,
  // elementplus组件尺寸。'default' 默认 | 'large' 大 | 'small' 小
  elementSize: elementSizes[0].value,

  // ----------------------------------------布局配置--------------------------------------------------
  // 布局类型。
  // 'default' 默认 | 'singleAside' 单侧栏(经典) | 'doubleAside' 双侧栏 |
  // 'crosswise' 横向上下布局 | 'mixture' 混合导航布局
  layoutType: layoutTypes[0].value,

  // ----------------------------------------LOGO--------------------------------------------------
  // 显示 logo
  showLogo: true,

  // ----------------------------------------侧栏菜单--------------------------------------------------
  // 侧栏是否折叠
  menuIsCollapse: false,
  // 是否只保持一个子菜单的展开
  subMenuUniqueOpened: true,
  // 是否永远显示主菜单标题
  isMainMenuShowTitle: true,
  // 启用侧栏折叠动画
  enableCollapseTransition: true,

  // ----------------------------------------tabs 标签页--------------------------------------------------
  // 是否使用多标签页
  isTabs: true,
  // 标签显示图标
  tabsIcon: true,
  // 始终保持一个 tab 固定不可关闭
  // 当所有路由的 meta.fixedTab 不为 true 时，始终保持唯一一个 tab 不可关闭
  tabsOneFiexd: true,
  // tabs风格。'card' 风格一 | 'border-card' 风格二 | '' 风格三
  tabsType: tabsTypes[0].value,

  // ----------------------------------------过渡动画--------------------------------------------------
  // 页面切换动画。'fade' 渐变 | 'scale' 缩放 | 'slide' 滑动
  transitionName: transitionNames[0].value,
  // 是否启用页面切换动画
  isTransition: true,

  // ----------------------------------------页脚--------------------------------------------------
  // 是否显示页脚
  showFooter: false,
  // 页脚显示的文本内容,可以使用多语言翻译模板
  footerText: 'Copyright © 2023 XXX 拥有所有版权',

  // ----------------------------------------其它设置--------------------------------------------------

  // 是否开启主界面回到顶部
  enableBacktop: true,
  // 开启灰色模式
  enableGray: false,
  // 开启色弱模式
  enableColorWeakness: false,

  // ----------------------------------------固定配置（不在应用配置抽屉中出现）--------------------------------------------------
  // 路由来源。 'frontend' 前端 | 'backend' 后端 | 'mixture' 前后端都加载
  routeSource: routeSources[2].value,
  // 动态 html 标题
  dynamicTitle: true,
  // 404页面显示位置, true layout内，false layout 外
  innerNotFound: true,
}
