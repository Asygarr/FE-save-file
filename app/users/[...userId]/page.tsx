import React from "react";

export default function page({
  params: { userId },
}: {
  params: { userId: string };
}) {
  return (
    <div>
      <h1>User ini berdasarkan Id : {userId}</h1>
    </div>
  );
}
