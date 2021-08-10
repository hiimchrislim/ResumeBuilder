import React from 'react';
import "../Shared.module.css";
import styles from "./ResumeBuilder.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSchool, faUserTie, faUserPlus, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Personal from "./Personal/Personal";
import EducationHistory from "./EducationHistory/EducationHistory";
import Additional from "./Additional/Additional";
import Experience from "./Experience/Experience";
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
import { Button, Modal } from 'react-bootstrap';

const ResumeBuilder = ({resume}) => {
    const cookies = new Cookies();
    const history = new useHistory();
    const selectResumeHandler = () => {
        cookies.remove("resumeID");
        history.replace("/select");
    }

    return ( 
        <div className={"p-3 " + styles.ResumeBuilder}>
            <Button onClick={() => selectResumeHandler()} variant="outline-primary"><FontAwesomeIcon icon={faChevronLeft} /> Back to Dashboard</Button>
            <form>
                <h1 className={styles.ResumeBuilder}>Personal <FontAwesomeIcon icon={faUser} /></h1>
                <hr className={styles.ResumeBuilder} />
                <Personal />

                <h1 className={"mt-5 " + styles.ResumeBuilder}>Education History <FontAwesomeIcon icon={faSchool} /></h1>
                <hr className={styles.ResumeBuilder}/>
                <EducationHistory />

                <h1 className={"mt-5 ml-3 mr-3 " + styles.ResumeBuilder}>Experience <FontAwesomeIcon icon={faUserTie}/></h1>
                <hr className={styles.ResumeBuilder}/>
                <Experience />

                <h1 className={"mt-5 " + styles.ResumeBuilder}>Additional Sections <FontAwesomeIcon icon={faUserPlus} /></h1>
                <hr className={styles.ResumeBuilder}/>
                <Additional />
            </form>
        </div>
    );
};

export default ResumeBuilder;