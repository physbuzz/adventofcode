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

let day6a=function(input){
    console.log("=========== day 6 part 1 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);
    let ret=0;

    grid=lines.map( line => line.split('') );

    let N=grid.length;
    let M=grid[0].length

    let zgrid=[];
    for(let i=0;i<N;i++) {
        zgrid[i]=[];
        for(let j=0;j<M;j++)
            zgrid[i][j]=0;
    }



    let state=0; //up
    let dirs = [[-1,0],[0,1],[1,0],[0,-1]];
    let x=-1;
    let y=-1;
    for(let i=0;i<N && x<0;i++){
        for(let j=0;j<M;j++){
            if(grid[i][j]==="^"){
                x=i;
                y=j;
            }
        }
    }

    while(x>=0 && x<N && y>=0 && y<M){
        if(zgrid[x][y]!=1) {
            zgrid[x][y]=1;
            ret++;
        }
        let xnew=x+dirs[state][0];
        let ynew=y+dirs[state][1];
        if(xnew>=0 && xnew<N && ynew>=0 && ynew<M && grid[xnew][ynew]=="#") {
            state=(state+1)%4;
        } else {
            x=xnew;
            y=ynew;
        }

    }

    console.log(ret);
};

let day6b=function(input){
    console.log("=========== day 6 part 2 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);
    let ret=0;

    grid=lines.map( line => line.split('') );

        let N=grid.length;
        let M=grid[0].length


    let checkIfRepeats=function(grid){

        let zgrid=[];
        for(let i=0;i<N;i++) {
            zgrid[i]=[];
            for(let j=0;j<M;j++)
                zgrid[i][j]=[0,[]];
        }

        let state=0; //up
        let dirs = [[-1,0],[0,1],[1,0],[0,-1]];
        let x=-1;
        let y=-1;
        for(let i=0;i<N && x<0;i++){
            for(let j=0;j<M;j++){
                if(grid[i][j]==="^"){
                    x=i;
                    y=j;
                }
            }
        }

        let repeated=false;

        while(x>=0 && x<N && y>=0 && y<M && !repeated){
            if(zgrid[x][y][0]!=1) {
                zgrid[x][y]=[1,[state]];
            } else {
                if(zgrid[x][y][1].includes(state)){
                    repeated=true;
                } else {
                    zgrid[x][y][1].push(state);
                }
            }
            let xnew=x+dirs[state][0];
            let ynew=y+dirs[state][1];
            if(xnew>=0 && xnew<N && ynew>=0 && ynew<M && grid[xnew][ynew]=="#") {
                state=(state+1)%4;
            } else {
                x=xnew;
                y=ynew;
            }

        }
        return repeated;
    }

    for(let i=0;i<N;i++){
        for(let j=0;j<M;j++){
            if(grid[i][j]=="."){
                grid[i][j]="#";
                if(checkIfRepeats(grid)){
                    ret++;
                }
                grid[i][j]=".";
            }
        }
    }

    console.log(ret);
};

//day6a(testinput);
//day6a(input);
day6b(testinput);
day6b(input);
