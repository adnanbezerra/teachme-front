import styled from "styled-components";

export const Container = styled.div`
    margin-top: 70px;
    display: flex;
    width: 100%;
    height: 100%;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);

    align-items: center;
    flex-direction: column;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 80%;
`

export const FormButton = styled.button`
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    background-color: #218BFF;
    color: #fff;
    border: 0;
    border-radius: 5px;
    box-sizing: border-box;

    &:hover {
        cursor: pointer;
        background-color: #55a4fa;
    }
`

export const FormInput = styled.input`
    height: 35px;
    border-radius: 5px;
    border: 1px solid #b8b8b8;
    font-family: 'Roboto', sans-serif;
    padding-left: 10px;
    box-sizing: border-box;

    ::placeholder {
        font-style: italic;
    }
`

export const NoSearchResults = styled.p`
    margin-top: 20px;
    font-weight: bold;
`

export const SearchCardContainer = styled.div`
    display: flex;
    width: 80%;
    background-color: #F6F8FA;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 10px;
    box-sizing: border-box;
    flex-direction: column;
`

export const SearchResultName = styled.p`
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 5px;
`

export const SearchResultDescription = styled.span`
    word-break: break-all;
    margin-bottom: 3px;
`

export const ViewsAndLikes = styled.span`
    margin-bottom: 3px;
`

export const CreationDate = styled.span`
    margin-bottom: 3px;
`