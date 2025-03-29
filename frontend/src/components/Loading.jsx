import loadingSpinner from '../assets/loading.png'
import { AnimatePresence, motion } from 'framer-motion'

export default function Loading () {
    return (
        <div className='h-full flex justify-center items-center py-3'>
            <img src={loadingSpinner} className='h-10 animate-spin' />
            <div className='ml-3'>Loading...</div>
        </div>
    )
}