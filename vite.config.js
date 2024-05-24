import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'



export default defineConfig(({ mode }) => {
  return {
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
    },
    plugins: [vue()]
    // Other Vite configurations
  };
});


