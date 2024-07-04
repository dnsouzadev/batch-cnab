import axios from "axios"
import { useEffect, useState } from "react"

function App() {
  const [ transactions, setTransactions ] = useState([])
  const [ file, setFile ] = useState(null)

  const fetchTransactions = async () => {
    const response = await axios.get("http://localhost:8080/transacoes")
    setTransactions(response.data)
    console.log(response.data)
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const uploadFile = async () => {
    const formData = new FormData()
    formData.append("file", file)
    axios.post("http://localhost:8080/cnab/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(() => {
      fetchTransactions()
    })
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <div>
      <div>
        <h1>Importacao de CNAB</h1>
      </div>
      <div>
        <span>Choose FIle</span>
        <input type="file"
        accept=".txt"
        onChange={handleFileChange}
        />
        <button
        onClick={uploadFile}
        >Upload File</button>
      </div>

      <div>
        <h2>Transactions</h2>
        <ul>
          { transactions.map((report, key) => (
            <li key={key}>
              <table>
                <thead>
                  <tr>
                    <th>Cartao</th>
                    <th>CPF</th>
                    <th>Data</th>
                    <th>Dono da Loja</th>
                    <th>Hora</th>
                    <th>Nome da Loja</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  { report.transacoes.map((transaction, key) => (
                    <tr key={key}>
                      <td>{transaction.cartao}</td>
                      <td>{transaction.cpf}</td>
                      <td>{transaction.data}</td>
                      <td>{transaction.donoDaLoja}</td>
                      <td>{transaction.hora}</td>
                      <td>{transaction.nomeDaLoja}</td>
                      <td>{transaction.tipo}</td>
                      <td>{transaction.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default App
