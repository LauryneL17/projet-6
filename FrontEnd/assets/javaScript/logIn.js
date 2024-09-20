const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");
const valid = document.getElementById("login-form-submit");
const form = document.getElementById("login-form");

// Écouteur d'événement pour le formulaire de connexion
form.addEventListener("submit", function (e) {
  // Empêche l'envoi par défaut du formulaire par le navigateur, l'envoi est géré par notre code JavaScript
  e.preventDefault();

  // Récupère les entrées de formulaire

  const payload = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  console.log(payload);

  // Fait une demande POST au serveur pour vérifier les informations de connexion
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // Si le retour du serveur contient un identifiant d'utilisateur valide, entre dans la page modale
      if (data.userId == 1) {
        // Stocke le jeton dans le localStorage
        localStorage.setItem("token", data.token);
        // Redirection vers la page modale
        location.href = "../../index.html";
      } else {
        // Affiche une erreur si les informations de connexion sont incorrectes
        error.innerText = " Erreur dans l’identifiant ou le mot de passe";
        // Efface le message d'erreur après un certain temps
        function msgdelete() {
          error.innerText = "";
        }
        setTimeout(msgdelete, 50000); //Enlève message d'erreur après 50000 milisecondes
      }
    })
    .catch((err) => console.log(err)); // Affiche l'erreur dans la console en cas d'erreur de demande
});
