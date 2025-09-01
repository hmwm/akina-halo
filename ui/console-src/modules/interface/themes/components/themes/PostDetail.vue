<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  VCard, 
  VButton, 
  VAvatar, 
  VBadge,
  VInput,
  VTextarea,
  VDivider
} from '@halo-dev/components'
import type { PostData, Comment } from '../types/development'

interface Props {
  post: PostData
  showComments?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showComments: true
})

const emit = defineEmits<{
  close: []
  like: [post: PostData]
  comment: [post: PostData, content: string]
}>()

const { t } = useI18n()

// 状态
const isLiked = ref(false)
const likeCount = ref(Math.floor(props.post.heat / 1000))
const newComment = ref('')
const comments = ref<Comment[]>([
  {
    id: '1',
    content: '这个音乐节听起来很棒！期待更多详细信息。',
    author: {
      id: '2',
      name: '音乐爱好者',
      avatar: '/assets/images/comment1.jpg',
      level: 3,
      levelProgress: 40
    },
    floor: 1,
    createdAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    content: '我也听说了这个消息，不知道具体时间是什么时候？',
    author: {
      id: '3',
      name: '沙滩游子',
      avatar: '/assets/images/comment2.jpg',
      level: 5,
      levelProgress: 60
    },
    floor: 2,
    createdAt: new Date('2024-01-15T11:15:00')
  },
  {
    id: '3',
    content: '希望有更多知名乐队来演出，期待！',
    author: {
      id: '4',
      name: '摇滚青年',
      avatar: '/assets/images/comment3.jpg',
      level: 4,
      levelProgress: 50
    },
    floor: 3,
    createdAt: new Date('2024-01-15T12:00:00')
  }
])

// 计算属性
const levelColor = computed(() => {
  if (props.post.author.level >= 7) return 'success'
  if (props.post.author.level >= 5) return 'primary'
  if (props.post.author.level >= 3) return 'info'
  return 'secondary'
})

const sortedComments = computed(() => {
  return [...comments.value].sort((a, b) => a.floor - b.floor)
})

// 方法
const handleClose = () => {
  emit('close')
}

const handleLike = () => {
  isLiked.value = !isLiked.value
  likeCount.value += isLiked.value ? 1 : -1
  emit('like', props.post)
}

const handleComment = () => {
  if (!newComment.value.trim()) return
  
  const comment: Comment = {
    id: Date.now().toString(),
    content: newComment.value.trim(),
    author: {
      id: 'current-user',
      name: '当前用户',
      avatar: '/assets/images/current-user.jpg',
      level: 6,
      levelProgress: 70
    },
    floor: comments.value.length + 1,
    createdAt: new Date()
  }
  
  comments.value.push(comment)
  newComment.value = ''
  emit('comment', props.post, comment.content)
}

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  return date.toLocaleDateString()
}
</script>

<template>
  <div class="post-detail">
    <!-- 头部信息 -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-3">
        <VAvatar :src="post.author.avatar" size="md" />
        <div>
          <h3 class="font-semibold text-lg">{{ post.author.name }}</h3>
          <div class="flex items-center space-x-2">
            <VBadge :type="levelColor" size="sm">
              Lv.{{ post.author.level }}
            </VBadge>
            <span class="text-sm text-gray-500">
              {{ formatTime(post.createdAt) }}
            </span>
          </div>
        </div>
      </div>
      
      <div class="flex items-center space-x-2">
        <VButton
          :variant="isLiked ? 'solid' : 'outline'"
          :type="isLiked ? 'danger' : 'default'"
          size="sm"
          @click="handleLike"
        >
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
          </svg>
          {{ likeCount }}
        </VButton>
        <VButton variant="ghost" size="sm" @click="handleClose">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </VButton>
      </div>
    </div>

    <!-- 帖子标题 -->
    <h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
      {{ post.title }}
    </h1>

    <!-- 帖子图片 -->
    <div v-if="post.image" class="mb-6">
      <img 
        :src="post.image" 
        :alt="post.title"
        class="w-full h-64 object-cover rounded-lg"
      />
    </div>

    <!-- 帖子内容 -->
    <div class="prose max-w-none mb-6">
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
        {{ post.content }}
      </p>
    </div>

    <!-- 标签 -->
    <div class="flex flex-wrap gap-2 mb-6">
      <VBadge
        v-for="tag in post.tags"
        :key="tag"
        type="secondary"
        size="sm"
      >
        {{ tag }}
      </VBadge>
    </div>

    <VDivider class="my-6" />

    <!-- 评论区域 -->
    <div v-if="showComments">
      <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        评论 ({{ comments.length }})
      </h3>
      
      <!-- 评论列表 -->
      <div class="space-y-4 mb-6">
        <div
          v-for="comment in sortedComments"
          :key="comment.id"
          class="flex space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <VAvatar :src="comment.author.avatar" size="sm" />
          <div class="flex-1">
            <div class="flex items-center space-x-2 mb-1">
              <span class="font-medium text-sm text-gray-900 dark:text-gray-100">
                {{ comment.author.name }}
              </span>
              <VBadge 
                :type="comment.author.level >= 5 ? 'success' : 'info'" 
                size="xs"
              >
                Lv.{{ comment.author.level }}
              </VBadge>
              <span class="text-xs text-gray-500">
                {{ comment.floor }}F
              </span>
            </div>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
              {{ comment.content }}
            </p>
            <span class="text-xs text-gray-500">
              {{ formatTime(comment.createdAt) }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- 发表评论 -->
      <div class="border-t pt-4">
        <h4 class="text-sm font-medium mb-3 text-gray-900 dark:text-gray-100">
          发表评论
        </h4>
        <div class="space-y-3">
          <VTextarea
            v-model="newComment"
            placeholder="写下你的想法..."
            rows="3"
            class="w-full"
          />
          <div class="flex justify-end">
            <VButton
              type="primary"
              size="sm"
              :disabled="!newComment.trim()"
              @click="handleComment"
            >
              发表评论
            </VButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.prose {
  color: inherit;
}

.prose p {
  margin-bottom: 1rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-3 > * + * {
  margin-top: 0.75rem;
}

.space-x-2 > * + * {
  margin-left: 0.5rem;
}

.space-x-3 > * + * {
  margin-left: 0.75rem;
}

.whitespace-pre-wrap {
  white-space: pre-wrap;
}
</style>