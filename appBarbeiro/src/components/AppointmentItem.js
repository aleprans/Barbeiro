import React, {useState} from 'react';
import styled from 'styled-components/native';
import { useNavigation} from '@react-navigation/native';

const Area = styled.TouchableOpacity `
    background-color: #FFF;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;

const Avatar = styled.Image `
    width: 88px;
    height: 88px;
    border-radius: 20px;
`;

const InfoArea = styled.View `
    margin-left: 20px;
    justify-content: space-between;
`;

const UserName = styled.Text `
    font-size: 17px;
    font-weight: bold;
`;

const ServiceInfo = styled.View `
    flex-direction: row;
    justify-content: space-between;
`;

const ServiceName = styled.Text `
    font-size: 16px;
    font-weight: bold;
`;

const ServicePrice = styled.Text `
    font-size: 16px;
    font-weight: bold;
`;



export default ({data}, user, service) => {
    const navigation = useNavigation()

    const handleClick = () => {
        navigation.navigate('Barber', {
            id: data.id,
            avatar: data.avatar,
            name: data.name,
            stars: data.stars
        }) 
    }

    return (
        <Area onPress={handleClick}>
            <Avatar source={{uri: data.avatar}}/>
            <InfoArea>
                <UserName>{data.name}</UserName>
                <ServiceInfo>
                    <ServiceName>{user.service[service].name}</ServiceName>
                    <ServicePrice>R$ </ServicePrice>
                </ServiceInfo>

            </InfoArea>
        </Area>
    )
}