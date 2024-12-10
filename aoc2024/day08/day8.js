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

let day8a=function(input){
    console.log("=========== day 8 part 1 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);
    let grid=lines.map( line => line.trim().split(''));
    let N=grid.length;
    let M=grid[0].length;
    let ret=0;
    let indices=[];

    let addIndices=function(ch){
        let charIndex=-1;
        let charExists=false;
        for(let i=0;i<N;i++){
            for(let j=0;j<N;j++){
                if(grid[i][j]==ch){
                    if(charExists){
                        indices[charIndex].push([i,j]);
                    } else {
                        charIndex=indices.length;
                        indices.push([ch,[i,j]]);
                        charExists=true;
                    }
                }
            }
        }
    };

    for(let kk='a'.charCodeAt(0);kk<='z'.charCodeAt(0);kk++){
        addIndices(String.fromCharCode(kk));
    }
    for(let kk='A'.charCodeAt(0);kk<='Z'.charCodeAt(0);kk++){
        addIndices(String.fromCharCode(kk));
    }
    for(let kk='0'.charCodeAt(0);kk<='9'.charCodeAt(0);kk++){
        addIndices(String.fromCharCode(kk));
    }

    let antinodes=[];
    for(let i=0;i<N;i++){
        antinodes[i]=[];
        for(let j=0;j<M;j++){
            antinodes[i][j]=0;
        }
    }

    let checkAntinode=function(i,j){
        if(i>=0 && i<N && j>=0 && j<M && antinodes[i][j]==0){
            antinodes[i][j]=1;
            ret+=1;
            return true;
        }
        return false;
    };

    for(let kk=0;kk<indices.length;kk++){
        for(let a=2;a<indices[kk].length;a++){
            for(let b=1;b<a;b++){
                let [x1,y1]=indices[kk][a];
                let [x2,y2]=indices[kk][b];
                let [x3,y3]=[x1 - (x2-x1),y1 - (y2-y1)];
                let [x4,y4]=[x2 - (x1-x2),y2 - (y1-y2)];
                checkAntinode(x3,y3);
                checkAntinode(x4,y4);
            }
        }
    }


    console.log(ret);
};

let day8b=function(input){
    console.log("=========== day 8 part 2 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);
    let grid=lines.map( line => line.trim().split(''));
    let N=grid.length;
    let M=grid[0].length;
    let ret=0;
    let indices=[];

    let addIndices=function(ch){
        let charIndex=-1;
        let charExists=false;
        for(let i=0;i<N;i++){
            for(let j=0;j<N;j++){
                if(grid[i][j]==ch){
                    if(charExists){
                        indices[charIndex].push([i,j]);
                    } else {
                        charIndex=indices.length;
                        indices.push([ch,[i,j]]);
                        charExists=true;
                    }
                }
            }
        }
    };

    for(let kk='a'.charCodeAt(0);kk<='z'.charCodeAt(0);kk++){
        addIndices(String.fromCharCode(kk));
    }
    for(let kk='A'.charCodeAt(0);kk<='Z'.charCodeAt(0);kk++){
        addIndices(String.fromCharCode(kk));
    }
    for(let kk='0'.charCodeAt(0);kk<='9'.charCodeAt(0);kk++){
        addIndices(String.fromCharCode(kk));
    }

    let antinodes=[];
    for(let i=0;i<N;i++){
        antinodes[i]=[];
        for(let j=0;j<M;j++){
            antinodes[i][j]=0;
        }
    }

    let checkAntinode=function(i,j){
        if(i>=0 && i<N && j>=0 && j<M && antinodes[i][j]==0){
            antinodes[i][j]=1;
            ret+=1;
        }
    };
    let boundscheck=function(i,j){
        return i>=0 && i<N && j>=0 && j<M ;
    };
    let checkAntinodeBeam=function(i,j,stepi,stepj){
        let a=0;
        while(boundscheck(i+a*stepi,j+a*stepj)){
            checkAntinode(i+a*stepi,j+a*stepj);
            a++;
        }
        a=-1;
        while(boundscheck(i+a*stepi,j+a*stepj)){
            checkAntinode(i+a*stepi,j+a*stepj);
            a--;
        }
    };

    const gcd = (a,b) => b ? gcd(b, a%b) : Math.abs(a);

    for(let kk=0;kk<indices.length;kk++){
        for(let a=2;a<indices[kk].length;a++){
            for(let b=1;b<a;b++){
                let [x1,y1]=indices[kk][a];
                let [x2,y2]=indices[kk][b];
                let [stepi,stepj] = [
                    (x2-x1)/gcd(x2-x1,y2-y1),
                    (y2-y1)/gcd(x2-x1,y2-y1)
                ];
                checkAntinodeBeam(x1,y1,stepi,stepj);
            }
        }
    }


    console.log(ret);
};

//day8a(testinput);
//day8a(input);
day8b(testinput);
day8b(input);
