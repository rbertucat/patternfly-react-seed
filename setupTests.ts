import { configure as configureDom } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { cleanup, configure as configureReact } from "@testing-library/react";
import { afterEach } from "vitest";

configureReact({ asyncUtilTimeout: 8000 });
configureDom({ asyncUtilTimeout: 8000 });

afterEach(() => {
  cleanup();
});
