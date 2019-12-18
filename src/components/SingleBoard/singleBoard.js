import React from 'react';
import PropTypes from 'prop-types';

import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';

import Pins from '../Pins/pins';
import PinForm from '../PinForm/pinForm';

class SingleBoard extends React.Component {
  static propTypes = {
    selectedBoardId: PropTypes.string,
    setSingleBoard: PropTypes.func,
  }

  state = {
    board: {},
    pins: [],
  }

  getPinData = (selectedBoardId) => {
    pinData.getPinsByBoardId(selectedBoardId)
      .then((pins) => {
        this.setState({ pins });
      })
      .catch((errorFromGetPins) => console.error({ errorFromGetPins }));
  }

  savePinData = (newPin) => {
    pinData.savePin()
      .then(() => {
        this.getPinData()
      })
      .catch((errorFromSavePin) => ({ errorFromSavePin }));
  }

  componentDidMount() {
    this.getPins();
  }

  deleteSinglePin = (pinId) => {
    const { selectedBoardId } = this.props;
    pinData.deletePin(pinId)
      .then(() => {
        this.getPinData(selectedBoardId);
      })
      .catch((errorFromDeletePin) => console.error({ errorFromDeletePin }));
  }

  removeSelectedBoardId = (e) => {
    e.preventDefault();
    const { setSingleBoard } = this.props;
    setSingleBoard(null);
  }

  getPins = () => {
    const { selectedBoardId } = this.props;
    boardData.getSingleBoard(selectedBoardId)
      .then((request) => {
        this.setState({ board: request.data });
        pinData.getPinsByBoardId(selectedBoardId)
          .then((pins) => {
            this.setState({ pins });
          })
          .catch((errorFromGetPins) => console.error({ errorFromGetPins }));
      })
      .catch((errorFromGetSingleBoard) => console.error(errorFromGetSingleBoard));
  }

  addPin = (newPin) => {
    pinData.savePin(newPin)
      .then(() => {
        this.getPins();
      })
      .catch((errorFromSavePin) => ({ errorFromSavePin }));
  }

  render() {
    const { board, pins } = this.state;
    const { selectedBoardId } = this.props;

    return (
      <div>
        <button className="btn btn-info" onClick={this.removeSelectedBoardId}>x Close Board View</button>
        <div className="SingleBoard col-8 offset-2">
          <h2>{board.name}</h2>
          <p>{board.description}</p>
          <PinForm savePin={this.savePinData} selectedBoardId={selectedBoardId} />
          <div className="d-flex flex-wrap">
          { pins.map((pin) => <Pins key={pin.id} pin={pin} deleteSinglePin={this.deleteSinglePin} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleBoard;
