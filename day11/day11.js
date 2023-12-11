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


let day11a=function(input){
    console.log("=========== day 11 part 1 ==========");
    lines=input.split('\n');

    let parsedlines=[];
    for(let n in lines){
        let line=lines[n].trim();
        if(line.length==0)
            continue;

        if(line.search("#")>=0){
            parsedlines.push(line.split(''));
        } else {
            parsedlines.push(line.split(''));
            parsedlines.push(line.split(''));
        }
    }
    for(let m=0;m<parsedlines[0].length;m++){
        let poundfound=false;
        for(let n=0;n<parsedlines.length;n++){
            if(parsedlines[n][m]=='#'){
                poundfound=true;
                break;
            }
        }
        if(!poundfound){
            for(let n=0;n<parsedlines.length;n++){
                parsedlines[n]=[...parsedlines[n].slice(0,m),'.',...parsedlines[n].slice(m)];
            }
            m++;
        }
    }
    let posarr=[];
    for(let n=0;n<parsedlines.length;n++){
        for(let m=0;m<parsedlines[0].length;m++){
            if(parsedlines[n][m]=='#')
                posarr.push([n,m]);
        }
    }
    let ret=0;
    for(let i=1;i<posarr.length;i++){
        for(let j=0;j<i;j++){
            ret+=Math.abs(posarr[i][0]-posarr[j][0])+Math.abs(posarr[i][1]-posarr[j][1]);
        }
    }
    console.log(ret);
};
let day11b=function(input){
    console.log("=========== day 11 part 2 ==========");
    lines=input.split('\n');

    let parsedlines=[];
    for(let n in lines){
        let line=lines[n].trim();
        if(line.length==0)
            continue;

        if(line.search("#")>=0){
            parsedlines.push(line.split(''));
        } else {
            let newarr=line.split('');
            for(let i=0;i<newarr.length;i++){
                newarr[i]='-';
            }
            parsedlines.push(newarr);
        }
    }
    for(let m=0;m<parsedlines[0].length;m++){
        let poundfound=false;
        for(let n=0;n<parsedlines.length;n++){
            if(parsedlines[n][m]=='#'){
                poundfound=true;
                break;
            }
        }
        if(!poundfound){
            for(let n=0;n<parsedlines.length;n++){
                if(parsedlines[n][m]=="-")
                    parsedlines[n]=[...parsedlines[n].slice(0,m),'+',...parsedlines[n].slice(m+1)];
                else
                    parsedlines[n]=[...parsedlines[n].slice(0,m),'|',...parsedlines[n].slice(m+1)];
            }
            m++;
        }
    }
     //Debug to check the + and - look correct.
    //eg: 
    /*

..|#.|..|.
..|..|.#|.
#.|..|..|.
--+--+--+-
..|..|#.|.
.#|..|..|.
..|..|..|#
--+--+--+-
..|..|.#|.
#.|.#|..|.

    for(let n=0;n<parsedlines.length;n++){
        let row="";
        for(let m=0;m<parsedlines[0].length;m++){
            row=row+parsedlines[n][m];
        }
        console.log(row);
    } */
    let posarr=[];
    for(let n=0;n<parsedlines.length;n++){
        for(let m=0;m<parsedlines[0].length;m++){
            if(parsedlines[n][m]=='#')
                posarr.push([n,m]);
        }
    }
    let ret=0;
    let horizdist=function(a,b){
        if(a==b)
            return 0;
        if(b<a)
            return horizdist(b,a);
        let ret=0;
        for(let i=a;i<b;i++){
            if(parsedlines[0][i]=='|'||parsedlines[0][i]=='+')
                ret+=1000000;
            else
                ret+=1;
        }
        return ret;
    }
    let vertdist=function(a,b){
        if(a==b)
            return 0;
        if(b<a)
            return vertdist(b,a);
        let ret=0;
        for(let i=a;i<b;i++){
            if(parsedlines[i][0]=='-'||parsedlines[i][0]=='+')
                ret+=1000000;
            else
                ret+=1;
        }
        return ret;
    }
    for(let i=1;i<posarr.length;i++){
        for(let j=0;j<i;j++){
            ret+=horizdist(posarr[i][1],posarr[j][1])+vertdist(posarr[i][0],posarr[j][0]);
        }
    }
    console.log(ret);
};


day11a(input);
day11b(input);
/*
if(typeof testinput!=='undefined'){
    console.log("Test Input");
    if(typeof day11a!=='undefined')
        day11a(testinput);
    if(typeof day11b!=='undefined')
        day11b(testinput);
}
if(typeof input!=='undefined'){
    console.log("Real Input");
    if(typeof day11a!=='undefined')
        day11a(input);
    if(typeof day11b!=='undefined')
        day11b(input);
}*/
