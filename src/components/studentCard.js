import React, {useState} from "react";
import StudentForm from "./studentForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faLessThan} from '@fortawesome/free-solid-svg-icons';


const StudentCard=({
    index,
    pic,
    firstName,
    lastName,
    email,
    company,
    skill, 
    grades,
    tags,
    average,
    addTag
})=>{

const[newTag, setNewTag]= useState('');
const[openIcon, setOpenIcon ]= useState(false);

const changeTag=(e)=>{
    setNewTag(e.target.value);
}

const openGrades=()=>{
    setOpenIcon(!openIcon);
}

return(
<div className="row service-box-wrap" key={index}>
    <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 d-flex" >
        <div className="col-10 mx-auto p-2">
            <img className="rounded-circle w-100 border border-secondary mx-auto" src={pic}/>
        </div>
    </div>
    <div className="col-sm-9 col-md-9 col-lg-9 col-xl-9 ">
        <div className="row">
            <div className="col-11 ">  
              <div className="h3"><p>{firstName} {lastName}</p></div>
              <div>Email: {email}</div>
              <div>Company: {company}</div>
              <div>Skill: {skill}</div>
              <div>Average: {average(grades).toFixed(2)}%</div>
             
              {openIcon&&grades.map((grade, index)=>
              <div key={index}>Test {index +1}: {grade}%</div>)}

              <div className="Tags d-flex flex-wrap">
                {tags.length>0?tags.map((tag, index)=>{
                    return <div key={index} className="tag-padding  m-1 px-3 py-1">{tag}</div>
                }):null}
              </div>
            <StudentForm index={index} addTag={addTag} />
            </div> 
            <div onClick={openGrades} className="col-1 cursor-pointer text-bold"> {openIcon?<FontAwesomeIcon icon={faMinus} />:<FontAwesomeIcon icon={faPlus} />} 
            </div>
        </div>
    </div> 
</div>
)

}

export default StudentCard;