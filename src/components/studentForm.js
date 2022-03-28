import React, {useState} from "react";


const StudentForm=({
    index,
    addTag
})=>{

const[newTag, setNewTag]= useState('');

const changeTag=(e)=>{
    setNewTag(e.target.value);
}

return(
    <form onSubmit={e=>{
        e.preventDefault();
        addTag(newTag, index)
        setNewTag("");
    }}>
        <input type="text" placeholder="add tag"  value={newTag}  onChange={changeTag} id="addTag" className="form-control mt-2 mb-2" ></input>
        <input type="submit" className="btn btn-primary" ></input> 
    </form>              
)}

export default StudentForm;