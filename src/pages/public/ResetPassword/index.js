import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './ResetPassword.module.scss'
import routes from '../../../constants/routes.constants'
import { isValidEmail } from '../../../utils'
import { api } from '../../../api'

import Input from '../../../components/OldInput'
import Button from '../../../components/OldButton'
import Planet from "../../../scss/media/planet-1.gif";

export default function ResetPassword() {
  const [resetPasswordStatus, setResetPasswordStatus] = useState(null)
  const { t } = useTranslation('common')

  const submitResetPasswordForm = ({ email }) => {
    setResetPasswordStatus('pending')
    api
      .resetPassword(email)
      .then((response) => {
        setResetPasswordStatus('successful')
      })
      .catch(() => {
        setResetPasswordStatus('failed')
      })
  }

  return (
    <div className={styles.ResetPasswordWrapper}>
      <div className="star-container" />
      <div className="twinkle" />
      <div className={styles.ResetPassword}>
        <div >
          <Link to={routes.root} className="d-block">
            <div className={styles.logoWrapResetPasswor}>
              <span>KOSM</span>
              <span className={styles.logo}>
              <img alt={Planet} src={Planet}/>
                </span>
              <span>S</span>
            </div>
          </Link>
        </div>
        <Container>
          <Row>
            <Col xl={{ span: 8, offset: 2 }}>
              <Formik
                initialValues={{ email: '' }}
                validate={({ email }) => {
                  const errors = {}

                  if (!isValidEmail(email)) {
                    errors.email = t('resetPasswordPage.inputs.email.error')
                  }

                  return errors
                }}
                onSubmit={submitResetPasswordForm}
              >
                {() => (
                  <Form className={styles.form}>
                    <h2 className={styles.mainTitle}>{t('Востановление пароля')}</h2>
                    <Field
                      className={styles.field}
                      type="email"
                      name="email"
                      placeholder={t('email')}
                      component={Input}
                    />
                    <Button
                      className={styles.submitButton}
                      color="perrywinkle"
                      size="medium"
                      type="submit"
                      disabled={resetPasswordStatus === 'pending'}
                    >
                      {t('Сбросить')}
                    </Button>
                    {resetPasswordStatus === 'successful' && (
                      <p className="mt-3 text-center">{t('Вам на почту письмо')}</p>
                    )}
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}
