import {fetchCatUrl} from '../ImageFetch/ImageFetch.tsx'
import {useEffect, useMemo, useState} from "react";

export const useGenerateImages = (numCards: number, playAgain: boolean) => {
    const [arrayOfImages, setArrayOfImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const generate = async () => {
            const images = await generateImages(numCards / 2);
            setArrayOfImages(images);
            setLoading(false);
        };
        generate();
    }, [playAgain]);

    return { arrayOfImages, loading };
};

export async function generateImages(numberOfImages: number): Promise<string[]> {
    const images: string[] = []
    for (let i = 0; i < numberOfImages; i++) {
        const url = await fetchCatUrl();
        if (url) {
            images.push(url);
        } else {
            console.error('Failed to fetch image')
        }
    }
    return images;
}
