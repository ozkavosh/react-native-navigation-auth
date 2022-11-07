import styled, { css } from 'styled-components';

export const StyledButton = styled.TouchableOpacity`
    border-radius: 30px;
    height: 55px;
    width: 90%;
    background: black;
    margin: 15px 0 0 0;
    padding: 5px 10px;
    align-items: center;
    justify-content: center;
    ${(props) => props.primary && css`background: crimson;`}
`;

export const StyledButtonText = styled.Text`
    text-transform: uppercase;
    color: white;
    font-weight: bold;
  `;