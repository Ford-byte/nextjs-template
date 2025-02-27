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
          console.log("Error Occurred:", error);
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
          return response?.data;
        } catch (error) {
          console.log("Error fetching user:", error);
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
          console.log("Error updating user:", error);
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
          console.log("Error deleting user:", error);
          get().setToast("error", "Failed to delete user.");
          return {
            success: false,
            message: error.response?.data?.message || "Failed to delete user",
          };
        }
      },

      // trainee
      getTraineesData: async (props) => {
        try {
          const response = await apiClient.get(`api/trainee?id=${props?.id}`);
          return response?.data;
        } catch (error) {
          return {
            success: false,
            message:
              error.response?.data?.message || "Failed to fetch user data",
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
          console.log("User data fetched successfully.");
          return response?.data;
        } catch (error) {
          console.log("Error fetching user:", error);
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
          console.log("Error fetching user data:", error);
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
            console.log("Network error:", error);
            get().setToast("error", "Network error. Please try again later.");
            return {
              success: false,
              message: "Network error. Please try again later.",
            };
          }

          if (error.response.status === 401) {
            console.log("Authentication error:", error);
            get().setToast("error", "Invalid username or password.");
            return {
              success: false,
              message:
                error.response?.data?.message ||
                "Invalid username or password.",
            };
          }

          console.log("Internal server error:", error);
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

      submitApplication: async (props) => {
        try {
          const {
            user_id,
            trainers_id,
            fullname,
            age,
            contact,
            emergency_person,
            emergency_number,
            question_1,
            question_2,
            question_3,
            question_4,
            question_5,
            question_6,
          } = props;

          const response = await apiClient.post("api/user/application", {
            user_id,
            trainers_id,
            fullname,
            age,
            contact,
            emergency_person,
            emergency_number,
            question_1,
            question_2,
            question_3,
            question_4,
            question_5,
            question_6,
          });

          get().setToast("success", "Your application has been sent.");
          return {
            success: true,
            data: response.data,
          };
        } catch (error) {
          console.log("Error submitting application:", error);

          const errorMessage =
            error.response?.data?.message || "Internal Server Error.";
          get().setToast("error", errorMessage);

          return {
            success: false,
            message: errorMessage,
          };
        }
      },

      getApplications: async ({ id }) => {
        try {
          const response = await apiClient.get(`api/user/application?id=${id}`);

          return {
            success: true,
            data: response.data,
          };
        } catch (error) {
          console.log("Error fetching application:", error);

          const errorMessage =
            error.response?.data?.message || "Internal Server Error.";

          return {
            success: false,
            message: errorMessage,
          };
        }
      },

      applicationApproval: async (props) => {
        try {
          const response = await apiClient.put(`api/user/application`, {
            approval: props.approval,
            id: props.id,
          });
          console.log("res", response);
          get().setToast("success", response?.data?.message);
          return {
            success: true,
            data: response.data,
          };
        } catch (error) {
          console.log("Internal Server Error.", error);

          const errorMessage =
            error.response?.data?.message || "Internal Server Error.";
          get().setToast("error", errorMessage);

          return {
            success: false,
            message: errorMessage,
          };
        }
      },

      deleteApplication: async (props) => {
        try {
          const response = await apiClient.delete(
            `api/user/application?id=${props?.id}`
          );

          console.log("res", response);
          get().setToast("success", response?.data?.message);
          return {
            success: true,
            data: response.data,
          };
        } catch (error) {
          console.log("Internal Server Error.", error);

          const errorMessage =
            error.response?.data?.message || "Internal Server Error.";
          get().setToast("error", errorMessage);

          return {
            success: false,
            message: errorMessage,
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
