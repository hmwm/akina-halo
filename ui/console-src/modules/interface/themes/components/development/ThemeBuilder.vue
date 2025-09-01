<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  VButton, 
  VCard, 
  VInput, 
  VSelect,
  VTextarea,
  VSwitch,
  VColorPicker,
  VDivider,
  VAlert
} from '@halo-dev/components'
import { consoleApiClient } from '@halo-dev/api-client'
import { useThemeDevelopment } from '../composables/use-theme-development'

const { t } = useI18n()

// 主题配置状态
const themeConfig = ref({
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

const { loading, error, saveTheme, validateTheme } = useThemeDevelopment()

// 布局选项
const layoutOptions = [
  { label: '瀑布流布局', value: 'masonry' },
  { label: '网格布局', value: 'grid' },
  { label: '列表布局', value: 'list' }
]

// 主题选项
const themeOptions = [
  { label: '深色主题', value: 'dark' },
  { label: '浅色主题', value: 'light' },
  { label: '自动切换', value: 'auto' }
]

// 卡片样式选项
const cardStyleOptions = [
  { label: '圆角卡片', value: 'rounded' },
  { label: '直角卡片', value: 'square' },
  { label: '阴影卡片', value: 'shadow' }
]

// 保存主题配置
const handleSave = async () => {
  try {
    await saveTheme(themeConfig.value)
  } catch (e) {
    console.error('保存主题配置失败:', e)
  }
}

// 验证主题配置
const handleValidate = async () => {
  try {
    const result = await validateTheme(themeConfig.value)
    if (result.valid) {
      // 显示验证成功消息
    } else {
      // 显示验证错误
    }
  } catch (e) {
    console.error('验证主题配置失败:', e)
  }
}

// 预览主题
const handlePreview = () => {
  // 打开预览窗口
  window.open(`/theme-preview?config=${encodeURIComponent(JSON.stringify(themeConfig.value))}`, '_blank')
}

onMounted(() => {
  // 初始化主题配置
})
</script>

<template>
  <div class="space-y-6">
    <!-- 主题基本信息 -->
    <VCard>
      <template #header>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          {{ t('core.theme.development.basic_info') }}
        </h3>
      </template>
      
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <VInput
            v-model="themeConfig.name"
            :label="t('core.theme.development.theme_name')"
            placeholder="akina-zzz"
            required
          />
          <VInput
            v-model="themeConfig.displayName"
            :label="t('core.theme.development.display_name')"
            placeholder="Akina ZZZ 信息流主题"
            required
          />
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <VInput
            v-model="themeConfig.version"
            :label="t('core.theme.development.version')"
            placeholder="1.0.0"
            required
          />
          <VInput
            v-model="themeConfig.author.name"
            :label="t('core.theme.development.author')"
            placeholder="Akina Team"
            required
          />
        </div>
        
        <VTextarea
          v-model="themeConfig.description"
          :label="t('core.theme.development.description')"
          placeholder="主题描述..."
          rows="3"
        />
      </div>
    </VCard>

    <!-- 主题设置 -->
    <VCard>
      <template #header>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          {{ t('core.theme.development.settings') }}
        </h3>
      </template>
      
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <VSelect
            v-model="themeConfig.settings.layout"
            :label="t('core.theme.development.layout')"
            :options="layoutOptions"
          />
          <VSelect
            v-model="themeConfig.settings.theme"
            :label="t('core.theme.development.theme_style')"
            :options="themeOptions"
          />
          <VSelect
            v-model="themeConfig.settings.cardStyle"
            :label="t('core.theme.development.card_style')"
            :options="cardStyleOptions"
          />
        </div>
        
        <VDivider />
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <VSwitch
            v-model="themeConfig.settings.showHeat"
            :label="t('core.theme.development.show_heat')"
          />
          <VSwitch
            v-model="themeConfig.settings.showUserLevel"
            :label="t('core.theme.development.show_user_level')"
          />
          <VSwitch
            v-model="themeConfig.settings.enableComments"
            :label="t('core.theme.development.enable_comments')"
          />
        </div>
      </div>
    </VCard>

    <!-- 颜色配置 -->
    <VCard>
      <template #header>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          {{ t('core.theme.development.colors') }}
        </h3>
      </template>
      
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t('core.theme.development.primary_color') }}
            </label>
            <VColorPicker v-model="themeConfig.colors.primary" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t('core.theme.development.secondary_color') }}
            </label>
            <VColorPicker v-model="themeConfig.colors.secondary" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t('core.theme.development.background_color') }}
            </label>
            <VColorPicker v-model="themeConfig.colors.background" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t('core.theme.development.card_background') }}
            </label>
            <VColorPicker v-model="themeConfig.colors.cardBackground" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t('core.theme.development.text_color') }}
            </label>
            <VColorPicker v-model="themeConfig.colors.text" />
          </div>
        </div>
      </div>
    </VCard>

    <!-- 错误提示 -->
    <VAlert v-if="error" type="error" :title="t('core.common.error')" :description="error" />

    <!-- 操作按钮 -->
    <div class="flex justify-end space-x-3">
      <VButton
        variant="outline"
        @click="handleValidate"
        :loading="loading"
      >
        {{ t('core.theme.development.validate') }}
      </VButton>
      <VButton
        variant="outline"
        @click="handlePreview"
      >
        {{ t('core.theme.development.preview') }}
      </VButton>
      <VButton
        type="primary"
        @click="handleSave"
        :loading="loading"
      >
        {{ t('core.theme.development.save') }}
      </VButton>
    </div>
  </div>
</template>

<style scoped>
.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.space-x-3 > * + * {
  margin-left: 0.75rem;
}
</style>