import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import { api } from '../../services/api';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import { Container, TransactionTypeContainer, Button } from './styles';

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransationModal({ isOpen, onRequestClose }: INewTransactionModalProps) {
  const [type, setType] = useState('income');
  
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');

  function handleCreateNewTransaction(event: FormEvent) {
      event.preventDefault();

      const data = {
        title,
        value,
        category,
        type
      }

      api.post('/transactions', data);
  }

  return (
      <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"          
      >
        <button 
          onClick={onRequestClose} 
          className="react-modal-close">
          <img 
            src={closeImg} 
            alt="Fechar"/>
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Cadastrar transação</h2>

          <input 
            placeholder="Título" 
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <input 
            type="number" 
            placeholder="Valor" 
            value={value}
            onChange={event => setValue(Number(event.target.value))}
          />

          <TransactionTypeContainer>
            <Button
              type="button"  
              onClick={() => { setType('income'); }}
              isActive={type === 'income'}
              activeColor="green"
            >
              <img src={incomeImg} alt="Entrada"/>
              <span>Entrada</span>
            </Button>

            <Button
              type="button"  
              onClick={() => { setType('outcome'); }}
              isActive={type === 'outcome'}
              activeColor="red"
            >
              <img src={outcomeImg} alt="Saída"/>
              <span>Saída</span>
            </Button>
          </TransactionTypeContainer>

          <input 
            placeholder="Categoria" 
            value={category}
            onChange={event => setCategory(event.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
  )
}