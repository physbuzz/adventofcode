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

let day7a=function(input){
    console.log("=========== day 7 part 1 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);
    let ret=0;

    for(let i=0;i<lines.length;i++){
        let line=lines[i];
        let test=(+line.split(":")[0]);
        let rest=(line.split(":")[1]).trim().split(' ').map( x => +x);
        for(let j=0;j<Math.pow(2,rest.length-1);j++){
            let jcpy=j;
            let cc=rest[0];
            for(let k=1;k<rest.length;k++){
                if(jcpy&1 === 1){
                    cc*=rest[k];
                } else {
                    cc+=rest[k];
                }
                jcpy=jcpy>>1;
            }
            if(cc === test) {
                ret+=test;
                break;
            }
        }
    }

    console.log(ret);
};

let day7b=function(input){
    console.log("=========== day 7 part 2 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);
    let ret=0;

    for(let i=0;i<lines.length;i++){
        let line=lines[i];
        let test=(+line.split(":")[0]);
        let rest=(line.split(":")[1]).trim().split(' ').map( x => +x);
        for(let j=0;j<Math.pow(3,rest.length-1);j++){
            let jcpy=j;
            let cc=rest[0];
            for(let k=1;k<rest.length;k++){
                let ss=jcpy%3;
                if(ss === 2){
                    cc*=rest[k];
                } else if(ss===1){
                    cc+=rest[k];
                } else {
                    cc=+(cc+""+rest[k]);
                }
                jcpy=Math.floor(jcpy/3);
            }
            if(cc === test) {
                ret+=test;
                break;
            }
        }
    }

    console.log(ret);


    console.log(ret);
};

//day7a(testinput);
//day7a(input);
day7b(testinput);
day7b(input);
