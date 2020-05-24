import React from 'react';
import { Row, Col, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import TimePicker from 'react-time-picker';

class Home extends React.Component{
	constructor(props){
		super(props);
		this.onChange = this.onChange.bind(this);
		this.setTimeIssue = this.setTimeIssue.bind(this);
		this.setTimeReturn = this.setTimeReturn.bind(this);
		this.state = {
			city : "",
			issueDate : undefined,
			issueTime : "00:00",
			returnDate : undefined,
			returnTime : "00:00",
			minIssueDate : undefined,
			maxIssueDate : "2020-12-31",
			minReturnDate : undefined,
			maxReturnDate : "2020-12-31"
		};
	}
	componentDidMount(){
		let curDateOb = new Date();
		curDateOb.setTime(curDateOb.getTime() + 330*60*1000);
		curDateOb.setTime(curDateOb.getTime() + 36*60*60*1000);
		let curDate = curDateOb.toISOString();
		let mIDate = curDate.slice(0, 10);
		curDateOb.setTime(curDateOb.getTime() + 24*60*60*1000);
		curDate = curDateOb.toISOString();
		let mRDate = curDate.slice(0, 10);
		this.setState({
			minIssueDate : mIDate,
			minReturnDate : mRDate,
			issueDate : mIDate,
			returnDate : mRDate
		});
	}
	onChange(e){
		//console.log(e.target.name);
		if (e.target.name === "issueDate"){
			let changedMinReturn = new Date(e.target.value);
			changedMinReturn.setTime(changedMinReturn.getTime() + 24*60*60*1000);
			let asString = changedMinReturn.toISOString();
			this.setState({
				[e.target.name] : e.target.value,
				minReturnDate : asString.slice(0, 10)
			});
		}
		else{
	    	this.setState({
				[e.target.name] : e.target.value
	    	});
    	}
	}
	setTimeIssue(e){
		console.log(e);
		this.setState({
			issueTime : e,
		});
	}
	setTimeReturn(e){
		this.setState({
			returnTime : e
		});
	}
	render(){
		let find_data = {...this.state};
		return(
	      <div className="home-main">
	        <div className="input-box">
	          <InputGroup size="lg">
	            <InputGroupAddon addonType="prepend">City</InputGroupAddon>
	            <Input name="city" placeholder="Enter your city" value={this.state.city} onChange={this.onChange} required/>
	          </InputGroup>
	          <br/>
	          <Row>
	            <Col md="6">
	              <InputGroup size="sm">
	                <InputGroupAddon addonType="prepend">Issue Date</InputGroupAddon>
	               <Input name="issueDate" type="date" min={this.state.minIssueDate} max={this.state.maxIssueDate} value={this.state.issueDate} onChange={this.onChange} required/>
	              </InputGroup>
	            </Col>
	            <Col>
	              <InputGroup size="sm">
	                <InputGroupAddon addonType="prepend">Issue Time</InputGroupAddon>
	                <TimePicker className="time-pick" format="HH:mm" disableClock={true} required={true} onChange={this.setTimeIssue} value={this.state.issueTime} clearIcon="Clear"/>
	              </InputGroup>
	            </Col>
	          </Row>
	          <br/>
	          <Row>
	            <Col md="6">
	              <InputGroup size="sm">
	                <InputGroupAddon addonType="prepend">Return Date</InputGroupAddon>
	                <Input name="returnDate" type="date" min={this.state.minReturnDate} max={this.state.maxReturnDate} value={this.state.returnDate} onChange={this.onChange} required/>
	              </InputGroup>
	            </Col>
	            <Col>
	              <InputGroup size="sm">
	                <InputGroupAddon addonType="prepend">Return Time</InputGroupAddon>
	                <TimePicker className="time-pick" format="HH:mm" disableClock={true} required={true} onChange={this.setTimeReturn} value={this.state.returnTime} clearIcon="Clear"/>
	              </InputGroup>
	            </Col>
	          </Row>
	          <br/>
	          <Row>
	            <Col md={{ size: 12, offset: 5 }}>
	              <Link to={{ pathname: '/find', state : find_data }}><Button color="info">Find Cars</Button></Link>
	            </Col>
	          </Row>
        	</div>
        </div>
		);
	}
}

export default Home;