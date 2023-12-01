const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const input=readFileAsString("input.txt");



let day1a=function(){
    let lines=input.split('\n');
    let nums=[];
    let numtotal=0;

    function isDigitQ(c){
        return (0<=c.charCodeAt(0)-('0'.charCodeAt(0))) && (c.charCodeAt(0)-('0'.charCodeAt(0))<10);
    }

    for(let i=0;i<lines.length;i++){
        let line=lines[i];
        let firstdig='';
        let lastdig='';
        for(let j=0;j<line.length;j++){
            let c=line[j];
            //console.log(c-('0'.charCodeAt(0)));
            if(isDigitQ(c)){
                firstdig=c;
                break;
            }
        }
        for(let j=line.length-1;j>=0;j--){
            let c=line[j];
            //console.log(c-('0'.charCodeAt(0)));
            if(isDigitQ(c)){
                lastdig=c;
                break;
            }
        }
        nums[i]=+(firstdig+lastdig);
        numtotal+=nums[i];
    }

    console.log("======= day 1, problem 1 ========");
    //console.log(nums);
    console.log(numtotal);
};

let day1b=function(){
    let lines=input.split('\n');
    let nums=[];
    let numtotal=0;
    const digits=['0','1','2','3','4','5','6','7','8','9','zero',
        'one','two','three','four','five','six','seven','eight','nine'];
    const digitvals=[0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9];

    /* See if the character at src[j] matches any of the substrings in the digit
     * array. Return the value of the digit if yes, otherwise return -1. */
    let matchDigit=function(src,j){
        let k=0;
        for(k=0;k<digits.length;k++){
            let l=0;
            for(l=0;l<digits[k].length && j+l<src.length;l++){
                if(digits[k][l]!=src[j+l])
                    break;
            }
            if(l==digits[k].length)
                break;
        }
        if(k<digits.length)
            return digitvals[k];
        return -1;
    }

    /* Same algorithm as in part 1: Find the first digit match, then the last 
     * digit match. */
    for(let i=0;i<lines.length;i++){
        let line=lines[i];
        //silently skip empty lines
        if(line.length==0)
            continue;

        let firstdig=-1;
        let lastdig=-1;
        for(let j=0;j<line.length;j++){
            let newdig=matchDigit(line,j);
            if(newdig>=0){
                firstdig=newdig;
                break;
            }
        }
        for(let j=line.length-1;j>=0;j--){
            let newdig=matchDigit(line,j);
            if(newdig>=0){
                lastdig=newdig;
                break;
            }
        }
        nums[i]=(10*firstdig+lastdig);
        numtotal+=nums[i];
    }

    console.log("======= day 1, problem 2 ========");
    //console.log(nums);
    console.log(numtotal);
};


day1a();
day1b();

/*
    let str='sevennine3gsmxncqlqvfktxrtcone';

    let digitmap={'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,
'zero':0,
        'one':1,'two':2,'three':3,'four':4,'five':5,'six':6,'seven':7,'eight':8,'nine':9};
    lines=['123twone'];
    let lines2=lines.map((str)=>(str.match(/(=[0-9]|zero|one|two|three|four|five|six|seven|eight|nine)/g)));//.map((arr)=>10*digitmap[arr[0]]+digitmap[arr[arr.length-1]]);
    console.log(lines2);*/
    /*
let total=0;
for(let i=0;i<lines2.length;i++){
    total+=lines2[i];
}*/
    //console.log(total);

    //console.log( [...'twoone'.matchAll(/(?=(one|two))/)]);
