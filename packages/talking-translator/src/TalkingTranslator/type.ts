type Form = {
  translationText: string;
};

export type SuccessProps = {
  __type: "success";
  say: () => void;
  translatedText: string;
  error: {
    msg: string;
  };
  submitting: boolean;
  onSubmit: (p: Form) => void;
  setTranslatedText: (p: string) => void;
  onFocusTranslationText: () => void;
};

type FetchingProps = {
  __type: "fetching";
};

export type Props = SuccessProps | FetchingProps;
