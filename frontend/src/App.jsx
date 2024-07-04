import axios from "axios"
import { useState } from "react"

function App() {
  const [ transactions, setTransactions ] = useState([])

  const fetchTransactions = async () => {
    const response = await axios.get("http://localhost:8080/transacoes")
    setTransactions(response.data)
  }

  return (
    <div>
      <div>
        <h1>Importacao de CNAB</h1>
      </div>
      <div>
        <span>Choose FIle</span>
        <input type="file"
        accept=".txt" />
        <button>Upload File</button>
      </div>

      <div>
        <h2>Transactions</h2>
        <ul>
          <li>
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
                <tr>
                  <td>1234</td>
                  <td>12345678901</td>
                  <td>2021-08-01</td>
                  <td>Dono da Loja</td>
                  <td>10:00:00</td>
                  <td>Nome da Loja</td>
                  <td>Debito</td>
                  <td>100.00</td>
                </tr>
              </tbody>
            </table>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default App
