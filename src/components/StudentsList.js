import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import CONSTANTS from '../data/config';

export const StudentsList = (param) => {
  const [studentInfo, setStudentInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${CONSTANTS.BASE_API_URL}students/`);
      const body = await result.json();
      setStudentInfo(body);
      console.log(body);
    }
    fetchData();
  }, []);

  var filteredStudents = Object.values(studentInfo);

  if (param !== undefined) {
    filteredStudents = Object.values(studentInfo).filter(p => p.studentId !== +param.exceptId);
  }
  return (
    <>
      {filteredStudents.map(student => (
        <Link to={`/detail/${student.studentId}`} key={student.studentId}>
          <h6>
            {student.studentId} {student.firstName} { student.lastName}
          </h6>
        </Link>
        ))}
    </>
  )
}
