var Benchmark = require('benchmark'),
  suite = new Benchmark.Suite
  ;
var start = Date.now();
suite
  .add(
    "JSON.stringify(10K)",
    "JSON.stringify(arr)",
    {setup: "var arr = '01234567890abcdef'.repeat(10000).split('');"}
  )
  .add(
    "JSON.stringify(9.9K)",
    "JSON.stringify(arr)",
    {setup: "var arr = '01234567890abcdef'.repeat(9900).split('');"}
  )
  .on('complete', function() {
    var result = {
      totalTime: Date.now() - start,
      fastest: this.filter('fastest').map('name')[0],
      results: this.reduce(function(hash, el) {
        hash[el.name] = 1 / (el.stats.mean + el.stats.moe);
        return hash;
      }, {})
    };
    console.log(JSON.stringify(result));
  })
  // run async
  .run({ 'async': false });
