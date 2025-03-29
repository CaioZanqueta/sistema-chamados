import { useEffect, useState, useContext } from 'react';
import Header from '../../components/Header'
import Title from '../../components/Title';
import { toast } from "react-toastify";
import { AuthContext } from '../../contexts/auth';
import { db } from '../../services/firebaseConnection';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

import './new.css'
import { FiPlusCircle } from 'react-icons/fi';

const listRef = collection(db, "customers")

export default function New() {
  const { user } = useContext(AuthContext)

  const [customers, setCustomers] = useState([])
  const [loadCustomer, setLoadCustomer] = useState(true)
  const [customerSelected, setCustomerSelected] = useState(0)
  const [complemento, setComplemento] = useState('')
  const [assunto, setAssunto] = useState('Suporte')
  const [status, setStatus] = useState('Aberto')

  useEffect(() => {
    async function loadCustomers() {
      const querySnapshot = await getDocs(listRef)
      .then((snapshot) => {
        let lista = []
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            cliente: doc.data().cliente
          })
        })

        if (snapshot.docs.size === 0) {
          setCustomers([{ id: '1', cliente: 'Freela' }])
          setLoadCustomer(false)
          return
        }

        setCustomers(lista)
        setLoadCustomer(false)
      })
      .catch((error) => {
        console.log(error)
        setLoadCustomer(false)
        setCustomers([{ id: '1', cliente: 'Freela' }])
      })
    }

    loadCustomers()
  }, [])

  function handleOptionChange(e) {
    setStatus(e.target.value)
  }

  function handleChangeSelect(e) {
    setAssunto(e.target.value)
  }

  function handleChangeCustomer(e) {
    setCustomerSelected(e.target.value)
  }

 return (
   <div>
    <Header />
    <div className="content">
      <Title name="Novo chamado">
        <FiPlusCircle size={25} />
      </Title>
      <div className="container">
        <form className="form-profile">

          <label>Clientes</label>
          {
            loadCustomer ? (
              <input type="text" disabled={true} value="Carregando..." />
            ) : (
              <select value={customerSelected} onChange={handleChangeCustomer}>
                {customers.map((item, index) => {
                  return (
                    <option key={index} value={index}>
                      {item.cliente}
                    </option>
                  )
                })}
              </select>
            )
          }

          <label>Assunto</label>
          <select value={assunto} onChange={handleChangeSelect}>
            <option value="Suporte">Suporte</option>
            <option value="Visita Tecnica">Visita Tecnica</option>
            <option value="Financeiro">Financeiro</option>
          </select>

          <label>Status</label>
          <div className="status">
            <input type="radio" name="radio" value="Aberto" onChange={handleOptionChange} checked={ status === 'Aberto' } />
            <span>Em aberto</span>
            <input type="radio" name="radio" value="Progresso" onChange={handleOptionChange} checked={ status === 'Progresso' } />
            <span>Progresso</span>
            <input type="radio" name="radio" value="Atendido" onChange={handleOptionChange} checked={ status === 'Atendido' } />
            <span>Atendido</span>
          </div>

          <label>Complemento</label>
          <textarea type="text" placeholder='Descreva o chamado' value={complemento} onChange={(e) => setComplemento(e.target.value)} />

          <button type="submit">Registrar</button>

        </form>
      </div>
    </div>
   </div>
 );
}