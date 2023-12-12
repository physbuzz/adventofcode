const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const input=readFileAsString("input.txt");



let day9a=function(input){
    console.log("=========== day 9 part 1 ==========");
    lines=input.split('\n');
    let seqs=[];
    let lineEmUp=function(seq){
        let arrs=[seq];
        let lvl=1;
        //differences down
        while(arrs[lvl-1][arrs[lvl-1].length-1]!=0){
            arrs[lvl]=[];
            for(let k=0;k<arrs[lvl-1].length-1;k++){
                arrs[lvl][k]=arrs[lvl-1][k+1]-arrs[lvl-1][k];
            }
            //console.log(arrs[lvl]);
            lvl++;
        }
        let ret=0;
        for(let m=lvl-1;m>=0;m--){
            ret+=arrs[m][arrs[m].length-1];
        }
        return ret;
    };

    let tot=0;
    for(let i in lines){
        let line=lines[i].trim();
        if(line.length==0)
            continue;
        seqs[i]=line.split(' ').map(x=>+x);
        tot+=lineEmUp(seqs[i]);
    }
    console.log(tot);


};
let day9b=function(input){
    console.log("=========== day 9 part 2 ==========");
    lines=input.split('\n');
    let seqs=[];
    let lineEmUp=function(seq){
        let arrs=[seq];
        let lvl=1;
        //differences down
        while(arrs[lvl-1][arrs[lvl-1].length-1]!=0){
            arrs[lvl]=[];
            for(let k=0;k<arrs[lvl-1].length-1;k++){
                arrs[lvl][k]=arrs[lvl-1][k+1]-arrs[lvl-1][k];
            }
            //console.log(arrs[lvl]);
            lvl++;
        }
        let ret=0;
        //we have that arrs[m][0]-arrs[m][-1]==arrs[m+1][-1]
        //so arrs[m][-1]=arrs[m][0]-arrs[m+1][-1]
        for(let m=lvl-1;m>=0;m--){
            ret=arrs[m][0]-ret;
        }
        return ret;
    };

    let tot=0;
    for(let i in lines){
        let line=lines[i].trim();
        if(line.length==0)
            continue;
        seqs[i]=line.split(' ').map(x=>+x);
        tot+=lineEmUp(seqs[i]);
    }
    console.log(tot);
};

let Differences= arr=>arr.slice(1).map((b,a)=>b-arr[a]);
let Sum=arr=>arr.reduce((a,b)=>a+b,0);
let Last=arr=>arr[arr.length-1];
let First=arr=>arr[0];

let day9aBetter=function(input){
    console.log("=========== day 9 part 1 ==========");
    lines=input.split('\n');
    let seqs=[];

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
    console.log(tot);
};

let day9bBetter=function(input){
    console.log("=========== day 9 part 2 ==========");
    lines=input.split('\n');
    let seqs=[];

    let tot=0;
    for(let i in lines){
        let line=lines[i].trim();
        if(line.length==0)
            continue;

        seqs[i]=line.split(' ').map(x=>+x);
        let arrs=[seqs[i]];
        for(let lvl=1;Last(arrs[lvl-1])!=0;lvl++)
            arrs[lvl]=Differences(arrs[lvl-1]);
        tot+=arrs.map(First).reverse().reduce((a,b)=>b-a,0);
    }
    console.log(tot);
};

day9aBetter(input);
day9bBetter(input);
//day9b(input);
