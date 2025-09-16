import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

// https://vite.dev/config/
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
     sourcemap: false,  
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
  },
});
