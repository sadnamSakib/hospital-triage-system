// components/common/BasicInforForm.tsx
"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { TextInput } from "../ui/TextInput";
import { RadioGroup } from "../ui/RadioGroup";
import { useTriageContext } from "../../context/TriageContext";
import { UserInfo } from "../../types";

export default function BasicInfoForm() {
  const { setUserInfo, setRoute } = useTriageContext();

  // Form state
  const [formData, setFormData] = useState<UserInfo>({
    name: "",
    dateOfBirth: "",
    sex: "male",
  });

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle sex selection
  const handleSexChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      sex: value as "male" | "female" | "other",
    }));
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setUserInfo(formData);
      setRoute({ symptom: "none", phase: "initialSymptoms" });
    }
  };

  // Handle back button
  const handleBack = () => {
    setRoute({ symptom: "none", phase: "start" });
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <Card className="max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
            error={errors.name}
          />

          <TextInput
            label="Date of Birth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            type="date"
            required
            error={errors.dateOfBirth}
          />

          <RadioGroup
            label="Sex"
            name="sex"
            value={formData.sex}
            onChange={handleSexChange}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />

          <div className="flex justify-between pt-4">
            <Button variant="secondary" onClick={handleBack} type="button">
              Back
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
