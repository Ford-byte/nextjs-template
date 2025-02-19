"use client";
import apiClient from "@/app/axios";
import { useState } from "react";

export default function CreateRole(props) {
  const [permission, setPermission] = useState("");
  const [description, setDescription] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/api/permissions", {
        permission: permission,
        description: description,
        keyword: keyword,
      });
      props?.trigger?.();
      setPermission("");
      setDescription("");
      setKeyword("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="full-center">
      <span
        className="fixed w-full h-full bg-black/50"
        onClick={props?.toggle}
      ></span>
      <div className="bg-white  min-w-[500px] rounded-md p-[12px] z-[20]">
        <h2 className="uppercase text-xl font-bold tracking-widest">
          ADD PERMISSION
        </h2>
        <form
          action=""
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-[12px] py-[12px]"
        >
          <input
            type="text"
            value={permission}
            className="w-full border py-[12px] px-[6px]"
            onChange={(e) => setPermission(e.target.value)}
            placeholder="Enter permission"
          />
          <input
            type="text"
            value={description}
            className="w-full border py-[12px] px-[6px]"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
          <input
            type="text"
            value={keyword}
            className="w-full border py-[12px] px-[6px]"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword"
          />
          <button type="submit" className="secondary-button">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
