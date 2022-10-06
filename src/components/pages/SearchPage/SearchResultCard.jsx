import { useNavigate } from "react-router-dom";
import { CreationDate, SearchCardContainer, SearchResultDescription, SearchResultName, ViewsAndLikes } from "./SearchPageStyles";

export default function SearchResultCard({ id, name, views, likes, creationDate, description }) {

    const navigate = useNavigate();

    return (
        <SearchCardContainer onClick={() => navigate(`/post/${id}`)}>
            <SearchResultName>{name}</SearchResultName>
            <SearchResultDescription><span style={{ fontStyle: "italic" }}>Descrição:</span> {description}</SearchResultDescription>
            <ViewsAndLikes><span style={{ fontStyle: "italic" }}>Visualizações:</span> {views} | <span style={{ fontStyle: "italic" }}>Curtidas:</span> {likes} </ViewsAndLikes>
            <CreationDate><span style={{ fontStyle: "italic" }}>Data de criação:</span>{creationDate}</CreationDate>
        </SearchCardContainer>
    )
}