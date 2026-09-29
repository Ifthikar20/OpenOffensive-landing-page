// Single source for every outbound link and repeated string on the site.
export const GITHUB_REPO = 'Ifthikar20/open-offensive'
export const GITHUB = `https://github.com/${GITHUB_REPO}`
export const DOCS = `${GITHUB}/tree/HEAD/docs` // HEAD -> default branch, never 404s on a rename
export const doc = (name) => `${GITHUB}/blob/HEAD/docs/${name}`
export const ISSUES = `${GITHUB}/issues`
export const LICENSE_URL = `${GITHUB}/blob/HEAD/LICENSE`

export const INSTALL_CMD =
  'curl -sSL https://raw.githubusercontent.com/Ifthikar20/open-offensive/clean-main/install.sh | bash'
export const CLONE_CMD = `git clone ${GITHUB}.git`

export const SITE = {
  name: 'OpenOffensive',
  url: 'https://openoffensive.ai',
  title: 'OpenOffensive — the open-source AI pentester',
  description:
    'OpenOffensive is an open-source, multi-agent AI pentester. Each scan runs in an isolated container, and every finding is validated from real output and delivered with a CVSS score, a proof-of-concept, and a fix.',
}
