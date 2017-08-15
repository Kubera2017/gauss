'use strict';
var gauss = require('../gauss');

var data = [10, 10, 12, 12, 12, 13, 20];
var prob = 0.095;

var alpha = gauss.mean(data);
var sigma = gauss.deviation(data, alpha);
var value = gauss.getValueByProb(prob, alpha, sigma);

console.log('Data: ', data);
console.log('Alpha: ' + alpha);
console.log('Sigma: ' + sigma);
console.log('Value: ' + value + ' with probability ' + prob);
