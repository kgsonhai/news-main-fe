import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import { ArticleDetail } from "./pages/Article/ArticleDetail";
import { ArticlesCategory } from "./pages/Article/ArticlesCategory";
import { Login } from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import { MainPage } from "./pages/Main/MainPage";
import RouterConfig from "./config/router.config";
import MainLayout from "./layout/mainLayout";
import { Register } from "./pages/Register/Register";
import "./shared/i18n";

export const AppContext = React.createContext({});

function App() {
  const [lang, setLang] = useState("vi");

  return (
    <AppContext.Provider value={{ lang, setLang }}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path={RouterConfig.login} component={Login} />
            <Route path={RouterConfig.register} component={Register} />
            <Route
              render={() => (
                <MainLayout>
                  <Switch>
                    <Route
                      path={RouterConfig.article}
                      component={ArticleDetail}
                    />
                    <Route
                      path={RouterConfig.category}
                      component={ArticlesCategory}
                    />
                    <Route path={RouterConfig.profile} component={Profile} />
                    <Route
                      path={RouterConfig.dashboard}
                      component={Dashboard}
                    />
                    <Route path={RouterConfig.home} component={MainPage} />
                  </Switch>
                </MainLayout>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
