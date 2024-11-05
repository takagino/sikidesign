import { useState, useEffect, useRef, useCallback } from 'react';

/* Adobe Fonts */
import { useAdobeFonts } from 'react-adobe-fonts';

/* microCMS */
import { createClient } from "microcms-js-sdk";
const client = createClient({
  serviceDomain: 'trident-siki',
  apiKey: 'njTA6TqvzUJplKviGd3xCBgb1p0oEKWVpau2',
});

/* GSAP */
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

/* Swiper */
import { Swiper } from "swiper/react";
import "swiper/css";

const App = () => {
  const [note, setNote] = useState([]);
  const [connection, setConnection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const dragRef = useRef(null);
  const [dragValue, setDragValue] = useState({
    down: "false",
    move: "false",
    x: "",
    y: "",
    scrollLeft: "",
    scrollTop: "",
  });

  const onLoading = useCallback(() => {
    setIsLoading(true)
  }, []);

  const onActive = useCallback(() => {
    setIsLoading(false)
    setIsActive(true)
  }, []);

  useAdobeFonts({
    kitId: 'rom5mlp',
    onLoading,
    onActive,
  });

  useEffect(() => {
    client
      .get({
        endpoint: 'note',
      })
      .then((res) => {
        setNote(res.contents);
      })
      .catch((err) => console.log(err));
    client
      .get({
        endpoint: 'connection',
      })
      .then((res) => {
        setConnection(res.contents);
      })
      .catch((err) => console.log(err));
  }, []);

  const refMouseDown = (e) => {
    e.preventDefault();
    setDragValue({
      ...dragValue,
      down: "true",
      move: "false",
      x: e.clientX.toString(),
      y: e.clientY.toString(),
      scrollLeft: dragRef.current.scrollLeft.toString(),
      scrollTop: dragRef.current.scrollTop.toString(),
    });
    return false;
  };

  const refMouseUp = (e) => {
    e.preventDefault();
    setDragValue({
      ...dragValue,
      down: "false",
    });
    return false;
  }

  const refMouseMove = (e) => {
    if (dragRef.current && dragValue.down === "true") {
      e.preventDefault();
      const move_x = Number(dragValue.x) - e.clientX;
      const move_y = Number(dragValue.y) - e.clientY;
      if (move_x !== 0 || move_y !== 0) {
        setDragValue({
          ...dragValue,
          move: "true",
        });
      } else {
        return;
      }
      dragRef.current.scrollLeft = Number(dragValue.scrollLeft) + move_x;
      dragRef.current.scrollTop = Number(dragValue.scrollTop) + move_y;

      return false;
    };
  }

  const refClick = (e) => {
    if (dragValue.move === "true") {
      return false;
    }
  }

  const container = useRef();
  useGSAP(() => {
    // gsap.to('.url', {
    //   x: 360,
    //   duration: 5,
    //   repeat: -1,
    //   ease: 'none',
    // });
  },
    { scope: container }
  );

  return (
    <div className='container' onMouseDown={refMouseDown} onMouseUp={refMouseUp} onMouseMove={refMouseMove} onClick={refClick} ref={dragRef}>
      <div className='container__inner'>
        <section className='no01'>
          <h1 className='no01__tit01'><img src="./images/01_tit01.svg" alt="SiKidesign" /></h1>
          <img className='no01__pic01' src="./images/dummy.jpg" alt="" />
          <img className='no01__tit02' src="./images/01_tit02.svg" alt="しくみキュレーションによって" />
          <p className='no01_txt01'>この世にある様々な<br />
            色、式、織、職、指揮、志気、四季、士気、四気、始期…<br />
            に新たな価値を与え、そしてまちを楽しく豊かにします</p>
        </section>
        <section className='no02'>
          <h2 className='no02__tit01'><img src="./images/02_tit01.svg" alt="しくみの役目" /></h2>
          <p className='no02__txt01'>一方に場があり 一方に人がいて 一方にモノがある<br />
            それぞれ何も手を加えなければ<br />
            何も関わりのないただの場と人とモノです<br />
            でも そこに「しくみ」が加わると<br />
            場と人とモノの間につながりが生まれ<br />
            それによって 場が新しい姿に変化したり<br />
            ひとりからコミュニティに変化したり<br />
            モノに違うストーリーがついたり<br />
            新たな面白さや価値が生まれます</p>
          <img className='no02__img01' src="./images/02_img01.svg" alt="一般的なしくみは足し算であることが多い、でもSiKidesignは違います" />
        </section>
        <section className='no03'>
          <h2>
            <img className='no03__tit01' src="./images/03_tit01.svg" alt="しくみキュレーション" />
            <img className='no03__tit02' src="./images/03_tit02.svg" alt="って何？" />
          </h2>
          <p className='no03__txt01'>SiKi designが手がける 「しくみキュレーション」とは、<br />
            場 人 モノ 見えるもの 見えないもの<br />
            さまざまな要素をSiKi designが考える<br />
            「しくみ」によって<br />
            集め つなぎ合わせ 掛け合わせることで<br />
            まだこの世にない新しい価値<br />
            生み出すことです<br />
            その新しい価値は<br />
            まちの人々の 楽しみ 面白さ 豊かさにつながる<br />
            新しい価値となります</p>
        </section>
        <section className='no04'>
          <h2 className='no04__tit01'><img src="./images/04_tit01.svg" alt="まちをたのしく" /></h2>
          <p className='no04__txt01'>場と人とモノの関わりは まちを構成するパーツです<br />
            わたしたちは、場と人とモノをつなぐしくみを生み出すことで<br />
            たくさんのまちのパーツを生み出すことになると考えています<br />
            パーツが増えるほど まちは多面的で彩り豊かになります<br />
            しくみキュレーションは<br />
            まちをたのしくします</p>
        </section>
        <section className='no05'>
          <h2 className='no05__tit01'><img src="./images/05_tit01.svg" alt="しくみキュレーターの役割" /></h2>
          <p className='no05__txt01'>しくみキュレーションを行う私たちは 「しくみキュレーター」!<br />
            そこにどんな仕組みがあると面白いか?を考え クリエイトすることが役割です<br />
            ・既存の枠組みにとらわれず フラットな視点で場と人とモノを眺める<br />
            ・人の無意識的な感度にアンテナを貼り顕在化する<br />
            ・場や人やモノの勢いはそのまま活かし より楽しい流れになるよう整える<br />
            ・空想妄想で終わらせるのではなく 実際に現実化するよう組み立てる<br />
            こういったことを大切に<br />
            場と人とモノ あらゆるものを繋いでいきます</p>
          <img className='no05__img01' src="./images/05_img01.svg" alt="" />
        </section>
        <section className='no06'>
          <h2 className='no06__tit01'><img src="./images/06_tit01.svg" alt="SiKi designに相談したい" /></h2>
          <form className='no06__form01' action="">
            <ul className='no06__list01'>
              <li><label><input type="checkbox" /><span>持て余している空き家がある</span></label></li>
              <li><label><input type="checkbox" /><span>コミュニティをつくりたい</span></label></li>
              <li><label><input type="checkbox" /><span>まだ世にない新しいものをつくりたい</span></label></li>
              <li><label><input type="checkbox" /><span>話を聞かせてほしい（視察依頼）</span></label></li>
              <li><label><input type="checkbox" /><span>その他</span></label></li>
            </ul>
            <ul className='no06__list02'>
              <li><label><input type="checkbox" /><span>今あるスペースをもっと活用したい</span></label></li>
              <li><label><input type="checkbox" /><span>場づくりをしたい</span></label></li>
              <li><label><input type="checkbox" /><span>まちの中で何か面白いことをやりたい</span></label></li>
              <li><label><input type="checkbox" /><span>話をしてほしい（講演依頼）</span></label></li>
              <li><label><input type="checkbox" /><span>やる気と熱意はある！！</span></label></li>
            </ul>
          </form>
          <img className='no06__img01' src="./images/06_img01.svg" alt="" />
        </section>
        <section className='kohei'>
          <h2 className='kohei_tit01'><img src="./images/kohei_name.svg" alt="植村康平" /></h2>
        </section>
      </div>
    </div>
  );
};

export default App;
