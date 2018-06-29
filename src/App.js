import React, { Component } from 'react';
import axios from 'axios'
import FirstView from './components/Views/WelcomeScreen';
import { Route, withRouter } from 'react-router';
import Input from './components/Input/UserInput';
import NoteList from "./components/Views/NoteList";
import Sidebar from './components/Views/SideBar';
import CreateNote from './components/Input/CreateNote';
import Note from './components/Views/Note';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cache: [],
      notes: [],
      userid: '',
      loggedin: false,
      note: {}
    }
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' component={FirstView} />
        <Route exact path='/login' render={(props) => <Input {...props} login={this.login} page='login' />} />
        <Route exact path='/signup' render={(props) => <Input {...props} register={this.register} page='register' />} />
        <Route path='/notes' render={props => <Sidebar {...props} loggedin={this.state.loggedin} logout={this.logout} />} />
        <Route path='/note' render={props => <Sidebar {...props} loggedin={this.state.loggedin} logout={this.logout} />} />
        <Route exact path='/notes' render={(props) => <NoteList {...props} delete={this.deleteNote} notes={this.state.notes} choseNote={this.displayNote} />} />
        <Route exact path='/notes/:id' render={props => <Note {...props} note={this.state.note} update={this.updateNote} delete={this.deleteNote} />} />
        <Route exact path='/note/create' render={props => <CreateNote {...props} page='create' function={this.saveNote} />} />
        <Route exact path='/note/edit' render={props => <CreateNote {...props} page='update' note={this.state.note} function={this.updateNote} />} />
      </div>
    );
  }

  displayNote = (id) => {
    let note = this.state.notes.find((e) => e._id === id)
    this.setState(() => {
      return { note: note }
    })
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
      .catch(err => this.setState(() => {
        return { error: err.message }
      }))
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

  updateNote = (updatedNote) => {
    axios.put('https://notes-backend-nodejs.herokuapp.com/api/notes', { ...updatedNote }, { headers: { "authorization": localStorage.getItem('token') } })
      .then(note => {
        let newState = this.state.notes.filter(e => e._id !== updatedNote.id)
        this.setState(prevState => {
          return {
            notes: [...newState, note.data],
            cache: [...newState, note.data]
          }
        })
        this.props.history.push('/notes')
      })
      .catch(err => console.log(err))
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