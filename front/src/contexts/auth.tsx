import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextData {
    signed: boolean;
    token: string;
    userId: number;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {

    /** Constantes */
    const [ authorization, setAuthorization ] = useState("");
    const [ userId, setUserId ] = useState<any>(null);

    const userToken = async () => {
        let token = '';
        try {
            const value = await localStorage.getItem('token');
            if(value !== null) {
                token = 'Bearer '.concat(value);
                return token;                
            }
        } catch (e) {
            console.log("Sem token.")
        }
        return token;
    };

    const getUserId = async () => {
        let id  = 0;
        try {
            const value = await localStorage.getItem("id");
            if(value !== null) {
                id = parseInt(value);                
                return id;
            }
        } catch (e) {
            console.log("Sem id.");
        }

        return id;
    }

    function signOut() {
        localStorage.clear();
    }

    useEffect(() => {
        userToken().then(value => {
            setAuthorization(value);
        });
    }, [])

    useEffect(() => {
        getUserId().then(value => {         
            setUserId(value);
        });
    }, [])


    return (
        <AuthContext.Provider value={{ signed: true, token: authorization, userId: userId, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

/** Criando uma hook para o contexto AuthContext */
export default function useAuth() {
    const context = useContext(AuthContext);

    return context;
};
