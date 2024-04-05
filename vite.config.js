import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // server:{
  //   host: '192.168.2.114', //更改为本机ip
  //   port: 5173,
  // },
  css:{
    preprocessorOptions:{
      scss:{
        charset: false,
        additionalData:`@import './src/assets/variable.scss';`
      }
    }
  }
})
