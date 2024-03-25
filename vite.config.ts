import { defineConfig } from "vite";
import { viteConfig } from "./vite.config.common";
import ProjectConfig from "./vite.config.project";

export default defineConfig(viteConfig(ProjectConfig));
