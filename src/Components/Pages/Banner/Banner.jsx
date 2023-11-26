import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './banner.css';

const Banner = () => {
    const [text, setText] = useState('');
    const words = ["Welcome to my website!", "Join the Mission: Donate Blood, Save Lives", "Heroes Needed: Step Up and Donate Blood"];
    let i = 0;
    let j = 0;
    let currentWord = "";
    let isDeleting = false;

    useEffect(() => {
        function type() {
            currentWord = words[i];
            if (isDeleting) {
                setText(currentWord.substring(0, j - 1));
                j--;
                if (j === 0) {
                    isDeleting = false;
                    i++;
                    if (i === words.length) {
                        i = 0;
                    }
                }
            } else {
                setText(currentWord.substring(0, j + 1));
                j++;
                if (j === currentWord.length) {
                    isDeleting = true;
                }
            }
            setTimeout(type, 100);
        }

        type();
    }, [i, j, isDeleting]);

    return (
        <div className="relative bgstyle bg-cover bg-center h-[70vh]">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-6 rounded-lg shadow-md">
                    <div className="w-full h-full flex justify-center items-center">
                        <h1 id="typewriter" className="text-4xl text-white font-bold">{text}</h1>
                    </div>
                    <div className="">
                        <div className="max-w-lg mx-auto flex flex-col justify-center items-center gap-4 sm:flex-row md:mt-8 lg:mt-10">
                            <Link
                                className="group relative inline-flex border border-red-500 focus:outline-none w-full sm:w-auto"
                                to="register"
                            >
                                <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-red-500 ring-1 ring-red-500 ring-offset-1 ring-offset-red-500 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
                                    Join as a donor
                                </span>
                            </Link>
                            <Link
                                to=""
                                className="group relative inline-flex border border-red-600 focus:outline-none w-full sm:w-auto"
                                target="_blank"
                            >
                                <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-red-600 text-center font-bold uppercase bg-white ring-1 ring-red-600 ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
                                    Search Donors
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
