import { useEffect } from "react";
import api from "../../services/api";

export default function CardUserInfo() {
    
    useEffect(() => {

        const headers = {
            'headers': {
                'Authorization': 'Bearer ' + "token",
            }
        };
        
        api.
        get("/auth/getDetails", headers).
            then((res) => {
                console.log(res);
                
            }).catch((err) => {
                console.error("Ocorreu um erro: " + err);
                
            });
    })
    
    return(
        <>
        </>
    )
}