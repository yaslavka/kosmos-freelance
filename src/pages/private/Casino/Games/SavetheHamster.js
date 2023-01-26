import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../../../constants/routes.constants'
import garage from '../uploads/games/SaveTheHamster_1280x720.jpg'
function Hamster() {
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
                      <Link to={routes.savethehamster}>
                        <div className="tmb-imgz">
                          <img src={garage}  alt={''} style={{width: "180px"}}/>
                        </div>
                        <div className="tmb-titl">Save the Hamster</div>
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
export default Hamster
