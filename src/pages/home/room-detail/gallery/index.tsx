import { useState } from "react"
import { BsFillGrid3X3GapFill } from "react-icons/bs"
import Button from "../components/Button"
import { Image } from "antd"
import { NoImage } from "@/assets/images"

interface IGallery {
    images: string[]
}

export const gridLayout = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1"
]

const Gallery = ({ images }: IGallery) => {
    const [showPreview, setShowPreview] = useState(false)

    return (
        <div className="gallery relative my-2 grid h-96 grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-lg">
            <Image.PreviewGroup
                preview={{ visible: showPreview, onVisibleChange: (visible) => setShowPreview(visible) }}
            >
                {gridLayout.map((layout, index) => (
                    <div key={index} className={`${layout}`}>
                        <Image
                            className="detail"
                            src={images[index] ? images[index] : NoImage}
                            alt={`Gallery-Image-${index}`}
                        />
                    </div>
                ))}
            </Image.PreviewGroup>

            <Button
                onClick={() => setShowPreview(true)}
                className="absolute bottom-4 right-4 rounded-md border border-black/80 bg-white px-3 py-1 text-sm shadow-2xl shadow-gray-600"
            >
                <BsFillGrid3X3GapFill /> Show all
            </Button>
        </div>
    )
}

export default Gallery
