import CryptoService from "./cryptoService";

describe("crypto service tests", () => {
    describe("encrypt function", () => {
        test("should return encrypted data", () => {
            const encryptedValue = CryptoService.encryptText("12345");
            expect(encryptedValue).toBe("44c57a1d6bce1a3f4914f658e7722c2e");
        });
    });

    describe("decrypt function", () => {
        test("should return decrypted data", () => {
            const decryptedValue = CryptoService.decryptData("44c57a1d6bce1a3f4914f658e7722c2e");
            expect(decryptedValue).toBe("12345");
        });
    });
});