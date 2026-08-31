function generateVideo() {
  const idea = document.getElementById("idea").value.trim();
  const style = document.getElementById("style").value;
  const duration = document.getElementById("duration").value;
  const language = document.getElementById("language").value;

  if (!idea) {
    alert("Please enter your video idea first!");
    return;
  }

  const title = createTitle(idea);

  const scenes = [
    {
      title: "Scene 1 — Opening",
      visual: `Cinematic ${style} shot introducing: ${idea}`,
      dialogue: "Welcome to our amazing story!"
    },
    {
      title: "Scene 2 — The Journey",
      visual: `Detailed ${style} scene showing the main character experiencing the beginning of the adventure.`,
      dialogue: "Something unexpected is about to happen..."
    },
    {
      title: "Scene 3 — The Problem",
      visual: `Dramatic ${style} scene showing a surprising challenge related to the idea.`,
      dialogue: "Oh no! This was not part of the plan."
    },
    {
      title: "Scene 4 — The Action",
      visual: `Dynamic ${style} action sequence with expressive characters and cinematic camera movement.`,
      dialogue: "We have to do something now!"
    },
    {
      title: "Scene 5 — Ending",
      visual: `Beautiful cinematic ${style} ending with a memorable final shot.`,
      dialogue: "And that is how our story ends. See you next time!"
    }
  ];

  let html = `
    <h2>🎬 ${title}</h2>

    <p><strong>💡 Idea:</strong> ${idea}</p>
    <p><strong>🎨 Style:</strong> ${style}</p>
    <p><strong>⏱️ Duration:</strong> ${duration}</p>
    <p><strong>🌐 Language:</strong> ${language}</p>

    <hr style="margin:20px 0; opacity:.2;">

    <h3>📖 Story</h3>
    <p>
      This ${duration.toLowerCase()} ${style.toLowerCase()} video follows
      the idea of "${idea}". The story begins with an exciting introduction,
      develops through an unexpected challenge, and ends with a memorable moment.
    </p>

    <h3 style="margin-top:25px;">🎞️ Scenes</h3>
  `;

  scenes.forEach(scene => {
    html += `
      <div class="scene">
        <h3>${scene.title}</h3>
        <p><strong>🎥 Visual Prompt:</strong> ${scene.visual}</p>
        <p><strong>🗣️ Dialogue:</strong> ${scene.dialogue}</p>
      </div>
    `;
  });

  html += `
    <div class="scene">
      <h3>🎙️ Voice-over Script</h3>
      <p>
        Imagine a world where every idea can become a story.
        Our adventure begins with ${idea}.
        Follow the journey, discover the challenge,
        and experience the exciting ending.
      </p>
    </div>

    <div class="scene">
      <h3>🎵 Music Suggestion</h3>
      <p>Epic cinematic background music with an energetic build-up and emotional ending.</p>
    </div>
  `;

  document.getElementById("output").innerHTML = html;
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("result").scrollIntoView({
    behavior: "smooth"
  });
}

function createTitle(idea) {
  const words = idea
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6);

  if (words.length === 0) {
    return "My Amazing Video";
  }

  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
