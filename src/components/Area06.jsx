import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

const Area06 = () => {
  const areaRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.area06__loop-item01',
        { xPercent: 100 },
        { xPercent: -100, duration: 80, delay: -40, repeat: -1, ease: 'none' }
      );
      gsap.fromTo(
        '.area06__loop-item02',
        { xPercent: 0 },
        { xPercent: -200, duration: 80, repeat: -1, ease: 'none' }
      );
    },
    { scope: areaRef }
  );

  return (
    <div className="area06" ref={areaRef}>
      <div className="area06__loop">
        <ul className="area06__loop-item01">
          <li>
            <img src="./images/dummy.jpg" alt="" />
          </li>
          <li>
            <img src="./images/dummy.jpg" alt="" />
          </li>
          <li>
            <img src="./images/dummy.jpg" alt="" />
          </li>
          <li>
            <img src="./images/dummy.jpg" alt="" />
          </li>
        </ul>
        <ul className="area06__loop-item02">
          <li>
            <img src="./images/dummy.jpg" alt="" />
          </li>
          <li>
            <img src="./images/dummy.jpg" alt="" />
          </li>
          <li>
            <img src="./images/dummy.jpg" alt="" />
          </li>
          <li>
            <img src="./images/dummy.jpg" alt="" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Area06;
