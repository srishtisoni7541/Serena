import Vapi from "@vapi-ai/web";

const apiKey = "7293dd81-7f6a-4d2b-a00b-b36049874ad4";
const assistantId = "1f2b0eab-8060-491a-b5e4-172115230766";

const vapi = new Vapi(apiKey);
vapi.start(assistantId);