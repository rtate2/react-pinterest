import React from 'react';
import firebase from 'firebase/app';

import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/auth';
import MyNavbar from '../components/MyNavbar/myNavbar';
import BoardsContainer from '../components/BoardsContainer/boardsContainer';
import SingleBoard from '../components/SingleBoard/singleBoard';

import './App.scss';

firebaseConnection.firebaseApp();

class App extends React.Component {
  state = {
    authed: false,
    selectedBoardId: null,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  setSingleBoard = (selectedBoardId) => {
    this.setState({ selectedBoardId });
  }

  renderView = () => {
    const { authed, selectedBoardId } = this.state;
    if (!authed) {
      return (<Auth />);
    }
    if (!selectedBoardId) {
      return (<BoardsContainer setSingleBoard={this.setSingleBoard} />);
    }
    return (<SingleBoard selectedBoardId={selectedBoardId} setSingleBoard={this.setSingleBoard}/>);
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <MyNavbar authed= { authed }/>
          { this.renderView() }
      </div>
    );
  }
}

export default App;
