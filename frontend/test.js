fetch('http://localhost:5000/api/review', {
	method: 'POST',
	body: JSON.stringify({
		prompt: 'Review this',
	}),
	headers: {
		'Content-Type': 'application/json',
	},
})
	.then((res) => {
		console.log(res);

		return res.json();
	})
	.then((data) => console.log(data));
