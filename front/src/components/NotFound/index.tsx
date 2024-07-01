import { Card } from "primereact/card";
import { Image } from "primereact/image";

import img from "../../assets/404.png";

export default function NotFound() {
    
    return (
        <div className="flex justify-content-center mt-8">
            <Card className="w-auto px-2 text-center">
                <Image
                    src={img}
                    alt="megafone"
                    width="300px"
                />
                <h1>Oops!</h1>
                <p>Parece que esta página se perdeu na internet!</p>
                <p>Vamos voltar para a <a href="/">página inicial</a> e tentar novamente!</p>
            </Card>
        </div>
    )
}