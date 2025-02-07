import axios from 'axios';

const backendUrl = 'http://localhost:5170';

const getGameData = async () => {
    try {
        const response = await axios.get(backendUrl+'/game-data');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export { getGameData };