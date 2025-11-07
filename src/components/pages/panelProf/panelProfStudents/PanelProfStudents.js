import React, { useState } from "react";
import "./panelProfStudents.css";


function PanelProfStudents() {
    const studentsData = [
    {
      name: "John Smith",
      email: "john.smith@student.edu",
      course: "Data Structures",
      field: "Computer Science",
      year: "2nd Year",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      name: "Emma Wilson",
      email: "emma.wilson@student.edu",
      course: "Algorithms",
      field: "Computer Science",
      year: "3rd Year",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    {
      name: "Michael Brown",
      email: "michael.brown@student.edu",
      course: "Data Structures",
      field: "Software Engineering",
      year: "2nd Year",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    {
      name: "Sophia Davis",
      email: "sophia.davis@student.edu",
      course: "Machine Learning",
      field: "Computer Science",
      year: "4th Year",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    {
      name: "James Johnson",
      email: "james.johnson@student.edu",
      course: "Algorithms",
      field: "Information Technology",
      year: "3rd Year",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      name: "Olivia Martinez",
      email: "olivia.martinez@student.edu",
      course: "Data Structures",
      field: "Computer Science",
      year: "2nd Year",
      avatar: "https://i.pravatar.cc/100?img=6",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedField, setSelectedField] = useState("All Fields");

  const courses = ["All Courses", ...new Set(studentsData.map((s) => s.course))];
  const fields = ["All Fields", ...new Set(studentsData.map((s) => s.field))];

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === "All Courses" || student.course === selectedCourse;
    const matchesField =
      selectedField === "All Fields" || student.field === selectedField;
    return matchesSearch && matchesCourse && matchesField;
  });


  return (
    <div className="students-container">

      <div className="filter-section">
        <h2>Filter Students</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            {courses.map((course, i) => (
              <option key={i}>{course}</option>
            ))}
          </select>
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
          >
            {fields.map((field, i) => (
              <option key={i}>{field}</option>
            ))}
          </select>
        </div>
      </div>


      <div className="student-list-section">
        <h2>Student List ({filteredStudents.length})</h2>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Course</th>
              <th>Field of Study</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td className="student-info">
                  <img src={student.avatar} alt={student.name} />
                  {student.name}
                </td>
                <td>{student.email}</td>
                <td>
                  <span className="course-badge">{student.course}</span>
                </td>
                <td>{student.field}</td>
                <td>{student.year}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStudents.length === 0 && (
          <p className="no-results">No students found.</p>
        )}
      </div>
    </div>
  )
}

export default PanelProfStudents