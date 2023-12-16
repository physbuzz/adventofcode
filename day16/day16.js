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

let day16a=function(input){
    console.log("=========== day 16 part 1 ==========");
    lines=input.split('\n').map(x=>x.trim()).filter(x=>x.length>0);

    let tiles=[];
    let I=lines.length;
    let J=lines[0].length;
    for(let i=0;i<lines.length;i++){
        //e for energized
        tiles[i]=lines[i].split('').map((c)=>({walkers:[],ch:c,e:false}));
    }


    let dirlist=[[1,0],[0,1],[-1,0],[0,-1]];
    //walker has position i,j
    //each tile has a list of walkers
    //walkers do the obvious (split into two walkers, terminate on edge of board)
    //but also, if they wind up on a tile where the same walker already exists, it's a loop so terminate.
    let walkers=[{i:0,j:0,dir:1}]
    tiles[0][0].e=true;
    tiles[0][0].walkers.push(walkers[0]);

    let walkerEquals=function(w1,w2){
        return (w1.i==w2.i&&w1.j==w2.j&&w1.dir==w2.dir);
    };

    let stepWalker=function(w){
        let newwalker={i:w.i,j:w.j,dir:w.dir};
        let newwalker2={i:w.i,j:w.j,dir:w.dir};
        let tile=tiles[w.i][w.j];
        let twowalkers=false;
        switch(tile.ch){
            case '/':
            //let dirlist=[[1,0],[0,1],[-1,0],[0,-1]];
                //[0,1] -> [-1,0]. 1->2
                //[1,0]->[0,-1]. 0->3
                //[0,-1]->[1,0]. 3->0
                //[-1,0]->[0,1]. 2->1
                if(w.dir==0)
                    newwalker.dir=3;
                else if(w.dir==1)
                    newwalker.dir=2;
                else if(w.dir==2)
                    newwalker.dir=1;
                else if(w.dir==3)
                    newwalker.dir=0;
                break;
            case '\\':
                //let dirlist=[[1,0],[0,1],[-1,0],[0,-1]];
                //[1,0]->[0,1]. 0->1
                //[0,1] -> [1,0]. 1->0
                //[-1,0]->[0,-1]. 2->3
                //[0,-1]->[-1,0]. 3->2
                if(w.dir==0)
                    newwalker.dir=1;
                else if(w.dir==1)
                    newwalker.dir=0;
                else if(w.dir==2)
                    newwalker.dir=3;
                else if(w.dir==3)
                    newwalker.dir=2;
                break;
            case '-':
                //let dirlist=[[1,0],[0,1],[-1,0],[0,-1]];
                //[1,0]->[0,1] and [0,-1]. 0->1 and 3
                //[-1,0]->[0,1] and [0,-1]. 2->1 and 3
                //only do something if dir is 0 or 2
                if(w.dir==0 || w.dir==2) {
                    twowalkers=true;
                    newwalker.dir=1;
                    newwalker2.dir=3;
                }
                break;
            case '|':
                //let dirlist=[[1,0],[0,1],[-1,0],[0,-1]];
                //[0,1]->[1,0] and [-1,0]. 1->0 and 2
                //[0,-1]->[1,0] and [-1,0]. 3->0 and 2
                //only do something if dir is 0 or 2
                if(w.dir==1 || w.dir==3) {
                    twowalkers=true;
                    newwalker.dir=0;
                    newwalker2.dir=2;
                }
                break;
            case '.':
                

                break;
            default:
                console.log("Invalid character found!! "+tile.ch+" at "+w.i+" "+w.j);
        }
            newwalker.i+=dirlist[newwalker.dir][0];
            newwalker.j+=dirlist[newwalker.dir][1];
            newwalker2.i+=dirlist[newwalker2.dir][0];
            newwalker2.j+=dirlist[newwalker2.dir][1];
        if(twowalkers)
            return [newwalker,newwalker2];
        return [newwalker];
    };

    let updateWalkerList=function(walkers){
        let newwalkerlist=[];
        for(let w0 of walkers){
            let add=stepWalker(w0);
            for(let w of add){
                //Only add the walker if it is not out of bounds and if it has not looped
                if(w.i>=0&&w.j>=0&&w.i<I&&w.j<J) {
                    if(!tiles[w.i][w.j].walkers.reduce((a,b)=>a||walkerEquals(w,b),false)){
                        tiles[w.i][w.j].walkers.push(w);
                        tiles[w.i][w.j].e=true;
                        newwalkerlist.push(w);
                    }
                }
            }
        }
        return newwalkerlist;
    };

    while(walkers.length>0){
        walkers=updateWalkerList(walkers);
    }
    let ret=0;
    for(let i=0;i<I;i++){
        for(let j=0;j<J;j++){
            if(tiles[i][j].e)
                ret++;

        }
    }
    console.log(ret);


};

let day16b=function(input){
    console.log("=========== day 16 part 2 ==========");
    lines=input.split('\n').map(x=>x.trim()).filter(x=>x.length>0);


    let I=lines.length;
    let J=lines[0].length;


    let getNumEnergized=function(lines,i0,j0,dir0){

        let tiles=[];
        for(let i=0;i<lines.length;i++){
            //e for energized
            tiles[i]=lines[i].split('').map((c)=>({walkers:[],ch:c,e:false}));
        }


        let dirlist=[[1,0],[0,1],[-1,0],[0,-1]];
        //walker has position i,j
        //each tile has a list of walkers
        //walkers do the obvious (split into two walkers, terminate on edge of board)
        //but also, if they wind up on a tile where the same walker already exists, it's a loop so terminate.
        let walkers=[{i:i0,j:j0,dir:dir0}]
        tiles[i0][j0].e=true;
        tiles[i0][j0].walkers.push(walkers[0]);

        let walkerEquals=function(w1,w2){
            return (w1.i==w2.i&&w1.j==w2.j&&w1.dir==w2.dir);
        };

        let stepWalker=function(w){
            let newwalker={i:w.i,j:w.j,dir:w.dir};
            let newwalker2={i:w.i,j:w.j,dir:w.dir};
            let tile=tiles[w.i][w.j];
            let twowalkers=false;
            switch(tile.ch){
                case '/':
                //let dirlist=[[1,0],[0,1],[-1,0],[0,-1]];
                    //[0,1] -> [-1,0]. 1->2
                    //[1,0]->[0,-1]. 0->3
                    //[0,-1]->[1,0]. 3->0
                    //[-1,0]->[0,1]. 2->1
                    if(w.dir==0)
                        newwalker.dir=3;
                    else if(w.dir==1)
                        newwalker.dir=2;
                    else if(w.dir==2)
                        newwalker.dir=1;
                    else if(w.dir==3)
                        newwalker.dir=0;
                    break;
                case '\\':
                    //let dirlist=[[1,0],[0,1],[-1,0],[0,-1]];
                    //[1,0]->[0,1]. 0->1
                    //[0,1] -> [1,0]. 1->0
                    //[-1,0]->[0,-1]. 2->3
                    //[0,-1]->[-1,0]. 3->2
                    if(w.dir==0)
                        newwalker.dir=1;
                    else if(w.dir==1)
                        newwalker.dir=0;
                    else if(w.dir==2)
                        newwalker.dir=3;
                    else if(w.dir==3)
                        newwalker.dir=2;
                    break;
                case '-':
                    //let dirlist=[[1,0],[0,1],[-1,0],[0,-1]];
                    //[1,0]->[0,1] and [0,-1]. 0->1 and 3
                    //[-1,0]->[0,1] and [0,-1]. 2->1 and 3
                    //only do something if dir is 0 or 2
                    if(w.dir==0 || w.dir==2) {
                        twowalkers=true;
                        newwalker.dir=1;
                        newwalker2.dir=3;
                    }
                    break;
                case '|':
                    //let dirlist=[[1,0],[0,1],[-1,0],[0,-1]];
                    //[0,1]->[1,0] and [-1,0]. 1->0 and 2
                    //[0,-1]->[1,0] and [-1,0]. 3->0 and 2
                    //only do something if dir is 0 or 2
                    if(w.dir==1 || w.dir==3) {
                        twowalkers=true;
                        newwalker.dir=0;
                        newwalker2.dir=2;
                    }
                    break;
                case '.':
                    

                    break;
                default:
                    console.log("Invalid character found!! "+tile.ch+" at "+w.i+" "+w.j);
            }
                newwalker.i+=dirlist[newwalker.dir][0];
                newwalker.j+=dirlist[newwalker.dir][1];
                newwalker2.i+=dirlist[newwalker2.dir][0];
                newwalker2.j+=dirlist[newwalker2.dir][1];
            if(twowalkers)
                return [newwalker,newwalker2];
            return [newwalker];
        };

        let updateWalkerList=function(walkers){
            let newwalkerlist=[];
            for(let w0 of walkers){
                let add=stepWalker(w0);
                for(let w of add){
                    //Only add the walker if it is not out of bounds and if it has not looped
                    if(w.i>=0&&w.j>=0&&w.i<I&&w.j<J) {
                        if(!tiles[w.i][w.j].walkers.reduce((a,b)=>a||walkerEquals(w,b),false)){
                            tiles[w.i][w.j].walkers.push(w);
                            tiles[w.i][w.j].e=true;
                            newwalkerlist.push(w);
                        }
                    }
                }
            }
            return newwalkerlist;
        };

        while(walkers.length>0){
            walkers=updateWalkerList(walkers);
        }
        let ret=0;
        for(let i=0;i<I;i++){
            for(let j=0;j<J;j++){
                if(tiles[i][j].e)
                    ret++;

            }
        }
        return ret;
    };


    let mx=0;
    
    for(let i=0;i<I;i++){
        //let dirlist=[[1,0],[0,1],[-1,0],[0,-1]];
        let a=getNumEnergized(lines,i,0,1);
        if(mx<a)
            mx=a;
        let b=getNumEnergized(lines,i,J-1,3);
        if(mx<b)
            mx=b;
    }
    for(let j=0;j<J;j++){
        //let dirlist=[[1,0],[0,1],[-1,0],[0,-1]];
        let a=getNumEnergized(lines,0,j,0);
        if(mx<a)
            mx=a;
        let b=getNumEnergized(lines,I-1,j,2);
        if(mx<b)
            mx=b;
    }
    console.log(mx);


};

//day16a(testinput);
//day16a(input);
//day16b(testinput);
day16b(input);
