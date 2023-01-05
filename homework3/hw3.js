import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

let notes = [
  {id:0, title:'林羿嫻', body:'111010555'},
  {id:1, title:'林嫻', body:'55'},
]                                 //貼文內容

function root(ctx) {
  ctx.response.body = "Hello world!";
}                              //建立函數不讓程式看起來冗長

function getNote(ctx) {
  let id = parseInt(ctx.params.id)     //取id用params
  let {title, body} = notes[id]        //ctx.response.body = notes[id] 能傳回json格式
  ctx.response.type = 'text/html'     //樣式比較沒彈性，若無'text/html'則需設定html頭尾            
  ctx.response.body = `                 
    <h1>${title}</h1>
    <p>${body}</p>
  ` //傳回body
}        

function listNotes(ctx) {            
  let lines = []                   //in取得索引，of取得內容
  for (let note of notes) {       //把所有資料加進lines的陣列裡面
    lines.push(`
      <li>${note.title}</li>
      <p><a href="/note/${note.id}">點點點!!</a></p> 
    `)                    //超連結轉內容       //轉HTML格式
  }
  ctx.response.type = "text/html"
  ctx.response.body = lines.join('\n')    //陣列做join可以變成字串
}

function add(ctx){                      //加入add介面
    let lines=[]
    lines.push(`
    <h1>New note</h1>
    <p>Create a new note.</p>
    <form action="/new" method="note">
      <p><input type="text" placeholder="Title" name="title"></p>
      <p><textarea placeholder="Contents" name="body"></textarea></p>
      <p><input type="submit" value="Create"></p>
    </form>
    `)
    ctx.response.type='text/html'
    ctx.response.body=lines.join('\n')
 }  
 async function create(ctx){
    const body = ctx.request.body()
    if (body.type === "form") {
      const pairs = await body.value
      const post = {}
      for (const [key, value] of pairs) {
        post[key] = value
      }
      console.log('post=', post)
      const id = notes.push(post) - 1;
      post.id = id;
      ctx.response.redirect('/');
    }
}

router.get("/", root)
.get("/notes/list", listNotes)  //列出貼文
.get("/note/:id", getNote)      //貼文代號
.get("/add",add)    
.post("/new",create)

  /*
  .get("/book", (context) => {
    context.response.body = Array.from(books.values());
  })
  .get("/book/:id", (context) => {
    if (context.params && context.params.id && books.has(context.params.id)) {
      context.response.body = books.get(context.params.id);
    }
  });
*/
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });