import { Card } from "primereact/card";
import { DataScroller } from "primereact/datascroller";

import "./style.css";
import { Button } from "primereact/button";
import { useState } from "react";

export default function CardDespesasInfo(data: any) {

    const despesas = data.data;

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

    const itemTemplate = (item: any) => {
        return (
            <div 
            className="flex flex-wrap justify-content-between align-items-start w-full py-3">
                <div className="flex-1 flex flex-column xl:mr-8">
                    <span className="font-bold text-sm pb-2">{item.destino}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span className="text-sm">{item.metodo_pag}</span>
                    </div>
                </div>
                <div className="flex flex-column align-items-end">
                    <span className="font-bold text-900">R$ {item.valor}</span>
                    <span className="text-sm pt-2">{dataHora(item.createdAt).dataHoje}</span>
                </div>
            </div>
        );
    };


    return (
        <>
            <Card subTitle="Minhas despesas">
                <div className="card xl:flex xl:justify-content-center">
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