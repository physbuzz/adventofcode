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

let day10a=function(input){
    console.log("=========== day 10 part 1 ==========");
    lines=input.split('\n');
    //# of characters per line (141 in real examples, including \n)
    let LINESIZE=lines[0].length+1;

    //Build a map m so that "if we're on a character | and we came from
    //direction [0,1], move in direction [0,-1]". This is represented by
    //m["|"+[0,1]]=[0,-1]
    let m={};
    let atlas=[["|",[0,1],[0,-1]],["-",[1,0],[-1,0]],
        ["F",[1,0],[0,1]],["7",[-1,0],[0,1]],
        ["L",[1,0],[0,-1]],["J",[-1,0],[0,-1]]];
    for(let l of atlas){
        m[l[0]+l[1]]=l[2];
        m[l[0]+l[2]]=l[1];
    }

    // argument is of the form [index, directionFrom]
    let stepIndex=function(arg){
        let ch=input[arg[0]];
        if(ch=='S')
            return false; //loop complete.
        let newDirection=m[ch+arg[1]];
        return [arg[0]+LINESIZE*newDirection[1]+newDirection[0],
            [-newDirection[0],-newDirection[1]]];
    }

    let i=input.search(/S/);
    //Find initial cursor position. My example happens to look like
    //"-S", so I put this in manually. It would change for your input.
    let cursor=[i-1,[1,0]];

    let step=1;
    while((cursor=stepIndex(cursor)))
        step++;
    console.log(step/2);
};

let day10b=function(input){
    console.log("=========== day 10 part 2 ==========");
    lines=input.split('\n');
    let LINESIZE=lines[0].length+1;

    let m={};
    let atlas=[["|",[0,1],[0,-1]],["-",[1,0],[-1,0]],
        ["F",[1,0],[0,1]],["7",[-1,0],[0,1]],
        ["L",[1,0],[0,-1]],["J",[-1,0],[0,-1]]];
    for(let l of atlas){
        m[l[0]+l[1]]=l[2];
        m[l[0]+l[2]]=l[1];
    }

    let stepIndex=function(arg){
        let ch=input[arg[0]];
        if(ch=='S')
            return false; //loop complete.
        let newDirection=m[ch+arg[1]];
        return [arg[0]+LINESIZE*newDirection[1]+newDirection[0],
            [-newDirection[0],-newDirection[1]]];
    }

    let i=input.search(/S/);
    let y=Math.floor(i/LINESIZE);
    //again this only works for -S. If the start was SJ or S- or S7 I'd have
    //cursor=[i+1,[-1,0]]
    let cursor=[i-1,[1,0]];

    let area=y*cursor[1][0]; //y*dx
    let step=1;
    while((cursor=stepIndex(cursor))){
        step++;
        area+=Math.floor(cursor[0]/LINESIZE)*cursor[1][0];
    }
    console.log(Math.abs(area)-step/2+1);
};

day10a(input);
day10b(input);
