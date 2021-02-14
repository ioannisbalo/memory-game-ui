import { Card } from 'semantic-ui-react';
import MemoryCard from './MemoryCard';

const CardGroup = (props) => {
  const cards = props.cardsData.map((card, index) => {
    return (
      <MemoryCard
        key={index}
        index={index}
        card={card}
        onGuess={props.onGuess}
        gameState={props.gameState}
      />
    );
  });

  return (
    <Card.Group style={{ marginBottom: '2%' }} itemsPerRow={4}>
      {cards}
    </Card.Group>
  );
};

export default CardGroup;
