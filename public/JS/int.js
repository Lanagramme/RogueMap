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
	oppose = { n: "s", s: "n", e: "w", w: "e" },
	creator = () => {
		/*
		========== Création de la grille html et JS ==========

		fonction déclanchée au clic sur le boutton gengerate

		récupèrer les valeur height et width dans le dom
		vérifier que les valeurs recues sont bien des nombres > 2
		réinitialiser l'objet grid
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

		nb_colones = Math.trunc(nb_colones)
		nb_lignes = Math.trunc(nb_lignes)

		const randomStart = (nb_colones, nb_lignes) => {
			return `x${randomCoord(nb_colones)}y${randomCoord(nb_lignes)}`
		}

		for (i in grid) delete grid[i]
		$(".grid").html("")
		grid_generator(nb_colones, nb_lignes)
		updateCase(randomStart(nb_colones, nb_lignes), pieces[0])
		updateCase(randomStart(nb_colones, nb_lignes), pieces[1])
	},
	draw = case_id => {
		/*
			========== decide des valeurs des cases en périphérie de la case_active envoyée en parametre ==========

			fonction appelée par advance

			POUR chacune des sorties de la case_active
				si (case_direction) la case dans cette direction est vide
					récupérer (possibles) les valeurs_possibles() pour cette case
					récupérer (option) les pieces[] valides comme sortie() pour cette direction en partant de la case_active 
						retirer (impossible[]) les case ne faisant pas partie de la grille (grid{})
						retirer les pieces ne contenant pas la sortie vers la case_active (oblicagoires[])
					choisir une solution au hasard
					mettre à jour la case dans la grille (grid{})
			mettre à jour le plateau
		*/
		cl("%c draw :: " + case_id, " color: orange; font-weight: 900  ")
		const case_active = grid[case_id],
			valeurs_possibles = cible => {
				cible = grid[cible]
				cl(
					`%c cases_possibles :: ${cible.coord}`,
					" color: orange; font-weight: 900"
				)

				const options = { impossibles: [], oblicagoires: [] }

				for (i of ["n", "s", "e", "w"]) {
					if (grid.hasOwnProperty(cible[i])) {
						if (
							// case non vide n'ayant pas de sortie vers la cible
							grid[cible[i]].name != "O" &&
							!grid[cible[i]].name.includes(oppose[i])
						)
							options.impossibles.push(i)
						// case ayant une sortie vers la cile
						else if (grid[cible[i]].name.includes(oppose[i]))
							options.oblicagoires.push(i)
						// case ne faisant pas partie de la grille
					} else options.impossibles.push(i)
				}
				return options
			}
		for (const direction of case_active.name.split("")) {
			case_direction = grid[case_active[direction]]

			if (case_direction.name == "O") {
				const possibles = valeurs_possibles(case_direction.coord),
					options = sorties(direction)
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
				updateCase(case_direction.coord, options[solution])
			}
		}
	},
	advance = () => {
		do {
			updatables = []
			for (i in grid) {
				let Case = grid[i]
				if (Case.name != "O" && Case.around().some(x => x.name == "O"))
					updatables.push(Case.coord)
			}
			for (let Case of updatables) draw(Case)
		} while (updatables.length)
	},
	sorties = origine => {
		return pieces.filter(piece => piece.name.includes(oppose[origine]))
	},
	updateCase = (cooronnees, piece) => {
		grid[cooronnees].name = piece.name
		a = document.getElementById(cooronnees).classList = piece.name
	}
