import { Button } from 'semantic-ui-react';
import config from '../Config';
import utils from '../Utilities';
import '../css/Controls.css';

const Controls = (props) => {
  const selectModeButtons = config.availableModes.map(mode => {
    return <Button className='select-mode' key={mode} onClick={() => props.onSelectMode(mode)}>{mode}</Button>;
  });

  const startGameButtons = (
    <div>
        Modes: {selectModeButtons}
        <Button className='start-game-button' primary onClick={props.onStartGame}>Start Game</Button>
    </div>
  );

  const guessingButton = <Button primary onClick={props.onStartGuessing}>Start Guessing</Button>;

  const timer = <div>{utils.msToTimer(props.milliseconds)}</div>

  return (
    <div className='controls'>
      {props.gameState === 'guessing' ? timer : null}
      {props.gameState === 'waiting' ? startGameButtons : null}
      {props.gameState === 'showing' ? guessingButton: null}
    </div>
  );
}

export default Controls;
