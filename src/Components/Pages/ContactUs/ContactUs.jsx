
const ContactUs = () => {
    return (
        <section className="bg-gray-100">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
                <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Visit Our Location</h2>
                    <p className="mt-4 text-lg text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="mt-16 lg:mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="rounded-lg overflow-hidden">


                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.3785522708467!2d90.39037217581968!3d23.733876578681677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8e90a449e4f%3A0xb7092a9c25197fa4!2sUniversity%20of%20Dhaka!5e0!3m2!1sen!2sbd!4v1701012522061!5m2!1sen!2sbd"
                                width="100%" height="480" style={{ border: 0 }} allowfullscreen="" loading="lazy"></iframe>


                        </div>
         <div className="">
         <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-slate-200">Contact Us
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-500 dark:text-slate-400">Please use the form below to contact us.
                Thank you!
            </p>

         <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Name</label>
                    <div className="mt-1"><input name="name" type="text" id="name" autoComplete="organization" required=""
                     className="border-gray-300 block w-full rounded-md py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500
                      dark:border-white/5 dark:bg-slate-700/50 dark:text-white"/>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Email</label>
                    <div className="mt-1"><input name="email" id="email" required="" type="email"
                     autoComplete="email" className="border-gray-300 block w-full 
                     rounded-md py-3 px-4 shadow-sm focus:border-sky-500
                      focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"/>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Message</label>
                    <div className="mt-1">
                        <textarea required="" name="message" id="message" rows="4" className="border-gray-300 block w-full rounded-md py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"></textarea>
                    </div>
                </div>
                <div className="flex justify-end sm:col-span-2">
                    <button type="submit" className="inline-flex items-center rounded-md px-4 py-2 font-medium focus:outline-none focus-visible:ring focus-visible:ring-sky-500 shadow-sm sm:text-sm transition-colors duration-75 text-sky-500 border border-sky-500 hover:bg-sky-50 active:bg-sky-100 disabled:bg-sky-100 dark:hover:bg-gray-900 dark:active:bg-gray-800 dark:disabled:bg-gray-800 disabled:cursor-not-allowed">
                        <span>Send Message</span>
                    </button>
                </div>
            </form>
         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;