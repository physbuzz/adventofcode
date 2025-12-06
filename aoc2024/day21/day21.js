const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const testinput=readFileAsString("testinput.txt");
//const testinput2=readFileAsString("testinput2.txt");
const input=readFileAsString("input.txt");

let Differences= arr=>arr.slice(1).map((b,a)=>b-arr[a]);
let Sum=arr=>arr.reduce((a,b)=>a+b,0);
let Last=arr=>arr[arr.length-1];
let First=arr=>arr[0];

let day21a=function(input){
    console.log("=========== day 21 part 1 ==========");
    let codes=input.split('\n').map( x=> x.trim()).filter(line => line.length>0);
    let ret=0;

    let keyloc=[];
    keyloc[0]=[1,0];
    keyloc['A']=[2,0];
    keyloc[1]=[0,1];
    keyloc[2]=[1,1];
    keyloc[3]=[2,1];
    keyloc[4]=[0,2];
    keyloc[5]=[1,2];
    keyloc[6]=[2,2];
    keyloc[7]=[0,3];
    keyloc[8]=[1,3];
    keyloc[9]=[2,3];
    let robloc=[];
    robloc['<']=[0,0];
    robloc['>']=[2,0];
    robloc['^']=[1,1];
    robloc['v']=[1,0];
    robloc['A']=[2,1];

    let keyvalidarr=[];
    for(let i in keyloc){
        keyvalidarr[keyloc[i]]=i;
    }
    let robvalidarr=[];
    for(let i in robloc){
        robvalidarr[robloc[i]]=i;
    }

    let keyvalid=function(pos){
        return keyvalidarr[pos]!==undefined;
    }
    let robvalid=function(pos){
        return robvalidarr[pos]!==undefined;
    }

    //returns [endstate,distance]
//    let findPathExact=function(state1,state2){
        //let [r1s,r2s,r3s]=state1;
        //let [r1s,r2s,r3s]=state1;
    //};
    let evolveState=function(state,cmd){
        //console.log(state);
        let statecpy=state.map(x => x.map(y => y));

        let cmddelta={'<':[-1,0],'>':[1,0],'^':[0,1],'v':[0,-1]};
        if(cmd==='A'){
            if(state.length===1)
                return statecpy;
            let pos=statecpy.shift();
            let posnew=evolveState(statecpy,robvalidarr[pos]);
            if(posnew!==false){
                return [pos,...posnew];
            } else {
                return false;
            }

        } else {
            let del=cmddelta[cmd];
            if(del===undefined){
                console.log("cmd undefined?!");
                return false;
            }

            statecpy[0][0]+=del[0];
            statecpy[0][1]+=del[1];
            if(state.length>1){
                if(robvalid(statecpy[0]))
                    return statecpy;
            } else {
                if(keyvalid(statecpy[0]))
                    return statecpy;
            }
            return false;
        }
        console.log("Fell through??");
        return false;

    }
    let findPath=function(state1,key){
        //deep copy
        let [r1s,r2s,r3s]=state1.map(x => x.map(y => y));
        let dist=[];
        dist[[r1s,r2s,r3s]]=0;
        let pocket=[[r1s,r2s,r3s]];
        while(pocket.length>0){
            let state=pocket.shift();
            let d=dist[state];
            //let [r1,r2,r3]=pocket.shift();
            let cmds=['<','>','v','^','A'];
            for(let cmd of cmds){
                let statenew=evolveState(state,cmd);
                if(statenew!==false){
                    let distnew=d+1;
                    if(dist[statenew]===undefined || dist[statenew]>distnew){
                        dist[statenew]=distnew;
                        pocket.push(statenew);
                    }
                }
            }
        }
        return dist[key];
    }
    let printState=function(state){
        let [r1,r2,r3]=state;
        console.log(robvalidarr[r1]+""+robvalidarr[r2]+""+keyvalidarr[r3]);
    };
    /*
    let cmds=['v','<','A','^','>','A'];
    let state=[robloc['A'],robloc['A'],keyloc['A']];
    for(let cmd of cmds){
        state=evolveState(state,cmd);
        printState(state);
    }*/



    for(let code of codes){
        codearr=code.split('');
        let state1=[robloc['A'],robloc['A'],keyloc['A']];
        let nn=0;
        for(let keypress of codearr){
            let state2=[robloc['A'],robloc['A'],keyloc[keypress]];
            nn+=1+findPath(state1,state2);
            state1=state2;
        }
        let [v]=code.match(/\d+/g).map(x => +x);
        ret+=nn*v;
        
    }

    console.log(ret);
};

let day21b=function(input){
    console.log("=========== day 21 part 2 ==========");
    let codes=input.split('\n').map( x=> x.trim()).filter(line => line.length>0);
    let ret=0;
    let nkeypads=2;

    let keyloc=[];
    keyloc[0]=[1,0];
    keyloc['A']=[2,0];
    keyloc[1]=[0,1];
    keyloc[2]=[1,1];
    keyloc[3]=[2,1];
    keyloc[4]=[0,2];
    keyloc[5]=[1,2];
    keyloc[6]=[2,2];
    keyloc[7]=[0,3];
    keyloc[8]=[1,3];
    keyloc[9]=[2,3];
    let robloc=[];
    robloc['<']=[0,0];
    robloc['>']=[2,0];
    robloc['^']=[1,1];
    robloc['v']=[1,0];
    robloc['A']=[2,1];

    let keyvalidarr=[];
    for(let i in keyloc){
        keyvalidarr[keyloc[i]]=i;
    }
    let robvalidarr=[];
    for(let i in robloc){
        robvalidarr[robloc[i]]=i;
    }

    let keyvalid=function(pos){
        return keyvalidarr[pos]!==undefined;
    }
    let robvalid=function(pos){
        return robvalidarr[pos]!==undefined;
    }

    let evolveState=function(state,cmd){
        //console.log(state);
        let statecpy=state.map(x => x.map(y => y));

        let cmddelta={'<':[-1,0],'>':[1,0],'^':[0,1],'v':[0,-1]};
        if(cmd==='A'){
            if(state.length===1)
                return statecpy;
            let pos=statecpy.shift();
            let posnew=evolveState(statecpy,robvalidarr[pos]);
            if(posnew!==false){
                return [pos,...posnew];
            } else {
                return false;
            }

        } else {
            let del=cmddelta[cmd];
            if(del===undefined){
                console.log("cmd undefined?!");
                return false;
            }

            statecpy[0][0]+=del[0];
            statecpy[0][1]+=del[1];
            if(state.length>1){
                if(robvalid(statecpy[0]))
                    return statecpy;
            } else {
                if(keyvalid(statecpy[0]))
                    return statecpy;
            }
            return false;
        }
        console.log("Fell through??");
        return false;

    }
    let findPath=function(state1,key){
        //deep copy
        let statecpy=state1.map(x => x.map(y => y));
        let dist=[];
        dist[statecpy]=0;
        let pocket=[[statecpy,0]];
        let ctr=0;
        let ctrmod=1;
        while(pocket.length>0){
            if(ctr%ctrmod==0)
                pocket=pocket.sort((a,b)=>a[1]-b[1]);
            let [state,d]=pocket.shift();
            //let [r1,r2,r3]=pocket.shift();
            let cmds=['<','>','v','^','A'];
            for(let cmd of cmds){
                let statenew=evolveState(state,cmd);
                if(statenew!==false){
                    let distnew=d+1;
                    if(dist[statenew]===undefined || dist[statenew]>distnew){
                        if(statenew.toString()===key.toString()){
                            return distnew;
                        }
                        dist[statenew]=distnew;
                        pocket.push([statenew,distnew]);

                    }
                }
            }
            ctr++;
        }
        return dist[key];
    }
    /*
    let printState=function(state){
        let [r1,r2,r3]=state;
        console.log(robvalidarr[r1]+""+robvalidarr[r2]+""+keyvalidarr[r3]);
    };*/
    /*
    let cmds=['v','<','A','^','>','A'];
    let state=[robloc['A'],robloc['A'],keyloc['A']];
    for(let cmd of cmds){
        state=evolveState(state,cmd);
        printState(state);
    }*/



    let manhattanDistance=function(state1,state2){
        let len=state1.length;
        let ret=0;
        for(let i=0;i<len;i++){
            ret+=Math.abs(state1[i][0]-state2[i][0])+Math.abs(state1[i][1]-state2[i][1])+1;
        }
        return ret;
    }
    let cache={};
    let findPathR=function(state1,state2){
        if(cache[[state1,state2]]!==undefined)
            return cache[[state1,state2]];
        if(state1.length===0) {
            console.log("0 length?!");
            return -1;
        }
        if(state1.length===1) {
            //distance, # up, # right, # down, # left
            let dx=state1[0][0]-state2[0][0];
            let dy=state1[0][1]-state2[0][1];
            let apresses=1;
            let upmove= (dy>0?dy:0);
            let rightmove= (dx>0?dx:0);
            let downmove= (dy<0?-dy:0);
            let leftmove= (dx<0?-dx:0);
            //let distance=Math.abs(dx)+Math.abs(dy)+1;
            let distance=upmove+rightmove+downmove+leftmove+apresses;
            cache[[state1,state2]]=[distance,upmove,rightmove,downmove,leftmove,apresses];
            return [distance,upmove,rightmove,downmove,leftmove,apresses];
        } else {
            let [distance0,upmove0,rightmove0,downmove0,leftmove0,apress0] = findPathR(state1.slice(1),state2.slice(1));
            //let distance=leftmove0*3+downmove0*2+rightmove0+upmove0;
            //let distance=leftmove0*4+downmove0*4+rightmove0*2+upmove0*2;
            let apresses=apress0+upmove0+rightmove0+downmove0+leftmove0+1;
            let upmove=leftmove0+downmove0+rightmove0;
            let rightmove=upmove0+downmove0+leftmove0*2;
            let downmove=leftmove0+downmove0+rightmove0;
            let leftmove=leftmove0*2+downmove0+upmove0;
            let distance=(upmove+rightmove+downmove+leftmove)/2+apresses;
            //let distance=upmove+rightmove+downmove+leftmove+state1.length-1;
            cache[[state1,state2]]=[distance,upmove,rightmove,downmove,leftmove,apresses];
            return [distance,upmove,rightmove,downmove,leftmove,apresses];
        }
    }

    {
        console.log("A -> 5:")
        let state1=[keyloc['A']];
        let state2=[keyloc['5']];
        console.log(findPath(state1,state2)+1);
        let [distance0,upmove0,rightmove0,downmove0,leftmove0,apress0] = findPathR(state1,state2);
        console.log(distance0);
    }
    {
        console.log("AA -> A5:")
        let state1=[robloc['A'],keyloc['A']];
        let state2=[robloc['A'],keyloc['5']];
        console.log(findPath(state1,state2)+1);
        let [distance0,upmove0,rightmove0,downmove0,leftmove0,apress0] = findPathR(state1,state2);
        console.log(distance0);
    }
    {
        console.log("A -> 1:")
        let state1=[keyloc['A']];
        let state2=[keyloc['1']];
        console.log(findPath(state1,state2)+1);
        let [distance0,upmove0,rightmove0,downmove0,leftmove0,apress0] = findPathR(state1,state2);
        console.log(distance0);
    }
    {
        console.log("AA -> A1:")
        let state1=[robloc['A'],keyloc['A']];
        let state2=[robloc['A'],keyloc['1']];
        console.log(findPath(state1,state2)+1);
        let [distance0,upmove0,rightmove0,downmove0,leftmove0,apress0] = findPathR(state1,state2);
        console.log(distance0);
    }
    {
        console.log("AAA -> AA5:")
        let state1=[robloc['A'],robloc['A'],keyloc['A']];
        let state2=[robloc['A'],robloc['A'],keyloc['5']];
        console.log(findPath(state1,state2)+1);
        let [distance0,upmove0,rightmove0,downmove0,leftmove0,apress0] = findPathR(state1,state2);
        console.log(distance0);
    }

    /*
    for(let code of codes){
        codearr=code.split('');
        let state1=Array(nkeypads).fill().map((a)=>robloc['A']).concat([keyloc['A']]);
        let nn=0;
        for(let keypress of codearr){
            let state2=Array(nkeypads).fill().map((a)=>robloc['A']).concat([keyloc[keypress]]);
            let [distance0,upmove0,rightmove0,downmove0,leftmove0] = findPathR(state1,state2);
            nn+=distance0;
            state1=state2;
        }

        let [v]=code.match(/\d+/g).map(x => +x);
        ret+=nn*v;
        
    }*/

    console.log(ret);
};

day21a(testinput);
day21a(input);
day21b(testinput);
day21b(input);
