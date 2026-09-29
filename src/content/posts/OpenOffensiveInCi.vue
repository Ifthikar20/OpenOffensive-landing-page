<template>
  <p>
    The cheapest vulnerability to fix is the one that never merges. With a few lines of YAML,
    OpenOffensive runs on every pull request and fails the build when it can prove a real issue — so
    insecure code gets caught in review, not in production.
  </p>

  <h2>The workflow</h2>
  <p>Drop this into <code>.github/workflows/openoffensive.yml</code>:</p>
  <pre v-pre><code>name: openoffensive

on:
  pull_request:

permissions:
  contents: read
  security-events: write

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7

      - name: Install OpenOffensive
        run: curl -sSL https://raw.githubusercontent.com/Ifthikar20/open-offensive/clean-main/install.sh | bash

      - name: Run a scan
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: openoffensive scan .</code></pre>

  <h2>How it behaves in CI</h2>
  <ul>
    <li><strong>Exit codes drive the gate.</strong> A clean run exits <code>0</code>; a run that files findings exits <code>2</code>, which fails the job and blocks the merge.</li>
    <li><strong>Artifacts are written to disk.</strong> Each run saves its report, findings, and a SARIF file under <code>runs/&lt;scan_id&gt;/</code>, so you can upload them or publish to code scanning.</li>
    <li><strong>Bring a key.</strong> A real model drives every scan, so set <code>ANTHROPIC_API_KEY</code> (an encrypted Actions secret); without a reachable model the run fails at preflight instead of emitting canned results.</li>
  </ul>

  <h2>Publishing results to GitHub code scanning</h2>
  <p>
    OpenOffensive writes SARIF 2.1.0, so findings can show up right in the pull request's Security
    tab. Each scan writes to a folder named after its scan id, so point the upload at that folder.
    Add these steps after the scan, and let the upload run even when the scan step fails:
  </p>
  <pre v-pre><code>      - name: Run a scan
        id: scan
        continue-on-error: true
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: openoffensive scan .

      - name: Find the run folder
        id: run
        run: echo "dir=$(ls -d runs/*/ | tail -n 1)" >> "$GITHUB_OUTPUT"

      - name: Upload SARIF
        uses: github/codeql-action/upload-sarif@v4
        with:
          sarif_file: ${{ steps.run.outputs.dir }}

      - name: Fail if the scan found issues
        if: steps.scan.outcome == 'failure'
        run: exit 1</code></pre>

  <h2>Keep it scoped</h2>
  <p>
    Point CI scans at code you own — the repository being built, or a staging URL you control. A
    non-local URL target needs the explicit <code>--authorized</code> flag, a deliberate reminder
    that you must have permission to test it.
  </p>

  <blockquote>
    Store your model key as an encrypted Actions secret — never commit it. OpenOffensive reads it
    from the environment and never writes it to disk.
  </blockquote>

  <p>
    That's the whole setup. For every flag and scan mode, see the
    <a href="https://github.com/Ifthikar20/open-offensive/blob/HEAD/docs/USAGE.md" target="_blank" rel="noopener">usage guide</a>,
    or read how the engine works in <router-link to="/blog/graph-of-agents">Inside the graph of agents</router-link>.
  </p>
</template>
