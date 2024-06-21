import { useState } from "react";
import api from "../../services/api";

export default function LoginForm() {

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

    const enterLogin = async (e: any) => {
        e.preventDefault();
        const headers = {
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };

        await api
        .post('/login', data, headers)
            .then((res) => {
                console.log(res);
                
                setData({
                    email: '',
                    senha: ''
                });
            }).catch((err) => {
                console.error("Ocorreu um erro: " + err);
                
            });
    }

    return (
        <>
            <h2>Acesse sua carteira digital</h2>

            <form onSubmit={enterLogin}>

                <label>E-mail: </label>
                <input type='email' name='email' placeholder='Digite o e-mail' onChange={valueInput} /><br /><br />

                <label>Senha: </label>
                <input type='password' name='senha' placeholder='Digite o nome' onChange={valueInput} /><br /><br />


                <button type='submit'>Enviar</button><br /><br />

            </form>
        </>
    )
}