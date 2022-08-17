module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#1A1A40",
				// secondary: "#2a3659",
				secondary: "#4FD3C4",
				tertiary: "#488FB1",
				// "yellow-prime": "#4FD3C4",
				userHoverBackground: "#C1F8CF",
			},
			// colors: {
			// 	primary: "#1c1c1c",
			// 	secondary: "#2a3659",
			// 	tertiary: "#222627",
			// 	"yellow-prime": "#FFFE71",
			// 	buttonHoverBackground: "#000000",
			// },
			fontFamily: {
				js_semi: ["Josefin_Sans-SemiBold", "Poppins-SemiBold", "sans-serif"],
				js_regular: ["Josefin_Sans-Regular", "Poppins-Regular", "sans-serif"],
				p_semi: ["Poppins-SemiBold", "Josefin_Sans-SemiBold", "sans-serif"],
				p_regular: ["Poppins-Regular", "Josefin_Sans-Regular", "sans-serif"],
			},
		},
	},
	plugins: [],
};
