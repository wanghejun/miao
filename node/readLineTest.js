let readline = require('readline')
const { stdout } = require('process')

let interface = readline.createInterface({
  input:process.stdin,
  output:stdout
})

// interface.question('what are you doing?', answer => {
//   console.log(answer)
// })
function input(msg) { 
  return new Promise(resolve => {
    interface.question(msg, answer => {
      resolve( answer)
    })
  })
}

async function main() { 
  let a = await input('a')
  let b = await input('b')
  console.log(Number(a) + Number(b))
  interface.close()
  
 }

main()



// process.stdin.on('data',data => {
//   console.log(data.toString())
// })
