import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #63C2D1;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
`;

export const SearchArea = styled.View`
    background-color: #4EADBE;
    height: 60px;
    border-radius: 30px;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 30px;
`;

export const SearchInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #FFF;
`;

export const LoadingIcon = styled.ActivityIndicator `
    margin-top: 50px;
`;

export const ListArea = styled.View `
    margin-top: 30px;
    margin-bottom: 30px;
`;


export const SearchFinder = styled.TouchableOpacity `
    width: 24px;
    height: 24px;
`;