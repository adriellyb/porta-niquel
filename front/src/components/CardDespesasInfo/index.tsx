import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import { Card } from "primereact/card";
import { DataScroller } from "primereact/datascroller";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";

import "./style.css";

export default function CardDespesasInfo(data: any) {

    const despesas = data.data;
    const op = useRef<any>(null);
    const navigate = useNavigate();
    const [id, setId] = useState<number>(0)

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

        if (idx === -1) valorFormatado = strValor + ",00"
        else {
            valorFormatado = strValor.replace(".", ",")
            if (!strValor[idx + 2]) valorFormatado = valorFormatado + "0"
        }
        return valorFormatado
    }

    const deletarDespesa = () => {
        api.
            put(`/despesa/deletar/${id}`)
            .then((res) => {
                console.log("Despesa deletada.");
                navigate(0);
            }).catch((err) => {
                console.error("Ocorreu um erro: " + err);
            });
    }

    const itemTemplate = (item: any) => {
        return (
            <>
                <div
                    className="flex flex-wrap justify-content-between align-items-start w-full py-3 cursor-pointer"
                    onClick={(e) => { op.current.toggle(e); setId(item.id); }}
                >
                    <div className="flex-1 flex flex-column xl:mr-8">
                        <span className="font-bold text-sm pb-2">{item.destino}</span>
                        <div className="flex align-items-center gap-2 pb-2">
                            <i className="pi pi-tag text-sm"></i>
                            <span className="text-sm">{item.metodo_pag}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-end">
                        <span className="font-bold text-900">R$ {formatarValor(item.valor)}</span>
                        <span className="text-sm pt-2">{dataHora(item.data_pag).dataHoje}</span>
                    </div>
                    <OverlayPanel ref={op}>
                        <Button
                            icon="pi pi-trash"
                            severity="danger"
                            size="small"
                            className="p-2 mx-1"
                            onClick={() => deletarDespesa()}
                        />
                    </OverlayPanel>
                </div>
            </>
        );
    };

    return (
        <>
            <Card subTitle="Minhas despesas">
                <div>
                    <DataScroller
                        value={despesas}
                        itemTemplate={itemTemplate}
                        rows={5}
                        inline
                        scrollHeight="200px"
                        className="pl-0"
                    />
                </div>
            </Card>
        </>
    )
}