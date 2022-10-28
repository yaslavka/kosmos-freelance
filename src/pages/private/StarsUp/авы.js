import cl from "./StarsUp.module.css";
import React from "react";

<tbody className={cl.tbody}>
<tr role="row" className="even">
  <td>Руб</td>
  <td>5%</td>
  <td>В месяц</td>
  <td>
    <a role={"button"}>
      {draw.summ}
    </a>
  </td>
  <td>
    <a>
      {draw.status}
    </a>
  </td>
  <td>
    <form onSubmit={handleCancelDraw}>
      <div className="create_new2">
        <input
          disabled
          type="text"
          className={cl.inputValue}
        />
        <button type="submit"  className={cl.nameInput}>Отменить</button>
      </div>
    </form>
  </td>
</tr>
</tbody>


<tbody className={cl.tbody}>
<tr className="odd">
  <td
    valign="top"
    colSpan="7"
    className="dataTables_empty"
  >
    Нет записей
  </td>
</tr>
</tbody>
