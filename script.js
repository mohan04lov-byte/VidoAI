let currentProject = null;

function generateVideo() {
const idea = document.getElementById("idea").value.trim();
const style = document.getElementById("style").value;
const duration = document.getElementById("duration").value;
const language = document.getElementById("language").value;
const aspect = document.getElementById("aspect").value;
const mood = document.getElementById("mood").value;
const camera = document.getElementById("camera").value;

if (!idea) {
alert("Please enter your video idea first! 💡");
document.getElementById("idea").focus();
return;
}

const button = document.getElementById("generateBtn");
const loading = document.getElementById("loading");
const result = document.getElementById("result");
const loadingText = document.getElementById("loadingText");
const progressBar = document.getElementById("progressBar");

button.disabled = true;
button.textContent = "⏳ Creating...";
loading.classList.remove("hidden");
result.classList.add("hidden");

const steps = [
"Understanding your idea...",
"Building the story...",
"Creating the characters...",
"Designing 5 scenes...",
"Writing cinematic prompts...",
"Preparing voice-over...",
"Finishing your video concept..."
];

let step = 0;
let progress = 0;

const interval = setInterval(() => {
if (step < steps.length) {
loadingText.textContent = steps[step];
step++;
progress = Math.min(95, Math.round((step / steps.length) * 100));
progressBar.style.width = progress + "%";
}
}, 350);

setTimeout(() => {
clearInterval(interval);
progressBar.style.width = "100%";
loadingText.textContent = "Your video concept is ready! 🎉";

currentProject = createProject(
  idea,
  style,
  duration,
  language,
  aspect,
  mood,
  camera
);

renderProject(currentProject);

setTimeout(() => {
  loading.classList.add("hidden");
  result.classList.remove("hidden");

  button.disabled = false;
  button.textContent = "🚀 Generate Video Concept";

  result.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}, 500);

}, 2800);
}

/* =========================
PROJECT CREATOR
========================= */

function createProject(
idea,
style,
duration,
language,
aspect,
mood,
camera
) {

const title = makeTitle(idea);

const subject = getSubject(idea);

const character = createCharacter(subject, style);

const scenes = createScenes(
idea,
subject,
character,
style,
duration,
language,
mood,
camera
);

const story = createStory(
idea,
subject,
character,
mood,
duration
);

const voiceover = createVoiceover(
idea,
subject,
language,
scenes
);

const music = createMusic(style, mood);

const masterPrompt = createMasterPrompt(
idea,
character,
style,
duration,
language,
aspect,
mood,
camera
);

return {
title,
idea,
style,
duration,
language,
aspect,
mood,
camera,
character,
story,
scenes,
voiceover,
music,
masterPrompt
};
}

/* =========================
CHARACTER
========================= */

function createCharacter(subject, style) {

const lower = subject.toLowerCase();

if (
lower.includes("monkey") ||
lower.includes("बंदर") ||
lower.includes("বানর")
) {
return "A funny and expressive ${style.toLowerCase()} monkey vlogger, intelligent eyes, natural facial expressions, consistent appearance in every scene, wearing a small stylish vlog outfit and holding a compact camera.";
}

return "The main character connected to "${subject}", designed in a ${style.toLowerCase()} visual style, expressive face, consistent clothing and appearance throughout every scene, natural body movement and cinematic presence.";
}

/* =========================
STORY
========================= */

function createStory(idea, subject, character, mood, duration) {

return `
The story follows ${subject} as the main character in a ${duration.toLowerCase()} adventure.

The journey begins by introducing the character and the world around them.
The character then explores the situation connected to "${idea}" and discovers something unexpected.

A challenge appears and creates tension.
The character reacts, takes action and finds a creative way forward.

The story ends with a memorable final moment that matches the ${mood.toLowerCase()} mood and leaves the audience wanting to see the next adventure.
`.trim();
}

/* =========================
SCENES
========================= */

function createScenes(
idea,
subject,
character,
style,
duration,
language,
mood,
camera
) {

const sceneData = [

{
  title: "The Beginning",
  action: `Introduce ${subject} and establish the world of "${idea}".`,
  dialogue: getDialogue(language, 1)
},

{
  title: "The Journey",
  action: `${subject} starts exploring the environment and discovers interesting details connected to the idea.`,
  dialogue: getDialogue(language, 2)
},

{
  title: "The Problem",
  action: `An unexpected challenge appears and changes the direction of the story.`,
  dialogue: getDialogue(language, 3)
},

{
  title: "The Action",
  action: `${subject} takes action and tries to solve the problem in an exciting way.`,
  dialogue: getDialogue(language, 4)
},

{
  title: "The Ending",
  action: `The adventure reaches a satisfying conclusion with a memorable final shot.`,
  dialogue: getDialogue(language, 5)
}

];

return sceneData.map((scene, index) => {

const visual = `

${style} cinematic scene, ${camera} camera movement.

Main character:
${character}

Story:
${scene.action}

Original video idea:
${idea}

Mood:
${mood}

Environment should feel detailed, natural and believable.
Maintain the exact same character appearance, clothing and identity.
Natural body movement, realistic expressions, cinematic composition,
professional lighting, depth of field, high detail, smooth motion,
no text, no watermark.
Aspect ratio: ${aspectRatioName(language)}
`.trim();

const videoPrompt = `

Create a ${duration.toLowerCase()} video shot based on this scene.

${visual}

Camera movement should be smooth and professional.
The character should move naturally and interact with the environment.
Keep visual continuity with all other scenes.
`.trim();

const imagePrompt = `

Create a high-quality keyframe image for this scene.

${visual}

Photorealistic cinematic composition with strong subject focus,
detailed environment and consistent character identity.
`.trim();

return {
  number: index + 1,
  title: scene.title,
  visual,
  imagePrompt,
  videoPrompt,
  dialogue: scene.dialogue
};

});
}

/* =========================
DIALOGUE
========================= */

function getDialogue(language, scene) {

const dialogues = {

English: [
  "Hello everyone! Our adventure starts right here.",
  "This place is incredible. Let's see what happens next!",
  "Wait... something unexpected just happened!",
  "I have an idea. Let's solve this together!",
  "What an adventure! Thanks for watching!"
],

Hindi: [
  "नमस्ते दोस्तों! हमारी adventure यहीं से शुरू होती है।",
  "वाह! यह जगह तो कमाल की है। देखते हैं आगे क्या होता है!",
  "रुको... यहाँ कुछ unexpected हो गया!",
  "मेरे पास एक idea है। चलो इसे solve करते हैं!",
  "क्या adventure था! देखने के लिए धन्यवाद!"
],

Bengali: [
  "হ্যালো বন্ধুরা! আমাদের adventure এখান থেকেই শুরু।",
  "ওয়াও! জায়গাটা অসাধারণ। দেখি এরপর কী হয়!",
  "দাঁড়াও... এখানে অপ্রত্যাশিত কিছু ঘটেছে!",
  "আমার একটা idea আছে। চলো এটা solve করি!",
  "কী দারুণ adventure! দেখার জন্য ধন্যবাদ!"
]

};

return dialogues[language][scene - 1];
}

/* =========================
VOICEOVER
========================= */

function createVoiceover(idea, subject, language, scenes) {

let intro = "";
let ending = "";

if (language === "Hindi") {
intro = "दोस्तों, आज हम ${subject} के साथ एक शानदार adventure पर निकल रहे हैं।";
ending = "यह adventure सच में यादगार रहा। फिर मिलेंगे एक नई कहानी के साथ!";
} else if (language === "Bengali") {
intro = "বন্ধুরা, আজ আমরা ${subject}-এর সঙ্গে একটি দারুণ adventure-এ বেরিয়েছি।";
ending = "এই adventure সত্যিই অসাধারণ ছিল। আবার দেখা হবে নতুন গল্প নিয়ে!";
} else {
intro = "Today we are joining ${subject} on an incredible adventure.";
ending = "This adventure was truly unforgettable. See you in the next story!";
}

const dialogue = scenes
.map(scene => scene.dialogue)
.join(" ");

return `${intro}

${dialogue}

${ending}`;
}

/* =========================
MUSIC
========================= */

function createMusic(style, mood) {

return "Cinematic ${style.toLowerCase()} background music with a ${mood.toLowerCase()} atmosphere. Start softly, build energy during the middle section, add tension during the challenge, then finish with an emotional and memorable ending. Include subtle environmental sound effects and clean dialogue space.";
}

/* =========================
MASTER PROMPT
========================= */

function createMasterPrompt(
idea,
character,
style,
duration,
language,
aspect,
mood,
camera
) {

return `
Create a complete ${duration.toLowerCase()} ${style.toLowerCase()} video.

VIDEO IDEA:
${idea}

MAIN CHARACTER:
${character}

LANGUAGE:
${language}

MOOD:
${mood}

CAMERA:
${camera}

FORMAT:
${aspect}

Create a coherent story with five connected scenes.

Maintain strong character consistency across every scene.
Keep the same face, body, clothing, colors and identity.
Use cinematic composition, realistic lighting, natural movement,
professional camera work and smooth transitions.

Include:

- Strong opening hook
- Clear story progression
- Interesting middle section
- Conflict or surprise
- Satisfying ending
- Natural dialogue
- Voice-over friendly pacing
- Background music and environmental sound

Avoid:

- Random character changes
- Extra fingers or limbs
- Distorted faces
- Flickering objects
- Broken anatomy
- Text artifacts
- Watermarks
  `.trim();
  }

/* =========================
RENDER
========================= */

function renderProject(project) {

document.getElementById("resultTitle").textContent = project.title;

document.getElementById("story").innerHTML =
"<p>${escapeHTML(project.story)}</p>";

document.getElementById("character").innerHTML =
"<p>${escapeHTML(project.character)}</p>";

document.getElementById("voiceover").innerHTML =
"<p>${escapeHTML(project.voiceover)}</p>";

document.getElementById("music").innerHTML =
"<p>${escapeHTML(project.music)}</p>";

document.getElementById("masterPrompt").textContent =
project.masterPrompt;

const scenesContainer = document.getElementById("scenes");

scenesContainer.innerHTML = "";

project.scenes.forEach((scene) => {

const sceneElement = document.createElement("div");

sceneElement.className = "scene-card";

sceneElement.innerHTML = `
  <h4>🎬 Scene ${scene.number} — ${escapeHTML(scene.title)}</h4>

  <div class="scene-info">
    <strong>🖼️ Image Prompt</strong>
    <p>${escapeHTML(scene.imagePrompt)}</p>
  </div>

  <div class="scene-info">
    <strong>🎥 Video Prompt</strong>
    <p>${escapeHTML(scene.videoPrompt)}</p>
  </div>

  <div class="scene-info">
    <strong>🗣️ Dialogue</strong>
    <p>${escapeHTML(scene.dialogue)}</p>
  </div>

  <div class="scene-actions">
    <button onclick="copyScene(${scene.number - 1})">
      📋 Copy Scene
    </button>

    <button onclick="copyImagePrompt(${scene.number - 1})">
      🖼️ Copy Image Prompt
    </button>

    <button onclick="copyVideoPrompt(${scene.number - 1})">
      🎥 Copy Video Prompt
    </button>

    <button onclick="generateSceneImage(${scene.number - 1})">
      ✨ Generate Image
    </button>
  </div>

  <div id="scene-image-${scene.number - 1}"></div>
`;

scenesContainer.appendChild(sceneElement);

});
}

/* =========================
IMAGE PLACEHOLDER
========================= */

function generateSceneImage(index) {

if (!currentProject || !currentProject.scenes[index]) {
alert("Please generate a video concept first.");
return;
}

const scene = currentProject.scenes[index];

const box = document.getElementById("scene-image-${index}");

box.innerHTML = `
<div class="result-block" style="margin-top:15px;">
<h3>🖼️ Scene ${scene.number} Image</h3>

  <p>
    Your image prompt is ready.
    The real AI image API will be connected here next.
  </p>

  <button class="copy-btn" onclick="copyImagePrompt(${index})">
    📋 Copy Image Prompt
  </button>
</div>

`;
}

/* =========================
COPY FUNCTIONS
========================= */

function copyScene(index) {

const scene = currentProject?.scenes[index];

if (!scene) {
alert("Scene not found.");
return;
}

const text =
`SCENE ${scene.number} — ${scene.title}

IMAGE PROMPT:
${scene.imagePrompt}

VIDEO PROMPT:
${scene.videoPrompt}

DIALOGUE:
${scene.dialogue}`;

copyToClipboard(text);
}

function copyImagePrompt(index) {

const scene = currentProject?.scenes[index];

if (!scene) {
alert("Scene not found.");
return;
}

copyToClipboard(scene.imagePrompt);
}

function copyVideoPrompt(index) {

const scene = currentProject?.scenes[index];

if (!scene) {
alert("Scene not found.");
return;
}

copyToClipboard(scene.videoPrompt);
}

function copyMasterPrompt() {

if (!currentProject) {
alert("Please generate a concept first.");
return;
}

copyToClipboard(currentProject.masterPrompt);
}

function copyToClipboard(text) {

if (navigator.clipboard) {

navigator.clipboard.writeText(text)
  .then(() => alert("Copied! ✅"))
  .catch(() => fallbackCopy(text));

} else {
fallbackCopy(text);
}
}

function fallbackCopy(text) {

const textarea = document.createElement("textarea");

textarea.value = text;
document.body.appendChild(textarea);

textarea.select();

try {
document.execCommand("copy");
alert("Copied! ✅");
} catch {
alert("Copy failed. Please copy manually.");
}

textarea.remove();
}

/* =========================
SAVE CONCEPT
========================= */

function downloadConcept() {

if (!currentProject) {
alert("Please generate a concept first.");
return;
}

const text = `
VIDOAI VIDEO PROJECT

TITLE:
${currentProject.title}

IDEA:
${currentProject.idea}

STYLE:
${currentProject.style}

DURATION:
${currentProject.duration}

LANGUAGE:
${currentProject.language}

ASPECT:
${currentProject.aspect}

MOOD:
${currentProject.mood}

CAMERA:
${currentProject.camera}

STORY

${currentProject.story}

CHARACTER

${currentProject.character}

SCENES

${currentProject.scenes.map(scene => `
SCENE ${scene.number} — ${scene.title}

IMAGE PROMPT:
${scene.imagePrompt}

VIDEO PROMPT:
${scene.videoPrompt}

DIALOGUE:
${scene.dialogue}
`).join("\n")}

VOICE-OVER

${currentProject.voiceover}

MUSIC

${currentProject.music}

MASTER PROMPT

${currentProject.masterPrompt}
`;

const blob = new Blob([text], {
type: "text/plain;charset=utf-8"
});

const url = URL.createObjectURL(blob);

const link = document.createElement("a");

link.href = url;
link.download = "VidoAI-Project.txt";

document.body.appendChild(link);
link.click();
link.remove();

URL.revokeObjectURL(url);
}

/* =========================
HELPERS
========================= */

function makeTitle(idea) {

const words = idea
.replace(/[^\p{L}\p{N}\s]/gu, "")
.split(/\s+/)
.filter(Boolean)
.slice(0, 7);

if (!words.length) {
return "My Amazing VidoAI Video";
}

return words
.map(word => word.charAt(0).toUpperCase() + word.slice(1))
.join(" ") + " — VidoAI";
}

function getSubject(idea) {

const lower = idea.toLowerCase();

const subjects = [
"monkey",
"dog",
"cat",
"lion",
"tiger",
"elephant",
"bear",
"boy",
"girl",
"robot",
"superhero",
"vlogger",
"traveler"
];

for (const subject of subjects) {
if (lower.includes(subject)) {
return subject;
}
}

if (
idea.includes("बंदर") ||
idea.includes("বানর")
) {
return idea.includes("বানর") ? "বানর" : "बंदर";
}

return "the main character";
}

function aspectRatioName(language) {

const aspectElement = document.getElementById("aspect");

if (!aspectElement) {
return "9:16";
}

return aspectElement.value;
}

function escapeHTML(text) {

return String(text)
.replace(/&/g, "&")
.replace(/</g, "<")
.replace(/>/g, ">")
.replace(/"/g, """)
.replace(/'/g, "'");
}
