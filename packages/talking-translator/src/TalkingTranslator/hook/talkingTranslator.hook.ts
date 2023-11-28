import { useState } from "react";
import type * as type from "../type";
import * as R from "@raycast/api";
import { usePromise } from "@raycast/utils";
import * as service from "./service";
import * as repository from "./repository";

type State = {
  translatedText: string;
  submitting: boolean;
  error: {
    msg: string;
  };
  readingText: string;
};
const useTalkingTranslatorState = () => {
  const [state, dispatch] = useState<State>({
    translatedText: "",
    submitting: false,
    readingText: "",
    error: {
      msg: "",
    },
  });

  const d = <T extends keyof State>(p: Pick<State, T>) =>
    dispatch((o) => ({
      ...o,
      ...p,
    }));

  return {
    state,
    dispatch: {
      translatedText: d,
      submitting: d,
      error: d,
      readingText: d,
    },
  };
};

const useTalkingTranslatorHandler = () => {
  const talkingTranslator = useTalkingTranslatorState();

  const response = usePromise(repository.fetchPreviousTranslatedText, [], {
    onData: (translatedText) => {
      if (!translatedText) {
        return;
      }
      talkingTranslator.dispatch.translatedText({ translatedText });
      talkingTranslator.dispatch.translatedText({
        readingText: translatedText,
      });
    },
  });

  return {
    talkingTranslator,
    response,
  };
};

type UseTalkingTranslator = () => type.Props;
export const useTalkingTranslator: UseTalkingTranslator = () => {
  const { response, talkingTranslator } = useTalkingTranslatorHandler();

  if (response.error) {
    throw new Error(JSON.stringify(response.error));
  }

  if (response.isLoading) {
    return { __type: "fetching" };
  }

  return {
    ...talkingTranslator.state,
    __type: "success",
    onFocusTranslationText: service.cmdA,
    say: () => service.say({ text: talkingTranslator.state.readingText }),
    setTranslatedText: (translatedText) =>
      talkingTranslator.dispatch.translatedText({ translatedText }),
    onSubmit: (p) => {
      talkingTranslator.dispatch.submitting({ submitting: true });
      const translateParam = service.getTranslateTextParam({
        text: p.translationText,
      });

      service
        .translateText(
          p.translationText,
          translateParam.sourceLang,
          translateParam.targetLang,
        )
        .then((r) => {
          R.showToast({
            title: "Success",
          });

          const readingText =
            translateParam.sourceLang === "ja" ? r.text : p.translationText;

          service.say({ text: readingText });
          talkingTranslator.dispatch.readingText({ readingText });
          talkingTranslator.dispatch.translatedText({
            translatedText: r.text,
          });

          repository.updatePreviousTranslatedText({
            translatedText: r.text,
          });
        })
        .catch((e) => {
          console.error(e);
          talkingTranslator.dispatch.error({ error: { msg: "Error 😢" } });
          R.showToast({
            style: R.Toast.Style.Failure,
            title: "Error",
          });
        })
        .finally(() => {
          talkingTranslator.dispatch.submitting({ submitting: false });
        });
    },
  };
};
