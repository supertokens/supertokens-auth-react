import { Fragment } from "react";
import { useTranslation } from "../../../../../translation/translationContext";
import styles from "../styles.css";

export const AccessDeniedTheme = (): JSX.Element => {
    const t = useTranslation();
    return (
        <Fragment>
            <div data-supertokens="sessionAccessDenied">{t("ACCESS_DENIED")}</div>
            <style>{styles}</style>
        </Fragment>
    );
};
