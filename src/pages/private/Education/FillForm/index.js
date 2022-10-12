import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './FillForm.module.scss'
import routes from '../../../../constants/routes.constants'
import { api } from '../../../../api'
import * as actions from '../../../../actions/app.actions'

import Input from '../../../../components/OldInput'
import Button from '../../../../components/OldButton'
import Select from '../../../../components/Select'

const experienceVariants = [
  { label: 'Ubuntu-20.04', value: 'Ubuntu-20.04' },
  { label: 'Windows-7', value: 'Windows-7' },
  { label: 'Windows-8', value: 'Windows-8' },
  { label: 'Windows-8', value: 'Windows-8' },
]

const projectsVariants = [
  { label: 'Ubuntu-20.04-64bit', value: 'Ubuntu-20.04-64bit' },
  { label: 'Ubuntu-20.04-32bit', value: 'Ubuntu-20.04-32bit' },
  { label: 'Windows-7-64bit', value: 'Windows-7-64bit' },
  { label: 'Windows-7-32bit', value: 'Windows-7-32bit' },
  { label: 'Windows-8-64bit', value: 'Windows-8-64bit' },
  { label: 'Windows-8-32bit', value: 'Windows-8-32bit' },
  { label: 'Windows-10-32bit', value: 'Windows-10-32bit' },
]

const commentStatuses = {
  success:
    'Спасибо, Ваша заявка принята! <br /> <br /> Присоеденяйтесь к нашему <br /> <br /> <a rel="noreferrer" target="_blank" href="https://t.me/SchooL_Stars_bot">Присоединяйтесь к нашему Чат-боту</a>',
  fail: 'Произошла ошибка. Ваша заявка не была отправлена, повторите попытку снова. Приносим извинения',
}

export default function FillForm() {
  const [submitStatus, setSubmitStatus] = useState(null)
  const dispatch = useDispatch()

  const requestSubmit = (values) => {
    api
      .createRequestToSchool(values)
      .then(() => {
        setSubmitStatus('success')
        api
          .getUserInfo()
          .then((response) => {
            dispatch(actions.userInfoSuccess(response))
          })
          .catch(() => {})
      })
      .catch(() => {
        setSubmitStatus('fail')
      })
  }

  return (
    <div className={styles.FillForm}>
      <div className={styles.header}>
        <Container>
          <Row>
            <Col>
              <Link to={routes.education} className={styles.arrow}>
                Назад
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={styles.mainTitle}>
        <div className={submitStatus ? styles.invisible : ''}>
          <Formik
            initialValues={{
              first_name: '',
              last_name: '',
              telegram: '',
              experience: '',
              projects: '',
              members: '',
            }}
            validate={({ first_name, last_name, telegram, experience, projects, members }) => {
              const errors = {}

              if (!first_name.trim()) {
                errors.first_name = 'Неверный формат имени'
              }

              if (!last_name.trim()) {
                errors.last_name = 'Неверный формат фамилии'
              }

              if (!telegram.trim()) {
                errors.telegram = 'Неверный формат Telegram'
              }
              if (!experience) {
                errors.experience = 'Это поле обязательно'
              }
              if (!projects) {
                errors.projects = 'Это поле обязательно'
              }
              if (!members) {
                errors.members = 'Это поле обязательно'
              }

              return errors
            }}
            onSubmit={requestSubmit}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form className={styles.form}>
                <h2 className={styles.mainTitle}>Заполнить заявку</h2>
                <Field
                  className={styles.field}
                  name="first_name"
                  type="text"
                  placeholder="Имя*"
                  component={Input}
                />
                <Field
                  className={styles.field}
                  name="last_name"
                  type="text"
                  placeholder="Фамилия*"
                  component={Input}
                />
                <Field
                  className={styles.field}
                  name="telegram"
                  type="text"
                  placeholder="Ник Telegram"
                  component={Input}
                />
                <div className={styles.field}>
                  <Select
                    className={styles.select}
                    placeholder="Выберите операционную системму*"
                    values={experienceVariants}
                    onChange={(value) => {
                      setFieldValue('experience', value)
                    }}
                  />
                  {touched.experience && errors.experience && (
                    <p className={styles.error}>{errors.experience}</p>
                  )}
                </div>
                <div className={styles.field}>
                  <Select
                    className={styles.select}
                    placeholder="какая разрядность вашей системмы?*"
                    values={projectsVariants}
                    onChange={(value) => {
                      setFieldValue('projects', value)
                    }}
                  />
                  {touched.projects && errors.projects && (
                    <p className={styles.error}>{errors.projects}</p>
                  )}
                </div>
                <Button type="submit" color="perrywinkle" size="medium">
                  Отправить
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        {submitStatus && (
          <div className={styles.statusModal}>
            <svg
              className={styles.closeButton}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 27 27"
              onClick={() => {
                setSubmitStatus(null)
              }}
            >
              <g clipPath="url(#clip0)" fill="#8083E6">
                <path d="M26.3 22L5.1.6c-.9-.9-2.4-.9-3.3 0L.7 2c-1 .9-1 2.4 0 3.3l21.2 21.2c.9.9 2.4.9 3.3 0l1.1-1.2c1-.9 1-2.4 0-3.3z" />
                <path d="M21.9.7L.7 22c-1 1-1 2.4 0 3.3l1.1 1.2c1 .9 2.4.9 3.3 0L26.3 5.2c1-1 1-2.4 0-3.3L25.2.7c-1-.9-2.4-.9-3.3 0z" />
              </g>
              <defs>
                <clipPath id="clip0">
                  <path fill="#fff" d="M0 0h27v27H0z" />
                </clipPath>
              </defs>
            </svg>
            <div
              dangerouslySetInnerHTML={{
                __html: commentStatuses[submitStatus],
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
