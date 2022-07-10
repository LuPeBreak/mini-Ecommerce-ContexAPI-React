import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { usePagamentoContext } from "./Pagamento.js";
import { UsuarioContext } from "./Usuarios.js";

const { createContext } = require("react");

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidadeProdutos, setQuantidadeProdutos] = useState(0);
  const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);
  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        setCarrinho,
        quantidadeProdutos,
        setQuantidadeProdutos,
        valorTotalCarrinho,
        setValorTotalCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinhoContext = () => {
  const {
    carrinho,
    setCarrinho,
    quantidadeProdutos,
    setQuantidadeProdutos,
    valorTotalCarrinho,
    setValorTotalCarrinho,
  } = useContext(CarrinhoContext);

  const { formaPagamento } = usePagamentoContext();
  const { setSaldo } = useContext(UsuarioContext);

  function mudaQuantidade(id, quantidade) {
    return carrinho.map((item) => {
      if (item.id === id) {
        item.quantidade += quantidade;
      }
      return item;
    });
  }

  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some((item) => item.id === novoProduto.id);
    if (!temOProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }
    setCarrinho(mudaQuantidade(novoProduto.id, 1));
  }

  function removerProduto(id) {
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
    if (!produto) return;
    if (produto.quantidade > 1) {
      return setCarrinho(mudaQuantidade(id, -1));
    }
    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
    );
  }

  function efetuarCompra() {
    setCarrinho([]);
    setSaldo((saldoAtual) => saldoAtual - valorTotalCarrinho);
  }

  useEffect(() => {
    if (carrinho.length < 0) return;
    const { novoTotal, novaQuantidade } = carrinho.reduce(
      (acumulador, valorAtual) => {
        return {
          novaQuantidade: (acumulador.novaQuantidade += valorAtual.quantidade),
          novoTotal:
            acumulador.novoTotal + valorAtual.quantidade * valorAtual.valor,
        };
      },
      {
        novaQuantidade: 0,
        novoTotal: 0,
      }
    );
    setQuantidadeProdutos(novaQuantidade);
    setValorTotalCarrinho(novoTotal * formaPagamento.juros);
  }, [carrinho, setQuantidadeProdutos, setValorTotalCarrinho, formaPagamento]);

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    quantidadeProdutos,
    valorTotalCarrinho,
    efetuarCompra,
  };
};
