import React, { useEffect, useState } from 'react';
import OptionGame from './option';

const Fight = ({
  option,
  random,
  result = 'YOU LOSE',
  playAgain,
  multiplayer = false
}) => {
  const [EndAnimation, setEndAnimation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      const animation = document.getElementById('rivals');
      const resultDom = document.getElementById('result');
      const result2Dom = document.getElementById('result2');
      animation.classList.remove('opacity-0');
      animation.classList.add('opacity-100');
      resultDom.classList.remove('w-4');
      resultDom.classList.add('w-10', 'sm:w-96');
      result2Dom.classList.remove('h-0');
      //
      result2Dom.classList.add('h-15');
      setTimeout(() => {
        resultDom.classList.remove('opacity-0');
        resultDom.classList.add('opacity-100');
        result2Dom.classList.remove('opacity-0');
        result2Dom.classList.add('opacity-100');
        setEndAnimation(true);
      }, 500);
    }, 2000);
    return () => {};
  }, []);

  return (
    <>
      <div className="flex justify-between transition-all duration-200 ">
        <div className="flex-1 h-64 flex justify-between flex-col-reverse sm:flex-col ">
          <h3 className=" text-center  font-bold my-10 text-xs sm:text-md text-white">
            YOU PICKED
          </h3>

          <OptionGame border={option} />
        </div>
        <div className="w-5 flex-1 sm:hidden"></div>
        <div className="hidden  sm:flex-1 sm:flex sm:flex-col sm:justify-center sm:items-center sm:text-center">
          <h1
            id="result"
            className="transition-all duration-500 text-4xl font-extrabold w-4 text-white opacity-0"
          >
            {EndAnimation ? result : ''}
          </h1>
          {EndAnimation && (
            <button
              onClick={playAgain}
              className="mt-5 rounded-md bg-[#fdfbfd] py-2 px-16 text-xs"
            >
              PLAY AGAIN
            </button>
          )}
        </div>
        <div
          id="rivals"
          className="flex-1 h-64 flex flex-col-reverse sm:flex-col  justify-between opacity-0 transition-opacity duration-500  "
        >
          <h3 className="text-center font-bold my-10 text-xs sm:text-md text-white">
            {multiplayer ? 'RIVAL PICKED' : 'THE HOUSE PICKED'}
          </h3>

          <OptionGame border={random} />
        </div>
      </div>
      <div className="sm:hidden flex flex-col justify-center items-center text-center ">
        <h1
          id="result2"
          className="transition-all duration-500 text-4xl font-extrabold h-0  text-white opacity-0 "
        >
          {EndAnimation ? result : ''}
        </h1>
        {EndAnimation && (
          <button
            onClick={playAgain}
            className="mt-5 rounded-md bg-[#fdfbfd] py-2 px-16 text-xs"
          >
            PLAY AGAIN
          </button>
        )}
      </div>
    </>
  );
};

export default Fight;
