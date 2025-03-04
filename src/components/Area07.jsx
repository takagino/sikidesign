import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

const Area07 = () => {
  const areaRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.area07__loop-item01',
        { yPercent: -100 },
        { yPercent: 100, duration: 80, delay: -40, repeat: -1, ease: 'none' }
      );
      gsap.fromTo(
        '.area07__loop-item02',
        { yPercent: -200 },
        { yPercent: 0, duration: 80, repeat: -1, ease: 'none' }
      );
    },
    { scope: areaRef }
  );

  return (
    <div className="area07" ref={areaRef}>
      <div className="area07__loop">
        <ul className="area07__loop-item01">
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
        <ul className="area07__loop-item02">
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

export default Area07;
