document.addEventListener('DOMContentLoaded', function() {
    // 1. Sélectionner le formulaire d'achat
    const purchaseForm = document.querySelector('.purchase-form');

    // Vérifier si le formulaire existe sur la page (pour éviter les erreurs sur d'autres pages)
    if (purchaseForm) {
        // 2. Écouter l'événement de soumission du formulaire
        purchaseForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Empêcher la soumission classique du formulaire (rechargement de page)

            // 3. Récupérer les valeurs des champs
            const numero = document.getElementById('numero').value;
            const operateur = document.getElementById('operateur').value;
            const montant = document.getElementById('montant').value;
            
            // 4. Validation (Simplifiée)
            if (numero.length < 9 || isNaN(numero)) {
                alert("Veuillez entrer un numéro de téléphone valide.");
                return;
            }

            // --- SIMULATION DU PROCESSUS DE PAIEMENT ---

            // 5. Afficher une alerte ou un message de chargement
            alert(`
                Traitement de l'achat en cours...
                Numéro: ${numero}
                Opérateur: ${operateur.toUpperCase()}
                Montant: ${montant} FCFA
            `);

            // 6. Simuler la redirection vers une passerelle de paiement
            
            // ⚠ NOTE TRÈS IMPORTANTE :
            // Dans un VRAI site, cette étape dirigerait l'utilisateur vers une API de paiement (comme Mobile Money, Stripe, PayPal).
            // Voici la redirection simulée:
            
            setTimeout(() => {
                const message = `
                    ✅ SUCCÈS : 
                    Votre achat de ${montant} FCFA de crédit chez ${operateur.toUpperCase()} a été effectué !
                    Vous allez recevoir une confirmation par SMS au ${numero}.
                    
                    (Ceci est une simulation frontend)
                `;
                
                // Afficher le message de succès et réinitialiser le formulaire
                alert(message);
                purchaseForm.reset();
            }, 2000); // Délai de 2 secondes pour simuler le temps de traitement
        });
    }

    // --- Amélioration de l'UX : Changement de l'image de logo au choix de l'opérateur ---
    const operateurSelect = document.getElementById('operateur');
    const logoContainer = document.querySelector('.logo-container');
    
    if (operateurSelect && logoContainer) {
        operateurSelect.addEventListener('change', function() {
            const selectedOperator = this.value; // 'orange' ou 'mtn'
            
            // Masquer tous les logos
            logoContainer.querySelectorAll('.logo').forEach(logo => {
                logo.style.display = 'none';
            });
            
            // Afficher uniquement le logo sélectionné
            const selectedLogo = logoContainer.querySelector(img[alt*="${selectedOperator}"]);
            if (selectedLogo) {
                selectedLogo.style.display = 'block';
            }
        });
        
        // Initialiser l'affichage au chargement de la page (montre le premier par défaut)
        operateurSelect.dispatchEvent(new Event('change'));
    }
});