"use client";

import { axiosInstance } from "@/lib/axios-instance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";

export default function page({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confPassword: "",
    },
    onSubmit: (values) => {
      const { name, email, password, confPassword } = values;

      userUpdateQuery.mutate({
        name,
        email,
        password,
        confPassword,
      });

      formik.resetForm();
    },
  });

  useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${userId}`);

      formik.setFieldValue("name", res.data.name);
      formik.setFieldValue("email", res.data.email);

      return res;
    },
  });

  const userUpdateQuery = useMutation({
    mutationKey: ["user", userId],
    mutationFn: async (body: any) => {
      const res = await axiosInstance.patch(`/users/${userId}`, body);

      return res;
    },
  });

  return (
    <div>
      <h1 className="text-center">
        {userUpdateQuery.isError
          ? (userUpdateQuery.error as any)?.response.data.message
          : "Update data anda"}
      </h1>

      <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nama kamu
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="nama kamu"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email kamu
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@gmail.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password kamu
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="password baru kamu"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ulangi password kamu
          </label>
          <input
            type="password"
            id="repeat-password"
            name="confPassword"
            value={formik.values.confPassword}
            onChange={formik.handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="ulangi password baru kamu"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update user
        </button>
      </form>
    </div>
  );
}
