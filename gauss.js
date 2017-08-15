'use strict';

// Mathematical expectation
exports.mean = function (numbers) {
    var alpha = 0;
    for (var i = 0; i < numbers.length; i++) {
        alpha += numbers[i];
    }
    alpha /= numbers.length;
    return alpha;
}

// Standard deviation
exports.deviation = function (numbers, alpha){
    var sigma = 0;
    for (var i = 0; i < numbers.length; i++) {
        sigma += Math.pow((numbers[i] - alpha), 2);
    }
    sigma = Math.sqrt((sigma / numbers.length));
    return sigma;
}

// Error function
var erf = function (x) {
    const epsilon = 0.001;

    var result = 0;
	var n = 0;
	
	while (true){
		var member = 1;
        for (var i = 1; i <= n; i++) {
            member *= (-1) * Math.pow(x, 2) / i;
        }
		member *= (x / (2 * n + 1));
		//console.log("Member ", n, member);
		result += member;
		if(Math.abs(member) <= epsilon){
			break;
		}
		else{
			n++;
		}
	}

    result *= 2 / Math.sqrt(Math.PI);
    return result;
}

// Cumulative distribution function
var cdf = function (x, alpha, sigma) {
    var calcedProb = 1 / 2 * (1 + erf((x - alpha) / (sigma * Math.sqrt(2))));
	if (calcedProb > 1) {return 1;}
	else {if (calcedProb < 0) {return 0;}
	else{return calcedProb;}} 
}


// Value with target probability
exports.getValueByProb = function (prob, alpha, sigma) {
    const acc = 0.001;

    var point = alpha;
    var step = alpha / 2;
    var counter = 0;
    var lastResult;

    lastResult = cdf(point, alpha, sigma);
    while (true) {
        if (Math.abs(prob - lastResult) <= acc) {
            //console.log('Steps: ' + counter+ ' CalcedProb: '+ lastResult);
            return point;
        }
        else {
            //console.log('Step ' + counter + ' Point: ' + point + ' Prob: ' + lastResult);
            if ((lastResult - prob) > 0) {
                lastResult = cdf((point - step), alpha, sigma);
                if (lastResult > prob) {
                    point = point - step;
                }
                else {
                    point = point - step;
                    step /= 2;
                }
            }
            else {
                lastResult = cdf((point + step), alpha, sigma);
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
		counter++;
    }
}



