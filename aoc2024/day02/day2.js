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

let day2a=function(input){
    console.log("=========== day 2 part 1 ==========");
    lines=input.split('\n');
    let safeQ=function(input){
        let incdec=0;
        //console.log(input);
        if(input[0]<input[1]){
            incdec=1;
        } else if(input[0]>input[1]){
            incdec=-1;
        } else {
            return false;
        }
        let ret;
        if(incdec==1)
            ret=input.slice(1).reduce((acc,val) => [acc[0] && (acc[1]<val) && (Math.abs(acc[1]-val)<=3),val], [true,input[0]]);
        else
            ret=input.slice(1).reduce((acc,val) => [acc[0] && (acc[1]>val) && (Math.abs(acc[1]-val)<=3),val], [true,input[0]]);
        return ret[0];
    };
    let sum=0;
    for(let i=0;i<lines.length;i++){
        if(lines[i].length==0)
            continue;
        if(safeQ(lines[i].trim().split(' ').map( x => +x)))
            sum++;
    }

    console.log(sum);
};

let day2b=function(input){
    console.log("=========== day 2 part 2 ==========");
    lines=input.split('\n');
    let safeQ=function(input){
        let incdec=0;
        //console.log(input);
        if(input[0]<input[1]){
            incdec=1;
        } else if(input[0]>input[1]){
            incdec=-1;
        } else {
            return false;
        }
        let ret;
        if(incdec==1)
            ret=input.slice(1).reduce((acc,val) => [acc[0] && (acc[1]<val) && (Math.abs(acc[1]-val)<=3),val], [true,input[0]]);
        else
            ret=input.slice(1).reduce((acc,val) => [acc[0] && (acc[1]>val) && (Math.abs(acc[1]-val)<=3),val], [true,input[0]]);
        return ret[0];
    };
    let safeQFlex=function(input){
        let incdec=0;
        if(safeQ(input))
            return true;

        for(let i=0;i<input.length;i++){
            if(safeQ(input.slice(0,i).concat(input.slice(i+1))))
                return true;
        }
        return false;
    };
    let sum=0;
    for(let i=0;i<lines.length;i++){
        if(lines[i].length==0)
            continue;
        if(safeQFlex(lines[i].trim().split(' ').map( x => +x)))
            sum++;
    }
    console.log(sum);
};

day2a(input);
day2b(input);
