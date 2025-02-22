/** @type {import('tailwindcss').Config} */
module.exports = {
  _content: ["./Malz_banking/**/*.{html,js,ts,jsx,tsx}"],
  get content() {
    return this._content;
  },
  set content(value) {
    this._content = value;
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

