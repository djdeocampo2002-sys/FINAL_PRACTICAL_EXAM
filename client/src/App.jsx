import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://final-practical-exam-gamma.vercel.app/students";

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");

  const [editingId, setEditingId] = useState(null);

  const getStudents = () => {
    axios.get(API_URL).then((response) => {
      setStudents(response.data);
    });
  };

  useEffect(() => {
    getStudents();
  }, []);

  const addStudent = () => {
    axios
      .post(API_URL, {
        name: name,
        course: course,
        age: age,
      })
      .then(() => {
        setName("");
        setCourse("");
        setAge("");
        getStudents();
      });
  };

  const deleteStudent = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      getStudents();
    });
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };

  const updateStudent = () => {
    axios
      .put(`${API_URL}/${editingId}`, {
        name: name,
        course: course,
        age: age,
      })
      .then(() => {
        setEditingId(null);
        setName("");
        setCourse("");
        setAge("");
        getStudents();
      });
  };

  return (
    <div>
      <h1>Student Management System</h1>

      <h2>{editingId === null ? "Add Student" : "Edit Student"}</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Course"
        value={course}
        onChange={(event) => setCourse(event.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(event) => setAge(event.target.value)}
      />

      <br />
      <br />

      {editingId === null ? (
        <button onClick={addStudent}>Add Student</button>
      ) : (
        <button onClick={updateStudent}>Update Student</button>
      )}

      <h2>Students</h2>

      {students.map((student) => (
        <div key={student._id}>
          <p>{student.name}</p>
          <p>{student.course}</p>
          <p>{student.age}</p>

          <button onClick={() => editStudent(student)}>Edit</button>
          <button onClick={() => deleteStudent(student._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;