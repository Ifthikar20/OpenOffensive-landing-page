<template>
  <p>
    Static analysis tells you what <em>might</em> be wrong. A pentest tells you what actually is.
    OpenOffensive is an open-source AI penetration tester that does the second thing: it runs your
    application, probes it like a real attacker, and confirms every finding with a working
    proof-of-concept — so what lands in your report is real, not a guess.
  </p>

  <h2>Why we built it</h2>
  <p>
    Manual pentests are thorough but slow and expensive. Scanners are fast but noisy — pages of
    "potential" issues that a human still has to triage. We wanted the speed of automation with the
    honesty of a real exploit. So OpenOffensive drives actual tools against a running target and only
    reports what it can demonstrate.
  </p>

  <h2>How a scan works</h2>
  <p>
    Each scan spins up an isolated Kali Linux sandbox, pulls your target into it — a git repo, a live
    URL, or a local directory — and turns a team of agents loose. A root orchestrator delegates to
    specialists for reconnaissance, injection, and access control, and each one drives a real
    tool-use loop: <code>nmap</code>, <code>curl</code>, <code>sqlmap</code>, <code>nuclei</code> and
    friends, all inside the box. Every finding carries a severity, a CVSS score, the evidence, a
    proof-of-concept, and a fix.
  </p>

  <h2>Try it in one line</h2>
  <p>Installing the CLI puts <code>openoffensive</code> on your PATH:</p>
  <pre><code>curl -sSL https://raw.githubusercontent.com/Ifthikar20/open-offensive/clean-main/install.sh | bash
openoffensive scan https://github.com/org/repo</code></pre>
  <p>
    A real model drives the agents: with an Anthropic API key set, they decide each command, run it in
    the sandbox, and confirm the finding from real output — no canned checks. A scan needs that key;
    without a reachable model it stops at preflight instead of guessing.
  </p>

  <h2>Two ways to run</h2>
  <ul>
    <li><strong>Open source</strong> — free, runs locally with your own model key. MIT licensed.</li>
    <li><strong>Cloud</strong> — invite-only beta: validated findings, one-click autofix, and PR reviews with no setup.</li>
  </ul>

  <blockquote>
    Authorized targets only. OpenOffensive actively tests what you point it at — run it only against
    systems you own or have explicit written permission to test.
  </blockquote>

  <p>
    Want the technical tour? Read <router-link to="/blog/graph-of-agents">Inside the graph of agents</router-link>, or
    jump straight to <router-link :to="{ path: '/docs', hash: '#quickstart' }">installing the CLI</router-link>.
  </p>
</template>
