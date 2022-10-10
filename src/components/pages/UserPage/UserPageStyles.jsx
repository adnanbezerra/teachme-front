import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: fit-content;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
`

export const PageTitle = styled.p`
    font-weight: bold;
    font-size: 30px;
`

export const InfoText = styled.p`
    font-weight: bold;
    font-size: 20px;
`

export const InfoDiv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-left: 10px;
    margin-top: 5px;
    margin-bottom: 20px;

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

export const Email = styled.p`
    font-size: 20px;
`

export const EditUser = styled.button`
    background-color: #347d39;
    border: 0;
    border-radius: 5px;
    height: 35px;
    width: 100px;
    color: white;
    font-weight: bold;
    margin-bottom: 10px;
`