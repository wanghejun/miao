// console.log('hello world')

//黑窗口的标准输出流
process.stdout.write('hello world') //它的输入后加不会加回车


process.stdin.on('data', data => {//监听on data事件。把黑窗口输入的字符输出出来
  console.log(data.toString())
})
