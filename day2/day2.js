const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const input=readFileAsString("input.txt");


let day2a=function(input){
    lines=input.split('\n');


    /* return {r:num,g:num,b:num} */
    let parseTriple=function(str){
        let ret={r:0,g:0,b:0};
        let arr=str.split(',');
        for(let j=0;j<arr.length;j++){
            let text=arr[j].trim();
            let num=parseInt(text);
            if(text.match(/red/)){
                ret.r+=num;
            } else if(text.match(/green/)){
                ret.g+=num;
            } else if(text.match(/blue/)){
                ret.b+=num;
            } else {
                console.log("Error in parseTriple, no rgb match?");
            }
        }
        return ret;
    };
    let idsum=0;
    for(let i=0;i<lines.length;i++){
        let line=lines[i];
        if(line.length==0)
            continue;
        let g1=line.split(':');
        let id=parseInt(g1[0].substring(5));

        let g2=g1[1].split(';');
        let j=0;

        for(j=0;j<g2.length;j++){
            let x=parseTriple(g2[j]);
            if(x.r>12 || x.g>13 || x.b>14){
                break;
            }
        }
        if(j==g2.length){
            idsum+=id;
        }

    }



    console.log("=========== day 2 part 1 ==========");
    console.log(idsum);
};

let day2b=function(input){
    lines=input.split('\n');


    /* return {r:num,g:num,b:num} */
    let parseTriple=function(str){
        let ret={r:0,g:0,b:0};
        let arr=str.split(',');
        for(let j=0;j<arr.length;j++){
            let text=arr[j].trim();
            let num=parseInt(text);
            if(text.match(/red/)){
                ret.r+=num;
            } else if(text.match(/green/)){
                ret.g+=num;
            } else if(text.match(/blue/)){
                ret.b+=num;
            } else {
                console.log("Error in parseTriple, no rgb match?");
            }
        }
        return ret;
    };
    let powersum=0;
    for(let i=0;i<lines.length;i++){
        let line=lines[i];
        if(line.length==0)
            continue;
        let g1=line.split(':');
        let id=parseInt(g1[0].substring(5));

        let g2=g1[1].split(';');
        let j=0;
        let rr=0;
        let gg=0;
        let bb=0;

        for(j=0;j<g2.length;j++){
            let x=parseTriple(g2[j]);
            if(x.r>rr)
                rr=x.r;
            if(x.g>gg)
                gg=x.g;
            if(x.b>bb)
                bb=x.b;
        }
        powersum+=rr*gg*bb;

    }



    console.log("=========== day 2 part 2 ==========");
    console.log(powersum);
};
day2a(input);
day2b(input);
