import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';

/* useMedia */
import { isMobile } from 'react-device-detect';

/* Adobe Fonts */
import { useAdobeFonts } from 'react-adobe-fonts';

/* Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

/* microCMS */
import { createClient } from 'microcms-js-sdk';
const client = createClient({
  serviceDomain: 'trident-siki',
  apiKey: 'njTA6TqvzUJplKviGd3xCBgb1p0oEKWVpau2',
});

/* GSAP */
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

/* Swiper */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

let zoomLevel = 5;
let minLevel = 2;
let maxLevel = 6;
let rangeLevel = 1;

const App = () => {
  const [note, setNote] = useState([]);
  const [connection, setConnection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const container = useRef(null);
  const dragRef = useRef(null);
  const targetRef = useRef(null);
  const [dragValue, setDragValue] = useState({
    down: 'false',
    move: 'false',
    x: '',
    y: '',
    scrollLeft: '',
    scrollTop: '',
  });
  const [pinchValue, setPinchValue] = useState({
    startDistance: 0,
    currentDistance: 0,
    initialScale: 1,
    currentScale: zoomLevel,
  });

  const onLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const onActive = useCallback(() => {
    setIsLoading(false);
    setIsActive(true);
  }, []);

  //Adobe Fontsの設定
  useAdobeFonts({
    kitId: 'rom5mlp',
    onLoading,
    onActive,
  });

  //microCMSからデータ取得
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

  //モバイル時のフォントサイズとコンテナ幅の設定
  useLayoutEffect(() => {
    if (isMobile) {
      zoomLevel = 3;
    }
    document.body.style.fontSize = `${(17 * zoomLevel) / 5}px`;
    container.current.style.width = `${zoomLevel * 1000}px`;
  }, [container]);

  //ターゲットの位置にスクロール
  useLayoutEffect(() => {
    const target = targetRef.current.getBoundingClientRect();
    const left = target.left - (window.innerWidth / 2 - target.width / 2);
    const top = target.top - (window.innerHeight / 2 - target.height / 2);
    dragRef.current.scrollLeft = left;
    dragRef.current.scrollTop = top;
    setDragValue({
      ...dragValue,
      scrollLeft: left.toString(),
      scrollTop: top.toString(),
    });
  }, [targetRef]);

  //ドラッグ処理
  const refMouseDown = (e) => {
    e.preventDefault();
    setDragValue({
      ...dragValue,
      down: 'true',
      move: 'false',
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
      down: 'false',
    });
    return false;
  };

  const refMouseMove = (e) => {
    if (dragRef.current && dragValue.down === 'true') {
      e.preventDefault();
      const move_x = Number(dragValue.x) - e.clientX;
      const move_y = Number(dragValue.y) - e.clientY;
      if (move_x !== 0 || move_y !== 0) {
        setDragValue({
          ...dragValue,
          move: 'true',
        });
      } else {
        return;
      }
      dragRef.current.scrollLeft = Number(dragValue.scrollLeft) + move_x;
      dragRef.current.scrollTop = Number(dragValue.scrollTop) + move_y;

      return false;
    }
  };

  const refClick = (e) => {
    if (dragValue.move === 'true') {
      return false;
    }
  };

  //ピンチ処理
  const refTouchStart = (e) => {
    if (e.touches.length === 2) {
      setPinchValue({
        ...pinchValue,
        startDistance: Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        ),
        initialScale: pinchValue.currentScale,
      });
    } else if (e.touches.length === 1) {
      setDragValue({
        ...dragValue,
        down: 'true',
        move: 'false',
        x: e.touches[0].clientX.toString(),
        y: e.touches[0].clientY.toString(),
        scrollLeft: dragRef.current.scrollLeft.toString(),
        scrollTop: dragRef.current.scrollTop.toString(),
      });
    }
    return false;
  };

  const refTouchEnd = (e) => {
    setDragValue({
      ...dragValue,
      down: 'false',
    });
    return false;
  };

  const refTouchMove = (e) => {
    if (e.touches.length === 2) {
      const currentDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      zoomLevel = (currentDistance / pinchValue.startDistance) * pinchValue.initialScale;
      setPinchValue({
        ...pinchValue,
        currentDistance,
        currentScale: zoomLevel,
      });

      if (zoomLevel < minLevel) {
        zoomLevel = minLevel;
      } else if (zoomLevel > maxLevel) {
        zoomLevel = maxLevel;
      }
      document.body.style.fontSize = `${(17 * zoomLevel) / 5}px`;
      container.current.style.width = `${zoomLevel * 1000}px`;
    }
    if (dragRef.current && dragValue.down === 'true' && e.touches.length === 1) {
      const move_x = Number(dragValue.x) - e.touches[0].clientX;
      const move_y = Number(dragValue.y) - e.touches[0].clientY;
      if (move_x !== 0 || move_y !== 0) {
        setDragValue({
          ...dragValue,
          move: 'true',
        });
      } else {
        return;
      }
      dragRef.current.scrollLeft = Number(dragValue.scrollLeft) + move_x;
      dragRef.current.scrollTop = Number(dragValue.scrollTop) + move_y;
    }
    return false;
  };

  //ズーム処理
  const zoomUp = () => {
    if (zoomLevel < maxLevel) {
      zoomLevel += rangeLevel;
      document.body.style.fontSize = `${(17 * zoomLevel) / 5}px`;
      container.current.style.width = `${zoomLevel * 1000}px`;

      // setDragValue({
      //   ...dragValue,
      //   scrollLeft: left.toString(),
      //   scrollTop: top.toString(),
      // });
    }
  };

  const zoomDown = () => {
    if (zoomLevel > minLevel) {
      zoomLevel -= rangeLevel;
      document.body.style.fontSize = `${(17 * zoomLevel) / 5}px`;
      container.current.style.width = `${zoomLevel * 1000}px`;

      // setDragValue({
      //   ...dragValue,
      //   scrollLeft: left.toString(),
      //   scrollTop: top.toString(),
      // });
    }
  };

  //GSAPのアニメーション
  useGSAP(
    () => {
      gsap.fromTo(
        '.area02__loop-item01',
        {
          xPercent: -100,
        },
        {
          xPercent: 100,
          duration: 160,
          delay: -80,
          repeat: -1,
          ease: 'none',
        }
      );

      gsap.fromTo(
        '.area02__loop-item02',
        {
          xPercent: -200,
        },
        {
          xPercent: 0,
          duration: 160,
          repeat: -1,
          ease: 'none',
        }
      );

      gsap.fromTo(
        '.area06__loop-item01',
        {
          xPercent: 100,
        },
        {
          xPercent: -100,
          duration: 80,
          delay: -40,
          repeat: -1,
          ease: 'none',
        }
      );

      gsap.fromTo(
        '.area06__loop-item02',
        {
          xPercent: 0,
        },
        {
          xPercent: -200,
          duration: 80,
          repeat: -1,
          ease: 'none',
        }
      );

      gsap.fromTo(
        '.area07__loop-item01',
        {
          yPercent: -100,
        },
        {
          yPercent: 100,
          duration: 80,
          delay: -40,
          repeat: -1,
          ease: 'none',
        }
      );

      gsap.fromTo(
        '.area07__loop-item02',
        {
          yPercent: -200,
        },
        {
          yPercent: 0,
          duration: 80,
          repeat: -1,
          ease: 'none',
        }
      );

      gsap.fromTo(
        '.project__loop-item01',
        {
          yPercent: 100,
        },
        {
          yPercent: -100,
          duration: 160,
          delay: -80,
          repeat: -1,
          ease: 'none',
        }
      );

      gsap.fromTo(
        '.project__loop-item02',
        {
          yPercent: 0,
        },
        {
          yPercent: -200,
          duration: 160,
          repeat: -1,
          ease: 'none',
        }
      );

      function drop(el) {
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
          onComplete: () => {
            gsap.delayedCall(Math.random() * 2, drop, [el]);
          },
        });
      }

      drop('.object__img01');
      drop('.object__img02');
      drop('.object__img03');
      drop('.object__img04');
      drop('.object__img05');
      drop('.object__img06');
    },
    { scope: container }
  );

  return (
    <div
      className="container"
      onMouseDown={refMouseDown}
      onMouseUp={refMouseUp}
      onMouseMove={refMouseMove}
      onTouchStart={refTouchStart}
      onTouchEnd={refTouchEnd}
      onTouchMove={refTouchMove}
      onClick={refClick}
      ref={dragRef}
    >
      <div className="container__inner" ref={container}>
        <div className="area01">
          <section className="no01" ref={targetRef}>
            <h1 className="no01__tit01">
              <img src="./images/01_tit01.svg" alt="SiKidesign" />
            </h1>
            <img className="no01__pic01" src="./images/dummy.jpg" alt="" />
            <img
              className="no01__tit02"
              src="./images/01_tit02.svg"
              alt="しくみキュレーションによって"
            />
            <div className="no01__txt01">
              <p>
                この世にある様々な
                <br />
                色、式、織、職、指揮、志気、四季、士気、四気、始期…
                <br />
                に新たな価値を与え、そしてまちを楽しく豊かにします
              </p>
            </div>
          </section>
          <section className="news">
            <ul>
              <li>
                <time>2024.9.12 11:14</time>
                今日は進行中のプロジェクトの打ち合わせ。椙山女学園大学へ行ってきます
              </li>
            </ul>
          </section>
          <section className="no05">
            <h2 className="no05__tit01">
              <img src="./images/05_tit01.svg" alt="しくみキュレーターの役割" />
            </h2>
            <div className="no05__txt01">
              <p>
                しくみキュレーションを行う私たちは 「しくみキュレーター」!
                <br />
                そこにどんな仕組みがあると面白いか?を考え クリエイトすることが役割です
                <br />
                ・既存の枠組みにとらわれず フラットな視点で場と人とモノを眺める
                <br />
                ・人の無意識的な感度にアンテナを貼り顕在化する
                <br />
                ・場や人やモノの勢いはそのまま活かし より楽しい流れになるよう整える
                <br />
                ・空想妄想で終わらせるのではなく 実際に現実化するよう組み立てる
                <br />
                こういったことを大切に
                <br />
                場と人とモノ あらゆるものを繋いでいきます
              </p>
            </div>
            <img className="no05__img01" src="./images/05_img01.svg" alt="" />
          </section>
        </div>
        <div className="area02">
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
        <div className="area03">
          <section className="no03">
            <h2>
              <img className="no03__tit01" src="./images/03_tit01.svg" alt="しくみキュレーション" />
              <img className="no03__tit02" src="./images/03_tit02.svg" alt="って何？" />
            </h2>
            <div className="no03__txt01">
              <p>
                SiKi designが手がける 「しくみキュレーション」とは、
                <br />
                場 人 モノ 見えるもの 見えないもの
                <br />
                さまざまな要素をSiKi designが考える
                <br />
                「しくみ」によって
                <br />
                集め つなぎ合わせ 掛け合わせることで
                <br />
                まだこの世にない新しい価値
                <br />
                生み出すことです
                <br />
                その新しい価値は
                <br />
                まちの人々の 楽しみ 面白さ 豊かさにつながる
                <br />
                新しい価値となります
              </p>
            </div>
          </section>
          <section className="sachie">
            <h2 className="sachie__tit01">
              <img src="./images/sachie_name.svg" alt="藤野幸江" />
            </h2>
            <div className="sachie__profile">
              <p>
                まちコーディネーターであり暮らせる図書館の館長
                <br />
                百貨店に長く勤め、イベントの企画やチームマネジ
                <br />
                メントに携わった経験を活かして、現在の暮らせる
                <br />
                図書館で様々なコミュニティづくりを担っている。
                <br />
                2019年長女出産。趣味は星読みやコーヒー、絵を
                <br />
                描くことや神社巡りなど多岐に渡る。
              </p>
            </div>
            <img className="sachie__msg" src="./images/sachie_msg.svg" alt="" />
            <img className="sachie__pic" src="./images/sachie_pic.png" alt="" />
          </section>
        </div>
        <div className="area04">
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
        <div className="area05">
          <section className="no06">
            <h2 className="no06__tit01">
              <img src="./images/06_tit01.svg" alt="SiKi designに相談したい" />
            </h2>
            <form className="no06__form01" id="contact" name="contact" action="">
              <ul className="no06__list01">
                <li>
                  <label>
                    <input id="item01" name="item01" type="checkbox" />
                    <span>持て余している空き家がある</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input id="item02" name="item02" type="checkbox" />
                    <span>コミュニティをつくりたい</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input id="item03" name="item03" type="checkbox" />
                    <span>まだ世にない新しいものをつくりたい</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input id="item04" name="item04" type="checkbox" />
                    <span>話を聞かせてほしい（視察依頼）</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input id="item05" name="item05" type="checkbox" />
                    <span>その他</span>
                  </label>
                </li>
              </ul>
              <ul className="no06__list02">
                <li>
                  <label>
                    <input id="item06" name="item06" type="checkbox" />
                    <span>今あるスペースをもっと活用したい</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input id="item07" name="item07" type="checkbox" />
                    <span>場づくりをしたい</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input id="item08" name="item08" type="checkbox" />
                    <span>まちの中で何か面白いことをやりたい</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input id="item09" name="item09" type="checkbox" />
                    <span>話をしてほしい（講演依頼）</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input id="item10" name="item10" type="checkbox" />
                    <span>やる気と熱意はある！！</span>
                  </label>
                </li>
              </ul>
            </form>
            <img className="no06__img01" src="./images/06_img01.svg" alt="" />
          </section>
        </div>
        <div className="area06">
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
        <div className="area07">
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
      </div>
      <div className="zoom">
        <button className="plus" onClick={zoomUp}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button className="minus" onClick={zoomDown}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
    </div>
  );
};

export default App;
