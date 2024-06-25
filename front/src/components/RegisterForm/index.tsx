import { useRef, useState } from "react";
import api from "../../services/api";

import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Image } from "primereact/image";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";

import logo from '../../assets/logo.png'
import "./style.css";

export default function RegisterForm() {

    const [data, setData] = useState({
        nome: '',
        telefone: '',
        nascimento: '',
        email: '',
        senha: ''
    })

    const valueInput = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const toast:any = useRef(null);

    const show = () => {
        toast.current.show({ 
            severity: 'success', 
            summary: 'Cadastro realizado com sucesso!', 
            detail: 'Realize o login para acessar a sua carteira.' 
        });
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        show()
        await api
            .post('/user', data)
            .then((res) => {
                console.log("Cadastro realizado.");
                show();
                setData({
                    nome: '',
                    telefone: '',
                    nascimento: '',
                    email: '',
                    senha: ''
                });
            }).catch((err) => {
                console.error("Ocorreu um erro: " + err);
            });
    }

    return (
        <div className="registerform">
            <Image
                src={logo}
                alt="porta niquel logotipo"
                width="280px"
            />
            <p className="text-sm">Faça o seu cadastro agora!</p>

            <form onSubmit={onSubmit}>

                <div className="grid">
                    <div className="col">
                        <Divider align="center">
                            <span><small>Dados Pessoais</small></span>
                        </Divider>

                        <InputText
                            name='nome'
                            placeholder='Nome'
                            onChange={valueInput}
                        />
                        <br /><br />

                        <InputText
                            name='telefone'
                            placeholder='Telefone'
                            onChange={valueInput}
                        />
                        <br /><br />

                        <InputText
                            name='nascimento'
                            type="date"
                            placeholder='Data de Nascimento'
                            onChange={valueInput}

                        />
                        <br /><br />

                    </div>

                    <div className="col">
                        <Divider align="center">
                            <span><small>Dados de Conta</small></span>
                        </Divider>

                        <InputText
                            type='email'
                            name='email'
                            placeholder='E-mail'
                            onChange={valueInput}
                        />
                        <br /><br />

                        <Password
                            name='senha'
                            placeholder='Senha'
                            onChange={valueInput}
                            feedback={false}
                            toggleMask
                        /><br /><br />

                    </div>
                </div>
                <div className="submit-block">
                    <Button label="Cadastrar" type='submit' icon="pi pi-check" />

                    <p className="text-sm">Já possui cadastro? <a href="/">Entre</a> agora!</p>
                </div>
            </form>
            <Toast ref={toast} />
        </div>
    )
}