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

let day10a=function(input){
    console.log("=========== day 10 part 1 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);

    let h=lines.map(line => line.split('').map(x => +x));
    let N=h.length;
    let M=h[0].length;
    let ret=0;


    //v for valid
    let v=function(i,j){
        return i>=0 && i<N && j>=0 && j<M;
    };
    let at=function(i,j){
        if(v(i,j))
            return h[i][j];
        return undefined;
    };
    let countNines=function(i0,j0){
        let ret=0;

        let counted=h.map( line => line.map( x => 0) );

        if(h[i0][j0]!==0)
            return 0;
        let pocket=[];
        let dirs=[[-1,0],[0,1],[1,0],[0,-1]];
        for(let k=0;k<4;k++){
            let newpt=[i0+dirs[k][0],j0+dirs[k][1],1]
            if(at(newpt[0],newpt[1])===1)
                pocket.push(newpt);
        }

        while(pocket.length>0){
            let loc=pocket.pop();
            for(let k=0;k<4;k++){
                let newpt=[loc[0]+dirs[k][0],loc[1]+dirs[k][1], loc[2]+1]

                if(loc[2]+1===9 && at(newpt[0],newpt[1])===9) {
                    if(counted[newpt[0]][newpt[1]]===0){
                        ret+=1;
                        counted[newpt[0]][newpt[1]]=1;
                    }
                } else if(at(newpt[0],newpt[1])===loc[2]+1){
                    pocket.push(newpt);
                }
            }
        }

        return ret;

    };
    for(let i=0;i<N;i++){
        for(let j=0;j<M;j++){
            let myvalue=countNines(i,j);
            if(myvalue>0)
                console.log("at location "+i+", "+j+" value is "+myvalue);
            ret+=myvalue;
        }
    }
    console.log(ret);
};

let day10b=function(input){
    console.log("=========== day 10 part 2 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);

    let h=lines.map(line => line.split('').map(x => +x));
    let N=h.length;
    let M=h[0].length;
    let ret=0;


    //v for valid
    let v=function(i,j){
        return i>=0 && i<N && j>=0 && j<M;
    };
    let at=function(i,j){
        if(v(i,j))
            return h[i][j];
        return undefined;
    };
    let countNines=function(i0,j0){
        let ret=0;

        let counted=h.map( line => line.map( x => 0) );

        if(h[i0][j0]!==0)
            return 0;
        let pocket=[];
        let dirs=[[-1,0],[0,1],[1,0],[0,-1]];
        for(let k=0;k<4;k++){
            let newpt=[i0+dirs[k][0],j0+dirs[k][1],1]
            if(at(newpt[0],newpt[1])===1)
                pocket.push(newpt);
        }

        while(pocket.length>0){
            let loc=pocket.pop();
            for(let k=0;k<4;k++){
                let newpt=[loc[0]+dirs[k][0],loc[1]+dirs[k][1], loc[2]+1]

                if(loc[2]+1===9 && at(newpt[0],newpt[1])===9) {
                    //if(counted[newpt[0]][newpt[1]]===0){
                        ret+=1;
                        //counted[newpt[0]][newpt[1]]=1;
                    //}
                } else if(at(newpt[0],newpt[1])===loc[2]+1){
                    pocket.push(newpt);
                }
            }
        }

        return ret;

    };
    for(let i=0;i<N;i++){
        for(let j=0;j<M;j++){
            let myvalue=countNines(i,j);
            if(myvalue>0)
                console.log("at location "+i+", "+j+" value is "+myvalue);
            ret+=myvalue;
        }
    }
    console.log(ret);
};

day10a(testinput);
//day10a(input);
day10b(testinput);
day10b(input);
