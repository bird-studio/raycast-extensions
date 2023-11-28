import childProcess from "child_process";
import * as deepl from "deepl-node";
import { env } from "~/env";

/* c8 ignore start */

// TODO 別パッケージ化
export const say = (p: { text: string }) =>
  childProcess.exec(`say -v Samantha "${p.text}"`);

// TODO 別パッケージ化
const translator = new deepl.Translator(env.DEEPL_API_KEY);
export const translateText = (
  ...p: Parameters<typeof translator.translateText<string>>
) => translator.translateText(...p);

// TODO 別パッケージ化
const regExp = new RegExp(/^[a-zA-Z0-9!-/:-@¥[-`{-~ ]*$/);
const maybeEnglish = (p: { text: string }) => regExp.test(p.text);

// TODO 別パッケージ化
export const cmdA = () =>
  childProcess.exec(
    `osascript -e 'tell application "System Events" to keystroke "a" using {command down}'`,
  );
/* c8 ignore stop */

export const getTranslateTextParam = (p: { text: string }) => {
  const [sourceLang, targetLang] = maybeEnglish({
    text: p.text,
  })
    ? (["en", "ja"] as const)
    : (["ja", "en-US"] as const);

  return {
    sourceLang,
    targetLang,
  };
};
