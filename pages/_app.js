import "../styles/globals.css";
import Navbar from "../components/layout/Navbar";
import { UserProvider } from "../context/UserContext";
import { CampaignProvider } from "../context/CampaignContext";
import Sockets from "../components/layout/Sockets";

function MyApp({ Component, pageProps }) {

  return (
    <>
      <UserProvider>
        <CampaignProvider>
          <Sockets />
          <Navbar />
          <Component {...pageProps} />
        </CampaignProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
