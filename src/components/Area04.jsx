import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

const Area04 = () => {
  const areaRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.project__loop-item01',
        { yPercent: 100 },
        { yPercent: -100, duration: 160, delay: -80, repeat: -1, ease: 'none' }
      );
      gsap.fromTo(
        '.project__loop-item02',
        { yPercent: 0 },
        { yPercent: -200, duration: 160, repeat: -1, ease: 'none' }
      );
    },
    { scope: areaRef }
  );

  return (
    <div className="area04" ref={areaRef}>
      <section className="no04">
        <h2 className="no04__tit01">
          <img src="./images/04_tit01.svg" alt="まちをたのしく" />
        </h2>
        <p className="no04__txt01">
          場と人とモノの関わりは まちを構成するパーツです
          <br />
          わたしたちは、場と人とモノをつなぐしくみを生み出すことで
          <br />
          たくさんのまちのパーツを生み出すことになると考えています
          <br />
          パーツが増えるほど まちは多面的で彩り豊かになります
          <br />
          しくみキュレーションは
          <br />
          まちをたのしくします
        </p>
      </section>
      <section className="project">
        <h2 className="project__tit01">
          <img src="./images/project_tit01.svg" alt="これまでのプロジェクト" />
        </h2>
        <div className="project__map">
          <div className="project__txt01">
            <p>
              SiKi designが
              <br />
              これまでに携わった国内のプロジェクトを紹介。
            </p>
            <p>
              その他に
              <br />
              「行った事がある地域」
              <br />
              「行ってみたい地域」をマッピング！
            </p>
          </div>
          <img className="project__map-img" src="./images/project_map.svg" alt="" />
        </div>
        <div className="project__list">
          <ul>
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
        <div className="project__loop">
          <div className="project__loop-inner">
            <img className="project__loop-item01" src="./images/logo_loop02.svg" alt="" />
            <img className="project__loop-item02" src="./images/logo_loop02.svg" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Area04;
