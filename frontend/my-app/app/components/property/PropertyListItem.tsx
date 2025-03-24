import Image from "next/image"
import { useRouter } from "next/navigation"
import { PropertyType } from "./PropertyList"
import FavoriteButton from "../FavoriteButton";

interface PropertyProps {
    property: PropertyType
    markFavorite?: (is_favorite: boolean) => void;
}

const PropertyListItem:React.FC<PropertyProps> = ({
    property,
    markFavorite
}) =>{
    const router = useRouter()

    return(
        <div 
            className="cursor-pointer"
            // this is the frontend sidewhen you click the image
            onClick={() => router.push(`/properties/${property.id}`)}
            >
        
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image 
                    fill
                    src='/CABIN.jpg'
                    sizes="(max-width: 768px) 768px, (max-width: 1200): 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="Beach house"
                
                />

                {markFavorite && (
                    <FavoriteButton 
                        id={property.id}
                        is_favorite={property.is_favorite}
                        markFavorite={(is_favorite) => markFavorite(is_favorite)}
                    />
                )}
           
            </div>

            <div className="mt-2">
            <p className="text-lg font-bold">{property.title}</p>

            </div>

            <div className="mt-2">
                <p className="text-sm text-gray-700"><strong>{property.category}</strong>per Item</p>

            </div>
        </div>
    )
}
export default PropertyListItem
