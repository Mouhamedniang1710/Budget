
// Données locales
let depenses = JSON.parse(localStorage.getItem('depenses')) || [];
let revenus = JSON.parse(localStorage.getItem('revenus')) || [];

// Sauvegarder dans localStorage
function sauvegarder() {
  localStorage.setItem('depenses', JSON.stringify(depenses));
  localStorage.setItem('revenus', JSON.stringify(revenus));
}

// Mise à jour du tableau résumé
function mettreAJourResume() {
  const totalDep = depenses.reduce((sum, d) => sum + d.montant, 0);
  const totalRev = revenus.reduce((sum, r) => sum + r.montant, 0);

  document.getElementById('budgetGestion').textContent = totalRev.toFixed(2);
  document.getElementById('depensesGestion').textContent = totalDep.toFixed(2);
  document.getElementById('soldeGestion').textContent = (totalRev - totalDep).toFixed(2);
}

// Affichage des tableaux
function afficherTableaux() {
  const depBody = document.getElementById('depenseBody');
  const revBody = document.getElementById('revenuBody');
  depBody.innerHTML = '';
  revBody.innerHTML = '';

  depenses.forEach((dep, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${dep.titre}</td>
      <td>${dep.montant.toFixed(2)}</td>
      <td><button class="btn-delete" data-type="depense" data-index="${index}">Supprimer</button></td>
    `;
    depBody.appendChild(row);
  });

  revenus.forEach((rev, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${rev.titre}</td>
      <td>${rev.montant.toFixed(2)}</td>
      <td><button class="btn-delete" data-type="revenu" data-index="${index}">Supprimer</button></td>
    `;
    revBody.appendChild(row);
  });

  mettreAJourResume();
}

// Ajouter une dépense
document.getElementById('validerDepense').addEventListener('click', () => {
  const titre = document.getElementById('titreDepense').value.trim();
  const montant = parseFloat(document.getElementById('montantDepense').value);

  if (!titre || isNaN(montant)) return alert("Remplis tous les champs correctement");

  depenses.push({ titre, montant });
  sauvegarder();
  afficherTableaux();

  document.getElementById('titreDepense').value = '';
  document.getElementById('montantDepense').value = '';
  document.getElementById('modalDepense').style.display = 'none';
});

// Ajouter un revenu
document.getElementById('validerRevenu').addEventListener('click', () => {
  const titre = document.getElementById('titreRevenu').value.trim();
  const montant = parseFloat(document.getElementById('montantRevenu').value);

  if (!titre || isNaN(montant)) return alert("Remplis tous les champs correctement");

  revenus.push({ titre, montant });
  sauvegarder();
  afficherTableaux();

  document.getElementById('titreRevenu').value = '';
  document.getElementById('montantRevenu').value = '';
  document.getElementById('modalRevenu').style.display = 'none';
});

// Suppression
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn-delete')) {
    const type = e.target.dataset.type;
    const index = parseInt(e.target.dataset.index);

    if (type === 'depense') depenses.splice(index, 1);
    else if (type === 'revenu') revenus.splice(index, 1);

    sauvegarder();
    afficherTableaux();
  }
});

// Modales (déjà présent dans ton code probablement)
document.getElementById('addDepenseButton').addEventListener('click', () => {
  document.getElementById('modalDepense').style.display = 'flex';
});
document.getElementById('closeModalDepense').addEventListener('click', () => {
  document.getElementById('modalDepense').style.display = 'none';
});
document.getElementById('addRevenuButton').addEventListener('click', () => {
  document.getElementById('modalRevenu').style.display = 'flex';
});
document.getElementById('closeModalRevenu').addEventListener('click', () => {
  document.getElementById('modalRevenu').style.display = 'none';
});
window.addEventListener('click', function(e) {
  if (e.target.id === 'modalDepense') document.getElementById('modalDepense').style.display = 'none';
  if (e.target.id === 'modalRevenu') document.getElementById('modalRevenu').style.display = 'none';
});

// Initialisation
afficherTableaux();
