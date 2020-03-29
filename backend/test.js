const repoHandler = require('./lib/repoHandler')
const fs = require('fs').promises
const { getDirLanguages, findFiles, concatByLanguage, diffRepos } = require('./lib/extensionHelper')

async function main () {
  // const repoPath = await repoHandler.cloneRepo('https://github.com/willshiao/node-music-alarm')
  // console.log('Repo Path: ', repoPath)
  // // console.log(await findFiles(repoPath))
  // const languages = await getDirLanguages(repoPath)
  // console.log(languages)
  // console.log(await repoHandler.getHashes(repoPath))
  // const [langStrs, langStoredIdxs] = await concatByLanguage(repoPath)
  // console.log(langStrs)
  // console.log(langStoredIdxs)
  // console.log('Done!')
  const repoPath1 = await repoHandler.cloneRepo('https://github.com/adialachar/dummy1')
  const repoPath2 = await repoHandler.cloneRepo('https://github.com/adialachar/dummy2')
  const result = await diffRepos(repoPath1, repoPath2)
  await fs.writeFile('result.json', JSON.stringify(result, null, 2))
  console.log(result['Python'])
}

main()
