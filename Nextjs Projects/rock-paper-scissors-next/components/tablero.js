import Image from 'next/image';
import { useEffect, useState } from 'react';

const Tablero = ({ score }) => {
  const [Score, setScore] = useState(score);
  useEffect(() => {
    setScore(score);

    return () => {};
  }, [score]);

  return (
    <main className="flex flex-col justify-center items-center ">
      <div className=" rounded-lg border border-[#5d6a85] h-1/6 w-6/12 mt-10 flex justify-between p-5">
        <div className=" h-full w-full mr-2 sm:mr-0 sm:w-36 ">
          <div>
            <Image
              width={150}
              height={100}
              layout="responsive"
              alt="logo"
              src="/assets/logo.svg"
            />
          </div>
        </div>
        <div className="bg-[#fbfbfb] h-full aspect-square md:aspect-[4/3] rounded-md text-[#56556a] flex flex-col justify-center items-center p-2">
          <p className="text-center text-xs sm:text-sm">SCORE</p>
          <h1 className="font-bold text-lg sm:text-5xl">{Score}</h1>
        </div>
      </div>
    </main>
  );
};

export default Tablero;
