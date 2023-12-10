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
    let seqs=[];
    

    let LINESIZE=lines[0].length+1;
    let m={};

    let atlas=[["|",[0,1],[0,-1]],["-",[1,0],[-1,0]],
        ["F",[1,0],[0,1]],["7",[-1,0],[0,1]],
        ["L",[1,0],[0,-1]],["J",[-1,0],[0,-1]]];
    for(let l of atlas){
        m[l[0]+l[1]]=l[2];
        m[l[0]+l[2]]=l[1];
    }
    // index, directionFrom
    let stepIndex=function(arg){
        let ch=input[arg[0]];
        if(ch=='S' || ch=='.'){
            console.log("Error! stepIndex called on "+ch);
        }
        let newDirection=m[ch+arg[1]];
        return [arg[0]+LINESIZE*newDirection[1]+newDirection[0],
            [-newDirection[0],-newDirection[1]]];
    }

    /*
    m["|"+[0,1]]=[0,-1]; // meaning if it's a pipe and we're coming from above, go to the bottom. 
    m["|"+[0,-1]]=[0,1];

    m["-"+[1,0]]=[-1,0];
    m["-"+[-1,0]]=[1,0];

    kkkkkkk
    |-LJ7F.S*/



    let i=input.search(/S/);
    //let y=Math.floor(i/LINESIZE);
    //let x=i-n*LINESIZE;

    //I happen to know S looks like 
    //-7
    //-S
    let cursor1=[i-1,[1,0]];
    let cursor2=[i-LINESIZE,[0,1]];
    let counter=[];
    counter[cursor1[0]]=1;
    counter[cursor2[0]]=1;
    let step=1;
    while(true){
        cursor1=stepIndex(cursor1);
        cursor2=stepIndex(cursor2);
        if(counter[cursor1[0]] || counter[cursor2[0]])
            break;
        step++;
        counter[cursor1[0]]=step;
        counter[cursor2[0]]=step;
    }
    console.log(step);

    

    /*
    console.log(lines[n-1]);
    console.log(lines[n]);
    console.log(lines[n+1]);
    console.log("|"+[0,1]);*/
        /*
    let tot=0;
    for(let i in lines){
        let line=lines[i].trim();
        if(line.length==0)
            continue;

        seqs[i]=line.split(' ').map(x=>+x);
        let arrs=[seqs[i]];
        for(let lvl=1;Last(arrs[lvl-1])!=0;lvl++)
            arrs[lvl]=Differences(arrs[lvl-1]);
        tot+=Sum(arrs.map(Last));
    }
    console.log(tot);*/
};

let day10b=function(input){
    console.log("=========== day 10 part b ==========");
    lines=input.split('\n');
    let seqs=[];
    

    let LINESIZE=lines[0].length+1;
    let m={};

    let atlas=[["|",[0,1],[0,-1]],["-",[1,0],[-1,0]],
        ["F",[1,0],[0,1]],["7",[-1,0],[0,1]],
        ["L",[1,0],[0,-1]],["J",[-1,0],[0,-1]]];
    for(let l of atlas){
        m[l[0]+l[1]]=l[2];
        m[l[0]+l[2]]=l[1];
    }
    // index, directionFrom
    let stepIndex=function(arg){
        let ch=input[arg[0]];
        if(ch=='S'){
            return false;
        }
        let newDirection=m[ch+arg[1]];
        return [arg[0]+LINESIZE*newDirection[1]+newDirection[0],
            [-newDirection[0],-newDirection[1]]];
    }

    /*
    m["|"+[0,1]]=[0,-1]; // meaning if it's a pipe and we're coming from above, go to the bottom. 
    m["|"+[0,-1]]=[0,1];

    m["-"+[1,0]]=[-1,0];
    m["-"+[-1,0]]=[1,0];

    kkkkkkk
    |-LJ7F.S*/



    let i=input.search(/S/);
    //let y=Math.floor(i/LINESIZE);
    //let x=i-n*LINESIZE;

    //I happen to know S looks like 
    //-7
    //-S
    let cursor=[i-1,[1,0]];
    let counter=[];

    let y=Math.floor(i/LINESIZE);
    let x=i-y*LINESIZE-1;

    let area=x*0; //x dy
    let nstep=1;
    let newcursor=stepIndex(cursor);

    console.log("x "+x+" y "+y); 

    while(newcursor!==false){
        let ynew=Math.floor(newcursor[0]/LINESIZE);
        let xnew=newcursor[0]-ynew*LINESIZE;
        area+=x*(ynew-y);
        nstep++;

        x=xnew;
        y=ynew;
        cursor=newcursor;
        newcursor=stepIndex(cursor);
    }
    console.log("x "+x+" y "+y); 
    console.log(Math.floor(i/LINESIZE)-Math.floor(cursor[0]/LINESIZE)); 
    area+=(i-Math.floor(i/LINESIZE)*LINESIZE)*(Math.floor(i/LINESIZE)-Math.floor(cursor[0]/LINESIZE));
    console.log(Math.abs(area)-nstep/2+1);

};

if(typeof testinput!=='undefined'){
    console.log("Test Input");
    if(typeof day10a!=='undefined')
        day10a(testinput);
    if(typeof day10b!=='undefined')
        day10b(testinput);
}
if(typeof input!=='undefined'){
    console.log("Real Input");
    if(typeof day10a!=='undefined')
        day10a(input);
    if(typeof day10b!=='undefined')
        day10b(input);
}
