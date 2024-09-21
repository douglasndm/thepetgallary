import styled from 'styled-components/native';

export const Container = styled.View`
    position: absolute;
    bottom: 40px;
    width: 100%;
    align-items: center;
`;

export const Content = styled.View`
    background-color: #05D5BA;
    flex-direction: row;
    justify-content: space-around;
    border-radius: 20px;
    padding: 8px 15px;
`;

export const Button = styled.TouchableOpacity`
    width: 80px;
    justify-content: center;
    align-items: center;
`;

export const Icon = styled.Image.attrs(() => ({
    tintColor: '#fff',
}))`
    width: 35px;
    height: 35px;
    margin: 13px;
`;
