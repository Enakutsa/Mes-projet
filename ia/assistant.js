const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');

// Base de connaissances ESI Evaluation
const knowledgeBase = {
    'créer évaluation': {
        response: "Pour créer une nouvelle évaluation :\n\n1. 📝 Accédez à /evaluation\n2. 🎯 Sélectionnez un enseignant, une matière et une classe\n3. 📚 Remplissez les critères d’évaluation\n4. ⏰ Soumettez le formulaire\n\nBesoin d’aide sur une étape spécifique ?"
    },
    'résultats': {
        response: "Pour consulter vos résultats :\n\n📊 **Direction** : Accédez à /direction pour voir les rapports\n📈 **Admin** : Consultez /dashboard pour les statistiques\n🎯 Les étudiants n’ont pas accès direct aux résultats\n\nQuel type de résultat vous intéresse ?"
    },
    'profil': {
        response: "Gestion de votre profil :\n\n👤 **Inscription** : Modifiez nom/prenom via /register (non implémenté pour mise à jour)\n🔐 **Mot de passe** : Contactez l’admin pour réinitialisation\n📱 **Rôle** : Déterminé lors de l’inscription (Étudiant, Admin, Direction)\n\nQue souhaitez-vous modifier ?"
    },
    'technique': {
        response: "Support technique disponible :\n\n🔧 **Problèmes de connexion** : Vérifiez /login\n💾 **Sauvegarde des données** : Auto-sauvegarde dans la base MySQL\n📱 **Compatibilité** : Chrome, Firefox, Safari\n🔄 **Mise à jour** : Redémarrez le serveur\n📞 **Contact support** : support@esi-evaluation.com\n\nQuel problème rencontrez-vous ?"
    },
    'navigation': {
        response: "Guide de navigation :\n\n🏠 **Accueil** : /\n📝 **Évaluations** : /evaluation (Étudiant)\n📊 **Rapports** : /direction (Direction)\n👥 **Admin** : /dashboard\n⚙️ **Connexion** : /login\n\nOù voulez-vous aller ?"
    }
};

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${isUser ? 'U' : 'AI'}</div>
        <div class="message-content max-w-lg p-4 rounded-2xl ${isUser ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-800'} animate-[slideIn_0.3s_ease-out]">${content}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    typingIndicator.style.display = 'flex';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
    typingIndicator.style.display = 'none';
}

async function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Vérifier la base de connaissances locale
    for (const [key, value] of Object.entries(knowledgeBase)) {
        if (message.includes(key.toLowerCase())) {
            return value.response;
        }
    }

    // Réponses par mots-clés
    if (message.includes('bonjour') || message.includes('salut')) {
        return "Bonjour ! 👋 Comment puis-je vous aider avec ESI Évaluation aujourd’hui ?";
    }
    
    if (message.includes('merci')) {
        return "De rien ! 😊 N’hésitez pas si vous avez d’autres questions sur l’application.";
    }

    if (message.includes('aide') || message.includes('help')) {
        return "Je peux vous aider avec :\n• 📝 Création d’évaluations\n• 📊 Consultation des résultats\n• 👤 Gestion du profil\n• 🔧 Support technique\n• 🧭 Navigation dans l’app\n\nQue voulez-vous savoir ?";
    }

    if (message.includes('problème') || message.includes('bug') || message.includes('erreur')) {
        return "Je vais vous aider à résoudre ce problème ! 🔧\n\nPouvez-vous me décrire plus précisément :\n• Que faisiez-vous quand c’est arrivé ?\n• Quel message d’erreur avez-vous vu ?\n• Sur quel appareil êtes-vous ?\n\nCela m’aidera à mieux vous orienter.";
    }

    // Appel au backend pour des réponses dynamiques
    try {
        const response = await fetch('/api/assistant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const result = await response.json();
        return result.response || "Désolé, je n’ai pas compris. Essayez de reformuler ou tapez 'aide' pour voir mes fonctionnalités !";
    } catch (err) {
        return "Erreur de connexion au serveur. Veuillez réessayer plus tard.";
    }
}

async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    sendBtn.disabled = true;
    messageInput.disabled = true;

    addMessage(message, true);
    messageInput.value = '';

    showTyping();

    const response = await getAIResponse(message);
    hideTyping();
    addMessage(response);

    sendBtn.disabled = false;
    messageInput.disabled = false;
    messageInput.focus();
}

function sendQuickMessage(message) {
    messageInput.value = message;
    sendMessage();
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// Focus automatique
messageInput.focus();

// Animation des quick actions
setTimeout(() => {
    const quickActions = document.querySelector('.quick-actions');
    quickActions.style.opacity = '0';
    quickActions.style.transform = 'translateY(20px)';
    quickActions.style.transition = 'all 0.5s ease-out';
    
    setTimeout(() => {
        quickActions.style.opacity = '1';
        quickActions.style.transform = 'translateY(0)';
    }, 500);
}, 1000);