import React from "react";
import {useDispatch} from "react-redux";
import * as actions from '../../../../actions/casino.actions';
import confirm from "reactstrap-confirm";
import {useTranslation} from "react-i18next";
import cl from './../StarsUp.module.css';


function Cancel({draw}){
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const {id}=draw
  const handleCancelDraw = async () => {
    let result = await confirm({
      title:`${t('private.investbox.List.result.title')}`,
      message:`${t('private.investbox.List.result.message')}`,
      confirmText:`${t('private.investbox.List.result.confirmText')}`,
      confirmColor: 'danger',
      cancelText:`${t('private.investbox.List.result.cancelText')}`,
      cancelColor: 'link text-muted',
    });

    if (result) {
      dispatch(actions.casinoDrawCancel(id));
    }
  };
  return(
    <>
      <button className={cl.nameInput} onClick={handleCancelDraw} key={draw.id}>{t('private.investbox.cencell')}</button>
    </>
  )
}
export default Cancel
