import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../data/config';

const AddStudentForm =(param)=>{
    const navigate = useNavigate(); 
    const [firstName,setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [school, setSchool] = useState('');
    // console.log("param", param)
    // console.log("paramS", param.student.firstName)
    const addStudent =()=>{
      if (!param.isEdit) {
        const result = fetch(`${BASE_URL.BASE_API_URL}students/`,{
            method:'post',
            body:JSON.stringify({
                firstName,
                lastName,
                school,
            }),
            headers:{'Content-Type':'application/json'}
        });
        result
          .then(response => response.json())
          .then( navigate('/list', { replace: true }))
          .catch(error => console.error('Error:', error));
      }
      else {
        const result = fetch(`${BASE_URL.BASE_API_URL}students/${param.id}`,{
            method:'put',
            body:JSON.stringify({
                studentId: param.id,
                firstName,
                lastName,
                school,
            }),
            headers:{'Content-Type':'application/json'}
        });
        result
          .then(response => response.json())
          .then( navigate('/list', { replace: true }))
          .catch(error => console.error('Error:', error));
    }
  }
  
  const deleteStudent = () => {
    const result = fetch(`${BASE_URL.BASE_API_URL}students/${param.id}`,{
        method:'delete',
        headers:{'Content-Type':'application/json'}
    });
    result
      .then(response => response.json())
      .then( navigate('/list', { replace: true }))
      .catch(error => console.error('Error:', error));
  }

  useEffect(() => {
    if (param.student) {
      setFirstName(param.student.firstName);
      setLastName(param.student.lastName);
      setSchool(param.student.school);
    }
  }, [param.student?.firstName, param.student?.lastName, param.student?.school])
  

    return(
    <React.Fragment>
    <div className="panel panel-default">
      <form>
        <h3>{param.isEdit ? "Edit" : "Add"} Student</h3>
        <div className="form-group">
          <label>First Name:</label>
          <input className="form-control" type="text" placeholder="First Name"
            value={firstName} onChange={(event) => setFirstName(event.target.value)} />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input className="form-control" type="text" placeholder="Last Name"
            value={lastName} onChange={(event) => setLastName(event.target.value)} />
        </div>
        <div className="form-group">
          <label>School:</label>
          <input className="form-control" type="text" placeholder="Occupation"
            value={school} onChange={(event) => setSchool(event.target.value)} />
        </div>

        <input type="submit" onClick={() => addStudent()} className="btn btn-success" value={param.isEdit ? "Edit" : "Add"} />
      </form>
      {param.isEdit ? <input type="submit" onClick={() => deleteStudent()} className="btn btn-danger" value="Delete" /> : null}
    </div>
  </React.Fragment>
);
}

export default AddStudentForm;
