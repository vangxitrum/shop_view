/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  prefix: 'tw-',
  important: true,
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px'
    },
    container: {
      center: true,
      padding: '12px',
      maxWidth: {
        DEFAULT: '576px',
        sm: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
      }
    },
    keyframes: {
      'zoomIn': {
        '0%': {
          opacity: 0,
          transform: 'scale3d(.3, .3, .3)'
        },
        '50%': {
          opacity: 1
        }
      },
      'fadeInUp': {
        '0%': {
          opacity: 0,
          transform: 'translate3d(0, 100%, 0)'
        },
        '100%': {
          opacity: 1,
          transform: 'none'
        }
      },
      'fadeInDown': {
        '0%': {
          opacity: 0,
          transform: 'translate3d(0, -100%, 0)'
        },
        '100%': {
          opacity: 1,
          transform: 'translateZ(0)'
        }
      },
      'fadeFromRight': {
        '0%': {
          opacity: 0,
          transform: 'translate3d(100%, 0, 0)'
        },
        '100%': {
          opacity: 1,
          transform: 'translateZ(0))'
        }
      }
    },
    extend: {
      animation: {
        'zoomIn': 'zoomIn 0.7s 0.3s',
        'fadeInUp': 'fadeInUp 1.2s 0.5s forwards',
        'fadeInDown': 'fadeInDown 0.9s cubic-bezier(0.2, 1, 0.22, 1)',
        'fadeFromRight': 'fadeFromRight 0.3 cubic-bezier(0.2, 1, 0.22, 1)'
      },
      boxShadow: {
        'accountDropdown': '0 0 5px rgb(0 0 0 / 20%);',
        'productDropdown': '0 0 20px 5px rgb(0 0 0 / 10%);'
      },
      colors: {
        'lightShadow': 'rgba(0, 0, 0, 0.15)',
        primary: '#ff6a28',
        secondary: '#747474',
        tertiary: '#242424',
        formInput: '#a4a4a4',
        banner: 'rgba(255, 255, 255, 0.5)',
        message: 'rgba(78, 79, 80, 0.5)'
      },
      boxShadow: {
        stickyHeader: '0 1px 3px rgba(0, 0, 0, 0.11)'
      }
    },
  },
  corePlugins: {
    preflight: false
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          margin: '0 auto',
          padding: '0 12px',
          '@screen sm': {
            maxWidth: '540px',
          },
          '@screen md': {
            maxWidth: '720px',
          },
          '@screen lg': {
            maxWidth: '960px',
          },
          '@screen xl': {
            maxWidth: '1140px',
          },
          '@screen 2xl': {
            maxWidth: '1320px'
          }
        },
        '.container-fluid': {
          display: 'block',
          width: '100%',
          padding: '0 12px',
          margin: '0 auto'
        }
      })
    },
  ],
}
