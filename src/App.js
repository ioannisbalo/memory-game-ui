import React from 'react';
import { Container } from 'semantic-ui-react';
import GameArea from './components/GameArea';
import Leaderboard from './components/Leaderboard';
import config from './Config';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leaderboards: {},
      mode: config.defaultMode
    };
  }

  async componentDidMount() {
    await this.fetchLeaderboards();
  }
  
  render() {
    return (
      <Container style={{textAlign: 'center', marginTop: '2%'}}>
        <h2>Memory Game</h2>
        <p>Click the hidden numbers in ascending order to win!</p>
        <GameArea onModeChange={this.onModeChange} onGameEnd={this.fetchLeaderboards}/>
        <Leaderboard mode={this.state.mode} leaderboard={this.state.leaderboards[this.state.mode]}/>
      </Container>
    );
  }

  onModeChange = (mode) => {
    this.setState({ mode });
  }

  fetchLeaderboards = async () => {
    const leaderboards = {};

    const promises = config.availableModes.map(
      async (mode) => {
        const response = await fetch(`${config.leaderboardEndpoint}?mode=${mode}`);

        leaderboards[mode] = await response.json();
      }
    );

    await Promise.all(promises);

    this.setState({leaderboards})
  }
}

export default App;
