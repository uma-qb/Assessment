import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(() => {
        const savedUserData = localStorage.getItem('userData');
        return savedUserData ? JSON.parse(savedUserData) : null;
    });

    const [questions, setQuestions] = useState(() => {
        const savedQuestions = localStorage.getItem('questions');
        return savedQuestions ? JSON.parse(savedQuestions) : null;
    })

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

    return (
        <UserContext.Provider value={{ userData, setUserData, questions, setQuestions }}>
            {children}
        </UserContext.Provider>
    );

};

export default UserContext
