import notFoundImage from '../assets/404.png';

export default function NotFound () {
    return (
        <>
            <div>This page was not found</div>
            <img src={notFoundImage} alt="404 Not Found" className='h-2/3' />
        </>
    )
}