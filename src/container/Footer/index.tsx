import { FaSquareFacebook, FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <div className="flex w-full items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-6 text-sm text-gray-600 sm:px-6 md:px-10 xl:px-28">
            <div className="flex items-center gap-3">
                <span>© {currentYear} Rentally, Inc</span>
                <span className="text-[0.5rem]">•</span>
                <span className="hover:underline">Private policy</span>
                <span className="text-[0.5rem]">•</span>
                <span className="hover:underline">Terms</span>
            </div>
            <div className="flex items-center gap-3 text-xl text-black">
                <span className="mr-3 text-sm font-medium">$ VND</span>
                <FaSquareFacebook />
                <FaSquareXTwitter />
                <FaSquareInstagram />
            </div>
        </div>
    )
}

export default Footer
