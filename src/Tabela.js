function Tabela({vetor, selecionar}){

    return(
        <div className="table-barra-rolagem">
        <table className='table table-striped table-bordered table-condensed table-hover'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Local</th>
                    <th>Descrição do problema</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th>Ação</th>
                </tr>
            </thead>

            <tbody>
                
                {
                    vetor.map((obj, indice) => (
                        <tr key={indice}>
                            {/* <td>{indice+1}</td> */}
                            <td>{obj.codigo}</td>
                            <td>{obj.local}</td>
                            <td>{obj.descric_problem}</td>
                            <td>{obj.status}</td>
                            <td>{obj.data}</td>
                            <td><button onClick={() => {selecionar(indice)}} className="btn btn-success">Selecionar</button></td>
                        </tr>
                    )).reverse()
                }
            </tbody>
        </table>
        </div>
    )
}

export default Tabela;