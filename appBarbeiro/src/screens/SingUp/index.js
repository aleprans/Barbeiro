import React , {useState} from 'react';
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
import PersonIcon from '../../assets/person.svg';

export default() => {
    const { dispatch: userDispatch } = useContext(UserContext)
    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');


    const handleSingClick = async () => {
        if(nameField != '' && emailField != '' && passwordField != ''){
            let req = await Api.singUp(nameField, emailField, passwordField);

            if(req.token){
                await AsyncStorage.setItem('token', req.token)
                userDispatch({
                    type: 'setAvatar',
                    payload:{
                        avatar: req.data.avatar
                    }
                })

                naviagation.reset({
                    routes:[{name:'MainTab'}]
                })
            }else{
                alert("Erro: "+ req.error)
            }
        }else{
            alert("Preencha os campos!")
        }
    }
    const handleMesageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SingIn'}]
        })
    }

    return(
        <Container>
            <BarberLogo width="100%" height="160" />

            <InputArea>
                <SingInput 
                    IconSvg={PersonIcon}
                    placeholder="Digite seu nome"
                    value={nameField}
                    onChangeText={t=>setNameField(t)}
                />
                
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
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>

            </InputArea>

            <SingMesageButton onPress={handleMesageButtonClick}>
                <SingMesageButtonText>Já possue uma conta?</SingMesageButtonText>
                <SingMesageButtonTextBold>Faça Login</SingMesageButtonTextBold>
            </SingMesageButton>

        </Container>
    );
}