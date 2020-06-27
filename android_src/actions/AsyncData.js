import AsyncStorage from '@react-native-community/async-storage';

export const updateUserData = async (userData) => {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
        console.error(error);
    }
}

export const getUserData = async () => {
    try {
       const userData = await AsyncStorage.getItem('userData');
       return JSON.parse(userData);
    } catch (error) {
        console.error(error);
        return null;
    }
}
