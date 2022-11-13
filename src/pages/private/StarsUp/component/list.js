import React from "react";
import cl from "../StarsUp.module.css";
import confirm from "reactstrap-confirm";
import * as actions from "../../../../actions/casino.actions";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

function List({draw}){
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
      dispatch(actions.casinoDrawCancel((id)));
    }
  };
  return(
    <>
      <td>
        <a>
          {draw.summ}
        </a>
      </td>
      <td>
        <a>
          {draw.status}
        </a>
      </td>
      <td>
        <div className="create_new2" onClick={handleCancelDraw} key={id}>
          <button type="submit" className={cl.nameInput}>{t('private.investbox.cencell')}</button>
        </div>
      </td>
    </>
  )
}
export default List
