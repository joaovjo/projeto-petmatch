import ups from "../assets/Upload.svg"
import pata from "../assets/patinha_findo_amarelo 1.png"

function Cadastro() {
    return (
        <>
            <style>
                {`
                body { background-color: #E5B300; margin: 0; font-family: 'Poppins', sans-serif; }
                .cad { display: flex; width: 90vw; margin: auto; justify-content: space-around; align-items: center; min-height: 80vh; }
                .Upload { display: flex; flex-direction: column; align-items: center; width: 40vw; }
                .formulario { background: white; padding: 30px; border-radius: 30px; display: flex; flex-direction: column; width: 45vw; align-items: center; }
                .Carregar-img { background: white; width: 25vw; height: 25vw; display: flex; justify-content: center; align-items: center; border-radius: 20px; box-shadow: 5px 5px 15px rgba(0,0,0,0.1); cursor: pointer; }
                .NomePet,  .Nasc, #Desc { border: 2px solid #27607B; border-radius: 15px; padding: 10px; margin: 5px; width: 90%; }
                .Raca, .Especie {border: 2px solid #27607B; border-radius: 15px; padding: 10px; margin: 5px; width: 28vw; }
                .select, .select2 { display: flex; width: 95%; gap: 10px; }
                #Sexo, #Porte { border: 2px solid #27607B; border-radius: 15px; width: 10vw; margin: 5px }
                .enviar { background: #27607B; color: #E5B300; border: none; padding: 10px 25px; border-radius: 20px; align-self: flex-end; margin-right: 5%; cursor: pointer; font-weight: bold; margin-top: 10px; }
                h1 { color: white; display: flex; align-items: center; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
                h1 img { width: 40px; margin-right: 10px; }
                h5 { color: white; margin-bottom: 20px; }
                .Up {display: flex; justify-content: center; align-items: center; background: white; border-radius: 10px; width: 25vw; height: 4vh; margin-top: 30px; margin-bottom: 10px; color: #27607B; border: none; box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.507);
    
    
                
                @media (max-width: 700px) {
                    .cad { flex-direction: column; margin-top: 50px; }
                    .formulario, .Upload { width: 95vw; }
                    .Carregar-img { width: 60vw; height: 60vw; }
                }
                `}
            </style>

            <div className="cad">
                <div className="Upload">
                    <h1 ><img src={pata} alt="pata" /> Pet Match</h1>
                    <h5>Cadastro do Pet</h5>
                    <label className="Carregar-img">
                        <img src={ups} alt="upload" style={{ width: '60px' }} />
                    </label>
                    <button className="Up" >
                        Upload Imagem <img src={ups} alt="" style={{ width: '20px', marginLeft: '11px' }} />
                    </button>
                </div>

                <form className="formulario">
                    <input type="text" placeholder="Nome:" name="nome" className="NomePet" />
                    <div className="select">
                        <input type="text" placeholder="Raça:" name="raca" className="Raca" />
                        <select name="Sexo" id="Sexo">
                            <option value="">Sexo</option>
                            <option value="Macho">Macho</option>
                            <option value="Femea">Fêmea</option>
                        </select>
                    </div>
                    <div className="select2">
                        <input type="text" placeholder="Espécie:" name="especie" className="Especie" />
                        <select name="Porte" id="Porte">
                            <option value="">Porte</option>
                            <option value="G">Grande</option>
                            <option value="M">Médio</option>
                            <option value="P">Pequeno</option>
                        </select>
                    </div>
                    <input type="text" placeholder="Nascimento:" name="nascimento" className="Nasc" />
                    <textarea name="Descrição" id="Desc" placeholder="Descrição" rows="4"></textarea>
                    <button type="submit" className="enviar">Cadastrar</button>
                </form>
            </div>
        </>
    );
}

export default Cadastro;