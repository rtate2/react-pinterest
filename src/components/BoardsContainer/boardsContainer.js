import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import boardData from '../../helpers/data/boardData';
import Board from '../Board/board';
import BoardForm from '../BoardForm/boardForm';

class BoardsContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func,
  }

  state = {
    boards: [],
  }

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    boardData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        this.setState({ boards });
      })
      .catch((errorFromBoardsContainer) => console.error({ errorFromBoardsContainer }));
  }

  addBoard = (newBoard) => {
    boardData.saveBoard(newBoard)
      .then(() => {
        this.getBoards();
      })
      .catch((errorFromSaveBoard) => ({ errorFromSaveBoard }));
  }

  render() {
    const { setSingleBoard } = this.props;

    return (
      <div>
        <BoardForm addBoard={this.addBoard} />
        {this.state.boards.map((board) => (<Board key={board.id} board={board} setSingleBoard={setSingleBoard} />))}
        </div>
    );
  }
}

export default BoardsContainer;
