<script setup lang="ts">
import request from "@/utils/request";
import { onMounted, ref } from "vue";
import { AttendResponse, SiteAttend } from "@/types/model";
// 站点签到相关
const attendSiteCount = ref(0);
const needAttendSiteCount = ref(0);
const siteAttends = ref<SiteAttend[]>([])
const sumAttends = ref(0)
const maxConsecutiveDays = ref(0)
const maxBonus = ref(0)
onMounted(() => {
  request.get<AttendResponse>('/v1/dashboard/attendanceStatistics').then((res) => {
    attendSiteCount.value = res.attendSiteCount
    needAttendSiteCount.value = res.needAttendSiteCount
    siteAttends.value = res.siteAttends
    sumAttends.value = res.sumAttends
    maxConsecutiveDays.value = res.maxConsecutiveDays
    maxBonus.value = res.maxBonus
  })
})
const statusColor = (site : SiteAttend) => {
  if (!site.success) {
    return 'bg-red-1'
  }
  return site.continuousFromJoined ? 'bg-green-1' : 'bg-yellow-1'
}

</script>

<template>
  <div overflow-hidden>
    <el-divider content-position="left">PT站点签到统计</el-divider>
    <!-- 综合签到统计卡片-->
    <div flex flex-wrap gap-3>
      <el-card w-300px rounded-2xl>
        <template #header>
          <div flex justify-between items-center text-14px>
            <div>今日签到</div>
            <div class="i-lucide:circle-check-big bg-green-7"/>
          </div>
        </template>
        <div text-green-7 font-bold text-xl>
          <span>{{ attendSiteCount }}</span>
          <span>/</span>
          <span>{{ needAttendSiteCount }}</span>
        </div>
        <div>
          <span text-xs text-gray>个站点</span>
        </div>
      </el-card>

      <el-card w-300px rounded-2xl>
        <template #header>
          <div flex justify-between items-center text-14px>
            <div>总签到次数</div>
            <div class="i-lucide:calendar-days bg-green-7"/>
          </div>
        </template>
        <div text-green-7 font-bold text-xl>
          <span>{{ sumAttends }}</span>
        </div>
        <div>
          <span text-xs text-gray>次</span>
        </div>
      </el-card>

      <el-card w-300px rounded-2xl>
        <template #header>
          <div flex justify-between items-center text-14px>
            <div>最长连续签到</div>
            <div class="i-lucide:flame bg-orange-5"/>
          </div>
        </template>
        <div text-orange-5 font-bold text-xl>
          <span>{{ maxConsecutiveDays }}</span>
        </div>
        <div>
          <span text-xs text-gray>天</span>
        </div>
      </el-card>

      <el-card w-300px rounded-2xl>
        <template #header>
          <div flex justify-between items-center text-14px>
            <div>单日最多魔力</div>
            <div class="i-lucide:trophy bg-red-5"/>
          </div>
        </template>
        <div text-red-5 font-bold text-xl>
          <span>{{ maxBonus }}</span>
        </div>
        <div>
          <span text-xs text-gray>个</span>
        </div>
      </el-card>
    </div>

    <div mt-5>
      <el-card rounded-2xl>
        <el-collapse>
          <el-collapse-item>
            <template #title>
              <div flex items-center gap-2>
                <div class="i-lucide:globe"/>
                <div>PT站点签到状态</div>
              </div>
              <div text-gray text-sm font-400 mt-1 mb-5>查看各个PT站点的签到情况和统计数据</div>
            </template>
            <template v-for="siteAttend in siteAttends" :key="siteAttend.id">
              <div rounded-xl border border-gray-2 border-solid p-5 mb-3
                   :class="statusColor(siteAttend)">
                <div flex justify-between items-center>
                  <div>
                    <div flex gap-1 items-center>
                      <div>{{ siteAttend.siteName }}</div>
                      <div text-xs scale-80 rounded bg-green-7 px-2 py-1 text-white v-if="siteAttend.success">
                        已签到
                      </div>
                      <div text-xs scale-80 rounded bg-red-7 px-2 py-1 text-white v-else>未签到</div>
                    </div>
                    <div text-gray text-xs mt-1 v-if="!siteAttend.success">失败原因:{{ siteAttend.failReason }}</div>
                    <div text-gray text-xs mt-1>签到时间:{{ siteAttend.updateTime }}</div>
                  </div>
                  <div flex gap-5>
                    <div flex flex-col items-center gap-1>
                      <div text-xs>{{ siteAttend.attendCount }}</div>
                      <div text-gray text-xs>总签到</div>
                    </div>
                    <div flex flex-col items-center gap-1>
                      <div text-xs>{{ siteAttend.consecutiveDays }}</div>
                      <div text-gray text-xs>连续签到</div>
                    </div>
                    <div flex flex-col items-center gap-1>
                      <div text-xs>{{ siteAttend.joinedDays }}</div>
                      <div text-gray text-xs>加入天数</div>
                    </div>
                    <div flex flex-col items-center gap-1>
                      <div text-xs>{{ siteAttend.bonus }}</div>
                      <div text-gray text-xs>签到魔力</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>

  </div>
</template>

<style scoped>
:deep(.el-collapse) {
  --el-collapse-border-color: none;
}
</style>