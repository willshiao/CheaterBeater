const repoHandler = require('./lib/repoHandler')
const { getDirLanguages, findFiles, concatByLanguage } = require('./lib/extensionHelper')

async function main () {
  const repoPath = await repoHandler.cloneRepo('https://github.com/willshiao/node-music-alarm')
  console.log('Repo Path: ', repoPath)
  // console.log(await findFiles(repoPath))
  const languages = await getDirLanguages(repoPath)
  console.log(languages)
  console.log(await repoHandler.getHashes(repoPath))
  const [langStrs, langStoredIdxs] = await concatByLanguage(repoPath)
  console.log(langStrs)
  console.log(langStoredIdxs)
  console.log('Done!')
}

main()
