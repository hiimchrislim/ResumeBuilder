import React, { useContext } from "react";
import "./EducationHistory.module.css";
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import {ResumeContext} from "../../../App";
// list of courses
const courseOptions = [
    { value: 'csc207', label: 'CSC207 - Software Design'},
    { value: 'csc209', label: 'CSC209 - Software Tools and Systems Programming'},
    { value: 'csc263', label: 'CSC263 - Data Structures and Analysis'},
    { value: 'csc301', label: 'CSC301 - Introduction to Software Engineering'},
    { value: 'csc343', label: 'CSC343 - Introduction to Databases'},
    { value: 'csc373', label: 'CSC373 - Algorithms & Data Structures Analysis'},
    { value: 'csc363', label: 'CSC363 - Computational Complexity & Computability'}
];
let skillOptions = ["Python", "MySQL", "NoSQL", "REST", "Spring", "JavaScript", "Vue", "React", "Node", "Express", "HTML", "CSS", "Bootstrap", "Firebase", "Android", "Git", "Unix", "Agile", "Scrum", "SDLC", "Jira"];

const renderOptions = (skillOptions) => {
    return skillOptions.map((skill) => {
        return {value: skill, label: skill};
    });
};

// styling htmlFor the select box
const customStyles = {
    container: (base, state) => ({
      ...base,
      border: state.isFocused ? null : null,
      transition:
        "border-color 0.2s ease, box-shadow 0.2s ease, padding 0.2s ease",
        "&:hover": {
        boxShadow: "0 2px 4px 0 rgba(41, 56, 78, 0.1)"
      }
    }),
    control: (base, state) => ({
      ...base,
      background: "white"
    }),
    valueContainer: (base, state) => ({
      ...base,
      background: "white",
      fontSize: "18px"
    }),
    multiValue: (base, state) => ({
      ...base,
      background: "white",
      maxWidth: "100px"
    })
  };



const EducationHistory = () => {

    const { resumeState, setResume } = useContext(ResumeContext);
    const handleChange=(event, section)=> {
        let updatedEducationHistory = {...resumeState.EducationHistory}
        updatedEducationHistory[section]= event.target.value;
        const newResumeState = {...resumeState, EducationHistory: updatedEducationHistory};
        setResume(newResumeState)
    };

    const setCourseWork = (selectedCourseWork) => {
        const newSelectedCourseWork = selectedCourseWork.map((courseWorkObj) => {
            let course = courseWorkObj.label.split("-");
            return course[course.length-1].trim();
        });
        const newResumeState = {...resumeState, CourseWork: newSelectedCourseWork};
        setResume(newResumeState);
    };

    console.log(resumeState.EducationHistory.gpa);
    console.log(resumeState.CourseWork);

    const setSkills = (selectedSkills) => {
        const newSelectedSkills = selectedSkills.map((skillObj) => {
            return skillObj.label
        });
        const newResumeState = {...resumeState, Skills: newSelectedSkills};
        setResume(newResumeState);
    };

    return (
        <div className="d-flex flex-wrap flex-column justify-content-center pt-2 pl-5 pr-5">
            <Row>
                <Col xs={12} md={12} lg={12} xl={6}>
                    <label htmlFor="school">School</label><br></br>
                    <input type="text" id="school" name="school" onChange={(event) => handleChange(event, "school")} defaultValue={resumeState.EducationHistory.school}></input>
                </Col>
                <Col xs={12} md={12} lg={12} xl={6}>
                    <label htmlFor="degree">Degree</label><br></br>
                    <input type="text" id="degree" name="degree" onChange={(event) => handleChange(event, "degree")} defaultValue={resumeState.EducationHistory.degree}></input>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={12} lg={12} xl={5}>
                    <label htmlFor="start_date">Start Date</label><br></br>
                    <input type="month" id="start_date" name="start_date" min="0" onChange={(event) => handleChange(event, "startDate")} defaultValue={resumeState.EducationHistory.startDate}></input>
                </Col>
                <Col xs={12} md={12} lg={12} xl={5}>
                    <label htmlFor="end_date">End Date</label><br></br>
                    <input type="month" id="end_date" name="end_date" min="0" onChange={(event) => handleChange(event, "endDate")} defaultValue={resumeState.EducationHistory.endDate}></input>
                </Col>
                <Col xs={12} md={12} lg={12} xl={2}>
                    <label htmlFor="gpa">GPA</label><br></br>
                    <input type="number" id="gpa" name="gpa" min="0.0" max="4" step="0.1" onChange={(event) => handleChange(event, "gpa")} defaultValue={resumeState.EducationHistory.gpa}></input>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={12} lg={12} xl={12}>
                    <label htmlFor="course_select" id="course_select_label">Skills</label>   
                    <Select 
                        id="course_select"
                        closeMenuOnSelect={false}
                        options={renderOptions(skillOptions)}
                        styles={customStyles}
                        onChange={setSkills}
                        defaultValue={renderOptions(resumeState.Skills)}
                        isMulti
                        animatedComponents
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={12} lg={12} xl={12}>
                    <label htmlFor="course_select" id="course_select_label">Relevant Courses Taken</label>   
                    <Select 
                        id="course_select"
                        closeMenuOnSelect={false}
                        options={courseOptions}
                        onChange={setCourseWork}
                        styles={customStyles}
                        defaultValue={renderOptions(resumeState.CourseWork)}
                        isMulti
                        animatedComponents
                    />
                </Col>
            </Row>
        </div>
    );
}

export default EducationHistory;