import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(
    {
        template: {
            compilerOptions: {
                // 将所有带jc-的标签名都视为自定义元素
                isCustomElement: (tag) => tag.includes('jc-')
            }
        }
    }
  )],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
