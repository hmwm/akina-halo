<script setup lang="ts">
import { computed } from 'vue'
import { VCard, VAvatar, VBadge } from '@halo-dev/components'
import type { PostData } from '../types/development'

interface Props {
  post: PostData
  showHeat?: boolean
  showUserLevel?: boolean
  cardStyle?: 'rounded' | 'square' | 'shadow'
}

const props = withDefaults(defineProps<Props>(), {
  showHeat: true,
  showUserLevel: true,
  cardStyle: 'rounded'
})

const emit = defineEmits<{
  click: [post: PostData]
}>()

// 计算属性
const cardClasses = computed(() => {
  const baseClasses = 'post-card cursor-pointer transition-all duration-300 hover:scale-105'
  
  switch (props.cardStyle) {
    case 'rounded':
      return `${baseClasses} rounded-xl`
    case 'square':
      return `${baseClasses} rounded-none`
    case 'shadow':
      return `${baseClasses} rounded-lg shadow-lg hover:shadow-xl`
    default:
      return baseClasses
  }
})

const heatColor = computed(() => {
  if (props.post.heat >= 10000) return 'text-red-500'
  if (props.post.heat >= 5000) return 'text-orange-500'
  if (props.post.heat >= 1000) return 'text-yellow-500'
  return 'text-gray-500'
})

const levelColor = computed(() => {
  if (props.post.author.level >= 7) return 'success'
  if (props.post.author.level >= 5) return 'primary'
  if (props.post.author.level >= 3) return 'info'
  return 'secondary'
})

// 方法
const formatHeat = (heat: number) => {
  if (heat >= 10000) return `${(heat / 10000).toFixed(1)}w`
  if (heat >= 1000) return `${(heat / 1000).toFixed(1)}k`
  return heat.toString()
}

const handleClick = () => {
  emit('click', props.post)
}
</script>

<template>
  <VCard 
    :class="cardClasses"
    @click="handleClick"
  >
    <!-- 热度标签 -->
    <div v-if="showHeat" class="absolute top-2 left-2 z-10">
      <VBadge 
        :type="props.post.heat >= 10000 ? 'danger' : props.post.heat >= 5000 ? 'warning' : 'info'" 
        size="sm"
      >
        {{ formatHeat(props.post.heat) }}
      </VBadge>
    </div>
    
    <!-- 帖子图片 -->
    <div v-if="post.image" class="relative overflow-hidden">
      <img 
        :src="post.image" 
        :alt="post.title"
        class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
      />
      <!-- 图片遮罩 -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
    
    <!-- 帖子内容 -->
    <div class="p-4">
      <!-- 标题 -->
      <h3 class="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-gray-100">
        {{ post.title }}
      </h3>
      
      <!-- 摘要 -->
      <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
        {{ post.excerpt }}
      </p>
      
      <!-- 作者信息 -->
      <div class="flex items-center space-x-2 mb-3">
        <VAvatar :src="post.author.avatar" size="sm" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {{ post.author.name }}
            </span>
            <VBadge 
              v-if="showUserLevel"
              :type="levelColor" 
              size="xs"
            >
              Lv.{{ post.author.level }}
            </VBadge>
          </div>
        </div>
      </div>
      
      <!-- 标签 -->
      <div class="flex flex-wrap gap-1">
        <VBadge
          v-for="tag in post.tags.slice(0, 3)"
          :key="tag"
          type="secondary"
          size="xs"
        >
          {{ tag }}
        </VBadge>
        <VBadge
          v-if="post.tags.length > 3"
          type="outline"
          size="xs"
        >
          +{{ post.tags.length - 3 }}
        </VBadge>
      </div>
      
      <!-- 时间信息 -->
      <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <span class="text-xs text-gray-500 dark:text-gray-400">
          {{ post.createdAt.toLocaleDateString() }}
        </span>
      </div>
    </div>
  </VCard>
</template>

<style scoped>
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

.space-x-2 > * + * {
  margin-left: 0.5rem;
}

.space-y-3 > * + * {
  margin-top: 0.75rem;
}
</style>