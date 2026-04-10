# Rolls-Royce Premium Experience

A luxury automotive web experience built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. 

## 🚀 Running Locally

To run this website locally on your computer:

1. **Install Dependencies**
   Ensure you have [Node.js](https://nodejs.org/) installed, then open your terminal in this folder (`c:\Users\dell\Desktop\Rolls Royce`) and run:
   ```bash
   npm install
   ```
2. **Start the Development Server**
   ```bash
   npm run dev
   ```
3. **View the Site**
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

## 🖼️ Adding Canvas Images
To activate the interactive Showroom canvas sequences:
1. Extract your `Luxury_car_door_202604082019_frames.zip` file.
2. Place the sequence frames inside the public directory under their respective models.
   - Example path: `public/frames/phantom/frame_0001.webp` to `frame_0060.webp`

*(Currently the Showroom will display a gold loading state until the images are present in the `public` folder).*

## 🌍 Deploying the Website

The absolute easiest way to deploy your Next.js app to the world is to use the **Vercel** Platform:

1. Create a free account at [Vercel](https://vercel.com).
2. Download the Vercel CLI by running: `npm install -g vercel`
3. Then simply type `vercel` in your terminal inside this folder!

Vercel will automatically detect that this is a Next.js project, install the dependencies in the cloud, run the production build (`npm run build`), and instantly provide you with a live, shareable URL!

## Tech Stack
* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS (Custom Dark Luxury Theme: Black + Gold)
* **Animations:** Framer Motion & HTML5 Canvas (`requestAnimationFrame`)
* **Typography:** native `next/font` injection (Playfair Display for headers & Inter for paragraphs)
