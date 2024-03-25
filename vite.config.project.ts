const PROJECT_NAME = "patterfly-react-seed" as const;

const ProjectConfig = {
  remote: {
    host: "localhost",
    path: `${PROJECT_NAME}`,
    cookiePathRewrite: {
      [`${PROJECT_NAME}`]: "/",
    },
  },
  targetBuildPath: PROJECT_NAME,
} as const;

export default ProjectConfig;
