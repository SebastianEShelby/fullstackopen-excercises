import ReactDOM from 'react-dom/client'

import App from './App'

let counter = 1

const root = ReactDOM.createRoot(document.getElementById('root'))

const refresh = () => {
	root.render(
		<App counter={counter} />
	)
	console.log('counter', counter)

	if (counter == 5) {
		console.log("counter is 5");
		clearInterval(intervalId);
	}
}

const intervalId = setInterval(() => {
	refresh()
	counter += 1
}, 1000)