import React from 'react';
import {Link} from "react-router-dom";
import routes from "../../../../constants/routes.constants";
import Coktail from "../uploads/games/zootopia-zveropolis-2016.jpg";

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
                      <Link to={routes.megacity}>
                        <div className="tmb-img">
                          <img alt={Coktail} src={Coktail}/>
                        </div>
                        <div className="tmb-title">Mega City</div>
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
