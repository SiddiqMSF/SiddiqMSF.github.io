import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { Client } from 'https://cdn.jsdelivr.net/npm/@gradio/client/+esm';

// Initialize the Gradio client
const client = await Client.connect("Qwen/Qwen2.5-72B-Instruct");

class ChatService {
    async sendMessage(userMessage, conversationHistory, systemMessage) {
        console.log("Sending message to Gradio API:", userMessage, conversationHistory, systemMessage);
        
        const startTime = performance.now(); // Start timing

        const result = await client.predict("/model_chat_1", {
            query: userMessage,
            history: conversationHistory,
            system: systemMessage,
        });

        const endTime = performance.now(); // End timing
        const responseTime = endTime - startTime; // Calculate response time

        if (result.error) {
            throw new Error(result.error);
        }

        // Log the full response from the Gradio API and the response time
        console.log("Gradio API response:", result);
        console.log(`Response time: ${responseTime.toFixed(2)} ms`);

        // Extract the assistant's message from the response
        const assistantMessage = result.data[1].slice(-1)[0][1]; // Extract the last assistant message
        console.log("Extracted assistant message:", assistantMessage);
        return marked(assistantMessage); // Convert Markdown to HTML
    }
}

class ChatUI {
    history = [];
    systemMessage = "You are a kind teacher"; // Default system message

    constructor(inputFieldId, chatLogId, chatService) {
        this.inputField = document.getElementById(inputFieldId);
        this.chatLog = document.getElementById(chatLogId);
        this.chatService = chatService;
        this.inputField.focus();

        // Add event listeners for radio buttons
        document.querySelectorAll('input[name="role"]').forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateSystemMessage(radio.value);
            });
        });
    }

    formatMessage(sender, message) {
        const senderIcon = sender === 'user' ? 'account_circle' : 'brightness_4';
        return `
        <div class="chat ${sender}">
          <span class="material-symbols-rounded profile"> ${senderIcon} </span>
          <div class="chatText">${message}</div>
        </div>`;
    }

    appendMessage(sender, message) {
        const formattedMessage = this.formatMessage(sender, message);
        this.chatLog.insertAdjacentHTML('beforeend', formattedMessage);
        this.chatLog.scrollTop = this.chatLog.scrollHeight;
    }

    addLoader() {
        this.chatLog.insertAdjacentHTML('beforeend', '<div class="loader"></div>');
    }

    removeLoader() {
        const loader = this.chatLog.lastChild;
        this.chatLog.removeChild(loader);
    }

    updateSystemMessage(value) {
        switch (value) {
            case 'js':
                this.systemMessage = "You are a professional modern javascript expert. you always use the newest javascript features.";
                break;
            case 'web':
                this.systemMessage = "You are a professional modern web developer expert. you always use the newest web features and tools.";
                break;
                case 'py':
                this.systemMessage = "You are a professional modern python developer. you always use the newest python features.";
                break;
            case 'normal':
                this.systemMessage = "You are a kind teacher";
                break;
            default:
                this.systemMessage = "You are a professional modern javascript expert. you always use the newest javascript features.";
        }
        console.log("Updated system message:", this.systemMessage);
    }

    async sendMessage() {
        const message = this.inputField.value;
        this.appendMessage('user', message);
        this.inputField.value = '';
        this.history.push([message, ""]);
        this.addLoader();
    
        try {
            const assistantMessage = await this.chatService.sendMessage(message, this.history, this.systemMessage);
            this.history[this.history.length - 1][1] = assistantMessage;
            this.removeLoader();
            this.appendMessage('assistant', assistantMessage);
        } catch (error) {
            this.removeLoader();
            this.appendMessage('Error', error.message);
        }
    }
}

const chatService = new ChatService();
const chatUI = new ChatUI('userInput', 'chatLog', chatService);

// Event listeners for language switch and send button
const langSwitch = document.getElementById('langswitch');
const body = document.body;

langSwitch.addEventListener('change', () => {
  if (langSwitch.checked) {
    body.dir = 'rtl';
  } else {
    body.removeAttribute('dir');
  }
});

document.getElementById('send').addEventListener('click', () => chatUI.sendMessage());
document.addEventListener('keydown', event => event.key === 'Enter' && chatUI.sendMessage());