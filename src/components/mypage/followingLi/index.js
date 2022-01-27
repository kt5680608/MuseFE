import React, { useState, useEffect } from "react";
import {
    UnFollowButton,
    FollowButton,
    FollowingModalContainer,
    FollowingNickname,
    FollowingInfoContainer,
    Avatar,
} from "./style";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Flex } from "gestalt";

function FollowingListLi(props) {
    const [isLiFollowed, setIsLiFollowed] = useState(true);
    const getUserNickname = useSelector((state) => state.userInfo.nickname);
    const [submit, setSubmit] = useState(false);
    const history = useHistory();
    const handleHistoryPushNickname = () => {
        window.location.href = `/my-page/${props.nickname}`;
    };
    useEffect(() => {
        console.log(isLiFollowed);
    }, [isLiFollowed]);
    const handleFollow = () => {
        const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;
        const token = JSON.parse(localStorage.getItem("token"));
        return fetch(`${API_DOMAIN}/account/follow/`, {
            method: "POST",
            headers: {
                Authorization: `${token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                follower: props.nickname,
            }),
        }).then(() => {
            setIsLiFollowed(false);
            props.followingTest(props.followingCount - 1);
        });
    };
    return (
        <FollowingModalContainer>
            <FollowingInfoContainer>
                <Avatar src={props.avatar} />
                <FollowingNickname onClick={handleHistoryPushNickname}>
                    {props.nickname}
                </FollowingNickname>
            </FollowingInfoContainer>
            {props.isOwner === true && (
                <UnFollowButton onClick={handleFollow}>
                    팔로잉 취소
                </UnFollowButton>
            )}
        </FollowingModalContainer>
    );
}

export default FollowingListLi;
