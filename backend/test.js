const repoHandler = require('./lib/repoHandler')
const { getDirLanguages, findFiles } = require('./lib/extensionHelper')

async function main() {
  const repoPath = await repoHandler.cloneRepo('https://github.com/chefong/profanifree')
  console.log('Repo Path: ', repoPath)
  // console.log(await findFiles(repoPath))
  const languages = await getDirLanguages(repoPath)
  console.log(languages)
  console.log(await repoHandler.getHashes(repoPath))
  console.log('Done!')
}

main()
