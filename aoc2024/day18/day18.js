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

let day18a=function(input){
    console.log("=========== day 18 part 1 ==========");
    let lines=input.split('\n').map( x=> x.trim()).filter(line => line.length>0);
    data=lines.map( line => line.match(/\d+/g).map(x => +x));

    let N=0;
    let M=0;
    if(data.length<1024) {
        N=7;
        M=7;
    } else {
        N=71; M=71;
    }
    let grid=Array(N).fill().map(x=>Array(M).fill(undefined));
    for(let i=0;i<1024 && i<data.length;i++){
        grid[data[i][0]][data[i][1]]="#";
    }
    let dist=Array(N).fill().map(x=>Array(M).fill(undefined));
    let pocket=[[0,0]];
    dist[0][0]=0;
    let dirs=[[0,1],[1,0],[0,-1],[-1,0]];
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
            console.log(grid.join(''));
        }
    }
    //printgrid(dist);

    console.log(dist[N-1][M-1]);
};


let day18b=function(){
    console.log("=========== day 18 part 2 ==========");

    let lines=input.split('\n').map( x=> x.trim()).filter(line => line.length>0);
    data=lines.map( line => line.match(/\d+/g).map(x => +x));

    let N=0;
    let M=0;
    if(data.length<1024) {
        N=7;
        M=7;
    } else {
        N=71; M=71;
    }
    let grid=Array(N).fill().map(x=>Array(M).fill(undefined));
    for(let i=0;i<1024 && i<data.length;i++){
        grid[data[i][0]][data[i][1]]="#";
    }

    let reachableQ=function(grid) {
        let dist=Array(N).fill().map(x=>Array(M).fill(undefined));
        let pocket=[[0,0]];
        dist[0][0]=0;
        let dirs=[[0,1],[1,0],[0,-1],[-1,0]];
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
        return dist[N-1][M-1]!==undefined;
    };

    let i=1024;
    while(i<data.length){
        grid[data[i][0]][data[i][1]]="#";
        if(!reachableQ(grid)){
            console.log(data[i][0]+","+data[i][1]);
            break;
        }
        i++;
    }


}

//day18a(testinput);
day18a(input);
//day18b(testinput);
day18b(input);
