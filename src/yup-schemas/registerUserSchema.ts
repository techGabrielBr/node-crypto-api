import * as yup from 'yup';
import { string } from 'yup';

export const registerUserSchema = yup
    .object({
        name: string().required(),
        email: string().required(),
        password: string().required()
    })