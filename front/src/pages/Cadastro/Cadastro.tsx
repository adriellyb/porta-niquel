import RegisterForm from "../../components/RegisterForm";

import { Card } from "primereact/card";

import "./Cadastro.css"

function Cadastro() {
    return (
        <div className="cadastro">
            <Card>
                <RegisterForm />
            </Card>
        </div>
    )
}

export default Cadastro;