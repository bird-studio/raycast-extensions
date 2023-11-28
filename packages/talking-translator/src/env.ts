import { getPreferenceValues } from "@raycast/api";

// TODO ライブラリ化
function assertIsString(x: unknown, name: string): asserts x is string {
  if (typeof x !== "string") {
    throw new Error(`${name} must be a string.`);
  }
}

const DEEPL_API_KEY = getPreferenceValues<{ DEEPL_API_KEY: string }>()
  .DEEPL_API_KEY;

assertIsString(DEEPL_API_KEY, "DEEPL_API_KEY");

export const env = {
  DEEPL_API_KEY,
};
