import React from 'react';

const Area03 = () => {
  return (
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
  );
};

export default Area03;
