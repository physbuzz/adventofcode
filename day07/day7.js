const fs = require('fs');

let readFileAsString=function(fname){
    return fs.readFileSync(__dirname+"/"+fname,{encoding:'utf8',flag:'r'});
};
const input=readFileAsString("input.txt");



let day7a=function(input){
    lines=input.split('\n');
    let cards=[];

    let countGroup=function(hand,character){
        let ct=0;
        for(let ch of hand){
            if(ch==character)
                ct++;
        }
        return ct;
    }
    let map={'2':0,'3':1,'4':2,'5':3,'6':4,'7':5,'8':6,'9':7,'T':8,'J':9,'Q':10,'K':11,'A':12};

    let getScore=function(hand){
        let scoreMinor=0;
        for(let ch of hand){
            scoreMinor=scoreMinor*13+map[ch];
        }

        //Ugly! But whatever.
        let threefound=false;
        let twofound=false;

        for(let i in map){
            if(countGroup(hand,i)==5){
                return 6*Math.pow(13,5)+scoreMinor;
            } else if(countGroup(hand,i)==4){
                return 5*Math.pow(13,5)+scoreMinor;
            } else if(countGroup(hand,i)==3){
                if(twofound){ // full house
                    return 4*Math.pow(13,5)+scoreMinor;
                }
                threefound=true;
            } else if(countGroup(hand,i)==2){
                if(threefound){ //full house
                    return 4*Math.pow(13,5)+scoreMinor;
                } else if(twofound) { //two pair
                    return 2*Math.pow(13,5)+scoreMinor;
                }
                twofound=true;
            } 
        }
        if(threefound){ //three of a kind
            return 3*Math.pow(13,5)+scoreMinor;
        }
        if(twofound){ //one pair
            return 1*Math.pow(13,5)+scoreMinor;
        }
        //high card
        return scoreMinor;
    }

    for(let n=0;n<lines.length;n++){
        if(lines[n].trim().length==0)
            continue;

        let line=lines[n].trim().split(' ');
        cards.push([line[0],+line[1],getScore(line[0])]);
    }
    cards.sort((a,b)=>(-a[2]+b[2]));
    //console.log(cards[0]);
    let ret=0;
    for(let i in cards){
        //console.log((cards.length-i)+" times "+cards[i][1]);
        ret+=(cards.length-i)*cards[i][1];
    }

    console.log("=========== day 7 part 1 ==========");
    console.log(ret);
};

let day7b=function(input){
    lines=input.split('\n');
    let cards=[];

    let map={'J':0,'2':1,'3':2,'4':3,'5':4,'6':5,'7':6,'8':7,'9':8,'T':9,'Q':10,'K':11,'A':12};

    let countGroup=function(hand,character){
        let ct=0;
        for(let ch of hand){
            if(ch==character)
                ct++;
        }
        return ct;
    }
    let countGroupIncludeJ=function(hand,character){
        let ct=0;
        for(let ch of hand){
            if(ch==character || ch=='J')
                ct++;
        }
        return ct;
    }
    let checkFive=function(hand){
        for(let i in map){
            if(countGroupIncludeJ(hand,i)==5){
                return true;
            } 
        }
        return false;
    };
    let checkFour=function(hand){
        for(let i in map){
            if(countGroupIncludeJ(hand,i)==4){
                return true;
            } 
        }
        return false;
    };
    let checkFullHouse=function(hand){
        //explanation of this: 
        //any full house using a J will only have 1 J
        //No full house can have the 2 of a kind be J
        let characterFound='';
        let threefound=false;
        let twofound=false;
        for(let i in map){
            if(countGroupIncludeJ(hand,i)==3){
                threefound=true;
                characterFound=i;
            } 
        }
        for(let i in map){
            if(countGroup(hand,i)==2 && characterFound!=i && i!='J'){
                twofound=true;
            } 
        }
        return (threefound && twofound);
    };
    let checkThree=function(hand){
        for(let i in map){
            if(countGroupIncludeJ(hand,i)==3){
                return true;
            } 
        }
        return false;
    };
    //we never use J to make a two pair
    let checkTwoPair=function(hand){
        let twofound=false;
        for(let i in map){
            if(countGroup(hand,i)==2){
                if(twofound)
                    return true;
                twofound=true;
            } 
        }
        return false;
    };
    let checkOnePair=function(hand){
        for(let i in map){
            if(countGroupIncludeJ(hand,i)==2){
                return true;
            } 
        }
        return false;
    };
    let getScore=function(hand){
        let scoreMinor=0;
        for(let ch of hand){
            scoreMinor=scoreMinor*13+map[ch];
        }

        //Ugly! But whatever.

    //[checkFive,checkFour,checkFullHouse,checkThree,checkTwoPair,checkOnePair]
        if(checkFive(hand)){
            return 6*Math.pow(13,5)+scoreMinor;
        } else if(checkFour(hand)) {
            return 5*Math.pow(13,5)+scoreMinor;
        } else if(checkFullHouse(hand)) {
            return 4*Math.pow(13,5)+scoreMinor;
        } else if(checkThree(hand)) {
            return 3*Math.pow(13,5)+scoreMinor;
        } else if(checkTwoPair(hand)) {
            return 2*Math.pow(13,5)+scoreMinor;
        } else if(checkOnePair(hand)) {
            return 1*Math.pow(13,5)+scoreMinor;
        }
        return scoreMinor;
    }

    for(let n=0;n<lines.length;n++){
        if(lines[n].trim().length==0)
            continue;

        let line=lines[n].trim().split(' ');
        cards.push([line[0],+line[1],getScore(line[0])]);
    }
    cards.sort((a,b)=>(-a[2]+b[2]));
    //console.log(cards[0]);
    let ret=0;
    for(let i in cards){
        //if(i<10)
            console.log(cards[i]);
        ret+=(cards.length-i)*cards[i][1];
    }

    console.log("=========== day 7 part 2 ==========");
    console.log(ret);
};


day7a(input);
day7b(input);
