const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const testinput=readFileAsString("testinput.txt");
const input=readFileAsString("input.txt");

let Differences= arr=>arr.slice(1).map((b,a)=>b-arr[a]);
let Sum=arr=>arr.reduce((a,b)=>a+b,0);
let Last=arr=>arr[arr.length-1];
let First=arr=>arr[0];

let day11a=function(input){
    console.log("=========== day 11 part 1 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);
    let ret=0;

    let h=lines.map(line => line.split('').map(x => +x));
    let N=h.length;
    let M=h[0].length;

    console.log(ret);
};

let day11b=function(input){
    console.log("=========== day 11 part 2 ==========");
    let ret=0;

    console.log(ret);
};

day11a(testinput);
day11a(input);
//day11b(testinput);
//day11b(input);
