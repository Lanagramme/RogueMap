const pieces = [
	/*0 */ { name: "nsew" },
	/*1 */ { name: "nse" },
	/*2 */ { name: "nsw" },
	/*3 */ { name: "new" },
	/*4 */ { name: "sew" },
	/*5 */ { name: "nw" },
	/*6 */ { name: "ne" },
	/*7 */ { name: "se" },
	/*8 */ { name: "sw" },
	/*9 */ { name: "ns" },
	/*10 */ { name: "ew" },
	/*11 */ { name: "n" },
	/*12 */ { name: "s" },
	/*13 */ { name: "e" },
	/*14 */ { name: "w" },
	/*15 */ { name: "O" },
	/*16 */ { name: "snew" },
],
grid = {},
cl = console.log,
oppose = { n: "s", s: "n", e: "w", w: "e" },
sorties = origine => {
	return pieces.filter(piece => piece.name.includes(oppose[origine]))
},
updateCase = (cooronnees, piece) => {
	grid[cooronnees].name = piece.name
}

class grid_idem {
constructor(data) {
	;[this.name, this.x, this.y] = data
}
around() {
	let res = []
	for (let i of this.name) {
		res.push(grid[this[i]])
	}

	return res.filter(x => {
		return x !== undefined
	})
}
get coord() {
	return `x${this.x}y${this.y}`
}
get n() {
	return `x${this.x}y${this.y - 1}`
}
get s() {
	return `x${this.x}y${this.y + 1}`
}
get e() {
	return `x${this.x + 1}y${this.y}`
}
get w() {
	return `x${this.x - 1}y${this.y}`
}
}

// check for case exits
function creator(nb_lignes, nb_colones) {
for (i in grid) delete grid[i]
$(".grid").html("")
for (let ligne = 0; ligne < nb_lignes; ligne++) {
	const ligne_actuelle = document.createElement("div")
	ligne_actuelle.classList = "row"

	for (let colone = 0; colone < nb_colones; colone++) {
		const case_data = new grid_idem(["O", colone, ligne]),
			html_case = document.createElement("div")
		html_case.classList = `O`
		html_case.id = case_data.coord
		grid[case_data.coord] = case_data
		ligne_actuelle.appendChild(html_case)
	}
	$(".grid").append(ligne_actuelle)
}
let coord_case = randomStart(nb_colones, nb_lignes)
document.getElementById(coord_case).classList = "nsew"
updateCase(coord_case, pieces[0])
coord_case = randomStart(nb_colones, nb_lignes)
document.getElementById(coord_case).classList = "snew"
updateCase(coord_case, pieces[16])
return coord_case
}

function randomStart(nb_colones, nb_lignes) {
randomCoord = MAX => {
	start = Math.floor(Math.random() * MAX)
	if (start == 0) return start + 1
	if (start == MAX - 1) return start - 1
	return start
}
return `x${randomCoord(nb_colones)}y${randomCoord(nb_lignes)}`
}

function draw(case_id) {
cl("%c draw :: " + case_id, "color: orange; font-weight: 900  ")
const case_active = grid[case_id]

for (const direction of case_active.name.split("")) {
	if (!grid.hasOwnProperty(case_active[direction])) continue

	case_direction = grid[case_active[direction]]

	if (case_direction.name == "O") {
		const possibles = cases_possibles(case_direction.coord, direction),
			options = sorties(direction)
				.filter(x => {
					for (i of possibles.impossibles) {
						if (x.name.includes(i)) return
					}
					return x.name
				})
				.filter(x => {
					for (i of possibles.oblicagoires) {
						if (!x.name.includes(i)) return
					}
					return x.name
				})
		// cl(options)

		//selectionner la solution au hasard parmis les possibles restants
		solution = Math.floor(Math.random() * Math.floor(options.length))
		// cl(options[solution])
		updateCase(case_direction.coord, options[solution])
	}
}
updatePlateau()
}

function advance() {
do {
	updatables = []
	for (i in grid) {
		i = grid[i]
		i.name != "O" &&
			i.around().some(x => x.name == "O") &&
			updatables.push(`x${i.x}y${i.y}`)
	}
	// cl(updatables)
	for (j of updatables) draw(j, i.around())
	cl(updatables.length)
} while (updatables.length)
}

function cases_possibles(cible, origine) {
cible = grid[cible]
cl(`%c cases_possibles :: ${cible.coord}`, "color: orange; font-weight: 900")

const options = { impossibles: [], oblicagoires: [] }

for (i of ["n", "s", "e", "w"]) {
	if (grid.hasOwnProperty(cible[i])) {
		if (
			grid[cible[i]].name != "O" &&
			!grid[cible[i]].name.includes(oppose[i])
		)
			options.impossibles.push(i)
		else if (grid[cible[i]].name.includes(oppose[i]))
			options.oblicagoires.push(i)
	} else options.impossibles.push(i)
}
return options
}

function updatePlateau() {
for (i in grid) {
	i = grid[i]
	a = document.getElementById(i.coord)
	cl(i.coord)
	a.classList = i.name
}
}

function toadvance() {
cl("%c ======== ======== ========", "color: red; font-weight: 900  ")
advance()
}
