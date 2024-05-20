export default function AddButton({onOpen}){
    return (<button 
        className=" bg-black text-white h-12 w-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 ml-2 focus:outline-none right-1/4 "
        onClick={()=>onOpen()}>
        <svg 
            className="h-6 w-6 fill-current" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
        >
            <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </button>);
}