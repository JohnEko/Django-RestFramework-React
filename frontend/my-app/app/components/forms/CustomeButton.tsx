interface CustomeButtonProps{
    label: string;
    className?: string
    onClick: () => void;

}
// The question mark means not required
const CustomeButton: React.FC<CustomeButtonProps> =({
    label,
    className,
    onClick
})=> {

    return(
         
        <div 
        onClick={onClick}
        className={`w-full py-4 bg-red-700 hover:bg-red-dark font-bold rounded-xl text-center transition cursor-pointer ${className}`}>
           {label}

        </div>
    )
}
export default CustomeButton