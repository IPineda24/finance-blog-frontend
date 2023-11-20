//dashboard/page.tsx
import PostList from '@/app/components/PostList';
import getPost from '../api/post/getPost';
import Swal from 'sweetalert2';
export default async function dashboard() {
    const posts = getPost( 1 );
    if ( await posts ) {
        return (
            <div className='bg-gray-800'>
                <h1 className="text-2xl font-bold text-white text-center  mb-6 h-2 bg-green-800"></h1>
                <PostList posts={await posts} />
            </div>
        );

    } else {
        const failAlert = () => {
            Swal.fire( {
                icon: "error",
                title: "Ups...",
                text: "Error al obtener los post",
            } );
        }
        failAlert();
        return <div className='w-full flex justify-center items-center text-white'>
            <h1 className="text-2xl mt-8 font-bold text-white text-center  mb-6 h-2 bg-green-800">Ups... error al obtener los post</h1>

        </div>;
    }
}
