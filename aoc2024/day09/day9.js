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

let day9a=function(input){
    console.log("=========== day 9 part 1 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);

    let blocks=lines[0].split('').map(x => +x);

    let ids=[];
    
    let lcursor={block:0,pos:0,id:0,empty:0};
    //let rcursor={block:0,pos:0,id:0,empty:0};
    let stepCursor=function(c){
        if(c.empty==1){
            c.pos+=blocks[c.block];
            c.id+=1;
            c.empty=0;
            c.block++;
        } else {
            c.pos+=blocks[c.block];
            c.empty=1;
            c.block++;
        }
        if(c.block>=blocks.length)
            return false;
        return true;
    };

    do {
        for(let i=0;i<blocks[lcursor.block];i++){
            if(lcursor.empty==0)
                ids[lcursor.pos+i]=lcursor.id;
            else 
                ids[lcursor.pos+i]=-1;
        }
    } while(stepCursor(lcursor))


    let ll=0;
    let rr=ids.length-1;
    do { 
        if(ids[ll]<0 && ids[rr]>=0){
            ids[ll]=ids[rr];
            ids[rr]=-1;
        }
        if(ids[ll]>=0)
            ll++;
        if(ids[rr]<0)
            rr--;
    } while(ll<rr)

    let ret=0;
    for(let i=0;i<ids.length;i++){
        if(ids[i]>=0)
            ret+=ids[i]*i;
    }


    console.log(ret);
};

let day9b=function(input){
    console.log("=========== day 9 part 2 ==========");
    lines=input.split('\n').map( x => x.trim()).filter(line => line.length>0);

    let blocks=lines[0].split('').map(x => +x);

    blocks[0]={pos:0,id:0,empty:0,length:blocks[0]};
    for(let i=1;i<blocks.length;i++){
        blocks[i]={
            pos:blocks[i-1].pos+blocks[i-1].length,
            empty:1-blocks[i-1].empty,
            id:(blocks[i-1].empty===1)?(blocks[i-2].id+1):-1,
            length:blocks[i],
            moved:false};
    }
    blocks=blocks.filter( x => x.empty===0);

    let leftInsertBlock=function(blockID){
        let j=0;
        for(;j<blocks.length;j++){
            if(blocks[j].id===blockID)
                break;
        }
        if(j===blocks.length)
            return;

        let block=blocks[j];

        for(let i=0;i<j;i++){
            if(blocks[i+1].pos - blocks[i].pos - blocks[i].length >= block.length){
                blocks.splice(i+1,0,block);
                blocks.splice(j+1,1);
                blocks[i+1].pos=blocks[i].pos+blocks[i].length;
                break;
            }
        }
    };

    for(let k=blocks[blocks.length-1].id;k>0;k--){
        leftInsertBlock(k);
    }


    let ids=[];
    
    let pos=0;
    for(let i=0;i<blocks.length;i++){
        for(let ll=0;ll<blocks[i].length;ll++){
            ids[blocks[i].pos+ll]=blocks[i].id;
        }
    }

    let ret=0;
    for(let i=0;i<ids.length;i++){
        if(ids[i] && ids[i]>=0)
            ret+=ids[i]*i;
    }
    console.log(ret);
};

//day9a(testinput);
day9a(input);
//day9b(testinput);
day9b(input);
