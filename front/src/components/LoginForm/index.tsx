import { useState } from "react";
import api from "../../services/api";

import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useNavigate } from "react-router-dom";
import { Image } from "primereact/image";

import logo from '../../assets/logo.png'
import "./style.css";

export default function LoginForm() {

    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        senha: ''
    })

    const valueInput = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const headers = {
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };
        await api
            .post('/login', data, headers)
            .then((res) => {
                const { token } = res.data
                localStorage.setItem('token', token);
                console.log("Login realizado.");

                setData({
                    email: '',
                    senha: ''
                });
                navigate('/dashboard');
            }).catch((err) => {
                console.error("Ocorreu um erro: " + err);
            });
    }

    return (
        <div className="loginform">
            <Image
                src={logo}
                alt="porta niquel logotipo"
                width="280px"
            />
            <p className="text-sm">Gerencie suas finanças de forma prática e segura!</p>

            <form onSubmit={onSubmit}>

                <InputText
                    type='email'
                    name='email'
                    placeholder='E-mail'
                    className="input-email"
                    required={true}
                    onChange={valueInput}
                />
                <br /><br />

                <Password
                    name='senha'
                    placeholder='Senha'
                    feedback={false}
                    toggleMask
                    required={true}
                    onChange={valueInput}
                />
                <br /><br />

                <Button label="Entrar" type='submit' icon="pi pi-check" />

                <p className="text-sm">Não possui cadastro? <a href="/cadastro">Cadastre-se</a> agora!</p>
            </form>
        </div>
    )
}