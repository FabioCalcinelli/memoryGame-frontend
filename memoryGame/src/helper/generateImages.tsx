import {fetchCatUrl} from '../api/ImageFetch.ts'
import {useEffect, useMemo, useState} from "react";

const placeholderImage = "https://cataas.com/cat";


export const useGenerateImages = (numCards: number, playAgain: boolean) => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const generate = async () => {
            try {
                const uniqueImages = await generateImages(numCards / 2);
                const allImages = [...uniqueImages, ...uniqueImages]; // duplicate the images
                setImages(allImages);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        generate();
    }, [numCards, playAgain]);

    return { images, loading, error };
};


export async function generateImages(numberOfImages: number): Promise<string[]> {
    const images: string[] = []
    for (let i = 0; i < numberOfImages; i++) {
        const url = await fetchCatUrl();
        images.push(url || placeholderImage); // use placeholder image if url is null
    }
    return images;
}
