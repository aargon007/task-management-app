import Link from "next/link";
import { FaDiscord, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
		<div className="bg-blue-300 p-3">
			<p className="text-center text-sm my-3">
				Copyright © 2023 <Link target="_blank" className="underline" href="https://muhaiminul101.vercel.app/">Md Muhaiminul</Link>. All rights reserved.
			</p>
		</div>
	);
};

export default Footer;