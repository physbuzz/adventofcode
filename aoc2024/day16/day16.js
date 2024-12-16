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

let day16a=function(input){
    console.log("=========== day 16 part 1 ==========");
    let grid=input.split('\n').map( x=> x.trim()).filter(line => line.length>0);
    grid=grid.map( line => line.split(''));
    let N=grid.length;
    let M=grid[0].length;

    let dirs=[[0,1],[1,0],[0,-1],[-1,0]];

    let ri=-1,rj=-1;
    for(let i=0;i<N && ri<0;i++){
        for(let j=0;j<M&& ri<0;j++){
            if(grid[i][j]==='S'){
                ri=i;
                rj=j;
                grid[i][j]='.';
            }
        }
    }


    let foundbefore={};
    let at=function(a,b){
        if(b===undefined)
            return grid[a[0]][a[1]];
        return grid[a][b];
    }
    let foundbeforeat=function(a,b){
        if(b===undefined)
            return foundbefore[a[0]+","+a[1]];
        return foundbefore[a+","+b];
    }
    let foundbeforeset=function(vec,val){
        foundbefore[vec[0]+","+vec[1]]=val;
    }
    let rpath=function(i,j,dir,score){
        let bestfound=false;
        if(score===undefined)
            score=0;
        if(at(i,j)=='E') {
            return [true,score];
        }
        if(at(i,j)=='#') {
            console.log("???");
            return [false,score];
        }
        /*
        if(foundbefore[i+","+j]!==undefined){
            console.log(foundbefore[i+","+j]);
            console.log("??");
            return [false,score];
        }*/
        let goodpath=false;
        let finalscore=score;

        let adj=[0,1,2,3].map( x => [i+dirs[x][0],j+dirs[x][1]]);
        for(let k in adj){
            //If the space is open
            if(at(adj[k])==='.' || at(adj[k])==='E'){
                let newscore=score+1;
                let dotprod=dirs[dir][0]*dirs[k][0]+dirs[dir][1]*dirs[k][1];
                if(dotprod===0){
                    newscore+=1000;
                } else if(dotprod===-1){
                    newscore+=2000;
                }
                if(foundbeforeat(adj[k])===undefined || foundbeforeat(adj[k])>newscore){
                    foundbeforeset(adj[k],newscore);
                    let [goodpath1,finalscore1]=rpath(adj[k][0],adj[k][1],k,newscore);
                    if((goodpath1 && !goodpath) || (goodpath1 && finalscore>finalscore1)){
                        goodpath=goodpath1;
                        finalscore=finalscore1;
                    }
                }
            }
        }
        return [goodpath,finalscore];
    };

    foundbeforeset([ri,rj],0);
    console.log(rpath(ri,rj,0,0));
};

//unused, might be part of a solution though
let day16bRecursive=function(input){
    console.log("=========== day 16 part 2 ==========");
    let [gridtxt,cmds]=input.split('\n\n');
    let grid=gridtxt.split('\n').map( x=> x.trim()).filter(line => line.length>0);
    grid=grid.map( line => line.split(''));
    let N=grid.length;
    let M=grid[0].length;

    let dirs=[[0,1],[1,0],[0,-1],[-1,0]];

    let ri=-1,rj=-1;
    for(let i=0;i<N && ri<0;i++){
        for(let j=0;j<M&& ri<0;j++){
            if(grid[i][j]==='S'){
                ri=i;
                rj=j;
                grid[i][j]='.';
            }
        }
    }
    let scoregrid=Array(N).fill().map(x=>Array(M).fill(undefined));


    let at=function(a,b){
        if(b===undefined)
            return grid[a[0]][a[1]];
        return grid[a][b];
    }

    let pathfound=false;
    let bestscorefound=1e30;
    
    //Similar algorithm, but no "foundbefore" and yes BFS.
    let results=[];

    let retpaths=[];
    let paths=[[[[ri,rj]],false,0,0]];


    while(paths.length>0){
        paths=paths.sort( (a,b) => a[3]-b[3]);
        let [path,endfound,dir,score]=paths.shift();

        let [i,j]=path[path.length-1];
        if(pathfound && score>bestscorefound){
            //Next path, this is a dead end.
            continue;
        }
        if(at(i,j)=='#') {
            console.log("???");
            continue;
        }
        if(at(i,j)=='E') {
            endfound=true;
            retpaths.push([path,endfound,dir,score]);
            if(!pathfound){
                pathfound=true;
                bestscorefound=score;
            } else if(pathfound && score<bestscorefound){
                bestscorefound=score;
            }
            continue;
        }
        //let goodpath=false;
        //let finalscore=score;

        let adj=[0,1,2,3].map( x => [i+dirs[x][0],j+dirs[x][1]]);
        for(let k in adj){
            //If the space is open
            if(at(adj[k])==='.' || at(adj[k])==='E'){
                let newscore=score+1;
                let dotprod=dirs[dir][0]*dirs[k][0]+dirs[dir][1]*dirs[k][1];
                if(dotprod===0){
                    newscore+=1000;
                } else if(dotprod===-1){
                    continue;
                }
                //let [path,endfound,dir,score]=paths.shift();
                paths.push([path.concat([adj[k]]),endfound,k,newscore]);
            }
        }
    }
    let ret=0;
    console.log
    for(let pathelem of retpaths){
        let [path,endfound,dir,score]=pathelem;
        if(score===bestscorefound){
            for(let pt of path){
                if(scoregrid[pt[0]][pt[1]]===undefined){
                    scoregrid[pt[0]][pt[1]]=1;
                    ret++;
                }
            }
        }
    }
    console.log(ret);
};

let day16b=function(input){
    console.log("=========== day 16 part 2 ==========");
    let grid=input.split('\n').map( x=> x.trim()).filter(line => line.length>0);
    grid=grid.map( line => line.split(''));
    let N=grid.length;
    let M=grid[0].length;

    let dirs=[[0,1],[1,0],[0,-1],[-1,0]];

    let ri=-1,rj=-1;
    for(let i=0;i<N && ri<0;i++){
        for(let j=0;j<M&& ri<0;j++){
            if(grid[i][j]==='S'){
                ri=i;
                rj=j;
                grid[i][j]='.';
            }
        }
    }

    let scoregrid3=Array(N).fill().map(x=>Array(M).fill().map(y => Array(4).fill(undefined)));

    let at=function(a,b){
        if(b===undefined)
            return grid[a[0]][a[1]];
        return grid[a][b];
    }

    let pathfound=false;
    let bestscorefound=1e30;
    
    //Similar algorithm, but no "foundbefore" and yes BFS.
    let results=[];

    let retpaths=[];
    let paths=[[[[ri,rj]],false,0,0]];
    scoregrid3[ri][rj][0]=0;

    while(paths.length>0){
        //Always check the lowest score path first
        paths=paths.sort( (a,b) => a[3]-b[3]);
        let [path,endfound,dir,score]=paths.shift();

        let [i,j]=path[path.length-1];
        if(pathfound && score>bestscorefound){
            //Next path, this is a dead end.
            continue;
        }
        if(at(i,j)=='#') {
            console.log("???");
            continue;
        }
        if(at(i,j)=='E') {
            endfound=true;
            retpaths.push([path,endfound,dir,score]);
            if(!pathfound){
                pathfound=true;
                bestscorefound=score;
            } else if(pathfound && score<bestscorefound){
                bestscorefound=score;
            }
            continue;
        }
        //let goodpath=false;
        //let finalscore=score;

        let adj=[0,1,2,3].map( x => [i+dirs[x][0],j+dirs[x][1]]);
        for(let k in adj){
            //If the space is open
            if(at(adj[k])==='.' || at(adj[k])==='E'){
                let newscore=score+1;
                let dotprod=dirs[dir][0]*dirs[k][0]+dirs[dir][1]*dirs[k][1];
                if(dotprod===0){
                    newscore+=1000;
                } else if(dotprod===-1){
                    continue;
                }
                //let [path,endfound,dir,score]=paths.shift();
                if(scoregrid3[adj[k][0]][adj[k][1]][k]===undefined || scoregrid3[adj[k][0]][adj[k][1]][k]>=newscore){
                    scoregrid3[adj[k][0]][adj[k][1]][k]=newscore;
                    paths.push([path.concat([adj[k]]),endfound,k,newscore]);
                }
            }
        }
    }
    let ret=0;
    let scoregrid=Array(N).fill().map(x=>Array(M).fill(undefined));
    for(let pathelem of retpaths){
        let [path,endfound,dir,score]=pathelem;
        if(score===bestscorefound){
            for(let pt of path){
                if(scoregrid[pt[0]][pt[1]]===undefined){
                    scoregrid[pt[0]][pt[1]]=1;
                    ret++;
                }
            }
        }
    }
    console.log(ret);
};

day16a(testinput);
day16a(input);
day16b(testinput);
day16b(input);
