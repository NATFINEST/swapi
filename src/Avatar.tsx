import React from 'react';

const Avatar = ({ eye, hair, skin, gender }: any) => {
  return (
    <div>
      <div className="box">
        <div className="ear-left layer1">
          <div className="inner-ear-left layer2"></div>
        </div>

        <div className="ear-right layer1">
          <div className="inner-ear-right layer2"></div>
        </div>

        <div className="eye-left layer5">
          <div className="pupil"></div>
        </div>

        <div className="eye-right layer5">
          <div className="pupil"></div>
        </div>

        <div className="head layer3">
          {gender === 'male' ? (
            <div className={`${skin} head-copy layer1`}>
              <div className={`${hair} moustache`}></div>
            </div>
          ) : (
            ''
          )}
          <div className="mouth-area layer2">
            <div className="mouth layer3"></div>
          </div>

          <div className="nose layer4"></div>
        </div>

        <div className={`${hair} hair layer3`}>
          <div
            className="skin-layer1-hair layer4"
            style={{ backgroundColor: skin }}
          ></div>
          <div className="hair-layer3-hair layer5"></div>
        </div>

        <div className={`${hair} hair-flick flick1 layer3`}></div>
        <div className={`${hair} hair-flick flick2 layer4`}></div>
        <div className={`${hair} hair-flick flick3 layer5`}></div>
      </div>
    </div>
  );
};

export default Avatar;
