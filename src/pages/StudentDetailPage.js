import React, { useState, useEffect } from 'react';
import { StudentsList } from '../components/StudentsList';

import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import CONSTANTS from '../data/config';
import AddStudentForm from '../components/AddStudentForm';

const StudentDetailPage = () => {
  const { id } = useParams();
  const [studentInfo, setStudentInfo] = useState({ 
    firstName:'', 
    lastName: '',
    school: '',
    });
  
  useEffect( () => {
    const fetchData = async () => {
      const result = await fetch(`${CONSTANTS.BASE_API_URL}students/${id}`);
      const body = await result.json();
      // console.log(body);
      setStudentInfo(body);
    }
    fetchData(); 
  },[id]);
  
  // const student = students.find((student) => student.studentId === parseInt(id));
  if (!studentInfo) return (<NotFoundPage />);
  return(
      <React.Fragment>
          <h1>This is student with ID={id} is {studentInfo.firstName} {studentInfo.lastName} in {studentInfo.school}.</h1>
          <div style={{ "width": "20%", "float": "right" }}>
            <h3>Others:</h3>
              <StudentsList exceptId={studentInfo.studentId} />
          </div>
          <div style={{ width: "50%", float: "left", paddingBottom: "40px" }}>
            <AddStudentForm isEdit={true} student={studentInfo} id={id} />
          </div>
          <div style={{ width: "50%", float: "left" }}>
            <AddStudentForm />
          </div>
      </React.Fragment>
  );
}
export default StudentDetailPage;
