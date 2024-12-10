const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const input=readFileAsString("input.txt");


let day4a=function(input){
    lines=input.split('\n');

    let parseNumList=function(str){
        let lst=str.split(' ');
        let ret=[];
        for(l of lst){
            if(l.length>0){
                ret.push(parseInt(l));
            }
        }
        return ret;
    };
    let parseCodeMap=function(str){
        let lst=str.split(' ');
        let ret={};
        for(l of lst){
            if(l.length>0){
                ret[l]=true;
            }
        }
        return ret;
    };
    let totscore=0;
    for(let n=0;n<lines.length;n++){
        let line=lines[n].trim();
        let idcolon=line.search(/:/);
        let idbar=line.search(/\|/);
        let idstring=line.substring(0,idcolon);
        let winningnums=parseCodeMap(line.substring(idcolon+1,idbar).trim());
        let scratchnums=parseNumList(line.substring(idbar+1).trim());
        let linescore=0;
        for(let num of scratchnums){
            if(winningnums[num]){
                if(linescore==0){
                    linescore=1;
                } else {
                    linescore*=2;
                }
            }
        }
        totscore+=linescore;


    }

    console.log("=========== day 4 part 1 ==========");
    console.log(totscore);
};

let day4b=function(input){
    lines=input.split('\n');

    let parseNumList=function(str){
        let lst=str.split(' ');
        let ret=[];
        for(l of lst){
            if(l.length>0){
                ret.push(parseInt(l));
            }
        }
        return ret;
    };
    let parseCodeMap=function(str){
        let lst=str.split(' ');
        let ret={};
        for(l of lst){
            if(l.length>0){
                ret[l]=true;
            }
        }
        return ret;
    };

    let getCardMatches=function(line){
        let idcolon=line.search(/:/);
        let idbar=line.search(/\|/);
        let idstring=line.substring(0,idcolon);
        let winningnums=parseCodeMap(line.substring(idcolon+1,idbar).trim());
        let scratchnums=parseNumList(line.substring(idbar+1).trim());
        let linescore=0;
        for(let num of scratchnums){
            if(winningnums[num])
                linescore++;
        }
        return linescore;
    };
    let ncopies=[];
    for(let n=0;n<lines.length;n++){
        ncopies[n]=1;
    }

    let totscore=0;
    for(let n=0;n<lines.length;n++){
        let line=lines[n].trim();
        if(line.length==0)
            continue;

        let M=getCardMatches(line);
        for(let m=0;m<M;m++){
            ncopies[n+m+1]+=ncopies[n];
        }
        totscore+=ncopies[n];
    }

    console.log("=========== day 4 part 2 ==========");
    console.log(totscore);
}

day4a(input);
day4b(input);
