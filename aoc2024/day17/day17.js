const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const testinput=readFileAsString("testinput.txt");
const testinput2=readFileAsString("testinput2.txt");
const input=readFileAsString("input.txt");

let Differences= arr=>arr.slice(1).map((b,a)=>b-arr[a]);
let Sum=arr=>arr.reduce((a,b)=>a+b,0);
let Last=arr=>arr[arr.length-1];
let First=arr=>arr[0];

let day17a=function(input){
    console.log("=========== day 17 part 1 ==========");

    let nums=input.match(/\d+/g).map(x => +x);
    let ra=nums.shift();
    let rb=nums.shift();
    let rc=nums.shift();
    let ip=0;

    let out=[]
    let readLiteral=function(){
        let ret=nums[ip+1];
        return ret;
    };
    let readCombo=function(){
        let ret=nums[ip+1];
        if(ret<4)
            return ret;
        if(ret==4)
            return ra;
        if(ret==5)
            return rb;
        if(ret==6)
            return rc;
        console.log("Bad combo operand");
        return 0;
    };

    while(ip<nums.length){
        let instr=nums[ip];
        switch(instr){
            case 0:
                ra=ra>>readCombo();
                ip+=2;
                break;
            case 1:
                rb=rb^readLiteral();
                ip+=2;
                break;
            case 2:
                rb=(readCombo()%8);
                ip+=2;
                break;
            case 3:
                if(ra!=0){
                    ip=readLiteral();
                } else if(ra===0) {
                    ip+=2;
                }
                break;
            case 4:
                rb=rb^rc;
                ip+=2;
                break;
            case 5:
                out.push(readCombo()%8);
                ip+=2;
                break;
            case 6:
                rb=ra>>readCombo();
                ip+=2;
                break;
            case 7:
                rc=ra>>readCombo();
                ip+=2;
                break;
        }
    }

    console.log(out.join(','));
};

let day17bBruteForce=function(input){
    console.log("=========== day 17 part 2 ==========");
    let nums=input.match(/\d+/g).map(x => +x);
    let ra=nums.shift();
    let rb=nums.shift();
    let rc=nums.shift();

    let testProgram=function(ra,rb,rc){
        let ip=0;

        let outptr=0;
        let readLiteral=function(){
            let ret=nums[ip+1];
            return ret;
        };
        let readCombo=function(){
            let ret=nums[ip+1];
            if(ret<4)
                return ret;
            if(ret==4)
                return ra;
            if(ret==5)
                return rb;
            if(ret==6)
                return rc;
            console.log("Bad combo operand");
            return 0;
        };
        let keepgoin=true;

        while(ip<nums.length && keepgoin){
            let instr=nums[ip];
            switch(instr){
                case 0:
                    ra=ra>>readCombo();
                    ip+=2;
                    break;
                case 1:
                    rb=rb^readLiteral();
                    ip+=2;
                    break;
                case 2:
                    rb=(readCombo()%8);
                    ip+=2;
                    break;
                case 3:
                    if(ra!=0){
                        ip=readLiteral();
                    } else if(ra===0) {
                        ip+=2;
                    }
                    break;
                case 4:
                    rb=rb^rc;
                    ip+=2;
                    break;
                case 5:
                    if(outptr>=nums.length || (readCombo()%8)!==nums[outptr]){
                        keepgoin=false;
                    } else {
                        outptr++;
                    }
                    ip+=2;
                    break;
                case 6:
                    rb=ra>>readCombo();
                    ip+=2;
                    break;
                case 7:
                    rc=ra>>readCombo();
                    ip+=2;
                    break;
            }
        }
        return keepgoin && outptr===nums.length;

    };
    let test=0;
    while(!testProgram(test,rb,rc)){
        test++;
        if(test%50000===0)
            console.log(test);
    }
    console.log(test);
};

let day17b=function(){
    console.log("=========== day 17 part 2 ==========");

    //Return true if the last outputs match outtest
    let testLastOutput=function(ra,outtest){
        rb=0;
        rc=0;
        let nums=[2,4,1,1,7,5,1,5,4,0,5,5,0,3,3,0];
        let ip=0;
        let out=[];
        let readLiteral=function(){
            let ret=nums[ip+1];
            return ret;
        };
        let readCombo=function(){
            let ret=nums[ip+1];
            if(ret<4)
                return ret;
            if(ret==4)
                return ra;
            if(ret==5)
                return rb;
            if(ret==6)
                return rc;
            console.log("Bad combo operand");
            return 0;
        };
        let keepgoin=true;

        while(ip<nums.length && keepgoin){
            let instr=nums[ip];
            switch(instr){
                case 0:
                    ra=ra>>readCombo();
                    ip+=2;
                    break;
                case 1:
                    rb=rb^readLiteral();
                    ip+=2;
                    break;
                case 2:
                    rb=(readCombo()%8);
                    ip+=2;
                    break;
                case 3:
                    if(ra!=0){
                        ip=readLiteral();
                    } else if(ra===0) {
                        ip+=2;
                    }
                    break;
                case 4:
                    rb=rb^rc;
                    ip+=2;
                    break;
                case 5:
                    out.push(readCombo()%8);
                    ip+=2;
                    break;
                case 6:
                    rb=ra>>readCombo();
                    ip+=2;
                    break;
                case 7:
                    rc=ra>>readCombo();
                    ip+=2;
                    break;
            }
        }
        let rval=true;
        for(let i1=1;i1<=outtest.length;i1++){
            rval=rval&&(outtest[outtest.length-i1]==out[out.length-i1]);
        }
        return rval;
    };

    let ramap=function(raa){
        raa=BigInt(raa);
        let rbb=raa%BigInt(8);
        rbb=rbb^BigInt(1);
        let rcc=(raa>>rbb);
        rbb=rbb^BigInt(5);
        rbb=rbb^rcc;
        return rbb%BigInt(8);
    }
    //Checking that ramap is periodic w/ period 1024
//    let good=true;
//    for(let raa=0;raa<(1<<10);raa++){
//        good=good&&(ramap(raa)==ramap(raa+(1<<10)));
//    }
//    console.log(good);
    let inv=[];
    for(let i=0;i<8;i++){
        inv[i]=[];
        for(let raa=0;raa<(1<<10);raa++){
            if(ramap(raa)===i)
                inv[i].push(raa);
        }
    }
    //ok, so let's say we're at a generic case (NOT the base case!)
    //We've just done ra=ra>>3.
    //We want some digit d.
    //Then raa && 0x1111111111 belongs to inv[d]
    

    //Base cases first,
    let searchlist=[];
    for(let ra=0;ra<1<<12;ra++){
        if(testLastOutput(ra,[0,3,3,0]))
            searchlist.push([BigInt(ra),4]);
    }
    //let nums=[2,4,1,1,7,5,1,5,4,0,5,5,0,3,3,0];
    let nn=[0,3,3,0,5,5,0,4,5,1,5,7,1,1,4,2];
    //Okay, so the highest bits of our return number must be one of allowedbase.
    //Next, we search.
    let resultfound=false;
    let leastresult=-1;
    while(searchlist.length>0){
        //searchlist.sort((a,b)=>a[1]-b[1]);
        let [num,bits]=searchlist.shift()
        if(bits>=nn.length){
            console.log("?!?!");
        }
        for(let d=0;d<8;d++){
            let numnew=(num<<3n)|BigInt(d);
            if(ramap(numnew)===BigInt(nn[bits])){
                if(bits+1>=nn.length){
                    if(resultfound){
                        if(leastresult>numnew)
                            leastresult=numnew;
                    } else {
                        resultfound=true;
                        leastresult=numnew;
                    }
                } else {
                    searchlist.push([numnew,bits+1]);
                }
            }
        }
    }


    console.log(leastresult);
}

//day17a(testinput);
day17a(input);
//day17b(testinput2);
//day17b(input);
day17b();



