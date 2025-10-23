<script setup>
import DocSidebar from '../components/documentation/DocSideBar.vue'
import CodePanel from '../components/documentation/CodePanel.vue'
</script>

<template>
  <div class="bg-white">
    <div class="grid grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr_450px]">
      <!-- Left Navigation Sidebar -->
      <DocSidebar />

      <!-- Main Content Area -->
      <main class="docs-content p-8 md:p-12 lg:p-16 overflow-y-auto">
        <section id="introduction">
          <h2 class="text-3xl font-bold border-b border-slate-200 pb-2 mb-4">Introduction</h2>
          <p class="mb-4">
            Welcome to the Ghana Curriculum API! This API provides programmatic access to a rich
            library of educational content tailored to the Ghanaian curriculum, including videos,
            quizzes, flashcards, and lesson notes.
          </p>
          <p>
            Our API is organized around REST. All API calls should be made to the base URL:
            <code class="endpoint">https://api.ghcurriculum.com/v1</code>
          </p>
        </section>

        <section id="authentication" class="mt-12">
          <h2 class="text-3xl font-bold border-b border-slate-200 pb-2 mb-4">Authentication</h2>
          <p class="mb-4">
            All requests to the API must be authenticated. We use API Keys to allow access to the
            API. You can register a new API key at our developer dashboard.
          </p>
          <p>
            Include your API key in the request by providing it in the
            <code>Authorization</code> header with the <code>Bearer</code> scheme.
          </p>
        </section>

        <section id="quizzes" class="mt-12">
          <h2 class="text-3xl font-bold border-b border-slate-200 pb-2 mb-4">Quizzes</h2>

          <h3 id="get-single-quiz" class="text-2xl font-semibold mt-8 mb-4">Get a Single Quiz</h3>
          <p class="mb-4">
            Retrieves a specific quiz object by its unique ID. The quiz object contains the
            question, a list of options, and the correct answer index.
          </p>
          <p>
            <code class="endpoint"><span class="method">GET</span> /quizzes/{quiz_id}</code>
          </p>

          <h4 class="text-lg font-semibold mt-6 mb-4">Path Parameters</h4>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-slate-300">
              <thead class="bg-slate-50">
                <tr>
                  <th class="text-left p-3 font-semibold border border-slate-300">Parameter</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Type</th>
                  <th class="text-left p-3 font-semibold border border-slate-300">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-3 border border-slate-300"><code>quiz_id</code></td>
                  <td class="p-3 border border-slate-300">string</td>
                  <td class="p-3 border border-slate-300">
                    <strong>Required.</strong> The unique identifier for the quiz question.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="errors" class="mt-16">
          <h2 class="text-3xl font-bold border-b border-slate-200 pb-2 mb-4">Error Handling</h2>
          <p>
            Our API uses conventional HTTP response codes to indicate the success or failure of an
            API request. In general: Codes in the 2xx range indicate success. Codes in the 4xx range
            indicate a client-side error (e.g., a missing parameter, bad authentication). Codes in
            the 5xx range indicate a problem with our servers.
          </p>
        </section>
      </main>

      <!-- Right Code Panel -->
      <!-- The lg:block class hides the code panel on smaller screens for better readability -->
      <div class="hidden lg:block">
        <CodePanel />
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
  font-family: 'Fira Code', monospace;
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
