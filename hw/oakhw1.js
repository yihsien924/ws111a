import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

function page(title,body) {
  return `<html>
  <head>
  <title>
  ${title}
  </title>
  <style>
  
  body{
    text-align: center;
    background-color: LightBlue ;
}      
</style>
  </head>
  <body>
  ${body}
  </body>
  </html>`
}

app.use((ctx) => {
  let pathname = ctx.request.url.pathname
  if (pathname.startsWith("/login")) {
    ctx.response.body = page('login',`
       <form action="" method="post">
       <div> 
       <table>
       <th>Login</th>
        <tr>
        <td><input type="text" name="user" value="" placeholder="User Name"/></td>
        </tr>
        <tr>
        <td> <input type="password" name="password" value="" placeholder="Password"/> </td>
        </tr>
        <tr>
        <td><input type="button" href="/home" name = "submit" value = "提交" id="btn"/> </td>
        </tr>
        </table>
        </div>
         <style>
         body {text-align: center;} 
         table {margin: auto;}
         .table, th, td
         {  
             border: 1px solid black;
             text-align: center
         }
            </style>
        
       </form>
    `)
  } else {
    ctx.response.body = page('home',`
      <h1>My web</h1>
      <input type="button" value="login" onclick="location.href='http://127.0.0.1:8000/login'">
    `)
  }
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });