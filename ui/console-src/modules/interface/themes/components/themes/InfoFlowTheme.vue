<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  VCard, 
  VButton, 
  VInput,
  VSelect,
  VSwitch,
  VDivider,
  VAlert,
  VBadge,
  VAvatar
} from '@halo-dev/components'
import { useThemeDevelopment } from '../composables/use-theme-development'
import type { PostData, UserInfo } from '../types/development'

const { t } = useI18n()

// 主题配置
const { themeConfig, loading, error } = useThemeDevelopment()

// 信息流状态
const posts = ref<PostData[]>([])
const selectedPost = ref<PostData | null>(null)
const showPostDetail = ref(false)
const currentUser = ref<UserInfo>({
  id: '1',
  name: '海滩游子',
  avatar: '/assets/images/avatar.jpg',
  level: 5,
  levelProgress: 60
})

// 模拟帖子数据
const mockPosts: PostData[] = [
  {
    id: '1',
    title: '【情报】这里好像计划举办沙滩音乐节！',
    content: '听说这里要举办一个超棒的沙滩音乐节，会有很多知名乐队来演出。时间大概在下个月，具体时间还没确定，但是已经有很多人在关注了。',
    excerpt: '听说这里要举办一个超棒的沙滩音乐节...',
    image: '/assets/images/post1.jpg',
    author: {
      id: '2',
      name: '海滩游子',
      avatar: '/assets/images/avatar1.jpg',
      level: 3,
      levelProgress: 40
    },
    heat: 8996,
    type: 'image',
    tags: ['音乐节', '沙滩', '活动'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: '分享一些有趣的编程技巧',
    content: '今天想和大家分享一些我在开发过程中学到的小技巧，这些技巧可以大大提高开发效率。',
    excerpt: '今天想和大家分享一些我在开发过程中学到的小技巧...',
    image: '/assets/images/post2.jpg',
    author: {
      id: '3',
      name: '代码达人',
      avatar: '/assets/images/avatar2.jpg',
      level: 7,
      levelProgress: 80
    },
    heat: 21787,
    type: 'text',
    tags: ['编程', '技巧', '开发'],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14')
  },
  {
    id: '3',
    title: '二次元插画分享',
    content: '最近画了一些二次元风格的插画，想和大家分享一下创作过程。',
    excerpt: '最近画了一些二次元风格的插画...',
    image: '/assets/images/post3.jpg',
    author: {
      id: '4',
      name: '插画师',
      avatar: '/assets/images/avatar3.jpg',
      level: 4,
      levelProgress: 50
    },
    heat: 15432,
    type: 'illustration',
    tags: ['插画', '二次元', '艺术'],
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13')
  }
]

// 计算属性
const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    // 这里可以添加过滤逻辑
    return true
  })
})

// 方法
const loadPosts = () => {
  posts.value = mockPosts
}

const openPostDetail = (post: PostData) => {
  selectedPost.value = post
  showPostDetail.value = true
}

const closePostDetail = () => {
  showPostDetail.value = false
  selectedPost.value = null
}

const getUserLevelColor = (level: number) => {
  if (level >= 7) return 'text-purple-500'
  if (level >= 5) return 'text-blue-500'
  if (level >= 3) return 'text-green-500'
  return 'text-gray-500'
}

const formatHeat = (heat: number) => {
  if (heat >= 10000) return `${(heat / 10000).toFixed(1)}w`
  if (heat >= 1000) return `${(heat / 1000).toFixed(1)}k`
  return heat.toString()
}

onMounted(() => {
  loadPosts()
})
</script>

<template>
  <div class="info-flow-theme min-h-screen" :class="themeConfig.settings.theme">
    <!-- 顶部导航栏 -->
    <header class="header bg-gray-900 text-white p-4">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <!-- 返回按钮 -->
        <VButton variant="ghost" size="sm" class="text-white hover:bg-gray-800">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </VButton>
        
        <!-- 用户信息 -->
        <div class="flex items-center space-x-4">
          <VAvatar :src="currentUser.avatar" size="md" />
          <div class="text-center">
            <h3 class="font-semibold">{{ currentUser.name }}</h3>
            <div class="flex items-center space-x-2">
              <div class="w-20 h-1 bg-gray-600 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-green-500 transition-all duration-300"
                  :style="{ width: `${currentUser.levelProgress}%` }"
                ></div>
              </div>
              <span class="text-sm text-green-500 font-semibold">Lv.{{ currentUser.level }}</span>
            </div>
          </div>
        </div>
        
        <!-- 导航标签 -->
        <div class="flex space-x-2">
          <VButton 
            variant="solid" 
            size="sm" 
            class="bg-green-500 hover:bg-green-600 text-white"
          >
            推荐
          </VButton>
          <VButton variant="ghost" size="sm" class="text-white hover:bg-gray-800">
            日程
          </VButton>
          <VButton variant="ghost" size="sm" class="text-white hover:bg-gray-800">
            历程
          </VButton>
          <VButton variant="ghost" size="sm" class="text-white hover:bg-gray-800">
            缝网等级
          </VButton>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content p-4">
      <div class="max-w-6xl mx-auto">
        <!-- 瀑布流布局 -->
        <div class="masonry-grid" :class="`columns-${themeConfig.settings.layout === 'masonry' ? '4' : '1'}`">
          <VCard
            v-for="post in filteredPosts"
            :key="post.id"
            class="post-card mb-4 break-inside-avoid cursor-pointer hover:scale-105 transition-transform duration-300"
            @click="openPostDetail(post)"
          >
            <!-- 热度标签 -->
            <div class="absolute top-2 left-2 z-10">
              <VBadge type="warning" size="sm">
                {{ formatHeat(post.heat) }}
              </VBadge>
            </div>
            
            <!-- 帖子图片 -->
            <div v-if="post.image" class="relative">
              <img 
                :src="post.image" 
                :alt="post.title"
                class="w-full h-auto object-cover"
              />
            </div>
            
            <!-- 帖子内容 -->
            <div class="p-4">
              <h3 class="font-semibold text-lg mb-2 line-clamp-2">{{ post.title }}</h3>
              <p class="text-gray-600 text-sm mb-3 line-clamp-3">{{ post.excerpt }}</p>
              
              <!-- 作者信息 -->
              <div class="flex items-center space-x-2">
                <VAvatar :src="post.author.avatar" size="sm" />
                <div class="flex-1">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm font-medium">{{ post.author.name }}</span>
                    <VBadge 
                      :type="post.author.level >= 5 ? 'success' : 'info'" 
                      size="xs"
                    >
                      Lv.{{ post.author.level }}
                    </VBadge>
                  </div>
                </div>
              </div>
              
              <!-- 标签 -->
              <div class="flex flex-wrap gap-1 mt-2">
                <VBadge
                  v-for="tag in post.tags.slice(0, 3)"
                  :key="tag"
                  type="secondary"
                  size="xs"
                >
                  {{ tag }}
                </VBadge>
              </div>
            </div>
          </VCard>
        </div>
      </div>
    </main>

    <!-- 底部导航 -->
    <footer class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
      <div class="max-w-6xl mx-auto flex justify-center">
        <VButton variant="outline" size="sm" class="mr-2">
          全部
        </VButton>
        <VButton variant="ghost" size="sm" class="mr-2">
          热门
        </VButton>
        <VButton variant="ghost" size="sm" class="mr-2">
          最新
        </VButton>
        <VButton variant="ghost" size="sm">
          关注
        </VButton>
      </div>
    </footer>

    <!-- 帖子详情模态框 -->
    <div
      v-if="showPostDetail && selectedPost"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closePostDetail"
    >
      <VCard
        class="max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        @click.stop
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <VAvatar :src="selectedPost.author.avatar" size="md" />
              <div>
                <h3 class="font-semibold">{{ selectedPost.author.name }}</h3>
                <div class="flex items-center space-x-2">
                  <VBadge type="success" size="sm">♥{{ Math.floor(selectedPost.heat / 1000) }}</VBadge>
                </div>
              </div>
            </div>
            <VButton variant="ghost" size="sm" @click="closePostDetail">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </VButton>
          </div>
        </template>
        
        <div class="p-6">
          <h1 class="text-2xl font-bold mb-4">{{ selectedPost.title }}</h1>
          <div class="prose max-w-none">
            <p class="text-gray-700 leading-relaxed">{{ selectedPost.content }}</p>
          </div>
          
          <!-- 评论区域 -->
          <div class="mt-8 border-t pt-6">
            <h3 class="text-lg font-semibold mb-4">评论</h3>
            <div class="space-y-4">
              <div class="flex space-x-3">
                <VAvatar src="/assets/images/comment1.jpg" size="sm" />
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-1">
                    <span class="font-medium text-sm">用户1</span>
                    <span class="text-xs text-gray-500">1F</span>
                  </div>
                  <p class="text-sm text-gray-700">这个音乐节听起来很棒！</p>
                </div>
              </div>
              <div class="flex space-x-3">
                <VAvatar src="/assets/images/comment2.jpg" size="sm" />
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-1">
                    <span class="font-medium text-sm">用户2</span>
                    <span class="text-xs text-gray-500">2F</span>
                  </div>
                  <p class="text-sm text-gray-700">期待更多详细信息！</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VCard>
    </div>

    <!-- 错误提示 -->
    <VAlert v-if="error" type="error" :title="t('core.common.error')" :description="error" />
  </div>
</template>

<style scoped>
.info-flow-theme {
  background-color: var(--background-color, #1a1a1a);
  color: var(--text-color, #ffffff);
}

.masonry-grid {
  column-count: 4;
  column-gap: 1rem;
}

.masonry-grid.columns-1 {
  column-count: 1;
}

.post-card {
  break-inside: avoid;
  margin-bottom: 1rem;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .masonry-grid {
    column-count: 2;
  }
}

@media (max-width: 480px) {
  .masonry-grid {
    column-count: 1;
  }
}

.space-x-2 > * + * {
  margin-left: 0.5rem;
}

.space-x-3 > * + * {
  margin-left: 0.75rem;
}

.space-x-4 > * + * {
  margin-left: 1rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}
</style>