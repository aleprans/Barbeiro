import React, { useContext } from 'react';
import styled from 'styled-components/native';

import { UserContext } from '../contexts/UserContext';
import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';


const TabArea = styled.View`
    height: 50px;
    background-color: #4EADBE;
    flex-direction: row;
`;

const TabItem = styled.TouchableOpacity `
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity `
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 35px;
    border: 3px solid #4EADBE;
    margin-top: -25px
`;

const AvatarIcon = styled.Image `
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export default ({ state, navigation }) => {

    const { state: user } = useContext(UserContext)

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <TabArea>
            <TabItem onPress={()=>goTo('Home')}>
                <HomeIcon style={{opacity: state.index===0? 0.5 : 1}}width="24" height="24" fill="#FFFFFF" />
            </TabItem>
            <TabItem onPress={()=>goTo('Search')}>
                <SearchIcon style={{opacity: state.index===1? 0.5 : 1}}width="24" height="24" fill="#FFFFFF" />
            </TabItem>
            <TabItemCenter onPress={()=>goTo('Appointments')}>
                <TodayIcon width="32" height="32" fill="#4EADBE" />
            </TabItemCenter>
            <TabItem onPress={()=>goTo('Favorities')}>
                <FavoriteIcon style={{opacity: state.index===3? 0.5 : 1}}width="24" height="24" fill="#FFFFFF" />
            </TabItem>
            <TabItem onPress={()=>goTo('Profile')}>
                {user.avatar != '' ?
                    <AvatarIcon source={{uri: user.avatar}} />
                    :
                    <AccountIcon style={{opacity: state.index===4? 0.5 : 1}}width="24" height="24" fill="#FFFFFF" />
                }
                
            </TabItem>
        </TabArea>
    )
}