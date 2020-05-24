import React from 'react';
import {BsPeopleFill} from 'react-icons/bs'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col, Table
} from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Details extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tableData : [],
			city : undefined,
			issueDate : undefined,
			issueTime : undefined,
			returnDate : undefined,
			returnTime : undefined,
			number : undefined,
			model : undefined,
			seatingCapacity : undefined,
			rentPerDay : undefined,
			validData : false
		};
		this.renderTableData = this.renderTableData.bind(this);
	}
	componentDidMount(){
		let passedInfo = this.props.location.state;
		if (passedInfo){
			axios({
				method : 'get',
				url : '/vehicle/active/' + passedInfo.vehicleDetails.number + '?secret_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlYjZiNDgzOGI5NjVkMDQ3NDMyZWIwMyIsInVzZXJuYW1lIjoidXNlciJ9LCJpYXQiOjE1ODkwMzk3NzB9.lq_prIMWZDrIUXERNTK8qWpBfip235pN_knA13YqlME',
				responseType : 'json'
			}).then((response)=>{
				if (response.status === 200){
					let updatedTableData = [];
					for (let cdata of response.data.ActiveBookings){
						updatedTableData.push(cdata);
					}
					this.setState({
						tableData : updatedTableData,
						city : passedInfo.city,
						issueDate : passedInfo.issueDate,
						issueTime : passedInfo.issueTime,
						returnDate : passedInfo.returnDate,
						returnTime : passedInfo.returnTime,
						number : passedInfo.vehicleDetails.number,
						model : passedInfo.vehicleDetails.model,
						seatingCapacity : passedInfo.vehicleDetails.seatingCapacity,
						rentPerDay : passedInfo.vehicleDetails.rentPerDay,
						validData : true
					});
				}

			}).catch((err)=>{
				console.log(err);
			});
		}
	}
	renderTableData(){
		let tableDataHtml = [];
		for (let cdata of this.state.tableData){
			let splitIssue = cdata.issueDateTime.split('T');
			let splitReturn = cdata.returnDateTime.split('T');
			let custIssueDate = splitIssue[0];
			let custIssueTime = splitIssue[1].slice(0, 5);
			let custReturnDate = splitReturn[0];
			let custReturnTime = splitReturn[1].slice(0, 5);
			tableDataHtml.push(
				<tr>
					<td>{cdata.name}</td>
					<td>{cdata.phone}</td>
					<td>{custIssueDate}</td>
					<td>{custIssueTime}</td>
					<td>{custReturnDate}</td>
					<td>{custReturnTime}</td>
				</tr>
			);
		}
		return tableDataHtml;
	}
	render(){
		let forBookingData = {
			issueDate : this.state.issueDate,
			issueTime : this.state.issueTime,
			returnDate : this.state.returnDate,
			returnTime : this.state.returnTime,
			vehicleDetails : {
				number : this.state.number
			}
		};
		if (!this.state.validData)
			return false;
		else{
			return(
				<div className="detail-wrapper">
					<div className="detail-head">
						<Row>
							<Col>
								<div className="head-line">
									<p className="text-info"><h4>Car Details</h4></p>
								</div>
							</Col>
						</Row>
						<br/><br/>
					</div>
					<div className="vehicle-details-wrapper">
						<Row>
							<Col md="6">
								<div className="vehicle-image">
								</div>
							</Col>
							<Col>
								<div className="vehicle-details">
									<p><h4>{this.state.model}</h4></p>
									<p className="text-muted"><BsPeopleFill/> {this.state.seatingCapacity} Seater</p>
									<p>Rent per day : {this.state.rentPerDay}</p>
									<Link to={{ pathname: '/book', state : forBookingData }}><Button color="info">Book Now</Button></Link>
								</div>
							</Col>
						</Row>
					</div>
					<div className="active-bookings-wrapper">
						<div className="active-head">
							<p className="text-info"><h4>Active Bookings</h4></p>
						</div>
						<div className="table-contents">
							<Table>
								<thead>
									<th>Name</th>
									<th>Contact Number</th>
									<th>Issue Date</th>
									<th>Issue Time</th>
									<th>Return Date</th>
									<th>Return Time</th>
								</thead>
								<tbody>
								{this.renderTableData()}
								</tbody>
							</Table>
						</div>
					</div>
				</div>
			);
		}
	}
}	
export default Details;