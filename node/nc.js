let net = require('net')

let domain = process.argv[2]
let port = process.argv[3]

let conn = net.connect(port,domain,() => {
  process.stdin.pipe(conn).pipe(process.stdout)
})
