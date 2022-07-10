import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

export const PagamentoContext = createContext();
PagamentoContext.displayName = "Pagamento";

export const PagamentoProvider = ({ children }) => {
  const tiposPagamento = [
    {
      nome: "Boleto",
      juros: 1,
      id: 1,
    },
    {
      nome: "Cartão de Crédito",
      juros: 1.3,
      id: 2,
    },
    {
      nome: "Pix",
      juros: 1,
      id: 3,
    },
    {
      nome: "Crediario",
      juros: 1.5,
      id: 4,
    },
  ];
  const [formaPagamento, setFormaPagamento] = useState(tiposPagamento[0]);
  return (
    <PagamentoContext.Provider
      value={{ tiposPagamento, formaPagamento, setFormaPagamento }}
    >
      {children}
    </PagamentoContext.Provider>
  );
};

export const usePagamentoContext = () => {
  const { tiposPagamento, formaPagamento, setFormaPagamento } =
    useContext(PagamentoContext);

  function mudarFormaPagamento(id) {
    const formaPagamentoDoId = tiposPagamento.find(
      (tipoPagamento) => tipoPagamento.id === id
    );
    setFormaPagamento(formaPagamentoDoId);
  }

  return { tiposPagamento, formaPagamento, mudarFormaPagamento };
};
