import axios from 'axios';

const backendUrl = 'http://localhost:5172';

export const startGame = async () => {
    try {
        const response = await axios.get(backendUrl+'/start_game');
        return response.data.game_state
    } catch (error) {
        console.error(error);
    }
};

export const handleCardClick = async (cardId) => {
    try {
        const response = await axios.patch(backendUrl+'/card_click', {
            card_id: cardId,
        });
        return response.data.game_state
    } catch (error) {
        console.error(error);
    }
};