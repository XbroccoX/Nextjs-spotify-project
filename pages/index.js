import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="p-2 bg-black h-screen overflow-hidden">
      <Head>
        <title>Andes Spotify test</title>
        <meta name="description" content="Created by Santiago Aristizabal" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className="">
        {/* Sidebar */}
        <Sidebar />
        {/* Center */}
      </main>
      <div>{/* Barra de reproduccion */}</div>
    </div>
  );
}
