# [HNG](https://hng.tech/) Backend Internship Stage 1 task

This is a simple http server with only one publicly accessible endpoint - /api/classify-number?number=\<your-integer\>

**Note**: `<your-integer>` `GET` parameter must be an integer

The endpoint is only accessible through an http GET request. It returns a response in json format
## Local development
- Clone the repo git clone https://github.com/PapaBob31/HNG-backend-1.git
- After cloning, navigate into the newly created folder and run the following commands through the shell
```shell
npm install

npm start
```
- The server should now be accessible at http://localhost:3700
- You can create a new environment variable file named .env.local to edit both the port number and allowed CORS origin like so
```env
ALLOWED_ORIGIN=<preferred origin>
PORT=<your preferred port>
```
## Example

Request

GET `http://localhost:3700/api/classify-number?number=371`

Response
```json
{	
	"number": "371",
	"is_prime": false,
	"is_perfect": false,
	"properties": ["armstrong", "odd"],
	"digit_sum": 11,
	"fun_fact": "371 is a boring number.",
}
```
Ps: You can hire nodejs developers [here](https://hng.tech/hire/nodejs-developers)

