import React, { useContext, useState} from 'react';
import styles from "../Project/Project.module.css";
import { Row, Col, Accordion, Card, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ResumeContext } from "../../../../../../App";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Hackathon = ({id}) => {
    let {resumeState, setResume} = useContext(ResumeContext);
    let hackathon = resumeState.Hackathons.filter(hackathon => { 
        return hackathon.id === id
    })[0]

    const handleChange=(event, section)=> {
        let updatedHackathons = [...resumeState.Hackathons]
        for(let hackathonIdx in updatedHackathons){
            if (updatedHackathons[hackathonIdx].id === id) {
                let val;
                if(section === "desc") {
                    val = event.target.value.split("\n");
                } else {
                    val = event.target.value;
                }
                updatedHackathons[hackathonIdx][section] = val;
            }
        }
        const newResumeState = {...resumeState, Hackathons: updatedHackathons};
        setResume(newResumeState);
    }

    const deleteHackathon = (event) => {
        let updatedHackathons = [...resumeState.Hackathons].filter(hackathon => hackathon.id !== id);
        const newResumeState = {...resumeState, Hackathons: updatedHackathons};
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
                <Modal.Body className={styles.modal}>Are you sure you want to delete {hackathon.title}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteHackathon}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Accordion defaultActiveKey={"0"} className="m-3 mr-5 ml-5">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={"1"}>
                    <h2>{hackathon.title === "" ? "New Hackathon" : hackathon.title}</h2>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={"1"}>
                    <Card.Body>
                        <Row>
                            <Col xs={12} md={12} lg={12} xl={6}>
                                <label htmlFor="hackathonName">Hackathon Name</label><br></br>
                                <input type="text" id="hackathonName" name="hackathonName" onChange={(event) => handleChange(event, "title")} defaultValue={hackathon.title}></input>
                            </Col>
                            <Col xs={12} md={12} lg={12} xl={6}>
                                <label htmlFor="role">Role</label><br></br>
                                <input type="text" id="role" name="role" onChange={(event) => handleChange(event, "subtitle")} defaultValue={hackathon.subtitle}></input>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={12} lg={12} xl={6}>
                                <label htmlFor="startDate">Start Date</label><br></br>
                                <input type="month" id="startDate" name="startDate" onChange={(event) => handleChange(event, "startDate")} defaultValue={hackathon.startDate}></input>
                            </Col>
                            <Col xs={12} md={12} lg={12} xl={6}>
                                <label htmlFor="endDate">End Date</label><br></br>
                                <input type="month" id="endDate" name="endDate" onChange={(event) => handleChange(event, "endDate")} defaultValue={hackathon.endDate}></input>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={12} lg={12} xl={12}>
                                <label htmlFor="description">Description</label><br></br>
                                <textarea id="description" className={"w-100 " + styles.description} name="description" onChange={(event) => handleChange(event, "desc")} defaultValue={getDesc(hackathon.desc)}></textarea>
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
    );
}

export default Hackathon;
