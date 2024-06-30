import api from "../../services/api";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";

export default function CardSaldoInfo(data: any) {

    const saldo = data.data[0];    

    const user_id = localStorage.getItem("id");
    const [saldoData, setSaldoData] = useState({
        user_id: user_id,
        valor: '',
    });
    const [showForm, setForm] = useState<any>(true);

    const dataHora = (entrada: any) => {
        const data = new Date(entrada);
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

    const formatarValor = (entrada: string) => {

        const strValor = (entrada).toString();
        const idx = strValor.indexOf(".");
        let valorFormatado = "";

        if (idx === -1) valorFormatado = strValor+",00"
        else {
            valorFormatado = strValor.replace(".", ",")
            if (!strValor[idx+2]) valorFormatado = valorFormatado + "0"
        }        
        return valorFormatado
    }

    const valueInput = (e: any) => {
        setSaldoData({
            ...saldoData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        api.
            post('/saldo', saldoData)
            .then((res) => {
                console.log("Novo saldo adicionado.");

                setSaldoData({
                    user_id: user_id,
                    valor: '',
                });
            }).catch((err) => {
                console.error("Ocorreu um erro: " + err);
            });
    }

    const form = () => {
        return (
            <form onSubmit={onSubmit}>
                <InputNumber
                    name="valor"
                    placeholder="Digite o valor do saldo"
                    inputId="currency-br"
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR"
                    className="w-full"
                    onValueChange={valueInput}
                />
                <br /><br />
                <Button label="Adicionar" type='submit' icon="pi pi-plus" size="small" />
            </form>
        )
    };

    return (
        <>
            <Card subTitle="Meu saldo">
                {saldo ?
                    <>
                        <h1>R$ {formatarValor(saldo.saldo_atual)}</h1>
                        <p className="text-sm" >
                            Ultima atualização: {dataHora(saldo.updatedAt).dataHoje} às {dataHora(saldo.updatedAt).horaAgora}
                        </p>
                        <p className="text-sm" >
                            Saldo anterior: R$ {formatarValor(saldo.saldo_anterior)}
                        </p>
                        <br />
                        <Button
                            label="Novo saldo"
                            icon="pi pi-plus"
                            size="small"
                            outlined
                            onClick={() => setForm(!showForm)}
                        />

                        <div hidden={showForm}>
                            <br />
                            {form()}
                        </div>
                    </>
                    :
                    <>
                        <p>Sem saldo.</p>
                        <div hidden={false}>
                            <br />
                            {form()}
                        </div>
                    </>
                }
            </Card>
        </>
    )
}