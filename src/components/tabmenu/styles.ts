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
`;

export const Button = styled.TouchableOpacity`
    width: 80px;
    height: 60px;
    justify-content: center;
    align-items: center;
`;

export const Text = styled.Text`
    color: #fff;
    font-weight: bold;
`;
