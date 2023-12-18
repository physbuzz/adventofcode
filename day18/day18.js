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


let day18a=function(input){
    console.log("=========== day 18 part 1 ==========");
    lines=input.split('\n').filter(line=>line.length>0);

    let cursor=[0,0];
    let step=0;
    let area=0;
    for(let line of lines){
        let plan=line.split(' ');
        let delta=[0,0];
        //working with the block of text conventions.
        //vertical = rows, horizontal = columns
        //"up" is [-1,0]
        switch(plan[0]){
            case 'R':
                delta=[0,+plan[1]]; 
                break;
            case 'U':
                delta=[-plan[1],0];
                break;
            case 'L':
                delta=[0,-plan[1]];
                break;
            case 'D':
                delta=[+plan[1],0];
                break;
            default:
                console.log("Error in switch(plan[0])");
        }
        //console.log(delta);
        step+=Math.abs(delta[0])+Math.abs(delta[1]);
        area+=cursor[0]*delta[1]; //y*dx
        cursor[0]+=delta[0];
        cursor[1]+=delta[1];
        //console.log(cursor);
    }
    //console.log(step);
    console.log(Math.abs(area)+step/2+1);
};
let day18b=function(input){
    console.log("=========== day 18 part 2 ==========");
    lines=input.split('\n').filter(line=>line.length>0);

    let cursor=[0,0];
    let step=0;
    let area=0;
    for(let line of lines){
        let plan=line.split(' ');
        let delta=[0,0];
        //working with the block of text conventions.
        //vertical = rows, horizontal = columns
        //"up" is [-1,0]
        //console.log(plan[2]);
        let direction=['R','D','L','U'][plan[2][plan[2].length-2]];
        let distance=parseInt(plan[2].substring(2,plan[2].length-2),16);
        //console.log("Direction: "+direction+", "+distance);
        switch(direction){
            case 'R':
                delta=[0,+distance]; 
                break;
            case 'U':
                delta=[-distance,0];
                break;
            case 'L':
                delta=[0,-distance];
                break;
            case 'D':
                delta=[+distance,0];
                break;
            default:
                console.log("Error in switch(plan[0])");
        }
        //console.log(delta);
        step+=Math.abs(delta[0])+Math.abs(delta[1]);
        area+=cursor[0]*delta[1]; //y*dx
        cursor[0]+=delta[0];
        cursor[1]+=delta[1];
        //console.log(cursor);
    }
    //console.log(step);
    console.log(Math.abs(area)+step/2+1);
};

day18a(input);
day18b(input);
//day10b(input);
