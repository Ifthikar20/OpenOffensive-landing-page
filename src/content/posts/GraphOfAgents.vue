<template>
  <p>
    A single agent trying to do everything gets lost. OpenOffensive instead runs a small
    <em>graph of agents</em>: a root orchestrator that plans and delegates, and specialists that
    each own one slice of the attack surface. This post walks through how that works and why it
    produces findings you can trust.
  </p>

  <h2>The root orchestrator</h2>
  <p>
    Every scan starts with a root agent. It reads the target, decides which specialists to involve,
    and hands each one a focused brief. It doesn't run tools itself — its job is coordination:
    spawn the right agents, collect what they report, de-duplicate, and rank the results by CVSS.
  </p>

  <h2>The specialists</h2>
  <ul>
    <li><strong>Recon Scout</strong> — maps the attack surface: endpoints, headers, exposed files, technology fingerprints.</li>
    <li><strong>Injection Hunter</strong> — probes inputs for SQL injection, cross-site scripting, template injection, and friends.</li>
    <li><strong>Access Auditor</strong> — tests authorization: IDOR, missing checks, and privilege boundaries.</li>
  </ul>
  <p>
    Each specialist drives a <strong>tool-use loop</strong>. It picks a command, runs it inside the
    sandbox, reads the real output, and decides what to do next — exactly how a human tester works,
    just faster and in parallel.
  </p>

  <h2>Everything runs in a sandbox</h2>
  <p>
    Tools never touch your host. The core primitive is <code>run_command</code>, which executes
    inside a throwaway Kali container via <code>docker exec</code>; agents also read files and file
    findings back to the orchestrator. When the scan ends, the container is removed. No Docker
    daemon, or a locked-down network? A local backend runs the tools on the host instead.
  </p>

  <h2>Findings are proven, not guessed</h2>
  <p>
    A specialist can only file a finding it can back with real command output. That single rule is
    what separates OpenOffensive from a classic scanner: instead of "this parameter may be
    injectable," you get the request that triggered the error, the response that proves it, and a
    reproduction you can paste into a terminal.
  </p>
  <pre v-pre><code># the shape of a finding
severity:    HIGH
title:       Error-based SQL injection
cvss:        7.8   (CWE-89)
endpoint:    /search?q=
evidence:    Database error surfaced in the response body
poc:         curl -s "$TARGET/search?q=%27"
remediation: Use parameterized queries; never concatenate input into SQL</code></pre>

  <h2>Why a graph beats a monolith</h2>
  <p>
    Specialists share discoveries through the orchestrator, so a hostname found during recon becomes
    an input for injection testing, and an exposed identifier becomes a lead for access testing.
    Vulnerabilities chain the same way real attacks do — and because each agent stays narrow, its
    reasoning stays sharp.
  </p>

  <p>
    New to the project? Start with <router-link to="/blog/introducing-openoffensive">the introduction</router-link>, or
    read the full
    <a href="https://github.com/Ifthikar20/open-offensive/blob/HEAD/docs/ARCHITECTURE.md" target="_blank" rel="noopener">architecture doc</a>.
  </p>
</template>
