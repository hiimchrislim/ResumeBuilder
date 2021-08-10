import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./ItemButton.module.css";

let ItemButton = (props) => {
    return (
        <div onClick={props.addNewSection} className={styles.item}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={props.icon} size={"2x"}/>
            </div>
            <div className={styles.title}>
                {props.name}
            </div>
        </div>
    )
}

export default ItemButton;
