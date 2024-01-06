"use client";

import { axiosInstance } from "@/libs/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { userSchema } from "@/libs/validation-schema-user";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confPassword: "",
    },
    onSubmit: (values) => {
      const { name, email, password, confPassword } = values;

      userQueryAdd.mutate({
        email,
        name,
        password,
        confPassword,
      });
    },
    validationSchema: userSchema,
  });

  const userQueryAdd = useMutation({
    mutationKey: ["user"],
    mutationFn: async (body: any) => {
      const res = await axiosInstance.post("/users", body);

      return res;
    },
    onSuccess: () => {
      formik.resetForm();
      router.push("/users");
    },
  });

  return (
    <div>
      <h1 className="text-center">
        {userQueryAdd.isError
          ? (userQueryAdd.error as any)?.response.data.message
          : "Masukkan data anda"}
      </h1>

      <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nama kamu
          </label>
          <input
            type="text"
            name="name" // menghubungkan dengan formik
            onChange={formik.handleChange} // menghubungkan dengan formik
            value={formik.values.name} // menghubungkan dengan formik
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="nama kamu"
            required
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email kamu
          </label>
          <input
            type="email"
            name="email" // menghubungkan dengan formik
            onChange={formik.handleChange} // menghubungkan dengan formik
            value={formik.values.email} // menghubungkan dengan formik
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@gmail.com"
            required
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password kamu
          </label>
          <input
            type="password"
            name="password" // menghubungkan dengan formik
            onChange={formik.handleChange} // menghubungkan dengan formik
            value={formik.values.password} // menghubungkan dengan formik
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="password kamu"
            required
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Ulangi password kamu
          </label>
          <input
            type="password"
            name="confPassword" // menghubungkan dengan formik
            onChange={formik.handleChange} // menghubungkan dengan formik
            value={formik.values.confPassword} // menghubungkan dengan formik
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="ulangi password kamu"
            required
          />
          {formik.errors.confPassword && formik.touched.confPassword ? (
            <div className="text-red-500 text-sm">
              {formik.errors.confPassword}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Tambah user
        </button>
      </form>
    </div>
  );
}
