import { ref, computed } from 'vue'
import { consoleApiClient } from '@halo-dev/api-client'
import { Toast } from '@halo-dev/components'
import { useI18n } from 'vue-i18n'

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
  settings: {
    layout: 'masonry' | 'grid' | 'list'
    theme: 'dark' | 'light' | 'auto'
    cardStyle: 'rounded' | 'square' | 'shadow'
    showHeat: boolean
    showUserLevel: boolean
    enableComments: boolean
  }
  colors: {
    primary: string
    secondary: string
    background: string
    cardBackground: string
    text: string
  }
}

// 文件信息类型
export interface FileInfo {
  name: string
  type: 'template' | 'style' | 'script' | 'config'
  path: string
  content?: string
  lastModified?: Date
}

// 验证结果类型
export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

export function useThemeDevelopment() {
  const { t } = useI18n()
  
  // 状态管理
  const loading = ref(false)
  const error = ref<string | null>(null)
  const themeConfig = ref<ThemeConfig>({
    name: 'akina-zzz',
    displayName: 'Akina ZZZ 信息流主题',
    version: '1.0.0',
    description: '基于信息流推荐的信息流主题，支持瀑布流布局和深色主题',
    author: {
      name: 'Akina Team',
      website: 'https://www.akina.run'
    },
    settings: {
      layout: 'masonry',
      theme: 'dark',
      cardStyle: 'rounded',
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
  })

  // 文件管理
  const files = ref<FileInfo[]>([])
  const currentFile = ref<string>('')

  // 保存主题配置
  const saveTheme = async (config: ThemeConfig) => {
    try {
      loading.value = true
      error.value = null
      
      // 这里应该调用实际的API保存主题配置
      // await consoleApiClient.theme.theme.updateThemeConfig(config)
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      Toast.success(t('core.theme.development.save_success'))
      return true
    } catch (e) {
      error.value = e.message || t('core.theme.development.save_failed')
      Toast.error(error.value)
      return false
    } finally {
      loading.value = false
    }
  }

  // 验证主题配置
  const validateTheme = async (config: ThemeConfig): Promise<ValidationResult> => {
    try {
      loading.value = true
      error.value = null
      
      const errors: string[] = []
      const warnings: string[] = []
      
      // 验证主题名称
      if (!config.name || config.name.trim() === '') {
        errors.push(t('core.theme.development.validation.name_required'))
      }
      
      // 验证显示名称
      if (!config.displayName || config.displayName.trim() === '') {
        errors.push(t('core.theme.development.validation.display_name_required'))
      }
      
      // 验证版本号
      if (!config.version || !/^\d+\.\d+\.\d+$/.test(config.version)) {
        errors.push(t('core.theme.development.validation.version_format'))
      }
      
      // 验证颜色值
      const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
      Object.entries(config.colors).forEach(([key, value]) => {
        if (!colorRegex.test(value)) {
          errors.push(t('core.theme.development.validation.color_format', { color: key }))
        }
      })
      
      // 检查是否有警告
      if (config.description.length < 10) {
        warnings.push(t('core.theme.development.validation.description_short'))
      }
      
      const result: ValidationResult = {
        valid: errors.length === 0,
        errors,
        warnings
      }
      
      if (result.valid) {
        Toast.success(t('core.theme.development.validation.success'))
      } else {
        Toast.error(t('core.theme.development.validation.failed'))
      }
      
      return result
    } catch (e) {
      error.value = e.message || t('core.theme.development.validation.error')
      return {
        valid: false,
        errors: [error.value],
        warnings: []
      }
    } finally {
      loading.value = false
    }
  }

  // 获取文件内容
  const getFileContent = async (fileName: string): Promise<string> => {
    try {
      loading.value = true
      error.value = null
      
      // 这里应该调用实际的API获取文件内容
      // const response = await consoleApiClient.theme.theme.getFileContent(fileName)
      
      // 模拟文件内容
      const mockContent = getMockFileContent(fileName)
      return mockContent
    } catch (e) {
      error.value = e.message || t('core.theme.development.file_load_failed')
      throw e
    } finally {
      loading.value = false
    }
  }

  // 保存文件
  const saveFile = async (fileName: string, content: string) => {
    try {
      loading.value = true
      error.value = null
      
      // 这里应该调用实际的API保存文件
      // await consoleApiClient.theme.theme.saveFile(fileName, content)
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500))
      
      Toast.success(t('core.theme.development.file_save_success'))
      return true
    } catch (e) {
      error.value = e.message || t('core.theme.development.file_save_failed')
      Toast.error(error.value)
      return false
    } finally {
      loading.value = false
    }
  }

  // 验证文件
  const validateFile = async (fileName: string, content: string): Promise<ValidationResult> => {
    try {
      loading.value = true
      error.value = null
      
      const errors: string[] = []
      const warnings: string[] = []
      
      // 根据文件类型进行不同的验证
      const ext = fileName.split('.').pop()?.toLowerCase()
      
      switch (ext) {
        case 'html':
          // HTML验证
          if (!content.includes('<html')) {
            errors.push(t('core.theme.development.validation.html_structure'))
          }
          break
        case 'css':
          // CSS验证
          if (content.includes('{') && !content.includes('}')) {
            errors.push(t('core.theme.development.validation.css_syntax'))
          }
          break
        case 'js':
          // JavaScript验证
          if (content.includes('function') && !content.includes('{')) {
            errors.push(t('core.theme.development.validation.js_syntax'))
          }
          break
        case 'yaml':
        case 'yml':
          // YAML验证
          if (content.includes(':') && !content.includes(' ')) {
            errors.push(t('core.theme.development.validation.yaml_syntax'))
          }
          break
      }
      
      const result: ValidationResult = {
        valid: errors.length === 0,
        errors,
        warnings
      }
      
      return result
    } catch (e) {
      error.value = e.message || t('core.theme.development.validation.error')
      return {
        valid: false,
        errors: [error.value],
        warnings: []
      }
    } finally {
      loading.value = false
    }
  }

  // 生成预览URL
  const generatePreview = async (): Promise<string> => {
    try {
      loading.value = true
      error.value = null
      
      // 这里应该调用实际的API生成预览
      // const response = await consoleApiClient.theme.theme.generatePreview(themeConfig.value)
      
      // 模拟生成预览URL
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const previewUrl = `/theme-preview/akina-zzz?t=${Date.now()}`
      return previewUrl
    } catch (e) {
      error.value = e.message || t('core.theme.development.preview_generate_failed')
      throw e
    } finally {
      loading.value = false
    }
  }

  // 获取预览URL
  const getPreviewUrl = (): string => {
    return `/theme-preview/akina-zzz`
  }

  // 获取模拟文件内容
  const getMockFileContent = (fileName: string): string => {
    const mockContents: Record<string, string> = {
      'index.html': `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Akina ZZZ 信息流主题</title>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <div class="info-flow-container">
        <header class="header">
            <div class="user-info">
                <img src="/assets/images/avatar.jpg" alt="用户头像" class="avatar">
                <div class="user-details">
                    <h3 class="username">用户昵称</h3>
                    <div class="level-progress">
                        <div class="progress-bar"></div>
                        <span class="level">Lv.5</span>
                    </div>
                </div>
            </div>
        </header>
        
        <main class="main-content">
            <div class="masonry-grid">
                <!-- 帖子卡片将通过JavaScript动态加载 -->
            </div>
        </main>
    </div>
    
    <script src="/assets/js/script.js"></script>
</body>
</html>`,
      'style.css': `/* Akina ZZZ 信息流主题样式 */
:root {
    --primary-color: #4CCBA0;
    --secondary-color: #0E1731;
    --background-color: #1a1a1a;
    --card-background: #2d2d2d;
    --text-color: #ffffff;
    --border-radius: 12px;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
}

.info-flow-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 20px;
    background: var(--card-background);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

.user-info {
    display: flex;
    align-items: center;
    gap: 15px;
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.user-details h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
}

.level-progress {
    display: flex;
    align-items: center;
    gap: 10px;
}

.progress-bar {
    width: 100px;
    height: 6px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    overflow: hidden;
}

.progress-bar::after {
    content: '';
    display: block;
    width: 60%;
    height: 100%;
    background: var(--primary-color);
    border-radius: 3px;
}

.level {
    font-size: 12px;
    color: var(--primary-color);
    font-weight: 600;
}

.masonry-grid {
    column-count: 4;
    column-gap: 20px;
}

.post-card {
    break-inside: avoid;
    margin-bottom: 20px;
    background: var(--card-background);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
}

.heat-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
}

.post-image {
    width: 100%;
    height: auto;
    display: block;
}

.post-content {
    padding: 15px;
}

.post-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
    line-height: 1.4;
}

.post-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
}

.post-avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
}

@media (max-width: 768px) {
    .masonry-grid {
        column-count: 2;
    }
    
    .header {
        flex-direction: column;
        gap: 15px;
    }
}

@media (max-width: 480px) {
    .masonry-grid {
        column-count: 1;
    }
}`,
      'script.js': `// Akina ZZZ 信息流主题脚本
class InfoFlowTheme {
    constructor() {
        this.init()
    }
    
    init() {
        this.loadPosts()
        this.setupEventListeners()
    }
    
    // 加载帖子数据
    async loadPosts() {
        try {
            // 这里应该从API获取真实的帖子数据
            const mockPosts = this.getMockPosts()
            this.renderPosts(mockPosts)
        } catch (error) {
            console.error('加载帖子失败:', error)
        }
    }
    
    // 渲染帖子
    renderPosts(posts) {
        const grid = document.querySelector('.masonry-grid')
        if (!grid) return
        
        grid.innerHTML = ''
        
        posts.forEach(post => {
            const card = this.createPostCard(post)
            grid.appendChild(card)
        })
    }
    
    // 创建帖子卡片
    createPostCard(post) {
        const card = document.createElement('div')
        card.className = 'post-card'
        card.innerHTML = \`
            <div class="heat-badge">\${post.heat}</div>
            \${post.image ? \`<img src="\${post.image}" alt="\${post.title}" class="post-image">\` : ''}
            <div class="post-content">
                <h3 class="post-title">\${post.title}</h3>
                <div class="post-meta">
                    <img src="\${post.author.avatar}" alt="\${post.author.name}" class="post-avatar">
                    <span>\${post.author.name}</span>
                </div>
            </div>
        \`
        
        // 添加点击事件
        card.addEventListener('click', () => {
            this.openPostDetail(post)
        })
        
        return card
    }
    
    // 打开帖子详情
    openPostDetail(post) {
        // 这里应该打开帖子详情模态框
        console.log('打开帖子详情:', post)
    }
    
    // 设置事件监听器
    setupEventListeners() {
        // 添加其他事件监听器
    }
    
    // 获取模拟帖子数据
    getMockPosts() {
        return [
            {
                id: 1,
                title: '【情报】这里好像计划举办沙滩音乐节！',
                image: '/assets/images/post1.jpg',
                heat: 8996,
                author: {
                    name: '海滩游子',
                    avatar: '/assets/images/avatar1.jpg'
                }
            },
            {
                id: 2,
                title: '分享一些有趣的编程技巧',
                image: '/assets/images/post2.jpg',
                heat: 21787,
                author: {
                    name: '代码达人',
                    avatar: '/assets/images/avatar2.jpg'
                }
            }
            // 更多模拟数据...
        ]
    }
}

// 初始化主题
document.addEventListener('DOMContentLoaded', () => {
    new InfoFlowTheme()
})`,
      'theme.yaml': `apiVersion: theme.halo.run/v1alpha1
kind: Theme
metadata:
  name: akina-zzz
spec:
  displayName: Akina ZZZ 信息流主题
  version: 1.0.0
  description: 基于信息流推荐的信息流主题，支持瀑布流布局和深色主题
  author:
    name: Akina Team
    website: https://www.akina.run
  logo: /assets/images/logo.png
  website: https://www.akina.run
  repo: https://github.com/akina-dev/akina-zzz-theme
  issues: https://github.com/akina-dev/akina-zzz-theme/issues
  license:
    - name: MIT
      url: https://opensource.org/licenses/MIT
  requires: ">=2.0.0"
  settingName: akina-zzz-setting
  configMapName: akina-zzz-config
  customTemplates:
    post:
      - name: 信息流布局
        file: post-infoflow.html
      - name: 传统布局
        file: post-traditional.html
    page:
      - name: 关于页面
        file: page-about.html
      - name: 联系页面
        file: page-contact.html
  templates:
    - name: index
      file: index.html
    - name: post
      file: post.html
    - name: page
      file: page.html
    - name: category
      file: category.html
    - name: tag
      file: tag.html
    - name: archive
      file: archive.html
  assets:
    - name: style
      file: /assets/css/style.css
    - name: script
      file: /assets/js/script.js
    - name: images
      file: /assets/images/
`
    }
    
    return mockContents[fileName] || `// ${fileName} 文件内容\n// 这里应该包含 ${fileName} 的实际内容`
  }

  return {
    // 状态
    loading,
    error,
    themeConfig,
    files,
    currentFile,
    
    // 方法
    saveTheme,
    validateTheme,
    getFileContent,
    saveFile,
    validateFile,
    generatePreview,
    getPreviewUrl
  }
}