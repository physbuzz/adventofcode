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

let day02a=function(input){
    console.log("=========== day 02 part 1 ==========");
    let lines=input.split(',').map( x=> x.trim()).filter(line => line.length>0);
    let ret=0;
    let validID=function(str){
        str=""+str;
        let l=str.length;
        if(l%2==0){
            //console.log(str.substr(0,l/2));
            //console.log(str.substr(l/2,l));
            if(str.substr(0,l/2)==str.substr(l/2,l))
                return false;
        }
        return true;
    };
    for(let i=0;i<lines.length;i++){
        let line=lines[i];
        let abc=line.split('-');
        for(let i=(+abc[0]); i<=(+abc[1]);i++)
            if(!validID(i))
                ret+=i;
    }
    console.log(ret);
};
let day02b=function(input){
    console.log("=========== day 02 part 2 ==========");
    let lines=input.split(',').map( x=> x.trim()).filter(line => line.length>0);
    let ret=0;
    let validID=function(str){
        str=""+str;
        let l=str.length;
        for(let k=2; k<=l;k++){
            if(l%k==0){

                let allequals=true;
                for(let j=1;j<k;j++){
                    /*console.log("l="+l);
                    console.log("j="+j);
                    console.log("k="+k);*/
                    //console.log(str.substring(0,l/k)+" vs "+str.substring(l/k*j,l/k*(j+1)))
                    if(str.substr(0,l/k)!=str.substring(l/k*j,l/k*(j+1)))
                        allequals=false;
                }
                if(allequals)
                    return false;
            }
        }
        return true;
    };
    for(let i=0;i<lines.length;i++){
        let line=lines[i];
        let abc=line.split('-');
        for(let i=(+abc[0]); i<=(+abc[1]);i++){
            if(!validID(i)){
                //console.log(i);
                ret+=i;
            }
        }
    }
    console.log(ret);
};

//day02a(testinput);
day02a(input);
//day02b(testinput);
day02b(input);
