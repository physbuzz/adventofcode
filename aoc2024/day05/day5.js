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

let day5a=function(input){
    console.log("=========== day 5 part 1 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);

    let ret=0;


    rulesL={};
    rulesR={};

    let checkRules=function(list){
        let valid=true;
        for(let i=0;i<list.length;i++){
            if(rulesL[list[i]]!==undefined) {
                for(let k=0;k<rulesL[list[i]].length;k++){
                for(let j=0;j<i;j++){
                    if(list[j]===rulesL[list[i]][k])
                        return false;
                }
                }
            }
            if(rulesR[list[i]]!==undefined) {
                for(let k=0;k<rulesR[list[i]].length;k++){
                for(let j=i+1;j<list.length;j++){
                    if(list[j]===undefined)
                        console.log("wuh");
                    if(list[j]===rulesR[list[i]][k])
                        return false;
                }
                }
            }
        }
        return true;
    };
    for(let i=0;i<lines.length;i++){
        let line=lines[i];
        if(line.includes("|")){
            let arr=line.split("|");
            if(rulesL[arr[0]])
                rulesL[arr[0]].push(arr[1]);
            else
                rulesL[arr[0]]=[arr[1]];

            if(rulesR[arr[1]])
                rulesR[arr[1]].push(arr[0]);
            else
                rulesR[arr[1]]=[arr[0]];
        } else {
            let nums=line.split(",");
            if(nums.length%2==0)
                console.log("WTF?");
            if(checkRules(nums)){
                ret+= (+nums[Math.floor(nums.length/2)]);
            }
        }
    }


    console.log(ret);
};

let day5b=function(input){
    console.log("=========== day 5 part 2 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);

    let ret=0;


    rulesL={};
    rulesR={};
    let checkRules=function(list){
        let valid=true;
        for(let i=0;i<list.length;i++){
            if(rulesL[list[i]]!==undefined) {
                for(let k=0;k<rulesL[list[i]].length;k++){
                for(let j=0;j<i;j++){
                    if(list[j]===rulesL[list[i]][k])
                        return false;
                }
                }
            }
            if(rulesR[list[i]]!==undefined) {
                for(let k=0;k<rulesR[list[i]].length;k++){
                for(let j=i+1;j<list.length;j++){
                    if(list[j]===undefined)
                        console.log("wuh");
                    if(list[j]===rulesR[list[i]][k])
                        return false;
                }
                }
            }
        }
        return true;
    };
    let indexIsValid=function(list,i){
        if(rulesL[list[i]]!==undefined) {
            for(let k=0;k<rulesL[list[i]].length;k++){
                for(let j=0;j<i;j++){
                    if(list[j]===rulesL[list[i]][k])
                        return false;
                }
            }
        }
        if(rulesR[list[i]]!==undefined) {
            for(let k=0;k<rulesR[list[i]].length;k++){
                for(let j=i+1;j<list.length;j++){
                    if(list[j]===undefined)
                        console.log("wuh");
                    if(list[j]===rulesR[list[i]][k])
                        return false;
                }
            }
        }
        return true;
    };

    let insert=function(arr,elem,index){
        return arr.slice(0,index).concat([elem]).concat(arr.slice(index));
    }
    let mySort=function(valid,rest){
        if(rest===undefined)
            return mySort([valid[0]],valid.slice(1));
        if(rest.length==0)
            return valid;

        let elem=rest[0];
        rest=rest.slice(1);
        let retlist;
        let k=0;
        for(;k<=valid.length;k++) {
            retlist=insert(valid,elem,k);
            if(indexIsValid(retlist,k)){
                retlist=mySort(retlist,rest);
                if(retlist===false || checkRules(retlist))
                    break;
            }
        }
        if(k==valid.length+1)
            return false;
        return retlist;
    };

    for(let i=0;i<lines.length;i++){
        let line=lines[i];
        if(line.includes("|")){
            let arr=line.split("|");
            if(rulesL[arr[0]])
                rulesL[arr[0]].push(arr[1]);
            else
                rulesL[arr[0]]=[arr[1]];

            if(rulesR[arr[1]])
                rulesR[arr[1]].push(arr[0]);
            else
                rulesR[arr[1]]=[arr[0]];
        } else {
            let nums=line.split(",");
            if(nums.length%2==0)
                console.log("WTF?");
            if(!checkRules(nums)){
                let listnew=mySort(nums);

                ret+= (+listnew[Math.floor(listnew.length/2)]);
                if(!checkRules(listnew)){
                    console.log("Oops.");
                }
                if(listnew.length != nums.length){
                    console.log("Not good.");
                }
            }
        }
    }


    console.log(ret);
};

//day5a(testinput);
//day5a(input);
day5b(testinput);
day5b(input);

    /*
    let insertToSorted=function(list,elem){
        //Assume list is already correctly ordered. So list[a]|list[b] for every a<b.
        //When we insert one element, we may have list[a] !| list[b] 
        //

        if(rulesL[list[i]]!=undefined
        for(let i=0;i<list.length;i++){
            if(!indexIsValid(list,i)){
                for(let j=0;j<list.length;j++){
                    if(i==j)
                        continue;
                    //move index i to index j
                    let listtmp=list.slice(0,i).concat(list.slice(i+1));
                    listtmp=listtmp.slice(0,j).concat([list[i]]).concat(listtmp.slice(j));
                    if(indexIsValid(listtmp,j)){
                        list=listtmp;
                    }
                }
            }
        }
        return list;

    };

    let mySort=function(list){

        for(let i=0;i<list.length;i++){
            if(!indexIsValid(list,i)){
                for(let j=0;j<list.length;j++){
                    if(i==j)
                        continue;
                    //move index i to index j
                    let listtmp=list.slice(0,i).concat(list.slice(i+1));
                    listtmp=listtmp.slice(0,j).concat([list[i]]).concat(listtmp.slice(j));
                    if(indexIsValid(listtmp,j)){
                        list=listtmp;
                    }
                }
            }
        }
        return list;
    };*/
