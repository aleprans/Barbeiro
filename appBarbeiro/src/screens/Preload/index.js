import React, {useEffect, useContext} from 'react';
import { Container, LoadingIcon } from './styles';
import BarberLogo from '../../assets/barber.svg';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';

import Api from '../../Api';

export default() => {

    const { dispatch: userDispatch } = useContext(UserContext)
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if(token){
                let res = await Api.checkToken(token)
                if(res.token){

                    await AsyncStorage.setItem('token', res.token)

                    userDispatch({
                        type: 'setAvatar',
                        payload:{
                            avatar: res.data.avatar
                        }
                    })

                    navigation.reset({
                        routes:[{name:'MainTab'}]
                    })
                }else{
                    navigation.navigate('SingIn');
                }
            }else {
                navigation.navigate('SingIn');
            }
        }
        checkToken();
    }, []);
    
    return(
        <Container>
            <BarberLogo width="100%" height="160" />
            <LoadingIcon size="large" color="#ffffff"/>
        </Container>
    );
}