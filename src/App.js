import React, { Component } from 'react';
import axios from 'axios'
import FirstView from './components/Firstview';
import { Route, withRouter } from 'react-router';
import Input from './components/UserInput';
import NoteList from "./components/NoteList";
import Sidebar from './components/SideBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cache: [],
      notes: [],
      userid: '',
      loggedin: false
    }
  }
  login = (credentials) => {
    axios.post('https://notes-backend-nodejs.herokuapp.com/api/login', credentials)
      .then(data => {
        console.log(data);
        this.setState((prevState) => {
          return { ...prevState, notes: data.data.notes, loggedin: true, userid: data.data.userid, cache: data.data.notes }
        })
        localStorage.setItem('token', data.data.token)
        this.props.history.push('/notes')
      })
  }

  register = (newUser) => {
    axios.post('https://notes-backend-nodejs.herokuapp.com/api/register', newUser)
      .then(data => {
        this.setState((prevState) => {
          return { ...prevState, notes: data.data.notes, loggedin: true, userid: data.data.userid, cache: data.data.notes }
        })
        localStorage.setItem('token', data.data.token)
        this.props.history.push('/notes')
      })
  }

  fetchCache = (uid) => {
    axios.post('https://notes-backend-nodejs.herokuapp.com/api/notes/all', uid)
      .then(notes => this.setState(prevState => {
        return {
          ...prevState,
          cache: notes.data
        }
      }))
  }

  logout = () => {
    localStorage.clear()
    this.setState((prevState) => {
      return { loggedin: false, userid: '', notes: [] }
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' component={FirstView} />
        <Route exact path='/login' render={(props) => <Input {...props} login={this.login} page='login' />} />
        <Route exact path='/signup' render={(props) => <Input {...props} login={this.register} page='signup' />} />
        <Route exact path='/notes' render={props => <Sidebar {...props} logout={this.logout} />} />
        <Route exact path='/notes' render={(props) => <NoteList {...props} notes={this.state.notes} />} />
      </div>
    );
  }
}

export default withRouter(App);