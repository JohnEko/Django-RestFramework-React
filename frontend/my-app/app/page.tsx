import Image from "next/image";
import TrendingTopics from "./components/TrendingTopics";
import Categories from "./components/Categories";
import PropertyList from "./components/property/PropertyList";
import PropertyListItem from "./components/property/PropertyListItem";

const Home = () => {
  // Import it to the homepage for user to see all categories or topics
  return (
    // Make the categories and the logo or link in the navbar same line
      <main className="max-w-[1500px] mx-auto px-6">

        <Categories />

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <PropertyList />
        </div>
        
        <TrendingTopics />
        
      </main>
   
  );
}
export default Home