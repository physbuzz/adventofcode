const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const testinput=readFileAsString("testinput.txt");
const input=readFileAsString("input.txt");

/* Not even going to clean this one up.
 * It ran first time with no bugs, it's a christmas miracle.
 * */



let Differences= arr=>arr.slice(1).map((b,a)=>b-arr[a]);
let Sum=arr=>arr.reduce((a,b)=>a+b,0);
let Last=arr=>arr[arr.length-1];
let First=arr=>arr[0];


let day19a=function(input){
    console.log("=========== day 19 part 1 ==========");


    let partindex=input.search(new RegExp("\n{"));
    let wlines=input.substring(0,partindex).split('\n').filter(line=>line.length>0);
    let plines=input.substring(partindex).split('\n').filter(line=>line.length>0);
    //console.log(plines[0]);

    //console.log(wlines[0]);


    let wtag=function(line){
        return line.substring(0,line.search(new RegExp("{")));
    };
    let winstruction=function(instr){
        let ilst=instr.split(':');
        if(ilst.length==2){
            let lt=ilst[0].search("<");
            let gt=ilst[0].search(">");
            if(lt>0){
                return function(part){
                    //console.log("ilst is: "+ilst);
                    if(part[ilst[0][0]]<(+ilst[0].substring(2)))
                        return ilst[1];
                    else
                        return '';
                };
            } else if(gt>0){
                return function(part){
                    //console.log("ilst is: "+ilst);
                    if(part[ilst[0][0]]>(+ilst[0].substring(2)))
                        return ilst[1];
                    else
                        return '';
                };
            } else {
                console.log("Invalid instruction "+instr);
            }
        } else if(ilst.length==1) {
            return function(part){return ilst[0];};
        } else {
            console.log("Error! ilst.length neither 1 nor 2");
        }
    };
    let winstructions=function(line){
        let lst=line.trim().substring(line.search(new RegExp("{"))+1,line.length-1).split(',');
        
        return lst.map(winstruction);
    };


    //console.log(wtag(wlines[0]));
    let fns=winstructions(wlines[0]);
    //console.log(fns[0]({s:100}));

    let imap=[];
    for(let line of wlines){
        imap[wtag(line)]=winstructions(line);
    }

    let objs=[];
    let ret=0;
    for(let part of plines){
        let np=part.trim().substring(1,part.length-1).split(',');
        np=np.map((a)=>a.substr(2));
        let obj={x:+np[0],m:+np[1],a:+np[2],s:+np[3]};
        let score=(+np[0])+(+np[1])+(+np[2])+(+np[3]);
        let tag="in";
        while(tag!='R'&&tag!='A'){
            let newtag='';
            for(let indx=0;indx<imap[tag].length;indx++){
                newtag=imap[tag][indx](obj);
                if(newtag.length>0)
                    break;
            }
            tag=newtag;
        }
        if(tag=='A'){
            ret+=score;
        }
        //doesn't work?
        //let obj=eval(part.replace(/=/g,":"));
    }

    console.log(ret);

    /*
     *

    let cursor=[0,0];
    let step=0;
    let area=0;
    for(let line of lines){
        }
        //console.log(delta);
        step+=Math.abs(delta[0])+Math.abs(delta[1]);
        area+=cursor[0]*delta[1]; //y*dx
        cursor[0]+=delta[0];
        cursor[1]+=delta[1];
        //console.log(cursor);
    }
    //console.log(step);
    console.log(Math.abs(area)+step/2+1);*/
};

let day19b=function(input){
    console.log("=========== day 19 part 2 ==========");


    let partindex=input.search(new RegExp("\n{"));
    let wlines=input.substring(0,partindex).split('\n').filter(line=>line.length>0);
    let plines=input.substring(partindex).split('\n').filter(line=>line.length>0);
    //console.log(plines[0]);

    //console.log(wlines[0]);


    let wtag=function(line){
        return line.substring(0,line.search(new RegExp("{")));
    };
    /* Very similar to day 5. Each object will be a list of x m a s ranges, 
     * and each instruction should filter to a list of [{x m a s range}, {x m a s range},...],
     * Instead of "part" we should have "{tag:,x:[start,end],m:[start,end],...}"
     * tag being the next tag to be processed.
     *
     * I guess the last element of the thing returned from function(part) should be special; either 
     * an empty string if nothing is left to be processed, or the same tag if there's a range left over.
     * */

    let intersection=function(range1,range2){
        let mmn=Math.max(range1[0],range2[0]);
        let mmx=Math.min(range1[1],range2[1]);
        if(mmn<mmx)
            return [mmn,mmx];
        else
            return undefined;
    };
    let copypart=function(prt){
        return {tag:prt.tag,x:[...prt.x],m:[...prt.m],a:[...prt.a],s:[...prt.s]};
    };
    let winstruction=function(instr){
        let ilst=instr.split(':');
        if(ilst.length==2){
            let lt=ilst[0].search("<");
            let gt=ilst[0].search(">");
            if(lt>0){
                return function(part){
                    //return {first:undefined,leftover:undefined};
                    let rtt={first:undefined,leftover:undefined};
                    //ilst[0][0] is the thing we're checking (x m a or s)
                    //(+ils[0].substring(2)) is the number we're checking against.
                    let xmas=ilst[0][0];
                    let isec=intersection(part[xmas],[1,(+ilst[0].substring(2))]);
                    if(isec!==undefined){
                        rtt.first=copypart(part);
                        rtt.first.tag=ilst[1];
                        rtt.first[xmas]=isec;
                    } 
                    //else leave rtt.first undefined.
                    
                    let dsec=intersection(part[xmas],[(+ilst[0].substring(2)),4001]);
                    if(dsec!==undefined){
                        rtt.leftover=copypart(part);
                        rtt.leftover[xmas]=dsec;
                    }
                    return rtt;
                };
            } else if(gt>0){
                return function(part){
                    //if(part[ilst[0][0]]>(+ilst[0].substring(2)))
                        //return ilst[1];
                    //else
                        //return '';*/
                    let rtt={first:undefined,leftover:undefined};
                    //ilst[0][0] is the thing we're checking (x m a or s)
                    //(+ils[0].substring(2)) is the number we're checking against.
                    let xmas=ilst[0][0];
                    //+1 because lower bounds on ranges are inclusive
                    //but we want > to exclude the number.
                    let isec=intersection(part[xmas],[(+ilst[0].substring(2))+1,4001]);
                    if(isec!==undefined){
                        rtt.first=copypart(part);
                        rtt.first.tag=ilst[1];
                        rtt.first[xmas]=isec;
                    } 
                    //else leave rtt.first undefined.
                    
                    let dsec=intersection(part[xmas],[1,(+ilst[0].substring(2))+1]);
                    if(dsec!==undefined){
                        rtt.leftover=copypart(part);
                        rtt.leftover[xmas]=dsec;
                    }
                    return rtt;
                };
            } else {
                console.log("Invalid instruction "+instr);
            }
        } else if(ilst.length==1) {
            return function(part){
                let rtt={first:undefined,leftover:undefined};
                rtt.first=copypart(part);
                rtt.first.tag=ilst[0];
                return rtt;
            //return function(part){return ilst[0];};
            };
        } else {
            console.log("Error! ilst.length neither 1 nor 2");
        }
    };
    let winstructions=function(line){
        let lst=line.trim().substring(line.search(new RegExp("{"))+1,line.length-1).split(',');
        
        return lst.map(winstruction);
    };


    //console.log(wtag(wlines[0]));
    let fns=winstructions(wlines[0]);
    //console.log(fns[0]({s:100}));

    let imap=[];
    for(let line of wlines){
        imap[wtag(line)]=winstructions(line);
    }

    let objs=[];
    let ret=0;
    let prlist=[{tag:"in",x:[1,4001],m:[1,4001],a:[1,4001],s:[1,4001]}];
    let iterfunction=function(list){
        let listnew=[];
        for(let el of list){
            if(el.tag=="A"){
                ret+=(el.x[1]-el.x[0])*(el.m[1]-el.m[0])*(el.a[1]-el.a[0])*(el.s[1]-el.s[0]);
            } else if(el.tag!='R'){
                let elnew=el;
                let indx=0;
                for(indx=0;indx<imap[el.tag].length;indx++){
                    let result=imap[el.tag][indx](elnew);
                    if(result.first!==undefined){
                        //if we've parsed anything, send it to the new list.
                        listnew.push(result.first);
                    }
                    if(result.leftover===undefined){
                        //no range left to parse.
                        break;
                    }
                    //if we have stuff leftover, go to the next iteration of the loop.
                    //Each imap should have result.leftover=undefined as its last entry,
                    //so we should always hit a break.
                    elnew=result.leftover;
                }
                if(indx==imap[el.tag].length){
                    console.log("Uh oh, we should never get here. result.leftover not undefined at last entry?");
                }
            }
        }
        return listnew;
    };

    while(prlist.length>0){
        //console.log(prlist);
        prlist=iterfunction(prlist);
    }
    console.log(ret);

    /*
     *

    let cursor=[0,0];
    let step=0;
    let area=0;
    for(let line of lines){
        }
        //console.log(delta);
        step+=Math.abs(delta[0])+Math.abs(delta[1]);
        area+=cursor[0]*delta[1]; //y*dx
        cursor[0]+=delta[0];
        cursor[1]+=delta[1];
        //console.log(cursor);
    }
    //console.log(step);
    console.log(Math.abs(area)+step/2+1);*/
};
day19a(input);
day19b(input);
//day10b(input);
