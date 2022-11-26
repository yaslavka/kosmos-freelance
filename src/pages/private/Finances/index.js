import React, { useState, useCallback } from 'react'
import { Row, Col, Container } from 'reactstrap'
import NavBar from '../../../components/layout/Navbar'
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../../actions/finance.actions";
import {formatter} from "../../../utils";
import ReplenishmentOfMoney from "./ReplenishmentOfMoney";
import MoneyTransferModal from "./MoneyTransferModal";
import OperationsHistoryModal from "./OperationsHistoryModal";
import MyViewElement from 'src/components/MyViewElements/MyViewElements';
import {useTranslation} from "react-i18next";

function Finances() {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const [
    isOperationsHistoryModalVisible,
    setIsOperationsHistoryModalVisible,
  ] = useState(false);
  const userInfo = useSelector(state => state.app.user);

  const handleVisibleTransferMoneyModal = useCallback(() => {
    dispatch(actions.toggleTransferMoneyModal(true));
  }, [dispatch]);

  const openOperationsHistoryModal = () => {
    document.body.style.overflow = 'hidden';
    setIsOperationsHistoryModalVisible(true);
  };

  const closeOperationsHistoryModal = () => {
    document.body.style.overflow = 'initial';
    setIsOperationsHistoryModalVisible(false);
  };

  const financeData = useSelector(state=>state.financeMoney)
  const filedData = financeData.filter(e=>e.value)
  console.log(filedData)
  return (
    <>
      <Container className="root-page">
        <Row>
          <Col xl={3} className="d-none d-xl-block">
            <NavBar />
          </Col>
          <Col>
            <h1 className="root-page-title finances-title">{t('private.finances.title')}</h1>
            {userInfo && (
              <>
                <Row>
                  <Col lg={6}>
                    <div className="card list-card-fin">
                      <div className="card__header">
                        <div className="card__header-left">
                          <MyViewElement element={
                          <h3 className="card__title card__title-fin">{t('private.finances.balance')}</h3>

                          }/>
                        </div>
                      </div>
                      <div className="card__body">
                      <MyViewElement element={

                        <h3 className='card-fin-bal'>
                              {`${formatter
                            .format(
                              (userInfo.allBalances> -1 && userInfo.allBalances) || 0,
                            ).replace('₽', '₽')}`}
                        </h3>
                          }/>

                        <br />
                      <MyViewElement element={

                        <button
                          onClick={handleVisibleTransferMoneyModal}
                          className='fin-btn'
                        >
                          {t('private.finances.perevod')}
                        </button>
                          }/>

                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="card list-card-fin">
                      <div className="card__header">
                        <div className="card__header-left">
                        <MyViewElement element={
                            <h3 className="card__title card__title-fin">{t('private.finances.tranzit')}</h3>
                        }/>

                        </div>
                      </div>
                      <div className="card__body">
                      <MyViewElement element={
                        <h3 className='card-fin-bal'>


                          {formatter
                            .format(
                              (userInfo.transferBalance > -1 &&
                                userInfo.transferBalance) ||
                              0,
                            )
                            .replace('₽', '₽')}

                        </h3>
                        }/>

                        <br />
                      <MyViewElement element={

                        <button
                          onClick={openOperationsHistoryModal}
                          className='fin-btn'
                        >
                          {t('private.finances.hystory')}
                        </button>
                        }/>

                      </div>
                    </div>
                  </Col>
                </Row>
                <MyViewElement element={

                <h2 className='pay-fin-title'>{t('private.finances.pay')}</h2>
              }/>
              <ReplenishmentOfMoney />
              </>
            )}
          </Col>
        </Row>
      </Container>
      <MoneyTransferModal />
      {isOperationsHistoryModalVisible && (
        <OperationsHistoryModal onClose={closeOperationsHistoryModal} />
      )}
    </>
  );
}

export default Finances;
