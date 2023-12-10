const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const input=readFileAsString("input.txt");



let day8a=function(input){
    lines=input.split('\n');
    let seq=lines[0].trim().split('');


    let m={};
    let parseLine=function(l){
        m[l.substring(0,3)]=[l.substring(7,10),l.substring(12,15)];
    };
    for(let n in lines){
        let line=lines[n];
        if(line.length==0)
            continue;
        if(n>1)
            parseLine(line);
    }
    let step=0;
    let endtoken="ZZZ";
    let token="AAA";

    while(token!=endtoken){
        let s=(seq[step%seq.length]=='L')?0:1;
        token=m[token][s];
        step++;
    }
    console.log("=========== day 8 part 1 ==========");
    console.log(step);
};
let day8b=function(input){
    lines=input.split('\n');
    let seq=lines[0].trim().split('');


    let m={};
    let parseLine=function(l){
        m[l.substring(0,3)]=[l.substring(7,10),l.substring(12,15)];
    };
    for(let n in lines){
        let line=lines[n];
        if(line.length==0)
            continue;
        if(n>1)
            parseLine(line);
    }
    let findCycleLength=function(endtoken,phase){
        let token=endtoken;
        let step=0;
        while(step==0 || token!=endtoken){
            let s=(seq[(step+phase)%seq.length]=='L')?0:1;
            token=m[token][s];
            step++;
        }
        return step;
    };
    let findFirstZ=function(startToken){
        let token=startToken;
        let step=0;
        while(token[2]!=="Z"){
            let s=(seq[(step)%seq.length]=='L')?0:1;
            token=m[token][s];
            step++;
        }
        return [token,step];
    };
    //Let's just throw in a cheeky Euclidean algo
    let gcd=function(a,b){
        if(a==b || a==1)
            return a;
        if(b<a)
            return gcd(b,a);
        let c=b%a;
        if(c==0)
            return a;
        return gcd(c,a);
    };
    
    console.log("=========== day 8 part 2 ==========");

    let tokens=Object.keys(m).filter( (s) => s[2]=="A");
    tokens=tokens.map(function(t) {
        let s=findFirstZ(t);
        //console.log(s[1]%seq.length); //These are all zero!
        //So we're dealing with a really specific and convenient bunch of cycles.
        let q=findCycleLength(s[0],s[1]);
        return [s[0],s[1],q];
    });
    let retlcm=tokens[0][1];
    //let prod=tokens[0][1];
    for(let i=1;i<tokens.length;i++){
        retlcm=retlcm*tokens[i][1]/gcd(retlcm,tokens[i][1]);
    }
    console.log(retlcm);
};

day8a(input);
day8b(input);
