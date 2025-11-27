import React, { useState, useEffect } from "react";
import { db } from "../../../../../Firebase/firebase";
import { collection, getDocs,addDoc } from "firebase/firestore";
import "./ProfessorPanelStudents.css";

function ProfessorPanelStudents() {
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

  const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedField, setSelectedField] = useState("All Fields");
  const [showPopup, setShowPopup] = useState(false);
  const [firebaseStudents, setFirebaseStudents] = useState([]);

  const courses = ["All Courses", ...new Set(studentsData.map((s) => s.course))];
  const fields = ["All Fields", ...new Set(studentsData.map((s) => s.field))];


  useEffect(() => {
    const fetchFirebaseStudents = async () => {
      const studentsCol = collection(db, "registrations");
      const studentSnapshot = await getDocs(studentsCol);
      const studentsList = studentSnapshot.docs.map((doc) => doc.data());
      setFirebaseStudents(studentsList);
    };
    fetchFirebaseStudents();
  }, []);

  const addFirebaseStudent = async (student) => {
  const randomCourse = courses[Math.floor(Math.random() * (courses.length - 1)) + 1];
  const randomField = fields[Math.floor(Math.random() * (fields.length - 1)) + 1];

  const yearNumber = Math.floor(Math.random() * 4) + 1;
  const year =
    yearNumber === 1 ? "1st Year" :
    yearNumber === 2 ? "2nd Year" :
    yearNumber === 3 ? "3rd Year" :
    "4th Year";

  const newStudent = {
    name: student.name,
    email: student.email,
    avatar: student.avatar || `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70)}`,
    course: randomCourse,
    field: randomField,
    year: year,
  };

  // Add to local state
  setStudents([...students, newStudent]);

  // Save to Firebase
  try {
    const studentsCollection = collection(db, "students"); // create a separate collection if you like
    await addDoc(studentsCollection, newStudent);
  } catch (err) {
    console.error("Error adding student to Firebase: ", err);
  }
};

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === "All Courses" || student.course === selectedCourse;
    const matchesField =
      selectedField === "All Fields" || student.field === selectedField;
    return matchesSearch && matchesCourse && matchesField;
  });


  useEffect(() => {
  if (showPopup) {
    document.body.style.overflow = "hidden"; // disable scroll
  } else {
    document.body.style.overflow = "auto"; // re-enable scroll
  }

  // Optional: cleanup when component unmounts
  return () => {
    document.body.style.overflow = "auto";
  };
}, [showPopup]);

  return (
    <div className="students-container">


      <button className="add-btn" onClick={() => setShowPopup(true)} style={{ marginBottom: "16px" }}>
        Add Student
      </button>

      <div className="filter-section">
        <h2>Filter Students</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            {courses.map((course, i) => (
              <option key={i}>{course}</option>
            ))}
          </select>
          <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
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
                <td><span className="course-badge">{student.course}</span></td>
                <td>{student.field}</td>
                <td>{student.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && <p className="no-results">No students found.</p>}
      </div>


      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
            <h3>Add Students from Firebase</h3>
            <ul>
              {firebaseStudents.map((student, index) => (
                <li key={index}>
                  <span>{student.name} ({student.email})</span>
                  <button className="add-student-btn" onClick={() => addFirebaseStudent(student)}>Add</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProfessorPanelStudents;
