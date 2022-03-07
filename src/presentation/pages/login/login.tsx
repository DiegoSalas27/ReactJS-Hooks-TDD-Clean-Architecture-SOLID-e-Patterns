import Logo from '@presentation/components/logo/logo'
import Spinner from '@presentation/components/spinner/spinner'
import React from 'react'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
        <h1>4Dev - Polls for programmers</h1>
      </header>
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="Enter your email" />
          <span className={Styles.status}>😃</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name="password" placeholder="Enter your password" />
          <span className={Styles.status}>😃</span>
        </div>
        <button className={Styles.submit} type="submit">
          Login
        </button>
        <span className={Styles.link}>Create an account</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Error</span>
        </div>
      </form>
      <footer className={Styles.footer}></footer>
    </div>
  )
}

export default Login
