"use client";

import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios-instance";
import Link from "next/link";

interface Post {
  id: string;
  file: string;
  title: string;
}

export default function postPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/posts");

      setPosts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex justify-around mt-10 flex-wrap">
      {posts.map((post, index) => (
        <Link
          href={`/posts/${post.id}`}
          key={index}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-8 cursor-pointer"
        >
          {post.file.split(",").map((file, index) => (
            <a href="#" key={index}>
              <img className="rounded-t-lg" src={file} alt="" />
            </a>
          ))}
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {post.title}
              </h5>
            </a>
          </div>
        </Link>
      ))}
    </div>
  );
}
