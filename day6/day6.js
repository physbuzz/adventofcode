const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const input=readFileAsString("input.txt");


let day6a=function(input){
    let times=[54,    70,    82,    75];
    let dists=[239,  1142,  1295,  1253];


    //let's assume we can never tie and that ties don't count as a win.
    //The boat travels at speed (time_held) for time (time-time_held).
    //
    //239<time_held*(time-time_held)
    
    let prod=1; 
    for(let r=0;r<4;r++){
        let winning=0;
        let time=times[r];
        let dist=dists[r];
        for(let k=1;k<time;k++){
            if(k*(time-k)>dist)
                winning+=1;
        }
        prod*=winning;
    }
    console.log("=========== day 6 part 1 ==========");
    console.log(prod);
};
let day6b=function(input){

    let time=54708275;
    let dist=239114212951253;
    //k<=1/2 (time - Sqrt[-4 dist + time^2])<=1/2 (time + Sqrt[-4 dist + time^2])
    //let time=71530;
    //let dist=940200;

    console.log("=========== day 6 part 1 ==========");
    console.log(Math.floor(0.5*(time+Math.sqrt(time*time-4*dist)))-Math.ceil(0.5*(time-Math.sqrt(time*time-4*dist)))+1);
};


day6a(input);
day6b(input);

