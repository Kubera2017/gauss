'use strict';

var data = [10, 10, 12, 12, 12, 13, 20];
var prob = 0.95;  // prob {0.021 - 0.979}

var alpha = getAlpha(data);
var sigma = getSigma(data, alpha);
var time = getTimeByProb2(prob, alpha, sigma);

console.log('Data: ', data);
console.log('Alpha: ' + alpha);
console.log('Sigma: ' + sigma);
console.log('Time: ' + time + ' with probability ' + prob);

// Мат.ожидание
function getAlpha(numbers) {
    var alpha = 0;
    for (var i = 0; i < numbers.length; i++) {
        alpha += numbers[i];
    }
    alpha /= numbers.length;
    return alpha;
}

// Среднеквадратичное отклонение
function getSigma(numbers, alpha){
    var sigma = 0;
    for (var i = 0; i < numbers.length; i++) {
        sigma += Math.pow((numbers[i] - alpha), 2);
    }
    sigma = Math.sqrt((sigma / numbers.length));
    return sigma;
}

// Функция ошибок
function erf(x) {
    const depth = 10;

    var result = 0;
    for (var n = 0; n < depth; n++) {
        var member = 1;
        for (var i = 1; i <= n; i++) {
            member *= (-1) * Math.pow(x, 2) / i;
        }
        member *= (x / (2 * n + 1));
        result += member;
    }
    result *= 2 / Math.sqrt(Math.PI);
    return result;
}

// Функция распределения
function calcProb(x, alpha, sigma) {
    //console.log('me');
    return 1 / 2 * (1 + erf((x - alpha) / (sigma * Math.sqrt(2))));
}

// Время выполнения работы с заданной вероятностью v 1.0 15 calls
function getTimeByProb(prob, alpha, sigma) {
    const accur = 0.001;

    var point = alpha;
    var step = alpha / 2;
    var counter = 0;
    while (true) {
        var pointProb = calcProb(point, alpha, sigma);
        if (Math.abs(prob - pointProb) <= accur) {
            //console.log('Steps: ' + counter+ ' CalcedProb: '+ pointProb);
            return point;
        }
        else {
            //console.log('Step ' + counter + ' Point: ' + point + ' Prob: ' + pointProb);
            if ((pointProb- prob) > 0) {
                if (calcProb((point - step), alpha, sigma) > prob) {
                    point = point - step;
                }
                else {
                    point = point - step;
                    step /= 2;
                }
            }
            else {
                if (calcProb((point + step), alpha, sigma) < prob) {
                    point = point + step;
                }
                else {
                    point = point + step;
                    step /= 2;
                }
            }
            // console.log(step);
        }

        if (counter > 100) {
            return NaN;
        } else { counter++; }
    }
}

// Время выполнения работы с заданной вероятностью v 2.0 8 calls
function getTimeByProb2(prob, alpha, sigma) {
    const accur = 0.001;

    var point = alpha;
    var step = alpha / 2;
    var counter = 0;
    var lastResult;

    lastResult = calcProb(point, alpha, sigma);
    while (true) {
        if (Math.abs(prob - lastResult) <= accur) {
            //console.log('Steps: ' + counter+ ' CalcedProb: '+ pointProb);
            return point;
        }
        else {
            //console.log('Step ' + counter + ' Point: ' + point + ' Prob: ' + pointProb);
            if ((lastResult - prob) > 0) {
                lastResult = calcProb((point - step), alpha, sigma);
                if (lastResult > prob) {
                    point = point - step;
                }
                else {
                    point = point - step;
                    step /= 2;
                }
            }
            else {
                lastResult = calcProb((point + step), alpha, sigma);
                if (lastResult < prob) {
                    point = point + step;
                }
                else {
                    point = point + step;
                    step /= 2;
                }
            }
            // console.log(step);
        }

        if (counter > 100) {
            return NaN;
        } else { counter++; }
    }
}



