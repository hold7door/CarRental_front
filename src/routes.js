import Results from './views/Results.jsx';
import Home from './views/Home.jsx';
import Booking from './views/Booking.jsx';
import Details from './views/Details.jsx';

var routes = [
	{
		path : "/find",
		name : "Mathed Vehicles",
		component : Results
	},
	{
		path : "/book",
		name : "Booking",
		component : Booking
	},
	{
		path : "/details",
		name : "Vehicle details",
		component : Details
	},
	{
		path : "/",
		name : "home",
		component : Home
	},
]

export default routes;