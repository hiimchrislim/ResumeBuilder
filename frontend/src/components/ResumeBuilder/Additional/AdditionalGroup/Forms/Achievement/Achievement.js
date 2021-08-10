import React, { useContext, useState } from 'react';
import styles from "./Achievement.module.css";
import { Row, Col, Accordion, Card, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ResumeContext } from "../../../../../../App";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Achievement = ({id}) => {
    let {resumeState, setResume} = useContext(ResumeContext);
    let achievement = resumeState.Achievements.filter(achv => { 
        return achv.id === id
    })[0]

    const handleChange=(event, section)=> {
        let updatedAchievements = [...resumeState.Achievements]
        for(let achIdx in updatedAchievements){
            if (updatedAchievements[achIdx].id === id) {
                let val = event.target.value;
                updatedAchievements[achIdx][section] = val;
            }
        }
        const newResumeState = {...resumeState, Achievements: updatedAchievements};
        setResume(newResumeState);
    }

    const deleteAchievement = (event) => {
        let updatedAchievements = [...resumeState.Achievements].filter(achv => achv.id !== id);
        const newResumeState = {...resumeState, Achievements: updatedAchievements};
        setResume(newResumeState);
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className={styles.modal}>Are you sure you want to delete {achievement.title}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteAchievement}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Accordion defaultActiveKey={"0"} className="mb-3 mr-5 ml-5">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={"1"}>
                        <h2>{achievement.title === "" ? "New Achievement" : achievement.title}</h2>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={"1"}>
                        <Card.Body>
                            <Row>
                                <Col xs={12} md={12} lg={12} xl={6}>
                                    <label htmlFor="achievementTitle">Title</label><br></br>
                                    <input type="text" id="achievementTitle" name="achievementTitle" onChange={(event) => handleChange(event, "title")} defaultValue={achievement.title}></input>
                                </Col>
                                <Col xs={12} md={12} lg={12} xl={6}>
                                    <label htmlFor="desc">Description</label><br></br>
                                    <input type="text" id="desc" name="desc" onChange={(event) => handleChange(event, "desc")} defaultValue={achievement.desc}></input>
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

export default Achievement;
