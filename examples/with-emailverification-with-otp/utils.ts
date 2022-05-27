// program to generate random strings

// declare all characters
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

enum mapping_responses {
    OTP_EXISTS,
}

function generateString(length: number) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

let otpToTokenMapping = new Map<String, String>();

function storeOtpToTokenMappingIfNotExsits(otp: string, token: string) {
    // check if the otp already exists:
    if (otpToTokenMapping.has(otp)) {
        return;
    }
}

export { generateString, otpToTokenMapping, storeOtpToTokenMappingIfNotExsits };
