'use strict';
const userNameInput = document.getElementById('user-name');       //htmlファイルとリンクしている
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {　　　　　　 //　while文...与えられた論理式がtrueである場合実行し続ける制御文　今回の場合、診断実行の2回目以降trueで消す、falseになって次に進む
    //↑子ども要素がある限り　↓(子ども要素を)削除
    element.removeChild(element.firstChild);　　//remove=消す
  }
}

assessmentButton.onclick = () => {   //ボタンをクリックしたときに返す反応 //無名関数
    const userName = userNameInput.value;　//userNameInputのvalue（値）を取得
    if (userName.length === 0) {　　　//length…文字列の長さ
        //名前が空の時（0文字の時）は処理を終了する
        return;
    }

    //診断結果表示エリアの作成
    removeAllChildren(resultDivided);
   
    const header = document.createElement('h3');　//見出し　「診断結果」　　子要素として(appendchild)　変数の宣言はh3、pでもよい(このほうがわかりやすい?)　　
    header.innerText = '診断結果';
    resultDivided.appendChild(header);            //resultDivided...result-area

    const paragraph = document.createElement('p'); //createElement…要素を追加する
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);　　　　　//初期化（子要素の削除）
    const a = document.createElement('a');   //author をa と宣言
    const href =　                      //hrefValue　をhrefと宣言
    'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw'

　  a.setAttribute('href', href);            //HTML内の'href'をhrefという名前に設定する
    a.className = 'tweet-hashtag-button';　　//classNameという専用のプロパティ
    a.setAttribute('data-text', '診断結果の文章');
    a.innerText = 'tweet #あなたのいいところ';　//aタグの中の文章を　''内としておく
    tweetDivided.appendChild(a);

    // widgets.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');      //https..URIのスキーム　twitter.com..ホスト名　intent/..リソース名　？～クエリ
    tweetDivided.appendChild(script);
};

const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */

function assessment(userName) {
　//　TODO 診断処理を実装する。
  let number = 0;                               //syokika
  for (let i = 0; i < userName.length; i++) {   //for文　初期化し、ユーザ名の添え字を取得し、一つの数値を取得
      number += userName.charCodeAt(i);
  }
  let index = number % answers.length;　　　　　 //取得した数値を添え字の数で割って余りを求める
  return answers[index].replace(/\{userName\}/g, userName);　//余りを（文字として）返し、userNameにユーザ名を置き換える,正規表現
}
console.log(assessment('あいうえお'));
console.assert(　　　//　assertで間違った部分だけ表示されるためテストに使われる
    assessment('太郎') ===
      '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
console.assert(  //第1引数にテストしたい式、trueなら何も表示されない。falseなら第2引数がコンソールに表示される
    assessment('太郎')　=== assessment('太郎'),
    'false'
);
