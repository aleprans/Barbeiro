import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Api from '../../Api';

import {
    Container,
    Scroller,
    SearchArea,
    SearchInput,
    LoadingIcon,
    ListArea,
    SearchFinder,
    BackButton
} from './style';

import BarberItem from '../../components/BarberItem';
import MySearchIcon from '../../assets/search.svg';
import BackIcon from "../../assets/back.svg";

export default () => {

    const navigation = useNavigation()

    const [SearchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [refreshing, setRefresing] = useState(false)

    const getBarbers = async () => {
        setLoading(true)
        setList([])

        let res = await Api.getBarbers()
        if(res.error == ''){
            setList(res.data)
        }else{
            alert("Erro: "+res.error)
        }

        setLoading(false)
    }

    useEffect(()=>{
        getBarbers()
    }, [])

    const onRefresh = () => {
        setRefresing(false)
        getBarbers()
    }

    const handleSearch = () => {
        getBarbers()
    }

    const handleSearchFinder = () => {
        getBarberSearch()
    }
    
    const handleBackButton = () => {
        navigation.goBack()
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                <SearchArea>
                    <SearchInput
                        placeholder="Digite a sua busca."
                        placeholderTextColor="#FFFFFF"
                        value={SearchText}
                        onChangeText={s=>setSearchText(s)}
                        onEndEditing={handleSearch}
                    />
                    <SearchFinder onPress={handleSearchFinder}>
                        <MySearchIcon width="24" height="24" fill="#FFFFFF"/>
                    </SearchFinder>
                </SearchArea>

                {loading &&
                    <LoadingIcon size="large" color="#FFF" />
                }

                <ListArea>
                    {list.map((item, k)=>(
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scroller>
            <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFF"/>
            </BackButton>
        </Container>
    )
}