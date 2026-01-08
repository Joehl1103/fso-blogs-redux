/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        fontFamily: {
            sans: ['Optima'],
            serif: ['Georgia']
        },
        extend: {
            width: {
                '32': "8rem",
                '36': '9rem',
                '36.5': '9.125rem',
                '37': '9.25rem',
                '38': '9.5rem',
                '40': '10rem',
                '60':'15rem',
                '19px':'19px',
                '75px': '75px',
                '140px': '140px',
                '143px': '143px',
                '142px': '142px',
                '145px': '145px',
                '148px': '148px',
                '150px': '150px',
                '157px': '157px',
                '160px': '160px'
            },
            padding: {
                '1px':'1px',
                '5px':'5px',
                '10px':'10px',
                '19px':'19px'
            },
            margin: {
                '0.5px':'0.5px',
                '1px':'1px',
                '3px':'3px',
                '5px':'5px',
                '10px':'10px',
                '15px':'15px',
                '18px': '18px',
                '25px': '25px'
            },
            height: {
                '36px':'36px'
            }
        }
    }, 
    plugins: [],
    corePlugins: {
        preflight: false,
    },
}