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

let Grid=function(input){
    if(!(this instanceof Grid))
        return new Grid(input);

    if(Array.isArray(input)){
        this.grid=input
            .map(line=>{
                if(typeof line=='string')
                    return line.trim().split('');
                else
                    return line.slice();
            })
            .filter(line=>line.length>0);
    } else if(typeof input=='string'){
        this.grid=input
            .split('\n')
            .map(x=>x.trim().split(''))
            .filter(line=>line.length>0);
    } else {
        this.grid=[];
    }

    this.n=this.grid.length;
    this.m=this.n>0 ? this.grid[0].length : 0;

    this._periodic=false;
    this._outOfBounds='.';
};

Grid.prototype.periodic=function(flag){
    this._periodic=!!flag;
    return this;
};

Grid.prototype.outOfBoundsCharacter=function(ch){
    this._outOfBounds=ch;
    return this;
};

Grid.prototype.at=function(i,j){
    if(this.n==0 || this.m==0)
        return this._outOfBounds;

    if(this._periodic){
        let ii=((i%this.n)+this.n)%this.n;
        let jj=((j%this.m)+this.m)%this.m;
        return this.grid[ii][jj];
    } else {
        if(i>=0 && i<this.n && j>=0 && j<this.m)
            return this.grid[i][j];
        else
            return this._outOfBounds;
    }
};

Grid.prototype.set=function(i,j,value){
    if(this.n==0 || this.m==0)
        return this;

    if(this._periodic){
        let ii=((i%this.n)+this.n)%this.n;
        let jj=((j%this.m)+this.m)%this.m;
        this.grid[ii][jj]=value;
    } else {
        if(i>=0 && i<this.n && j>=0 && j<this.m)
            this.grid[i][j]=value;
    }
    return this;
};

// 8-neighbour adjacency (global)
let adj=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];


let day07a=function(input){
    console.log("=========== day 07 part 1 ==========");
    let ret=0;
    let g=new Grid(input);
    for(let i=0;i<g.n;i++){
        for(let j=0;j<g.m;j++){
            if(g.at(i,j)=='^' && g.at(i-1,j)=='|'){
                g.set(i,j-1,'|');
                g.set(i,j+1,'|');
                ret++;
            } else if(g.at(i-1,j)=='|'||g.at(i-1,j)=='S'){
                g.set(i,j,'|');
            }
        }
    }
    console.log(ret);
};
let day07b=function(input){
    console.log("=========== day 07 part 2 ==========");
    let ret=0;
    let g=new Grid(input);
    let dict={};
    //Number of paths if there's a '|' at (i,j)
    let numPaths=function(i,j){
        if(dict[[i,j]]!==undefined){
            return dict[[i,j]];
        } else {
            if(i==g.n)
                return 1;
            let retvalue=1;
            if(g.at(i+1,j)=='^') {
                retvalue=numPaths(i+1,j-1)+numPaths(i+1,j+1);
            } else {
                retvalue=numPaths(i+1,j);
            }
            dict[[i,j]]=retvalue;
            return retvalue;
        }
    };

    const i=0;
    for(let j=0;j<g.m;j++){
        if(g.at(i,j)=='S')
            ret=numPaths(i,j);
    }
    console.log(ret);
};

let day07c=function(input){
    console.log("=========== day 07 part 2 no rcursion ==========");
    let ret=0;
    let g=new Grid(input);
    for(let i=g.n-1;i>=0;i--){
        for(let j=0;j<g.m;j++){
            if(i==g.n-1){
                if(g.at(i,j)=='.') 
                    g.set(i,j,1);
            } else {
                if(g.at(i,j)=='S')
                    ret=g.at(i+1,j);
                else if(g.at(i,j)=='.') {
                    if(g.at(i+1,j)=='^') {
                        g.set(i,j,g.at(i+1,j-1)+g.at(i+1,j+1));
                    } else {
                        g.set(i,j,g.at(i+1,j));
                    }
                }
            }
        }
    }
    console.log(ret);
};
day07a(testinput);
day07a(input);
day07b(testinput);
day07b(input);
day07c(testinput);
day07c(input);
