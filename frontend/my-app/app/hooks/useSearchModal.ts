import { create } from "zustand"

// we need export to know what we want to search from on the backend export the data
export type SearchQuery ={
    country: string;
    checkIn: Date | null;
    checkOut: Date | null;
    guests: Number;
    bathrooms: Number;
    bedrooms: Number;
    category: string;


}

interface SearchModalStore{
    open: (step: string) => void; 
    close: () => void;
    step: string;
    isOpen: boolean;
    query: SearchQuery;
    setQuery: (query: SearchQuery) => void;

}

const useSearchLoginModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    step: '',
    open: (step) =>set({isOpen: true, step : step}),
    close: () => set({isOpen: false}),
    setQuery: (query: SearchQuery) => set({query: query}),
    query: {
        country: '',
        checkIn: null,
        checkOut: null,
        guests: 1,
        bedrooms: 0,
        bathrooms: 0,
        category: ''
    }
    
}));
export default useSearchLoginModal