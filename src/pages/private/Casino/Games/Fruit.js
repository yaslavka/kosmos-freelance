import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../../../constants/routes.constants'
import Coktail from '../uploads/games/fruitcoctail-jpg1416563636.jpg'
function Fruit() {
  return (
    <div className="wrapp">
      <div className="grid-wrapp">
        <div className="grid-col__left">
          <div className="mainsu">
            <div className="con cnt-pt">
              <div className="grid-wrapp">
                <div className="grid-wrapp-cols pd-sm-both game-listen">
                  <div className="grid-col__4-12">
                    <div className="tmbv">
                      <i className="stickerc"/>
                      <div className="tmb-fav">
                        <div className="icoc icoc-tmb-fav"/>
                      </div>
                      <Link to={routes.rollet}>
                        <div className="tmb-imgz">
                          <img src={Coktail} />
                        </div>
                        <div className="tmb-titl">Fruit Cocktail</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Fruit
