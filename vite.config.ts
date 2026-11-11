import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';
import react from '@vitejs/plugin-react';
import {viteSingleFile} from 'vite-plugin-singlefile';
export default defineConfig({root:'app',resolve:{alias:{'/src':fileURLToPath(new URL('./src',import.meta.url))}},plugins:[react(),viteSingleFile()],base:'./',build:{outDir:'../dist',emptyOutDir:true,assetsInlineLimit:1000000}});
