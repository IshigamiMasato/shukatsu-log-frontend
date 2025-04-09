"use client";

import { RootState } from "@/store";
import { faBuilding, faUser, faCalendar, faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

const BottomNav = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [ activeLink, setActiveLink ] = useState<string>("");

    return (
        <div className="sm:mt-0 mt-32">
            { isAuthenticated && (
                <ul className="text-gray-700 bg-white fixed left-0 bottom-0 w-full grid grid-cols-5 text-center p-2 border-t sm:hidden">
                    <li>
                        <Link href='/event' onClick={ () => setActiveLink('event') }>
                            <div className={`w-full h-full block ${activeLink === 'event' ? 'text-blue-500' : ''}`}>
                                <FontAwesomeIcon icon={faCalendar} className="text-lg" />
                                <br />
                                <span className="text-xs">予定</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href='/company' onClick={ () => setActiveLink('company') }>
                            <div className={`w-full h-full block ${activeLink === 'company' ? 'text-blue-500' : ''}`}>
                                <FontAwesomeIcon icon={faBuilding} className="text-lg" />
                                <br />
                                <span className="text-xs">企業</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href='/' onClick={ () => setActiveLink('home') }>
                            <div className={`w-full h-full block ${activeLink === 'home' ? 'text-blue-500' : ''}`}>
                                <FontAwesomeIcon icon={faHouse} className="text-lg" />
                                <br />
                                <span className="text-xs">Home</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href='/apply' onClick={ () => setActiveLink('apply') }>
                            <div className={`w-full h-full block ${activeLink === 'apply' ? 'text-blue-500' : ''}`}>
                                <FontAwesomeIcon icon={faFileLines} className="text-lg" />
                                <br />
                                <span className="text-xs">応募</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href='/user' onClick={ () => setActiveLink('user') }>
                            <div className={`w-full h-full block ${activeLink === 'user' ? 'text-blue-500' : ''}`}>
                                <FontAwesomeIcon icon={faUser} className="text-lg" />
                                <br />
                                <span className="text-xs">ユーザ</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default BottomNav;
