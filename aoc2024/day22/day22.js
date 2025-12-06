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

let day22a=function(input){
    console.log("=========== day 22 part 1 ==========");
    let ics=input.split('\n').map( x=> x.trim()).filter(line => line.length>0).map(x => +x);

    //0xFFFFFF
    let f=function(num){
        const prune=16777216-1;
        num=((num<<6)^num)&prune;
        num=((num>>5)^num)&prune;
        num=(((num<<11)^num)&prune);
        return num;
    }
    let nest=function(f,num,ntimes){
        for(let n=0;n<ntimes;n++){
            num=f(num);
        }
        return num;
    }
    let ret=0;
    for(let ic of ics){
        //console.log(ic);
        ret+=nest(f,ic>>0,2000);
    }

    console.log(ret);
};

let day22b=function(input){
    console.log("=========== day 22 part 2 ==========");
    let ics=input.split('\n').map( x=> x.trim()).filter(line => line.length>0).map(x => +x);

    //0xFFFFFF
    let f=function(num){
        const prune=16777216-1;
        num=((num<<6)^num)&prune;
        num=((num>>5)^num)&prune;
        num=(((num<<11)^num)&prune);
        return num;
    }
    let nest=function(f,num,ntimes){
        for(let n=0;n<ntimes;n++){
            num=f(num);
        }
        return num;
    }
    let value=function(seq,ic){
        let differences=[0,0,0,0];
        const nsteps=2000;
        let shift=function(list){
            for(let i=0;i<list.length-1;i++)
                list[i]=list[i+1];
            return list;
        }
        let h=function(list,ic){
            shift(list);
            let icnew=f(ic);
            list[list.length-1]=(icnew%10)-(ic%10);
            return [list,icnew];
        }
        let cmp=function(list1,list2){
            for(let i=0;i<list1.length;i++){
                if(list1[i]!=list2[i])
                    return false;
            }
            return true;
        }
        let ret=0;
        for(let i=0;i<nsteps;i++){
            [differences,ic]=h(differences,ic);
            if(i>=3 && cmp(differences,seq))
                ret+=(ic%10);
        }
        return ret;
    };
    let ret=0;

    for(let a=-9;a<=9;a++){
    for(let b=-9;b<=9;b++){
    for(let c=-9;c<=9;c++){
    for(let d=-9;d<=9;d++){
        let total=0;
        for(let ic of ics){
            total+=value([a,b,c,d],ic);
        }
        if(total>ret)
            ret=total;
    }
    }
        console.log(((19*(a+9)+(b+9))/(19*19))+ " percent done");
    }
    }
    console.log(ret);
};

//day22a(testinput);
//day22a(input);
//day22b(testinput);
day22b(input);
