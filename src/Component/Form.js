import React, { Component } from 'react';
import './Form.css';
import 'react-tabs/style/react-tabs.css';
export default class Form extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
  };
  state = {
    fields: {
      username: '',
      emailid: '',
      mobileno: '',
      radiocheck: '',
      mode: "submit",
      id: ''
    },
    errors: {},
    users: [
      {
        id: 0,
        username: "",
        emailid: "",
        mobileno: "",
        radiocheck: ''
      }
    ]
  }
  handleChange(event) {
    event.preventDefault();
    event.stopPropagation()
    this.setState({
      fields: {
        ...this.state.fields,
        [event.target.name]: event.target.value
      }
    });
  }
  submituserRegistrationForm(event) {
    event.preventDefault();
    if (this.validateForm(this.state.fields)) {
      console.log(this.state.fields);
      alert("Thank you for completing the information");
    }
  }
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "*Please enter your username.";
    }
    if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["username"] = "*Please enter alphabet characters only.";
      }
    }
    if (!fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email-ID.";
    }
    if (typeof fields["emailid"] !== "undefined") {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;
        errors["emailid"] = "*Please enter valid email-ID.";
      }
    }
    if (!fields["mobileno"]) {
      formIsValid = false;
      errors["mobileno"] = "*Please enter your mobile no.";
    }
    if (typeof fields["mobileno"] !== "undefined") {
      if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["mobileno"] = "*Please enter valid mobile no.";
      }
    }
    if (!fields["radiocheck"]) {
      formIsValid = false;
      errors["radiocheck"] = "*Please select any one.";
    }
    if (fields.mode === "submit") {
      this.setState({
        users: [
          ...this.state.users,
          {
            ...this.state.fields,
            id: this.state.users[this.state.users.length - 1].id + 1
          }     
        ]
      })
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }
  componentDidMount() {
    this.DATA = JSON.parse(localStorage.getItem('contact_form'));
console.log("this.DATA.",this.DATA)
    if (localStorage.getItem('contact_form')) {
      this.setState({
        username: this.DATA.username,
        emailid: this.DATA.emailid,
        mobileno: this.DATA.mobileno,
        radiocheck: this.DATA.radiocheck,
        users: this.DATA.users
      })
    } else {
      this.setState({
        username: '',
        emailid: '',
        mobileno: '',
        radiocheck: ''
      })
    }
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("users in nextstate",nextState)
    localStorage.setItem('contact_form', JSON.stringify(nextState));
  }
  render() {
    const { users } = this.state;
    console.log("users",users)
    const Table = ({ users = [] }) => {
      return (
        <div className="table">
          <div className="all-feedback">All Feedback</div>
          <div className="table-header">
            <div className="row">
              <th className="column username-head">Name</th>
              <th className="column emailid-head">EmailId</th>
              <th className="column mobile-head">Phone</th>
              <th className="column radiocheck-head">Quality</th>
            </div>
          </div>
          <div className="table-body">
            {users.map((user, key) => {
              return (
                <div className='row' >
                  <td className="column ">{user.username}</td>
                  <td className="column emailval">{user.emailid}</td>
                  <td className="column mobval ">{user.mobileno}</td>
                  <td className="column  qualityval">{user.radiocheck}</td>
                </div>
              );
            })}
          </div>
        </div>
      );
    };
    return (
      <div className="container">
        <div>
          <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#home">Form</a></li>
            <li><a data-toggle="tab" href="#menu1">Table</a></li>
          </ul>
          <div class="tab-content">
          <div id="home" class="tab-pane fade in active">
            <form className="main-form-input" method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm}>
              <div className="aromatic-wrapper">
                <div className="aromatic-bar">Aromatic Bar</div>
                <div className="para">We are committed to providing you with the best
                  dining experience possible, so we welcome your comments. Please fill out this questionnaire. Thank you.</div>
              </div>
              <div className="main-row-wrapper">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="text-align">Name</div>
                      <input type="text" value={this.state.fields.username} className="input-field form-control" name="username"
                        onChange={this.handleChange}
                      />
                      <div className="errorMsg">{this.state.errors.username}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="text-align">Email Field</div>
                      <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange} className="input-field form-control"
                      />
                      <div className="errorMsg">{this.state.errors.emailid}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="text-align">Phone Field</div>
                      <input type="text" name="mobileno" value={this.state.fields.mobileno} onChange={this.handleChange} className="input-field form-control"
                      />
                      <div className="errorMsg">{this.state.errors.mobileno}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group"></div>
                    <div className="text-align"> Radio Button</div>
                    <div className="radio-button-wrapper">
                      <label className="radio-inline">
                        <input type="radio" id="Excellent" value="Excellent" name="radiocheck" onChange={this.handleChange} />
                        <span className="excellent">Excellent</span>
                      </label>
                      <label className="radio-inline">
                        <input className="radio-button-margin" type="radio" id="Good" value="Good" name="radiocheck"
                          onChange={this.handleChange} />
                        <span className="good">Good</span>
                      </label>
                      <label class="radio-inline">
                        <input className="radio-button-margin" type="radio" id="Fair" value="Fair" name="radiocheck"
                          onChange={this.handleChange} />
                        <span className="fair">Fair</span>
                      </label>
                      <label className="radio-inline">
                        <input className="radio-button-margin" type="radio" id="Bad" value="Bad" name="radiocheck"
                          onChange={this.handleChange} />
                        <span className="bad">Bad</span>
                      </label>
                    </div>
                    <div className="errorMsg radiocheck-msg-error">{this.state.errors.radiocheck}</div>
                  </div>
                </div>
                <input type="submit" value="submit" className="button btn-success" />
              </div>
            </form>
           </div>
            <div id="menu1" class="tab-pane fade">
            <Table
              users={users}
            />
          </div>
          </div>        
        </div>
      </div>
    )
  }
}


