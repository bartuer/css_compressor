load('/Users/bartuer/local/src/re2c_hw_bench/SourceTokenizer.js');
load('/Users/bartuer/local/src/re2c_hw_bench/SourceCSSTokenizer.js');

css_text = read('/Users/bartuer/local/src/widget/collectionview/stylesheets/cv.css');
var css_tokenizer = new WebInspector['SourceCSSTokenizer']();
css_tokenizer.condition = css_tokenizer.initialCondition;
css_tokenizer.line = css_text;

var plainTextStart = 0;
var column = 0;
do {
  var newColumn = css_tokenizer.nextToken(column);
  var tokenType = css_tokenizer.tokenType;
  if (tokenType) {
    if (column > plainTextStart) {
      var plainText = css_text.substring(plainTextStart, column);
      print(plainText);
    }
    var token = css_text.substring(column, newColumn);
    switch (tokenType) {
    case ':':
      token = ':';
      break;
    case ';':
      token = ';';
      break;
    case '.':
      token = '.';
      break;
    case ',':
      token = ',';
      break;
    case '(':
      token = '(';
      break;
    case ')':
      token = ')';
      break;
    case '{':
      token = '{';
      break;
    case '}':
      token = '}';
      break;
    case 'newline':
      token = '--';
      break;
    case 'css-comment':
      token = '/**/';
      break;
    case 'indent':
      token = '?';
      break;
    default:
    }
    print(token);
    plainTextStart = newColumn;
  }
  column = newColumn;
} while (column < css_text.length)

if (plainTextStart < css_text.length) {
  var plainText = css_text.substring(plainTextStart, css_text.length);
  print(plainText);
}