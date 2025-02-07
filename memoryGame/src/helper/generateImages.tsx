import {fetchCatUrl} from '../api/ImageFetch.ts'
import {useEffect, useMemo, useState} from "react";

export const useGenerateImages = (numCards: number, playAgain: boolean) => {
    let arrayOfImages : String[] = new Array(numCards).fill('')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const generate = async () => {
            try {
                arrayOfImages = await generateImages(numCards / 2);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        generate();
    }, [numCards, playAgain]);

    return { arrayOfImages, loading, error };
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
