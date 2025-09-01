<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  VCard, 
  VButton, 
  VTabs,
  VTab,
  VTabPanel,
  VAlert
} from '@halo-dev/components'
import ThemeBuilder from './ThemeBuilder.vue'
import ThemeEditor from './ThemeEditor.vue'
import ThemePreview from './ThemePreview.vue'
import InfoFlowTheme from '../themes/InfoFlowTheme.vue'

const { t } = useI18n()

// 状态管理
const activeTab = ref('builder')
const showPreview = ref(false)

// 标签页配置
const tabs = [
  {
    id: 'builder',
    label: t('core.theme.development.title'),
    component: ThemeBuilder,
    icon: 'settings'
  },
  {
    id: 'editor',
    label: t('core.theme.development.editor.title'),
    component: ThemeEditor,
    icon: 'code'
  },
  {
    id: 'preview',
    label: t('core.theme.development.preview.title'),
    component: ThemePreview,
    icon: 'eye'
  }
]

// 计算属性
const currentComponent = computed(() => {
  const tab = tabs.find(t => t.id === activeTab.value)
  return tab?.component || ThemeBuilder
})

// 方法
const switchTab = (tabId: string) => {
  activeTab.value = tabId
}

const togglePreview = () => {
  showPreview.value = !showPreview.value
}
</script>

<template>
  <div class="theme-development h-full">
    <!-- 头部工具栏 -->
    <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h1 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Akina ZZZ 主题开发
          </h1>
          <VBadge type="info" size="sm">
            v1.0.0
          </VBadge>
        </div>
        
        <div class="flex items-center space-x-2">
          <VButton
            variant="outline"
            size="sm"
            @click="togglePreview"
          >
            {{ showPreview ? '隐藏预览' : '显示预览' }}
          </VButton>
          <VButton
            type="primary"
            size="sm"
          >
            保存主题
          </VButton>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="flex-1 flex">
      <!-- 左侧开发工具 -->
      <div class="flex-1 flex flex-col">
        <!-- 标签页导航 -->
        <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <VTabs v-model="activeTab" class="px-4">
            <VTab
              v-for="tab in tabs"
              :key="tab.id"
              :value="tab.id"
              @click="switchTab(tab.id)"
            >
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="tab.icon === 'settings'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path v-if="tab.icon === 'code'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  <path v-if="tab.icon === 'eye'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path v-if="tab.icon === 'eye'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{{ tab.label }}</span>
              </div>
            </VTab>
          </VTabs>
        </div>

        <!-- 标签页内容 -->
        <div class="flex-1 overflow-auto">
          <VTabPanel
            v-for="tab in tabs"
            :key="tab.id"
            :value="tab.id"
            :active="activeTab === tab.id"
          >
            <component :is="currentComponent" />
          </VTabPanel>
        </div>
      </div>

      <!-- 右侧预览面板 -->
      <div
        v-if="showPreview"
        class="w-1/2 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
      >
        <div class="h-full flex flex-col">
          <!-- 预览头部 -->
          <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-3">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">
                实时预览
              </h3>
              <VButton
                variant="ghost"
                size="sm"
                @click="togglePreview"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </VButton>
            </div>
          </div>

          <!-- 预览内容 -->
          <div class="flex-1 overflow-auto">
            <InfoFlowTheme />
          </div>
        </div>
      </div>
    </div>

    <!-- 状态栏 -->
    <div class="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
      <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div class="flex items-center space-x-4">
          <span>主题: akina-zzz</span>
          <span>状态: 开发中</span>
          <span>最后保存: 刚刚</span>
        </div>
        <div class="flex items-center space-x-4">
          <span>文件: 9</span>
          <span>错误: 0</span>
          <span>警告: 0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-development {
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
}

.space-x-2 > * + * {
  margin-left: 0.5rem;
}

.space-x-4 > * + * {
  margin-left: 1rem;
}
</style>