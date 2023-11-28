import * as R from "@raycast/api";
import type * as type from "./type";
import { useTalkingTranslator } from "./hook";
import { match } from "ts-pattern";

const Success = (props: type.SuccessProps) => (
  <R.Form
    isLoading={props.submitting}
    actions={
      <R.ActionPanel>
        <R.Action.SubmitForm onSubmit={props.onSubmit} />
        {props.translatedText && (
          <R.Action
            shortcut={{ modifiers: ["cmd"], key: "s" }}
            title="Say translatedText"
            onAction={props.say}
          />
        )}
      </R.ActionPanel>
    }
  >
    <R.Form.TextArea
      {...{
        storeValue: true,
        id: "translationText",
        title: "Translation",
        placeholder: "Text to be translated.",
        error: props.error.msg,
        onFocus: props.onFocusTranslationText,
      }}
    />

    <R.Form.TextArea
      {...{
        id: "translated",
        title: "Translated",
        value: props.translatedText,
        onChange: props.setTranslatedText,
      }}
    />
  </R.Form>
);

const Fetching = () => <R.Form isLoading={true} />;

const TalkingTranslatorContainer = (props: type.Props) =>
  match(props)
    .with({ __type: "success" }, (p) => <Success {...p} />)
    .with({ __type: "fetching" }, () => <Fetching />)
    .exhaustive();

export const TalkingTranslator = () => (
  <TalkingTranslatorContainer {...useTalkingTranslator()} />
);
