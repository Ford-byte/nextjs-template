"use client";

import { useState, useCallback } from "react";
import useApiStorage from "../store/api";
import Toast from "../popups/toast";
import { useParams } from "next/navigation";

export default function ApplicationForm() {
  const { submitApplication, toastData } = useApiStorage();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullname: "",
    age: "",
    contact: "",
    emergency_person: "",
    emergency_number: "",
    question_1: "",
    question_2: "",
    question_3: "",
    question_4: "",
    question_5: "",
    question_6: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await submitApplication(formData);
        console.log(response?.data?.message);

        setFormData({
          user_id: localStorage.getItem("user_id"),
          trainers_id: id,
          fullname: "",
          age: "",
          contact: "",
          emergency_person: "",
          emergency_number: "",
          question_1: "",
          question_2: "",
          question_3: "",
          question_4: "",
          question_5: "",
          question_6: "",
        });
      } catch (error) {
        console.log("Error submitting the form:", error);
      }
    },
    [formData, submitApplication]
  );

  return (
    <>
      <form
        className="shadow-lg rounded-lg border p-6 space-y-6 my-6"
        onSubmit={handleSubmit}
      >
        {/* Trainee Information */}
        <div className="grid grid-cols-3 gap-6">
          {["fullname", "age", "contact"].map((field) => (
            <InputField
              key={field}
              label={field}
              value={formData[field]}
              onChange={handleChange}
              type={field === "age" ? "number" : "text"}
            />
          ))}
        </div>

        {/* Emergency Contact */}
        <div className="grid grid-cols-2 gap-6">
          {["emergency_person", "emergency_number"].map((field) => (
            <InputField
              key={field}
              label={field}
              value={formData[field]}
              onChange={handleChange}
              type={field.includes("number") ? "tel" : "text"}
            />
          ))}
        </div>

        {/* FAQ */}
        <div className="font-bold text-lg">FAQ's:</div>
        <RadioGroup
          label="Have you trained before?"
          name="question_1"
          options={["Yes", "No"]}
          onChange={handleChange}
          selectedValue={formData.question_1}
        />

        {formData.question_1 === "Yes" && (
          <RadioGroup
            label="If yes, what type of training?"
            name="question_2"
            options={["Weightlifting", "Cardio", "Yoga", "Other"]}
            onChange={handleChange}
            selectedValue={formData.question_2}
          />
        )}

        {/* Health & Medical History */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold">B. Health & Medical History</h3>
          <RadioGroup
            label="Do you have any pre-existing injuries or conditions?"
            name="question_3"
            options={["Yes", "No"]}
            onChange={handleChange}
            selectedValue={formData.question_3}
          />
          {formData.question_3 === "Yes" && (
            <InputField
              label="question_4"
              value={formData.question_4}
              onChange={handleChange}
              type="text"
              placeholder="Specify condition"
            />
          )}
        </div>

        {/* Fitness Goals */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold">C. Fitness Goals</h3>
          <RadioGroup
            label="What is your primary reason for training?"
            name="question_5"
            options={[
              "Weight Loss",
              "Muscle Gain",
              "Endurance Improvement",
              "General Health",
              "Other",
            ]}
            onChange={handleChange}
            selectedValue={formData.question_5}
          />
        </div>

        {/* Commitment and Availability */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold">D. Commitment & Availability</h3>
          <RadioGroup
            label="How many times per week can you train?"
            name="question_6"
            options={["1-2", "2-3", "5+"]}
            onChange={handleChange}
            selectedValue={formData.question_6}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg mt-4"
          >
            Submit
          </button>
        </div>
      </form>

      {toastData && (
        <Toast status={toastData.status} message={toastData.message} />
      )}
    </>
  );
}

function InputField({ label, value, onChange, type = "text", placeholder }) {
  const formattedLabel = label.replace(/_/g, " ");
  return (
    <div className="space-y-3">
      <label htmlFor={label} className="text-lg capitalize">
        {formattedLabel}
      </label>
      <input
        id={label}
        name={label}
        className="w-full border p-3"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

function RadioGroup({ label, name, options, onChange, selectedValue }) {
  return (
    <div className="flex flex-col">
      <h3 className="text-lg">{label}</h3>
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value={option}
            onChange={onChange}
            checked={selectedValue === option}
            className="border-2 border-blue-600 text-blue-600 focus:ring-2 focus:ring-blue-600"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}
