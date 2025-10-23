<script setup>
import { ref, computed, reactive } from "vue";
import { Copy, Check } from "lucide-vue-next";

// --- State ---
const activeLang = ref("curl");
const copyButtonText = ref("Copy");

const codeSnippets = reactive({
  curl: `# Request for a single quiz
curl "https://api.ghcurriculum.com/v1/quizzes/qz_1a2b3c" \\
  -H "Authorization: Bearer YOUR_API_KEY"

# The API returns a JSON response like this:
{
  "id": "qz_1a2b3c",
  "subject": "Integrated Science",
  "topic": "Photosynthesis",
  "question": "What is the primary pigment used in photosynthesis?",
  "options": [
    "Chlorophyll",
    "Carotene",
    "Xanthophyll"
  ],
  "answer_index": 0
}`,
  javascript: `const apiKey = 'YOUR_API_KEY';
const quizId = 'qz_1a2b3c';

fetch(\`https://api.ghcurriculum.com/v1/quizzes/\${quizId}\`, {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));

// Expected output in console:
// { id: 'qz_1a2b3c', subject: 'Integrated Science', ... }`,
  python: `import requests

api_key = 'YOUR_API_KEY'
quiz_id = 'qz_1a2b3c'

url = f"https://api.ghcurriculum.com/v1/quizzes/{quiz_id}"
headers = {
    "Authorization": f"Bearer {api_key}"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}")`,
});

// --- Computed ---
const activeCode = computed(() => codeSnippets[activeLang.value]);

// --- Methods ---
const selectLang = (lang) => {
  activeLang.value = lang;
};

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(activeCode.value);
    copyButtonText.value = "Copied!";
    setTimeout(() => {
      copyButtonText.value = "Copy";
    }, 2000);
  } catch (err) {
    console.error("Failed to copy text: ", err);
    copyButtonText.value = "Error";
  }
};
</script>

<template>
  <aside class="bg-slate-800 text-slate-100 h-screen sticky top-0 flex flex-col">
    <!-- Language Switcher -->
    <div class="bg-slate-700 px-6 flex-shrink-0">
      <button
        @click="selectLang('curl')"
        :class="
          activeLang === 'curl' ? 'text-white border-blue-500' : 'text-slate-400 border-transparent'
        "
        class="relative font-semibold text-sm py-3 px-2 mr-4 border-b-2 hover:text-white transition-colors">
        cURL
      </button>
      <button
        @click="selectLang('javascript')"
        :class="
          activeLang === 'javascript'
            ? 'text-white border-blue-500'
            : 'text-slate-400 border-transparent'
        "
        class="relative font-semibold text-sm py-3 px-2 mr-4 border-b-2 hover:text-white transition-colors">
        JavaScript
      </button>
      <button
        @click="selectLang('python')"
        :class="
          activeLang === 'python'
            ? 'text-white border-blue-500'
            : 'text-slate-400 border-transparent'
        "
        class="relative font-semibold text-sm py-3 px-2 mr-4 border-b-2 hover:text-white transition-colors">
        Python
      </button>
    </div>

    <!-- Code Samples -->
    <div class="p-6 relative overflow-y-auto">
      <button
        @click="copyCode"
        class="absolute top-6 right-6 bg-slate-600 hover:bg-slate-500 text-slate-100 font-medium py-1.5 px-3 rounded-lg text-sm flex items-center gap-2">
        <Check v-if="copyButtonText === 'Copied!'" class="w-4 h-4" />
        <Copy v-else class="w-4 h-4" />
        {{ copyButtonText }}
      </button>
      <pre><code class="font-mono text-xs leading-relaxed">{{ activeCode }}</code></pre>
    </div>
  </aside>
</template>
