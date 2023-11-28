import * as R from "@raycast/api";

type TranslatedText = string;
export const fetchPreviousTranslatedText = () =>
  R.LocalStorage.getItem<TranslatedText>("TalkingTranslator.translated");

export const updatePreviousTranslatedText = (p: {
  translatedText: TranslatedText;
}) => R.LocalStorage.setItem("TalkingTranslator.translated", p.translatedText);
