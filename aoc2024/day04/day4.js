// some days you just wake up and want to type 200 lines for a simple problem :~)

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

let day4a=function(input){
    console.log("=========== day 4 part 1 ==========");
    lines=input.split('\n').filter(line => line.length>0);

    let rows=lines.length;
    let cols=lines[0].length;

    let ret=0;

    let at=function(i,j){
        if(i>=0 && i<rows && j>=0 && j<rows)
            return lines[i][j];
        return ".";
    }
    let matchq=function(str){
        return str==="XMAS";
    }
    let checkdir=function(i,j,diri,dirj){
        let str="";
        for(let a=0;a<4;a++){
            str+=at(i+diri*a,j+dirj*a);
        }
        return matchq(str);
    }
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            if(checkdir(i,j,1,0))
                ret++;
            if(checkdir(i,j,1,1))
                ret++;
            if(checkdir(i,j,0,1))
                ret++;
            if(checkdir(i,j,-1,1))
                ret++;
            if(checkdir(i,j,-1,0))
                ret++;
            if(checkdir(i,j,-1,-1))
                ret++;
            if(checkdir(i,j,0,-1))
                ret++;
            if(checkdir(i,j,1,-1))
                ret++;
        }
    }

    console.log(ret);
};

let day4b=function(input){
    console.log("=========== day 4 part 2 ==========");
    lines=input.split('\n').filter(line => line.length>0);

    let rows=lines.length;
    let cols=lines[0].length;

    let ret=0;

    let at=function(i,j){
        if(i>=0 && i<rows && j>=0 && j<rows)
            return lines[i][j];
        return ".";
    }
    let checkpt=function(i,j,strarr){

        let c=true;
        c=c&& at(i,j)=="A";
        c=c&& at(i+1,j+1)==strarr[0];
        c=c&& at(i-1,j+1)==strarr[1];
        c=c&& at(i-1,j-1)==strarr[2];
        c=c&& at(i+1,j-1)==strarr[3];
        return c;
    }
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            if(checkpt(i,j,["M","M","S","S"]) || checkpt(i,j,["M","S","S","M"]) || checkpt(i,j,["S","S","M","M"]) || checkpt(i,j,["S","M","M","S"]))
                ret++;
        }
    }

    console.log(ret);
};

//day4a(testinput);
day4a(input);
//day4b(testinput);
day4b(input);
