import { createContext, useContext, useEffect, useState } from "react";
import { mockMovimentacoes, mockProcessos, mockUsers, Movimentacao, Processo, User } from "@/lib/mockData";

type NewUser = Omit<User, "id">;
type NewProcesso = Omit<Processo, "id" | "advogadoNome" | "clienteNome" | "dataAbertura">;
type NewMovimentacao = Omit<Movimentacao, "id" | "data">;

interface DataContextType {
  usuarios: User[];
  processos: Processo[];
  movimentacoes: Movimentacao[];
  createUsuario: (usuario: NewUser) => void;
  deleteUsuario: (id: string) => void;
  createProcesso: (processo: NewProcesso) => void;
  deleteProcesso: (id: string) => void;
  createMovimentacao: (movimentacao: NewMovimentacao) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const readStoredData = <T,>(key: string, fallback: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) return fallback;

  try {
    return JSON.parse(stored) as T;
  } catch {
    return fallback;
  }
};

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [usuarios, setUsuarios] = useState<User[]>(() => readStoredData("meu-processo-usuarios", mockUsers));
  const [processos, setProcessos] = useState<Processo[]>(() => readStoredData("meu-processo-processos", mockProcessos));
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>(() => readStoredData("meu-processo-movimentacoes", mockMovimentacoes));

  useEffect(() => {
    localStorage.setItem("meu-processo-usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem("meu-processo-processos", JSON.stringify(processos));
  }, [processos]);

  useEffect(() => {
    localStorage.setItem("meu-processo-movimentacoes", JSON.stringify(movimentacoes));
  }, [movimentacoes]);

  const createUsuario = (usuario: NewUser) => {
    setUsuarios((current) => [
      ...current,
      {
        ...usuario,
        id: `u-${Date.now()}`,
      },
    ]);
  };

  const deleteUsuario = (id: string) => {
    if (id === "0") return;
    setUsuarios((current) => current.filter((usuario) => usuario.id !== id));
  };

  const createProcesso = (processo: NewProcesso) => {
    const advogado = usuarios.find((usuario) => usuario.id === processo.advogadoId);
    const cliente = usuarios.find((usuario) => usuario.id === processo.clienteId);

    setProcessos((current) => [
      ...current,
      {
        ...processo,
        id: `p-${Date.now()}`,
        advogadoNome: advogado?.nome || "Advogado não informado",
        clienteNome: cliente?.nome || "Cliente não informado",
        dataAbertura: new Date().toISOString(),
      },
    ]);
  };

  const deleteProcesso = (id: string) => {
    setProcessos((current) => current.filter((processo) => processo.id !== id));
    setMovimentacoes((current) => current.filter((movimentacao) => movimentacao.processoId !== id));
  };

  const createMovimentacao = (movimentacao: NewMovimentacao) => {
    setMovimentacoes((current) => [
      ...current,
      {
        ...movimentacao,
        id: `m-${Date.now()}`,
        data: new Date().toISOString(),
      },
    ]);
  };

  return (
    <DataContext.Provider value={{ usuarios, processos, movimentacoes, createUsuario, deleteUsuario, createProcesso, deleteProcesso, createMovimentacao }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
