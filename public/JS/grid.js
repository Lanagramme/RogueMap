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
	get coord() { return `x${this.x}y${this.y}`	}
	get n() {	return `x${this.x}y${this.y - 1}`	}
	get s() {	return `x${this.x}y${this.y + 1}`	}
	get e() {	return `x${this.x + 1}y${this.y}`	}
	get w() {	return `x${this.x - 1}y${this.y}`	}
}

const
	grid = {},
	grid_generator = (nb_lignes, nb_colones) => {
		
		if (isNaN(+nb_lignes) || isNaN(+nb_colones)) {
			alert("Seule des valeurs numériques sont acceptées")
			return
		}

		if (+nb_lignes < 3 || +nb_colones < 3) {
			alert("entrez des valeurs suppérieures à 2")
			return
		}

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
	},
	/*
		========== Renvoyer des coordonnées random dans la grille ==========
		fonctions déclanchées par creator
	*/
	randomCoord = MAX => {
		start = Math.floor(Math.random() * MAX)
		if (start == 0) return start + 1
		if (start == MAX - 1) return start - 1
		return start
	}
