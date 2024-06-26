import { Button } from "primereact/button";
import { Card } from "primereact/card";

export default function CardSaldoInfo(data: any) {

    const saldo = data.data;

    const dataHora = (entrada:any) => {
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
        let hora = data.getHours() <= 9 ? "0"+data.getHours() : data.getHours();
        let minutos = data.getMinutes() <= 9 ? "0"+data.getMinutes() : data.getMinutes();

        const dataAtualizada = {
            dataHoje: data.getDate() + "/" + mes + "/" + data.getFullYear(),
            horaAgora: hora + ":" + minutos,
            diaSemana: dias[data.getDay()]
        }

        return dataAtualizada;
    }

    const footer = (
        <Button label="Atualizar saldo" icon="pi pi-check" size="small" outlined />
    );

    return (
        <>
            <Card subTitle="Meu saldo" footer={footer}>
                {saldo ?
                    <>
                        <h1>R$ {saldo.saldo_atual}</h1>
                        <p className="text-sm" >
                            Ultima atualização: {dataHora(saldo.updatedAt).dataHoje} às {dataHora(saldo.updatedAt).horaAgora}
                        </p>
                        <p className="text-sm" >
                            Saldo anterior: R$ {saldo.saldo_anterior}
                        </p>
                    </>
                    : null}
            </Card>
        </>
    )
}