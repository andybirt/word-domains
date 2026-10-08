(function (root) {
  "use strict";

  var IRREGULAR = {
    sent: "send",
    went: "go",
    gone: "go",
    going: "go",
    saw: "see",
    seen: "see",
    did: "",
    done: "do",
    doing: "do",
    made: "make",
    making: "make",
    got: "get",
    getting: "get",
    came: "come",
    coming: "come",
    took: "take",
    taken: "take",
    taking: "take",
    gave: "give",
    given: "give",
    giving: "give",
    told: "tell",
    telling: "tell",
    said: "say",
    saying: "say",
    wrote: "write",
    written: "write",
    writing: "write",
    thought: "think",
    thinking: "think",
    found: "find",
    finding: "find",
    left: "leave",
    leaving: "leave",
    felt: "feel",
    feeling: "feel",
    knew: "know",
    known: "know",
    knowing: "know",
    kept: "keep",
    keeping: "keep",
    brought: "bring",
    bringing: "bring",
    bought: "buy",
    buying: "buy",
    paid: "pay",
    paying: "pay",
    met: "meet",
    ran: "run",
    running: "run",
    sat: "sit",
    sitting: "sit",
    spoke: "speak",
    spoken: "speak",
    speaking: "speak",
    understood: "understand",
    understanding: "understand",
    looked: "look",
    looking: "look",
    wanted: "want",
    wanting: "want",
    asked: "ask",
    asking: "ask",
    called: "call",
    calling: "call",
    needed: "need",
    needing: "need",
    tried: "try",
    trying: "try",
    used: "use",
    using: "use",
    worked: "work",
    working: "work",
    started: "start",
    starting: "start",
    moved: "move",
    moving: "move",
    helped: "help",
    helping: "help",
    showed: "show",
    showing: "show",
    included: "include",
    including: "include",
    attached: "attach",
    attaching: "attach",
    shared: "share",
    sharing: "share",
    updated: "update",
    updating: "update",
    scheduled: "schedule",
    scheduling: "schedule",
    discussed: "discuss",
    discussing: "discuss",
    reviewed: "review",
    reviewing: "review",
    approved: "approve",
    approving: "approve",
    launched: "launch",
    launching: "launch",
    shipped: "ship",
    shipping: "ship",
    fixed: "fix",
    fixing: "fix",
    finished: "finish",
    finishing: "finish",
    completed: "complete",
    completing: "complete",
    created: "create",
    creating: "create",
    added: "add",
    adding: "add",
    changed: "change",
    changing: "change",
    received: "receive",
    receiving: "receive",
    delivered: "deliver",
    delivering: "deliver",
    submitted: "submit",
    submitting: "submit",
    signed: "sign",
    signing: "sign",
    joined: "join",
    joining: "join",
    followed: "follow",
    following: "follow",
    waited: "wait",
    waiting: "wait",
    checked: "check",
    checking: "check",
    flagged: "flag",
    flagging: "flag",
    capped: "cap",
    announced: "announce",
    announcing: "announce",
    thrilled: "",
    excited: "",
    grateful: ""
  };

  var ING_NOUN = {
    meeting: 1,
    meetings: 1,
    building: 1,
    marketing: 1,
    something: 1,
    anything: 1,
    everything: 1,
    nothing: 1,
    morning: 1,
    evening: 1,
    warning: 1,
    timing: 1,
    upcoming: 1,
    interesting: 1,
    billing: 1,
    onboarding: 1,
    pricing: 1,
    closing: 1,
    processing: 1,
    missing: 1
  };

  var PRONOUN = {
    i: "me",
    im: "me",
    "i'm": "me",
    ive: "me",
    "i've": "me",
    id: "me",
    "i'd": "me",
    we: "me",
    "we're": "me",
    "we've": "me",
    "we'd": "me",
    us: "me",
    you: "you",
    "you're": "you",
    "you've": "you",
    "you'd": "you"
  };

  var FILLER_PRONOUN = {
    my: 1, mine: 1, our: 1, ours: 1, your: 1, yours: 1, their: 1, theirs: 1
  };

  var DROP = {
    a: 1, an: 1, the: 1,
    to: 1, of: 1, for: 1, in: 1, on: 1, at: 1, by: 1, with: 1, from: 1,
    into: 1, through: 1, thru: 1, about: 1, over: 1, under: 1, as: 1,
    via: 1, per: 1, than: 1, onto: 1, upon: 1, within: 1, without: 1,
    across: 1, during: 1, between: 1, among: 1, around: 1, against: 1,
    up: 1, out: 1, off: 1, down: 1, back: 1, away: 1, onto: 1,
    and: 1, or: 1, but: 1, so: 1, if: 1, because: 1, while: 1, when: 1,
    that: 1, which: 1, who: 1, whom: 1, whose: 1, then: 1, also: 1, both: 1,
    be: 1, am: 1, is: 1, are: 1, was: 1, were: 1, been: 1, being: 1,
    do: 1, does: 1, did: 1, doing: 1,
    have: 1, has: 1, had: 1, having: 1,
    will: 1, would: 1, could: 1, should: 1, can: 1, may: 1, might: 1, must: 1, shall: 1,
    just: 1, really: 1, very: 1, actually: 1, basically: 1, please: 1, kindly: 1,
    maybe: 1, perhaps: 1, quick: 1, quickly: 1, simply: 1, currently: 1,
    already: 1, still: 1, even: 1, quite: 1, rather: 1, pretty: 1, absolutely: 1,
    definitely: 1, honestly: 1, literally: 1, super: 1, really: 1,
    probably: 1, likely: 1, maybe: 1, perhaps: 1,
    it: 1, this: 1, these: 1, those: 1, there: 1, here: 1, its: 1,
    any: 1, some: 1, every: 1, each: 1, all: 1, own: 1, other: 1, another: 1,
    hey: 1, hi: 1, hello: 1, mate: 1, cheers: 1, regards: 1, bye: 1, goodbye: 1,
    thanks: 1, thank: 1, dear: 1, folks: 1, guys: 1, everyone: 1,
    ok: 1, okay: 1, alright: 1, yes: 1, yeah: 1, yep: 1, nope: 1,
    now: 1
  };

  var PREFIRE = {
    email: "rock",
    emails: "rock",
    document: "rock",
    documents: "rock",
    file: "rock",
    files: "rock",
    deck: "rock",
    decks: "rock",
    doc: "rock",
    docs: "rock",
    computer: "rock",
    laptop: "rock",
    attachment: "rock",
    attachments: "rock",
    meeting: "fire",
    meetings: "fire",
    sync: "fire",
    syncs: "fire",
    deadline: "fire",
    urgent: "fire",
    asap: "fire",
    great: "good",
    excellent: "good",
    awesome: "good",
    amazing: "good",
    wonderful: "good",
    terrible: "bad",
    awful: "bad",
    horrible: "bad",
    problem: "bad",
    problems: "bad",
    issue: "bad",
    issues: "bad",
    bug: "bad",
    bugs: "bad",
    important: "big",
    critical: "big",
    huge: "big",
    large: "big",
    massive: "big",
    sorry: "ugh",
    unfortunately: "ugh",
    thanks: "ugh",
    thank: "ugh",
    ok: "ugh",
    okay: "ugh",
    alright: "ugh",
    well: "good",
    call: "fire"
  };

  var LIGHT = {
    think: 1, seem: 1, need: 1, want: 1, ask: 1, get: 1, go: 1,
    announce: 1, thrilled: 1, excited: 1, grateful: 1,
    amazing: 1, awesome: 1, wonderful: 1, comprehensive: 1
  };

  var VERB = {
    send: 1, look: 1, see: 1, make: 1, take: 1, give: 1, tell: 1, say: 1,
    write: 1, find: 1, leave: 1, feel: 1, know: 1, keep: 1, bring: 1, buy: 1,
    pay: 1, meet: 1, run: 1, sit: 1, speak: 1, understand: 1, call: 1, try: 1,
    use: 1, work: 1, start: 1, move: 1, help: 1, show: 1, include: 1, attach: 1,
    share: 1, update: 1, schedule: 1, discuss: 1, review: 1, approve: 1,
    launch: 1, ship: 1, fix: 1, finish: 1, complete: 1, create: 1, add: 1,
    change: 1, receive: 1, deliver: 1, submit: 1, sign: 1, join: 1, follow: 1,
    wait: 1, check: 1, flag: 1, cap: 1, talk: 1, align: 1, come: 1, do: 1,
    rethink: 1, compare: 1, close: 1, price: 1, tell: 1
  };

  var NOT_NAME = {
    hey: 1, hi: 1, hello: 1, the: 1, a: 1, an: 1, i: 1, we: 1, you: 1, please: 1,
    thanks: 1, thank: 1, dear: 1, just: 1, let: 1, could: 1, would: 1, can: 1,
    if: 1, so: 1, but: 1, and: 1, or: 1, this: 1, that: 1, it: 1, there: 1, here: 1,
    good: 1, great: 1, happy: 1, hope: 1, looking: 1, following: 1, quick: 1,
    kind: 1, best: 1, cheers: 1, regards: 1, team: 1, folks: 1, guys: 1, mate: 1, everyone: 1, all: 1,
    honestly: 1, probably: 1,
    monday: 1, tuesday: 1, wednesday: 1, thursday: 1, friday: 1, saturday: 1, sunday: 1,
    january: 1, february: 1, march: 1, april: 1, may: 1, june: 1, july: 1, august: 1,
    september: 1, october: 1, november: 1, december: 1
  };

  function cavemanize(input, level) {
    var text = String(input || "").replace(/\s+/g, " ").trim();
    if (!text) return "";
    if (level === "office") return officeSpeak(text);
    return gruntSpeak(text, level === "prefire");
  }

function officeSpeak(text) {
  var t = stripGreeting(text, true);
  t = stripSignoff(t);
  t = t.replace(/\b(?:just\s+)?a\s+quick\s+update\s+on\s+(?:the\s+)?([^.,!?]+)/gi, "$1 update");
  t = t.replace(/\bi\s+am\s+writing\s+because\b/gi, "");
  t = t.replace(/\bthis\s+is\s+the\s+(first|second|third|fourth|fifth)\s+time\s+i\s+have\s+followed\s+up\b/gi, "$1 follow-up");
  t = t.replace(/\bthrilled\s+to\s+announce\s+that\s+i\s+have\s+joined\b/gi, "I joined");
  t = t.replace(/\bso\s+grateful\s+for\s+the\s+(?:amazing|wonderful|great)\s+/gi, "Grateful for the ");
  t = t.replace(/\bwho\s+helped\s+me\s+get\s+here\b/gi, "");
  t = t.replace(/\bexcited\s+for\s+this\s+next\s+chapter\b/gi, "Next chapter");
  t = t.replace(/\bi\s+think\s+(?:that\s+)?we\s+should\b/gi, "we should");
  t = t.replace(/\bbut\s+we\s+have\s+a\s+(terrible|huge|big|serious|major)\s+problem\s+with\b/gi, ". $1 problem with");
  t = t.replace(/\bwe\s+have\s+a\s+(terrible|huge|big|serious|major)\s+problem\s+with\b/gi, "$1 problem with");
  t = t.replace(/\bmeet\s+to\s+align\b/gi, "meet");
  t = t.replace(/\band\s+we\s+should\b/gi, ". We should");
  t = t.replace(/\b(?:and\s+)?we\s+are\s+at\b/gi, ". We are");
  t = t.replace(/\bahead\s+of\s+the\b/gi, "ahead of");
  t = t.replace(/\bstill\s+has\s+not\s+been\b/gi, "is not");
  t = t.replace(/\bhas\s+not\s+been\b/gi, "is not");
  t = t.replace(/\bto\s+be\s+(capped|paid|sent|done|finished|reviewed)\b/gi, "$1");
  t = t.replace(/\b(?:we\s+can\s+)?(?:jump|hop|get)\s+on\s+(?:a\s+)?(?:quick\s+)?(?:call|zoom|meet)\b/gi, "we can talk");
  t = t.replace(/\btouch\s+base\b/gi, "talk");
  t = t.replace(/\bto\s+talk\s+through\b/gi, "about");
  t = t.replace(/\b(sent|send|sending)\s+through\b/gi, "$1");
  t = applyStock(t);
  t = t.replace(/\b(?:just|really|very|please|kindly|actually|basically|maybe|perhaps|probably|honestly|literally|quick|quickly|simply|currently|absolutely|definitely|still)\b/gi, " ");
  t = tidyProse(t);
  return t;
}

function gruntSpeak(text, prefire) {
  var t = stripGreeting(text);
  t = stripSignoff(t);
  t = t.replace(/\b(?:jump|hop|get)\s+on\s+(?:a\s+)?(?:quick\s+)?(?:call|zoom|meet)\b/gi, "\nTalk?\n");
  t = t.replace(/\b(?:quick\s+call|touch\s+base|circle\s+back)\b/gi, "\nTalk?\n");
  t = t.replace(/\b(?:take|have)\s+a\s+look\s+at\s+(?:the\s+|a\s+|an\s+|your\s+|my\s+|our\s+)?([A-Za-z][\w'-]*)/gi, "\nYou look $1?\n");
  t = t.replace(/\b(?:look(?:ing|ed)?\s+at|review|check\s+out)\s+(?:the\s+|a\s+|an\s+|your\s+|my\s+|our\s+)?([A-Za-z][\w'-]*)/gi, "\nYou look $1?\n");
  t = t.replace(/\b(?:just\s+)?a\s+quick\s+update\s+on\s+(?:the\s+)?/gi, " ");
  t = t.replace(/\bmeet\s+to\s+align\b/gi, "meet");
  t = t.replace(/\bto\s+talk\s+through\b/gi, " ");
  t = t.replace(/\bi\s+am\s+writing\s+because\b/gi, " ");
  t = t.replace(/\bthis\s+is\s+the\s+(first|second|third|fourth|fifth)\s+time\s+i\s+have\s+followed\s+up\b/gi, "$1 time");
  t = t.replace(/\bthrilled\s+to\s+announce\s+that\b/gi, " ");
  t = t.replace(/\bwho\s+helped\s+(?:me|us)\s+get\s+here\b/gi, " ");
  t = t.replace(/\bexcited\s+for\s+(?:this\s+)?/gi, " ");
  t = t.replace(/\bso\s+grateful\s+for\s+(?:the\s+)?(?:amazing|wonderful|great\s+)?/gi, " ");
  t = t.replace(/\blet\s+me\s+know\s+if\s+that\s+time\s+works\b/gi, " ");
  t = t.replace(/\b(?:i|we)\s+(?:just\s+)?wanted\s+to\b/gi, " ");
  t = applyStock(t);
  var lines = [];
  t.split(/\n+/).forEach(function (part) {
    sentences(part).forEach(function (sentence) {
      var bit = sentence.replace(/\s+/g, " ").trim();
      if (!bit) return;
      if (/^talk\?$/i.test(bit)) {
        pushLine(lines, "Talk?");
        return;
      }
      var look = bit.match(/^you look\s+([A-Za-z][\w'-]*)\??$/i);
      if (look) {
        var noun = look[1];
        if (prefire && PREFIRE[noun.toLowerCase()]) noun = PREFIRE[noun.toLowerCase()];
        pushLine(lines, "You look " + noun + "?");
        return;
      }
      var words = reduceWords(bit, prefire);
      words = dropStrayPronouns(words);
      emitChunks(words, prefire ? 2 : 4).forEach(function (chunk) {
        if (prefire && chunk.length > 3) chunk = chunk.slice(0, 3);
        pushLine(lines, cap(chunk.join(" ")));
      });
    });
  });
  return lines.join("\n");
}

function sentences(text) {
  return String(text)
    .replace(/([.!?])\s+/g, "$1\n")
    .replace(/,\s+/g, "\n")
    .replace(/\s+\b(?:and|but|or)\b\s+/gi, "\n")
    .split(/\n+/)
    .map(function (s) { return s.replace(/\s+/g, " ").replace(/^[.!?,]+/, "").trim(); })
    .filter(Boolean);
}

function emitChunks(words, size) {
  var chunks = [];
  var buf = [];
  function flush() {
    if (buf.length) chunks.push(buf.slice());
    buf = [];
  }
  var i = 0;
  while (i < words.length) {
    var span = protectedSpan(words, i);
    var word = words[i];
    var next = words[i + 1];
    var low = String(word).toLowerCase();
    if (span > 1) {
      if (buf.length && buf.length + span > size) flush();
      if (!buf.length && span > size) {
        chunks.push(words.slice(i, i + span));
        i += span;
        continue;
      }
      var k;
      for (k = 0; k < span; k++) buf.push(words[i + k]);
      i += span;
      if (buf.length >= size) flush();
      continue;
    }
    if (buf.length && (low === "me" || low === "you") && next && VERB[String(next).toLowerCase()]) {
      flush();
    } else if (buf.length && isCapWord(word) && next && isCapWord(next) && buf.length + 2 > size) {
      flush();
    } else if (buf.length >= size) {
      flush();
    }
    buf.push(word);
    i += 1;
  }
  flush();
  return chunks;
}

function protectedSpan(words, index) {
  var a = String(words[index] || "").toLowerCase();
  var b = String(words[index + 1] || "").toLowerCase();
  var c = String(words[index + 2] || "").toLowerCase();
  if ((a === "great" || a === "good") && b === "long" && c === "weekend") return 3;
  if (b === "weekend" && (a === "long" || a === "great" || a === "good")) return 2;
  if (a === "public" && b === "holiday") return 2;
  if (isDay(a) && /^(?:morning|afternoon|evening|night)$/.test(b)) return 2;
  if ((a === "last" || a === "next" || a === "this") && /^(?:week|month|year|weekend|night|morning|afternoon|evening|monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/.test(b)) return 2;
  return 1;
}

function isDay(word) {
  return /^(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday|tomorrow|yesterday|today|tonight)$/.test(word);
}

function isCapWord(word) {
  return /^[A-Z][a-z]/.test(word);
}

function stripGreeting(text, keepComma) {
  var named = text.match(/^(?:hey|hi|hello|dear|good\s+(?:morning|afternoon|evening))\s+([A-Z][\w'’]+)\b\s*[,!]?\s*/i);
  if (named && !NOT_NAME[named[1].toLowerCase()]) {
    return named[1] + (keepComma ? ", " : " ") + text.slice(named[0].length);
  }
  return text.replace(/^(?:hey|hi|hello|dear|good\s+(?:morning|afternoon|evening))(?:\s+(?:mate|there|team|all|folks|guys|everyone))?\s*[,!.]?\s*/i, "");
}

function stripSignoff(text) {
  return text.replace(/(?:[,.\s]+|^)(?:many\s+thanks|thanks\s+so\s+much(?:\s+in\s+advance)?|thank\s+you(?:\s+so\s+much)?(?:\s+in\s+advance)?|thanks(?:\s+so\s+much)?|thank\s+you|best\s+regards|kind\s+regards|warm\s+regards|regards|cheers|talk\s+soon|speak\s+soon|best)\s*[,!]?\s*([A-Z][a-z]+)?\s*[!.]*\s*$/i, function (_, name) {
    if (name && !NOT_NAME[name.toLowerCase()]) return ". " + name;
    return "";
  });
}

function tidyProse(text) {
  var t = text;
  t = t.replace(/\s+/g, " ").replace(/\s+([,.;!?])/g, "$1").replace(/([,.;!?])\1+/g, "$1");
  t = t.replace(/[,:;]\s*\./g, ".");
  t = t.replace(/\?\s+\.\s*/g, ". ");
  t = t.replace(/\?\s+([A-Z][a-z]+\.?)$/g, ". $1");
  t = t.replace(/(^|[.!?]\s+)(?:and|but|or)\s+/gi, "$1");
  t = t.replace(/\bI\s+(?=(?:the|a|an)\b)/gi, "");
  t = t.replace(/\s+/g, " ").replace(/\s+([,.;!?])/g, "$1").trim();
  t = t.replace(/^[,.\s]+/, "").replace(/[,.\s]+$/, "");
  t = t.replace(/(^|[.!?]\s+)([a-z])/g, function (_, lead, letter) {
    return lead + letter.toUpperCase();
  });
  t = t.replace(/\s+([,.;!?])/g, "$1").replace(/\s+/g, " ").trim();
  if (t && !/[.!?]$/.test(t)) t += ".";
  return t;
}

  function pushLine(lines, line) {
    if (!line) return;
    if (/^(?:me|you)$/i.test(line)) return;
    if (lines.length && lines[lines.length - 1].toLowerCase() === line.toLowerCase()) return;
    lines.push(line);
  }

  function applyStock(text) {
    var cuts = [
      /just\s+checking\s+in\s+to\s+see\s+if\s+(?:you\s+)?/gi,
      /checking\s+in\s+to\s+see\s+if\s+(?:you\s+)?/gi,
      /just\s+checking\s+in\b[,.]?\s*/gi,
      /checking\s+in\b[,.]?\s*/gi,
      /to\s+see\s+if\s+(?:you\s+)?/gi,
      /i\s+was\s+wondering\s+if\s+(?:you\s+)?/gi,
      /whether\s+you\s+might\s+have\s+a\s+moment\s+to\b/gi,
      /if\s+you\s+might\s+have\s+a\s+moment\s+to\b/gi,
      /i\s+just\s+wanted\s+to\b/gi,
      /just\s+wanted\s+to\b/gi,
      /wanted\s+to\s+(?:kindly\s+)?/gi,
      /i\s+hope\s+(?:this\s+)?(?:e-?mail|note|message)\s+finds\s+you\s+well[.!]*/gi,
      /hope\s+(?:you(?:'re| are)\s+(?:doing\s+)?well|all\s+is\s+well)[.!]*/gi,
      /when\s+you\s+get\s+a\s+chance[,.]*/gi,
      /at\s+your\s+earliest\s+convenience[,.]*/gi,
      /if\s+you\s+(?:have|get)\s+a\s+(?:moment|sec|second|minute)[,.]*/gi,
      /(?:had|have|got|get|gets)\s+a\s+chance\s+to\b/gi,
      /let\s+me\s+know\s+if\s+that\s+time\s+works[.!]*/gi,
      /let\s+me\s+know\s+if\s+you\s+have\s+any\s+questions[.!]*/gi,
      /let\s+me\s+know\s+if\s+(?:you\s+)?(?:have\s+)?/gi,
      /if\s+you\s+have\s+any\s+questions[.!]*/gi,
      /any\s+questions[.!]*/gi,
      /feel\s+free\s+to\b/gi,
      /feel\s+free\b/gi,
      /(?:please\s+)?do(?:n't| not)\s+hesitate\s+to\b/gi,
      /circle\s+back(?:\s+on)?\b/gi,
      /following\s+up\s+on\b/gi,
      /follow\s+up\s+on\b/gi,
      /reaching\s+out\b/gi,
      /reach\s+out\b/gi,
      /pinging\s+you\b/gi,
      /bumping\s+this\b/gi,
      /per\s+my\s+last(?:\s+(?:e-?mail|email|note))?\b/gi,
      /going\s+forward\b/gi,
      /at\s+the\s+end\s+of\s+the\s+day\b/gi,
      /i\s+think(?:\s+that)?\b/gi,
      /i\s+believe(?:\s+that)?\b/gi,
      /it\s+seems(?:\s+that)?\b/gi,
      /sort\s+of\b/gi,
      /kind\s+of\b/gi,
      /you\s+know\b/gi,
      /(?:just\s+)?a\s+reminder\s+that\b/gi,
      /(?:i|we)\s+feel\s+like\b/gi,
      /\bi\s+guess\b/gi,
      /\bi\s+mean\b/gi,
      /\bto\s+be\s+honest\b/gi,
      /\bif\s+i(?:'m|\s+am)\s+being\s+honest\b/gi,
      /\bif\s+i(?:'m|\s+am)\s+honest\b/gi,
      /\bmake\s+sure\s+(?:that\s+)?(?:you|to)\b/gi,
      /make\s+sure\s+(?:to|that)\b/gi,
      /it\s+would\s+be\s+(?:really\s+|very\s+)?(?:great|helpful|good)\s+if\s+(?:you|we)\s+(?:could|can)\b/gi,
      /thanks?\s+so\s+much(?:\s+in\s+advance)?[.!]*/gi,
      /thank\s+you(?:\s+so\s+much)?(?:\s+in\s+advance)?[.!]*/gi,
      /in\s+advance\b/gi,
      /as\s+soon\s+as\s+(?:you\s+can|possible)\b/gi,
      /quick\s+question[:,]?\s*/gi,
      /(?:i\s+)?think\s+there\s+might\s+be\b/gi,
      /there\s+might\s+be\b/gi,
      /i\s+wanted\s+to\b/gi,
      /could\s+you\s+please\b/gi,
      /would\s+you\s+please\b/gi,
      /can\s+you\s+please\b/gi,
      /could\s+you\b/gi,
      /would\s+you\b/gi,
      /can\s+you\b/gi
    ];
    var i;
    for (i = 0; i < cuts.length; i++) text = text.replace(cuts[i], " ");
    return text;
  }

  function reduceWords(text, prefire) {
    var raw = text.match(/[#@][A-Za-z0-9_]+|[A-Za-z0-9][A-Za-z0-9'’$_%./:-]*/g) || [];
    var out = [];
    var i;
    for (i = 0; i < raw.length; i++) {
      var original = raw[i].replace(/[.,!;:?]+$/g, "");
      if (!original) continue;
      var tagged = /^[#@]/.test(original);
      var bare = tagged ? original.slice(1) : original;
      var lower = bare.toLowerCase().replace(/['’]/g, "'");
      var next = raw[i + 1] ? raw[i + 1].replace(/[.,!;:?]+$/g, "") : "";
      if (!bare) continue;
      if (prefire && PREFIRE[lower]) {
        out.push(PREFIRE[lower]);
        continue;
      }
      if ((lower === "am" || lower === "pm") && /\d/.test(raw[i - 1] || "")) {
        out.push(lower);
        continue;
      }
      if (FILLER_PRONOUN[lower]) continue;
      if (PRONOUN[lower]) {
        out.push(PRONOUN[lower]);
        continue;
      }
      if (lower === "not" || lower === "no" || lower === "never") {
        out.push(lower);
        continue;
      }
      if (lower === "last" || lower === "next") {
        out.push(lower);
        continue;
      }
      if ((lower === "before" || lower === "after") && next && isTime(next)) {
        out.push(lower);
        continue;
      }
      if (lower === "number" && next && hasNumber(next)) continue;
      if (lower === "may" && bare !== "May" && bare !== "MAY") continue;
      if (hasNumber(bare) || isAcronym(bare) || tagged || isClock(bare) || isTimeWord(bare)) {
        out.push(tagged ? original.charAt(0) + bare : bare);
        continue;
      }
      if (DROP[lower] || LIGHT[lower]) continue;
      if (isName(bare)) {
        out.push(bare);
        continue;
      }
      var lemma = lemmatize(lower);
      if (!lemma) continue;
      if (DROP[lemma] || LIGHT[lemma]) continue;
      if (prefire && PREFIRE[lemma]) lemma = PREFIRE[lemma];
      out.push(lemma);
    }
    var squeezed = [];
    out.forEach(function (word) {
      if (!word) return;
      if (squeezed.length && squeezed[squeezed.length - 1] === word) return;
      squeezed.push(word);
    });
    return squeezed;
  }

  function dropStrayPronouns(words) {
  var kept = [];
  var i;
  for (i = 0; i < words.length; i++) {
    var word = words[i];
    var low = word.toLowerCase();
    if (low === "me" || low === "you") {
      var prev = kept.length ? kept[kept.length - 1].toLowerCase() : "";
      var next = words[i + 1] ? words[i + 1].toLowerCase() : "";
      if (!VERB[prev] && !VERB[next]) continue;
    }
    kept.push(word);
  }
  return kept;
}

function lemmatize(w) {
    if (Object.prototype.hasOwnProperty.call(IRREGULAR, w)) return IRREGULAR[w];
    if (ING_NOUN[w]) return w;
    if (w.length > 4 && /ing$/.test(w)) {
      var stemmed = ingStem(w);
      if (stemmed) return stemmed;
    }
    if (w.length > 4 && /ied$/.test(w)) return w.slice(0, -3) + "y";
    if (w.length > 3 && /ed$/.test(w)) {
      if (/([^aeiou])\1ed$/.test(w)) return w.slice(0, -3);
      var base = w.slice(0, -2);
      if (/at$/.test(base)) return base + "e";
      if (/[^aeiou][aeiou][^aeiou]$/.test(base) && !/[aeiou]{2}/.test(base.slice(-3))) return base + "e";
      if (base.length >= 3) return base;
    }
    if (w.length > 4 && /s$/.test(w) && !/ss$/.test(w) && !isTime(w)) {
      if (/ies$/.test(w)) return w.slice(0, -3) + "y";
      if (/[^s]s$/.test(w) && w.length > 4) return w.slice(0, -1);
    }
    return w;
  }

  function ingStem(w) {
    var stem = w.slice(0, -3);
    var candidates = [];
    if (stem.length >= 2 && stem.charAt(stem.length - 1) === stem.charAt(stem.length - 2)) {
      candidates.push(stem.slice(0, -1));
    }
    candidates.push(stem);
    if (stem === "mak") candidates.push("make");
    if (stem === "tak") candidates.push("take");
    if (stem === "giv") candidates.push("give");
    if (stem === "writ") candidates.push("write");
    if (stem === "com") candidates.push("come");
    candidates.push(stem + "e");
    var i;
    for (i = 0; i < candidates.length; i++) {
      if (VERB[candidates[i]]) return candidates[i];
    }
    return "";
  }

  function isClock(tok) {
    return /^\d{1,2}(?::\d{2})?\s*(?:am|pm)$/i.test(tok) || /^\d{1,2}(?:am|pm)$/i.test(tok);
  }

  function isTimeWord(tok) {
    var w = String(tok).replace(/[.,!?]/g, "");
    var low = w.toLowerCase();
    if (/^q[1-4]$/i.test(low)) return true;
    if (low === "may") return w === "May" || w === "MAY";
    return /^(?:today|tomorrow|yesterday|tonight|monday|tuesday|wednesday|thursday|friday|saturday|sunday|january|february|march|april|june|july|august|september|october|november|december|week|month|year|morning|afternoon|evening)$/.test(low);
  }

  function isTime(tok) {
    return isClock(tok) || isTimeWord(tok) || /^\d/.test(tok);
  }

  function hasNumber(tok) {
    return /\d/.test(tok) || /^[$£€]/.test(tok);
  }

  function isAcronym(tok) {
    return /^[A-Z]{2,}$/.test(tok);
  }

  function isName(tok) {
    if (!/^[A-Z][a-z]+(?:['’][A-Za-z]+)?$/.test(tok)) return false;
    return !NOT_NAME[tok.toLowerCase()];
  }

  function cap(line) {
    if (!line) return line;
    return line.charAt(0).toUpperCase() + line.slice(1);
  }

  if (typeof module !== "undefined" && module.exports) module.exports = cavemanize;
  root.cavemanize = cavemanize;
})(typeof window !== "undefined" ? window : globalThis);
