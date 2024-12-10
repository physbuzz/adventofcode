const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
//const testinput=readFileAsString("testinput.txt");
const input=readFileAsString("input.txt");



let Differences= arr=>arr.slice(1).map((b,a)=>b-arr[a]);
let Sum=arr=>arr.reduce((a,b)=>a+b,0);
let Last=arr=>arr[arr.length-1];
let First=arr=>arr[0];

let day1a=function(input){
    console.log("=========== day 1 part 1 ==========");
    lines=input.split('\n');
    let list1=[];
    let list2=[];
    for(let i=0;i<lines.length;i++){
        let line=lines[i].trim().split(' ');
        if(line.length==4){
            list1[i]=+line[0];
            list2[i]=+line[3];
            //console.log("Line "+i+": ");
            //console.log(line[0]);
            //console.log(line[3]);
        }
    }
    list1.sort();
    list2.sort();
    let sum=0;
    for(let i=0;i<list1.length;i++){
        sum+=Math.abs(list1[i]-list2[i]);
    }
    

    console.log(sum);
};

let day1b=function(input){
    console.log("=========== day 1 part 2 ==========");
    lines=input.split('\n');
    let list1=[];
    let list2=[];
    let map={};
    for(let i=0;i<lines.length;i++){
        let line=lines[i].trim().split(' ');
        if(line.length==4){
            if(map[line[3]]){
                map[line[3]]+=1;
            } else {
                map[line[3]]=1;
            }
        }
    }
    let score=0;
    for(let i=0;i<lines.length;i++){
        let line=lines[i].trim().split(' ');
        if(line.length==4){

            score+=(+line[0])*(map[line[0]] ? map[line[0]]:0);
        }
    }
    console.log(score);
};

day1a(input);
day1b(input);
