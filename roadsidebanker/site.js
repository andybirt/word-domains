(function () {
  var ranks = [
    "Head of Pavement Operations",
    "Chief Inclusion Officer",
    "Director of Everyday Cash",
    "VP, Umbrella Branch",
    "Head of Roadside Treasury",
    "Senior Manager, Plastic Table"
  ];

  var desks = {
    withdrawals: "Withdrawals",
    deposits: "Deposits",
    transfers: "Transfers",
    umbrella: "Umbrella desk"
  };

  var examples = {
    withdrawals: [
      "Count it together. Then print the receipt.",
      "The cash is counted. The slip agrees."
    ],
    deposits: [
      "Deposit taken. Name checked. Next, please.",
      "Money in. Name on the slip. Done."
    ],
    transfers: [
      "Transfer sent. The slip is the record.",
      "It has gone. The paper says where."
    ],
    umbrella: [
      "Umbrella up. Terminal on. Pavement operations are open.",
      "The title is claimed. The next customer can step under."
    ]
  };

  var deskKeys = ["withdrawals", "deposits", "transfers", "umbrella"];
  var defaultShare = "Head of Pavement Operations. The desk is plastic. The branch is open.\n\nhttps://roadsidebanker.com/";
  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  var form = document.getElementById("titles");
  var nameInput = document.getElementById("person-name");
  var titleOut = document.getElementById("title-out");
  var deskOut = document.getElementById("desk-out");
  var exampleRow = document.getElementById("example-row");
  var exampleText = document.getElementById("example-text");
  var copyBtn = document.getElementById("copy-btn");
  var shareBtn = document.getElementById("share-btn");
  var copyStatus = document.getElementById("copy-status");
  var soonForm = document.getElementById("soon");
  var soonEmail = document.getElementById("soon-email");
  var soonStatus = document.getElementById("soon-status");
  var mailLink = document.getElementById("mail-link");

  function motionOk() {
    return !motionQuery.matches;
  }

  function rand(n) {
    if (window.crypto && crypto.getRandomValues) {
      var buf = new Uint32Array(1);
      crypto.getRandomValues(buf);
      return buf[0] % n;
    }
    return Math.floor(Math.random() * n);
  }

  function cleanName(value) {
    return String(value || "")
      .replace(/[\r\n\t]+/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim()
      .slice(0, 40);
  }

  function chosenDesk() {
    var picked = form.querySelector('input[name="desk"]:checked');
    var value = picked ? picked.value : "any";
    if (desks[value]) return value;
    return deskKeys[rand(deskKeys.length)];
  }

  function slipPlain() {
    var title = titleOut.textContent.trim();
    var desk = deskOut.textContent.trim();
    var line = exampleText.textContent.trim();
    if (!title || !line) return "";
    return title + "\n" + desk + "\n\nExample: " + line;
  }

  function paintShare() {
    var text = slipPlain();
    var payload = text ? text + "\n\nhttps://roadsidebanker.com/" : defaultShare;
    if (payload.length > 280) payload = payload.slice(0, 277).trim() + "…";
    shareBtn.href = "https://x.com/intent/tweet?text=" + encodeURIComponent(payload);
  }

  function paintMail() {
    var email = soonEmail.value.trim();
    var body = "Please tell me when I can find a roadside banker near me.";
    if (email) body += "\n\nMy email: " + email;
    mailLink.href =
      "mailto:hello@roadsidebanker.com?subject=" +
      encodeURIComponent("Find a roadside banker near me") +
      "&body=" +
      encodeURIComponent(body);
  }

  function pop() {
    if (!motionOk()) return;
    var slip = document.getElementById("slip");
    slip.classList.remove("pop");
    void slip.offsetWidth;
    slip.classList.add("pop");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = cleanName(nameInput.value);
    var desk = chosenDesk();
    var rank = ranks[rand(ranks.length)];
    var lines = examples[desk];
    titleOut.textContent = name ? name + ", " + rank : rank;
    deskOut.textContent = desks[desk];
    exampleText.textContent = lines[rand(lines.length)];
    exampleRow.hidden = false;
    paintShare();
    pop();
  });

  var copyNote = document.getElementById("copy-note");

  function markCopy(ok) {
    var message = ok ? "Copied." : "Not copied.";
    copyBtn.textContent = ok ? "Copied" : "Not copied";
    if (copyNote) copyNote.textContent = message;
    if (copyStatus) copyStatus.textContent = message;
    window.setTimeout(function () {
      copyBtn.textContent = "Copy";
    }, 1600);
  }

  function fallbackCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.left = "0";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.focus();
    area.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(area);
    return ok;
  }

  copyBtn.addEventListener("click", function () {
    var text = slipPlain();
    if (!text) {
      if (copyNote) copyNote.textContent = "Print a title first.";
      return;
    }
    var settled = false;
    function finish(ok) {
      if (settled) return;
      settled = true;
      markCopy(ok);
    }
    copyBtn.textContent = "Copying";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        finish(true);
      }, function () {
        finish(fallbackCopy(text));
      });
      window.setTimeout(function () {
        if (!settled) finish(fallbackCopy(text));
      }, 500);
      return;
    }
    finish(fallbackCopy(text));
  });

  soonForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!soonForm.reportValidity()) return;
    var email = soonEmail.value.trim();
    try {
      localStorage.setItem("roadsidebanker-spot", email);
    } catch (err) {
      soonStatus.textContent = "Could not hold it on this phone. The note link still works.";
      return;
    }
    soonStatus.textContent = "Held on this phone for " + email + ". Nothing was sent.";
  });

  soonEmail.addEventListener("input", paintMail);

  try {
    if (localStorage.getItem("roadsidebanker-spot")) {
      soonStatus.textContent = "A spot is already held on this phone. Nothing was sent.";
    }
  } catch (err) {}

  paintShare();
  paintMail();
})();
