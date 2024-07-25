import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [baseUrl, setBaseUrl] = useState(() => {
        // const baseUrl = window.location.origin + "/api"
        const baseUrl = "http://127.0.0.1:8000" + "/api"
        
        localStorage.setItem("baseUrl", baseUrl)
        return localStorage.getItem('baseUrl') || baseUrl;
    })

    const [userData, setUserData] = useState(() => {
        const savedUserData = localStorage.getItem('userData');
        return savedUserData ? JSON.parse(savedUserData) : null;
    });

    const [questions, setQuestions] = useState(() => {
        const savedQuestions = localStorage.getItem('questions');
        return savedQuestions ? JSON.parse(savedQuestions) : null;
    })

    const [selectedSection, setSelectedSection] = useState(() => {
        const selectedSect = localStorage.getItem('selectedSection');
        return selectedSect ? JSON.parse(selectedSect) : null;
    });
    const [selectedGroup, setSelectedGroup] = useState(() => {
        const selectedGrp = localStorage.getItem('selectedGroup');
        return selectedGrp ? JSON.parse(selectedGrp) : null;
    });

    useEffect(() => {
        if (userData) {
            localStorage.setItem('userData', JSON.stringify(userData));
        }
    }, [userData]);

    useEffect(() => {
        if (questions) {
            localStorage.setItem('questions', JSON.stringify(questions));
        }
    }, [questions]);

    useEffect(() => {
        if (selectedSection) {
            localStorage.setItem('selectedSection', JSON.stringify(selectedSection))
        }
        if (selectedGroup) {
            localStorage.setItem('selectedGroup', JSON.stringify(selectedGroup))
        }
    }, [selectedSection, selectedGroup])

    return (
        <UserContext.Provider value={{ userData, setUserData, questions, setQuestions, selectedGroup, setSelectedGroup, selectedSection, setSelectedSection, baseUrl }}>
            {children}
        </UserContext.Provider>
    );

};

export default UserContext
