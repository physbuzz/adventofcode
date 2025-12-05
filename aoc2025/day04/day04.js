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

let day04a=function(input){
    console.log("=========== day 04 part 1 ==========");
    let grid=input.split('\n').map( x=> x.trim().split('')).filter(line => line.length>0);
    let n=grid.length;
    let m=grid[0].length;
    let at=function(i,j){
        if(i>=0 && i<n && j>=0 && j<m)
            return grid[i][j];
        else
            return '.';
    }
    let adj=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    let ret=0;
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(at(i,j)=='@'){
                let count=0;
                for(let k=0;k<adj.length;k++){
                    if(at(i+adj[k][0],j+adj[k][1])=='@')
                        count+=1;
                }
                if(count<4)
                    ret+=1;
            }
        }
    }
    console.log(ret);
};
let day04b=function(input){
    console.log("=========== day 04 part 2 ==========");
    let grid=input.split('\n').map( x=> x.trim().split('')).filter(line => line.length>0);
    let n=grid.length;
    let m=grid[0].length;
    let at=function(i,j){
        if(i>=0 && i<n && j>=0 && j<m)
            return grid[i][j];
        else
            return '.';
    }
    let adj=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    let ret=0;
    let iterate=function(){
        let removedcount=0;
        for(let i=0;i<n;i++){
            for(let j=0;j<m;j++){
                if(at(i,j)=='@'){
                    let count=0;
                    for(let k=0;k<adj.length;k++){
                        if(at(i+adj[k][0],j+adj[k][1])=='@')
                            count+=1;
                    }
                    if(count<4) {
                        ret+=1;
                        removedcount++;
                        grid[i][j]='.';
                    }
                }
            }
        }
        return removedcount;
    };
    let removedcount=1;
    while(removedcount>0){
        removedcount=iterate();
    }
    console.log(ret);
};

//day04a(testinput);
//day04a(input);
day04b(testinput);
day04b(input);
