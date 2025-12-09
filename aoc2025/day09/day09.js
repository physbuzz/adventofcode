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

let day09a=function(input){
    console.log("=========== day 09 part 1 ==========");
    let lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0)
        .map(line => line.split(',').map(x => +x));

    let ret=0;
    let rectSize=function(a,b){
        let [x1,y1]=a;
        let [x2,y2]=b;
        return (Math.abs(x2-x1)+1)*(Math.abs(y2-y1)+1);
    }
    let m=0;
    for(let i=0;i<lines.length-1;i++){
        let line=lines[i];
        for(let j=i+1;j<lines.length-1;j++){
            if(rectSize(lines[i],lines[j])>m){
                m=rectSize(lines[i],lines[j]);
            }
        }
    }
    console.log(m);
};

// :~)
let day09b=function(input){
    console.log("=========== day 09 part 2 ==========");
    let lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0)
        .map(line => line.split(',').map(x => +x));

    let ret=0;
    let rectSize=function(a,b){
        let [x1,y1]=a;
        let [x2,y2]=b;
        return (Math.abs(x2-x1)+1)*(Math.abs(y2-y1)+1);
    }
    let verticalIntersectsHorizontal=function(xwall,y1wall,y2wall,yray,x1ray,x2ray){
        if(Math.min(x1ray,x2ray)<=xwall && xwall<=Math.max(x1ray,x2ray)){
            if(Math.min(y1wall,y2wall)<=yray && yray<=Math.max(y1wall,y2wall)){
                return true;
            }
        }
        return false;
    };

    const dirs=[[1,0],[0,1],[-1,0],[0,-1]];
    let getDirection=function(x0,y0,x1,y1){
        if(y0==y1)
            if(x0<x1)
                return 0;
            else
                return 2;
        else if(x0==x1)
            if(y0<y1)
                return 1;
            else
                return 3;
        console.log("Error, bad path");
    };
    let getVertex=function(i,winding){
        const a=lines[(i-1+lines.length)%lines.length];
        const b=lines[i];
        const c=lines[(i+1)%lines.length];
        let dirFrom=getDirection(a[0],a[1],b[0],b[1]);
        let dirTo=getDirection(b[0],b[1],c[0],c[1]);
        if(winding==1){
            if(dirFrom==0){
                if(dirTo==1){
                    return [b[0]-0.5,b[1]+0.5];
                } else if(dirTo==3){
                    return [b[0]+0.5,b[1]+0.5];
                }
            } else if(dirFrom==1){
                if(dirTo==2){
                    return [b[0]-0.5,b[1]-0.5];
                } else if(dirTo==0){
                    return [b[0]-0.5,b[1]+0.5];
                }
            } 
            if(dirFrom==2){
                if(dirTo==3){
                    return [b[0]+0.5,b[1]-0.5];
                } else if(dirTo==1){
                    return [b[0]-0.5,b[1]-0.5];
                }
            } 
            else if(dirFrom==3){
                if(dirTo==0) {
                    return [b[0]+0.5,b[1]+0.5];
                } else if(dirTo==2){
                    return [b[0]+0.5,b[1]-0.5];
                }
            }
        } else {
            if(dirFrom==0){
                if(dirTo==1){
                    return [b[0]+0.5,b[1]-0.5];
                } else if(dirTo==3){
                    return [b[0]-0.5,b[1]-0.5];
                }
            } else if(dirFrom==1){
                if(dirTo==2){
                    return [b[0]+0.5,b[1]+0.5];
                } else if(dirTo==0){
                    return [b[0]+0.5,b[1]-0.5];
                }
            } 
            if(dirFrom==2){
                if(dirTo==3){
                    return [b[0]-0.5,b[1]+0.5];
                } else if(dirTo==1){
                    return [b[0]+0.5,b[1]+0.5];
                }
            } 
            else if(dirFrom==3){
                if(dirTo==0) {
                    return [b[0]-0.5,b[1]-0.5];
                } else if(dirTo==2){
                    return [b[0]-0.5,b[1]+0.5];
                }
            }
        }
        console.log("HUH");
    }
    let loopCutsRectangleTest=function(xa,ya,xb,yb){
        let [x0,y0]=[Math.min(xa,xb)-0.3,Math.min(ya,yb)-0.3];
        let [x1,y1]=[Math.max(xa,xb)+0.3,Math.max(ya,yb)+0.3];
        for(let i=0;i<lines.length;i++){
            let [x2,y2]=getVertex(i,0);
            let [x3,y3]=getVertex((i+1)%(lines.length),0);
            if(y2==y3){
                //horizontal 1
                if(verticalIntersectsHorizontal(x0,y0,y1,y2,x2,x3)){
                    return true;
                }
                //horizontal 2
                if(verticalIntersectsHorizontal(x1,y0,y1,y2,x2,x3)){
                    return true;
                }
            }
            if(x2==x3){
                //vertical 1
                if(verticalIntersectsHorizontal(x2,y2,y3,y0,x0,x1)){
                    return true;
                }
                //horizontal 2
                if(verticalIntersectsHorizontal(x2,y2,y3,y1,x0,x1)){
                    return true;
                }
            }
        }
        return false;

    };
    let m=0;
    for(let i=0;i<lines.length-1;i++){
        let [x0,y0]=lines[i];
        for(let j=i+1;j<lines.length;j++){
            let [x2,y2]=lines[j];
            let [x1,y1]=[x0,y2];
            let [x3,y3]=[x2,y0];
            if(rectSize(lines[i],lines[j])>m && !loopCutsRectangleTest(x0,y0,x2,y2)){
                m=rectSize(lines[i],lines[j]);
            }
        }
    } 
    console.log(m);
};

day09a(testinput);
day09a(input);
day09b(testinput);
day09b(input);
