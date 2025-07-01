<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="关注信息"
    width="700px"
    :close-on-click-modal="false"
    class="followers-dialog-root"
  >
    <div class="followers-dialog-content">
      <div class="followers-section">
        <div class="followers-title">粉丝列表</div>
        <ul class="followers-list">
          <li
            v-for="f in followers"
            :key="f.id"
            class="follower-item"
            @click="handleClick(f)"
            :title="`点击查看 ${f.name} 的个人资料`"
          >
            <img :src="'/api' + f.imgUrl || '/default-avatar.png'" class="follower-avatar" />
            <div class="follower-info">
              <div class="follower-name">{{ f.name }}</div>
              <div class="follower-institution">{{ f.institution || '未知机构' }}</div>
              <div class="follower-research-area">
                <template v-if="f.researchArea && f.researchArea.trim() !== ''">
                  <div style="display: inline-block">
                    <el-tag
                      v-for="area in f.researchArea
                        .split(',')
                        .map((a: string) => a.trim())
                        .filter(Boolean)
                        .slice(0, 3)"
                      :key="area"
                      size="small"
                      class="mr-1 mb-1"
                    >
                      {{ area }}
                    </el-tag>
                    <el-tooltip
                      v-if="
                        f.researchArea
                          .split(',')
                          .map((a: string) => a.trim())
                          .filter(Boolean).length > 3
                      "
                      effect="dark"
                      :content="
                        f.researchArea
                          .split(',')
                          .map((a: string) => a.trim())
                          .filter(Boolean)
                          .slice(3)
                          .join('，')
                      "
                      type="info"
                      placement="top"
                    >
                      <el-tag size="small" type="info" effect="plain" class="more-areas"
                        >+{{
                          f.researchArea
                            .split(',')
                            .map((a: string) => a.trim())
                            .filter(Boolean).length - 3
                        }}</el-tag
                      >
                    </el-tooltip>
                  </div>
                </template>
                <template v-else>
                  <el-tag size="small" type="info">无领域</el-tag>
                </template>
              </div>
            </div>
          </li>
          <li v-if="followers.length === 0" class="empty-tip">暂无关注者</li>
        </ul>
      </div>
      <div class="followers-section">
        <div class="followers-title">关注列表</div>
        <ul class="followers-list">
          <li
            v-for="f in following"
            :key="f.id"
            class="follower-item"
            @click="handleClick(f)"
            :title="`点击查看 ${f.name} 的个人资料`"
          >
            <img :src="'/api' + f.imgUrl || '/default-avatar.png'" class="follower-avatar" />
            <div class="follower-info">
              <div class="follower-name">{{ f.name }}</div>
              <div class="follower-institution">{{ f.institution || '未知机构' }}</div>
              <div class="follower-research-area">
                <template v-if="f.researchArea && f.researchArea.trim() !== ''">
                  <div style="display: inline-block">
                    <el-tag
                      v-for="area in f.researchArea
                        .split(',')
                        .map((a: string) => a.trim())
                        .filter(Boolean)
                        .slice(0, 3)"
                      :key="area"
                      size="small"
                      class="mr-1 mb-1"
                    >
                      {{ area }}
                    </el-tag>
                    <el-tooltip
                      v-if="
                        f.researchArea
                          .split(',')
                          .map((a: string) => a.trim())
                          .filter(Boolean).length > 3
                      "
                      effect="dark"
                      :content="
                        f.researchArea
                          .split(',')
                          .map((a: string) => a.trim())
                          .filter(Boolean)
                          .slice(3)
                          .join('，')
                      "
                      type="info"
                      placement="top"
                    >
                      <el-tag size="small" type="info" effect="plain" class="more-areas"
                        >+{{
                          f.researchArea
                            .split(',')
                            .map((a: string) => a.trim())
                            .filter(Boolean).length - 3
                        }}</el-tag
                      >
                    </el-tooltip>
                  </div>
                </template>
                <template v-else>
                  <el-tag size="small" effect="plain">无领域</el-tag>
                </template>
              </div>
            </div>
          </li>
          <li v-if="following.length === 0" class="empty-tip">暂无关注</li>
        </ul>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, onMounted, ref } from 'vue'
import { getFollowers, getFollowing } from '@/api/modules/user'
import { useRouter } from 'vue-router'
// import { UserDetail } from '@/api/types/user'

const props = defineProps({
  visible: Boolean,
  id: {
    type: [String, Number],
    required: true,
  },
})
const emit = defineEmits(['update:visible'])
const router = useRouter()
const followers = ref<any[]>([])
const following = ref<any[]>([])

onMounted(async () => {
  const followersRes = await getFollowers(props.id)
  const followingRes = await getFollowing(props.id)
  followers.value = followersRes.data
  following.value = followingRes.data
})

const handleClick = (f: any) => {
  try {
    emit('update:visible', false)
    router.push(`/user/${f.id}`)
  } catch (error) {
    console.error('路由跳转失败:', error)
  }
}
</script>

<style scoped>
.followers-dialog-content {
  display: flex;
  gap: 24px;
  justify-content: space-between;
  min-height: 220px;
}
.followers-section {
  flex: 1;
  min-width: 160px;
  max-height: 320px;
  overflow-y: auto;
  background: #fafbfc;
  border-radius: 10px;
  padding: 12px 8px 8px 8px;
  box-shadow: 0 2px 8px 0 rgba(99, 102, 241, 0.06);
}
.followers-title {
  font-weight: 600;
  font-size: 15px;
  color: #6366f1;
  margin-bottom: 10px;
  text-align: center;
  letter-spacing: 1px;
}
.followers-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.follower-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-bottom: 1px solid #f1f1f1;
  transition: all 0.2s ease;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 2px;
}
.follower-item:last-child {
  border-bottom: none;
}
.follower-item:hover {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
  border-color: #c7d2fe;
}
.follower-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background: #e5e7eb;
  border: 1px solid #e0e7ff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.follower-item:hover .follower-avatar {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);
}
.follower-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.follower-name {
  font-size: 14px;
  font-weight: 500;
  color: #22223b;
  transition: color 0.2s ease;
}
.follower-item:hover .follower-name {
  color: #6366f1;
}
.follower-institution {
  font-size: 12px;
  color: #6b7280;
}
.follower-research-area {
  margin-top: 2px;
}
.empty-tip {
  text-align: center;
  color: #bdbdbd;
  font-size: 13px;
  margin: 18px 0 0 0;
}
.more-areas {
  margin-left: 2px;
  cursor: pointer;
  vertical-align: top;
}
</style> 