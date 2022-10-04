import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Fight from '../../components/figth';
import OptionGame from '../../components/option';
import Tablero from '../../components/tablero';
let socket;

const Index = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const [OnReady, setOnReady] = useState(false);
  const [RivalsOption, setRivalsOption] = useState(null);
  const [MyOption, setMyOption] = useState(null);
  const [Score, setScore] = useState(0);

  useEffect(() => {
    const calculateScore = () => {
      if (MyOption === RivalsOption) {
      } else if (MyOption === 1 && RivalsOption === 2) {
        setTimeout(() => {
          setScore((s) => s - 1);
        }, 2000);
      } else if (MyOption === 2 && RivalsOption === 3) {
        setTimeout(() => {
          setScore((s) => s - 1);
        }, 2000);
      } else if (MyOption === 3 && RivalsOption === 1) {
        setTimeout(() => {
          setScore((s) => s - 1);
        }, 2000);
      } else {
        setTimeout(() => {
          setScore((s) => s + 1);
        }, 2000);
      }
    };

    if (RivalsOption !== null && MyOption !== null) {
      calculateScore();
    }
  }, [RivalsOption, MyOption]);

  useEffect(() => {
    socketInitializer();
    // socket.broadcast.emit('await-rivals-' + uuid, 'llegue');

    return () => {
      console.log('This will be logged on unmount');
    };
  });

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('figth-invited-' + uuid, (msg) => {
      setRivalsOption(msg);
    });
  };

  const onClickReady = (e) => {
    socket.emit('rivals', uuid);
    setOnReady(true);
  };

  const sendOption = (option) => {
    setMyOption(option);
    socket.emit('figth-invited', { id: uuid, option });
  };
  return (
    <div className=" bg-body min-h-screen flex flex-col">
      <p className="absolute bottom-0 right-0 p-1">{uuid}</p>
      <Link href={'/'}>
        <a className="absolute top-0 left-0 text-white p-5">⬅ IR AL HOME</a>
      </Link>
      {OnReady && (
        <div className="w-full ">
          <Tablero score={Score}></Tablero>
        </div>
      )}
      <div className=" flex-1 flex flex-col justify-center items-center">
        {!OnReady ? (
          <>
            <h1 className="text-4xl text-white font-bold mb-5">
              {' '}
              TE ESTABAMOS ESPERANDO
            </h1>
            <button
              className=" bg-white rounded-lg  px-10 py-2"
              onClick={onClickReady}
              value="ready"
            >
              READY
            </button>
          </>
        ) : MyOption === null ? (
          <div>
            <div className="bg-triangle">
              <div className="flex w-80 justify-between">
                <OptionGame border={1} onCallback={sendOption} />
                <OptionGame border={2} onCallback={sendOption} />
              </div>
              <div className="mt-10 flex justify-center">
                <OptionGame border={3} onCallback={sendOption} />
              </div>
            </div>
          </div>
        ) : RivalsOption !== null ? (
          <>
            <Fight
              option={MyOption}
              random={RivalsOption}
              result={
                MyOption === RivalsOption
                  ? 'EMPATE'
                  : MyOption === 3 && RivalsOption === 1
                  ? 'YOU LOSE'
                  : MyOption === 1 && RivalsOption === 2
                  ? 'YOU LOSE'
                  : MyOption === 2 && RivalsOption === 3
                  ? 'YOU LOSE'
                  : 'YOU WIN'
              }
              playAgain={() => {
                setMyOption(null);
                setRivalsOption(null);
              }}
              multiplayer={true}
            ></Fight>
          </>
        ) : (
          <>
            <p className="text-white text-sm mb-5">YOU PICKED</p>
            <div className="loading-efect">
              <OptionGame border={MyOption}></OptionGame>
            </div>
            <h1 className="text-white text-lg mt-5">
              ESPERANDO LA RESPUESTA DE TU RIVAL...
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
