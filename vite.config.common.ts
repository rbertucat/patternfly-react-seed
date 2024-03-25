import pluginReact from "@vitejs/plugin-react-swc";
import path from "path";
import { UserConfig, splitVendorChunkPlugin } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import projectCommon from "./vite.config.constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const viteConfig = (projectConfig: Record<string, any>) => {
  const viteBase = {
    test: {
      env: {
        TZ: "UTC",
      },
      watch: false,
      testTimeout: process.env.CI ? 15000 : 10000,
      globals: true,
      environment: "jsdom",
      setupFiles: [path.resolve(__dirname, "setupTests.ts")],
      clearMocks: true,
    },
    root: projectCommon.paths.app,
    envDir: __dirname,
    plugins: [
      pluginReact({ devTarget: "es2022" }),
      viteTsConfigPaths(),
      splitVendorChunkPlugin(),
    ],
    css: {
      modules: {
        localsConvention: "camelCaseOnly" as const,
      },
    },
  };


  const configuration: UserConfig = {
    ...viteBase,
    server: {
      host: projectCommon.server.host,
      port: projectCommon.server.port,
      open: true,
      proxy: Object.assign(
        {
          "/websocket": {
            target: `ws://127.0.0.1:8080/${projectConfig.remote.path}`,
            ws: true,
            cookiePathRewrite: projectConfig.remote.cookiePathRewrite,
          },
        },
      ),
    },
    build: {
      emptyOutDir: true,
      // Relative to the root
      outDir: projectCommon.paths.build,
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes("node_modules") && id.includes("victory")) {
              return "victory";
            }
            if (id.includes("node_modules") && id.includes("d3")) {
              return "d3";
            }
            // creating a chunk to react routes deps. Reducing the vendor chunk size
            if (id.includes("react-router-dom") || id.includes("@remix-run") || id.includes("react-router")) {
              return "router";
            }

          },
        },
      },
    },
  };

  return configuration;
};
