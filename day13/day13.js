const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const testinput=readFileAsString("testinput.txt");
const input=readFileAsString("input.txt");

let day13a=function(input){
    console.log("=========== day 13 part 1 ==========");
    blockinput=input.trim().split('\n\n');

    let blocks=[];

    //deep compare 1d arrays
    let arrEquals=function(arr1,arr2){
        if(arr1.length!==arr2.length)
            return false;
        for(let i=0;i<arr1.length;i++){
            if(arr1[i]!==arr2[i])
                return false;
        }
        return true;
    };
    let isReflectionRow=function(block,row){
        //reflection line between row and row+1
        //row gets sent to row+1
        //row-1 gets sent to row+2
        //row-j gets sent to row+j+1
        //i=row-j gets sent to row+(row-i)+1
        //so the check is block[i]==block[2*row-i+1]
        //Watch out, this will return true if row=arr.length-1
        for(let i=0;i<=row;i++){
            let iprime=2*row-i+1;
            if(iprime>=block.length || iprime<0)
                continue;
            //console.log(block[iprime]);
            //console.log("Comparing "+block[i].join('')+" to "+block[iprime].join(''));
            if(!arrEquals(block[i],block[iprime]))
                return false;
        }
        return true;
    };
    let colEquals=function(block,i1,i2){
        for(let j=0;j<block.length;j++){
            if(block[j][i1]!==block[j][i2])
                return false;
        }
        return true;
    };
    let isReflectionCol=function(block,col){
        for(let i=0;i<=col;i++){
            let iprime=2*col-i+1;
            if(iprime>=block[0].length || iprime<0)
                continue;
            if(!colEquals(block,i,iprime))
                return false;
        }
        return true;
    };
    let ret=0;
    for(let blockstring of blockinput){
        if(blockstring.length==0)
            continue;
        let block=blockstring.trim().split('\n').map(x=>x.split(''));


        let matchfound=false;
        for(let r=0;r<block.length-1;r++){
            if(isReflectionRow(block,r)){
                ret+=(r+1)*100;
                break;
            }
        }

        for(let c=0;c<block[0].length-1&&!matchfound;c++){
            if(isReflectionCol(block,c)){
                ret+=(c+1)*1;
                break;
            }
        }
    }
    console.log(ret);
};


let day13b2=function(input){
    console.log("=========== day 13 part 2 ==========");
    blockinput=input.trim().split('\n\n');

    let blocks=[];

    //deep compare 1d arrays
    let arrEquals=function(arr1,arr2){
        if(arr1.length!==arr2.length)
            return false;
        for(let i=0;i<arr1.length;i++){
            if(arr1[i]!==arr2[i])
                return false;
        }
        return true;
    };
    let findReflectionRowMismatches=function(block,row){
        let ret=[];
        for(let i=0;i<=row;i++){
            let iprime=2*row-i+1;
            if(iprime>=block.length || iprime<0)
                continue;

            for(let j=0;j<block[i].length;j++){
                if(block[i][j]!==block[iprime][j])
                    ret.push([i,j]);
            }
        }
        return ret;
    };
    let findReflectionColMismatches=function(block,col){
        let ret=[];
        for(let i=0;i<=col;i++){
            let iprime=2*col-i+1;
            if(iprime>=block[0].length || iprime<0)
                continue;
            for(let j=0;j<block.length;j++){
                if(block[j][i]!==block[j][iprime])
                    ret.push([j,i]);
            }
        }
        return ret;
    };
    let colEquals=function(block,i1,i2){
        for(let j=0;j<block.length;j++){
            if(block[j][i1]!==block[j][i2])
                return false;
        }
        return true;
    };
    let isReflectionCol=function(block,col){
        for(let i=0;i<=col;i++){
            let iprime=2*col-i+1;
            if(iprime>=block[0].length || iprime<0)
                continue;
            if(!colEquals(block,i,iprime))
                return false;
        }
        return true;
    };
    let findReflectionRow=function(block){
        for(let r=0;r<block.length-1;r++){
            if(isReflectionRow(block,r)){
                return r;
                //console.log("Row "+r+" is reflection row");
            }
        }
        return -1;
    };
    let findReflectionCol=function(block){
        for(let c=0;c<block.length-1;c++){
            if(isReflectionCol(block,c)){
                return c;
            }
        }
        return -1;
    };
    let flip=function(symbol){
        if(symbol=='.')
            return '#';
        else if(symbol=='#')
            return '.';
        console.log("Error, non #. passed to flip function");
    };
    let isReflectionRow=function(block,row){
        //reflection line between row and row+1
        //row gets sent to row+1
        //row-1 gets sent to row+2
        //row-j gets sent to row+j+1
        //i=row-j gets sent to row+(row-i)+1
        //so the check is block[i]==block[2*row-i+1]
        //Watch out, this will return true if row=arr.length-1
        for(let i=0;i<=row;i++){
            let iprime=2*row-i+1;
            if(iprime>=block.length || iprime<0)
                continue;
            //console.log(block[iprime]);
            //console.log("Comparing "+block[i].join('')+" to "+block[iprime].join(''));
            if(!arrEquals(block[i],block[iprime]))
                return false;
        }
        return true;
    };


    let getReflectionRows=function(block){
        let ret=[];
        for(let r=0;r<block.length-1;r++){
            if(isReflectionRow(block,r)){
                ret.push(r);
            }
        }
        return ret;
    };
    let getReflectionCols=function(block){
        let ret=[];
        for(let c=0;c<block[0].length-1;c++){
            if(isReflectionCol(block,c)){
                ret.push(c);
            }
        }
        return ret;
    };
    let flipBlock=function(block,i,j){
        let blockcopy=block.map((x)=>[...x]);
        blockcopy[i][j]=flip(blockcopy[i][j]);
        return blockcopy;
    };
    let scoreBlock=function(block){
        let ret=0;
        for(let r=0;r<block.length-1;r++){
            if(isReflectionRow(block,r)){
                ret+=(r+1)*100;
            }
        }

        for(let c=0;c<block[0].length-1;c++){
            if(isReflectionCol(block,c)){
                ret+=(c+1)*1;
            }
        }
        return ret;
    };

    let ret=0;
    for(let blockstring of blockinput){
        if(blockstring.length==0)
            continue;
        let block=blockstring.trim().split('\n').map(x=>x.split(''));

        let rrows=getReflectionRows(block);
        let rcols=getReflectionCols(block);
        let typeofline="";
        if(rrows.length>0)
            typeofline="row";
        else if(rcols.length>0)
            typeofline="col";
        else{
            console.log("Bad input given?");
            break;
        }

        let mismatchfound=false;
        for(let r=0;r<block.length-1;r++){
            let mm=findReflectionRowMismatches(block,r);
            if(mm.length==1){
                if(typeofline==="col"){
                    ret+=(r+1)*100;
                    //block=newblock;
                    mismatchfound=true;
                    break;
                }
                else {
                    if(rrows.indexOf(r)<0) {
                        ret+=(r+1)*100;
                        mismatchfound=true;
                        break;
                    }
                }
            }
        }

        for(let c=0;c<block[0].length-1 &&!mismatchfound;c++){
            let mm=findReflectionColMismatches(block,c);
            if(mm.length==1){
                if(typeofline==="row"){
                    ret+=(c+1);
                    mismatchfound=true;
                    break;
                }
                else {
                    if(rcols.indexOf(c)<0) {
                        ret+=(c+1)*1;
                        mismatchfound=true;
                        break;
                    }
                }

            }
        }
        if(!mismatchfound){
            console.log("No mismatch found for block!!! Uh oh.");
            //console.log(block);
        }
    }
    console.log(ret);
};


day13a(input);
day13b2(input);
