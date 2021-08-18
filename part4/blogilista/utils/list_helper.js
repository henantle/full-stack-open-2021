const dummy = (blogs) => {
    return 1;
}

const totalLikes  = (blogs) => {
    let counter = 0;
    for (const blog of blogs) {
        counter += blog.likes;
    }
    return counter;
}

const mostLikes = (blogs) => {
    let ogBlog = blogs[0];
    if (ogBlog !== null) {
        for (const blog of blogs) {
            if (blog.likes > ogBlog.likes) {
                ogBlog = blog;
            }
        }
    }
    return ogBlog;
}

module.exports = {
    dummy,
    totalLikes,
    mostLikes
}