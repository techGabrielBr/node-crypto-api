declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string

            //POSTGRESQL
            DATABASE_URL: string

            //CRYPTO
            SECRET_KEY: string
            IV: string
            ALGORITHM: string
            OUTPUT_ENCODING: string
            INPUT_ENCODING: string
        }
    }
}
export { };