import React, { useContext } from 'react';
import styles from "../Shared.module.css";
import "./TemplateStyles.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonalTemplate from "./PersonalTemplate/PersonalTemplate";
import HeaderTemplate from "./HeaderTemplate/HeaderTemplate";
import ExperienceTemplate from "../Resume/ExperienceTemplate/ExperienceTemplate";
import EducationTemplate from "./EducationTemplate/EducationTemplate";
import AchievementsTemplate from "./AchievementsTemplate/AchievementsTemplate";
import CollectionTemplate from "./CollectionTemplate/CollectionTemplate";
import ClubsTemplate from "./ClubsTemplate/ClubsTemplate";
import HobbiesTemplate from "./HobbiesTemplate/HobbiesTemplate";
import { ResumeContext } from "../../App";
import Clubs from '../ResumeBuilder/Additional/AdditionalGroup/Forms/Clubs/Clubs';
import HackathonTemplate from './HackathonTemplate/HackathonTemplate';
import Pdf from "react-to-pdf";
import { library } from "@fortawesome/fontawesome-svg-core";


const ref = React.createRef();

export function AddToLibrary(icon) {
    library.add(icon);
}

const Resume = () => {
    const resumeComponents = {
        Experience: [],
        Projects: [],
        Achievements: [],
        EducationHistory: [],
        Skills: [],
        Clubs: [],
        Hobbies: [],
        Hackathons: [],
        CourseWork: [],
    };

    let {resumeState} = useContext(ResumeContext);
    let resume = resumeState;
    let component;
    for (let key in resume) {
        if (key !== "userid" && key !=="_id" && key !=="__v"){
            // console.log(key);
            // Rendering the header if there is data available to process
            if ((key === "Hobbies" && resume["Hobbies"].length >= 1 && resume["Hobbies"][0] !== "") ||
            (key !== "Personal" && resume[key].length !== 0) && key !== "Hobbies"){
                let header = key.replace(/([A-Z])/g, ' $1').replace(/^./, ((str) => {
                    return str.toUpperCase();
                }));
                resumeComponents[key].push(<HeaderTemplate key={header} header={header}/>)
            }
            for (let i=0; i < resume[key].length; i++){
                let data = resume[key][i];
                let isCollection = false;
                switch(key) {
                    case "Projects":
                    case "Experience":
                        let location = "";
                        if (data.location !== undefined) {
                            location = data.location;
                        }
                        component = <ExperienceTemplate key={i} title={data.title} subtitle={data.subtitle} startDate={data.startDate} endDate={data.endDate} location={location} desc={data.desc}/>
                        break;
                    case "Achievements":
                        component = <AchievementsTemplate key={i} title={data.title} desc={data.desc} />
                        break;
                    case "CourseWork":
                    case "Skills":
                        isCollection = !isCollection;
                        component = <CollectionTemplate key={i} items={resume[key]}/>
                        break;
                    case "Hobbies":
                        isCollection = !isCollection;
                        component = <HobbiesTemplate key={i} hobbies={resume[key]}/>
                        break;
                    case "Clubs":
                        component = <ClubsTemplate key={i} title={data.title} subtitle={data.subtitle} startDate={data.startDate} endDate={data.endDate} desc={data.desc}/>
                        break;
                    case "Hackathons":
                        component = <HackathonTemplate key={i} title={data.title} subtitle={data.subtitle} startDate={data.startDate} endDate={data.endDate} desc={data.desc}/>
                        break;
                    default:
                        break;            
                }
                resumeComponents[key].push(component);
                if (isCollection){
                    break;
                }
            }
        }
    }
    return (
        <div id={styles.ResumeRender}>
            <Pdf targetRef={ref} filename="Resume.pdf" x={.8} y={.8} scale={1}>
                {({ toPdf }) => <button className="pdfButton" onClick={toPdf}>Generate PDF</button>}
            </Pdf>
            <div ref={ref}>
                <PersonalTemplate fname={resume.Personal.fname} lname={resume.Personal.lname} email={resume.Personal.email} telephone={resume.Personal.telephone} website={resume.Personal.website} github={resume.Personal.github}/>
                <div className="d-flex pl-5 pr-5 pb-5">
                    <div className={"mr-3 " + styles.w65}>
                        {resumeComponents.Experience}
                        {resumeComponents.Projects}
                        {resumeComponents.Clubs}
                        {resumeComponents.Hackathons}
                    </div>
                    <div className={styles.w35}>
                        {resume["EducationHistory"].school === "" || Object.keys(resume["EducationHistory"]).length === 0 ? '' :
                        <>
                        <HeaderTemplate header={"Education History"}/>
                        <EducationTemplate school={resume.EducationHistory.school} degree={resume.EducationHistory.degree} start_date={resume.EducationHistory.startDate} end_date={resume.EducationHistory.endDate} gpa={resume.EducationHistory.gpa}/>
                        </>
                        }
                        {resumeComponents.Achievements}
                        {resumeComponents.Hobbies}
                        {resumeComponents.Skills}
                        {resumeComponents.CourseWork}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;