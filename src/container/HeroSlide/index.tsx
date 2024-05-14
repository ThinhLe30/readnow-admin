import { Background1, Background2, Background3, Background4, Background5, Background6 } from "@/assets/images"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { IoArrowDownOutline } from "react-icons/io5"

const backgrounds = [Background1, Background2, Background3, Background4, Background5, Background6]

const HeroSlide = () => {
    const scrollToRoomList = () => {
        const roomList = document.getElementById("room-list")

        if (roomList) {
            window.scrollTo({
                top: roomList.offsetTop - 90,
                behavior: "smooth"
            })
        }
    }

    return (
        <div className="relative">
            <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                grabCursor={true}
                pagination={{
                    dynamicBullets: true,
                    clickable: true
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
            >
                {backgrounds.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative mb-4 bg-black/40 bg-opacity-30">
                            <img
                                className="aspect-[5/2] w-full object-cover after:absolute after:bottom-0 after:left-0 after:h-[100px] after:w-full after:bg-gradient-to-t after:from-red-300 after:to-transparent after:content-['']"
                                src={item}
                                alt={`background-${index}`}
                            />

                            <div className="absolute inset-0 bg-black/40" />

                            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute left-1/2 top-1/2 !z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-6 text-center text-white">
                <h2 className="drop-shawdown-[#e28743] select-none  text-6xl font-bold tracking-wide drop-shadow-xl">
                    Welcome to Rentally!
                </h2>
                <h3 className="drop-shawdow-[#000] mb-2 w-fit select-none whitespace-nowrap text-2xl font-medium drop-shadow-2xl">
                    Your Gateway to Unique and Comfortable Rentals. Find Your Ideal Stay Today.
                </h3>

                <button
                    className="flex items-center gap-2 rounded-lg bg-primary px-6 py-1.5 text-lg font-medium text-white shadow-md hover:shadow-lg"
                    onClick={scrollToRoomList}
                >
                    <span className="select-none">Get start</span> <IoArrowDownOutline className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}

export default HeroSlide
