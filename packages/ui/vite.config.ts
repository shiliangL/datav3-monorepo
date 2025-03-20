import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types'
    })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: '@dva3-ui',
      formats: ['es'],
      fileName: (format) => `[name].[format].js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].[format].js',
        chunkFileNames: '[name]-[hash].[format].js',
        manualChunks: undefined
      }
    }
  }
})