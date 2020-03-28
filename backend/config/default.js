'use strict'

module.exports = {
  site: {
    port: 3000 // Default port number, can be overriden with the PORT env variable
  },
  // Lanaguages we don't care about, as listed here:
  // https://github.com/blakeembrey/language-map/blob/master/languages.json
  languageBlacklist: [
    'GCC Machine Description'
  ],
  excludeDirs: [
    'node_modules', '__pycache__', '.git'
  ],
  // We can use MD5 because collisions shouldn't occur in normal usage
  // and collisions don't really matter
  hashAlgorithm: 'md5',
  repoDir: 'repos'
}
