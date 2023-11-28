import { vi } from "vitest";

vi.mock("~/env", () => ({
  env: {
    DEEPL_API_KEY: "dummy",
  },
}));
