import { getPhoneNumberUtils } from "./phoneNumberUtils";

// This was moved to a separate file to make tree-shaking more effective, since we do not want to include the phoneNumberUtils
// in the base pwless recipe because it increases the bundle size by a lot
export async function defaultPhoneNumberValidator(value: string) {
    if (typeof value !== "string") {
        return "GENERAL_ERROR_PHONE_NON_STRING";
    }

    value = value.trim();

    const intlTelInputUtils = await getPhoneNumberUtils();

    if (!intlTelInputUtils.isValidNumber(value, undefined as any)) {
        return "GENERAL_ERROR_PHONE_INVALID";
    }
    return undefined;
}
