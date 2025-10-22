// Fonction pour faire défiler jusqu'à une section spécifique
function scrollToSection(sectionId) {
  
    
    document.querySelector(sectionId).scrollIntoView({
        behavior: 'smooth',
        
        
    block: 'start'
      });
    }
    // Variables globales
  let panier = [];
  let panierCount = document.getElementById('panierCount');
  let panierModal = document.getElementById('panierModal');
  let panierList = document.getElementById('panierList');
  let totalPrice = document.getElementById('totalPrice');
  
  // Ajouter un produit au panier
  function ajouterAuPanier(id, name, price) {
      panier.push({ id, name, price });
      mettreAJourPanier();
  }
  
  // Mettre à jour l'affichage du panier
  function mettreAJourPanier() {
      // Compter les articles dans le panier
      panierCount.textContent = panier.length;
  
      // Mettre à jour le total
      let total = panier.reduce((acc, item) => acc + item.price, 0);
      totalPrice.textContent = `${total}f`;
  
      // Afficher les produits dans le panier
      panierList.innerHTML = '';
      panier.forEach(item => {
          let li = document.createElement('li');
          li.textContent = `${item.name} - ${item.price}f`;
          panierList.appendChild(li);
      });
  }
  
  // Ouvrir le panier
  document.getElementById('panierBtn').addEventListener('click', () => {
      panierModal.style.display = 'flex';
  });
  
  // Fermer le panier
  document.getElementById('fermerPanier').addEventListener('click', () => {
      panierModal.style.display = 'none';
  });
  
  document.getElementById('EnvoyerPanier').addEventListener('click', () => {
      panierModal.style.display = 'none';
  });
  
  // Ajouter des produits au panier
  document.querySelectorAll('.ajouter-panier').forEach(button => {
      button.addEventListener('click', () => {
          const id = button.getAttribute('data-id');
          const name = button.getAttribute('data-name');
          const price = parseFloat(button.getAttribute('data-price'));
          ajouterAuPanier(id, name, price);
      });
  });

  //js pour les contact


document.addEventListener('DOMContentLoaded', () => {
    const formContact = document.getElementById('form-contact');
    const confirmationMessage = document.getElementById('confirmation');

    // Animation du formulaire (affichage avec fade-in)
    formContact.style.animation = 'fadeIn 1s forwards';

    formContact.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche la soumission réelle du formulaire

        // Simulation de la soumission
        setTimeout(() => {
            // Afficher le message de confirmation
            confirmationMessage.style.display = 'block';

            // Réinitialiser le formulaire après quelques secondes
            formContact.reset();

            // Cache le message de confirmation après 5 secondes
            setTimeout(() => {
                confirmationMessage.style.display = 'none';
            }, 5000);
        }, 500);
    });
});



    // Ajouter un marqueur
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: "Notre emplacement"
    });




// Fonction pour afficher les produits

function fetchProducts() {
    fetch('http://localhost/mon-site-vente/api/products.php')  // L'URL vers votre backend
      .then(response => response.json())
      .then(products => {
        const productList = document.getElementById('product-list');  // Votre div ou ul pour afficher les produits
        productList.innerHTML = '';  // Réinitialiser la liste avant d'ajouter les nouveaux produits
        
        products.forEach(product => {
          const productElement = document.createElement('div');
          productElement.classList.add('product-item');
          
          productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span>€${product.price}</span>
            <button class="add-to-cart" data-id="${product.id}">Ajouter au panier</button>
          `;
          
          productList.appendChild(productElement);
        });
      })
      .catch(error => console.log('Erreur lors de la récupération des produits:', error));
  }
  
  // Appeler la fonction pour afficher les produits dès le chargement de la page
  document.addEventListener('DOMContentLoaded', fetchProducts);
  
