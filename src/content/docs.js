// Content for the /docs page. Deliberately high level: what OpenOffensive does and
// how to use it. Implementation detail lives in the repository's own documentation.

export const VERSION = '1.0.0'

export const features = [
  {
    icon: 'box',
    title: 'Isolated by design',
    body: 'Each scan runs in its own throwaway container, which is removed when the run ends.',
  },
  {
    icon: 'agents',
    title: 'Specialist agents',
    body: 'A coordinating agent delegates to specialists for reconnaissance, injection, and access control, working in parallel.',
  },
  {
    icon: 'shield',
    title: 'Validated findings',
    body: 'A finding is reported only when real output proves it. Each one carries a severity, a CVSS score, evidence, a proof-of-concept, and a fix.',
  },
  {
    icon: 'activity',
    title: 'Live visibility',
    body: 'Watch agent activity and findings arrive as the scan runs, then replay any run later.',
  },
  {
    icon: 'file',
    title: 'Portable reports',
    body: 'Results are saved as Markdown and JSON, with SARIF for code-scanning platforms.',
  },
  {
    icon: 'check',
    title: 'CI friendly',
    body: 'Exit codes signal a clean run, an error, or findings, so a pipeline can gate on the result.',
  },
]

export const steps = [
  {
    title: 'Name a target',
    body: 'A git repository, a live URL you are authorized to test, or a local directory.',
  },
  {
    title: 'Start a sandbox',
    body: 'Each scan gets its own isolated container, prepared with the target and a set of security tools.',
  },
  {
    title: 'Agents investigate',
    body: 'Specialist agents work in parallel. Each one chooses its next step from the real results of the last.',
  },
  {
    title: 'Findings are validated',
    body: 'A finding is reported only when real output proves it, so the report is not a list of guesses.',
  },
  {
    title: 'Review the results',
    body: 'Every run produces a report with severity, CVSS, evidence, a proof-of-concept, and remediation, as Markdown, JSON, and SARIF.',
  },
]

export const commands = [
  {
    cmd: 'openoffensive scan <target>',
    body: 'Run a scan against a git repository, a URL you are authorized to test, or a local directory.',
  },
  { cmd: 'openoffensive serve <target>', body: 'Start the live dashboard for a target.' },
  {
    cmd: 'openoffensive doctor',
    body: 'Check that Docker and your model key are ready. Add --build to prepare the sandbox image.',
  },
  { cmd: 'openoffensive list', body: 'List earlier runs.' },
  { cmd: 'openoffensive report <scan_id>', body: 'Print the report for a run.' },
]

export const exitCodes = [
  { code: '0', meaning: 'The scan finished with no findings.' },
  { code: '1', meaning: 'An error occurred.' },
  { code: '2', meaning: 'The scan finished with one or more findings.' },
]
