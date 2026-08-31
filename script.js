function generateVideo() {
  const idea = document.getElementById("idea").value.trim();

  if (!idea) {
    alert("Please enter your video idea!");
    return;
  }

  const result = document.getElementById("result");
  const output = document.getElementById("output");

  output.innerHTML = `
    <h2>🎬 Video Generated!</h2>
    <p><strong>Your Idea:</strong> ${idea}</p>
    <p>✅ JavaScript is working!</p>
    <p>🎞️ VidoAI is ready for the next upgrade.</p>
  `;

  result.classList.remove("hidden");
  result.scrollIntoView({ behavior: "smooth" });
}
