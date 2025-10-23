<script setup>
import { ref, computed, reactive, watch } from "vue";
import { Copy, Check } from "lucide-vue-next";

const props = defineProps({
  activeEndpoint: {
    type: String,
    default: "introduction", // Default to introduction or first API endpoint
  },
});

// --- State ---
const activeLang = ref("curl");
const copyButtonText = ref("Copy");

const codeSnippets = reactive({
  introduction: {
    curl: ``, // No specific code for introduction
    javascript: `console.log("Welcome to GhCuricculum API documentation!");`,
    python: `print("Welcome to GhCuricculum API documentation!")`,
  },
  authentication: {
    curl: `# Example of a request with Bearer Token
curl "https://api.ghcurriculum.com/v1/some-endpoint" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`,
    javascript: `const accessToken = 'YOUR_ACCESS_TOKEN';

fetch('https://api.ghcurriculum.com/v1/some-endpoint', {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${accessToken}\`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  return response.json();
})
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    python: `import requests

access_token = 'YOUR_ACCESS_TOKEN'
url = "https://api.ghcurriculum.com/v1/some-endpoint"
headers = {
    "Authorization": f"Bearer {access_token}"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code} - {response.text}")`,
  },
  getquestions: {
    curl: `# Get a list of questions for Mathematics, JHS1
curl "https://api.ghcurriculum.com/v1/questions?subject=Mathematics&level_indicator=JHS1&limit=2" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Example response:
# [
#     {
#         "title": "If 5 kg of rice costs GH¢30, what is the cost of 2 kg of rice?",
#         "blob_id": "fdggfhhj-hnh6htgnbt5-cd4wsd",
#         "options": [...]
#     },
#     {
#         "title": "What is the capital of Ghana?",
#         "blob_id": "abccfhhj-hnh6htgnbt5-cd4wse",
#         "options": [...]
#     }
# ]`,
    javascript: `const accessToken = 'YOUR_ACCESS_TOKEN';
const subject = 'Mathematics';
const level = 'JHS1';
const limit = 2;

fetch(\`https://api.ghcurriculum.com/v1/questions?subject=\${subject}&level_indicator=\${level}&limit=\${limit}\`, {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${accessToken}\`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    python: `import requests

access_token = 'YOUR_ACCESS_TOKEN'
subject = 'Mathematics'
level = 'JHS1'
limit = 2

url = "https://api.ghcurriculum.com/v1/questions"
params = {
    "subject": subject,
    "level_indicator": level,
    "limit": limit
}
headers = {
    "Authorization": f"Bearer {access_token}"
}

response = requests.get(url, headers=headers, params=params)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code} - {response.text}")`,
  },
  getsinglequestion: {
    curl: `# Get a single question by its blob_id
curl "https://api.ghcurriculum.com/v1/questions/fdggfhhj-hnh6htgnbt5-cd4wsd" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Example response:
# {
#     "title": "If 5 kg of rice costs GH¢30, what is the cost of 2 kg of rice?",
#     "blob_id": "fdggfhhj-hnh6htgnbt5-cd4wsd",
#     "options": [...]
# }`,
    javascript: `const accessToken = 'YOUR_ACCESS_TOKEN';
const questionBlobId = 'fdggfhhj-hnh6htgnbt5-cd4wsd';

fetch(\`https://api.ghcurriculum.com/v1/questions/\${questionBlobId}\`, {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${accessToken}\`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    python: `import requests

access_token = 'YOUR_ACCESS_TOKEN'
question_blob_id = 'fdggfhhj-hnh6htgnbt5-cd4wsd'

url = f"https://api.ghcurriculum.com/v1/questions/{question_blob_id}"
headers = {
    "Authorization": f"Bearer {access_token}"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code} - {response.text}")`,
  },
  getlessons: {
    curl: `# Get a list of lessons for Science, JHS1
curl "https://api.ghcurriculum.com/v1/lessons?subject=Science&level_indicator=JHS1&limit=1" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Example response (truncated litems):
# [
#     {
#         "l_blob_id": 3,
#         "name": "Different Sources of Energy",
#         "description": "...",
#         "litems": [...]
#     }
# ]`,
    javascript: `const accessToken = 'YOUR_ACCESS_TOKEN';
const subject = 'Science';
const level = 'JHS1';
const limit = 1;

fetch(\`https://api.ghcurriculum.com/v1/lessons?subject=\${subject}&level_indicator=\${level}&limit=\${limit}\`, {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${accessToken}\`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    python: `import requests

access_token = 'YOUR_ACCESS_TOKEN'
subject = 'Science'
level = 'JHS1'
limit = 1

url = "https://api.ghcurriculum.com/v1/lessons"
params = {
    "subject": subject,
    "level_indicator": level,
    "limit": limit
}
headers = {
    "Authorization": f"Bearer {access_token}"
}

response = requests.get(url, headers=headers, params=params)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code} - {response.text}")`,
  },
  getsinglelesson: {
    curl: `# Get a single lesson by its l_blob_id
curl "https://api.ghcurriculum.com/v1/lessons/3" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Example response:
# {
#     "l_blob_id": 3,
#     "name": "Different Sources of Energy",
#     "description": "...",
#     "litems": [...]
# }`,
    javascript: `const accessToken = 'YOUR_ACCESS_TOKEN';
const lessonBlobId = 3;

fetch(\`https://api.ghcurriculum.com/v1/lessons/\${lessonBlobId}\`, {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${accessToken}\`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    python: `import requests

access_token = 'YOUR_ACCESS_TOKEN'
lesson_blob_id = 3

url = f"https://api.ghcurriculum.com/v1/lessons/{lesson_blob_id}"
headers = {
    "Authorization": f"Bearer {access_token}"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code} - {response.text}")`,
  },
  getvideos: {
    curl: `# Get a list of videos with a limit of 2
curl "https://api.ghcurriculum.com/v1/videos?limit=2" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Example response:
# [
#     {
#         "v_blob_id": 1,
#         "title": "Introduction to Photosynthesis",
#         "video_url": "..."
#     },
#     {
#         "v_blob_id": 2,
#         "title": "The Water Cycle Explained",
#         "video_url": "..."
#     }
# ]`,
    javascript: `const accessToken = 'YOUR_ACCESS_TOKEN';
const limit = 2;

fetch(\`https://api.ghcurriculum.com/v1/videos?limit=\${limit}\`, {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${accessToken}\`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    python: `import requests

access_token = 'YOUR_ACCESS_TOKEN'
limit = 2

url = "https://api.ghcurriculum.com/v1/videos"
params = {
    "limit": limit
}
headers = {
    "Authorization": f"Bearer {access_token}"
}

response = requests.get(url, headers=headers, params=params)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code} - {response.text}")`,
  },
  getsinglevideo: {
    curl: `# Get a single video by its ID
curl "https://api.ghcurriculum.com/v1/videos/1" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Example response:
# {
#     "v_blob_id": 1,
#     "title": "Introduction to Photosynthesis",
#     "video_url": "..."
# }`,
    javascript: `const accessToken = 'YOUR_ACCESS_TOKEN';
const videoId = 1;

fetch(\`https://api.ghcurriculum.com/v1/videos/\${videoId}\`, {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${accessToken}\`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    python: `import requests

access_token = 'YOUR_ACCESS_TOKEN'
video_id = 1

url = f"https://api.ghcurriculum.com/v1/videos/{video_id}"
headers = {
    "Authorization": f"Bearer {access_token}"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code} - {response.text}")`,
  },
  errorresponses: {
    curl: `# Example of an unauthorized request
curl "https://api.ghcurriculum.com/v1/questions" \\
  -H "Authorization: Bearer INVALID_TOKEN"

# Expected response (401 Unauthorized):
# {
#   "error": "Unauthorized",
#   "message": "Authentication token is missing, invalid, or expired."
# }`,
    javascript: `const invalidAccessToken = 'INVALID_TOKEN';

fetch('https://api.ghcurriculum.com/v1/questions', {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${invalidAccessToken}\`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  if (!response.ok) {
    console.error(\`HTTP error! Status: \${response.status}\`);
  }
  return response.json();
})
.then(data => console.log(data))
.catch(error => console.error('Fetch error:', error));`,
    python: `import requests

invalid_access_token = 'INVALID_TOKEN'
url = "https://api.ghcurriculum.com/v1/questions"
headers = {
    "Authorization": f"Bearer {invalid_access_token}"
}

response = requests.get(url, headers=headers)

if response.status_code != 200:
    print(f"Error: {response.status_code} - {response.text}")`,
  },
});

// --- Computed ---
const activeCode = computed(() => {
  // Fallback for cases where activeEndpoint might not have a direct code snippet (e.g., introduction)
  const snippet = codeSnippets[props.activeEndpoint]?.[activeLang.value];
  return (
    snippet || `// No code snippet available for "${props.activeEndpoint}" in ${activeLang.value}.`
  );
});

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
