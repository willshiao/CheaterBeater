const repoHandler = require('./lib/repoHandler')
const { getDirLanguages, findFiles } = require('./lib/extensionHelper')

async function main() {
  const repoPath = await repoHandler.cloneRepo('https://github.com/chefong/profanifree')
  // console.log(await findFiles(repoPath))
  const languages = await getDirLanguages(repoPath)
  console.log(languages)
  console.log('Done!')
}

main()
