"use client";

import { axiosInstance } from "@/libs/axios-instance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function page({
  params: { postId },
}: {
  params: {
    postId: string;
  };
}) {
  const router = useRouter();

  const postByIdQuery = useQuery({
    queryKey: ["postById", postId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/posts/${postId}`);

      return res;
    },
  });

  const deletePostQuery = useMutation({
    mutationKey: ["post", postId],
    mutationFn: async (uuid: string) => {
      await axiosInstance.delete(`/posts/${postId}`);
    },
    onSuccess: () => {
      router.push("/posts");
    },
  });

  return (
    <div className="justify-center items-center mt-10 flex-wrap">
      <h1 className="text-center">
        {postByIdQuery.isError
          ? (postByIdQuery.error as any)?.response.data.message
          : "Behasil mendapatkan post"}
      </h1>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-8">
        {postByIdQuery.data?.data.file.split(",").length > 1 ? (
          postByIdQuery.data?.data.file
            .split(",")
            .map((file: any, index: any) => (
              <img key={index} className="rounded-t-lg" src={file} alt="" />
            ))
        ) : (
          <img
            className="rounded-t-lg"
            src={postByIdQuery.data?.data.file}
            alt=""
          />
        )}
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {postByIdQuery.data?.data.title}
          </h5>

          <Link
            href={`/posts/edit/${postId}`}
            className="btn btn-outline btn-accent mx-2"
          >
            Edit
          </Link>
          <button
            onClick={() => deletePostQuery.mutate(postId)}
            className="btn btn-outline btn-accent mx-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
