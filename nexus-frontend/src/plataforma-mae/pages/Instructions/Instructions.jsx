import React from "react";
import YoutubePlaylist from "../../components/PlaylistYt/YoutubePlaylist";
import Main from "../Main/Main";

const Instructions = () => {
    return (
        <Main showReturnPages={false}>
            <div className="instructions-container">
                <div className="instructions-container__content">
                    <YoutubePlaylist 
                        titlePlaylist="Outras instruções" 
                        playlistId="PLWXw8Gu52TRL3sY3esdsH2PxYiRdXwfvX" 
                        isCursoDetails={false} 
                    />
                </div>
            </div>
        </Main>
    );
};

export default Instructions;
