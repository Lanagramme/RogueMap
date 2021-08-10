
//tableaux des cases pouvant servir de sortie au point cardinal
S=[ 0, 1, 2, 3, 5, 6, 9, 11 ]
N=[ 0, 1, 2, 4, 7, 8, 9, 12 ]
W=[ 0, 1, 3, 4, 5, 7, 10, 13 ]
E=[ 0, 2, 3, 4, 6, 8, 10, 14 ]

cl = console.log

pieces = [
/*0 */	{	name : 'nsew', exits : ['N','S','E','W']	}, 
/*1 */	{	name : 'nse', exits : ['N','S','E']	}, 
/*2 */	{	name : 'nsw', exits : ['N','S','W']	},
/*3 */	{	name : 'new', exits : ['N','E','W']	},
/*4 */	{	name : 'sew', exits : ['S','E','W']	},
/*5 */	{	name : 'nw', exits : ['N','W']	},
/*6 */	{	name : 'ne', exits : ['N','E']	},
/*7 */	{	name : 'se', exits : ['S','E']	},
/*8 */	{	name : 'sw', exits : ['S','W']	},
/*9 */	{	name : 'ns', exits : ['N','S']	},
/*10 */	{	name : 'ew', exits : ['E','W']	},
/*11 */	{	name : 'n', exits : ['N']	},
/*12 */	{	name : 's', exits : ['S']	},
/*13 */	{	name : 'e', exits : ['E']	},
/*14 */	{	name : 'w', exits : ['W']	},
/*15 */	{	name : 'O', exits : []	}
]

var grid = {}

// check for case exits

function creator(a,b){
	plateau = document.getElementsByClassName('grid')[0]
	plateau.innerHTML = ""
	for (var i = 0; i < a; i++) {
		row = document.createElement('div')
		row.classList = 'row'
		for (var j = 0; j < b; j++) {
			caseData = { x:j, y:i , name:pieces[15].name, exits:pieces[15].exits }
			Case = document.createElement('div')
			Case.classList = `O`
			Case.id = `x${caseData.x}y${caseData.y}`
			grid[`x${caseData.x}y${caseData.y}`] = caseData
			row.appendChild(Case)
		}
		plateau.appendChild(row)
	}
	coor = `x${randomStart(b)}y${randomStart(a)}`
	document.getElementById(coor).classList='nsew'
	updateCase(coor, 0)
	return coor
}

function randomStart(a){ 
	start = Math.floor(Math.random() * a)
	if (start == 0) return start+1
	if (start ==a-1) return start -1
	return start
}

function updateCase(coor,j=15){
	cl(j)
	grid[coor].name=pieces[j].name
	grid[coor].exits=pieces[j].exits
}

function draw(foo){ //draw all exits of case foo
	cl('%c draw :: ' + foo,'color: orange; font-weight: 900  ')
	// cl(foo)
	// debugger
	for (i of grid[foo].exits) {
		switch (i){
			case 'N':
				cl('%c N','color: red; font-weight: 900  ')
				coor = `x${grid[foo].x}y${grid[foo].y-1}`
				// si case visée est vide, verivier les réponses possibles parmis celles de la direction
				if(grid[coor] != undefined && grid[coor].name == 'O'){
					// cl('n')
					possibles = caseEdit(coor,N)
					//selectionner la solution au hasard parmis les possibles restants
					solution = Math.floor(Math.random() * Math.floor(possibles.length))
					// cl(possibles)
					updateCase(coor, possibles[solution])
				}
				break
			case 'S':
				cl('%c S','color: red; font-weight: 900  ')
				// cl('s')
				coor = `x${grid[foo].x}y${grid[foo].y+1}`
				if(grid[coor] != undefined && grid[coor].name == 'O'){
					possibles = caseEdit(coor,S)
					solution = Math.floor(Math.random() * Math.floor(possibles.length))
					updateCase(coor, possibles[solution])
					// cl(possibles)
					// cl(possibles[solution])
				}
				break
			case 'E':
				cl('%c E','color: red; font-weight: 900  ')
				// cl('e')
				coor = `x${grid[foo].x+1}y${grid[foo].y}`
				if(grid[coor] != undefined && grid[coor].name == 'O'){
					possibles = caseEdit(coor,E)
					solution = Math.floor(Math.random() * Math.floor(possibles.length))
					updateCase(coor, possibles[solution])
				}
				break
			case 'W':
				cl('%c W','color: red; font-weight: 900  ')
				// cl('w')
				coor = `x${grid[foo].x-1}y${grid[foo].y}`
				if(grid[coor] != undefined && grid[coor].name == 'O'){
					possibles = caseEdit(coor,W)
					solution = Math.floor(Math.random() * Math.floor(possibles.length))
					updateCase(coor, possibles[solution])
				}
				break
		}
	}
	updatePlateau()
}

//pout chaque sortie de le case en cours

function advance(){
	updatables = []
	for (i in grid){
		i = grid[i]
		if (i.name != "O") updatables.push(`x${i.x}y${i.y}`)
	}
	// cl(updatables)
	for (j in updatables) {
		draw(updatables[j])
	}
}


function caseEdit(cible,rep){
	cl(`%c CaseEdit :: x${grid[cible].x}y${grid[cible].y}`,'color: orange; font-weight: 900  ')
	Nord = grid[`x${grid[cible].x}y${grid[cible].y-1}`]
	Sud  = grid[`x${grid[cible].x}y${grid[cible].y+1}`]
	Est  = grid[`x${grid[cible].x+1}y${grid[cible].y}`]
	West = grid[`x${grid[cible].x-1}y${grid[cible].y}`]
	// valides=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
	sorties=[]
	solutions=[]
	
	valides = []
	for (i of rep) valides[i] = rep[i]

	// if((Nord == undefined) || (Nord.name != 'O' && !Nord.name.includes('s')))
	// 	// for (i of S) {if (valides.includes(i)) valides.splice(valides.indexOf(i), 1)}
	// 	{ for (i of valides) if (pieces[i].name.includes('n')) valides.splice(valides.indexOf(i), 1) }
	// else {
	// 	if (Nord.name != 'O' && Nord.name.includes('s')) /*sorties.push('n')*/
	// 		{for (i of valides)	if (!pieces[i].name.includes('n')) valides.splice(valides.indexOf(i), 1)}
	// }
	// if((Sud == undefined) || (Sud.name != 'O' && !Sud.name.includes('n')))
	// 	// for (i of N) {if (valides.includes(i)) valides.splice(valides.indexOf(i), 1)}
	// 	{for (i of valides) if (pieces[i].name.includes('s')) valides.splice(valides.indexOf(i), 1)}
	// else if (Sud.name != 'O' && Sud.name.includes('n')) /*sorties.push('s')*/ 
	// 	{for (i of valides) if (!pieces[i].name.includes('s')) valides.splice(valides.indexOf(i), 1)}

	// if((Est == undefined) ||  (Est.name != 'O' && !Est.name.includes('w')))
	// 	// for (i of W) {if (valides.includes(i)) valides.splice(valides.indexOf(i), 1)}
	// 	{for (i of valides) if (pieces[i].name.includes('e')) valides.splice(valides.indexOf(i), 1)}
	// else if (Est.name != 'O' && Est.name.includes('w')) /*sorties.push('e')*/ 
	// 	{for (i of valides) if (!pieces[i].name.includes('e')) valides.splice(valides.indexOf(i), 1)}

	// if((West == undefined) || (West.name != 'O' && !West.name.includes('e')))
	// 	// for (i of E) {if (valides.includes(i)) valides.splice(valides.indexOf(i), 1)} 
	// 	{for (i of valides) if (pieces[i].name.includes('w')) valides.splice(valides.indexOf(i), 1)}
	// else if (West.name != 'O' && West.name.includes('e')) /*sorties.push('w')*/ 
	// 	{for (i of valides) if (!pieces[i].name.includes('w')) valides.splice(valides.indexOf(i), 1)}

		// if((Nord == undefined) || (Nord.name != 'O' && !Nord.name.includes('s')))
		// 	{for (i of valides) if (pieces[i].name.includes('n')) valides.splice(valides.indexOf(i), 1)}
		// else if (Nord.name != 'O' && Nord.name.includes('s'))
		// 	{for (i of valides)	if (!pieces[i].name.includes('n')) valides.splice(valides.indexOf(i), 1)}

		// function checks(Card, C, nC, valides){
		// 	if((Card == undefined) || (Card.name != 'O' && !Card.name.includes('nC')))
		// 		{for (i of valides) if (pieces[i].name.includes('C')) valides.splice(valides.indexOf(i), 1)}
		// 	else if (Card.name != 'O' && Card.name.includes('nC'))
		// 		{for (i of valides)	if (!pieces[i].name.includes('C')) valides.splice(valides.indexOf(i), 1)}

		// 	return valides
		// }
		function checks(Card, C, nC, valides){
			if((Card == undefined) || (Card.name != 'O' && !Card.name.includes(nC)))
				{
					for (var i = valides.length - 1; i >= 0; i--)
					{
						if (valides[i] == 'k ') continue
						cl(i)
						if (pieces[i].name.includes(C)) valides.splice(valides.indexOf(i), 1)
					}
				}
			else if (Card.name != 'O' && Card.name.includes(nC))
				{
					for (var i = valides.length - 1; i >= 0; i--)
					{
						if (valides[i] == 'k ') continue
						if (!pieces[i].name.includes(C)) valides.splice(valides.indexOf(i), 1)

					}
						
				}

			return valides
		}

		valides = checks(Nord,'n', 's', valides)
		valides = checks(Sud,'s', 'n', valides)
		valides = checks(Est,'e', 'w', valides)
		valides = checks(West,'w', 'e', valides)

	// for (x of valides) solutions.push(x)
	

	
	// for (j of sorties) {
	// 	for (let k = valides.length-1; k >-1; k--) {
	// 		const element = valides[k];
	// 		a = pieces[element].name
	// 		if (!a.includes(j)) {
	// 			cl(valides)
	// 			cl(element)
	// 			valides.splice(valides.indexOf(element),1)
	// 			cl(valides)
	// 			cl('--------------------')
	// 		}
	// 	}
	// }

	// // Nvalides = JSON.stringify(valides)
	// // Nsolutions = JSON.stringify(solutions)
	// // cl({Nvalides, Nsolutions})
	cl(valides);
	return valides
}




function updatePlateau(){
	for (i in grid){
		i = grid[i]
		a=document.getElementById(`x${i.x}y${i.y}`)
		a.classList = i.name
	}
}



function toadvance(){
	cl('%c ======== ======== ========','color: red; font-weight: 900  ')
	advance()
}

// draw(creator(6,9))

