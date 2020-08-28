var express = require('express');
var router = express.Router();

/*GETリクエストで呼び出し*/
router.get('/', function(req, res, next) {
  const result = "";
  res.render('index',{result : result});
});


/*POST送信時に実行*/
router.post('/', (req, res, next) => {
  const url = 'https://api.a3rt.recruit-tech.co.jp/text_summarization/v1';
  const apikey = 'XXXXXXXXXXXX';
  const request = require('request');
  var result = ""; //結果を格納
  var separation = req.body.lang; //フォームから言語設定を取得

  //言語設定で句読点を決定する
  switch(separation){
    case "ja":
      separation =  "。";
      break;
    case "en":
      separation = ".";
      break;
    default:
      result ="言語を選択してください";
  }

  var options = {
    uri: url,
    json: true,
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    form: { //index.ejsのフォームからデータを所得
      "apikey": apikey,
      "sentences": req.body.sentences, 
      "linenumber" : req.body.linenumber,
      "separation" : separation,
    }
  };

  request.post(options, function(error, response, body){
    result = body.summary.join(separation) + separation; //要約文をつなげる
    res.render('index', {result : result}); //要約結果を返す
  }); 

})


module.exports = router;
