import React from "react";
import cl from "../StarsUp.module.css";
import confirm from "reactstrap-confirm";
import * as actions from "../../../../actions/casino.actions";
import {useDispatch} from "react-redux";

function List({draw}){

  const dispatch = useDispatch();
  const handleCancelDraw = async () => {
    let result = await confirm({
      title: 'Отменить взнос',
      message: 'Вы действительно хотите отменить взнос?',
      confirmText: 'Подтвердить',
      confirmColor: 'danger',
      cancelText: 'Отмена',
      cancelColor: 'link text-muted',
    });

    if (result) {
      dispatch(actions.casinoDrawCancel(draw.id));
    }
  };
  return(
    <tr className="even">
      <td>руб</td>
      <td>5%</td>
      <td>в месяц</td>
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
        <div className="create_new2" onClick={handleCancelDraw} key={draw.id}>
          <button type="submit" className={cl.nameInput}>Отменить</button>
        </div>
      </td>
    </tr>
  )
}
export default List
