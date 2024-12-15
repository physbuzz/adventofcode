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

let day15a=function(input){
    console.log("=========== day 15 part 1 ==========");
    let [gridtxt,cmds]=input.split('\n\n');
    let grid=gridtxt.split('\n').map( x=> x.trim()).filter(line => line.length>0);
    grid=grid.map( line => line.split(''));

    cmds=cmds.split('\n').map(x => x.trim()).join('').split('');

    let N=grid.length;
    let M=grid[0].length;


    let dirs={"<":[0,-1],">":[0,1],"v":[1,0],"^":[-1,0]};
    let ri=-1,rj=-1;
    for(let i=0;i<N && ri<0;i++){
        for(let j=0;j<M&& ri<0;j++){
            if(grid[i][j]==='@'){
                ri=i;
                rj=j;
                grid[i][j]='.';
            }
        }
    }
    let at=function(vec){
        return grid[vec[0]][vec[1]];
    }


    for(let cmd of cmds){
        let dir=dirs[cmd];
        let newpos=[ri+dir[0],rj+dir[1]];
        if(at(newpos)=='.'){
            ri=newpos[0];
            rj=newpos[1];
        } else if(at(newpos)=='#'){
            //do nothing
        } else if(at(newpos)=='O'){
            let ctr=1;
            while(at([newpos[0]+dir[0]*ctr,newpos[1]+dir[1]*ctr])==='O'){
                ctr++;
            }
            if(at([newpos[0]+dir[0]*ctr,newpos[1]+dir[1]*ctr])==='.'){
                //execute move
                for(let i=1;i<=ctr;i++){
                    grid[newpos[0]+dir[0]*i][newpos[1]+dir[1]*i]='O';
                }
                grid[newpos[0]][newpos[1]]='.';
                ri=newpos[0];
                rj=newpos[1];
            }
        }
    }
    let ret=0;
    for(let i=0;i<N;i++){
        for(let j=0;j<M;j++){
            if(grid[i][j]==='O'){
                ret+=100*i+j;
            }
        }
    }
    console.log(ret);
};

let day15b=function(input){
    console.log("=========== day 15 part 2 ==========");
    let [gridtxt,cmds]=input.split('\n\n');
    gridtxt=gridtxt.replaceAll('O','[]');
    gridtxt=gridtxt.replaceAll('.','..');
    gridtxt=gridtxt.replaceAll('#','##');
    gridtxt=gridtxt.replaceAll('@','@.');
    let grid=gridtxt.split('\n').map( x=> x.trim()).filter(line => line.length>0);
    grid=grid.map( line => line.split(''));

    cmds=cmds.split('\n').map(x => x.trim()).join('').split('');

    let N=grid.length;
    let M=grid[0].length;


    let dirs={"<":[0,-1],">":[0,1],"v":[1,0],"^":[-1,0]};
    let ri=-1,rj=-1;
    for(let i=0;i<N && ri<0;i++){
        for(let j=0;j<M&& ri<0;j++){
            if(grid[i][j]==='@'){
                ri=i;
                rj=j;
                grid[i][j]='.';
            }
        }
    }
    let at=function(vec){
        return grid[vec[0]][vec[1]];
    }

    let checkMoveValid=function(i,j,cmd){
        let boxlist=[];
        let valid=true;
        let dir=dirs[cmd];
        let cursor=[i+dir[0],j+dir[1]];
        if(at(cursor)=='.'){
            return [];
        } else if(at(cursor)=='#'){
            return undefined;
        }
        if(cmd=='<' || cmd == '>'){
            if(at(cursor)=='[') { 
                boxlist.push(cursor);
                let newmove=checkMoveValid(cursor[0]+dir[0],cursor[1]+dir[1],cmd);
                if(newmove===undefined){
                    return undefined;
                }
                boxlist=boxlist.concat(newmove);
                return boxlist;
            } else if(at(cursor)==']') {
                boxlist.push([cursor[0]+dir[0],cursor[1]+dir[1]]);
                let newmove=checkMoveValid(cursor[0]+dir[0],cursor[1]+dir[1],cmd);
                if(newmove===undefined){
                    return undefined;
                }
                boxlist=boxlist.concat(newmove);
                return boxlist;
            } else {
                console.log("bad state?");
            }
        } else {
            if(at(cursor)=='[') { 
                boxlist.push(cursor);
                let newmove1=checkMoveValid(cursor[0],cursor[1],cmd);
                if(newmove1===undefined){
                    return undefined;
                }
                let newmove2=checkMoveValid(cursor[0],cursor[1]+1,cmd);
                if(newmove2===undefined){
                    return undefined;
                }
                let newmoves=[...new Set(newmove1.concat(newmove2))];
                boxlist=boxlist.concat(newmoves);
                return boxlist;
            } else if(at(cursor)==']') {
                boxlist.push([cursor[0],cursor[1]-1]);
                let newmove1=checkMoveValid(cursor[0],cursor[1],cmd);
                if(newmove1===undefined){
                    return undefined;
                }
                let newmove2=checkMoveValid(cursor[0],cursor[1]-1,cmd);
                if(newmove2===undefined){
                    return undefined;
                }
                let newmoves=[...new Set(newmove1.concat(newmove2))];
                boxlist=boxlist.concat(newmoves);
                return boxlist;
            } else {
                console.log("bad state?");
            }
        }
    };

    for(let cmd of cmds){
        let dir=dirs[cmd];
        let newpos=[ri+dir[0],rj+dir[1]];
        if(at(newpos)=='.'){
            ri=newpos[0];
            rj=newpos[1];
        } else if(at(newpos)=='#'){
            //do nothing
        } else if(at(newpos)==']'||at(newpos)=='['){
            let boxlist=checkMoveValid(ri,rj,cmd);
            if(boxlist!==undefined){
                for(box of boxlist){ 
                    grid[box[0]][box[1]]='.';
                    grid[box[0]][box[1]+1]='.';
                }
                for(box of boxlist){ 
                    grid[box[0]+dir[0]][box[1]+dir[1]]='[';
                    grid[box[0]+dir[0]][box[1]+dir[1]+1]=']';
                    ri=newpos[0];
                    rj=newpos[1];
                }
            }
        }
    }
    let ret=0;
    for(let i=0;i<N;i++){
        for(let j=0;j<M;j++){
            if(grid[i][j]==='['){
                ret+=100*i+j;
            }
        }
    }
    console.log(ret);
};

day15a(testinput);
day15a(input);
day15b(testinput);
day15b(input);
