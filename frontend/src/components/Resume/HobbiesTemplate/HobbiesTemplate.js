import React from "react";
import styles from "./HobbiesTemplate.module.css";

function HobbiesTemplate(props) {
    const hobbies = props.hobbies.join(', ').trim();
    return (
        <span className={styles.desc}>{hobbies}</span>
    );
}

export default HobbiesTemplate;
