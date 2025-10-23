<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import DocSidebar from "../components/documentation/DocSideBar.vue";
import CodePanel from "../components/documentation/CodePanel.vue";

const activeEndpoint = ref("introduction"); // Default active endpoint for the CodePanel

const handleScroll = () => {
  const sections = document.querySelectorAll("main section[id]");
  let currentActive = "introduction"; // Default to introduction

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 200; // Offset for header
    const sectionBottom = sectionTop + section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentActive = section.id;
    }
  });
  // console.log("active in docs", currentActive);
  activeEndpoint.value = currentActive;
  console.log("active: ", activeEndpoint.value);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="bg-white">
    <div class="grid grid-cols-5">
      <!-- Left Navigation Sidebar -->
      <DocSidebar :activeEndpoint="activeEndpoint" @set-active-endpoint="activeEndpoint = $event" />

      <!-- Main Content Area -->
      <main class="docs-content p-8 md:py-12 lg:py-16 overflow-y-auto col-span-5 sm:col-span-4  lg:col-span-2">
        <section id="introduction">
          <h2 class="text-3xl font-bold border-b border-slate-200 pb-2 mb-4">Introduction</h2>
          <p class="mb-4">
            Welcome to the GhCuricculum APIs documentation! This API provides programmatic access to
            a rich library of educational content tailored to the Ghanaian curriculum, including
            questions, lessons, and videos.
          </p>
          <p>
            Our API is organized around REST. All API calls should be made to the base URL:
            <code class="endpoint">https://api.ghcurriculum.com/v1</code>
          </p>
        </section>

        <section id="authentication" class="mt-12">
          <h2 class="text-3xl font-bold border-b border-slate-200 pb-2 mb-4">API Authentication</h2>
          <p class="mb-4">
            To integrate with GhCuricculum APIs, you need to create API keys for authentication.
            Each API has specific keys required for access.
          </p>
          <h3 class="text-2xl font-semibold mt-8 mb-4">Authentication Method</h3>
          <p class="mb-4">HTTP Bearer Authentication</p>
          <p class="mb-4">
            Pass the bearer token in the headers of your HTTP request as such:
            <code class="endpoint">Bearer fgr65bfhj46i7ijyjyje-</code>
          </p>
          <p>Requests made without a valid token will result in a 401 Unauthorized error.</p>
        </section>

        <!-- =========================
     SECTION 1: QUESTIONS API OVERVIEW
========================= -->
        <section id="questions-api" class="mt-12">
          <h2 class="text-3xl font-bold border-b border-slate-200 pb-2 mb-4">
            Questions API Documentation
          </h2>
          <p class="mb-4">
            This API provides access to a database of educational questions. You can retrieve a list
            of questions based on specific criteria or fetch a single question by its unique
            identifier.
          </p>
        </section>

        <!-- =========================
     SECTION 2: GET QUESTIONS
========================= -->
        <section id="getquestions" class="mt-12">
          <h3 class="text-2xl font-semibold mb-4">1. Get Questions</h3>
          <p class="mb-4">Retrieves a paginated list of questions based on a subject and level.</p>
          <p class="mb-4">
            <code class="endpoint"><span class="method">GET</span> /api/v1/questions</code>
          </p>

          <h4 class="text-lg font-semibold mt-6 mb-4">Query Parameters</h4>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-slate-300">
              <thead class="bg-slate-50">
                <tr>
                  <th class="text-left p-3 font-semibold border border-slate-300">Parameter</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Type</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Required?</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-3 border border-slate-300"><code>subject</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">Yes</td>
                  <td class="p-3 border border-slate-300">
                    The subject of the questions to retrieve (e.g., Mathematics, English).
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>level_indicator</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">Yes</td>
                  <td class="p-3 border border-slate-300">
                    The educational level for the questions (e.g., JHS1, SHS2).
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>offset</code></td>
                  <td class="p-3 border border-slate-300">integer</td>
                  <td class="p-3 border border-slate-300">No</td>
                  <td class="p-3 border border-slate-300">
                    The number of questions to skip from the beginning. Used for pagination.
                    Defaults to 0.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>limit</code></td>
                  <td class="p-3 border border-slate-300">integer</td>
                  <td class="p-3 border border-slate-300">No</td>
                  <td class="p-3 border border-slate-300">
                    The maximum number of questions to return per request. Used for pagination.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 class="text-lg font-semibold mt-6 mb-4">Successful Response (200 OK)</h4>
          <p class="mb-4">Returns a JSON array of question objects.</p>
          <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto mb-6"><code>[
    {
        "title": "If 5 kg of rice costs GH¢30, what is the cost of 2 kg of rice?",
        "questopttype": "3",
        "difficultyname": "medium",
        "difficultyindex": 0.7,
        "questionimage": null,
        "qslongtext": null,
        "legacy": false,
        "blob_id": "fdggfhhj-hnh6htgnbt5-cd4wsd",
        "katexfield": "",
        "texttype": "normal",
        "quesshowtype": "2",
        "options": [
            { "optext": "GH¢12", "q_blob_id": "fdggfhhj-hnh6htgnbt5-cd4wsd", "correct": true },
            { "optext": "GH¢15", "q_blob_id": "fdggfhhj-hnh6htgnbt5-cd4wsd", "correct": false },
            { "optext": "GH¢10", "q_blob_id": "fdggfhhj-hnh6htgnbt5-cd4wsd", "correct": false },
            { "optext": "GH¢18", "q_blob_id": "fdggfhhj-hnh6htgnbt5-cd4wsd", "correct": false }
        ]
    },
    {
        "title": "What is the capital of Ghana?",
        "questopttype": "3",
        "difficultyname": "easy",
        "difficultyindex": 0.2,
        "questionimage": null,
        "qslongtext": null,
        "legacy": false,
        "blob_id": "abccfhhj-hnh6htgnbt5-cd4wse",
        "katexfield": "",
        "texttype": "normal",
        "quesshowtype": "2",
        "options": [
            { "optext": "Lagos", "q_blob_id": "abccfhhj-hnh6htgnbt5-cd4wse", "correct": false },
            { "optext": "Accra", "q_blob_id": "abccfhhj-hnh6htgnbt5-cd4wse", "correct": true },
            { "optext": "Kumasi", "q_blob_id": "abccfhhj-hnh6htgnbt5-cd4wse", "correct": false },
            { "optext": "Abuja", "q_blob_id": "abccfhhj-hnh6htgnbt5-cd4wse", "correct": false }
        ]
    }
]</code></pre>
        </section>

        <!-- =========================
     SECTION 3: GET SINGLE QUESTION
========================= -->
        <section id="getsinglequestion" class="mt-12">
          <h3 class="text-2xl font-semibold mb-4">2. Get a Single Question</h3>
          <p class="mb-4">Retrieves a single question by its unique <code>blob_id</code>.</p>
          <p class="mb-4">
            <code class="endpoint"
              ><span class="method">GET</span> /api/v1/questions/{blob_id}</code
            >
          </p>

          <h4 class="text-lg font-semibold mt-6 mb-4">Path Parameters</h4>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-slate-300">
              <thead class="bg-slate-50">
                <tr>
                  <th class="text-left p-3 font-semibold border border-slate-300">Parameter</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Type</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Required?</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-3 border border-slate-300"><code>blob_id</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">Yes</td>
                  <td class="p-3 border border-slate-300">
                    The unique identifier of the question to retrieve.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 class="text-lg font-semibold mt-6 mb-4">Successful Response (200 OK)</h4>
          <p class="mb-4">Returns a single JSON question object.</p>
          <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto mb-6"><code>{
    "title": "If 5 kg of rice costs GH¢30, what is the cost of 2 kg of rice?",
    "questopttype": "3",
    "difficultyname": "medium",
    "difficultyindex": 0.7,
    "questionimage": null,
    "qslongtext": null,
    "legacy": false,
    "blob_id": "fdggfhhj-hnh6htgnbt5-cd4wsd",
    "katexfield": "",
    "texttype": "normal",
    "quesshowtype": "2",
    "options": [
        { "optext": "GH¢12", "q_blob_id": "fdggfhhj-hnh6htgnbt5-cd4wsd", "correct": true },
        { "optext": "GH¢15", "q_blob_id": "fdggfhhj-hnh6htgnbt5-cd4wsd", "correct": false },
        { "optext": "GH¢10", "q_blob_id": "fdggfhhj-hnh6htgnbt5-cd4wsd", "correct": false },
        { "optext": "GH¢18", "q_blob_id": "fdggfhhj-hnh6htgnbt5-cd4wsd", "correct": false }
    ]
}</code></pre>

          <h4 class="text-lg font-semibold mt-6 mb-4">Data Models: Question Object</h4>
          <div class="overflow-x-auto mb-6">
            <!-- Question Object Table -->
            <table class="w-full border-collapse border border-slate-300">
              <thead class="bg-slate-50">
                <tr>
                  <th class="text-left p-3 font-semibold border border-slate-300">Field</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Type</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-3 border border-slate-300"><code>title</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">The main text of the question.</td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>questopttype</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">
                    A type indicator for the question/option format.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>difficultyname</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">
                    A human-readable difficulty level (e.g., easy, medium, hard).
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>difficultyindex</code></td>
                  <td class="p-3 border border-slate-300">number</td>
                  <td class="p-3 border border-slate-300">
                    A numeric representation of the difficulty, typically between 0 and 1.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>questionimage</code></td>
                  <td class="p-3 border border-slate-300">string | null</td>
                  <td class="p-3 border border-slate-300">
                    A URL to an associated image for the question, or null if none.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>qslongtext</code></td>
                  <td class="p-3 border border-slate-300">string | null</td>
                  <td class="p-3 border border-slate-300">
                    Additional long-form text or context for the question.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>blob_id</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">
                    The unique identifier for the question.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>katexfield</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">
                    A field for KaTeX formatted mathematical expressions.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>texttype</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">
                    The type of text rendering to use (e.g., normal, katex).
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>options</code></td>
                  <td class="p-3 border border-slate-300">array of Options</td>
                  <td class="p-3 border border-slate-300">
                    An array of possible answers for the question.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 class="text-lg font-semibold mt-6 mb-4">Data Models: Option Object</h4>
          <div class="overflow-x-auto mb-6">
            <!-- Option Object Table -->
            <table class="w-full border-collapse border border-slate-300">
              <thead class="bg-slate-50">
                <tr>
                  <th class="text-left p-3 font-semibold border border-slate-300">Field</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Type</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-3 border border-slate-300"><code>optext</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">
                    The text content of the answer option.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>q_blob_id</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">
                    The identifier of the parent question.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>correct</code></td>
                  <td class="p-3 border border-slate-300">boolean</td>
                  <td class="p-3 border border-slate-300">
                    A flag indicating whether this is the correct answer (true) or not (false).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="lessons-api" class="mt-12">
          <h2 class="text-3xl font-bold border-b border-slate-200 pb-2 mb-4">
            Lessons API Documentation
          </h2>

          <p class="mb-4">
            This API provides access to structured educational lessons. You can retrieve a list of
            lessons for a specific subject and level, or fetch a single, detailed lesson by its
            unique identifier.
          </p>
        </section>

        <!-- 1. Get Lessons -->
        <section id="getlessons">
          <h3 class="text-2xl font-semibold mt-8 mb-4">1. Get Lessons</h3>
          <p class="mb-4">Retrieves a paginated list of lessons based on a subject and level.</p>
          <p class="mb-4">
            <code class="endpoint"><span class="method">GET</span> /api/v1/lessons</code>
          </p>

          <h4 class="text-lg font-semibold mt-6 mb-4">Query Parameters</h4>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-slate-300">
              <thead class="bg-slate-50">
                <tr>
                  <th class="text-left p-3 border border-slate-300">Parameter</th>
                  <th class="text-left p-3 border border-slate-300">Type</th>
                  <th class="text-left p-3 border border-slate-300">Required?</th>
                  <th class="text-left p-3 border border-slate-300">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-3 border border-slate-300"><code>subject</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">Yes</td>
                  <td class="p-3 border border-slate-300">
                    The subject of the lessons to retrieve (e.g., Science, Mathematics).
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>level_indicator</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">Yes</td>
                  <td class="p-3 border border-slate-300">
                    The educational level for the lessons (e.g., JHS1, SHS2).
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>offset</code></td>
                  <td class="p-3 border border-slate-300">integer</td>
                  <td class="p-3 border border-slate-300">No</td>
                  <td class="p-3 border border-slate-300">
                    The number of lessons to skip from the beginning. Used for pagination. Defaults
                    to 0.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>limit</code></td>
                  <td class="p-3 border border-slate-300">integer</td>
                  <td class="p-3 border border-slate-300">No</td>
                  <td class="p-3 border border-slate-300">
                    The maximum number of lessons to return per request. Used for pagination.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 class="text-lg font-semibold mt-6 mb-4">Successful Response (200 OK)</h4>
          <p class="mb-4">
            Returns a JSON array of lesson objects. Each lesson object contains an array of
            <code>litems</code> which are the content blocks of the lesson.
          </p>

          <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto mb-6"><code>[
  {
    "l_blob_id": 3,
    "name": "Different Sources of Energy",
    "description": "Different Sources of Energy",
    "lessonimage": {
      "url": "https://matic-ann.s3.amazonaws.com/uploads/lesson/lessonimage/3/c54eade3-ee52-4206-bdaa-3f226b78ba8b.png"
    },
    "litems": [
      {
        "id": 21,
        "title": "Lesson 2 – Different Sources of Energy",
        "subtitle": "",
        "body": "",
        "litemimg": { "url": null },
        "litemvid": { "url": null },
        "imgvidalt": "",
        "l_blob_id": 3,
        "ranknum": 1,
        "created_at": "2023-03-13T10:11:03.921Z",
        "updated_at": "2023-03-13T10:11:03.921Z",
        "ltype": "title"
      }
    ]
  }
]</code></pre>
        </section>

        <!-- 2. Get Single Lesson -->
        <section id="getsinglelesson">
          <h3 class="text-2xl font-semibold mt-8 mb-4">2. Get a Single Lesson</h3>
          <p class="mb-4">
            Retrieves a single, complete lesson by its unique identifier. This includes all of its
            content items (<code>litems</code>) in their correct order.
          </p>
          <p class="mb-4">
            <code class="endpoint"
              ><span class="method">GET</span> /api/v1/lessons/{l_blob_id}</code
            >
          </p>

          <h4 class="text-lg font-semibold mt-6 mb-4">Path Parameters</h4>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-slate-300">
              <thead class="bg-slate-50">
                <tr>
                  <th class="text-left p-3 border border-slate-300">Parameter</th>
                  <th class="text-left p-3 border border-slate-300">Type</th>
                  <th class="text-left p-3 border border-slate-300">Required?</th>
                  <th class="text-left p-3 border border-slate-300">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-3 border border-slate-300"><code>l_blob_id</code></td>
                  <td class="p-3 border border-slate-300">integer</td>
                  <td class="p-3 border border-slate-300">Yes</td>
                  <td class="p-3 border border-slate-300">
                    The unique identifier of the lesson to retrieve.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 class="text-lg font-semibold mt-6 mb-4">Successful Response (200 OK)</h4>
          <p class="mb-4">Returns a single JSON lesson object.</p>

          <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto mb-6"><code>{
  "l_blob_id": 3,
  "name": "Different Sources of Energy",
  "description": "Different Sources of Energy",
  "lessonimage": {
    "url": "https://matic-ann.s3.amazonaws.com/uploads/lesson/lessonimage/3/c54eade3-ee52-4206-bdaa-3f226b78ba8b.png"
  },
  "litems": [
    {
      "id": 21,
      "title": "Lesson 2 – Different Sources of Energy",
      "subtitle": "",
      "body": "",
      "litemimg": { "url": null },
      "litemvid": { "url": null },
      "imgvidalt": "",
      "l_blob_id": 3,
      "ranknum": 1,
      "created_at": "2023-03-13T10:11:03.921Z",
      "updated_at": "2023-03-13T10:11:03.921Z",
      "ltype": "title"
    },
    {
      "id": 22,
      "subtitle": "Chemical Energy",
      "body": "",
      "litemimg": { "url": null },
      "litemvid": { "url": null },
      "imgvidalt": "",
      "l_blob_id": 3,
      "ranknum": 2,
      "created_at": "2023-03-13T10:11:34.760Z",
      "updated_at": "2023-03-13T10:11:34.760Z",
      "ltype": "subtitle"
    },
    {
      "id": 23,
      "body": "Chemical energy is released during chemical reactions...",
      "litemimg": { "url": null },
      "litemvid": { "url": null },
      "imgvidalt": "",
      "l_blob_id": 3,
      "ranknum": 3,
      "created_at": "2023-03-13T10:12:16.747Z",
      "updated_at": "2023-03-13T10:25:04.876Z",
      "ltype": "body"
    },
    {
      "id": 35,
      "body": "",
      "litemimg": { "url": null },
      "litemvid": {
        "url": "https://matic-ann.s3.amazonaws.com/uploads/litem/litemvid/35/3964b9d0-a711-460d-8ec9-094501ea00d5.m4v"
      },
      "imgvidalt": "Demonstrating Kinetic energy",
      "l_blob_id": 3,
      "ranknum": 15,
      "created_at": "2023-03-13T10:24:17.716Z",
      "updated_at": "2024-07-26T09:59:34.655Z",
      "ltype": "video"
    }
  ]
}</code></pre>

          <h4 class="text-lg font-semibold mt-6 mb-4">Data Models: Lesson Object</h4>
          <div class="overflow-x-auto mb-6">
            <table class="w-full border-collapse border border-slate-300">
              <thead class="bg-slate-50">
                <tr>
                  <th class="text-left p-3 border border-slate-300">Field</th>
                  <th class="text-left p-3 border border-slate-300">Type</th>
                  <th class="text-left p-3 border border-slate-300">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-3 border border-slate-300"><code>l_blob_id</code></td>
                  <td class="p-3 border border-slate-300">integer</td>
                  <td class="p-3 border border-slate-300">The unique identifier for the lesson.</td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>name</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">The title of the lesson.</td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>description</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">
                    A brief summary of the lesson's content.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>lessonimage</code></td>
                  <td class="p-3 border border-slate-300">object</td>
                  <td class="p-3 border border-slate-300">
                    An object containing the URL for the lesson's main image.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>litems</code></td>
                  <td class="p-3 border border-slate-300">array of Lesson Items</td>
                  <td class="p-3 border border-slate-300">
                    An array of ordered content blocks that make up the lesson.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 class="text-lg font-semibold mt-6 mb-4">Data Models: Lesson Item (litem) Object</h4>
          <p class="mb-4">
            Each <code>litem</code> represents a single block of content within a lesson, such as a
            title, text, image, or video. The <code>ltype</code> field determines how the item
            should be rendered.
          </p>

          <div class="overflow-x-auto mb-6">
            <table class="w-full border-collapse border border-slate-300">
              <thead class="bg-slate-50">
                <tr>
                  <th class="text-left p-3 border border-slate-300">Field</th>
                  <th class="text-left p-3 border border-slate-300">Type</th>
                  <th class="text-left p-3 border border-slate-300">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-3 border border-slate-300"><code>id</code></td>
                  <td class="p-3 border border-slate-300">integer</td>
                  <td class="p-3 border border-slate-300">
                    The unique identifier for this specific lesson item.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>title</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">The text content if ltype is "title".</td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>subtitle</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">
                    The text content if ltype is "subtitle".
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>body</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">The text content if ltype is "body".</td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>litemimg</code></td>
                  <td class="p-3 border border-slate-300">object</td>
                  <td class="p-3 border border-slate-300">
                    Object with image URL (null if not applicable).
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>litemvid</code></td>
                  <td class="p-3 border border-slate-300">object</td>
                  <td class="p-3 border border-slate-300">
                    Object with video URL (null if not applicable).
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>imgvidalt</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">
                    Alternative text for images or videos.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>l_blob_id</code></td>
                  <td class="p-3 border border-slate-300">integer</td>
                  <td class="p-3 border border-slate-300">
                    The identifier of the parent lesson this item belongs to.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>ranknum</code></td>
                  <td class="p-3 border border-slate-300">integer</td>
                  <td class="p-3 border border-slate-300">
                    The sequential order of the item in the lesson.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>created_at</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">ISO 8601 timestamp of creation.</td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>updated_at</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">ISO 8601 timestamp of last update.</td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>ltype</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">
                    Determines content type (e.g., title, subtitle, body, image, video).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="videos-api" class="mt-12">
          <h2 class="text-3xl font-bold border-b border-slate-200 pb-2 mb-4">
            Videos API Documentation
          </h2>
          <p class="mb-4">
            This API provides access to a library of educational videos. You can retrieve a
            paginated list of all videos or fetch a single video by its unique ID.
          </p>
        </section>

        <!-- 1️⃣ Get Videos -->
        <section id="getvideos">
          <h3 class="text-2xl font-semibold mt-8 mb-4">1. Get Videos</h3>
          <p class="mb-4">Retrieves a paginated list of available videos.</p>
          <p class="mb-4">
            <code class="endpoint"><span class="method">GET</span> /api/v1/videos</code>
          </p>

          <h4 class="text-lg font-semibold mt-6 mb-4">Query Parameters</h4>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-slate-300">
              <thead class="bg-slate-50">
                <tr>
                  <th class="text-left p-3 font-semibold border border-slate-300">Parameter</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Type</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Required?</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-3 border border-slate-300"><code>offset</code></td>
                  <td class="p-3 border border-slate-300">integer</td>
                  <td class="p-3 border border-slate-300">No</td>
                  <td class="p-3 border border-slate-300">
                    The number of videos to skip from the beginning. Used for pagination. Defaults
                    to 0.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>limit</code></td>
                  <td class="p-3 border border-slate-300">integer</td>
                  <td class="p-3 border border-slate-300">No</td>
                  <td class="p-3 border border-slate-300">
                    The maximum number of videos to return per request. Used for pagination.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 class="text-lg font-semibold mt-6 mb-4">Successful Response (200 OK)</h4>
          <p class="mb-4">Returns a JSON array of video objects.</p>
          <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto mb-6"><code>[
  {
    "v_blob_id": 1,
    "title": "Introduction to Photosynthesis",
    "description": "A beginner-friendly explanation of how plants create their own food using sunlight, water, and carbon dioxide.",
    "placeholder_image_url": "https://matic-ann.s3.amazonaws.com/uploads/video/placeholder/1/photosynthesis_thumb.png",
    "video_url": "https://matic-ann.s3.amazonaws.com/uploads/video/file/1/photosynthesis_intro.mp4"
  },
  {
    "v_blob_id": 2,
    "title": "The Water Cycle Explained",
    "description": "Follow a drop of water as it travels through the stages of evaporation, condensation, and precipitation.",
    "placeholder_image_url": "https://matic-ann.s3.amazonaws.com/uploads/video/placeholder/2/water_cycle_thumb.png",
    "video_url": "https://matic-ann.s3.amazonaws.com/uploads/video/file/2/water_cycle_explained.mp4"
  }
]</code></pre>
        </section>

        <!-- 2️⃣ Get a Single Video -->
        <section id="getsinglevideo">
          <h3 class="text-2xl font-semibold mt-8 mb-4">2. Get a Single Video</h3>
          <p class="mb-4">Retrieves a single video by its unique ID.</p>
          <p class="mb-4">
            <code class="endpoint"><span class="method">GET</span> /api/v1/videos/{id}</code>
          </p>

          <h4 class="text-lg font-semibold mt-6 mb-4">Path Parameters</h4>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-slate-300">
              <thead class="bg-slate-50">
                <tr>
                  <th class="text-left p-3 font-semibold border border-slate-300">Parameter</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Type</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Required?</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-3 border border-slate-300"><code>id</code></td>
                  <td class="p-3 border border-slate-300">integer</td>
                  <td class="p-3 border border-slate-300">Yes</td>
                  <td class="p-3 border border-slate-300">
                    The unique identifier of the video to retrieve.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 class="text-lg font-semibold mt-6 mb-4">Successful Response (200 OK)</h4>
          <p class="mb-4">Returns a single JSON video object.</p>
          <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto mb-6"><code>{
  "v_blob_id": 1,
  "title": "Introduction to Photosynthesis",
  "description": "A beginner-friendly explanation of how plants create their own food using sunlight, water, and carbon dioxide.",
  "placeholder_image_url": "https://matic-ann.s3.amazonaws.com/uploads/video/placeholder/1/photosynthesis_thumb.png",
  "video_url": "https://matic-ann.s3.amazonaws.com/uploads/video/file/1/photosynthesis_intro.mp4"
}</code></pre>

          <!-- 🧩 Data Model -->
          <h4 class="text-lg font-semibold mt-6 mb-4">Data Models: Video Object</h4>
          <p class="mb-4">The Video Object represents a single video entry in the system.</p>
          <div class="overflow-x-auto mb-6">
            <table class="w-full border-collapse border border-slate-300">
              <thead class="bg-slate-50">
                <tr>
                  <th class="text-left p-3 font-semibold border border-slate-300">Field</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Type</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-3 border border-slate-300"><code>v_blob_id</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">The unique identifier for the video.</td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>title</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">The title of the video.</td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>description</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">
                    A detailed description of the video's content.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>placeholder_image_url</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">
                    The URL for the video's thumbnail or poster image.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>video_url</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">
                    The direct URL to the video file (e.g., .mp4, .m4v).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="errorresponses" class="mt-16">
          <h2 class="text-3xl font-bold border-b border-slate-200 pb-2 mb-4">Error Responses</h2>
          <p class="mb-4">
            The API uses standard HTTP status codes to indicate the success or failure of a request.
          </p>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-slate-300">
              <thead class="bg-slate-50">
                <tr>
                  <th class="text-left p-3 font-semibold border border-slate-300">Status Code</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Meaning</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-3 border border-slate-300"><code>400</code></td>
                  <td class="p-3 border border-slate-300">Bad Request</td>
                  <td class="p-3 border border-slate-300">
                    The request was malformed, such as missing a required parameter.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>401</code></td>
                  <td class="p-3 border border-slate-300">Unauthorized</td>
                  <td class="p-3 border border-slate-300">
                    The authentication token was missing, invalid, or expired.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>404</code></td>
                  <td class="p-3 border border-slate-300">Not Found</td>
                  <td class="p-3 border border-slate-300">
                    The requested resource (e.g., a video with a specific id) could not be found.
                  </td>
                </tr>
                <tr>
                  <td class="p-3 border border-slate-300"><code>500</code></td>
                  <td class="p-3 border border-slate-300">Internal Server Error</td>
                  <td class="p-3 border border-slate-300">
                    An unexpected error occurred on the server.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <!-- Right Code Panel -->
      <div class="hidden lg:block lg:col-span-2">
        <CodePanel :activeEndpoint="activeEndpoint" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles for this component to avoid affecting other parts of the app */
.docs-content p,
.docs-content td {
  color: #64748b; /* text-slate-500 */
  line-height: 1.7;
}
.docs-content h2,
.docs-content h3,
.docs-content h4,
.docs-content th {
  color: #1e293b; /* text-slate-800 */
}
.docs-content code {
  font-family: "Fira Code", monospace;
  font-size: 0.9em;
}
.docs-content code.endpoint {
  background-color: #f1f5f9; /* bg-slate-100 */
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  word-break: break-all;
}
.docs-content code .method {
  font-weight: 700;
  color: #3b82f6; /* text-blue-600 */
  margin-right: 0.75rem;
}
.docs-content table code {
  background-color: #eef2ff; /* bg-blue-50 */
  padding: 2px 4px;
  border-radius: 3px;
  color: #3b82f6;
}
.docs-content strong {
  color: #334155; /* text-slate-700 */
  font-weight: 600;
}
</style>
