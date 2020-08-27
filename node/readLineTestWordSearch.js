let repl = require('repl')
let axios = require('axios')
let chalk = require('chalk') //彩色输出
repl.start({
  prompt:'>',
  eval:async function (word,context,filename,callback) {
    let resolve = await axios.get('http://4.cddm.me:5001/word/' + word)
      callback(null,console.log(chalk.blueBright(resolve.data[0].senses[0].defs[0].defCn)))
   }
})
 