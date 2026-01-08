// MenuToggle
const toggleBtn = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        const overlay = document.querySelector('.overlay');

        toggleBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        overlay.addEventListener('click', () => {
            nav.classList.remove('active');
            overlay.classList.remove('active');
        });

// Smooth Scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//Chatbot
        function toggleChat() {
            const chat = document.getElementById("chatbotWindow");
            chat.style.display = (chat.style.display === "flex") ? "none" : "flex";
        }

        let freeMessages = 5;

        async function sendMessage() {
            const input = document.getElementById("userInput");
            const messages = document.getElementById("chatMessages");
            if (input.value.trim() === "") return;

            if (freeMessages <= 0) {
                const premiumMsg = document.createElement("div");
                premiumMsg.className = "message bot";
                premiumMsg.innerText = "Vous avez utlisé vos messages gratuits. Veuillez passer à la version Premium pour continuer.";
                messages.appendChild(premiumMsg);
                input.value = "";
                messages.scrollTop = messages.scrollHeight;
                return;
            }

            const userMsg = document.createElement("div");
            userMsg.classList = "message user";
            userMsg.innerText = input.value;
            messages.appendChild(userMsg);

            freeMessages--;

            const response = await fetch("/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input.value })
            });

            const data = await response.json();

            const botMsg = document.createElement("div");
            botMsg.className = "message bot";
            botMsg.innerText = data.reply;
            messages.appendChild(botMsg);

            input.value = "";
            messages.scrollTop = messages.scrollHeight;
        }
        document.getElementById("userInput").addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                sendMessage();
            }
        });

//formulaire
        function openModal() {
            document.getElementById("helpModal").style.display = "flex";
        }
        function closeModal() {
            document.getElementById("helpModal").style.display = "none";
        }


