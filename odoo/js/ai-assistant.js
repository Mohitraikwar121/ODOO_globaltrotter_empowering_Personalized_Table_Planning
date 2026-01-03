
// Gemini Voice Assistant Integration
// This module handles speech recognition, simulated "Gemini" processing, and text-to-speech.

class GeminiVoiceAssistant {
    constructor() {
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.isSpeaking = false;
        this.avatarElement = null;
        this.tooltipElement = null;
        this.toastTimeout = null;

        // Configuration
        this.voiceName = 'Google US English';

        this.setupRecognition();
        this.injectToastStyles();
    }

    injectToastStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .gemini-toast {
                position: fixed;
                bottom: 100px;
                right: 2rem;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 99px;
                font-size: 0.9rem;
                z-index: 9999;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s ease;
                pointer-events: none;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
            .gemini-toast.show {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    showToast(message) {
        let toast = document.querySelector('.gemini-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'gemini-toast';
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.add('show');

        // Hide after 3 seconds
        if (this.toastTimeout) clearTimeout(this.toastTimeout);
        this.toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    setupRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                this.isListening = true;
                this.updateUI();
                const msg = "I'm listening...";
                if (this.tooltipElement) this.tooltipElement.textContent = msg;
                this.showToast("🎤 " + msg);
                console.log('Gemini Ears Open 👂');
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.updateUI();
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                console.log('User said:', transcript);
                this.showToast("🗣️ You: " + transcript);
                this.processQuery(transcript);
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                let msg = "Oops, didn't catch that.";
                if (event.error === 'not-allowed') {
                    msg = "Microphone access blocked. Check permissions.";
                } else if (event.error === 'no-speech') {
                    msg = "No speech detected.";
                } else if (event.error === 'network') {
                    msg = "Network error. Check connection.";
                }

                if (this.tooltipElement) this.tooltipElement.textContent = msg;
                this.showToast("⚠️ " + msg);
                this.isListening = false;
                this.updateUI();
            };
        } else {
            console.warn('Speech Recognition API not supported in this browser.');
            this.showToast("❌ Voice not supported in this browser");
        }
    }

    attachToAvatar(avatarSelector) {
        // Cleanup old listener if exists (element replacement handles most, but good practice)
        this.avatarElement = document.querySelector(avatarSelector);
        this.tooltipElement = document.querySelector(avatarSelector + ' .ai-assistant-tooltip');

        if (!this.avatarElement) {
            console.warn("Avatar element not found:", avatarSelector);
            return;
        }

        // Add ring unique
        if (!this.avatarElement.querySelector('.gemini-voice-ring')) {
            const statusRing = document.createElement('div');
            statusRing.className = 'gemini-voice-ring';
            this.avatarElement.appendChild(statusRing);
        }

        // Remove old listeners by cloning
        // Note: cloning removes event listeners, which is exactly what we want to avoid duplicates
        const newAvatar = this.avatarElement.cloneNode(true);
        this.avatarElement.parentNode.replaceChild(newAvatar, this.avatarElement);
        this.avatarElement = newAvatar;

        // Re-select tooltip inside new avatar
        this.tooltipElement = this.avatarElement.querySelector('.ai-assistant-tooltip');

        this.avatarElement.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Avatar clicked');

            if (this.isSpeaking) {
                this.synthesis.cancel();
                this.isSpeaking = false;
                this.updateUI();
                this.showToast("Stopped speaking.");
                return;
            }

            if (this.isListening) {
                this.recognition.stop();
                this.showToast("Stopped listening.");
            } else {
                this.startListening();
            }
        });

        console.log("Gemini Assistant attached to avatar ✅");
    }

    startListening() {
        if (!this.recognition) {
            alert("Sorry, voice control isn't supported in this browser. Try Chrome!");
            return;
        }

        // Stop any current speech
        this.synthesis.cancel();

        try {
            this.recognition.start();
        } catch (e) {
            console.error("Start error:", e);
            if (e.message && e.message.includes('already started')) {
                this.recognition.stop();
            }
        }
    }

    updateUI() {
        if (!this.avatarElement) return;

        if (this.isListening) {
            this.avatarElement.classList.add('listening');
            this.avatarElement.classList.remove('speaking');
        } else if (this.isSpeaking) {
            this.avatarElement.classList.add('speaking');
            this.avatarElement.classList.remove('listening');
        } else {
            this.avatarElement.classList.remove('listening', 'speaking');

            // Reset tooltip
            if (this.tooltipElement) {
                if (!this.isListening && !this.isSpeaking) {
                    this.tooltipElement.textContent = "Plan with Gemini! 🤖 (Click me)";
                }
            }
        }
    }

    async processQuery(text) {
        if (this.tooltipElement) this.tooltipElement.textContent = "Thinking...";
        this.showToast("🤖 Thinking...");

        const responseText = await this.mockGeminiBrain(text);

        if (this.tooltipElement) this.tooltipElement.textContent = responseText;
        this.speak(responseText);
    }

    async mockGeminiBrain(query) {
        await new Promise(resolve => setTimeout(resolve, 800));
        const q = query.toLowerCase();

        if (q.includes('hello') || q.includes('hi')) return "Hello! Where are we going today?";
        if (q.includes('bali')) return "Bali is beautiful! I recommend Ubud.";
        if (q.includes('paris')) return "Paris is magical. Visit the Eiffel Tower!";
        if (q.includes('create') || q.includes('trip')) {
            window.location.hash = '/create-trip';
            return "Opening the trip creator.";
        }
        if (q.includes('home') || q.includes('dashboard')) {
            window.location.hash = '/';
            return "Back to the dashboard.";
        }

        return "I can help you plan trips to Bali, Paris, or Iceland. Just ask!";
    }

    speak(text) {
        if (text !== '') {
            const utterThis = new SpeechSynthesisUtterance(text);
            utterThis.onend = () => {
                this.isSpeaking = false;
                this.updateUI();
            };
            utterThis.onerror = () => {
                this.isSpeaking = false;
                this.updateUI();
            };

            this.isSpeaking = true;
            this.updateUI();
            this.synthesis.speak(utterThis);
        }
    }
}

export const geminiAssistant = new GeminiVoiceAssistant();
