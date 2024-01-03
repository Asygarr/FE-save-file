import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required("Name wajib di isi").min(5, "Minimal 5 karakter"),
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: yup.string().min(5, "Password minimal 5 karakter"),
  confPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password harus sama"), // one of berfungsi untuk membandingkan value dengan value lainnya dan yup.ref untuk mengambil value dari field lainnya
});
