import { memo } from 'react';
import { IGoogleOneTapLogin } from './types';
import { useGoogleOneTapLogin } from './useGoogleOneTapLogin';

function GoogleOneTapLogin({ children = null, ...props }: IGoogleOneTapLogin) {
  useGoogleOneTapLogin(props);
  return children;
}

export default memo(GoogleOneTapLogin);

export { useGoogleOneTapLogin };