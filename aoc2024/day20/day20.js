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

let day20a=function(input){
    console.log("=========== day 20 part 1 ==========");
    let lines=input.split('\n').map( x=> x.trim()).filter(line => line.length>0);

    grid=lines.map( line => line.split(''));
    let N=grid.length;
    let M=grid[0].length;

    let dirs=[[0,1],[1,0],[0,-1],[-1,0]];

    //Goofy copy and pasting that didn't even save me time :~)
    let fillDistanceGrid=function(grid){
        let ei=-1,ej=-1;
        let ri=-1,rj=-1;
        for(let i=0;i<N;i++){
            for(let j=0;j<M;j++){
                if(grid[i][j]==='S'){
                    ri=i;
                    rj=j;
                }
                if(grid[i][j]==='E'){
                    ei=i;
                    ej=j;
                }
            }
        }

        let dist=Array(N).fill().map(x=>Array(M).fill(undefined));
        let pocket=[[ri,rj]];
        dist[ri][rj]=0;
        let at=function(i,j){
            if(j===undefined){
                j=i[1];
                i=i[0];
                if(i<0 || j<0 || i>=N || j>= M){
                    return "#";
                }
                return grid[i][j];
            } else {
                if(i<0 || j<0 || i>=N || j>= M){
                    return "#";
                }
                return grid[i][j];
            }
        };
        while(pocket.length>0){
            let [i,j]=pocket.shift();
            let currentdist=dist[i][j];
            let adj=[0,1,2,3].map( x => [i+dirs[x][0],j+dirs[x][1]]);
            for(let k in adj){
                if(at(adj[k])!=="#"){
                    if(dist[adj[k][0]][adj[k][1]]===undefined || currentdist+1<dist[adj[k][0]][adj[k][1]]){
                        dist[adj[k][0]][adj[k][1]]=currentdist+1;
                        pocket.push(adj[k]);
                    }
                }
            }
        }
        let printgrid=function(grid){
            for(let i=0;i<grid.length;i++){
                console.log(grid[i].join(''));
            }
        }
        //printgrid(dist);
        return dist;
    };
    let ei=-1,ej=-1;
    let ri=-1,rj=-1;
    for(let i=0;i<N;i++){
        for(let j=0;j<M;j++){
            if(grid[i][j]==='S'){
                ri=i;
                rj=j;
            }
            if(grid[i][j]==='E'){
                ei=i;
                ej=j;
            }
        }
    }
    let at=function(grid,i,j){
        //console.log("Reading position " +i+" from grid of length "+grid.length); 
        if(j===undefined){
            j=i[1];
            i=i[0];
            if(i<0 || j<0 || i>=N || j>= M){
                return "#";
            }
            return grid[i][j];
        } else {
            if(i<0 || j<0 || i>=N || j>= M){
                return "#";
            }
            return grid[i][j];
        }
    };
    let distgrid=fillDistanceGrid(grid);
    let dist0=distgrid[ei][ej];

    let parsedPath={};
    let ret=0;
    let walkers=[[ri,rj,0,0,2]];
    while(walkers.length>0){
        //i,j are position. dist is the distance this walker has traveled.
        //cell is the distance at the last cell the walker was at
        let [i,j,dist,cell,cheatsleft]=walkers.shift();
        if(at(grid,i,j)=='#') {
            console.log("???");
            continue;
        }
        if(at(grid,i,j)=='E') {
            if(parsedPath[dist])
                parsedPath[dist]++;
            else
                parsedPath[dist]=1;
            if(dist0-dist>=100)
                ret+=1;
            continue;
        }

        let adj=[0,1,2,3].map( x => [i+dirs[x][0],j+dirs[x][1]]);
        let adj2=[0,1,2,3].map( x => [i+2*dirs[x][0],j+2*dirs[x][1]]);
        for(let k in adj){
            //If the space is open, just proceed as normal.
            if((at(grid,adj[k])==='.' || at(grid,adj[k])==='E')/*&&cheatsleft!=1*/) {
                let newcell=at(distgrid,adj[k]);
                if(newcell===(cell+1)){
                    walkers.push([adj[k][0],adj[k][1],dist+1,newcell,cheatsleft]);
                }
            } else {
                //Else it's a wall, but we can still activate cheats.
                if(at(grid,adj2[k])=='.' && typeof(at(distgrid,adj2[k]))==='number' && at(distgrid,adj2[k])>cell && cheatsleft==2){
                    walkers.push([adj2[k][0],adj2[k][1],dist+2,at(distgrid,adj2[k]),0]);
                }
            }
        }
    }


    //printgrid(dist);
    console.log(ret);
};

let day20b=function(input,threshold){
    console.log("=========== day 20 part 2 ==========");
    let lines=input.split('\n').map( x=> x.trim()).filter(line => line.length>0);

    grid=lines.map( line => line.split(''));
    let N=grid.length;
    let M=grid[0].length;

    let dirs=[[0,1],[1,0],[0,-1],[-1,0]];

    //Get the starting position
    let ri=-1,rj=-1;
    for(let i=0;i<N;i++){
        for(let j=0;j<M;j++){
            if(grid[i][j]==='S'){
                ri=i;
                rj=j;
            }
        }
    }
    //lookup helper function
    let at=function(grid,pos){
        if(pos[0]<0 || pos[1]<0 || pos[0]>=N || pos[1]>= M){
            return "#";
        }
        return grid[pos[0]][pos[1]];
    };


    //Fill distgrid with distance from start; also fill cheatarray[distance_from_start]=[i,j]
    //basically the inverse function because we know there's only one path from start to finish without cheating
    let cheatarray=[];
    let walker=[ri,rj];
    let d=0;
    let distgrid=Array(N).fill().map(x=>Array(M).fill(undefined));
    let cont=true;
    while(cont){
        cheatarray[d]=walker;
        distgrid[walker[0]][walker[1]]=d;
        let adj=[0,1,2,3].map( x => [walker[0]+dirs[x][0],walker[1]+dirs[x][1]]);
        cont=false;
        for(let pos of adj){
            if((at(grid,pos)==='.' || at(grid,pos)==='E')&&at(distgrid,pos)===undefined){
                d++;
                walker=pos;
                cont=true;
                break;
            }
        }
    }

    //Loop over all distances from start and the manhattan-distance ball of radius 20 
    let ret=0;
    let dist0=d;
    for(let k in cheatarray){
        //k will be the distance at which we turn cheats on.
        let [i,j]=cheatarray[k];
        //Manhattan distance ball of radius 20
        for(let di=-20;di<=20;di++){
            for(let dj=-(20-Math.abs(di)); dj<=20-Math.abs(di);dj++){
                let inew=i+di;
                let jnew=j+dj;
                //Check if we end at an empty space
                if(at(grid,[inew,jnew])==='.' || at(grid,[inew,jnew])==='E') {
                    let cellnew=at(distgrid,[inew,jnew]);
                    //Check that our cheat moves us further along the path
                    if(typeof(cellnew)==='number' && cellnew>(+k)+Math.abs(di)+Math.abs(dj)){
                        let dist=(+k)+Math.abs(di)+Math.abs(dj) + (dist0-cellnew);
                        if(dist0-dist>=threshold)
                            ret+=1;
                    }
                }
            }
        }
    }
    console.log(ret);
}

//day20a(testinput);
//day20a(input);
day20b(testinput,50);
day20b(input,100);
