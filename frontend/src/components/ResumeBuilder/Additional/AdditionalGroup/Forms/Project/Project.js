import React, { useContext, useState } from 'react';
import styles from "./Project.module.css";
import { Row, Col, Accordion, Card, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ResumeContext } from "../../../../../../App";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Project = ({id}) => {
    let {resumeState, setResume} = useContext(ResumeContext);
    let project = resumeState.Projects.filter(proj => { 
        return proj.id === id
    })[0]

    const handleChange=(event, section)=> {
        let updatedProjects = [...resumeState.Projects]
        for(let projIdx in updatedProjects){
            if (updatedProjects[projIdx].id === id) {
                let val;
                if(section === "desc") {
                    val = event.target.value.split("\n");
                } else {
                    val = event.target.value;
                }
                updatedProjects[projIdx][section] = val;
            }
        }
        const newResumeState = {...resumeState, Projects: updatedProjects};
        setResume(newResumeState);
    }

    const deleteProject = (event) => {
        let updatedProjects = [...resumeState.Projects].filter(proj => proj.id !== id);
        const newResumeState = {...resumeState, Projects: updatedProjects};
        setResume(newResumeState);
    }

    const getDesc = (data) => {
        let desc = "";
        for(let i = 0; i < data.length; i++){
            desc += data[i];
            if (i !== data.length - 1){
                desc += "\n";
            }
        }
        return desc;
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className={styles.modal}>Are you sure you want to delete {project.title}?</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={deleteProject}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
        <Accordion defaultActiveKey={"0"} className="mb-3 mr-5 ml-5">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={"1"}>
                    <h2>{project.title === "" ? "New Project" : project.title}</h2>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={"1"}>
                    <Card.Body>
                        <Row>
                            <Col xs={12} md={12} lg={12} xl={6}>
                                <label htmlFor="projectName">Project Name</label><br></br>
                                <input type="text" id="projectName" name="projectName" onChange={(event) => handleChange(event, "title")} defaultValue={project.title}></input>
                            </Col>
                            <Col xs={12} md={12} lg={12} xl={6}>
                                <label htmlFor="role">Role</label><br></br>
                                <input type="text" id="role" name="role" onChange={(event) => handleChange(event, "subtitle")} defaultValue={project.subtitle}></input>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={12} lg={12} xl={6}>
                                <label htmlFor="startDate">Start Date</label><br></br>
                                <input type="month" id="startDate" name="startDate" onChange={(event) => handleChange(event, "startDate")} defaultValue={project.startDate}></input>
                            </Col>
                            <Col xs={12} md={12} lg={12} xl={6}>
                                <label htmlFor="endDate">End Date</label><br></br>
                                <input type="month" id="endDate" name="endDate" onChange={(event) => handleChange(event, "endDate")} defaultValue={project.endDate}></input>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={12} lg={12} xl={12}>
                                <label htmlFor="description">Description</label><br></br>
                                <textarea id="description" className={"w-100 " + styles.description} name="description" onChange={(event) => handleChange(event, "desc")} defaultValue={getDesc(project.desc)}></textarea>
                            </Col>
                        </Row>
                            
                        <Row className="d-flex justify-content-end mt-4 mr-1">
                            <button type="button"  className={styles.decline} onClick={(event) => handleShow()} >
                                <FontAwesomeIcon icon={faTrashAlt}/>
                            </button>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
        </>
    )
};

export default Project;
