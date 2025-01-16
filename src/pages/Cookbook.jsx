import Navbar from "../components/Navbar";

export default function Cookbook() {
    return (
        <div className='px-20'>
            <Navbar />
            <div className='flex flex-row justify-between items-center'>
                <div>
                    list of collections
                </div>
                <div>
                    displays selected recipe
                </div>
            </div>
        </div>
    )
}