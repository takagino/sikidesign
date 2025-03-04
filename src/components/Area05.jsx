import React from 'react';

const Area05 = () => {
  return (
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
  );
};

export default Area05;
