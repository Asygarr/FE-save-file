"use client";

import { axiosInstance } from "@/libs/axios-instance";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function postPage() {
  const fetchPostQuery = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");

      return res;
    },
  });

  const deletePostQuery = useMutation({
    mutationKey: ["post"],
    mutationFn: async (uuid: string) => {
      await axiosInstance.delete(`/posts/${uuid}`);
    },
    onSuccess: () => {
      fetchPostQuery.refetch();
    },
  });

  const PostItem: React.FC<{ post: any }> = ({ post }) => {
    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-8 cursor-pointer">
        <Link href={`/posts/${post.id}`}>
          {post.file.split(",").length > 1 ? (
            post.file
              .split(",")
              .map((file: any, index: any) => (
                <img key={index} className="rounded-t-lg" src={file} alt="" />
              ))
          ) : (
            <img className="rounded-t-lg" src={post.file} alt="" />
          )}
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.title}
            </h5>
          </div>
        </Link>

        <Link
          href={`/posts/edit/${post.id}`}
          className="btn btn-outline btn-accent mx-2"
        >
          Edit
        </Link>
        <button
        onClick={() => deletePostQuery.mutate(post.id)}
        className="btn btn-outline btn-accent mx-2">Delete</button>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-center">
        {fetchPostQuery.isError
          ? (fetchPostQuery.error as any)?.response.data.message
          : "Data berhasil di tampilkan"}
      </h1>
      <div className="flex justify-around flex-wrap">
        {fetchPostQuery.data?.data.map((post: any) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
