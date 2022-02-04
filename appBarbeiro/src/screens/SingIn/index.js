import React , {useState, useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';

import {
    Container, 
    InputArea,
    CustomButton,
    CustomButtonText,
    SingMesageButton,
    SingMesageButtonText,
    SingMesageButtonTextBold
} from './styles';

import Api from '../../Api';
import SingInput from '../../components/SingInput';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import BarberLogo from '../../assets/barber.svg';

export default() => {

    const { dispatch: userDispatch } = useContext(UserContext)
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');


    const handleSingClick = async () => {
        if(emailField != '' && passwordField != '') {
            
            let json = await Api.singIn(emailField, passwordField);

            if(json.token){
                await AsyncStorage.setItem('token', json.token)
                userDispatch({
                    type: 'setAvatar',
                    payload:{
                        avatar: json.data.avatar
                    }
                })

                navigation.reset({
                    routes:[{name:'MainTab'}]
                })
            }else{
                alert("e-mail e/ou senha incorretos!")
            }
        }else{
            alert("Preencha os campos!")
        }
    }
    const handleMesageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SingUp'}]
        })
    }

    return(
        <Container>
            <BarberLogo width="100%" height="160" />

            <InputArea>
                <SingInput 
                    IconSvg={EmailIcon}
                    placeholder="Digite seu E-mail"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                />

                <SingInput 
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}
                />

                <CustomButton onPress={handleSingClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>

            </InputArea>

            <SingMesageButton onPress={handleMesageButtonClick}>
                <SingMesageButtonText>Ainda não tem cadastro?</SingMesageButtonText>
                <SingMesageButtonTextBold>Cadastre-se</SingMesageButtonTextBold>
            </SingMesageButton>

        </Container>
    );
}