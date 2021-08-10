import React from "react";
import TemplateStyles from "../TemplateStyles.module.css";
import styles from "./AchievementsTemplate.module.css";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddToLibrary } from "../Resume";

function AchievementsTemplate({title, desc}) {
    AddToLibrary(faTrophy);
    return (
        <div className="m-2">
            <div className={styles.trophy}>
            {(title === "" && desc === "") ? <></> : <FontAwesomeIcon icon={faTrophy} width={200} height={200}/>}
            </div>
            <div>
                <h4>{title}</h4>
                <span className={TemplateStyles.date}>{desc}</span>
            </div>
        </div>
    );

}

export default AchievementsTemplate;
