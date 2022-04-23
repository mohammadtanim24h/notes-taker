import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header/Header";
import InputForm from "./components/inputForm/InputForm";
import NoteCard from "./components/noteCard/NoteCard";
import { useEffect, useState } from "react";



function App() {
  const [notes, setNotes] = useState([]);
  const [IsReload, setIsReload] = useState(false);

  useEffect(() => {
   fetch("http://localhost:5000/notes")
   .then(res=>res.json())
   .then(data=>setNotes(data))
  }, [IsReload]);
  /*
1. here there will be a function named handleSearch
to handle search by query, and it will be passed as props to header

  */
 const handleSearch = e => {
     e.preventDefault();
     const queryText= e.target.searchText.value;
     console.log(queryText);
     if(queryText) {
        fetch(`http://localhost:5000/notes?userName=${queryText}`)
        .then(res=>res.json())
        .then(data=>setNotes(data))
     }
 }
  






  
/*2. here there will be a function named handleDelete
to delete a note, and it will be passed as props to NoteCard that will be triggered using delete button.
 */

const handleDelete = (id) => {
    fetch(`http://localhost:5000/note/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        setIsReload(!IsReload);
    })
}











  /*
3. there will be a function named handleUpdate
    to update data, and it will be passed as props to NoteCard and 
   later it will be passed to Update modal using props.
 */



   



  /*
4.  there will be a function named handlePost
to post data to backend, and it will be passed as props to InputFrom.
 */
const handlePost = (e) => {
    e.preventDefault();
    const userName = e.target.userName.value;
    const textData = e.target.textData.value;
    console.log(userName, textData);
    const data = {userName, textData};
    fetch("http://localhost:5000/note", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        setIsReload(!IsReload);
    })
}
  

  return (
    <div className="App">
      <Header handleSearch={handleSearch}  />
      <InputForm handlePost={handlePost} />
      <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
        {notes.map((note) => (
          <NoteCard
            IsReload={IsReload} 
            setIsReload={setIsReload}
            handleDelete={handleDelete}
            key={note._id}
            note={note}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
