import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  // Objeto suporte
  const suporteObj = {
    codigo : 0,
    local : '',
    descric_problem : '',
    status : 'Solicitado'
  }

  // UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [suporte, setSuporte] = useState([]);
  const [objSuporte, setObjSuporte] = useState(suporteObj);

  // UseEffect
  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setSuporte(retorno_convertido));
  }, []);

  // Obtendo os dados do formulario
  const aoDigitar = (e) => {
    // console.log(e.target);
    setObjSuporte({...objSuporte, [e.target.name]:e.target.value});
  }


  //Cadastrar a solicitação de suporte
  const cadastrar = () => {
    fetch("http://localhost:8080/cadastrar", {
      method:'post',
      body:JSON.stringify(objSuporte),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      // console.log(retorno_convertido);
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        setSuporte([...suporte, retorno_convertido]);

        // Mensagem
        alert('Solicitação cadastrada com sucesso!');

        // Limpar o formulario
        limparFormulario();
      }
    })
  }


  //Alterar a solicitação de suporte
  const alterar = () => {
    fetch("http://localhost:8080/alterar", {
      method:'put',
      body:JSON.stringify(objSuporte),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {

      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        // Mensagem
        alert('Solicitação alterada com sucesso!');

        // Cópia do vetor de solicitações
        let vetorTemp = [...suporte];

        // Indice
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objSuporte.codigo;
        });

        // Alterar solicitação do vetorTemp
        vetorTemp[indice] = objSuporte;

        // Atualizar o vetor de solicitações
        setSuporte(vetorTemp);


        // Limpar o formulário
        limparFormulario();
      }
    })
  }


  //Remover a solicitação de suporte
  const remover = () => {
    fetch("http://localhost:8080/remover/"+objSuporte.codigo, {
      method:'delete',      
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {

      // Mensagem
      alert(retorno_convertido.mensagem);

      // Cópia do vetor de solicitações
      let vetorTemp = [...suporte];

      // Indice
      let indice = vetorTemp.findIndex((p) => {
        return p.codigo === objSuporte.codigo;
      });

      // Remover solicitação do vetorTemp
      vetorTemp.splice(indice, 1);

      // Atualizar o vetor de solicitações
      setSuporte(vetorTemp);

      // Limpar o formulário
      limparFormulario();

      // alert('Solicitação excluida com sucesso!');
        
    })
  }


  // Limpar formulário
  const limparFormulario = () => {
    setObjSuporte(suporteObj);
    setBtnCadastrar(true);
  }

  // Selecionar a solicitação
  const selecionarSuporte = (indice) => {
    setObjSuporte(suporte[indice]);
    setBtnCadastrar(false);
  }


  // Retorno
  return (
    <div>
      {/* Nessa linha abaixo ele mostra os dados do banco em JSON */}
      {/* <p>{JSON.stringify(suporte)}</p> */}
      {/* <p>{JSON.stringify(objSuporte)}</p> */}
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objSuporte} cancelar={limparFormulario} remover={remover} alterar={alterar} />
      <Tabela vetor={suporte} selecionar={selecionarSuporte} />
    </div>
  );
}

export default App;
