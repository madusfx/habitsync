import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('O campo nome é obrigatório'),
  email: yup
    .string()
    .required('O campo e-mail é obrigatório')
    .email('Insira um e-mail válido'),
  password: yup
    .string()
    .required('O campo senha é obrigatório')
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('O campo e-mail é obrigatório'),
  password: yup
    .string()
    .required('O campo senha é obrigatório')
});

export const newHabitSchema = yup.object().shape({
  name: yup
    .string()
    .required('O campo nome é obrigatório'),
})