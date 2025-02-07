const catProviderUrl = "https://cataas.com";

export const fetchCatUrl = async (): Promise<string | null> => {
    try {
        const rawResponse = await fetch(`${catProviderUrl}/cat?json=true`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!rawResponse.ok) {
            console.error('Error fetching cat URL:', rawResponse.status);
            return null;
        }
        const jsonResponse = await rawResponse.json();
        return catProviderUrl + '/cat/' + jsonResponse._id;
    } catch (error) {
        console.error('Error fetching cat URL:', error);
        return null;
    }
};