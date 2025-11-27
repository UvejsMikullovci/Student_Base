import React, { useEffect, useState, useMemo } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../Firebase/firebase";
import {
  Briefcase,
  MapPin,
  Search,
  BookOpen,
  Edit2,
  X,
  Check,
} from "lucide-react";
import "./ProfessorPanelGrades.css";

const ProfessorPanelGrades = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [filters, setFilters] = useState({
    branch: "",
    direction: "",
    lecture: "",
  });
  const [editingCell, setEditingCell] = useState(null);
  const [tempGrade, setTempGrade] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      const registrationsRef = collection(db, "registrations");
      const q = query(registrationsRef, where("role", "==", "Student"));
      const snapshot = await getDocs(q);

      const students = [];
      for (const doc of snapshot.docs) {
        const regId = doc.id;
        const appRef = collection(db, "registrations", regId, "application");
        const appSnap = await getDocs(appRef);
        const appData = appSnap.docs.map((a) => a.data());

        students.push({
          id: regId,
          name: doc.data().name || "Unknown",
          branch: appData[0]?.branch || "N/A",
          direction: appData[0]?.direction || "N/A",
          courses: appData[0]?.courses || [],
        });
      }
      setStudentsData(students);
    };
    fetchStudents();
  }, []);

  const availableFilters = useMemo(() => {
    const branches = new Set();
    const directions = new Set();
    const lectures = new Set();

    studentsData.forEach((student) => {
      branches.add(student.branch);
      directions.add(student.direction);
      student.courses.forEach((c) => lectures.add(c.name));
    });

    return {
      branches: Array.from(branches),
      directions: Array.from(directions),
      lectures: Array.from(lectures),
    };
  }, [studentsData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredStudents = useMemo(() => {
    return studentsData.filter((student) => {
      if (filters.branch && student.branch !== filters.branch) return false;
      if (filters.direction && student.direction !== filters.direction)
        return false;
      if (filters.lecture) {
        const hasLecture = student.courses.some(
          (c) => c.name === filters.lecture
        );
        if (!hasLecture) return false;
      }
      return true;
    });
  }, [studentsData, filters]);

  const startEditing = (studentId, courseId, grade) => {
    setEditingCell({ studentId, courseId });
    setTempGrade(String(grade));
  };

  const cancelEditing = () => {
    setEditingCell(null);
    setTempGrade("");
  };

  const saveGrade = () => {
    if (!editingCell) return;
    const newGrade = parseInt(tempGrade, 10);
    if (isNaN(newGrade) || newGrade < 0 || newGrade > 100) {
      cancelEditing();
      return;
    }
    setStudentsData((prev) =>
      prev.map((s) =>
        s.id === editingCell.studentId
          ? {
              ...s,
              courses: s.courses.map((c) =>
                c.id === editingCell.courseId ? { ...c, grade: newGrade } : c
              ),
            }
          : s
      )
    );
    cancelEditing();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") saveGrade();
    if (e.key === "Escape") cancelEditing();
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return "grade-green";
    if (grade >= 80) return "grade-blue";
    if (grade >= 70) return "grade-yellow";
    return "grade-red";
  };

  return (
    <div className="ppg-container">
      <div className="ppg-header">
        <Briefcase className="ppg-icon" />
        <h1>Academic Grade Management</h1>
      </div>

      <div className="ppg-filters">
        <FilterSelect
          name="branch"
          icon={MapPin}
          label="Branch"
          value={filters.branch}
          onChange={handleFilterChange}
          options={availableFilters.branches}
        />
        <FilterSelect
          name="direction"
          icon={Search}
          label="Direction"
          value={filters.direction}
          onChange={handleFilterChange}
          options={availableFilters.directions}
        />
        <FilterSelect
          name="lecture"
          icon={BookOpen}
          label="Lecture"
          value={filters.lecture}
          onChange={handleFilterChange}
          options={availableFilters.lectures}
        />
      </div>

      <div className="ppg-table-wrapper">
        <table className="ppg-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Branch</th>
              <th>Direction</th>
              {availableFilters.lectures.map((l) => (
                <th key={l}>{l}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.branch}</td>
                  <td>{student.direction}</td>

                  {availableFilters.lectures.map((lectureName) => {
                    const course = student.courses.find(
                      (c) => c.name === lectureName
                    );
                    const courseId = course?.id;
                    const grade = course ? course.grade : "N/A";
                    const isEditing =
                      editingCell?.studentId === student.id &&
                      editingCell?.courseId === courseId;

                    if (!course) return <td key={lectureName}>N/A</td>;

                    return (
                      <td key={lectureName}>
                        {isEditing ? (
                          <div className="ppg-edit-input">
                            <input
                              type="number"
                              value={tempGrade}
                              onChange={(e) => setTempGrade(e.target.value)}
                              onBlur={saveGrade}
                              onKeyDown={handleKeyDown}
                              min="0"
                              max="100"
                              autoFocus
                            />
                            <X className="ppg-cancel" onClick={cancelEditing} />
                            <Check className="ppg-save" onClick={saveGrade} />
                          </div>
                        ) : (
                          <div
                            className={`ppg-grade ${getGradeColor(grade)}`}
                            onClick={() =>
                              startEditing(student.id, courseId, grade)
                            }
                          >
                            {grade}
                            <Edit2 className="ppg-edit-icon" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="100%">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FilterSelect = ({
  name,
  icon: Icon,
  label,
  value,
  onChange,
  options,
}) => (
  <div className="ppg-filter">
    <label>
      <Icon className="ppg-filter-icon" />
      {label}
    </label>
    <select name={name} value={value} onChange={onChange}>
      <option value="">All</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

export default ProfessorPanelGrades;
