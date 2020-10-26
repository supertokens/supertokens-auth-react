import * as React from "react";
import { EmailPasswordProps } from '../types';
import EmailPassword from "../emailPassword";
export default class SignInAndUp extends React.Component<EmailPasswordProps> {
    getRecipeInstanceOrThrow: () => EmailPassword;
    render(): JSX.Element;
}
