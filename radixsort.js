
function countDigits(k){
    if(k==0) return 1;
    return k>0 ? Math.floor(Math.log10(k)+1) : Math.floor(Math.log10(-k)+1);
}
function maxDigitsInArr(arr){
    let max = 0;
    for(let value of arr){
        digits = countDigits(value)
        if(digits > max) max = digits;
    }
    return max;
}

function countingSort(arr, digit, radix = 10){ 
    let helper = new Array(radix).fill(0); //for 1 digit only
    let sorted = new Array(arr.length).fill(0);
    for(let i = 0; i<arr.length; i++){
        let iDigit = (arr[i]/radix**digit)%radix; 
        helper[iDigit]++;
    }
    console.log(helper);
    for(let i = 1; i<radix; i++){
        helper[i] += helper[i-1];
    }
    console.log(helper);
    for(let i = arr.length-1; i>-1; i--){
        let iDigit = (arr[i]/radix**digit)%radix; 
        helper[iDigit]--;
        sorted[helper[iDigit]] = arr[i];
    }
    return sorted;
}

function radixSort(arr){
    
}
