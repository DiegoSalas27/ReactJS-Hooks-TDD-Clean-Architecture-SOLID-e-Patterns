import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@main/adapters/current-account-adapter'
import { makeLogin, makeSignup, makeSurveyList, makeSurveyResult } from '@main/factories/pages'
import { PrivateRoute } from '@presentation/components'
import { ApiContext } from '@presentation/context'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={makeLogin} />
          <Route exact path="/signup" component={makeSignup} />
          <PrivateRoute exact path="/" component={makeSurveyList} />
          <PrivateRoute path="/surveys/:id" component={makeSurveyResult} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
