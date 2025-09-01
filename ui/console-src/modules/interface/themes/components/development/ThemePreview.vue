<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  VCard, 
  VButton, 
  VSelect,
  VSwitch,
  VDivider,
  VAlert,
  VBadge
} from '@halo-dev/components'
import { useThemeDevelopment } from '../composables/use-theme-development'

const { t } = useI18n()

// 预览状态
const previewMode = ref('desktop')
const isFullscreen = ref(false)
const isLoading = ref(false)
const previewUrl = ref('')
const lastUpdate = ref<Date>()

// 预览模式选项
const previewModes = [
  { label: '桌面端', value: 'desktop', width: '100%', height: '100%' },
  { label: '平板端', value: 'tablet', width: '768px', height: '1024px' },
  { label: '手机端', value: 'mobile', width: '375px', height: '667px' }
]

// 设备预设
const devicePresets = [
  { name: 'iPhone 14', width: 390, height: 844 },
  { name: 'iPad', width: 768, height: 1024 },
  { name: 'MacBook', width: 1440, height: 900 },
  { name: 'Desktop', width: 1920, height: 1080 }
]

const { loading, error, generatePreview, getPreviewUrl } = useThemeDevelopment()

// 当前预览模式配置
const currentMode = computed(() => {
  return previewModes.find(mode => mode.value === previewMode.value) || previewModes[0]
})

// 生成预览
const generatePreviewUrl = async () => {
  try {
    isLoading.value = true
    const url = await generatePreview()
    previewUrl.value = url
    lastUpdate.value = new Date()
  } catch (e) {
    console.error('生成预览失败:', e)
  } finally {
    isLoading.value = false
  }
}

// 刷新预览
const refreshPreview = () => {
  if (previewUrl.value) {
    // 添加时间戳强制刷新
    const url = new URL(previewUrl.value)
    url.searchParams.set('t', Date.now().toString())
    previewUrl.value = url.toString()
    lastUpdate.value = new Date()
  }
}

// 切换全屏
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

// 切换预览模式
const switchPreviewMode = (mode: string) => {
  previewMode.value = mode
}

// 应用设备预设
const applyDevicePreset = (preset: typeof devicePresets[0]) => {
  // 这里可以动态调整预览窗口大小
  console.log('应用设备预设:', preset)
}

// 监听主题变化，自动刷新预览
watch(() => useThemeDevelopment().themeConfig, () => {
  if (previewUrl.value) {
    refreshPreview()
  }
}, { deep: true })

onMounted(() => {
  generatePreviewUrl()
})
</script>

<template>
  <div class="theme-preview h-full flex flex-col">
    <!-- 预览工具栏 -->
    <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <!-- 预览模式选择 -->
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ t('core.theme.development.preview_mode') }}:</span>
            <VSelect
              v-model="previewMode"
              :options="previewModes"
              size="sm"
              class="w-32"
            />
          </div>
          
          <!-- 设备预设 -->
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ t('core.theme.development.device_preset') }}:</span>
            <div class="flex space-x-1">
              <VButton
                v-for="preset in devicePresets"
                :key="preset.name"
                size="sm"
                variant="outline"
                @click="applyDevicePreset(preset)"
              >
                {{ preset.name }}
              </VButton>
            </div>
          </div>
        </div>
        
        <div class="flex items-center space-x-2">
          <!-- 最后更新时间 -->
          <div v-if="lastUpdate" class="text-xs text-gray-500 dark:text-gray-400">
            {{ t('core.theme.development.last_update') }}: {{ lastUpdate.toLocaleTimeString() }}
          </div>
          
          <!-- 操作按钮 -->
          <VButton
            size="sm"
            variant="outline"
            @click="refreshPreview"
            :loading="isLoading"
          >
            {{ t('core.theme.development.refresh') }}
          </VButton>
          <VButton
            size="sm"
            variant="outline"
            @click="toggleFullscreen"
          >
            {{ isFullscreen ? t('core.theme.development.exit_fullscreen') : t('core.theme.development.fullscreen') }}
          </VButton>
        </div>
      </div>
    </div>

    <!-- 预览内容区域 -->
    <div class="flex-1 relative bg-gray-100 dark:bg-gray-800">
      <!-- 预览容器 -->
      <div 
        class="absolute inset-0 flex items-center justify-center p-4"
        :class="{ 'bg-black': isFullscreen }"
      >
        <div 
          class="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300"
          :style="{
            width: currentMode.width,
            height: currentMode.height,
            maxWidth: isFullscreen ? '100%' : '90%',
            maxHeight: isFullscreen ? '100%' : '90%'
          }"
        >
          <!-- 预览iframe -->
          <iframe
            v-if="previewUrl"
            :src="previewUrl"
            class="w-full h-full border-0"
            :title="t('core.theme.development.theme_preview')"
            @load="isLoading = false"
          />
          
          <!-- 加载状态 -->
          <div v-else-if="isLoading" class="w-full h-full flex items-center justify-center">
            <div class="text-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p class="text-gray-500 dark:text-gray-400">{{ t('core.theme.development.generating_preview') }}</p>
            </div>
          </div>
          
          <!-- 无预览内容 -->
          <div v-else class="w-full h-full flex items-center justify-center">
            <div class="text-center">
              <div class="text-gray-400 dark:text-gray-500 mb-4">
                <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <p class="text-gray-500 dark:text-gray-400 mb-4">{{ t('core.theme.development.no_preview') }}</p>
              <VButton @click="generatePreviewUrl" :loading="isLoading">
                {{ t('core.theme.development.generate_preview') }}
              </VButton>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 预览信息面板 -->
      <div class="absolute top-4 left-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-3 max-w-xs">
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ t('core.theme.development.preview_info') }}</span>
            <VBadge :type="isLoading ? 'warning' : 'success'" size="sm">
              {{ isLoading ? t('core.theme.development.loading') : t('core.theme.development.ready') }}
            </VBadge>
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <div>{{ t('core.theme.development.mode') }}: {{ currentMode.label }}</div>
            <div>{{ t('core.theme.development.size') }}: {{ currentMode.width }} × {{ currentMode.height }}</div>
            <div v-if="lastUpdate">{{ t('core.theme.development.last_update') }}: {{ lastUpdate.toLocaleTimeString() }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 错误提示 -->
    <VAlert v-if="error" type="error" :title="t('core.common.error')" :description="error" />
  </div>
</template>

<style scoped>
.theme-preview {
  height: 600px;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-x-1 > * + * {
  margin-left: 0.25rem;
}

.space-x-2 > * + * {
  margin-left: 0.5rem;
}

.space-x-4 > * + * {
  margin-left: 1rem;
}

.space-y-1 > * + * {
  margin-top: 0.25rem;
}
</style>