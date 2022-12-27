import React from "react";
import { Post } from "../../typings";
import ShowMore from "../button/ShowMore";
import SinglePost from "../cards/SinglePost";
import { sanityClient } from "../../sanity";
import Loading from "../extras/Loading";

interface Props {
    posts: Post[];
}

export default function PostFeed({ posts }: Props) {
    const [allPosts, setAllPosts] = React.useState<Post[]>(posts && [...posts]);
    const [loading, setLoading] = React.useState(false);
    const [pageRange, setPageRange] = React.useState([0, 9]);
    const postPerPage = 10;

    async function loadMore() {
        setLoading(true);
        let postCount = allPosts.length;
        let res = await (await fetch(`api/posts/${postCount}`))
            .json()
            .then((newPosts) =>
                setAllPosts((prevPosts) => [...prevPosts, ...newPosts])
            );
        setLoading(false);
    }

    return (
        <div>
            <div className="w-100 flex flex-col space-y-12">
                {allPosts &&
                    allPosts.map((post) => {
                        return <SinglePost post={post} key={post._id} />;
                    })}
            </div>
            {!loading ? (
                <ShowMore loadMore={loadMore} />
            ) : (
                <div className="flex items-center justify-center w-full mt-12 h-[42px]">
                    <Loading />
                </div>
            )}
        </div>
    );
}
