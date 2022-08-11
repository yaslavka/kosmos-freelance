import React from "react";
import YouTube from "react-youtube";

function Video1(){

  const opts={
    height: '250',
    width: '350',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }
  return(
    <div className="wrapp">
      <div className="grid-wrapp">
        <div className="grid-col__left">
          <div className="mainsu">
            <div className="con cnt-pt">
              <div className="grid-wrapp">
                <div className="grid-wrapp-cols pd-sm-both game-listen">
                  <div className="grid-col__4-12">
                    <YouTube videoId="_nBlN9yp9R8" opts={opts}/>
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
export default Video1
