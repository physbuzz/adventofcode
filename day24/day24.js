const fs = require('fs');
const { execSync } = require('child_process');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const testinput=readFileAsString("testinput.txt");
const input=readFileAsString("input.txt");

let Differences= arr=>arr.slice(1).map((b,a)=>b-arr[a]);
let Sum=arr=>arr.reduce((a,b)=>a+b,0);
let Last=arr=>arr[arr.length-1];
let First=arr=>arr[0];

let day24a=function(input){
    console.log("=========== day 24 part 1 ==========");
    let lines=input.split('\n').map(l=>l.trim()).filter(l=>l.length>0);
    let parseTriple=function(trip){
        return trip.split(",").map(x=>(+x.trim()));
    };
    let parseLine=function(line){
        let args=line.split("@");
        return [parseTriple(args[0]),parseTriple(args[1])];
    };
    let parsed=lines.map(parseLine);
    
    let rangemin=200000000000000;
    let rangemax=400000000000000;
    let pathCrossInRangeQ=function(h1,h2){
        let x1=h1[0][0];
        let y1=h1[0][1];
        let x2=h2[0][0];
        let y2=h2[0][1];
        let x1v=h1[1][0];
        let y1v=h1[1][1];
        let x2v=h2[1][0];
        let y2v=h2[1][1];

        //console.log(x1v+" "+y1v+" "+x2v+" "+y2v);

        let t1num=x2v*y1 - x2v*y2 - x1*y2v + x2*y2v;
        let t2num=x1v*y1 - x1*y1v + x2*y1v - x1v*y2;
        let det=x1v*y2v-x2v*y1v;
        if(det>0 && (t1num<=0 || t2num<=0))
            return false;
        if(det<0 && (t1num>=0 || t2num>=0))
            return false;
        if(det==0)
            return false;
        let xnum=-(x1*x2v*y1v) + x1v*x2v*(y1 - y2) + x1v*x2*y2v;
        let ynum=-(x2v*y1v*y2) + x1v*y1*y2v + (-x1 + x2)*y1v*y2v;
        if(det<0){
            det=-det;
            xnum=-xnum;
            ynum=-ynum;
        }
        return (rangemin*det<=xnum) &&  (xnum<=rangemax*det) && (rangemin*det<=ynum) && (ynum<=rangemax*det);
    }

    let ct=0;
    for(let n=1;n<parsed.length;n++){
        for(let m=0;m<n;m++){
            if(pathCrossInRangeQ(parsed[m],parsed[n]))
                ct++;
        }
    }
    console.log(ct);
};

let day24b=function(input){
    console.log("=========== day 24 part 2 ==========");

    
    let lines=input.split('\n').map(l=>l.trim()).filter(l=>l.length>0);
    let parseTriple=function(trip){
        return trip.split(",").map(x=>(+x.trim()));
    };
    let parseLine=function(line){
        let args=line.split("@");
        return [parseTriple(args[0]),parseTriple(args[1])];
    };
    let parsed=lines.map(parseLine);

    let strout="{";
    for(let n=0;n<parsed.length;n++){
        let el=parsed[n];
        //console.log(parsed[n][0]);
        strout+="{"+(el[0][0])+","+(el[0][1])+","+(el[0][2])+","+(el[1][0])+","+(el[1][1])+","+(el[1][2])+"}";
        if(n<parsed.length-1){
            strout+=",\n";
        }
    }
    strout+="}";

    //Basically we just have a simple system of 9 equations that we need to solve.
    //Next year I'll figure out what the equivalent of LinearSolve is for javascript, 
    //but for now let's just export to mathematica.
    



    fs.writeFileSync("out.txt",strout);
    execSync('math -noprompt -script mathstuff.m', (err, stdout, stderr) => {});
    let out24b=readFileAsString("out2.txt");
    console.log(out24b);
};

day24a(input);
day24b(input);
