<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { Plus } from "@element-plus/icons-vue";
import request from "@/utils/request";
import { ElMessage } from "element-plus";
import { ResultListSite, ResultTestAllSiteConnectivityResponse, Site } from "@/types/model";

const addSiteVisible = ref<boolean>(false)
const addSiteForm = reactive({
  url: '',
  apiKey: '',
  cookie: '',
  userAgent: '',
  proxy: 0
})


const addSite = () => {
  request.post('/site', {
    url: addSiteForm.url,
    apiKey: addSiteForm.apiKey,
    cookie: addSiteForm.cookie,
    userAgent: addSiteForm.userAgent,
    proxy: addSiteForm.proxy
  }).then(() => {
    ElMessage.success('添加成功')
    addSiteVisible.value = false
  })
}


//====== 站点列表相关 ======
const sites = ref<Site[]>([])
onMounted(() => {
  request.get<ResultListSite>('/v1/site').then(res => {
    sites.value = res.data
  })
})


//=====通过CookieCloud导入相关==========
const cookiecloudForm = reactive({
  url: '',
  userKey: '',
  password: ''
})

const importSiteFromCookieCloud = () => {
  request.post<Site[]>('/v1/site/cookiecloud', {
    url: cookiecloudForm.url,
    userKey: cookiecloudForm.userKey,
    password: cookiecloudForm.password
  }).then(res => {
    ElMessage.success('导入成功')
  }).catch(() => {
    ElMessage.error('导入失败')
  })
}


//=======站点连通性==========
const testConnected = () => {
  request.get<ResultTestAllSiteConnectivityResponse>('/v1/site/connect').then((res) => {
    const { successResult, failResult } = res.data
    console.log(successResult, failResult)
    ElMessage.success('连通性测试成功')
  }).catch(() => {
    ElMessage.error('连通性测试失败')
  })
}
</script>

<template>
  <div>
    <el-card>
      <el-collapse>
        <el-collapse-item>
          <template #title>
            <div flex items-center>
              <div class="i-lucide:upload"></div>
              <div>导入站点配置</div>
            </div>
          </template>
          <div>
            <el-tabs model-value="cookiecloud">
              <el-tab-pane name="cookiecloud">
                <template #label>
                  <div flex items-center gap-2 px-3>
                    <div class="i-lucide:cloud"></div>
                    <div>从CookieCloud导入</div>
                  </div>
                </template>
                <el-form :model="cookiecloudForm">
                  <el-row gutter="50">
                    <el-col :span="12">
                      <el-form-item label="CookieCloud服务器地址" label-position="top" required>
                        <el-input v-model="cookiecloudForm.url" placeholder="格式：http://10.0.1.100:3000/cookiecloud"/>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label="用户密钥" label-position="top" required>
                        <el-input v-model="cookiecloudForm.userKey" placeholder="用户密钥"/>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row gutter="50">
                    <el-col :span="12">
                      <el-form-item label="端对端加密密码" label-position="top" required>
                        <el-input v-model="cookiecloudForm.password" placeholder="端对端加密密码"/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-button type="primary" w-full round @click="importSiteFromCookieCloud">从CookieCloud导入
                  </el-button>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <el-button mt-5 type="primary" @click="testConnected">连通性测试</el-button>

    <div flex flex-wrap gap-3 mt-5>
      <template v-for="site in sites" :key="site.id">
        <el-card w-180px>
          <div flex gap-2 items-center>
            <el-avatar size="small" bg-white :src="site.url+'favicon.ico'"></el-avatar>
            <div>{{ site.siteName }}</div>
          </div>
          <div text-gray text-xs font-400 my-2>{{ site.url }}</div>
          <div>
            <el-button size="small" round type="success">连通性测试</el-button>
          </div>
        </el-card>
      </template>
    </div>


    <el-button fixed bottom-5 right-5 type="primary" circle @click="addSiteVisible = true">
      <el-icon>
        <plus/>
      </el-icon>
    </el-button>

    <el-dialog v-model="addSiteVisible" title="添加站点">
      <el-form :model="addSiteForm">
        <el-row>
          <el-col :span="11">
            <el-form-item label="站点地址" label-position="top" required>
              <el-input v-model="addSiteForm.url" placeholder="格式：http://www.example.com/"/>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="使用代理" label-position="top">
              <el-switch v-model="addSiteForm.proxy" size="small"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="api-key" label-position="top">
          <el-input v-model="addSiteForm.apiKey" placeholder="站点名称"/>
        </el-form-item>
        <el-form-item label="Cookie" label-position="top">
          <el-input v-model="addSiteForm.cookie" type="textarea"/>
        </el-form-item>
        <el-form-item label="User-Agent" label-position="top">
          <el-input v-model="addSiteForm.userAgent" placeholder="获取Cookie的浏览器对应的User-Agent"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addSiteVisible = false">取消</el-button>
        <el-button type="primary" @click="addSite">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
:deep(.el-collapse) {
  --el-collapse-border-color: none;
}
</style>