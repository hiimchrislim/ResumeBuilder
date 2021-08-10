import React, {  useContext } from "react";
import shared from '../../Shared.module.css';
import {Row, Col } from "react-bootstrap";
import {faSeedling, faCode, faPalette, faAward, faBook} from '@fortawesome/free-solid-svg-icons';
import ItemButton from '../ItemButton/ItemButton';
import { ResumeContext } from "../../../App";
import Achievement from "./AdditionalGroup/Forms/Achievement/Achievement"
import Project from "./AdditionalGroup/Forms/Project/Project";
import Hobbies from "./AdditionalGroup/Forms/Hobbies/Hobbies";
import Clubs from "./AdditionalGroup/Forms/Clubs/Clubs";
import Hackathon from "./AdditionalGroup/Forms/Hackathon/Hackathon";

let Additional = () => {
    let {resumeState, setResume} = useContext(ResumeContext);
    const additionalCards = {
        Projects: [],
        Clubs: [],
        Hackathons: [],
        Achievements: [],
        Hobbies: []
    };
    
    let component;
    let isSingleComponent
    for (let key in resumeState) {
        isSingleComponent = false;
        let isAdditionalCard = true;
        let data = resumeState[key];
        for (let i=0; i < resumeState[key].length; i++){
            let id = resumeState[key][i].id;
            switch (key){
                case "Projects":
                    component = <Project key={id} id={id}/>
                    break;
                case "Clubs":
                    component = <Clubs key={id} id={id}/>
                    break;
                case "Hackathons":
                    component = <Hackathon key={id} id={id}/>
                    break;
                case "Hobbies":
                    component = <Hobbies key={i}/>
                    isSingleComponent = true;
                    break;
                case "Achievements":
                    component = <Achievement key={id} id={id}/>
                    break;
                default:
                    isAdditionalCard = false;
            }
            if (isAdditionalCard) {
                additionalCards[key].push(component);
            }
            if (isSingleComponent) {
                break;
            }
        }
    }
    
    let sections = [
        {icon: faBook, name: "Projects"},
        {icon: faSeedling, name: "Clubs"},
        {icon: faCode, name: "Hackathons"},
        {icon: faAward, name: "Achievements"},
        {icon: faPalette, name: "Hobbies"}
    ];

    let addSection = (type) => {

        let updatedResumeState = null;
        switch(type){
            case "Projects":
                let newProj = {
                    id: Math.random(),
                    title: "",
                    subtitle: "",
                    startDate: "",
                    endDate: "",
                    desc: []
                }
                let updatedProjects = [...resumeState.Projects, newProj];
                updatedResumeState = {...resumeState, Projects: updatedProjects};
                setResume(updatedResumeState);
                break;
            case "Achievements":
                let newAch = {
                    id: Math.random(),
                    title: "",
                    desc: ""
                }
                let updatedAchievements = [...resumeState.Achievements, newAch];
                updatedResumeState = {...resumeState, Achievements: updatedAchievements};
                setResume(updatedResumeState);
                break;
            case "Clubs":
                let newClub = {
                    id: Math.random(),
                    title: "",
                    subtitle: "",
                    startDate: "",
                    endDate: "",
                    desc: []
                }
                let updatedClubs = [...resumeState.Clubs, newClub];
                updatedResumeState = {...resumeState, Clubs: updatedClubs};
                setResume(updatedResumeState);
                break;
            case "Hobbies":
                if (additionalCards.Hobbies.length === 0){
                    additionalCards.Hobbies.push(<Hobbies/>);
                    updatedResumeState = {...resumeState, Hobbies: [""]};
                    setResume(updatedResumeState);
                }
                break;
            case "Hackathons":
                let newHackathon = {
                    id: Math.random(),
                    title: "",
                    subtitle: "",
                    startDate: "",
                    endDate: "",
                    desc: []
                }
                let updatedHackathons = [...resumeState.Hackathons, newHackathon];
                updatedResumeState = {...resumeState, Hackathons: updatedHackathons};
                setResume(updatedResumeState);
                break;
        }
    };

    let additionalSectionsMenu = sections.map((section, index) => (
        <ItemButton icon={section.icon}
              name={section.name}
              addNewSection={() => addSection(section.name)}
              key={index}/>
    ));

    return (
        <Row>
            <Col>
                {additionalCards.Projects.length === 0 ? <></> :<span className={"ml-5 " + shared.subtitle}>Projects</span>}
                {additionalCards.Projects}
                {additionalCards.Clubs.length === 0 ? <></> : <span className={"ml-5 " + shared.subtitle}>Clubs</span>}
                {additionalCards.Clubs}
                {additionalCards.Achievements.length === 0 ? <></> : <span className={"ml-5 " + shared.subtitle}>Achievements</span>}
                {additionalCards.Achievements}
                {additionalCards.Hackathons.length === 0 ? <></> : <span className={"ml-5 " + shared.subtitle}>Hackathons</span>}
                {additionalCards.Hackathons}
                {additionalCards.Hobbies.length === 0 ? <></> : <span className={"ml-5 " + shared.subtitle}>Hobbies</span>}
                {additionalCards.Hobbies}
                <div className={"ml-5 mt-3 " + shared.itemButtonGroup}>
                    {additionalSectionsMenu}
                </div>
            </Col>
        </Row>
    )
}

export default Additional;
