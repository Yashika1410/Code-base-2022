import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-body min-h-screen">
        <Link href={'/one-player'}>
          <a className=" rounded-lg bg-slate-200 py-2 px-5 my-2">
            {' '}
            SINGLER PLAYER{' '}
          </a>
        </Link>
        <Link href={'/multi-player'}>
          <a className=" rounded-lg bg-slate-200 py-2 px-5 my-2">
            {' '}
            TWO PLAYER{' '}
          </a>
        </Link>
      </div>
    </>
  );
}
