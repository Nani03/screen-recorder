import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'] // Prevent duplicate React instances
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'), // Entry point for the library
      name: 'ScreenRecorder',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`, // Output filenames
      formats: ['es', 'cjs'] // Generate ES module and CommonJS builds
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Exclude React from the bundle
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    outDir: 'dist', // Output directory
    emptyOutDir: false, // Clear the dist folder before building
    // Preserve .d.ts files
  }
});