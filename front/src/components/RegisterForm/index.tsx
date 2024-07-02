import { useRef, useState } from "react";
import api from "../../services/api";

import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Image } from "primereact/image";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import { InputMask } from "primereact/inputmask";

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

    const show = (severity:any, summary:any, detail:any) => {
        toast.current.show({ 
            severity: severity, 
            summary: summary, 
            detail: detail 
        });
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();

        const separar = (data.nascimento).split('/');
        const juntar = separar[1]+'-'+separar[0]+'-'+separar[2];
        data.nascimento = juntar;
        
        await api
            .post('/user', data)
            .then((res) => {
                console.log("Cadastro realizado.");
                show(
                    'success',
                    'Cadastro realizado com sucesso!',
                    'Realize o login para acessar a sua carteira.'
                );
                setData({
                    nome: '',
                    telefone: '',
                    nascimento: '',
                    email: '',
                    senha: ''
                });
            }).catch((err) => {
                console.error("Ocorreu um erro: " + err);
                show(
                    'error',
                    'Erro ao realizar o cadastro!',
                    'Tente novamente'
                );
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
                    <div className="col-12 xl:col-6">
                        <Divider align="center">
                            <span><small>Dados Pessoais</small></span>
                        </Divider>

                        <InputText
                            name='nome'
                            placeholder='Nome'
                            className="w-full"
                            onChange={valueInput}
                            required={true}
                        />
                        <br /><br />

                        <InputMask
                            name='telefone'
                            placeholder='Celular'
                            mask="(99) 99999-9999"
                            className="w-full"
                            onChange={valueInput}
                            required={true}
                        />
                        <br /><br />

                        <InputMask
                            name='nascimento'
                            placeholder='Data de Nascimento'
                            mask="99/99/9999"
                            slotChar="dd/mm/aaaa"
                            className="w-full"
                            onChange={valueInput}
                            required={true}

                        />
                        <br /><br />

                    </div>

                    <div className="col-12 xl:col-6">
                        <Divider align="center">
                            <span><small>Dados de Conta</small></span>
                        </Divider>

                        <InputText
                            type='email'
                            name='email'
                            placeholder='E-mail'
                            className="w-full"
                            onChange={valueInput}
                            required={true}
                        />
                        <br /><br />

                        <Password
                            name='senha'
                            placeholder='Senha'
                            className="w-full"
                            onChange={valueInput}
                            required={true}
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