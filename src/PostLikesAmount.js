// JavaScript source code

function PostLikesAmount({ likes, comments, shares }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{likes} likes</span>
            <span>{comments} comments, {shares} shares</span>
        </div>
    );
}

export default PostLikesAmount;
