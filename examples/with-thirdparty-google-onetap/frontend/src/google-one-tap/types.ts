import { ReactElement } from 'react';

declare global {
  interface Window {
    google: any;
    [key: string]: any;
  }
}

export interface IGoogleOneTapLogin extends IUseGoogleOneTapLogin {
  children?: ReactElement | null;
}

export interface IUseGoogleOneTapLogin {
  disabled?: boolean;
  disableCancelOnUnmount?: boolean;
  googleAccountConfigs: IGoogleOneTapLoginProps;
  onSuccess?: (response: IGoogleCallbackResponse) => void;
}

export interface IGoogleOneTapLoginProps {
  nonce?: string;
  context?: string;
  client_id: string;
  auto_select?: boolean;
  prompt_parent_id?: string;
  state_cookie_domain?: string;
  cancel_on_tap_outside?: boolean;
  callback?: (...args: any) => any;
  native_callback?: (...args: any) => any;
}

export interface IGoogleCallbackResponse {
  credential?: string;
}
