import React from "react";
import styles from "./PersonalTemplate.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import NumberFormat from 'react-number-format';
import { AddToLibrary } from "../Resume";


function PersonalTemplate(props) {
    AddToLibrary(faAt);
    AddToLibrary(faPhone);
    AddToLibrary(faGlobe);
    AddToLibrary(faGithub);
    return (
        <div className={styles.personalTemplate}>
            <p className={styles.name}>{props.fname} {props.lname}</p>
            <div className={styles.personalInfo}>
                {props.email.length === 0 ? '' : <h4><span className={styles.infoIcon}> <FontAwesomeIcon icon={faAt} width={200} height={200} /></span>{props.email}</h4>}
                {props.telephone.length === 0 ? '' : <h4><span className={styles.infoIcon}><FontAwesomeIcon icon={faPhone} width={200} height={200}/></span><NumberFormat value={props.telephone} displayType={'text'} format={"(###) ###-####"} /></h4>}
                {props.website.length === 0 ? '' : <h4><span className={styles.infoIcon}><FontAwesomeIcon icon={faGlobe} width={200} height={200}/></span>{props.website}</h4>}
                {props.github.length === 0 ? '' : <h4><span className={styles.infoIcon}><FontAwesomeIcon icon={faGithub} width={200} height={200}/></span>{props.github}</h4>}
            </div>
        </div>
    );
}

export default PersonalTemplate;