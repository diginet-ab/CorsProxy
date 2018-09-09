# CorsProxy

TypeScript class implementing a proxy server with CORS providing GET and POST access to servers without CORS.

## Installation

```
npm install @diginet/cors-proxy --save
```

## Usage

### Create proxy server

```typescript
import { CorsProxy } from "../CorsProxy"

const corsProxy = new CorsProxy("127.0.0.1", 8787, console.log)
```

```typescript
/**
 * Constructor
 * @param host The interface (IP) to host the server
 * @param port Server port
 * @param log Optional log function with a string argument
 */
constructor(public host: string, public port: number, private log?: (message: string) => void)
```



### Call from web client

#### Request

```typescript
const url = "http://127.0.0.1:8787/get?url=" +        encodeURIComponent("https://some.server/something")
request(url, (error, response, body) => {
    if (!error)
    	console.log(body)
    else
        console.log(error)
})
```



#### AJAX

```javascript
var url = "https://some.server/something";
$.ajax({
        type: 'GET',
        accepts: 'application/json',
        url: "http://127.0.0.1:8787/get?url=" +    		encodeURIComponent("https://some.server/something"),
        contentType: 'application/json',
        error: function (jqXHR, textStatus, errorThrown) {
            alert('error');
        },
        success: function (result) {
            console.log(result);
        }
    });
```

#### Using Postman

Select the URL parameter content, right-click and select EncodeURIComponent.