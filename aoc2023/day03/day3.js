const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const input=readFileAsString("input.txt");


let day3a=function(input){
    lines=input.split('\n');

    let M=lines[0].length;
    let N=lines.length-1;

    /* Going for a straight-up state machine parser.
     * There are M columns of text, plus 1 column of newlines, and 
     * N rows.
     * So we can access non-newline characters via input[n*(M+1)+m]
     * for 0<=m<M and 0<=n<N.
     * */

    let validIndexQ=function(x,y){
        return (x>=0&&y>=0&&x<M&&y<N);
    };
    /* True if we are any ascii symbol ! through /, : through @, or [ through `, excluding "." */
    let charSymbolQ=function(ch){
        let a=ch.charCodeAt(0);
        return (33<=a&&a<48&&a!=46)||(58<=a&&a<65)||(91<=a && a<97);
    };
    //True for digits 0-9.
    let charNumberQ=function(ch){
        let a=ch.charCodeAt(0);
        return (48<=a&&a<58);
    };

    //Check if the character at (x,y) is a symbol with bounds checking
    let handleSymbolCheck=function(x,y){
        return validIndexQ(x,y) && charSymbolQ(input[y*(M+1)+x]);
    };

    //0==parsing emptiness
    //1==parsing a number, no symbol found yet
    //2==parsing a number, symbol found.
    let parsemode=0;
    
    //The current number being parsed
    let number=0;

    //The total sum of part numbers
    let retsum=0;

    for(let n=0;n<N;n++){
        for(let m=0;m<M;m++){
            let ch=input[n*(M+1)+m];

            let chq=charNumberQ(ch);
            //If we're not on a number and we're not in the process of parsing a num, next.
            if(parsemode==0 && !chq)
                continue;

            //If we're on a number, append its digit
            if(chq){
                number=number*10;
                number+=ch.charCodeAt(0)-48;
            }
            let adj;
            if(parsemode==0 && chq) {
                adj=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1]]; 
                parsemode=1;
            } else if(parsemode>0 && chq)
                adj=[[0,-1],[0,1]];
            else 
                adj=[[0,-1],[0,0],[0,1]];
            let symbolflag=adj.map((pair)=>(handleSymbolCheck(m+pair[0],n+pair[1]))).reduce((a,b)=>a||b,false);
            if(symbolflag && parsemode==1)
                parsemode=2;

            //handle end of number (we've detected a non-number or EOL)
            if(!chq || m==M-1){
                if(parsemode==2){
                    //if we detected a number and symbol, add it to the sum.
                    retsum+=number;
                }
                number=0;
                parsemode=0;
            }
        }
    }
    console.log("=========== day 3 part 1 ==========");
    console.log(retsum);
};
let day3b=function(input){
    lines=input.split('\n');

    let M=lines[0].length;
    let N=lines.length-1;
    let validIndexQ=function(x,y){
        return (x>=0&&y>=0&&x<M&&y<N);
    };
    let charSymbolQ=function(ch){
        let a=ch.charCodeAt(0);
        return (33<=a&&a<48&&a!=46)||(58<=a&&a<65)||(91<=a && a<97);
    };
    let charNumberQ=function(ch){
        let a=ch.charCodeAt(0);
        return (48<=a&&a<58);
    };
    let gearMap=[];

    let parsemode=0;
    let number=0;
    let numberGearList=[]; //if we're parsing a number, this points to the locations of all the gears touching.

    /* Update handleSymbolCheck so that we add any detected gears
     * to numberGearList */
    let handleSymbolCheck=function(x,y){
        if(!validIndexQ(x,y))
            return false;
        if(charSymbolQ(input[y*(M+1)+x])){
            if(input[y*(M+1)+x]=='*'){
                numberGearList.push(y*(M+1)+x);
            }
            return true;
        }
        return false;
    };

    for(let n=0;n<N;n++){
        for(let m=0;m<M;m++){
            //Same parsing as before, all that's changed is handleSymbolCheck and the number wrap-up.
            let ch=input[n*(M+1)+m];

            let chq=charNumberQ(ch);
            if(parsemode==0 && !chq)
                continue;
            if(chq){
                number=number*10;
                number+=ch.charCodeAt(0)-48;
            }
            let adj;
            if(parsemode==0 && chq) {
                adj=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1]]; 
                parsemode=1;
            } else if(parsemode>0 && chq)
                adj=[[0,-1],[0,1]];
            else 
                adj=[[0,-1],[0,0],[0,1]];
            let symbolflag=adj.map((pair)=>(handleSymbolCheck(m+pair[0],n+pair[1]))).reduce((a,b)=>a||b,false);

            if(!chq || m==M-1){
                //If there are any gears detected, add number to the global list of gears.
                numberGearList.forEach(function(idx){
                    if(gearMap[idx]===undefined)
                        gearMap[idx]=[number];
                    else
                        gearMap[idx].push(number);
                });
                numberGearList=[];
                number=0;
                parsemode=0;
            }
        }
    }
    console.log("=========== day 3 part 2 ==========");
    let retsum=0;
    for(let i in gearMap){
        console.log(gearMap[i]);
        if(gearMap[i].length==2){
            retsum+=gearMap[i][0]*gearMap[i][1];
        }
    }
    console.log(retsum);
};


day3a(input);
day3b(input);

//console.log([false,false,true].reduce((a,b)=>a||b,false));
