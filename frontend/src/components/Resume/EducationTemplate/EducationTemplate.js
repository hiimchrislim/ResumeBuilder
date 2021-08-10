import React from "react";
import styles from '../TemplateStyles.module.css';
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddToLibrary } from "../Resume";

function EducationTemplate(props) {
    AddToLibrary(faCalendarAlt);
    return (
        <>
            <h2>{props.school}</h2>
            <h3>{props.degree}</h3>
            <span className={styles.date}><FontAwesomeIcon icon={faCalendarAlt} width={200} height={200}/> {props.start_date} - {props.end_date} | GPA: {props.gpa}</span>
        </>
    );
}

export default EducationTemplate;