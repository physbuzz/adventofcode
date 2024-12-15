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

let day14a=function(input){
    console.log("=========== day 14 part 1 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);
    let ret=0;
    let N=103;
    let M=101;
    //let N=7;
    //let M=11;
    //
    let telapsed=1;
    let done=false;
    while(!done){
        let grid=Array(N).fill().map(x=>Array(M).fill(0));
        let mymod=function(x,m){
            return (x%m>=0)?(x%m):(x%m)+m;
        };

        let q1=0,q2=0,q3=0,q4=0;
        for(let i=0;i<lines.length;i++){
            let [str1,str2]=lines[i].split(' ');
            let [px,py]=str1.match(/\d+/g).map(x => +x);
            let [vx,vy]=str2.substr(2).split(',').map(x => +x);
            //console.log("p= "+px+", "+py+", "+vx+", "+vy);
            let x=mymod(px+vx*100,M);
            let y=mymod(py+vy*100,N);
            //console.log("p="+x+", "+y);
            //grid[y][x]+=1;
            if(x-Math.floor(M/2)<0){
                if(y-Math.floor(N/2)<0){
                    q1++;
                } else if(y-Math.floor(N/2)>0) {
                    q2++;
                }
            } else if(x-Math.floor(M/2)>0){
                if(y-Math.floor(N/2)<0){
                    q3++;
                } else if(y-Math.floor(N/2)>0) {
                    q4++;
                }
            }
        }
    }

    for(let i=0;i<N;i++){
        //console.log(grid[i].join(" "));
    }

    //console.log(q1+", "+q2+", "+q3+", "+q4);
    console.log(q1*q2*q3*q4);
};

let day14b=function(input){
    console.log("=========== day 14 part 2 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);
    let ret=0;
    let N=103;
    let M=101;
    let pts0=[];
    for(let i=0;i<lines.length;i++){
        let [str1,str2]=lines[i].split(' ');
        let [px,py]=str1.match(/\d+/g).map(x => +x);
        let [vx,vy]=str2.substr(2).split(',').map(x => +x);
        pts0[i]=[px,py,vx,vy];
    }

    let dividesQ=function(a,b) {
        return b%a==0;
    }
    let sigma=20;
    let done=false;
    let telapsed=0;

    while(!done){
        grid=Array(N).fill().map(x=>Array(M).fill(0));
        let mymod=function(x,m){
            return (x%m>=0)?(x%m):(x%m)+m;
        };

        let q1=0,q2=0,q3=0,q4=0;
        for(let i=0;i<pts0.length;i++){
            let x=mymod(pts0[i][0]+pts0[i][2]*telapsed,M);
            let y=mymod(pts0[i][1]+pts0[i][3]*telapsed,N);
            grid[y][x]+=1;
            if(x-Math.floor(M/2)<0){
                if(y-Math.floor(N/2)<0){
                    q1++;
                } else if(y-Math.floor(N/2)>0) {
                    q2++;
                }
            } else if(x-Math.floor(M/2)>0){
                if(y-Math.floor(N/2)<0){
                    q3++;
                } else if(y-Math.floor(N/2)>0) {
                    q4++;
                }
            }
        }
        let t1=Math.abs((q1-pts0.length/4) / Math.sqrt(3*pts0.length/16.0));
        let t2=Math.abs((q2-pts0.length/4) / Math.sqrt(3*pts0.length/16.0));
        let t3=Math.abs((q3-pts0.length/4) / Math.sqrt(3*pts0.length/16.0));
        let t4=Math.abs((q4-pts0.length/4) / Math.sqrt(3*pts0.length/16.0));
        if(t1>sigma || t2>sigma || t3>sigma || t4>sigma){
            console.log("At time: "+telapsed);
            for(let i=0;i<N;i++){
                console.log(grid[i].join(""));
            }
            done=true;
        }
        telapsed++;
        

    }
};

//day14a(testinput);
//day14a(input);
//day14b(testinput);
day14b(input);
