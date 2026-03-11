import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      outDir: 'dist/types',
      rollupTypes: true,
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/fonts/*.OTF',
          dest: 'assets/fonts',
        },
      ],
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "${resolve(__dirname, 'src/styles/variables').replace(/\\/g, '/')}" as *;
          @use "${resolve(__dirname, 'src/styles/breakpoints').replace(/\\/g, '/')}" as *;
        `,
      },
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      input: resolve(__dirname, 'src/index.ts'),
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: 'assets/[name][extname]',
      },
    },
    assetsInlineLimit: 0,
    sourcemap: true,
    emptyOutDir: true,
  },
})