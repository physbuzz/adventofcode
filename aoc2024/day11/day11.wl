(* Wolfram Language script *)

ClearAll[myLength]
(* Part 2 solution *)
input={0 ,27, 5409930, 828979, 4471, 3, 68524, 170};
split[x_]:=Module[{lst=IntegerDigits[x]},FromDigits/@{lst[[1;;Length[lst]/2]],lst[[Length[lst]/2+1;;]]}];
step[list_]:=Flatten[list/.{0 -> 1, (x_?(EvenQ[Length[IntegerDigits[#]]]&&NumberQ[#]&)):>split[x],x_?NumberQ:>2024 x}];
cached={};
myLength[num_,0]:=myLength[num,0]=1;
myLength[num_,n_]:=myLength[num,n]=Total[myLength[#,n-1]&/@step[{num}]];
Print[AbsoluteTiming[myLength[input,75]]]
