<script setup lang="ts">
import { Menu, Plus } from "@element-plus/icons-vue";
import { onMounted, ref, useTemplateRef } from "vue";
import { ElMessage, type FormInstance } from "element-plus";
import request from '@/utils/request.ts'
import type { TorrentClientConfig } from "@/types/TorrentClientConfig.ts";

//======== 新增实例 ===========
const addInstanceDialogVisible = ref(false)
const form = ref({
  name: '',
  type: 'qBittorrent',
  url: '',
  username: '',
  password: '',
});
const formEl = useTemplateRef<FormInstance>("formEl")
const resetForm = () => {
  if (!formEl.value) {
    return
  }
  formEl.value.resetFields()
  addInstanceDialogVisible.value = false
}
const addInstance = () => {
  request.post('/torrent/clients', {
    name: form.value.name,
    type: form.value.type,
    url: form.value.url,
    username: form.value.username,
    password: form.value.password
  }).then(() => {
    ElMessage.success('添加成功')
    addInstanceDialogVisible.value = false
  }).catch(() => {
    ElMessage.success('添加失败')
    addInstanceDialogVisible.value = false
  })
}

//=========查询实例===============
const instances = ref<TorrentClientConfig[]>([])
onMounted(() => {
  request.get<TorrentClientConfig[]>('/torrent/clients').then((res) => {
    instances.value = res
  }).catch((err) => {
    ElMessage.error('加载实例失败', err)
  })
})
</script>
<template>
  <div>
    <el-container>
      <el-header border-b-gray-200 border-b-1px border-b-solid>
        <div flex h-full items-center>
          <div m-l-auto>
            <el-button :icon="Plus" type="primary" @click="addInstanceDialogVisible = true">添加实例</el-button>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router h-full>
            <el-menu-item index="/site-manage">
              <template #title>
                <el-icon>
                  <Menu/>
                </el-icon>
                <span>站点管理</span>
              </template>
            </el-menu-item>

            <el-sub-menu>
              <template #title>
                <el-icon>
                  <Menu/>
                </el-icon>
                <span>自动化工具</span>
              </template>
              <el-menu-item index="/auto-attend">
                <el-icon>
                  <Menu/>
                </el-icon>
                <span>自动签到</span>
              </el-menu-item>
              <el-menu-item index="/auto-claim">
                <el-icon>
                  <Menu/>
                </el-icon>
                <span>评论区喊话</span>
              </el-menu-item>
              <el-menu-item index="/auto-upload">
                <el-icon>
                  <Menu/>
                </el-icon>
                <span>自动购买</span>
              </el-menu-item>
            </el-sub-menu>

            <el-sub-menu>
              <template #title>
                <el-icon>
                  <Menu/>
                </el-icon>
                <span>系统管理</span>
              </template>
              <el-menu-item index="/system-manage">
                <el-icon>
                  <Menu/>
                </el-icon>
                <span>系统配置</span>
              </el-menu-item>
              <el-menu-item index="/site-meta-manage">
                <el-icon>
                  <Menu/>
                </el-icon>
                <span>站点元数据</span>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="添加新实例" v-model="addInstanceDialogVisible" width="380px">
      <el-form :model="form" ref="formEl">
        <el-form-item label="实例名称" label-position="top" prop="name">
          <el-input placeholder="例如:下载服务器" v-model="form.name"/>
        </el-form-item>
        <el-form-item label="客户端类型" label-position="top" prop="type">
          <el-select placeholder="请选择服务器地址" v-model="form.type">
            <el-option label="qBittorrent" value="qBittorrent"/>
            <el-option label="Transmission" value="Transmission"/>
          </el-select>
        </el-form-item>
        <el-form-item label="服务器地址" label-position="top" prop="url">
          <el-input placeholder="例如:http://localhost:9091/" v-model="form.url"/>
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item label="用户名" label-position="top" prop="username">
              <el-input placeholder="例如:admin" v-model="form.username"/>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="text-center">
          </el-col>
          <el-col :span="11">
            <el-form-item label="密码" label-position="top" prop="password">
              <el-input placeholder="例如:password" v-model="form.password"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button m-l-auto type="default" @click="resetForm">取消</el-button>
          <el-button type="primary" @click="addInstance">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style scoped>
</style>