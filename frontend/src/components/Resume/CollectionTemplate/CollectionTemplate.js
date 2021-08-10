import React from "react";
import styles from "./CollectionTemplate.module.css";

function CollectionTemplate(props) {
    const items = props.items.map((item, index) => {
        return (
            <div className={styles.item} key={index}>
                {item}
            </div>
        )
    })
    return (
        <div className="mt-2">
            {items}
        </div>
    )
}

export default CollectionTemplate;
