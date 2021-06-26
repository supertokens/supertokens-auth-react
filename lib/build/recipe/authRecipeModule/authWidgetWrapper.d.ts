import React from "react";
declare type Props = {
    onSessionAlreadyExists: () => void;
};
/**
 * AuthWidgetWrapper shows the children component only if no session exists,
 * else it calls onSessionAlreadyExists
 */
declare const AuthWidgetWrapper: React.FC<Props>;
export default AuthWidgetWrapper;
