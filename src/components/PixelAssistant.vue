<template>
  <div class="z-10 fixed bottom-5 right-5 font-vt323">
    <!-- Minimized button -->
    <button
      v-if="minimized"
      @click="toggleChat"
      class="bg-transparent p-3 rounded-full focus:outline-none transition-transform hover:scale-110"
    >
      <img
        src="/public/images/PixelAssistant.png"
        alt="Chat Icon"
        class="w-12 h-12"
      />
    </button>

    <!-- Chat input field -->
    <div
      v-else
      :class="[
        'p-4 rounded-lg shadow-lg space-bg border-2 border-cyan-400 transition-all duration-300 flex flex-col max-h-[80vh] overflow-y-auto max-w-[90vw] min-w-[280px]',
        expanded ? 'w-[28rem] h-[28rem]' : 'w-80 sm:w-72 md:w-80 lg:w-96'
      ]"
    >
      <div class="flex justify-between items-center pb-2">
        <h3 class="text-lg font-bold text-neon">Pixel Assistant</h3>
        <div class="flex gap-2">
          <!-- Expand button -->
          <button 
            @click="toggleSize" 
            class="relative w-8 h-8 flex items-center justify-center rounded-full border-2 border-cyan-400 text-cyan-400 shadow-md transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-cyan-500"
            
            >
            <svg v-if="!expanded" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
            </svg>

          </button>
          <!-- Close button -->
          <button 
            @click="toggleChat" 
            class="relative w-8 h-8 flex items-center justify-center rounded-full border-2 border-cyan-400 text-cyan-400 shadow-md transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-cyan-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Chat messages -->
      <div class="chat-box flex-grow overflow-y-auto p-2">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="msg.sender === 'bot' ? 'text-left' : 'text-right'"
        >
          <p
            :class="msg.sender === 'bot' ? 'bot-msg' : 'user-msg'"
            class="inline-block px-3 py-1 rounded-lg my-1"
          >
            {{ msg.text }}
          </p>
        </div>
        <!-- Loading-indicator -->
        <p v-if="loading" class="text-cyan-300 italic animate-pulse">Skriver...</p>
      </div>

      <!-- Input field and button -->
      <div class="mt-2 flex items-center">
        <input
          v-model="userInput"
          @keyup.enter="sendMessage"
          :disabled="loading"
          class="flex-grow p-2 rounded-l-lg bg-gray-800 neon-text disabled:opacity-50 min-w-0"
          placeholder="Fråga mig något..."
        />
        <button
          @click="sendMessage"
          :disabled="loading"
          class="bg-indigo-600 px-4 py-2 rounded-r-lg disabled:opacity-50"
        >
          Skicka
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import assistantPrompt from "../config/assistantPrompt";

const minimized = ref(true);
const expanded = ref(false);
const messages = ref([
  { text: "Hej! Vad vill du veta om Anton?", sender: "bot" },
]);
const userInput = ref("");
const loading = ref(false);

const toggleChat = () => {
  minimized.value = !minimized.value;
};


const toggleSize = () => {
  expanded.value = !expanded.value;
};

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  messages.value.push({ text: userInput.value, sender: "user" });
  loading.value = true;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: assistantPrompt },
          { role: "user", content: userInput.value },
        ],
      }),
    });

    const data = await response.json();
    console.log("API response:", data);

    if (data.choices && data.choices[0]?.message?.content) {
      const botReply = data.choices[0].message.content;
      messages.value.push({ text: botReply, sender: "bot" });
    } else {
      console.error("Unexpected API response format:", data);
      messages.value.push({
        text: "Jag kunde inte förstå frågan, försök igen.",
        sender: "bot",
      });
    }
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    messages.value.push({
      text: "Något gick fel, försök igen senare.",
      sender: "bot",
    });
  }

  loading.value = false;
  userInput.value = "";
};
</script>

<style scoped>
/* SPACE BACKGROUND */
.space-bg {
  background: radial-gradient(circle at 50% 50%, rgba(10, 20, 40, 0.9), #050a1f);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

/* Chat bubble styles */
.bot-msg {
  background: rgba(0, 255, 255, 0.2);
  border-left: 3px solid cyan;
  color: white;
  box-shadow: 0px 0px 5px rgba(0, 255, 255, 0.7);
}

.user-msg {
  background: rgba(255, 105, 180, 0.3);
  border-right: 3px solid hotpink;
  color: white;
  box-shadow: 0px 0px 5px rgba(255, 105, 180, 0.7);
}

/* Neon text effect */
.neon-text {
  color: cyan;
  text-shadow: 0px 0px 8px rgba(0, 255, 255, 0.7);
}

.text-neon {
  color: #0ff;
  text-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff;
}
</style>