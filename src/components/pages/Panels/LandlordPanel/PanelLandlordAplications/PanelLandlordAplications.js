import React, { useState } from "react";
import "./PanelLandlordAplications.css";

function PanelLandlordAplications() {
    const [students, setStudents] = useState([
        {
            name: "Sarah Williams",
            email: "sarah.williams@student.edu",
            phone: "+1 (555) 777-8888",
            origin: "New York, USA",
            university: "Metropolitan University",
            dorm: "Modern Studio Near Campus",
            field: "Computer Science",
            appliedDate: "11/3/2025",
            status: "pending",
            avatar: "https://i.pravatar.cc/100?img=5",
        },
        {
            name: "Tom Harris",
            email: "tom.harris@student.edu",
            phone: "+1 (555) 123-4567",
            origin: "Los Angeles, USA",
            university: "Metropolitan University",
            dorm: "Shared Room in Downtown",
            field: "Business Administration",
            appliedDate: "11/2/2025",
            status: "pending",
            avatar: "https://i.pravatar.cc/100?img=8",
        },
        {
            name: "Lisa Chen",
            email: "lisa.chen@student.edu",
            phone: "+1 (555) 987-6543",
            origin: "Chicago, USA",
            university: "Metropolitan University",
            dorm: "Spacious Two-Bedroom Apartment",
            field: "Engineering",
            appliedDate: "10/30/2025",
            status: "pending",
            avatar: "https://i.pravatar.cc/100?img=6",
        },
    ]);

    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleAccept = (index) => {
        const updated = [...students];
        if (updated[index].status === "pending") {
            updated[index].status = "accepted";
            setStudents(updated);
        }
    };

    const handleReject = (index) => {
        const updated = [...students];
        if (updated[index].status === "pending") {
            updated[index].status = "rejected";
            setStudents(updated);
        }
    };

    const findStudentIndexByEmail = (email) =>
        students.findIndex((s) => s.email === email);

    return (
        <div className="applicants-container">
            <h2>Applicants</h2>

            <div className="table-container">
                <h3>All Applicants ({students.length})</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Applicant</th>
                            <th>Dorm Applied For</th>
                            <th>Field of Study</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td className="student-info">
                                    <img src={student.avatar} alt={student.name} />
                                    <div>
                                        <strong>{student.name}</strong>
                                        <p>{student.email}</p>
                                    </div>
                                </td>
                                <td>{student.dorm}</td>
                                <td>{student.field}</td>
                                <td>{student.appliedDate}</td>
                                <td>
                                    <span
                                        className={`status-badge ${student.status === "accepted"
                                                ? "accepted"
                                                : student.status === "pending"
                                                    ? "pending"
                                                    : "rejected"
                                            }`}
                                    >
                                        {student.status}
                                    </span>
                                </td>
                                <td className="actions">
                                    <button
                                        onClick={() => setSelectedStudent(student)}
                                        title="View Details"
                                    >
                                        👁️
                                    </button>
                                    <button
                                        onClick={() => handleAccept(index)}
                                        disabled={student.status !== "pending"}
                                        title="Accept"
                                    >
                                        ✅
                                    </button>
                                    <button
                                        onClick={() => handleReject(index)}
                                        disabled={student.status !== "pending"}
                                        title="Reject"
                                    >
                                        ❌
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Popup Modal */}
            {selectedStudent && (
                <div
                    className="modal-overlay"
                    onClick={() => setSelectedStudent(null)}
                >
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Applicant Details</h3>
                            <button
                                className="close-btn"
                                onClick={() => setSelectedStudent(null)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="modal-content">
                            <img
                                src={selectedStudent.avatar}
                                alt={selectedStudent.name}
                                className="modal-avatar"
                            />
                            <h4>{selectedStudent.name}</h4>
                            <p className="university">{selectedStudent.university}</p>

                            <div className="info-grid">
                                <div>
                                    <p className="label">Email</p>
                                    <p>{selectedStudent.email}</p>
                                </div>
                                <div>
                                    <p className="label">Phone</p>
                                    <p>{selectedStudent.phone}</p>
                                </div>
                                <div>
                                    <p className="label">Origin</p>
                                    <p>{selectedStudent.origin}</p>
                                </div>
                                <div>
                                    <p className="label">Field of Study</p>
                                    <p>{selectedStudent.field}</p>
                                </div>
                                <div className="full">
                                    <p className="label">Dorm Applied For</p>
                                    <p>{selectedStudent.dorm}</p>
                                </div>
                                <div>
                                    <p className="label">Applied Date</p>
                                    <p>{selectedStudent.appliedDate}</p>
                                </div>
                            </div>

                            {selectedStudent.status === "pending" && (
                                <div className="modal-actions">
                                    <button
                                        className="accept-btn"
                                        onClick={() => {
                                            const index = findStudentIndexByEmail(
                                                selectedStudent.email
                                            );
                                            handleAccept(index);
                                            setSelectedStudent(null);
                                        }}
                                    >
                                        ✓ Accept
                                    </button>
                                    <button
                                        className="reject-btn"
                                        onClick={() => {
                                            const index = findStudentIndexByEmail(
                                                selectedStudent.email
                                            );
                                            handleReject(index);
                                            setSelectedStudent(null);
                                        }}
                                    >
                                        ✗ Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PanelLandlordAplications;
