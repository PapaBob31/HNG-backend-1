const express = require("express")
const app = express()
const portNo = process.env.PORT ? parseInt(process.env.PORT) : 3700 
const axios = require('axios')

// Handles CORS
function setCorsHeaders(req, res, next) {
	const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3700'
	res.set('Access-Control-Allow-Origin', allowedOrigin)
	res.set('Access-Control-Allow-Headers', 'Content-Type')
	res.set("Access-Control-Max-Age", "86400");	// 24 hours
	res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
	if (req.method === "OPTIONS") {
		res.status(204).send()
	}else next()
}

/** Returns a boolean indicating a number is a perfect square or not
 * @param {number} num - The number to check if it's a perfect square */
function isPerfect(num) {
	const numSqrt = Math.sqrt(num)
	return Math.floor(numSqrt) === numSqrt
}

/** Returns a boolean indicating a number is prime or not
 * @param {number} num - The number to check if it's prime */
function isPrime(num) {
	if (num <= 1) { // num can't be a prime number
		return false
	}

	for (let i=2; i<Math.ceil(num/2); i++) {
		if ((num % i) === 0) {
			return false
		}
	}
	return true
}

/** Returns an array of the digits that make up a number
 * @param {number} number - The number whose digits would be returned */
function seperateDigits(number) {
	let digits = [];
	while(true) {
		digits.push(number%10) // get the last digit of the numbe
		if ((number % 10) === number) { // number is less than 10
			break
		}
		number = Math.floor(number/10) // eliminate the last digit of the number
	}
	return digits
}

/** Returns the sum of numbers in an array
 * @param {number[]} digits - The array of numbers */
function sum(digits) {
	let sum = 0
	for (digit of digits){
		sum += digit
	}
	return sum
}

/** Returns a boolean indicating a number is an armstrong number or not
 * @param {number} number - The number to check if it's an armstrong number 
 * @param {number[]} number - An array of the digits that make up the number*/
function numIsArmstrong(number, digits) {
	let result = 0
	for (digit of digits) {
		result += Math.pow(digit, digits.length)
	}
	return result === number
}

app.use(setCorsHeaders)

app.get("/api/classify-number", async (req, res) => {
	if (!req.query?.number || req.query.number.includes('.') || isNaN(parseInt(req.query.number))) {
		res.status(400).json({number: "alphabet", error: "true"})
		return
	}
	const number = parseInt(req.query.number)
	const digits = seperateDigits(number)
	const numberProps = []
	numIsArmstrong(number, digits) && numberProps.push("armstrong");
	(number % 2) === 0 ? numberProps.push("even") : numberProps.push("odd")

	const funFact =  (await axios({
		method: "get",
		url: `http://numbersapi.com/${req.query.number}`,
	})).data

	res.status(200).json({
		number: req.query.number, 
		is_prime: isPrime(number),
		is_perfect: isPerfect(number),
		properties: numberProps,
		digit_sum: sum(digits),
		fun_fact: funFact
	})
})

app.use((req, res)=> {
	res.status(404).send("Resource not found!")
})

console.log(`Listening on port ${portNo}`)
app.listen(portNo)