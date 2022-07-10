import {
  Button,
  Snackbar,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useCarrinhoContext } from "common/context/Carrinho.js";
import { useState } from "react";
import Produto from "components/Produto";
import {
  Container,
  Voltar,
  TotalContainer,
  PagamentoContainer,
} from "./styles";
import { useHistory } from "react-router-dom";
import { usePagamentoContext } from "common/context/Pagamento.js";
import { useContext } from "react";
import { UsuarioContext } from "common/context/Usuarios.js";
import { useMemo } from "react";

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { saldo } = useContext(UsuarioContext);
  const { carrinho, valorTotalCarrinho, efetuarCompra } = useCarrinhoContext();
  const { tiposPagamento, formaPagamento, mudarFormaPagamento } =
    usePagamentoContext();
  const history = useHistory();
  const total = useMemo(
    () => saldo - valorTotalCarrinho,
    [saldo, valorTotalCarrinho]
  );
  return (
    <Container>
      <Voltar
        onClick={() => {
          history.goBack();
        }}
      />

      <h2>Carrinho</h2>
      {carrinho.map((produto) => {
        return <Produto {...produto} key={produto.id} />;
      })}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
          value={formaPagamento.id}
          onChange={(event) => mudarFormaPagamento(event.target.value)}
        >
          {tiposPagamento.map((tipoPagamento) => (
            <MenuItem value={tipoPagamento.id} key={tipoPagamento.id}>
              {tipoPagamento.nome}
            </MenuItem>
          ))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
        <div>
          <h2>Total no Carrinho: </h2>
          <span>R$ {valorTotalCarrinho.toFixed(2)}</span>
        </div>
        <div>
          <h2> Saldo: </h2>
          <span> R$ {Number(saldo).toFixed(2)} </span>
        </div>
        <div>
          <h2> Saldo Total: </h2>
          <span> R$ {total.toFixed(2)} </span>
        </div>
      </TotalContainer>
      <Button
        disabled={total < 0 || carrinho.length === 0}
        onClick={() => {
          efetuarCompra();
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
      >
        Comprar
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert onClose={() => setOpenSnackbar(false)} severity="success">
          Compra feita com sucesso!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default Carrinho;
