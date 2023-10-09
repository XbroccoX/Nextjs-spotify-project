import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import { getSession } from "next-auth/react";
import Player from "../components/Player";

export default function Home() {
  return (
    <>
      <div className="p-2 pb-0 bg-black h-screen overflow-hidden">
        <Head>
          <title>Andes Spotify test</title>
          <meta name="description" content="Created by Santiago Aristizabal" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>

        <main className="">
          {/* Sidebar */}
          <Sidebar />
          {/* Center */}
          <Center />
        </main>
      </div>
      <div className="absolute w-screen bottom-0 z-20 bg-black">
        {/* Barra de reproduccion */}
        <Player />
      </div>
    </>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  return {
    props: { session },
  };
};
