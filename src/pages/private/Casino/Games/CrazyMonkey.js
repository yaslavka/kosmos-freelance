import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../../../constants/routes.constants'
import crazyMonkey from '../uploads/games/crazymonkey-jpg1416586428.jpg'
function CrazyMonkey() {
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
                      <i className="stickerc"></i>
                      <div className="tmb-fav">
                        <div className="icoc icoc-tmb-fav"></div>
                      </div>
                      <Link to={routes.barr}>
                        <div className="tmb-imgz">
                          <img src={crazyMonkey} style={{width: "180px"}}/>
                        </div>
                        <div className="tmb-titl">Crazy Monkey</div>
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
export default CrazyMonkey
