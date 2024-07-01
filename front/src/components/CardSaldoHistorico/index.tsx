import { Card } from "primereact/card";
import { DataScroller } from "primereact/datascroller";

export default function CardSaldoHistorico(data: any) {

    const saldos = data.data;

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

    const itemTemplate = (item: any) => {
        return (
            <div className="flex flex-wrap justify-content-between align-items-center w-full py-3">
                    <span 
                        className="font-bold"
                        style={{color: item.aumentou ? "#22c55e" : "#ef4444"}}
                    >
                        R$ {formatarValor(item.saldo_atual)}
                    </span>
                    <span className="text-sm">{dataHora(item.updatedAt).dataHoje}</span>
            </div>
        );
    };

    return (
        <>
            <Card subTitle="Histórico de saldos">
                <div className="">
                    <DataScroller
                        value={saldos}
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