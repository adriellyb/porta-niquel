import { useState } from "react";
import api from "../../services/api";
import useAuth from "../../contexts/auth";
import { useNavigate } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { InputMask } from "primereact/inputmask";

import "./style.css";
import img from "../../assets/girl.png"

export default function CardUserInfo(data: any) {

    const user = data.data;
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const [showForm, setForm] = useState<any>(true);
    const [userData, setUserData] = useState({
        nome: '',
        telefone: '',
        nascimento: '',
    });

    const dataHora = () => {
        const data = new Date();
        const dias = [
            "Domingo",
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado"
        ]

        const mes = data.getMonth() + 1;
        let hora = data.getHours() <= 9 ? "0" + data.getHours() : data.getHours();
        let minutos = data.getMinutes() <= 9 ? "0" + data.getMinutes() : data.getMinutes();

        const dataAtualizada = {
            dataHoje: data.getDate() + "/" + mes + "/" + data.getFullYear(),
            horaAgora: hora + ":" + minutos,
            diaSemana: dias[data.getDay()]
        }

        return dataAtualizada;
    }

    const valueInput = (e: any) => {
        setUserData({
            ...data,
            [e.target.name]: e.target.name === "metodo_pag" ? e.target.value.name : e.target.value
        })
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        api.
            put(`user/${user.sub}`, userData)
            .then((res) => {
                console.log("Usuário alterado.");

                setUserData({
                    nome: '',
                    telefone: '',
                    nascimento: '',
                });
                navigate(0);
            }).catch((err) => {
                console.error("Ocorreu um erro: " + err);
            });
    }

    const sair = () => {
        confirmDialog({
            message: 'Deseja desconectar de sua conta?',
            header: 'Sair',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            acceptLabel: "Sim",
            rejectLabel: "Não",
            accept: () => {
                signOut();
                navigate("/");
            }
        });
    }

    const form = () => {
        return (
            <>
                <br />
                <form onSubmit={onSubmit}>
                    <InputText
                        name='nome'
                        placeholder={user.nome}
                        onChange={valueInput}
                        className="mr-3 mb-3"
                    />

                    <InputMask
                        name='telefone'
                        placeholder={user.telefone}
                        mask="(99) 99999-9999"
                        onChange={valueInput}
                        className="mr-3 mb-3"
                    />

                    <InputMask
                        name='nascimento'
                        placeholder={ user.nascimento}
                        mask="99/99/9999"
                        slotChar="dd/mm/aaaa"
                        onChange={valueInput}
                        className="mr-3 mb-3"

                    />
                    <br />
                    <Button label="Salvar" type='submit' icon="pi pi-check" size="small" />
                </form>
            </>
        )
    }

    return (
        <>
            <Card>
                <div className="flex flex-wrap">
                    <div className="date">
                        <h2>{dataHora().horaAgora}</h2>
                        <p>{dataHora().diaSemana + ", " + dataHora().dataHoje}</p>
                    </div>
                    <Divider layout="vertical" className="hidden md:block" />

                    <div className="info-box flex flex-wrap">
                        <Image
                            src={img}
                            alt="menina apontando para a direita"
                            width="120"
                        />
                        <div className="texto">
                            <p>Bem vindo(a), {user.nome}</p>
                            <p className="text-sm">Não esqueça de manter seu saldo e suas despesas atualizados.</p>
                            <div className="flex">
                                <Button
                                    label="Editar perfil"
                                    icon="pi pi-user-edit"
                                    size="small"
                                    onClick={() => setForm(!showForm)}
                                />
                                <Button
                                    icon="pi pi-sign-out"
                                    size="small"
                                    severity="danger"
                                    className="mx-3"
                                    onClick={sair}
                                />
                            </div>
                            <ConfirmDialog />
                        </div>
                    </div>
                </div>
                <div hidden={showForm}>
                    <br />
                    {form()}
                </div>
            </Card>
        </>
    )
}