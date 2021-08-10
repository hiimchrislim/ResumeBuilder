import React from "react";
import "../TemplateStyles.module.css";

function HeaderTemplate(props) {
    return (
        <>
            <h1>{props.header}</h1>
            <hr></hr>
        </>
    );
}

export default HeaderTemplate;