var child_process = require('child_process');

var totalTime = 0,
  fastest = {},
  results = {}
  ;

for (var i = 0; i < 100; i++) {
  var result = JSON.parse(
    child_process.execSync(`node ${__dirname}/${process.argv[2]}`)
  );
  totalTime += result.totalTime;
  fastest[result.fastest] = fastest[result.fastest] || 0;
  fastest[result.fastest]++;
  for (var name in result.results) {
    results[name] = results[name] || [];
    results[name].push(result.results[name]);
  }
}

console.log('totalTime', totalTime);
console.log('fastest', fastest);
for (var name in results) {
  var min = results[name].reduce((a, b) => Math.min(a, b));
  var max = results[name].reduce((a, b) => Math.max(a, b));
  var diff = ((max - min) / 2) / ((max + min) / 2);
  console.log(`${name}. min: ${min.toFixed(2)}, max: ${max.toFixed(2)}, +-(%): ${(diff * 100).toFixed(1)}`);
}