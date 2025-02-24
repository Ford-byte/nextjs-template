"use client";

import apiClient from "./axios";

const accessControl = async (e) => {
  if (!e) return null;

  try {
    const response = await apiClient.get(
      `/api/user/permissions/permissions?user_id=${e}`
    );
    return response?.data?.data;
  } catch (error) {
    console.log("Error fetching permissions:", error);
    return null;
  }
};

export default accessControl;
