import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig((_) => {
  return {
    root: "src",
    build: {
      outDir: "../dist",
      rollupOptions: {
        input: {
          manHourManage: resolve(
            __dirname,
            "src/content_scripts/manHourManage.ts"
          ),
        },
        output: {
          entryFileNames: "[name].js",
        },
      },
    },
  };
});
