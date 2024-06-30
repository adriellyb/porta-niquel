import { useEffect, useState } from "react";
import api from "../../services/api";

import CardUserInfo from "../../components/CardUserInfo";
import CardSaldoInfo from "../../components/CardSaldoInfo";
import CardDespesasInfo from "../../components/CardDespesasInfo";
import DespesasForm from "../../components/DespesasForm";
import CardSaldoHistorico from "../../components/CardSaldoHistorico";

function Dashboard() {

    const [userData, setUserData]: any = useState([]);
    const [saldo, setSaldo]: any = useState([]);
    const [despesas, setDespesas]: any = useState([]);

    const token = "Bearer " + localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    const getDetails = async () => {
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

    const getSaldo = async () => {
        await api.
            get(`/saldo/usuario/${userId}`).
            then((res) => {
                setSaldo(res.data.saldo);

            }).catch((err) => {
                console.error("Ocorreu um erro: " + err);
            });
    }

    const getDespesas = async () => {
        await api.
            get(`/despesa/usuario/${userId}`).
            then((res) => {
                setDespesas(res.data.despesas);
                
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

    return (
        <>
            <div className="grid">
                <div className="col-12 xl:col-8 p-3">
                    <CardUserInfo data={userData} />
                    <br />
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <CardSaldoInfo data={saldo} />
                        </div>
                        <div className="col-12 md:col-6">
                            <CardSaldoHistorico data={saldo} />
                        </div>
                    </div>
                </div>
                <div className="col-12 xl:col-4 p-3">
                    <div className="grid">
                        <div className="col-12 md:col-6 xl:col-12">
                            <CardDespesasInfo data={despesas} />
                        </div>
                        <div className="col-12 md:col-6 xl:col-12">
                            <DespesasForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;