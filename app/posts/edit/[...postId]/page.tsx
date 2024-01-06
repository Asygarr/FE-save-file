"use client";

import React from "react";

export default function page({
  params: { postId },
}: {
  params: {
    postId: string;
  };
}) {
  return (
    <div>
      <h1>Ini halaman edit post</h1>
    </div>
  );
}
