import { Outlet } from "react-router-dom";

import { Card } from "primereact/card";
import { Image } from "primereact/image";

import img from '../../assets/megafone.png';

export default function ProtectedRoute() {

    const isAuthenticated = localStorage.getItem("token");

    return isAuthenticated ?
        <Outlet />
        :
        <div className="flex justify-content-center mt-8">
            <Card className="w-auto px-2 text-center">
                <Image
                    src={img}
                    alt="megafone"
                    width="200px"
                />
                <h1>Oops!</h1>
                <p>Você não tem permissão para entrar sem um login!</p>
                <p><a href="/">Volte para a recepção</a> e faça seu check-in!</p>
            </Card>
        </div>
}