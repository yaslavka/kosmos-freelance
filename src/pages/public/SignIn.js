import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { FormGroup } from 'reactstrap'
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { isValidPassword, isValidUsername, setAccessToken } from '../../utils'
import { api } from '../../api'
import * as actions from '../../actions/auth.actions'
import { initial } from 'lodash'
import Input from '../../components/Input'
import routes from '../../constants/routes.constants'
import cl from './Sign.module.css';
import AOS from 'aos'
import 'aos/dist/aos.css'
import Planet from './../../scss/media/planet-1.gif'

AOS.init()
AOS.refresh()
function SignIn() {
  const dispatch = useDispatch()
  const [serverError, setServerError] = useState(null)
  const [clientCredentials, setClientCredentials] = useState(null)

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup
          .string()
          .required()
          .test('username', 'username', (value) => isValidUsername(value)),
        password: yup
          .string()
          .required()
          .test('password', 'password', (value) => isValidPassword(value)),
      }),
    [],
  )

  const submitSignInForm = useCallback(
    (credentials) => {
      setServerError()
      api
        .signIn({ ...credentials, ...clientCredentials })
        .then((response) => {
          dispatch(actions.signInSuccess())
          setAccessToken(response)

          api
            .getUserInfo()
            .then(() => {})
            .catch(() => {})
        })
        .catch(() => {
          setServerError('Неверный логин или пароль.')
        })
    },
    [dispatch, clientCredentials],
  )

  useEffect(() => {
    api
      .createClient()
      .then((response) => {
        if (response && response.client_id && response.client_secret) {
          setClientCredentials(response)
          localStorage.setItem('client_id', response.client_id)
          localStorage.setItem('client_secret', response.client_secret)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className={cl.authPage}>
      <div className={cl.headerSign}>
        <div className='container'>
          <Link to={routes.root}>
            <div className={cl.logoWrap}>
              <span>KOSM</span>
              <span className={cl.logo}>
                <img src={Planet} alt={Planet}/>
              </span>
              <span>S</span>
            </div>
          </Link>

          </div>
        </div>
      <div className={cl.authBlock}>
        <div className={'container'}>
        <div className={cl.formBlock}>
          <Formik
            validationSchema={validationSchema}
            onSubmit={submitSignInForm}
            initialValues={initial}
          >
            {() => (
              <Form className="auth__form">
                <div className="auth__title">
                  <h2 className={cl.authTitle}>Вход в системму</h2>
                </div>
                <FormGroup>
                  <Field
                    type="text"
                    name="username"
                    component={Input}
                    placeholder="Введите логин"
                  />
                </FormGroup>
                <FormGroup className="mb-5">
                  <Field
                    type="password"
                    name="password"
                    component={Input}
                    placeholder="Введите пароль"
                  />
                </FormGroup>
                <FormGroup>
                  <div className={cl.btnBlock}>
                    <button type="submit" className={cl.btnGradient} >
                      Войти
                    </button>
                  </div>
                </FormGroup>
                <div className={cl.forgotBLock}>
                  <Link to={routes.resetPassword}>{'Забыли пароль?'}</Link>
                </div>
                {serverError && <div className="auth__error">{serverError}</div>}
              </Form>
            )}
          </Formik>
          <div className={cl.signInFoot}>
            <Link to={routes.signUp}>Все еще нет Аккаунта?</Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
export default SignIn
