export function averageOfArray (num_a : number[]) : number {
    let sum = sumOfArray (num_a);
    let average = sum / num_a.length;
    return average;
}

export function rmsOfArray (num_a : number[]) : number {
    let variance = varianceOfArray (num_a);
    let rms = Math.sqrt (variance);
    return rms
}

export function sumOfArray (num_a :number[]) : number {
    let sum = 0;
    for( let i = 0; i < num_a.length; i++ ){
	sum += num_a[i];
    }
    return sum;
}

export function sumROfArray (num_a : number[]) : number {
    let sum = 0;
    if (num_a.length)
    {
	sum = num_a.reduce(function(a, b) { return a + b; });
    }
    return sum;
}

export function varianceOfArray (num_a : number[]) : number {
    let average = averageOfArray (num_a);
    let sum2 = 0;
    let variance = 0;
    for( let i = 0; i < num_a.length; i++ ){
	sum2 += (num_a[i])**2;
    }
    variance = (sum2 / num_a.length) - (average)**2;
    return variance;
}

