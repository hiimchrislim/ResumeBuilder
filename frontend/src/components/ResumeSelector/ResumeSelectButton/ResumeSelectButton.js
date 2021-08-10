import React, {useState} from 'react';
import styles from './ResumeSelectButton.module.css';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const ResumeSelectButton = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteResume = () => {
        props.deleteResume();
        handleClose();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} className={styles.modal}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Resume</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this resume? It will be gone forever (a very long time!)</Modal.Body>
                <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={deleteResume}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
            <div className={styles.button}>
                <h3>{props.children}</h3> <br/>
                <Button onClick={props.selectResume}>Edit</Button>
                <Button variant="outline-danger" onClick={handleShow}>Delete</Button>
            </div>
        </>
    )
};

export default ResumeSelectButton;