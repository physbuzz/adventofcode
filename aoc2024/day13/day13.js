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

let day13a=function(input){
    console.log("=========== day 13 part 1 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);
    let ret=0;

    for(let i=0;i<lines.length;i++){
        let [m11,m21] = lines[i].match(/\d+/g).map(x => +x);
        i++;
        let [m12,m22] = lines[i].match(/\d+/g).map(x => +x);
        i++;
        let [r1,r2] = lines[i].match(/\d+/g).map(x => +x);
        //a m11+ b m12 == r1
        //a m21+ b m22 == r2
        let det=m11*m22-m12*m21;
        if(det!=0){
            let a=(m22*r1-m12*r2)/det;
            let b=(-m21*r1+m11*r2)/det;
            if(Math.round(a)==a && Math.round(b)==b){
                if(a<0 || b<0){
                    console.log("Negative a,b!");
                } else {
                    if(a<=100 && b<= 100){
                        ret += a*3+b;
                    }
                }
            }
        } else {
            console.log("Zero determinant!");
            console.log(lines[i-2]);
            console.log(lines[i-1]);
            console.log(lines[i]);
        }
    }
    console.log(ret);
};

let day13b=function(input){
    console.log("=========== day 13 part 2 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);
    let ret=0;
    for(let i=0;i<lines.length;i++){
        let [m11,m21] = lines[i].match(/\d+/g).map(x => +x);
        i++;
        let [m12,m22] = lines[i].match(/\d+/g).map(x => +x);
        i++;
        let [r1,r2] = lines[i].match(/\d+/g).map(x => +x);
        r1+=10000000000000;
        r2+=10000000000000;
        //a m11+ b m12 == r1
        //a m21+ b m22 == r2
        let det=m11*m22-m12*m21;
        if(det!=0){
            let a=(m22*r1-m12*r2)/det;
            let b=(-m21*r1+m11*r2)/det;
            if(Math.round(a)==a && Math.round(b)==b){
                if(a<0 || b<0){
                    console.log("Negative a,b!");
                } else {
                    //if(a<=100 && b<= 100){
                        ret += a*3+b;
                    //}
                }
            }
        } else {
            console.log("Zero determinant!");
            console.log(lines[i-2]);
            console.log(lines[i-1]);
            console.log(lines[i]);
        }

    }
    console.log(ret);
};

//day13a(testinput);
day13a(input);
//day13b(testinput);
day13b(input);
