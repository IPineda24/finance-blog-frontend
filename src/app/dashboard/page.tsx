//dashboard/page.tsx
import PostList from '@/app/components/PostList';
import getPost from '../api/post/getPost';
import Swal from 'sweetalert2';
export default async function dashboard() {
    const posts = getPost( 1 );
    if ( await posts ) {
        return (
            <div>
                <h1>Posts</h1>
                <PostList posts={await posts} />
            </div>
        );

    } else {
        Swal.fire( {
            icon: "error",
            title: "Ups...",
            text: "no se pudo obtener los post",
        } );
        return <div>no se pudo obtener los post</div>;
    }
}
