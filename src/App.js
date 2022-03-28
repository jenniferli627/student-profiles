import React, {useState, useEffect} from "react";

import './App.css';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

import StudentCard from './components/studentCard';

function App() {

  const [studentInfo, setStudentInfo] = useState([]);
  const [studentFilter, setStudentFilter]  = useState([]);
  const [contentFilter, setContentFilter] = useState([]);
  const [tagFilter, setTagFilter] = useState([]);
  const [loading, setLoading] = useState(false);

const fetchStudents= async (url)=>{

  const data = await fetch(url).then((response)=> response.json()).then((students)=>{
    let studentInfo= [];
    students.students.map((item)=> {
    let addTags= item;
    addTags.tags=[];
    studentInfo.push(addTags);
    })

    setStudentInfo(studentInfo); 
    setStudentFilter(studentInfo);
    setTagFilter(studentInfo);
    setContentFilter(studentInfo)
  })
  
  .then(()=>{
    setLoading(true);
    console.log('loading', loading);
    })
}

const fetchName =  (str)=> {
  const nameArray= [];
  studentInfo.map((student)=>{
    const fullName= `${student.firstName} ${student.lastName}`.toLowerCase();
    if(fullName.includes(str)){nameArray.push(student)};
  })

  let filterContent= [];
  tagFilter.map(student =>{
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    if(fullName.includes(str)){filterContent.push(student)}
  })
  setStudentFilter(nameArray);
  setContentFilter(filterContent);
}


const fetchTag =(str)=>{
  if(str){
  const tagArray= [];
  const contentArray= [];
  contentFilter.map((student)=>{
    let tagged= false;
    student.tags.map((tag)=> {
    if(tag.includes(str)){
      tagged=true;
    }})

    if(tagged) {
      tagArray.push(student);
    }
  });

  studentFilter.map((student)=>{
    let tagged= false;
    student.tags.map((tag)=>{
    if(tag.includes(str)){
      tagged=true
    }}); 
    if(tagged) {
      contentArray.push(student)
    }
  })
  setContentFilter(contentArray);
  setTagFilter(tagArray);
  }

  else{
    setTagFilter(studentInfo);
    setContentFilter(studentFilter)
  }
}


const changeFilter =(e)=>{
  fetchName(e.target.value)
}

const changeTag =(e)=>{
  fetchTag(e.target.value)
}

const average= (arr)=>{
  return arr.reduce((a,b)=> Number(a)+Number(b), 0)/arr.length
}

const addTag= (str, index)=>{
  let tagInfo= [...studentInfo];
  const tagInfo_target= tagInfo[index];
  console.log(tagInfo_target);
  tagInfo_target.tags.push(str);
  setStudentInfo(tagInfo);
}

useEffect(()=>{
  fetchStudents('https://api.hatchways.io/assessment/students');
},[]);


  return (
     <div className="App"> {loading? 
      <Container>
        <div className="row pt-4 pb-4">
          <div className='col-6 google-fonts text-secondary'>Student Profiles</div>
        </div>
      
        <div className="form-group row"><input className="form-control form-control-border mb-2 mt-2" name="searchStudent" id="searchStudent" type="text"  onChange={changeFilter} placeholder="Search Name"/></div>
        <div className="form-group row"><input className="form-control form-control-border mb-2 mt-2" name="searchTag" id="searchTag" type="text" onChange={changeTag}  placeholder="Search Tag"/></div>

          {contentFilter? contentFilter.map((student,index)=>
          <StudentCard
          key={index}
          index={index}
          pic={student.pic}
          firstName= {student.firstName}
          lastName= {student.lastName}
          email= {student.email}
          company= {student.company}
          skill= {student.skill}
          grades={student.grades}
          tags={student.tags}
          average= {average}
          addTag= {addTag}/>)
              :'Loading...'}

      </Container>: <Spinner animation="border" variant="info" />}
    </div>
  );
}

export default App;
