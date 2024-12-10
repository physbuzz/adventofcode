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
    lines=input.split('\n');

    let hash=function(str){
        let str2=str.trim().split('');
        let ret=0;
        for(let c of str2){
            ret=((ret+c.charCodeAt(0))*17)%256;
        }
        return ret;
    };
    let ret=0;
    ret=lines[0].trim().split(',').map(hash).reduce((a,b)=>a+b,0);
    console.log(ret);
};
let day15b=function(input){
    console.log("=========== day 15 part 2 ==========");
    lines=input.split('\n');

    let hash=function(str){
        let str2=str.trim().split('');
        let ret=0;
        for(let c of str2){
            ret=((ret+c.charCodeAt(0))*17)%256;
        }
        //console.log(str+" "+ret);
        return ret;
    };

    let lst=lines[0].trim().split(',');
    let m=[];
    for(let lbl of lst){
        let i1=lbl.search(/=/);
        let i2=lbl.search(/-/);
        if(i1>0){
            let labelstr=lbl.substr(0,i1);
            let i=hash(labelstr);
            if(m[i]===undefined){
                m[i]=[];
            }
            let j=m[i].findIndex((x)=>x[0]==labelstr);
            if(j>=0){
                m[i][j]=[labelstr,+lbl.substr(i1+1)];
            } else {
                m[i].push([labelstr,+lbl.substr(i1+1)]);
            }
        } else if(i2>0) {
            let labelstr=lbl.substr(0,i2);
            let i=hash(labelstr);
            if(m[i]!=undefined){
                let j=m[i].findIndex((x)=>x[0]==labelstr);
                if(j>=0){
                    m[i].splice(j,1);
                }
            }
        } else {
            console.log("Error not found: "+lbl);
        }
    }
    let ret=0;
    for(let i in m){
        for(let j=0;j<m[i].length;j++){
            ret+=((+i)+1)*(j+1)*m[i][j][1];
        }
    }
    console.log(ret);
};




day15a(input);
//day15a(testinput);
day15b(input);
//day15b(testinput);
