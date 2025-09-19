<script setup lang="ts">
import { Connection } from "@element-plus/icons-vue";
import { onMounted, reactive } from "vue";
import request from "@/utils/request";
import { ElMessage } from "element-plus";
import { ResultSystemConfig } from "@/types/model";


onMounted(() => {
  request.get<ResultSystemConfig>('/v1/systemConfig/proxy').then((res) => {
    networkConfig.proxy = res.data.configValue
  })
})

const networkConfig = reactive({
  proxy: '',
})
const saveNetworkConfig = () => {
  request.post('/v1/systemConfig', {
    configKey: 'SYSTEM_PROXY_SEVER',
    configValue: networkConfig.proxy,
    description: '系统代理服务器配置'
  }).then(() => {
    ElMessage.success('保存成功')
  }).catch(() => {
    ElMessage.error('保存失败')
  })
}
</script>

<template>
  <div>
    <el-divider content-position="left">网络配置</el-divider>
    <el-form>
      <el-row>
        <el-col :span="8">
          <el-form-item label="代理服务器" label-position="top">
            <el-input v-model="networkConfig.proxy" :prefix-icon="Connection"
                      placeholder="http://username:password@proxy_host:proxy_port"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" size="small" round @click="saveNetworkConfig">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>