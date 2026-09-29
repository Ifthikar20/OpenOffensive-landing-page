// Blog post metadata: the single source for the index, each post header, and the
// build-time prerender. Pure data (no framework imports) so Node can read it too.
export const posts = [
  {
    slug: 'introducing-openoffensive',
    title: 'Introducing OpenOffensive: an open-source AI pentester',
    tag: 'Announcement',
    date: 'September 10, 2026',
    dateISO: '2026-09-10',
    readingTime: '4 min read',
    excerpt:
      'Autonomous agents that run your code, find real vulnerabilities, and prove them with working proofs-of-concept — open source, MIT-licensed, and invite-only in the cloud.',
  },
  {
    slug: 'graph-of-agents',
    title: 'Inside the graph of agents',
    tag: 'Engineering',
    date: 'September 12, 2026',
    dateISO: '2026-09-12',
    readingTime: '6 min read',
    excerpt:
      'A root orchestrator delegates to Recon, Injection, and Access specialists — each driving a real tool-use loop inside an isolated sandbox, confirming findings from actual command output.',
  },
  {
    slug: 'openoffensive-in-ci',
    title: 'Add OpenOffensive to your CI in five minutes',
    tag: 'Guide',
    date: 'September 15, 2026',
    dateISO: '2026-09-15',
    readingTime: '5 min read',
    excerpt:
      'Block insecure code before it merges: run a scan on every pull request with a lightweight workflow, and fail the build when a validated vulnerability shows up.',
  },
]

export const bySlug = (slug) => posts.find((p) => p.slug === slug)
