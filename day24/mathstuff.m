(*SetDirectory[NotebookDirectory[]];*)
nums = ToExpression[Import["out.txt"]];
vars = Join[{x, y, z, vx, vy, vz},
   Table[t[i], {i, 1, Length[nums]}]];
eqs = Flatten@Table[{x + vx t[i] == nums[[i, 1]] + nums[[i, 4]] t[i],
     y + vy t[i] == nums[[i, 2]] + nums[[i, 5]] t[i],
     z + vz t[i] == nums[[i, 3]] + nums[[i, 6]] t[i]}, {i, 1,
     Length[nums]}];
num=x + y + z /. First[Solve[eqs[[1 ;; 9]], vars[[1 ;; 9]]]];
Export["out2.txt", ToString[num]];
