import { createContext, useEffect, useReducer } from 'react'

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null
}

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload
            };

        case "LOGOUT":
            return {
                user: null
            }
        default:
            return state.user;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                dispatch
            }}>
            {children}
        </AuthContext.Provider>
    )
}