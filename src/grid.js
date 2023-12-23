const { JSDOM } = require("jsdom")
const { window } = new JSDOM( "" )
const $ = require( "jquery" )( window )

/**
 * class grid
 * grid.cases
 * grid.max
 * grid.min
 * grid.randomX
 * grid.randomy
 * grid.randomCoord
 *
 */

class grid_idem {
	constructor(data) {
		;[this.name, this.x, this.y] = data
	}
	around() {
		let res = []
		for (let i of this.name) 
			if (grid[this[i]]) res.push(grid[this[i]])
		return res
	}
	//update(new_name)
	get coord() { return `x${this.x}y${this.y}`	}
	get n() {	return `x${this.x}y${this.y - 1}`	}
	get s() {	return `x${this.x}y${this.y + 1}`	}
	get e() {	return `x${this.x + 1}y${this.y}`	}
	get w() {	return `x${this.x - 1}y${this.y}`	}
}

const
	grid_generator = (nb_lignes, nb_colones) => {
		
		const grid = {}

		for (let ligne = 0; ligne < nb_lignes; ligne++) {
			const html_row = document.createElement("div")
			html_row.classList = "row"
			for (let colone = 0; colone < nb_colones; colone++) {
				const grid_case = new grid_idem(["O", colone, ligne])
				const html_case = document.createElement("div")

				html_case.classList = `O`
				html_case.id = grid_case.coord
				html_row.appendChild(html_case)

				grid[grid_case.coord] = grid_case
			}

			$(".grid").append(html_row)
		}
		return grid
	}

export default {
	$,
	grid_generator
}
