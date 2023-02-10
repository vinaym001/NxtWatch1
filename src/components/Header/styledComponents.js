import styled from 'styled-components/macro'

export const HeaderDiv = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 1px 0px 1px #cccccc;
  background-color: ${props => props.backgroundColor};
`
export const LogOutButton = styled.button`
  background-color: ${props => props.btnBGColor};
  padding: 10px;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'roboto';
  border: ${props => props.btnBorder};
`
export const CancelButton = styled.button`
  background-color: transparent;
  padding: 10px;
  color: ${props => props.cancelBtnColor};
  border-radius: 8px;
  cursor: pointer;
  font-family: 'roboto';
  border: ${props => props.btnBorder};
`
