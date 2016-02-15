
//.add(
//  "JSON.stringify(10K)",
//  "JSON.stringify(arr)",
//  {setup: "var arr = '01234567890abcdef'.repeat(10000).split('');"}
//)
//  .add(
//    "JSON.stringify(9.9K)",
//    "JSON.stringify(arr)",
//    {setup: "var arr = '01234567890abcdef'.repeat(9900).split('');"}
//  )
var timings1 = [],
  timings2 = [],
  count = 1000,
  arr,
  start,
  i;

arr = '01234567890abcdef'.repeat(10000).split('');
for(i = 0; i < count; i++) {
  start = process.hrtime();
  JSON.stringify(arr);
  timings1.push(process.hrtime(start));
}
timings1 = timings1.map(getFreq);

arr = '01234567890abcdef'.repeat(9900).split('');
for(i = 0; i < count; i++) {
  start = process.hrtime();
  JSON.stringify(arr);
  timings2.push(process.hrtime(start));
}
timings2 = timings2.map(getFreq);

//for(i = 0; i < count; i++) {
//  console.log(
//    [
//      timings1[i],
//      timings2[i]
//    ].join('\t')
//  );
//}
//console.log('=========');
//timings1.sort((a,b) => a - b);
//timings2.sort((a,b) => a - b);
//for(i = 0; i < count; i++) {
//  console.log(
//    [
//      timings1[i],
//      timings2[i]
//    ].join('\t')
//  );
//}
//console.log(getPlot(timings1).join('\n'));
//console.log('=========');
//console.log(getPlot(timings2).join('\n'));
//console.log('asd');
//var start2 = Date.now();
//var step = 10;
//var curDiff = 1000;
//var q1, w1;
//for(var i1 = 0; i1 <= count; i1+=step) {
//  for(var j1 = i1 + 1; j1 <= count; j1+=step) {
//    var tmp = getSigmas(timings1, i1, j1);
//    if(tmp < curDiff) {
//      curDiff = tmp;
//      q1 = i1;
//      w1 = j1;
//    }
//  }
//}
//console.log('qwe', Date.now() - start2);
//console.log(q1, w1);
timings1.sort((a,b) => a - b).slice(100, -100);
timings2.sort((a,b) => a - b).slice(100, -100);
console.log(
  timings1.reduce((a,b)=>a+b) / timings1.length,
  timings1[Math.round(timings1.length / 2)]
);
console.log(
  timings2.reduce((a,b)=>a+b) / timings2.length,
  timings2[Math.round(timings1.length / 2)]
);

//console.log(
//  timings1
//    .map(function(el, i, arr) {
//      return [
//        el,
//        (i + 1) / arr.length
//      ].join('\t');
//    })
//    .join('\n')
//);
//console.log('====================');
//console.log(
//  timings2
//    .map(function(el, i, arr) {
//      return [
//        el,
//        (i + 1) / arr.length
//      ].join('\t');
//    })
//    .join('\n')
//);

//var t1 = getSigmas(timings1, 0, 900)[0];
//var t2 = getSigmas(timings2, 0, 900)[0];
//console.log([t1, t2, t1 - t2].join('\t'));

function getSigmas(timings, i1, j1) {
  const sigma1 = 0.3413;
  const sigma2 = sigma1 + 0.1359;
  const sigma3 = sigma2 + 0.0214;
  timings.sort((a,b) => a - b);
  timings = timings.slice(i1, j1);
  var length = timings.length;
  var result1 = timings.slice(Math.round((0.5 - sigma1) * length), -Math.round((0.5 - sigma1) * length));
  var result2 = timings.slice(Math.round((0.5 - sigma2) * length), -Math.round((0.5 - sigma2) * length));
  var result3 = timings.slice(Math.round((0.5 - sigma3) * length), -Math.round((0.5 - sigma3) * length));

  var delta1 = (result1[result1.length - 1] - result1[0]) / 2;
  var delta2 = (result2[result2.length - 1] - result2[0]) / 2;
  var delta3 = (result3[result3.length - 1] - result3[0]) / 2;

  //console.log(result1.length, result2.length, result3.length);
  //console.log(delta1, delta2, delta3);
  //console.log(delta2 / delta1, delta3 / delta1);
  return [result1[result1.length - 1] - delta1, delta1];
  //return Math.abs((delta2 / delta1) / 2 - 1) + Math.abs((delta3 / delta1) / 3 - 1);
}


function getFreq(timing) {
  return (timing[0] * 1e9 + timing[1]) / 1e9;
}
//
//function getPlot(timings) {
//  var countIntervals = 16;
//  var min = timings.reduce((a,b)=>Math.min(a, b));
//  var max = timings.reduce((a,b)=>Math.max(a, b));
//  var interval = (max-min) / countIntervals;
//  var i;
//  var result = new Array(countIntervals);
//  for(i = 0; i < countIntervals + 1; i++) {
//    result[i] = 0;
//  }
//
//  for(i = 0; i < timings.length; i++) {
//    result[Math.floor((timings[i] - min) / interval)]++;
//  }
//  return result;
//}