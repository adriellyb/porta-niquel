import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

import "./style.css";
import img from "../../assets/girl.png"

export default function CardUserInfo(data: any) {

    const user = data.data;

    const dataHora = () => {
        const data = new Date();
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

    return (
        <>
            <Card>
                <div className="flex flex-wrap">
                    <div className="date">
                        <h2>{dataHora().horaAgora}</h2>
                        <p>{dataHora().diaSemana + ", " + dataHora().dataHoje}</p>
                    </div>
                    <Divider layout="vertical" className="hidden md:block" />

                    <div className="info-box flex flex-wrap">
                        <Image
                            src={img}
                            alt="menina apontando para a direita"
                            width="120"
                        />
                        <div className="texto">
                            <p>Bem vindo(a), {user.nome}</p>
                            <p className="text-sm">Não esqueça de manter seu saldo e suas despesas atualizados.</p>
                            <div className="flex">
                                <Button
                                    label="Editar dados"
                                    icon="pi pi-user-edit"
                                    size="small"
                                />
                                <Button
                                    icon="pi pi-sign-out"
                                    size="small"
                                    severity="danger"
                                    className="mx-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}