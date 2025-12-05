const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const testinput=readFileAsString("testinput.txt");
//const testinput2=readFileAsString("testinput2.txt");
const input=readFileAsString("input.txt");

let Differences= arr=>arr.slice(1).map((b,a)=>b-arr[a]);
let Sum=arr=>arr.reduce((a,b)=>a+b,0);
let Last=arr=>arr[arr.length-1];
let First=arr=>arr[0];

let day05a=function(input){
    console.log("=========== day 05 part 1 ==========");
    let lines=input.split('\n\n');
    let ranges=lines[0].split('\n').map( x => x.split('-').map(y => +y));
    let ids=lines[1].split('\n').map( x => +x);
    //console.log(ranges);
    let ret=0;
    for(let i=0;i<ids.length;i++){
        let id=ids[i];
        let fresh=false;
        for(let j=0;j<ranges.length;j++){
            if(ranges[j][0]<= id && id<= ranges[j][1])
                fresh=true;
        }
        if(fresh)
            ret++;
    }
    console.log(ret);
};
let day05b=function(input){
    console.log("=========== day 05 part 2 ==========");
    let lines=input.split('\n\n');
    let ret=0;
    let ranges0=lines[0].split('\n').map( x => x.split('-').map(y => +y));
    let ranges=[];
    //assuming a<b and c<d
    //a<=x<=b, c<=x<=d

    let max=function(a,b){
        if(a>b)
            return a;
        return b;
    };
    let min=function(a,b){
        if(a<b)
            return a;
        return b;
    };
    let overlapsQ=function(a,b,c,d){
        //if(a>c)
            //return overlapsQ(c,d,a,b);
        let l=max(a,c);
        let u=min(b,d);
        if(l<=u)
            return true;
        return false;
    };
    let mergeRange=function(a,b,c,d){
        return [min(a,c),max(b,d)];
    };
    let rangeOverlaps=function(a,b){
        for(let i=0;i<ranges.length;i++){
            if(overlapsQ(a,b,ranges[i][0],ranges[i][1]))
                return i;
        }
        return -1;
    }
    function addRange(a,b){
        let i=rangeOverlaps(a,b);
        if(i<0)
            ranges.push([a,b])
        else {
            let [c,d]=ranges[i];
            ranges.splice(i,1);
            let [e,f]=mergeRange(a,b,c,d);
            addRange(e,f);
        }
    }
    ranges0.map( y => addRange(y[0],y[1]));
    ret=0;
    ranges.map( y => ret+=y[1]-y[0]+1);
    console.log(ret);
    //05b
};

day05a(testinput);
day05a(input);
day05b(testinput);
day05b(input);
