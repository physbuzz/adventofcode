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

let day23a=function(input){
    console.log("=========== day 23 part 1 ==========");
    let ics=input.split('\n').map( x=> x.trim()).filter(line => line.length>0).map(x => x.split('-'));
    let graph={};
    let addEl=function(a,b){
        if(graph[a])
            graph[a].push(b);
        else
            graph[a]=[b];

        if(graph[b])
            graph[b].push(a);
        else
            graph[b]=[a];
    };
    ics.map(x => addEl(x[0],x[1]));
    elems=[...new Set(ics.flat())];
    let ret=0;
    let grps=[];
    for(let e of elems){
        if(e.charAt(0)=='t'){
            //console.log(e);
            for(let f of graph[e]){
                if(e==f)
                    continue;
                for(let g of graph[f]){
                    if(f==g || e==g)
                        continue;
                    for(let h of graph[g]){
                        if(f==h || g==h)
                            continue;
                        if(h==e){
                            grps.push([e,f,g].sort());
                        }
                    }
                }
            }
        }
        grps=[...new Set(grps.map(JSON.stringify))].map(JSON.parse);
        //console.log(grps);
        //ret+=grps.length;
    }
    


    console.log(grps.length);
};

let day23b=function(input){
    console.log("=========== day 23 part 2 ==========");
    let ics=input.split('\n').map( x=> x.trim()).filter(line => line.length>0).map(x => +x);
    let ret=0;

    console.log(ret);
};

day23a(testinput);
day23a(input);
//day23b(testinput);
//day23b(input);
