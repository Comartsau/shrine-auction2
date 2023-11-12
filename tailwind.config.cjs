/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['IBM Plex Sans Thai Looped', "sans-serif"],
    },
    extend: {
      base: {
        // ปรับแต่ง Input container ตามต้องการ
        container: {
          position: "relative",
          width: "100%", // เปลี่ยนเป็น "w-full" หรือค่าที่คุณต้องการ
          minWidth: "50px", // เปลี่ยนเป็น "min-w-[100px]" หรือค่าที่คุณต้องการ
        },
      },
    },
  },
  plugins: [],
});
