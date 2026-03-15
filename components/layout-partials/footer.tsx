import { CategoriesModel } from '@/types/models'
import Link from 'next/link'
import { MdEmail, MdPhone } from 'react-icons/md'
import Image from 'next/image'

function Footer({ categories }: { categories: CategoriesModel[] }) {
    return (
        <footer className='border-t border-gray-400/40 bg-black text-white/80 font-poppins bottom-0 relative py-5 lg:px-18 md:px-10 px-5  lg:text-sm md:text-[12px] text-[10px] scroll-mt-20 ' id='footer'>
            <div className='grid lg:grid-cols-2 grid-cols-3  py-5 gap-4 border-b border-gray-400/40'>
                <div className=' grid lg:grid-cols-2 lg:gap-2 gap-1 border-r border-gray-400/40'>
                    <h2 className='text-xl font-bold lg:col-span-2 mb-2 text-white'>Categories</h2>
                    {categories.map((category) => (
                        <Link href={`/category/${category.slug}`} key={category.category_id} className='pl-2 hover:scale-105 duration-300 h-fit hover:text-white hover:font-semibold'>{category.title}</Link>
                    ))}
                </div>
                <div className=' grid lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 p-3 lg:col-span-1 col-span-2'>
                    <div className='flex flex-col lg:gap-5 gap-3 justify-center order-2 lg:order-1'>
                        <div className='text-lg font-bold uppercase leading-tight flex items-center gap-2'>
                            <Image
                                src="/storage/images/logos/dost_stii.png"
                                alt="DOSTV Logo"
                                width={120} height={100}
                                className="h-auto w-20 md:w-28"
                                priority
                            />
                            DOST- Science and Technology Information Institute (STII)
                        </div>

                        <div className=''>
                            DOST Compound, General Santos Avenue, Central Bicutan, Taguig, Metro Manila, Philippines
                        </div>
                        <div className="space-y-1">
                            <a
                                className="flex items-center gap-1"
                                href="mailto:dostv@stii.dost.gov.ph"
                            >
                                <MdEmail />
                                dostv@stii.dost.gov.ph
                            </a>

                            <a
                                className="flex items-center gap-1"
                                href="tel:+6328640000"
                            >
                                <MdPhone />
                                (02) 864-0000
                            </a>
                        </div>

                    </div>
                    <div className='order-1 lg:order-2'>
                        <div className="rounded-lg overflow-hidden shadow-md border border-gray-300 flex items-center justify-center">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.90778794198!2d121.04423850774764!3d14.48998271793831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf13c1948447%3A0x510c7e818adcc6ee!2sDepartment%20of%20Science%20and%20Technology%20-%20Main%20Compound!5e0!3m2!1sen!2sph!4v1753766191403!5m2!1sen!2sph" width="100%" height="240" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center py-3 text-white/40'>
                <div>
                    Copyright &copy; {new Date().getFullYear()} DOSTV - All right reserved
                </div>
                <div>
                    Terms of Use | Privacy Policy
                </div>
            </div>
        </footer>
    )
}

export default Footer