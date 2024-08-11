import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles:  ["./setupTests.js"],
  },
  resolve: {
    alias:{
      src: path.resolve(__dirname, "src"),

    }
  }
})
