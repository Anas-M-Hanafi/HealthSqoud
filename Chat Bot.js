// Select DOM elements
const typing_form = document.querySelector(".typing-form");
const typingInput = document.querySelector(".typing-input");
const chat_list = document.querySelector(".chat_list");

let isTyping = false;

const showTypingEffect = (text, textElement, onComplete) => {
    textElement.innerText = ""; // Clear previous text
    const words = text.split(" ");
    let currentWordIndex = 0;

    isTyping = true;
    const typingInterval = setInterval(() => {
        textElement.innerText += (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex++];
        if (currentWordIndex === words.length) {
            clearInterval(typingInterval);
            isTyping = false;
            if (onComplete) {
                onComplete();
            }
        }
    }, 75);
};

const API_Key = "AIzaSyA8UV-R3l3WKsWTB56lfcE6sBXkv3L1zuQ"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_Key}`;

const generateAPIResponse = async (div, userMessage) => {
    const textElement = div.querySelector(".text");

    // **Check if the user message is "hi"**
    if (userMessage.toLowerCase() === "hi") {
        showTypingEffect("Welcome", textElement, () => {
            typingInput.disabled = false; // إعادة تمكين الإدخال بعد عرض "Welcome"
            const submitButton = typing_form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = false;
            }
            typingInput.focus();
        });
        div.classList.remove("loading");
        return; // Do not send the request to the API if the message is "hi"
    }

    // **Add instructions for the language model here**
    const context = `Answer questions related to hospitals, medications, and diseases in detail, providing comprehensive information. If the question is outside this scope, reply that you cannot answer.`;
    const prompt = `${context} User asks: ${userMessage}`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: prompt }] // Using the modified text including instructions
                }]
            })
        });

        const data = await response.json();
        console.log("API Response:", data);

        // Extract bot's reply and remove markdown bold formatting
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.replace(/\*\*(.*?)\*\*/g, '$1') || "Sorry, I didn't understand that.";

        // Show typing effect and re-enable input on completion
        showTypingEffect(text, textElement, () => {
            typingInput.disabled = false; // إعادة تمكين الإدخال بعد اكتمال عرض الإجابة
            const submitButton = typing_form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = false;
            }
            typingInput.focus();
        });

    } catch (error) {
        console.error("API Error:", error);
        textElement.textContent = "An error occurred while fetching the response. Please try again.";
    } finally {
        div.classList.remove("loading");
        // لا تقم بإعادة تمكين حقل الإدخال هنا مباشرةً، سيتم ذلك عند اكتمال تأثير الكتابة
    }
};

const copyMessage = (copy_Btn) => {
    const messageText = copy_Btn.parentElement.querySelector(".text").innerText;

    navigator.clipboard.writeText(messageText);
    // copy_Btn.innerText = "done";

    // setTimeout(() => copy_Btn.innerText = "content_copy", 1000);
};

const showLoading = (userMessage) => {
    // تعطيل حقل الإدخال وزر الإرسال في البداية
    typingInput.disabled = true;
    const submitButton = typing_form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
    }

    const html = `
        <div class="message_content">
            <img src="img/icon.png" alt="icon">
            <p class="text"></p>
            <div class="loading_indicator">
                <div class="loading_Bar"></div>
                <div class="loading_Bar"></div>
                <div class="loading_Bar"></div>
            </div>
        </div>
        <i onClick="copyMessage(this)" class="fa-solid fa-copy"></i>
    `;

    const div = document.createElement("div");
    div.classList.add("message", "incoming", "loading");
    div.innerHTML = html;
    chat_list.appendChild(div);

    // Call API to get a response
    generateAPIResponse(div, userMessage);
};

const handleOutgoingChat = () => {
    const userMessage = typingInput.value.trim();
    if (!userMessage) return; // Prevent sending empty messages

    // Create user message element
    const messageHTML = `
        <div class="message outgoing">
            <div class="message_content">
                <div class="user">
                    <img src="img/user.png" alt="User">
                </div>
                <p class="text">${userMessage}</p>
            </div>
        </div>
    `;

    const div = document.createElement("div");
    div.classList.add("message", "outgoing");
    div.innerHTML = messageHTML;
    chat_list.appendChild(div);

    typing_form.reset(); // Clear input after sending
    showLoading(userMessage); // Show loading animation immediately
};

// Listen for form submit event
typing_form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleOutgoingChat();
});