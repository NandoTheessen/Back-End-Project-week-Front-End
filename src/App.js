import React, { Component } from 'react';
import axios from 'axios'
import FirstView from './components/Firstview';
import { Route, withRouter } from 'react-router';
import Input from './components/UserInput';
import NoteList from "./components/NoteList";
import Sidebar from './components/SideBar';
import CreateNote from './components/CreateNote';

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

  render() {
    return (
      <div className="App">
        <Route exact path='/' component={FirstView} />
        <Route exact path='/login' render={(props) => <Input {...props} login={this.login} page='login' />} />
        <Route exact path='/signup' render={(props) => <Input {...props} login={this.register} page='signup' />} />
        <Route path='/notes' render={props => <Sidebar {...props} loggedin={this.state.loggedin} logout={this.logout} />} />
        <Route exact path='/notes' render={(props) => <NoteList {...props} delete={this.deleteNote} notes={this.state.notes} />} />
        <Route exact path='/notes/create' render={props => <CreateNote {...props} page='create' function={this.saveNote} />} />
        <Route exact path='/notes/update' render={props => <CreateNote {...props} />} page='update' function={this.updateNote} />
      </div>
    );
  }

  conitnuusLogin = () => {
    console.log("fire login");
    let token = localStorage.getItem('token')
    let user = localStorage.getItem('userid')
    console.log(user);
    if (token && user) {
      this.setState({ loggedin: true, userid: user })
      this.fetchCache(user)
      this.props.history.push('/notes')
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
        localStorage.setItem('userid', data.data.userid)
        this.props.history.push('/notes')
      })
  }

  loggedin = () => {
    this.setState((prevState) => {
      return { ...prevState, loggedin: true }
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
    axios.post('https://notes-backend-nodejs.herokuapp.com/api/notes/all', { userid: uid }, { headers: { "authorization": localStorage.getItem('token') } })
      .then(notes => this.setState(prevState => {
        console.log(notes);
        return {
          ...prevState,
          cache: notes.data,
          notes: notes.data
        }
      }))
  }

  logout = () => {
    localStorage.clear()
    this.setState(() => {
      return { loggedin: false, userid: '', notes: [] }
    })
    this.props.history.push('/')
  }

  saveNote = (note) => {
    var newNote = {
      ...note,
      userid: this.state.userid
    }
    axios.post('https://notes-backend-nodejs.herokuapp.com/api/notes', newNote, { headers: { "authorization": localStorage.getItem('token') } })
      .then(note => {
        this.setState(prevState => {
          return {
            notes: [...prevState.notes, note.data],
            cache: [...prevState.notes, note]
          }
        })
        this.props.history.push('/notes')
      })
      .catch(err => alert(err.message))
  }

  updateNote = (note) => {
    axios.post('https://notes-backend-nodejs.herokuapp.com/api/notes', note, { headers: { "authorization": localStorage.getItem('token') } })
      .then(note => {
        this.setState(prevState => {
          return {
            notes: [...prevState.notes, note],
            cache: [...prevState.notes, note]
          }
        })
        this.propss.history.push('/notes')
      })
  }

  deleteNote = (id) => {
    axios.delete(`https://notes-backend-nodejs.herokuapp.com/api/notes/${id}`, { headers: { "authorization": localStorage.getItem('token') } })
      .then(note => this.fetchCache(this.state.userid))
      .catch(err => alert(err))
  }

  componentDidMount = () => {
    this.conitnuusLogin()
  }
}

export default withRouter(App);