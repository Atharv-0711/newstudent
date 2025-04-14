"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";

interface StudentFormProps {
  onSubmit?: (data: StudentData) => void;
  initialData?: StudentData;
  isEditing?: boolean;
}

interface StudentData {
  id?: string;
  name: string;
  age: string;
  grade: string;
  gender: string;
  background: string;
  behavior: string;
  roleModel: string;
  familyIncome: string;
  additionalNotes: string;
}

const StudentForm = ({
  onSubmit = () => {},
  initialData = {
    name: "",
    age: "",
    grade: "",
    gender: "",
    background: "",
    behavior: "",
    roleModel: "",
    familyIncome: "",
    additionalNotes: "",
  },
  isEditing = false,
}: StudentFormProps) => {
  const [formData, setFormData] = useState<StudentData>(initialData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof StudentData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name as keyof StudentData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name as keyof StudentData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof StudentData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = "Age must be a valid number";
    }

    if (!formData.grade.trim()) {
      newErrors.grade = "Grade is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // In a real implementation, this would call the API
      await onSubmit(formData);
      setSubmitStatus("success");

      // Reset form if not editing
      if (!isEditing) {
        setFormData({
          name: "",
          age: "",
          grade: "",
          gender: "",
          background: "",
          behavior: "",
          roleModel: "",
          familyIncome: "",
          additionalNotes: "",
        });
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);

      // Clear success message after 3 seconds
      if (submitStatus === "success") {
        setTimeout(() => setSubmitStatus(null), 3000);
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-background">
      <CardHeader>
        <CardTitle>
          {isEditing ? "Edit Student Information" : "Add New Student"}
        </CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the student's information in the system."
            : "Enter the student's information to add them to the system."}
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {submitStatus === "success" && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>
                Student {isEditing ? "updated" : "added"} successfully!
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === "error" && (
            <Alert className="bg-red-50 text-red-800 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                There was an error {isEditing ? "updating" : "adding"} the
                student. Please try again.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Personal Information */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student's full name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">
                Age <span className="text-red-500">*</span>
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="1"
                className={errors.age ? "border-red-500" : ""}
              />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">{errors.age}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">
                Grade <span className="text-red-500">*</span>
              </Label>
              <Input
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                placeholder="Enter grade level"
                className={errors.grade ? "border-red-500" : ""}
              />
              {errors.grade && (
                <p className="text-red-500 text-xs mt-1">{errors.grade}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">
                Gender <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleSelectChange("gender", value)}
              >
                <SelectTrigger
                  id="gender"
                  className={errors.gender ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
              )}
            </div>
          </div>

          {/* Survey Information */}
          <div className="pt-4">
            <h3 className="text-lg font-medium mb-4">Survey Information</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="background">Background Information</Label>
                <Textarea
                  id="background"
                  name="background"
                  value={formData.background}
                  onChange={handleChange}
                  placeholder="Describe the student's background"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="behavior">Behavioral Observations</Label>
                <Textarea
                  id="behavior"
                  name="behavior"
                  value={formData.behavior}
                  onChange={handleChange}
                  placeholder="Describe the student's behavior"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roleModel">Role Model Information</Label>
                <Textarea
                  id="roleModel"
                  name="roleModel"
                  value={formData.roleModel}
                  onChange={handleChange}
                  placeholder="Describe the student's role models"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="familyIncome">Family Income Information</Label>
                <Select
                  value={formData.familyIncome}
                  onValueChange={(value) =>
                    handleSelectChange("familyIncome", value)
                  }
                >
                  <SelectTrigger id="familyIncome">
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Income</SelectItem>
                    <SelectItem value="medium">Medium Income</SelectItem>
                    <SelectItem value="high">High Income</SelectItem>
                    <SelectItem value="unknown">
                      Unknown/Not Disclosed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  placeholder="Any additional information about the student"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Submitting..."
              : isEditing
                ? "Update Student"
                : "Add Student"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default StudentForm;
