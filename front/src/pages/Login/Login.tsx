import { Card } from "primereact/card";
import LoginForm from "../../components/LoginForm";
import { Image } from "primereact/image";
import loginImage from '../../assets/money.png'

function Login() {

    return (
        <div className="flex justify-content-center align-items-center">
            <Card className="flex justify-content-center flex-wrap w-max">
                <div className="grid">

                    <div className="col">
                        <LoginForm />
                    </div>

                    <div className="col text-center">
                        <Image 
                        src={loginImage}
                        alt="carteira"
                        width="400px"
                        />
                    </div>

                </div>
            </Card>
        </div>
    )
}

export default Login;