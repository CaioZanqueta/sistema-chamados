import { useState, useContext } from 'react';
import Header from '../../components/Header'
import Title from '../../components/Title'

import { FiUser } from 'react-icons/fi';

import { db } from '../../services/firebaseConnection';
import { addDoc, collection } from 'firebase/firestore';

import { toast } from 'react-toastify';

export default function Customers() {
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [endereco, setEndereco] = useState('')
  const [register, setRegister] = useState(false)

  async function handleRegister(e) {
    e.preventDefault()

    if (nome !== '' && cnpj !== '' && endereco !== '') {
      setRegister(true)
      await addDoc(collection(db, "customers"), {
        cliente: nome,
        cnpj: cnpj,
        endereco: endereco
      })
      .then(() => {
        setNome('')
        setCnpj('')
        setEndereco('')
        setRegister(false)
        toast.success("Cliente registrado", { theme: 'dark' })
      })
      .catch((error) => {
        console.log(error)
        setRegister(false)
        toast.error("Erro ao cadastrar o cliente", { theme: 'dark' })
      })
    } else {
      toast.error("Preencha todos os campos", { theme: 'dark' })
    }
  }

 return (
   <div>
    <Header />
    <div className="content">
      <Title name="Clientes">
        <FiUser size={25} />
      </Title>
      <div className="container">
        <form className="form-profile" onSubmit={handleRegister}>
          <label>Cliente</label>
          <input type="text" placeholder='Nome da Empresa' value={nome} onChange={(e) => setNome(e.target.value)} />

          <label>CNPJ</label>
          <input type="text" placeholder='Digite o CNPJ' value={cnpj} onChange={(e) => setCnpj(e.target.value)} />

          <label>Endereço</label>
          <input type="text" placeholder='Digite o endereço' value={endereco} onChange={(e) => setEndereco(e.target.value)} />

          <button type="submit" disabled={register === true} style={{opacity: register === true ? 0.3 : 1, cursor: 'not-allowed'}}>
            Salvar
          </button>
        </form>
      </div>
    </div>
   </div>
 );
}