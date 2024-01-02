import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required("Name wajib diisi"),
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: yup.string().required().min(8, "Password minimal 8 karakter"),
  confPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"), // one of berfungsi untuk membandingkan value dengan value lainnya dan yup.ref untuk mengambil value dari field lainnya
});
