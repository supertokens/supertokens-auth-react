import JsonWebToken from "jsonwebtoken";
import type { JwtHeader, JwtPayload, SigningKeyCallback } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { appInfo } from "./config/appInfo";

const client = jwksClient({
    jwksUri: `${appInfo.apiDomain}${appInfo.apiBasePath}/jwt/jwks.json`,
});

async function verifyToken(token: string): Promise<JwtPayload> {
    const getPublicKey = (header: JwtHeader, callback: SigningKeyCallback) => {
        client.getSigningKey(header.kid, (err, key) => {
            if (err) {
                callback(err);
            } else {
                const signingKey = key?.getPublicKey();
                callback(null, signingKey);
            }
        });
    };

    return new Promise((resolve, reject) => {
        JsonWebToken.verify(token, getPublicKey, {}, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded as JwtPayload);
            }
        });
    });
}
