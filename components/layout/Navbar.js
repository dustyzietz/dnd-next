import { GiScrollUnfurled, GiBarbarian } from "react-icons/gi";
import { BiPlanet } from "react-icons/bi";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from 'next/image'
import logo from '../../public/wizard-logo.png'
import dynamic from "next/dynamic";
const GoogleLoginButton = dynamic(() => import('../auth/GoogleLoginButton'))


const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useContext(UserContext);
  const initialUser = { email: null };
  useEffect(() => {
    if (!user.email && router.pathname === "/dashboard") router.push("/");
  }, [user]);

  return (
    <>
      <div className="bg-neutral-100 fixed top-0 left-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-2 ml-6 flex ">
            <div className="flex-grow">
            <Link
                href="/"
                className="px-3 rounded-md font-medium"
              >
                <button className="mr-6">
                  <Image src={logo} width={40} height={40} alt="my logo" />
                </button>
              </Link>
              <Link
                href="/dashboard"
                
              >
                <button className="px-3 pt-1 float-right rounded-md font-medium ">
                  {" "}
                  <GiBarbarian className="h-5 w-5 text-white bg-black inline" />{" "}
                  Dashboard
                </button>
              </Link>
              {/* <a href="#" className="px-3 py-2 rounded-md font-medium">
                <BiPlanet className="h-5 w-5 text-stone-700 inline" /> Campaigns
              </a> */}
            </div>

            <div className=" text-right ">
              {user?.email ? (
                <button
                  onClick={() => setUser(initialUser)}
                  className="px-3 pt-1  rounded-md font-medium "
                >
                  <BiPlanet className="h-5 w-5 text-stone-700 inline" /> Logout
                </button>
              ) : (
             <div className=" inline-block">
            <GoogleLoginButton />
            </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-12"></div>
    </>
  );
};
export default Navbar;
