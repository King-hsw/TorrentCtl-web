import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetIcons, presetWind3, } from "unocss";
import { fileURLToPath, URL } from 'node:url'
import { lazyImport, VxeResolver } from "vite-plugin-lazy-import"; // 确保导入 fileURLToPath 和 URL

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [
        presetWind3(),          // 基础原子化工具类
        presetAttributify(),  // 属性化写法（可选）
        presetIcons({
          // 自动下载图标数据（也可以手动安装@iconify-json/...）
          scale: 1,
          warn: true,
        }),
      ],
    }),
    lazyImport({
      resolvers: [
        VxeResolver({ libraryName: "vxe-table" }),
      ],
    })
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // 后端地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  }
})
