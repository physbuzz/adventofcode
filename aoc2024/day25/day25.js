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

let day25a=function(input){
    console.log("=========== day 25 part 1 ==========");
    let lst=input.split('\n\n').map(x=> x.trim()).filter(line => line.length>0);
    let lockQ=function(str){
        return str.charAt(0)==="#";
    };

    let locks=lst.filter(lockQ);
    let keys=lst.filter(x => !lockQ(x));

    let matchQ=function(lock,key){
        if(lock.length!==key.length){
            console.log("Different lengths?!");
            return false;
        }
        for(let i=0;i<lock.length;i++){
            if(lock.charAt(i)=='#' && key.charAt(i)=='#')
                return false;
        }
        return true;
    };

    let ret=0;
    for(let i=0;i<locks.length;i++){
    for(let j=0;j<keys.length;j++){
        if(matchQ(locks[i],keys[j]))
            ret++;
    }
    }


    console.log(ret);
};

let day25b=function(input){
    console.log("=========== day 25 part 2 ==========");
    let ics=input.split('\n').map( x=> x.trim()).filter(line => line.length>0).map(x => +x);
    let ret=0;

    console.log(ret);
};

day25a(testinput);
day25a(input);
//day25b(testinput);
//day25b(input);
