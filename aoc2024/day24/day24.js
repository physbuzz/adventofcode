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

let day24a=function(input){
    console.log("=========== day 24 part 1 ==========");
    let [ic,ops]=input.split('\n\n');

    let reg=[];
    ic=ic.split('\n').map(x=> x.trim()).filter(line => line.length>0).map(function(x){ 
        let [register,digit]=x.split(": ");
        reg[register]=BigInt(+digit);
    });


    let splitOp=function(str){
        let res=str.trim().split(' ').filter(x => x!=="->");
        //console.log(res);

        return res;
    }
    ops=ops.split('\n').filter(line => line.length>0).map(splitOp);

    let getValue=function(register){
        if(reg[register]!==undefined) {
            //console.log("Register "+register+" has cached value "+reg[register]);
            return reg[register];
        }
        for(let op of ops){
            if(op[3]===register){

                //console.log("Computing "+op[0]+" "+op[1]+" "+op[2]+" "+ op[3]);
                let res=undefined;
                let a=undefined,b=undefined;
                if(op[1]==="AND"){
                    a=getValue(op[0])<<0n;
                    b=getValue(op[2])<<0n;
                    res=a&b;
                } else if(op[1]==="OR"){
                    a=getValue(op[0])<<0n;
                    b=getValue(op[2])<<0n;
                    res=a|b;
                } else if(op[1]==="XOR") {
                    a=getValue(op[0])<<0n;
                    b=getValue(op[2])<<0n;
                    //console.log("What's going on here: "+op[2]);
                    res=a^b;
                } else {
                    console.log("uh oh");
                }
                //console.log(op[0]+" "+op[1]+" "+op[2]+" = "+ a +" "+op[1] + " " + b+ " = " + res);
                if(res!==undefined){
                    reg[register]=res;
                    //console.log("Register "+register+" has value "+res);
                    return res;
                }
            }
        }
        return undefined;
    };

    let res=0n;
    let i=0n;
    let digit=getValue('z00');
    while(digit!==undefined){
        res=res | (digit<<i);
        //console.log(digit);
        i++;
        digit=getValue('z'+(''+i).padStart(2,'0'));
    }

    console.log(res);
};

let day24b=function(input){
    console.log("=========== day 24 part 2 ==========");
    let ics=input.split('\n').map( x=> x.trim()).filter(line => line.length>0).map(x => +x);
    let ret=0;

    console.log(ret);
};

day24a(testinput);
day24a(input);
//day24b(testinput);
//day24b(input);
