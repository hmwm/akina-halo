<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  VCard, 
  VButton, 
  VInput,
  VTextarea,
  VSelect,
  VSwitch,
  VDivider,
  VAlert,
  VBadge
} from '@halo-dev/components'
import { useThemeDevelopment } from '../composables/use-theme-development'

const { t } = useI18n()

// 编辑器状态
const activeTab = ref('template')
const currentFile = ref('')
const fileContent = ref('')
const isDirty = ref(false)

// 文件列表
const fileList = ref([
  { name: 'index.html', type: 'template', path: '/templates/index.html' },
  { name: 'post.html', type: 'template', path: '/templates/post.html' },
  { name: 'style.css', type: 'style', path: '/assets/css/style.css' },
  { name: 'script.js', type: 'script', path: '/assets/js/script.js' },
  { name: 'theme.yaml', type: 'config', path: '/theme.yaml' }
])

// 编辑器配置
const editorConfig = ref({
  theme: 'dark',
  fontSize: 14,
  tabSize: 2,
  wordWrap: true,
  minimap: true,
  lineNumbers: true
})

// 语法高亮配置
const languageMap = {
  'html': 'html',
  'css': 'css',
  'js': 'javascript',
  'yaml': 'yaml',
  'json': 'json'
}

const { loading, error, saveFile, validateFile, getFileContent } = useThemeDevelopment()

// 当前文件信息
const currentFileInfo = computed(() => {
  return fileList.value.find(file => file.name === currentFile.value)
})

// 当前语言
const currentLanguage = computed(() => {
  if (!currentFileInfo.value) return 'text'
  const ext = currentFileInfo.value.name.split('.').pop()
  return languageMap[ext] || 'text'
})

// 选择文件
const selectFile = async (fileName: string) => {
  if (isDirty.value) {
    // 提示保存当前文件
    if (!confirm(t('core.theme.development.save_current_file'))) {
      return
    }
  }
  
  currentFile.value = fileName
  try {
    const content = await getFileContent(fileName)
    fileContent.value = content
    isDirty.value = false
  } catch (e) {
    console.error('加载文件失败:', e)
  }
}

// 保存文件
const handleSave = async () => {
  if (!currentFile.value) return
  
  try {
    await saveFile(currentFile.value, fileContent.value)
    isDirty.value = false
  } catch (e) {
    console.error('保存文件失败:', e)
  }
}

// 验证文件
const handleValidate = async () => {
  if (!currentFile.value) return
  
  try {
    const result = await validateFile(currentFile.value, fileContent.value)
    if (result.valid) {
      // 显示验证成功
    } else {
      // 显示验证错误
    }
  } catch (e) {
    console.error('验证文件失败:', e)
  }
}

// 创建新文件
const createNewFile = () => {
  const fileName = prompt(t('core.theme.development.enter_file_name'))
  if (fileName) {
    fileList.value.push({
      name: fileName,
      type: 'template',
      path: `/templates/${fileName}`
    })
    currentFile.value = fileName
    fileContent.value = ''
    isDirty.value = false
  }
}

// 监听文件内容变化
watch(fileContent, () => {
  isDirty.value = true
})

// 初始化
const init = () => {
  if (fileList.value.length > 0) {
    selectFile(fileList.value[0].name)
  }
}

init()
</script>

<template>
  <div class="theme-editor h-full flex">
    <!-- 文件浏览器 -->
    <div class="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">
            {{ t('core.theme.development.files') }}
          </h3>
          <VButton size="sm" @click="createNewFile">
            {{ t('core.theme.development.new_file') }}
          </VButton>
        </div>
      </div>
      
      <div class="p-2">
        <div class="space-y-1">
          <div
            v-for="file in fileList"
            :key="file.name"
            class="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="{ 'bg-blue-100 dark:bg-blue-900': currentFile === file.name }"
            @click="selectFile(file.name)"
          >
            <div class="flex items-center space-x-2">
              <VBadge
                :type="file.type === 'template' ? 'primary' : file.type === 'style' ? 'success' : file.type === 'script' ? 'warning' : 'info'"
                size="sm"
              >
                {{ file.type }}
              </VBadge>
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ file.name }}</span>
            </div>
            <div v-if="isDirty && currentFile === file.name" class="w-2 h-2 bg-orange-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑器主体 -->
    <div class="flex-1 flex flex-col">
      <!-- 编辑器工具栏 -->
      <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ t('core.theme.development.current_file') }}:</span>
              <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ currentFile }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ t('core.theme.development.language') }}:</span>
              <VBadge type="info" size="sm">{{ currentLanguage }}</VBadge>
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <VButton
              size="sm"
              variant="outline"
              @click="handleValidate"
              :loading="loading"
            >
              {{ t('core.theme.development.validate') }}
            </VButton>
            <VButton
              size="sm"
              type="primary"
              @click="handleSave"
              :loading="loading"
              :disabled="!isDirty"
            >
              {{ t('core.theme.development.save') }}
            </VButton>
          </div>
        </div>
      </div>

      <!-- 代码编辑器 -->
      <div class="flex-1 relative">
        <textarea
          v-model="fileContent"
          class="w-full h-full p-4 font-mono text-sm bg-gray-900 text-gray-100 border-0 resize-none focus:outline-none"
          :placeholder="t('core.theme.development.enter_code')"
          spellcheck="false"
        />
        
        <!-- 编辑器配置 -->
        <div class="absolute top-4 right-4 bg-gray-800 rounded-lg p-2 opacity-0 hover:opacity-100 transition-opacity">
          <div class="flex items-center space-x-2 text-xs text-gray-400">
            <VSwitch
              v-model="editorConfig.lineNumbers"
              size="sm"
            />
            <span>{{ t('core.theme.development.line_numbers') }}</span>
          </div>
        </div>
      </div>

      <!-- 状态栏 -->
      <div class="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div class="flex items-center space-x-4">
            <span>{{ t('core.theme.development.encoding') }}: UTF-8</span>
            <span>{{ t('core.theme.development.line_ending') }}: LF</span>
            <span>{{ t('core.theme.development.tab_size') }}: {{ editorConfig.tabSize }}</span>
          </div>
          <div class="flex items-center space-x-4">
            <span v-if="isDirty" class="text-orange-500">{{ t('core.theme.development.unsaved_changes') }}</span>
            <span v-else class="text-green-500">{{ t('core.theme.development.saved') }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 错误提示 -->
    <VAlert v-if="error" type="error" :title="t('core.common.error')" :description="error" />
  </div>
</template>

<style scoped>
.theme-editor {
  height: 600px;
}

.space-y-1 > * + * {
  margin-top: 0.25rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-x-2 > * + * {
  margin-left: 0.5rem;
}

.space-x-4 > * + * {
  margin-left: 1rem;
}
</style>