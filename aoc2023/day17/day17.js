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

let day17a=function(input){
    console.log("=========== day 17 part 1 ==========");
    lines=input.split('\n').map(x=>x.trim()).filter(x=>x.length>0);
    //Okay, we're going to do Dijkstra 
    //State is (x,y,z,dir) with dir=0,1,2,3 a cardinal direction
    //and z=0,1,2 the number of moves since turning.

    let maze=lines.map(line=>line.split('').map((x)=>(+x)));
    let I=lines.length;
    let J=lines[0].length;

    let inBounds=(i,j)=>(i>=0 && j>=0 && i<I && j<J);

    let dist=[];
    for(let i=0;i<I;i++){
        dist[i]=[];
        for(let j=0;j<J;j++){
            dist[i][j]=[];
            for(let z=0;z<3;z++){
                dist[i][j][z]=[];
            }
        }
    }
    //list of integers = "distance" from top left.
    dist[0][0][0][0]=0;
    dist[0][0][0][1]=0;

    let dirlist=[[1,0],[0,1],[-1,0],[0,-1]];
    let mymod=(a,b)=>((a%b>=0)?a%b:a%b+b);
    let possibleMoves=function(i,j,z,dir){
        let retlist=[];

        let rdir=mymod(dir-1,4);
        let ldir=mymod(dir+1,4);

        //We can always turn and set z back to zero
        retlist.push([i+dirlist[ldir][0],j+dirlist[ldir][1],0,ldir]);
        retlist.push([i+dirlist[rdir][0],j+dirlist[rdir][1],0,rdir]);
        //We can sometimes go straight
        if(z<2){
            retlist.push([i+dirlist[dir][0],j+dirlist[dir][1],z+1,dir]);
        }
        return retlist.filter((el)=>inBounds(el[0],el[1]));
    };

    let explored=[];
    for(let i=0;i<I;i++){
        explored[i]=[];
        for(let j=0;j<J;j++){
            explored[i][j]=[];
            for(let z=0;z<3;z++){
                explored[i][j][z]=[];
            }
        }
    }

    //Keep the list of next places to explore "in our pocket"
    let Q=[[0,0,0,0],[0,0,0,1]];
    
    //https://stackoverflow.com/a/21822316/17616747
    Q.sortedIndex=function(value){
        var low = 0,
            high = this.length;
        while (low < high) {
            var mid = (low + high) >>> 1;
            if (dist[this[mid][0]][this[mid][1]][this[mid][2]][this[mid][3]] > value) low = mid + 1;
            else high = mid;
        }
        return low;
    }
    Q.insertSorted=function(arg){
        let i=this.sortedIndex(dist[arg[0]][arg[1]][arg[2]][arg[3]]);
        this.splice(i,0,arg);
    };
    /*
    Q.printDistances=function(){
        let str="";
        for(let y of this){
            str+=dist[y]+", ";
        }
        console.log(str);
    };*/
    //Look at the places in our pocket
    let ret=0;
    while(Q.length>0){
        //Sort so that Q[0] has the *largest* distance. So Q.pop() gives the smallest distance element.
        //Q.sort((a,b)=>dist[index(b)]-dist[index(a)]);
        let y=Q.pop();
        explored[y[0]][y[1]][y[2]][y[3]]=true;
        if(y[0]==I-1 && y[1]==J-1){
            //dist.prettyPrint();
            //console.log("Found exit!")
            ret=dist[y[0]][y[1]][y[2]][y[3]];
            break;
            //console.log("dist: "+dist[y[0]][y[1]][y[2]][y[3]]);
        }

        /*
    Test all adjacent sites.
    This is identical to the wikipedia pseudocode *except* we have to keep in mind to add each neighbor
    of the current vertex [i,j] to Q.
    */

        let adj=possibleMoves(y[0],y[1],y[2],y[3]);
        for(let x of adj){
            let i=x[0],j=x[1],z=x[2],dir=x[3];
            //Wiki pseudocode says "for each neighbor x of [i,j] never popped from Q"
            //open(x) means it's a neighbor. !explored means it wasn't popped.
            if(!explored[i][j][z][dir]) {
                //explored[x[1]*n+x[0]]=true;
                let diff=maze[i][j];
                if(dist[i][j][z][dir]===undefined){
                    dist[i][j][z][dir] = dist[y[0]][y[1]][y[2]][y[3]]+diff;
                    
                } else if(dist[y[0]][y[1]][y[2]][y[3]]+diff<dist[i][j][z][dir]){
                    //If this occurs, then we've found a shorter path to the same state.
                    //The same state is potentially already in Q, so to make sure Q stays
                    //sorted by distance, we have to treat it specially.
                    //First, modify the distance:
                    dist[i][j][z][dir] = dist[y[0]][y[1]][y[2]][y[3]]+diff;

                    //Then, if [i,j,z,dir] is in Q, remove it and re-sort it.
                    let ind2=Q.findIndex((el)=>(el[0]==i&&el[1]==j&&el[2]==z&&el[3]==dir));
                    if(ind2>=0){
                        Q.splice(ind2,1);
                    } 
                    Q.insertSorted([i,j,z,dir]);

                    //dist.prettyPrint();
                }
                if(Q.findIndex((el)=>(el[0]==i&&el[1]==j&&el[2]==z&&el[3]==dir))<0)
                    Q.insertSorted([i,j,z,dir]);
                //Q.printDistances();
            }
        }
    }
    console.log(ret);
};

let day17b=function(input){
    console.log("=========== day 17 part 2 ==========");
    lines=input.split('\n').map(x=>x.trim()).filter(x=>x.length>0);
    //Okay, we're going to do Dijkstra 
    //State is (x,y,z,dir) with dir=0,1,2,3 a cardinal direction
    //and z=0,1,2 the number of moves since turning.

    let maze=lines.map(line=>line.split('').map((x)=>(+x)));
    let I=lines.length;
    let J=lines[0].length;

    let inBounds=(i,j)=>(i>=0 && j>=0 && i<I && j<J);

    let dist=[];
    for(let i=0;i<I;i++){
        dist[i]=[];
        for(let j=0;j<J;j++){
            dist[i][j]=[];
            for(let z=0;z<10;z++){
                dist[i][j][z]=[];
            }
        }
    }
    //list of integers = "distance" from top left.
    dist[0][0][0][0]=0;
    dist[0][0][0][1]=0;

    let dirlist=[[1,0],[0,1],[-1,0],[0,-1]];
    let mymod=(a,b)=>((a%b>=0)?a%b:a%b+b);
    let possibleMoves=function(i,j,z,dir){
        let retlist=[];

        let rdir=mymod(dir-1,4);
        let ldir=mymod(dir+1,4);

        //sometimes must go straight
        if(z<3){
            retlist.push([i+dirlist[dir][0],j+dirlist[dir][1],z+1,dir]);
        } else if(z<9) {
            //we can turn or go straight
            retlist.push([i+dirlist[dir][0],j+dirlist[dir][1],z+1,dir]);
            retlist.push([i+dirlist[ldir][0],j+dirlist[ldir][1],0,ldir]);
            retlist.push([i+dirlist[rdir][0],j+dirlist[rdir][1],0,rdir]);
        } else if(z==9) {
            //must turn
            retlist.push([i+dirlist[ldir][0],j+dirlist[ldir][1],0,ldir]);
            retlist.push([i+dirlist[rdir][0],j+dirlist[rdir][1],0,rdir]);
        }
        return retlist.filter((el)=>inBounds(el[0],el[1]));
    };

    /*
    dist.prettyPrint=function(){
        let o=[];
        for(let j=0;j<n;j++){
            o[j]="";
            for(let i=0;i<n;i++){
                let c=dist[j*n+i];
                if(c==undefined)
                    o[j]+=".".padStart(3," ");
                else
                    o[j]+=(""+dist[j*n+i]).padStart(3," ");
            }
        }
        console.log(o.join('\n'));
    };*/



    let explored=[];
    for(let i=0;i<I;i++){
        explored[i]=[];
        for(let j=0;j<J;j++){
            explored[i][j]=[];
            for(let z=0;z<10;z++){
                explored[i][j][z]=[];
            }
        }
    }

    //Keep the list of next places to explore "in our pocket"
    let Q=[[0,0,0,0],[0,0,0,1]];
    
    //https://stackoverflow.com/a/21822316/17616747
    Q.sortedIndex=function(value){
        var low = 0,
            high = this.length;
        while (low < high) {
            var mid = (low + high) >>> 1;
            if (dist[this[mid][0]][this[mid][1]][this[mid][2]][this[mid][3]] > value) low = mid + 1;
            else high = mid;
        }
        return low;
    }
    Q.insertSorted=function(arg){
        let i=this.sortedIndex(dist[arg[0]][arg[1]][arg[2]][arg[3]]);
        this.splice(i,0,arg);
    };
    /*
    Q.printDistances=function(){
        let str="";
        for(let y of this){
            str+=dist[y]+", ";
        }
        console.log(str);
    };*/
    //Look at the places in our pocket
    let ret=0;
    while(Q.length>0){
        //Sort so that Q[0] has the *largest* distance. So Q.pop() gives the smallest distance element.
        //Q.sort((a,b)=>dist[index(b)]-dist[index(a)]);
        let y=Q.pop();
        explored[y[0]][y[1]][y[2]][y[3]]=true;
        if(y[0]==I-1 && y[1]==J-1){
            //dist.prettyPrint();
            //console.log("Found exit!")
            ret=dist[y[0]][y[1]][y[2]][y[3]];
            break;
            //console.log("dist: "+dist[y[0]][y[1]][y[2]][y[3]]);
        }

        /*
    Test all adjacent sites.
    This is identical to the wikipedia pseudocode *except* we have to keep in mind to add each neighbor
    of the current vertex [i,j] to Q.
    */

        let adj=possibleMoves(y[0],y[1],y[2],y[3]);
        for(let x of adj){
            let i=x[0],j=x[1],z=x[2],dir=x[3];
            //Wiki pseudocode says "for each neighbor x of [i,j] never popped from Q"
            //open(x) means it's a neighbor. !explored means it wasn't popped.
            if(!explored[i][j][z][dir]) {
                //explored[x[1]*n+x[0]]=true;
                let diff=maze[i][j];
                if(dist[i][j][z][dir]===undefined){
                    dist[i][j][z][dir] = dist[y[0]][y[1]][y[2]][y[3]]+diff;
                    
                } else if(dist[y[0]][y[1]][y[2]][y[3]]+diff<dist[i][j][z][dir]){
                    //If this occurs, then we've found a shorter path to the same state.
                    //The same state is potentially already in Q, so to make sure Q stays
                    //sorted by distance, we have to treat it specially.
                    //First, modify the distance:
                    dist[i][j][z][dir] = dist[y[0]][y[1]][y[2]][y[3]]+diff;

                    //Then, if [i,j,z,dir] is in Q, remove it and re-sort it.
                    let ind2=Q.findIndex((el)=>(el[0]==i&&el[1]==j&&el[2]==z&&el[3]==dir));
                    if(ind2>=0){
                        Q.splice(ind2,1);
                    } 
                    Q.insertSorted([i,j,z,dir]);

                    //dist.prettyPrint();
                }
                if(Q.findIndex((el)=>(el[0]==i&&el[1]==j&&el[2]==z&&el[3]==dir))<0)
                    Q.insertSorted([i,j,z,dir]);
                //Q.printDistances();
            }
        }
    }
    console.log(ret);
};


//day17a(testinput);
day17a(input);
//day17b(testinput);
day17b(input);
