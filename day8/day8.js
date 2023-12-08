const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const input=readFileAsString("input.txt");



let day8a=function(input){
    lines=input.split('\n');
    for(let n in lines){
        let line=lines[n];
        if(line.length==0)
            continue;
        if(n<5)
            console.log(line);
    }

    console.log("=========== day 8 part 1 ==========");
};

day8a(input);
