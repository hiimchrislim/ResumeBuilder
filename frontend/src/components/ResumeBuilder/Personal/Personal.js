import React, { useContext } from "react";
import "./Personal.module.css";
import "../../Shared.module.css";
import { Row, Col } from 'react-bootstrap';
import { ResumeContext } from "../../../App";

const Personal = () => {
    const { resumeState, setResume } = useContext(ResumeContext);
    const handleChange=(event, section)=> {
        let updatedPersonal = {...resumeState.Personal}
        updatedPersonal[section]= event.target.value;
        const newResumeState = {...resumeState, Personal: updatedPersonal};
        setResume(newResumeState)
    }
    
    return (
        <div className="d-flex flex-wrap flex-column justify-content-center pt-2 pl-5 pr-5">
            <Row>
                <Col xs={12} md={12} lg={12} xl={6}>
                    <label htmlFor="fname">First name</label><br></br>
                    <input type="text" id="fname" name="fname" onChange={(event) => handleChange(event, "fname")} defaultValue={resumeState.Personal.fname}></input>
                </Col>
                <Col xs={12} md={12} lg={12} xl={6}>
                    <label htmlFor="lname">Last name</label><br></br>
                    <input type="text" id="lname" name="lname" onChange={(event) => handleChange(event, "lname")} defaultValue={resumeState.Personal.lname}></input>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={12} lg={12} xl={6}>
                    <label htmlFor="email">Email</label><br></br>
                    <input type="email" id="email" name="email" onChange={(event) => handleChange(event, "email")} defaultValue={resumeState.Personal.email}></input>
                </Col>
                <Col xs={12} md={12} lg={12} xl={6}>
                <label htmlFor="phonenumber">Phone Number</label><br></br>
                    <input type="text" id="phonenumber" name="phonenumber" onChange={(event) => handleChange(event, "telephone")} defaultValue={resumeState.Personal.telephone}></input>
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={12} lg={12} xl={6}>
                    <label htmlFor="personalwebsite">Personal Website</label><br></br>
                    <input type="text" id="personalwebsite" name="personalwebsite" onChange={(event) => handleChange(event, "website")} defaultValue={resumeState.Personal.website}></input>
                </Col>
                <Col xs={12} md={12} lg={12} xl={6}>
                    <label htmlFor="github">GitHub</label><br></br>
                    <input type="text" id="github" name="github" onChange={(event) => handleChange(event, "github")} defaultValue={resumeState.Personal.github}></input>
                </Col>
            </Row>
        </div>
    );
}

export default Personal;
