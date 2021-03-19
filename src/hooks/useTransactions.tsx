import { ReactNode, useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { api } from "../services/api";

interface ITransaction {
  id: number,
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface ITransactionProviderProps {
  children: ReactNode;
}

interface ITransactionInput {
  title: string;
  amount: number;
  type: string;
  category: string;
}

type TransactionInput = Omit<ITransaction, 'id' | 'createdAt'>

interface ITransactionContextData {
  transactions: ITransaction[];
  createTransaction: (transaction: ITransactionInput) => Promise<void>;
}

const TransactionContext = createContext<ITransactionContextData>({} as ITransactionContextData)

export function TransactionProvider({ children }: ITransactionProviderProps){
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput, 
      createdAt: new Date()
    });

    const { transaction } = response.data;

    setTransactions([
      ...transactions,
      transaction
    ])
  }

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionContext)

  return context
}