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
  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some((item) => item.id === novoProduto.id);
    if (!temOProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }
    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((item) => {
        if (item.id === novoProduto.id) {
          item.quantidade += 1;
        }
        return item;
      })
    );
  }

  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  return { carrinho, setCarrinho, adicionarProduto };
};
