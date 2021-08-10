import React from "react";
import styles from '../TemplateStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { AddToLibrary } from "../Resume";

function HackathonTemplate(props) {
    AddToLibrary(faCalendarAlt);
    const listItems = props.desc.map((point, index) => {
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
            <span className={styles.date}>{props.startDate !== "" ? <><FontAwesomeIcon icon={faCalendarAlt} width={200} height={200}/> {props.startDate} - {props.endDate}</> : ''}</span>
            {(props.desc[0] === "" && props.desc.length === 1) ? "" : <ul>{listItems}</ul>}
        </div>
    );
}

export default HackathonTemplate;
