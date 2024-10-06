document.addEventListener('DOMContentLoaded', () => {
	const list = document.getElementById('liste_tache');
	const input = document.getElementById('tache');
	const dateInput = document.getElementById('dateTache');
	const ajouterTacheBtn = document.getElementById('ajouter-tache');

	// Fonction pour ajouter une tâche
	function ajouterNouvelleTache() {
		const taskText = input.value.trim();
		const taskDate  = dateInput.value;
		if (taskText !== "" && taskDate !== "") {
			const task = { text: taskText, date: taskDate, completed: false };
			const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
			tasks.push(task);
			localStorage.setItem('tasks', JSON.stringify(tasks));
			afficherTachesTriees(tasks, list);
			input.value = "";
			dateInput.value = ""; // Réinitialisation correcte de la valeur de dateInput
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
	afficherTachesTriees(tasks, list);
}

function afficherTachesTriees(tasks, list) {
	// Trier les tâches par date
	tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

	// Vider la liste avant d'ajouter les tâches triées
	list.innerHTML = '';

	// Ajouter les tâches triées à la liste
	tasks.forEach(task => {
		ajouterTache(task, list, tasks);
	});
}

function ajouterTache(task, list, tasks) {
	const li = document.createElement('li');
	li.textContent = `${task.text} - ${task.date}`;

	if (task.completed) {
		li.classList.add('completed');
	}

	const taskDate = new Date(task.date);
	const currentDate = new Date();

	// Comparaison des dates
	if (taskDate - currentDate < 3 * 24 * 60 * 60 * 1000) {
		li.style.backgroundColor = '#ffd1d1';
	}

	const modifier = document.createElement('button');
	modifier.style = 'background: black';
	modifier.textContent = 'Modifier';
	modifier.addEventListener('click', () => {
		const nouveauTexte = prompt("Modifier la tâche:", task.text);
		if (nouveauTexte !== null && nouveauTexte.trim() !== "") {
			task.text = nouveauTexte.trim();
			li.firstChild.textContent = `${task.text} - ${task.date}`;
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

	const btnTerminer = document.createElement('button');
	btnTerminer.id = 'btnTerminer';
	btnTerminer.style = 'background: #28a745';
	btnTerminer.textContent = 'Terminé';
	btnTerminer.addEventListener('click', () =>{
		task.completed = !task.completed
		if(task.completed)
		{
			li.classList.add('completed')
		}
		else{
			li.classList.remove('completed')
		}	
		localStorage.setItem('tasks',JSON.stringify(tasks));
	});

	li.appendChild(modifier);
	li.appendChild(btnDelete);
	li.appendChild(btnTerminer);
	list.appendChild(li);
}