import { useEffect } from 'react';
import {
  IUseGoogleOneTapLogin,
  IGoogleCallbackResponse,
} from './types';
import useScript from './useScript';

const scriptFlag: string = '__googleOneTapScript__';
const googleClientScriptURL: string = 'https://accounts.google.com/gsi/client';

function callback({
  data,
  onSuccess,
}: {
  data: IGoogleCallbackResponse;
  onSuccess?: IUseGoogleOneTapLogin['onSuccess'];
}) {
  if (onSuccess) {
    onSuccess(data);
  }
}

export function useGoogleOneTapLogin({
  disabled,
  onSuccess,
  googleAccountConfigs,
  disableCancelOnUnmount = false,
}: IUseGoogleOneTapLogin) {
  const script = useScript(googleClientScriptURL);
  // Use the user's custom callback if they specified one; otherwise use the default one defined above:
  const callbackToUse = googleAccountConfigs.callback
    ? googleAccountConfigs.callback
    : (data: IGoogleCallbackResponse) => callback({ data, onSuccess });

  useEffect(() => {
    if (!window?.[scriptFlag] && window.google && script === 'ready') {
      window.google.accounts.id.initialize({
        ...googleAccountConfigs,
        callback: callbackToUse,
      });
      window[scriptFlag] = true;
    }
    if (window?.[scriptFlag] && script === 'ready' && !disabled) {
      window.google.accounts.id.prompt();

      return () => {
        if (!disableCancelOnUnmount) {
          window.google.accounts.id.cancel();
        }
      };
    }
  }, [script, window?.[scriptFlag], disabled]);

  return null;
}