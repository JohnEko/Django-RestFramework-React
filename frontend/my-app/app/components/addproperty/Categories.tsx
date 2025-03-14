//lets build an interface to set categories
import Image from "next/image";

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
} 

const Categories: React.FC<CategoriesProps> =  ({
    dataCategory,
    setCategory 
}) =>{

    return(
        <>
            <div className="pt-3 cursor-pointer pb-6 flex item-center space-x-12">
                {/* lets create firist category */}
                            <div 
                                onClick={() => setCategory('Home')}
                                className={`pb-4 flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Home' ? 'border-gray-800' : 'border-white'}  opacity-60 hover:vorder-gray-200 hover:opacity-100`}
                                >
                                <Image
                                src="/bnb.jpg"
                                alt="Beach_house"
                                width={20}
                                height={20}
                                
                                />
                
                                <span className="text-xs font-semibold">Home</span>
                            </div>
                
                            <div 
                                onClick={() => setCategory('Sports')}
                                className={`pb-4 flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Sports' ? 'border-gray-800' : 'border-white'}  opacity-60 hover:vorder-gray-200 hover:opacity-100`}>
                                <Image
                                src="/bnb.jpg"
                                alt="Beach_house"
                                width={20}
                                height={20}
                                
                                />
                
                                <span className="text-xs font-semibold">Sports</span>
                            </div>
                
                            <div 
                                onClick={() => setCategory('News')}
                                className={`pb-4 flex-col items-center space-y-2 border-b-2 ${dataCategory == 'News' ? 'border-gray-800' : 'border-white'}  opacity-60 hover:vorder-gray-200 hover:opacity-100`}>
                                <Image
                                src="/bnb.jpg"
                                alt="Beach_house"
                                width={20}
                                height={20}
                                
                                />
                
                                <span className="text-xs font-semibold">News</span>
                            </div>
                
                            <div 
                                onClick={() => setCategory('Japa')}
                                className={`pb-4 flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Japa' ? 'border-gray-800' : 'border-white'}  opacity-60 hover:vorder-gray-200 hover:opacity-100`}>
                                <Image
                                src="/bnb.jpg"
                                alt="Beach_house"
                                width={20}
                                height={20}
                                
                                />
                
                                <span className="text-xs font-semibold">Japa</span>
                            </div>
            </div>
        </>
    )
}
export default Categories