# http-echo

HTTP Echo server for inspecting sent request. The server will return value from requests:
- HTTP Version
- HTTP Method
- HTTP Path
- Raw Header
- Query
- Raw Body

## Usage

Replace existing request Host with http-echo server host (e.g. http://localhost:3000). Works on all path and following HTTP method:
- GET
- POST
- PUT
- PATCH
- DELETE
- OPTIONS

### Request

```http request
POST /access-token HTTP/1.1
Host: localhost:3000
SIGNATURE: <put-signature-here>
Content-Type: application/json
Content-Length: 77

{
  "clientId": "ABCXYZ123",
  "secret": "<highly-confidential-secret>"
}
```

### Response

```json
{
    "httpVersion": "1.1",
    "method": "POST",
    "path": "/access-token",
    "query": {},
    "header": {
        "SIGNATURE": "<put-signature-here>",
        "Content-Type": "application/json",
        "User-Agent": "PostmanRuntime/7.32.2",
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Postman-Token": "5b2ae386-0db7-4e72-b0f8-aa9e089c6cfc",
        "Host": "localhost:3000",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Content-Length": "77"
    },
    "body": "{\n    \"clientId\": \"ABCXYZ123\",\n    \"secret\": \"<highly-confidential-secret>\"\n}"
}
```

## Contributors

<a href="https://github.com/nbs-go/nsql/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nbs-nodejs/http-echo" alt="contributors" />
</a>