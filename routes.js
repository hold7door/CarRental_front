import Results from 'views/Results.jsx';
import Home from 'views/Home.jsx';

var routes = [
	{
		path : "/find",
		name : "Mathed Vehicles",
		component : Results
	},
	{
		path : "/",
		name : "home",
		component : Home
	}
]

export default routes;