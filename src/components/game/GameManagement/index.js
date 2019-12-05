import React from 'react';
import BetCoin from 'components/game/BetCoin';
import BetNumber from 'components/game/BetNumber';

const renderGame = function(bet, betClick, userBetList) {
  if (bet['categoryName'] === 'Coins') {
    return <BetCoin
              info={bet}
              key={bet.id}
              betClick={betClick}
              userBetList={userBetList}/>;
  }
  else if(bet['categoryName'] === 'Numbers') {
    return <BetNumber
              info={bet}
              key={bet.id}
              betClick={betClick}
              userBetList={userBetList}/>;
  } else {
    return "";
  }
}

export default renderGame;
