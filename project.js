
let randomize_array=document.getElementById("randomize_array_btn");
bub_sort=document.getElementById("bubble_sort");
ins_sort=document.getElementById("insertion_sort");
sel_sort=document.getElementById("selection_sort");
merg_sort=document.getElementById("merge_sort");
quik_sort=document.getElementById("quick_sort");
hep_sort=document.getElementById("heap_sort");
bars_container=document.getElementById("bars_container");
min_range=1;
max_range=100;
let unsorted_arr;
let num_of_bars=50;
unsorted_arr = new Array(num_of_bars);
let heightfactor=5.5;


function random_num(mini,maxi){
    return Math.floor(Math.random()*(maxi-mini+1)) + mini;
}

function create_random_array(){
    for(let i =0;i<unsorted_arr.length;i++){
        unsorted_arr[i]=random_num(min_range,max_range);
    }
}

document.addEventListener("DOMContentLoaded",function(){
    create_random_array();
    draw_bars(unsorted_arr);
});
function draw_bars(array){
    for(let i =0;i<array.length;i++){
        let bar=document.createElement("div");
        bar.classList.add('bar');
        bar.style.height=array[i] * heightfactor +'px';
        bars_container.appendChild(bar);
    }
}
randomize_array.addEventListener('click',function(){
    create_random_array();
    bars_container.innerHTML='';
    draw_bars(unsorted_arr);
});

function sleep(ms){
    return new Promise((resolve)=> setTimeout(resolve,ms));
}

async function bubble_sort(array){
    let bars=document.getElementsByClassName("bar");
    for(let i=0;i<array.length;i++){
        for(let j=0;j<array.length-i-1;j++){
            if(array[j]>array[j+1]){
                for(let k=0;k<bars.length;k++){
                    if(k==j || k==j+1) continue;
                    bars[k].style.backgroundColor='blue';
                }
                let temp=array[j];
                array[j]=array[j+1];
                array[j+1]=temp;
                bars[j].style.height=array[j]*heightfactor +'px';
                bars[j].style.backgroundcColor='aqua';
                // bars[j].innerText=array[j];
                bars[j+1].style.height=array[j+1]*heightfactor +'px';
                bars[j+1].style.backgroundColor='aqua';
                // bars[j+1].innerText=array[j+1];
                await sleep(15);
            }
        }
        await sleep(15);
    }
    return array;
}

async function insertion_sort(array){
    let bars=document.getElementsByClassName("bar");
    for(let j=1;j<array.length;j++ ){
        let key=array[j];
        let i=j-1;
        for(let k=0;k<=i;k++){
            bars[k].style.backgroundColor='blue';
        }
        bars[i+1].style.backgroundColor='aqua';
        while(i>=0 && array[i]>key){
            array[i+1]=array[i];
            bars[i+1].style.height=array[i+1]*heightfactor +'px';
            // bars[i+1].style.backgroundcColor='aqua';
            i--;
            await sleep(15);
        }
        array[i+1]=key;
        bars[i+1].style.height=key*heightfactor +'px';
        await sleep(15);
    }       
    return array;
}
async function selection_sort(array){
    let bars=document.getElementsByClassName("bar");
    let n=array.length;
    for(let j=0;j<n-1;j++){
        let smallest=j;
        bars[j].style.backgroundColor='green';
        await sleep(100);
        for(let i=j+1;i<n;i++){
            bars[i].style.backgroundColor='blue';
            if(array[i]<array[smallest]){
                bars[smallest].style.backgroundColor='blue';
                smallest=i;
                bars[i].style.backgroundColor='aqua';
            }
            await sleep(15);
        }
        let temp=array[j];
        array[j]=array[smallest];
        array[smallest]=temp;
        bars[j].style.height=array[j]*heightfactor +'px';
        bars[smallest].style.height=array[smallest]*heightfactor +'px';
        bars[j].style.backgroundColor='blue';
        bars[smallest].style.backgroundColor='blue';
        await sleep(15);
    }
    return array;
}
async function merge(start,end,mid,array){
    let bars=document.getElementsByClassName("bar");
    let left=[];
    let right=[];
    for(let i=start;i<=mid;i++){
        left.push(array[i]);
    }
    for(let i=mid+1;i<=end;i++){
        right.push(array[i]);
    }
    console.log(left);
    console.log(right);
    let k=start;
    let i=0,j=0;
    while(i<left.length && j<right.length){
        if(left[i]<=right[j]){
            array[k]=(left[i]);
            i++;
        }
        else{
            array[k]=(right[j]);
            j++;
        }
        k++;
        bars[k-1].style.height=array[k-1]*heightfactor +'px';
        bars[k-1].style.backgroundColor='blue';
        // 
    }
    while(i<left.length){
        if(mid==4) console.log(left[i]);
        array[k++]=(left[i]);
        i++;
        bars[k-1].style.height=array[k-1]*heightfactor +'px';
        bars[k-1].style.backgroundColor='blue';
        
    }
    while(j<right.length){
        if(mid==4) console.log(right[j]);
        array[k++]=(right[j]);
        j++;
        bars[k-1].style.height=array[k-1]*heightfactor +'px';
        bars[k-1].style.backgroundColor='blue';
    }
    for(let k=start;k<=end;k++){
        bars[k].style.backgroundColor='aqua';
        await sleep(50);
    }
    
    return array;
}
async function merge_sort(start,end,array){
    let bars=document.getElementsByClassName("bar");
    if(start>=end) return array;
    let mid=Math.floor((end+start)/2);
    merge_sort(start,mid,array);
    
    merge_sort(mid+1,end,array);
    for(let k=start;k<=end;k++){
        bars[k].style.backgroundColor='blue';
        await sleep(50);
    }
    merge(start,end,mid,array);
    await sleep(1500);
    return array;
} 
async function quick_sort(start,end,array){
    if(start>=end) return;

    let bars=document.getElementsByClassName("bar");
    const x=array[end];
    let i=start-1;
    let _switch=false;
    for(let j=start;j<=end-1;j++){
        if(array[j]<=x){
            i++;
            const temp=array[j];
            array[j]=array[i];
            array[i]=temp;
            bars[j].style.height=array[j]*heightfactor +'px';
            bars[i].style.height=array[i]*heightfactor +'px';
            for(let k=start;k<=j;k++){
                await sleep(20);
                if(_switch) bars[k].style.backgroundColor='aqua';
                else bars[k].style.backgroundColor='green';
            }
            _switch=!_switch;
        }
    }
    const temp=array[end];
    array[end]=array[i+1];
    array[i+1]=temp;
    bars[end].style.height=array[end]*heightfactor +'px';
    bars[i+1].style.height=array[i+1]*heightfactor +'px';
    let q=i+1;

    quick_sort(start,q-1,array);
    quick_sort(q+1,end,array);
    
    await sleep(10);
    for(let k=start;k<=end;k++){
        bars[k].style.backgroundColor='blue';
        await sleep(10);
    }
    await sleep(100);
    return array;
}
bub_sort.addEventListener('click',function(){
    let sorted_array=bubble_sort(unsorted_arr);
    console.log(sorted_array);
});
ins_sort.addEventListener('click',function(){
    let sorted_array=insertion_sort(unsorted_arr);
    console.log(sorted_array);
});
sel_sort.addEventListener('click',function(){
    let sorted_array=selection_sort(unsorted_arr);
    console.log(sorted_array);
});
merg_sort.addEventListener('click',function(){
    let sorted_array=merge_sort(0,unsorted_arr.length-1,unsorted_arr);
    console.log(sorted_array);
});
quik_sort.addEventListener('click',function(){
    let sorted_array=quick_sort(0,unsorted_arr.length-1,unsorted_arr);
});

// function heap_sort()

