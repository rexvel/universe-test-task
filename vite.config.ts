/// <reference types="vitest" />

import path from 'path';
import { defineConfig, normalizePath } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const cMapsDir = normalizePath(
  path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps'),
);
const standardFontsDir = normalizePath(
  path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'standard_fonts'),
);

const pdfWorkerMinPath = normalizePath(
  path.join(
    path.dirname(require.resolve('pdfjs-dist/package.json')),
    'build',
    'pdf.worker.min.mjs',
  ),
);

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: pdfWorkerMinPath,
          dest: '',
        },
        {
          src: cMapsDir,
          dest: '',
        },
        {
          src: standardFontsDir,
          dest: '',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/vitest.setup.ts',
    include: ['**/?(*.)test.ts?(x)'],
  },
});
