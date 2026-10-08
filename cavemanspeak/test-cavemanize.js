#!/usr/bin/env node
"use strict";

var cavemanize = require("./cavemanize.js");

var samples = [
  {
    name: "Mate check-in",
    text: "Hey mate, just checking in to see if you had a chance to look at the contract I sent through last week. Let me know if you have any questions and we can jump on a quick call."
  },
  {
    name: "Work email",
    text: "Hi Priya, I hope this email finds you well. I wanted to follow up on the Acme contract I sent on 3 March. The payment terms in section 4 still need your sign-off, and legal asked for the indemnity clause to be capped at 12 months. Could you please send the redline before Friday? Thanks so much."
  },
  {
    name: "Slack",
    text: "hey @sam can you take a look at the PR when you get a chance? think there might be a bug in the auth flow. thanks!"
  },
  {
    name: "LinkedIn",
    text: "Thrilled to announce that I have joined Acme as Head of Growth! So grateful for the amazing team at Northwind who helped me get here. Excited for this next chapter. #growth"
  },
  {
    name: "AI prompt",
    text: "Could you please write a really comprehensive summary of the attached document and make sure to include all of the key takeaways? I think it would be great if you could also flag anything that seems important."
  },
  {
    name: "Status update",
    text: "Hi team, just a quick update on the Q3 launch. The large rollout is going really well and we are at 12% ahead of the forecast, but we have a terrible problem with the billing timeline and I think we should meet to align before Thursday."
  },
  {
    name: "Scheduling",
    text: "Hey Maya, would you have a chance to jump on a quick call Tuesday at 3pm to talk through the onboarding deck? Let me know if that time works. Cheers, Andy"
  },
  {
    name: "Support complaint",
    text: "Hello, I am writing because the invoice I sent on 2 October for $480 still has not been paid. This is the third time I have followed up. Please let me know if there is a problem with the PO number 4419. Regards, Lina"
  },
  {
    name: "Already short",
    text: "Ship the Q3 deck Friday."
  },
  {
    name: "Holiday reminder",
    text: "Hi all, just a reminder that the office will be closed on Monday for the public holiday, so please make sure you submit your timesheets by Friday afternoon. Have a great long weekend!"
  },
  {
    name: "Pricing rethink",
    text: "Honestly I feel like we should probably rethink our pricing strategy because customers keep telling us it is too expensive compared to competitors."
  }
];

function words(text) {
  var found = String(text).match(/[A-Za-z0-9'’$@%.-]+/g);
  return found ? found.length : 0;
}

function maxLine(text) {
  if (!text) return 0;
  return text.split("\n").reduce(function (max, line) {
    return Math.max(max, words(line));
  }, 0);
}

function show(level, source) {
  var out = cavemanize(source, level);
  var inn = words(source);
  var outN = words(out);
  var cut = inn === 0 ? 0 : Math.round((1 - outN / inn) * 100);
  console.log(level.toUpperCase().padEnd(8) + String(outN).padStart(3) + " words  -" + cut + "%  max " + maxLine(out) + "/line");
  console.log(out || "(empty)");
  console.log("");
  return { inn: inn, outN: outN, cut: cut, max: maxLine(out), out: out };
}

var failed = 0;

function check(name, ok, detail) {
  if (ok) return;
  failed += 1;
  console.log("FAIL  " + name + (detail ? "  " + detail : ""));
}

samples.forEach(function (sample, index) {
  var inn = words(sample.text);
  console.log("=== " + (index + 1) + ". " + sample.name + " (" + inn + " words) ===");
  console.log(sample.text);
  console.log("");
  var office = show("office", sample.text);
  var grug = show("grug", sample.text);
  var pre = show("prefire", sample.text);
  sample.result = { office: office, grug: grug, pre: pre };
  console.log("");
});

var mate = samples[0].result;
check("mate grug cuts 70-85%", mate.grug.cut >= 70 && mate.grug.cut <= 90, "got -" + mate.grug.cut + "%");
check("mate grug lines stay near 4 words", mate.grug.max <= 5, "max " + mate.grug.max);
check("mate grug keeps contract", /contract/i.test(mate.grug.out));
check("mate grug keeps last week", /last week/i.test(mate.grug.out));
check("mate grug asks to talk", /talk\?/i.test(mate.grug.out));
check("mate grug looks at contract", /you look contract\?/i.test(mate.grug.out));
check("mate prefire lines are 1-3 words", mate.pre.max <= 3, "max " + mate.pre.max);
check("mate office is shorter", mate.office.cut >= 35, "got -" + mate.office.cut + "%");
check("mate office keeps the contract", /contract/i.test(mate.office.out));
check("mate office drops the greeting", !/\bmate\b/i.test(mate.office.out));
check("mate office does not leak tokens", !/\$\d/.test(mate.office.out));

var work = samples[1].result;
check("work email keeps Priya", /Priya/.test(work.grug.out));
check("work email keeps Friday", /Friday/i.test(work.grug.out));
check("work email keeps 12", /12/.test(work.grug.out));
check("work office cuts about 40-60%", work.office.cut >= 35 && work.office.cut <= 65, "got -" + work.office.cut + "%");
check("work grug cuts at least 60%", work.grug.cut >= 60, "got -" + work.grug.cut + "%");

var slack = samples[2].result;
check("slack keeps @sam", /@sam/i.test(slack.grug.out));
check("slack keeps PR", /\bPR\b/.test(slack.grug.out));

var support = samples[7].result;
check("support keeps 4419", /4419/.test(support.grug.out));
check("support keeps Lina", /Lina/.test(support.grug.out));
check("support keeps $480 or 480", /480/.test(support.grug.out));

var holiday = samples[9].result;
check("holiday office drops Hi all", !/^all\b/i.test(holiday.office.out) && !/\bhi all\b/i.test(holiday.office.out));
check("holiday grug drops make sure", !/make sure/i.test(holiday.grug.out));
check("holiday grug keeps submit", /\bsubmit\b/i.test(holiday.grug.out));
check("holiday grug keeps Friday afternoon together", /friday afternoon/i.test(holiday.grug.out));
check("holiday grug keeps long weekend together", /long weekend/i.test(holiday.grug.out));
check("holiday prefire keeps Friday afternoon", /friday afternoon/i.test(holiday.pre.out));
check("holiday prefire lines are 1-3 words", holiday.pre.max <= 3, "max " + holiday.pre.max);

var pricing = samples[10].result;
check("pricing grug keeps pricing", /\bpricing\b/i.test(pricing.grug.out));
check("pricing grug does not emit pric", !/\bpric\b/i.test(pricing.grug.out));
check("pricing grug drops honestly", !/\bhonestly\b/i.test(pricing.grug.out));
check("pricing grug drops feel like", !/feel like/i.test(pricing.grug.out));
check("pricing grug drops probably", !/\bprobably\b/i.test(pricing.grug.out));
check("pricing office drops honestly", !/\bhonestly\b/i.test(pricing.office.out));
check("pricing office keeps pricing", /\bpricing\b/i.test(pricing.office.out));

check("making stems to make", /\bmake\b/i.test(cavemanize("We are making the deck.", "grug")) && !/\bmak\b/i.test(cavemanize("We are making the deck.", "grug")));
check("using stems to use", /\buse\b/i.test(cavemanize("We are using the new file.", "grug")) && !/\busin\b/i.test(cavemanize("We are using the new file.", "grug")));
check("closing is not clos", !/\bclos\b/i.test(cavemanize("The office is closing Monday.", "grug")));

if (failed) {
  console.log(failed + " check(s) failed");
  process.exit(1);
}
console.log("All checks passed.");
