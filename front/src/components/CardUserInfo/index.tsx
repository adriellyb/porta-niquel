export default function CardUserInfo(data: any) {
    
    const user  = data.data;    
    
    return (
        <>
        <p>{ user.nome }</p>
        </>
    )
}