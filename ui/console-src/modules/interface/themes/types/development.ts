// 主题开发相关类型定义

// 主题配置类型
export interface ThemeConfig {
  name: string
  displayName: string
  version: string
  description: string
  author: {
    name: string
    website: string
  }
  settings: ThemeSettings
  colors: ThemeColors
}

// 主题设置类型
export interface ThemeSettings {
  layout: 'masonry' | 'grid' | 'list'
  theme: 'dark' | 'light' | 'auto'
  cardStyle: 'rounded' | 'square' | 'shadow'
  showHeat: boolean
  showUserLevel: boolean
  enableComments: boolean
}

// 主题颜色类型
export interface ThemeColors {
  primary: string
  secondary: string
  background: string
  cardBackground: string
  text: string
}

// 文件信息类型
export interface FileInfo {
  name: string
  type: 'template' | 'style' | 'script' | 'config'
  path: string
  content?: string
  lastModified?: Date
  size?: number
}

// 验证结果类型
export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

// 帖子数据类型
export interface PostData {
  id: string
  title: string
  content: string
  excerpt: string
  image?: string
  author: UserInfo
  heat: number
  type: PostType
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

// 用户信息类型
export interface UserInfo {
  id: string
  name: string
  avatar: string
  level: number
  levelProgress: number
}

// 帖子类型
export type PostType = 'image' | 'text' | 'mixed' | 'illustration'

// 评论类型
export interface Comment {
  id: string
  content: string
  author: UserInfo
  floor: number
  createdAt: Date
  replies?: Comment[]
}

// 主题开发状态类型
export interface ThemeDevelopmentState {
  loading: boolean
  error: string | null
  currentFile: string
  files: FileInfo[]
  themeConfig: ThemeConfig
}

// 预览配置类型
export interface PreviewConfig {
  mode: 'desktop' | 'tablet' | 'mobile'
  width: string
  height: string
  device: string
}

// 设备预设类型
export interface DevicePreset {
  name: string
  width: number
  height: number
  type: 'mobile' | 'tablet' | 'desktop'
}

// 编辑器配置类型
export interface EditorConfig {
  theme: 'dark' | 'light'
  fontSize: number
  tabSize: number
  wordWrap: boolean
  minimap: boolean
  lineNumbers: boolean
  autoSave: boolean
}

// 主题构建器配置类型
export interface ThemeBuilderConfig {
  name: string
  displayName: string
  version: string
  description: string
  author: {
    name: string
    website: string
  }
  settings: ThemeSettings
  colors: ThemeColors
  templates: TemplateConfig[]
  assets: AssetConfig[]
}

// 模板配置类型
export interface TemplateConfig {
  name: string
  file: string
  type: 'template' | 'partial'
  description?: string
}

// 资源配置类型
export interface AssetConfig {
  name: string
  file: string
  type: 'css' | 'js' | 'image' | 'font'
  description?: string
}

// 主题验证规则类型
export interface ThemeValidationRule {
  name: string
  type: 'required' | 'format' | 'custom'
  message: string
  validator?: (value: any) => boolean
}

// 主题导出配置类型
export interface ThemeExportConfig {
  includeAssets: boolean
  includeTemplates: boolean
  includeConfig: boolean
  compress: boolean
}

// 主题导入配置类型
export interface ThemeImportConfig {
  overwrite: boolean
  validate: boolean
  backup: boolean
}

// 主题开发工具类型
export interface ThemeDevelopmentTool {
  name: string
  type: 'builder' | 'editor' | 'preview' | 'validator'
  component: string
  description: string
  icon?: string
}

// 主题开发事件类型
export interface ThemeDevelopmentEvent {
  type: 'file_changed' | 'config_changed' | 'validation_completed' | 'preview_updated'
  data: any
  timestamp: Date
}

// 主题开发API响应类型
export interface ThemeDevelopmentApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 主题开发错误类型
export interface ThemeDevelopmentError {
  code: string
  message: string
  details?: any
  stack?: string
}

// 主题开发日志类型
export interface ThemeDevelopmentLog {
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  timestamp: Date
  source?: string
  data?: any
}

// 主题开发统计类型
export interface ThemeDevelopmentStats {
  totalFiles: number
  totalLines: number
  totalSize: number
  lastModified: Date
  validationErrors: number
  validationWarnings: number
}

// 主题开发快捷键类型
export interface ThemeDevelopmentShortcut {
  key: string
  action: string
  description: string
  category: 'file' | 'edit' | 'view' | 'debug'
}

// 主题开发插件类型
export interface ThemeDevelopmentPlugin {
  name: string
  version: string
  description: string
  author: string
  enabled: boolean
  config: Record<string, any>
}

// 主题开发工作区类型
export interface ThemeDevelopmentWorkspace {
  name: string
  path: string
  theme: ThemeConfig
  files: FileInfo[]
  settings: Record<string, any>
  lastOpened: Date
}

// 主题开发项目类型
export interface ThemeDevelopmentProject {
  id: string
  name: string
  description: string
  theme: ThemeConfig
  workspace: ThemeDevelopmentWorkspace
  stats: ThemeDevelopmentStats
  createdAt: Date
  updatedAt: Date
}