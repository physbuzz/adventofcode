const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const input=readFileAsString("input.txt");


let day5a=function(input){
    lines=input.split('\n');


    let mapnames=["seed","soil","fertilizer","water","light","temperature","humidity","location"];
    let seeds=lines[0].substring(6).trim().split(' ').map((x)=>(+x));
    //console.log(seeds);
    let maps=[];

    for(let i=0;i<mapnames.length-1;i++){
        let fstr=mapnames[i]+"-to-"+mapnames[i+1]+" map:";
        let startindx=input.search(fstr);
        let endindx=0;
        if(i<mapnames.length-2){
            endindx=input.search(mapnames[i+1]+"-to-"+mapnames[i+2]+" map:");
        } else {
            endindx=input.length;
        }
        let strtoparse=input.substring(startindx+fstr.length+1,endindx);
        let arrs=strtoparse.split('\n').map((line)=>( line.trim().split(' ').map(num => +num) )).filter((arr)=>(arr.length==3));
        maps[i]=arrs;
        //console.log(arrs[arrs.length-1]);
    }
    let minloc=Infinity;

    for(let s of seeds){
        for(let map of maps){
            //If s is in a range in the input array, do one procedure.
            for(let arr of map){
                if(arr[1]<=s && s<arr[1]+arr[2]){
                    s=s-arr[1]+arr[0];
                    break;
                }
            }
            //else, s is unchanged so we're good.
        }
        if(s<minloc)
            minloc=s;
    }
    console.log("=========== day 5 part 1 ==========");
    console.log(minloc);
};

let day5b=function(input){
    lines=input.split('\n');


    let mapnames=["seed","soil","fertilizer","water","light","temperature","humidity","location"];
    let seedstmp=lines[0].substring(6).trim().split(' ').map((x)=>(+x));
    let seedranges = [];
    for(let i=0;i<seedstmp.length/2;i++){
        seedranges[i]=[seedstmp[i*2],seedstmp[i*2+1]];
    }
    console.log(seedranges);


    //map is a list of 3 element lists (maps)
    //range is a length 2 list (start,end)
    //returns a list of ranges for following each number down the map
    let mapRange=function(map,rangearg){
        let range=[...rangearg];
        let ret=[];
        map.sort( (a,b) => a[1]-b[1]);
        //console.log(map);

        //so now we can think about going through the maps, from left to right, and taking any "chunks" out of range.

    //console.log(mapRange([[1000,100,5]],[101,5])+" should be [[1001,4],[105,1]]");
        for(let i=0;i<map.length;i++){
            let arr=map[i];

            //case 0, map lies totally to the left of the chunk.
            if(arr[1]+arr[2]<=range[0]){
                continue;
            } 
            //case 1, taking a chunk out of the left side of range
            else if(arr[1]<=range[0] && arr[1]+arr[2]>range[0]){
                //case 1a, we map the whole range
                if(arr[1]+arr[2]>=range[0]+range[1]){
                    ret.push([arr[0]+range[0]-arr[1], range[1]]);
                    range=[];
                    break; //we've consumed the whole range, so break.
                } else {
                    //else we just consume range[0] to arr[1]+arr[2]
                    ret.push([arr[0]+range[0]-arr[1], arr[1]+arr[2]-range[0]]);
                    let newrange=[arr[1]+arr[2], range[1]-(arr[1]+arr[2]-range[0])];
                    range=newrange;
                    //consistency check: the sum of the lengths is equal to range[1]:
                    //arr[1]+arr[2]-range[0]+range[1]-(...) == range[1], check!
                }
            } 
            //case 2, chunk out of the middle
            else if(arr[1]>range[0] && arr[1]+arr[2]<range[0]+range[1]){

                //left side gets mapped to nothing 
                ret.push([range[0],arr[1]-range[0]]);
                //middle chunk gets mapped:
                ret.push([arr[0], arr[2]]);
                //leftover stuff goes to the next iteration of the for loop
                let newrange=[arr[1]+arr[2],range[1]-(arr[1]+arr[2]-range[0])];
                range=newrange;
            }
            //case 3, chunk out of the right
            else if(arr[1]>range[0] && arr[1]<range[0]+range[1]){
                if(!(arr[1]+arr[2]>=range[0]+range[1])){
                    console.log("oops, we should never get here.");
                }
                //left side gets mapped to nothing 
                ret.push([range[0],arr[1]-range[0]]);
                //right chunk gets mapped:
                ret.push([arr[0],range[1]-(arr[1]-range[0])]);
                range=[];
                //We consumed the whole array, so break.
                break;
            }
            //case 4, map lies totally to the right of the chunk. Do nothing and continue.
            else {
                ret.push([range[0],range[1]]);
                range=[];
                break;
            }
        }
        if(range.length>0){
            ret.push([range[0],range[1]]);
        }
        return ret;
    };
    
    //console.log(seeds);
    let maps=[];

    for(let i=0;i<mapnames.length-1;i++){
        let fstr=mapnames[i]+"-to-"+mapnames[i+1]+" map:";
        let startindx=input.search(fstr);
        let endindx=0;
        if(i<mapnames.length-2){
            endindx=input.search(mapnames[i+1]+"-to-"+mapnames[i+2]+" map:");
        } else {
            endindx=input.length;
        }
        let strtoparse=input.substring(startindx+fstr.length+1,endindx);
        let arrs=strtoparse.split('\n').map((line)=>( line.trim().split(' ').map(num => +num) )).filter((arr)=>(arr.length==3));
        maps[i]=arrs;
        //console.log(arrs[arrs.length-1]);
    }
    let minloc=Infinity;

    //console.log(mapRange(maps[0],[0,100]));

    console.log("=========== day 5 part 2 ==========");
    for(let i=0;i<maps.length;i++){
        /*
        console.log("Step: "+i);
        console.log(seedranges);
        console.log("map: ");
        console.log(maps[i]);*/
        seedranges=seedranges.flatMap((sr)=>( mapRange(maps[i],sr)));
    }
    //console.log(seedranges);

    seedranges.sort((a,b)=>a[0]-b[0]);
    console.log("ans: "+seedranges[0]);
    /*
    console.log(seedranges);
    console.log("notans: "+seedranges[1]);
    console.log(mapRange([[1000,100,5]],[5,10])+" should be [[5,10]]");
    console.log(mapRange([[1000,100,5]],[95,10])+" should be [[95,5],[1000,5]]");
    console.log(mapRange([[1000,100,5]],[101,3])+" should be [[1001,3]]");
    console.log(mapRange([[1000,100,5]],[101,4])+" should be [[1001,4]]");
    console.log(mapRange([[1000,100,5]],[100,5])+" should be [[1000,5]]");
    console.log(mapRange([[1000,100,5]],[101,5])+" should be [[1001,4],[105,1]]");
    console.log(mapRange([[1000,100,5]],[105,5])+" should be [[105,5]]");
    console.log(mapRange([[1000,100,5],[1005,110,5]],[90,30])+" should be [[90,10],[1000,5],[105,5],[1005,5],[115,5]]]");
    console.log(mapRange([[52,50,48],[50,98,2]],[79,14])+" should be ]");
*/

    /*
    for(let s of seeds){
        for(let map of maps){
            //If s is in a range in the input array, do one procedure.
            for(let arr of map){
                if(arr[1]<=s && s<arr[1]+arr[2]){
                    s=s-arr[1]+arr[0];
                    break;
                }
            }
            //else, s is unchanged so we're good.
        }
        if(s<minloc)
            minloc=s;
    }
    console.log("=========== day 5 part 2 ==========");
    console.log(minloc);*/
};

day5a(input);
day5b(input);
