import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  // resolve: {
  //   alias: {
  //     "@utils": path.resolve(__dirname, "./src/shared/utils"),
  //   },
  // },
  test: {
    globals: true,
    environment: "jsdom",
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
