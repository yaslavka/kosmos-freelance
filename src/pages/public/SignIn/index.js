import React, { useState, useMemo, useCallback } from 'react'
import { FormGroup } from 'reactstrap'
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import cl from './Sign.module.css'
import * as yup from 'yup'
import { api } from '../../../api'
import * as actions from '../../../actions/auth.actions'
import { isValidPassword, isValidUsername, setAccessToken } from '../../../utils'
import { initial } from 'lodash'
import r from '../../../constants/routes.constants'
import AOS from 'aos'
import { useTranslation } from 'react-i18next'
import 'aos/dist/aos.css'
import { Col, Row } from 'react-bootstrap'
import './index.css'
import Input from '../../../components/Input'
AOS.init()
AOS.refresh()
function SignIn() {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const [serverError, setServerError] = useState(null)

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup
          .string()
          .required()
          .test('username', t('signInPage.inputs.username.error'), (value) =>
            isValidUsername(value),
          ),
        password: yup
          .string()
          .required()
          .test('password', t('signInPage.inputs.password.error'), (value) =>
            isValidPassword(value),
          ),
      }),
    [t],
  )

  const submitSignInForm = useCallback(
    (credentials) => {
      setServerError()
      api
        .signIn({ ...credentials })
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
    [dispatch],
  )

  return (
    <div className={'wrappe'}>
      <div
        className={'authentication-reset-password d-flex align-items-center justify-content-center'}
      >
        <Row>
          <Col col={12} lg={10} mx={'auto'}>
            <div className={'card radius-15'}>
              <Row className={'no-gutters'}>
                <>
                  <>
                    <Formik
                      validationSchema={validationSchema}
                      onSubmit={submitSignInForm}
                      initialValues={initial}
                    >
                      {() => (
                        <Form className={'form'}>
                          <div className={'text-left'}></div>
                          <FormGroup className={'form-group mt-4'}>
                            <Field
                              type="text"
                              name="username"
                              component={Input}
                              placeholder={t('signInPage.inputs.username.placeholder')}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Field
                              type="password"
                              name="password"
                              component={Input}
                              placeholder={t('signInPage.inputs.password.placeholder')}
                            />
                          </FormGroup>
                          <FormGroup>
                            <div className={cl.btnBlock}>
                              <button type="submit" className={cl.btnGradient}>
                                {t('signInPage.buttons.signIn')}
                              </button>
                            </div>
                          </FormGroup>
                          {serverError && <div className="auth__error">{serverError}</div>}
                        </Form>
                      )}
                    </Formik>
                  </>
                </>
                <div className={'form-row'}>
                  <div className={'form-group col'}>
                    <div className={'custom-control custom-switch'}>
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        name="remember"
                        id="customSwitch1"
                      />
                      <label className="custom-control-label" htmlFor="customSwitch1">
                        Запомнить
                      </label>
                    </div>
                  </div>
                  <div className="form-group col text-right">
                    <Link to={r.resetPassword}>Забыл пароль?</Link>
                  </div>
                </div>
              </Row>
              <div className={cl.signInFoot}>
                <Link to={r.signUp}>{t('signInPage.links.signUp')}</Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default SignIn
