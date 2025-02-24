import Image from "next/image";
import TrendingTopics from "./components/TrendingTopics";
import Categories from "./components/Categories";

const Home = () => {
  // Import it to the homepage for user to see all categories or topics
  return (
    // Make the categories and the logo or link in the navbar same line
      <main className="max-w-[1500px] mx-auto px-6">

        <Categories />
        <TrendingTopics />
      </main>
   
  );
}
export default Home