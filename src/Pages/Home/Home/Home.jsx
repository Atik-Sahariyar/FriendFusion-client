
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import AllPosts from "../Posts/AllPosts";
import Tags from "../TagSection/Tags";

const Home = () => {
    return (
        <div>
           <Helmet><title>FriendFusion | Home </title></Helmet>
            <Banner></Banner>
            <Tags></Tags>
            <AllPosts></AllPosts>
            <Footer></Footer>
        </div>
    );
};

export default Home;