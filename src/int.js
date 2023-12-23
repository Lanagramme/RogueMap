import { $, grid_generator } from "grid.js"

var Grid = {}
const 
	pieces = [
		{ name: "nsew" },
		{ name: "snew" },
		{ name: "nse" },
		{ name: "nsw" },
		{ name: "new" },
		{ name: "sew" },
		{ name: "sw" },
		{ name: "ns" },
		{ name: "nw" },
		{ name: "ne" },
		{ name: "se" },
		{ name: "ew" },
		{ name: "n" },
		{ name: "s" },
		{ name: "e" },
		{ name: "w" },
		{ name: "O" },
	],
	cl = console.log,
	direction_oppose = { n: "s", s: "n", e: "w", w: "e" },
	/*
		========== Renvoyer des coordonnées random dans la grille ==========
		fonctions déclanchées par creator
	*/
	randomNum = MAX => {
		start = Math.floor(Math.random() * MAX)
		if (start == 0) return start + 1
		if (start == MAX - 1) return start - 1
		return start
	},
	init = () => {
		/*
		========== Création de la grille html et JS ==========

		fonction déclanchée au clic sur le boutton gengerate

		récupèrer les valeur height et width dans le dom
		vérifier que les valeurs recues sont bien des nombres > 2
		réinitialiser l'objet Grid
		créer une div.row pour chaque ligne
			ajouter une case.O pour chaque colone dans chaque ligne
			pour chaque case créer une instance de l'objet grid_item
		choisir deux cases random qui contiendront un carrefour
		mettre à jour le plateau
	*/

		let nb_colones = $("#width").val(),
			nb_lignes = $("#height").val()

		if (isNaN(+nb_lignes) || isNaN(+nb_colones)) {
			alert("Seule des valeurs numériques sont acceptées")
			return
		}
		if (+nb_lignes < 3 || +nb_colones < 3) {
			alert("entrez des valeurs suppérieures à 2")
			return
		}

		const randomCoord= (x,y) => `x${randomNum(Math.trunc(x))}y${randomNum(Math.trunc(y))}`

		const randomEmptyCase= ( x, y )  => {
			let coord = ""
			do {
				coord = randomCoord(x,y)
			} while(grid[coord].name != "O")
			return coord
		}

		$(".grid").html("")
		Grid = grid_generator(nb_colones, nb_lignes)
		updateCase(randomEmptyCase(nb_colones, nb_lignes), pieces[0])
		updateCase(randomEmptyCase(nb_colones, nb_lignes), pieces[1])
	},
	draw = case_id => {
		/*
			========== decide des valeurs des cases en périphérie de la case_active envoyée en parametre ==========

			fonction appelée par advance

			POUR chacune des sorties de la case_active
				si (case_sortie) la case dans cette direction est vide
					récupérer (possibles) les valeurs_possibles() pour cette case
					récupérer (option) les pieces[] valides comme sortie() pour cette direction en partant de la case_active 
						retirer (impossible[]) les case ne faisant pas partie de la grille (Grid{})
						retirer les pieces ne contenant pas la sortie vers la case_active (oblicagoires[])
					choisir une solution au hasard
					mettre à jour la case dans la grille (Grid{})
			mettre à jour le plateau
		*/
		cl("%c draw :: " + case_id, " color: orange; font-weight: 900  ")

		const case_active = Grid[case_id]
		
		function valeurs_possibles( cible ) {
				cible = Grid[cible]
				cl(
					`%c cases_possibles :: ${cible.coord}`,
					" color: orange; font-weight: 900"
				)

				const options = { impossibles: [], oblicagoires: [] }

				for (i of ["n", "s", "e", "w"]) {
					if (Grid.hasOwnProperty(cible[i])) {
						if (
							// case non vide n'ayant pas de sortie vers la cible
							Grid[cible[i]].name != "O" &&
							!Grid[cible[i]].name.includes(direction_oppose[i])
						)
							options.impossibles.push(i)
						// case ayant une sortie vers la cile
						else if (Grid[cible[i]].name.includes(direction_oppose[i]))
							options.oblicagoires.push(i)
						// case ne faisant pas partie de la grille
					} else options.impossibles.push(i)
				}
				return options
		}
		
		const sorties = case_active.name.split("")
		for (const sortie of sorties) {
			const case_sortie = Grid[case_active[sortie]]

			if (case_sortie.name == "O") {
				const possibles = valeurs_possibles(case_sortie.coord),
					options = entrees(sortie)
						.filter(x => {
							if (!possibles.impossibles.some(r => x.name.indexOf(r) >= 0))
								return x
						})
						.filter(x => {
							if (possibles.oblicagoires.every(r => x.name.indexOf(r) >= 0))
								return x
						})

				//selectionner la solution au hasard parmis les possibles restants
				solution = Math.floor(Math.random() * Math.floor(options.length))
				updateCase(case_sortie.coord, options[solution])
			}
		}
	},
	advance = () => {
		do {
			updatables = []
			// récupérer toutes les cases route ayant au moins une sortie non attribuée
			for (i in Grid) {
				let Case = Grid[i]
				if (Case.name != "O" && Case.around().some(x => x.name == "O"))
					updatables.push(Case.coord)
			}
			for (let Case of updatables) draw(Case)
		} while (updatables.length)
	},
	entrees = origine => {
		return pieces.filter(piece => piece.name.includes(direction_oppose[origine]))
	},
	updateCase = (cooronnees, piece) => {
		Grid[cooronnees].name = piece.name
		a = document.getElementById(cooronnees).classList = piece.name
	}
