<template>
  <div class="mx-auto bg-secondary text-white text rounded-lg shadow-lg p-6">
    <div class="max-w-3xl mx-auto bg-darkbg text-white border-4 border-primary">
      <h2 class="font-press-start-2p text-indigo-400 underline mb-4">Mina senaste GitHub-projekt hämtat via API</h2>
  
      <p v-if="loading" class="text-gray-400">Laddar repositories...</p>
      <p v-if="error" class="text-red-400">⚠️ {{ error }}</p>
  
      <ul v-if="repos.length" role="list" class="divide-y divide-gray-700" aria-label="Lista över mina 5 senaste GitHub-projekt">
        <li
          v-for="repo in repos"
          :key="repo.id"
          class="px-4 py-4 sm:px-5 hover:bg-gray-800 font-vt323 transition cursor-pointer"
          @click="openRepo(repo.html_url)"
        >
          <div class="flex items-center justify-between">
            <p class="text-lg font-medium text-lime-400 hover:text-white">
              {{ repo.name }}
            </p>
            <p class="text-sm text-gray-400">
              {{ repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : "Okänt datum" }}
            </p>
          </div>
          <p class="mt-2 text-sm md:text-base text-gray-300">{{ repo.description || "Ingen beskrivning" }}</p>
        </li>
      </ul>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  updated_at: string;
}

const repos = ref<GitHubRepo[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function fetchGitHubRepos() {
  try {
    const response = await fetch("https://api.github.com/users/isanemka/repos");
    if (!response.ok) throw new Error("Kunde inte hämta repositories");
    
    const data: GitHubRepo[] = await response.json();
    repos.value = data
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()) // Sort by last update
      .slice(0, 5); // Fetch the 5 most recent projects
  } catch (err) {
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
}

function openRepo(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

onMounted(fetchGitHubRepos);
</script>

<style scoped>
</style>