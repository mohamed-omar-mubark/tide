import React from "react";

// components
import { Button } from "primereact/button";

const Post = ({ post }) => {
  return (
    <div className="post p-3 bg-white border-round-xl">
      <div className="post-head mb-3 flex-between-center">
        <div className="flex-start-center gap-3">
          <img
            src={post.author.image}
            alt={post.author.name}
            className="w-3rem border-circle"
          />

          <div className="flex flex-column gap-2">
            <span className="font-semibold text-gray-700">
              {post.author.name}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {post.author.role}
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
          backgroundImage: `url(${post.image})`,
        }}></div>

      <div className="post-statistics mb-3 flex-between-center px-3">
        <div className="flex-start-center gap-3">
          <i
            className={`pi pi-heart text-2xl ${
              post.isLiked ? "text-red-500" : "text-gray-500"
            }`}></i>
          <span className="font-medium text-gray-700">
            <span className="font-semibold">{post.likes} </span>
            Likes
          </span>
        </div>

        <span className="text-sm font-medium text-gray-500">{post.time}</span>
      </div>

      <div className="post-content flex flex-column gap-2 px-3">
        <span className="font-semibold text-gray-700">{post.title}</span>
        <span className="text-sm text-gray-500">{post.description}</span>
      </div>
    </div>
  );
};

export default Post;
