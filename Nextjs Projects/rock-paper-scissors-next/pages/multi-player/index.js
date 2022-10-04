import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import Fight from '../../components/figth';
import OptionGame from '../../components/option';
import Tablero from '../../components/tablero';
let socket;

const Index = () => {
  const [OnRivals, setOnRivals] = useState(false);
  const [UUID, setUUID] = useState('');
  const [RivalsOption, setRivalsOption] = useState(null);
  const [MyOption, setMyOption] = useState(null);
  const [Score, setScore] = useState(0);
  useEffect(() => {
    const id = uuidv4();
    setUUID(id);
    socketInitializer(id);
    return () => {
      console.log('This will be logged on unmount');
    };
  }, []);

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

  const socketInitializer = async (id) => {
    await fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('error', (error) => {
      alert('Ocurrio un error al conectar con socket');
      console.error(error);
    });

    socket.on('await-rivals-' + id, (msg) => {
      setOnRivals(true);
    });
    socket.on('figth-creator-' + id, (msg) => {
      setRivalsOption(msg);
      0;
    });
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href + '/' + UUID);
    alert('Link copiado en el portapapeles');
  };

  const sendOption = (option) => {
    setMyOption(option);

    socket.emit('figth-creator', { id: UUID, option });
  };

  return (
    <div className="bg-body min-h-screen flex flex-col">
      <Link href={'/'}>
        <a className="absolute top-0 left-0 text-white p-5">⬅ IR AL HOME</a>
      </Link>
      {OnRivals && (
        <div className="w-full ">
          <Tablero score={Score}></Tablero>
        </div>
      )}
      <div className=" flex-1   flex flex-col justify-center items-center">
        {!OnRivals && (
          <h1 className=" text-4xl font-bold mb-5 text-white  text-center">
            ESPERANDO AL RIVAL
          </h1>
        )}
        {!OnRivals ? (
          <button className="rounded-lg px-5 py-2 bg-white" onClick={copyLink}>
            {' '}
            Copiar Link{' '}
          </button>
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
