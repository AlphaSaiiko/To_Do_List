document.addEventListener('DOMContentLoaded', () => {
	const list = document.getElementById('liste_tache');
	const input = document.getElementById('tache');
	const ajouterTacheBtn = document.getElementById('ajouter-tache');
	const dateTache = document.getElementById

	// Fonction pour ajouter une tâche
	function ajouterNouvelleTache() {
		const taskText = input.value.trim();
		if (taskText !== "") {
			const task = { text: taskText, completed: false };
			const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
			tasks.push(task);
			localStorage.setItem('tasks', JSON.stringify(tasks));
			ajouterTache(task, list, tasks);
			input.value = "";
		}
	}

	// Événement pour le bouton "Ajouter"
	ajouterTacheBtn.addEventListener('click', ajouterNouvelleTache);

	// Événement pour la touche "Entrée"
	input.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			ajouterNouvelleTache();
		}
	});

	chargerTache(list);
});

function chargerTache(list) {
	const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

	tasks.forEach(task => {
		ajouterTache(task, list, tasks);
	});
}

function ajouterTache(task, list, tasks) {
	const li = document.createElement('li');
	li.textContent = task.text;

	if (task.completed) {
		li.classList.add('completed');
	}

	const modifier = document.createElement('button');
	modifier.style = 'background: black';
	modifier.textContent = 'Modifier';
	modifier.addEventListener('click', () => {
		const nouveauTexte = prompt("Modifier la tâche:", task.text);
		if (nouveauTexte !== null && nouveauTexte.trim() !== "") {
			task.text = nouveauTexte.trim();
			li.firstChild.textContent = task.text;
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
	});

	const btnDelete = document.createElement('button');
	btnDelete.id = 'btnDelete'; // Ajout de l'ID
	btnDelete.style = 'background: #900;';
	btnDelete.textContent = "Supprimer";
	btnDelete.addEventListener('click', () => {
		list.removeChild(li);
		const index = tasks.indexOf(task);
		if (index > -1) {
			tasks.splice(index, 1);
		}
		localStorage.setItem('tasks', JSON.stringify(tasks));
	});

	li.appendChild(modifier);
	li.appendChild(btnDelete);
	list.appendChild(li);
}