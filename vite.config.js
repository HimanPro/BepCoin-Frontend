import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

export default defineConfig({
  plugins: [
    react(),
    obfuscatorPlugin({
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.75,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.4,
      disableConsoleOutput: true,
      identifierNamesGenerator: "hexadecimal",
      stringArray: true,
      stringArrayEncoding: ["rc4"],
      stringArrayThreshold: 0.75,
      rotateStringArray: true,
    }),
  ],

  build: {
    sourcemap: false,      // Disable source maps
    minify: "terser",      // Minify JS
    terserOptions: {
      compress: {
        drop_console: true,   // Remove console logs
        drop_debugger: true,  // Remove debugger statements
      },
      format: {
        comments: false,      // Remove comments
      },
    },
    outDir: "dist",          // Output folder
  },
});
