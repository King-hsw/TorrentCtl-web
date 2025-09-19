<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import request from "@/utils/request";

const columnConfig = reactive<VxeTablePropTypes.ColumnConfig>({
  resizable: true
})
const data = ref<SiteMeta[]>([])
onMounted(() => {
  request.get('/v1/siteMetaManage/data').then((res) => {
    data.value = res
  })
})
</script>

<template>
  <div>
    <vxe-table
        round
        stripe
        height="500px"
        :data="data"
        :column-config="columnConfig"
        :row-config="{isCurrent: true, isHover: true}"
        :virtual-y-config="{enabled: true, gt: 500}"
        size="mini">
      <vxe-column field="siteName" title="站点名称" sortable show-overflow/>
      <vxe-column title="站点链接">
        <template #default="scope">
          <div flex flex-col gap-1>
            <div v-for="tag in scope.row.urlPatterns" :key="tag">
              <a style="text-decoration: none" :href="tag" target="_blank" rel="noopener noreferrer">
                <vxe-tag :content="tag" status="success"/>
              </a>
            </div>
          </div>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<style scoped>

</style>