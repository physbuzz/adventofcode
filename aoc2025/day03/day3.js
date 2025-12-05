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

let day3a=function(input){
    console.log("=========== day 3 part 1 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);
    let ret=0;
    for(let i=0;i<lines.length;i++){
        let line=lines[i].split('');
        let jchosen=0;
        let d1=+line[0];
        for(let j=1;j<line.length-1;j++){
            if((+line[j])>d1){
                d1=(+line[j]);
                jchosen=j;
            }
        }
        let d2=+line[jchosen+1];
        for(let j=jchosen+2;j<line.length;j++){
            if((+line[j])>d2){
                d2=(+line[j]);
            }
        }
        ret+=d1*10+d2;

    }

    console.log(ret);
};

let day3b=function(input){
    console.log("=========== day 3 part 2 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);
    let ret=0;

    let maxRange=function(list,a,b){
        let jchosen=a;
        let d=+list[a];
        for(let j=a+1;j<b;j++){
            if((+list[j])>d){
                d=(+list[j]);
                jchosen=j;
            }
        }
        return [d,jchosen];
    };

    for(let i=0;i<lines.length;i++){
        let line=lines[i].split('');

        let ds=[];
        let js=[0];


        let ndigits=12;
        //let jchosen=0;
        //let d1=+line[0];
        let lastchosen=0;
        let num=0;
        for(let k=0;k<ndigits;k++){

            let [d,jchosen]=maxRange(line,lastchosen,line.length-(ndigits-1-k));
            lastchosen=jchosen+1;
            ds.push(d);
            num*=10;
            num+=d;
        }
        ret+=num;

    }

    console.log(ret);
};

//day3a(testinput);
//day3a(input);
day3b(testinput);
day3b(input);

