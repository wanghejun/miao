addEventListener('message' , e =>{
  let data = e.data;  //接受传递过来的事件对象message值
  //doingsomething
  // for(;;){
  //   console.log('hello world')
  // }
  postMessage('我收到了')//返回总部的消息
})
