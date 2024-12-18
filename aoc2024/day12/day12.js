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

let day12a=function(input){
    console.log("=========== day 12 part 1 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);
    let ret=0;

    let plot=lines.map(line => line.trim().split(''));
    let N=plot.length;
    let M=plot[0].length;

    let inbounds=function(n,m) { return 0<= n && n<N && 0<=m && m<M; };
    let at=function(n,m) { 
        if(inbounds(n,m)) 
            return plot[n][m];
        return '.';
    };

    let fillMap=plot.map( line => line.map( x => '.'));

    let fillat=function(n,m) { 
        if(inbounds(n,m)) 
            return fillMap[n][m];
        return '.';
    };

    let floodFill=function(n,m){
        if(fillat(n,m)!=='.'){
            return [0,0];
        }

        let letter=at(n,m);
        let area=1;
        let peri=0;
        fillMap[n][m]=letter;

        let pocket=[];
        let dirs=[[-1,0],[0,1],[1,0],[0,-1]];
        for(let k=0;k<4;k++){
            let newpt=[n+dirs[k][0],m+dirs[k][1]]
            if(at(newpt[0],newpt[1])===letter) {
                pocket.push(newpt);
                fillMap[newpt[0]][newpt[1]]=letter;
                area++;
            } else {
                peri++;
            }
        }

        while(pocket.length>0){
            let loc=pocket.pop();
            for(let k=0;k<4;k++){
                let newpt=[loc[0]+dirs[k][0],loc[1]+dirs[k][1]]

                if(fillat(newpt[0],newpt[1])===letter)
                    continue;

                if(at(newpt[0],newpt[1])===letter) {
                    pocket.push(newpt);
                    fillMap[newpt[0]][newpt[1]]=letter;
                    area++;
                } else {
                    peri++;
                }
            }
        }
        return [area,peri];
    };
    for(let n=0;n<N;n++){
        for(let m=0;m<M;m++){
            let [area,peri]=floodFill(n,m);
            ret+=area*peri;
        }
    }


    console.log(ret);
};

let day12b=function(input){
    console.log("=========== day 12 part 2 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);
    let ret=0;

    let plot=lines.map(line => line.trim().split(''));
    let N=plot.length;
    let M=plot[0].length;

    let inbounds=function(n,m) { return 0<= n && n<N && 0<=m && m<M; };
    let at=function(n,m) { 
        if(inbounds(n,m)) 
            return plot[n][m];
        return '.';
    };

    let fillMap=plot.map( line => line.map( x => '.'));

    let fillat=function(n,m) { 
        if(inbounds(n,m)) 
            return fillMap[n][m];
        return '.';
    };

    let floodFill=function(n,m){
        if(fillat(n,m)!=='.'){
            return [0,0];
        }
        //rwall[n][m] separates at(n-1,m) from at(n,m).
        let rwall=Array(N+1).fill().map(x=>Array(M).fill(-1));
        //cwall[n][m] separates at(n,m-1) from at(n,m).
        let cwall=Array(N).fill().map(x=>Array(M+1).fill(-1));

        let hasAdjacentcwall=function(n,m,dir){
            if(n-1>=0 && cwall[n-1][m]===dir)
                return true;
            if(n+1<N && cwall[n+1][m]===dir)
                return true;
            return false;
        }
        let hasAdjacentrwall=function(n,m,dir){
            if(m-1>=0 && rwall[n][m-1]===dir)
                return true;
            if(m+1<M && rwall[n][m+1]===dir)
                return true;
            return false;
        }

        let letter=at(n,m);
        let area=1;
        let peri=0;
        let numwalls=0;
        fillMap[n][m]=letter;

        let pocket=[];
        let dirs=[[-1,0],[0,1],[1,0],[0,-1]];


        for(let k=0;k<4;k++){
            let newpt=[n+dirs[k][0],m+dirs[k][1]]
            if(at(newpt[0],newpt[1])===letter) {
                pocket.push(newpt);
                fillMap[newpt[0]][newpt[1]]=letter;
                area++;
            } else {
                peri++;
                if(k===0){
                    rwall[newpt[0]+1][newpt[1]]=k;
                    if(!hasAdjacentrwall(newpt[0]+1,newpt[1],k)){
                        numwalls++;
                    }
                } else if(k===2){
                    rwall[newpt[0]][newpt[1]]=k;
                    if(!hasAdjacentrwall(newpt[0],newpt[1],k)){
                        numwalls++;
                    }
                } else if(k===1){
                    cwall[newpt[0]][newpt[1]]=k;
                    if(!hasAdjacentcwall(newpt[0],newpt[1],k)){
                        numwalls++;
                    }
                } else if(k===3){
                    cwall[newpt[0]][newpt[1]+1]=k;
                    if(!hasAdjacentcwall(newpt[0],newpt[1]+1,k)){
                        numwalls++;
                    }
                }
            }
        }

        while(pocket.length>0){
            let loc=pocket.shift();
            for(let k=0;k<4;k++){
                let newpt=[loc[0]+dirs[k][0],loc[1]+dirs[k][1]]

                if(fillat(newpt[0],newpt[1])===letter)
                    continue;

                if(at(newpt[0],newpt[1])===letter) {
                    pocket.push(newpt);
                    fillMap[newpt[0]][newpt[1]]=letter;
                    area++;
                } else {
                    peri++;
                    if(k===0){
                        rwall[newpt[0]+1][newpt[1]]=k;
                        if(!hasAdjacentrwall(newpt[0]+1,newpt[1],k)){
                            numwalls++;
                        }
                    } else if(k===2){
                        rwall[newpt[0]][newpt[1]]=k;
                        if(!hasAdjacentrwall(newpt[0],newpt[1],k)){
                            numwalls++;
                        }
                    } else if(k===1){
                        cwall[newpt[0]][newpt[1]]=k;
                        if(!hasAdjacentcwall(newpt[0],newpt[1],k)){
                            numwalls++;
                        }
                    } else if(k===3){
                        cwall[newpt[0]][newpt[1]+1]=k;
                        if(!hasAdjacentcwall(newpt[0],newpt[1]+1,k)){
                            numwalls++;
                        }
                    }
                }
            }
        }
        return [area,numwalls];
    };
    let edgeRunner=function(n,m,letter){
    };

    for(let n=0;n<N;n++){
        for(let m=0;m<M;m++){
            let [area,peri]=floodFill(n,m);
            ret+=area*peri;
        }
    }


    console.log(ret);
};

day12a(testinput);
day12a(input);
day12b(testinput);
day12b(input);
