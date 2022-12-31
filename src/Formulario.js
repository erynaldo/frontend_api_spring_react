// import React, { useState } from "react";

function Formulario({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}){

    // const[status] = useState()

    return(
        <form>
            <h2>Cadastrar uma solicitação</h2><br />
            
            {
                botao
                ?
                <div>
                    <label>Local</label>
                    <input type='text' value={obj.local} onChange={eventoTeclado} name='local' placeholder='' className='form-control' />
                    <label>Descrição do problema</label>
                    <input type='text' value={obj.descric_problem} onChange={eventoTeclado} name='descric_problem' placeholder='' className='form-control' />
                </div>
                :
                <div>
                    <label>Local</label>
                    <input type='text' value={obj.local} onChange={eventoTeclado} name='local' placeholder='Local' className='form-control' />
                    <label>Descrição do problema</label>
                    <input type='text' value={obj.descric_problem} onChange={eventoTeclado} name='descric_problem' placeholder='Descrição do problema' className='form-control' />
                    <label for='status'>Status</label>
                    {/* <input type='text' value={obj.status} onChange={eventoTeclado} name='status' className='form-control' /> */}
                    <select name='status' value={obj.status} onChange={eventoTeclado} onSelectCapture={eventoTeclado} className='btn-select ls-custom'>
                        {/* <option value='' selected>{obj.status}</option> */}
                        <option value=''>...</option>
                        <option value='Solicitado' onSelect>Solicitado</option>
                        <option value='Resolvido' onSelect>Resolvido</option>
                        <option value='Sendo analisado'>Sendo analisado</option>
                        <option value='Retornar'>Retornar</option>
                    </select>
                </div>
            }

            
            {
                botao
                ?
                <div className="botao">
                    <input type='button' value='Cadastrar' onClick={cadastrar} className='btn btn-primary' />
                </div>               
                :
                <div className="botao">
                    <input type='button' value='Alterar' onClick={alterar} className='btn btn-warning' />
                    <input type='button' value='Remover' onClick={remover} className='btn btn-danger' />
                    <input type='button' value='Cancelar' onClick={cancelar} className='btn btn-secondary' />
                </div>
            }
        </form>
    )
}

export default Formulario;