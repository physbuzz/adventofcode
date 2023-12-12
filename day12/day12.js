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

let day12a=function(input){
    console.log("=========== day 12 part 1 ==========");
    lines=input.split('\n');
    //Intuition is that this is brute-forceable
    //Longest one I see is 17 question marks, checking 2^17 combinations seems doable.
    //

    //.#?#???????.????# 1,2,3,2,1
    let checkValid=function(str,grps) {
        let grp=[...grps]; // copy!
        let ret=true;
        let i=0;
        let j=0;
        let checkinggroup=false;
        for(i=0;i<str.length;i++){
            if(str[i]!='.'&&str[i]!='#'){
                console.log("Error, ran into non . # character in checkValid: "+str[i]);
                return false;
            }

            if(!checkinggroup){
                if(str[i]==".")
                    continue;
                else if(str[i]=="#"){
                    if(j>=grps.length)
                        return false;
                    checkinggroup=true;
                    grp[j]--; // we've counted one #
                }
            } else {
                if(str[i]=='.'){
                    if(grp[j]!=0)
                        return false;
                    j++;
                    checkinggroup=false;
                } else {
                    grp[j]--;
                }
            }
        }
        if(checkinggroup){
            if(grp[j]==0 && j==grps.length-1)
                return true;
        }

        if(grp[j-1]==0 && j==grps.length)
            return true;

        return false;
    };
    let numValid=function(str,checklist,index){
        if(index>=str.length){
            return checkValid(str,checklist)?1:0;
        }
        if(str[index]=='?'){
            return numValid(str.slice(0,index)+"."+str.slice(index+1),checklist,index+1)+
             numValid(str.slice(0,index)+"#"+str.slice(index+1),checklist,index+1);
        }
        return numValid(str,checklist,index+1);
    };

    //let strs=[];
    //let groupnums=[];
        let ret=0;
    for(let n in lines){
        let line=lines[n].trim();
        if(line.length==0)
            continue;
        line=line.split(' ');
        let str=line[0];
        let grpnum=line[1].trim().split(',').map(x=>+x);

        //if(n<9){
            ret+=numValid(str,grpnum,0);
            //console.log(str);
            //console.log(grpnum);
        //}
    }
    console.log(ret);
};

//This works and is faster than day12a, but not fast enough.
let day12bSave=function(input){
    console.log("=========== day 12 part 2 ==========");
    lines=input.split('\n');

    //.#?#???????.????# 1,2,3,2,1
    
    let numValid=function(str,grps,state) {
        if(typeof state =='undefined'){
            state={i:0,j:0,checkinggroup:false,grp:[...grps]};
        }
        let tot=state.grp.reduce((a,b)=>a+b+(b>0?1:0),0);
        if(str.length-state.i+1<tot){
            return 0;
        }
        for(;state.i<str.length;state.i++){
            if(str[state.i]=='?'){
                let copy1={i:state.i,j:state.j,checkinggroup:state.checkinggroup,grp:[...state.grp]};
                let copy2={i:state.i,j:state.j,checkinggroup:state.checkinggroup,grp:[...state.grp]};
                return numValid(str.slice(0,state.i)+"."+str.slice(state.i+1),grps,copy1)+
                        numValid(str.slice(0,state.i)+"#"+str.slice(state.i+1),grps,copy2);
            }
            if(str[state.i]!='.'&&str[state.i]!='#'){
                console.log("Error, ran into non . # character in checkValid: "+str[state.i]);
                return 0;
            }

            if(!state.checkinggroup){
                if(str[state.i]==".")
                    continue;
                else if(str[state.i]=="#"){
                    if(state.j>=grps.length)
                        return 0;
                    state.checkinggroup=true;
                    state.grp[state.j]--;
                }
            } else {
                if(str[state.i]=='.'){
                    if(state.grp[state.j]!=0)
                        return 0;
                    state.j++;
                    state.checkinggroup=false;
                } else {
                    state.grp[state.j]--;
                    if(state.grp[state.j]<0)
                        return 0;
                }
            }
        }
        if(state.checkinggroup){
            if(state.grp[state.j]==0 && state.j==grps.length-1)
                return 1;
        }

        if(state.grp[state.j-1]==0 && state.j==grps.length)
            return 1;

        return 0;
    };
    /*let numValid=function(str,checklist,index){
        if(index>=str.length){
            return checkValid(str,checklist)?1:0;
        }
        if(str[index]=='?'){
            return numValid(str.slice(0,index)+"."+str.slice(index+1),checklist,index+1)+
             numValid(str.slice(0,index)+"#"+str.slice(index+1),checklist,index+1);
        }
        return numValid(str,checklist,index+1);
    };*/

    //let strs=[];
    //let groupnums=[];
        let ret=0;
    for(let n in lines){
        let line=lines[n].trim();
        if(line.length==0)
            continue;
        line=line.split(' ');
        let str=line[0];
        let grps=line[1].trim().split(',').map(x=>+x);
        let grpnum=grps;
        for(let i=0;i<4;i++){
            str=str+"?"+line[0];
            grpnum=grpnum.concat(grps);
        }

        console.log(n);
        //if(n<9){
            ret+=numValid(str,grpnum);
            //console.log(str);
            //console.log(grpnum);
        //}
    }
    console.log(ret);
};

let day12b=function(input){
    console.log("=========== day 12 part 2 ==========");
    lines=input.split('\n');

    //.#?#???????.????# 1,2,3,2,1

    let CACHENUM=15;

    //View it as grps.length fermions, some of which are distinguishable,
    //occupying str.length-grps.sum()+1 energy states. For example, in
    //#.#.#..., str.length=8, grps.sum()=3, and there are 6 places we 
    //can put the 3 # particles. So there's (6 choose 3) = 20 states.
    //
    /* State has positions of the groups
     * 0<= state.s[0]+grps[0]<state.s[1]+grps[1]<...state.s[grps.length-1]+grps[grps.length-1] <=str.length
     * */
    /*
        for(state.s[0]=0;state.s[0]<str.length-grps.reduce((a,b)=>a+b+1,0);state.s[0]++){
            for(state.s[1]=state.s[0]+grps[0]+1;
                state.s[1]<str.length-grps.reduce((a,b)=>a+b+1,0);state.s[0]++){

            }
        }*/
    let contiguousPoundQ=function(str,index,num){
        let ret=true;
        let left=index;
        if(index>=1){
            if(str[index-1]!='.'&&str[index-1]!='?')
                return false;
            left=index-1;
        }

        let i;
        for(i=index;i<index+num;i++){
            if(i>=str.length || (str[i]!='#'&&str[i]!='?')) {
                return false;
            }
        }
        if(i<index+num){
            console.log("Weird, don't think we should ever get here.");
            return false;
        }
        let right;
        if(i==str.length){
            right=str.length;
        } else {
            if(str[i]!='.'&&str[i]!='?') 
                return false;
            right=i+1;
        }
        return [left,right];
    };
    let numValid=function(str,grps) {
        //console.log("Checking str = "+str+" grps = "+grps);
        //Base cases: grps.length==1
        //str.length==0
        
        if(str.length==0 && grps.length==0)
            return 1;
        if(grps.length==0){
            for(let i=0;i<str.length;i++){
                if(str[i]=='#')
                    return 0;
            }
            return 1;
        }
        if(grps.length==1){
            let retsum=0;
            for(let i=0;i<str.length-grps[0]+1;i++){
                let pret=contiguousPoundQ(str,i,grps[0]);
                if(pret!==false){
                    let check2=true;
                    for(let j=0;j<pret[0];j++){
                        check2=check2&&(str[j]!='#');
                    }
                    for(let j=pret[1];j<str.length;j++){
                        check2=check2&&(str[j]!='#');
                    }
                    if(check2)
                        retsum+=1;
                }
            }
            return retsum;
        }

        let middlej=Math.floor(grps.length/2);

        let leftmostgroups=grps.slice(0,middlej);
        let leftmosti=leftmostgroups.reduce((a,b)=>a+b+1,0);
        let rightmostgroups=grps.slice(middlej+1);
        let rightmosti=str.length-rightmostgroups.reduce((a,b)=>a+b+1,0);
        let sumvalid=0;
        for(let i=leftmosti;i<rightmosti;i++){

            let ret=contiguousPoundQ(str,i,grps[middlej]);
            if(ret===false){
                continue;
            }
            let a=numValid(str.slice(0,ret[0]),grps.slice(0,middlej));
            //console.log("Found a="+a+" numvalid");
            let b=numValid(str.slice(ret[1]),grps.slice(middlej+1));
            //console.log("Found b="+b+" numvalid");
            sumvalid+=a*b;
        }
        return sumvalid;
    };
    let ret=0;

    //let str="?";
    //ret+=numValid(str,grpnum);



    //ret+=numValid("?###??????????###????????",[3,2,1,3,2,1]);
    for(let n in lines){
        //console.log("Parsing Line n="+n);
        let line=lines[n].trim();
        if(line.length==0)
            continue;
        line=line.split(' ');
        let str=line[0];
        let grps=line[1].trim().split(',').map(x=>+x);
        let grpnum=grps;
        for(let i=0;i<4;i++){
            str=str+"?"+line[0];
            grpnum=grpnum.concat(grps);
        }
        //console.log("string is = "+str+" grp= "+grpnum);
        ret+=numValid(str,grpnum);
    }
    console.log(ret);
};


//day12a(input);
day12b(input);
