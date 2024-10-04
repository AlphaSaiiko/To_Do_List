// création des constantes 
const input = document.getElementById('tache');
const addTachebtn = document.getElementById('ajouter-tache');
const list = document.getElementById('liste_tache');

//Ajouter une nouvelle tâche

function ajouterTache() 
{
	const textTache = input.value.trim();

	if (textTache !== "") {
		const li = document.createElement('li');
		li.textContent = textTache;

		// Créer le bouton pour supprimer
		const btnDelete = document.createElement('button');
		btnDelete.textContent = "Supprimer";
		btnDelete.addEventListener('click', () => {
			list_tache.removeChild(li);
			Sauvegarde();
		});

		li.addEventListener('click', () => {
			li.classList.toggle('completed');
			Sauvegarde();
		});

		li.appendChild(btnDelete);
		list.appendChild(li);
		input.value = "";
		Sauvegarde();
	}
}

// Ajouter la tâche quand on clique sur le bouton
addTachebtn.addEventListener('click', ajouterTache);

// Ajouter la tâche en appuyant sur Entrer
input.addEventListener('keypress', (e) => {
	if (e.key === "Enter") {
		ajouterTache();
	}
});

//Sauvegarder les tâches 
function saveTask()
{
	const taches = [];
	document.querySelectorAll('li').forEach(task => {
		taches.push ({
			text: task.firstChild.textContent,
			completed: task.classList.contains('completed')
		});
	});
	localStorage.setItem('task',JSON.stringify(taches));
}

//charger les taches
function chargerTache() {
	const Sauvegarde = JSON.stringify(localStorage.getItem('taches'));
	if(Sauvegarde)
	{
		Sauvegarde.forEach(taches => {
			const li = document.createElement('li');
			li.textContent = taches.text;

			if(task.completed)
			{
				li.classList.add('completed');
			}

			const btnDelete = document.createElement('button');
			btnDelete.textContent = "Supprimer";
			btnDelete.addEventListener('click', () => {
				list.removeChild(li);
				Sauvegarde();
			});

			li.addEventListener('click', () => {
				li.classList.toggle('completed')
				Sauvegarde();
			});

			li.appendChild(btnDelete);
			list.appendChild(li);
		});
	}
}

//Appel a chargerTache au démarrage 
chargerTache();
