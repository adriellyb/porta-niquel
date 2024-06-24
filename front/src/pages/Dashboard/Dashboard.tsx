import { useEffect, useState } from "react";
import api from "../../services/api";

import CardUserInfo from "../../components/CardUserInfo";
import useAuth from "../../contexts/auth";

function Dashboard() {
    
    const [ userData, setUserData ]:any = useState([]);
    const [ saldo, setSaldo ]:any = useState([]);
    const [ despesas, setDespesas ]:any = useState([]);

    const token = "Bearer "+localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    const getDetails = async() => {
        const headers = {
            'headers': {
                'Authorization': token,
            }
        };
        await api.
        get("/auth/getDetails", headers).
            then((res) => {
                const { sub } = res.data.user;
                localStorage.setItem("id", sub);

                setUserData(res.data.user);
                
            }).catch((err) => {
                console.error("Ocorreu um erro: " + err);
            });
    }

    const getSaldo = async() => {
        await api.
        get(`/saldo/${userId}`).
            then((res) => {
                setSaldo(res.data.saldo);
                console.log(res);
                
            }).catch((err) => {
                console.error("Ocorreu um erro: " + err);
            });
    }

    const getDespesas = async() => {
        await api.
        get(`/despesa/${userId}`).
            then((res) => {
                setDespesas(res.data.despesas);
                console.log(res);
                
            }).catch((err) => {
                console.error("Ocorreu um erro: " + err);
            });
    }

    useEffect(() => {        
        getDetails();
    }, []);

    useEffect(() => {  
        getSaldo();        
    }, []);

    useEffect(() => {  
        getDespesas();        
    }, []);

    return(
        <>
            <CardUserInfo data={userData} />
            <p>{userId}</p>
        </>
    )
}

export default Dashboard;