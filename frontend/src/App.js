import React, {useReducer, createContext, useState, useEffect} from "react";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ResumeBuilder from "./components/ResumeBuilder/ResumeBuilder";
import Resume from "./components/Resume/Resume";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from "./components/Login/Login";
import axios from "./axios";
import ResumeSelector from "./components/ResumeSelector/ResumeSelector";
import Cookies from 'universal-cookie';

let ResumeTemplate = {
    userid: "",
    Personal: {
        fname: "",
        lname: "",
        email: "",
        telephone: "",
        website: "",
        github: ""
    },
    Experience: [],
    Projects: [],
    Achievements: [],
    EducationHistory: {
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
        gpa: 0
    },
    Skills: [],
    CourseWork: [],
    Clubs: [],
    Hobbies: [],
    Hackathons: [],
};


export const ResumeContext = createContext();
export const UserIDContext = createContext();


const App = () => {
    const cookies = new Cookies();
    let selectedResumeID = cookies.get("resumeID");
    let selectedUserID = cookies.get("userID");

    useEffect(() => {
        let fetchData = async() => {
            await axios.get(`/Template/${selectedResumeID}/${selectedUserID}`).then((result => {
                setResume(result.data);
            }));
        }
        fetchData();
    }, [])

    const reducer = (_, newState)  => {
        newState.userid = selectedUserID
        axios.put(`/Template/${selectedResumeID}`, newState)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });
        return {...newState};
    };
    
    let areducer = (_, userID) => {
        console.log(userID);
    };

    const [resumeState, setResume] = useReducer(reducer, ResumeTemplate);
    const [userID, setUserID] = useReducer(areducer, "");


    return (
        <BrowserRouter>
            <Switch>
                <Route path ='/login'>
                    <UserIDContext.Provider value={{userID, setUserID}}>
                        <Login />
                    </UserIDContext.Provider>
                </Route>
                <Route path ='/select'>
                    <UserIDContext.Provider value={{userID, setUserID}}>
                        <ResumeSelector />
                    </UserIDContext.Provider>
                </Route>
                <Route path = "/resume">
                    <div className="d-flex w-100">
                        <ResumeContext.Provider value={{resumeState, setResume}}>
                            <ResumeBuilder/>
                            <Resume/>
                        </ResumeContext.Provider>
                    </div>
                </Route> 
                <Route path = '/'>
                </Route> 
            </Switch>
        </BrowserRouter>

    );
}

export default App;
