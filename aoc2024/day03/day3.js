// some days you just wake up and want to type 200 lines for a simple problem :~)

const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const testinput="xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
const input=readFileAsString("input.txt");

let Differences= arr=>arr.slice(1).map((b,a)=>b-arr[a]);
let Sum=arr=>arr.reduce((a,b)=>a+b,0);
let Last=arr=>arr[arr.length-1];
let First=arr=>arr[0];

let day3a=function(input){
    console.log("=========== day 3 part 1 ==========");

    //state=0: no match
    //state=1,2,3,4 parsing m,u,l,(
    //state=5, parsing num1
    //state=6, parsing ,
    //state=7, parsing num2
    //state=8, parsing ), push.


    let state=0;
    let num1="";
    let num2="";
    let i=0;

    let zerochar='0'.charCodeAt(0);
    let ninechar='9'.charCodeAt(0);
    let retsum=0;
    for(i=0;i<input.length;i++){

        // B)
        // don't use big chains of if-statements like this
        // (unless you're super cool)
        if(state==0){
            if(input[i]=='m')
                state=1;
        }else if(state==1){
            if(input[i]=='u')
                state=2;
            else {
                state=0;
                i--;
            }
        }else if(state==2){
            if(input[i]=='l')
                state=3;
            else{
                state=0;
                i--;
            }
        }else if(state==3){
            if(input[i]=='(')
                state=4;
            else {
                state=0;
                i--;
            }
        }else if(state==4){
            if(zerochar<=input[i].charCodeAt(0) && input[i].charCodeAt(0)<=ninechar){
                num1=input[i];
                state=5;
            } else {
                state=0;
                i--;
            }

        }else if(state==5){
            if(zerochar<=input[i].charCodeAt(0) && input[i].charCodeAt(0)<=ninechar){
                num1=num1+input[i];
                state=5;
            } else if(input[i]===','){
                state=6;
            } else {
                state=0;
                i--;
                num1="";
            }
        }else if(state==6){
            if(zerochar<=input[i].charCodeAt(0) && input[i].charCodeAt(0)<=ninechar){
                num2=input[i];
                state=7;
            } else {
                state=0;
                i--;
            }
        }else if(state==7){
            if(zerochar<=input[i].charCodeAt(0) && input[i].charCodeAt(0)<=ninechar){
                num2=num2+input[i];
                state=7;
            } else if(input[i]===')'){

                state=0;
                retsum+=(+num1)*(+num2);
                num1="";
                num2="";
            } else {
                state=0;
                i--;
                num1="";
            }
        }
    }
    console.log(retsum);
};

let day3b=function(input){
    console.log("=========== day 3 part 2 ==========");
    //state=0: no match
    //state=1,2,3,4 parsing m,u,l,(
    //state=5, parsing num1
    //state=6, parsing ,
    //state=7, parsing num2
    //state=8, parsing ), push.
    //
    //
    let checkdo=function(index){
        if(input.substring(index,index+4)=="do()")
            return true;
        return false;
    }
    let checkdont=function(index){
        if(input.substring(index,index+7)=="don't()")
            return true;
        return false;
    }
    let checkmul=function(index){
        if(input.substring(index,index+4)=="mul(")
            return true;
        return false;
    }


    let state=0;
    let num1="";
    let num2="";
    let i=0;

    let zerochar='0'.charCodeAt(0);
    let ninechar='9'.charCodeAt(0);
    let retsum=0;
    let enabled=true;
    for(i=0;i<input.length;i++){

        // B)
        // don't use big chains of if-statements like this
        // (unless you're super cool)
        if(state==0){
            if(checkmul(i)){
                i+=4-1;
                state=4;
            } else if(checkdo(i)){
                enabled=true;
                state=0;
            } else if(checkdont(i)){
                enabled=false;
                state=0;
            }
            if(input[i]=='m')
                state=1;
        }else if(state==1){
            if(input[i]=='u')
                state=2;
            else {
                state=0;
                i--;
            }
        }else if(state==2){
            if(input[i]=='l')
                state=3;
            else{
                state=0;
                i--;
            }
        }else if(state==3){
            if(input[i]=='(')
                state=4;
            else {
                state=0;
                i--;
            }
        }else if(state==4){
            if(zerochar<=input[i].charCodeAt(0) && input[i].charCodeAt(0)<=ninechar){
                num1=input[i];
                state=5;
            } else {
                state=0;
                i--;
            }

        }else if(state==5){
            if(zerochar<=input[i].charCodeAt(0) && input[i].charCodeAt(0)<=ninechar){
                num1=num1+input[i];
                state=5;
            } else if(input[i]===','){
                state=6;
            } else {
                state=0;
                i--;
                num1="";
            }
        }else if(state==6){
            if(zerochar<=input[i].charCodeAt(0) && input[i].charCodeAt(0)<=ninechar){
                num2=input[i];
                state=7;
            } else {
                state=0;
                i--;
            }
        }else if(state==7){
            if(zerochar<=input[i].charCodeAt(0) && input[i].charCodeAt(0)<=ninechar){
                num2=num2+input[i];
                state=7;
            } else if(input[i]===')'){

                state=0;
                if(enabled)
                    retsum+=(+num1)*(+num2);
                num1="";
                num2="";
            } else {
                state=0;
                i--;
                num1="";
            }
        }
    }
    console.log(retsum);
};

//day3a(testinput);
day3a(input);
//day3a(testinput);
day3b(input);
