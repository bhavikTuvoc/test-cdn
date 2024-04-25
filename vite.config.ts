import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": JSON.stringify({
      NODE_ENV: process.env.NODE_ENV, // 'development' or 'production'
    }),
  },
  plugins: [react()],
  build: {
    // Output directory for the build files
    outDir: "dist",
    lib: {
      entry: "./src/main.tsx",
      name: "purple",
      // The file formats to output (UMD and ESM common formats for libraries)
      formats: ["umd", "es"],
    },
    rollupOptions: {
      // Externalize peer dependencies
      external: ["react", "react-dom"],
      output: {
        // Provide global variables to use in the UMD build
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
