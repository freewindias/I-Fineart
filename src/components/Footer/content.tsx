import Image from 'next/image'
import React from 'react'
import rodiasLogo from '@/assets/images/rodias.jpeg'

export default function Content() {
    return (
        <div className='bg-[#4E4E5A] py-8 px-12 h-full w-full flex flex-col justify-between'>
            <Section1 />
            <Section2 />
        </div>
    )
}

const Section1 = () => {
    return (
        <div>
            {/* <Nav /> */}
        </div>
    )
}

const Section2 = () => {
    return (
        <div className='flex justify-between items-end'>
            <h1 className='text-[14vw] leading-none mt-10 text-[#fff] tracking-tighter pointer-events-none'>I-Fineart</h1>
            <div className=''>
                <div className='flex gap-6 mb-20 text-white'>
                    <div>
                        <nav>
                            <li>Home</li>
                            <li>Home</li>
                            <li>Home</li>
                        </nav>
                    </div>
                    <div>
                        <nav>
                            <li>Home</li>
                            <li>Home</li>
                            <li>Home</li>
                        </nav>
                    </div>
                </div>
                <div className='flex gap-2 items-center mb-4'>
                    <p className='text-[#fff]'>Designed By</p>
                    <Image src={rodiasLogo} alt='rodias' width={150} height={150} />
                </div>
                <p className='text-[#fff]'>© 2024 RODIAS IT Solutions. All rights reserved.</p>
            </div>
        </div>
    )
}

// const Nav = () => {
//     return (
//         <div className='flex shrink-0 gap-20'>
//             <div className='flex flex-col gap-2'>
//                 <h3 className='mb-2 uppercase text-[#fff]'>About</h3>
//                 <div className='text-[#fff]'>
//                     <p>Home</p>
//                     <p>Projects</p>
//                     <p>Our Mission</p>
//                     <p>Contact Us</p>
//                 </div>
                
//             </div>
//         </div>
//     )
// }