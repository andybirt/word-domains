(function () {
  "use strict";

  var root = document.documentElement;
  var humanBtn = document.getElementById("voice-human");
  var caveBtn = document.getElementById("voice-caveman");
  var status = document.getElementById("mode-status");
  var form = document.getElementById("chopper");
  var note = document.getElementById("note");
  var output = document.getElementById("toy-out");
  var comic = document.querySelector(".comic");
  var countIn = document.getElementById("count-in");
  var countOut = document.getElementById("count-out");
  var countCut = document.getElementById("count-cut");
  var copyBtn = document.getElementById("copy-btn");
  var shareBtn = document.getElementById("share-btn");
  var copyStatus = document.getElementById("copy-status");
  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  var samples = {
    email:
      "Hello team, I hope this email finds you well. I just wanted to kindly ask whether you might have a moment to review the proposal when you get a chance. It would be really helpful if we could send the draft before Friday. Thanks so much in advance!",
    prompt:
      "Could you please write a really comprehensive summary of the important document? The huge problem with the urgent meeting is terrible. Sorry, and thanks.",
    status:
      "Hi, I just wanted to circle back on the Q3 update. The large launch is going really well, but we have a terrible problem with the timeline, and I think we should meet to align."
  };

  function motionOk() {
    return !motionQuery.matches;
  }

  function currentMode() {
    return root.dataset.mode === "caveman" ? "caveman" : "human";
  }

  function strength() {
    var picked = form.querySelector('input[name="strength"]:checked');
    return picked ? picked.value : "grug";
  }

  function applyMode(mode, announce) {
    var caveman = mode === "caveman";
    root.dataset.mode = caveman ? "caveman" : "human";
    humanBtn.setAttribute("aria-pressed", caveman ? "false" : "true");
    caveBtn.setAttribute("aria-pressed", caveman ? "true" : "false");
    var theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.setAttribute("content", caveman ? "#2a211c" : "#f6e4bc");
    document.title = caveman ? "Caveman Speak Generator. Small talk get small." : "Caveman Speak Generator";
    try {
      localStorage.setItem("cavemanspeak-voice", root.dataset.mode);
    } catch (err) {}
    if (announce && status) {
      status.textContent = caveman ? "Caveman voice on." : "Human voice on.";
    }
    if (announce && motionOk()) {
      var page = document.getElementById("main");
      page.classList.remove("shake");
      void page.offsetWidth;
      page.classList.add("shake");
    }
    paintShare(output.textContent);
  }

  function countWords(text) {
    var found = String(text).match(/[A-Za-z0-9'’$-]+/g);
    return found ? found.length : 0;
  }

  var bonkToken = 0;

  function showChopped(text) {
    var token = ++bonkToken;
    output.classList.remove("pop");
    function land() {
      if (token !== bonkToken) return;
      output.textContent = text;
      copyBtn.disabled = !/[A-Za-z0-9]/.test(text);
      paintShare(text);
      if (motionOk()) {
        void output.offsetWidth;
        output.classList.add("pop");
      }
    }
    if (!motionOk()) {
      land();
      return;
    }
    comic.classList.remove("is-bonked");
    void comic.offsetWidth;
    comic.classList.add("is-bonked");
    window.setTimeout(land, 280);
  }

  function paintShare(text) {
    var line = String(text || "").replace(/\s+/g, " ").trim();
    if (!/[A-Za-z0-9]/.test(line) || /^(Nothing to cut|No word in|Too many word|That note is over)/.test(line)) {
      line = "Small talk got smaller.";
    }
    if (line.length > 220) line = line.slice(0, 217).trim() + "…";
    var payload = line + "\n\nhttps://cavemanspeak.com/";
    shareBtn.href = "https://x.com/intent/tweet?text=" + encodeURIComponent(payload);
  }

  function runChop(raw) {
    var trimmed = String(raw || "").trim();
    if (!trimmed) {
      countIn.textContent = "0";
      countOut.textContent = "0";
      countCut.textContent = "0";
      showChopped(currentMode() === "caveman" ? "No word in. Paste note first." : "Nothing to cut. Paste a note first.");
      return;
    }
    if (trimmed.length > 4000) {
      showChopped(currentMode() === "caveman" ? "Too many word. Paste less." : "That note is over 4,000 characters. Paste a shorter one.");
      return;
    }
    var chopped = cavemanize(trimmed, strength());
    var inn = countWords(trimmed);
    var out = countWords(chopped);
    countIn.textContent = String(inn);
    countOut.textContent = String(out);
    countCut.textContent = String(Math.max(inn - out, 0));
    showChopped(
      chopped ||
        (currentMode() === "caveman" ? "Nothing left. Note was all manner." : "Nothing left. That note was made of manners.")
    );
  }

  humanBtn.addEventListener("click", function () {
    applyMode("human", true);
  });
  caveBtn.addEventListener("click", function () {
    applyMode("caveman", true);
  });

  [humanBtn, caveBtn].forEach(function (button, index, buttons) {
    button.addEventListener("keydown", function (event) {
      var key = event.key;
      if (key !== "ArrowRight" && key !== "ArrowLeft" && key !== "ArrowDown" && key !== "ArrowUp") return;
      event.preventDefault();
      var next = buttons[(index + 1) % buttons.length];
      next.focus();
      next.click();
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    runChop(note.value);
  });

  note.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  Array.prototype.forEach.call(document.querySelectorAll("[data-sample]"), function (button) {
    button.addEventListener("click", function () {
      note.value = samples[button.getAttribute("data-sample")] || "";
      runChop(note.value);
    });
  });

  copyBtn.addEventListener("click", function () {
    var text = output.textContent.trim();
    if (!text) return;
    function done() {
      copyBtn.textContent = "Copied";
      if (copyStatus) copyStatus.textContent = "Copied.";
      window.setTimeout(function () {
        copyBtn.textContent = "Copy";
      }, 1400);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () {
        copyStatus.textContent = "Copy failed.";
      });
      return;
    }
    copyStatus.textContent = "Copy failed.";
  });

  var requested = "";
  try {
    requested = new URLSearchParams(window.location.search).get("voice") || "";
  } catch (err) {
    requested = "";
  }
  if (requested === "human" || requested === "caveman") applyMode(requested, false);
  else applyMode(currentMode(), false);
})();
