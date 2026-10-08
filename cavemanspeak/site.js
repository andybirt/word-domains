(function () {
  "use strict";

  var root = document.documentElement;
  var humanBtn = document.getElementById("voice-human");
  var caveBtn = document.getElementById("voice-caveman");
  var status = document.getElementById("mode-status");
  var form = document.getElementById("chopper");
  var note = document.getElementById("note");
  var hint = document.getElementById("toy-hint");
  var output = document.getElementById("toy-out");
  var stage = document.getElementById("toy-stage");
  var countIn = document.getElementById("count-in");
  var countOut = document.getElementById("count-out");
  var countCut = document.getElementById("count-cut");
  var loadSample = document.getElementById("load-sample");
  var clearNote = document.getElementById("clear-note");

  var sample =
    "Hello team, I hope this email finds you well. I just wanted to kindly ask whether you might have a moment to review the proposal when you get a chance. It would be really helpful if we could send the draft before Friday. Thanks so much in advance!";

  function currentMode() {
    return root.dataset.mode === "caveman" ? "caveman" : "human";
  }

  function applyMode(mode, announce) {
    var caveman = mode === "caveman";
    root.dataset.mode = caveman ? "caveman" : "human";
    humanBtn.setAttribute("aria-pressed", caveman ? "false" : "true");
    caveBtn.setAttribute("aria-pressed", caveman ? "true" : "false");
    var theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.setAttribute("content", caveman ? "#140e0a" : "#efe6d6");
    document.title = caveman
      ? "Caveman speak — small talk get small"
      : "Caveman speak — small talk got smaller";
    try {
      localStorage.setItem("cavemanspeak-voice", root.dataset.mode);
    } catch (err) {
      /* Storage can be blocked. The toggle still works for this visit. */
    }
    if (announce && status) {
      status.textContent = caveman ? "Caveman voice on." : "Human voice on.";
    }
  }

  function countWords(text) {
    var found = String(text).match(/[A-Za-z0-9'’$-]+/g);
    return found ? found.length : 0;
  }

  function cavemanize(input) {
    var text = String(input).replace(/\r\n/g, "\n");
    var cuts = [
      /i hope this (?:e-?mail|note|message) finds you well[.!]*/gi,
      /thanks so much(?: in advance)?[.!]*/gi,
      /thank you so much(?: in advance)?[.!]*/gi,
      /please don[’']t hesitate to reach out(?: if anything is unclear)?[.!]*/gi,
      /no rush at all[,.!]*/gi,
      /it would be (?:really |very )?helpful if we could/gi,
      /so (?:that )?we can make sure we(?:'re| are|’re) all/gi,
      /i was (?:just )?wondering if/gi,
      /(?:kindly )?ask whether you might have a moment to/gi,
      /whether you might have a moment to/gi,
      /if you might have a moment to/gi,
      /when you get a chance/gi,
      /i just wanted to/gi,
      /just wanted to/gi,
      /take a look at/gi,
      /circle back on/gi,
      /\bkindly\b/gi
    ];
    cuts.forEach(function (pattern) {
      text = text.replace(pattern, " ");
    });
    text = text.replace(/\b(?:a|an|the|just|really|basically|actually|very|so|please|hi|hello)\b/gi, " ");
    text = text
      .replace(/[ \t]{2,}/g, " ")
      .replace(/[ \t]*\n[ \t]*/g, "\n")
      .replace(/\s+([,.;!?])/g, "$1")
      .replace(/([,.;!?])\1+/g, "$1")
      .replace(/(^|\n)[\s,]+/g, "$1")
      .split("\n")
      .map(function (line) {
        return line.trim();
      })
      .filter(function (line) {
        return /[A-Za-z0-9]/.test(line);
      })
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    text = text.replace(/(^|[.!?]\s+)but\s+/gi, "$1");
    text = text.replace(/(^|[.!?]\s+)([a-z])/g, function (_, lead, letter) {
      return lead + letter.toUpperCase();
    });
    return text;
  }

  function syncExample() {
    var before = document.getElementById("before-copy").innerText;
    var after = document.getElementById("after-copy").innerText;
    var inn = countWords(before);
    var out = countWords(after);
    var saved = Math.max(inn - out, 0);
    document.getElementById("jar-in").textContent = String(inn);
    document.getElementById("jar-out").textContent = String(out);
    document.getElementById("jar-saved").textContent = String(saved);
    var fill = document.getElementById("bar-fill");
    var pct = inn === 0 ? 0 : Math.round((out / inn) * 1000) / 10;
    fill.style.width = Math.max(pct, out ? 6 : 0) + "%";
    document.getElementById("bar").setAttribute(
      "aria-label",
      out + " of " + inn + " words remain in the made-up example."
    );
  }

  function resetToy() {
    note.value = "";
    output.textContent = "";
    hint.hidden = false;
    stage.classList.remove("is-ready");
    countIn.textContent = "—";
    countOut.textContent = "—";
    countCut.textContent = "—";
  }

  function runChop(raw) {
    var trimmed = raw.trim();
    hint.hidden = true;
    stage.classList.add("is-ready");
    if (!trimmed) {
      countIn.textContent = "0";
      countOut.textContent = "0";
      countCut.textContent = "0";
      output.textContent =
        currentMode() === "caveman"
          ? "No word in. Paste note first."
          : "Nothing to cut. Paste a note first.";
      return;
    }
    if (trimmed.length > 4000) {
      output.textContent =
        currentMode() === "caveman"
          ? "Too many word. Paste less."
          : "That note is over 4,000 characters. Paste a shorter one.";
      return;
    }
    var chopped = cavemanize(trimmed);
    var inn = countWords(trimmed);
    var out = countWords(chopped);
    countIn.textContent = String(inn);
    countOut.textContent = String(out);
    countCut.textContent = String(Math.max(inn - out, 0));
    output.textContent =
      chopped ||
      (currentMode() === "caveman"
        ? "Nothing left. Note was all manner."
        : "Nothing left. That note was made of manners.");
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
      if (key !== "ArrowRight" && key !== "ArrowLeft" && key !== "ArrowDown" && key !== "ArrowUp") {
        return;
      }
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

  loadSample.addEventListener("click", function () {
    note.value = sample;
    note.focus();
  });

  clearNote.addEventListener("click", function () {
    resetToy();
    note.focus();
  });

  var requested = "";
  try {
    requested = new URLSearchParams(window.location.search).get("voice") || "";
  } catch (err) {
    requested = "";
  }
  if (requested === "human" || requested === "caveman") {
    applyMode(requested, false);
  } else {
    applyMode(currentMode(), false);
  }
  syncExample();
})();
