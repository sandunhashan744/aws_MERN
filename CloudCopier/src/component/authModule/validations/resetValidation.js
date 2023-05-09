import * as Yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]).{5,}$/;

export const resetSchema = Yup.object().shape({
    
    password: Yup.string()
        .min(5)
        .matches(passwordRules, { message: "Please create a stronger password" })
        .required('Should be Required..!😡'),

    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], "Password Not Matched..!😒")
        .required('Should be Required..!😡')
});
