import React from 'react';
import {Row, Col, Button, Form, FormGroup, Label, Input, FormText, FormFeedback} from 'reactstrap';
import {createRef} from 'react';
import NotificationAlert from 'react-notification-alert';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Book extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name : undefined,
			contact : undefined,
			number : undefined,
			issueDate : undefined,
			issueTime : undefined,
			returnDate : undefined,
			returnTime : undefined,
			success : false,
			validData : false
		};
    	this.bookHandler = this.bookHandler.bind(this);
    	this.notificationAlert = createRef();
    	this.notify = this.notify.bind(this);
    	this.onChange = this.onChange.bind(this);
	}	
	componentDidMount(){
		let forBookingData = this.props.location.state;
		if (forBookingData){
			this.setState({
				number : forBookingData.vehicleDetails.number,
				issueDate : forBookingData.issueDate,
				issueTime : forBookingData.issueTime,
				returnDate : forBookingData.returnDate,
				returnTime : forBookingData.returnTime,
				validData : true
			});
		}
	}
	bookHandler(e){
	 	e.preventDefault();
	 	if (this.state.success === false && this.state.name && this.state.contact){
	 		//console.log(this.state);
	 		axios({
	 			method : 'post',
	 			url : '/booking/book',
	 			headers : {'Content-Type' : 'application/json'},
				responseType : 'json',
				data : {
					"Number" : this.state.number,
					"name" : this.state.name,
					"phone": this.state.contact,
				    "issueDate": this.state.issueDate,
				    "issueTime": this.state.issueTime,
				    "returnDate": this.state.returnDate,
				    "returnTime": this.state.returnTime
				}
	 		}).then((response)=>{
	 			if (response.status === 200){
	 				//console.log(response.data);
	 				if (response.data.success === true){
	 					this.setState({
	 						success : true
	 					});
	 					this.notify();
	 				}
	 			}
	 		}).catch((err)=>{
	 			console.log(err);
	 		});
	 	}
	}
	onChange(e){
		//console.log(e);
		this.setState({
			[e.target.name] : e.target.value
		});
	}
	notify(){
	    //console.log("Notify");
	    var options = {};
	    options = {
	      place: 'tc',
	      message: (
	        <div>
	          <div>
	            <span>Booking Confirmed<br/>Duration: {this.state.issueDate} to {this.state.returnDate}</span>
	            <br/><br/>
	            <div>
	            	<Row>
	            		<Col md={{ size: 12, offset: 4 }}>
	            			<Link to={{ pathname : "/"}}><Button outline color="secondary">Continue</Button></Link>
	            		</Col>
	            	</Row>
	            </div>
	          </div>
	        </div>
	      ),
	      type: "success",
	      autoDismiss: -1,
	      closeButton : false
	    };
	    this.notificationAlert.current.notificationAlert(options);
	}
	render(){
		if (!this.state.validData)
			return false;
		else{
			return(
				<div className="form-wrapper">
				<NotificationAlert ref={this.notificationAlert} />
					<div className="form-head">
						<Row>
							<Col>
								<div className="head-line">
									<span className="text-info"><h2>Booking Details</h2></span>
								</div>
							</Col>
						</Row>
						<br/><br/>
					</div>
					<div className="form-container">
						<Form>
							<Row form>
					            <Col md={{ size: 6}}>
					              <FormGroup>
								        <Label for="vehicle-number">Vehicle Number</Label>
								        <Input className="border-top-0 border-right-0 border-left-0" type="text" id = "vehicle-number" name="vehicle-number" value={this.state.number} disabled/>
								      </FormGroup>
					            </Col>
		          			</Row>
							<Row form>
								<Col md="6">
								      <FormGroup>
								        <Label for="cust-name">Name</Label>
								        <Input className="border-top-0 border-right-0 border-left-0" type="text" id = "cust-name" name="name" placeholder="Your Name" value={this.state.name} onChange={this.onChange}/>
								        <FormText><p className="text-danger">Required</p></FormText>
								      </FormGroup>
								</Col>
								<Col>
								      <FormGroup>
								        <Label for="cust-contact">Contact Number</Label>
								        <Input className="border-top-0 border-right-0 border-left-0" type="text" id="cust-contact" name="contact" placeholder="+91" value={this.state.contact} onChange={this.onChange} />
								      	<FormText><p className="text-danger">Required</p></FormText>
								      </FormGroup>
								</Col>
							</Row>
							<Row form>
								<Col md="6">
								      <FormGroup>
								        <Label for="issue-date">Issue Date</Label>
								        <Input className="border-top-0 border-right-0 border-left-0" type="text" id="issue-date" name="issue-date" placeholder="DD/MM/YYYY" value={this.state.issueDate} disabled/>
								      </FormGroup>
								</Col>
								<Col>
									  <FormGroup>
							        	<Label for="issue-time">Issue Time</Label>
								        <Input className="border-top-0 border-right-0 border-left-0" type="text" id="issue-time" name="issue-time" placeholder="hh:mm" value={this.state.issueTime} disabled/>
								      </FormGroup>
								</Col>
							</Row>
							<Row form>
								<Col md="6">
								      <FormGroup>
								        <Label for="return-date">Return Date</Label>
								        <Input className="border-top-0 border-right-0 border-left-0" type="text" id="return-date" name="return-date" placeholder="DD/MM/YYYY" value={this.state.returnDate} disabled/>
								      </FormGroup>
								</Col>
								<Col>
									  <FormGroup>
							        	<Label for="return-time">Return Time</Label>
								        <Input className="border-top-0 border-right-0 border-left-0" type="text" id="return-time" name="return-time" placeholder="hh:mm" value={this.state.returnTime} disabled/>
								      </FormGroup>
								</Col>
							</Row>
							<br />
				          <Row>
				            <Col md={{ size: 12, offset: 5 }}>
				              <Button type="submit" color="info" onClick={this.bookHandler}>Confirm</Button>
				            </Col>
	          			</Row>
						</Form>
					</div>
				</div>
			);
		}
	}
}

export default Book;