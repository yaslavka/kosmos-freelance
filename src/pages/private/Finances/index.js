import React, { useState, useCallback } from 'react'
import { Row, Col, Container } from 'reactstrap'
import NavBar from '../../../components/layout/Navbar'
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../../actions/finance.actions";
import {formatter} from "../../../utils";
import ReplenishmentOfMoney from "./ReplenishmentOfMoney";
import WithdrawalOfMoney from "./WithdrawalOfMoney";
import MoneyTransferModal from "./MoneyTransferModal";
import OperationsHistoryModal from "./OperationsHistoryModal";
import MyViewElement from 'src/components/MyViewElements/MyViewElements';
import MyModal from 'src/components/modal/MyModal';
function Finances() {
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

  const [modal, setModal] = useState(false)
  return (
    <>
      <Container className="root-page">
        <Row>
          <Col xl={3} className="d-none d-xl-block">
            <NavBar />
          </Col>
          <Col>
            <h1 className="root-page-title finances-title">Финансы</h1>
            {userInfo && (
              <>
                <Row>
                  <Col lg={6}>
                    <div className="card list-card-fin">
                      <div className="card__header">
                        <div className="card__header-left">
                          <MyViewElement element={
                          <h3 className="card__title card__title-fin">Общий баланс</h3>

                          }/>
                        </div>
                      </div>
                      <div className="card__body">
                      <MyViewElement element={

                        <h3 className='card-fin-bal'>
                          {/* {`${formatter
                            .format(
                              (userInfo.filter((e)=>e.price != 0).reduce((ac,el)=>ac+el,0) > -1 && userInfo.filter((e)=>e.price != 0).reduce((ac,el)=>ac+el,0)) || 0,
                            )} `} */}
                              {`${formatter
                            .format(
                              (userInfo.balance> -1 && userInfo.balance) || 0,
                            ).replace('₽', 'ST')}`}
                        </h3>
                          }/>

                        <br />
                      <MyViewElement element={

                        <button
                          onClick={handleVisibleTransferMoneyModal}
                          className='fin-btn'
                        >
                          Перевод партнеру
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
                            <h3 className="card__title card__title-fin">Транзитный баланс</h3>
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
                            .replace('₽', 'ST')}
                        
                        </h3>
                        }/>

                        <br />
                      <MyViewElement element={

                        <button
                          onClick={openOperationsHistoryModal}
                          className='fin-btn'
                        >
                          История операций
                        </button>
                        }/>

                      </div>
                    </div>
                  </Col>
                </Row>
                <MyViewElement element={

                <h2 className='pay-fin-title'>Приобрести/вывести</h2>
              }/>

                <ReplenishmentOfMoney />
                {/* <h2>Вывод</h2>
                <WithdrawalOfMoney /> */}
              </>
            )}
          </Col>
        </Row>
      </Container>
      <MyModal title={'Укажите сумму'} visible={modal} setVisible={setModal} setThx={()=>{}}/>
      <MoneyTransferModal />
      {isOperationsHistoryModalVisible && (
        <OperationsHistoryModal onClose={closeOperationsHistoryModal} />
      )}
    </>
  );
}

export default Finances;
