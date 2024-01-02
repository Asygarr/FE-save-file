"use client";

import { axiosInstance } from "@/libs/axios-instance";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function usersPage() {
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users");

      return res;
    },
  });

  const deleteUserQuery = useMutation({
    mutationKey: ["user"],
    mutationFn: async (uuid: string) => {
      await axiosInstance.delete(`/users/${uuid}`);
    },
    onSuccess: () => {
      userQuery.refetch();
    },
  });

  return (
    <div>
      <Link
        href={"/users/add"}
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Tambah user
      </Link>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userQuery.data?.data.map((user: any, index: any) => (
              <tr key={index} className="bg-base-200">
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    href={`/users/edit/${user.id}`}
                    className="btn btn-outline btn-accent mx-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUserQuery.mutate(user.id)}
                    className="btn btn-outline btn-accent mx-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
