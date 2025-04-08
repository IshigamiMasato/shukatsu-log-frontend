import { faBuilding, faUser, faCalendar, faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const BottomNav = () => {
    return (
        <div className="mt-32">
            <ul className="text-gray-700 bg-white fixed left-0 bottom-0 w-full grid grid-cols-5 text-center px-2 py-4 border-t sm:hidden">
                <li>
                    <Link href='/event'>
                        <FontAwesomeIcon icon={faCalendar} className="text-lg" /><br />
                        <span className="text-xs">予定</span>
                    </Link>
                </li>
                <li>
                    <Link href='/company'>
                        <FontAwesomeIcon icon={faBuilding} className="text-lg" /><br />
                        <span className="text-xs">企業</span>
                    </Link>
                </li>
                <li>
                    <Link href='/'>
                        <FontAwesomeIcon icon={faHouse} className="text-lg" /><br />
                        <span className="text-xs">Home</span>
                    </Link>
                </li>
                <li>
                    <Link href='/apply'>
                        <FontAwesomeIcon icon={faFileLines} className="text-lg" /><br />
                        <span className="text-xs">応募</span>
                    </Link>
                </li>
                <li>
                    <Link href='/user'>
                        <FontAwesomeIcon icon={faUser} className="text-lg" /><br />
                        <span className="text-xs">ユーザ</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default BottomNav;
