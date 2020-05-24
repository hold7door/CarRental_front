import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';
import {BsPeopleFill} from 'react-icons/bs';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Results extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tableData : [],
			city : undefined,
			issueDate : undefined,
			issueTime : undefined,
			returnDate : undefined,
			returnTime : undefined,
			validData : false
		};
		this.renderTableData = this.renderTableData.bind(this);
	}
	componentDidMount(){
		let find_info = this.props.location.state;
		if (find_info){
			axios({
				method : 'post',
				url : '/booking/show',
				headers : {'Content-Type' : 'application/json'},
				responseType : 'json',
				data : {
					"city" : find_info.city,
					"filters" : {
						"issueDate" : find_info.issueDate,
	    				"issueTime" : find_info.issueTime,
	    				"returnDate" : find_info.returnDate,
	    				"returnTime" : find_info.returnTime
					}
				}
			}).then((response)=>{
				if (response.status === 200){
					if (response.data.success == true){
						console.log(response.data);
						let updatedTableData = [];
						for (let vdata of response.data.AllResults){
							updatedTableData.push(vdata);
						}
						this.setState({
							tableData : updatedTableData,
							city : find_info.city,
							issueDate : find_info.issueDate,
							issueTime : find_info.issueTime,
							returnDate : find_info.returnDate,
							returnTime : find_info.returnTime,
							validData : true
						});
					}
				}

			}).catch((err)=>{
				console.log(err);
			});
		}
	}
	renderTableData(){
		let curTableData = [...this.state.tableData];
		console.log(curTableData);
		let tableDataHtml = [];
		for (let tdata of curTableData){
			let dataForDetails = {
				city : this.state.city,
				issueDate : this.state.issueDate,
				issueTime : this.state.issueTime,
				returnDate : this.state.returnDate,
				returnTime : this.state.returnTime,
				vehicleDetails : {
					number : tdata.VehicleNumber,
					model : tdata.Model,
					seatingCapacity : tdata.SeatingCapacity,
					rentPerDay : tdata.RentPerDay
				}
			};
			tableDataHtml.push(
				<div className="item-vehicle">
					<Row>
						<Col md="4">
							<div>
								<CardImg src="" alt="Card image cap" />
							</div>
						</Col>
						<Col md="4">
							<CardText>{tdata.Model}</CardText>
							<div className="item-capacity">
							<p className="text-muted"><BsPeopleFill/> {tdata.SeatingCapacity} Seater</p>
							</div>
						</Col>
						<Col md="2">
							<p>{tdata.RentPerDay}</p>
						</Col>
						<Col md="2">
							<div className="item-ops">
								<Link to={{ pathname: '/details', state : dataForDetails }}><Button color="secondary">Details</Button></Link>{' '}	
								<Link to={{ pathname: '/book', state : dataForDetails }}><Button color="info">Book</Button></Link>
							</div>
						</Col>
					</Row>
				</div>
			);
		}
		return tableDataHtml;
	}
	render(){
		if (!this.state.validData)
			return false;
		else{
			return (
				<div className="search-results">
					<div className="result-head">
						<Row>
							<Col>
								<div className="head-line">
									<span className="text-info"><h2>Cars For Rent</h2></span>
								</div>
							</Col>
						</Row>
						<br/><br/>
						<Row>
							<Col md="4">
							</Col>
							<Col md="4">
								<p>Car Details</p>
							</Col>
							<Col>
							<p>Rent Per Day</p>
							</Col>
						</Row>
					</div>
					{this.renderTableData()}
				</div>
			);
		}
	}
}

export default Results;