let readline = require('readline')
const { stdout } = require('process')

let interface = readline.createInterface({
  input:process.stdin,
  output:process.stdout
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
  for(;;){
    let code = await input('>')
    console.log(eval(code))
  }

 }

main()



// process.stdin.on('data',data => {
//   console.log(data.toString())
// })
