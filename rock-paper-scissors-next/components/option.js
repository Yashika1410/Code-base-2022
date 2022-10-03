import React from 'react';

const OptionGame = ({ border = 3, onCallback = () => null }) => {
  /**
   * 1 papel
   * 2 tigera
   * 3 piedra
   */
  const colorBorde = {
    1: {
      style: 'border-paper',
      color: 'border-[#4463f2]',
      img: '/assets/icon-paper.svg'
    },
    2: {
      style: 'border-scissors',
      color: 'border-[#ec9e0f]',
      img: '/assets/icon-scissors.svg'
    },
    3: {
      style: 'border-rock',
      color: 'border-[#da304d]',
      img: '/assets/icon-rock.svg'
    }
  };
  const currentColor =
    colorBorde[border].color + ' ' + colorBorde[border].style;
  const img = colorBorde[border].img;
  return (
    <div
      className={
        'p-5 border-outset  border-[12px]  bg-[#e7e7e7] rounded-full h-32 w-32 flex flex-col justify-center items-center ' +
        currentColor
      }
      onClick={() => onCallback(border)}
    >
      <img alt="logo" src={img} />
    </div>
  );
};

export default OptionGame;
