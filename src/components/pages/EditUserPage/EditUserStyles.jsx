import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
`

export const InfoDiv = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 0 10px;
    margin-top: 5px;

    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
`

export const ImageDiv = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const PageTitle = styled.p`
    font-weight: bold;
    font-size: 30px;
`

export const FormInput = styled.input`
    border-radius: 5px;
    border: 1px solid #b8b8b8;
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    margin-top: 5px;
    padding-left: 10px;
    font-family: 'Roboto', sans-serif;

    ::placeholder {
        font-style: italic;
    }
`

export const FormLabel = styled.label`
    margin-top: 5px;
`

export const FormButton = styled.button`
    background-color: #218BFF;
    color: white;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    border: 0;
    border-radius: 10px;    
    margin-top: 15px;

    &:hover {
        cursor: pointer;
    }
`