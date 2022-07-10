import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";

const { createContext } = require("react");

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidadeProdutos, setQuantidadeProdutos] = useState(0);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        setCarrinho,
        quantidadeProdutos,
        setQuantidadeProdutos,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho, quantidadeProdutos, setQuantidadeProdutos } =
    useContext(CarrinhoContext);

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

  useEffect(() => {
    if (carrinho.length < 0) return;
    setQuantidadeProdutos(
      carrinho.reduce((acumulador, valorAtual) => {
        return (acumulador += valorAtual.quantidade);
      }, 0)
    );
  }, [carrinho, setQuantidadeProdutos]);

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    quantidadeProdutos,
  };
};
