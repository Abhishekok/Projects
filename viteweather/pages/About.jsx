import React from 'react'

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg max-w-2xl text-center text-gray-300">
        This is the About page. You can tell users about your project, your team,
        or your mission here. Since you’re using Tailwind + Shadcn, you can also
        add styled cards, buttons, or other components to make this look great.
      </p>
    </div>
  )
}

export default About