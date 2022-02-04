import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Api from '../../Api';

import {
    Container,
    Scroller,
    LoadingIcon,
    ListArea
} from './style';

import AppointmentItem from '../../components/AppointmentItem';
export default () => {

    const navigation = useNavigation()

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
    
    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                
                {loading &&
                    <LoadingIcon size="large" color="#FFF" />
                }

                <ListArea>
                    {list.map((item, k)=>(
                        <AppointmentItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    )
}