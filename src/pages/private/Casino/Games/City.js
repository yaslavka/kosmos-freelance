import React from 'react';
import {Link} from "react-router-dom";
import routes from "../../../../constants/routes.constants";
import Coktail from "../uploads/games/400x254_bord.svg";

const City = () => {
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
                      <Link to={routes.megacity} >
                        <div className="tmb-img" style={{width:"400px", marginLeft:"10px" }}>
                          <img alt={Coktail} src={Coktail} style={{height:"105px", }}/>
                        </div>
                        <div className="tmb-title">Book of ra</div>
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
  );
};

export default City;
