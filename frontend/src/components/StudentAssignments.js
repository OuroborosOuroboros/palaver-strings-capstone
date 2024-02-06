import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentAssignments.css';

function StudentAssignments() {
    // State hooks to store the students and instructors data
    const [students, setStudents] = useState([]);
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        // Fetch data for students and instructors on component mount
        const fetchData = async () => {
            const studentsData = await axios.get('/api/admins/students');
            const instructorsData = await axios.get('/api/admins/instructors');
            setStudents(studentsData.data);
    
            setInstructors(instructorsData.data);
        };

        fetchData();
    }, []);

    // Function to handle the instructor change for a student
    const handleInstructorChange = async (studentId, newInstructorId) => {
        try {
            // Find the student's current instructor ID from the students state
            const currentInstructorId = students.find(student => student._id === studentId)?.primaryInstructor;
            
            // Check if the student is being reassigned (not just assigned for the first time or unassigned)
            if (currentInstructorId && newInstructorId !== 'unassigned' && currentInstructorId !== newInstructorId) {
                // Construct the endpoint for the swap operation
                const endpoint = `/api/admins/instructor/${newInstructorId}/swapStudent`;
    
                // Prepare the request body with the studentId
                const body = { studentId };
    
                // Send the PATCH request to perform the swap
                await axios.patch(endpoint, body);
    
                // Optimistically update the students state to reflect the new assignment
                setStudents(prevStudents =>
                    prevStudents.map(student => {
                        if (student._id === studentId) {
                            return { ...student, primaryInstructor: newInstructorId };
                        }
                        return student;
                    }),
                );
            } else {
                // Handle the regular assignment or unassignment if not a swap scenario
                let endpoint = `/api/admins/instructor/${newInstructorId}/assignStudent`;
                let body = { studentId };
    
                if (newInstructorId === 'unassigned') {
                    endpoint = `/api/admins/instructor/${currentInstructorId}/unassignStudent`;
                }
    
                await axios.patch(endpoint, body);
    
                // Update the students state to reflect the change
                setStudents(prevStudents =>
                    prevStudents.map(student => {
                        if (student._id === studentId) {
                            return { ...student, primaryInstructor: newInstructorId !== 'unassigned' ? newInstructorId : null };
                        }
                        return student;
                    }),
                );
            }
        } catch (error) {
            console.error('Assignment operation failed:', error);
        }
    };

    return (
        <div className="layout-container">

            {/* Column for student assignments */}
            <div className="column">
                <div className="student-assignments-container">
                    <h1 className="student-assignments-title">Assign Students</h1>
                    {students.map((student) => (
                        <div key={student._id} className="student-item">
                            <span className="student-name">{student.firstName} {student.lastName} -- {student.instrument || 'Instrument not specified'}</span>
                            <select
                                className="student-dropdown"
                                value={student.primaryInstructor || 'unassigned'}
                                onChange={(e) => handleInstructorChange(student._id, e.target.value)}
                            >
                                <option value="unassigned">Unassigned</option>
                                {instructors.map((instructor) => (
                                    <option key={instructor._id} value={instructor._id}>
                                        {instructor.firstName} {instructor.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            </div>

            {/* Column for displaying instructors and their assigned students */}
            <div className="layout-container">
                <div className="column">
                    <div className="student-assignments-container">
                        {instructors.map((instructor) => (
                            <div key={instructor._id} className="instructor-assignments-container">
                                <h2 className="student-assignments-title">{instructor.firstName} {instructor.lastName}'s Students</h2>
                                <div className="student-item">
                                    <ul className="student-name">
                                        {students.filter(student => student.primaryInstructor === instructor._id).map(filteredStudent => (
                                            <li key={filteredStudent._id}>{filteredStudent.firstName} {filteredStudent.lastName} -- {filteredStudent.instrument || 'Instrument not specified'}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentAssignments;