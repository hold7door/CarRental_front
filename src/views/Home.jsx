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
			city : undefined,
			issueDate : undefined,
			issueTime : undefined,
			returnDate : undefined,
			returnTime : undefined,
			minIssueDate : undefined,
			maxIssueDate : "2020-12-31",
			minReturnDate : undefined,
			maxReturnDate : "2020-12-31"
		};
	}
	componentDidMount(){
		let curDate = new Date();
		let mIDate = curDate.slice(0, 10);
		let mRDate = mIDate;
		this.setState({
			minIssueDate : mIDate,
			minReturnDate : mRDate
		});
	}
	onChange(e){
		//console.log(e);
    	this.setState({
			[e.target.name] : e.target.value
    	});
	}
	setTimeIssue(e){
		this.setState({
			issueTime : e
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