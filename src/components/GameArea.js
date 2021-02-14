import React from 'react';
import { Container } from 'semantic-ui-react';
import CardGroup from './CardGroup';
import Result from './Result';
import Controls from './Controls';
import config from '../Config';
import '../css/GameArea.css';

export default class GameArea extends React.Component {
  initialState = {
    mode: config.defaultMode,
    cardsData: this.getEmptyCardsData(config.defaultMode),
    numbersSorted: [],
    gameState: 'waiting',
    currentGuess: null,
    milliseconds: 0,
    interval: null,
    isBestTime: false
  };

  constructor(props) {
    super(props);

    this.state = this.initialState;
  }

  render() {
    return (
      <Container className='game-container'>
        <Controls
          milliseconds={this.state.milliseconds}
          gameState={this.state.gameState}
          onSelectMode={this.onSelectMode}
          onStartGame={this.onStartGame}
          onStartGuessing={this.onStartGuessing}/>
        <CardGroup
          cardsData={this.state.cardsData}
          onGuess={this.onGuess}
          gameState={this.state.gameState}/>
        <Result
          gameState={this.state.gameState}
          isBestTime={this.state.isBestTime}
          milliseconds={this.state.milliseconds}
          onPlayAgain={this.onPlayAgain}/>
      </Container>
    );
  }

  onSelectMode = (mode) => {
    this.setState({ mode, cardsData: this.getEmptyCardsData(mode) });
    this.props.onModeChange(mode);
  }

  onStartGame = async () => {
    const response = await fetch(`${config.randomNumbersEndpoint}?mode=${this.state.mode}`);
    const numbers = await response.json();
    const cardsData = numbers.unsorted.map(number => ({ value: number, status: 'shown', correct: false }));

    this.setState({ 
      cardsData,
      numbersSorted: numbers.sorted,
      gameState: 'showing'
    });
  }

  onStartGuessing = () => {
    const interval = setInterval(() => {
      this.setState({ milliseconds: this.state.milliseconds + 100 })
    }, 100);

    this.setState({
      cardsData: this.state.cardsData.map(card => ({...card, status: 'hidden'})),
      gameState: 'guessing',
      currentGuess: 0,
      interval
    });
  };

  onGuess = async (guess, index) => {
    const cardsData = JSON.parse(JSON.stringify(this.state.cardsData));
    cardsData[index].status = 'shown';

    if (guess === this.state.numbersSorted[this.state.currentGuess]) {
      await this.onCorrect(cardsData, index);
    } else {
      this.onIncorrect(cardsData, index);
    }
  }

  async onCorrect(cardsData, index) {
    cardsData[index].correct = true;

    if (this.state.currentGuess === this.state.mode - 1) {
      this.onGameWin();
    }

    this.setState({ cardsData, currentGuess: this.state.currentGuess + 1 });
  }

  onIncorrect(cardsData, index) {
    clearInterval(this.state.interval);
    cardsData[index].incorrect = true;
    this.setState({
      cardsData: cardsData.map(card => ({...card, status: 'shown'})),
      gameState: 'lost'
    });
  }

  async onGameWin() {
    this.setState({ gameState: 'won' });
    clearInterval(this.state.interval);

    const winData = {
      mode: this.state.mode,
      milliseconds: this.state.milliseconds
    };

    const response = await fetch(config.leaderboardEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(winData)
    });

    this.setState({ isBestTime: await response.json() });
    await this.props.onGameEnd();
  }

  getEmptyCardsData(mode) {
    return new Array(mode).fill(0).map(
      () => {
        return {
          value: 0,
          status: 'hidden',
          correct: false
        };
      }
    );
  }

  onPlayAgain = () => {
    this.setState(this.initialState);
  }
}
