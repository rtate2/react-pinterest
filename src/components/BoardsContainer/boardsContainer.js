import React from 'react';

import authData from '../../helpers/data/authData';
import boardData from '../../helpers/data/boardData';
import Board from '../Board/board';

class BoardsContainer extends React.Component {
  state = {
    boards: [],
  }

  componentDidMount() {
    boardData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        this.setState({ boards });
      })
      .catch((errorFromBoardsContainer) => console.error({ errorFromBoardsContainer }));
  }

  render() {
    return (
      <div>{this.state.boards.map((board) => (<Board key={board.id} board={board} />))}</div>
    );
  }
}

export default BoardsContainer;
