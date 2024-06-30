import api from "../../services/api";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function DespesasForm() {

    const user_id = localStorage.getItem("id");
    const [selectedModoPag, setSelectedModoPag] = useState<any>([]);
    const [data, setData] = useState({
        user_id: user_id,
        valor: '',
        destino: '',
        metodo_pag: '',
    });
    const formasDePagamento = [
        { name: 'Dinheiro' },
        { name: 'PIX' },
        { name: 'Cartão de Crédito' },
        { name: 'Cartão de Débito' },
        { name: 'Boleto' },
        { name: 'Trasferência' },
        { name: 'Débito Automático' },
    ];

    const valueInput = (e: any) => {

        if (e.target.name === "metodo_pag") setSelectedModoPag(e.target.value)
        setData({
            ...data,
            [e.target.name]: e.target.name === "metodo_pag" ? e.target.value.name : e.target.value
        })
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();

        api.
            post('/despesa', data)
            .then((res) => {
                console.log("Despesa adicionada.", res.data);

                setData({
                    user_id: user_id,
                    valor: '',
                    destino: '',
                    metodo_pag: '',
                });
            }).catch((err) => {
                console.error("Ocorreu um erro: " + err);
            });
    }

    return (
        <>
            <Card subTitle="Adicionar nova despesa">
                <br />
                <form onSubmit={onSubmit}>
                    <InputNumber
                        name="valor"
                        placeholder="Valor da Despesa"
                        inputId="currency-br"
                        mode="currency"
                        currency="BRL"
                        locale="pt-BR"
                        className="w-full"
                        onValueChange={valueInput}
                    />
                    <br /><br />

                    <InputText
                        name='destino'
                        placeholder='Tipo da Despesa'
                        className="w-full"
                        onChange={valueInput}
                    />
                    <br /><br />

                    <Dropdown
                        name="metodo_pag"
                        optionLabel="name"
                        placeholder="Modo de Pagamento"
                        options={formasDePagamento}
                        checkmark={true}
                        highlightOnSelect={false}
                        value={selectedModoPag}
                        className="w-full"
                        onChange={valueInput}
                    />
                    <br /><br />

                    <Button label="Adicionar" type='submit' icon="pi pi-plus" size="small" />
                </form>
            </Card>
        </>
    )
}