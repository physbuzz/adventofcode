const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const input=readFileAsString("input.txt");


let day3a=function(input){
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

    //0==parsing emptiness
    //1==parsing a number, no symbol found yet
    //2==parsing a number, symbol found.
    let parsemode=0;
    let number=0;
    let factor=1; //1, 10, or 100 depending on size of number being added
    let retsum=0;
    for(let n=0;n<N;n++){
        let str="";
        for(let m=0;m<M;m++){
            let ch=input[n*(M+1)+m];
            if(parsemode==0){
                if(charNumberQ(ch)){
                    number=ch.charCodeAt(0)-48;
                    let adj=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1]];
                    let symbolflag=adj.map((pair)=>(
                        validIndexQ(m+pair[0],n+pair[1])&&charSymbolQ(input[(n+pair[1])*(M+1)+m+pair[0]])
                    )).reduce((a,b)=>a||b,false);
                    //If a symbol was found, set parse mode to 2. else 1.
                    if(symbolflag)
                        parsemode=2;
                    else
                        parsemode=1;
                }
                //if it's not a number, we don't care.
            } else {
                //in any case that we find a number, add it to the current 3 digit number parse.
                if(charNumberQ(ch)){
                    number=number*10;
                    number+=ch.charCodeAt(0)-48;
                }
                //still have to deal with parsing logic:
                if(charNumberQ(ch)){
                    //^ if we find a number, keep parsing.
                    let adj=[[0,-1],[0,1]];
                    let symbolflag=adj.map((pair)=>(
                        validIndexQ(m+pair[0],n+pair[1])&&charSymbolQ(input[(n+pair[1])*(M+1)+m+pair[0]])
                    )).reduce((a,b)=>a||b,false);
                    if(symbolflag){
                        parsemode=2;
                    }
                }
                if((!charNumberQ(ch))||m==M-1){
                    //if it's not a number or we're at the end of the line, do parser wrap up.
                    let adj=[[0,-1],[0,0],[0,1]];
                    let symbolflag=adj.map((pair)=>(
                        validIndexQ(m+pair[0],n+pair[1])&&charSymbolQ(input[(n+pair[1])*(M+1)+m+pair[0]])
                    )).reduce((a,b)=>a||b,false);
                    if(symbolflag){
                        parsemode=2;
                    }
                    //parser wrap up:
                    if(parsemode===2){
                        /*
                        if(n<=5){
                            console.log("number touching symbol found:"+number);
                        }*/
                        retsum+=number;
                        number=0;
                    }
                    parsemode=0;
                }
            }





            /*
            if(charSymbolQ(ch)){
                str+="s";
            } else if(charNumberQ(ch)){
                str+="n";
            } else {
                str+=".";
            }*/
        }
        //if(n<5)
            //console.log(str);
    }
    //n*(M+1)+m
    /*
    console.log("nlines: "+lines.length);
    console.log("nlines[0]: "+lines[0].length);
    console.log("input: "+input.length);


    let sum=0;
    for(let i=0;i<lines.length;i++){
        let line=lines[i];
        if(line.length==0)
            continue;

    }*/

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

    //0==parsing emptiness
    //1==parsing a number, no symbol found yet
    //2==parsing a number, symbol found.
    let parsemode=0;
    let number=0;
    let factor=1; //1, 10, or 100 depending on size of number being added
    let retsum=0;
    let numberGearList=[]; //if we're parsing a number, this points to the locations of all the gears touching.
    
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
        let str="";


        for(let m=0;m<M;m++){
            let ch=input[n*(M+1)+m];
            if(parsemode==0){
                if(charNumberQ(ch)){
                    number=ch.charCodeAt(0)-48;
                    let adj=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1]];
                    let symbolflag=adj.map((pair)=>(handleSymbolCheck(m+pair[0],n+pair[1]))).reduce((a,b)=>a||b,false);
                    //If a symbol was found, set parse mode to 2. else 1.
                    if(symbolflag)
                        parsemode=2;
                    else
                        parsemode=1;
                }
                //if it's not a number, we don't care.
            } else {
                //in any case that we find a number, add it to the current 3 digit number parse.
                if(charNumberQ(ch)){
                    number=number*10;
                    number+=ch.charCodeAt(0)-48;
                }
                //still have to deal with parsing logic:
                if(charNumberQ(ch)){
                    //^ if we find a number, keep parsing.
                    let adj=[[0,-1],[0,1]];
                    let symbolflag=adj.map((pair)=>(handleSymbolCheck(m+pair[0],n+pair[1]))).reduce((a,b)=>a||b,false);
                    if(symbolflag){
                        parsemode=2;
                    }
                }
                //Not a number, so we'll do wrap up later but 
                //for now we have to check the 3 ending characters (right side of the rect around the number)
                if(!charNumberQ(ch)){
                    let adj=[[0,-1],[0,0],[0,1]];
                    let symbolflag=adj.map((pair)=>(handleSymbolCheck(m+pair[0],n+pair[1]))).reduce((a,b)=>a||b,false);
                    if(symbolflag){
                        parsemode=2;
                    }
                }
                if((!charNumberQ(ch))||m==M-1){
                    //parser wrap up:
                    if(parsemode===2){
                        numberGearList.forEach(function(idx){
                            if(gearMap[idx]===undefined)
                                gearMap[idx]=[number];
                            else
                                gearMap[idx].push(number);
                        });
                        /*
                        if(n<=5){
                            console.log("number touching symbol found:"+number);
                        }*/
                        //retsum+=number;
                        //number=0;
                    }
                    numberGearList=[];
                    parsemode=0;
                }
            }





            /*
            if(charSymbolQ(ch)){
                str+="s";
            } else if(charNumberQ(ch)){
                str+="n";
            } else {
                str+=".";
            }*/
        }
        //if(n<5)
            //console.log(str);
    }
    console.log("=========== day 3 part 2 ==========");

    retsum=0;
    for(let i in gearMap){
        console.log(gearMap[i]);
        if(gearMap[i].length==2){
            retsum+=gearMap[i][0]*gearMap[i][1];
        }
    }
    console.log(retsum);
    //console.log(gearMap.keys());
    //n*(M+1)+m
    /*
    console.log("nlines: "+lines.length);
    console.log("nlines[0]: "+lines[0].length);
    console.log("input: "+input.length);


    let sum=0;
    for(let i=0;i<lines.length;i++){
        let line=lines[i];
        if(line.length==0)
            continue;

    }*/

};

day3a(input);
day3b(input);

//console.log([false,false,true].reduce((a,b)=>a||b,false));
