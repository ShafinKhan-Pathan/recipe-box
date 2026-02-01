import { useEffect, useState } from "react";
import { getImageFromDB } from "../utils/imageDB";

export const useRecipeImage = (imageId?: string, imageURL?: string) => {
    const [imageSrc, setImageSrc] = useState<string>();
    // this handles both indexedDB and URL- based images
    useEffect(() => {
        if (imageURL) {
            setImageSrc(imageURL)
            return
        }
        if (!imageId) return;

        let url: string;

        const loadImage = async () => {
            const blob = await getImageFromDB(imageId);
            if (!blob) return;

            url = URL.createObjectURL(blob);
            setImageSrc(url);
        };

        loadImage();

        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [imageId, imageURL]);

    return imageSrc;
};
