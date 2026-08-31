function generateVideo() {
  const idea = document.getElementById("idea").value.trim();
  const style = document.getElementById("style").value;
  const duration = document.getElementById("duration").value;
  const language = document.getElementById("language").value;

  if (!idea) {
    alert("Please enter your video idea!");
    return;
  }

  const title = makeTitle(idea);

  const scenes = [
    {
      name: "Scene 1 — The Beginning",
      visual: `A cinematic ${style.toLowerCase()} opening shot based on: ${idea}. Establish the location, main character, atmosphere and time of day.`,
      dialogue: "Welcome everyone! Today we are starting an incredible adventure."
    },
    {
      name: "Scene 2 — The Journey",
      visual: `A detailed ${style.toLowerCase()} scene showing the main character exploring the world connected to "${idea}". Dynamic camera movement, natural expressions, detailed environment.`,
      dialogue: "This place is amazing! I can't believe what I'm seeing."
    },
    {
      name: "Scene 3 — The Problem",
      visual: `A dramatic ${style.toLowerCase()} scene where an unexpected problem appears during the story. Strong emotions, cinematic lighting and expressive character reactions.`,
      dialogue: "Wait... something is not right!"
    },
    {
      name: "Scene 4 — The Action",
      visual: `An exciting ${style.toLowerCase()} action sequence where the main character tries to solve the problem. Fast camera movement, energetic atmosphere and cinematic composition.`,
      dialogue: "Don't worry! I've got an idea. Let's do this!"
    },
    {
      name: "Scene 5 — The Ending",
      visual: `A beautiful ${style.toLowerCase()} final scene showing the successful ending of the story. Emotional atmosphere, cinematic camera pull-back and memorable final frame.`,
      dialogue: "What an adventure! Thanks for watching. See you in the next vlog!"
    }
  ];

  let html = `
    <div class="scene">
      <h3>🎬 ${title}</h3>
      <p><strong>💡 Idea:</strong> ${escapeHTML(idea)}</p>
      <p><strong>🎨 Style:</strong> ${style}</p>
      <p><strong>⏱️ Duration:</strong> ${duration}</p>
      <p><strong>🌐 Language:</strong> ${language}</p>
    </div>

    <div class="scene">
      <h3>📖 Story</h3>
      <p>
        ${escapeHTML(idea)} becomes an exciting ${duration.toLowerCase()}
        ${style.toLowerCase()} story. The journey begins with an engaging
        introduction, develops through an unexpected challenge, and ends
        with a memorable conclusion.
      </p>
    </div>

    <h3 style="margin-top:25px;">🎞️ Scene Breakdown</h3>
  `;

  scenes.forEach((scene, index) => {
    html += `
      <div class="scene">
        <h3>${scene.name}</h3>

        <p>
          <strong>🎥 Visual Prompt:</strong><br>
          ${escapeHTML(scene.visual)}
        </p>

        <p>
          <strong>🗣️ Dialogue:</strong><br>
          ${escapeHTML(scene.dialogue)}
        </p>

        <button onclick="copyText(${index})" style="margin-top:10px;">
          📋 Copy Scene
        </button>

        <textarea id="scene-${index}" style="display:none;">${scene.visual}

${scene.dialogue}</textarea>
      </div>
    `;
  });

  html += `
    <div class="scene">
      <h3>🎙️ Voice-over Script</h3>
      <p>
        Welcome to our story! Today we are following
        ${escapeHTML(idea)}.
        Get ready for an exciting journey filled with surprises,
        action and unforgettable moments.
        Stay with us until the end!
      </p>
    </div>

    <div class="scene">
      <h3>🎵 Music Suggestion</h3>
      <p>
        Cinematic background music with an energetic introduction,
        rising tension during the problem, and an emotional ending.
      </p>
    </div>

    <div class="scene">
      <h3>🚀 Next Step</h3>
      <p>
        Your concept is ready. These scene prompts can later be connected
        to an AI image/video generation service.
      </p>
    </div>
  `;

  document.getElementById("output").innerHTML = html;
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("result").scrollIntoView({
    behavior: "smooth"
  });
}


function makeTitle(idea) {
  const words = idea
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6);

  if (!words.length) {
    return "My Amazing Video";
  }

  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") + " — VidoAI";
}


function copyText(index) {
  const text = document.getElementById(`scene-${index}`).value;

  navigator.clipboard.writeText(text)
    .then(() => {
      alert("Scene copied! ✅");
    })
    .catch(() => {
      alert("Copy failed. Please copy manually.");
    });
}


function escapeHTML(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
