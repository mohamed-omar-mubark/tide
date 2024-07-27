import React from "react";

// components
import { Button } from "primereact/button";

const Post = ({ post }) => {
  console.log(post);
  return (
    <div className="post p-3 bg-white border-round-xl">
      <div className="post-head mb-3 flex-between-center">
        <div className="flex-start-center gap-3">
          <img
            src={post.data.author?.image}
            alt={post.data.author?.name}
            className="w-3rem border-circle"
          />

          <div className="flex flex-column gap-2">
            <span className="font-semibold text-gray-700">
              {post.data.author?.name}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {post.data.author?.role}
            </span>
          </div>
        </div>

        <Button
          icon="pi pi-ellipsis-v"
          text
          rounded
          severity="secondary"
          size="small"
        />
      </div>

      <div
        className="post-image mb-3 h-20rem bg-no-repeat bg-cover bg-center border-round-xl"
        style={{
          backgroundImage: `url(${post.data.image})`,
        }}></div>

      <div className="post-statistics mb-3 flex-between-center px-3">
        <div className="flex-start-center gap-3">
          <i
            className={`pi pi-heart text-2xl ${
              post.data.isLiked ? "text-red-500" : "text-gray-500"
            }`}></i>
          <span className="font-medium text-gray-700">
            <span className="font-semibold">{post.data.likes} </span>
            Likes
          </span>
        </div>

        <span className="text-sm font-medium text-gray-500">
          {new Date(post.data?.time?.toDate()).toLocaleString()}
        </span>
      </div>

      <div className="post-content flex flex-column gap-2 px-3">
        <span className="font-semibold text-gray-700">{post.data.title}</span>
        <span className="text-sm text-gray-500">{post.data.description}</span>
      </div>
    </div>
  );
};

export default Post;
