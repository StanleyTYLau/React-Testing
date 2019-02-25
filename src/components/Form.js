import React, { Component } from 'react';

class Form extends Component {
  state = {
    email: null,
    phone: null,
    color: null,
    formErrors: {
      email: '',
      phone: '',
      color: '',
    },
    emailValid: false,
    phoneValid: false,
    colorValid: false,
    submitClicked: false
  }

  validateInput = (field, value) => {
    let validationErrors = {...this.state.formErrors};
    let _emailValid = this.state.emailValid;
    let _phoneValid = this.state.phoneValid;
    let _colorValid = this.state.colorValid;

    switch(field){
      case 'email':
        _emailValid = value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        validationErrors.email = _emailValid ? '' : 'Invalid email adress';
        break; 
      case 'phone':
        _phoneValid = value.match(/^\+1 \d{3} \d{3} \d{2} \d{2}$/); 
        validationErrors.phone = _phoneValid ? '' : 'Invalid phone number. Expecting +1 XXX XXX XX XX';
        break;
      case 'color':
        let upper = value.match(/^[A-Z]*$/); 
        validationErrors.color = upper ? '' : 'Colors must contain only uppercase alphabets';
        if(upper){
          _colorValid = value.match(/^(BLACK|BLUE|RED|GREEN)$/);
          validationErrors.color = _colorValid ? '' : 'Invalid color';
        }
        break;
      default:
    }

    this.setState({
      emailValid: _emailValid,
      phoneValid: _phoneValid,
      colorValid: _colorValid,
      formErrors: validationErrors,
    })
  }

  handleChange = (e) => {
    this.setState(
      {[e.target.id]: e.target.value}
    )
    this.validateInput(e.target.id, e.target.value)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({submitClicked: true});

    if(this.state.emailValid && this.state.phoneValid && this.state.colorValid){
      this.props.addFavColor(this.state);
      this.props.history.push('/report')
    }   
  }

  render() {
    
    return (
      <div className="container">
        <h4>FORM</h4>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" placeholder="xyz@email.com" onChange={this.handleChange} required/>
            {this.state.submitClicked && this.state.formErrors.email}
          </div>
          
          <div>
            <label htmlFor="phone">Phone Number: </label>
            <input type="tel" id="phone" placeholder="+1 XXX XXX XX XX" onChange={this.handleChange} required/>
            {this.state.submitClicked && this.state.formErrors.phone}
          </div>
          
          <div>
            <label htmlFor="color">Favorite Color: </label>
            <input type="text" id="color" placeholder="BLACK, BLUE, RED, GREEN" onChange={this.handleChange} required/>
            {this.state.submitClicked && this.state.formErrors.color}
          </div>
          

          <button>Submit</button>
        </form>
      </div>
    );
  }

  
}

export default Form;