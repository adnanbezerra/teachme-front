import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: flex;

    p {
        font-size: 20px;
        margin-bottom: 15px;
    }
`

export const Form = styled.form`
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    width: 80%;
    background-color: #F6F8FA;
    border-radius: 10px;
    flex-direction: column;
    padding: 15px;
    box-sizing: border-box;
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
    border-radius: 5px;    
    margin-top: 15px;
`

export const BottomText = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    position: fixed;
    bottom: 20px;

    #bottom {
        color: #D8DEE4;
        font-size: 15px;
        margin-bottom: 2px;
    }
`

export const ReturnButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    position: fixed;
    top: 20px;
    left: 10px;
`

export const RegisterBox = styled.div`
    height: 55px;
    width: 80%;
    border: 1px solid #b8b8b8;
    border-radius: 10px;
    margin-top: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    #link {
        text-decoration: none;
        color: #218BFF;
        margin-left: 3px;
    }
`