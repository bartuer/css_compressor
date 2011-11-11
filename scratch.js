load('/Users/bartuer/local/src/re2c_hw_bench/parserlib.js');

parser = new parserlib.css.Parser({
  starHack: true,
  ieFilters: true,
  underscoreHack: true,
  strict: false
});
var css_text = read('/Users/bartuer/local/src/widget/collectionview/stylesheets/z.css');
        parser.addListener("property", function(event){
          print(event.property.text);
        });

parser.parse(css_text);
