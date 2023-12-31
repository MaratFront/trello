interface IHome {
    id:number
    title: string;
    custom: {
        background: string;
    };
}
function Home({title,custom}:IHome){
    return(
        <div className="Home__item" style={{background:custom.background}}>
            <p className="Home__title">{title}</p>
            
        </div>
    )
}
export default Home;