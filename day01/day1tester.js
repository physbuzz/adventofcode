const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const input=readFileAsString("input.txt");

/* idea: copy a whole bunch of solutions from reddit or thereabouts
 * and find the fastest! I don't care so much if my day1.js is ugly
 * and fast, but let's compare to see if it's ugly and slow. */

let functionList=[

//https://www.reddit.com/r/adventofcode/comments/1883ibu/comment/kbl50dt/?utm_source=share&utm_medium=web2x&context=3
function(input){
    let lines=input.trim().split('\n');
    let sum = 0;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].toLowerCase();
        if(line.length==0)
            continue;
        let textNumbers = line.match(/twone|sevenine|oneight|threeight|nineight|fiveight|eighthree|eightwo|one|two|three|four|five|six|seven|eight|nine|[0-9]/g);
        let numbers = textNumbers.flatMap(function (num) {
            if (isNaN(num)) {
                if (num === 'twone') {
                    return [2, 1]
                } else if (num === 'sevenine') {
                    return [7, 9]
                } else if (num === 'oneight') {
                    return [1, 8]
                } else if (num === 'threeight') {
                    return [3, 8]
                } else if (num === 'nineight') {
                    return [9, 8]
                } else if (num === 'fiveight') {
                    return [5, 8]
                } else if (num === 'eighthree') {
                    return [8, 3]
                } else if (num === 'eightwo') {
                    return [8, 2]
                }
            } 
            console.log(num);
            console.log(parseInt(num));
            return parseInt(num);
        });

        let concatNum = parseInt(numbers[0] + '' + numbers[numbers.length - 1]);
        console.log(numbers);
        sum += concatNum;
    }
    
    return sum;
},
//https://www.reddit.com/r/adventofcode/comments/1883ibu/comment/kbkxwws/?utm_source=share&utm_medium=web2x&context=3

function(input) { 
    return input.split('\n')  
    .filter(s => s)  
    .map(s => s.match(/(\d|twone|sevenine|oneight|threeight|nineight|fiveight|eighthree|eightwo|one|two|three|four|five|six|seven|eight|nine)/gms))  
.map(s => s.flatMap(v => ({ 'twone': [2, 1], 'sevenine': [7, 9], 'oneight': [1, 8], 'threeight': [3, 8], 'nineight': [9, 8], 'fiveight': [5, 8], 'eighthree': [8, 3], 'eightwo': [8, 2], one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9 }[v])))  
    .map(nums => +[nums[0], nums[nums.length - 1]].join(''))  
    .reduce((a, b) => a + b, 0);
}
];


console.log(functionList[0](input));
