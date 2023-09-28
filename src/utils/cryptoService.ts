import * as crypto from "crypto";

export default class CryptoService {
    static encryptText = function(data: string){
        const cipher = crypto.createCipheriv(
            CRYPTO_CONFIG.algorithm, 
            CRYPTO_CONFIG.secretKey, 
            CRYPTO_CONFIG.iv
        );

        let encryptedText = cipher.update(
            data, 
            CRYPTO_CONFIG.inputEncoding, 
            CRYPTO_CONFIG.outputEncoding
        );
        encryptedText += cipher.final(CRYPTO_CONFIG.outputEncoding);

        return encryptedText;
    }

    static decryptData = function(data: string){
        const decipher = crypto.createDecipheriv(
            CRYPTO_CONFIG.algorithm,
            CRYPTO_CONFIG.secretKey, 
            CRYPTO_CONFIG.iv
        );

        let decryptedText = decipher.update(data, 
            CRYPTO_CONFIG.outputEncoding, 
            CRYPTO_CONFIG.inputEncoding
        );
        decryptedText += decipher.final(CRYPTO_CONFIG.inputEncoding);

        return decryptedText;
    }
}

const CRYPTO_CONFIG = {
    secretKey: Buffer.from("0a308b28053c4eae27bd6f16ce486515d5c1bc1fb08d91afd844d4317f7b2767", "hex") as crypto.CipherKey,
    iv: Buffer.from("1e04e6b4f08e97b06c58085944c6e75b", "hex") as crypto.BinaryLike,
    algorithm: "aes-256-cbc" as string,
    outputEncoding: "hex" as crypto.Encoding,
    inputEncoding: "utf-8" as crypto.Encoding
}