import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

const Area02 = () => {
  const areaRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.area02__loop-item01',
        { xPercent: -100 },
        { xPercent: 100, duration: 160, delay: -80, repeat: -1, ease: 'none' }
      );
      gsap.fromTo(
        '.area02__loop-item02',
        { xPercent: -200 },
        { xPercent: 0, duration: 160, repeat: -1, ease: 'none' }
      );
      const drop = (el) => {
        gsap.set(el, {
          y: '-12rem',
          opacity: 1,
          rotate: 'random(0, 360)',
          scale: 'random(0.5, 1)',
        });
        gsap.to(el, {
          duration: 'random(4, 6)',
          y: '72rem',
          opacity: 0,
          ease: 'power2.in',
          onComplete: () => gsap.delayedCall(Math.random() * 2, drop, [el]),
        });
      };
      drop('.object__img01');
      drop('.object__img02');
      drop('.object__img03');
      drop('.object__img04');
      drop('.object__img05');
      drop('.object__img06');
    },
    { scope: areaRef }
  );

  return (
    <div className="area02" ref={areaRef}>
      <div className="object">
        <img className="object__img01" src="./images/shape01.svg" alt="" />
        <img className="object__img02" src="./images/shape02.svg" alt="" />
        <img className="object__img03" src="./images/shape03.svg" alt="" />
        <img className="object__img04" src="./images/shape04.svg" alt="" />
        <img className="object__img05" src="./images/shape05.svg" alt="" />
        <img className="object__img06" src="./images/shape06.svg" alt="" />
      </div>
      <section className="no02">
        <h2 className="no02__tit01">
          <img src="./images/02_tit01.svg" alt="しくみの役目" />
        </h2>
        <div className="no02__txt01">
          <p>
            一方に場があり 一方に人がいて 一方にモノがある
            <br />
            それぞれ何も手を加えなければ
            <br />
            何も関わりのないただの場と人とモノです
            <br />
            でも そこに「しくみ」が加わると
            <br />
            場と人とモノの間につながりが生まれ
            <br />
            それによって 場が新しい姿に変化したり
            <br />
            ひとりからコミュニティに変化したり
            <br />
            モノに違うストーリーがついたり
            <br />
            新たな面白さや価値が生まれます
          </p>
        </div>
        <img
          className="no02__img01"
          src="./images/02_img01.svg"
          alt="一般的なしくみは足し算であることが多い、でもSiKidesignは違います"
        />
      </section>
      <section className="instagram">
        <ul className="instagram__list">
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
          <li>
            <img src="./images/dummy.jpg" alt="" />
          </li>
          <li>
            <img src="./images/dummy.jpg" alt="" />
          </li>
        </ul>
      </section>
      <section className="kohei">
        <h2 className="kohei__tit01">
          <img src="./images/kohei_name.svg" alt="植村康平" />
        </h2>
        <div className="kohei__profile">
          <p>
            建築家であり、娘2人を育てる父親
            <br />
            名古屋市名東区西山商店街を拠点にまちづくり活動を行う。
            <br />
            植村康平建築設計事務所を主宰し、ニシヤマナガヤ、
            <br />
            未完美術館、暮らせる図書館の運営にも携わる。
            <br />
            仕組みづくり、空間づくり、ものづくりが得意な、
            <br />
            元高校球児。
          </p>
        </div>
        <img className="kohei__msg" src="./images/kohei_msg.svg" alt="" />
        <img className="kohei__pic" src="./images/kohei_pic.png" alt="" />
      </section>
      <div className="area02__loop">
        <div className="area02__loop-inner">
          <img className="area02__loop-item01" src="./images/logo_loop01.svg" alt="" />
          <img className="area02__loop-item02" src="./images/logo_loop01.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Area02;
