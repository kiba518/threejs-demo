import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')  // 让 @ 指向 src 文件夹
    }
  },
  build: {
    chunkSizeWarningLimit: 15000, // 单位KB，默认500
  },
  server: {
    host: '0.0.0.0',      // 监听局域网所有 IP
    port: 5173            // 你自定义的端口
  }
})
