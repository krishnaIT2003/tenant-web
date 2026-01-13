'use server';
/**
 * @fileOverview This file defines a Genkit flow to generate API integration snippets.
 *
 * It takes user-specific API keys and generates code snippets in cURL, JavaScript, and Python.
 * The flow returns an object containing the generated snippets for each language.
 *
 * @exported generateApiIntegrationSnippets - The function to trigger the API snippet generation flow.
 * @exported ApiIntegrationSnippetsInput - The input type for the generateApiIntegrationSnippets function.
 * @exported ApiIntegrationSnippetsOutput - The output type for the generateApiIntegrationSnippets function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ApiIntegrationSnippetsInputSchema = z.object({
  clientId: z.string().describe('The client ID for the user.'),
  accessKey: z.string().describe('The access key for the user.'),
  baseUrl: z.string().describe('The base API URL for the search service.'),
  query: z.string().describe('The search query to be used in the example snippets.'),
});
export type ApiIntegrationSnippetsInput = z.infer<typeof ApiIntegrationSnippetsInputSchema>;

const ApiIntegrationSnippetsOutputSchema = z.object({
  curl: z.string().describe('The cURL code snippet.'),
  javascript: z.string().describe('The JavaScript code snippet.'),
  python: z.string().describe('The Python code snippet.'),
});
export type ApiIntegrationSnippetsOutput = z.infer<typeof ApiIntegrationSnippetsOutputSchema>;

export async function generateApiIntegrationSnippets(
  input: ApiIntegrationSnippetsInput
): Promise<ApiIntegrationSnippetsOutput> {
  return generateApiIntegrationSnippetsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'apiIntegrationSnippetsPrompt',
  input: {schema: ApiIntegrationSnippetsInputSchema},
  output: {schema: ApiIntegrationSnippetsOutputSchema},
  prompt: `You are an API integration expert. Generate API request snippets in cURL, JavaScript, and Python based on the provided user-specific API keys and base URL.

  The user's Client ID is: {{{clientId}}}
  The user's Access Key is: {{{accessKey}}}
  The Base API URL is: {{{baseUrl}}}
  The example search query is: {{{query}}}

  Provide the code snippets with proper syntax and placeholders for the actual API endpoint.

  Ensure the snippets are functional and ready to be copied and pasted into a developer's environment.

  Here are the code snippets:

  cURL:
  {{#trim}}\ncurl -X POST \
     '{{{baseUrl}}}/search' \
     -H 'Content-Type: application/json' \
     -H 'X-Client-Id: {{{clientId}}}' \
     -H 'X-Access-Key: {{{accessKey}}}' \
     -d '{
    "query": "{{{query}}}"
}'\n  {{/trim}}

  JavaScript:
  {{#trim}}\nconst url = '{{{baseUrl}}}/search';\nconst data = { query: '{{{query}}}' };\n\nconst requestOptions = {\n  method: 'POST',\n  headers: {\n    'Content-Type': 'application/json',\n    'X-Client-Id': '{{{clientId}}}',\n    'X-Access-Key': '{{{accessKey}}}'\n  },\n  body: JSON.stringify(data)\n};\n\nfetch(url, requestOptions)\n  .then(response => response.json())\n  .then(data => console.log(data));\n  {{/trim}}

  Python:
  {{#trim}}\nimport requests\nimport json\n\nurl = '{{{baseUrl}}}/search'\nheaders = {\n    'Content-Type': 'application/json',\n    'X-Client-Id': '{{{clientId}}}',\n    'X-Access-Key': '{{{accessKey}}}'\n}\ndata = {\n    'query': '{{{query}}}'\n}\n\nresponse = requests.post(url, headers=headers, data=json.dumps(data))\n\nprint(response.json())\n  {{/trim}}
  `,
});

const generateApiIntegrationSnippetsFlow = ai.defineFlow(
  {
    name: 'generateApiIntegrationSnippetsFlow',
    inputSchema: ApiIntegrationSnippetsInputSchema,
    outputSchema: ApiIntegrationSnippetsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
