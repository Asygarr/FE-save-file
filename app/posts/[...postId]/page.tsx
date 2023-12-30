"use client";

import { axiosInstance } from "@/lib/axios-instance";
import React, { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  file: string;
}

export default function page({
  params: { postId },
}: {
  params: {
    postId: string;
  };
}) {
  const [postById, setPostById] = useState<Post>({
    id: "",
    title: "",
    file: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getPostById = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${postId}`);

        console.log(res.data.message);
        setPostById(res.data.data);
      } catch (error) {
        setMessage((error as any).response.data.message);
      }
    };

    getPostById();
  }, [postId]);

  return (
    <div className="flex justify-center items-center mt-10 flex-wrap">
      <h1 className="text-center">{message}</h1>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-8">
        {postById.file.split(",").length > 1 ? (
          postById.file.split(",").map((file, index) => (
            <a href="#" key={index}>
              <img className="rounded-t-lg" src={file} alt="" />
            </a>
          ))
        ) : (
          <a href="#">
            <img className="rounded-t-lg" src={postById.file} alt="" />
          </a>
        )}
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {postById.title}
            </h5>
          </a>
        </div>
      </div>
    </div>
  );
}
