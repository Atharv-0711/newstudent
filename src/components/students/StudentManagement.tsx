"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import StudentForm from "./StudentForm";

interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  gender: string;
  background: string;
  surveyDate: string;
}

interface StudentManagementProps {
  students?: Student[];
  onAddStudent?: (student: Omit<Student, "id">) => void;
  onEditStudent?: (id: string, student: Omit<Student, "id">) => void;
  onDeleteStudent?: (id: string) => void;
}

export default function StudentManagement({
  students = [
    {
      id: "1",
      name: "John Doe",
      age: 10,
      grade: "5th",
      gender: "Male",
      background: "Urban",
      surveyDate: "2023-05-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      age: 11,
      grade: "6th",
      gender: "Female",
      background: "Suburban",
      surveyDate: "2023-05-16",
    },
    {
      id: "3",
      name: "Alex Johnson",
      age: 9,
      grade: "4th",
      gender: "Non-binary",
      background: "Rural",
      surveyDate: "2023-05-17",
    },
  ],
  onAddStudent = () => {},
  onEditStudent = () => {},
  onDeleteStudent = () => {},
}: StudentManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.background.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddStudent = (student: Omit<Student, "id">) => {
    onAddStudent(student);
    setIsAddDialogOpen(false);
  };

  const handleEditStudent = (student: Omit<Student, "id">) => {
    if (selectedStudent) {
      onEditStudent(selectedStudent.id, student);
      setIsEditDialogOpen(false);
      setSelectedStudent(null);
    }
  };

  const handleDeleteConfirm = () => {
    if (studentToDelete) {
      onDeleteStudent(studentToDelete);
      setStudentToDelete(null);
    }
  };

  return (
    <div className="bg-background w-full p-6 rounded-lg">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold">
            Student Management
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="w-[250px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                </DialogHeader>
                <StudentForm onSubmit={handleAddStudent} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Background</TableHead>
                  <TableHead>Survey Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.age}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{student.gender}</TableCell>
                      <TableCell>{student.background}</TableCell>
                      <TableCell>{student.surveyDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog
                            open={
                              isEditDialogOpen &&
                              selectedStudent?.id === student.id
                            }
                            onOpenChange={(open) => {
                              setIsEditDialogOpen(open);
                              if (!open) setSelectedStudent(null);
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedStudent(student);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>Edit Student</DialogTitle>
                              </DialogHeader>
                              {selectedStudent && (
                                <StudentForm
                                  initialData={{
                                    name: selectedStudent.name,
                                    age: selectedStudent.age,
                                    grade: selectedStudent.grade,
                                    gender: selectedStudent.gender,
                                    background: selectedStudent.background,
                                    surveyDate: selectedStudent.surveyDate,
                                  }}
                                  onSubmit={handleEditStudent}
                                />
                              )}
                            </DialogContent>
                          </Dialog>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200"
                                onClick={() => setStudentToDelete(student.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Student
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {student.name}
                                  ? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDeleteConfirm}
                                  className="bg-red-600 text-white hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No students found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
