import { useState } from "react";
import gato from "../assets/gato_sem-fundo 1.png";
import wpp from "../assets/wpp.png";


function Nome(props) {
  return <span className="Function">{props.tes}</span>; // Use span para não quebrar a linha do <p>
}

function Modal() {
  const [imagem, setimagem] = useState(null);
  const [Text, setText] = useState("visitante");

 

  return (
    <> 
      <style>
        {`
        body { background-color: #E5B300; font-family: 'Poppins', sans-serif; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vw; }
    .Modal_Completo { display: flex; justify-content: center; align-items: center; width: 50vw; border-radius: 10px; height: 32vw; }
    .Modal { display: flex; border-radius: 0px 10px 10px 0px; width: 60vw; background-color: #27607B; overflow: hidden; height: 32vw; }
    .Imagem { background-color: white; width: 30vw; height: 100%; display: flex; align-items: flex-start; justify-content: center; flex-direction: column; margin: 0; padding: 0px 20px 0px 20px; border-radius: 10px 0px 0px 10px; }
    .Img { border: 1.5px solid #27607BD9; padding: 10; border-radius: 10px; height: 19vw; object-fit: contain; }
    .text { font-family: 'Poppins', sans-serif; color: #FF7A00; }
    h4 { font-size: 1vw; color: #E5B300; margin: 0; }
    h2 { font-size: 2vw; margin: 0; padding: 10px 0px 5px 0px; }
    
    .nomes p { margin-left: 10px; }
    .info { display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 10px; width: 24vw; height: 100%; flex: 1; }
    .nomes { display: flex; justify-content: center; flex-direction: column; background-color: #ffffff; width: 25vw; height: 50vh; margin-top: 20px; border-radius: 10px; font-size: 1vw; margin: 20px; }
    .nomes p { margin-left: 30px}
    .wp { display: flex; align-items: center; gap: 5px; color: #27607B; margin-left: 64%; background: #FF7A00; border: none; width: 6vw; height: 5vh; border-radius: 20px; box-shadow: 0px 3px 0px 1px rgba(0, 0, 0, 0.658); margin-bottom: 10px; font-size: 1vw; }
    .wpp { width: 1vw; height: 50%; }
    button:hover { background: white; transition: 0.5s; cursor: pointer; }
    .Function { color: #FF7A00; margin-left: 10px; }

    @media screen and (max-width: 700px) {
        .Modal_Completo { background-color: blue; margin-top: 20%; display: flex; flex-direction: column; height: 50vh; width: 60vw; }
        .Modal { height: 70vh; width: 70vw; border-radius: 0px 0px 10px 10px; }
        .nomes { width: 50vw; font-size: 2.4vw; }
        button { display: flex; align-self: center; justify-content: center; width: 13vw; }
        .wp { font-size: 2vw; width: 13vw; }
        .wpp { height: 1.2vh; width: 2vw; }
        .Img { width: 30vw; height: 15vh; margin-right: 10px; }
        .Imagem { width: 70vw; display: flex; flex-direction: row; justify-content: flex-end; align-items: center; border-radius: 10px 10px 0px 0px; }
        h4 { width: 20vw; font-size: 10px; }
        h2 { width: 20vw; font-size: 18px; }
    }
        
        `}
      </style>

      <div> 
        <div className="Modal_Completo">
          <div className="Imagem">
            <img className="Img" src={imagem || gato} alt="" />
            <div className="text">
              <h2>Fifi</h2>
              <h4>Cuiabá - MT</h4>
            </div>
          </div>
        
          <div className="Modal">
            <div className="info">
              <div className="nomes">
                <p>Ong: <Nome tes={"Pet Lindo"}/> </p>
                <p>especie: <Nome tes={"Gato abissíno"}/></p>
                <p>Raça: <Nome tes={"Femea"}/></p>
                <p>Sexo: <Nome tes={"Femea"}/></p>
                <p>Porte: <Nome tes={"Pequeno"}/></p>
                <p>Nascimento: <Nome tes={"14/03/2025"}/></p>
                <p>Status: <Nome tes={"Para adoção"}/></p>
                <p>Descrição: <Nome tes={"Gatinha muito dócil e ama um carinho."}/></p>
              </div>
              <button className="wp">Adotar <img className="wpp" src={wpp} alt="" /></button>
            </div>
          </div>
        </div>
      </div>
    </> 
  );
}

export default Modal;

