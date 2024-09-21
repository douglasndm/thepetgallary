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
    border-radius: 12px;
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
    width: 30px;
    height: 28px;
    margin: 7px;
`;

export const Text = styled.Text`
    color: #fff;
    font-weight: bold;
    margin-top: 5px;
`;
