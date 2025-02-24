import apiClient from "@/app/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useApiStorage = create(
  persist(
    (set, get) => ({
      permissions: [],
      toastData: null,

      setToast: (status, message) => {
        set({ toastData: { status, message } });

        setTimeout(() => {
          set({ toastData: null });
        }, 1000);
      },

      getUserPermissions: async () => {
        try {
          const response = await apiClient.get(
            `api/permissions/grant?role_id=3`
          );
          const permissions = response?.data?.data || [];
          set({ permissions });

          get().setToast("success", "Permissions updated successfully!");
          return { success: true, data: permissions };
        } catch (error) {
          console.error("Error Occurred:", error);
          get().setToast("error", "Failed to fetch permissions.");
          return {
            success: false,
            message:
              error.response?.data?.message || "Failed to fetch permissions",
          };
        }
      },

      getUserData: async () => {
        const permissions = get().permissions;
        const hasPermission = permissions.some(
          (item) => item?.keyword === "view:dashboard"
        );

        if (!hasPermission) {
          get().setToast(
            "warning",
            "You do not have permission to view the dashboard."
          );
          return null;
        }

        try {
          const response = await apiClient.get(`api/user`);
          get().setToast("success", "User data fetched successfully.");
          return response?.data;
        } catch (error) {
          console.error("Error fetching user:", error);
          get().setToast("error", "Failed to fetch user data.");
          return {
            success: false,
            message:
              error.response?.data?.message || "Failed to fetch user data",
          };
        }
      },

      editUserData: async ({ id, formData }) => {
        const permissions = get().permissions;
        const hasPermission = permissions.some(
          (item) => item?.keyword === "view:dashboard"
        );

        if (!hasPermission) {
          get().setToast(
            "warning",
            "You do not have permission to edit user data."
          );
          return null;
        }

        try {
          const response = await apiClient.put(`api/user?id=${id}`, formData, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          get().setToast("success", "User updated successfully!");
          return { success: true, data: response?.data };
        } catch (error) {
          console.error("Error updating user:", error);
          get().setToast("error", "Failed to update user.");
          return {
            success: false,
            message: error.response?.data?.message || "Failed to update user",
          };
        }
      },

      deleteUserData: async ({ id }) => {
        const permissions = get().permissions;
        const hasPermission = permissions.some(
          (item) => item?.keyword === "view:dashboard"
        );

        if (!hasPermission) {
          get().setToast(
            "warning",
            "You do not have permission to edit user data."
          );
          return null;
        }

        try {
          console.log(id);
          const response = await apiClient.delete(`/api/user?id=${id}`);
          get().setToast("success", "User deleted successfully!");
          return { success: true, data: response?.data };
        } catch (error) {
          console.error("Error deleting user:", error);
          get().setToast("error", "Failed to delete user.");
          return {
            success: false,
            message: error.response?.data?.message || "Failed to delete user",
          };
        }
      },
      // trainers
      getTrainerData: async () => {
        const permissions = get().permissions;
        const hasPermission = permissions.some(
          (item) => item?.keyword === "view:dashboard"
        );

        if (!hasPermission) {
          get().setToast(
            "warning",
            "You do not have permission to view the dashboard."
          );
          return null;
        }

        try {
          const response = await apiClient.get(`api/trainer`);
          get().setToast("success", "User data fetched successfully.");
          return response?.data;
        } catch (error) {
          console.error("Error fetching user:", error);
          get().setToast("error", "Failed to fetch user data.");
          return {
            success: false,
            message:
              error.response?.data?.message || "Failed to fetch user data",
          };
        }
      },
      // [*]
      getCredentials: async ({ id, name }) => {
        const permissions = get().permissions;
        const hasPermission = permissions.some(
          (item) => item?.keyword === "view:profile"
        );
        if (!hasPermission) {
          get().setToast(
            "warning",
            "You do not have permission to view the dashboard."
          );
          return null;
        }

        try {
          const queryParam = id
            ? `id=${id}`
            : `name=${encodeURIComponent(name)}`;
          const response = await apiClient.get(
            `/api/user/profile?${queryParam}`
          );

          setToast("success", "User data fetched successfully.");
          return { success: true, data: response.data };
        } catch (error) {
          console.error("Error fetching user data:", error);
          get().setToast("error", "Failed to fetch user data.");
          return {
            success: false,
            message:
              error.response?.data?.message || "Failed to fetch user data",
          };
        }
      },
      userLogin: async ({ username, password }) => {
        try {
          const response = await apiClient.post(`/api/user/login`, {
            username,
            password,
          });

          const { token, user } = response.data;

          if (token) {
            localStorage.setItem("authToken", token);
          }

          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
          }

          get().setToast("success", "Login successful.");

          return { success: true, data: response.data };
        } catch (error) {
          if (!error.response) {
            console.error("Network error:", error);
            get().setToast("error", "Network error. Please try again later.");
            return {
              success: false,
              message: "Network error. Please try again later.",
            };
          }

          if (error.response.status === 401) {
            console.error("Authentication error:", error);
            get().setToast("error", "Invalid username or password.");
            return {
              success: false,
              message:
                error.response?.data?.message ||
                "Invalid username or password.",
            };
          }

          console.error("Internal server error:", error);
          get().setToast(
            "error",
            "Internal server error. Please try again later."
          );
          return {
            success: false,
            message: error.response?.data?.message || "Internal server error.",
          };
        }
      },
    }),
    {
      name: "local-storage-state",
    }
  )
);

export default useApiStorage;
