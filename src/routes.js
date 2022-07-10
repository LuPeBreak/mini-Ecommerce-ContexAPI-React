import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { UsuarioProvider } from "common/context/Usuarios.js";
import { CarrinhoProvider } from "common/context/Carrinho.js";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <UsuarioProvider>
          <Route exact path="/">
            <Login />
          </Route>
          <CarrinhoProvider>
            <Route exact path="/feira">
              <Feira />
            </Route>
          </CarrinhoProvider>
        </UsuarioProvider>
        <Route exact path="/carrinho">
          <Carrinho />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
