const http = require("http");
const path = require("path");
const fs = require("fs");

//step1: we're creating a server that gets a request and response (req, res)

const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     fs.readFile(
//       path.join(__dirname, "public", "index.html"),
//       (err, content) => {
//         if (err) throw err;
//         res.writeHead(200, { "content-type": "text/html" });
//         res.end(content);
//       }
//     );
//   }
//   if (req.url === "/api/users") {
//     const users = [
//       { name: "Mason Fashina", age: 27 },
//       { name: "Tamzyne Romans", age: 25 },
//     ];
//     res.writeHead(200, { "content-type": "application/json" });
//     res.end(JSON.stringify(users));
//   }

//build file path(for real)

//step2: look in public folder and evaluate the url endpoint,
//if it's '/' then we load index, if not then we load whatever the endpoint is (terinary operator used here)

let filePath = path.join(__dirname, 'public', req.url ==='/'? 'index.html': req.url)

//Extension of file
//step3: we get the extension of the file(page) dynamically and set the content type
let extName = path.extname(filePath)

//initial content type

let contentType = 'text/html';

//check extension & set content type

switch (extName){
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
    case '.json':
        contentType = 'application/json';
        break;
    case '.png':
        contentType = 'image/png';
        break
    case '.jpg':
        contentType = 'image/jpg'
        break
}

//read file
//step 4: we read the file and check for errors
//'ENONET' = not found so we load the 404, else we load a server error, else we render file(page)

fs.readFile(filePath, (err, content) =>{
    if(err){
        if (err.code === 'ENOENT'){
            //page not found error
            fs.readFile(path.join(__dirname, 'public','404.html'), (err, content)=>{
            res.writeHead(200, { "content-type": "text/html" });
            res.end(content, 'utf8')
            })
        }else{
            //some server error if not above error
    
            res.writeHead(5000);
            res.end(`server error ${err.code}`)
        }
    }else{
        //success
        res.writeHead(200, { "content-type": contentType });
        res.end(content, 'utf8')
        
    }
    
})

});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server running on ${PORT}...`));
