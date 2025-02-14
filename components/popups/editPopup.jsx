import { useState } from "react";
import Close from "@/public/icons/close";

export default function EditPopup({ data, onClick }) {
  const [formData, setFormData] = useState({
    username: data.username || "",
    fullname: data.fullname || "",
    email: data.email || "",
    profile: data.profile || "",
    role: data.role || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="full-center">
      <div className="fixed w-full h-full bg-black/50" onClick={onClick} />

      <div className="bg-white min-w-[500px] min-h-[400px] z-[11] relative rounded-lg shadow-lg p-6">
        <div className="absolute top-2 right-2">
          <div
            className="bg-gray-500 p-2 rounded-full cursor-pointer"
            onClick={onClick}
          >
            <Close className="size-6 fill-white" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Edit User</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-2 rounded-md"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="profile"
            value={formData.profile}
            onChange={handleChange}
            placeholder="Profile URL"
            className="border p-2 rounded-md"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 rounded-md"
          >
            <option value="trainer">Trainer</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
