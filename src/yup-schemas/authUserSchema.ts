import * as yup from 'yup';

export const authUserSchema = yup
    .object({
        email: yup.string().required(),
        password: yup.string().required()
    })