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

let day19a=function(input){
    console.log("=========== day 19 part 1 ==========");

    let lines=input.split('\n').map( x=> x.trim()).filter(line => line.length>0);
    let avail= lines.shift().split(',').map(x => x.trim());

    let minlength=avail.reduce((a,b)=>Math.min(a,b.length),100);

    let poss={};
    let possibleQ=function(str){
        //console.log("Testing string "+str);
        if(poss[str]!==undefined){
            //console.log("returned "+poss[str]+" from cached value");
            return poss[str];
        }
        if(avail.includes(str)){
            poss[str]=true;
            //console.log("returned "+poss[str]+" from includes");
            return true;
        }
        if(str.length<=minlength){
            poss[str]=false;
            //console.log("returned "+poss[str] + "from minlength test");
            return false;
        }
        //recursive case
        for(let i=1;i<str.length;i++){
            let ret=possibleQ(str.substring(0,i))&&possibleQ(str.substring(i));
            if(ret){
                poss[str]=true;
                //console.log("returned "+poss[str]);
                return true;
            }
        }
        poss[str]=false;
        //console.log("returned "+poss[str]+ " from fallthrough");
        return false;
    };

    let ret=0;
    for(let pattern of lines){
        //console.log("\n");
        //console.log("Working on string "+pattern);
        if(possibleQ(pattern))
            ret++;

    }
    console.log(ret);

};


let day19b=function(input){
    console.log("=========== day 19 part 2 ==========");
    let lines=input.split('\n').map( x=> x.trim()).filter(line => line.length>0);
    let avail= lines.shift().split(',').map(x => x.trim());
    let maxlength=avail.reduce((a,b)=>Math.max(a,b.length),1);
    let poss={};
    let possibleN=function(str){
        if(poss[str]!==undefined)
            return poss[str];
        poss[str]=0;
        for(let i=1;i<=Math.min(str.length,maxlength);i++)
            if(avail.includes(str.substring(0,i)))
                if(i==str.length)
                    poss[str]+=1;
                else
                    poss[str]+=possibleN(str.substring(i));
        return poss[str];
    };
    console.log(lines.reduce((a,b)=>a+possibleN(b),0));
}

//day19a(testinput);
day19a(input);
//day19b(testinput);
day19b(input);
