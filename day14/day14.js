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
    lines=input.split('\n');

    let load=0;
    let rocks=[];
    for(let n in lines){
        let line=lines[n].trim();
        if(line.length==0)
            continue;
        rocks.push(line.split(''));
    }
    for(let col=0;col<rocks[0].length;col++){
        let ctr=rocks.length;
        for(let row=0;row<rocks.length;row++){
            if(rocks[row][col]=='O'){
                load+=ctr;
                ctr--;
            } else if(rocks[row][col]=='#'){
                ctr=rocks.length-row-1;
            }
        }
    }
    console.log(load);
};

let day14b=function(input){
    console.log("=========== day 14 part 2 ==========");
    lines=input.split('\n');

    let load=0;
    let rocks=[];
    for(let n in lines){
        let line=lines[n].trim();
        if(line.length==0)
            continue;
        rocks.push(line.split(''));
    }
    let printBoard=function(board){
        for(let row=0;row<board.length;row++){
            console.log(board[row].join(''));
        }
    };
    let boardHash=function(board){
        let str="";
        for(let row=0;row<board.length;row++){
            str+=board[row].join('');
        }
        //Turns out just skipping the hashing process is fine.
        return str;
    };

    let getNorthLoad=function(board){
        let load=0;
        for(let col=0;col<board[0].length;col++){
            for(let row=0;row<board.length;row++){
                if(board[row][col]=='O'){
                    load+=board.length-row;
                }           
            }
        }
        return load;
    }
    let dropNorth=function(board){
        let load=0;
        let boardnew=[];
        for(let col=0;col<board[0].length;col++){
            let ctr=board.length;
            for(let row=0;row<board.length;row++){
                if(boardnew[row]===undefined){
                    boardnew[row]=[];
                }
                if(board[row][col]=='O'){
                    boardnew[board.length-ctr][col]='O';
                    load+=ctr;
                    ctr--;
                } else if(board[row][col]=='#'){
                    for(;ctr>board.length-row;ctr--){
                        boardnew[board.length-ctr][col]='.';
                    }
                    boardnew[board.length-ctr][col]='#';
                    ctr--;
                }
            }
            for(;ctr>0;ctr--){
                boardnew[board.length-ctr][col]='.';
            }
        }
        return boardnew;
    }
    let dropSouth=function(board){
        let load=0;
        let boardnew=[];
        for(let col=0;col<board[0].length;col++){
            let ctr=1;
            for(let row=board.length-1;row>=0;row--){
                if(boardnew[row]===undefined){
                    boardnew[row]=[];
                }
                if(board[row][col]=='O'){
                    boardnew[board.length-ctr][col]='O';
                    load+=ctr;
                    ctr++;
                } else if(board[row][col]=='#'){
                    for(;ctr<board.length-row;ctr++){
                        boardnew[board.length-ctr][col]='.';
                    }
                    boardnew[board.length-ctr][col]='#';
                    ctr++;
                }
            }
            for(;ctr<=board.length;ctr++){
                boardnew[board.length-ctr][col]='.';
            }
        }
        return boardnew;
    }

    let dropWest=function(board){
        let boardnew=[];

        for(let row=0;row<board.length;row++){
            let ctr=board[0].length;
            boardnew[row]=[];
            for(let col=0;col<board.length;col++){
                if(board[row][col]=='O'){
                    boardnew[row][board[0].length-ctr]='O';
                    ctr--;
                } else if(board[row][col]=='#'){
                    for(;ctr>board[0].length-col;ctr--){
                        boardnew[row][board[0].length-ctr]='.';
                    }
                    boardnew[row][board[0].length-ctr]='#';
                    ctr--;
                }
            }
            for(;ctr>0;ctr--){
                boardnew[row][board[0].length-ctr]='.';
            }
        }
        return boardnew;
    }
    let dropEast=function(board){
        let boardnew=[];
        for(let row=0;row<board.length;row++){
            let ctr=1;
            boardnew[row]=[];
            for(let col=board[0].length-1;col>=0;col--){
                if(board[row][col]=='O'){
                    boardnew[row][board[0].length-ctr]='O';
                    ctr++
                } else if(board[row][col]=='#'){
                    for(;ctr<board[0].length-col;ctr++){
                        boardnew[row][board[0].length-ctr]='.';
                    }
                    boardnew[row][board[0].length-ctr]='#';
                    ctr++;
                }

            }
            for(;ctr<=board[0].length;ctr++){
                boardnew[row][board.length-ctr]='.';
            }
        }
        return boardnew;
    }

            //for(let col=board[0].length-1;col>=0;col--){
    let hashmap=[];


    let ntarget=1000000000;
    let i0=0; // First repeat
    let chash=0;
    let cl=0; //Cycle length

    for(let i=1;i<1000;i++){
        rocks=dropEast(dropSouth(dropWest(dropNorth(rocks))));
        ntarget--;

        let indx=boardHash(rocks);
        if(hashmap[indx]!==undefined){
            console.log("Repeat found after i cycles. i="+i);
            i0=i;
            chash=indx;
            break;
        } else {
            hashmap[indx]=true;
        }
    }
    for(let c=1;c<1000;c++){
        rocks=dropEast(dropSouth(dropWest(dropNorth(rocks))));
        let indx=boardHash(rocks);
        if(indx==chash){
            cl=c;
            console.log("Cycle length = "+cl);
            break;
        }
    }
    for(let d=0;d<ntarget-Math.floor(ntarget/cl)*cl;d++){
        rocks=dropEast(dropSouth(dropWest(dropNorth(rocks))));
    }
    console.log(getNorthLoad(rocks));



    //printBoard(rocks);
    //console.log("=====");
    //printBoard(dropEast(dropWest(rocks)));
    //console.log(boardHash(dropSouth(dropNorth(rocks))));
    //console.log(boardHash(dropSouth(rocks)));
};



day14a(input);
//day14a(testinput);
day14b(input);
//day14b(testinput);
