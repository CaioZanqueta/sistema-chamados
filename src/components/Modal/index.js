import './modal.css'
import { FiX } from 'react-icons/fi';

export default function Modal({ conteudo, close }) {
 return (
   <div className='modal'>
    <div className="container">
      <button className="close" onClick={close}>
        <FiX size={25} color='#FFF' />
        Fechar
      </button>
      <main>
        <h2>Detalhes do chamado</h2>
        <div className="row">
          <span>
            Cliente: <i>{conteudo.clientes}</i>
          </span>
        </div>
        <div className="row">
          <span>
            Assunto: <i>{conteudo.assunto}</i>
          </span>
          <span>
            Cadastrado em: <i>{conteudo.createdFormat}</i>
          </span>
        </div>
        <div className="row">
          <span>
            Status: <i className='status-badge' style={{ color: '#FFF', borderRadius: '5px', backgroundColor: conteudo.status === 'Aberto' ? '#5cb85c' : conteudo.status === 'Progresso' ? '#FFFF00' : conteudo.status === 'Atendido' ? '#d9534f': '#999' }}>{conteudo.status}</i>
          </span>
        </div>
        {
          conteudo.complemento !== '' && (
            <>
              <h3>Complemento</h3>
              <p>
                {conteudo.complemento}
              </p>
            </>
          )
        }
      </main>
    </div>
   </div>
 );
}