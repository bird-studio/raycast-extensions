import { describe, test, expect } from "vitest";
import { getTranslateTextParam } from "./service";

describe.concurrent("getTranslateTextParam", () => {
  type TestData = {
    param: Parameters<typeof getTranslateTextParam>[0];
    expected: ReturnType<typeof getTranslateTextParam>;
  };
  const testData: TestData[] = [
    {
      param: {
        text: "This is a pen.",
      },
      expected: {
        sourceLang: "en",
        targetLang: "ja",
      },
    },
    {
      param: {
        text: "こんにちは",
      },
      expected: {
        sourceLang: "ja",
        targetLang: "en-US",
      },
    },
  ];

  test.each(testData)("I/O %o", ({ param, expected }) => {
    expect(getTranslateTextParam(param)).toEqual(expected);
  });
});
