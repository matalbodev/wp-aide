import { useEffect, useState } from "react";

const useScreenSize = () => {
	// window is undefined during SSR
	if (typeof window === "undefined") return { screenSize: 0, isMobile: false };
	const [screenSize, setScreenSize] = useState(window.innerWidth);
	const handleResize = () => setScreenSize(window.innerWidth);
	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const isMobile = screenSize < 768;
	return { screenSize, isMobile };
};

export default useScreenSize;
