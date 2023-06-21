const CommentForm = () => {
    return (
        <div className='comments_form'>
            <h3>Leave a Reply </h3>
            <p>Your email address will not be published.</p>
            <form action='#'>
                <div className='row'>
                    <div className='col-12'>
                        <label htmlFor='review_comment'>Comment </label>
                        <textarea name='comment' id='review_comment'></textarea>
                    </div>
                    <div className='col-lg-4 col-md-4'>
                        <label htmlFor='author'>Name</label>
                        <input id='author' type='text' />
                    </div>
                    <div className='col-lg-4 col-md-4'>
                        <label htmlFor='email'>Email </label>
                        <input id='email' type='text' />
                    </div>
                    <div className='col-lg-4 col-md-4'>
                        <label htmlFor='website'>Website </label>
                        <input id='website' type='text' />
                    </div>
                </div>
                <button className='button' type='submit'>
                    Post Comment
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
