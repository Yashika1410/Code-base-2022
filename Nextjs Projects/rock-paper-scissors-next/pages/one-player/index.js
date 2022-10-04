import Image from 'next/image';
import { useState } from 'react';
import Fight from '../../components/figth';
import OptionGame from '../../components/option';
import Tablero from '../../components/tablero';

export default function Index() {
  const [Score, setScore] = useState(0);
  const [OpenModal, setOpenModal] = useState(true);
  const [Option, setOption] = useState({
    value: 0,
    component: null
  });

  const handlerPickOption = (option) => {
    const random = Math.floor(Math.random() * 3) + 1;
    let newScore = 0;
    let resultString = 'EMPATE';
    if (option === random) {
      newScore = Score;
    } else if (option === 1 && random === 2) {
      resultString = 'YOU LOSE';

      newScore = Score - 1;
    } else if (option === 2 && random === 3) {
      resultString = 'YOU LOSE';

      newScore = Score - 1;
    } else if (option === 3 && random === 1) {
      resultString = 'YOU LOSE';

      newScore = Score - 1;
    } else {
      resultString = 'YOU WIN';

      newScore = Score + 1;
    }
    setOption({
      component: (
        <Fight
          option={option}
          random={random}
          playAgain={() => {
            setOption({ component: null, value: 0 });
          }}
          result={resultString}
        />
      ),
      value: option
    });

    setTimeout(() => {
      setScore(newScore);
    }, 2000);
  };
  return (
    <>
      <div className=" min-h-screen bg-body flex flex-col items-stretch justify-items-stretch">
        <Tablero score={Score} />
        <div className="flex-1 h-full w-full flex flex-col justify-center items-center">
          {Option.value === 0 ? (
            <div className="bg-triangle">
              <div className="flex w-80 justify-between">
                <OptionGame border={1} onCallback={handlerPickOption} />
                <OptionGame border={2} onCallback={handlerPickOption} />
              </div>
              <div className="mt-10 flex justify-center">
                <OptionGame border={3} onCallback={handlerPickOption} />
              </div>
            </div>
          ) : (
            Option.component
          )}
        </div>
        <div className=" w-full flex justify-end items-center">
          <button
            className="m-10 border rounded-md py-2 px-10 text-white border-[#8387a0]"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            RULES
          </button>
        </div>

        {OpenModal && (
          <div className="absolute w-full h-full  flex flex-col justify-center items-center bg-[#00000066] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className=" w-full flex flex-col justify-center items-center sm:w-96 h-full sm:h-auto bg-white sm:rounded-lg sm:aspect-square">
              <div className="flex justify-center w-full  sm:justify-between px-8 mt-5 mb-5">
                <h1 className=" text-2xl font-extrabold">RULES</h1>
                <div
                  className=" hidden sm:flex-1 sm:flex sm:w-full  sm:justify-end items-center"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  <Image
                    alt="close-icon"
                    src="/assets/icon-close.svg"
                    width="15px"
                    height="15px"
                  />
                </div>
              </div>
              <div className=" aspect-square px-10 py-8 w-full ">
                <Image
                  className=" aspect-square"
                  alt="rule"
                  src={'/assets/image-rules.svg'}
                  layout="responsive"
                  width={20}
                  height={20}
                />
              </div>
              <div
                className="block sm:hidden"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                <Image
                  alt="close-icon"
                  src="/assets/icon-close.svg"
                  width="15px"
                  height="15px"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
