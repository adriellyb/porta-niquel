import { useEffect } from "react";
import api from "../../services/api";
import useAuth from "../../contexts/auth";

export default function CardUserInfo(data: any) {
    
    const user  = data.data;    
    
    return (
        <>
        <p>{ user.nome }</p>
        </>
    )
}