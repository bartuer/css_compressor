load('/Users/bartuer/local/src/re2c_hw_bench/SourceTokenizer.js');
load('/Users/bartuer/local/src/re2c_hw_bench/SourceCSSTokenizer.js');

(function (a) {
  if (!a[0]) {
     print("Usage: this -- filename.js");
     quit(1);
  }
  var css_text = '';
  try {
     css_text = read(a[0]);
   } catch(e) {
      print("cssMin: Couldn't open file '" + a[0] + "'.");
      quit(2);
   }

  var css_tokenizer = new WebInspector['SourceCSSTokenizer']();
  css_tokenizer.condition = css_tokenizer.initialCondition;
  css_tokenizer.line = css_text;

  var output = [];
  var plainTextStart = 0;
  var column = 0;
  do {
    var newColumn = css_tokenizer.nextToken(column);
    var tokenType = css_tokenizer.tokenType;
    if (tokenType) {
      if (column > plainTextStart) {
        var plainText = css_text.substring(plainTextStart, column);
        output.push(plainText);
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
        token = '';
        break;
      case 'css-comment':
        token = '';
        break;
      default:
      }
      output.push(token);
      plainTextStart = newColumn;
    }
    column = newColumn;
  } while (column < css_text.length);

  if (plainTextStart < css_text.length) {
    var plainText = css_text.substring(plainTextStart, css_text.length);
    output.push(plainText);
  }
  print(output.join(""));
})(arguments);