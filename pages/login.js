import Image from "next/image";
import { getProviders, signIn } from "next-auth/react";
import AndesLogo from "../public/images/andeslogo.png";

const Login = ({ providers }) => {
  console.log(providers, "login pagina Providers");
  return (
    <div className="h-screen sm:grid sm:grid-cols-2">
      <div className="flex justify-around align-center p-20">
        <Image
          className="w-40 h-40 mb-5"
          src={AndesLogo}
          alt="Andes global trading logo"
          priority
        />
        <Image
          width={208}
          height={208}
          className="w-40 h-40 mb-5"
          src="https://links.papareact.com/9xl"
          alt="Andes global trading logo"
        />
      </div>
      <div className="sm:bg-[#121212] flex flex-col items-center justify-center">
        {Object.values(providers).map((provider) => {
          return (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="text-gray-900 bg-gradient-to-r from-[#18D860] to-lime-200 hover:bg-gradient-to-l hover:from-[#18D860] hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Login with {provider.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Login;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
