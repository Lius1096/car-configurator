 /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  safelist: [
    // Common classes used in the app
    'min-h-screen', 'flex', 'flex-col', 'flex-row', 'flex-1', 'items-center', 'justify-center',
    'bg-neutral-100', 'bg-white', 'w-full', 'border-b', 'border-r', 'shadow-lg', 'shadow-xl',
    'rounded-3xl', 'p-4', 'p-6', 'p-8', 'space-y-8', 'text-2xl', 'text-3xl', 'text-5xl',
    'font-semibold', 'font-bold', 'tracking-tight', 'text-neutral-900', 'text-neutral-700',
    'text-neutral-800', 'text-center', 'text-left', 'mb-3', 'mb-4', 'mb-6', 'mb-12',
    'border-t', 'border-2', 'border-gray-300', 'border-gray-400', 'border-blue-500',
    'bg-blue-50', 'rounded-lg', 'transition-all', 'text-sm', 'text-lg', 'text-gray-600',
    'text-red-600', 'max-w-6xl', 'overflow-y-auto', 'w-full',
    // md: responsive classes
    'md:flex-row', 'md:w-\\[300px\\]', 'md:fixed', 'md:top-0', 'md:left-0', 'md:h-full',
    'md:ml-\\[300px\\]', 'md:border-b-0', 'md:border-r', 'md:p-8', 'md:p-14', 'md:mb-12',
    'md:text-5xl'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}