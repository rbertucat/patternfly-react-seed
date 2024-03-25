import path from "path";
const HOST = process.env.HOST || "localhost"; // use "local-ip" for local debug
const PORT = process.env.PORT || 8081;
const PROXY = `http://${HOST}:${PORT}`;
const DIR_PATH = path.join.bind(this, __dirname);
const PROJECT_PATH = path.join.bind(this, process.cwd());

const projectCommon = {
  paths: {
    bg_images: "bgimages",
    build: PROJECT_PATH("dist"),
    node_modules: DIR_PATH("node_modules"),
    jedi_root_path: DIR_PATH("./"),
    tsconfig: PROJECT_PATH("tsconfig.json"),
    projectPath: PROJECT_PATH(""),
    favicon: PROJECT_PATH("src/favicon.png"),
    index_tsx: PROJECT_PATH("src/index.tsx"),
    index_html: PROJECT_PATH("src/index.html"),
    app: PROJECT_PATH("src"),

    asset: process.env.ASSET_PATH || "",
  },
  server: {
    host: HOST,
    port: Number(PORT),
    proxy: PROXY,
    ssl: process.env.SERVER_SSL || false,
    context: ["/api", "/restapi"],
  },
};

export default projectCommon;
