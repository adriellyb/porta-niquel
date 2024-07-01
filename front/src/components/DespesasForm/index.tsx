import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

export default function DespesasForm() {

    const user_id = localStorage.getItem("id");
    const navigate = useNavigate();
    const [selectedModoPag, setSelectedModoPag] = useState<any>([]);
    const [data, setData] = useState({
        user_id: user_id,
        valor: '',
        destino: '',
        metodo_pag: '',
        data_pag: ''
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

        const separar = (data.data_pag).split('/');
        const juntar = separar[1]+'-'+separar[0]+'-'+separar[2];
        data.data_pag = juntar;
        
        api.
            post('/despesa', data)
            .then((res) => {
                console.log("Despesa adicionada.", res.data);

                setData({
                    user_id: user_id,
                    valor: '',
                    destino: '',
                    metodo_pag: '',
                    data_pag: ''
                });
                navigate(0);
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
                        required={true}
                        onValueChange={valueInput}
                    />
                    <br /><br />

                    <InputText
                        name='destino'
                        placeholder='Tipo da Despesa'
                        className="w-full"
                        required={true}
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
                        required={true}
                        onChange={valueInput}
                    />
                    <br /><br />

                    <InputMask
                        name="data_pag"
                        placeholder="Data da Compra"
                        mask="99/99/9999"
                        slotChar="dd/mm/aaaa"
                        className="w-full"
                        required={true}
                        onChange={valueInput}
                    />
                    <br /><br />

                    <Button label="Adicionar" type='submit' icon="pi pi-plus" size="small" />
                </form>
            </Card>
        </>
    )
}