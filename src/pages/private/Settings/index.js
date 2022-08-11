import React from 'react'
import { Row, Col, Container } from 'reactstrap'

import NavBar from '../../../components/layout/Navbar'
import Accordion from 'src/components/Accordion/Accordion'
import FinancePassword from './FinancePassword'
import ChangePassword from './ChangePassword'
import ChangeUserInfo from './ChangeUserInfo'
import SocialNetwork from './SocialNetwork'
import ChangeDescription from './ChangeDescription'
// import StarTrek from './StarTrek';

function Settings() {

  const infoDataAcc = [{title: 'Изменение пароля', inputsArr: [{place: 'Текущий пароль', name: 'old_password'},{place: 'Новый пароль', name: 'new_password'},{place: 'Повторить новый пароль', name: 'repeat_new_password'}],nameBtn: 'Изменить', linkBtn: ''},
  {title: 'Изменение данных', inputsArr: [{place: 'Имя', name: 'firstName'},{place: 'Фамилия', name: 'lastName'}],nameBtn: 'Сохранить', linkBtn: ''},
  {title: 'Изменение финансового пароля', inputsArr: [{place: 'Старый пароль', name: 'old_password'},{place: 'Новый пароль', name: 'new_password'},{place: 'Повторить новый пароль', name: ''}],nameBtn: 'Добавить', linkBtn: 'repeat_new_password'},
  {title: 'Ваши социальные сети', inputsArr: [{place: 'Instagram', name: 'Instagram'},{place: 'Telegram', name: 'Telegram'},{place: 'ВКонтакте', name: 'vk'}],nameBtn: 'Сохранить', linkBtn: ''},
  {title: 'Обо мне', inputsArr: [{place: 'Напишите коротко о себе', textArea: 0, name: 'description'}],nameBtn: 'Сохранить', linkBtn: ''}]
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col>
          <h1 className="root-page-title">Настройки</h1>
          <Row>
            <Col lg={6}>
              <ChangePassword />
              <FinancePassword />
            </Col>
            <Col lg={6}>
              <ChangeUserInfo />
              <SocialNetwork />
              {/* <StarTrek /> */}
            </Col>
          </Row>
          <ChangeDescription />
          {/* <Accordion infoData={infoDataAcc}/> */}
        </Col>
      </Row>
    </Container>
  )
}

export default Settings
