<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import request from '@/utils/request.ts'

onMounted(() => {
  request.get('/torrent/1').then((res) => {
    data.value = res
    const torStats = { stopped: 0, downloading: 0, seeding: 0 };
    res.forEach(torrent => {
      if (torStats.hasOwnProperty(torrent.status)) {
        torStats[torrent.status]++;
      }
    });
    stats.value = torStats
  })
})

const data = ref([])

const stats = ref<{ stopped : number, downloading : number, seeding : number }>({
  stopped: 0,
  downloading: 0,
  seeding: 0
})

const columnConfig = reactive<VxeTablePropTypes.ColumnConfig>({
  resizable: true
})

const sexOptions = ref([
  { label: '馒头', value: 'm-team' },
  { label: '已整理', value: '已整理' },
  { label: 'Woman', value: 'Woman' }
])

const formatterSize : VxeColumnPropTypes.Formatter<RowVO> = ({ cellValue }) => {
  const bytes = cellValue;
  if (bytes === 0) return "0";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  let value = bytes;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return `${value.toFixed(2)} ${units[i]}`;
}


</script>

<template>
  <div>
    <div flex justify-between items-center>
      <div>
        <div font-bold>备用服务求</div>
        <div text-gray-6 text-xs mt-1>http://10.0.1:100:9091/ - Transmission</div>
      </div>
      <div flex space-x-3>
        <div flex flex-col items-center>
          <div color-green font-bold>{{ stats.downloading }}</div>
          <div text-gray-6 text-xs>下载中</div>
        </div>
        <div flex flex-col items-center>
          <div color-blue font-bold>{{ stats.seeding }}</div>
          <div text-gray-6 text-xs>做种中</div>
        </div>
        <div flex flex-col items-center>
          <div color-yellow font-bold>{{ stats.stopped }}</div>
          <div text-gray-6 text-xs>已暂停</div>
        </div>
      </div>
    </div>

    <div text-lg mt-5 font-bold>种子列表</div>
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
        <vxe-column field="name" title="名称" sortable show-overflow />
        <vxe-column field="siteName" title="站点" sortable :filters="sexOptions" min-width="5%" width="5%"/>
        <vxe-column field="status" title="状态" sortable min-width="5%" width="5%"/>
        <vxe-column field="labels" title="标签" sortable :filters="sexOptions">
          <template #default="scope">
            <vxe-tag v-for="tag in scope.row.labels" :key="tag" :content="tag" status="success" round/>
          </template>
        </vxe-column>
        <vxe-column field="totalSize" title="总大小" sortable :formatter="formatterSize"/>
        <vxe-column field="uploadedEver" title="累计上传量" sortable :formatter="formatterSize"/>
        <vxe-column field="downloadDir" title="保存路径" sortable  show-overflow/>
      </vxe-table>
    </div>
  </div>

</template>

<style scoped>

</style>