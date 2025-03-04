import React from 'react';

const Area01 = ({ targetRef }) => {
  return (
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
  );
};

export default Area01;
