import * as crypto from "crypto";   
import "dotenv/config";

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

const ENV = process.env;

const CRYPTO_CONFIG = {
    secretKey: Buffer.from(ENV.SECRET_KEY as WithImplicitCoercion<string>, ENV.OUTPUT_ENCODING as BufferEncoding) as crypto.CipherKey,
    iv: Buffer.from(ENV.IV as WithImplicitCoercion<string>, ENV.OUTPUT_ENCODING as BufferEncoding) as crypto.BinaryLike,
    algorithm: ENV.ALGORITHM as string,
    outputEncoding: ENV.OUTPUT_ENCODING as crypto.Encoding,
    inputEncoding: ENV.INPUT_ENCODING as crypto.Encoding
}