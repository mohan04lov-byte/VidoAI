let currentProject = null;

function generateVideo() {
const ideaEl = document.getElementById("idea");
const styleEl = document.getElementById("style");
const durationEl = document.getElementById("duration");
const languageEl = document.getElementById("language");
const aspectEl = document.getElementById("aspect");
const moodEl = document.getElementById("mood");
const cameraEl = document.getElementById("camera");

if (!ideaEl) {
alert("VidoAI error: Idea box not found.");
return;
}

const idea = ideaEl.value.trim();

if (!idea) {
alert("Please enter your video idea first! 💡");
ideaEl.focus();
return;
}

const style = styleEl ? styleEl.value : "Cinematic";
const duration = durationEl ? durationEl.value : "30 Seconds";
const language = languageEl ? languageEl.value : "English";
const aspect = aspectEl ? aspectEl.value : "9:16";
const mood = moodEl ? moodEl.value : "Energetic";
const camera = cameraEl ? cameraEl.value : "Cinematic slow movement";

const button = document.getElementById("generateBtn");
const loading = document.getElementById("loading");
const result = document.getElementById("result");
const loadingText = document.getElementById("loadingText");
const progressBar = document.getElementById("progressBar");

if (!button || !loading || !result) {
alert("VidoAI page is not loaded correctly. Please refresh.");
return;
}

button.disabled = true;
button.textContent = "⏳ Creating...";

loading.classList.remove("hidden");
result.classList.add("hidden");

if (progressBar) {
progressBar.style.width = "0%";
}

const steps = [
"Understanding your idea...",
"Building the story...",
"Creating the character...",
"Designing 5 scenes...",
"Writing cinematic prompts...",
"Preparing voice-over...",
"Finishing your project..."
];

let step = 0;

const interval = setInterval(() => {
if (step < steps.length) {
if (loadingText) {
loadingText.textContent = steps[step];
}

  step++;

  if (progressBar) {
    progressBar.style.width =
      Math.min(95, Math.round((step / steps.length) * 100)) + "%";
  }
}

}, 350);

setTimeout(() => {
clearInterval(interval);

try {
  currentProject = createProject({
    idea,
    style,
    duration,
    language,
    aspect,
    mood,
    camera
  });

  renderProject(currentProject);

  if (progressBar) {
    progressBar.style.width = "100%";
  }

  if (loadingText) {
    loadingText.textContent = "Your video concept is ready! 🎉";
  }

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

} catch (error) {
  console.error("VidoAI Error:", error);

  loading.classList.add("hidden");
  button.disabled = false;
  button.textContent = "🚀 Generate Video Concept";

  alert("Something went wrong. Please refresh the page and try again.");
}

}, 2800);
}

/* =========================
PROJECT CREATOR
========================= */

function createProject(data) {
const {
idea,
style,
duration,
language,
aspect,
mood,
camera
} = data;

const title = makeTitle(idea);
const subject = getSubject(idea);

const character = createCharacter(subject, style);

const scenes = createScenes({
idea,
subject,
character,
style,
duration,
language,
aspect,
mood,
camera
});

const story = createStory(
idea,
subject,
duration,
mood,
language
);

const voiceover = createVoiceover(
subject,
idea,
language,
scenes
);

const music = createMusic(style, mood);

const masterPrompt = createMasterPrompt({
idea,
character,
style,
duration,
language,
aspect,
mood,
camera
});

return {
title,
idea,
style,
duration,
language,
aspect,
mood,
camera,
subject,
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
return "A funny and expressive ${style.toLowerCase()} monkey vlogger with intelligent eyes, natural facial expressions, consistent face and body, wearing a stylish vlog outfit and holding a compact camera. The monkey must look identical in every scene.";
}

return "The main character connected to "${subject}", designed in a ${style.toLowerCase()} visual style with a consistent face, body, clothing and identity in every scene. Natural expressions, realistic movement and cinematic presence.";
}

/* =========================
STORY
========================= */

function createStory(
idea,
subject,
duration,
mood,
language
) {
if (language === "Hindi") {
return `
${subject} की कहानी "${idea}" से शुरू होती है।

शुरुआत में audience को character और उसकी दुनिया से introduce किया जाता है।

इसके बाद ${subject} adventure पर निकलता है और रास्ते में एक unexpected situation सामने आती है।

समस्या कहानी में excitement और tension पैदा करती है।

${subject} हिम्मत और creativity से situation को solve करने की कोशिश करता है।

अंत में एक memorable और ${mood.toLowerCase()} ending होती है, जिससे audience अगले adventure का इंतजार करती है।
`.trim();
}

if (language === "Bengali") {
return `
"${idea}"-কে কেন্দ্র করে ${subject}-এর গল্প শুরু হয়।

প্রথমে audience-এর সঙ্গে character এবং তার surroundings-এর পরিচয় করানো হয়।

এরপর ${subject} adventure-এ বেরিয়ে পড়ে এবং একটি unexpected situation-এর মুখোমুখি হয়।

সমস্যাটি গল্পে excitement এবং tension তৈরি করে।

${subject} সাহস এবং creativity ব্যবহার করে সমস্যাটি সমাধান করার চেষ্টা করে।

শেষে একটি memorable এবং ${mood.toLowerCase()} ending আসে।
`.trim();
}

return `
The story begins with ${subject} in a world connected to "${idea}".

The opening introduces the main character, location and atmosphere.

The character starts an exciting journey and discovers something unexpected.

A problem appears and creates tension.

${subject} uses courage and creativity to solve the situation.

The story ends with a memorable ${mood.toLowerCase()} conclusion that makes the audience want another adventure.
`.trim();
}

/* =========================
SCENES
========================= */

function createScenes(data) {
const {
idea,
subject,
character,
style,
duration,
language,
aspect,
mood,
camera
} = data;

const sceneData = [
{
title: "The Beginning",
action: "Introduce ${subject}, the location and the world of "${idea}".",
dialogue: getDialogue(language, 1)
},
{
title: "The Journey",
action: "${subject} explores the environment and discovers interesting details related to "${idea}".",
dialogue: getDialogue(language, 2)
},
{
title: "The Problem",
action: "An unexpected problem suddenly appears and changes the direction of the adventure.",
dialogue: getDialogue(language, 3)
},
{
title: "The Action",
action: "${subject} takes action and attempts to solve the problem in an exciting way.",
dialogue: getDialogue(language, 4)
},
{
title: "The Ending",
action: "${subject} successfully completes the adventure and reaches a memorable final moment.",
dialogue: getDialogue(language, 5)
}
];

return sceneData.map((scene, index) => {
const visualPrompt = `
${style} cinematic scene.

MAIN CHARACTER:
${character}

SCENE:
${scene.action}

ORIGINAL IDEA:
${idea}

MOOD:
${mood}

CAMERA:
${camera}

LANGUAGE:
${language}

ASPECT RATIO:
${aspect}

Create a highly detailed environment with cinematic lighting,
natural expressions, realistic body movement, professional composition,
depth of field and smooth visual quality.

Maintain exactly the same character identity, face, body,
clothing, colors and accessories across every scene.

No random character changes.
No distorted face.
No extra fingers or limbs.
No text.
No watermark.
`.trim();

const imagePrompt = `

Create a high-quality cinematic keyframe image.

${visualPrompt}

Focus on the main character and environment.
Photorealistic details, natural lighting and professional framing.
`.trim();

const videoPrompt = `

Create a ${duration.toLowerCase()} AI video shot.

${visualPrompt}

Use smooth ${camera.toLowerCase()} movement.
Natural character animation and realistic interaction with the environment.
Keep continuity with the previous and next scenes.
`.trim();

return {
  number: index + 1,
  title: scene.title,
  action: scene.action,
  visual: visualPrompt,
  imagePrompt,
  videoPrompt,
  dialogue: scene.dialogue
};

});
}

/* =========================
DIALOGUE
========================= */

function getDialogue(language, number) {
const dialogues = {
English: [
"Hello everyone! Our adventure starts right here.",
"Wow! This place is amazing. Let's see what happens next!",
"Wait... something unexpected just happened!",
"I have an idea. Let's solve this together!",
"What an adventure! Thanks for watching!"
],

Hindi: [
  "नमस्ते दोस्तों! हमारा adventure यहीं से शुरू होता है।",
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

const list = dialogues[language] || dialogues.English;

return list[number - 1];
}

/* =========================
VOICEOVER
========================= */

function createVoiceover(
subject,
idea,
language,
scenes
) {
let intro;
let ending;

if (language === "Hindi") {
intro = "दोस्तों, आज हम ${subject} के साथ "${idea}" से जुड़ी एक शानदार adventure पर निकल रहे हैं।";
ending = "यह adventure सच में यादगार रहा। फिर मिलेंगे एक नई कहानी के साथ!";
} else if (language === "Bengali") {
intro = "বন্ধুরা, আজ আমরা ${subject}-এর সঙ্গে "${idea}" নিয়ে একটি দারুণ adventure-এ বেরিয়েছি।";
ending = "এই adventure সত্যিই অসাধারণ ছিল। আবার দেখা হবে নতুন গল্প নিয়ে!";
} else {
intro = "Today we are joining ${subject} on an incredible adventure based on "${idea}".";
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
return `
Cinematic ${style.toLowerCase()} background music with a ${mood.toLowerCase()} atmosphere.

Start with a strong opening, gradually build energy,
increase tension during the problem,
add energetic music during the action,
and finish with an emotional memorable ending.

Include subtle environmental sounds and clear space for dialogue.
`.trim();
}

/* =========================
MASTER PROMPT
========================= */

function createMasterPrompt(data) {
const {
idea,
character,
style,
duration,
language,
aspect,
mood,
camera
} = data;

return `
Create a complete ${duration.toLowerCase()} ${style.toLowerCase()} AI video.

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

Create five connected cinematic scenes:

1. Strong opening hook.
2. Character journey.
3. Unexpected problem.
4. Exciting action.
5. Memorable ending.

CHARACTER CONSISTENCY:
Keep the exact same face, body, clothing,
colors, accessories and identity throughout the entire video.

VISUAL QUALITY:
Cinematic lighting, realistic movement,
natural expressions, detailed environment,
professional camera composition and smooth transitions.

NEGATIVE PROMPT:
No distorted faces.
No extra fingers.
No extra limbs.
No broken anatomy.
No random characters.
No flickering.
No text artifacts.
No watermark.
`.trim();
}

/* =========================
RENDER
========================= */

function renderProject(project) {
const title = document.getElementById("resultTitle");
const story = document.getElementById("story");
const character = document.getElementById("character");
const voiceover = document.getElementById("voiceover");
const music = document.getElementById("music");
const masterPrompt = document.getElementById("masterPrompt");
const scenesContainer = document.getElementById("scenes");

if (
!title ||
!story ||
!character ||
!voiceover ||
!music ||
!masterPrompt ||
!scenesContainer
) {
throw new Error("Result elements are missing from index.html.");
}

title.textContent = project.title;

story.innerHTML =
"<p>${escapeHTML(project.story)}</p>";

character.innerHTML =
"<p>${escapeHTML(project.character)}</p>";

voiceover.innerHTML =
"<p>${escapeHTML(project.voiceover)}</p>";

music.innerHTML =
"<p>${escapeHTML(project.music)}</p>";

masterPrompt.value = project.masterPrompt;

scenesContainer.innerHTML = "";

project.scenes.forEach(scene => {
const card = document.createElement("div");

card.className = "scene-card";

card.innerHTML = `
  <h4>
    🎬 Scene ${scene.number} — ${escapeHTML(scene.title)}
  </h4>

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

scenesContainer.appendChild(card);

});
}

/* =========================
IMAGE PLACEHOLDER
========================= */

function generateSceneImage(index) {
if (!currentProject || !currentProject.scenes[index]) {
alert("Please generate your video concept first.");
return;
}

const scene = currentProject.scenes[index];

const box = document.getElementById(
"scene-image-${index}"
);

if (!box) return;

box.innerHTML = `
<div class="result-block">

  <h3>🖼️ Scene ${scene.number} Image</h3>

  <p>
    Your AI image prompt is ready.
    Real AI image generation will be connected next.
  </p>

  <button onclick="copyImagePrompt(${index})">
    📋 Copy Image Prompt
  </button>

</div>

`;
}

/* =========================
COPY
========================= */

function copyScene(index) {
if (!currentProject) return;

const scene = currentProject.scenes[index];

if (!scene) return;

const text = `
SCENE ${scene.number} — ${scene.title}

IMAGE PROMPT:
${scene.imagePrompt}

VIDEO PROMPT:
${scene.videoPrompt}

DIALOGUE:
${scene.dialogue}
`.trim();

copyToClipboard(text);
}

function copyImagePrompt(index) {
if (!currentProject) return;

const scene = currentProject.scenes[index];

if (!scene) return;

copyToClipboard(scene.imagePrompt);
}

function copyVideoPrompt(index) {
if (!currentProject) return;

const scene = currentProject.scenes[index];

if (!scene) return;

copyToClipboard(scene.videoPrompt);
}

function copyMasterPrompt() {
if (!currentProject) {
alert("Please generate a video concept first.");
return;
}

copyToClipboard(currentProject.masterPrompt);
}

function copyToClipboard(text) {
if (navigator.clipboard && window.isSecureContext) {
navigator.clipboard
.writeText(text)
.then(() => {
alert("Copied! ✅");
})
.catch(() => {
fallbackCopy(text);
});
} else {
fallbackCopy(text);
}
}

function fallbackCopy(text) {
const textarea = document.createElement("textarea");

textarea.value = text;
textarea.style.position = "fixed";
textarea.style.left = "-9999px";

document.body.appendChild(textarea);

textarea.focus();
textarea.select();

try {
document.execCommand("copy");
alert("Copied! ✅");
} catch (error) {
alert("Copy failed. Please copy manually.");
}

textarea.remove();
}

/* =========================
DOWNLOAD
========================= */

function downloadConcept() {
if (!currentProject) {
alert("Please generate a video concept first.");
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

ASPECT RATIO:
${currentProject.aspect}

MOOD:
${currentProject.mood}

CAMERA:
${currentProject.camera}

STORY

${currentProject.story}

MAIN CHARACTER

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

`).join("")}

VOICE-OVER

${currentProject.voiceover}

MUSIC

${currentProject.music}

MASTER PROMPT

${currentProject.masterPrompt}
`;

const blob = new Blob(
[text],
{
type: "text/plain;charset=utf-8"
}
);

const url = URL.createObjectURL(blob);

const link = document.createElement("a");

link.href = url;
link.download = "VidoAI-Video-Project.txt";

document.body.appendChild(link);

link.click();

link.remove();

URL.revokeObjectURL(url);
}

/* =========================
TITLE
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
.map(word =>
word.charAt(0).toUpperCase() + word.slice(1)
)
.join(" ") + " — VidoAI";
}

/* =========================
SUBJECT
========================= */

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

if (idea.includes("बंदर")) {
return "बंदर";
}

if (idea.includes("বানর")) {
return "বানর";
}

return "the main character";
}

/* =========================
HTML SECURITY
========================= */

function escapeHTML(text) {
return String(text)
.replace(/&/g, "&")
.replace(/</g, "<")
.replace(/>/g, ">")
.replace(/"/g, """)
.replace(/'/g, "'");
}
