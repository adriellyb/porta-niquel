import LoginForm from "../../components/LoginForm";

import { Card } from "primereact/card";
import { Image } from "primereact/image";

import loginImage from '../../assets/money.png'
import "./Login.css";

function Login() {
    return (
        <div className="login">
            <Card>
                <div className="left">
                    <LoginForm />
                </div>
                <div className="right">
                    <Image
                        src={loginImage}
                        alt="carteira"
                    />
                </div>
            </Card>
        </div>
    )
}

export default Login;