import React from 'react'
import {Row, Container, Col} from 'reactstrap'
import '../../stoc.css'
import cl from './../../Exchange.module.css';
import NavBar from '../../../../../components/layout/Navbar'
import Fmat from "./fmat";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

function Exchange({match, children}) {
  const { t } = useTranslation('common');
  const userInfo = useSelector((state) => state.app.user)
  console.log('charta baryan danny', match.params.pair)
    return (
      <Container className="root-page">
        {
          userInfo && (
            <Row>
              <Col xl={3} className={cl.navBlock}>
                <NavBar />
              </Col>
              <Fmat pair = {match.params.pair} userInfo={userInfo} t={t}/>
              {children}
            </Row>
          )
        }

      </Container>
    );

}

export default Exchange
