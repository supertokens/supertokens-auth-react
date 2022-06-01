import nodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length: number) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function generateOtpAndMapToToken(token: string, otpToTokenMapping: Map<string, string>): string {
    let otp;

    // generate an otp, if it is a duplicate retry otp generation until a unique otp is created
    while (true) {
        // generate 6 digit otp
        otp = generateString(6);

        if (!otpToTokenMapping.has(otp)) {
            break;
        }
    }

    // map otp to token
    otpToTokenMapping.set(otp, token);
    return otp;
}

function getTokenFromOtp(otp: string, otpToTokenMapping: Map<string, string>): string | undefined {
    let token = otpToTokenMapping.get(otp);
    return token;
}

let mailTransporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
    },
});

export { generateString, generateOtpAndMapToToken, mailTransporter, getTokenFromOtp };
