class heap{
    //left is 2i+1 right 2i+2
    constructor(arr, comparator){
        this.arr = arr;
        this.comparator = comparator;
        this.build_heap();
    }
    
    heapify(i){
        //only if the node on the left or right of arr[i] is a heap
        let l = i*2+1;
        let r = i*2+2;
        let largest = -1;
        if(l<this.arr.length && this.comparator(this.arr[i], this.arr[l])){
            largest = l;
        }else{
            largest = i;
        }
        if(r<this.arr.length && this.comparator(this.arr[largest], this.arr[r])){
            largest = r;
        }
        if(largest != i){
            [this.arr[i], this.arr[largest]] = [this.arr[largest], this.arr[i]];
            //calling the function from the changed element
            this.heapify(largest);
        }
    }
    build_heap(){
       for(let i = Math.floor(this.arr.length/2)-1; i > -1; --i){
            this.heapify(i);
       } 
    }
    sort(){
        //O:(n*log n)
        let result = []
        while(this.arr.length){
            [this.arr[0], this.arr[this.arr.length-1]] = [this.arr[this.arr.length-1], this.arr[0]];
            result.push(this.arr.pop())
            this.heapify(0);
        }
        return result;
    }
}
