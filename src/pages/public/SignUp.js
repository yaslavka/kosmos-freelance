import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, FormGroup } from 'reactstrap'
import { Formik, Form, Field } from 'formik'
import Planet from './../../assets/images/planet-1.gif'

import avatar from '../../assets/images/icons/camera_200.png'
import routes from '../../constants/routes.constants'
import * as actions from '../../actions/auth.actions'
import { api } from '../../api'
import { isValidEmail, isValidPassword, isValidUsername, isValidPhone } from '../../utils'
import cl from './Sign.module.css';

import Checkbox from '../../components/Checkbox'
import InputPhone from '../../components/InputPhone'
import Input from '../../components/Input'
import { Spinner } from 'react-bootstrap'


// eslint-disable-next-line react/prop-types
function SignUp({ location }) {
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const inviterLoading = useSelector((state) => state.auth.loadings.inviter)
  const inviter = useSelector((state) => state.auth.inviter)
  const [signUpStatus, setSignUpStatus] = useState(null)
  const [serverError, setServerError] = useState(null)

  const referralName = useMemo(() => {
    let referral = ''
    if (location) {
      // eslint-disable-next-line react/prop-types
      const searchParams = new URLSearchParams(location.search)
      const ref = searchParams.get('ref')
      if (ref) {
        referral = ref
      }
    }

    return referral
  }, [location])

  const initialValues = useMemo(
    () => ({
      phone: '',
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      referral: referralName,
      acceptPrivacyPolicy: false,
    }),
    [referralName],
  )

  const getInviterByName = useCallback(
    (name) => {
      dispatch(actions.inviter(name))
    },
    [dispatch],
  )

  useEffect(() => {
    if (referralName) {
      getInviterByName(referralName)
    }
    return () => {
      dispatch(actions.clearInviter())
    }
  }, [dispatch, referralName, getInviterByName])

  const handleOnBlurReferralField = (event) => {
    const inviterName = event.target.value
    if (inviterName) {
      getInviterByName(inviterName)
    } else {
      dispatch(actions.clearInviter())
    }
  }

  const handleOnSubmit = ({ acceptPrivacyPolicy, repeatPassword, ...finalUserInfo }) => {
    setSignUpStatus('progress')
    setServerError(null)
    api
      .signUp(finalUserInfo)
      .then(() => {
        setSignUpStatus('successful')
      })
      .catch((error) => {
        setServerError(error.message)
        setSignUpStatus('failed')
      })
  }

  // TODO: refactoring
  if (signUpStatus === 'successful') {
    return <Redirect to={routes.signIn} />
  }

  return (
    <div className={cl.authPage}>
      <div className={cl.headerSign}>
        <div className='container'>
          <Link to={'/'}>
            <div className={cl.logoWrap}>
              <span>KOSM</span>
              <span className={cl.logo}>
                <img alt={Planet} src={Planet}/>
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
          initialValues={initialValues}
          validate={
            ({
               phone,
               first_name,
               last_name,
               username,
               email,
               password,
               repeatPassword,
               acceptPrivacyPolicy,
          }) => {
            const errors = {}

            if (!first_name.trim()) {
              errors.first_name = t('signUpPage.inputs.firstName.error')
            }

            if (!last_name.trim()) {
              errors.last_name = t('signUpPage.inputs.lastName.error')
            }

            if (!isValidPhone(phone)) {
              errors.phone = t('signUpPage.inputs.phone.error');
            }

            if (!isValidEmail(email)) {
              errors.email = t('signUpPage.inputs.email.error')
            }

            if (!isValidUsername(username)) {
              errors.username = t('signUpPage.inputs.username.error');
            }

            if (!isValidPassword(password)) {
              errors.password = t('signUpPage.inputs.password.error');
            }

            if (repeatPassword !== password) {
              errors.repeatPassword = t('signUpPage.inputs.repeatPassword.error')
            }

            if (!acceptPrivacyPolicy) {
              errors.acceptPrivacyPolicy = t('signUpPage.inputs.acceptPrivacyPolicy.error')
            }

            return errors
          }}
          onSubmit={handleOnSubmit}
        >
          {() => (
            <Form className="auth__form">
              <div className="auth__title">
                <h2 className={cl.authTitle}>{t('signUpPage.mainTitle')}</h2>
                {!inviter && <div className={cl.authDescr}>{t('signUpPage.text')}</div>}
              </div>
              <Spinner size="sm" isLoading={inviterLoading}>
                {inviter && (
                  <>
                  <div className="inviter">
                    <div className="inviter__avatar">
                      <img
                        src={
                          inviter.avatar
                            ? `${process.env.REACT_APP_BASE_URL}/user/${inviter.avatar}`
                            : avatar
                        }
                        alt={`${inviter.first_name} ${inviter.last_name}`}
                      />
                    </div>

                  </div>
                  <div className="inviter__info">
                  <div className="inviter__name">{`${inviter.first_name} ${inviter.last_name}`}</div>
                  <div>{t('signUpPage.text')}</div>
                  </div>
                  </>
                )}
              </Spinner>
              <FormGroup>
                <Field
                  type="text"
                  name="referral"
                  placeholder={t('signUpPage.inputs.referral.placeholder')}
                  onBlur={handleOnBlurReferralField}
                  component={Input}
                />
              </FormGroup>
              <Row>
                <Col lg={6}>
                  <FormGroup>
                    <Field type="text" name="first_name" placeholder={t('signUpPage.inputs.firstName.placeholder')} component={Input} />
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Field
                      type="text"
                      name="last_name"
                      placeholder={t('signUpPage.inputs.lastName.placeholder')}
                      component={Input}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Field name="phone" placeholder={t('signUpPage.inputs.phone.placeholder')} component={InputPhone} />
              </FormGroup>
              <FormGroup>
                <Field type="text" name="email" placeholder={t('signUpPage.inputs.email.placeholder')} component={Input} />
              </FormGroup>
              <FormGroup>
                <Field
                  type="text"
                  name="username"
                  placeholder={t('signUpPage.inputs.username.placeholder')}
                  component={Input}
                />
              </FormGroup>
              <Row>
                <Col lg={6}>
                  <FormGroup>
                    <Field
                      type="password"
                      name="password"
                      placeholder={t('signUpPage.inputs.password.placeholder')}
                      component={Input}
                    />
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Field
                      type="password"
                      name="repeatPassword"
                      placeholder={t('signUpPage.inputs.repeatPassword.placeholder')}
                      component={Input}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup className="mt-4 mb-5">
                <Field
                  type="checkbox"
                  name="acceptPrivacyPolicy"
                  label={t('signUpPage.inputs.acceptPrivacyPolicy.placeholder')}
                  component={Checkbox}
                />
              </FormGroup>
              <div className={cl.btnBlock}>
              <button
                type="submit"
                className={cl.btnGradient}
              >
                {t('signUpPage.buttons.signUp')}
              </button>
              </div>
              {serverError && <div className="auth__error">{serverError}</div>}
            </Form>
          )}
        </Formik>
        <div className={cl.signUpFoot}>
          {t('signUpPage.links.signIn.title')} <Link to={routes.signIn}>{t('signUpPage.links.signIn.text')}</Link>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp



