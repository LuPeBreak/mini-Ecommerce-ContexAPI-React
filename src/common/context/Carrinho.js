import { useContext } from "react";
import { useState } from "react";

const { createContext } = require("react");

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  return (
    <CarrinhoContext.Provider value={{ carrinho, setCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinhoContext = () => {
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
    setCarrinho(mudaQuantidade(novoProduto.id, 1))
  }

  function removerProduto(id) {
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
    if (!produto) return;
    if (produto.quantidade > 1) {
      return setCarrinho(mudaQuantidade(id, -1))
    }
    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
    );
  }

  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  return { carrinho, setCarrinho, adicionarProduto, removerProduto };
};
