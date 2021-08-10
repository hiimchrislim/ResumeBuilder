import React, {useContext} from "react";
import shared from '../../Shared.module.css';
import {Row, Col } from "react-bootstrap";
import {faBriefcase} from '@fortawesome/free-solid-svg-icons';
import ItemButton from "../ItemButton/ItemButton";
import { ResumeContext } from "../../../App";
import ExperienceForm from './ExperienceForm/ExperienceForm';

const Experience = () => {
    let {resumeState, setResume} = useContext(ResumeContext);
    const experiences = resumeState.Experience.map((experience) => {
        return <ExperienceForm key={experience.id} id={experience.id}/>;
    });

    let addExperience = () => {
        let newExperience = {
           id: Math.random(),
           title: "",
           subtitle: "",
           startDate: "",
           endDate: "",
           location: "",
           desc: []
        }
        let updatedExperience = [...resumeState.Experience, newExperience];
        let updatedResumeState = {...resumeState, Experience: updatedExperience};
        setResume(updatedResumeState);
    };

    return (
        <Row>
            <Col >
                {experiences}
                <div className={"ml-5 mt-3 " + shared.itemButtonGroup}>
                    <ItemButton 
                        icon={faBriefcase} 
                        name={"Experience"}
                        addNewSection={() => addExperience()}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default Experience;
