// 主题开发相关常量

// 主题类型常量
export const THEME_TYPES = {
  LAYOUT: {
    MASONRY: 'masonry',
    GRID: 'grid',
    LIST: 'list'
  },
  THEME: {
    DARK: 'dark',
    LIGHT: 'light',
    AUTO: 'auto'
  },
  CARD_STYLE: {
    ROUNDED: 'rounded',
    SQUARE: 'square',
    SHADOW: 'shadow'
  }
} as const

// 文件类型常量
export const FILE_TYPES = {
  TEMPLATE: 'template',
  STYLE: 'style',
  SCRIPT: 'script',
  CONFIG: 'config'
} as const

// 文件扩展名映射
export const FILE_EXTENSIONS = {
  '.html': FILE_TYPES.TEMPLATE,
  '.htm': FILE_TYPES.TEMPLATE,
  '.css': FILE_TYPES.STYLE,
  '.scss': FILE_TYPES.STYLE,
  '.sass': FILE_TYPES.STYLE,
  '.js': FILE_TYPES.SCRIPT,
  '.ts': FILE_TYPES.SCRIPT,
  '.yaml': FILE_TYPES.CONFIG,
  '.yml': FILE_TYPES.CONFIG,
  '.json': FILE_TYPES.CONFIG
} as const

// 语言映射
export const LANGUAGE_MAP = {
  'html': 'html',
  'htm': 'html',
  'css': 'css',
  'scss': 'scss',
  'sass': 'sass',
  'js': 'javascript',
  'ts': 'typescript',
  'yaml': 'yaml',
  'yml': 'yaml',
  'json': 'json'
} as const

// 默认主题配置
export const DEFAULT_THEME_CONFIG = {
  name: 'akina-zzz',
  displayName: 'Akina ZZZ 信息流主题',
  version: '1.0.0',
  description: '基于信息流推荐的信息流主题，支持瀑布流布局和深色主题',
  author: {
    name: 'Akina Team',
    website: 'https://www.akina.run'
  },
  settings: {
    layout: THEME_TYPES.LAYOUT.MASONRY,
    theme: THEME_TYPES.THEME.DARK,
    cardStyle: THEME_TYPES.CARD_STYLE.ROUNDED,
    showHeat: true,
    showUserLevel: true,
    enableComments: true
  },
  colors: {
    primary: '#4CCBA0',
    secondary: '#0E1731',
    background: '#1a1a1a',
    cardBackground: '#2d2d2d',
    text: '#ffffff'
  }
} as const

// 默认文件列表
export const DEFAULT_FILES = [
  {
    name: 'index.html',
    type: FILE_TYPES.TEMPLATE,
    path: '/templates/index.html'
  },
  {
    name: 'post.html',
    type: FILE_TYPES.TEMPLATE,
    path: '/templates/post.html'
  },
  {
    name: 'page.html',
    type: FILE_TYPES.TEMPLATE,
    path: '/templates/page.html'
  },
  {
    name: 'category.html',
    type: FILE_TYPES.TEMPLATE,
    path: '/templates/category.html'
  },
  {
    name: 'tag.html',
    type: FILE_TYPES.TEMPLATE,
    path: '/templates/tag.html'
  },
  {
    name: 'archive.html',
    type: FILE_TYPES.TEMPLATE,
    path: '/templates/archive.html'
  },
  {
    name: 'style.css',
    type: FILE_TYPES.STYLE,
    path: '/assets/css/style.css'
  },
  {
    name: 'script.js',
    type: FILE_TYPES.SCRIPT,
    path: '/assets/js/script.js'
  },
  {
    name: 'theme.yaml',
    type: FILE_TYPES.CONFIG,
    path: '/theme.yaml'
  }
] as const

// 预览模式配置
export const PREVIEW_MODES = [
  {
    label: '桌面端',
    value: 'desktop',
    width: '100%',
    height: '100%',
    icon: 'desktop'
  },
  {
    label: '平板端',
    value: 'tablet',
    width: '768px',
    height: '1024px',
    icon: 'tablet'
  },
  {
    label: '手机端',
    value: 'mobile',
    width: '375px',
    height: '667px',
    icon: 'mobile'
  }
] as const

// 设备预设
export const DEVICE_PRESETS = [
  {
    name: 'iPhone 14',
    width: 390,
    height: 844,
    type: 'mobile'
  },
  {
    name: 'iPhone 14 Pro',
    width: 393,
    height: 852,
    type: 'mobile'
  },
  {
    name: 'iPad',
    width: 768,
    height: 1024,
    type: 'tablet'
  },
  {
    name: 'iPad Pro',
    width: 1024,
    height: 1366,
    type: 'tablet'
  },
  {
    name: 'MacBook',
    width: 1440,
    height: 900,
    type: 'desktop'
  },
  {
    name: 'Desktop',
    width: 1920,
    height: 1080,
    type: 'desktop'
  }
] as const

// 编辑器配置
export const EDITOR_CONFIG = {
  theme: 'dark',
  fontSize: 14,
  tabSize: 2,
  wordWrap: true,
  minimap: true,
  lineNumbers: true,
  autoSave: true,
  autoSaveDelay: 1000
} as const

// 验证规则
export const VALIDATION_RULES = {
  THEME_NAME: {
    required: true,
    pattern: /^[a-z0-9-]+$/,
    message: '主题名称只能包含小写字母、数字和连字符'
  },
  DISPLAY_NAME: {
    required: true,
    minLength: 1,
    maxLength: 50,
    message: '显示名称长度必须在1-50个字符之间'
  },
  VERSION: {
    required: true,
    pattern: /^\d+\.\d+\.\d+$/,
    message: '版本号格式必须为 x.y.z'
  },
  COLOR: {
    required: true,
    pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    message: '颜色值必须为有效的十六进制颜色代码'
  }
} as const

// 快捷键配置
export const SHORTCUTS = {
  SAVE: 'Ctrl+S',
  SAVE_ALL: 'Ctrl+Shift+S',
  NEW_FILE: 'Ctrl+N',
  OPEN_FILE: 'Ctrl+O',
  CLOSE_FILE: 'Ctrl+W',
  FIND: 'Ctrl+F',
  REPLACE: 'Ctrl+H',
  PREVIEW: 'Ctrl+P',
  VALIDATE: 'Ctrl+Shift+V',
  FULLSCREEN: 'F11'
} as const

// 主题开发工具
export const DEVELOPMENT_TOOLS = [
  {
    name: '主题构建器',
    type: 'builder',
    component: 'ThemeBuilder',
    description: '配置主题基本信息和样式',
    icon: 'settings'
  },
  {
    name: '代码编辑器',
    type: 'editor',
    component: 'ThemeEditor',
    description: '编辑主题模板和样式文件',
    icon: 'code'
  },
  {
    name: '实时预览',
    type: 'preview',
    component: 'ThemePreview',
    description: '预览主题效果',
    icon: 'eye'
  },
  {
    name: '主题验证器',
    type: 'validator',
    component: 'ThemeValidator',
    description: '验证主题配置和代码',
    icon: 'check-circle'
  }
] as const

// 错误代码
export const ERROR_CODES = {
  FILE_NOT_FOUND: 'FILE_NOT_FOUND',
  FILE_READ_ERROR: 'FILE_READ_ERROR',
  FILE_WRITE_ERROR: 'FILE_WRITE_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  PREVIEW_ERROR: 'PREVIEW_ERROR',
  SAVE_ERROR: 'SAVE_ERROR',
  LOAD_ERROR: 'LOAD_ERROR'
} as const

// 日志级别
export const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
} as const

// 主题开发状态
export const DEVELOPMENT_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SAVING: 'saving',
  VALIDATING: 'validating',
  PREVIEWING: 'previewing',
  ERROR: 'error'
} as const

// 主题开发事件类型
export const DEVELOPMENT_EVENTS = {
  FILE_CHANGED: 'file_changed',
  CONFIG_CHANGED: 'config_changed',
  VALIDATION_COMPLETED: 'validation_completed',
  PREVIEW_UPDATED: 'preview_updated',
  SAVE_COMPLETED: 'save_completed',
  ERROR_OCCURRED: 'error_occurred'
} as const

// 主题开发配置
export const DEVELOPMENT_CONFIG = {
  AUTO_SAVE_INTERVAL: 5000,
  PREVIEW_UPDATE_DELAY: 1000,
  VALIDATION_DEBOUNCE: 500,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
  SUPPORTED_FONT_FORMATS: ['woff', 'woff2', 'ttf', 'otf', 'eot']
} as const