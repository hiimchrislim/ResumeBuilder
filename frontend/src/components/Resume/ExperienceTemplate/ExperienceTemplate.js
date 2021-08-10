import React from "react";
import styles from "../TemplateStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { AddToLibrary } from "../Resume";

function ExperienceTemplate(props) {

    AddToLibrary(faCalendarAlt);
    AddToLibrary(faMapMarkerAlt);
    const jobDesc = props.desc;
    const listItems = jobDesc.map((point, index) => {
        return (
            <li key={index}>
                {point}
            </li>
         )
        }
    );
    return (
        <div>
            <h2>{props.title}</h2>
            <h3 className="resumeRender">{props.subtitle}</h3>
            <span className={styles.date}>{props.startDate !== "" ? <><FontAwesomeIcon icon={faCalendarAlt} width={200} height={200}/> {props.startDate} - {props.endDate}</> : ''}</span> {props.location === "" ? '' : <><span className={styles.location}><FontAwesomeIcon icon={faMapMarkerAlt} width={200} height={200}/> {props.location}</span></>}
            {(props.desc[0] === "" && props.desc.length === 1) ? "" : <ul>{listItems}</ul>}
        </div>
    );
}

export default ExperienceTemplate;
